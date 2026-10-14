(() => {
  const socket = io();
  const $ = (id) => document.getElementById(id);
  const screens = ['s-pin', 's-nick', 's-lobby', 's-getready', 's-question', 's-sent', 's-result', 's-gameover', 's-message'];
  const state = { pin: null, nickname: null, score: 0, question: null, countdown: null };

  const QUIPS = [
    'Sei veloce come un fulmine?',
    'Incrociamo le dita…',
    'Chissà se hai indovinato!',
    'Vediamo cosa hanno risposto gli altri…',
  ];

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
    el._t = setTimeout(() => el.classList.add('hidden'), 4000);
  }

  function updateBars() {
    $('top-pin').textContent = `PIN: ${state.pin}`;
    $('top-progress').textContent = state.question ? `${state.question.index + 1} di ${state.question.total}` : '';
    $('bb-nick').textContent = state.nickname;
    $('bb-score').textContent = state.score;
  }

  function checkPin(pin) {
    socket.emit('player:checkPin', pin, (res) => {
      if (res.error) return showError($('pin-error'), res.error);
      state.pin = pin;
      show('s-nick');
      $('nick-input').focus();
    });
  }

  // ---- PIN e nickname ----
  $('pin-form').addEventListener('submit', (e) => {
    e.preventDefault();
    const pin = $('pin-input').value.replace(/\D/g, '');
    if (!pin) return showError($('pin-error'), 'Inserisci il PIN del gioco.');
    checkPin(pin);
  });

  $('nick-form').addEventListener('submit', (e) => {
    e.preventDefault();
    const nickname = $('nick-input').value;
    socket.emit('player:join', { pin: state.pin, nickname }, (res) => {
      if (res.error) return showError($('nick-error'), res.error);
      state.nickname = res.nickname;
      updateBars();
      show('s-lobby');
    });
  });

  // PIN passato nell'URL: /?pin=123456
  const urlPin = new URLSearchParams(location.search).get('pin');
  if (urlPin) {
    $('pin-input').value = urlPin;
    socket.once('connect', () => checkPin(urlPin.replace(/\D/g, '')));
  }

  // ---- Gioco ----
  socket.on('player:getready', ({ index, total, ms }) => {
    state.question = { index, total };
    updateBars();
    $('gr-title').textContent = `Domanda ${index + 1}`;
    let left = Math.round(ms / 1000);
    $('gr-count').textContent = left;
    clearInterval(state.countdown);
    state.countdown = setInterval(() => {
      left -= 1;
      if (left <= 0) clearInterval(state.countdown);
      $('gr-count').textContent = Math.max(left, 0);
    }, 1000);
    show('s-getready');
  });

  socket.on('player:question', (q) => {
    clearInterval(state.countdown);
    state.question = q;
    updateBars();
    const grid = $('answers');
    grid.classList.toggle('two', q.count === 2);
    grid.innerHTML = '';
    for (let i = 0; i < q.count; i++) {
      const btn = document.createElement('button');
      btn.className = `answer-btn c${i}`;
      btn.setAttribute('aria-label', q.type === 'vero_falso' ? q.answers[i] : SHAPE_NAMES[i]);
      btn.innerHTML = SHAPES[i] +
        (q.type === 'vero_falso' ? `<span class="big" style="margin-left:12px">${escapeHtml(q.answers[i])}</span>` : '');
      btn.addEventListener('click', () => answer(i), { once: true });
      grid.appendChild(btn);
    }
    show('s-question');
  });

  function answer(choice) {
    socket.emit('player:answer', choice, (res) => {
      if (res.error) return;
      $('sent-quip').textContent = QUIPS[Math.floor(Math.random() * QUIPS.length)];
      show('s-sent');
    });
  }

  socket.on('player:result', (r) => {
    state.score = r.score;
    updateBars();
    show('s-result');
    document.body.className = r.correct ? 'result-correct' : 'result-wrong';
    $('res-title').textContent = r.correct ? 'Corretto' : r.answered ? 'Sbagliato' : 'Tempo scaduto';
    $('res-icon').textContent = r.correct ? '✓' : '✗';
    $('res-points').textContent = r.correct ? `+ ${r.points}` : 'Nessun punto';

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

    $('res-rank').textContent = r.rank <= 3 ? 'Sei sul podio!' : `Sei al ${r.rank}° posto`;
    $('res-behind').textContent = r.behind
      ? `A soli ${r.behind.gap} punti da ${r.behind.nickname}`
      : 'Sei in testa! Continua così.';
  });

  socket.on('player:gameover', ({ rank, score, players }) => {
    state.score = score;
    updateBars();
    show('s-gameover');
    const medals = ['🥇', '🥈', '🥉'];
    $('go-title').textContent = rank <= 3 ? 'Fantastico!' : 'Bella partita!';
    $('go-medal').textContent = medals[rank - 1] || '🎉';
    $('go-rank').textContent = `${rank}° posto su ${players}`;
    $('go-score').textContent = `Punteggio finale: ${score} punti`;
  });

  function message(title, body) {
    clearInterval(state.countdown);
    $('msg-title').textContent = title;
    $('msg-body').textContent = body;
    show('s-message');
  }

  socket.on('player:kicked', () => message('Sei stato rimosso', "L'organizzatore ti ha rimosso dalla partita."));
  socket.on('player:hostLeft', () => message('Partita terminata', "L'organizzatore ha chiuso la partita."));
  socket.on('disconnect', () => {
    if (state.nickname) message('Connessione persa', 'Controlla la connessione e rientra con il PIN.');
  });
})();
