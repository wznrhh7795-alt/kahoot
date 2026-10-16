'use strict';

// «Ascolta e indovina»: domande con pochi secondi di un brano, senza svelare la soluzione ai telefoni.
const test = require('node:test');
const assert = require('node:assert/strict');
global.window = globalThis;
require('./fixtures/pop-canzoni-prova.js');
const { Game, validateQuiz } = require('../public/js/game');
const Bank = require('../public/js/bank');

const cat = () => Bank.categories.find((c) => c.id === 'provacanzoni');
const games = (n, opts = {}) => Array.from({ length: n }, (_, i) => Bank.buildGame({ categories: ['provacanzoni'], count: 8, seed: i + 1, ...opts }));

test('le canzoni creano il gioco «Ascolta e indovina» con domande valide', () => {
  const mode = Bank.modes.find((m) => m.id === 'ascolta');
  assert.ok(mode && mode.emoji && mode.time >= 20);
  assert.ok(Bank.modesOf(cat()).includes('ascolta'));
  const types = new Set();
  for (const g of games(40, { modes: ['ascolta'] })) {
    assert.equal(validateQuiz(g), null);
    for (const q of g.questions) {
      types.add(q.type);
      assert.equal(q.media.kind, 'audio');
      assert.match(q.media.src, /^https:\/\//);
      assert.ok(q.media.dur >= 5 && q.media.dur <= 10, 'da 5 a 10 secondi');
      assert.ok(q.media.start >= 0 && q.media.start + q.media.dur <= 30, 'dentro l\'anteprima di 30 secondi');
      assert.ok(q.why, 'titolo e interprete nei risultati');
    }
  }
  assert.deepEqual([...types].sort(), ['numero', 'quiz', 'scrivi', 'vero_falso']);
});

test('ai telefoni non arrivano titolo, collegamento né copertina; nei risultati sì', () => {
  const g = games(1, { modes: ['ascolta'] })[0];
  const game = new Game('1234', g);
  game.nextQuestion();
  game.openQuestion();
  const pub = JSON.stringify(game.publicQuestion());
  assert.ok(!pub.includes('music.example.org') && !pub.includes('img.example.org'), pub);
  assert.ok(!pub.includes(' · Cantante'), 'niente «titolo · interprete» durante la domanda');
  const media = game.publicQuestion().media;
  assert.deepEqual(Object.keys(media).sort(), ['dur', 'kind', 'src', 'start']);
  const { reveal } = game.closeQuestion();
  assert.equal(reveal.credit.kind, 'audio');
  assert.match(reveal.credit.link, /music\.example\.org/);
  assert.match(reveal.credit.art, /img\.example\.org/);
});

test('ogni canzone esce una volta sola per partita', () => {
  for (const g of games(30, { modes: ['ascolta'], count: 18 })) {
    const songs = g.questions.map((q) => q.media.src);
    assert.equal(new Set(songs).size, songs.length);
  }
});

test('«Chi canta?»: mai come risposta sbagliata chi canta nel brano', () => {
  for (const g of games(200, { modes: ['ascolta'] })) {
    for (const q of g.questions.filter((x) => x.text.includes('chi canta'))) {
      if (q.answers[q.correct] === 'Cantante A & Cantante B') assert.ok(!q.answers.includes('Cantante A') && !q.answers.includes('Cantante B'), q.answers.join(' / '));
      if (q.answers[q.correct] === 'Cantante C') assert.ok(!q.answers.includes('Cantante D'), q.answers.join(' / '));
      if (q.answers[q.correct] === 'Cantante A') assert.ok(!q.answers.includes('Cantante A & Cantante B'), q.answers.join(' / '));
    }
  }
});

test('indizi sul testo e «Completa il titolo»', () => {
  const quiz = games(20, { modes: ['quiz'] }).flatMap((g) => g.questions);
  assert.ok(quiz.some((q) => /^Indizio sul testo \d\. Di quale canzone si parla\?$/.test(q.text)));
  const typed = games(20, { modes: ['scrivi'] }).flatMap((g) => g.questions);
  const gap = typed.find((q) => q.text.startsWith('Completa il titolo'));
  assert.ok(gap, 'completa il titolo');
  assert.match(gap.text, /^Completa il titolo della canzone di Cantante \w: «Canzone del …»$/);
  assert.match(gap.answer, /^[a-z]{4,}$/);
});
