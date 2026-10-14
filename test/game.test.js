'use strict';

const test = require('node:test');
const assert = require('node:assert/strict');
const { Game, validateQuiz, scoreFor, streakBonus } = require('../src/game');
const sampleQuizzes = require('../src/quizzes');

const quiz = {
  title: 'Prova',
  questions: [
    { text: '1+1?', answers: ['1', '2', '3', '4'], correct: 1, time: 20, type: 'quiz' },
    { text: 'Il cielo è blu.', answers: ['Vero', 'Falso'], correct: 0, time: 10, type: 'vero_falso' },
  ],
};

test('i quiz di esempio sono validi', () => {
  for (const q of sampleQuizzes) assert.equal(validateQuiz(q), null, q.title);
});

test('validateQuiz rifiuta quiz malformati', () => {
  assert.match(validateQuiz({ title: '', questions: [] }), /titolo/);
  assert.match(validateQuiz({ title: 'x', questions: [] }), /almeno una domanda/);
  const bad = structuredClone(quiz);
  bad.questions[0].correct = 9;
  assert.match(validateQuiz(bad), /corretta/);
});

test('punteggio: 1000 a tempo zero, 500 allo scadere, bonus combo limitato', () => {
  assert.equal(scoreFor(0, 20000), 1000);
  assert.equal(scoreFor(20000, 20000), 500);
  assert.equal(scoreFor(10000, 20000), 750);
  assert.equal(streakBonus(1), 0);
  assert.equal(streakBonus(3), 200);
  assert.equal(streakBonus(50), 500);
});

test('nickname: obbligatorio, unico (senza maiuscole) e max 15 caratteri', () => {
  const g = new Game('123456', quiz);
  assert.ok(g.addPlayer('a', '  Mario  ').player);
  assert.match(g.addPlayer('b', 'mario').error, /già in uso/);
  assert.match(g.addPlayer('c', '   ').error, /Inserisci/);
  assert.match(g.addPlayer('d', 'x'.repeat(16)).error, /15/);
});

test('flusso completo con punteggi, combo e classifica', () => {
  let t = 0;
  const g = new Game('123456', quiz, () => t);
  g.addPlayer('a', 'Anna');
  g.addPlayer('b', 'Bruno');

  assert.ok(g.nextQuestion());
  assert.match(g.submitAnswer('a', 1).error, /Non è possibile/);
  g.openQuestion();
  t = 0;
  assert.equal(g.submitAnswer('a', 1).allAnswered, false);
  assert.match(g.submitAnswer('a', 1).error, /già risposto/);
  t = 10000;
  assert.equal(g.submitAnswer('b', 0).allAnswered, true);
  const summary = g.closeQuestion();
  assert.deepEqual(summary.distribution, [1, 1, 0, 0]);
  assert.equal(g.players.get('a').score, 1000);
  assert.equal(g.players.get('b').score, 0);
  assert.equal(g.players.get('a').last.rank, 1);
  assert.deepEqual(g.players.get('b').last.behind, { nickname: 'Anna', gap: 1000 });

  assert.ok(g.nextQuestion());
  g.openQuestion();
  t = 10000; // risposta immediata
  g.submitAnswer('a', 0);
  g.closeQuestion();
  assert.equal(g.players.get('a').streak, 2);
  assert.equal(g.players.get('a').score, 1000 + 1000 + 100);
  assert.equal(g.players.get('b').last.answered, false);

  assert.equal(g.nextQuestion(), false);
  assert.equal(g.state, 'gameover');
  assert.deepEqual(g.scoreboard(), [{ nickname: 'Anna', score: 2100 }, { nickname: 'Bruno', score: 0 }]);
});

test('publicQuestion non rivela la risposta corretta', () => {
  const g = new Game('1', quiz);
  g.nextQuestion();
  assert.equal('correct' in g.publicQuestion(), false);
});
