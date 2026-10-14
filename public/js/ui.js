// Componenti grafici condivisi da host e giocatori: media (foto, bandiere, emoji, citazioni),
// controlli di risposta (scelta, ordine, numero), timer, coriandoli, suoni e vibrazione.
(function (root) {
  'use strict';

  const esc = (s) => String(s).replace(/[&<>"']/g, (c) => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' })[c]);
  const reducedMotion = () => root.matchMedia?.('(prefers-reduced-motion: reduce)').matches;

  const SHAPES = [
    '<svg class="shape" viewBox="0 0 32 32" aria-hidden="true"><path d="M16 4 L29 27 H3 Z"/></svg>',
    '<svg class="shape" viewBox="0 0 32 32" aria-hidden="true"><path d="M16 2 L29 16 L16 30 L3 16 Z"/></svg>',
    '<svg class="shape" viewBox="0 0 32 32" aria-hidden="true"><circle cx="16" cy="16" r="13"/></svg>',
    '<svg class="shape" viewBox="0 0 32 32" aria-hidden="true"><rect x="4" y="4" width="24" height="24" rx="3"/></svg>',
  ];
  const SHAPE_NAMES = ['Triangolo', 'Rombo', 'Cerchio', 'Quadrato'];
  const AVATARS = ['🦊', '🐼', '🐸', '🦁', '🐯', '🐨', '🐵', '🦄', '🐙', '🦉', '🐧', '🐢', '🦖', '🐝', '🦋', '🐬', '🐳', '🦩', '🐻', '🐰', '🐱', '🐶', '🐲', '👾', '🤖', '👻', '🎃', '🌵', '🍕', '🍩', '🚀', '⚽', '🎸', '🧠', '🌈', '⭐'];

  function formatNumber(n, format) {
    const v = Number(n);
    if (format === 'year') return v < 0 ? `${-v} a.C.` : String(v);
    return v.toLocaleString('it-IT');
  }
  // Solo indirizzi sicuri per immagini e collegamenti ricevuti dalla rete.
  const safeSrc = (u) => (typeof u === 'string' && (/^https:\/\//i.test(u) || /^\/[^/]/.test(u)) ? u : '');
  const safeLink = (u) => (typeof u === 'string' && /^https:\/\//i.test(u) ? u : '');

  // ---- Media ----
  function renderMedia(el, media) {
    el.innerHTML = '';
    el.className = 'media';
    if (!media) {
      el.classList.add('hidden');
      return;
    }
    if (media.kind === 'emoji') {
      el.classList.add('media-emoji');
      el.innerHTML = `<div class="emoji-puzzle" aria-label="Indizio con emoji">${esc(media.value)}</div>`;
    } else if (media.kind === 'quote') {
      el.classList.add('media-quote');
      el.innerHTML = `<blockquote><span class="qmark" aria-hidden="true">“</span>${esc(media.text)}</blockquote>`;
    } else if (media.kind === 'image') {
      el.classList.add('media-image', 'loading');
      if (media.flag) el.classList.add('media-flag');
      const img = new Image();
      img.alt = 'Immagine della domanda';
      img.decoding = 'async';
      img.referrerPolicy = 'no-referrer';
      img.onload = () => el.classList.remove('loading');
      img.onerror = () => {
        el.classList.remove('loading');
        el.classList.add('media-error');
        el.innerHTML = '<div class="media-fallback">Immagine non disponibile 😕</div>';
      };
      img.src = safeSrc(media.src);
      el.appendChild(img);
      // Durante la domanda solo fonte e licenza: l'autore compare nei risultati (renderCredit).
      if (media.license) {
        const credit = document.createElement('span');
        credit.className = 'media-credit';
        credit.textContent = `Immagine: Wikimedia Commons · ${media.license}`;
        el.appendChild(credit);
      }
    }
  }

  // Crediti completi dell'immagine (autore, licenza, collegamento), mostrati dopo la risposta.
  function renderCredit(el, credit) {
    el.innerHTML = '';
    el.classList.toggle('hidden', !credit);
    if (!credit) return;
    const a = document.createElement(safeLink(credit.link) ? 'a' : 'span');
    a.textContent = `📷 Immagine: ${credit.author}${credit.license ? ` · ${credit.license}` : ''} · Wikimedia Commons`;
    if (safeLink(credit.link)) {
      a.href = safeLink(credit.link);
      a.target = '_blank';
      a.rel = 'noopener';
    }
    el.appendChild(a);
  }

  // Precarica l'immagine della prossima domanda (durante «Preparati!»).
  function preload(media) {
    if (media?.kind === 'image') {
      const img = new Image();
      img.referrerPolicy = 'no-referrer';
      img.src = safeSrc(media.src);
    }
  }

  // ---- Controlli di risposta ----
  // Restituisce { lock(choice) } e chiama onSubmit(choice) quando il giocatore conferma.
  // ---- Temi di colore (scelti dall'host, applicati anche ai telefoni) ----
  const THEMES = [
    { id: 'classico', name: 'Classico', color: '#3c1180', swatch: ['#1d0646', '#6d28d9', '#ff3d7f'] },
    { id: 'galassia', name: 'Galassia', color: '#1a1650', swatch: ['#070b24', '#3b2a8a', '#22d3ee'] },
    { id: 'oceano', name: 'Oceano', color: '#04395e', swatch: ['#02182b', '#0a7ea4', '#10b981'] },
    { id: 'tramonto', name: 'Tramonto', color: '#7a1236', swatch: ['#2a0614', '#e0533d', '#ffb347'] },
    { id: 'foresta', name: 'Foresta', color: '#0d4228', swatch: ['#04170f', '#2c7a43', '#a3e635'] },
    { id: 'oro', name: 'Ora d\'oro', color: '#7c3d06', swatch: ['#2b1203', '#d18a12', '#ffd166'] },
  ];
  function applyTheme(id) {
    const theme = THEMES.find((t) => t.id === id) || THEMES[0];
    if (theme.id === 'classico') delete document.documentElement.dataset.theme;
    else document.documentElement.dataset.theme = theme.id;
    document.querySelector('meta[name="theme-color"]')?.setAttribute('content', theme.color);
    return theme.id;
  }

  function renderAnswerInput(container, q, onSubmit) {
    container.innerHTML = '';
    container.className = `answer-input input-${q.type}`;
    if (q.type === 'ordina') return orderInput(container, q, onSubmit);
    if (q.type === 'numero') return numberInput(container, q, onSubmit);
    if (q.type === 'scrivi') return textInput(container, q, onSubmit);
    return choiceInput(container, q, onSubmit);
  }

  // Scrivi la risposta: accenti, maiuscole e piccoli errori vengono perdonati dal motore.
  function textInput(container, q, onSubmit) {
    const max = Number(q.maxLength) || 40;
    container.innerHTML = `
      <form class="text-answer" autocomplete="off">
        <p class="input-hint">⌨️ ${esc(q.hint || 'Scrivi la risposta')}</p>
        <input type="text" class="input text-answer-field" maxlength="${max}" enterkeyhint="send"
          autocapitalize="sentences" autocorrect="off" spellcheck="false" placeholder="Scrivi qui…" aria-label="La tua risposta">
        <div class="input-actions"><button type="submit" class="btn primary" disabled>Invia</button></div>
      </form>`;
    const form = container.querySelector('form');
    const field = form.querySelector('input');
    const ok = form.querySelector('button');
    field.addEventListener('input', () => (ok.disabled = !field.value.trim()));
    form.addEventListener('submit', (e) => {
      e.preventDefault();
      const text = field.value.trim();
      if (!text) return;
      lock(text);
      field.blur();
      onSubmit(text);
    });
    // Sui telefoni la tastiera si apre solo dopo un tocco: il focus automatico vale per i computer.
    if (matchMedia('(pointer: fine)').matches) setTimeout(() => field.focus(), 50);
    function lock(choice) {
      if (typeof choice === 'string') field.value = choice;
      field.disabled = true;
      ok.disabled = true;
      form.classList.add('sent');
    }
    return { lock };
  }

  function choiceInput(container, q, onSubmit) {
    const grid = document.createElement('div');
    grid.className = `answer-grid n${q.answers.length}`;
    const buttons = q.answers.map((text, i) => {
      const btn = document.createElement('button');
      btn.type = 'button';
      btn.className = `answer-btn c${i}`;
      if (q.answerMedia) {
        btn.classList.add('with-image');
        btn.innerHTML = `<span class="corner">${SHAPES[i]}</span><img src="${esc(safeSrc(q.answerMedia[i]))}" alt="${SHAPE_NAMES[i]}" referrerpolicy="no-referrer">`;
        btn.setAttribute('aria-label', `Opzione ${SHAPE_NAMES[i]}`);
      } else {
        btn.innerHTML = `${SHAPES[i]}<span class="answer-label">${esc(text)}</span>`;
        btn.setAttribute('aria-label', `${SHAPE_NAMES[i]}: ${text}`);
      }
      btn.addEventListener('click', () => {
        lock(i);
        onSubmit(i);
      });
      grid.appendChild(btn);
      return btn;
    });
    container.appendChild(grid);
    function lock(choice) {
      buttons.forEach((b, i) => {
        b.disabled = true;
        b.classList.toggle('dim', i !== choice);
        b.classList.toggle('picked', i === choice);
      });
    }
    return { lock };
  }

  function orderInput(container, q, onSubmit) {
    const picked = [];
    container.innerHTML = `
      <p class="input-hint">Tocca le risposte nell'ordine giusto</p>
      <div class="order-list"></div>
      <div class="input-actions">
        <button type="button" class="btn ghost" data-act="reset">↺ Ricomincia</button>
        <button type="button" class="btn primary" data-act="ok" disabled>Conferma</button>
      </div>`;
    const list = container.querySelector('.order-list');
    const okBtn = container.querySelector('[data-act=ok]');
    const buttons = q.items.map((text, i) => {
      const btn = document.createElement('button');
      btn.type = 'button';
      btn.className = `order-item c${i % 6}`;
      btn.innerHTML = `<span class="order-badge" aria-hidden="true"></span><span class="order-text">${esc(text)}</span>`;
      btn.addEventListener('click', () => {
        if (locked) return;
        const pos = picked.indexOf(i);
        if (pos >= 0) picked.splice(pos);
        else picked.push(i);
        sound('tap');
        refresh();
      });
      list.appendChild(btn);
      return btn;
    });
    let locked = false;
    function refresh() {
      buttons.forEach((b, i) => {
        const pos = picked.indexOf(i);
        b.classList.toggle('chosen', pos >= 0);
        b.querySelector('.order-badge').textContent = pos >= 0 ? pos + 1 : '';
        b.setAttribute('aria-label', `${q.items[i]}${pos >= 0 ? `, posizione ${pos + 1}` : ''}`);
      });
      okBtn.disabled = picked.length !== q.items.length;
    }
    container.querySelector('[data-act=reset]').addEventListener('click', () => {
      if (locked) return;
      picked.length = 0;
      refresh();
    });
    okBtn.addEventListener('click', () => {
      if (picked.length !== q.items.length) return;
      lock(picked);
      onSubmit(picked.slice());
    });
    function lock(choice) {
      locked = true;
      if (Array.isArray(choice)) {
        picked.splice(0, picked.length, ...choice);
        refresh();
      }
      container.querySelectorAll('button').forEach((b) => (b.disabled = true));
    }
    refresh();
    return { lock };
  }

  function numberInput(container, raw, onSubmit) {
    const q = { ...raw, min: Number(raw.min) || 0, max: Number(raw.max) || 0, tol: Number(raw.tol) || 0 };
    const step = Number(raw.step) || 1;
    const start = Math.round((q.min + (q.max - q.min) / 2) / step) * step;
    container.innerHTML = `
      <div class="number-display"><span class="number-value"></span><span class="number-unit">${esc(q.unit || '')}</span></div>
      ${q.tol ? `<p class="input-hint">Tolleranza: ±${formatNumber(q.tol)}</p>` : '<p class="input-hint">Serve il numero esatto!</p>'}
      <div class="number-row">
        <button type="button" class="btn round" data-d="-1" aria-label="Diminuisci">−</button>
        <input type="range" class="number-range" min="${q.min}" max="${q.max}" step="${step}" value="${start}" aria-label="Scegli il numero">
        <button type="button" class="btn round" data-d="1" aria-label="Aumenta">+</button>
      </div>
      <div class="number-bounds"><span>${formatNumber(q.min, q.format)}</span><span>${formatNumber(q.max, q.format)}</span></div>
      <div class="input-actions"><button type="button" class="btn primary" data-act="ok">Conferma</button></div>`;
    const range = container.querySelector('.number-range');
    const value = container.querySelector('.number-value');
    const show = () => {
      value.textContent = formatNumber(Number(range.value), q.format);
      const pct = ((range.value - q.min) / (q.max - q.min)) * 100;
      range.style.setProperty('--pct', `${pct}%`);
    };
    range.addEventListener('input', show);
    // Pulsanti −/+ con ripetizione tenendo premuto
    container.querySelectorAll('[data-d]').forEach((btn) => {
      let timer;
      const bump = () => {
        range.value = Math.min(q.max, Math.max(q.min, Number(range.value) + Number(btn.dataset.d) * step));
        show();
      };
      const stop = () => clearInterval(timer);
      btn.addEventListener('pointerdown', (e) => {
        e.preventDefault();
        bump();
        let speed = 0;
        clearInterval(timer);
        timer = setInterval(() => {
          bump();
          if (++speed === 8) {
            clearInterval(timer);
            timer = setInterval(bump, 40);
          }
        }, 180);
      });
      ['pointerup', 'pointerleave', 'pointercancel'].forEach((ev) => btn.addEventListener(ev, stop));
    });
    container.querySelector('[data-act=ok]').addEventListener('click', () => {
      lock(Number(range.value));
      onSubmit(Number(range.value));
    });
    function lock(choice) {
      if (Number.isFinite(choice)) range.value = choice;
      show();
      container.querySelectorAll('button, input').forEach((b) => (b.disabled = true));
    }
    show();
    return { lock };
  }

  // ---- Timer ad anello ----
  function timer(el, seconds, { onTick } = {}) {
    el.innerHTML = `<svg viewBox="0 0 44 44" aria-hidden="true"><circle class="ring-bg" cx="22" cy="22" r="19"/><circle class="ring-fg" cx="22" cy="22" r="19"/></svg><span class="timer-num"></span>`;
    el.classList.add('timer');
    const fg = el.querySelector('.ring-fg');
    const num = el.querySelector('.timer-num');
    const total = Math.max(seconds, 1);
    const end = Date.now() + seconds * 1000;
    const C = 2 * Math.PI * 19;
    fg.style.strokeDasharray = C;
    let last = null;
    function frame() {
      const left = Math.max(0, end - Date.now());
      const s = Math.ceil(left / 1000);
      fg.style.strokeDashoffset = C * (1 - left / (total * 1000));
      el.classList.toggle('urgent', s <= 5 && left > 0);
      if (s !== last) {
        num.textContent = s;
        if (last !== null) onTick?.(s);
        last = s;
      }
      if (left > 0) raf = requestAnimationFrame(frame);
    }
    let raf = requestAnimationFrame(frame);
    return { stop: () => cancelAnimationFrame(raf) };
  }

  // ---- Coriandoli ----
  function confetti({ count = 140, duration = 2800 } = {}) {
    // Con «Riduci movimento» meno coriandoli, ma ci sono comunque.
    if (reducedMotion()) count = Math.round(count * 0.5);
    const canvas = document.createElement('canvas');
    canvas.className = 'confetti';
    document.body.appendChild(canvas);
    const ctx = canvas.getContext('2d');
    const dpr = Math.min(root.devicePixelRatio || 1, 2);
    const W = (canvas.width = innerWidth * dpr);
    const H = (canvas.height = innerHeight * dpr);
    const colors = ['#ff3355', '#1f8bff', '#ffc531', '#2bd96b', '#b26bff', '#ffffff', '#ff8a3d'];
    const parts = Array.from({ length: count }, () => ({
      x: W / 2 + (Math.random() - 0.5) * W * 0.3,
      y: H * 0.35,
      vx: (Math.random() - 0.5) * 18 * dpr,
      vy: (-Math.random() * 16 - 6) * dpr,
      size: (6 + Math.random() * 8) * dpr,
      rot: Math.random() * Math.PI,
      vr: (Math.random() - 0.5) * 0.3,
      color: colors[Math.floor(Math.random() * colors.length)],
      shape: Math.random() < 0.3 ? 'circle' : 'rect',
    }));
    const start = performance.now();
    let prev = start;
    function frame(t) {
      const elapsed = t - start;
      // Movimento legato al tempo, non ai fotogrammi: stessa velocità a 30, 60 o 120 Hz.
      const k = Math.min(Math.max((t - prev) / 16.7, 0), 3);
      prev = t;
      ctx.clearRect(0, 0, W, H);
      for (const p of parts) {
        p.vy += 0.45 * dpr * k;
        p.vx *= 0.99 ** k;
        p.x += p.vx * k;
        p.y += p.vy * k;
        p.rot += p.vr * k;
        ctx.save();
        ctx.globalAlpha = Math.max(0, 1 - elapsed / duration);
        ctx.translate(p.x, p.y);
        ctx.rotate(p.rot);
        ctx.fillStyle = p.color;
        if (p.shape === 'circle') {
          ctx.beginPath();
          ctx.arc(0, 0, p.size / 2.5, 0, Math.PI * 2);
          ctx.fill();
        } else {
          ctx.fillRect(-p.size / 2, -p.size / 4, p.size, p.size / 2);
        }
        ctx.restore();
      }
      if (elapsed < duration) requestAnimationFrame(frame);
      else canvas.remove();
    }
    requestAnimationFrame(frame);
  }

  // ---- Suoni sintetizzati (nessun file audio) ----
  let audio = null;
  let muted = false;
  try {
    muted = localStorage.getItem('quizzone.muted') === '1';
  } catch {}
  function ctx() {
    if (!audio) {
      const AC = root.AudioContext || root.webkitAudioContext;
      if (!AC) return null;
      audio = new AC();
    }
    if (audio.state === 'suspended') audio.resume();
    return audio;
  }
  function tone(freq, start, dur, { type = 'triangle', gain = 0.12, slide } = {}) {
    const a = ctx();
    if (!a) return;
    const t = a.currentTime + start;
    const osc = a.createOscillator();
    const g = a.createGain();
    osc.type = type;
    osc.frequency.setValueAtTime(freq, t);
    if (slide) osc.frequency.exponentialRampToValueAtTime(slide, t + dur);
    g.gain.setValueAtTime(0.0001, t);
    g.gain.exponentialRampToValueAtTime(gain, t + 0.015);
    g.gain.exponentialRampToValueAtTime(0.0001, t + dur);
    osc.connect(g).connect(a.destination);
    osc.start(t);
    osc.stop(t + dur + 0.05);
  }
  const SOUNDS = {
    tap: () => tone(660, 0, 0.06, { gain: 0.06 }),
    tick: () => tone(1046, 0, 0.05, { type: 'square', gain: 0.03 }),
    join: () => { tone(523, 0, 0.08); tone(784, 0.07, 0.12); },
    start: () => [523, 659, 784, 1046].forEach((f, i) => tone(f, i * 0.09, 0.18, { gain: 0.1 })),
    correct: () => [659, 831, 988, 1319].forEach((f, i) => tone(f, i * 0.07, 0.2, { gain: 0.1 })),
    wrong: () => { tone(330, 0, 0.18, { type: 'sawtooth', gain: 0.05 }); tone(247, 0.16, 0.3, { type: 'sawtooth', gain: 0.05 }); },
    close: () => { tone(523, 0, 0.12); tone(587, 0.1, 0.18); },
    sent: () => tone(880, 0, 0.1, { slide: 1320, gain: 0.07 }),
    podium: () => [523, 659, 784, 1046, 784, 1046, 1319].forEach((f, i) => tone(f, i * 0.12, 0.3, { gain: 0.1 })),
  };
  function sound(name) {
    if (muted) return;
    try {
      SOUNDS[name]?.();
    } catch {}
  }
  function setMuted(value) {
    muted = value;
    try {
      localStorage.setItem('quizzone.muted', value ? '1' : '0');
    } catch {}
    document.querySelectorAll('.mute-btn').forEach((b) => {
      b.textContent = muted ? '🔇' : '🔊';
      b.setAttribute('aria-label', muted ? 'Attiva i suoni' : 'Disattiva i suoni');
    });
  }
  // Pulsante audio fisso + sblocco dell'audio al primo tocco (richiesto dai browser mobili).
  function installSoundToggle() {
    const btn = document.createElement('button');
    btn.type = 'button';
    btn.className = 'mute-btn';
    btn.addEventListener('click', () => setMuted(!muted));
    document.body.appendChild(btn);
    setMuted(muted);
    document.addEventListener('pointerdown', () => ctx(), { once: true });
  }

  function vibrate(pattern) {
    try {
      navigator.vibrate?.(pattern);
    } catch {}
  }

  root.UI = {
    esc, safeSrc, SHAPES, SHAPE_NAMES, AVATARS, THEMES, applyTheme, formatNumber, renderMedia, renderCredit, preload, renderAnswerInput,
    timer, confetti, sound, installSoundToggle, vibrate,
  };
  // Compatibilità con il codice esistente
  root.SHAPES = SHAPES;
  root.SHAPE_NAMES = SHAPE_NAMES;
  root.escapeHtml = esc;
})(window);
