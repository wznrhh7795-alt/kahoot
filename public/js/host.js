(() => {
  const $ = (id) => document.getElementById(id);
  const screens = ['h-home', 'h-editor', 'h-connecting', 'h-lobby', 'h-getready', 'h-question', 'h-results', 'h-scoreboard', 'h-podium'];
  const STORAGE_KEY = 'quizzone.quizzes';
  const SETUP_KEY = 'quizzone.setup';
  const TIMES = [5, 10, 15, 20, 30, 45, 60, 90, 120];
  const GET_READY_MS = 5000;
  const HOST_KEY = 'host';
  const { Game, validateQuiz } = window.QuizGame;
  const Bank = window.QuizBank;
  const esc = UI.esc;
  const MODE_BY_ID = Object.fromEntries(Bank.modes.map((m) => [m.id, m]));
  const modeLabel = (q) => {
    const m = MODE_BY_ID[q.mode] || MODE_BY_ID[{ vero_falso: 'vf', ordina: 'ordina', numero: 'numero' }[q.type] || 'quiz'];
    return `${m.emoji} ${m.name}`;
  };

  const ui = { editing: null, timer: null };
  // Partita in corso: tutta la logica gira qui, nel browser dell'host.
  let session = null;

  // Musica: home e editor → home, attesa → lobby, domanda → un brano diverso ogni volta, podio → finale.
  const MUSIC_FOR = { 'h-home': 'home', 'h-editor': 'home', 'h-connecting': 'lobby', 'h-lobby': 'lobby', 'h-scoreboard': 'lobby', 'h-podium': 'finale' };
  function show(id) {
    if (id === 'h-question') UI.music?.next('question');
    else if (MUSIC_FOR[id]) UI.music?.play(MUSIC_FOR[id]);
    else UI.music?.stop();
    for (const s of screens) $(s).classList.toggle('hidden', s !== id);
    window.scrollTo(0, 0);
  }

  // ---- Impostazioni della partita rapida (ricordate nel browser) ----
  const setup = (() => {
    const allModes = Bank.modes.map((m) => m.id);
    const defaults = { categories: Bank.categories.map((c) => c.id), modes: allModes, knownModes: allModes, count: 15, difficulty: 'mista', speed: 'normale', bonus: 'off', theme: 'classico' };
    try {
      const saved = JSON.parse(localStorage.getItem(SETUP_KEY));
      if (saved) {
        // Le modalità uscite dopo l'ultimo salvataggio vengono attivate in automatico.
        const known = saved.knownModes || ['quiz', 'vf', 'immagine', 'citazione', 'ordina', 'numero'];
        const modes = [...(saved.modes || []), ...allModes.filter((m) => !known.includes(m))];
        return { ...defaults, ...saved, modes, knownModes: allModes };
      }
    } catch {}
    return defaults;
  })();
  function saveSetup() {
    try {
      localStorage.setItem(SETUP_KEY, JSON.stringify(setup));
    } catch {}
  }

  setup.theme = UI.applyTheme(setup.theme);

  // ---- Home ----
  const total = Bank.estimateCount();
  $('home-stats').textContent = `Oltre ${(Math.floor(total / 500) * 500).toLocaleString('it-IT')} domande · ${Bank.categories.length} categorie · ${Bank.modes.length} giochi`;

  document.querySelectorAll('.tab').forEach((tab) => {
    tab.addEventListener('click', () => {
      document.querySelectorAll('.tab').forEach((t) => t.classList.toggle('active', t === tab));
      for (const name of ['rapida', 'tema', 'miei']) $(`tab-${name}`).classList.toggle('hidden', name !== tab.dataset.tab);
      if (tab.dataset.tab === 'miei') renderMyQuizzes();
    });
  });

  function renderSetup() {
    const cg = $('cat-grid');
    cg.innerHTML = '';
    for (const c of Bank.categories) {
      const b = document.createElement('button');
      b.type = 'button';
      b.className = `cat-card${setup.categories.includes(c.id) ? ' sel' : ''}`;
      b.style.setProperty('--cc', c.color);
      b.title = c.description;
      b.setAttribute('aria-pressed', setup.categories.includes(c.id));
      b.innerHTML = `<span class="cat-emoji">${c.emoji}</span><span class="cat-name">${esc(c.name)}</span>
        <span class="cat-modes" aria-hidden="true">${Bank.modesOf(c).map((m) => MODE_BY_ID[m].emoji).join('')}</span>`;
      b.addEventListener('click', () => {
        const i = setup.categories.indexOf(c.id);
        if (i >= 0) setup.categories.splice(i, 1);
        else setup.categories.push(c.id);
        UI.sound('tap');
        saveSetup();
        renderSetup();
      });
      cg.appendChild(b);
    }
    const mg = $('mode-grid');
    mg.innerHTML = '';
    for (const m of Bank.modes) {
      const b = document.createElement('button');
      b.type = 'button';
      b.className = `mode-card${setup.modes.includes(m.id) ? ' sel' : ''}`;
      b.setAttribute('aria-pressed', setup.modes.includes(m.id));
      b.innerHTML = `<span class="m-emoji">${m.emoji}</span><span><span class="m-name">${esc(m.name)}</span><br><span class="m-desc">${esc(m.description)}</span></span>`;
      b.addEventListener('click', () => {
        const i = setup.modes.indexOf(m.id);
        if (i >= 0) setup.modes.splice(i, 1);
        else setup.modes.push(m.id);
        UI.sound('tap');
        saveSetup();
        renderSetup();
      });
      mg.appendChild(b);
    }
    document.querySelectorAll('[data-seg]').forEach((seg) => {
      seg.querySelectorAll('button').forEach((b) => b.classList.toggle('active', String(setup[seg.dataset.seg]) === b.dataset.v));
    });
    const nc = setup.categories.length;
    const nm = setup.modes.length;
    $('setup-summary').textContent = `${setup.count} domande · ${nc} ${nc === 1 ? 'categoria' : 'categorie'} · ${nm} ${nm === 1 ? 'gioco' : 'giochi'}`;
    $('btn-quick').disabled = nc === 0 || nm === 0;
  }
  $('theme-grid').innerHTML = UI.THEMES.map((t) => `
    <button data-v="${t.id}" class="theme-swatch" style="--s1:${t.swatch[0]};--s2:${t.swatch[1]};--s3:${t.swatch[2]}">
      <span class="dot" aria-hidden="true"></span>${esc(t.name)}</button>`).join('');
  document.querySelectorAll('[data-seg]').forEach((seg) => {
    seg.querySelectorAll('button').forEach((b) => {
      b.addEventListener('click', () => {
        setup[seg.dataset.seg] = seg.dataset.seg === 'count' ? Number(b.dataset.v) : b.dataset.v;
        if (seg.dataset.seg === 'theme') UI.applyTheme(setup.theme);
        saveSetup();
        renderSetup();
      });
    });
  });
  $('cat-all').onclick = () => { setup.categories = Bank.categories.map((c) => c.id); saveSetup(); renderSetup(); };
  $('cat-none').onclick = () => { setup.categories = []; saveSetup(); renderSetup(); };
  $('mode-all').onclick = () => { setup.modes = Bank.modes.map((m) => m.id); saveSetup(); renderSetup(); };

  function generate(params) {
    const game = Bank.buildGame({ count: setup.count, difficulty: setup.difficulty, speed: setup.speed, bonus: setup.bonus === 'on', ...params });
    if (game.error) {
      alert(game.error);
      return null;
    }
    game.origin = params; // per «Rigioca con nuove domande»
    return game;
  }
  $('btn-quick').onclick = () => {
    const quiz = generate({ categories: setup.categories, modes: setup.modes });
    if (quiz) hostGame(quiz);
  };

  function renderPresets() {
    const grid = $('preset-grid');
    grid.innerHTML = '';
    let group = null;
    for (const p of Bank.presets) {
      if (p.group !== group) {
        group = p.group;
        const h = document.createElement('h3');
        h.className = 'preset-group';
        h.textContent = group;
        grid.appendChild(h);
      }
      const cats = p.categories.length ? p.categories.map((id) => Bank.categories.find((c) => c.id === id)?.emoji).join(' ') : 'Tutte le categorie';
      const modes = p.modes.length ? p.modes.map((id) => MODE_BY_ID[id].name).join(', ') : 'Tutti i giochi';
      const b = document.createElement('button');
      b.type = 'button';
      b.className = 'preset-card';
      const o = p.options || {};
      const extra = [o.count && `${o.count} domande`, o.difficulty, o.speed, o.bonus && '⚡ punti doppi'].filter(Boolean).join(' · ');
      b.innerHTML = `<span class="p-emoji">${p.emoji}</span><span class="p-name">${esc(p.name)}</span><span class="p-desc">${esc(cats)} · ${esc(modes)}${extra ? ` · ${esc(extra)}` : ''}</span>`;
      b.addEventListener('click', () => {
        const quiz = generate({ categories: p.categories, modes: p.modes, title: p.name, ...p.options });
        if (quiz) hostGame(quiz);
      });
      grid.appendChild(b);
    }
  }

  // ---- I miei quiz (salvati nel browser) ----
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

  function quizCard(quiz, isCustom) {
    const el = document.createElement('div');
    el.className = 'quiz-card';
    el.innerHTML = `
      <span class="tag">${isCustom ? 'I miei quiz' : 'Esempio'}</span>
      <h3>${esc(quiz.title)}</h3>
      <p>${esc(quiz.description || '')}</p>
      <span class="tag">${quiz.questions.length} domande</span>
      <div class="actions">
        <button class="btn green small" data-act="play">Ospita</button>
        <button class="btn ghost small" data-act="edit">${isCustom ? 'Modifica' : 'Duplica e modifica'}</button>
        ${isCustom ? '<button class="btn red small" data-act="del">Elimina</button>' : ''}
      </div>`;
    el.querySelector('[data-act=play]').onclick = () => hostGame(quiz);
    el.querySelector('[data-act=edit]').onclick = () =>
      openEditor(isCustom ? quiz : { ...structuredClone(quiz), id: null, title: `${quiz.title} (copia)` });
    const del = el.querySelector('[data-act=del]');
    if (del) del.onclick = () => {
      if (!confirm(`Eliminare «${quiz.title}»?`)) return;
      saveCustom(loadCustom().filter((q) => q.id !== quiz.id));
      renderMyQuizzes();
    };
    return el;
  }

  function renderMyQuizzes() {
    const mine = loadCustom();
    $('my-list').innerHTML = mine.length ? '' : '<p class="empty">Non hai ancora creato quiz. Tocca «Crea un nuovo quiz»!</p>';
    mine.forEach((q) => $('my-list').appendChild(quizCard(q, true)));
    $('sample-list').innerHTML = '';
    (window.SAMPLE_QUIZZES || []).forEach((q) => $('sample-list').appendChild(quizCard(q, false)));
  }

  function renderHome() {
    renderSetup();
    renderPresets();
    renderMyQuizzes();
    show('h-home');
  }

  // ---- Editor ----
  const TYPE_NAMES = { quiz: 'Scelta multipla', vero_falso: 'Vero/Falso', ordina: 'Metti in ordine', numero: 'Indovina il numero', scrivi: 'Scrivi la risposta' };
  const blankQuestion = (type) => ({
    type,
    text: '',
    time: { quiz: 20, vero_falso: 10, ordina: 30, numero: 30, scrivi: 30 }[type],
    answers: type === 'vero_falso' ? ['Vero', 'Falso'] : ['', '', '', ''],
    correct: 0,
    orderItems: ['', '', '', ''],
    answer: 0,
    min: 0,
    max: 100,
    tol: 0,
    unit: '',
    typedAnswer: '',
    acceptText: '',
    mediaText: '',
  });

  // Converte una domanda salvata nel formato dell'editor.
  function toDraft(q) {
    const d = { ...blankQuestion(q.type || 'quiz'), ...structuredClone(q) };
    if (d.type === 'quiz') while (d.answers.length < 4) d.answers.push('');
    if (d.type === 'ordina') {
      d.orderItems = q.correct.map((i) => q.items[i]);
      while (d.orderItems.length < 4) d.orderItems.push('');
    }
    d.mediaText = q.media ? (q.media.kind === 'image' ? q.media.src : q.media.value || '') : '';
    if (d.type === 'scrivi') {
      d.typedAnswer = q.answer;
      d.acceptText = (q.accept || []).join(', ');
    }
    return d;
  }

  function openEditor(quiz) {
    ui.editing = quiz
      ? { ...structuredClone(quiz), questions: quiz.questions.map(toDraft) }
      : { id: null, title: '', description: '', questions: [blankQuestion('quiz')] };
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
      let body = '';
      if (q.type === 'quiz' || q.type === 'vero_falso') {
        const tf = q.type === 'vero_falso';
        body = `
          <div class="editor-answers">
            ${q.answers.map((a, ai) => `
              <div class="editor-answer c${ai}">
                ${UI.SHAPES[ai]}
                <input type="text" data-a="${ai}" value="${esc(a)}" maxlength="75"
                  placeholder="Risposta ${ai + 1}${!tf && ai >= 2 ? ' (facoltativa)' : ''}" ${tf ? 'readonly' : ''}>
                <input type="radio" name="correct-${qi}" data-c="${ai}" ${q.correct === ai ? 'checked' : ''} aria-label="Risposta corretta">
              </div>`).join('')}
          </div>
          <span class="small" style="color:var(--muted)">Seleziona il pallino della risposta corretta.</span>
          <input class="input" data-f="mediaText" placeholder="Immagine (link https://…) o emoji — facoltativo" value="${esc(q.mediaText || '')}" maxlength="400">`;
      } else if (q.type === 'ordina') {
        body = `
          <span class="small" style="color:var(--muted)">Scrivi gli elementi <b>nell'ordine giusto</b>: verranno mescolati durante il gioco (almeno 3).</span>
          <div class="editor-items">${q.orderItems.map((it, i) => `
            <div class="editor-item"><span class="n">${i + 1}</span><input type="text" data-o="${i}" value="${esc(it)}" maxlength="60" placeholder="Elemento ${i + 1}${i >= 3 ? ' (facoltativo)' : ''}"></div>`).join('')}
          </div>`;
      } else if (q.type === 'scrivi') {
        body = `
          <input class="input" data-f="typedAnswer" placeholder="Risposta esatta (es. Roma)" value="${esc(q.typedAnswer)}" maxlength="40">
          <input class="input" data-f="acceptText" placeholder="Altre risposte accettate, separate da virgola — facoltativo" value="${esc(q.acceptText)}" maxlength="200">
          <span class="small" style="color:var(--muted)">Maiuscole, accenti, articoli e un piccolo errore di battitura vengono perdonati.</span>
          <input class="input" data-f="mediaText" placeholder="Immagine (link https://…) o emoji — facoltativo" value="${esc(q.mediaText || '')}" maxlength="400">`;
      } else {
        body = `
          <div class="editor-row">
            <label>Risposta <input type="number" data-n="answer" value="${q.answer}"></label>
            <label>Minimo <input type="number" data-n="min" value="${q.min}"></label>
            <label>Massimo <input type="number" data-n="max" value="${q.max}"></label>
            <label>Tolleranza ± <input type="number" data-n="tol" value="${q.tol}" min="0"></label>
          </div>
          <input class="input" data-f="unit" placeholder="Unità di misura (facoltativa, es. km)" value="${esc(q.unit || '')}" maxlength="20">`;
      }
      el.innerHTML = `
        <div class="editor-row" style="justify-content: space-between;">
          <span><b>Domanda ${qi + 1}</b> <span class="type-pill">${TYPE_NAMES[q.type]}</span></span>
          <div class="editor-row">
            <select data-f="time" aria-label="Tempo limite">
              ${TIMES.map((t) => `<option value="${t}" ${t === q.time ? 'selected' : ''}>${t} s</option>`).join('')}
            </select>
            <button class="btn red small" data-f="del" ${ui.editing.questions.length === 1 ? 'disabled' : ''}>Elimina</button>
          </div>
        </div>
        <input class="input" data-f="text" placeholder="Scrivi la domanda" maxlength="160" value="${esc(q.text)}">
        ${body}`;
      el.querySelector('[data-f=text]').oninput = (e) => (q.text = e.target.value);
      el.querySelector('[data-f=time]').onchange = (e) => (q.time = Number(e.target.value));
      el.querySelector('[data-f=del]').onclick = () => {
        ui.editing.questions.splice(qi, 1);
        renderQuestions();
      };
      el.querySelector('[data-f=mediaText]')?.addEventListener('input', (e) => (q.mediaText = e.target.value));
      el.querySelector('[data-f=unit]')?.addEventListener('input', (e) => (q.unit = e.target.value));
      el.querySelector('[data-f=typedAnswer]')?.addEventListener('input', (e) => (q.typedAnswer = e.target.value));
      el.querySelector('[data-f=acceptText]')?.addEventListener('input', (e) => (q.acceptText = e.target.value));
      el.querySelectorAll('[data-a]').forEach((input) => (input.oninput = (e) => (q.answers[Number(input.dataset.a)] = e.target.value)));
      el.querySelectorAll('[data-c]').forEach((radio) => (radio.onchange = () => (q.correct = Number(radio.dataset.c))));
      el.querySelectorAll('[data-o]').forEach((input) => (input.oninput = (e) => (q.orderItems[Number(input.dataset.o)] = e.target.value)));
      el.querySelectorAll('[data-n]').forEach((input) => (input.oninput = (e) => (q[input.dataset.n] = Number(e.target.value))));
      wrap.appendChild(el);
    });
  }

  function mediaFrom(text) {
    const t = (text || '').trim();
    if (!t) return undefined;
    if (/^https:\/\//i.test(t)) return { kind: 'image', src: t };
    return { kind: 'emoji', value: t.slice(0, 40) };
  }

  // Dal formato dell'editor al formato di gioco.
  function normalizeQuiz(draft) {
    const rng = Bank.makeRng();
    const questions = draft.questions.map((q) => {
      const base = { type: q.type, text: q.text.trim(), time: q.time };
      if (q.type === 'quiz' || q.type === 'vero_falso') {
        // Le risposte facoltative vuote (3 e 4) vengono tolte; l'indice corretto viene riallineato.
        const kept = q.answers.map((text, i) => ({ text: text.trim(), i })).filter((a, idx) => a.text || idx < 2);
        const media = mediaFrom(q.mediaText);
        return { ...base, answers: kept.map((a) => a.text), correct: kept.findIndex((a) => a.i === q.correct), ...(media ? { media } : {}) };
      }
      if (q.type === 'ordina') {
        const inOrder = q.orderItems.map((x) => x.trim()).filter(Boolean);
        let shuffled = inOrder.slice();
        for (let i = 0; i < 5 && shuffled.every((x, k) => x === inOrder[k]); i++) shuffled = inOrder.slice().sort(() => rng() - 0.5);
        return { ...base, items: shuffled, correct: inOrder.map((x) => shuffled.indexOf(x)) };
      }
      if (q.type === 'scrivi') {
        const media = mediaFrom(q.mediaText);
        const accept = (q.acceptText || '').split(',').map((x) => x.trim()).filter(Boolean).slice(0, 10);
        return { ...base, answer: (q.typedAnswer || '').trim(), ...(accept.length ? { accept } : {}), ...(media ? { media } : {}) };
      }
      return { ...base, answer: q.answer, min: q.min, max: q.max, tol: Math.max(0, q.tol || 0), step: 1, unit: (q.unit || '').trim() };
    });
    return { id: draft.id || `quiz-${Date.now()}`, title: $('ed-title').value.trim(), description: $('ed-desc').value.trim(), questions };
  }

  function validateDraft(quiz) {
    if (!quiz.title) return 'Dai un titolo al quiz.';
    for (const [i, q] of quiz.questions.entries()) {
      const n = i + 1;
      if (!q.text) return `Scrivi il testo della domanda ${n}.`;
      if (q.answers?.some((a) => !a)) return `Completa le risposte della domanda ${n}.`;
      if (q.correct === -1) return `La risposta corretta della domanda ${n} è vuota.`;
      if (q.type === 'scrivi' && !q.answer) return `Scrivi la risposta esatta della domanda ${n}.`;
      if (q.type === 'ordina' && q.items.length < 3) return `La domanda ${n} deve avere almeno 3 elementi da ordinare.`;
      if (q.type === 'ordina' && new Set(q.items).size !== q.items.length) return `Gli elementi della domanda ${n} devono essere diversi.`;
    }
    return validateQuiz(quiz);
  }

  $('btn-new').onclick = () => openEditor(null);
  $('ed-cancel').onclick = () => {
    renderHome();
    document.querySelector('.tab[data-tab=miei]').click();
  };
  document.querySelectorAll('[data-add]').forEach((b) => {
    b.onclick = () => {
      ui.editing.questions.push(blankQuestion(b.dataset.add));
      renderQuestions();
      window.scrollTo({ top: document.body.scrollHeight, behavior: 'smooth' });
    };
  });
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
    document.querySelector('.tab[data-tab=miei]').click();
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
      hostAvatar: UI.AVATARS[Math.floor(Math.random() * UI.AVATARS.length)],
      hostAnswered: false,
      theme: setup.theme,
      prevRanks: new Map(),
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
        return send(from, { t: 'welcome', title: session.quiz.title, theme: session.theme });
      case 'join':
      case 'rejoin': {
        if (session.banned.has(from)) return send(from, { t: 'kicked' });
        if (!game.players.has(from)) {
          const res = game.addPlayer(from, msg.nickname, msg.avatar);
          if (res.error) return send(from, { t: msg.t === 'join' ? 'joinError' : 'rejoinFailed', message: res.error });
          if (game.state === 'lobby') UI.sound('join');
        }
        session.lastSeen.set(from, Date.now());
        const player = game.players.get(from);
        send(from, { t: 'joined', nickname: player.nickname, avatar: player.avatar, score: player.score, title: session.quiz.title, theme: session.theme, snapshot: snapshot(from) });
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
    return { t: 'question', ...session.game.publicQuestion(), remaining: remaining() };
  }

  function resultMessage(player) {
    const { game } = session;
    const { choice, ...last } = player.last;
    return { t: 'result', index: game.index, ...last, score: player.score, streak: player.streak, players: game.players.size };
  }

  function finalMessage() {
    return { t: 'final', ranking: session.game.ranking().map((p) => [p.id, p.score]) };
  }

  function getreadyMessage(ms) {
    const { game } = session;
    const q = game.question;
    return {
      t: 'getready', index: game.index, total: game.total, ms, mode: q.mode || q.type, double: Boolean(q.double), theme: session.theme,
      next: q.media?.kind === 'image' ? { kind: 'image', src: q.media.src } : null,
    };
  }

  // Stato attuale per chi entra o rientra a partita in corso.
  function snapshot(key) {
    const { game } = session;
    const player = game.players.get(key);
    switch (game.state) {
      case 'getready':
        return getreadyMessage(remaining());
      case 'question':
        return { ...questionMessage(), answered: game.answers.has(key) };
      case 'results':
      case 'scoreboard':
        return player.last ? { ...resultMessage(player), reveal: game.reveal() } : { t: 'wait', index: game.index };
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
    UI.sound('tap');
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
    ui.timer?.stop();
  }

  function openLobby() {
    $('lobby-pin').textContent = session.pin.replace(/(\d{3})(\d{3})/, '$1 $2');
    $('lobby-title').textContent = session.quiz.title;
    $('lobby-desc').textContent = session.quiz.description || `${session.quiz.questions.length} domande`;
    $('join-url').textContent = location.host;
    $('share-native').classList.toggle('hidden', !navigator.share);
    $('host-play-form').classList.toggle('hidden', session.hostPlays);
    $('host-play-on').classList.toggle('hidden', !session.hostPlays);
    $('lobby-players').innerHTML = '';
    renderPlayers();
    show('h-lobby');
  }

  function renderPlayers() {
    if (!session) return;
    const players = [...session.game.players.values()];
    const count = players.length;
    $('lobby-count').textContent = `👥 ${count} ${count === 1 ? 'giocatore' : 'giocatori'}`;
    $('btn-start').disabled = count === 0;
    $('lobby-wait').classList.toggle('hidden', count > 0);
    const wrap = $('lobby-players');
    const existing = new Map([...wrap.children].map((el) => [el.dataset.id, el]));
    for (const p of players) {
      if (existing.has(p.id)) {
        existing.delete(p.id);
        continue;
      }
      const chip = document.createElement('button');
      chip.className = 'player-chip';
      chip.dataset.id = p.id;
      chip.innerHTML = `<span class="avatar">${esc(p.avatar)}</span>${esc(p.nickname)}${p.id === HOST_KEY ? ' (tu)' : ''}`;
      if (p.id !== HOST_KEY) {
        chip.title = 'Rimuovi giocatore';
        chip.onclick = () => kick(p.id);
      } else {
        chip.disabled = true;
      }
      wrap.appendChild(chip);
    }
    existing.forEach((el) => el.remove());
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
    const res = session.game.addPlayer(HOST_KEY, $('host-nick').value, session.hostAvatar);
    if (res.error) return alert(res.error);
    session.hostPlays = true;
    $('host-play-form').classList.add('hidden');
    $('host-play-on').textContent = `Giochi anche tu come ${res.player.avatar} «${res.player.nickname}». Rispondi direttamente da questo schermo.`;
    $('host-play-on').classList.remove('hidden');
    renderPlayers();
  });

  $('share-native').onclick = () => {
    navigator.share({ title: 'Quizzone!', text: `Gioca con me a «${session.quiz.title}»! PIN: ${session.pin}`, url: joinUrl() }).catch(() => {});
  };
  $('share-copy').onclick = async () => {
    try {
      await navigator.clipboard.writeText(joinUrl());
      $('share-copy').textContent = '✅ Link copiato!';
    } catch {
      prompt('Copia questo link:', joinUrl());
    }
    setTimeout(() => ($('share-copy').textContent = '🔗 Copia link'), 2000);
  };

  function startQuestion() {
    const { game } = session;
    clearTimer();
    if (!game.nextQuestion()) return endGame();
    const q = game.question;
    if (game.index === 0) UI.sound('start');
    session.phaseEndsAt = Date.now() + GET_READY_MS;
    $('gr-mode').textContent = modeLabel(q);
    $('gr-double').classList.toggle('hidden', !q.double);
    if (q.double) UI.sound('join');
    $('gr-num').textContent = `Domanda ${game.index + 1} di ${game.total}`;
    $('gr-text').textContent = q.text;
    UI.preload(q.media);
    const bar = $('gr-bar');
    bar.style.transition = 'none';
    bar.style.transform = 'scaleX(1)';
    requestAnimationFrame(() => requestAnimationFrame(() => {
      bar.style.transition = `transform ${GET_READY_MS}ms linear`;
      bar.style.transform = 'scaleX(0)';
    }));
    show('h-getready');
    broadcast(getreadyMessage(GET_READY_MS));
    session.timer = setTimeout(openQuestion, GET_READY_MS);
  }

  // Riquadri delle risposte (domande a scelta), con la soluzione se «correct» è definito.
  function tilesHtml(q, correct) {
    return q.answers.map((a, i) => `
      <button class="host-tile c${i} ${correct !== undefined && i !== correct ? 'dim' : ''}" data-i="${i}" ${correct !== undefined || !session.hostPlays ? 'disabled' : ''}>
        ${UI.SHAPES[i]}${q.answerMedia ? `<img src="${esc(UI.safeSrc(q.answerMedia[i]))}" alt="" referrerpolicy="no-referrer">` : ''}
        <span>${q.answerMedia && correct === undefined ? '' : esc(a)}</span>
        ${correct === i ? '<span class="tick">✓</span>' : ''}
      </button>`).join('');
  }

  function openQuestion() {
    const { game } = session;
    game.openQuestion();
    const q = game.publicQuestion();
    session.phaseEndsAt = Date.now() + q.time * 1000;
    session.hostAnswered = false;
    $('q-cat').textContent = `${q.categoryEmoji || '✏️'} ${q.category || session.quiz.title}`;
    $('q-mode').textContent = modeLabel(q);
    $('q-double').classList.toggle('hidden', !q.double);
    $('q-text').textContent = q.text;
    $('q-count').textContent = '0';
    UI.renderMedia($('q-media'), q.media);

    const tiles = $('q-answers');
    const input = $('q-input');
    tiles.className = 'host-tiles';
    tiles.innerHTML = '';
    input.classList.add('hidden');
    if (q.type === 'quiz' || q.type === 'vero_falso') {
      tiles.innerHTML = tilesHtml(q);
      tiles.querySelectorAll('[data-i]').forEach((tile) => (tile.onclick = () => hostAnswer(Number(tile.dataset.i))));
    } else if (session.hostPlays) {
      input.classList.remove('hidden');
      UI.renderAnswerInput(input, q, (choice) => hostAnswer(choice));
    } else if (q.type === 'scrivi') {
      tiles.className = '';
      tiles.innerHTML = `<p class="host-number-hint">⌨️ Scrivi la risposta sul telefono · ${esc(q.hint)}</p>`;
    } else if (q.type === 'ordina') {
      tiles.className = 'host-items';
      tiles.innerHTML = q.items.map((it, i) => `<div class="host-item c${i % 6}"><span class="n">?</span>${esc(it)}</div>`).join('');
    } else {
      tiles.className = '';
      tiles.innerHTML = `<p class="host-number-hint">🎯 Scegli un numero tra ${UI.formatNumber(q.min, q.format)} e ${UI.formatNumber(q.max, q.format)}${q.unit ? ` ${esc(q.unit)}` : ''}${q.tol ? ` (tolleranza ±${q.tol})` : ''}</p>`;
    }

    ui.timer = UI.timer($('q-timer'), q.time, { onTick: (s) => s <= 3 && s > 0 && UI.sound('tick') });
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
    UI.sound('sent');
    submit(HOST_KEY, choice);
  }

  function closeQuestion() {
    const { game } = session;
    if (game.state !== 'question') return;
    clearTimer();
    const summary = game.closeQuestion();
    const q = game.publicQuestion();
    const { reveal } = summary;
    $('r-text').textContent = q.text;
    const body = $('r-body');
    const answered = summary.answered || 0;

    if (reveal.type === 'quiz' || reveal.type === 'vero_falso') {
      const max = Math.max(1, ...summary.distribution);
      body.innerHTML = `
        <div class="chart">${summary.distribution.map((n, i) => `
          <div class="bar c${i} ${i !== reveal.correct ? 'dim' : ''}">
            <div class="bar-fill" style="height:0%" data-h="${(n / max) * 82}"></div>
            <div class="bar-label">${UI.SHAPES[i]}${n}${i === reveal.correct ? ' ✓' : ''}</div>
          </div>`).join('')}</div>
        <div class="host-tiles">${tilesHtml(q, reveal.correct)}</div>`;
      requestAnimationFrame(() => requestAnimationFrame(() => {
        body.querySelectorAll('.bar-fill').forEach((b) => (b.style.height = `${b.dataset.h}%`));
      }));
    } else if (reveal.type === 'ordina') {
      const right = summary.distribution[0];
      body.innerHTML = `
        <p class="ratio">${right} su ${answered} ${right === 1 ? 'ha' : 'hanno'} trovato l'ordine giusto</p>
        <div class="host-items">${reveal.correct.map((idx, pos) => `
          <div class="host-item c${idx % 6}" style="animation-delay:${pos * 0.12}s"><span class="n">${pos + 1}</span>${esc(q.items[idx])}</div>`).join('')}</div>`;
    } else if (reveal.type === 'scrivi') {
      const right = summary.distribution[0];
      body.innerHTML = `
        <p class="ratio">La risposta era</p>
        <div class="big-answer">${esc(reveal.text)}</div>
        <p class="ratio">${right} su ${answered} ${right === 1 ? 'l\'ha scritta' : 'l\'hanno scritta'}</p>
        ${summary.typed.length ? `<div class="typed-cloud">${summary.typed.map((w, i) => `
          <span class="typed-word ${w.correct ? 'ok' : 'ko'}" style="animation-delay:${i * 0.08}s">${esc(w.text)}${w.count > 1 ? ` <b>×${w.count}</b>` : ''}</span>`).join('')}</div>` : ''}`;
    } else {
      body.innerHTML = `
        <p class="ratio">La risposta era</p>
        <div class="big-answer">${esc(reveal.text)}</div>
        <p class="ratio">${summary.distribution[0]} su ${answered} ${q.tol ? 'nella tolleranza' : (summary.distribution[0] === 1 ? 'ha indovinato' : 'hanno indovinato')}</p>
        ${summary.closest.length ? `<div class="closest">${summary.closest.map((c, i) => `
          <div class="closest-row" style="animation-delay:${i * 0.12}s"><span>${['🥇', '🥈', '🥉'][i]} ${esc(c.avatar)} ${esc(c.nickname)}</span><span>${UI.formatNumber(c.guess, q.format)}</span></div>`).join('')}</div>` : ''}`;
    }
    $('r-why').textContent = reveal.why || '';
    $('r-why').classList.toggle('hidden', !reveal.why);
    UI.renderCredit($('r-credit'), reveal.credit);

    const me = game.players.get(HOST_KEY);
    $('r-mine').classList.toggle('hidden', !me);
    if (me) {
      const l = me.last;
      $('r-mine').className = `my-result ${l.correct ? 'ok' : 'ko'}`;
      $('r-mine').textContent = `${l.correct ? `Corretto${l.typo ? ' (con un piccolo errore)' : ''}! +${l.points}${q.double ? ' ⚡' : ''}` : l.close ? 'C\'eri quasi!' : l.answered ? 'Sbagliato' : 'Tempo scaduto'} · ${l.rank}° posto · ${me.score} punti`;
      if (l.correct) UI.confetti({ count: 80, duration: 1800 });
      UI.sound(l.correct ? 'correct' : 'wrong');
    } else {
      UI.sound('close');
    }
    show('h-results');

    // Un solo messaggio con i risultati di tutti: meno traffico sui relay.
    const results = {};
    for (const player of game.players.values()) if (player.id !== HOST_KEY) results[player.id] = resultMessage(player);
    broadcast({ t: 'results', index: game.index, reveal, results });
  }

  function showScoreboard() {
    const { game } = session;
    game.state = 'scoreboard';
    const ranking = game.ranking();
    const top = ranking.slice(0, 8);
    const best = Math.max(1, ...top.map((p) => p.score));
    const prev = session.prevRanks;
    const last = game.index + 1 >= game.total;
    $('btn-next').textContent = last ? '🏆 Vai al podio' : 'Prossima domanda ▶';
    $('sb-list').innerHTML = top.length
      ? top.map((p, i) => {
        const gained = p.last?.points || 0;
        const before = prev.get(p.id);
        const move = before ? before - (i + 1) : 0;
        return `
        <div class="score-row" style="animation-delay:${i * 0.08}s; --w:${Math.round((p.score / best) * 100)}%">
          <span class="pos">${i + 1}</span><span class="avatar">${esc(p.avatar)}</span>
          <span class="name">${esc(p.nickname)}</span>
          ${move ? `<span class="move ${move > 0 ? 'up' : 'down'}" aria-label="${move > 0 ? 'sale' : 'scende'} di ${Math.abs(move)}">${move > 0 ? '▲' : '▼'}${Math.abs(move)}</span>` : ''}
          ${gained ? `<span class="gain">+${gained.toLocaleString('it-IT')}</span>` : ''}
          <span class="pts" data-from="${p.score - gained}" data-to="${p.score}">${(p.score - gained).toLocaleString('it-IT')}</span>
        </div>`;
      }).join('')
      : '<p>Nessun giocatore rimasto.</p>';
    session.prevRanks = new Map(ranking.map((p, i) => [p.id, i + 1]));
    show('h-scoreboard');
    countUp($('sb-list').querySelectorAll('.pts'));
  }

  // I punteggi salgono fino al nuovo totale.
  function countUp(els, ms = 900) {
    const t0 = performance.now();
    const frame = (t) => {
      const k = Math.min(1, (t - t0) / ms);
      const ease = 1 - (1 - k) ** 3;
      els.forEach((el) => {
        const from = Number(el.dataset.from);
        const to = Number(el.dataset.to);
        el.textContent = Math.round(from + (to - from) * ease).toLocaleString('it-IT');
      });
      if (k < 1) requestAnimationFrame(frame);
    };
    setTimeout(() => requestAnimationFrame(frame), 350);
  }

  function endGame() {
    const { game } = session;
    clearTimer();
    game.state = 'gameover';
    const medals = ['🥇', '🥈', '🥉'];
    $('pod-title').textContent = `🏆 ${session.quiz.title}`;
    $('pod').innerHTML = game.scoreboard(3).map((p, i) => `
      <div class="podium-step p${i + 1}">
        <span class="avatar">${esc(p.avatar)}</span>
        <span class="medal">${medals[i]}</span>
        <span class="name">${esc(p.nickname)}</span>
        <span>${p.score.toLocaleString('it-IT')} punti</span>
        <span class="small muted">${p.correctCount}/${game.total} giuste</span>
      </div>`).join('');
    show('h-podium');
    UI.sound('podium');
    setTimeout(() => UI.confetti({ count: 220, duration: 4500 }), 1500);
    broadcast(finalMessage());
  }

  // Nuova partita con lo stesso PIN e gli stessi giocatori (nessuno deve rientrare).
  function playAgain() {
    const old = session;
    const origin = old.quiz.origin;
    const quiz = origin ? generate(origin) : old.quiz;
    if (!quiz) return;
    const game = new Game(old.pin, quiz);
    for (const p of old.game.players.values()) {
      if (p.id === HOST_KEY || isConnected(p.id)) game.addPlayer(p.id, p.nickname, p.avatar);
    }
    Object.assign(old, { quiz, game, phaseEndsAt: 0, hostAnswered: false, prevRanks: new Map() });
    broadcast({ t: 'restart', title: quiz.title });
    openLobby();
  }

  function closeGame() {
    if (session) {
      clearTimer();
      clearInterval(session.heartbeat);
      broadcast({ t: 'ended' });
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
  $('btn-again').onclick = playAgain;
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

  UI.installSoundToggle();
  renderHome();
})();
