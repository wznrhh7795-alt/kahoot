(() => {
  const socket = io();
  const $ = (id) => document.getElementById(id);
  const screens = ['h-home', 'h-editor', 'h-lobby', 'h-getready', 'h-question', 'h-results', 'h-scoreboard', 'h-podium'];
  const STORAGE_KEY = 'quizzone.quizzes';
  const TIMES = [5, 10, 20, 30, 60, 90, 120];
  const state = { samples: [], quiz: null, timer: null, editing: null };

  function show(id) {
    for (const s of screens) $(s).classList.toggle('hidden', s !== id);
  }

  $('join-host').textContent = location.host;
  $('join-url').textContent = location.host;

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
    const custom = loadCustom();
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
          <button class="btn light small" data-act="edit" style="border:1px solid #ccc">${isCustom ? 'Modifica' : 'Duplica e modifica'}</button>
          ${isCustom ? '<button class="btn red small" data-act="del">Elimina</button>' : ''}
        </div>`;
      el.querySelector('[data-act=play]').onclick = () => host(quiz);
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
    custom.forEach((q) => list.appendChild(card(q, true)));
    state.samples.forEach((q) => list.appendChild(card(q, false)));
    show('h-home');
  }

  fetch('/api/quizzes')
    .then((r) => r.json())
    .then((samples) => {
      state.samples = samples;
      renderHome();
    });

  // ---- Editor ----
  const blankQuestion = (type) => ({
    type,
    text: '',
    time: type === 'vero_falso' ? 10 : 20,
    answers: type === 'vero_falso' ? ['Vero', 'Falso'] : ['', '', '', ''],
    correct: 0,
  });

  function openEditor(quiz) {
    state.editing = quiz
      ? structuredClone(quiz)
      : { id: null, title: '', description: '', questions: [blankQuestion('quiz')] };
    $('ed-title').value = state.editing.title;
    $('ed-desc').value = state.editing.description || '';
    $('ed-error').classList.add('hidden');
    renderQuestions();
    show('h-editor');
  }

  function renderQuestions() {
    const wrap = $('ed-questions');
    wrap.innerHTML = '';
    state.editing.questions.forEach((q, qi) => {
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
            <button class="btn red small" data-f="del" ${state.editing.questions.length === 1 ? 'disabled' : ''}>Elimina</button>
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
        state.editing.questions.splice(qi, 1);
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

  function validate(quiz) {
    if (!quiz.title) return 'Dai un titolo al quiz.';
    for (const [i, q] of quiz.questions.entries()) {
      if (!q.text) return `Scrivi il testo della domanda ${i + 1}.`;
      if (q.answers.some((a) => !a)) return `Completa le risposte della domanda ${i + 1}.`;
      if (q.correct < 0) return `La risposta corretta della domanda ${i + 1} è vuota.`;
    }
    return null;
  }

  $('btn-new').onclick = () => openEditor(null);
  $('ed-cancel').onclick = renderHome;
  $('ed-add-quiz').onclick = () => {
    state.editing.questions.push(blankQuestion('quiz'));
    renderQuestions();
  };
  $('ed-add-tf').onclick = () => {
    state.editing.questions.push(blankQuestion('vero_falso'));
    renderQuestions();
  };
  $('ed-save').onclick = () => {
    const quiz = normalizeQuiz(state.editing);
    const error = validate(quiz);
    if (error) {
      $('ed-error').textContent = error;
      $('ed-error').classList.remove('hidden');
      window.scrollTo({ top: 0, behavior: 'smooth' });
      return;
    }
    const list = loadCustom().filter((q) => q.id !== quiz.id);
    list.unshift(quiz);
    saveCustom(list);
    renderHome();
  };

  // ---- Partita ----
  function host(quiz) {
    socket.emit('host:create', quiz, (res) => {
      if (res.error) return alert(res.error);
      state.quiz = quiz;
      $('lobby-pin').textContent = res.pin.replace(/(\d{3})(\d{3})/, '$1 $2');
      $('lobby-title').textContent = quiz.title;
      renderPlayers([]);
      show('h-lobby');
    });
  }

  function renderPlayers(players) {
    $('lobby-count').textContent = `${players.length} ${players.length === 1 ? 'giocatore' : 'giocatori'}`;
    $('btn-start').disabled = players.length === 0;
    $('lobby-wait').classList.toggle('hidden', players.length > 0);
    const wrap = $('lobby-players');
    wrap.innerHTML = '';
    for (const nick of players) {
      const chip = document.createElement('button');
      chip.className = 'player-chip';
      chip.textContent = nick;
      chip.title = 'Rimuovi giocatore';
      chip.onclick = () => socket.emit('host:kick', nick);
      wrap.appendChild(chip);
    }
  }

  socket.on('lobby:players', renderPlayers);
  $('btn-start').onclick = () => socket.emit('host:start');
  $('btn-skip').onclick = () => socket.emit('host:skip');
  $('btn-to-score').onclick = () => socket.emit('host:scoreboard');
  $('btn-next').onclick = () => socket.emit('host:next');
  $('btn-home').onclick = () => location.reload();

  socket.on('game:getready', (q) => {
    $('gr-num').textContent = `Domanda ${q.index + 1} di ${q.total}`;
    $('gr-text').textContent = q.text;
    const bar = $('gr-bar');
    bar.style.transition = 'none';
    bar.style.transform = 'scaleX(1)';
    requestAnimationFrame(() => requestAnimationFrame(() => {
      bar.style.transition = `transform ${q.ms}ms linear`;
      bar.style.transform = 'scaleX(0)';
    }));
    show('h-getready');
  });

  function answerTiles(q, correct) {
    return q.answers.map((a, i) => `
      <div class="host-answer c${i} ${correct !== undefined && i !== correct ? 'dim' : ''}">
        ${SHAPES[i]}<span>${escapeHtml(a)}</span>
        ${correct === i ? '<span class="tick">✓</span>' : ''}
      </div>`).join('');
  }

  socket.on('game:question', (q) => {
    $('q-text').textContent = q.text;
    $('q-count').textContent = '0';
    $('q-answers').innerHTML = answerTiles(q);
    let left = q.time;
    $('q-timer').textContent = left;
    clearInterval(state.timer);
    state.timer = setInterval(() => {
      left -= 1;
      $('q-timer').textContent = Math.max(left, 0);
      if (left <= 0) clearInterval(state.timer);
    }, 1000);
    show('h-question');
  });

  socket.on('game:answerCount', (n) => ($('q-count').textContent = n));

  socket.on('game:questionEnd', ({ question, correct, distribution }) => {
    clearInterval(state.timer);
    $('r-text').textContent = question.text;
    const max = Math.max(1, ...distribution);
    $('r-chart').innerHTML = distribution.map((n, i) => `
      <div class="bar ${i !== correct ? 'dim' : ''}">
        <div class="bar-fill c${i}" style="height:0%" data-h="${(n / max) * 80}"></div>
        <div class="bar-label">${SHAPES[i]}${n}${i === correct ? ' ✓' : ''}</div>
      </div>`).join('');
    $('r-answers').innerHTML = answerTiles(question, correct);
    show('h-results');
    requestAnimationFrame(() => requestAnimationFrame(() => {
      document.querySelectorAll('#r-chart .bar-fill').forEach((b) => (b.style.height = `${b.dataset.h}%`));
    }));
  });

  socket.on('game:scoreboard', ({ top, last }) => {
    $('btn-next').textContent = last ? 'Vai al podio' : 'Prossima domanda';
    $('sb-list').innerHTML = top.length
      ? top.map((p, i) => `
        <div class="score-row" style="animation-delay:${i * 0.1}s">
          <span>${escapeHtml(p.nickname)}</span><span>${p.score}</span>
        </div>`).join('')
      : '<p>Nessun giocatore rimasto.</p>';
    show('h-scoreboard');
  });

  socket.on('game:over', ({ podium }) => {
    $('pod-title').textContent = state.quiz ? state.quiz.title : 'Podio';
    const medals = ['🥇', '🥈', '🥉'];
    $('pod').innerHTML = podium.map((p, i) => `
      <div class="podium-step p${i + 1}">
        <span class="medal">${medals[i]}</span>
        <span class="name">${escapeHtml(p.nickname)}</span>
        <span>${p.score} punti</span>
      </div>`).join('');
    show('h-podium');
  });

  socket.on('disconnect', () => {
    if (state.quiz) {
      alert('Connessione al server persa: la partita è terminata.');
      location.reload();
    }
  });
})();
