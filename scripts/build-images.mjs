// Genera public/data/images.js: per ogni opera, monumento e animale dei dati cerca su it.wikipedia
// l'immagine principale della voce, poi su Wikimedia Commons licenza e autore.
// Tiene solo immagini con licenza libera (pubblico dominio, CC0, CC BY, CC BY-SA) e verifica che
// la miniatura si carichi davvero. Uso: NODE_USE_ENV_PROXY=1 node scripts/build-images.mjs
import fs from 'node:fs';
import path from 'node:path';
import { createRequire } from 'node:module';

const require = createRequire(import.meta.url);
const root = path.resolve(path.dirname(new URL(import.meta.url).pathname), '..');
for (const f of ['cultura', 'varie']) require(path.join(root, 'public/data', `${f}.js`));
const D = globalThis.QZ_DATA;
// Immagini già verificate in una esecuzione precedente: non le richiediamo di nuovo.
const outFile = path.join(root, 'public/data/images.js');
if (fs.existsSync(outFile)) require(outFile);
const previous = D.images || {};

const UA = 'QuizzoneBuild/1.0 (https://github.com/wznrhh7795-alt/kahoot; build script)';
const WIDTH = 500;
const ALLOWED = /^(public domain|pd|cc0|cc by(-sa)? \d|cc-by(-sa)?-\d)/i;

const sleep = (ms) => new Promise((r) => setTimeout(r, ms));

// Richiesta con attese tra una chiamata e l'altra e ripetizioni su 429 (limite di frequenza).
async function getWithRetry(url, accept) {
  for (let attempt = 0; attempt < 8; attempt++) {
    const res = await fetch(url, { headers: { 'User-Agent': UA } });
    if (res.status !== 429 && res.status < 500) return res;
    const wait = Number(res.headers.get('retry-after')) * 1000 || 5000 * (attempt + 1);
    await sleep(Math.min(wait, 60000));
  }
  throw new Error(`Troppi tentativi: ${url}`);
}

async function api(host, params) {
  const url = `https://${host}/w/api.php?` + new URLSearchParams({ format: 'json', formatversion: '2', ...params });
  await sleep(1500);
  const res = await getWithRetry(url);
  if (!res.ok) throw new Error(`API ${host}: ${res.status}`);
  return res.json();
}

const chunks = (arr, n) => Array.from({ length: Math.ceil(arr.length / n) }, (_, i) => arr.slice(i * n, i * n + n));
const strip = (html = '') => html.replace(/<[^>]+>/g, '').replace(/\s+/g, ' ').trim();

async function resolvePages(titles) {
  const out = new Map(); // titolo richiesto -> nome file
  for (const batch of chunks(titles, 40)) {
    const data = await api('it.wikipedia.org', {
      action: 'query', titles: batch.join('|'), redirects: '1', prop: 'pageimages|pageprops', piprop: 'name', ppprop: 'disambiguation',
    });
    const alias = new Map();
    for (const n of data.query.normalized || []) alias.set(n.to, n.from);
    for (const r of data.query.redirects || []) alias.set(r.to, alias.get(r.from) || r.from);
    for (const page of data.query.pages) {
      if (page.missing || page.pageprops?.disambiguation !== undefined || !page.pageimage) continue;
      out.set(alias.get(page.title) || page.title, page.pageimage);
    }
  }
  return out;
}

async function fileInfo(files) {
  const out = new Map();
  for (const batch of chunks(files, 40)) {
    const data = await api('commons.wikimedia.org', {
      action: 'query', titles: batch.map((f) => `File:${f}`).join('|'), prop: 'imageinfo',
      iiprop: 'url|extmetadata', iiurlwidth: String(WIDTH),
    });
    const alias = new Map((data.query.normalized || []).map((n) => [n.to, n.from]));
    for (const page of data.query.pages) {
      const info = page.imageinfo?.[0];
      if (!info) continue; // non presente su Commons (es. file locali non liberi)
      const meta = info.extmetadata || {};
      const license = strip(meta.LicenseShortName?.value);
      if (!ALLOWED.test(license)) continue;
      const name = (alias.get(page.title) || page.title).replace(/^File:/, '');
      out.set(name, {
        src: info.thumburl.split('?')[0],
        license,
        author: strip(meta.Artist?.value).slice(0, 80) || 'Autore sconosciuto',
        page: info.descriptionurl,
      });
    }
  }
  return out;
}

async function loads(url) {
  try {
    await sleep(400);
    const res = await getWithRetry(url);
    return res.ok && (res.headers.get('content-type') || '').startsWith('image/');
  } catch {
    return false;
  }
}

const wanted = [...new Set([...D.paintings, ...D.landmarks, ...D.animalPhotos].map((x) => x.wiki))];
const missing = wanted.filter((t) => !previous[t]);
console.log(`Voci: ${wanted.length}, da cercare: ${missing.length}`);
const pages = await resolvePages(missing);
const infos = await fileInfo([...new Set(pages.values())].map((f) => f.replace(/_/g, ' ')));

const images = {};
const skipped = [];
for (const title of wanted) {
  if (previous[title]) {
    images[title] = { ...previous[title], src: previous[title].src.split('?')[0] };
    continue;
  }
  const file = pages.get(title)?.replace(/_/g, ' ');
  const info = file && infos.get(file);
  if (!info) {
    skipped.push(`${title} (${file ? 'licenza non libera o file non su Commons' : 'voce o immagine non trovata'})`);
    continue;
  }
  if (!(await loads(info.src))) {
    skipped.push(`${title} (miniatura non caricabile)`);
    continue;
  }
  images[title] = info;
}

const header = '// File generato da scripts/build-images.mjs: immagini da Wikimedia Commons con licenza e autore.\n';
const body = `(function (root) {\n  const D = (root.QZ_DATA = root.QZ_DATA || {});\n  D.images = ${JSON.stringify(images, null, 1)};\n})(typeof window !== 'undefined' ? window : globalThis);\n`;
fs.writeFileSync(outFile, header + body);
console.log(`Immagini valide: ${Object.keys(images).length}/${wanted.length}`);
if (skipped.length) console.log('Scartate:\n  ' + skipped.join('\n  '));
