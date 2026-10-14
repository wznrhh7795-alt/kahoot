(() => {
  const $ = (id) => document.getElementById(id);
  const screens = ['h-home', 'h-editor', 'h-connecting', 'h-lobby', 'h-getready', 'h-question', 'h-results', 'h-scoreboard', 'h-podium'];
  const STORAGE_KEY = 'quizzone.quizzes';
  const TIMES = [5, 10, 20, 30, 60, 90, 120];
  const GET_READY_MS = 5000;
  const HOST_KEY = 'host';
  const { Game, validateQuiz } = window.QuizGame;

  const ui = { editing: null, timer: null };
  // Partita in corso: tutta la logica gira qui, nel browser dell'host.
  let session = null;

  function show(id) {
    for (const s of screens) $(s).classList.toggle('hidden', s !== id);
    window.scrollTo(0, 0);
  }

  // ---- Quiz salvati in locale ----
  function loadCustom() {
    try {
      return JSON.parse(localStorage.getItem(STORAGE_KEY)) || [];
    } catch {
      return [];
    }
  }
  function saveCustom(list) {
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(list));
    } catch {
      alert('Impossibile salvare il quiz in questo browser.');
    }
  }

  function renderHome() {
    const list = $('quiz-list');
    list.innerHTML = '';
    const card = (quiz, isCustom) => {
      const el = document.createElement('div');
      el.className = 'quiz-card';
      el.innerHTML = `
        <span class="tag">${isCustom ? 'I miei quiz' : 'Esempio'}</span>
        <h3>${escapeHtml(quiz.title)}</h3>
        <p>${escapeHtml(quiz.description || '')}</p>
        <span class="tag">${quiz.questions.length} domande</span>
        <div class="actions">
          <button class="btn green small" data-act="play">Ospita</button>
          <button class="btn light small outline" data-act="edit">${isCustom ? 'Modifica' : 'Duplica e modifica'}</button>
          ${isCustom ? '<button class="btn red small" data-act="del">Elimina</button>' : ''}
        </div>`;
      el.querySelector('[data-act=play]').onclick = () => hostGame(quiz);
      el.querySelector('[data-act=edit]').onclick = () =>
        openEditor(isCustom ? quiz : { ...structuredClone(quiz), id: null, title: `${quiz.title} (copia)` });
      const del = el.querySelector('[data-act=del]');
      if (del) del.onclick = () => {
        if (!confirm(`Eliminare «${quiz.title}»?`)) return;
        saveCustom(loadCustom().filter((q) => q.id !== quiz.id));
        renderHome();
      };
      return el;
    };
    loadCustom().forEach((q) => list.appendChild(card(q, true)));
    window.SAMPLE_QUIZZES.forEach((q) => list.appendChild(card(q, false)));
    show('h-home');
  }

  // ---- Editor ----
  const blankQuestion = (type) => ({
    type,
    text: '',
    time: type === 'vero_falso' ? 10 : 20,
    answers: type === 'vero_falso' ? ['Vero', 'Falso'] : ['', '', '', ''],
    correct: 0,
  });

  function openEditor(quiz) {
    ui.editing = quiz
      ? structuredClone(quiz)
      : { id: null, title: '', description: '', questions: [blankQuestion('quiz')] };
    // Le domande salvate possono avere meno di 4 risposte: nell'editor mostriamo sempre 4 caselle.
    for (const q of ui.editing.questions) {
      if (q.type !== 'vero_falso') while (q.answers.length < 4) q.answers.push('');
    }
    $('ed-title').value = ui.editing.title;
    $('ed-desc').value = ui.editing.description || '';
    $('ed-error').classList.add('hidden');
    renderQuestions();
    show('h-editor');
  }

  function renderQuestions() {
    const wrap = $('ed-questions');
    wrap.innerHTML = '';
    ui.editing.questions.forEach((q, qi) => {
      const el = document.createElement('div');
      el.className = 'card';
      const tf = q.type === 'vero_falso';
      el.innerHTML = `
        <div class="editor-row" style="justify-content: space-between;">
          <label>Domanda ${qi + 1} · ${tf ? 'Vero/Falso' : 'Scelta multipla'}</label>
          <div class="editor-row">
            <select data-f="time" aria-label="Tempo limite">
              ${TIMES.map((t) => `<option value="${t}" ${t === q.time ? 'selected' : ''}>${t} secondi</option>`).join('')}
            </select>
            <button class="btn red small" data-f="del" ${ui.editing.questions.length === 1 ? 'disabled' : ''}>Elimina</button>
          </div>
        </div>
        <input class="input" data-f="text" placeholder="Scrivi la domanda" maxlength="120" value="${escapeHtml(q.text)}">
        <div class="editor-answers">
          ${q.answers.map((a, ai) => `
            <div class="editor-answer c${ai}">
              ${SHAPES[ai]}
              <input type="text" data-a="${ai}" value="${escapeHtml(a)}" maxlength="75"
                placeholder="Risposta ${ai + 1}${!tf && ai >= 2 ? ' (facoltativa)' : ''}" ${tf ? 'readonly' : ''}>
              <input type="radio" name="correct-${qi}" data-c="${ai}" ${q.correct === ai ? 'checked' : ''} aria-label="Risposta corretta">
            </div>`).join('')}
        </div>
        <span class="footer-note" style="color:#666">Seleziona il pallino della risposta corretta.</span>`;
      el.querySelector('[data-f=text]').oninput = (e) => (q.text = e.target.value);
      el.querySelector('[data-f=time]').onchange = (e) => (q.time = Number(e.target.value));
      el.querySelector('[data-f=del]').onclick = () => {
        ui.editing.questions.splice(qi, 1);
        renderQuestions();
      };
      el.querySelectorAll('[data-a]').forEach((input) => {
        input.oninput = (e) => (q.answers[Number(input.dataset.a)] = e.target.value);
      });
      el.querySelectorAll('[data-c]').forEach((radio) => {
        radio.onchange = () => (q.correct = Number(radio.dataset.c));
      });
      wrap.appendChild(el);
    });
  }

  // Le risposte vuote facoltative (3 e 4) vengono tolte; l'indice corretto viene riallineato.
  function normalizeQuiz(draft) {
    const questions = draft.questions.map((q) => {
      const kept = q.answers.map((text, i) => ({ text: text.trim(), i })).filter((a, idx) => a.text || idx < 2);
      const correct = kept.findIndex((a) => a.i === q.correct);
      return { type: q.type, text: q.text.trim(), time: q.time, answers: kept.map((a) => a.text), correct };
    });
    return {
      id: draft.id || `quiz-${Date.now()}`,
      title: $('ed-title').value.trim(),
      description: $('ed-desc').value.trim(),
      questions,
    };
  }

  function validateDraft(quiz) {
    if (!quiz.title) return 'Dai un titolo al quiz.';
    for (const [i, q] of quiz.questions.entries()) {
      if (!q.text) return `Scrivi il testo della domanda ${i + 1}.`;
      if (q.answers.some((a) => !a)) return `Completa le risposte della domanda ${i + 1}.`;
      if (q.correct < 0) return `La risposta corretta della domanda ${i + 1} è vuota.`;
    }
    return validateQuiz(quiz);
  }

  $('btn-new').onclick = () => openEditor(null);
  $('ed-cancel').onclick = renderHome;
  $('ed-add-quiz').onclick = () => {
    ui.editing.questions.push(blankQuestion('quiz'));
    renderQuestions();
  };
  $('ed-add-tf').onclick = () => {
    ui.editing.questions.push(blankQuestion('vero_falso'));
    renderQuestions();
  };
  $('ed-save').onclick = () => {
    const quiz = normalizeQuiz(ui.editing);
    const error = validateDraft(quiz);
    if (error) {
      $('ed-error').textContent = error;
      $('ed-error').classList.remove('hidden');
      window.scrollTo({ top: 0, behavior: 'smooth' });
      return;
    }
    saveCustom([quiz, ...loadCustom().filter((q) => q.id !== quiz.id)]);
    renderHome();
  };

  // ---- Creazione della partita (relay Nostr, vedi net.js) ----
  const HEARTBEAT_MS = 4000;
  const PLAYER_TIMEOUT_MS = 20000;
  const newPin = () => String(Math.floor(100000 + Math.random() * 900000));

  async function hostGame(quiz) {
    const error = validateQuiz(quiz);
    if (error) return alert(error);
    show('h-connecting');
    const pin = newPin();
    const s = {
      pin,
      quiz,
      game: new Game(pin, quiz),
      lastSeen: new Map(), // chiave pubblica del giocatore -> ultimo messaggio ricevuto
      banned: new Set(),
      timer: null,
      heartbeat: null,
      phaseEndsAt: 0,
      hostPlays: false,
      hostAnswered: false,
      seq: 0,
    };
    s.bus = new QuizNet.Bus({
      secretKey: QuizNet.newSecretKey(),
      listenTag: QuizNet.hostTag(pin),
      sendTag: QuizNet.playersTag(pin),
      onMessage: (from, msg) => session === s && onMessage(from, msg),
      onStatus: (n) => session === s && $('net-warning').classList.toggle('hidden', n > 0),
    });
    try {
      await s.bus.ready(15000);
    } catch {
      s.bus.close();
      alert('Impossibile collegarsi alla rete di gioco. Controlla la connessione a internet e riprova.');
      return renderHome();
    }
    session = s;
    s.heartbeat = setInterval(tick, HEARTBEAT_MS);
    QuizNet.keepScreenOn();
    openLobby();
  }

  function joinUrl() {
    const url = new URL('/', location.href);
    url.searchParams.set('pin', session.pin);
    return url.toString();
  }

  const phaseOf = (state) => (state === 'scoreboard' ? 'results' : state);

  // Ogni pochi secondi: segnale di vita ai giocatori (con la fase attuale, così chi è rimasto
  // indietro chiede di rimettersi in pari) e pulizia di chi non risponde più.
  function tick() {
    const { game } = session;
    broadcast({ t: 'hb', phase: phaseOf(game.state), index: game.index });
    if (game.state === 'lobby') {
      let changed = false;
      for (const key of [...game.players.keys()]) {
        if (key !== HOST_KEY && !isConnected(key)) {
          game.removePlayer(key);
          changed = true;
        }
      }
      if (changed) renderPlayers();
    }
    checkAllAnswered();
  }

  // ---- Messaggi dai giocatori (from = chiave pubblica che ha firmato il messaggio) ----
  function onMessage(from, msg) {
    const { game } = session;
    if (game.players.has(from)) session.lastSeen.set(from, Date.now());
    switch (msg.t) {
      case 'hello':
        return send(from, { t: 'welcome', title: session.quiz.title });
      case 'join':
      case 'rejoin': {
        if (session.banned.has(from)) return send(from, { t: 'kicked' });
        if (!game.players.has(from)) {
          const res = game.addPlayer(from, msg.nickname);
          if (res.error) return send(from, { t: msg.t === 'join' ? 'joinError' : 'rejoinFailed', message: res.error });
        }
        session.lastSeen.set(from, Date.now());
        const player = game.players.get(from);
        send(from, { t: 'joined', nickname: player.nickname, score: player.score, title: session.quiz.title, snapshot: snapshot(from) });
        return renderPlayers();
      }
      case 'answer':
        if (game.players.has(from) && msg.q === game.index) submit(from, msg.choice);
        return;
      // 'hb': basta aver aggiornato lastSeen.
    }
  }

  const isConnected = (key) =>
    key === HOST_KEY ? session.hostPlays : Date.now() - (session.lastSeen.get(key) || 0) < PLAYER_TIMEOUT_MS;

  function send(key, msg) {
    if (key === HOST_KEY) return;
    session.bus.send({ ...msg, to: key, seq: ++session.seq });
  }

  function broadcast(msg) {
    session.bus.send({ ...msg, to: '*', seq: ++session.seq });
  }

  function remaining() {
    return Math.max(0, session.phaseEndsAt - Date.now());
  }

  function questionMessage() {
    const { game } = session;
    return { t: 'question', ...game.publicQuestion(), remaining: remaining() };
  }

  function resultMessage(player) {
    const { game } = session;
    const q = game.question;
    return {
      t: 'result',
      index: game.index,
      ...player.last,
      score: player.score,
      streak: player.streak,
      players: game.players.size,
      correctText: q.answers[q.correct],
    };
  }

  function finalMessage() {
    return { t: 'final', ranking: session.game.ranking().map((p) => [p.id, p.score]) };
  }

  // Stato attuale per chi entra o rientra a partita in corso.
  function snapshot(key) {
    const { game } = session;
    const player = game.players.get(key);
    switch (game.state) {
      case 'getready':
        return { t: 'getready', index: game.index, total: game.total, ms: remaining() };
      case 'question':
        return { ...questionMessage(), answered: game.answers.has(key) };
      case 'results':
      case 'scoreboard':
        return player.last ? resultMessage(player) : { t: 'wait', index: game.index };
      case 'gameover':
        return finalMessage();
    }
    return null;
  }

  function submit(key, choice) {
    const { game } = session;
    // Il telefono ripete la risposta finché non riceve conferma: i doppioni vanno confermati.
    if (game.answers.has(key)) return send(key, { t: 'answerAck', ok: true, q: game.index });
    const res = game.submitAnswer(key, choice);
    send(key, { t: 'answerAck', ok: !res.error, q: game.index });
    if (res.error) return;
    $('q-count').textContent = game.answers.size;
    checkAllAnswered();
  }

  function checkAllAnswered() {
    const { game } = session || {};
    if (!game || game.state !== 'question') return;
    const connected = [...game.players.keys()].filter(isConnected);
    if (connected.length > 0 && connected.every((k) => game.answers.has(k))) closeQuestion();
  }

  // ---- Svolgimento della partita ----
  function clearTimer() {
    clearTimeout(session.timer);
    clearInterval(ui.timer);
  }

  function openLobby() {
    $('lobby-pin').textContent = session.pin.replace(/(\d{3})(\d{3})/, '$1 $2');
    $('lobby-title').textContent = session.quiz.title;
    $('join-url').textContent = location.host;
    $('share-native').classList.toggle('hidden', !navigator.share);
    $('host-play-form').classList.remove('hidden');
    $('host-play-on').classList.add('hidden');
    renderPlayers();
    show('h-lobby');
  }

  function renderPlayers() {
    if (!session) return;
    const players = [...session.game.players.values()];
    const count = players.length;
    $('lobby-count').textContent = `${count} ${count === 1 ? 'giocatore' : 'giocatori'}`;
    $('btn-start').disabled = count === 0;
    $('lobby-wait').classList.toggle('hidden', count > 0);
    const wrap = $('lobby-players');
    wrap.innerHTML = '';
    for (const p of players) {
      const chip = document.createElement('button');
      chip.className = 'player-chip';
      chip.textContent = p.id === HOST_KEY ? `${p.nickname} (tu)` : p.nickname;
      if (p.id !== HOST_KEY) {
        chip.title = 'Rimuovi giocatore';
        chip.onclick = () => kick(p.id);
      } else {
        chip.disabled = true;
      }
      wrap.appendChild(chip);
    }
  }

  function kick(key) {
    const player = session.game.players.get(key);
    if (!player || !confirm(`Rimuovere ${player.nickname} dalla partita?`)) return;
    session.banned.add(key);
    session.game.removePlayer(key);
    session.lastSeen.delete(key);
    send(key, { t: 'kicked' });
    renderPlayers();
    checkAllAnswered();
  }

  $('host-play-form').addEventListener('submit', (e) => {
    e.preventDefault();
    const res = session.game.addPlayer(HOST_KEY, $('host-nick').value);
    if (res.error) return alert(res.error);
    session.hostPlays = true;
    $('host-play-form').classList.add('hidden');
    $('host-play-on').textContent = `Giochi anche tu come «${res.player.nickname}». Tocca la risposta sullo schermo delle domande.`;
    $('host-play-on').classList.remove('hidden');
    renderPlayers();
  });

  $('share-native').onclick = () => {
    navigator.share({ title: 'Quizzone!', text: `Gioca con me a «${session.quiz.title}»! PIN: ${session.pin}`, url: joinUrl() }).catch(() => {});
  };
  $('share-copy').onclick = async () => {
    try {
      await navigator.clipboard.writeText(joinUrl());
      $('share-copy').textContent = 'Link copiato!';
    } catch {
      prompt('Copia questo link:', joinUrl());
    }
    setTimeout(() => ($('share-copy').textContent = 'Copia link'), 2000);
  };

  function startQuestion() {
    const { game } = session;
    clearTimer();
    if (!game.nextQuestion()) return endGame();
    const q = game.publicQuestion();
    session.phaseEndsAt = Date.now() + GET_READY_MS;
    $('gr-num').textContent = `Domanda ${q.index + 1} di ${q.total}`;
    $('gr-text').textContent = q.text;
    const bar = $('gr-bar');
    bar.style.transition = 'none';
    bar.style.transform = 'scaleX(1)';
    requestAnimationFrame(() => requestAnimationFrame(() => {
      bar.style.transition = `transform ${GET_READY_MS}ms linear`;
      bar.style.transform = 'scaleX(0)';
    }));
    show('h-getready');
    broadcast({ t: 'getready', index: q.index, total: q.total, ms: GET_READY_MS });
    session.timer = setTimeout(openQuestion, GET_READY_MS);
  }

  function answerTiles(q, correct) {
    return q.answers.map((a, i) => `
      <button class="host-answer c${i} ${correct !== undefined && i !== correct ? 'dim' : ''}" data-i="${i}" ${correct !== undefined || !session.hostPlays ? 'disabled' : ''}>
        ${SHAPES[i]}<span>${escapeHtml(a)}</span>
        ${correct === i ? '<span class="tick">✓</span>' : ''}
      </button>`).join('');
  }

  function openQuestion() {
    const { game } = session;
    game.openQuestion();
    const q = game.publicQuestion();
    session.phaseEndsAt = Date.now() + q.time * 1000;
    session.hostAnswered = false;
    $('q-text').textContent = q.text;
    $('q-count').textContent = '0';
    $('q-answers').innerHTML = answerTiles(q);
    $('q-answers').querySelectorAll('[data-i]').forEach((tile) => {
      tile.onclick = () => hostAnswer(Number(tile.dataset.i));
    });
    let left = q.time;
    $('q-timer').textContent = left;
    ui.timer = setInterval(() => {
      left -= 1;
      $('q-timer').textContent = Math.max(left, 0);
      if (left <= 0) clearInterval(ui.timer);
    }, 1000);
    show('h-question');
    broadcast(questionMessage());
    session.timer = setTimeout(closeQuestion, q.time * 1000);
  }

  function hostAnswer(choice) {
    if (!session.hostPlays || session.hostAnswered) return;
    session.hostAnswered = true;
    $('q-answers').querySelectorAll('[data-i]').forEach((tile, i) => {
      tile.disabled = true;
      tile.classList.toggle('dim', i !== choice);
    });
    submit(HOST_KEY, choice);
  }

  function closeQuestion() {
    const { game } = session;
    if (game.state !== 'question') return;
    clearTimer();
    const { correct, distribution } = game.closeQuestion();
    const q = game.publicQuestion();
    $('r-text').textContent = q.text;
    const max = Math.max(1, ...distribution);
    $('r-chart').innerHTML = distribution.map((n, i) => `
      <div class="bar ${i !== correct ? 'dim' : ''}">
        <div class="bar-fill c${i}" style="height:0%" data-h="${(n / max) * 80}"></div>
        <div class="bar-label">${SHAPES[i]}${n}${i === correct ? ' ✓' : ''}</div>
      </div>`).join('');
    $('r-answers').innerHTML = answerTiles(q, correct);

    const me = game.players.get(HOST_KEY);
    $('r-mine').classList.toggle('hidden', !me);
    if (me) {
      const l = me.last;
      $('r-mine').className = `my-result ${l.correct ? 'ok' : 'ko'}`;
      $('r-mine').textContent = `${l.correct ? `Corretto! +${l.points}` : l.answered ? 'Sbagliato' : 'Tempo scaduto'} · ${l.rank}° posto · ${me.score} punti`;
    }

    show('h-results');
    requestAnimationFrame(() => requestAnimationFrame(() => {
      document.querySelectorAll('#r-chart .bar-fill').forEach((b) => (b.style.height = `${b.dataset.h}%`));
    }));
    // Un solo messaggio con i risultati di tutti: meno traffico sui relay.
    const results = {};
    for (const player of game.players.values()) if (player.id !== HOST_KEY) results[player.id] = resultMessage(player);
    broadcast({ t: 'results', index: game.index, results });
  }

  function showScoreboard() {
    const { game } = session;
    game.state = 'scoreboard';
    const top = game.scoreboard(5);
    const last = game.index + 1 >= game.total;
    $('btn-next').textContent = last ? 'Vai al podio' : 'Prossima domanda';
    $('sb-list').innerHTML = top.length
      ? top.map((p, i) => `
        <div class="score-row" style="animation-delay:${i * 0.1}s">
          <span>${escapeHtml(p.nickname)}</span><span>${p.score}</span>
        </div>`).join('')
      : '<p>Nessun giocatore rimasto.</p>';
    show('h-scoreboard');
  }

  function endGame() {
    const { game } = session;
    clearTimer();
    game.state = 'gameover';
    const medals = ['🥇', '🥈', '🥉'];
    $('pod-title').textContent = session.quiz.title;
    $('pod').innerHTML = game.scoreboard(3).map((p, i) => `
      <div class="podium-step p${i + 1}">
        <span class="medal">${medals[i]}</span>
        <span class="name">${escapeHtml(p.nickname)}</span>
        <span>${p.score} punti</span>
      </div>`).join('');
    show('h-podium');
    broadcast(finalMessage());
  }

  function closeGame() {
    if (session) {
      clearTimer();
      clearInterval(session.heartbeat);
      if (session.game.state !== 'gameover') broadcast({ t: 'ended' });
      const { bus } = session;
      session = null;
      setTimeout(() => bus.close(), 1500); // il tempo di far partire l'ultimo messaggio
    }
    $('net-warning').classList.add('hidden');
    renderHome();
  }

  $('btn-start').onclick = startQuestion;
  $('btn-skip').onclick = closeQuestion;
  $('btn-to-score').onclick = showScoreboard;
  $('btn-next').onclick = startQuestion;
  $('btn-home').onclick = closeGame;
  $('btn-cancel').onclick = () => {
    if (confirm('Chiudere la partita? I giocatori verranno disconnessi.')) closeGame();
  };

  // Chiudere o ricaricare la pagina termina la partita: chiediamo conferma.
  window.addEventListener('beforeunload', (e) => {
    if (session && session.game.state !== 'gameover') {
      e.preventDefault();
      e.returnValue = '';
    }
  });

  renderHome();
})();
