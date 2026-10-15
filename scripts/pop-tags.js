#!/usr/bin/env node
// Aggiorna in host.html e solo.html i <script> delle categorie «pop» (public/data/pop-*.js), prima di bank.js.
'use strict';
const fs = require('fs');
const path = require('path');
const pub = path.join(__dirname, '..', 'public');
const vm = require('vm');
const parses = (f) => {
  try {
    new vm.Script(fs.readFileSync(path.join(pub, 'data', f), 'utf8'), { filename: f });
    return true;
  } catch (e) {
    console.warn(`saltato ${f}: ${e.message}`);
    return false;
  }
};
// Solo i file sintatticamente validi (uno scritto a metà non deve rompere le pagine).
const files = fs.readdirSync(path.join(pub, 'data')).filter((f) => /^pop-[a-z0-9]+\.js$/.test(f)).sort().filter(parses);
for (const page of ['host.html', 'solo.html']) {
  const file = path.join(pub, page);
  let html = fs.readFileSync(file, 'utf8').replace(/  <script src="\/data\/pop-[a-z0-9]+\.js"><\/script>\n/g, '');
  const tags = files.map((f) => `  <script src="/data/${f}"></script>\n`).join('');
  html = html.replace('  <script src="/js/bank.js"></script>\n', `${tags}  <script src="/js/bank.js"></script>\n`);
  fs.writeFileSync(file, html);
  console.log(`${page}: ${files.length} categorie pop`);
}
