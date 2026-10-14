(() => {
  const $ = (id) => document.getElementById(id);
  const screens = ['s-pin', 's-nick', 's-lobby', 's-getready', 's-question', 's-sent', 's-result', 's-gameover', 's-message'];
  const SESSION_KEY = 'quizzone.player';
  const SESSION_MAX_AGE = 3 * 60 * 60 * 1000;
  const HEARTBEAT_MS = 5000;
  const HOST_SILENT_MS = 20000; // dopo questo silenzio mostriamo «mi ricollego…»
  const HOST_GONE_MS = 90000; // dopo questo silenzio la partita è considerata chiusa
  // Messaggi che cambiano schermata: se ne arriva uno più vecchio di quello già mostrato, lo ignoriamo.
  const STATE_TYPES = new Set(['getready', 'question', 'results', 'result', 'wait', 'final']);

  const state = {
    sk: null, // chiave segreta del telefono: identifica il giocatore presso l'host
    pin: null,
    nickname: null,
    score: 0,
    bus: null,
    hostKey: null,
    joined: false,
    finished: false,
    question: null,
    view: { phase: 'lobby', index: -1 },
    mismatches: 0,
    lastStateSeq: 0,
    lastHostMsg: 0,
    waiting: null,
    answer: null,
    countdown: null,
    timer: null,
  };

  const QUIPS = [
    'Sei veloce come un fulmine?',
    'Incrociamo le dita…',
    'Chissà se hai indovinato!',
    'Vediamo cosa hanno risposto gli altri…',
  ];

  // ---- Interfaccia ----
  function show(id) {
    for (const s of screens) $(s).classList.toggle('hidden', s !== id);
    const inGame = !['s-pin', 's-nick', 's-message'].includes(id);
    $('bottombar').classList.toggle('hidden', !inGame);
    $('topbar').classList.toggle('hidden', !inGame);
    document.body.className = '';
  }

  function showError(el, message) {
    el.textContent = message;
    el.classList.remove('hidden');
    clearTimeout(el._t);
    el._t = setTimeout(() => el.classList.add('hidden'), 6000);
  }

  function setBusy(form, busy, label) {
    form.querySelectorAll('button, input').forEach((el) => (el.disabled = busy));
    const btn = form.querySelector('button');
    btn.dataset.label = btn.dataset.label || btn.textContent;
    btn.textContent = busy ? label : btn.dataset.label;
  }

  function updateBars() {
    $('top-pin').textContent = `PIN: ${state.pin}`;
    $('top-progress').textContent = state.question ? `${state.question.index + 1} di ${state.question.total}` : '';
    $('bb-nick').textContent = state.nickname;
    $('bb-score').textContent = state.score;
  }

  function stopTimers() {
    clearInterval(state.countdown);
    clearInterval(state.timer);
  }

  function setReconnecting(on) {
    $('reconnect').classList.toggle('hidden', !on);
  }

  function finish(title, body) {
    stopTimers();
    state.finished = true;
    clearSession();
    setReconnecting(false);
    if (state.bus) {
      const bus = state.bus;
      state.bus = null;
      setTimeout(() => bus.close(), 1000);
    }
    if (title) {
      $('msg-title').textContent = title;
      $('msg-body').textContent = body;
      show('s-message');
    }
  }

  // ---- Sessione salvata: si rientra in partita anche dopo aver ricaricato la pagina ----
  function saveSession() {
    try {
      localStorage.setItem(SESSION_KEY, JSON.stringify({
        pin: state.pin, sk: QuizNet.toHex(state.sk), nickname: state.nickname, at: Date.now(),
      }));
    } catch {}
  }
  function loadSession() {
    try {
      const s = JSON.parse(localStorage.getItem(SESSION_KEY));
      return s && s.sk && Date.now() - s.at < SESSION_MAX_AGE ? s : null;
    } catch {
      return null;
    }
  }
  function clearSession() {
    try {
      localStorage.removeItem(SESSION_KEY);
    } catch {}
  }

  // ---- Rete ----
  function openBus(pin) {
    if (state.bus) state.bus.close();
    state.sk = state.sk || QuizNet.newSecretKey();
    state.pin = pin;
    state.hostKey = null;
    state.lastStateSeq = 0;
    state.bus = new QuizNet.Bus({
      secretKey: state.sk,
      listenTag: QuizNet.playersTag(pin),
      sendTag: QuizNet.hostTag(pin),
      onMessage,
    });
    return state.bus;
  }

  function send(msg) {
    state.bus?.send(msg);
  }

  // Invia un messaggio e lo ripete finché non arriva una delle risposte attese.
  function request(msg, types, timeoutMs, everyMs) {
    return new Promise((resolve, reject) => {
      const attempt = () => send(msg);
      attempt();
      const iv = setInterval(attempt, everyMs);
      const to = setTimeout(() => done(null), timeoutMs);
      function done(reply) {
        clearInterval(iv);
        clearTimeout(to);
        if (state.waiting?.done === done) state.waiting = null;
        reply ? resolve(reply) : reject(new Error('timeout'));
      }
      state.waiting = { types, done };
    });
  }

  // Segnale di vita all'host e controllo che l'host risponda ancora.
  setInterval(() => {
    if (!state.joined || state.finished || !state.bus) return;
    send({ t: 'hb' });
    const silent = Date.now() - state.lastHostMsg;
    if (silent > HOST_GONE_MS) return finish('Partita terminata', "L'organizzatore non è più raggiungibile.");
    if (silent > HOST_SILENT_MS) {
      setReconnecting(true);
      send({ t: 'rejoin', nickname: state.nickname });
    }
  }, HEARTBEAT_MS);

  // Tornando sull'app dopo averla lasciata in sottofondo chiediamo subito lo stato attuale.
  document.addEventListener('visibilitychange', () => {
    if (document.visibilityState === 'visible' && state.joined && !state.finished) {
      send({ t: 'rejoin', nickname: state.nickname });
    }
  });

  function onMessage(from, msg) {
    if (state.finished) return;
    // Finché non conosciamo l'host accettiamo solo risposte indirizzate a noi.
    if (state.hostKey ? from !== state.hostKey : msg.to === '*') return;
    if (!state.hostKey && ['welcome', 'joined'].includes(msg.t)) state.hostKey = from;

    state.lastHostMsg = Date.now();
    setReconnecting(false);

    if (STATE_TYPES.has(msg.t)) {
      if (msg.seq < state.lastStateSeq) return;
      state.lastStateSeq = msg.seq;
    }
    if (state.waiting?.types.includes(msg.t)) state.waiting.done(msg);
    handlers[msg.t]?.(msg);
  }

  // ---- PIN e nickname ----
  async function checkPin(pin) {
    const form = $('pin-form');
    setBusy(form, true, 'Ricerca…');
    try {
      const bus = openBus(pin);
      try {
        await bus.ready(12000);
      } catch {
        throw new Error('network');
      }
      await request({ t: 'hello' }, ['welcome'], 10000, 2000);
      show('s-nick');
      $('nick-input').focus();
    } catch (err) {
      state.bus?.close();
      state.bus = null;
      showError($('pin-error'), err.message === 'network'
        ? 'Connessione non riuscita. Controlla la rete e riprova.'
        : 'Non abbiamo trovato nessuna partita con questo PIN. Controlla e riprova.');
    } finally {
      setBusy(form, false);
    }
  }

  $('pin-form').addEventListener('submit', (e) => {
    e.preventDefault();
    const pin = $('pin-input').value.replace(/\D/g, '');
    if (!pin) return showError($('pin-error'), 'Inserisci il PIN del gioco.');
    checkPin(pin);
  });

  $('nick-form').addEventListener('submit', async (e) => {
    e.preventDefault();
    const nickname = $('nick-input').value;
    if (!nickname.trim()) return showError($('nick-error'), 'Inserisci un nickname.');
    setBusy($('nick-form'), true, 'Entro…');
    try {
      await request({ t: 'join', nickname }, ['joined', 'joinError', 'kicked'], 15000, 3000);
    } catch {
      showError($('nick-error'), 'Nessuna risposta dalla partita. Riprova.');
    } finally {
      setBusy($('nick-form'), false);
    }
  });

  // ---- Messaggi dall'host ----
  const handlers = {
    joined(msg) {
      const firstTime = !state.joined;
      state.joined = true;
      state.nickname = msg.nickname;
      state.score = msg.score || 0;
      saveSession();
      QuizNet.keepScreenOn();
      updateBars();
      if (msg.snapshot) {
        state.lastStateSeq = Math.max(state.lastStateSeq, msg.seq || 0);
        handlers[msg.snapshot.t]?.(msg.snapshot);
      } else if (firstTime || state.view.phase !== 'lobby' || !$('s-lobby').classList.contains('hidden')) {
        $('lobby-title').textContent = 'Eccoti!';
        $('lobby-sub').textContent = 'Vedi il tuo nickname sullo schermo?';
        state.view = { phase: 'lobby', index: -1 };
        show('s-lobby');
      }
    },

    joinError({ message: text }) {
      show('s-nick');
      showError($('nick-error'), text);
    },

    rejoinFailed({ message: text }) {
      state.joined = false;
      clearSession();
      setReconnecting(false);
      show('s-nick');
      showError($('nick-error'), `${text} Scegli un altro nickname.`);
    },

    // Segnale di vita dell'host: se mostriamo una fase diversa per due volte di fila,
    // probabilmente abbiamo perso un messaggio e chiediamo di rimetterci in pari.
    hb({ phase, index }) {
      if (!state.joined) return;
      if (phase === state.view.phase && index === state.view.index) {
        state.mismatches = 0;
      } else if (++state.mismatches >= 2) {
        state.mismatches = 0;
        send({ t: 'rejoin', nickname: state.nickname });
      }
    },

    wait({ index }) {
      state.view = { phase: 'results', index };
      $('lobby-title').textContent = 'Sei dentro!';
      $('lobby-sub').textContent = 'Attendi la prossima domanda.';
      show('s-lobby');
    },

    getready({ index, total, ms }) {
      state.view = { phase: 'getready', index };
      state.question = { index, total };
      updateBars();
      $('gr-title').textContent = `Domanda ${index + 1}`;
      let left = Math.max(1, Math.round(ms / 1000));
      $('gr-count').textContent = left;
      stopTimers();
      state.countdown = setInterval(() => {
        left -= 1;
        if (left <= 0) clearInterval(state.countdown);
        $('gr-count').textContent = Math.max(left, 0);
      }, 1000);
      show('s-getready');
    },

    question(q) {
      const same = state.view.phase === 'question' && state.view.index === q.index;
      // Già sulla stessa domanda (es. dopo un riallineamento): non ridisegniamo i pulsanti.
      if (same && !q.answered) return;
      state.view = { phase: 'question', index: q.index };
      if (state.answer && state.answer.q !== q.index) {
        clearInterval(state.answer.timer);
        state.answer = null;
      }
      stopTimers();
      state.question = q;
      updateBars();
      if (q.answered) return showSent();

      $('q-text').textContent = q.text;
      let left = Math.max(0, Math.round(q.remaining / 1000));
      $('q-timer').textContent = left;
      state.timer = setInterval(() => {
        left -= 1;
        $('q-timer').textContent = Math.max(left, 0);
        if (left <= 0) clearInterval(state.timer);
      }, 1000);

      const grid = $('answers');
      grid.classList.toggle('two', q.answers.length === 2);
      grid.innerHTML = '';
      q.answers.forEach((text, i) => {
        const btn = document.createElement('button');
        btn.className = `answer-btn c${i}`;
        btn.setAttribute('aria-label', `${SHAPE_NAMES[i]}: ${text}`);
        btn.innerHTML = `${SHAPES[i]}<span class="answer-label">${escapeHtml(text)}</span>`;
        btn.addEventListener('click', () => answer(q.index, i));
        grid.appendChild(btn);
      });
      show('s-question');
    },

    answerAck({ q, ok }) {
      if (state.answer?.q === q) {
        clearInterval(state.answer.timer);
        state.answer = null;
      }
      if (ok && state.view.phase === 'question' && state.view.index === q) showSent();
    },

    results({ index, results }) {
      const mine = results[state.bus?.pubkey];
      if (mine) handlers.result(mine);
      else handlers.wait({ index });
    },

    result(r) {
      stopTimers();
      clearInterval(state.answer?.timer);
      state.answer = null;
      state.view = { phase: 'results', index: r.index };
      state.score = r.score;
      updateBars();
      show('s-result');
      document.body.className = r.correct ? 'result-correct' : 'result-wrong';
      $('res-title').textContent = r.correct ? 'Corretto' : r.answered ? 'Sbagliato' : 'Tempo scaduto';
      $('res-icon').textContent = r.correct ? '✓' : '✗';
      $('res-points').textContent = r.correct ? `+ ${r.points}` : 'Nessun punto';
      $('res-answer').textContent = r.correct ? '' : `Risposta giusta: ${r.correctText}`;

      const streak = $('res-streak');
      if (r.correct && r.streak >= 2) {
        streak.textContent = `🔥 Combo di risposte: ${r.streak}`;
        streak.classList.remove('hidden');
      } else if (!r.correct && r.answered) {
        streak.textContent = 'Combo persa';
        streak.classList.remove('hidden');
      } else {
        streak.classList.add('hidden');
      }

      // «Podio» solo se c'è davvero una gara per il podio (più di 3 giocatori) e hai punti.
      const podium = r.rank <= 3 && r.score > 0 && r.players > 3;
      $('res-rank').textContent = podium ? `Sei sul podio! (${r.rank}° posto)` : `Sei al ${r.rank}° posto`;
      if (!r.behind) $('res-behind').textContent = r.score > 0 ? 'Sei in testa! Continua così.' : '';
      else if (r.behind.gap === 0) $('res-behind').textContent = `Pari con ${r.behind.nickname}`;
      else $('res-behind').textContent = `${r.behind.gap <= 300 ? 'A soli' : 'A'} ${r.behind.gap} punti da ${r.behind.nickname}`;
    },

    final({ ranking }) {
      const pos = ranking.findIndex(([key]) => key === state.bus?.pubkey);
      const rank = pos + 1;
      const score = pos >= 0 ? ranking[pos][1] : state.score;
      state.score = score;
      updateBars();
      finish();
      show('s-gameover');
      const medals = ['🥇', '🥈', '🥉'];
      $('go-title').textContent = rank > 0 && rank <= 3 ? 'Fantastico!' : 'Bella partita!';
      $('go-medal').textContent = medals[rank - 1] || '🎉';
      $('go-rank').textContent = rank > 0 ? `${rank}° posto su ${ranking.length}` : 'Partita conclusa';
      $('go-score').textContent = `Punteggio finale: ${score} punti`;
    },

    kicked() {
      finish('Sei stato rimosso', "L'organizzatore ti ha rimosso dalla partita.");
    },

    ended() {
      finish('Partita terminata', "L'organizzatore ha chiuso la partita.");
    },
  };

  function showSent() {
    clearInterval(state.timer);
    $('sent-quip').textContent = QUIPS[Math.floor(Math.random() * QUIPS.length)];
    show('s-sent');
  }

  // La risposta viene ripetuta finché l'host non conferma di averla ricevuta.
  function answer(index, choice) {
    if (state.answer?.q === index) return;
    document.querySelectorAll('#answers .answer-btn').forEach((b, i) => {
      b.disabled = true;
      b.classList.toggle('dim', i !== choice);
    });
    const msg = { t: 'answer', q: index, choice };
    send(msg);
    let tries = 1;
    state.answer = {
      q: index,
      timer: setInterval(() => {
        if (++tries > 5) return clearInterval(state.answer.timer);
        send(msg);
      }, 2000),
    };
  }

  // ---- Avvio: PIN nell'URL (/?pin=123456) o sessione da riprendere ----
  async function resume(saved) {
    state.sk = QuizNet.fromHex(saved.sk);
    state.nickname = saved.nickname;
    state.joined = true;
    state.lastHostMsg = Date.now();
    openBus(saved.pin);
    updateBars();
    $('lobby-title').textContent = 'Bentornato!';
    $('lobby-sub').textContent = 'Mi ricollego alla partita…';
    show('s-lobby');
    try {
      await request({ t: 'rejoin', nickname: saved.nickname }, ['joined', 'rejoinFailed', 'kicked'], 30000, 3000);
    } catch {
      finish('Partita terminata', "L'organizzatore non è più raggiungibile.");
    }
  }

  const urlPin = (new URLSearchParams(location.search).get('pin') || '').replace(/\D/g, '');
  const saved = loadSession();
  if (saved && (!urlPin || urlPin === saved.pin)) {
    resume(saved);
  } else if (urlPin) {
    $('pin-input').value = urlPin;
    checkPin(urlPin);
  }
})();
