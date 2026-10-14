// Allenati da solo: una partita completa sul telefono, senza host, senza PIN e senza rete.
// Riusa il motore (game.js), la banca delle domande (bank.js) e i controlli condivisi (ui.js).
(() => {
  'use strict';
  const $ = (id) => document.getElementById(id);
  const { Game } = window.QuizGame;
  const Bank = window.QuizBank;
  const esc = UI.esc;

  const SETUP_KEY = 'quizzone.solo.setup';
  const BEST_KEY = 'quizzone.solo.best';
  const AVATAR_KEY = 'quizzone.avatar';
  const ME = 'me';
  const GET_READY_S = 3;
  const MAX_BEST = 40; // record ricordati (uno per combinazione di impostazioni)
  const SCREENS = ['s-setup', 's-getready', 's-question', 's-result', 's-end'];
  const IN_GAME = new Set(['s-getready', 's-question', 's-result']);
  const COUNTS = [5, 10, 15, 20];
  const SPEEDS = ['veloce', 'normale', 'rilassato'];

  // ---- Cosa offre la banca delle domande (letto ogni volta: nuove modalità compaiono da sole) ----
  // Le modalità pensate solo per più giocatori, se la banca le segnala, restano fuori.
  const MODES = Bank.modes.filter((m) => m.solo !== false && !m.multiplayer && !m.multiOnly);
  const MODE_BY_ID = Object.fromEntries(Bank.modes.map((m) => [m.id, m]));
  const TYPE_MODE = { quiz: 'quiz', vero_falso: 'vf', ordina: 'ordina', numero: 'numero', scrivi: 'scrivi' };
  const TYPE_LABEL = { scrivi: { emoji: '⌨️', name: 'Scrivi la risposta' }, ordina: { emoji: '🔢', name: 'Metti in ordine' }, numero: { emoji: '🎯', name: 'Indovina il numero' }, vero_falso: { emoji: '⚖️', name: 'Vero o falso' } };
  const modeOf = (q) => MODE_BY_ID[q.mode] || MODE_BY_ID[TYPE_MODE[q.type]] || TYPE_LABEL[q.type] || { emoji: '❓', name: 'Quiz' };
  const modeLabel = (q) => {
    const m = modeOf(q);
    return `${m.emoji} ${m.name}`;
  };

  const bankSource = [Bank.buildGame, ...Object.values(Bank)].filter((f) => typeof f === 'function').map(String).join('\n');
  function tryBuild(params) {
    try {
      return Bank.buildGame({ count: 3, ...params });
    } catch {
      return { error: 'eccezione' };
    }
  }
  const DIFFICULTIES = ['facile', 'media', 'difficile', 'mista'];
  const hasProgressive = Array.isArray(Bank.difficulties)
    ? Bank.difficulties.some((d) => (d?.id ?? d) === 'progressiva')
    : /progressiva/.test(bankSource) && !tryBuild({ difficulty: 'progressiva' }).error;
  if (hasProgressive) DIFFICULTIES.push('progressiva');
  const hasBonus = /\bbonus\b/.test(bankSource);

  // ---- Impostazioni (ricordate nel browser) ----
  const setup = loadSetup();

  function loadSetup() {
    const defaults = { categories: Bank.categories.map((c) => c.id), modes: MODES.map((m) => m.id), count: 10, difficulty: 'mista', speed: 'normale', bonus: false };
    let saved = null;
    try {
      saved = JSON.parse(localStorage.getItem(SETUP_KEY));
    } catch {}
    if (!saved || typeof saved !== 'object') return defaults;
    const pickIds = (value, all) => (value === 'all' ? all.slice() : Array.isArray(value) ? all.filter((id) => value.includes(id)) : all.slice());
    return {
      categories: pickIds(saved.categories, defaults.categories),
      modes: pickIds(saved.modes, defaults.modes),
      count: COUNTS.includes(saved.count) ? saved.count : defaults.count,
      difficulty: DIFFICULTIES.includes(saved.difficulty) ? saved.difficulty : defaults.difficulty,
      speed: SPEEDS.includes(saved.speed) ? saved.speed : defaults.speed,
      bonus: hasBonus && saved.bonus === true,
    };
  }
  // «Tutte» viene salvato come tale: le categorie o i giochi aggiunti in futuro restano inclusi.
  function saveSetup() {
    const allCats = setup.categories.length === Bank.categories.length;
    const allModes = setup.modes.length === MODES.length;
    try {
      localStorage.setItem(SETUP_KEY, JSON.stringify({ ...setup, categories: allCats ? 'all' : setup.categories, modes: allModes ? 'all' : setup.modes }));
    } catch {}
  }

  // Chiave del record: stesse scelte, stessa classifica personale.
  function setupKey(s) {
    const cats = s.categories.length === Bank.categories.length ? 'tutte' : [...s.categories].sort().join(',');
    const modes = s.modes.length === MODES.length ? 'tutti' : [...s.modes].sort().join(',');
    return [cats, modes, s.count, s.difficulty, s.speed, s.bonus ? 'x2' : 'x1'].join('|');
  }
  function loadBest() {
    try {
      const b = JSON.parse(localStorage.getItem(BEST_KEY));
      return b && typeof b === 'object' && !Array.isArray(b) ? b : {};
    } catch {
      return {};
    }
  }
  function saveBest(map) {
    const keys = Object.keys(map).sort((a, b) => (map[b].at || 0) - (map[a].at || 0));
    for (const k of keys.slice(MAX_BEST)) delete map[k];
    try {
      localStorage.setItem(BEST_KEY, JSON.stringify(map));
    } catch {}
  }

  const avatar = (() => {
    try {
      const a = localStorage.getItem(AVATAR_KEY);
      if (a && UI.AVATARS.includes(a)) return a;
    } catch {}
    return '🎯';
  })();

  // ---- Schermate ----
  // Musica: impostazioni → home, domanda → un brano diverso ogni volta, fine → finale.
  function show(id) {
    if (id === 's-question') UI.music?.next('question');
    else if (id === 's-setup') UI.music?.play('home');
    else if (id === 's-end') UI.music?.play('finale');
    else UI.music?.stop();
    for (const s of SCREENS) $(s).classList.toggle('hidden', s !== id);
    const inGame = IN_GAME.has(id);
    $('topbar').classList.toggle('hidden', !inGame);
    $('bottombar').classList.toggle('hidden', !inGame);
    document.body.classList.toggle('has-topbar', inGame);
    document.body.classList.toggle('solo-on-setup', id === 's-setup');
    document.body.classList.remove('result-correct', 'result-wrong', 'result-close');
    window.scrollTo(0, 0);
    $(id).scrollTop = 0;
  }

  // ---- Impostazioni: categorie, giochi, numero di domande, difficoltà, tempo, punti doppi ----
  function toggleIn(list, id) {
    const i = list.indexOf(id);
    if (i >= 0) list.splice(i, 1);
    else list.push(id);
  }

  function renderSetup() {
    const cg = $('cat-grid');
    cg.innerHTML = '';
    for (const c of Bank.categories) {
      const on = setup.categories.includes(c.id);
      const b = document.createElement('button');
      b.type = 'button';
      b.className = `cat-card${on ? ' sel' : ''}`;
      b.style.setProperty('--cc', c.color);
      b.title = c.description;
      b.setAttribute('aria-pressed', on);
      b.innerHTML = `<span class="cat-emoji">${esc(c.emoji)}</span><span class="cat-name">${esc(c.name)}</span>`;
      b.addEventListener('click', () => {
        toggleIn(setup.categories, c.id);
        changed();
      });
      cg.appendChild(b);
    }
    const mg = $('mode-grid');
    mg.innerHTML = '';
    for (const m of MODES) {
      const on = setup.modes.includes(m.id);
      const b = document.createElement('button');
      b.type = 'button';
      b.className = `mode-card${on ? ' sel' : ''}`;
      b.title = m.description;
      b.setAttribute('aria-pressed', on);
      b.innerHTML = `<span class="m-emoji">${esc(m.emoji)}</span><span><span class="m-name">${esc(m.name)}</span><br><span class="m-desc">${esc(m.description)}</span></span>`;
      b.addEventListener('click', () => {
        toggleIn(setup.modes, m.id);
        changed();
      });
      mg.appendChild(b);
    }
    document.querySelectorAll('[data-seg]').forEach((seg) => {
      seg.querySelectorAll('button').forEach((b) => {
        const on = String(setup[seg.dataset.seg]) === b.dataset.v;
        b.classList.toggle('active', on);
        b.setAttribute('aria-pressed', on);
      });
    });
    const bonus = $('bonus-toggle');
    bonus.classList.toggle('hidden', !hasBonus);
    bonus.classList.toggle('on', setup.bonus);
    bonus.setAttribute('aria-checked', setup.bonus);

    const nc = setup.categories.length;
    const nm = setup.modes.length;
    $('setup-summary').textContent = `${setup.count} domande · ${nc} ${nc === 1 ? 'categoria' : 'categorie'} · ${nm} ${nm === 1 ? 'gioco' : 'giochi'}`;
    $('btn-start').disabled = nc === 0 || nm === 0;

    const best = loadBest()[setupKey(setup)];
    $('setup-best').classList.toggle('hidden', !best);
    if (best) $('setup-best').textContent = `🏆 Record: ${best.score.toLocaleString('it-IT')} punti (${best.correct}/${best.total} giuste)`;
  }

  function changed() {
    UI.sound('tap');
    $('setup-error').classList.add('hidden');
    saveSetup();
    renderSetup();
  }

  $('seg-difficulty').querySelector('[data-v=progressiva]').classList.toggle('hidden', !hasProgressive);
  document.querySelectorAll('[data-seg]').forEach((seg) => {
    seg.querySelectorAll('button').forEach((b) => {
      b.addEventListener('click', () => {
        setup[seg.dataset.seg] = seg.dataset.seg === 'count' ? Number(b.dataset.v) : b.dataset.v;
        changed();
      });
    });
  });
  $('bonus-toggle').addEventListener('click', () => {
    setup.bonus = !setup.bonus;
    changed();
  });
  $('cat-all').onclick = () => { setup.categories = Bank.categories.map((c) => c.id); changed(); };
  $('cat-none').onclick = () => { setup.categories = []; changed(); };
  $('mode-all').onclick = () => { setup.modes = MODES.map((m) => m.id); changed(); };
  $('mode-none').onclick = () => { setup.modes = []; changed(); };

  function showSetup() {
    stopTimers();
    keepAwake(false);
    play.game = null;
    renderSetup();
    show('s-setup');
  }

  // ---- Partita ----
  const play = {
    game: null,
    key: '',
    countdown: null, // intervallo del «Preparati!»
    deadline: null, // fine del tempo della domanda
    revealing: null, // breve pausa tra risposta e risultato
    ring: null, // timer ad anello di ui.js
    input: null, // { lock } del controllo di risposta
    answered: false,
    bestStreak: 0,
  };

  function stopTimers() {
    clearInterval(play.countdown);
    clearTimeout(play.deadline);
    clearTimeout(play.revealing);
    play.ring?.stop();
    play.countdown = play.deadline = play.revealing = play.ring = null;
  }

  function startGame() {
    if (!setup.categories.length || !setup.modes.length) return;
    const params = {
      categories: setup.categories.slice(),
      modes: setup.modes.slice(),
      count: setup.count,
      difficulty: setup.difficulty,
      speed: setup.speed,
    };
    if (setup.bonus) params.bonus = true;
    let quiz;
    try {
      quiz = Bank.buildGame(params);
    } catch {
      quiz = { error: 'Non sono riuscito a creare le domande. Riprova.' };
    }
    if (!quiz || quiz.error) {
      const box = $('setup-error');
      box.textContent = quiz?.error || 'Non sono riuscito a creare le domande. Riprova.';
      box.classList.remove('hidden');
      show('s-setup');
      box.scrollIntoView({ block: 'center' });
      return;
    }
    stopTimers();
    play.game = new Game('solo', quiz);
    play.game.addPlayer(ME, 'Tu', avatar);
    play.key = setupKey(setup);
    play.bestStreak = 0;
    $('bb-avatar').textContent = avatar;
    updateBars();
    UI.sound('start');
    keepAwake(true);
    nextRound();
  }

  const me = () => play.game.players.get(ME);

  function updateBars(bump) {
    const g = play.game;
    if (!g) return;
    $('top-progress').textContent = `${Math.max(g.index + 1, 1)} / ${g.total}`;
    const p = me();
    $('bb-score').textContent = p.score.toLocaleString('it-IT');
    $('bb-streak').textContent = `🔥 ${p.streak}`;
    $('bb-streak').classList.toggle('hidden', p.streak < 2);
    if (bump) {
      $('bb-score').classList.remove('bump');
      void $('bb-score').offsetWidth;
      $('bb-score').classList.add('bump');
    }
  }

  function nextRound() {
    stopTimers();
    if (!play.game.nextQuestion()) return showEnd();
    getReady();
  }

  function getReady() {
    const g = play.game;
    const q = g.publicQuestion();
    updateBars();
    UI.preload(q.media);
    (q.answerMedia || []).forEach((src) => UI.preload({ kind: 'image', src }));
    $('gr-mode').textContent = modeLabel(q);
    $('gr-double').classList.toggle('hidden', !q.double);
    $('gr-title').textContent = `Domanda ${q.index + 1} di ${q.total}`;
    let left = GET_READY_S;
    $('gr-count').textContent = left;
    show('s-getready');
    if (q.double) UI.vibrate([30, 40, 30]);
    play.countdown = setInterval(() => {
      left -= 1;
      if (left <= 0) {
        clearInterval(play.countdown);
        play.countdown = null;
        showQuestion();
      } else {
        $('gr-count').textContent = left;
        UI.sound('tick');
      }
    }, 1000);
  }

  function showQuestion() {
    const g = play.game;
    const q = g.publicQuestion();
    play.answered = false;
    $('q-cat').textContent = `${q.categoryEmoji || ''} ${q.category || ''}`.trim();
    $('q-cat').classList.toggle('hidden', !q.category);
    $('q-mode').textContent = modeLabel(q);
    $('q-double').classList.toggle('hidden', !q.double);
    $('q-text').textContent = q.text;
    UI.renderMedia($('q-media'), q.media);
    $('s-question').classList.toggle('with-media', Boolean(q.media));
    show('s-question');
    play.input = UI.renderAnswerInput($('answers'), q, onAnswer);
    g.openQuestion();
    play.ring = UI.timer($('q-timer'), q.time, { onTick: (s) => s <= 3 && s > 0 && UI.sound('tick') });
    // Il timer ad anello è solo grafico: la scadenza vera è questa.
    play.deadline = setTimeout(timeUp, q.time * 1000 + 150);
  }

  function onAnswer(choice) {
    if (play.answered || !play.game || play.game.state !== 'question') return;
    play.answered = true;
    clearTimeout(play.deadline);
    play.ring?.stop();
    play.game.submitAnswer(ME, choice); // una risposta non valida conta come non data
    UI.sound('sent');
    UI.vibrate(25);
    play.revealing = setTimeout(reveal, 450);
  }

  function timeUp() {
    if (play.answered || !play.game || play.game.state !== 'question') return;
    play.answered = true;
    play.input?.lock(null);
    reveal();
  }

  const pick = (arr) => arr[Math.floor(Math.random() * arr.length)];

  function reveal() {
    stopTimers();
    const g = play.game;
    const q = g.publicQuestion();
    const summary = g.closeQuestion();
    const p = me();
    const r = p.last;
    const reveal = summary.reveal || {};
    play.bestStreak = Math.max(play.bestStreak, p.streak);

    show('s-result');
    const kind = r.correct ? 'correct' : r.close ? 'close' : 'wrong';
    document.body.classList.add(`result-${kind}`);
    $('res-title').textContent = r.correct
      ? pick(['Corretto!', 'Esatto!', 'Grande!', 'Bravissimo!'])
      : r.close ? 'C\'eri quasi!' : r.answered ? 'Sbagliato' : 'Tempo scaduto';
    $('res-icon').textContent = r.correct ? '✓' : r.close ? '≈' : r.answered ? '✗' : '⏱';
    $('res-points').textContent = r.correct ? `+ ${r.points.toLocaleString('it-IT')}` : 'Nessun punto';
    $('res-double').classList.toggle('hidden', !(r.correct && summary.double));
    $('res-typo').classList.toggle('hidden', !(r.correct && r.typo));

    const streak = $('res-streak');
    if (r.correct && p.streak >= 2) streak.textContent = `🔥 Combo di ${p.streak} risposte giuste`;
    else if (r.lostStreak) streak.textContent = '💔 Combo persa';
    streak.classList.toggle('hidden', !((r.correct && p.streak >= 2) || r.lostStreak));

    $('res-solution').innerHTML = solutionHtml(q, r, reveal);
    $('res-solution').classList.toggle('hidden', !$('res-solution').innerHTML);
    $('res-why').textContent = reveal.why || '';
    $('res-why').classList.toggle('hidden', !reveal.why);
    UI.renderCredit($('res-credit'), reveal.credit);
    $('res-total').innerHTML = `Totale: <b>${p.score.toLocaleString('it-IT')}</b> punti · ${p.correctCount}/${g.index + 1} giuste`;
    const last = g.index + 1 >= g.total;
    $('btn-next').textContent = last ? 'Risultato finale 🏁' : 'Avanti ▶';
    updateBars(r.points > 0);
    $('btn-next').focus({ preventScroll: true });

    if (r.correct) {
      UI.sound('correct');
      UI.vibrate(60);
      UI.confetti({ count: 70, duration: 1800 });
    } else {
      UI.sound(r.close ? 'close' : 'wrong');
      UI.vibrate([80, 60, 80]);
    }
  }

  // Soluzione, con la risposta data quando aiuta a capire l'errore.
  function solutionHtml(q, r, reveal) {
    const text = esc(reveal.text ?? '');
    const you = (s) => `<br><small class="solo-you">${s}</small>`;
    if (reveal.type === 'numero') {
      return `<small>La risposta</small>${text}${r.answered ? you(`Tu hai detto ${esc(UI.formatNumber(r.guess ?? r.choice, q.format))}${q.unit ? ` ${esc(q.unit)}` : ''}`) : ''}`;
    }
    if (reveal.type === 'ordina') {
      const n = Array.isArray(reveal.correct) ? reveal.correct.length : (q.items || []).length;
      return `<small>L'ordine giusto</small>${text}${r.answered && !r.correct ? you(`Posizioni giuste: ${r.positionsRight ?? 0} su ${n}`) : ''}`;
    }
    if (reveal.type === 'scrivi') {
      if (r.correct) return r.typo ? `<small>Si scrive</small>${text}` : '';
      return `<small>La risposta giusta</small>${text}${r.answered && typeof r.choice === 'string' ? you(`Tu hai scritto «${esc(r.choice)}»`) : ''}`;
    }
    return !r.correct && reveal.text ? `<small>La risposta giusta</small>${text}` : '';
  }

  // ---- Fine partita ----
  function showEnd() {
    stopTimers();
    keepAwake(false);
    const g = play.game;
    const p = me();
    const total = g.total;
    const accuracy = total ? Math.round((p.correctCount / total) * 100) : 0;
    const best = loadBest();
    const prev = best[play.key];
    const record = p.score > 0 && (!prev || p.score > prev.score);
    if (record) {
      best[play.key] = { score: p.score, correct: p.correctCount, total, at: Date.now() };
      saveBest(best);
    }

    $('end-medal').textContent = record ? '🏆' : accuracy >= 90 ? '🥇' : accuracy >= 70 ? '🥈' : accuracy >= 50 ? '🥉' : '💪';
    $('end-title').textContent = accuracy >= 90 ? 'Da campione!' : accuracy >= 70 ? 'Ottimo lavoro!' : accuracy >= 50 ? 'Bella partita!' : 'Continua ad allenarti!';
    $('end-record').classList.toggle('hidden', !record);
    $('end-score').textContent = p.score.toLocaleString('it-IT');
    $('end-correct').textContent = `${p.correctCount}/${total}`;
    $('end-accuracy').textContent = `${accuracy}%`;
    $('end-streak').textContent = play.bestStreak >= 2 ? `🔥 ${play.bestStreak}` : String(play.bestStreak);
    $('end-best').textContent = record
      ? (prev ? `Record precedente: ${prev.score.toLocaleString('it-IT')} punti` : 'Il tuo primo record con queste impostazioni!')
      : prev ? `Il tuo record: ${prev.score.toLocaleString('it-IT')} punti (${prev.correct}/${prev.total} giuste)` : '';
    $('end-best').classList.toggle('hidden', !$('end-best').textContent);
    show('s-end');
    if (record) {
      UI.sound('podium');
      UI.vibrate([60, 50, 60, 50, 120]);
      UI.confetti({ count: 200, duration: 4000 });
    } else {
      UI.sound(accuracy >= 50 ? 'correct' : 'close');
    }
  }

  // ---- Pulsanti ----
  $('btn-start').addEventListener('click', startGame);
  $('btn-next').addEventListener('click', () => {
    if (play.game && play.game.state === 'results') {
      UI.sound('tap');
      nextRound();
    }
  });
  $('btn-again').addEventListener('click', startGame);
  $('btn-setup').addEventListener('click', showSetup);
  $('btn-exit').addEventListener('click', () => {
    if (!play.game) return showSetup();
    // Il conto alla rovescia continua mentre il messaggio è aperto: lo fermiamo solo se si esce davvero.
    if (confirm('Vuoi uscire dall\'allenamento? La partita in corso andrà persa.')) showSetup();
  });

  // ---- Schermo sempre acceso durante la partita (se il browser lo permette) ----
  let wakeLock = null;
  async function keepAwake(on) {
    try {
      if (on && !wakeLock && navigator.wakeLock && document.visibilityState === 'visible') {
        wakeLock = await navigator.wakeLock.request('screen');
        wakeLock.addEventListener('release', () => (wakeLock = null));
      } else if (!on && wakeLock) {
        const w = wakeLock;
        wakeLock = null;
        await w.release();
      }
    } catch {}
  }
  document.addEventListener('visibilitychange', () => {
    if (document.visibilityState === 'visible' && play.game && play.game.state !== 'gameover') keepAwake(true);
  });

  UI.installSoundToggle();
  showSetup();
})();
