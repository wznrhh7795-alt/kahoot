'use strict';

const test = require('node:test');
const assert = require('node:assert/strict');
for (const f of ['geo', 'scienza', 'storia', 'cultura', 'lingua', 'varie', 'images']) require(`../public/data/${f}.js`);
// Anche le categorie «pop» (Disney, Harry Potter…), se presenti.
for (const f of require('fs').readdirSync(`${__dirname}/../public/data`).filter((x) => /^pop-[a-z0-9]+\.js$/.test(x)).sort()) require(`../public/data/${f}`);
const Bank = require('../public/js/bank');
const { validateQuestion, validateQuiz, matchTyped, normalizeText, MAX_TYPED, Game } = require('../public/js/game');

const NEW_MODES = ['scrivi', 'intruso', 'duello'];
const DIFFS = ['facile', 'media', 'difficile', 'mista', 'progressiva'];

// Controlli specifici per tipo di domanda (oltre a validateQuestion).
function checkShape(q) {
  const where = `${q.mode}/${q.category}: ${q.text}`;
  if (q.mode === 'scrivi') {
    assert.equal(q.type, 'scrivi', where);
    assert.ok(typeof q.answer === 'string' && normalizeText(q.answer), `risposta vuota → ${where}`);
    assert.ok(q.answer.length <= MAX_TYPED, `risposta troppo lunga (${q.answer}) → ${where}`);
    for (const a of [q.answer, ...(q.accept || [])]) assert.ok(matchTyped(q, a).correct, `«${a}» non viene accettata → ${where}`);
  }
  if (q.mode === 'intruso') {
    assert.equal(q.type, 'quiz', where);
    assert.equal(q.answers.length, 4, where);
    assert.equal(new Set(q.answers).size, 4, `risposte doppie → ${where}`);
    assert.match(q.text, /^Trova l['’]intruso: .* NON /, where);
    assert.ok(q.why, `manca la spiegazione → ${where}`);
  }
  if (q.mode === 'duello') {
    assert.equal(q.type, 'quiz', where);
    assert.equal(q.answers.length, 2, where);
    assert.notEqual(q.answers[0], q.answers[1], where);
    assert.ok(q.why, `manca la spiegazione → ${where}`);
  }
}

test('ogni categoria genera domande valide per tutte le sue modalità e difficoltà', () => {
  const rng = Bank.makeRng(1);
  for (const c of Bank.categories) {
    for (const g of c.generators) {
      for (const diff of ['facile', 'media', 'difficile', 'mista']) {
        for (let i = 0; i < 25; i++) {
          const q = g.make(rng, diff);
          if (!q) continue;
          const error = validateQuestion({ ...q, time: 20 }, `${c.id}/${g.mode}`);
          assert.equal(error, null, `${error} → ${JSON.stringify(q).slice(0, 200)}`);
          assert.ok(q.key, `${c.id}/${g.mode} senza chiave`);
          if (q.answers) assert.equal(new Set(q.answers).size, q.answers.length, `risposte doppie: ${q.text}`);
          checkShape({ ...q, mode: g.mode, category: c.id });
        }
      }
    }
  }
});

test('ci sono migliaia di domande diverse in almeno 24 categorie e 10 modalità', () => {
  assert.ok(Bank.categories.length >= 24);
  assert.equal(Bank.modes.length, 10);
  assert.deepEqual(Bank.modes.slice(0, 6).map((m) => m.id), ['quiz', 'vf', 'immagine', 'citazione', 'ordina', 'numero']);
  assert.ok(Bank.estimateCount() > 5000, `solo ${Bank.estimateCount()}`);
  for (const m of Bank.modes) {
    assert.ok(Bank.categories.some((c) => Bank.modesOf(c).includes(m.id)), `nessuna categoria per ${m.id}`);
  }
});

test('le nuove modalità sono disponibili in almeno 8 categorie, con tante domande', () => {
  for (const id of NEW_MODES) {
    const mode = Bank.modes.find((m) => m.id === id);
    assert.ok(mode && mode.name && mode.emoji && mode.description && mode.time >= 10, `modalità ${id} incompleta`);
    const cats = Bank.categories.filter((c) => Bank.modesOf(c).includes(id));
    assert.ok(cats.length >= 8, `${id} solo in ${cats.length} categorie`);
    const total = cats.filter((c) => c.id !== 'matematica').reduce((n, c) => n + c.generators.filter((g) => g.mode === id).reduce((s, g) => s + g.count, 0), 0);
    assert.ok(total > 500, `${id}: solo ${total} domande`);
  }
});

test('buildGame: niente doppioni, modalità alternate, partita giocabile', () => {
  const g = Bank.buildGame({ count: 40, seed: 99 });
  assert.equal(g.questions.length, 40);
  assert.equal(new Set(g.questions.map((q) => q.key)).size, 40);
  const modes = new Set(g.questions.map((q) => q.mode));
  assert.equal(modes.size, Bank.modes.length);
  assert.equal(validateQuiz(g), null);
  const game = new Game('1', g);
  assert.ok(game.total === 40);
});

test('buildGame rispetta categorie, modalità e velocità', () => {
  const g = Bank.buildGame({ categories: ['bandiere'], modes: ['immagine'], count: 15, speed: 'veloce', seed: 5 });
  assert.equal(g.questions.length, 15);
  assert.ok(g.questions.every((q) => q.category === 'Bandiere' && q.mode === 'immagine' && q.time === 14));
  assert.match(Bank.buildGame({ categories: ['mitologia'], modes: ['numero'] }).error, /Nessuna domanda/);
  const w = Bank.buildGame({ modes: ['scrivi'], count: 10, seed: 3 });
  assert.ok(w.questions.every((q) => q.time === 30 && q.type === 'scrivi'));
});

test('nuove modalità: partite valide per ogni difficoltà, senza doppioni', () => {
  for (const mode of NEW_MODES) {
    for (const difficulty of DIFFS) {
      for (const seed of [1, 7, 42, 1234]) {
        const g = Bank.buildGame({ modes: [mode], count: 25, seed, difficulty });
        assert.equal(validateQuiz(g), null, `${mode}/${difficulty}/${seed}`);
        assert.equal(g.questions.length, 25, `${mode}/${difficulty}/${seed}`);
        assert.equal(new Set(g.questions.map((q) => q.key)).size, g.questions.length, `chiavi doppie in ${mode}/${difficulty}/${seed}`);
        for (const q of g.questions) {
          assert.equal(q.mode, mode);
          checkShape(q);
        }
      }
    }
  }
});

test('nuove modalità anche categoria per categoria', () => {
  for (const c of Bank.categories) {
    for (const mode of NEW_MODES.filter((m) => Bank.modesOf(c).includes(m))) {
      const g = Bank.buildGame({ categories: [c.id], modes: [mode], count: 8, seed: 11 });
      assert.equal(validateQuiz(g), null, `${c.id}/${mode}`);
      assert.ok(g.questions.length >= 4, `${c.id}/${mode}: solo ${g.questions.length} domande`);
      g.questions.forEach(checkShape);
    }
  }
});

test('stress: circa 2000 domande per ogni nuova modalità, tutte valide', () => {
  for (const mode of NEW_MODES) {
    const keys = new Set();
    let n = 0;
    for (let seed = 1; n < 2000; seed++) {
      const g = Bank.buildGame({ modes: [mode], count: 40, seed, difficulty: DIFFS[seed % DIFFS.length], bonus: seed % 2 === 0 });
      assert.equal(validateQuiz(g), null, `${mode}/${seed}`);
      for (const q of g.questions) {
        checkShape(q);
        keys.add(q.key);
      }
      n += g.questions.length;
    }
    assert.ok(keys.size > 600, `${mode}: solo ${keys.size} domande diverse su ${n}`);
  }
});

test('scrivi: la risposta di una domanda simile non passa come errore di battitura', () => {
  const elements = globalThis.QZ_DATA.elements.map((e) => e.name);
  const countries = globalThis.QZ_DATA.countries.map((c) => c.name);
  const cats = Bank.categories.filter((c) => ['elementi', 'bandiere'].includes(c.id));
  const rng = Bank.makeRng(5);
  for (const c of cats) {
    for (const g of c.generators.filter((x) => x.mode === 'scrivi')) {
      for (let i = 0; i < 300; i++) {
        const q = g.make(rng, 'mista');
        // Elementi: nessun altro nome accettato. Bandiere: nessun altro Paese dello stesso continente.
        const country = globalThis.QZ_DATA.countries.find((x) => x.name === q.answer);
        const pool = c.id === 'elementi' ? elements : countries.filter((n) => country && globalThis.QZ_DATA.countries.find((x) => x.name === n).cont === country.cont);
        if (!pool.includes(q.answer)) continue;
        for (const other of pool.filter((x) => x !== q.answer)) {
          assert.ok(!matchTyped(q, other).correct, `«${other}» accettata per «${q.answer}»`);
        }
      }
    }
  }
});

test('difficoltà progressiva: da facile a difficile', () => {
  for (const seed of [2, 8, 21]) {
    const g = Bank.buildGame({ count: 30, difficulty: 'progressiva', seed });
    assert.equal(g.questions.length, 30);
    assert.deepEqual(g.questions.map((q) => q.level), [...Array(10).fill('facile'), ...Array(10).fill('media'), ...Array(10).fill('difficile')]);
    assert.equal(validateQuiz(g), null);
  }
  // Le bandiere hanno la difficoltà nei dati: le prime facili, le ultime difficili.
  const d = Object.fromEntries(globalThis.QZ_DATA.countries.map((c) => [c.iso, c.d]));
  const g = Bank.buildGame({ categories: ['bandiere'], modes: ['immagine'], count: 15, difficulty: 'progressiva', seed: 4 });
  const levels = g.questions.map((q) => d[q.key.split(':')[1]]);
  assert.ok(levels.slice(0, 5).every((x) => x === 1), `inizio: ${levels}`);
  assert.ok(levels.slice(10).every((x) => x >= 2), `fine: ${levels}`);
  // Con pochi dati non si blocca: torna comunque una partita completa.
  const few = Bank.buildGame({ categories: ['spazio'], modes: ['scrivi'], count: 15, difficulty: 'progressiva', seed: 3 });
  assert.equal(few.questions.length, 15);
  assert.ok(Bank.buildGame({ count: 5, seed: 1 }).questions.every((q) => q.level === undefined));
});

test('punti doppi: l\'ultima domanda e circa una ogni 6, mai la prima', () => {
  for (const count of [2, 5, 7, 12, 20, 40]) {
    const g = Bank.buildGame({ count, bonus: true, seed: count });
    const flags = g.questions.map((q) => q.double === true);
    assert.equal(flags[0], false, `prima domanda doppia (${count})`);
    assert.equal(flags.at(-1), true, `ultima non doppia (${count})`);
    const doubles = flags.filter(Boolean).length;
    assert.ok(doubles <= Math.ceil(count / 6) + 1, `troppe doppie (${doubles}/${count})`);
    assert.ok(flags.every((f, i) => !(f && flags[i + 1])), `due doppie di fila (${count})`);
    if (count >= 12) assert.ok(doubles >= Math.floor(count / 6), `poche doppie (${doubles}/${count})`);
    assert.equal(validateQuiz(g), null);
  }
  for (const bonus of [false, undefined]) {
    const g = Bank.buildGame({ count: 20, bonus, seed: 3 });
    assert.ok(g.questions.every((q) => !('double' in q)), 'domande doppie senza bonus');
  }
});

test('partite a tema: scrivi e intrusi/duelli', () => {
  for (const id of ['scrivi', 'sfide']) {
    const p = Bank.presets.find((x) => x.id === id);
    assert.ok(p, `manca il tema ${id}`);
    const g = Bank.buildGame({ categories: p.categories, modes: p.modes, count: 12, seed: 6, title: p.name });
    assert.equal(validateQuiz(g), null);
    assert.ok(g.questions.every((q) => p.modes.includes(q.mode)));
  }
  assert.deepEqual(Bank.presets.find((x) => x.id === 'sfide').modes, ['intruso', 'duello']);
});

test('numeri romani', () => {
  assert.equal(Bank.toRoman(1987), 'MCMLXXXVII');
  assert.equal(Bank.toRoman(2026), 'MMXXVI');
  assert.equal(Bank.toRoman(4), 'IV');
});

test('partite a tema: tutte valide, con le loro opzioni', () => {
  const { validateQuiz: vq } = require('../public/js/game');
  assert.ok(Bank.presets.length >= 30);
  for (const p of Bank.presets) {
    for (const id of p.categories) assert.ok(Bank.categories.some((c) => c.id === id), `${p.id}: categoria ${id}`);
    for (const m of p.modes) assert.ok(Bank.modes.some((x) => x.id === m), `${p.id}: gioco ${m}`);
    const game = Bank.buildGame({ categories: p.categories, modes: p.modes, count: 10, seed: 3, ...p.options });
    assert.equal(game.error, undefined, p.id);
    assert.equal(vq(game), null, p.id);
  }
});
