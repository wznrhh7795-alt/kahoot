# Skill installate

Skill di terze parti scaricate da GitHub, lette integralmente e controllate prima dell'installazione
(nessuna istruzione nascosta, nessun invio di dati, nessun comando distruttivo). Restano disponibili a
Claude Code in ogni sessione su questo repository.

| Skill | Fonte (commit) | Licenza | A cosa serve |
|---|---|---|---|
| frontend-design, webapp-testing, theme-factory | [anthropics/skills](https://github.com/anthropics/skills) (dbd4588) | Apache-2.0 (LICENSE.txt in ogni cartella) | Interfacce curate, test con Playwright, temi di colori e font |
| brainstorming, writing-plans, executing-plans, systematic-debugging, test-driven-development, verification-before-completion, dispatching-parallel-agents, subagent-driven-development, requesting-code-review, receiving-code-review, finishing-a-development-branch | [obra/superpowers](https://github.com/obra/superpowers) (bb92a77) | MIT | Metodo di lavoro: idee, piani, debug, TDD, verifica, più agenti in parallelo, revisioni |
| karpathy-guidelines | [forrestchang/andrej-karpathy-skills](https://github.com/forrestchang/andrej-karpathy-skills) (2c60614) | MIT | Soluzioni minime, niente modifiche fuori tema |
| caveman, cavecrew, investigate-first, surgical-patch, verify-and-stop, lean-build (+ agenti `cavecrew-*` in `.claude/agents/`) | [JuliusBrussee/caveman](https://github.com/JuliusBrussee/caveman) (d262ab3) | Apache-2.0 | Risparmio di token: risposte brevi, sotto-agenti economici, lavoro mirato |
| context-optimization, context-compression, context-degradation, multi-agent-patterns, memory-systems | [muratcankoylan/Agent-Skills-for-Context-Engineering](https://github.com/muratcankoylan/Agent-Skills-for-Context-Engineering) (9ff0c99) | MIT | Gestione del contesto, compressione, architetture multi-agente, memoria |
| web-design-guidelines | [vercel-labs/agent-skills](https://github.com/vercel-labs/agent-skills) (063bee9) | MIT | Revisione di interfacce secondo le Web Interface Guidelines |
| accessibility, performance, core-web-vitals, best-practices, web-quality-audit | [addyosmani/web-quality-skills](https://github.com/addyosmani/web-quality-skills) (afa8da9) | MIT | Accessibilità, prestazioni e qualità del sito |

Testi delle licenze MIT/Apache dei repository in `_licenses/`.

## Modifiche fatte rispetto all'originale
- `brainstorming/scripts/server.cjs`: disattivato il logo caricato da `primeradiant.com` (faceva da tracciamento).
- `web-design-guidelines`: le regole sono copiate in `guidelines.md` e lette in locale, invece di essere scaricate da internet a ogni uso.
- `.claude/agents/cavecrew-*.md`: aggiunto l'elenco `tools:` così ogni sotto-agente ha solo gli strumenti che gli servono.

## Escluse
- `caveman-compress`: invia i file a un modello per comprimerli ed esegue comandi (segnalata «High Risk» da Snyk).
- `using-git-worktrees`: esegue in automatico `npm install`/`pip install`.
- `canvas-design`, `ui-ux-pro-max`: diversi MB di font e dati, poco utili qui.
