// Banca delle domande: trasforma i dati (public/data/*.js) in domande pronte per la partita.
// Ogni categoria ha dei generatori, uno per modalità di gioco:
//   quiz       scelta multipla
//   vf         vero o falso
//   immagine   indovina dall'immagine (foto, bandiere, emoji)
//   citazione  chi l'ha detto? / completa la citazione
//   ordina     metti in ordine
//   numero     indovina il numero (cursore)
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
          why: truth ? undefined : `${template(getA(it), getB(it)).replace(/\?$/, '')}.`.replace(/^È vero che /, ''),
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
        return choice(rng, `Qual è la capitale di ${c.name}?`, c.capital, wrong, { key: `cap:${c.iso}` });
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
    pairTF('captf', countries.filter(capitalOk), (c) => c.name, (c) => c.capital, (a, b) => `La capitale di ${a} è ${b}.`),
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
        return choice(rng, `Chi ha composto l'opera «${o.title}»?`, o.composer, composers, { key: `opera:${o.title}` });
      },
    },
    {
      mode: 'quiz', count: classical.length,
      make(rng, diff) {
        const o = pick(rng, byDiff(classical, diff));
        return choice(rng, `Chi ha composto «${o.title}»?`, o.composer, composers, { key: `class:${o.title}` });
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
        return choice(rng, `Qual è il simbolo chimico di ${e.name.toLowerCase()}?`, e.sym, elements.map((x) => x.sym), { key: `esym:${e.sym}` });
      },
    },
    {
      mode: 'quiz', count: elements.length,
      make(rng, diff) {
        const e = pick(rng, byDiff(elements, diff));
        return choice(rng, `Quale elemento ha simbolo «${e.sym}»?`, e.name, elements.map((x) => x.name), { key: `ename:${e.sym}` });
      },
    },
    pairTF('eltf', elements, (e) => `Il simbolo chimico di ${e.name.toLowerCase()}`, (e) => e.sym, (a, b) => `${a} è «${b}».`),
    {
      mode: 'numero', count: elements.length,
      make(rng, diff) {
        const e = pick(rng, byDiff(elements, diff));
        const { min, max } = range(rng, e.z, 40, { floor: 1, ceil: 118 });
        return numeric(rng, `Qual è il numero atomico di ${e.name.toLowerCase()} (${e.sym})?`, e.z, { min, max, tol: e.z <= 20 ? 0 : 2, key: `ez:${e.sym}` });
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

  // ---- Modalità di gioco ----
  const MODES = [
    { id: 'quiz', name: 'Quiz', emoji: '❓', description: 'Scegli la risposta giusta tra quattro', time: 20 },
    { id: 'vf', name: 'Vero o falso', emoji: '⚖️', description: 'Un\'affermazione: vero o falso?', time: 12 },
    { id: 'immagine', name: 'Indovina dall\'immagine', emoji: '🖼️', description: 'Foto, bandiere, opere d\'arte ed emoji', time: 20 },
    { id: 'citazione', name: 'Chi l\'ha detto?', emoji: '💬', description: 'Citazioni, battute, incipit e proverbi', time: 25 },
    { id: 'ordina', name: 'Metti in ordine', emoji: '🔢', description: 'Tocca le risposte nell\'ordine giusto', time: 30 },
    { id: 'numero', name: 'Indovina il numero', emoji: '🎯', description: 'Avvicinati il più possibile con il cursore', time: 25 },
  ];
  const SPEED = { veloce: 0.7, normale: 1, rilassato: 1.5 };

  function modesOf(category) {
    return [...new Set(category.generators.map((g) => g.mode))];
  }

  // Stima onesta del numero di domande diverse: somma degli elementi di base di ogni generatore,
  // senza contare le combinazioni infinite della matematica né quelle degli ordinamenti.
  function estimateCount() {
    let total = 0;
    for (const c of C) {
      for (const g of c.generators) {
        if (c.id === 'matematica' || g.mode === 'ordina') continue;
        total += g.count || 0;
      }
    }
    return total;
  }

  // Crea una partita casuale: categorie e modalità scelte, numero di domande, difficoltà e velocità.
  function buildGame({ categories, modes, count = 10, difficulty = 'mista', speed = 'normale', seed, title } = {}) {
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
    for (let attempt = 0; questions.length < count && attempt < count * 60; attempt++) {
      // Prima la modalità meno usata, poi la categoria meno usata: partite varie ed equilibrate.
      const minMode = Math.min(...availableModes.map((m) => usedMode.get(m) || 0));
      const mode = pick(rng, availableModes.filter((m) => (usedMode.get(m) || 0) === minMode));
      const forMode = pairs.filter((p) => p.g.mode === mode);
      const minCat = Math.min(...forMode.map((p) => usedCat.get(p.c.id) || 0));
      const { c, g } = pick(rng, forMode.filter((p) => (usedCat.get(p.c.id) || 0) === minCat));
      let q;
      try {
        q = g.make(rng, difficulty);
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
      questions.push({ ...q, mode: g.mode, category: c.name, categoryEmoji: c.emoji, time: Math.round((base + extra) * (SPEED[speed] || 1)) });
    }
    if (!questions.length) return { error: 'Non sono riuscito a creare domande con queste scelte.' };
    const names = cats.length === C.length ? 'Tutte le categorie' : cats.map((c) => c.name).slice(0, 3).join(', ') + (cats.length > 3 ? '…' : '');
    return { title: title || names, description: `${questions.length} domande · ${difficulty}`, questions };
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
  ];

  root.QuizBank = { categories: C, modes: MODES, presets: PRESETS, buildGame, estimateCount, modesOf, makeRng, toRoman };
  if (typeof module !== 'undefined' && module.exports) module.exports = root.QuizBank;
})(typeof window !== 'undefined' ? window : globalThis);
