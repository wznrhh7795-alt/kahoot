// Musica di sottofondo sintetizzata (nessun file audio, nessun diritto d'autore): brani originali
// suonati da un piccolo sequencer con basso, accordi, arpeggi, melodia e batteria.
// Si usa con UI.music.play('home' | 'lobby' | 'question' | 'finale') e UI.music.stop().
(function (root) {
  'use strict';
  const UI = root.UI;
  const freq = (m) => 440 * 2 ** ((m - 69) / 12);
  const SHAPE = { M: [0, 4, 7], m: [0, 3, 7], M7: [0, 4, 7, 11], m7: [0, 3, 7, 10], 7: [0, 4, 7, 10], sus: [0, 5, 7] };
  // Accordo «C», «Am», «Dm7», «G7», «Fmaj7» → [fondamentale MIDI (ottava 3), forma]
  const NAMES = { C: 48, 'C#': 49, Db: 49, D: 50, 'D#': 51, Eb: 51, E: 52, F: 53, 'F#': 54, Gb: 54, G: 55, 'G#': 56, Ab: 56, A: 57, 'A#': 58, Bb: 58, B: 59 };
  function chord(name) {
    const m = name.match(/^([A-G][b#]?)(maj7|m7|m|7|sus)?$/);
    const quality = { maj7: 'M7', m7: 'm7', m: 'm', 7: '7', sus: 'sus' }[m[2]] || 'M';
    return { root: NAMES[m[1]], tones: SHAPE[quality] };
  }
  // Melodie: «n» = nota (C4…B6, con # o b), «-» = prolunga, «.» = pausa; una cella = 1/16.
  function melody(text) {
    const out = [];
    const cells = text.replace(/\|/g, ' ').trim().split(/\s+/);
    cells.forEach((c, i) => {
      if (c === '.' || c === '-') return;
      const m = c.match(/^([A-G][b#]?)(\d)$/);
      if (!m) return;
      let len = 1;
      while (cells[i + len] === '-') len++;
      out.push([i, NAMES[m[1]] - 48 + 12 * (Number(m[2]) + 1), len]);
    });
    return out;
  }

  // ---- I brani (16 passi per battuta) ----
  const TRACKS = {
    // Home: allegra e saltellante
    festa: {
      bpm: 112, chords: ['C', 'G', 'Am', 'F'],
      bass: { pat: 'R.R.o.R.R.R.o.f.', type: 'triangle', vol: 0.55 },
      arp: { pat: '0.1.2.1.0.1.2.1.', type: 'square', vol: 0.07, oct: 24, len: 1 },
      lead: { type: 'triangle', vol: 0.16, notes: melody(`
        E5 . G5 . C6 - - . B5 . G5 . E5 - - .
        D5 . G5 . B5 - - . A5 . G5 . D5 - - .
        C5 . E5 . A5 - - . G5 . E5 . C5 - - .
        C5 . F5 . A5 - - . G5 . F5 . E5 . D5 .`) },
      drums: { k: 'x.......x.......', s: '....x.......x...', h: '..x...x...x...x.' },
    },
    // Home: rilassata, accordi jazz
    passeggiata: {
      bpm: 92, chords: ['Dm7', 'G7', 'Cmaj7', 'Am7'],
      bass: { pat: 'R...f...o...f...', type: 'sine', vol: 0.6 },
      pad: { type: 'triangle', vol: 0.06, oct: 12 },
      lead: { type: 'sine', vol: 0.15, notes: melody(`
        A4 - - . C5 - - . F5 - - - E5 - - .
        D5 - - . F5 - - . B4 - - - . . G4 .
        E5 - - . G5 - - . B5 - - - A5 - G5 -
        E5 - - . C5 - - . A4 - - - . . . .`) },
      drums: { k: 'x.........x.....', h: '....x.......x...', s: '' },
    },
    // Sala d'attesa: groove funky
    attesa: {
      bpm: 118, chords: ['Am', 'F', 'C', 'G'],
      bass: { pat: 'R..R..R.R..R.o..', type: 'square', vol: 0.32 },
      arp: { pat: '..2...1...2.0...', type: 'triangle', vol: 0.12, oct: 24, len: 2 },
      lead: { type: 'square', vol: 0.06, notes: melody(`
        A5 . . C6 . . A5 . G5 . E5 . . . . .
        A5 . . C6 . . A5 . F5 . . . . . . .
        G5 . . C6 . . G5 . E5 . C5 . . . . .
        D5 . . G5 . . B5 . D6 - - - . . . .`) },
      drums: { k: 'x.....x...x.....', s: '....x.......x...', h: 'xxxxxxxxxxxxxxxx' },
    },
    // Domande: quattro brani diversi, tutti con un ritmo che mette fretta
    countdown: {
      bpm: 128, chords: ['Dm', 'Bb', 'C', 'A'],
      bass: { pat: 'RoRoRoRoRoRoRoRo', type: 'sawtooth', vol: 0.12, filter: 700 },
      arp: { pat: '0120120120120121', type: 'square', vol: 0.05, oct: 24, len: 1 },
      drums: { k: 'x...x...x...x...', s: '....x.......x...', h: '.x.x.x.x.x.x.x.x' },
    },
    corsa: {
      bpm: 140, chords: ['Em', 'C', 'D', 'B'],
      bass: { pat: 'R.oR.oR.R.oR.oR.', type: 'square', vol: 0.18, filter: 900 },
      arp: { pat: '0.2.1.2.0.2.1.2.', type: 'triangle', vol: 0.12, oct: 24, len: 1 },
      lead: { type: 'square', vol: 0.05, notes: melody(`
        B5 . . . G5 . . . E5 . . . G5 . B5 .
        C6 . . . G5 . . . E5 . . . G5 . C6 .
        D6 . . . A5 . . . F#5 . . . A5 . D6 .
        D#6 . . . B5 . . . F#5 . . . B5 . D#6 .`) },
      drums: { k: 'x...x...x...x...', s: '....x.......x..x', h: 'xxxxxxxxxxxxxxxx' },
    },
    mistero: {
      bpm: 108, chords: ['Am', 'Dm', 'E', 'Am'],
      bass: { pat: 'R.......f.......', type: 'sine', vol: 0.6 },
      arp: { pat: '0.1.2.1.0.1.2.1.', type: 'sine', vol: 0.16, oct: 24, len: 1 },
      pad: { type: 'triangle', vol: 0.04, oct: 12 },
      drums: { k: 'x.......x.......', w: 'x.x.x.x.x.x.x.x.', s: '' },
    },
    sprint: {
      bpm: 150, chords: ['G', 'Em', 'C', 'D'],
      bass: { pat: 'R.R.R.R.o.o.R.R.', type: 'triangle', vol: 0.5 },
      lead: { type: 'square', vol: 0.06, notes: melody(`
        G5 . B5 . D6 . B5 . G5 . A5 . B5 . D6 .
        E6 . D6 . B5 . G5 . E5 . G5 . B5 . E6 .
        C6 . E6 . G6 . E6 . C6 . B5 . A5 . G5 .
        F#5 . A5 . D6 . F#6 . E6 . D6 . C6 . A5 .`) },
      arp: { pat: '0...1...2...1...', type: 'triangle', vol: 0.08, oct: 12, len: 2 },
      drums: { k: 'x...x...x...x...', s: '....x.......x...', h: '.x.x.x.x.x.x.x.x' },
    },
    // Podio: fanfara
    podio: {
      bpm: 120, chords: ['C', 'F', 'G', 'C'],
      bass: { pat: 'R...R...o...R.f.', type: 'triangle', vol: 0.55 },
      pad: { type: 'sawtooth', vol: 0.035, oct: 12, filter: 1600 },
      lead: { type: 'square', vol: 0.07, notes: melody(`
        C5 . C5 . C5 . E5 - - - G5 - - - - .
        F5 . F5 . F5 . A5 - - - C6 - - - - .
        G5 . G5 . G5 . B5 - - - D6 - - - B5 .
        C6 - - - G5 - - - E5 - - - C5 - - -`) },
      drums: { k: 'x.......x.......', s: '....x.......x.xx', h: 'x.x.x.x.x.x.x.x.' },
    },
  };
  const PLAYLISTS = { home: ['festa', 'passeggiata'], lobby: ['attesa'], question: ['countdown', 'corsa', 'mistero', 'sprint'], finale: ['podio'] };
  const VOLUME = 0.24; // sotto gli effetti sonori

  let now = null; // { list, name, track, out, step, next, timer }
  let wanted = null; // playlist richiesta (anche se l'audio è spento o la pagina è nascosta)
  const lastOf = {};

  function audio() {
    return UI.audioContext ? UI.audioContext() : null;
  }

  let noiseBuf = null;
  function noise(a) {
    if (!noiseBuf) {
      noiseBuf = a.createBuffer(1, a.sampleRate * 0.5, a.sampleRate);
      const d = noiseBuf.getChannelData(0);
      for (let i = 0; i < d.length; i++) d[i] = Math.random() * 2 - 1;
    }
    return noiseBuf;
  }

  function note(a, out, { type, f, t, dur, vol, filter, attack = 0.006 }) {
    const osc = a.createOscillator();
    const g = a.createGain();
    osc.type = type;
    osc.frequency.setValueAtTime(f, t);
    g.gain.setValueAtTime(0.0001, t);
    g.gain.exponentialRampToValueAtTime(vol, t + attack);
    g.gain.exponentialRampToValueAtTime(Math.max(0.0001, vol * 0.6), t + dur * 0.5);
    g.gain.exponentialRampToValueAtTime(0.0001, t + dur);
    let node = osc.connect(g);
    if (filter) {
      const lp = a.createBiquadFilter();
      lp.type = 'lowpass';
      lp.frequency.value = filter;
      node = node.connect(lp);
    }
    node.connect(out);
    osc.start(t);
    osc.stop(t + dur + 0.05);
  }

  function drum(a, out, kind, t) {
    if (kind === 'k') {
      const osc = a.createOscillator();
      const g = a.createGain();
      osc.frequency.setValueAtTime(140, t);
      osc.frequency.exponentialRampToValueAtTime(45, t + 0.12);
      g.gain.setValueAtTime(0.7, t);
      g.gain.exponentialRampToValueAtTime(0.0001, t + 0.18);
      osc.connect(g).connect(out);
      osc.start(t);
      osc.stop(t + 0.2);
      return;
    }
    if (kind === 'w') { // legnetto: il «tic tac» del brano misterioso
      note(a, out, { type: 'sine', f: 1700, t, dur: 0.05, vol: 0.12 });
      return;
    }
    const src = a.createBufferSource();
    src.buffer = noise(a);
    const filter = a.createBiquadFilter();
    const g = a.createGain();
    const hat = kind === 'h';
    filter.type = hat ? 'highpass' : 'bandpass';
    filter.frequency.value = hat ? 7000 : 1800;
    const len = hat ? 0.04 : 0.14;
    g.gain.setValueAtTime(hat ? 0.12 : 0.3, t);
    g.gain.exponentialRampToValueAtTime(0.0001, t + len);
    src.connect(filter).connect(g).connect(out);
    src.start(t);
    src.stop(t + len + 0.02);
  }

  function playStep(a, s, step, t) {
    const tr = s.track;
    const bars = tr.chords.length;
    const pos = step % 16;
    const bar = Math.floor(step / 16) % bars;
    const ch = s.chords[bar];
    const sixteenth = 60 / tr.bpm / 4;
    const out = s.out;
    if (tr.bass) {
      const c = tr.bass.pat[pos];
      const off = { R: 0, o: 12, f: 7, t: ch.tones[1] }[c];
      if (off !== undefined) note(a, out, { type: tr.bass.type, f: freq(ch.root - 12 + off), t, dur: sixteenth * 1.8, vol: tr.bass.vol, filter: tr.bass.filter });
    }
    if (tr.arp) {
      const c = tr.arp.pat[pos];
      if (c && c !== '.') {
        const tone = ch.tones[Number(c) % ch.tones.length] + (Number(c) >= ch.tones.length ? 12 : 0);
        note(a, out, { type: tr.arp.type, f: freq(ch.root + (tr.arp.oct || 12) + tone), t, dur: sixteenth * (tr.arp.len || 1) * 1.2, vol: tr.arp.vol });
      }
    }
    if (tr.pad && pos === 0) {
      for (const tone of ch.tones) note(a, out, { type: tr.pad.type, f: freq(ch.root + (tr.pad.oct || 12) + tone), t, dur: sixteenth * 16, vol: tr.pad.vol, filter: tr.pad.filter || 1400, attack: 0.08 });
    }
    if (tr.lead) {
      const loopStep = step % (bars * 16);
      for (const [, midi, len] of s.leadAt.get(loopStep) || []) {
        note(a, out, { type: tr.lead.type, f: freq(midi), t, dur: sixteenth * len * 0.95, vol: tr.lead.vol, filter: 3200 });
      }
    }
    for (const [kind, pat] of Object.entries(tr.drums || {})) if (pat[pos] === 'x') drum(a, out, kind, t);
  }

  function schedule() {
    const a = audio();
    const s = now;
    if (!a || !s) return;
    const sixteenth = 60 / s.track.bpm / 4;
    if (s.next < a.currentTime - 0.2) s.next = a.currentTime + 0.05; // dopo una pausa non recuperiamo note perse
    while (s.next < a.currentTime + 0.15) {
      try { playStep(a, s, s.step, s.next); } catch {}
      s.step += 1;
      s.next += sixteenth;
    }
  }

  function start(list) {
    const a = audio();
    if (!a) return;
    const names = PLAYLISTS[list];
    // Nessuna ripetizione immediata dello stesso brano nella stessa playlist.
    const choices = names.length > 1 ? names.filter((n) => n !== lastOf[list]) : names;
    const name = choices[Math.floor(Math.random() * choices.length)];
    lastOf[list] = name;
    const track = TRACKS[name];
    const out = a.createGain();
    out.gain.setValueAtTime(0.0001, a.currentTime);
    out.gain.exponentialRampToValueAtTime(VOLUME, a.currentTime + 0.6);
    out.connect(a.destination);
    const leadAt = new Map();
    for (const n of track.lead?.notes || []) leadAt.set(n[0], [...(leadAt.get(n[0]) || []), n]);
    now = { list, name, track, out, leadAt, chords: track.chords.map(chord), step: 0, next: a.currentTime + 0.1 };
    now.timer = setInterval(schedule, 25);
    schedule();
  }

  function fadeOut(s) {
    if (!s) return;
    clearInterval(s.timer);
    const a = audio();
    try {
      s.out.gain.cancelScheduledValues(a.currentTime);
      s.out.gain.setValueAtTime(Math.max(0.0001, s.out.gain.value), a.currentTime);
      s.out.gain.exponentialRampToValueAtTime(0.0001, a.currentTime + 0.4);
      setTimeout(() => s.out.disconnect(), 600);
    } catch {}
  }

  function sync() {
    const canPlay = wanted && UI.audioMode() === 'all' && document.visibilityState !== 'hidden';
    if (!canPlay) {
      fadeOut(now);
      now = null;
      return;
    }
    if (now && now.list === wanted) return;
    fadeOut(now);
    now = null;
    start(wanted);
  }

  const music = {
    play(list) {
      if (!PLAYLISTS[list]) return;
      wanted = list;
      sync();
    },
    // Riparte con un altro brano della stessa playlist (es. a ogni nuova domanda).
    next(list) {
      wanted = list;
      if (now && now.list === list) {
        fadeOut(now);
        now = null;
      }
      sync();
    },
    stop() {
      wanted = null;
      sync();
    },
    get playing() {
      return now ? now.name : null;
    },
    tracks: Object.keys(TRACKS),
  };
  document.addEventListener('visibilitychange', sync);
  UI.onAudioMode?.(sync);
  // I browser avviano l'audio solo dopo un tocco: al primo tocco la musica richiesta parte.
  document.addEventListener('pointerdown', () => setTimeout(sync, 50), { once: true });
  UI.music = music;
})(window);
