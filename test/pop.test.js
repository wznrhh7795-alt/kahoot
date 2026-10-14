'use strict';

// Categorie «pop» descritte da dati: ogni gioco produce domande valide e senza soluzioni ambigue.
const test = require('node:test');
const assert = require('node:assert/strict');
global.window = globalThis;
require('./fixtures/pop-prova.js');
const { validateQuiz } = require('../public/js/game');
const Bank = require('../public/js/bank');

test('una categoria pop genera domande valide per tutti i 9 giochi', () => {
  const cat = Bank.categories.find((c) => c.id === 'prova');
  assert.ok(cat, 'categoria creata');
  assert.deepEqual(Bank.modesOf(cat).sort(), Bank.modes.map((m) => m.id).sort());
  for (const m of Bank.modes) {
    for (let seed = 1; seed <= 10; seed++) {
      const game = Bank.buildGame({ categories: ['prova'], modes: [m.id], count: 6, seed });
      assert.equal(game.error, undefined, m.id);
      assert.equal(validateQuiz(game), null, m.id);
    }
  }
});

test('vero/falso da tabella: il falso usa sempre un valore diverso da quello vero', () => {
  for (let seed = 1; seed <= 60; seed++) {
    const { questions } = Bank.buildGame({ categories: ['prova'], modes: ['vf'], count: 8, seed });
    for (const q of questions.filter((x) => x.why)) {
      const [, name, casa] = q.why.match(/^(Personaggio \w) è della casa (\w+)\.$/) || [];
      if (!name) continue;
      assert.equal(q.correct, 1);
      assert.ok(!q.text.endsWith(`casa ${casa}.`), q.text);
    }
  }
});

test('domanda inversa e intruso: le opzioni sbagliate non hanno il valore chiesto', () => {
  const casaOf = {};
  for (let i = 0; i < 24; i++) casaOf[`Personaggio ${String.fromCharCode(65 + i)}`] = ['Rossa', 'Blu', 'Verde', 'Gialla'][i % 4];
  for (let seed = 1; seed <= 60; seed++) {
    const { questions } = Bank.buildGame({ categories: ['prova'], modes: ['quiz', 'intruso'], count: 10, seed });
    for (const q of questions) {
      const who = q.text.match(/^Chi è della casa (\w+)\?$/);
      const odd = q.text.match(/^Chi NON è della casa (\w+)\?$/);
      if (who) q.answers.forEach((a, i) => assert.equal(casaOf[a] === who[1], i === q.correct, q.text));
      if (odd) q.answers.forEach((a, i) => assert.equal(casaOf[a] !== odd[1], i === q.correct, q.text));
    }
  }
});
