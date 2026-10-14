'use strict';

const test = require('node:test');
const assert = require('node:assert/strict');
const { Game, validateQuiz, scoreFor, streakBonus } = require('../public/js/game');
const sampleQuizzes = require('../public/js/quizzes');

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
  assert.deepEqual(g.scoreboard().map(({ nickname, score, correctCount }) => ({ nickname, score, correctCount })), [
    { nickname: 'Anna', score: 2100, correctCount: 2 },
    { nickname: 'Bruno', score: 0, correctCount: 0 },
  ]);
});

test('publicQuestion non rivela la risposta corretta', () => {
  const g = new Game('1', quiz);
  g.nextQuestion();
  assert.equal('correct' in g.publicQuestion(), false);
});

test('metti in ordine: punti solo con l\'ordine esatto', () => {
  let t = 0;
  const q = { type: 'ordina', text: 'Ordina', items: ['C', 'A', 'B'], correct: [1, 2, 0], time: 30 };
  assert.equal(validateQuiz({ title: 'x', questions: [q] }), null);
  const g = new Game('1', { title: 'x', questions: [q] }, () => t);
  g.addPlayer('a', 'Anna');
  g.addPlayer('b', 'Bruno');
  g.nextQuestion();
  g.openQuestion();
  assert.match(g.submitAnswer('a', [1, 1, 0]).error, /non valida/);
  assert.equal(g.submitAnswer('a', [1, 2, 0]).ok, true);
  g.submitAnswer('b', [1, 0, 2]);
  const summary = g.closeQuestion();
  assert.equal(g.players.get('a').last.correct, true);
  assert.equal(g.players.get('a').score, 1000);
  assert.equal(g.players.get('b').last.correct, false);
  assert.equal(g.players.get('b').last.positionsRight, 1);
  assert.deepEqual(summary.distribution, [1, 1]);
  assert.equal(summary.reveal.text, 'A → B → C');
});

test('indovina il numero: tolleranza e punti decrescenti', () => {
  let t = 0;
  const q = { type: 'numero', text: 'Anno?', answer: 1492, min: 1400, max: 1600, tol: 10, time: 25 };
  const g = new Game('1', { title: 'x', questions: [q] }, () => t);
  for (const [id, n] of [['a', 'Esatto'], ['b', 'Vicino'], ['c', 'Lontano']]) g.addPlayer(id, n);
  g.nextQuestion();
  g.openQuestion();
  assert.match(g.submitAnswer('a', 1700).error, /non valida/);
  g.submitAnswer('a', 1492);
  g.submitAnswer('b', 1502);
  g.submitAnswer('c', 1520);
  const summary = g.closeQuestion();
  assert.equal(g.players.get('a').score, 1000);
  assert.equal(g.players.get('b').score, 500); // al limite della tolleranza: metà punti
  assert.equal(g.players.get('c').score, 0);
  assert.equal(g.players.get('c').last.close, true);
  assert.deepEqual(summary.closest.map((x) => x.nickname), ['Esatto', 'Vicino', 'Lontano']);
  assert.equal(summary.reveal.text, '1492');
});

test('validateQuiz controlla i nuovi tipi', () => {
  assert.match(validateQuiz({ title: 'x', questions: [{ type: 'ordina', text: 'o', items: ['a', 'b'], correct: [0, 0], time: 20 }] }), /ordine/);
  assert.match(validateQuiz({ title: 'x', questions: [{ type: 'numero', text: 'n', answer: 50, min: 60, max: 70, time: 20 }] }), /minimo e massimo/);
  assert.match(validateQuiz({ title: 'x', questions: [{ type: 'boh', text: 'n', time: 20 }] }), /tipo sconosciuto/);
});

test('avatar: emoji scelta o predefinita', () => {
  const g = new Game('1', quiz);
  assert.equal(g.addPlayer('a', 'Anna', '🦊').player.avatar, '🦊');
  assert.equal(g.addPlayer('b', 'Bruno', '<script>alert(1)</script>').player.avatar, '🙂');
});

test('publicQuestion non rivela soluzioni di nessun tipo', () => {
  const qs = [
    { type: 'ordina', text: 'o', items: ['a', 'b'], correct: [1, 0], time: 20, why: 'segreto' },
    { type: 'numero', text: 'n', answer: 5, min: 0, max: 10, tol: 1, time: 20 },
  ];
  const g = new Game('1', { title: 'x', questions: qs });
  for (let i = 0; i < qs.length; i++) {
    g.nextQuestion();
    const pub = g.publicQuestion();
    assert.equal('correct' in pub, false);
    assert.equal('answer' in pub, false);
    assert.equal('why' in pub, false);
  }
});

test('immagini: l\'autore non viene inviato con la domanda ma solo con la soluzione', () => {
  const media = { kind: 'image', src: 'https://x/y.jpg', license: 'Public domain', author: 'Leonardo da Vinci', link: 'https://commons.wikimedia.org/wiki/File:Y.jpg' };
  const q = { type: 'quiz', text: 'Chi è l\'autore?', answers: ['Leonardo da Vinci', 'Raffaello'], correct: 0, time: 20, media };
  const g = new Game('1', { title: 'x', questions: [q] });
  g.addPlayer('a', 'Anna');
  g.nextQuestion();
  const pub = g.publicQuestion();
  assert.deepEqual(pub.media, { kind: 'image', src: 'https://x/y.jpg', license: 'Public domain' });
  assert.equal(JSON.stringify(pub.media).includes('Leonardo'), false);
  g.openQuestion();
  const { reveal } = g.closeQuestion();
  assert.deepEqual(reveal.credit, { author: 'Leonardo da Vinci', license: 'Public domain', link: media.link });
});

test('scrivi la risposta: maiuscole, accenti, articoli e piccoli errori', () => {
  let t = 0;
  const q = { type: 'scrivi', text: 'Capitale d\'Italia?', answer: 'Roma', time: 20 };
  const q2 = { type: 'scrivi', text: 'Film?', answer: 'Il re leone', accept: ['The Lion King'], time: 20, double: true };
  assert.equal(validateQuiz({ title: 'x', questions: [q, q2] }), null);
  assert.match(validateQuiz({ title: 'x', questions: [{ type: 'scrivi', text: 'x', answer: '  ', time: 20 }] }), /risposta da scrivere/);
  const g = new Game('1', { title: 'x', questions: [q, q2] }, () => t);
  for (const [id, n] of [['a', 'Anna'], ['b', 'Bruno'], ['c', 'Carla']]) g.addPlayer(id, n);
  g.nextQuestion();
  const pub = g.publicQuestion();
  assert.equal(pub.hint, '4 lettere');
  assert.equal('answer' in pub, false);
  g.openQuestion();
  assert.match(g.submitAnswer('a', '   ').error, /non valida/);
  g.submitAnswer('a', '  ROMA ');
  g.submitAnswer('b', 'Milano');
  g.submitAnswer('c', 'roma');
  const s1 = g.closeQuestion();
  assert.deepEqual(s1.distribution, [2, 1]);
  assert.deepEqual(s1.typed.map((x) => [x.count, x.correct]), [[2, true], [1, false]]);
  assert.equal(s1.reveal.text, 'Roma');
  assert.equal(g.players.get('a').score, 1000);

  g.nextQuestion();
  assert.equal(g.publicQuestion().double, true);
  g.openQuestion();
  g.submitAnswer('a', 're leone'); // senza articolo
  g.submitAnswer('b', 'the lion king'); // variante
  g.submitAnswer('c', 'Il re lone'); // un errore di battitura
  g.closeQuestion();
  assert.equal(g.players.get('a').last.correct, true);
  assert.equal(g.players.get('a').last.points, (1000 + 100) * 2); // punti doppi, combo compresa
  assert.equal(g.players.get('b').last.correct, true);
  assert.equal(g.players.get('c').last.typo, true);
  assert.equal(g.players.get('c').last.correct, true);
});
