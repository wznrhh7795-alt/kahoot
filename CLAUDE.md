# Quizzone! — guida rapida per Claude

Gioco a quiz multigiocatore in italiano (clone di Kahoot), sito statico su Netlify:
https://quizzone-it.netlify.app · cartella pubblicata: `public/`.

## Comandi
- `npm test` — test unitari (node:test, ~0,3 s). Lancialo dopo ogni modifica a `game.js` o `bank.js`.
- `PORT=3123 node server.js` — server locale (express statico, `/host` → `host.html`).
- Deploy: Netlify MCP `deploy-site` (site id `e34a1d6a-ed0e-46eb-8c60-05ac64293ba3`), poi esegui il comando `npx @netlify/mcp …` che restituisce, dalla radice del repo.

## Mappa (leggi solo ciò che serve)
- `public/js/game.js` — motore puro e testabile (punteggi, tipi di domanda, `publicQuestion` senza soluzioni).
- `public/js/bank.js` — categorie, generatori di domande, `MODES`, `PRESETS`, `buildGame`.
- `public/js/ui.js` — render condivisi (media, input risposte, timer, suoni, coriandoli).
- `public/js/host.js` + `host.html` — schermo dell'host (la partita gira qui).
- `public/js/player.js` + `index.html` — telefono del giocatore.
- `public/js/net.js` — messaggi via relay Nostr (eventi kind 25050, tag `quizzone-it-v1-<pin>-h|p`).
- `public/css/style.css` — tutto lo stile; temi via variabili CSS.

## Risparmio di token
- NON leggere per intero `public/data/*.js` (dati, 20–70 KB l'uno), `public/vendor/*` (minificato) né `public/flags/*`: usa `grep` o un `node -e` che stampi solo forme e conteggi.
- Per capire un file grande usa prima `grep -n "function \|^  [a-z]*(" file`, poi leggi solo le righe che servono.
- Per modifiche ripetitive preferisci uno script `python3`/`node` mirato a molte `Edit` separate.
- Output dei test: `npm test 2>&1 | grep -E "^# (pass|fail)|not ok"`.
- Skill in `.claude/skills/` (elenco e licenze in `.claude/skills/README.md`): `caveman` per risposte brevi, `context-optimization` e `context-compression` per sessioni lunghe, `cavecrew` per delegare ricerche e revisioni a sotto-agenti economici.

## Regole
- Testi del gioco in italiano. Niente dipendenze di runtime: tutto è JS vanilla caricato con `<script>`.
- Le soluzioni non devono mai arrivare ai telefoni prima della fine della domanda (`publicQuestion`, `publicMedia`).
- Immagini solo da Wikimedia Commons con licenza libera, con autore e licenza mostrati nei risultati.
