// Categoria finta con canzoni, per i test di «Ascolta e indovina».
(function (root) {
  'use strict';
  const D = (root.QZ_DATA = root.QZ_DATA || {});
  const WORDS = ['mare', 'sole', 'vento', 'fiume', 'monte', 'cielo', 'fuoco', 'treno', 'porto', 'prato', 'bosco', 'lago', 'faro', 'ponte', 'campo', 'borgo'];
  const song = (i, genre, extra = {}) => ({
    title: `Canzone del ${WORDS[i] || i}`, artist: `Cantante ${String.fromCharCode(65 + (i % 8))}`, year: 1960 + i * 3, genre, d: (i % 3) + 1,
    src: `https://audio.example.org/preview/${i}.m4a`, link: `https://music.example.org/brano-numero-${i}`, art: `https://img.example.org/${i}.jpg`, ...extra,
  });
  const songs = Array.from({ length: 16 }, (_, i) => song(i, i % 2 ? 'Rock' : 'Pop'));
  songs.push(song(20, 'Pop', { title: 'Duetto famoso', artist: 'Cantante A & Cantante B' }));
  songs.push(song(21, 'Pop', { title: 'Con ospite', artist: 'Cantante C', feat: 'Cantante D' }));
  (D.pop = D.pop || []).push({
    id: 'provacanzoni', name: 'Canzoni di prova', emoji: '🎧', color: '#333333', description: 'Solo per i test',
    songs,
    clues: songs.slice(0, 6).map((s, i) => ({ q: `Indizio sul testo ${i}`, a: s.title, d: 1 })),
  });
})(typeof window !== 'undefined' ? window : globalThis);
