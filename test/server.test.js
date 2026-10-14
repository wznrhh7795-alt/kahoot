'use strict';

const test = require('node:test');
const assert = require('node:assert/strict');
const { io: connect } = require('socket.io-client');
const { createServer } = require('../server');

const quiz = {
  title: 'Prova',
  questions: [{ text: '2+2?', answers: ['3', '4'], correct: 1, time: 5, type: 'quiz' }],
};

const once = (socket, event) => new Promise((resolve) => socket.once(event, resolve));
const emit = (socket, event, data) => new Promise((resolve) => socket.emit(event, data, resolve));

test('una partita completa tra host e due giocatori', async (t) => {
  const { server, io } = createServer({ getReadyMs: 50 });
  await new Promise((r) => server.listen(0, r));
  const url = `http://localhost:${server.address().port}`;
  const host = connect(url);
  const p1 = connect(url);
  const p2 = connect(url);
  t.after(() => {
    [host, p1, p2].forEach((s) => s.close());
    io.close();
  });

  const { pin } = await emit(host, 'host:create', quiz);
  assert.match(pin, /^\d{6}$/);
  assert.match((await emit(p1, 'player:checkPin', '000000')).error ?? '', /PIN/);
  assert.deepEqual(await emit(p1, 'player:checkPin', pin), { ok: true });

  assert.equal((await emit(p1, 'player:join', { pin, nickname: 'Anna' })).nickname, 'Anna');
  const lobby = once(host, 'lobby:players');
  await emit(p2, 'player:join', { pin, nickname: 'Bruno' });
  assert.deepEqual(await lobby, ['Anna', 'Bruno']);

  const q1 = once(p1, 'player:question');
  const hostEnd = once(host, 'game:questionEnd');
  host.emit('host:start');
  assert.equal((await q1).count, 2);

  assert.deepEqual(await emit(p1, 'player:answer', 1), { ok: true });
  const r1 = once(p1, 'player:result');
  const r2 = once(p2, 'player:result');
  await emit(p2, 'player:answer', 0);

  const end = await hostEnd;
  assert.deepEqual(end.distribution, [1, 1]);
  assert.equal(end.correct, 1);
  const [res1, res2] = await Promise.all([r1, r2]);
  assert.equal(res1.correct, true);
  assert.ok(res1.points > 900);
  assert.equal(res2.correct, false);
  assert.equal(res2.rank, 2);

  const board = once(host, 'game:scoreboard');
  host.emit('host:scoreboard');
  assert.equal((await board).last, true);

  const over = once(host, 'game:over');
  const p2over = once(p2, 'player:gameover');
  host.emit('host:next');
  assert.equal((await over).podium[0].nickname, 'Anna');
  assert.equal((await p2over).rank, 2);
});
