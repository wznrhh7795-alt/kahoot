(() => {
  const $ = (id) => document.getElementById(id);
  const screens = ['s-pin', 's-nick', 's-lobby', 's-getready', 's-question', 's-sent', 's-result', 's-gameover', 's-message'];
  const SESSION_KEY = 'quizzone.player';
  const AVATAR_KEY = 'quizzone.avatar';
  const SESSION_MAX_AGE = 3 * 60 * 60 * 1000;
  const HEARTBEAT_MS = 5000;
  const HOST_SILENT_MS = 20000; // dopo questo silenzio mostriamo «mi ricollego…»
  const HOST_GONE_MS = 90000; // dopo questo silenzio la partita è considerata chiusa
  // Messaggi che cambiano schermata: se ne arriva uno più vecchio di quello già mostrato, lo ignoriamo.
  const STATE_TYPES = new Set(['getready', 'question', 'results', 'result', 'wait', 'final']);
  const MODE_LABELS = {
    quiz: '❓ Quiz', vf: '⚖️ Vero o falso', immagine: '🖼️ Indovina dall\'immagine',
    citazione: '💬 Chi l\'ha detto?', ordina: '🔢 Metti in ordine', numero: '🎯 Indovina il numero',
    quiz_custom: '❓ Quiz', vero_falso: '⚖️ Vero o falso',
  };

  const state = {
    sk: null, // chiave segreta del telefono: identifica il giocatore presso l'host
    pin: null,
    nickname: null,
    avatar: null,
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
    'Suspense…',
  ];

  // ---- Interfaccia ----
  function show(id) {
    for (const s of screens) $(s).classList.toggle('hidden', s !== id);
    const inGame = !['s-pin', 's-nick', 's-message'].includes(id);
    $('bottombar').classList.toggle('hidden', !inGame);
    $('topbar').classList.toggle('hidden', !inGame);
    document.body.classList.remove('result-correct', 'result-wrong', 'result-close');
    document.body.classList.toggle('has-topbar', inGame);
    window.scrollTo(0, 0);
  }

  function showError(el, message) {
    el.textContent = message;
    el.classList.remove('hidden');
    clearTimeout(el._t);
    el._t = setTimeout(() => el.classList.add('hidden'), 6000);
  }

  function setBusy(form, busy, label) {
    form.querySelectorAll('button, input').forEach((el) => (el.disabled = busy));
    const btn = form.querySelector('button[type=submit]');
    btn.dataset.label = btn.dataset.label || btn.textContent;
    btn.textContent = busy ? label : btn.dataset.label;
  }

  function updateBars(bump) {
    $('top-pin').textContent = `PIN ${state.pin}`;
    $('top-progress').textContent = state.question ? `${state.question.index + 1} / ${state.question.total}` : 'In attesa';
    $('bb-nick').textContent = state.nickname;
    $('bb-avatar').textContent = state.avatar || '';
    $('bb-score').textContent = state.score.toLocaleString('it-IT');
    if (bump) {
      $('bb-score').classList.remove('bump');
      void $('bb-score').offsetWidth;
      $('bb-score').classList.add('bump');
    }
  }

  function stopTimers() {
    clearInterval(state.countdown);
    state.timer?.stop();
    state.timer = null;
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

  // ---- Avatar ----
  function loadAvatar() {
    try {
      const saved = localStorage.getItem(AVATAR_KEY);
      if (saved && UI.AVATARS.includes(saved)) return saved;
    } catch {}
    return UI.AVATARS[Math.floor(Math.random() * UI.AVATARS.length)];
  }
  function setAvatar(avatar) {
    state.avatar = avatar;
    $('avatar-current').textContent = avatar;
    document.querySelectorAll('.avatar-opt').forEach((b) => {
      b.classList.toggle('sel', b.dataset.a === avatar);
      b.setAttribute('aria-checked', b.dataset.a === avatar);
    });
    try {
      localStorage.setItem(AVATAR_KEY, avatar);
    } catch {}
  }
  for (const a of UI.AVATARS) {
    const b = document.createElement('button');
    b.type = 'button';
    b.className = 'avatar-opt';
    b.dataset.a = a;
    b.textContent = a;
    b.setAttribute('role', 'radio');
    b.addEventListener('click', () => {
      setAvatar(a);
      UI.sound('tap');
    });
    $('avatar-picker').appendChild(b);
  }
  setAvatar(loadAvatar());

  // ---- Sessione salvata: si rientra in partita anche dopo aver ricaricato la pagina ----
  function saveSession() {
    try {
      localStorage.setItem(SESSION_KEY, JSON.stringify({
        pin: state.pin, sk: QuizNet.toHex(state.sk), nickname: state.nickname, avatar: state.avatar, at: Date.now(),
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

  const rejoinMsg = () => ({ t: 'rejoin', nickname: state.nickname, avatar: state.avatar });

  // Segnale di vita all'host e controllo che l'host risponda ancora.
  setInterval(() => {
    if (!state.joined || state.finished || !state.bus) return;
    send({ t: 'hb' });
    const silent = Date.now() - state.lastHostMsg;
    if (silent > HOST_GONE_MS) {
      return state.view.phase === 'gameover' ? finish() : finish('Partita terminata', "L'organizzatore non è più raggiungibile.");
    }
    if (silent > HOST_SILENT_MS) {
      setReconnecting(true);
      send(rejoinMsg());
    }
  }, HEARTBEAT_MS);

  // Tornando sull'app dopo averla lasciata in sottofondo chiediamo subito lo stato attuale.
  document.addEventListener('visibilitychange', () => {
    if (document.visibilityState === 'visible' && state.joined && !state.finished) send(rejoinMsg());
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
      UI.sound('join');
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
      await request({ t: 'join', nickname, avatar: state.avatar }, ['joined', 'joinError', 'kicked'], 15000, 3000);
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
      if (msg.avatar) state.avatar = msg.avatar;
      state.score = msg.score || 0;
      saveSession();
      QuizNet.keepScreenOn();
      updateBars();
      if (msg.snapshot) {
        state.lastStateSeq = Math.max(state.lastStateSeq, msg.seq || 0);
        handlers[msg.snapshot.t]?.(msg.snapshot);
      } else if (firstTime || state.view.phase !== 'lobby' || !$('s-lobby').classList.contains('hidden')) {
        $('lobby-avatar').textContent = state.avatar;
        $('lobby-title').textContent = 'Eccoti!';
        $('lobby-sub').textContent = 'Vedi il tuo nickname sullo schermo? Aspetta che la partita cominci.';
        state.view = { phase: 'lobby', index: -1 };
        show('s-lobby');
        if (firstTime) UI.vibrate(40);
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
        send(rejoinMsg());
      }
    },

    wait({ index }) {
      state.view = { phase: 'results', index };
      $('lobby-avatar').textContent = state.avatar;
      $('lobby-title').textContent = 'Sei dentro!';
      $('lobby-sub').textContent = 'Attendi la prossima domanda.';
      show('s-lobby');
    },

    getready({ index, total, ms, mode, next }) {
      state.view = { phase: 'getready', index };
      state.question = { index, total };
      updateBars();
      UI.preload(next);
      $('gr-mode').textContent = MODE_LABELS[mode] || MODE_LABELS.quiz;
      $('gr-title').textContent = `Domanda ${index + 1}`;
      let left = Math.max(1, Math.round(ms / 1000));
      $('gr-count').textContent = left;
      stopTimers();
      state.countdown = setInterval(() => {
        left -= 1;
        if (left <= 0) clearInterval(state.countdown);
        else UI.sound('tick');
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

      $('q-cat').textContent = `${q.categoryEmoji || ''} ${q.category || MODE_LABELS[q.mode] || ''}`.trim();
      $('q-cat').classList.toggle('hidden', !q.category);
      $('q-text').textContent = q.text;
      state.timer = UI.timer($('q-timer'), Math.max(0, Math.round(q.remaining / 1000)), {
        onTick: (s) => s <= 3 && s > 0 && UI.sound('tick'),
      });
      UI.renderMedia($('q-media'), q.media);
      UI.renderAnswerInput($('answers'), q, (choice) => answer(q.index, choice));
      show('s-question');
    },

    answerAck({ q, ok }) {
      if (state.answer?.q === q) {
        clearInterval(state.answer.timer);
        state.answer = null;
      }
      if (ok && state.view.phase === 'question' && state.view.index === q && $('s-sent').classList.contains('hidden')) showSent();
    },

    results({ index, results, reveal }) {
      const mine = results[state.bus?.pubkey];
      if (mine) handlers.result({ ...mine, reveal });
      else handlers.wait({ index });
    },

    result(r) {
      stopTimers();
      clearInterval(state.answer?.timer);
      state.answer = null;
      state.view = { phase: 'results', index: r.index };
      const gained = r.score > state.score;
      state.score = r.score;
      updateBars(gained);
      show('s-result');
      const reveal = r.reveal || {};
      const kind = r.correct ? 'correct' : r.close ? 'close' : 'wrong';
      document.body.classList.add(`result-${kind}`);
      $('res-title').textContent = r.correct
        ? pick(['Corretto!', 'Esatto!', 'Grande!', 'Bravissimo!'])
        : r.close ? 'C\'eri quasi!' : r.answered ? 'Sbagliato' : 'Tempo scaduto';
      $('res-icon').textContent = r.correct ? '✓' : r.close ? '≈' : '✗';
      $('res-points').textContent = r.correct ? `+ ${r.points.toLocaleString('it-IT')}` : 'Nessun punto';

      // Soluzione
      const sol = $('res-solution');
      let html = '';
      if (reveal.type === 'numero') {
        html = `<small>La risposta</small>${UI.esc(reveal.text)}${r.answered ? `<br><small>Tu hai detto ${UI.esc(UI.formatNumber(r.guess, state.question?.format))}</small>` : ''}`;
      } else if (reveal.type === 'ordina') {
        html = `<small>L'ordine giusto</small>${UI.esc(reveal.text)}${r.answered && !r.correct ? `<br><small>Posizioni giuste: ${r.positionsRight} su ${reveal.correct.length}</small>` : ''}`;
      } else if (!r.correct && reveal.text) {
        html = `<small>La risposta giusta</small>${UI.esc(reveal.text)}`;
      }
      sol.innerHTML = html;
      sol.classList.toggle('hidden', !html);
      $('res-why').textContent = reveal.why || '';
      $('res-why').classList.toggle('hidden', !reveal.why);

      const streak = $('res-streak');
      if (r.correct && r.streak >= 2) {
        streak.textContent = `🔥 Combo di ${r.streak} risposte giuste`;
        streak.classList.remove('hidden');
      } else if (r.lostStreak) {
        streak.textContent = '💔 Combo persa';
        streak.classList.remove('hidden');
      } else {
        streak.classList.add('hidden');
      }

      // «Podio» solo se c'è davvero una gara per il podio (più di 3 giocatori) e hai punti.
      const podium = r.rank <= 3 && r.score > 0 && r.players > 3;
      $('res-rank').textContent = podium ? `Sei sul podio! (${r.rank}° posto)` : `Sei al ${r.rank}° posto`;
      if (!r.behind) $('res-behind').textContent = r.score > 0 ? 'Sei in testa! Continua così.' : '';
      else if (r.behind.gap === 0) $('res-behind').textContent = `Pari con ${r.behind.nickname}`;
      else $('res-behind').textContent = `${r.behind.gap <= 300 ? 'A soli' : 'A'} ${r.behind.gap.toLocaleString('it-IT')} punti da ${r.behind.nickname}`;

      if (r.correct) {
        UI.sound('correct');
        UI.vibrate(60);
        UI.confetti({ count: 90, duration: 2000 });
      } else {
        UI.sound(r.close ? 'close' : 'wrong');
        UI.vibrate([80, 60, 80]);
      }
    },

    // Fine partita: restiamo collegati, l'organizzatore potrebbe avviarne un'altra.
    final({ ranking }) {
      const pos = ranking.findIndex(([key]) => key === state.bus?.pubkey);
      const rank = pos + 1;
      const score = pos >= 0 ? ranking[pos][1] : state.score;
      const already = state.view.phase === 'gameover';
      stopTimers();
      state.view = { phase: 'gameover', index: state.view.index };
      state.score = score;
      updateBars();
      show('s-gameover');
      if (already) return;
      const medals = ['🥇', '🥈', '🥉'];
      $('go-title').textContent = rank > 0 && rank <= 3 ? 'Fantastico!' : 'Bella partita!';
      $('go-medal').textContent = medals[rank - 1] || state.avatar || '🎉';
      $('go-rank').textContent = rank > 0 ? `${rank}° posto su ${ranking.length}` : 'Partita conclusa';
      $('go-score').textContent = `Punteggio finale: ${score.toLocaleString('it-IT')} punti`;
      if (rank > 0 && rank <= 3) {
        UI.sound('podium');
        UI.confetti({ count: 200, duration: 4000 });
      }
    },

    // L'organizzatore ha avviato una nuova partita con lo stesso PIN.
    restart({ title }) {
      stopTimers();
      state.score = 0;
      state.question = null;
      state.view = { phase: 'lobby', index: -1 };
      updateBars();
      $('lobby-avatar').textContent = state.avatar;
      $('lobby-title').textContent = 'Nuova partita!';
      $('lobby-sub').textContent = title ? `«${title}» sta per cominciare.` : 'Sta per cominciare.';
      show('s-lobby');
      UI.sound('join');
    },

    kicked() {
      finish('Sei stato rimosso', "L'organizzatore ti ha rimosso dalla partita.");
    },

    ended() {
      if (state.view.phase === 'gameover') finish();
      else finish('Partita terminata', "L'organizzatore ha chiuso la partita.");
    },
  };

  const pick = (arr) => arr[Math.floor(Math.random() * arr.length)];

  function showSent() {
    stopTimers();
    $('sent-quip').textContent = pick(QUIPS);
    show('s-sent');
  }

  // La risposta viene ripetuta finché l'host non conferma di averla ricevuta.
  function answer(index, choice) {
    if (state.answer?.q === index) return;
    UI.sound('sent');
    UI.vibrate(25);
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
    setTimeout(() => {
      if (state.view.phase === 'question' && state.view.index === index) showSent();
    }, 350);
  }

  // ---- Avvio: PIN nell'URL (/?pin=123456) o sessione da riprendere ----
  async function resume(saved) {
    state.sk = QuizNet.fromHex(saved.sk);
    state.nickname = saved.nickname;
    if (saved.avatar) state.avatar = saved.avatar;
    state.joined = true;
    state.lastHostMsg = Date.now();
    openBus(saved.pin);
    updateBars();
    $('lobby-avatar').textContent = state.avatar;
    $('lobby-title').textContent = 'Bentornato!';
    $('lobby-sub').textContent = 'Mi ricollego alla partita…';
    show('s-lobby');
    try {
      await request(rejoinMsg(), ['joined', 'rejoinFailed', 'kicked'], 30000, 3000);
    } catch {
      finish('Partita terminata', "L'organizzatore non è più raggiungibile.");
    }
  }

  UI.installSoundToggle();
  const urlPin = (new URLSearchParams(location.search).get('pin') || '').replace(/\D/g, '');
  const saved = loadSession();
  if (saved && (!urlPin || urlPin === saved.pin)) {
    resume(saved);
  } else if (urlPin) {
    $('pin-input').value = urlPin;
    checkPin(urlPin);
  }
})();
