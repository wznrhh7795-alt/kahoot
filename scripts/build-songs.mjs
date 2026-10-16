// Genera public/data/pop-canzoni.js («Indovina la canzone») da scripts/songs.txt e scripts/canzoni-extra.js.
// Per ogni brano cerca sulla iTunes Search API l'anteprima ufficiale (30 s, ospitata da Apple) e ne salva
// solo il collegamento: nessun file audio entra nel progetto. I risultati restano in scripts/songs-cache.json,
// così le esecuzioni successive interrogano solo i brani nuovi.
// Uso: NODE_USE_ENV_PROXY=1 node scripts/build-songs.mjs [--retry]  (--retry riprova i brani non trovati)
import fs from 'node:fs';
import path from 'node:path';
import { createRequire } from 'node:module';
import { fileURLToPath } from 'node:url';

const require = createRequire(import.meta.url);
const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..');
const cacheFile = path.join(root, 'scripts/songs-cache.json');
const outFile = path.join(root, 'public/data/pop-canzoni.js');
const cache = fs.existsSync(cacheFile) ? JSON.parse(fs.readFileSync(cacheFile, 'utf8')) : {};
const retry = process.argv.includes('--retry');
const sleep = (ms) => new Promise((r) => setTimeout(r, ms));

const rows = fs.readFileSync(path.join(root, 'scripts/songs.txt'), 'utf8').split('\n')
  .filter((l) => l.trim() && !l.startsWith('#'))
  .map((l) => {
    const [artist, title, year, genre, d, query] = l.split('|').map((s) => s.trim());
    return { artist, title, year: Number(year) || null, genre, d: Number(d) || 2, query };
  });

const norm = (s) => String(s).normalize('NFD').replace(/[̀-ͯ]/g, '').toLowerCase()
  .replace(/\s+-\s+.*$/, '').replace(/[([].*?[)\]]/g, ' ').replace(/&/g, ' and ').replace(/[^a-z0-9]+/g, ' ').trim();
// Interpreti: «Ricchi & Poveri» = «Ricchi e Poveri», «Simon and Garfunkel» = «Simon & Garfunkel».
const artistNorm = (a) => norm(a).replace(/\b(and|e)\b/g, ' ').replace(/\s+/g, ' ').trim();
const mainArtist = (a) => artistNorm(a.split(/\s+(?:&|feat\.?|ft\.?|x)\s+/i)[0]);
const BAD = /karaoke|カラオケ|\bdemo\b|\brmx\b|\bmix\b|english version|tribute|cover|in the style|made famous|instrumental|lullaby|8.bit|piano version|\blive\b|acoustic|remix|re-recorded|taylor's version|sped up|slowed/i;

async function search(term, country) {
  const url = `https://itunes.apple.com/search?${new URLSearchParams({ term, entity: 'song', limit: '25', country })}`;
  for (let attempt = 0; attempt < 6; attempt++) {
    await sleep(3200); // circa 20 richieste al minuto, il limite indicato da Apple
    try {
      const res = await fetch(url);
      if (res.ok) return (await res.json()).results || [];
      if (res.status !== 403 && res.status !== 429 && res.status < 500) return [];
    } catch { /* rete: riprova */ }
    await sleep(15000 * (attempt + 1));
  }
  throw new Error(`Troppi tentativi: ${term}`);
}

function best(results, row) {
  const want = norm(row.title);
  const artist = mainArtist(row.artist);
  const ok = results.filter((r) => r.previewUrl && r.kind === 'song'
    && artistNorm(r.artistName) && (artistNorm(r.artistName).includes(artist) || artist.includes(artistNorm(r.artistName)))
    && !(BAD.test(`${r.trackName} ${r.collectionName}`) && !BAD.test(row.title))
    && (row.query || norm(r.trackName) === want || norm(r.trackName).startsWith(`${want} `)));
  const year = (r) => Number(String(r.releaseDate).slice(0, 4)) || 9999;
  // Prima le versioni in cui il nostro interprete è il primo nome (non un duetto o una versione straniera).
  const score = (r) => (norm(r.trackName) === want ? 0 : 5) + (artistNorm(r.artistName).startsWith(artist) ? 0 : 8) + (row.year ? Math.min(30, Math.abs(year(r) - row.year)) : 0)
    + (/greatest|best of|hits|collection|anthology|essential|gold/i.test(r.collectionName) ? 3 : 0);
  return ok.sort((a, b) => score(a) - score(b))[0] || null;
}

const key = (r) => `${r.artist}|${r.title}`;
let asked = 0;
for (const row of rows) {
  const k = key(row);
  if (cache[k] && (cache[k].preview || !retry)) continue;
  const term = row.query || `${mainArtist(row.artist)} ${norm(row.title)}`;
  let hit = best(await search(term, 'it'), row);
  if (!hit) hit = best(await search(term, 'us'), row);
  asked++;
  cache[k] = hit
    ? {
      preview: hit.previewUrl,
      link: String(hit.trackViewUrl || '').replace(/[?&]uo=\d+/, ''),
      art: String(hit.artworkUrl100 || '').replace(/100x100bb/, '300x300bb'),
      found: `${hit.artistName} — ${hit.trackName} (${String(hit.releaseDate).slice(0, 4)}, ${hit.collectionName})`,
    }
    : { preview: null };
  console.log(`${hit ? '✓' : '✗'} ${k}${hit ? `  →  ${cache[k].found}` : ''}`);
  if (asked % 10 === 0) fs.writeFileSync(cacheFile, `${JSON.stringify(cache, null, 1)}\n`);
}
fs.writeFileSync(cacheFile, `${JSON.stringify(cache, null, 1)}\n`);

// ---- File di dati ----
// Titolo mostrato senza «(feat. …)» né «(… Remix)»: gli ospiti finiscono in «feat» (mai risposte sbagliate).
for (const r of rows) {
  const m = r.title.match(/^(.*?)\s*\((?:feat\.|with)\s+([^)]*)\)\s*$/i);
  r.feat = m ? m[2] : '';
  r.show = (m ? m[1] : r.title).replace(/\s*\([^)]*remix\)\s*$/i, '');
}
const songs = rows.filter((r) => cache[key(r)]?.preview).map((r) => {
  const c = cache[key(r)];
  return { title: r.show, artist: r.artist, ...(r.feat ? { feat: r.feat } : {}), year: r.year, genre: r.genre, d: r.d, src: c.preview, link: c.link, art: c.art };
});
// Nelle domande di testo («Chi canta…?») niente duetti con un interprete che compare anche da solo.
const soloArtists = new Set(rows.map((r) => norm(r.artist)));
const shared = (r) => r.feat || r.artist.split(/\s+&\s+/).some((p) => p !== r.artist && soloArtists.has(norm(p)))
  || rows.some((o) => o.artist !== r.artist && o.artist.includes(' & ') && o.artist.split(/\s+&\s+/).includes(r.artist));
const extraTitles = new Set(rows.map((r) => r.show));
const extraCheck = (list, field) => (list || []).filter((x) => !extraTitles.has(x[field])).map((x) => x[field]);
const extraFile = path.join(root, 'scripts/canzoni-extra.js');
const extra = fs.existsSync(extraFile) ? require(extraFile) : {};
// Tabella dei brani (anche quelli senza anteprima): domande di testo su interpreti e anni.
const seen = new Set();
const items = rows.filter((r) => !shared(r) && !seen.has(norm(r.show)) && seen.add(norm(r.show)))
  .map((r) => ({ name: r.show, d: r.d, artista: r.artist, ...(r.year ? { anno: r.year } : {}) }));
const unknown = [...extraCheck(extra.clues, 'a'), ...extraCheck(extra.emojis, 'answer')];
if (unknown.length) console.log(`ATTENZIONE: titoli di canzoni-extra.js non presenti in songs.txt: ${unknown.join(' · ')}`);
const category = {
  id: 'canzoni',
  name: 'Indovina la canzone',
  emoji: '🎧',
  color: '#831843',
  description: 'Ascolta pochi secondi del brano originale, riconosci testi, titoli e interpreti',
  songs,
  tables: [{
    id: 'brani',
    items,
    fields: {
      artista: {
        ask: 'Chi canta «{name}»?',
        who: 'Quale di queste canzoni è di {value}?',
        tf: 'Il brano «{name}» è interpretato da {value}.',
        odd: 'Trova l\'intruso: quale canzone NON è di {value}?',
        typed: 'person',
      },
    },
    numeric: {
      anno: {
        ask: 'In che anno è uscita «{name}» di {artista}?',
        span: 30, tol: 2, format: 'year', gap: 3,
        label: '{name} ({artista})',
        duel: 'Quale canzone è uscita prima?', lowerWins: true,
        order: 'Metti in ordine di uscita, dalla più vecchia',
      },
    },
  }],
  ...extra,
};
const body = JSON.stringify(category, null, 1).replace(/\n\s*/g, ' ').replace(/ \{ "name"/g, '\n  { "name"').replace(/ \{ "title"/g, '\n  { "title"');
fs.writeFileSync(outFile, `// Categoria «Indovina la canzone» per Quizzone! — FILE GENERATO da scripts/build-songs.mjs: modifica
// scripts/songs.txt o scripts/canzoni-extra.js e rigeneralo. «src» è l'anteprima ufficiale di Apple Music
// (iTunes Search API), riprodotta in streaming e mai copiata; «link» porta al brano su Apple Music.
// Nessun testo di canzoni protette: i versi citati sono di brani in pubblico dominio.
(function (root) {
  'use strict';
  const D = (root.QZ_DATA = root.QZ_DATA || {});
  (D.pop = D.pop || []).push(${body});
})(typeof window !== 'undefined' ? window : globalThis);
`);
const missing = rows.filter((r) => !cache[key(r)]?.preview).map(key);
console.log(`\n${songs.length}/${rows.length} brani con anteprima. ${missing.length ? `Senza: ${missing.join(' · ')}` : ''}`);
