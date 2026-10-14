'use strict';

// Logica di gioco pura: nessun socket e nessun timer qui dentro, così è testabile.
// Il server (server.js) collega gli eventi Socket.IO e i timer a questa classe.

const MAX_NICKNAME = 15;
const BASE_POINTS = 1000;
const STREAK_BONUS = 100;
const MAX_STREAK_BONUS = 500;

function validateQuiz(quiz) {
  if (!quiz || typeof quiz.title !== 'string' || !quiz.title.trim()) {
    return 'Il quiz deve avere un titolo.';
  }
  if (!Array.isArray(quiz.questions) || quiz.questions.length === 0) {
    return 'Il quiz deve contenere almeno una domanda.';
  }
  for (const [i, q] of quiz.questions.entries()) {
    const n = i + 1;
    if (typeof q.text !== 'string' || !q.text.trim()) return `La domanda ${n} non ha testo.`;
    if (!Array.isArray(q.answers) || q.answers.length < 2 || q.answers.length > 4) {
      return `La domanda ${n} deve avere da 2 a 4 risposte.`;
    }
    if (q.answers.some((a) => typeof a !== 'string' || !a.trim())) {
      return `La domanda ${n} ha una risposta vuota.`;
    }
    if (!Number.isInteger(q.correct) || q.correct < 0 || q.correct >= q.answers.length) {
      return `La domanda ${n} non ha una risposta corretta valida.`;
    }
    if (!Number.isFinite(q.time) || q.time < 5 || q.time > 240) {
      return `Il tempo della domanda ${n} deve essere tra 5 e 240 secondi.`;
    }
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

class Game {
  constructor(pin, quiz, now = Date.now) {
    this.pin = pin;
    this.quiz = quiz;
    this.now = now;
    this.state = 'lobby';
    this.index = -1;
    this.players = new Map(); // id -> { id, nickname, score, streak, last }
    this.answers = new Map(); // id -> { choice, elapsed }
    this.questionStartedAt = 0;
  }

  get question() {
    return this.quiz.questions[this.index];
  }

  get total() {
    return this.quiz.questions.length;
  }

  addPlayer(id, rawNickname) {
    if (this.state !== 'lobby') return { error: 'La partita è già iniziata.' };
    const nickname = String(rawNickname ?? '').trim().replace(/\s+/g, ' ');
    if (!nickname) return { error: 'Inserisci un nickname.' };
    if (nickname.length > MAX_NICKNAME) {
      return { error: `Il nickname può avere al massimo ${MAX_NICKNAME} caratteri.` };
    }
    const lower = nickname.toLowerCase();
    for (const p of this.players.values()) {
      if (p.nickname.toLowerCase() === lower) return { error: 'Questo nickname è già in uso.' };
    }
    const player = { id, nickname, score: 0, streak: 0, last: null };
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

  submitAnswer(id, choice) {
    if (this.state !== 'question') return { error: 'Non è possibile rispondere ora.' };
    if (!this.players.has(id)) return { error: 'Giocatore sconosciuto.' };
    if (this.answers.has(id)) return { error: 'Hai già risposto.' };
    if (!Number.isInteger(choice) || choice < 0 || choice >= this.question.answers.length) {
      return { error: 'Risposta non valida.' };
    }
    this.answers.set(id, { choice, elapsed: this.now() - this.questionStartedAt });
    return { ok: true, allAnswered: this.answers.size >= this.players.size };
  }

  // Chiude la domanda, assegna i punti e restituisce il riepilogo per l'host.
  closeQuestion() {
    this.state = 'results';
    const q = this.question;
    const limit = q.time * 1000;
    const distribution = q.answers.map(() => 0);

    for (const player of this.players.values()) {
      const answer = this.answers.get(player.id);
      if (answer) distribution[answer.choice] += 1;
      const correct = Boolean(answer) && answer.choice === q.correct;
      let points = 0;
      if (correct) {
        player.streak += 1;
        points = scoreFor(answer.elapsed, limit) + streakBonus(player.streak);
      } else {
        player.streak = 0;
      }
      player.score += points;
      player.last = { answered: Boolean(answer), correct, points, choice: answer?.choice ?? null };
    }

    const ranking = this.ranking();
    ranking.forEach((p, i) => {
      p.last.rank = i + 1;
      p.last.behind = i > 0 ? { nickname: ranking[i - 1].nickname, gap: ranking[i - 1].score - p.score } : null;
    });

    return { correct: q.correct, distribution, answered: this.answers.size };
  }

  ranking() {
    return [...this.players.values()].sort((a, b) => b.score - a.score || a.nickname.localeCompare(b.nickname));
  }

  scoreboard(limit = 5) {
    return this.ranking().slice(0, limit).map(({ nickname, score }) => ({ nickname, score }));
  }

  // Domanda senza indicazione della risposta corretta (da mandare ai client).
  publicQuestion() {
    const q = this.question;
    return { index: this.index, total: this.total, text: q.text, answers: q.answers, time: q.time, type: q.type };
  }
}

module.exports = { Game, validateQuiz, scoreFor, streakBonus, MAX_NICKNAME };
