// Banca delle domande: trasforma i dati (public/data/*.js) in domande pronte per la partita.
// Ogni categoria ha dei generatori, uno per modalità di gioco:
//   quiz       scelta multipla
//   vf         vero o falso
//   immagine   indovina dall'immagine (foto, bandiere, emoji)
//   citazione  chi l'ha detto? / completa la citazione
//   ordina     metti in ordine
//   numero     indovina il numero (cursore)
//   scrivi     scrivi la risposta (accenti e piccoli errori perdonati)
//   intruso    trova l'intruso tra quattro
//   duello     testa a testa: quale delle due?
(function (root) {
  'use strict';
  const D = root.QZ_DATA || {};

  // ---- Utilità casuali (con seme, così i test sono ripetibili) ----
  function makeRng(seed = Date.now()) {
    let a = seed >>> 0;
    return () => {
      a = (a + 0x6d2b79f5) >>> 0;
      let t = a;
      t = Math.imul(t ^ (t >>> 15), t | 1);
      t ^= t + Math.imul(t ^ (t >>> 7), t | 61);
      return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
    };
  }
  const int = (rng, min, max) => min + Math.floor(rng() * (max - min + 1));
  const pick = (rng, arr) => arr[Math.floor(rng() * arr.length)];
  function shuffle(rng, arr) {
    const a = arr.slice();
    for (let i = a.length - 1; i > 0; i--) {
      const j = Math.floor(rng() * (i + 1));
      [a[i], a[j]] = [a[j], a[i]];
    }
    return a;
  }
  // n elementi diversi (per valore) da pool, escludendo quelli in «exclude».
  function sample(rng, pool, n, exclude = []) {
    const seen = new Set(exclude.map((x) => String(x).toLowerCase()));
    const out = [];
    for (const x of shuffle(rng, pool)) {
      const k = String(x).toLowerCase();
      if (seen.has(k)) continue;
      seen.add(k);
      out.push(x);
      if (out.length === n) break;
    }
    return out;
  }

  // Difficoltà: 'facile' | 'media' | 'difficile' | 'mista'
  function fits(d, diff) {
    if (!d || diff === 'mista') return true;
    if (diff === 'facile') return d === 1;
    if (diff === 'media') return d <= 2;
    return d >= 2;
  }
  const byDiff = (arr, diff) => {
    const f = arr.filter((x) => fits(x.d, diff));
    return f.length ? f : arr;
  };

  const formatYear = (y) => (y < 0 ? `${-y} a.C.` : String(y));
  const fmtNum = (n) => Number(n).toLocaleString('it-IT');

  // ---- Costruttori di domande ----
  // Domanda a scelta: 1 risposta giusta + 3 (o meno) sbagliate, mescolate.
  function choice(rng, text, correct, wrongs, extra = {}) {
    const others = sample(rng, wrongs, extra.nWrong || 3, [correct]);
    if (others.length < 1) return null;
    const answers = shuffle(rng, [correct, ...others]);
    return { type: 'quiz', text, answers, correct: answers.indexOf(correct), ...extra };
  }
  function trueFalse(text, isTrue, extra = {}) {
    return { type: 'vero_falso', text, answers: ['Vero', 'Falso'], correct: isTrue ? 0 : 1, ...extra };
  }
  // Ordine: itemsInOrder è la sequenza giusta; gli elementi vengono presentati mescolati.
  function order(rng, text, itemsInOrder, extra = {}) {
    let shown = shuffle(rng, itemsInOrder);
    for (let i = 0; i < 5 && shown.every((x, k) => x === itemsInOrder[k]); i++) shown = shuffle(rng, itemsInOrder);
    return { type: 'ordina', text, items: shown, correct: itemsInOrder.map((x) => shown.indexOf(x)), ...extra };
  }
  // Numero: risposta su un cursore con tolleranza.
  function numeric(rng, text, answer, { min, max, step = 1, tol = 0, unit = '', format, ...extra } = {}) {
    return { type: 'numero', text, answer, min, max, step, tol, unit, format, ...extra };
  }
  // Intervallo del cursore che contiene la risposta senza metterla sempre al centro.
  function range(rng, answer, span, { floor = -Infinity, ceil = Infinity, step = 1 } = {}) {
    const left = Math.round((span * (0.2 + rng() * 0.6)) / step) * step;
    let min = Math.max(floor, answer - left);
    let max = Math.min(ceil, min + span);
    min = Math.max(floor, max - span);
    return { min, max };
  }
  // Sceglie k elementi mantenendo l'ordine originale.
  function subseq(rng, items, k) {
    if (items.length <= k) return items.slice();
    const idx = shuffle(rng, items.map((_, i) => i)).slice(0, k).sort((a, b) => a - b);
    return idx.map((i) => items[i]);
  }

  // L'autore (per i quadri è la risposta!) viene mostrato solo nei risultati, non durante la domanda.
  const image = (info) => info && { kind: 'image', src: info.src, license: info.license, author: info.author, link: info.page };
  const flagMedia = (iso) => ({ kind: 'image', src: `/flags/${iso}.svg`, flag: true });
  const emoji = (value) => ({ kind: 'emoji', value });
  const quote = (text) => ({ kind: 'quote', text });
  // Titolo tra virgolette basse, senza raddoppiarle («Sonata «Al chiaro di luna»» → Sonata «Al chiaro di luna»).
  const titled = (t) => (t.includes('«') ? t : `«${t}»`);

  // Generatori da elenchi di domande scritte a mano (quiz e vero/falso).
  function fromQuiz(id, list) {
    return {
      mode: 'quiz', count: list.length,
      make(rng, diff) {
        const it = pick(rng, byDiff(list, diff));
        return choice(rng, it.q, it.a, it.wrong, { key: `${id}:${it.q}` });
      },
    };
  }
  function fromTF(id, list) {
    return {
      mode: 'vf', count: list.length,
      make(rng, diff) {
        const it = pick(rng, byDiff(list, diff));
        return trueFalse(it.q, it.a, { key: `${id}:${it.q}`, why: it.why || undefined });
      },
    };
  }
  // Generatore «Vero o falso: X è Y?» costruito da coppie.
  function pairTF(id, list, getA, getB, template, count) {
    return {
      mode: 'vf', count: count ?? list.length * 2,
      make(rng, diff) {
        const pool = byDiff(list, diff);
        const it = pick(rng, pool);
        const truth = rng() < 0.5;
        const b = truth ? getB(it) : getB(pick(rng, list.filter((x) => getB(x) !== getB(it))));
        return trueFalse(template(getA(it), b), truth, {
          key: `${id}:${getA(it)}:${b}`,
          why: truth ? undefined : `${template(getA(it), getB(it)).replace(/[?.]$/, '')}.`.replace(/^È vero che /, ''),
        });
      },
    };
  }

  // ---- Domande numeriche: assegnate alle categorie per parole chiave ----
  const NUM_RULES = [
    ['corpo', /ossa|denti|cromosomi|camere ha il cuore|battiti|batte/],
    ['spazio', /pianeti|luce del sole/i],
    ['elementi', /numero atomico|tavola periodica/],
    ['sport', /giocatori|cerchi|maratona|piscina|partita di calcio/],
    ['musica', /tasti|corde/],
    ['letteratura', /Divina Commedia|sonetto/],
    ['animali', /zampe|polpo/],
    ['matematica', /lati|gradi|centimetri|grammi/],
    ['italia', /Monte Bianco|Po |Po \(|Torre di Pisa|regioni ha l'Italia|abitanti ha l'Italia/],
    ['mondo', /Everest|Torre Eiffel|ONU|Unione Europea|Stati Uniti/],
    ['scienza', /bolle/],
  ];
  function numbersFor(cat) {
    return (D.numbers || []).filter((n) => {
      const rule = NUM_RULES.find(([, re]) => re.test(n.q));
      return (rule ? rule[0] : 'cultura') === cat;
    });
  }
  function fromNumbers(cat) {
    const list = numbersFor(cat);
    return {
      mode: 'numero', count: list.length,
      make(rng, diff) {
        if (!list.length) return null;
        const it = pick(rng, byDiff(list, diff));
        const span = it.max - it.min;
        const step = span > 2000 ? 10 : 1;
        const { min, max } = range(rng, it.v, span, { floor: 0, step });
        return numeric(rng, it.q, it.v, { min, max, step, tol: it.tol, unit: it.unit, key: `num:${it.q}` });
      },
    };
  }

  // ---- Categorie ----
  const C = [];
  const cat = (id, name, emojiIcon, color, description, generators) =>
    C.push({ id, name, emoji: emojiIcon, color, description, generators: generators.filter(Boolean) });

  const countries = D.countries || [];
  const TRANSCONTINENTAL = new Set(['ru', 'tr', 'cy', 'kz', 'az', 'ge', 'am']);
  const capitalOk = (c) => !c.nocap && !c.capital.toLowerCase().includes(c.name.toLowerCase());
  const sameCont = (c, list) => list.filter((x) => x.cont === c.cont && x !== c);

  // Classifiche (rankings) → «metti in ordine» con elementi abbastanza distanti tra loro
  function rankingOrder(id, rankings) {
    return {
      mode: 'ordina', count: rankings.length * 20,
      make(rng) {
        const r = pick(rng, rankings);
        for (let attempt = 0; attempt < 30; attempt++) {
          const chosen = shuffle(rng, r.items).slice(0, 4).sort((a, b) => b[1] - a[1]);
          const ok = chosen.every((x, i) => i === 0 || chosen[i - 1][1] / x[1] >= (r.minGap || 1.1));
          if (!ok) continue;
          return order(rng, r.q, chosen.map((x) => x[0]), {
            key: `${id}:${chosen.map((x) => x[0]).join(',')}`,
            why: chosen.map((x) => `${x[0]}: ${fmtNum(x[1])} ${r.unit}`).join(' · '),
          });
        }
        return null;
      },
    };
  }
  function sequenceOrder(id, sequences) {
    return {
      mode: 'ordina', count: sequences.length * 5,
      make(rng) {
        const s = pick(rng, sequences);
        const items = subseq(rng, s.items, 4);
        return order(rng, s.q, items, { key: `${id}:${items.join(',')}` });
      },
    };
  }

  // 1. Geografia del mondo
  cat('mondo', 'Geografia del mondo', '🌍', '#1368ce', 'Capitali, continenti, fiumi, montagne e record del pianeta', [
    {
      mode: 'quiz', count: countries.filter(capitalOk).length,
      make(rng, diff) {
        const c = pick(rng, byDiff(countries.filter(capitalOk), diff));
        const wrong = sameCont(c, countries).filter(capitalOk).map((x) => x.capital);
        return choice(rng, `${c.name}: qual è la capitale?`, c.capital, wrong, { key: `cap:${c.iso}` });
      },
    },
    {
      mode: 'quiz', count: countries.filter(capitalOk).length,
      make(rng, diff) {
        const c = pick(rng, byDiff(countries.filter(capitalOk), diff));
        const wrong = sameCont(c, countries).map((x) => x.name);
        return choice(rng, `${c.capital} è la capitale di quale Paese?`, c.name, wrong, { key: `capr:${c.iso}` });
      },
    },
    {
      mode: 'quiz', count: countries.length - TRANSCONTINENTAL.size,
      make(rng, diff) {
        const c = pick(rng, byDiff(countries.filter((x) => !TRANSCONTINENTAL.has(x.iso)), diff));
        return choice(rng, `In quale continente si trova ${c.name}?`, D.continents[c.cont], Object.values(D.continents), { key: `cont:${c.iso}` });
      },
    },
    fromQuiz('geoW', D.geoWorldQuiz || []),
    fromTF('geoWtf', D.geoWorldTF || []),
    pairTF('captf', countries.filter(capitalOk), (c) => c.name, (c) => c.capital, (a, b) => `${a}: la capitale è ${b}.`),
    rankingOrder('rankW', (D.rankings || []).filter((r) => /continenti|oceani|Paesi|deserti|montagne/.test(r.q))),
  ]);

  // 2. Bandiere
  cat('bandiere', 'Bandiere', '🚩', '#e21b3c', 'Riconosci le bandiere di tutti i Paesi del mondo', [
    {
      mode: 'immagine', count: countries.length,
      make(rng, diff) {
        const c = pick(rng, byDiff(countries, diff));
        return choice(rng, 'Di quale Paese è questa bandiera?', c.name, sameCont(c, countries).map((x) => x.name), {
          key: `flag:${c.iso}`, media: flagMedia(c.iso),
        });
      },
    },
    {
      mode: 'immagine', count: countries.length,
      make(rng, diff) {
        const c = pick(rng, byDiff(countries, diff));
        const names = sample(rng, sameCont(c, countries).map((x) => x.name), 3, [c.name]);
        const opts = shuffle(rng, [c, ...names.map((n) => countries.find((x) => x.name === n))]);
        return {
          type: 'quiz', text: `Qual è la bandiera di ${c.name}?`, key: `flagr:${c.iso}`,
          answers: opts.map((x) => x.name), correct: opts.indexOf(c), answerMedia: opts.map((x) => `/flags/${x.iso}.svg`),
        };
      },
    },
    {
      mode: 'vf', count: countries.length * 2,
      make(rng, diff) {
        const c = pick(rng, byDiff(countries, diff));
        const truth = rng() < 0.5;
        const shown = truth ? c : pick(rng, sameCont(c, countries));
        return trueFalse(`Questa è la bandiera di ${c.name}?`, truth, {
          key: `flagtf:${c.iso}:${shown.iso}`, media: flagMedia(shown.iso), why: truth ? undefined : `È la bandiera di ${shown.name}.`,
        });
      },
    },
  ]);

  // 3. Italia
  const regions = D.regions || [];
  const cities = D.cities || [];
  const regionNames = regions.map((r) => r.name);
  cat('italia', 'Italia', '🇮🇹', '#26890c', 'Regioni, città, capoluoghi, fiumi, laghi e montagne italiane', [
    {
      mode: 'quiz', count: regions.length,
      make(rng) {
        const r = pick(rng, regions);
        return choice(rng, `Qual è il capoluogo della regione ${r.name}?`, r.capital, [
          ...cities.filter((c) => c.region === r.name && c.name !== r.capital).map((c) => c.name),
          ...regions.map((x) => x.capital),
        ].slice(0, 12), { key: `regcap:${r.name}` });
      },
    },
    {
      mode: 'quiz', count: cities.length,
      make(rng, diff) {
        const c = pick(rng, byDiff(cities, diff));
        return choice(rng, `In quale regione si trova ${c.name}?`, c.region, regionNames, { key: `city:${c.name}` });
      },
    },
    fromQuiz('geoI', D.geoItalyQuiz || []),
    fromTF('geoItf', D.geoItalyTF || []),
    pairTF('citytf', cities, (c) => c.name, (c) => c.region, (a, b) => `${a} si trova in ${b}.`),
    rankingOrder('rankI', (D.rankings || []).filter((r) => /italian|Italia|regioni|città|isole|montagne/.test(r.q))),
    fromNumbers('italia'),
  ]);

  // 4. Monumenti e luoghi
  const imgs = () => D.images || {};
  const landmarksWithImg = () => (D.landmarks || []).filter((l) => imgs()[l.wiki]);
  cat('monumenti', 'Monumenti e luoghi', '🏛️', '#864cbf', 'Riconosci i luoghi più famosi del mondo dalle foto', [
    {
      mode: 'immagine', count: (D.landmarks || []).length,
      make(rng, diff) {
        const list = landmarksWithImg();
        if (list.length < 4) return null;
        const l = pick(rng, byDiff(list, diff));
        return choice(rng, 'Che luogo è questo?', l.name, (D.landmarks || []).map((x) => x.name), {
          key: `lm:${l.name}`, media: image(imgs()[l.wiki]), why: `Si trova a: ${l.where}`,
        });
      },
    },
    {
      mode: 'immagine', count: (D.landmarks || []).length,
      make(rng, diff) {
        const list = landmarksWithImg();
        if (list.length < 4) return null;
        const l = pick(rng, byDiff(list, diff));
        return choice(rng, `Dove si trova: ${l.name}?`, l.where, (D.landmarks || []).map((x) => x.where), {
          key: `lmw:${l.name}`, media: image(imgs()[l.wiki]),
        });
      },
    },
    {
      mode: 'vf', count: (D.landmarks || []).length * 2,
      make(rng, diff) {
        const list = landmarksWithImg();
        if (list.length < 4) return null;
        const l = pick(rng, byDiff(list, diff));
        const truth = rng() < 0.5;
        const named = truth ? l : pick(rng, (D.landmarks || []).filter((x) => x !== l));
        return trueFalse(`Questo luogo è: ${named.name}?`, truth, {
          key: `lmtf:${l.name}:${named.name}`, media: image(imgs()[l.wiki]), why: truth ? undefined : `È ${l.name} (${l.where}).`,
        });
      },
    },
  ]);

  // 5. Storia
  const events = D.events || [];
  const yearTol = (y) => (y >= 1800 ? 3 : y >= 1000 ? 10 : 25);
  cat('storia', 'Storia', '📜', '#d89e00', 'Dall\'antica Roma ai giorni nostri: date, personaggi ed eventi', [
    fromQuiz('hist', D.historyQuiz || []),
    fromTF('histtf', D.historyTF || []),
    {
      mode: 'numero', count: events.length,
      make(rng, diff) {
        const e = pick(rng, byDiff(events, diff));
        const tol = yearTol(e.y);
        const span = e.y >= 1800 ? 120 : e.y >= 1000 ? 400 : 1000;
        const { min, max } = range(rng, e.y, span, { ceil: 2026, step: 1 });
        return numeric(rng, `In che anno? ${e.e}`, e.y, { min, max, step: 1, tol, unit: '', format: 'year', key: `evn:${e.y}:${e.e}` });
      },
    },
    {
      mode: 'quiz', count: events.length,
      make(rng, diff) {
        const e = pick(rng, byDiff(events, diff));
        const gap = e.y >= 1800 ? [3, 8, 15, 25] : [20, 50, 100, 150];
        const wrong = gap.flatMap((g) => [e.y - g, e.y + g]).filter((y) => y <= 2026 && y !== 0);
        return choice(rng, `In che anno? ${e.e}`, formatYear(e.y), wrong.map(formatYear), { key: `evq:${e.y}:${e.e}` });
      },
    },
    {
      mode: 'ordina', count: 2000,
      make(rng, diff) {
        const minGap = { facile: 80, media: 30, difficile: 8, mista: 15 }[diff] || 15;
        for (let attempt = 0; attempt < 40; attempt++) {
          const chosen = shuffle(rng, byDiff(events, diff)).slice(0, 4).sort((a, b) => a.y - b.y);
          if (!chosen.every((x, i) => i === 0 || x.y - chosen[i - 1].y >= minGap)) continue;
          return order(rng, 'Metti in ordine questi eventi, dal più antico al più recente', chosen.map((x) => x.e), {
            key: `evo:${chosen.map((x) => x.y).join(',')}`, why: chosen.map((x) => `${formatYear(x.y)}: ${x.e}`).join(' · '),
          });
        }
        return null;
      },
    },
    {
      mode: 'ordina', count: 200,
      make(rng) {
        const kind = rng();
        if (kind < 0.4) {
          const items = subseq(rng, D.presidents || [], 4);
          return order(rng, 'Metti in ordine questi presidenti della Repubblica, dal primo eletto', items.map((p) => p[0]), {
            key: `pres:${items.map((p) => p[0]).join(',')}`, why: items.map((p) => `${p[0]} (${p[1]})`).join(' · '),
          });
        }
        if (kind < 0.55) {
          const items = subseq(rng, D.romanKings || [], 4);
          return order(rng, 'Metti in ordine questi re di Roma (secondo la tradizione), dal primo', items, { key: `kings:${items.join(',')}` });
        }
        return sequenceOrder('hseq', D.historySequences || []).make(rng);
      },
    },
  ]);

  // 6. Mitologia
  cat('mitologia', 'Mitologia', '🏺', '#a0522d', 'Dèi, eroi e creature di Grecia, Roma, Egitto e Nord Europa', [fromQuiz('myth', D.mythQuiz || [])]);

  // 7. Arte
  const paintings = D.paintings || [];
  const artists = [...new Set(paintings.map((p) => p.artist))];
  const paintingsWithImg = () => paintings.filter((p) => imgs()[p.wiki]);
  cat('arte', 'Arte', '🎨', '#e2621b', 'Capolavori della pittura, scultura e architettura', [
    {
      mode: 'quiz', count: paintings.length,
      make(rng, diff) {
        const p = pick(rng, byDiff(paintings, diff));
        return choice(rng, `Chi ha dipinto «${p.title}»?`, p.artist, artists, { key: `paint:${p.title}` });
      },
    },
    {
      mode: 'immagine', count: paintings.length,
      make(rng, diff) {
        const list = paintingsWithImg();
        if (list.length < 4) return null;
        const p = pick(rng, byDiff(list, diff));
        return choice(rng, 'Chi è l\'autore di quest\'opera?', p.artist, artists, {
          key: `painti:${p.title}`, media: image(imgs()[p.wiki]), why: `«${p.title}»`,
        });
      },
    },
    {
      mode: 'immagine', count: paintings.length,
      make(rng, diff) {
        const list = paintingsWithImg();
        if (list.length < 4) return null;
        const p = pick(rng, byDiff(list, diff));
        return choice(rng, 'Come si intitola quest\'opera?', p.title, paintings.map((x) => x.title), {
          key: `paintt:${p.title}`, media: image(imgs()[p.wiki]), why: `di ${p.artist}`,
        });
      },
    },
    fromQuiz('art', D.artQuiz || []),
    fromTF('arttf', D.artTF || []),
    pairTF('painttf', paintings, (p) => `«${p.title}»`, (p) => p.artist, (a, b) => `${a} è stato dipinto da ${b}.`),
  ]);

  // 8. Letteratura
  const books = D.books || [];
  const authors = [...new Set(books.map((b) => b.author))];
  cat('letteratura', 'Letteratura', '📚', '#2b6cb0', 'Libri, autori, poesie e incipit indimenticabili', [
    {
      mode: 'quiz', count: books.length,
      make(rng, diff) {
        const b = pick(rng, byDiff(books, diff));
        return choice(rng, `Chi ha scritto «${b.title}»?`, b.author, authors, { key: `book:${b.title}` });
      },
    },
    {
      mode: 'quiz', count: authors.length,
      make(rng, diff) {
        const b = pick(rng, byDiff(books, diff));
        const wrong = books.filter((x) => x.author !== b.author).map((x) => x.title);
        return choice(rng, `Quale di queste opere è di ${b.author}?`, b.title, wrong, { key: `booka:${b.title}` });
      },
    },
    {
      mode: 'citazione', count: (D.incipits || []).length,
      make(rng, diff) {
        const it = pick(rng, byDiff(D.incipits || [], diff));
        return choice(rng, 'Da quale opera è tratto questo incipit?', it.work, [...(D.incipits || []).map((x) => x.work), ...books.map((x) => x.title)], {
          key: `inc:${it.work}`, media: quote(it.text), why: `di ${it.author}`,
        });
      },
    },
    pairTF('booktf', books, (b) => `«${b.title}»`, (b) => b.author, (a, b) => `${a} è stato scritto da ${b}.`),
    fromTF('cultf', D.cultureTF || []),
    fromNumbers('letteratura'),
  ]);

  // 9. Citazioni
  const quotes = D.quotes || [];
  const filmQuotes = D.filmQuotes || [];
  // Parole «pulite» per completare le citazioni: minuscole, solo lettere, almeno 5 caratteri.
  const STOP = new Set('della delle dello degli sugli sulla sulle nella nelle negli dalla dalle dagli questo questa quello quella tanto stesso stessa sono siete erano essere avere ancora sempre molto altro altri altra anche dopotutto'.split(' '));
  const cleanWords = (text) => text.replace(/[«»().,!?:;…]/g, ' ').split(/\s+/).filter((w) => /^[a-zàèéìòù]{5,}$/.test(w) && !STOP.has(w));
  const fillable = quotes.filter((q) => !q.text.includes('(') && cleanWords(q.text).length);
  const quoteWords = [...new Set(quotes.flatMap((q) => cleanWords(q.text)))];
  cat('citazioni', 'Citazioni', '💬', '#6b46c1', 'Chi l\'ha detto? Frasi celebri, versi e battute di film', [
    {
      mode: 'citazione', count: quotes.length,
      make(rng, diff) {
        const q = pick(rng, byDiff(quotes, diff));
        return choice(rng, 'Chi l\'ha detto o scritto?', q.author, quotes.map((x) => x.author), {
          key: `quote:${q.text}`, media: quote(q.text), why: q.source ? `Fonte: ${q.source}` : undefined,
        });
      },
    },
    {
      mode: 'citazione', count: filmQuotes.length,
      make(rng, diff) {
        const q = pick(rng, byDiff(filmQuotes, diff));
        return choice(rng, 'Da quale film è tratta questa battuta?', q.film, [...filmQuotes.map((x) => x.film), ...(D.films || []).map((f) => f.title)], {
          key: `fquote:${q.text}`, media: quote(q.text),
        });
      },
    },
    {
      mode: 'citazione', count: fillable.length,
      make(rng, diff) {
        const q = pick(rng, byDiff(fillable, diff));
        const word = pick(rng, cleanWords(q.text));
        const masked = q.text.replace(new RegExp(`(^|[^a-zàèéìòù])${word}(?![a-zàèéìòù])`), `$1_____`);
        return choice(rng, 'Completa la citazione', word, quoteWords.filter((w) => Math.abs(w.length - word.length) <= 2), {
          key: `qfill:${q.text}`, media: quote(masked), why: `${q.author}${q.source ? ` · ${q.source}` : ''}`,
        });
      },
    },
    {
      mode: 'citazione', count: (D.incipits || []).length,
      make(rng, diff) {
        const it = pick(rng, byDiff(D.incipits || [], diff));
        return choice(rng, 'Chi ha scritto questo incipit?', it.author, [...(D.incipits || []).map((x) => x.author), ...authors], {
          key: `inca:${it.work}`, media: quote(it.text), why: `«${it.work}»`,
        });
      },
    },
  ]);

  // 10. Cinema
  const films = D.films || [];
  const emojiFilms = D.emojiFilms || [];
  cat('cinema', 'Cinema', '🎬', '#c53030', 'Registi, attori, battute famose e film da indovinare con le emoji', [
    {
      mode: 'immagine', count: emojiFilms.length,
      make(rng, diff) {
        const f = pick(rng, byDiff(emojiFilms, diff));
        return choice(rng, 'Quale film raccontano queste emoji?', f.title, emojiFilms.map((x) => x.title), {
          key: `efilm:${f.title}`, media: emoji(f.emoji),
        });
      },
    },
    {
      mode: 'quiz', count: films.length,
      make(rng, diff) {
        const f = pick(rng, byDiff(films, diff));
        return choice(rng, `Chi ha diretto «${f.title}»?`, f.director, films.map((x) => x.director), { key: `film:${f.title}`, why: `Uscito nel ${f.year}` });
      },
    },
    {
      mode: 'numero', count: films.length,
      make(rng, diff) {
        const f = pick(rng, byDiff(films, diff));
        const { min, max } = range(rng, f.year, 60, { ceil: 2026 });
        return numeric(rng, `In che anno è uscito «${f.title}»?`, f.year, { min, max, tol: 2, format: 'year', key: `filmy:${f.title}` });
      },
    },
    {
      mode: 'ordina', count: 500,
      make(rng, diff) {
        for (let attempt = 0; attempt < 30; attempt++) {
          const chosen = shuffle(rng, byDiff(films, diff)).slice(0, 4).sort((a, b) => a.year - b.year);
          if (!chosen.every((x, i) => i === 0 || x.year - chosen[i - 1].year >= 4)) continue;
          return order(rng, 'Metti in ordine questi film, dal più vecchio al più recente', chosen.map((x) => x.title), {
            key: `filmo:${chosen.map((x) => x.title).join(',')}`, why: chosen.map((x) => `${x.title} (${x.year})`).join(' · '),
          });
        }
        return null;
      },
    },
    {
      mode: 'citazione', count: filmQuotes.length,
      make(rng, diff) {
        const q = pick(rng, byDiff(filmQuotes, diff));
        return choice(rng, 'Da quale film è tratta questa battuta?', q.film, [...filmQuotes.map((x) => x.film), ...films.map((f) => f.title)], {
          key: `fquote:${q.text}`, media: quote(q.text),
        });
      },
    },
    fromQuiz('cine', D.cinemaQuiz || []),
  ]);

  // 11. Musica
  const operas = D.operas || [];
  const classical = D.classical || [];
  const composers = [...new Set([...operas, ...classical].map((x) => x.composer))];
  cat('musica', 'Musica', '🎵', '#d53f8c', 'Opere liriche, musica classica, cantautori e strumenti', [
    {
      mode: 'quiz', count: operas.length,
      make(rng, diff) {
        const o = pick(rng, byDiff(operas, diff));
        // Stesso titolo, altro compositore: non va tra le risposte sbagliate.
        const homonyms = { Otello: ['Gioachino Rossini'], 'La bohème': ['Ruggero Leoncavallo'] }[o.title] || [];
        return choice(rng, `Chi ha composto l'opera «${o.title}»?`, o.composer, composers.filter((c) => !homonyms.includes(c)), { key: `opera:${o.title}` });
      },
    },
    {
      mode: 'quiz', count: classical.length,
      make(rng, diff) {
        const o = pick(rng, byDiff(classical, diff));
        return choice(rng, `Chi ha composto ${titled(o.title)}?`, o.composer, composers, { key: `class:${o.title}` });
      },
    },
    fromQuiz('music', D.musicQuiz || []),
    pairTF('operatf', operas, (o) => `«${o.title}»`, (o) => o.composer, (a, b) => `${a} è un'opera di ${b}.`),
    fromNumbers('musica'),
  ]);

  // 12. Scienza
  cat('scienza', 'Scienza', '🔬', '#0d9488', 'Fisica, chimica, biologia e scienze della Terra', [
    fromQuiz('sci', D.scienceQuiz || []),
    fromTF('scitf', D.scienceTF || []),
    fromNumbers('scienza'),
  ]);

  // 13. Elementi chimici
  const elements = D.elements || [];
  cat('elementi', 'Elementi chimici', '⚗️', '#2f855a', 'La tavola periodica: simboli, nomi e numeri atomici', [
    {
      mode: 'quiz', count: elements.length,
      make(rng, diff) {
        const e = pick(rng, byDiff(elements, diff));
        return choice(rng, `Qual è il simbolo chimico ${ofElement(e.name)}?`, e.sym, elements.map((x) => x.sym), { key: `esym:${e.sym}` });
      },
    },
    {
      mode: 'quiz', count: elements.length,
      make(rng, diff) {
        const e = pick(rng, byDiff(elements, diff));
        return choice(rng, `Quale elemento ha simbolo «${e.sym}»?`, e.name, elements.map((x) => x.name), { key: `ename:${e.sym}` });
      },
    },
    pairTF('eltf', elements, (e) => `Il simbolo chimico ${ofElement(e.name)}`, (e) => e.sym, (a, b) => `${a} è «${b}».`),
    {
      mode: 'numero', count: elements.length,
      make(rng, diff) {
        const e = pick(rng, byDiff(elements, diff));
        const { min, max } = range(rng, e.z, 40, { floor: 1, ceil: 118 });
        return numeric(rng, `Qual è il numero atomico ${ofElement(e.name)} (${e.sym})?`, e.z, { min, max, tol: e.z <= 20 ? 0 : 2, key: `ez:${e.sym}` });
      },
    },
    {
      mode: 'ordina', count: 1000,
      make(rng, diff) {
        const chosen = shuffle(rng, byDiff(elements, diff)).slice(0, 4).sort((a, b) => a.z - b.z);
        return order(rng, 'Metti in ordine per numero atomico, dal più piccolo', chosen.map((x) => `${x.name} (${x.sym})`), {
          key: `eord:${chosen.map((x) => x.sym).join(',')}`, why: chosen.map((x) => `${x.sym} = ${x.z}`).join(' · '),
        });
      },
    },
    fromNumbers('elementi'),
  ]);

  // 14. Spazio
  cat('spazio', 'Spazio', '🪐', '#312e81', 'Pianeti, stelle, galassie e missioni spaziali', [
    fromQuiz('space', D.spaceQuiz || []),
    fromTF('spacetf', D.spaceTF || []),
    sequenceOrder('pseq', (D.sequences || []).filter((s) => /pianeti|Luna/.test(s.q))),
    fromNumbers('spazio'),
  ]);

  // 15. Corpo umano
  cat('corpo', 'Corpo umano', '🫀', '#b83280', 'Organi, ossa, sangue e curiosità sul nostro corpo', [
    fromQuiz('body', D.bodyQuiz || []),
    fromTF('bodytf', D.bodyTF || []),
    sequenceOrder('bseq', (D.sequences || []).filter((s) => /digestione/.test(s.q))),
    fromNumbers('corpo'),
  ]);

  // 16. Animali
  const animalPhotos = D.animalPhotos || [];
  const animalsWithImg = () => animalPhotos.filter((a) => imgs()[a.wiki]);
  cat('animali', 'Animali', '🐾', '#38a169', 'Riconosci gli animali e scopri i loro record', [
    {
      mode: 'immagine', count: animalPhotos.length,
      make(rng, diff) {
        const list = animalsWithImg();
        if (list.length < 4) return null;
        const a = pick(rng, byDiff(list, diff));
        return choice(rng, 'Che animale è questo?', a.name, animalPhotos.map((x) => x.name), { key: `animal:${a.name}`, media: image(imgs()[a.wiki]) });
      },
    },
    {
      mode: 'vf', count: animalPhotos.length * 2,
      make(rng, diff) {
        const list = animalsWithImg();
        if (list.length < 4) return null;
        const a = pick(rng, byDiff(list, diff));
        const truth = rng() < 0.5;
        const named = truth ? a : pick(rng, animalPhotos.filter((x) => x !== a));
        return trueFalse(`Questo animale è: ${named.name}?`, truth, {
          key: `animaltf:${a.name}:${named.name}`, media: image(imgs()[a.wiki]), why: truth ? undefined : `È: ${a.name}.`,
        });
      },
    },
    fromQuiz('anim', D.animalQuiz || []),
    fromTF('animtf', D.animalTF || []),
    sequenceOrder('aseq', (D.sequences || []).filter((s) => /farfalla|rana/.test(s.q))),
    fromNumbers('animali'),
  ]);

  // 17. Sport
  const worldCups = D.worldCups || [];
  const olympics = D.olympics || [];
  cat('sport', 'Sport', '⚽', '#dd6b20', 'Calcio, Olimpiadi, ciclismo, Formula 1 e campioni italiani', [
    fromQuiz('sport', D.sportQuiz || []),
    fromTF('sporttf', D.sportTF || []),
    {
      mode: 'quiz', count: worldCups.length,
      make(rng) {
        const w = pick(rng, worldCups);
        return choice(rng, `Chi ha vinto i Mondiali di calcio del ${w.y}?`, w.winner, worldCups.map((x) => x.winner), {
          key: `wc:${w.y}`, why: `Si giocarono in ${w.host}.`,
        });
      },
    },
    {
      mode: 'quiz', count: worldCups.length,
      make(rng) {
        const w = pick(rng, worldCups);
        return choice(rng, `In quale Paese si sono giocati i Mondiali di calcio del ${w.y}?`, w.host, worldCups.map((x) => x.host), { key: `wch:${w.y}` });
      },
    },
    {
      mode: 'quiz', count: olympics.length,
      make(rng) {
        const o = pick(rng, olympics);
        const pool = olympics.filter((x) => x.winter === o.winter).map((x) => x.city);
        return choice(rng, `Quale città ha ospitato le Olimpiadi ${o.winter ? 'invernali' : 'estive'} del ${o.y}?`, o.city, pool, { key: `oly:${o.y}:${o.winter}` });
      },
    },
    {
      mode: 'ordina', count: 300,
      make(rng) {
        const summer = olympics.filter((o) => !o.winter);
        for (let attempt = 0; attempt < 30; attempt++) {
          const chosen = shuffle(rng, summer).slice(0, 4).sort((a, b) => a.y - b.y);
          const names = chosen.map((x) => `${x.city}`);
          if (new Set(names).size < 4) continue;
          return order(rng, 'Metti in ordine queste Olimpiadi estive, dalla più antica', names, {
            key: `olyo:${chosen.map((x) => x.y).join(',')}`, why: chosen.map((x) => `${x.city} ${x.y}`).join(' · '),
          });
        }
        return null;
      },
    },
    {
      mode: 'numero', count: worldCups.length,
      make(rng) {
        const wins = worldCups.filter((w) => w.winner === 'Italia');
        const w = pick(rng, wins);
        const { min, max } = range(rng, w.y, 80, { floor: 1930, ceil: 2026 });
        return numeric(rng, `In che anno l'Italia ha vinto un Mondiale giocato in ${w.host}?`, w.y, { min, max, tol: 0, format: 'year', key: `wcit:${w.y}` });
      },
    },
    fromNumbers('sport'),
  ]);

  // 18. Cucina
  const dishes = D.dishes || [];
  const worldDishes = D.worldDishes || [];
  cat('cucina', 'Cucina', '🍝', '#c05621', 'Piatti regionali italiani e cucine del mondo', [
    {
      mode: 'quiz', count: dishes.length,
      make(rng, diff) {
        const d = pick(rng, byDiff(dishes, diff));
        return choice(rng, `Di quale regione è tipico questo piatto: ${d.name}?`, d.region, regionNames, { key: `dish:${d.name}` });
      },
    },
    {
      mode: 'quiz', count: worldDishes.length,
      make(rng, diff) {
        const d = pick(rng, byDiff(worldDishes, diff));
        return choice(rng, `Da quale Paese viene questo piatto: ${d.name}?`, d.country, worldDishes.map((x) => x.country), { key: `wdish:${d.name}` });
      },
    },
    fromQuiz('food', D.foodQuiz || []),
    fromTF('foodtf', D.foodTF || []),
    pairTF('dishtf', dishes, (d) => d.name, (d) => d.region, (a, b) => `${a} è un piatto tipico della regione ${b}.`),
    sequenceOrder('fseq', (D.sequences || []).filter((s) => /pane|pasto/.test(s.q))),
  ]);

  // 19. Lingua italiana
  const synonyms = D.synonyms || [];
  const antonyms = D.antonyms || [];
  cat('lingua', 'Lingua italiana', '🗣️', '#4a5568', 'Grammatica, sinonimi, contrari e parole insidiose', [
    {
      mode: 'quiz', count: synonyms.length,
      make(rng) {
        const s = pick(rng, synonyms);
        return choice(rng, `Qual è un sinonimo di «${s.word}»?`, s.syn, s.wrong, { key: `syn:${s.word}` });
      },
    },
    {
      mode: 'quiz', count: antonyms.length * 2,
      make(rng) {
        const a = pick(rng, antonyms);
        const flip = rng() < 0.5;
        const [w, opp] = flip ? [a.b, a.a] : [a.a, a.b];
        const pool = antonyms.filter((x) => x !== a).map((x) => (flip ? x.a : x.b));
        return choice(rng, `Qual è il contrario di «${w}»?`, opp, pool, { key: `ant:${w}` });
      },
    },
    {
      mode: 'quiz', count: (D.grammar || []).length,
      make(rng) {
        const g = pick(rng, D.grammar || []);
        return choice(rng, g.q, g.a, g.wrong, { key: `gram:${g.q}:${g.a}` });
      },
    },
    {
      mode: 'vf', count: antonyms.length * 2,
      make(rng) {
        const a = pick(rng, antonyms);
        const truth = rng() < 0.5;
        const other = truth ? a.b : pick(rng, antonyms.filter((x) => x !== a)).b;
        return trueFalse(`«${a.a}» è il contrario di «${other}».`, truth, { key: `anttf:${a.a}:${other}`, why: truth ? undefined : `Il contrario di «${a.a}» è «${a.b}».` });
      },
    },
  ]);

  // 20. Inglese
  const vocab = D.vocab || [];
  const allPairs = vocab.flatMap((g) => g.pairs.map((p) => ({ ...p, group: g.group })));
  cat('inglese', 'Inglese', '🇬🇧', '#2c5282', 'Centinaia di parole inglesi divise per argomento', [
    {
      mode: 'quiz', count: allPairs.length,
      make(rng) {
        const g = pick(rng, vocab);
        const p = pick(rng, g.pairs);
        return choice(rng, `Come si dice «${p.it}» in inglese?`, p.en, g.pairs.map((x) => x.en), { key: `en:${p.it}` });
      },
    },
    {
      mode: 'quiz', count: allPairs.length,
      make(rng) {
        const g = pick(rng, vocab);
        const p = pick(rng, g.pairs);
        return choice(rng, `Che cosa significa «${p.en}» in italiano?`, p.it, g.pairs.map((x) => x.it), { key: `it:${p.en}` });
      },
    },
    {
      mode: 'vf', count: allPairs.length * 2,
      make(rng) {
        const g = pick(rng, vocab);
        const p = pick(rng, g.pairs);
        const truth = rng() < 0.5;
        const en = truth ? p.en : pick(rng, g.pairs.filter((x) => x.en !== p.en)).en;
        return trueFalse(`«${p.it}» in inglese si dice «${en}».`, truth, { key: `entf:${p.it}:${en}`, why: truth ? undefined : `Si dice «${p.en}».` });
      },
    },
    {
      mode: 'ordina', count: 50,
      make(rng) {
        const months = vocab.find((g) => g.group === 'tempo').pairs.slice(7, 19);
        const items = subseq(rng, months.map((m) => m.en), 4);
        return order(rng, 'Metti in ordine questi mesi in inglese, da gennaio a dicembre', items, { key: `enm:${items.join(',')}` });
      },
    },
  ]);

  // 21. Proverbi e modi di dire
  const proverbs = D.proverbs || [];
  const emojiSayings = D.emojiSayings || [];
  cat('proverbi', 'Proverbi e modi di dire', '🧩', '#975a16', 'Completa i proverbi e indovina i modi di dire dalle emoji', [
    {
      mode: 'citazione', count: proverbs.length,
      make(rng, diff) {
        const p = pick(rng, byDiff(proverbs, diff));
        const text = `${p.start}${p.start.endsWith("'") ? '' : ' '}_____${p.end ? ` ${p.end}` : ''}`;
        return choice(rng, 'Completa il proverbio', p.word, p.wrong, { key: `prov:${p.start}`, media: quote(text) });
      },
    },
    {
      mode: 'immagine', count: emojiSayings.length,
      make(rng, diff) {
        const s = pick(rng, byDiff(emojiSayings, diff));
        return choice(rng, 'Quale proverbio o modo di dire raccontano queste emoji?', s.answer, emojiSayings.map((x) => x.answer), {
          key: `esay:${s.answer}`, media: emoji(s.emoji),
        });
      },
    },
  ]);

  // 22. Matematica (generata: infinite combinazioni)
  const ROMAN = [[1000, 'M'], [900, 'CM'], [500, 'D'], [400, 'CD'], [100, 'C'], [90, 'XC'], [50, 'L'], [40, 'XL'], [10, 'X'], [9, 'IX'], [5, 'V'], [4, 'IV'], [1, 'I']];
  const toRoman = (n) => ROMAN.reduce((s, [v, r]) => { while (n >= v) { s += r; n -= v; } return s; }, '');
  function arithmetic(rng, diff) {
    const lvl = { facile: 1, media: 2, difficile: 3 }[diff] || int(rng, 1, 3);
    const op = pick(rng, ['+', '−', '×', '÷']);
    let a, b, r;
    if (op === '+') { a = int(rng, 2, [20, 99, 999][lvl - 1]); b = int(rng, 2, [20, 99, 999][lvl - 1]); r = a + b; }
    if (op === '−') { a = int(rng, 10, [30, 150, 1500][lvl - 1]); b = int(rng, 1, a - 1); r = a - b; }
    if (op === '×') { a = int(rng, 2, [10, 25, 99][lvl - 1]); b = int(rng, 2, [10, 9, 30][lvl - 1]); r = a * b; }
    if (op === '÷') { b = int(rng, 2, [10, 12, 25][lvl - 1]); r = int(rng, 2, [10, 20, 60][lvl - 1]); a = b * r; }
    return { text: `Quanto fa ${fmtNum(a)} ${op} ${fmtNum(b)}?`, r, key: `${a}${op}${b}` };
  }
  const nearMisses = (r) => [r + 1, r - 1, r + 2, r - 2, r + 10, r - 10, r * 2, Math.round(r / 2)].filter((x) => x !== r && x >= 0);
  cat('matematica', 'Matematica', '🧮', '#3182ce', 'Calcolo veloce, percentuali, potenze, sequenze e numeri romani', [
    {
      mode: 'quiz', count: 5000,
      make(rng, diff) {
        const kind = rng();
        if (kind < 0.5) {
          const { text, r, key } = arithmetic(rng, diff);
          return choice(rng, text, fmtNum(r), nearMisses(r).map(fmtNum), { key: `ar:${key}` });
        }
        if (kind < 0.65) {
          const p = pick(rng, [10, 20, 25, 50, 75, 5, 15, 30]);
          const base = pick(rng, [20, 40, 60, 80, 100, 120, 200, 300, 400, 500, 800]);
          const r = (p * base) / 100;
          return choice(rng, `Quanto è il ${p}% di ${base}?`, fmtNum(r), nearMisses(r).map(fmtNum), { key: `pc:${p}:${base}` });
        }
        if (kind < 0.8) {
          const n = int(rng, 2, diff === 'facile' ? 10 : 20);
          if (rng() < 0.5) return choice(rng, `Quanto fa ${n}²?`, fmtNum(n * n), nearMisses(n * n).concat([n * 2]).map(fmtNum), { key: `sq:${n}` });
          return choice(rng, `Qual è la radice quadrata di ${fmtNum(n * n)}?`, String(n), [n + 1, n - 1, n + 2, n * 2].map(String), { key: `rt:${n}` });
        }
        if (kind < 0.9) {
          const n = int(rng, 1, diff === 'facile' ? 50 : 2026);
          if (rng() < 0.5) {
            return choice(rng, `Come si scrive ${n} in numeri romani?`, toRoman(n), [n + 1, n - 1, n + 10, n + 5, n - 10].filter((x) => x > 0).map(toRoman), { key: `ro:${n}` });
          }
          return choice(rng, `Quanto vale il numero romano ${toRoman(n)}?`, String(n), nearMisses(n).map(String), { key: `ror:${n}` });
        }
        // Sequenze numeriche
        const start = int(rng, 1, 9);
        const kindSeq = pick(rng, ['ar', 'geo', 'sq', 'fib']);
        let seq;
        if (kindSeq === 'ar') { const d = int(rng, 2, 9); seq = Array.from({ length: 5 }, (_, i) => start + d * i); }
        if (kindSeq === 'geo') { const m = int(rng, 2, 3); seq = Array.from({ length: 5 }, (_, i) => start * m ** i); }
        if (kindSeq === 'sq') { seq = Array.from({ length: 5 }, (_, i) => (start + i) ** 2); }
        if (kindSeq === 'fib') { seq = [start, start]; while (seq.length < 5) seq.push(seq.at(-1) + seq.at(-2)); }
        const next = seq.pop();
        return choice(rng, `Quale numero viene dopo? ${seq.join(', ')}, …`, String(next), nearMisses(next).map(String), { key: `seq:${kindSeq}:${seq.join(',')}` });
      },
    },
    {
      mode: 'vf', count: 3000,
      make(rng, diff) {
        const { text, r, key } = arithmetic(rng, diff);
        const truth = rng() < 0.5;
        const shown = truth ? r : pick(rng, nearMisses(r));
        return trueFalse(`${text.replace('Quanto fa ', '').replace('?', '')} = ${fmtNum(shown)}`, truth, { key: `artf:${key}:${shown}`, why: truth ? undefined : `Il risultato è ${fmtNum(r)}.` });
      },
    },
    {
      mode: 'numero', count: 3000,
      make(rng, diff) {
        if (rng() < 0.5) {
          const { text, r, key } = arithmetic(rng, diff);
          const { min, max } = range(rng, r, Math.max(20, Math.round(r * 0.6) || 20), { floor: 0 });
          return numeric(rng, text, r, { min, max, tol: 0, key: `arn:${key}` });
        }
        const a = int(rng, 11, diff === 'facile' ? 30 : 99);
        const b = int(rng, 11, diff === 'facile' ? 30 : 99);
        const r = a * b;
        const { min, max } = range(rng, r, Math.round(r * 0.8), { floor: 0, step: 10 });
        return numeric(rng, `Stima veloce: quanto fa ${a} × ${b}?`, r, { min, max, step: 10, tol: Math.max(10, Math.round(r * 0.05)), key: `est:${a}x${b}` });
      },
    },
    {
      mode: 'ordina', count: 3000,
      make(rng) {
        const pool = [
          ['1/2', 0.5], ['1/3', 1 / 3], ['1/4', 0.25], ['2/3', 2 / 3], ['3/4', 0.75], ['1/5', 0.2], ['2/5', 0.4], ['3/5', 0.6], ['4/5', 0.8], ['1/10', 0.1], ['9/10', 0.9],
          ['0,3', 0.3], ['0,7', 0.7], ['0,15', 0.15], ['0,45', 0.45], ['0,55', 0.55], ['0,85', 0.85], ['1', 1], ['1,2', 1.2], ['2²', 4], ['3²', 9], ['2³', 8], ['√16', 4.0001], ['5', 5], ['10%', 0.1001], ['50%', 0.5001],
        ];
        for (let attempt = 0; attempt < 30; attempt++) {
          const chosen = shuffle(rng, pool).slice(0, 4).sort((a, b) => a[1] - b[1]);
          if (!chosen.every((x, i) => i === 0 || x[1] - chosen[i - 1][1] > 0.04)) continue;
          return order(rng, 'Metti in ordine dal più piccolo al più grande', chosen.map((x) => x[0]), { key: `ordn:${chosen.map((x) => x[0]).join(',')}` });
        }
        return null;
      },
    },
    fromNumbers('matematica'),
    sequenceOrder('mseq', (D.sequences || []).filter((s) => /romani|figure|unità/.test(s.q))),
  ]);

  // 23. Invenzioni e tecnologia
  cat('tecnologia', 'Invenzioni e tecnologia', '💡', '#2b6cb0', 'Inventori, scoperte, computer e internet', [
    fromQuiz('tech', D.techQuiz || []),
    fromTF('techtf', D.techTF || []),
  ]);

  // 24. Cultura generale
  cat('cultura', 'Cultura generale', '🎉', '#46178f', 'Un po\' di tutto: feste, simboli, numeri e curiosità', [
    fromQuiz('gen', D.generalQuiz || []),
    fromTF('gentf', D.generalTF || []),
    sequenceOrder('gseq', (D.sequences || []).filter((s) => !/pianeti|Luna|digestione|farfalla|rana|pane|pasto|romani|figure|unità/.test(s.q))),
    fromNumbers('cultura'),
  ]);

  // =====================================================================================
  // «Scrivi la risposta» (scrivi), «Trova l'intruso» (intruso) e «Testa a testa» (duello)
  // =====================================================================================
  const addTo = (id, gens) => C.find((c) => c.id === id).generators.push(...gens.filter(Boolean));
  const once = (fn) => {
    let done = false;
    let value;
    return () => {
      if (!done) { value = fn(); done = true; }
      return value;
    };
  };
  const ORD = ['primo', 'secondo', 'terzo', 'quarto', 'quinto', 'sesto', 'settimo', 'ottavo'];
  const theOrd = (i) => (i === 7 ? "l'ottavo" : `il ${ORD[i]}`);
  const MASC_REG = new Set(['Abruzzo', 'Lazio', 'Molise', 'Piemonte', 'Veneto', 'Trentino-Alto Adige', 'Friuli-Venezia Giulia']);
  const regIn = (r) => (r === 'Lazio' ? 'nel Lazio' : r === 'Marche' ? 'nelle Marche' : `in ${r}`);
  const regOf = (r) => (r === 'Marche' ? 'delle Marche' : /^[AEIOU]/.test(r) ? `dell'${r}` : MASC_REG.has(r) ? `del ${r}` : `della ${r}`);
  const COUNTRY_IN = { 'Regno Unito': 'nel Regno Unito', 'Stati Uniti': 'negli Stati Uniti', 'Paesi Bassi': 'nei Paesi Bassi', 'Emirati Arabi Uniti': 'negli Emirati Arabi Uniti' };
  const countryIn = (n) => COUNTRY_IN[n] || `in ${n}`;
  // «del ferro», «dello zolfo», «dell'oro»
  function ofElement(name) {
    const n = name.toLowerCase();
    if (/^(s[^aeiou]|z|x|gn|ps|i[aeiou])/.test(n)) return `dello ${n}`;
    return /^[aeiouh]/.test(n) ? `dell'${n}` : `del ${n}`;
  }
  const elementBy = Object.fromEntries(elements.map((e) => [e.name, e]));
  const elLabel = (name) => (elementBy[name] ? `${name} (${elementBy[name].sym})` : null);

  // Il motore (game.js) decide quali risposte digitate sono giuste: lo usiamo per scartare le domande
  // in cui la risposta di una domanda simile passerebbe come errore di battitura (es. Gambia/Zambia).
  let engineMemo;
  function engine() {
    if (engineMemo === undefined) {
      engineMemo = root.QuizGame || null;
      if (!engineMemo && typeof module !== 'undefined' && typeof require === 'function') {
        try { engineMemo = require('./game.js'); } catch { engineMemo = null; }
      }
    }
    return engineMemo;
  }
  const normMemo = new Map();
  function norm(s) {
    let v = normMemo.get(s);
    if (v === undefined) {
      v = engine() ? engine().normalizeText(s) : String(s).toLowerCase().trim();
      normMemo.set(s, v);
    }
    return v;
  }
  // Domanda a risposta libera: le varianti uguali alla risposta (dopo la normalizzazione) vengono tolte.
  function typed(text, answer, { accept = [], hint, ...extra } = {}) {
    const seen = new Set([norm(answer)]);
    const acc = accept.filter((a) => {
      const n = a && norm(a);
      if (!n || seen.has(n)) return false;
      seen.add(n);
      return true;
    });
    return { type: 'scrivi', text, answer, ...(acc.length ? { accept: acc } : {}), ...(hint ? { hint } : {}), ...extra };
  }
  // Quanti errori di battitura il motore tollera per una risposta (lo chiediamo al motore stesso).
  const allowMemo = new Map();
  function allowance(t) {
    if (!allowMemo.has(t)) {
      const ok = (extra) => engine().matchTyped({ answer: t }, t + extra).correct;
      allowMemo.set(t, ok('qqq') ? 3 : ok('qq') ? 2 : ok('q') ? 1 : 0);
    }
    return allowMemo.get(t);
  }
  // Rivali normalizzati e raggruppati per lunghezza: solo quelli di lunghezza vicina possono passare per errore.
  const rivalMemo = new WeakMap();
  function rivalsByLength(rivals) {
    if (!rivalMemo.has(rivals)) {
      const m = new Map();
      for (const n of new Set(rivals.map(norm))) m.set(n.length, [...(m.get(n.length) || []), n]);
      rivalMemo.set(rivals, m);
    }
    return rivalMemo.get(rivals);
  }
  // Limite inferiore di qualunque distanza di modifica: lettere in più o in meno, senza badare all'ordine.
  function bagDistance(a, b) {
    const left = new Map();
    for (const ch of a) left.set(ch, (left.get(ch) || 0) + 1);
    let extra = 0;
    for (const ch of b) {
      const v = left.get(ch) || 0;
      if (v) left.set(ch, v - 1);
      else extra++;
    }
    let missing = 0;
    for (const v of left.values()) missing += v;
    return Math.max(extra, missing);
  }
  function typedSafe(q, rivals) {
    const E = engine();
    if (!E) return true;
    const own = [q.answer, ...(q.accept || [])].map(norm);
    const byLength = rivalsByLength(rivals);
    for (const t of own) {
      const allow = allowance(t);
      for (let len = t.length - allow; len <= t.length + allow; len++) {
        for (const n of byLength.get(len) || []) {
          if (!own.includes(n) && bagDistance(t, n) <= allow && E.matchTyped(q, n).correct) return false;
        }
      }
    }
    return true;
  }
  // Calcola una volta sola per chiave (es. i rivali di un continente).
  const memoBy = (fn) => {
    const m = new Map();
    return (k) => {
      if (!m.has(k)) m.set(k, fn(k));
      return m.get(k);
    };
  };
  // Generatore «scrivi» da un elenco: toQ(item) dà una domanda con la sua «key» (o più versioni, in ordine
  // di preferenza: si usa la prima sicura); rivals sono le risposte di domande simili.
  function typedGen(id, list, toQ, rivals = []) {
    const ok = once(() => list.flatMap((it) => {
      const r = typeof rivals === 'function' ? rivals(it) : rivals;
      const q = [].concat(toQ(it) || []).find((x) => x.answer.length <= 40 && norm(x.answer) && typedSafe(x, r));
      return q ? [{ d: it.d, q }] : [];
    }));
    return {
      mode: 'scrivi',
      get count() { return ok().length; },
      make(rng, diff) {
        const pool = ok();
        if (!pool.length) return null;
        const { q } = pick(rng, byDiff(pool, diff));
        return { ...q, key: `w${id}:${q.key}` };
      },
    };
  }

  // Nomi di persona: si accetta anche il solo cognome (se non è condiviso con un altro della lista).
  const PERSON_ALT = {
    'Dante Alighieri': ['Dante', 'Alighieri'],
    'Giuseppe Tomasi di Lampedusa': ['Tomasi di Lampedusa', 'Lampedusa'],
    "San Francesco d'Assisi": ["Francesco d'Assisi", 'San Francesco'],
    'Gabriel García Márquez': ['García Márquez', 'Márquez'],
    'Lev Tolstoj': ['Tolstoj', 'Tolstoy', 'Tolstoi'],
    'Fëdor Dostoevskij': ['Dostoevskij', 'Dostoevsky'],
    'Francis Scott Fitzgerald': ['Fitzgerald', 'Scott Fitzgerald', 'F. Scott Fitzgerald'],
    'Arthur Conan Doyle': ['Conan Doyle', 'Doyle'],
    'Harriet Beecher Stowe': ['Beecher Stowe', 'Stowe'],
    'L. Frank Baum': ['Baum', 'Frank Baum'],
    'J. R. R. Tolkien': ['Tolkien'],
    'J. K. Rowling': ['Rowling'],
    'J. D. Salinger': ['Salinger'],
    'J. M. Barrie': ['Barrie'],
    'C. S. Lewis': ['Lewis'],
    'George R. R. Martin': ['George Martin', 'Martin'],
    "Pëtr Il'ič Čajkovskij": ['Čajkovskij', 'Ciajkovskij', 'Ciaikovski', 'Tchaikovsky'],
    'Nikolaj Rimskij-Korsakov': ['Rimskij-Korsakov', 'Rimsky-Korsakov'],
    "Sergej Prokof'ev": ["Prokof'ev", 'Prokofiev'],
    'Georg Friedrich Händel': ['Händel', 'Haendel'],
    'Johann Strauss figlio': ['Johann Strauss', 'Strauss'],
    'Vincent van Gogh': ['van Gogh'],
    'Jan van Eyck': ['van Eyck'],
    'Leonardo da Vinci': ['Leonardo', 'da Vinci'],
    'Piero della Francesca': ['della Francesca'],
    'Giuseppe Pellizza da Volpedo': ['Pellizza da Volpedo', 'Pellizza'],
    'Pieter Bruegel il Vecchio': ['Pieter Bruegel', 'Bruegel', 'Brueghel'],
    Michelangelo: ['Michelangelo Buonarroti', 'Buonarroti'],
    Raffaello: ['Raffaello Sanzio', 'Sanzio'],
    Caravaggio: ['Michelangelo Merisi da Caravaggio', 'Merisi'],
    Tiziano: ['Tiziano Vecellio', 'Vecellio'],
    Giotto: ['Giotto di Bondone'],
    Rembrandt: ['Rembrandt van Rijn'],
    'Lana e Lilly Wachowski': ['Wachowski', 'sorelle Wachowski', 'fratelli Wachowski'],
    'Bong Joon-ho': ['Bong'],
    'Charlie Chaplin': ['Chaplin', 'Charlot'],
    'Francis Ford Coppola': ['Coppola'],
  };
  const altsMemo = new Map();
  function personAlts(full) {
    if (!altsMemo.has(full)) altsMemo.set(full, computeAlts(full));
    return altsMemo.get(full);
  }
  function computeAlts(full) {
    if (PERSON_ALT[full]) return PERSON_ALT[full];
    const w = full.split(' ');
    if (w.length < 2) return [];
    let i = w.length - 1;
    while (i > 1 && /^(de|di|da|del|della|van|von|De|Di|Da)$/.test(w[i - 1])) i--;
    const out = [w.slice(i).join(' ')];
    if (i < w.length - 1 && /^(de|von|van)$/.test(w[i])) out.push(w.at(-1)); // «de Cervantes» e «Cervantes»
    return out;
  }
  // Domanda su una persona: prima versione con il cognome accettato, poi (se il cognome è ambiguo) senza.
  // Per ogni elenco di persone: quante persone diverse usano ciascun nome o cognome (normalizzato).
  const ownersMemo = new WeakMap();
  function nameOwners(people) {
    if (!ownersMemo.has(people)) {
      const m = new Map();
      for (const p of new Set(people)) for (const n of new Set([p, ...personAlts(p)].map(norm))) m.set(n, (m.get(n) || 0) + 1);
      ownersMemo.set(people, m);
    }
    return ownersMemo.get(people);
  }
  function personQs(text, full, people, extra = {}, more = []) {
    const owners = nameOwners(people);
    const alts = [...personAlts(full).filter((a) => (owners.get(norm(a)) || 0) <= 1), ...more];
    const last = norm(full.split(' ').at(-1));
    const bySurname = full.includes(' ') && alts.some((a) => norm(a).endsWith(last) && norm(a) !== norm(full));
    const E = engine();
    const hint = bySurname && E ? `${E.typedHint(full)} · basta il cognome` : undefined;
    return [typed(text, full, { ...extra, accept: alts, hint }), typed(text, full, { ...extra, accept: more })];
  }
  const peopleRivals = (people) => people.flatMap((p) => [p, ...personAlts(p)]);

  // «Trova l'intruso»: tre elementi dello stesso gruppo e uno di un altro; l'intruso è la risposta giusta.
  function pickDistinct(rng, list, n) {
    const out = [];
    const seen = new Set();
    for (const x of shuffle(rng, list)) {
      if (seen.has(x.label)) continue;
      seen.add(x.label);
      out.push(x);
      if (out.length === n) break;
    }
    return out;
  }
  // items: [{ label, group, d }]. oddOk(o, g) dice se o può fare da intruso nel gruppo g (scarta i casi ambigui);
  // un'etichetta presente nel gruppo (anche con un'altra voce) non può mai essere l'intruso.
  function oddGen(id, items, { text, why, oddOk = () => true, groupOk = () => true }) {
    const groups = once(() => {
      const m = new Map();
      for (const it of items) m.set(it.group, [...(m.get(it.group) || []), it]);
      return [...m]
        .filter(([g, list]) => groupOk(g) && new Set(list.map((x) => x.label)).size >= 3)
        .map(([g, list]) => {
          const labels = new Set(list.map((x) => x.label));
          return { g, members: list, odds: items.filter((o) => o.group !== g && !labels.has(o.label) && oddOk(o, g)) };
        })
        .filter((x) => x.odds.length);
    });
    return {
      mode: 'intruso',
      get count() { return groups().reduce((n, x) => n + x.odds.length, 0); },
      make(rng, diff) {
        const gs = groups();
        if (!gs.length) return null;
        const easy = gs.filter((x) => new Set(x.members.filter((m) => fits(m.d, diff)).map((m) => m.label)).size >= 3);
        const { g, members, odds } = pick(rng, easy.length ? easy : gs);
        const fitting = members.filter((m) => fits(m.d, diff));
        const common = pickDistinct(rng, new Set(fitting.map((m) => m.label)).size >= 3 ? fitting : members, 3);
        const odd = pick(rng, byDiff(odds, diff));
        const labels = common.map((x) => x.label);
        const answers = shuffle(rng, [...labels, odd.label]);
        return {
          type: 'quiz', text: text(g), answers, correct: answers.indexOf(odd.label),
          key: `odd:${id}:${g}:${[...labels].sort().join(',')}:${odd.label}`, why: why(g, odd, common),
        };
      },
    };
  }
  // Insiemi scritti a mano: { id, text, members: [...], odds: [[intruso, spiegazione], ...], others }.
  function oddSets(id, sets) {
    const items = [];
    for (const s of sets) {
      for (const m of s.members.filter(Boolean)) items.push({ label: m, group: s.id, d: s.d });
      for (const [label, note] of s.odds) if (label) items.push({ label, group: `${s.id}~`, note, d: s.d });
    }
    const byId = Object.fromEntries(sets.map((s) => [s.id, s]));
    return oddGen(id, items, {
      groupOk: (g) => !g.endsWith('~'),
      oddOk: (o, g) => o.group === `${g}~`,
      text: (g) => byId[g].text,
      why: (g, odd) => `${odd.label}: ${odd.note}. ${byId[g].others}`,
    });
  }

  // «Testa a testa»: due elementi con un valore; vince il maggiore (o il minore con lowerWins).
  // Con il campo «group» le coppie si formano solo nello stesso gruppo; valid(a, b, diff) scarta le coppie troppo vicine.
  function duelGen(id, items, { text, why, valid, lowerWins = false }) {
    const groups = once(() => {
      const m = new Map();
      for (const it of items) m.set(it.group ?? '', [...(m.get(it.group ?? '') || []), it]);
      return [...m.values()].filter((l) => l.length >= 2);
    });
    const pairs = once(() => groups().reduce((n, l) => {
      for (let i = 0; i < l.length; i++) for (let j = i + 1; j < l.length; j++) if (l[i].label !== l[j].label && valid(l[i], l[j], 'difficile')) n++;
      return n;
    }, 0));
    return {
      mode: 'duello',
      get count() { return pairs(); },
      make(rng, diff) {
        if (!groups().length) return null;
        for (const level of [diff, 'difficile']) {
          for (let attempt = 0; attempt < 40; attempt++) {
            const pool = byDiff(pick(rng, groups()), level);
            const a = pick(rng, pool);
            const b = pick(rng, pool);
            if (a.label === b.label || a.value === b.value || !valid(a, b, level)) continue;
            const [win, lose] = (lowerWins ? a.value < b.value : a.value > b.value) ? [a, b] : [b, a];
            const answers = shuffle(rng, [a.label, b.label]);
            return {
              type: 'quiz', text: typeof text === 'function' ? text(a) : text, answers, correct: answers.indexOf(win.label),
              key: `duel:${id}:${a.group ?? ''}:${[a.label, b.label].sort().join('|')}`, why: why(win, lose),
            };
          }
        }
        return null;
      },
    };
  }
  const gapAtLeast = (gaps) => (a, b, diff) => Math.abs(a.value - b.value) >= (gaps[diff] ?? gaps.mista);
  const ratioAtLeast = (ratios) => (a, b, diff) => Math.max(a.value, b.value) / Math.min(a.value, b.value) >= (ratios[diff] ?? ratios.mista);
  // Eventi storici: stesso prefisso di chiave in ogni categoria, così la stessa coppia non esce due volte.
  const eventDuel = (list) => duelGen('ev', list.map((e) => ({ label: e.e, value: e.y, d: e.d })), {
    text: 'Che cosa è successo prima?', lowerWins: true,
    valid: gapAtLeast({ facile: 100, media: 30, difficile: 10, mista: 15 }),
    why: (w, l) => `${formatYear(w.value)}: ${w.label} · ${formatYear(l.value)}: ${l.label}`,
  });

  // ---------- 1. Geografia del mondo ----------
  const CAP_SKIP = new Set(['ci', 'bj', 'bi', 'sz', 'gw', 'st']); // capitali contese, doppie o già nel nome del Paese
  const CAP_ALT = {
    dk: ['Copenhagen'], hr: ['Zagreb'], ua: ['Kyiv'], ro: ['București'], si: ['Ljubljana'], md: ['Kishinev'], mt: ['Valletta'],
    xk: ['Prishtina'], sa: ['Riyad', 'Riyadh'], am: ['Yerevan'], bd: ['Dhaka'], cn: ['Beijing'], kr: ['Seoul'], jp: ['Tokio'],
    in: ['New Delhi'], ir: ['Tehran'], iq: ['Bagdad'], mn: ['Ulaanbaatar'], np: ['Kathmandu'], om: ['Muscat'], kz: ['Nur-Sultan'],
    kg: ['Bishkek'], tj: ['Dushanbe'], tm: ['Ashgabat'], uz: ['Toshkent'], ye: ['Sanaa'], mm: ['Nay Pyi Taw'], et: ['Addis Ababa'],
    so: ['Mogadishu'], sd: ['Khartoum'], ss: ['Juba'], za: ['Città del Capo', 'Bloemfontein'], td: ['Ndjamena'], us: ['Washington DC'],
    cu: ['La Habana', 'Havana'], co: ['Santa Fe de Bogotá'], cl: ['Santiago del Cile', 'Santiago de Chile'], ki: ['Tarawa'], to: ['Nukualofa'],
  };
  const INTRUSO_SKIP = new Set([...TRANSCONTINENTAL, 'eg', 'id', 'pa', 'tl', 'tt']); // a cavallo tra due continenti
  // Rivali di capitali e bandiere: lo stesso continente, dove le confusioni sono plausibili (Gambia/Zambia, Irlanda/Islanda).
  const capitalRivals = memoBy((cont) => capitalList.filter((x) => x.cont === cont).flatMap((x) => [capitalOf(x), ...(CAP_ALT[x.iso] || [])]));
  const capitalList = countries.filter((c) => !c.nocap && !CAP_SKIP.has(c.iso) && (capitalOk(c) || c.iso === 'cl'));
  const capitalOf = (c) => (c.iso === 'cl' ? 'Santiago' : c.capital);
  addTo('mondo', [
    typedGen('cap', capitalList, (c) => typed(`Qual è la capitale di questo Paese: ${c.name}?`, capitalOf(c), {
      key: c.iso, accept: CAP_ALT[c.iso] || [],
      why: c.iso === 'za' ? 'Il Sudafrica ha tre capitali: Pretoria (governo), Città del Capo (parlamento) e Bloemfontein (giustizia).' : undefined,
    }), (c) => capitalRivals(c.cont)),
    oddGen('cont', countries.filter((c) => !INTRUSO_SKIP.has(c.iso)).map((c) => ({ label: c.name, group: c.cont, d: c.d })), {
      text: (g) => `Trova l'intruso: quale di questi Paesi NON si trova in ${D.continents[g]}?`,
      why: (g, odd) => `${odd.label}: ${D.continents[odd.group]}. Gli altri si trovano in ${D.continents[g]}.`,
    }),
    duelGen('rankW', (D.rankings || []).flatMap((r, i) => (/continenti|oceani|Paesi|deserti|montagne/.test(r.q) ? r.items.map(([label, value]) => ({ label, value, group: i, r })) : [])), {
      text: (a) => [[/continenti/, 'Quale continente è più esteso?'], [/oceani/, 'Quale oceano è più esteso?'], [/Paesi/, 'Quale Paese è più esteso?'],
        [/deserti/, 'Quale deserto è più esteso?'], [/montagne/, 'Quale montagna è più alta?']].find(([re]) => re.test(a.r.q))[1],
      valid: ratioAtLeast({ facile: 1.5, media: 1.15, difficile: 1.03, mista: 1.1 }),
      why: (w, l) => `${w.label}: ${fmtNum(w.value)} ${w.r.unit} · ${l.label}: ${fmtNum(l.value)} ${l.r.unit}`,
    }),
  ]);

  // ---------- 2. Bandiere ----------
  const FLAG_SKIP = new Set(['mc', 'id', 'td', 'ro']); // bandiere quasi identiche a un'altra (Monaco/Indonesia, Ciad/Romania)
  const FLAG_ALT = {
    us: ['USA', "Stati Uniti d'America"], gb: ['Gran Bretagna', 'UK'], nl: ['Olanda'], cz: ['Cechia'], ba: ['Bosnia', 'Bosnia-Erzegovina'],
    va: ['Vaticano', 'Santa Sede'], mk: ['Macedonia'], md: ['Moldova'], by: ['Belarus'], ae: ['Emirati Arabi', 'Emirati'], mm: ['Birmania'],
    sz: ['Swaziland'], tl: ['Timor Orientale', 'Timor-Leste'], ci: ["Côte d'Ivoire"], cd: ['RD Congo', 'Congo-Kinshasa'], cg: ['Congo', 'Congo-Brazzaville'],
    kg: ['Kirghizia', 'Kyrgyzstan'], tj: ['Tajikistan'], az: ['Azerbaijan'], kz: ['Kazakhstan'], za: ['Sud Africa', 'Repubblica Sudafricana'],
    rw: ['Rwanda'], fj: ['Fiji'], km: ['Isole Comore'], mv: ['Isole Maldive'], sc: ['Isole Seychelles'], mh: ['Marshall'], sb: ['Salomone'],
    bh: ['Bahrain'], ke: ['Kenia'], dj: ['Djibouti'], cv: ['Cabo Verde'], cf: ['Centrafrica'], ag: ['Antigua'], kn: ['Saint Kitts'], tt: ['Trinidad'],
  };
  const flagList = countries.filter((c) => !FLAG_SKIP.has(c.iso));
  const flagRivals = memoBy((cont) => countries.filter((x) => x.cont === cont).flatMap((x) => [x.name, ...(FLAG_ALT[x.iso] || [])]));
  addTo('bandiere', [
    typedGen('flag', flagList, (c) => typed('Di quale Paese è questa bandiera?', c.name, {
      key: c.iso, accept: FLAG_ALT[c.iso] || [], media: flagMedia(c.iso), why: INTRUSO_SKIP.has(c.iso) ? undefined : `Si trova in ${D.continents[c.cont]}.`,
    }), (c) => flagRivals(c.cont)),
  ]);

  // ---------- 3. Italia ----------
  function regionAccept(region, city) {
    if (region === 'Trentino-Alto Adige') {
      if (!city) return ['Trentino', 'Alto Adige', 'Südtirol'];
      return ['Bolzano', 'Merano'].includes(city) ? ['Alto Adige', 'Südtirol'] : ['Trentino'];
    }
    return { 'Friuli-Venezia Giulia': ['Friuli'], "Valle d'Aosta": ["Val d'Aosta"] }[region] || [];
  }
  const regionRivals = regionNames.flatMap((r) => [r, ...regionAccept(r, '')]);
  addTo('italia', [
    typedGen('regcap', regions.map((r) => ({ ...r, d: 1 })), (r) => typed(`Qual è il capoluogo della regione ${r.name}?`, r.capital, { key: r.name }),
      [...regions.map((r) => r.capital), ...cities.map((c) => c.name)]),
    typedGen('city', cities, (c) => typed(`In quale regione si trova ${c.name}?`, c.region, { key: c.name, accept: regionAccept(c.region, c.name) }), regionRivals),
    oddGen('city', cities.map((c) => ({ label: c.name, group: c.region, d: c.d })), {
      text: (g) => `Trova l'intruso: quale di queste città NON si trova ${regIn(g)}?`,
      why: (g, odd) => `${odd.label}: ${odd.group}. Le altre si trovano ${regIn(g)}.`,
    }),
    duelGen('rankI', (D.rankings || []).flatMap((r, i) => (/fiumi|laghi|regioni|città|isole/.test(r.q) ? r.items.map(([label, value]) => ({ label, value, group: i, r })) : [])), {
      text: (a) => [[/fiumi/, 'Quale fiume è più lungo?'], [/laghi/, 'Quale lago è più esteso?'], [/regioni/, 'Quale regione è più estesa?'],
        [/città/, 'Quale città ha più abitanti?'], [/isole/, 'Quale isola è più estesa?']].find(([re]) => re.test(a.r.q))[1],
      valid: ratioAtLeast({ facile: 1.5, media: 1.15, difficile: 1.03, mista: 1.1 }),
      why: (w, l) => `${w.label}: ${fmtNum(w.value)} ${w.r.unit} · ${l.label}: ${fmtNum(l.value)} ${l.r.unit}`,
    }),
  ]);

  // ---------- 4. Monumenti ----------
  const landmarkCountry = (l) => l.where.split(', ').pop();
  const landmarkCity = (l) => (l.where.includes(', ') ? l.where.split(', ')[0] : null);
  const LM_NOT_CITY = new Set(['Inghilterra', 'Baviera', 'Dakota del Sud', 'Isola di Pasqua', 'Normandia']);
  const CITY_ALT = { 'Rio de Janeiro': ['Rio'], 'New York': ['New York City'], Pechino: ['Beijing'], Kyoto: ['Kioto'] };
  const lmCities = (D.landmarks || []).filter((l) => landmarkCity(l) && !LM_NOT_CITY.has(landmarkCity(l)) && !l.name.includes(landmarkCity(l)));
  addTo('monumenti', [
    typedGen('lmcity', lmCities, (l) => typed(`In quale città si trova questo luogo: ${l.name}?`, landmarkCity(l), {
      key: l.name, accept: CITY_ALT[landmarkCity(l)] || [], media: image(imgs()[l.wiki]) || undefined, why: l.where,
    }), (D.landmarks || []).map(landmarkCity).filter(Boolean)),
    oddGen('lm', (D.landmarks || []).filter((l) => !landmarkCountry(l).includes(' e ') && landmarkCountry(l) !== 'Città del Vaticano')
      .map((l) => ({ label: l.name, group: landmarkCountry(l), d: l.d, where: l.where })), {
      text: (g) => `Trova l'intruso: quale di questi luoghi NON si trova ${countryIn(g)}?`,
      why: (g, odd) => `${odd.label}: ${odd.where}. Gli altri si trovano ${countryIn(g)}.`,
    }),
  ]);

  // ---------- 5. Storia ----------
  const presidents = D.presidents || [];
  const presidentNames = presidents.map((p) => p[0]);
  const romanKings = D.romanKings || [];
  const KING_ALT = { 'Numa Pompilio': ['Numa'], 'Tarquinio il Superbo': ['Tarquinio Superbo'] };
  const century = (y) => Math.floor((y - 1) / 100) + 1;
  addTo('storia', [
    typedGen('evy', events.filter((e) => e.y > 0), (e) => typed(`In che anno? ${e.e}`, String(e.y), { key: `${e.y}:${e.e}` })),
    typedGen('pres', presidents.map(([name, y]) => ({ name, y })), (p) => personQs(
      p.y === 1946 ? 'Chi è stato il primo capo dello Stato della Repubblica italiana, eletto nel 1946?' : `Chi è stato eletto presidente della Repubblica italiana nel ${p.y}?`,
      p.name, presidentNames, { key: p.name },
    ), peopleRivals(presidentNames)),
    typedGen('king', romanKings.map((k, i) => ({ k, i })), ({ k, i }) => typed(`Secondo la tradizione, chi fu il ${ORD[i]} re di Roma?`, k, {
      key: k, accept: KING_ALT[k] || [],
    }), romanKings),
    oddGen('cent', events.filter((e) => e.y > 0 && e.y % 100 > 1).map((e) => ({ label: e.e, group: century(e.y), y: e.y, d: e.d }))
      .concat(events.filter((e) => e.y <= 0).map((e) => ({ label: e.e, group: 'aC', y: e.y, d: e.d }))), {
      groupOk: (g) => g !== 'aC' && g >= 11,
      oddOk: (o, g) => o.y < (g - 1) * 100 - 9 || o.y > g * 100 + 10,
      text: (g) => `Trova l'intruso: quale di questi eventi NON è avvenuto nel ${toRoman(g)} secolo?`,
      why: (g, odd) => `${formatYear(odd.y)}: ${odd.label}. Gli altri sono avvenuti nel ${toRoman(g)} secolo (${(g - 1) * 100 + 1}–${g * 100}).`,
    }),
    eventDuel(events),
    duelGen('presk', [
      ...presidents.map(([label, value]) => ({ label, value, group: 'p' })),
      ...romanKings.map((label, value) => ({ label, value, group: 'k' })),
    ], {
      text: (a) => (a.group === 'p' ? 'Quale di questi presidenti della Repubblica è stato eletto per primo?' : 'Secondo la tradizione, quale di questi re di Roma ha regnato per primo?'),
      lowerWins: true, valid: () => true,
      why: (w, l) => (w.group === 'p' ? `${w.label}: ${w.value} · ${l.label}: ${l.value}` : `${w.label} fu ${theOrd(w.value)} re di Roma, ${l.label} ${theOrd(l.value)}.`),
    }),
  ]);

  // ---------- 6. Mitologia ----------
  const GODS = [ // [greco, romano, maschile?, d, varianti greche, varianti romane]
    ['Zeus', 'Giove', true, 1, [], []], ['Era', 'Giunone', false, 1, ['Hera'], []], ['Poseidone', 'Nettuno', true, 1, ['Poseidon'], []],
    ['Ade', 'Plutone', true, 1, ['Hades'], ['Dite', 'Orco']], ['Atena', 'Minerva', false, 1, ['Athena', 'Pallade'], []],
    ['Artemide', 'Diana', false, 1, [], []], ['Ares', 'Marte', true, 1, [], []], ['Afrodite', 'Venere', false, 1, [], []],
    ['Ermes', 'Mercurio', true, 1, ['Hermes'], []], ['Efesto', 'Vulcano', true, 2, [], []], ['Dioniso', 'Bacco', true, 1, ['Dionisio'], ['Libero']],
    ['Demetra', 'Cerere', false, 2, [], []], ['Estia', 'Vesta', false, 2, ['Hestia'], []], ['Persefone', 'Proserpina', false, 2, [], []],
    ['Eros', 'Cupido', true, 2, [], ['Amore']],
  ];
  const godNames = GODS.flatMap((g) => [g[0], g[1], ...g[4], ...g[5]]);
  const PANTHEON = {
    greca: ['Zeus', 'Era', 'Poseidone', 'Ade', 'Atena', 'Artemide', 'Ares', 'Afrodite', 'Ermes', 'Efesto', 'Dioniso', 'Demetra', 'Persefone'],
    romana: ['Giove', 'Giunone', 'Nettuno', 'Minerva', 'Diana', 'Marte', 'Venere', 'Mercurio', 'Vulcano', 'Cerere', 'Vesta', 'Giano', 'Proserpina'],
    norrena: ['Odino', 'Thor', 'Loki', 'Freyja', 'Baldr', 'Frigg', 'Tyr', 'Heimdall'],
    egizia: ['Ra', 'Osiride', 'Iside', 'Anubi', 'Horus', 'Seth', 'Thot', 'Bastet'],
  };
  const FAMOUS_GODS = new Set(['Zeus', 'Era', 'Poseidone', 'Ade', 'Atena', 'Afrodite', 'Giove', 'Giunone', 'Nettuno', 'Minerva', 'Venere', 'Marte', 'Odino', 'Thor', 'Loki', 'Ra', 'Osiride', 'Iside', 'Anubi']);
  addTo('mitologia', [
    typedGen('god', GODS.flatMap(([gr, ro, m, d, ga, ra]) => [
      { text: `Nella mitologia romana, come si chiama ${m ? 'il dio' : 'la dea'} che i Greci chiamavano ${gr}?`, answer: ro, accept: ra, d },
      { text: `Nella mitologia greca, come si chiama ${m ? 'il dio' : 'la dea'} che i Romani chiamavano ${ro}?`, answer: gr, accept: ga, d },
    ]), (x) => typed(x.text, x.answer, { key: x.text, accept: x.accept }), godNames),
    oddGen('pantheon', Object.entries(PANTHEON).flatMap(([group, names]) => names.map((label) => ({ label, group, d: FAMOUS_GODS.has(label) ? 1 : 2 }))), {
      text: (g) => `Trova l'intruso: quale di queste divinità NON appartiene alla mitologia ${g}?`,
      why: (g, odd) => `${odd.label}: mitologia ${odd.group}. Le altre sono divinità della mitologia ${g}.`,
    }),
  ]);

  // ---------- 7. Arte ----------
  const painters = artists;
  const titleNamesArtist = (p) => p.artist.split(/[ -]/).some((w) => w.length >= 4 && p.title.toLowerCase().includes(w.toLowerCase()));
  addTo('arte', [
    typedGen('paint', paintings.filter((p) => !titleNamesArtist(p)), (p) => personQs(`Chi ha dipinto «${p.title}»?`, p.artist, painters, {
      key: p.title, media: image(imgs()[p.wiki]) || undefined,
    }), peopleRivals(painters)),
    oddGen('paint', paintings.map((p) => ({ label: p.title, group: p.artist, d: p.d })), {
      text: (g) => `Trova l'intruso: quale di queste opere NON è di ${g}?`,
      why: (g, odd) => `«${odd.label}» è di ${odd.group}; le altre sono di ${g}.`,
    }),
  ]);

  // ---------- 8. Letteratura ----------
  addTo('letteratura', [
    typedGen('book', books.filter((b) => !titleNamesArtist({ title: b.title, artist: b.author })), (b) => personQs(`Chi ha scritto «${b.title}»?`, b.author, authors, {
      key: b.title,
    }), peopleRivals(authors)),
    oddGen('book', books.map((b) => ({ label: b.title, group: b.author, d: b.d })), {
      text: (g) => `Trova l'intruso: quale di queste opere NON è stata scritta da ${g}?`,
      why: (g, odd) => `«${odd.label}» è di ${odd.group}; le altre sono di ${g}.`,
    }),
  ]);

  // ---------- 10. Cinema ----------
  const directors = [...new Set(films.map((f) => f.director))];
  // Varianti accettate: titoli brevi e, per «Guerre stellari», il titolo originale che compare anche nelle battute.
  const FILM_ALT = {
    'Guerre stellari': ['Star Wars'], "E.T. l'extra-terrestre": ['E.T.', 'ET'], 'WALL•E': ['Wall-E', 'Walle'], '007': ['James Bond', 'Agente 007'],
    'Sopravvissuto - The Martian': ['Sopravvissuto', 'The Martian'], 'Biancaneve e i sette nani': ['Biancaneve'],
    'Alice nel Paese delle Meraviglie': ['Alice'],
  };
  const filmAlt = (t) => FILM_ALT[t] || [];
  addTo('cinema', [
    typedGen('efilm', emojiFilms, (f) => typed('Quale film raccontano queste emoji?', f.title, {
      key: f.title, accept: filmAlt(f.title), media: emoji(f.emoji),
    }), emojiFilms.flatMap((f) => [f.title, ...filmAlt(f.title)])),
    typedGen('dir', films, (f) => personQs(`Chi ha diretto «${f.title}»?`, f.director, directors, { key: f.title, why: `Uscito nel ${f.year}` }), peopleRivals(directors)),
    oddGen('dir', films.map((f) => ({ label: f.title, group: f.director, d: f.d, year: f.year })), {
      text: (g) => `Trova l'intruso: quale di questi film NON è stato diretto da ${g}?`,
      why: (g, odd) => `«${odd.label}» (${odd.year}) è di ${odd.group}; gli altri sono di ${g}.`,
    }),
    duelGen('filmy', films.map((f) => ({ label: f.title, value: f.year, d: f.d })), {
      text: 'Quale film è uscito prima?', lowerWins: true,
      valid: gapAtLeast({ facile: 20, media: 8, difficile: 3, mista: 5 }),
      why: (w, l) => `${w.label} (${w.value}) · ${l.label} (${l.value})`,
    }),
  ]);

  // ---------- 11. Musica ----------
  addTo('musica', [
    // «Otello» l'hanno scritto sia Verdi sia Rossini; anche Leoncavallo ha composto una «Bohème».
    typedGen('opera', operas.filter((o) => o.title !== 'Otello'), (o) => personQs(`Chi ha composto l'opera «${o.title}»?`, o.composer, composers, { key: o.title },
      o.title === 'La bohème' ? ['Ruggero Leoncavallo', 'Leoncavallo'] : []), peopleRivals(composers)),
    typedGen('class', classical, (o) => personQs(`Chi ha composto ${titled(o.title)}?`, o.composer, composers, { key: o.title }), peopleRivals(composers)),
    oddGen('opera', operas.map((o) => ({ label: o.title, group: o.composer, d: o.d })), {
      oddOk: (o, g) => !(o.label === 'Otello' && g === 'Gioachino Rossini'), // anche Rossini ha scritto un «Otello»
      text: (g) => `Trova l'intruso: quale di queste opere liriche NON è stata composta da ${g}?`,
      why: (g, odd) => `«${odd.label}» è di ${odd.group}; le altre sono di ${g}.`,
    }),
    oddGen('class', classical.map((o) => ({ label: o.title, group: o.composer, d: o.d })), {
      oddOk: (o) => o.label !== 'Clair de lune', // si confonderebbe con la sonata «Al chiaro di luna»
      text: (g) => `Trova l'intruso: quale di questi brani NON è stato composto da ${g}?`,
      why: (g, odd) => `${titled(odd.label)} è di ${odd.group}; gli altri sono di ${g}.`,
    }),
  ]);

  // ---------- 12. Scienza ----------
  addTo('scienza', [
    eventDuel(events.filter((e) => /Galileo|Newton|Darwin|relatività|penicillina|DNA|Dolly|pila|calendario gregoriano/.test(e.e))),
  ]);

  // ---------- 13. Elementi chimici ----------
  const EL_ALT = { Kripton: ['Krypton', 'Cripto'], Xeno: ['Xenon'], Nichel: ['Nickel'], Tungsteno: ['Wolframio'], Oganesson: ['Oganessio'], Tennesso: ['Tennessinio'] };
  const el = (...names) => names.map(elLabel);
  addTo('elementi', [
    typedGen('ename', elements, (e) => typed(`Quale elemento chimico ha simbolo «${e.sym}»?`, e.name, { key: e.sym, accept: EL_ALT[e.name] || [], why: `Numero atomico ${e.z}` }),
      elements.flatMap((e) => [e.name, ...(EL_ALT[e.name] || [])])),
    typedGen('esym', elements, (e) => typed(`Qual è il simbolo chimico ${ofElement(e.name)}?`, e.sym, { key: e.sym })),
    oddSets('el', [
      { id: 'nobili', text: "Trova l'intruso: quale di questi elementi NON è un gas nobile?", members: el('Elio', 'Neon', 'Argon', 'Kripton', 'Xeno', 'Radon'), others: 'Gli altri sono gas nobili.',
        odds: [[elLabel('Idrogeno'), 'è un gas, ma non nobile'], [elLabel('Azoto'), 'è un gas, ma non nobile'], [elLabel('Ossigeno'), 'è un gas, ma non nobile'], [elLabel('Cloro'), 'è un alogeno'], [elLabel('Sodio'), 'è un metallo alcalino'], [elLabel('Ferro'), 'è un metallo'], [elLabel('Carbonio'), 'è un non metallo solido']] },
      { id: 'alcalini', text: "Trova l'intruso: quale di questi elementi NON è un metallo alcalino?", members: el('Litio', 'Sodio', 'Potassio', 'Rubidio', 'Cesio', 'Francio'), others: 'Gli altri sono metalli alcalini.',
        odds: [[elLabel('Calcio'), 'è un metallo alcalino-terroso'], [elLabel('Magnesio'), 'è un metallo alcalino-terroso'], [elLabel('Bario'), 'è un metallo alcalino-terroso'], [elLabel('Ferro'), 'è un metallo di transizione'], [elLabel('Rame'), 'è un metallo di transizione'], [elLabel('Alluminio'), 'è un metallo, ma non alcalino'], [elLabel('Elio'), 'è un gas nobile']] },
      { id: 'alogeni', text: "Trova l'intruso: quale di questi elementi NON è un alogeno?", members: el('Fluoro', 'Cloro', 'Bromo', 'Iodio', 'Astato'), others: 'Gli altri sono alogeni.',
        odds: [[elLabel('Ossigeno'), 'è un non metallo, ma non un alogeno'], [elLabel('Azoto'), 'è un non metallo, ma non un alogeno'], [elLabel('Zolfo'), 'è un non metallo, ma non un alogeno'], [elLabel('Fosforo'), 'è un non metallo, ma non un alogeno'], [elLabel('Neon'), 'è un gas nobile'], [elLabel('Sodio'), 'è un metallo alcalino']] },
      { id: 'terrosi', text: "Trova l'intruso: quale di questi elementi NON è un metallo alcalino-terroso?", members: el('Berillio', 'Magnesio', 'Calcio', 'Stronzio', 'Bario', 'Radio'), others: 'Gli altri sono metalli alcalino-terrosi.',
        odds: [[elLabel('Sodio'), 'è un metallo alcalino'], [elLabel('Potassio'), 'è un metallo alcalino'], [elLabel('Litio'), 'è un metallo alcalino'], [elLabel('Ferro'), 'è un metallo di transizione'], [elLabel('Alluminio'), 'è un metallo, ma non alcalino-terroso']] },
      { id: 'gas', text: "Trova l'intruso: quale di questi elementi NON è un gas a temperatura ambiente?", members: el('Idrogeno', 'Elio', 'Azoto', 'Ossigeno', 'Fluoro', 'Cloro', 'Neon', 'Argon'), others: 'Gli altri sono gas.',
        odds: [[elLabel('Ferro'), 'è solido'], [elLabel('Carbonio'), 'è solido'], [elLabel('Zolfo'), 'è solido'], [elLabel('Sodio'), 'è solido'], [elLabel('Mercurio'), 'è liquido'], [elLabel('Bromo'), 'è liquido'], [elLabel('Iodio'), 'è solido'], [elLabel('Oro'), 'è solido']] },
      { id: 'metalli', text: "Trova l'intruso: quale di questi elementi NON è un metallo?", members: el('Ferro', 'Rame', 'Zinco', 'Oro', 'Argento', 'Piombo', 'Stagno', 'Alluminio', 'Platino', 'Nichel', 'Titanio'), others: 'Gli altri sono metalli.',
        odds: ['Carbonio', 'Zolfo', 'Ossigeno', 'Azoto', 'Fosforo', 'Cloro', 'Neon', 'Iodio', 'Elio'].map((n) => [elLabel(n), 'è un non metallo']) },
    ]),
    duelGen('ez', elements.map((e) => ({ label: `${e.name} (${e.sym})`, value: e.z, d: e.d })), {
      text: 'Quale elemento ha il numero atomico più alto?',
      valid: gapAtLeast({ facile: 10, media: 4, difficile: 1, mista: 3 }),
      why: (w, l) => `${w.label}: ${w.value} · ${l.label}: ${l.value}`,
    }),
  ]);

  // ---------- 14. Spazio ----------
  const planets = D.planets || [];
  const planetsBySize = D.planetsBySize || [];
  addTo('spazio', [
    typedGen('planet', [
      ...planets.map((p, i) => ({ p, d: [0, 2, 7].includes(i) ? 1 : 2, text: i === 0 ? 'Qual è il pianeta più vicino al Sole?' : i === 7 ? 'Qual è il pianeta più lontano dal Sole?' : `Qual è il ${ORD[i]} pianeta del Sistema solare, in ordine di distanza dal Sole?` })),
      ...planetsBySize.map((p, i) => ({ p, d: [0, 7].includes(i) ? 1 : 3, text: i === 0 ? 'Qual è il pianeta più grande del Sistema solare?' : i === 7 ? 'Qual è il pianeta più piccolo del Sistema solare?' : `Qual è il ${ORD[i]} pianeta più grande del Sistema solare, per diametro?` })),
    ], (x) => typed(x.text, x.p, { key: x.text }), planets),
    oddSets('space', [
      { id: 'pianeti', text: "Trova l'intruso: quale di questi NON è un pianeta del Sistema solare?", members: planets, others: 'Gli altri sono pianeti.',
        odds: [['Luna', 'è il satellite naturale della Terra'], ['Sole', 'è una stella'], ['Plutone', 'dal 2006 è classificato come pianeta nano'], ['Cerere', 'è un pianeta nano'], ['Titano', 'è un satellite di Saturno'],
          ['Ganimede', 'è un satellite di Giove'], ['Sirio', 'è una stella'], ['Tritone', 'è un satellite di Nettuno'], ['Encelado', 'è un satellite di Saturno']] },
      { id: 'lune', text: "Trova l'intruso: quale di questi NON è un satellite di Giove?", members: ['Io', 'Europa', 'Ganimede', 'Callisto'], others: 'Gli altri sono satelliti di Giove.',
        odds: [['Titano', 'è un satellite di Saturno'], ['Encelado', 'è un satellite di Saturno'], ['Tritone', 'è un satellite di Nettuno'], ['Fobos', 'è un satellite di Marte'], ['Deimos', 'è un satellite di Marte'], ['Caronte', 'è un satellite di Plutone'], ['Luna', 'è il satellite della Terra']] },
      { id: 'rocciosi', text: "Trova l'intruso: quale di questi pianeti NON è roccioso?", members: ['Mercurio', 'Venere', 'Terra', 'Marte'], others: 'Gli altri sono pianeti rocciosi.',
        odds: [['Giove', 'è un gigante gassoso'], ['Saturno', 'è un gigante gassoso'], ['Urano', 'è un gigante ghiacciato'], ['Nettuno', 'è un gigante ghiacciato']] },
      { id: 'giganti', text: "Trova l'intruso: quale di questi pianeti NON è un pianeta gigante?", members: ['Giove', 'Saturno', 'Urano', 'Nettuno'], others: 'Gli altri sono giganti gassosi o ghiacciati.',
        odds: ['Mercurio', 'Venere', 'Terra', 'Marte'].map((p) => [p, 'è un pianeta roccioso']) },
    ]),
    duelGen('planet', [
      ...planets.map((label, value) => ({ label, value, group: 'dist', d: 1 })),
      ...planetsBySize.map((label, value) => ({ label, value, group: 'size', d: 1 })),
    ], {
      text: (a) => (a.group === 'dist' ? 'Quale pianeta è più vicino al Sole?' : 'Quale pianeta ha il diametro maggiore?'), lowerWins: true,
      valid: gapAtLeast({ facile: 3, media: 2, difficile: 1, mista: 1 }),
      why: (w, l) => (w.group === 'dist'
        ? `${w.label} è ${theOrd(w.value)} pianeta in ordine di distanza dal Sole, ${l.label} ${theOrd(l.value)}.`
        : `Per diametro ${w.label} è ${theOrd(w.value)} pianeta del Sistema solare, ${l.label} ${theOrd(l.value)}.`),
    }),
  ]);

  // ---------- 15. Corpo umano ----------
  addTo('corpo', [
    oddSets('body', [
      { id: 'ossa', text: "Trova l'intruso: quale di questi NON è un osso del corpo umano?", others: 'Gli altri sono ossa.',
        members: ['Femore', 'Tibia', 'Perone', 'Omero', 'Ulna', 'Radio', 'Clavicola', 'Scapola', 'Sterno', 'Rotula', 'Mandibola', 'Staffa', 'Coccige'],
        odds: [['Bicipite', 'è un muscolo'], ['Tricipite', 'è un muscolo'], ['Deltoide', 'è un muscolo'], ['Diaframma', 'è un muscolo'], ['Fegato', 'è un organo'], ['Milza', 'è un organo'],
          ['Pancreas', 'è un organo'], ['Aorta', "è un'arteria"], ['Trachea', "è il condotto che porta l'aria ai polmoni"], ["Tendine d'Achille", 'è un tendine']] },
      { id: 'muscoli', text: "Trova l'intruso: quale di questi NON è un muscolo?", others: 'Gli altri sono muscoli.',
        members: ['Bicipite', 'Tricipite', 'Deltoide', 'Quadricipite', 'Diaframma', 'Grande gluteo', 'Grande pettorale'],
        odds: [['Femore', 'è un osso'], ['Tibia', 'è un osso'], ['Omero', 'è un osso'], ['Clavicola', 'è un osso'], ['Fegato', 'è un organo'], ['Milza', 'è un organo'],
          ["Tendine d'Achille", 'è un tendine'], ['Menisco', 'è una cartilagine del ginocchio']] },
      { id: 'occhio', text: "Trova l'intruso: quale di queste NON è una parte dell'occhio?", others: "Le altre sono parti dell'occhio.",
        members: ['Iride', 'Pupilla', 'Cornea', 'Retina', 'Cristallino'],
        odds: [['Timpano', "fa parte dell'orecchio"], ['Coclea', "fa parte dell'orecchio"], ['Staffa', "è un ossicino dell'orecchio"], ['Alveolo', 'fa parte dei polmoni'], ['Epiglottide', 'si trova nella gola']] },
      { id: 'orecchio', text: "Trova l'intruso: quale di queste NON è una parte dell'orecchio?", others: "Le altre sono parti dell'orecchio.",
        members: ['Timpano', 'Martello', 'Incudine', 'Staffa', 'Coclea'],
        odds: [['Iride', "fa parte dell'occhio"], ['Retina', "fa parte dell'occhio"], ['Cornea', "fa parte dell'occhio"], ['Pupilla', "fa parte dell'occhio"], ['Alveolo', 'fa parte dei polmoni']] },
    ]),
  ]);

  // ---------- 16. Animali ----------
  const ANIMAL_CLASS = {
    uccelli: ['Pinguino imperatore', 'Fenicottero rosa', 'Pavone', 'Aquila reale', 'Gufo reale', 'Tucano toco', 'Ara macao', 'Struzzo', 'Pellicano comune', 'Cigno reale', 'Cicogna bianca', 'Martin pescatore'],
    rettili: ['Tartaruga verde', 'Coccodrillo del Nilo', 'Camaleonte velato'],
    pesci: ['Squalo bianco'], molluschi: ['Polpo comune'], insetti: ['Coccinella', 'Farfalla monarca'], anfibi: ['Axolotl'],
  };
  const CLASS_ONE = { mammiferi: 'mammifero', uccelli: 'uccello', rettili: 'rettile', pesci: 'pesce', molluschi: 'mollusco', insetti: 'insetto', anfibi: 'anfibio' };
  const classOf = (name) => Object.keys(ANIMAL_CLASS).find((k) => ANIMAL_CLASS[k].includes(name)) || 'mammiferi';
  // Nome breve accettato («Elefante» per «Elefante africano»), tranne dove sarebbe ambiguo.
  const ANIMAL_ALT = {
    'Orso polare': ['Orso bianco'], 'Panda rosso': ['Panda minore'], 'Martin pescatore': [], 'Ara macao': ['Ara', 'Pappagallo'],
    'Tursiope (delfino)': ['Tursiope', 'Delfino'], Megattera: ['Balena'], 'Polpo comune': ['Polpo', 'Polipo'], 'Orango del Borneo': ['Orango', 'Orangotango'],
    'Panda gigante': ['Panda'], 'Squalo bianco': ['Squalo'],
  };
  const animalAlt = (n) => ANIMAL_ALT[n] || (n.includes(' ') ? [n.split(' ')[0]] : []);
  addTo('animali', [
    typedGen('animal', animalPhotos.filter((a) => imgs()[a.wiki]), (a) => typed('Che animale è questo?', a.name, {
      key: a.name, accept: animalAlt(a.name), media: image(imgs()[a.wiki]),
    }), animalPhotos.flatMap((a) => [a.name, ...animalAlt(a.name)])),
    oddGen('class', animalPhotos.map((a) => ({ label: a.name, group: classOf(a.name), d: a.d })), {
      groupOk: (g) => ['mammiferi', 'uccelli', 'rettili'].includes(g),
      text: (g) => `Trova l'intruso: quale di questi animali NON è un ${CLASS_ONE[g]}?`,
      why: (g, odd) => `${odd.label}: ${CLASS_ONE[odd.group]}. Gli altri sono ${g}.`,
    }),
  ]);

  // ---------- 17. Sport ----------
  const lastCup = worldCups.reduce((m, w) => Math.max(m, w.y), 0);
  const nation = (n) => (n === 'Germania Ovest' ? 'Germania' : n);
  const cupWins = {};
  for (const w of worldCups) cupWins[nation(w.winner)] = (cupWins[nation(w.winner)] || 0) + 1;
  const cupNations = [...new Set(worldCups.flatMap((w) => [nation(w.winner), nation(w.host)]))].filter((n) => !n.includes(' e '));
  const OLY_ALT = {
    'Monaco di Baviera': ['Monaco', 'München'], 'Città del Messico': ['Mexico City'], 'Rio de Janeiro': ['Rio'], 'Sankt Moritz': ['St. Moritz', 'Saint Moritz'],
    'Garmisch-Partenkirchen': ['Garmisch'], "Cortina d'Ampezzo": ['Cortina'], Soči: ['Sochi'], Seul: ['Seoul'], Anversa: ['Antwerp'],
    'Milano Cortina': ['Milano', 'Cortina', "Milano e Cortina d'Ampezzo"], Pechino: ['Beijing'], 'Salt Lake City': ['Salt Lake'],
  };
  const olyCities = (winter) => [...new Set(olympics.filter((o) => o.winter === winter).map((o) => o.city))];
  const olyYears = (city, winter) => olympics.filter((o) => o.city === city && o.winter === winter).map((o) => o.y);
  addTo('sport', [
    typedGen('wc', worldCups, (w) => typed(`Chi ha vinto i Mondiali di calcio del ${w.y}?`, w.winner, {
      key: w.y, accept: w.winner === 'Germania Ovest' ? ['Germania', 'Germania Occidentale'] : [], why: `Si giocarono ${countryIn(w.host)}.`,
    }), cupNations),
    typedGen('wch', worldCups, (w) => typed(`In quale Paese si sono giocati i Mondiali di calcio del ${w.y}?`, w.host, {
      key: w.y, accept: { 'Germania Ovest': ['Germania'], 'Stati Uniti': ['USA'], 'Corea del Sud e Giappone': ['Giappone e Corea del Sud', 'Corea e Giappone'] }[w.host] || [],
    }), cupNations),
    typedGen('oly', olympics, (o) => typed(`Quale città ha ospitato le Olimpiadi ${o.winter ? 'invernali' : 'estive'} del ${o.y}?`, o.city, {
      key: `${o.y}:${o.winter}`, accept: OLY_ALT[o.city] || [],
    }), olympics.flatMap((o) => [o.city, ...(OLY_ALT[o.city] || [])])),
    oddSets('sport', [
      { id: 'wc', text: `Trova l'intruso: quale di queste nazionali NON ha mai vinto i Mondiali di calcio (fino al ${lastCup})?`,
        members: Object.keys(cupWins), others: 'Le altre hanno vinto almeno un Mondiale.',
        odds: cupNations.filter((n) => !cupWins[n]).map((n) => [n, 'nessun Mondiale vinto']) },
      { id: 'estive', text: "Trova l'intruso: quale di queste città NON ha mai ospitato le Olimpiadi estive?", others: 'Le altre hanno ospitato le Olimpiadi estive.',
        members: olyCities(false), odds: olyCities(true).filter((c) => c !== 'Milano Cortina' && !olyCities(false).includes(c)).map((c) => [c, `solo Olimpiadi invernali (${olyYears(c, true).join(', ')})`]) },
      { id: 'invernali', text: "Trova l'intruso: quale di queste città NON ha mai ospitato le Olimpiadi invernali?", others: 'Le altre hanno ospitato le Olimpiadi invernali.',
        members: olyCities(true).filter((c) => c !== 'Milano Cortina'), odds: olyCities(false).filter((c) => !olyCities(true).includes(c)).map((c) => [c, `solo Olimpiadi estive (${olyYears(c, false).join(', ')})`]) },
    ]),
    duelGen('olyfirst', [false, true].flatMap((winter) => olyCities(winter)
      .filter((c) => !['Lake Placid', 'Milano Cortina'].includes(c)) // Lake Placid ha ospitato anche i Giochi del 1932, assenti dai dati
      .map((c) => ({ label: c, value: Math.min(...olyYears(c, winter)), group: winter ? 'W' : 'S', years: olyYears(c, winter) }))), {
      text: (a) => `Tra queste due città, quale ha ospitato per prima le Olimpiadi ${a.group === 'W' ? 'invernali' : 'estive'}?`, lowerWins: true,
      valid: gapAtLeast({ facile: 40, media: 12, difficile: 4, mista: 8 }),
      why: (w, l) => `${w.label}: ${w.years.join(', ')} · ${l.label}: ${l.years.join(', ')}`,
    }),
    duelGen('wcwins', cupNations.map((n) => ({ label: n, value: cupWins[n] || 0 })), {
      text: 'Quale di queste nazionali ha vinto più Mondiali di calcio?',
      valid: (a, b) => Math.abs(a.value - b.value) >= 2, // distacco netto anche se nel frattempo si è giocato un altro Mondiale
      why: (w, l) => `Mondiali vinti fino al ${lastCup}: ${w.label} ${w.value} · ${l.label} ${l.value}`,
    }),
  ]);

  // ---------- 18. Cucina ----------
  // Piatti tipici di più regioni: mai come intruso né come risposta da scrivere.
  const SHARED_DISH = new Set(['Fonduta', 'Farinata di ceci', 'Taralli', 'Mozzarella di bufala', 'Granita', 'Vitello tonnato']);
  const WDISH_SKIP = new Set(['Hamburger', 'Tandoori chicken']); // origine contesa
  const WDISH_ALT = { 'Regno Unito': ['Inghilterra', 'Gran Bretagna'], 'Corea del Sud': ['Corea'], 'Stati Uniti': ['USA'] };
  addTo('cucina', [
    typedGen('dish', dishes.filter((d) => !SHARED_DISH.has(d.name)), (d) => typed(`Di quale regione è tipico questo piatto: ${d.name}?`, d.region, {
      key: d.name, accept: regionAccept(d.region, ''),
    }), regionRivals),
    typedGen('wdish', worldDishes.filter((d) => !WDISH_SKIP.has(d.name)), (d) => typed(`Da quale Paese viene questo piatto: ${d.name}?`, d.country, {
      key: d.name, accept: WDISH_ALT[d.country] || [],
    }), countries.map((c) => c.name)),
    oddGen('dish', dishes.map((d) => ({ label: d.name, group: d.region, d: d.d })), {
      // Strudel e canederli si mangiano anche nel Veneto di montagna.
      oddOk: (o, g) => !SHARED_DISH.has(o.label) && !(g === 'Veneto' && ['Strudel di mele', 'Canederli'].includes(o.label)),
      text: (g) => `Trova l'intruso: quale di questi piatti NON è tipico ${regOf(g)}?`,
      why: (g, odd) => `${odd.label}: ${odd.group}. Gli altri sono tipici ${regOf(g)}.`,
    }),
  ]);

  // ---------- 20. Inglese ----------
  const EN_ALT = {
    casa: ['home'], grande: ['large', 'great'], piccolo: ['little'], alto: ['high'], basso: ['low'], caldo: ['warm'], veloce: ['quick'],
    bello: ['handsome', 'pretty', 'nice'], gentile: ['nice', 'gentle'], dito: ['toe'], sasso: ['rock'], bosco: ['woods', 'forest'],
    terra: ['ground', 'land'], scala: ['staircase', 'ladder'], gomma: ['eraser'], voto: ['grade'], banco: ['bench'], compito: ['task'],
    classe: ['classroom'], piatto: ['dish'], porto: ['port'], torta: ['pie'], marciapiede: ['sidewalk'], biscotto: ['cookie'], insalata: ['lettuce'],
    gallina: ['chicken'], topo: ['rat'], tartaruga: ['tortoise'], aereo: ['airplane', 'aeroplane'], macchina: ['automobile'], negozio: ['store'],
    bicicletta: ['bike'], incrocio: ['crossroad', 'intersection'], armadio: ['closet', 'cupboard'], soggiorno: ['lounge'], frigorifero: ['refrigerator'],
    lavandino: ['washbasin'], tazza: ['mug'], pentola: ['pan', 'saucepan'], divano: ['couch'], cuscino: ['cushion'], cucina: ['cuisine'], bagno: ['bath', 'toilet'],
    pancia: ['tummy', 'stomach'], bambino: ['kid', 'baby'], vicino: ['neighbor', 'near'], cuoco: ['chef'], pompiere: ['fireman'], poliziotto: ['police officer', 'cop'],
    medico: ['physician'], avvocato: ['attorney'], grigio: ['gray'], azzurro: ['sky blue', 'azure'], viola: ['violet'], uva: ['grape'], piselli: ['pea'],
    fagioli: ['bean'], noce: ['nut'], fungo: ['mushrooms'], nebbia: ['mist'], autunno: ['fall'], città: ['town'], strada: ['road'], nave: ['boat'],
    felice: ['glad'], triste: ['unhappy'], difficile: ['hard'], ricco: ['wealthy'], coraggioso: ['courageous'], duro: ['tough'], rumoroso: ['loud'],
    silenzioso: ['silent'], economico: ['inexpensive'], zaino: ['rucksack', 'schoolbag'], lavagna: ['board', 'chalkboard'], esame: ['test'],
    studente: ['pupil'], errore: ['error'], orologio: ['watch'], giardino: ['yard'], cercare: ['to search'], guardare: ['to look at'],
    parlare: ['to talk'], cominciare: ['to start'], finire: ['to end'], comprare: ['to purchase'], chiudere: ['to shut'], piangere: ['to weep'],
  };
  const EN_SKIP = new Set(['ora', 'pesca']); // più traduzioni ugualmente giuste
  const enAlts = (p) => [...(EN_ALT[p.it] || []), p.en].flatMap((x) => (x.startsWith('to ') ? [x, x.slice(3)] : [x])).filter((x) => x !== p.en);
  const enRivals = memoBy((group) => allPairs.filter((x) => x.group === group).flatMap((x) => [x.en, ...enAlts(x)])); // stesso gruppo di parole
  const enCount = {};
  for (const p of allPairs) enCount[p.en] = (enCount[p.en] || 0) + 1;
  // Gruppi «comuni» per l'intruso e gruppi da cui può arrivare l'intruso (scelti per non avere sovrapposizioni).
  const EN_ODD = {
    animali: ['NON indica un animale', ['casa', 'colori', 'tempo', 'scuola']],
    cibo: ['NON indica un cibo o una bevanda', ['casa', 'colori', 'tempo', 'scuola']],
    colori: ['NON indica un colore', ['animali', 'casa', 'corpo', 'tempo', 'scuola', 'persone']],
    corpo: ['NON indica una parte del corpo', ['casa', 'colori', 'tempo', 'scuola', 'città']],
    persone: ['NON indica una persona', ['animali', 'casa', 'colori', 'tempo', 'città']],
    tempo: ['NON indica un momento o un periodo di tempo', ['animali', 'casa', 'corpo', 'colori', 'persone', 'città']],
    casa: ['NON indica una stanza, una parte o un oggetto della casa', ['corpo', 'colori', 'tempo']],
  };
  addTo('inglese', [
    typedGen('en', allPairs.filter((p) => !EN_SKIP.has(p.it)), (p) => typed(`Come si dice «${p.it}» in inglese?`, p.en, { key: p.it, accept: enAlts(p) }),
      (p) => enRivals(p.group)),
    oddGen('en', allPairs.filter((p) => enCount[p.en] === 1 && p.en !== 'house' && p.group !== 'verbi').map((p) => ({ label: p.en, group: p.group, it: p.it })), {
      groupOk: (g) => Boolean(EN_ODD[g]),
      oddOk: (o, g) => EN_ODD[g][1].includes(o.group),
      text: (g) => `Trova l'intruso: quale di queste parole inglesi ${EN_ODD[g][0]}?`,
      why: (g, odd, common) => `«${odd.label}» = ${odd.it}. Le altre: ${common.map((c) => `${c.label} = ${c.it}`).join(', ')}.`,
    }),
  ]);

  // ---------- 21. Proverbi ----------
  const PROV_ALT = { "d'oro": ['oro'], 'sé stesso': ['se stesso', 'sé medesimo'] };
  addTo('proverbi', [
    typedGen('prov', proverbs, (p) => typed('Completa il proverbio', p.word, {
      key: p.start, accept: PROV_ALT[p.word] || [],
      media: quote(`${p.start}${p.start.endsWith("'") ? '' : ' '}_____${p.end ? ` ${p.end}` : ''}`),
      why: `${p.start}${p.start.endsWith("'") ? '' : ' '}${p.word}${p.end ? ` ${p.end}` : ''}`,
    }), (p) => p.wrong),
  ]);

  // ---------- 22. Matematica ----------
  const SUP = { 2: '²', 3: '³', 4: '⁴', 5: '⁵', 6: '⁶', 7: '⁷', 8: '⁸', 9: '⁹', 10: '¹⁰' };
  const isPrime = (n) => { if (n < 2) return false; for (let k = 2; k * k <= n; k++) if (n % k === 0) return false; return true; };
  const gcd = (a, b) => (b ? gcd(b, a % b) : a);
  addTo('matematica', [
    {
      mode: 'scrivi', count: 5000,
      make(rng, diff) {
        const kind = rng();
        if (kind < 0.7) {
          const { text, r, key } = arithmetic(rng, diff);
          return typed(text, String(r), { key: `war:${key}`, accept: [fmtNum(r)] });
        }
        if (kind < 0.85) {
          const n = int(rng, 2, diff === 'facile' ? 10 : 20);
          return typed(`Quanto fa ${n}²?`, String(n * n), { key: `wsq:${n}`, accept: [fmtNum(n * n)] });
        }
        const n = int(rng, 1, diff === 'facile' ? 30 : diff === 'media' ? 200 : 2026);
        return typed(`Quanto vale il numero romano ${toRoman(n)}?`, String(n), { key: `wro:${n}` });
      },
    },
    {
      mode: 'intruso', count: 3000,
      make(rng, diff) {
        const max = { facile: 30, media: 60, difficile: 100 }[diff] || 60;
        const kind = pick(rng, diff === 'facile' ? ['primo', 'multiplo', 'quadrato', 'pari'] : ['primo', 'multiplo', 'quadrato']);
        const nums = Array.from({ length: max - 1 }, (_, i) => i + 2);
        let common;
        let odds;
        let text;
        let why;
        if (kind === 'primo') {
          common = nums.filter(isPrime);
          odds = nums.filter((n) => !isPrime(n) && n % 2 === 1); // dispari non primi: niente intrusi troppo facili
          text = 'Trova l\'intruso: quale di questi numeri NON è primo?';
          why = (o) => { const f = nums.find((k) => o % k === 0); return `${o} = ${f} × ${o / f}; gli altri sono numeri primi.`; };
        } else if (kind === 'multiplo') {
          const k = pick(rng, { facile: [2, 5, 10], media: [3, 4, 6, 9], difficile: [6, 7, 8, 9, 11, 12] }[diff] || [3, 4, 6, 7, 9]);
          const lim = Math.max(max, k * 10);
          common = Array.from({ length: Math.floor(lim / k) - 1 }, (_, i) => (i + 2) * k);
          odds = Array.from({ length: lim - 9 }, (_, i) => i + 10).filter((n) => n % k !== 0);
          text = `Trova l'intruso: quale di questi numeri NON è un multiplo di ${k}?`;
          why = (o) => `${o} diviso ${k} fa ${Math.floor(o / k)} con resto ${o % k}; gli altri sono multipli di ${k}.`;
        } else if (kind === 'quadrato') {
          const top = { facile: 10, media: 15, difficile: 20 }[diff] || 15;
          common = Array.from({ length: top - 1 }, (_, i) => (i + 2) ** 2);
          odds = common.flatMap((s) => [s - 2, s - 1, s + 1, s + 3]).filter((n) => n > 4 && !Number.isInteger(Math.sqrt(n)));
          text = 'Trova l\'intruso: quale di questi numeri NON è un quadrato perfetto?';
          why = (o, c) => `${o} non è il quadrato di un numero intero; ${c.map((n) => `${n} = ${Math.sqrt(n)}²`).join(', ')}.`;
        } else {
          common = Array.from({ length: 49 }, (_, i) => (i + 1) * 2);
          odds = common.map((n) => n + 1);
          text = 'Trova l\'intruso: quale di questi numeri NON è pari?';
          why = (o) => `${o} è dispari; gli altri sono pari.`;
        }
        const chosen = shuffle(rng, common).slice(0, 3);
        const odd = pick(rng, odds.filter((n) => !chosen.includes(n)));
        const answers = shuffle(rng, [...chosen, odd]).map(String);
        return {
          type: 'quiz', text, answers, correct: answers.indexOf(String(odd)),
          key: `odd:mat:${text}:${chosen.sort((a, b) => a - b).join(',')}:${odd}`, why: why(odd, chosen),
        };
      },
    },
    {
      mode: 'duello', count: 3000,
      make(rng, diff) {
        const make1 = (kind) => {
          if (kind === 'pot') {
            const b = int(rng, 2, diff === 'facile' ? 5 : 10);
            const e = int(rng, 2, diff === 'facile' ? 3 : b <= 3 ? 8 : 4);
            const v = b ** e;
            return [`${b}${SUP[e]}`, v, `${b}${SUP[e]} = ${fmtNum(v)}`];
          }
          if (kind === 'frac') {
            const q = int(rng, 2, diff === 'facile' ? 6 : 12);
            const p = int(rng, 1, q - 1);
            if (gcd(p, q) !== 1) return null;
            const v = p / q;
            const shown = Math.round(v * 1000) / 1000;
            return [`${p}/${q}`, v, `${p}/${q} ${shown === v ? '=' : '≈'} ${fmtNum(shown)}`];
          }
          if (kind === 'perc') {
            const p = pick(rng, [10, 20, 25, 30, 40, 50, 60, 75]);
            const base = pick(rng, [20, 40, 60, 80, 100, 120, 200, 300, 400, 500]);
            const v = (p * base) / 100;
            return [`${p}% di ${base}`, v, `${p}% di ${base} = ${fmtNum(v)}`];
          }
          const a = int(rng, 11, 30);
          const b = int(rng, 11, 30);
          return [`${a} × ${b}`, a * b, `${a} × ${b} = ${fmtNum(a * b)}`];
        };
        const minRel = { facile: 0.2, media: 0.05, difficile: 0.005 }[diff] ?? 0.03;
        for (let attempt = 0; attempt < 40; attempt++) {
          const kind = pick(rng, diff === 'facile' ? ['pot', 'frac', 'perc'] : ['pot', 'frac', 'perc', 'prod']);
          const A = make1(kind);
          const B = make1(kind);
          if (!A || !B || A[0] === B[0] || A[1] === B[1]) continue;
          if (Math.abs(A[1] - B[1]) / Math.max(A[1], B[1]) < minRel) continue;
          const [win, lose] = A[1] > B[1] ? [A, B] : [B, A];
          const answers = shuffle(rng, [A[0], B[0]]);
          return {
            type: 'quiz', text: 'Quale vale di più?', answers, correct: answers.indexOf(win[0]),
            key: `duel:mat:${[A[0], B[0]].sort().join('|')}`, why: `${win[2]} · ${lose[2]}`,
          };
        }
        return null;
      },
    },
  ]);

  // ---------- 23. Invenzioni e tecnologia ----------
  addTo('tecnologia', [
    eventDuel(events.filter((e) => /pila|dagherrotipo|telefono|automobile|cinematografo|volo a motore|FIAT|televisive|Sputnik|Gagarin|uomo sulla Luna|Apple|Google|Facebook|YouTube|iPhone/.test(e.e))),
  ]);

  // ---- Modalità di gioco ----
  const MODES = [
    { id: 'quiz', name: 'Quiz', emoji: '❓', description: 'Scegli la risposta giusta tra quattro', time: 20 },
    { id: 'vf', name: 'Vero o falso', emoji: '⚖️', description: 'Un\'affermazione: vero o falso?', time: 12 },
    { id: 'immagine', name: 'Indovina dall\'immagine', emoji: '🖼️', description: 'Foto, bandiere, opere d\'arte ed emoji', time: 20 },
    { id: 'citazione', name: 'Chi l\'ha detto?', emoji: '💬', description: 'Citazioni, battute, incipit e proverbi', time: 25 },
    { id: 'ordina', name: 'Metti in ordine', emoji: '🔢', description: 'Tocca le risposte nell\'ordine giusto', time: 30 },
    { id: 'numero', name: 'Indovina il numero', emoji: '🎯', description: 'Avvicinati il più possibile con il cursore', time: 25 },
    { id: 'scrivi', name: 'Scrivi la risposta', emoji: '⌨️', description: 'Digita tu la risposta: accenti e piccoli errori perdonati', time: 30 },
    { id: 'intruso', name: 'Trova l\'intruso', emoji: '🕵️', description: 'Tre hanno qualcosa in comune, uno no', time: 20 },
    { id: 'duello', name: 'Testa a testa', emoji: '⚔️', description: 'Due opzioni: chi vince il confronto?', time: 12 },
  ];
  const SPEED = { veloce: 0.7, normale: 1, rilassato: 1.5 };

  function modesOf(category) {
    return [...new Set(category.generators.map((g) => g.mode))];
  }

  // Stima onesta del numero di domande diverse: somma degli elementi di base di ogni generatore,
  // senza contare le combinazioni infinite della matematica né quelle di ordinamenti, intrusi e duelli.
  function estimateCount() {
    let total = 0;
    for (const c of C) {
      for (const g of c.generators) {
        if (c.id === 'matematica' || ['ordina', 'intruso', 'duello'].includes(g.mode)) continue;
        total += g.count || 0;
      }
    }
    return total;
  }

  // Domande bonus (punti doppi): l'ultima e circa una ogni 6, mai la prima né due di fila.
  function markBonus(questions) {
    const n = questions.length;
    questions.forEach((q, i) => {
      if (i > 0 && (i === n - 1 || ((i + 1) % 6 === 0 && i < n - 3))) q.double = true;
    });
  }
  const LEVELS = ['facile', 'media', 'difficile'];

  // Crea una partita casuale: categorie e modalità scelte, numero di domande, difficoltà e velocità.
  // difficulty 'progressiva': un terzo facile, un terzo media, un terzo difficile; bonus: punti doppi.
  function buildGame({ categories, modes, count = 10, difficulty = 'mista', speed = 'normale', seed, title, bonus = false } = {}) {
    const rng = makeRng(seed ?? Math.floor(Math.random() * 2 ** 31));
    const cats = C.filter((c) => !categories?.length || categories.includes(c.id));
    const wantModes = modes?.length ? modes : MODES.map((m) => m.id);
    const pairs = [];
    for (const c of cats) for (const g of c.generators) if (wantModes.includes(g.mode)) pairs.push({ c, g });
    if (!pairs.length) return { error: 'Nessuna domanda disponibile con queste scelte: aggiungi categorie o modalità.' };

    const usedCat = new Map();
    const usedMode = new Map();
    const keys = new Set();
    const questions = [];
    const availableModes = [...new Set(pairs.map((p) => p.g.mode))];
    const progressive = difficulty === 'progressiva';
    for (let attempt = 0; questions.length < count && attempt < count * 60; attempt++) {
      // Prima la modalità meno usata, poi la categoria meno usata: partite varie ed equilibrate.
      const minMode = Math.min(...availableModes.map((m) => usedMode.get(m) || 0));
      const mode = pick(rng, availableModes.filter((m) => (usedMode.get(m) || 0) === minMode));
      const forMode = pairs.filter((p) => p.g.mode === mode);
      const minCat = Math.min(...forMode.map((p) => usedCat.get(p.c.id) || 0));
      const { c, g } = pick(rng, forMode.filter((p) => (usedCat.get(p.c.id) || 0) === minCat));
      const level = progressive ? LEVELS[Math.min(2, Math.floor((questions.length * 3) / count))] : difficulty;
      let q;
      try {
        q = g.make(rng, level);
        // Se il livello non basta (pochi dati o domande già uscite), meglio una domanda di difficoltà mista che nessuna.
        if (progressive && (!q || keys.has(q.key)) && attempt > count * 10) q = g.make(rng, 'mista');
      } catch {
        q = null;
      }
      if (!q || !q.key || keys.has(q.key)) {
        if (attempt > count * 30) usedMode.set(mode, (usedMode.get(mode) || 0) + 1); // modalità esaurita: passiamo oltre
        continue;
      }
      keys.add(q.key);
      usedCat.set(c.id, (usedCat.get(c.id) || 0) + 1);
      usedMode.set(mode, (usedMode.get(mode) || 0) + 1);
      const base = MODES.find((m) => m.id === g.mode).time;
      const extra = q.type === 'ordina' ? (q.items.length - 4) * 5 : 0;
      questions.push({
        ...q, mode: g.mode, category: c.name, categoryEmoji: c.emoji, time: Math.round((base + extra) * (SPEED[speed] || 1)),
        ...(progressive ? { level } : {}),
      });
    }
    if (!questions.length) return { error: 'Non sono riuscito a creare domande con queste scelte.' };
    if (bonus) markBonus(questions);
    const names = cats.length === C.length ? 'Tutte le categorie' : cats.map((c) => c.name).slice(0, 3).join(', ') + (cats.length > 3 ? '…' : '');
    return { title: title || names, description: `${questions.length} domande · ${difficulty}${bonus ? ' · punti doppi' : ''}`, questions };
  }

  // Partite a tema già pronte
  const PRESETS = [
    { id: 'giro', name: 'Il giro del mondo', emoji: '✈️', categories: ['mondo', 'bandiere', 'monumenti', 'cucina'], modes: [] },
    { id: 'italia', name: 'Viaggio in Italia', emoji: '🇮🇹', categories: ['italia', 'cucina', 'storia', 'arte'], modes: [] },
    { id: 'cinema', name: 'Serata al cinema', emoji: '🍿', categories: ['cinema', 'citazioni', 'musica'], modes: [] },
    { id: 'scuola', name: 'Ritorno a scuola', emoji: '🎒', categories: ['matematica', 'lingua', 'inglese', 'storia', 'scienza'], modes: [] },
    { id: 'natura', name: 'Natura e scienza', emoji: '🌿', categories: ['animali', 'scienza', 'spazio', 'corpo', 'elementi'], modes: [] },
    { id: 'immagini', name: 'Solo immagini', emoji: '🖼️', categories: [], modes: ['immagine'] },
    { id: 'parole', name: 'Parole e citazioni', emoji: '✒️', categories: ['citazioni', 'letteratura', 'proverbi', 'lingua'], modes: [] },
    { id: 'sfida', name: 'Sfida totale', emoji: '🔥', categories: [], modes: [] },
    { id: 'scrivi', name: 'Scrivi tu!', emoji: '⌨️', categories: [], modes: ['scrivi'] },
    { id: 'sfide', name: 'Intrusi e duelli', emoji: '⚔️', categories: [], modes: ['intruso', 'duello'] },
  ];

  root.QuizBank = { categories: C, modes: MODES, presets: PRESETS, buildGame, estimateCount, modesOf, makeRng, toRoman };
  if (typeof module !== 'undefined' && module.exports) module.exports = root.QuizBank;
})(typeof window !== 'undefined' ? window : globalThis);
