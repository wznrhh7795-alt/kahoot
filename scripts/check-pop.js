#!/usr/bin/env node
// Controlla un file di categoria «pop»: formato, qualità minima, domande generate e conteggio.
// Uso: node scripts/check-pop.js public/data/pop-<id>.js [--sample N]
'use strict';
const path = require('path');

const file = process.argv[2];
const sampleN = Number((process.argv.find((a) => a.startsWith('--sample=')) || '').split('=')[1] || 0);
if (!file) {
  console.error('Uso: node scripts/check-pop.js public/data/pop-<id>.js [--sample=N]');
  process.exit(2);
}
const root = path.join(__dirname, '..');
global.window = globalThis;
for (const f of ['geo', 'scienza', 'storia', 'cultura', 'lingua', 'varie', 'images']) require(path.join(root, 'public/data', `${f}.js`));
const before = (globalThis.QZ_DATA.pop || []).length;
require(path.resolve(file));
const added = (globalThis.QZ_DATA.pop || []).slice(before);
const Game = require(path.join(root, 'public/js/game.js'));
const Bank = require(path.join(root, 'public/js/bank.js'));

const errors = [];
const warn = [];
const err = (m) => errors.push(m);
const isStr = (s) => typeof s === 'string' && s.trim().length > 0;
const D_OK = (d) => [1, 2, 3].includes(d);

if (!added.length) err('Il file non aggiunge nessuna categoria a QZ_DATA.pop');
for (const f of added) {
  const where = (s) => `[${f.id}] ${s}`;
  for (const k of ['id', 'name', 'emoji', 'color', 'description']) if (!isStr(f[k])) err(where(`manca «${k}»`));
  if (!/^[a-z0-9]+$/.test(f.id || '')) err(where('id: solo minuscole e cifre'));
  if (Bank.categories.filter((c) => c.id === f.id).length !== 1) err(where('id già usato da un\'altra categoria'));
  const seenQ = new Set();
  const dupQ = (q) => {
    const k = String(q).toLowerCase().trim();
    if (seenQ.has(k)) err(where(`domanda ripetuta: ${q}`));
    seenQ.add(k);
  };
  (f.quiz || []).forEach((x, i) => {
    const w = (m) => err(where(`quiz[${i}] ${m}: ${x.q}`));
    if (!isStr(x.q) || !isStr(x.a)) return w('q/a mancanti');
    dupQ(x.q);
    if (x.q.length > 160) w('domanda troppo lunga');
    if (!Array.isArray(x.wrong) || x.wrong.length !== 3 || !x.wrong.every(isStr)) return w('servono 3 risposte sbagliate');
    const all = [x.a, ...x.wrong].map((s) => s.toLowerCase().trim());
    if (new Set(all).size !== 4) w('risposte ripetute');
    if ([x.a, ...x.wrong].some((s) => s.length > 75)) w('risposta troppo lunga (max 75)');
    if (!D_OK(x.d)) w('d deve essere 1, 2 o 3');
  });
  (f.tf || []).forEach((x, i) => {
    if (!isStr(x.q) || typeof x.a !== 'boolean') return err(where(`tf[${i}] q o a (true/false) mancanti`));
    dupQ(x.q);
    if (!D_OK(x.d)) err(where(`tf[${i}] d non valido`));
  });
  for (const t of f.tables || []) {
    const items = t.items || [];
    if (!isStr(t.id)) err(where('tabella senza id'));
    const names = new Set();
    items.forEach((it, i) => {
      if (!isStr(it.name)) return err(where(`${t.id}.items[${i}] senza name`));
      if (names.has(it.name)) err(where(`${t.id}: nome ripetuto «${it.name}»`));
      names.add(it.name);
      if (!D_OK(it.d)) err(where(`${t.id}: «${it.name}» d non valido`));
    });
    for (const [field, cfg] of Object.entries(t.fields || {})) {
      const vals = items.filter((it) => it[field] !== undefined).map((it) => it[field]);
      if (vals.some((v) => !isStr(v))) err(where(`${t.id}.${field}: valori non testuali`));
      const distinct = new Set(vals);
      if (cfg.ask && distinct.size < 4) warn.push(where(`${t.id}.${field}: meno di 4 valori diversi, «ask» ignorato`));
      for (const key of ['ask', 'who', 'tf', 'odd']) {
        if (cfg[key] && typeof cfg[key] !== 'string') err(where(`${t.id}.${field}.${key} deve essere un testo`));
      }
      if (cfg.who && !cfg.who.includes('{value}')) err(where(`${t.id}.${field}.who deve contenere {value}`));
      if (cfg.tf && !(cfg.tf.includes('{name}') && cfg.tf.includes('{value}'))) err(where(`${t.id}.${field}.tf deve contenere {name} e {value}`));
      const lower = new Map();
      for (const v of distinct) {
        const k = String(v).toLowerCase().trim();
        if (lower.has(k) && lower.get(k) !== v) err(where(`${t.id}.${field}: «${v}» e «${lower.get(k)}» differiscono solo per maiuscole/spazi`));
        lower.set(k, v);
      }
    }
    for (const [field, cfg] of Object.entries(t.numeric || {})) {
      const vals = items.filter((it) => it[field] !== undefined).map((it) => it[field]);
      if (vals.some((v) => !Number.isFinite(v))) err(where(`${t.id}.${field}: valori non numerici`));
      if (cfg.ask && !(cfg.span > 0)) err(where(`${t.id}.${field}: «span» mancante`));
    }
  }
  (f.quotes || []).forEach((x, i) => {
    if (!isStr(x.text) || !isStr(x.who) || !D_OK(x.d)) err(where(`quotes[${i}] incompleta`));
    else if (x.text.length > 140) err(where(`quotes[${i}] troppo lunga`));
  });
  (f.emojis || []).forEach((x, i) => {
    if (!isStr(x.emoji) || !isStr(x.answer) || !D_OK(x.d)) err(where(`emojis[${i}] incompleta`));
  });
  (f.order || []).forEach((x, i) => {
    if (!isStr(x.q) || !Array.isArray(x.items) || x.items.length < 3 || x.items.length > 6 || new Set(x.items).size !== x.items.length) {
      err(where(`order[${i}] deve avere 3-6 elementi diversi: ${x.q}`));
    }
  });
  (f.numbers || []).forEach((x, i) => {
    const ok = isStr(x.q) && [x.v, x.min, x.max].every(Number.isFinite) && x.min < x.max && x.v >= x.min && x.v <= x.max;
    if (!ok) err(where(`numbers[${i}] non valida (v tra min e max): ${x.q}`));
  });
  (f.songs || []).forEach((x, i) => {
    if (!isStr(x.title) || !isStr(x.artist) || !isStr(x.genre) || !D_OK(x.d)) err(where(`songs[${i}] incompleta: ${x.title}`));
    if (!/^https:\/\//.test(x.src || '')) err(where(`songs[${i}] senza anteprima https: ${x.title}`));
    if (x.year !== undefined && x.year !== null && !Number.isFinite(x.year)) err(where(`songs[${i}] anno non valido: ${x.title}`));
  });
  (f.clues || []).forEach((x, i) => {
    if (!isStr(x.q) || !isStr(x.a) || !D_OK(x.d)) err(where(`clues[${i}] incompleto`));
    else if (!(f.songs || []).some((s) => s.title === x.a)) warn.push(where(`clues[${i}]: «${x.a}» non è tra le canzoni`));
  });
  (f.typed || []).forEach((x, i) => {
    if (!isStr(x.q) || !isStr(x.a) || x.a.length > 40 || !D_OK(x.d)) err(where(`typed[${i}] non valida (a ≤ 40 caratteri): ${x.q}`));
  });

  // Generazione: ogni gioco della categoria, tanti semi, ogni difficoltà.
  const category = Bank.categories.find((c) => c.id === f.id);
  if (!category) continue;
  const modes = Bank.modesOf(category);
  const perMode = {};
  for (const g of category.generators) perMode[g.mode] = (perMode[g.mode] || 0) + (g.count || 0);
  const COMBO = new Set(['ordina', 'intruso', 'duello']);
  const counted = category.generators.filter((g) => !COMBO.has(g.mode)).reduce((n, g) => n + (g.count || 0), 0);
  const samples = {};
  for (const mode of modes) {
    let made = 0;
    const keys = new Set();
    for (let seed = 1; seed <= 40; seed++) {
      for (const difficulty of ['facile', 'media', 'difficile', 'mista']) {
        const game = Bank.buildGame({ categories: [f.id], modes: [mode], count: 12, difficulty, seed: seed * 7 + difficulty.length });
        if (game.error) { err(where(`${mode}: ${game.error}`)); continue; }
        const e = Game.validateQuiz(game);
        if (e) err(where(`${mode}: domanda non valida → ${e}`));
        for (const q of game.questions) {
          made++;
          keys.add(q.key);
          if (q.text.length > 170) err(where(`${mode}: testo troppo lungo → ${q.text}`));
          if (q.answers && q.answers.some((a) => a.length > 80)) err(where(`${mode}: risposta troppo lunga → ${q.answers.join(' / ')}`));
          (samples[mode] = samples[mode] || []).length < sampleN && samples[mode].push(q);
        }
      }
    }
    if (!made) err(where(`${mode}: nessuna domanda generata`));
  }
  console.log(`\n${f.emoji} ${f.name} (${f.id})`);
  console.log(`  giochi: ${modes.join(', ')}`);
  console.log(`  domande per gioco: ${Object.entries(perMode).map(([m, n]) => `${m} ${n}`).join(' · ')}`);
  console.log(`  DOMANDE CONTATE: ${counted}`);
  for (const [mode, list] of Object.entries(samples).filter(([, l]) => l.length)) {
    console.log(`  --- esempi ${mode}`);
    for (const q of list) {
      const sol = q.type === 'scrivi' ? q.answer : q.type === 'numero' ? q.answer : q.type === 'ordina' ? q.correct.map((i) => q.items[i]).join(' → ') : q.answers[q.correct];
      const media = q.media ? ` [${q.media.value || q.media.text || ''}]` : '';
      console.log(`  · ${q.text}${media} => ${sol}${q.type === 'quiz' ? `   (${q.answers.join(' / ')})` : ''}`);
    }
  }
}
for (const w of warn) console.log(`  attenzione: ${w}`);
if (errors.length) {
  console.log(`\n${errors.length} ERRORI:`);
  for (const e of errors.slice(0, 80)) console.log(`  ✗ ${e}`);
  process.exit(1);
}
console.log('\nOK: nessun errore.');
