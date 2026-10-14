(() => {
  const $ = (id) => document.getElementById(id);
  const screens = ['s-pin', 's-nick', 's-lobby', 's-getready', 's-question', 's-sent', 's-result', 's-gameover', 's-message'];
  const SESSION_KEY = 'quizzone.player';
  const SESSION_MAX_AGE = 3 * 60 * 60 * 1000;
  const CONNECT_TIMEOUT = 10000;
  const RECONNECT_WINDOW = 45000;
  const PING_EVERY = 4000;
  const PING_DEAD_AFTER = 12000;

  const state = {
    pin: null,
    key: null,
    nickname: null,
    score: 0,
    question: null,
    peer: null,
    conn: null,
    joined: false,
    finished: false,
    reconnecting: false,
    lastPong: 0,
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
    el._t = setTimeout(() => el.classList.add('hidden'), 5000);
  }

  function setBusy(form, busy) {
    form.querySelectorAll('button, input').forEach((el) => (el.disabled = busy));
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

  function message(title, body) {
    stopTimers();
    state.finished = true;
    $('reconnect').classList.add('hidden');
    $('msg-title').textContent = title;
    $('msg-body').textContent = body;
    show('s-message');
  }

  // ---- Sessione salvata: permette di rientrare se il telefono ricarica la pagina ----
  function saveSession() {
    try {
      localStorage.setItem(SESSION_KEY, JSON.stringify({ pin: state.pin, key: state.key, nickname: state.nickname, at: Date.now() }));
    } catch {}
  }
  function loadSession() {
    try {
      const s = JSON.parse(localStorage.getItem(SESSION_KEY));
      return s && Date.now() - s.at < SESSION_MAX_AGE ? s : null;
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
  function ensurePeer() {
    return new Promise((resolve, reject) => {
      let peer = state.peer;
      if (peer && !peer.destroyed && peer.open) return resolve(peer);
      if (peer && !peer.destroyed && peer.disconnected) {
        peer.reconnect();
      } else if (!peer || peer.destroyed) {
        peer = state.peer = new Peer(QuizNet.peerOptions());
        peer.on('error', (err) => peer._pending?.(err));
      }
      const timeout = setTimeout(() => reject(new Error('timeout')), CONNECT_TIMEOUT);
      peer.once('open', () => {
        clearTimeout(timeout);
        resolve(peer);
      });
      peer._pending = (err) => {
        clearTimeout(timeout);
        reject(err);
      };
    });
  }

  async function connectToHost(pin) {
    const peer = await ensurePeer();
    return new Promise((resolve, reject) => {
      const conn = peer.connect(QuizNet.peerId(pin), { reliable: true, serialization: 'json' });
      const timeout = setTimeout(() => fail(new Error('timeout')), CONNECT_TIMEOUT);
      function fail(err) {
        clearTimeout(timeout);
        peer._pending = null;
        conn.close();
        reject(err);
      }
      peer._pending = fail;
      conn.on('open', () => {
        clearTimeout(timeout);
        peer._pending = null;
        resolve(conn);
      });
      conn.on('error', fail);
    });
  }

  function useConnection(conn) {
    const old = state.conn;
    state.conn = conn;
    if (old && old !== conn) old.close();
    state.lastPong = Date.now();
    conn.on('data', onMessage);
    conn.on('close', () => {
      if (state.conn === conn) connectionLost();
    });
  }

  function send(msg) {
    if (state.conn?.open) state.conn.send(msg);
  }

  // Controllo periodico che l'host risponda ancora (sui telefoni le connessioni cadono in silenzio).
  setInterval(() => {
    if (!state.joined || state.finished || state.reconnecting) return;
    if (Date.now() - state.lastPong > PING_DEAD_AFTER) return connectionLost();
    send({ t: 'ping' });
  }, PING_EVERY);

  document.addEventListener('visibilitychange', () => {
    if (document.visibilityState !== 'visible' || !state.joined || state.finished) return;
    if (!state.conn?.open) connectionLost();
    else send({ t: 'ping' });
  });

  function connectionLost() {
    if (!state.joined || state.finished || state.reconnecting) return;
    reconnect();
  }

  async function reconnect() {
    state.reconnecting = true;
    $('reconnect').classList.remove('hidden');
    const deadline = Date.now() + RECONNECT_WINDOW;
    while (Date.now() < deadline && !state.finished) {
      try {
        const conn = await connectToHost(state.pin);
        useConnection(conn);
        send({ t: 'rejoin', key: state.key, nickname: state.nickname });
        state.reconnecting = false;
        $('reconnect').classList.add('hidden');
        return;
      } catch {
        await new Promise((r) => setTimeout(r, 2000));
      }
    }
    state.reconnecting = false;
    if (!state.finished) {
      clearSession();
      message('Partita terminata', "L'organizzatore non è più raggiungibile.");
    }
  }

  // ---- PIN e nickname ----
  async function checkPin(pin) {
    const form = $('pin-form');
    setBusy(form, true);
    try {
      const conn = await connectToHost(pin);
      useConnection(conn);
      state.pin = pin;
      show('s-nick');
      $('nick-input').focus();
    } catch (err) {
      const notFound = err?.type === 'peer-unavailable';
      showError($('pin-error'), notFound
        ? 'Non abbiamo trovato nessuna partita con questo PIN. Controlla e riprova.'
        : 'Connessione non riuscita. Controlla la rete e riprova.');
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

  $('nick-form').addEventListener('submit', (e) => {
    e.preventDefault();
    if (!state.conn?.open) {
      show('s-pin');
      return showError($('pin-error'), 'Connessione persa. Inserisci di nuovo il PIN.');
    }
    state.key = state.key || QuizNet.randomKey();
    setBusy($('nick-form'), true);
    send({ t: 'join', key: state.key, nickname: $('nick-input').value });
  });

  // ---- Messaggi dall'host ----
  function onMessage(msg) {
    if (!msg || typeof msg !== 'object') return;
    state.lastPong = Date.now();
    const handler = handlers[msg.t];
    if (handler) handler(msg);
  }

  const handlers = {
    pong() {},

    joined({ nickname, score }) {
      setBusy($('nick-form'), false);
      state.joined = true;
      state.finished = false;
      state.nickname = nickname;
      state.score = score || 0;
      saveSession();
      QuizNet.keepScreenOn();
      updateBars();
      $('lobby-title').textContent = 'Eccoti!';
      $('lobby-sub').textContent = 'Vedi il tuo nickname sullo schermo?';
      show('s-lobby');
    },

    joinError({ message: text }) {
      setBusy($('nick-form'), false);
      show('s-nick');
      showError($('nick-error'), text);
    },

    rejoinFailed({ message: text }) {
      state.joined = false;
      clearSession();
      show('s-nick');
      showError($('nick-error'), text);
    },

    wait() {
      $('lobby-title').textContent = 'Sei dentro!';
      $('lobby-sub').textContent = 'Attendi la prossima domanda.';
      show('s-lobby');
    },

    getready({ index, total, ms }) {
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
      stopTimers();
      state.question = q;
      updateBars();
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
        btn.addEventListener('click', () => answer(i));
        grid.appendChild(btn);
      });
      show('s-question');
    },

    answerAck({ ok }) {
      if (!ok) return;
      clearInterval(state.timer);
      $('sent-quip').textContent = QUIPS[Math.floor(Math.random() * QUIPS.length)];
      show('s-sent');
    },

    result(r) {
      stopTimers();
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

    gameover({ rank, score, players }) {
      stopTimers();
      state.finished = true;
      state.score = score;
      clearSession();
      updateBars();
      show('s-gameover');
      const medals = ['🥇', '🥈', '🥉'];
      $('go-title').textContent = rank <= 3 ? 'Fantastico!' : 'Bella partita!';
      $('go-medal').textContent = medals[rank - 1] || '🎉';
      $('go-rank').textContent = `${rank}° posto su ${players}`;
      $('go-score').textContent = `Punteggio finale: ${score} punti`;
    },

    kicked() {
      clearSession();
      message('Sei stato rimosso', "L'organizzatore ti ha rimosso dalla partita.");
    },

    ended() {
      clearSession();
      message('Partita terminata', "L'organizzatore ha chiuso la partita.");
    },
  };

  function answer(choice) {
    document.querySelectorAll('#answers .answer-btn').forEach((b, i) => {
      b.disabled = true;
      b.classList.toggle('dim', i !== choice);
    });
    send({ t: 'answer', choice });
  }

  // ---- Avvio: PIN nell'URL (/?pin=123456) o sessione da riprendere ----
  const urlPin = (new URLSearchParams(location.search).get('pin') || '').replace(/\D/g, '');
  const saved = loadSession();
  if (saved && (!urlPin || urlPin === saved.pin)) {
    Object.assign(state, { pin: saved.pin, key: saved.key, nickname: saved.nickname, joined: true });
    updateBars();
    show('s-lobby');
    reconnect();
  } else if (urlPin) {
    $('pin-input').value = urlPin;
    checkPin(urlPin);
  }
})();
