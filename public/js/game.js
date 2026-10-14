// Logica di gioco pura: nessuna rete e nessun timer qui dentro, così è testabile.
// Gira nel browser dell'host (host.js), che collega la rete (net.js) e i timer a questa classe.
//
// Tipi di domanda:
//   quiz / vero_falso  answers[] + correct (indice)
//   ordina             items[] (mostrati mescolati) + correct (indici di items nell'ordine giusto)
//   numero             answer, min, max, step, tol (tolleranza), unit
(function (root) {
'use strict';

const MAX_NICKNAME = 15;
const BASE_POINTS = 1000;
const STREAK_BONUS = 100;
const MAX_STREAK_BONUS = 500;
const CHOICE_TYPES = new Set(['quiz', 'vero_falso']);

const isPermutation = (arr, n) =>
  Array.isArray(arr) && arr.length === n && arr.every((x) => Number.isInteger(x) && x >= 0 && x < n) && new Set(arr).size === n;

function validateQuestion(q, n) {
  if (!q || typeof q.text !== 'string' || !q.text.trim()) return `La domanda ${n} non ha testo.`;
  if (!Number.isFinite(q.time) || q.time < 5 || q.time > 240) return `Il tempo della domanda ${n} deve essere tra 5 e 240 secondi.`;
  const type = q.type || 'quiz';
  if (CHOICE_TYPES.has(type)) {
    if (!Array.isArray(q.answers) || q.answers.length < 2 || q.answers.length > 4) return `La domanda ${n} deve avere da 2 a 4 risposte.`;
    if (q.answers.some((a) => typeof a !== 'string' || !a.trim())) return `La domanda ${n} ha una risposta vuota.`;
    if (!Number.isInteger(q.correct) || q.correct < 0 || q.correct >= q.answers.length) return `La domanda ${n} non ha una risposta corretta valida.`;
    return null;
  }
  if (type === 'ordina') {
    if (!Array.isArray(q.items) || q.items.length < 2 || q.items.length > 6) return `La domanda ${n} deve avere da 2 a 6 elementi da ordinare.`;
    if (q.items.some((a) => typeof a !== 'string' || !a.trim())) return `La domanda ${n} ha un elemento vuoto.`;
    if (!isPermutation(q.correct, q.items.length)) return `La domanda ${n} non ha un ordine corretto valido.`;
    return null;
  }
  if (type === 'numero') {
    const nums = [q.answer, q.min, q.max, q.tol ?? 0, q.step ?? 1];
    if (!nums.every(Number.isFinite)) return `La domanda ${n} ha valori numerici non validi.`;
    if (!(q.min < q.max) || q.answer < q.min || q.answer > q.max) return `La risposta della domanda ${n} deve stare tra minimo e massimo.`;
    if ((q.tol ?? 0) < 0 || (q.step ?? 1) <= 0) return `La domanda ${n} ha tolleranza o passo non validi.`;
    return null;
  }
  return `La domanda ${n} ha un tipo sconosciuto.`;
}

function validateQuiz(quiz) {
  if (!quiz || typeof quiz.title !== 'string' || !quiz.title.trim()) return 'Il quiz deve avere un titolo.';
  if (!Array.isArray(quiz.questions) || quiz.questions.length === 0) return 'Il quiz deve contenere almeno una domanda.';
  for (const [i, q] of quiz.questions.entries()) {
    const error = validateQuestion(q, i + 1);
    if (error) return error;
  }
  return null;
}

// Punteggio stile Kahoot: fino a 1000 punti, metà dei quali dipende dalla velocità.
function scoreFor(elapsedMs, timeLimitMs) {
  const ratio = Math.min(Math.max(elapsedMs / timeLimitMs, 0), 1);
  return Math.round(BASE_POINTS * (1 - ratio / 2));
}

function streakBonus(streak) {
  return streak >= 2 ? Math.min((streak - 1) * STREAK_BONUS, MAX_STREAK_BONUS) : 0;
}

// Valuta una risposta: { correct, quality (0–1, moltiplica i punti), close, extra }.
function evaluate(q, choice) {
  const type = q.type || 'quiz';
  if (CHOICE_TYPES.has(type)) return { correct: choice === q.correct, quality: 1 };
  if (type === 'ordina') {
    const right = choice.filter((x, i) => x === q.correct[i]).length;
    const correct = right === q.correct.length;
    return { correct, quality: 1, close: !correct && right >= q.correct.length - 2 && right > 0, extra: { positionsRight: right } };
  }
  // numero: punti pieni se esatto, che scendono fino a metà al limite della tolleranza.
  const tol = q.tol ?? 0;
  const dist = Math.abs(choice - q.answer);
  const correct = dist <= tol;
  const quality = correct ? (tol === 0 ? 1 : 1 - (0.5 * dist) / tol) : 0;
  const close = !correct && dist <= Math.max(tol * 3, (q.max - q.min) * 0.05);
  return { correct, quality, close, extra: { guess: choice, distance: dist } };
}

function cleanAvatar(avatar) {
  const s = String(avatar ?? '').trim();
  return s && [...s].length <= 4 && s.length <= 16 ? s : '🙂';
}

class Game {
  constructor(pin, quiz, now = Date.now) {
    this.pin = pin;
    this.quiz = quiz;
    this.now = now;
    this.state = 'lobby';
    this.index = -1;
    this.players = new Map(); // id -> { id, nickname, avatar, score, streak, correctCount, last }
    this.answers = new Map(); // id -> { choice, elapsed }
    this.questionStartedAt = 0;
  }

  get question() {
    return this.quiz.questions[this.index];
  }

  get total() {
    return this.quiz.questions.length;
  }

  // Si può entrare anche a partita iniziata, ma non dopo la fine.
  addPlayer(id, rawNickname, avatar) {
    if (this.state === 'gameover') return { error: 'La partita è terminata.' };
    const nickname = String(rawNickname ?? '').trim().replace(/\s+/g, ' ');
    if (!nickname) return { error: 'Inserisci un nickname.' };
    if (nickname.length > MAX_NICKNAME) {
      return { error: `Il nickname può avere al massimo ${MAX_NICKNAME} caratteri.` };
    }
    const lower = nickname.toLowerCase();
    for (const p of this.players.values()) {
      if (p.nickname.toLowerCase() === lower) return { error: 'Questo nickname è già in uso.' };
    }
    const player = { id, nickname, avatar: cleanAvatar(avatar), score: 0, streak: 0, correctCount: 0, last: null };
    this.players.set(id, player);
    return { player };
  }

  removePlayer(id) {
    const player = this.players.get(id);
    this.players.delete(id);
    this.answers.delete(id);
    return player;
  }

  playerList() {
    return [...this.players.values()].map((p) => p.nickname);
  }

  // Passa alla domanda successiva; restituisce false quando il quiz è finito.
  nextQuestion() {
    if (this.index + 1 >= this.total) {
      this.state = 'gameover';
      return false;
    }
    this.index += 1;
    this.answers.clear();
    this.state = 'getready';
    return true;
  }

  openQuestion() {
    this.state = 'question';
    this.questionStartedAt = this.now();
  }

  // Normalizza e controlla la risposta secondo il tipo di domanda.
  parseChoice(choice) {
    const q = this.question;
    const type = q.type || 'quiz';
    if (CHOICE_TYPES.has(type)) return Number.isInteger(choice) && choice >= 0 && choice < q.answers.length ? choice : null;
    if (type === 'ordina') return isPermutation(choice, q.items.length) ? choice.slice() : null;
    const n = Number(choice);
    return Number.isFinite(n) && n >= q.min && n <= q.max ? n : null;
  }

  submitAnswer(id, choice) {
    if (this.state !== 'question') return { error: 'Non è possibile rispondere ora.' };
    if (!this.players.has(id)) return { error: 'Giocatore sconosciuto.' };
    if (this.answers.has(id)) return { error: 'Hai già risposto.' };
    const parsed = this.parseChoice(choice);
    if (parsed === null) return { error: 'Risposta non valida.' };
    this.answers.set(id, { choice: parsed, elapsed: this.now() - this.questionStartedAt });
    return { ok: true, allAnswered: this.answers.size >= this.players.size };
  }

  // Chiude la domanda, assegna i punti e restituisce il riepilogo per l'host.
  closeQuestion() {
    this.state = 'results';
    const q = this.question;
    const type = q.type || 'quiz';
    const limit = q.time * 1000;
    const distribution = CHOICE_TYPES.has(type) ? q.answers.map(() => 0) : [0, 0]; // ordina/numero: [giusti, sbagliati]
    const guesses = [];

    for (const player of this.players.values()) {
      const answer = this.answers.get(player.id);
      let result = { correct: false, quality: 0 };
      if (answer) {
        result = evaluate(q, answer.choice);
        if (CHOICE_TYPES.has(type)) distribution[answer.choice] += 1;
        else distribution[result.correct ? 0 : 1] += 1;
        if (type === 'numero') guesses.push({ nickname: player.nickname, avatar: player.avatar, guess: answer.choice, distance: result.extra.distance });
      }
      let points = 0;
      const prevStreak = player.streak;
      if (result.correct) {
        player.streak += 1;
        player.correctCount += 1;
        points = Math.round(scoreFor(answer.elapsed, limit) * result.quality) + streakBonus(player.streak);
      } else {
        player.streak = 0;
      }
      player.score += points;
      player.last = {
        answered: Boolean(answer),
        correct: result.correct,
        close: Boolean(result.close),
        lostStreak: !result.correct && prevStreak >= 2,
        points,
        choice: answer ? answer.choice : null,
        ...(result.extra || {}),
      };
    }

    const ranking = this.ranking();
    ranking.forEach((p, i) => {
      p.last.rank = i + 1;
      p.last.behind = i > 0 ? { nickname: ranking[i - 1].nickname, gap: ranking[i - 1].score - p.score } : null;
    });

    guesses.sort((a, b) => a.distance - b.distance);
    return { correct: q.correct, distribution, answered: this.answers.size, closest: guesses.slice(0, 3), reveal: this.reveal() };
  }

  // Soluzione da mostrare dopo la chiusura della domanda.
  reveal() {
    const q = this.question;
    const type = q.type || 'quiz';
    let text;
    if (CHOICE_TYPES.has(type)) text = q.answers[q.correct];
    else if (type === 'ordina') text = q.correct.map((i) => q.items[i]).join(' → ');
    else text = `${formatNumber(q.answer, q.format)}${q.unit ? ` ${q.unit}` : ''}`;
    return { type, correct: q.correct, answer: q.answer, text, why: q.why || null };
  }

  ranking() {
    return [...this.players.values()].sort((a, b) => b.score - a.score || a.nickname.localeCompare(b.nickname));
  }

  scoreboard(limit = 5) {
    return this.ranking().slice(0, limit).map(({ nickname, avatar, score, correctCount }) => ({ nickname, avatar, score, correctCount }));
  }

  // Domanda senza la soluzione (da mandare ai giocatori).
  publicQuestion() {
    const q = this.question;
    const type = q.type || 'quiz';
    const out = {
      index: this.index, total: this.total, type, mode: q.mode || type, text: q.text, time: q.time,
      category: q.category, categoryEmoji: q.categoryEmoji, media: q.media || null,
    };
    if (CHOICE_TYPES.has(type)) Object.assign(out, { answers: q.answers, answerMedia: q.answerMedia || null });
    if (type === 'ordina') out.items = q.items;
    if (type === 'numero') Object.assign(out, { min: q.min, max: q.max, step: q.step ?? 1, tol: q.tol ?? 0, unit: q.unit || '', format: q.format || null });
    return out;
  }
}

function formatNumber(n, format) {
  if (format === 'year') return n < 0 ? `${-n} a.C.` : String(n);
  return Number(n).toLocaleString('it-IT');
}

const api = { Game, validateQuiz, validateQuestion, scoreFor, streakBonus, evaluate, formatNumber, MAX_NICKNAME };
if (typeof module !== 'undefined' && module.exports) module.exports = api;
else root.QuizGame = api;
})(typeof window !== 'undefined' ? window : globalThis);
