'use strict';

const http = require('http');
const path = require('path');
const express = require('express');
const { Server } = require('socket.io');
const { Game, validateQuiz } = require('./src/game');
const sampleQuizzes = require('./src/quizzes');

function createServer({ getReadyMs = 5000 } = {}) {
  const app = express();
  const server = http.createServer(app);
  const io = new Server(server);
  const games = new Map(); // pin -> { game, hostId, timer }

  app.use(express.static(path.join(__dirname, 'public')));
  app.get('/api/quizzes', (req, res) => res.json(sampleQuizzes));
  app.get('/host', (req, res) => res.sendFile(path.join(__dirname, 'public', 'host.html')));

  function newPin() {
    let pin;
    do {
      pin = String(Math.floor(100000 + Math.random() * 900000));
    } while (games.has(pin));
    return pin;
  }

  function clearTimer(entry) {
    clearTimeout(entry.timer);
    entry.timer = null;
  }

  function emitPlayers(entry) {
    io.to(entry.hostId).emit('lobby:players', entry.game.playerList());
  }

  function startQuestion(entry) {
    const { game } = entry;
    clearTimer(entry);
    if (!game.nextQuestion()) {
      endGame(entry);
      return;
    }
    const question = game.publicQuestion();
    io.to(entry.hostId).emit('game:getready', { ...question, ms: getReadyMs });
    io.to(game.pin).emit('player:getready', { index: question.index, total: question.total, ms: getReadyMs });
    entry.timer = setTimeout(() => openQuestion(entry), getReadyMs);
  }

  function openQuestion(entry) {
    const { game } = entry;
    game.openQuestion();
    const question = game.publicQuestion();
    io.to(entry.hostId).emit('game:question', question);
    io.to(game.pin).emit('player:question', {
      index: question.index,
      total: question.total,
      type: question.type,
      count: question.answers.length,
      answers: question.answers,
      time: question.time,
    });
    entry.timer = setTimeout(() => closeQuestion(entry), question.time * 1000);
  }

  function closeQuestion(entry) {
    const { game } = entry;
    if (game.state !== 'question') return;
    clearTimer(entry);
    const summary = game.closeQuestion();
    io.to(entry.hostId).emit('game:questionEnd', { ...summary, question: game.publicQuestion() });
    for (const player of game.players.values()) {
      io.to(player.id).emit('player:result', { ...player.last, score: player.score, streak: player.streak });
    }
  }

  function endGame(entry) {
    const { game } = entry;
    clearTimer(entry);
    game.state = 'gameover';
    const ranking = game.ranking();
    io.to(entry.hostId).emit('game:over', { podium: game.scoreboard(3), players: ranking.length });
    ranking.forEach((p, i) => {
      io.to(p.id).emit('player:gameover', { rank: i + 1, score: p.score, players: ranking.length });
    });
  }

  function hostEntry(socket) {
    const pin = socket.data.hostPin;
    const entry = pin && games.get(pin);
    return entry && entry.hostId === socket.id ? entry : null;
  }

  io.on('connection', (socket) => {
    // ---- Host ----
    socket.on('host:create', (quiz, ack = () => {}) => {
      const error = validateQuiz(quiz);
      if (error) return ack({ error });
      const pin = newPin();
      games.set(pin, { game: new Game(pin, quiz), hostId: socket.id, timer: null });
      socket.data.hostPin = pin;
      ack({ pin });
    });

    socket.on('host:start', () => {
      const entry = hostEntry(socket);
      if (!entry || entry.game.state !== 'lobby' || entry.game.players.size === 0) return;
      startQuestion(entry);
    });

    // Termina la domanda in anticipo ("Salta").
    socket.on('host:skip', () => {
      const entry = hostEntry(socket);
      if (entry) closeQuestion(entry);
    });

    socket.on('host:scoreboard', () => {
      const entry = hostEntry(socket);
      if (!entry || entry.game.state !== 'results') return;
      entry.game.state = 'scoreboard';
      const last = entry.game.index + 1 >= entry.game.total;
      socket.emit('game:scoreboard', { top: entry.game.scoreboard(5), last });
    });

    socket.on('host:next', () => {
      const entry = hostEntry(socket);
      if (!entry || !['results', 'scoreboard'].includes(entry.game.state)) return;
      startQuestion(entry);
    });

    socket.on('host:kick', (nickname) => {
      const entry = hostEntry(socket);
      if (!entry) return;
      const player = [...entry.game.players.values()].find((p) => p.nickname === nickname);
      if (!player) return;
      entry.game.removePlayer(player.id);
      const playerSocket = io.sockets.sockets.get(player.id);
      playerSocket?.emit('player:kicked');
      playerSocket?.leave(entry.game.pin);
      if (playerSocket) playerSocket.data.pin = null;
      emitPlayers(entry);
    });

    // ---- Giocatore ----
    socket.on('player:checkPin', (pin, ack = () => {}) => {
      const entry = games.get(String(pin ?? '').trim());
      if (!entry) return ack({ error: 'Non abbiamo trovato nessuna partita con questo PIN. Controlla e riprova.' });
      if (entry.game.state !== 'lobby') return ack({ error: 'La partita è già iniziata.' });
      ack({ ok: true });
    });

    socket.on('player:join', ({ pin, nickname } = {}, ack = () => {}) => {
      const entry = games.get(String(pin ?? '').trim());
      if (!entry) return ack({ error: 'Partita non trovata.' });
      if (socket.data.pin) return ack({ error: 'Sei già in una partita.' });
      const result = entry.game.addPlayer(socket.id, nickname);
      if (result.error) return ack({ error: result.error });
      socket.data.pin = entry.game.pin;
      socket.join(entry.game.pin);
      emitPlayers(entry);
      ack({ nickname: result.player.nickname, title: entry.game.quiz.title });
    });

    socket.on('player:answer', (choice, ack = () => {}) => {
      const entry = socket.data.pin && games.get(socket.data.pin);
      if (!entry) return ack({ error: 'Partita non trovata.' });
      const result = entry.game.submitAnswer(socket.id, choice);
      if (result.error) return ack({ error: result.error });
      ack({ ok: true });
      io.to(entry.hostId).emit('game:answerCount', entry.game.answers.size);
      if (result.allAnswered) closeQuestion(entry);
    });

    socket.on('disconnect', () => {
      const hosted = hostEntry(socket);
      if (hosted) {
        clearTimer(hosted);
        io.to(hosted.game.pin).emit('player:hostLeft');
        games.delete(hosted.game.pin);
      }
      const entry = socket.data.pin && games.get(socket.data.pin);
      if (entry) {
        entry.game.removePlayer(socket.id);
        emitPlayers(entry);
        // Se chi manca era l'ultimo a dover rispondere, chiudiamo la domanda.
        if (entry.game.state === 'question' && entry.game.players.size > 0 &&
            entry.game.answers.size >= entry.game.players.size) {
          closeQuestion(entry);
        }
      }
    });
  });

  return { app, server, io, games };
}

if (require.main === module) {
  const port = Number(process.env.PORT) || 3000;
  createServer().server.listen(port, () => {
    console.log(`Quizzone! in ascolto su http://localhost:${port}`);
    console.log(`Schermo dell'host: http://localhost:${port}/host`);
  });
}

module.exports = { createServer };
