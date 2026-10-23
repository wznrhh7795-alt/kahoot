// Domande in più per la categoria di prova («extends»), per i test.
(function (root) {
  'use strict';
  const D = (root.QZ_DATA = root.QZ_DATA || {});
  (D.pop = D.pop || []).push({
    id: 'plusprova', extends: 'prova',
    quiz: Array.from({ length: 6 }, (_, i) => ({ q: `Domanda extra numero ${i}?`, a: `Giusta ${i}`, wrong: ['Sbagliata A', 'Sbagliata B', 'Sbagliata C'], d: 1 })),
  });
})(typeof window !== 'undefined' ? window : globalThis);
