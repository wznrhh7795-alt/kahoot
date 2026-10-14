// Categoria di prova per i test (dati inventati ma coerenti).
(function (root) {
  'use strict';
  const D = (root.QZ_DATA = root.QZ_DATA || {});
  const items = [];
  const case_ = ['Rossa', 'Blu', 'Verde', 'Gialla'];
  for (let i = 0; i < 24; i++) {
    items.push({ name: `Personaggio ${String.fromCharCode(65 + i)}`, d: (i % 3) + 1, casa: case_[i % 4], attore: ['Mario Rossi', 'Luca Bianchi', 'Anna Verdi', 'Sara Neri', 'Paolo Gialli', 'Elena Marroni'][i % 6] + ` ${['Primo', 'Secondo', 'Terzo', 'Quarto'][Math.floor(i / 6)]}`, anno: 1990 + i * 2 });
  }
  (D.pop = D.pop || []).push({
    id: 'prova', name: 'Prova', emoji: '🧪', color: '#334155', description: 'Categoria di prova',
    quiz: [{ q: 'Quanto fa 2+2?', a: '4', wrong: ['3', '5', '6'], d: 1 }],
    tf: [{ q: 'Il cielo è blu.', a: true, d: 1 }],
    tables: [{
      id: 'personaggi', items,
      fields: {
        casa: { ask: 'Di che casa è {name}?', who: 'Chi è della casa {value}?', tf: '{name} è della casa {value}.', odd: 'Chi NON è della casa {value}?' },
        attore: { ask: 'Chi interpreta {name}?', typed: 'person' },
      },
      numeric: { anno: { ask: 'In che anno arriva {name}?', span: 30, tol: 1, format: 'year', duel: 'Chi arriva prima?', lowerWins: true, order: 'In ordine di arrivo', gap: 2 } },
    }],
    quotes: ['A', 'B', 'C', 'D', 'E'].map((x, i) => ({ text: `Frase ${x}`, who: `Personaggio ${x}`, d: (i % 3) + 1 })),
    emojis: ['Uno', 'Due', 'Tre', 'Quattro'].map((a, i) => ({ emoji: '🍎'.repeat(i + 1), answer: a, d: 1 })),
    order: [{ q: 'Metti in ordine', items: ['Primo', 'Secondo', 'Terzo', 'Quarto'], d: 1 }],
    numbers: [{ q: 'Quanti giorni ha una settimana?', v: 7, min: 0, max: 20, tol: 0, unit: 'giorni', d: 1 }],
    typed: [{ q: 'Capitale della Francia?', a: 'Parigi', accept: ['Paris'], d: 1 }],
  });
})(typeof window !== 'undefined' ? window : globalThis);
