// Domande in più per «Proverbi e modi di dire» (extends: proverbi) — Quizzone!
// Dati compatti: ogni riga «nome | difficoltà | valore». Fatti verificati; forme italiane standard.
(function (root) {
  'use strict';
  const D = (root.QZ_DATA = root.QZ_DATA || {});

  // ---- Modi di dire e loro significato: [modo di dire, difficoltà, significato] ----
  const MODI = [
    ['Avere la testa fra le nuvole', 1, 'Essere molto distratto'],
    ['Essere al verde', 1, 'Non avere più soldi'],
    ['Piove sul bagnato', 1, 'Le cose, buone o cattive, capitano a chi ne ha già'],
    ['In bocca al lupo', 1, 'Augurio di buona fortuna prima di una prova'],
    ['Costare un occhio della testa', 1, 'Costare moltissimo'],
    ['Prendere due piccioni con una fava', 1, 'Raggiungere due scopi con una sola azione'],
    ['Avere il pollice verde', 1, 'Essere bravo a coltivare le piante'],
    ['Gettare la spugna', 1, 'Arrendersi'],
    ['Menare il can per l\'aia', 2, 'Tirare per le lunghe senza arrivare al punto'],
    ['Essere al settimo cielo', 1, 'Essere felicissimo'],
    ['Fare orecchie da mercante', 1, 'Fingere di non sentire'],
    ['Tagliare la corda', 1, 'Scappare di nascosto'],
    ['Avere un diavolo per capello', 1, 'Essere furioso'],
    ['Piangere lacrime di coccodrillo', 2, 'Mostrare un dolore falso'],
    ['Mettere il carro davanti ai buoi', 2, 'Fare le cose nell\'ordine sbagliato'],
    ['Parlare a vanvera', 2, 'Parlare senza riflettere'],
    ['Dormire sugli allori', 2, 'Adagiarsi sui successi già ottenuti'],
    ['Avere le mani bucate', 1, 'Spendere troppo e senza controllo'],
    ['Fare il portoghese', 1, 'Entrare o viaggiare senza pagare'],
    ['Colpo di fulmine', 1, 'Innamoramento improvviso'],
    ['Una mosca bianca', 2, 'Una persona o una cosa rarissima'],
    ['Cadere dalle nuvole', 1, 'Mostrarsi stupiti di una cosa che non si sapeva'],
    ['Avere un chiodo fisso', 2, 'Avere un\'idea fissa che non se ne va'],
    ['Essere in alto mare', 2, 'Essere lontano dalla conclusione'],
    ['Prendere una cantonata', 2, 'Sbagliarsi di grosso'],
    ['Cercare un ago in un pagliaio', 1, 'Cercare qualcosa quasi impossibile da trovare'],
    ['Tirare il sasso e nascondere la mano', 2, 'Fare del male di nascosto'],
    ['Mangiarsi le mani', 2, 'Pentirsi amaramente'],
    ['Avere la coda di paglia', 2, 'Sentirsi in colpa e temere di essere accusato'],
    ['Gettare acqua sul fuoco', 1, 'Calmare gli animi'],
    ['Gettare benzina sul fuoco', 1, 'Peggiorare una lite o una tensione'],
    ['Mettere il dito nella piaga', 2, 'Toccare un punto dolente'],
    ['Essere agli sgoccioli', 2, 'Essere quasi finito'],
    ['Non vedere l\'ora', 1, 'Desiderare che una cosa accada presto'],
    ['Lasciare il tempo che trova', 2, 'Non servire a nulla'],
    ['Fare un buco nell\'acqua', 1, 'Fallire, senza alcun risultato'],
    ['Salire sul carro del vincitore', 2, 'Schierarsi con chi sta vincendo'],
    ['Lavarsene le mani', 1, 'Disinteressarsi, non assumersi responsabilità'],
    ['Tenere il piede in due staffe', 2, 'Barcamenarsi tra due partiti opposti per convenienza'],
    ['Avere un asso nella manica', 2, 'Avere una risorsa segreta pronta all\'uso'],
    ['Fare la parte del leone', 1, 'Prendersi la parte più grande'],
    ['Mettere i bastoni fra le ruote', 1, 'Ostacolare qualcuno'],
    ['Essere nato con la camicia', 1, 'Essere molto fortunato'],
    ['Sentirsi un pesce fuor d\'acqua', 1, 'Sentirsi a disagio in un ambiente'],
    ['Avere la lingua lunga', 2, 'Non saper tacere, spettegolare'],
    ['Fare i conti senza l\'oste', 2, 'Non considerare chi ha voce in capitolo'],
    ['Sputare il rospo', 2, 'Dire finalmente ciò che si tiene dentro'],
    ['Andare a gonfie vele', 1, 'Procedere benissimo'],
    ['Navigare in cattive acque', 2, 'Trovarsi in difficoltà, soprattutto economiche'],
    ['Passare la notte in bianco', 1, 'Non dormire per tutta la notte'],
    ['Essere sulla cresta dell\'onda', 2, 'Essere al culmine del successo'],
    ['Buttarsi a capofitto', 2, 'Lanciarsi senza riflettere in un\'impresa'],
    ['Stare sulle spine', 2, 'Essere in grande ansia, a disagio'],
    ['Avere le farfalle nello stomaco', 1, 'Provare l\'emozione dell\'innamoramento'],
    ['Cavarsela per il rotto della cuffia', 2, 'Cavarsela per un soffio'],
    ['Prendere il toro per le corna', 2, 'Affrontare con coraggio un problema'],
    ['Acqua in bocca!', 1, 'Mantieni il segreto'],
    ['Avere un cuore di pietra', 1, 'Essere insensibile'],
    ['Avere uno scheletro nell\'armadio', 2, 'Avere un segreto scomodo da nascondere'],
    ['Sapere vita, morte e miracoli', 2, 'Sapere tutto di qualcuno'],
    ['Entrare da un orecchio e uscire dall\'altro', 1, 'Dimenticare subito ciò che si è sentito'],
    ['Essere uno stinco di santo', 3, 'Essere una persona irreprensibile'],
    ['Essere come cane e gatto', 1, 'Litigare di continuo'],
    ['Fare il filo a qualcuno', 2, 'Corteggiarlo'],
    ['Avere fegato', 1, 'Avere coraggio'],
    ['Avere sale in zucca', 1, 'Avere buon senso'],
    ['Mettere la pulce nell\'orecchio', 2, 'Insinuare un dubbio'],
    ['Dare i numeri', 1, 'Straparlare, comportarsi in modo strano'],
    ['Andare a ruba', 2, 'Vendersi in fretta e in gran quantità'],
    ['Andare a letto con le galline', 1, 'Coricarsi molto presto'],
    ['Alzarsi con il piede sbagliato', 1, 'Essere di cattivo umore fin dal mattino'],
    ['Fare di tutta l\'erba un fascio', 2, 'Mettere tutti sullo stesso piano, generalizzando'],
    ['Chiudere un occhio', 1, 'Far finta di non vedere, essere tolleranti'],
    ['Non avere peli sulla lingua', 1, 'Parlare con franchezza, senza riguardi'],
    ['Tenere il muso', 1, 'Fare il broncio'],
    ['Perdere il filo', 2, 'Non ricordare più il punto del discorso'],
    ['Alzare il gomito', 1, 'Bere troppo alcol'],
    ['Rimanere di sasso', 1, 'Restare immobile per lo stupore'],
    ['Essere un libro aperto', 2, 'Essere una persona facile da capire'],
    ['Avere i nervi a fior di pelle', 2, 'Essere molto nervoso'],
    ['Essere un bastian contrario', 2, 'Contraddire sempre gli altri'],
    ['Il gioco non vale la candela', 2, 'Il risultato non ripaga la fatica'],
    ['Cercare il pelo nell\'uovo', 1, 'Essere pignolo'],
    ['Cadere in piedi', 2, 'Uscire indenne da una situazione difficile'],
    ['Mettersi nei panni di qualcuno', 1, 'Immedesimarsi in lui'],
    ['Scoprire l\'acqua calda', 1, 'Dire una cosa ovvia come se fosse una novità'],
    ['Fare scena muta', 2, 'Non riuscire a rispondere'],
    ['Tenere banco', 2, 'Dominare la conversazione'],
    ['Una goccia nel mare', 2, 'Un contributo insignificante'],
    ['Avere le spalle coperte', 2, 'Avere protezioni e appoggi'],
    ['Andare a pennello', 2, 'Calzare o andare perfettamente'],
    ['Prendere fischi per fiaschi', 2, 'Confondere una cosa con un\'altra'],
    ['Qui gatta ci cova', 1, 'C\'è sotto qualcosa di losco'],
    ['Tutto fa brodo', 2, 'Ogni cosa, anche modesta, può servire'],
    ['Come un cane che si morde la coda', 2, 'Un circolo vizioso in cui il problema si ripete'],
    ['Mettere la mano sul fuoco', 1, 'Garantire con assoluta certezza'],
    ['Essere come il prezzemolo', 2, 'Essere dappertutto'],
    ['Essere un osso duro', 2, 'Essere difficile da battere o da convincere'],
    ['Mandare a monte', 2, 'Far saltare un progetto'],
    ['Fare il callo', 2, 'Abituarsi a qualcosa di sgradevole'],
    ['Fare una levataccia', 1, 'Svegliarsi molto presto'],
    ['Giocare a carte scoperte', 2, 'Agire con trasparenza'],
    ['Essere un pozzo di scienza', 1, 'Essere una persona molto colta'],
    ['Avere un cuore d\'oro', 1, 'Essere molto generoso'],
    ['A bizzeffe', 2, 'In grande quantità'],
    ['Con le mani nel sacco', 1, 'In flagrante'],
    ['Dalla padella alla brace', 1, 'Da una brutta situazione a una peggiore'],
    ['A denti stretti', 2, 'Con grande sforzo, a fatica'],
    ['Di punto in bianco', 2, 'All\'improvviso'],
    ['A occhio e croce', 2, 'Approssimativamente'],
    ['Ogni morte di papa', 2, 'Molto raramente'],
    ['Alla chetichella', 3, 'Di nascosto, senza far rumore'],
    ['Per filo e per segno', 2, 'In ogni minimo dettaglio'],
    ['In quattro e quattr\'otto', 2, 'In pochissimo tempo'],
    ['Sul più bello', 2, 'Nel momento migliore'],
    ['Tra l\'incudine e il martello', 3, 'Tra due pressioni o pericoli opposti'],
    ['Aprire il vaso di Pandora', 2, 'Scatenare problemi che erano nascosti'],
    ['Il tallone d\'Achille', 1, 'Il punto debole'],
    ['Una vittoria di Pirro', 2, 'Una vittoria ottenuta a un prezzo troppo alto'],
    ['Passare il Rubicone', 2, 'Prendere una decisione irreversibile'],
    ['Fare il Cireneo', 3, 'Aiutare qualcuno nella sua fatica'],
    ['Fare da Cicerone', 3, 'Accompagnare qualcuno mostrandogli i luoghi'],
    ['Tagliare il nodo gordiano', 3, 'Risolvere con un gesto deciso un problema inestricabile'],
    ['La spada di Damocle', 2, 'Un pericolo che incombe'],
    ['Un lavoro da certosino', 2, 'Un lavoro svolto con grande pazienza e precisione'],
    ['Una fatica di Sisifo', 3, 'Un\'impresa inutile che va sempre ricominciata'],
    ['Fare buon viso a cattivo gioco', 3, 'Accettare con serenità una situazione sgradevole'],
    ['Fare tappezzeria', 2, 'Restare in disparte a una festa senza ballare'],
    ['Fare le ore piccole', 1, 'Andare a letto molto tardi'],
    ['Battere la fiacca', 2, 'Lavorare con poca voglia'],
    ['Battere cassa', 3, 'Chiedere soldi'],
    ['Vedere le stelle', 2, 'Provare un dolore fortissimo'],
    ['Toccare ferro', 1, 'Fare un gesto scaramantico'],
    ['Avere una fame da lupi', 1, 'Avere moltissima fame'],
    ['Fare un freddo cane', 1, 'Fare moltissimo freddo'],
    ['Piovere a catinelle', 1, 'Piovere a dirotto'],
    ['Fare il pappagallo', 2, 'Ripetere le cose senza capirle'],
    ['Mettere la testa a posto', 2, 'Cambiare vita smettendo di fare follie'],
    ['Sudare sette camicie', 2, 'Faticare moltissimo'],
    ['Mettere radici', 2, 'Stabilirsi definitivamente in un luogo'],
    ['Fare il passo più lungo della gamba', 2, 'Intraprendere cose oltre le proprie possibilità'],
    ['Prendere la palla al balzo', 2, 'Cogliere al volo l\'occasione'],
    ['Stare con le mani in mano', 1, 'Starsene senza fare nulla'],
    ['Essere in un vicolo cieco', 2, 'Non avere alternative per proseguire'],
    ['Tirare le somme', 2, 'Fare il bilancio finale'],
    ['Tirare a campare', 2, 'Vivere alla giornata, senza impegnarsi'],
    ['Avere il fiato sul collo', 2, 'Essere controllato o pressato da vicino'],
    ['Arrampicarsi sugli specchi', 2, 'Cercare di giustificarsi con argomenti deboli'],
    ['Essere nel pallone', 2, 'Essere confuso e disorientato'],
    ['Vendere la pelle dell\'orso prima di averlo ucciso', 2, 'Dare per certo ciò che non è ancora avvenuto'],
    ['Salvare capra e cavoli', 2, 'Conciliare due interessi opposti'],
    ['Spezzare una lancia a favore di qualcuno', 3, 'Difenderlo'],
    ['Rompere gli indugi', 3, 'Decidersi finalmente ad agire'],
    ['Mettere in piazza', 2, 'Rendere pubblico ciò che era privato'],
    ['Fare l\'avvocato del diavolo', 2, 'Sostenere la tesi opposta per metterla alla prova'],
    ['Essere una Cassandra', 3, 'Fare previsioni nefaste a cui nessuno crede'],
    ['Essere un Creso', 3, 'Essere ricchissimo'],
    ['Essere un Adone', 2, 'Essere un uomo bellissimo'],
    ['Un\'odissea', 2, 'Un viaggio lungo e pieno di peripezie'],
    ['Essere un Ercole', 2, 'Essere fortissimo'],
    ['Il bacio di Giuda', 2, 'Un tradimento mascherato da gesto d\'affetto'],
    ['Una Babele', 2, 'Un luogo di grande confusione di voci e lingue'],
  ].map(([name, d, significato]) => ({ name, d, significato }));
  // Tabelle compatte: ogni riga «nome | difficoltà | valore».
  const rows = (text, key) => text.trim().split('\n').map((l) => {
    const [name, d, value] = l.split(' | ').map((x) => x.trim());
    return { name, d: Number(d), [key]: value };
  });

  const ANIMALI = rows(`
Can che abbaia non morde | 1 | Cane
Non svegliare il can che dorme | 1 | Cane
Menare il can per l'aia | 2 | Cane
Fare una vita da cani | 1 | Cane
Fa un freddo cane | 1 | Cane
Essere un cane sciolto | 2 | Cane
Cane non mangia cane | 2 | Cane
Avere l'aria di un cane bastonato | 2 | Cane
Qui gatta ci cova | 1 | Gatto
Tanto va la gatta al lardo che ci lascia lo zampino | 2 | Gatto
La gatta frettolosa fa i figli ciechi | 2 | Gatto
Di notte tutti i gatti sono bigi | 2 | Gatto
Non dire gatto se non l'hai nel sacco | 2 | Gatto
Avere sette vite come i gatti | 1 | Gatto
Fare la gatta morta | 2 | Gatto
Eravamo quattro gatti | 1 | Gatto
Il lupo perde il pelo ma non il vizio | 1 | Lupo
In bocca al lupo | 1 | Lupo
Avere una fame da lupi | 1 | Lupo
Gridare al lupo | 2 | Lupo
Un tempo da lupi | 2 | Lupo
Un lupo solitario | 2 | Lupo
Muto come un pesce | 1 | Pesce
Chi dorme non piglia pesci | 1 | Pesce
Sentirsi un pesce fuor d'acqua | 1 | Pesce
Il pesce puzza dalla testa | 2 | Pesce
Sano come un pesce | 2 | Pesce
Pesce d'aprile | 1 | Pesce
Fare il pesce in barile | 3 | Pesce
Essere un pesce lesso | 2 | Pesce
A caval donato non si guarda in bocca | 1 | Cavallo
Campa cavallo che l'erba cresce | 1 | Cavallo
L'occhio del padrone ingrassa il cavallo | 2 | Cavallo
Il cavallo di Troia | 1 | Cavallo
Un cavallo di battaglia | 2 | Cavallo
Cavallo che corre non ha bisogno di sprone | 3 | Cavallo
Avere la febbre da cavallo | 2 | Cavallo
Moglie e buoi dei paesi tuoi | 1 | Bue
Mettere il carro davanti ai buoi | 2 | Bue
Chiudere la stalla quando i buoi sono scappati | 2 | Bue
Essere forte come un bue | 2 | Bue
A lavar la testa all'asino si perde il ranno e il sapone | 3 | Asino
Essere un asino | 1 | Asino
Legare l'asino dove vuole il padrone | 3 | Asino
Qui casca l'asino | 2 | Asino
Furbo come una volpe | 1 | Volpe
La volpe e l'uva | 1 | Volpe
Una vecchia volpe | 2 | Volpe
Una volpe nel pollaio | 2 | Volpe
Fare la parte del leone | 1 | Leone
Avere un cuore di leone | 2 | Leone
Forte come un leone | 1 | Leone
Entrare nella tana del leone | 2 | Leone
Un leone da tastiera | 2 | Leone
Una mosca bianca | 2 | Mosca
Non si sente volare una mosca | 1 | Mosca
Avere la mosca al naso | 2 | Mosca
Rimanere con un pugno di mosche | 2 | Mosca
Fare la mosca cocchiera | 3 | Mosca
Non fare male a una mosca | 1 | Mosca
Morire come mosche | 2 | Mosca
Fare la fine del topo | 1 | Topo
Sentirsi un topo in trappola | 1 | Topo
Un topo di biblioteca | 1 | Topo
Un topo d'albergo | 2 | Topo
La pecora nera | 1 | Pecora
Contare le pecore | 1 | Pecora
La pecorella smarrita | 2 | Pecora
Cielo a pecorelle, acqua a catinelle | 1 | Pecora
Gallina vecchia fa buon brodo | 1 | Gallina
Andare a letto con le galline | 1 | Gallina
Avere un cervello di gallina | 1 | Gallina
La gallina che canta ha fatto l'uovo | 3 | Gallina
Meglio un uovo oggi che una gallina domani | 1 | Gallina
Fare il gallo nel pollaio | 2 | Gallo
Al canto del gallo | 2 | Gallo
Fare il galletto | 2 | Gallo
Avere una memoria da elefante | 1 | Elefante
Come un elefante in una cristalleria | 1 | Elefante
L'elefante nella stanza | 3 | Elefante
Un elefante bianco | 3 | Elefante
Scaldare una serpe in seno | 3 | Serpente
Essere un coniglio | 1 | Coniglio
Tirare fuori un coniglio dal cilindro | 1 | Coniglio
Vendere la pelle dell'orso prima di averlo ucciso | 2 | Orso
Essere un orso | 1 | Orso
Una rondine non fa primavera | 1 | Rondine
Prendere due piccioni con una fava | 1 | Piccione
Un piccione viaggiatore | 2 | Piccione
Fare il pappagallo | 2 | Pappagallo
Mettere la pulce nell'orecchio | 2 | Pulce
Fare le pulci a qualcuno | 3 | Pulce
Il mercato delle pulci | 1 | Pulce
Lavorare come una formica | 2 | Formica
Essere una formichina | 2 | Formica
Fare la cicala | 3 | Cicala
Sputare il rospo | 2 | Rospo
Ingoiare il rospo | 2 | Rospo
Salvare capra e cavoli | 1 | Capra
Un capro espiatorio | 2 | Capra
Testardo come un mulo | 1 | Mulo
Lavorare come un mulo | 1 | Mulo
Gettare perle ai porci | 2 | Maiale
Nudo come un verme | 2 | Verme
Sentirsi un verme | 1 | Verme
Fare il pavone | 2 | Pavone
Fare come lo struzzo | 2 | Struzzo
La politica dello struzzo | 3 | Struzzo
Andare a passo di lumaca | 1 | Lumaca
Lento come una lumaca | 1 | Lumaca
Dormire come un ghiro | 1 | Ghiro
Veloce come una lepre | 2 | Lepre
Cavalcare la tigre | 3 | Tigre
Una tigre di carta | 2 | Tigre
Avere occhio di lince | 2 | Lince
Il canto del cigno | 2 | Cigno
Essere un'oca giuliva | 2 | Oca
Il gioco dell'oca | 1 | Oca
Avere la pelle d'oca | 1 | Oca
Fare il passo dell'oca | 2 | Oca
Rosso come un gambero | 2 | Gambero
Fare il passo del gambero | 2 | Gambero
Prendere un granchio | 1 | Granchio
Il grillo parlante | 1 | Grillo
`, 'animale');

  const CORPO = rows(`
Chiudere un occhio | 1 | Occhio
Tenere d'occhio qualcuno | 1 | Occhio
A occhio e croce | 2 | Occhio
Dare nell'occhio | 1 | Occhio
Non chiudere occhio | 1 | Occhio
Vedere di buon occhio | 2 | Occhio
Dare una mano | 1 | Mano
Avere le mani bucate | 1 | Mano
Lavarsene le mani | 1 | Mano
Mettere le mani avanti | 2 | Mano
Avere le mani in pasta | 2 | Mano
Avere mani di fata | 2 | Mano
Forzare la mano | 2 | Mano
Mettere la mano sul fuoco | 1 | Mano
Fare man bassa | 3 | Mano
Avere la testa dura | 1 | Testa
Montarsi la testa | 2 | Testa
Perdere la testa | 1 | Testa
Una testa calda | 1 | Testa
Mettere la testa a posto | 1 | Testa
Avere la testa fra le nuvole | 1 | Testa
Testa o croce | 1 | Testa
A testa alta | 1 | Testa
Avere un cuore d'oro | 1 | Cuore
Avere un cuore di pietra | 1 | Cuore
Stare a cuore | 2 | Cuore
A cuor leggero | 2 | Cuore
Mettersi il cuore in pace | 2 | Cuore
Spezzare il cuore | 1 | Cuore
Parlare a cuore aperto | 2 | Cuore
Ficcare il naso | 1 | Naso
Restare con un palmo di naso | 2 | Naso
Storcere il naso | 1 | Naso
Menare per il naso | 2 | Naso
Avere naso per gli affari | 2 | Naso
Avere la puzza sotto il naso | 2 | Naso
Avere un piede nella fossa | 2 | Piede
Puntare i piedi | 1 | Piede
Partire con il piede giusto | 1 | Piede
Prendere piede | 2 | Piede
A piede libero | 2 | Piede
In punta di piedi | 1 | Piede
Mettere i piedi nel piatto | 2 | Piede
Sentirsi mancare la terra sotto i piedi | 1 | Piede
Fare orecchie da mercante | 1 | Orecchio
Drizzare le orecchie | 1 | Orecchio
Avere orecchio per la musica | 2 | Orecchio
Essere tutt'orecchi | 1 | Orecchio
Tirare le orecchie | 1 | Orecchio
Entrare da un orecchio e uscire dall'altro | 1 | Orecchio
Restare a bocca aperta | 1 | Bocca
Acqua in bocca! | 1 | Bocca
Togliere le parole di bocca | 2 | Bocca
Essere di bocca buona | 2 | Bocca
Cucirsi la bocca | 2 | Bocca
Passare di bocca in bocca | 2 | Bocca
Essere sulla bocca di tutti | 1 | Bocca
Non aprire bocca | 1 | Bocca
Mettere il dito nella piaga | 1 | Dito
Mordersi le dita | 2 | Dito
Non muovere un dito | 1 | Dito
Segnare a dito | 2 | Dito
Leccarsi le dita | 1 | Dito
Legarsela al dito | 2 | Dito
Toccare il cielo con un dito | 1 | Dito
Avere la lingua lunga | 1 | Lingua
Mordersi la lingua | 1 | Lingua
Non avere peli sulla lingua | 1 | Lingua
Avere la lingua sciolta | 2 | Lingua
Avere il nome sulla punta della lingua | 1 | Lingua
Avere la lingua biforcuta | 2 | Lingua
Essere in gamba | 1 | Gamba
Darsela a gambe | 1 | Gamba
Tagliare le gambe | 2 | Gamba
Prendere sottogamba | 2 | Gamba
Fare il passo più lungo della gamba | 1 | Gamba
Le bugie hanno le gambe corte | 1 | Gamba
Avere le spalle larghe | 2 | Spalla
Avere le spalle coperte | 2 | Spalla
Fare spallucce | 2 | Spalla
Mettere con le spalle al muro | 2 | Spalla
Voltare le spalle | 1 | Spalla
Una spalla su cui piangere | 1 | Spalla
Salvare la pelle | 1 | Pelle
Rischiare la pelle | 1 | Pelle
Non stare nella pelle | 1 | Pelle
Vendere cara la pelle | 2 | Pelle
Amici per la pelle | 1 | Pelle
A fior di pelle | 2 | Pelle
Avere la pelle dura | 2 | Pelle
Avere un nodo alla gola | 1 | Gola
Prendere per la gola | 1 | Gola
Avere l'acqua alla gola | 2 | Gola
Fare gola | 1 | Gola
Mettere il coltello alla gola | 2 | Gola
Avere fegato | 1 | Fegato
Mangiarsi il fegato | 2 | Fegato
Rodersi il fegato | 3 | Fegato
Voltare la schiena | 1 | Schiena
Pugnalare alla schiena | 1 | Schiena
Spezzarsi la schiena | 2 | Schiena
Avere il fiato sul collo | 2 | Collo
Andare a rotta di collo | 2 | Collo
Un collo di bottiglia | 2 | Collo
Avere la corda al collo | 2 | Collo
Avere un diavolo per capello | 2 | Capello
Avere i capelli dritti | 1 | Capello
Per un capello | 3 | Capello
Spaccare il capello in quattro | 3 | Capello
Prendere per i capelli | 2 | Capello
Essere un osso duro | 2 | Osso
Farsi le ossa | 2 | Osso
Avere le ossa rotte | 1 | Osso
Essere bagnato fino alle ossa | 1 | Osso
Avere un buco nello stomaco | 1 | Stomaco
Avere lo stomaco chiuso | 2 | Stomaco
Avere le farfalle nello stomaco | 1 | Stomaco
Rivoltare lo stomaco | 2 | Stomaco
A stomaco vuoto | 1 | Stomaco
Avere uno stomaco di ferro | 2 | Stomaco
Avere il dente avvelenato | 2 | Dente
Essere armato fino ai denti | 2 | Dente
A denti stretti | 1 | Dente
Parlare fra i denti | 2 | Dente
Mettere qualcosa sotto i denti | 1 | Dente
Cuocere la pasta al dente | 1 | Dente
Non battere ciglio | 2 | Ciglio
Alzare il gomito | 1 | Gomito
Dare di gomito | 2 | Gomito
Stare gomito a gomito | 2 | Gomito
Il braccio di ferro | 1 | Braccio
Il braccio destro | 1 | Braccio
Accogliere a braccia aperte | 1 | Braccio
Incrociare le braccia | 1 | Braccio
Essere braccia rubate all'agricoltura | 3 | Braccio
Avere la faccia tosta | 1 | Faccia
Perdere la faccia | 1 | Faccia
Salvare la faccia | 1 | Faccia
Un faccia a faccia | 1 | Faccia
Avere una faccia da schiaffi | 2 | Faccia
`, 'parte');

  const CIBO = rows(`
Essere buono come il pane | 1 | Pane
Guadagnarsi il pane | 1 | Pane
Essere un pezzo di pane | 1 | Pane
Mangiare il pane a tradimento | 2 | Pane
Togliere il pane di bocca | 2 | Pane
Cercare il pelo nell'uovo | 1 | Uovo
L'uovo di Colombo | 1 | Uovo
Camminare sulle uova | 2 | Uovo
Mettere tutte le uova nello stesso paniere | 2 | Uovo
Rompere le uova nel paniere | 1 | Uovo
Essere pieno come un uovo | 2 | Uovo
Andare liscio come l'olio | 2 | Olio
Gettare olio sul fuoco | 2 | Olio
Avere olio di gomito | 1 | Olio
Una luna di miele | 1 | Miele
Dolce come il miele | 1 | Miele
Piangere sul latte versato | 1 | Latte
Bianco come il latte | 1 | Latte
Avere ancora il latte alla bocca | 2 | Latte
Capitare a fagiolo | 2 | Fagiolo
Venire a fagiolo | 2 | Fagiolo
Non valere un fico secco | 2 | Fico
Fare le nozze con i fichi secchi | 2 | Fico
Togliere le castagne dal fuoco | 1 | Castagna
Prendere in castagna | 2 | Castagna
Spremere come un limone | 2 | Limone
Giallo come un limone | 1 | Limone
Entrarci come i cavoli a merenda | 2 | Cavolo
Salvare capra e cavoli | 1 | Cavolo
Mettere troppa carne al fuoco | 1 | Carne
Essere carne da macello | 2 | Carne
Essere carne da cannone | 2 | Carne
Avere le mani di burro | 2 | Burro
Avere la zucca vuota | 1 | Zucca
La mela non cade lontano dall'albero | 2 | Mela
Una mela marcia | 2 | Mela
Una ciliegia tira l'altra | 1 | Ciliegia
Una patata bollente | 1 | Patata
Sembrare un sacco di patate | 2 | Patata
Essere come il prezzemolo | 1 | Prezzemolo
Diventare rosso come un pomodoro | 1 | Pomodoro
Diventare rosso come un peperone | 1 | Peperone
È sempre la stessa minestra | 2 | Minestra
O mangi questa minestra o salti la finestra | 2 | Minestra
La minestra riscaldata non è mai buona | 2 | Minestra
Avere le fette di prosciutto sugli occhi | 2 | Prosciutto
In vino veritas | 1 | Vino
Nella botte piccola c'è il vino buono | 2 | Vino
Il vino fa buon sangue | 2 | Vino
Il sale della vita | 2 | Sale
Il sale della terra | 3 | Sale
Avere le mani in pasta | 2 | Pasta
Scivolare su una buccia di banana | 1 | Banana
Tutto fa brodo | 1 | Brodo
Lasciare qualcuno a cuocere nel suo brodo | 2 | Brodo
Un brodo di coltura | 3 | Brodo
`, 'alimento');

  const ELEMENTI = rows(`
Fare un buco nell'acqua | 1 | Acqua
Scoprire l'acqua calda | 1 | Acqua
Navigare in cattive acque | 2 | Acqua
Tirare l'acqua al proprio mulino | 2 | Acqua
Affogare in un bicchiere d'acqua | 2 | Acqua
Somigliarsi come due gocce d'acqua | 1 | Acqua
Pestare l'acqua nel mortaio | 3 | Acqua
Acqua passata non macina più | 1 | Acqua
Giocare con il fuoco | 1 | Fuoco
Un fuoco di paglia | 2 | Fuoco
Fare fuoco e fiamme | 1 | Fuoco
Mettere a ferro e fuoco | 2 | Fuoco
Essere tra due fuochi | 2 | Fuoco
Gettare benzina sul fuoco | 1 | Fuoco
Il fuoco amico | 2 | Fuoco
Campare d'aria | 2 | Aria
Mandare all'aria | 1 | Aria
Fare castelli in aria | 1 | Aria
Aria fritta | 1 | Aria
Darsi delle arie | 1 | Aria
Cambiare aria | 1 | Aria
Tira una brutta aria | 2 | Aria
Prendere una boccata d'aria | 1 | Aria
Fare terra bruciata | 2 | Terra
Avere i piedi per terra | 1 | Terra
Una terra di nessuno | 2 | Terra
La terra promessa | 2 | Terra
Parlare terra terra | 3 | Terra
Una terra di conquista | 2 | Terra
`, 'elemento');

  const COLORI = rows(`
Vedere tutto nero | 1 | Nero
La lista nera | 1 | Nero
Il mercato nero | 1 | Nero
La pecora nera | 1 | Nero
Avere l'umore nero | 1 | Nero
La magia nera | 1 | Nero
La cronaca nera | 1 | Nero
La bestia nera | 2 | Nero
Passare la notte in bianco | 1 | Bianco
Dare carta bianca | 1 | Bianco
Un'arma bianca | 2 | Bianco
Alzare bandiera bianca | 1 | Bianco
La settimana bianca | 1 | Bianco
Votare scheda bianca | 1 | Bianco
Di punto in bianco | 2 | Bianco
I colletti bianchi | 2 | Bianco
Vedere rosso | 1 | Rosso
Essere in rosso | 1 | Rosso
Il cartellino rosso | 1 | Rosso
Il tappeto rosso | 1 | Rosso
L'allarme rosso | 1 | Rosso
Il bollino rosso | 2 | Rosso
Essere al verde | 1 | Verde
Avere il pollice verde | 1 | Verde
Il numero verde | 1 | Verde
La luce verde | 1 | Verde
Essere verde d'invidia | 1 | Verde
Un romanzo giallo | 1 | Giallo
La febbre gialla | 2 | Giallo
Il cartellino giallo | 1 | Giallo
Le pagine gialle | 2 | Giallo
Il pericolo giallo | 3 | Giallo
Avere il sangue blu | 1 | Blu
Avere una fifa blu | 2 | Blu
I colletti blu | 2 | Blu
Vedere tutto rosa | 1 | Rosa
Le quote rosa | 2 | Rosa
Un romanzo rosa | 1 | Rosa
Il fiocco rosa | 1 | Rosa
La cronaca rosa | 2 | Rosa
La maglia rosa | 1 | Rosa
Un'eminenza grigia | 2 | Grigio
La materia grigia | 1 | Grigio
Una zona grigia | 2 | Grigio
Le cellule grigie | 3 | Grigio
`, 'colore');

  (D.pop = D.pop || []).push({
    id: 'plusproverbi', extends: 'proverbi',
    tables: [
      {
        id: 'modi', items: MODI,
        fields: {
          significato: {
            ask: 'Che cosa significa il modo di dire «{name}»?',
            who: 'Quale modo di dire significa «{value}»?',
            tf: 'Il modo di dire «{name}» significa «{value}».',
          },
        },
      },
      {
        id: 'animali', items: ANIMALI,
        fields: {
          animale: {
            ask: 'Quale animale compare nel detto «{name}»?',
            who: 'Quale di questi detti contiene l\'animale «{value}»?',
            tf: 'Nel detto «{name}» compare questo animale: {value}.',
            odd: 'Trova l\'intruso: quale detto NON contiene l\'animale «{value}»?',
          },
        },
      },
      {
        id: 'corpo', items: CORPO,
        fields: {
          parte: {
            ask: 'Quale parte del corpo compare nel modo di dire «{name}»?',
            who: 'Quale di questi modi di dire contiene la parte del corpo «{value}»?',
            tf: 'Nel modo di dire «{name}» compare questa parte del corpo: {value}.',
            odd: 'Trova l\'intruso: quale detto NON contiene la parte del corpo «{value}»?',
          },
        },
      },
      {
        id: 'cibo', items: CIBO,
        fields: {
          alimento: {
            ask: 'Quale cibo o bevanda compare nel detto «{name}»?',
            who: 'Quale di questi detti contiene questo cibo o bevanda: «{value}»?',
            tf: 'Nel detto «{name}» compare questo cibo o bevanda: {value}.',
            odd: 'Trova l\'intruso: quale detto NON contiene «{value}»?',
          },
        },
      },
      {
        id: 'elementi', items: ELEMENTI,
        fields: {
          elemento: {
            ask: 'Quale elemento (acqua, fuoco, aria o terra) compare nel detto «{name}»?',
            who: 'Quale di questi detti contiene l\'elemento «{value}»?',
            tf: 'Nel detto «{name}» compare l\'elemento {value}.',
            odd: 'Trova l\'intruso: quale detto NON contiene l\'elemento «{value}»?',
          },
        },
      },
      {
        id: 'colori', items: COLORI,
        fields: {
          colore: {
            ask: 'Quale colore compare nel modo di dire «{name}»?',
            who: 'Quale di questi modi di dire contiene il colore «{value}»?',
            tf: 'Nel modo di dire «{name}» compare questo colore: {value}.',
            odd: 'Trova l\'intruso: quale detto NON contiene il colore «{value}»?',
          },
        },
      },
    ],
  });
})(typeof window !== 'undefined' ? window : globalThis);
