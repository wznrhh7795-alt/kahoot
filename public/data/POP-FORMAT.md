# Formato delle categorie «pop» (`public/data/pop-<id>.js`)

Ogni file aggiunge UNA categoria a `QZ_DATA.pop`. Da questi dati `bank.js` genera domande per tutti
i giochi. Controllo: `node scripts/check-pop.js public/data/pop-<id>.js` (errori, conteggi, esempi).

```js
// Categoria «Harry Potter» per Quizzone! — domande in italiano, fatti verificati.
(function (root) {
  'use strict';
  const D = (root.QZ_DATA = root.QZ_DATA || {});
  (D.pop = D.pop || []).push({
    id: 'harrypotter',               // minuscolo, unico
    name: 'Harry Potter',            // nome della categoria
    emoji: '⚡', color: '#7f1d1d',    // colore scuro: il testo bianco deve leggersi bene
    description: 'Hogwarts, incantesimi, personaggi e creature magiche',
    quiz: [ { q: 'Domanda?', a: 'Giusta', wrong: ['Sbagliata 1', 'Sbagliata 2', 'Sbagliata 3'], d: 1 } ],
    tf:   [ { q: 'Affermazione.', a: true, d: 1 }, { q: 'Affermazione falsa.', a: false, d: 2, why: 'Spiegazione breve' } ],
    tables: [ {
      id: 'personaggi',
      items: [ { name: 'Hermione Granger', d: 1, casa: 'Grifondoro', attore: 'Emma Watson', anno: 1997 } ],
      fields: {                     // attributi TESTUALI a valore unico ed esclusivo
        casa: {
          ask: 'A quale casa di Hogwarts appartiene {name}?',   // quiz: risposta = valore, sbagliate = altri valori
          who: 'Quale di questi personaggi appartiene a {value}?', // quiz inverso (una domanda per valore)
          tf: '{name} appartiene alla casa {value}.',             // vero/falso (vero e falso scambiando il valore)
          odd: 'Trova l\'intruso: chi NON appartiene a {value}?', // trova l'intruso (servono ≥3 elementi per valore)
          typed: false,                                           // true | 'person' → «Scrivi la risposta» con ask
        },
        attore: { ask: 'Chi interpreta {name} nei film?', tf: 'Nei film {name} è interpretato da {value}.', typed: 'person' },
      },
      numeric: {                    // attributi NUMERICI (anni, quantità…)
        anno: {
          ask: 'In che anno compare per la prima volta {name}?',  // indovina il numero
          span: 30, tol: 1, format: 'year', unit: '', step: 1,    // ampiezza del cursore, tolleranza, formato
          duel: 'Chi è comparso prima?', lowerWins: true,         // testa a testa (lowerWins: vince il valore più basso)
          order: 'Metti in ordine di comparsa, dal primo',        // metti in ordine 4 elementi (stesso verso di lowerWins)
          gap: 1,                                                 // differenza minima tra due valori confrontati
        },
      },
    } ],
    quotes:  [ { text: 'Battuta famosa (breve)', who: 'Personaggio', d: 1 } ],       // «Chi l'ha detto?» (≥4 «who» diversi)
    quoteText: 'Quale personaggio pronuncia questa frase?',                         // facoltativo
    emojis:  [ { emoji: '🦉✉️🏰', answer: 'Risposta', d: 1 } ],                     // indovina dalle emoji (≥4 risposte diverse)
    emojiText: 'Quale oggetto magico raccontano queste emoji?',                     // facoltativo
    order:   [ { q: 'Metti in ordine i libri, dal primo', items: ['A', 'B', 'C', 'D'], d: 1 } ], // ordine giusto, 3-6 elementi
    numbers: [ { q: 'Quanti…?', v: 7, min: 0, max: 20, tol: 0, unit: 'libri', d: 1 } ],         // indovina il numero
    typed:   [ { q: 'Domanda a risposta libera?', a: 'Risposta', accept: ['Variante'], d: 1 } ],  // scrivi la risposta
  });
})(typeof window !== 'undefined' ? window : globalThis);
```

## Regole di qualità (obbligatorie)
- **Solo fatti certi e verificabili** (opere ufficiali: film, libri, serie, giochi). Nel dubbio, non metterlo.
  Se libro e film differiscono, dillo nella domanda («nei film», «nella serie TV»).
- Nomi e titoli **come in Italia** (titoli italiani ufficiali, nomi dell'edizione italiana; es. «Grifondoro»).
- Italiano corretto, frasi brevi: domanda ≤ 150 caratteri, risposte ≤ 60, risposte di «typed» ≤ 40.
- `d`: 1 facile (lo sa chiunque), 2 media (fan), 3 difficile (esperti). Mescola i livelli (~40/40/20).
- `quiz`: le 3 sbagliate devono essere plausibili, dello stesso tipo della giusta e SICURAMENTE sbagliate.
- Campi testuali di una tabella: ogni elemento ha **un solo valore** possibile, esclusivo e senza sinonimi
  tra valori diversi (altrimenti il vero/falso «scambiato» potrebbe essere vero). Se un attributo non vale
  per un elemento, ometti la proprietà. Mai due elementi con lo stesso `name` nella stessa tabella.
- `who` solo se la domanda resta vera con 4 nomi: le opzioni sbagliate sono elementi con un valore diverso.
- `typed` solo per risposte brevi e univoche (nomi, titoli); varianti comuni in `accept` o in `<campo>Alt`
  (es. `attoreAlt: ['Watson']`). `'person'` accetta già il cognome da solo quando non è ambiguo.
- Citazioni: battute brevi e famose (max ~120 caratteri). **Niente testi di canzoni.**
- Niente contenuti volgari, offensivi o spoiler inutilmente crudi.
- Il conteggio di `check-pop.js` (domande distinte) è quello mostrato nel gioco: non conta le combinazioni
  di «intruso», «testa a testa» e «metti in ordine» da tabella.
