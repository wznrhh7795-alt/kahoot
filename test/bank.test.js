'use strict';

const test = require('node:test');
const assert = require('node:assert/strict');
for (const f of ['geo', 'scienza', 'storia', 'cultura', 'lingua', 'varie', 'images']) require(`../public/data/${f}.js`);
const Bank = require('../public/js/bank');
const { validateQuestion, Game } = require('../public/js/game');

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
        }
      }
    }
  }
});

test('ci sono migliaia di domande diverse in 24 categorie e 6 modalità', () => {
  assert.equal(Bank.categories.length, 24);
  assert.equal(Bank.modes.length, 6);
  assert.ok(Bank.estimateCount() > 5000, `solo ${Bank.estimateCount()}`);
  for (const m of Bank.modes) {
    assert.ok(Bank.categories.some((c) => Bank.modesOf(c).includes(m.id)), `nessuna categoria per ${m.id}`);
  }
});

test('buildGame: niente doppioni, modalità alternate, partita giocabile', () => {
  const g = Bank.buildGame({ count: 40, seed: 99 });
  assert.equal(g.questions.length, 40);
  assert.equal(new Set(g.questions.map((q) => q.key)).size, 40);
  const modes = new Set(g.questions.map((q) => q.mode));
  assert.equal(modes.size, 6);
  const game = new Game('1', g);
  assert.ok(game.total === 40);
});

test('buildGame rispetta categorie, modalità e velocità', () => {
  const g = Bank.buildGame({ categories: ['bandiere'], modes: ['immagine'], count: 15, speed: 'veloce', seed: 5 });
  assert.equal(g.questions.length, 15);
  assert.ok(g.questions.every((q) => q.category === 'Bandiere' && q.mode === 'immagine' && q.time === 14));
  assert.match(Bank.buildGame({ categories: ['mitologia'], modes: ['numero'] }).error, /Nessuna domanda/);
});

test('numeri romani', () => {
  assert.equal(Bank.toRoman(1987), 'MCMLXXXVII');
  assert.equal(Bank.toRoman(2026), 'MMXXVI');
  assert.equal(Bank.toRoman(4), 'IV');
});
