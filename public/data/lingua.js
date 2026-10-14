// Dati di lingua: inglese, sinonimi, contrari, grammatica, proverbi, modi di dire.
(function (root) {
  'use strict';
  const D = (root.QZ_DATA = root.QZ_DATA || {});
  const rows = (text) => text.trim().split('\n').map((l) => l.trim()).filter((l) => l && !l.startsWith('#')).map((l) => l.split('|'));

  // Vocabolario inglese per gruppi: italiano=inglese, separati da «,». I distrattori vengono dallo stesso gruppo.
  const vocab = {
    animali: 'cane=dog, gatto=cat, cavallo=horse, mucca=cow, maiale=pig, pecora=sheep, capra=goat, gallina=hen, anatra=duck, coniglio=rabbit, topo=mouse, orso=bear, lupo=wolf, volpe=fox, leone=lion, tigre=tiger, scimmia=monkey, elefante=elephant, giraffa=giraffe, serpente=snake, rana=frog, tartaruga=turtle, uccello=bird, aquila=eagle, gufo=owl, pesce=fish, squalo=shark, balena=whale, ape=bee, formica=ant, farfalla=butterfly, ragno=spider, mosca=fly, zanzara=mosquito, scoiattolo=squirrel, cervo=deer, pinguino=penguin, delfino=dolphin, polpo=octopus, granchio=crab',
    cibo: 'pane=bread, formaggio=cheese, latte=milk, burro=butter, uovo=egg, carne=meat, pollo=chicken, riso=rice, zucchero=sugar, sale=salt, pepe=pepper, mela=apple, pera=pear, arancia=orange, fragola=strawberry, uva=grapes, ciliegia=cherry, limone=lemon, pesca=peach, patata=potato, pomodoro=tomato, carota=carrot, cipolla=onion, aglio=garlic, insalata=salad, zuppa=soup, torta=cake, biscotto=biscuit, miele=honey, cioccolato=chocolate, gelato=ice cream, acqua=water, vino=wine, birra=beer, succo=juice, fungo=mushroom, noce=walnut, piselli=peas, fagioli=beans',
    casa: 'casa=house, porta=door, finestra=window, tetto=roof, muro=wall, pavimento=floor, scala=stairs, cucina=kitchen, bagno=bathroom, camera da letto=bedroom, soggiorno=living room, giardino=garden, letto=bed, tavolo=table, sedia=chair, divano=sofa, armadio=wardrobe, specchio=mirror, lampada=lamp, chiave=key, cuscino=pillow, coperta=blanket, forno=oven, frigorifero=fridge, lavandino=sink, cucchiaio=spoon, forchetta=fork, coltello=knife, piatto=plate, bicchiere=glass, tazza=cup, pentola=pot',
    corpo: 'testa=head, capelli=hair, occhio=eye, orecchio=ear, naso=nose, bocca=mouth, dente=tooth, lingua=tongue, collo=neck, spalla=shoulder, braccio=arm, mano=hand, dito=finger, gamba=leg, ginocchio=knee, piede=foot, cuore=heart, schiena=back, pancia=belly, gomito=elbow, unghia=nail, labbro=lip, guancia=cheek, mento=chin, fronte=forehead, pelle=skin, osso=bone, sangue=blood',
    natura: 'sole=sun, luna=moon, stella=star, cielo=sky, nuvola=cloud, pioggia=rain, neve=snow, vento=wind, tempesta=storm, fulmine=lightning, tuono=thunder, mare=sea, fiume=river, lago=lake, montagna=mountain, collina=hill, bosco=wood, foresta=forest, albero=tree, fiore=flower, foglia=leaf, erba=grass, sasso=stone, sabbia=sand, isola=island, spiaggia=beach, terra=earth, fuoco=fire, ghiaccio=ice, nebbia=fog, arcobaleno=rainbow',
    colori: 'rosso=red, blu=blue, giallo=yellow, verde=green, nero=black, bianco=white, grigio=grey, marrone=brown, arancione=orange, viola=purple, rosa=pink, azzurro=light blue, oro=gold, argento=silver',
    tempo: 'lunedì=Monday, martedì=Tuesday, mercoledì=Wednesday, giovedì=Thursday, venerdì=Friday, sabato=Saturday, domenica=Sunday, gennaio=January, febbraio=February, marzo=March, aprile=April, maggio=May, giugno=June, luglio=July, agosto=August, settembre=September, ottobre=October, novembre=November, dicembre=December, primavera=spring, estate=summer, autunno=autumn, inverno=winter, oggi=today, domani=tomorrow, ieri=yesterday, settimana=week, mese=month, anno=year, mattina=morning, sera=evening, notte=night, ora=hour',
    persone: 'madre=mother, padre=father, fratello=brother, sorella=sister, figlio=son, figlia=daughter, nonno=grandfather, nonna=grandmother, zio=uncle, zia=aunt, cugino=cousin, marito=husband, moglie=wife, bambino=child, amico=friend, vicino=neighbour, ragazzo=boy, ragazza=girl, uomo=man, donna=woman, insegnante=teacher, medico=doctor, infermiere=nurse, cuoco=cook, pompiere=firefighter, poliziotto=policeman, avvocato=lawyer, contadino=farmer, pittore=painter, cantante=singer',
    città: 'città=city, strada=street, piazza=square, ponte=bridge, chiesa=church, scuola=school, ospedale=hospital, negozio=shop, mercato=market, banca=bank, biblioteca=library, stazione=station, aeroporto=airport, porto=harbour, museo=museum, parco=park, ristorante=restaurant, albergo=hotel, ufficio=office, fabbrica=factory, macchina=car, autobus=bus, treno=train, aereo=plane, nave=ship, bicicletta=bicycle, semaforo=traffic light, incrocio=crossroads, marciapiede=pavement, biglietto=ticket',
    verbi: 'mangiare=to eat, bere=to drink, dormire=to sleep, correre=to run, camminare=to walk, parlare=to speak, ascoltare=to listen, vedere=to see, guardare=to watch, leggere=to read, scrivere=to write, cantare=to sing, ballare=to dance, nuotare=to swim, volare=to fly, comprare=to buy, vendere=to sell, aprire=to open, chiudere=to close, cominciare=to begin, finire=to finish, ridere=to laugh, piangere=to cry, pensare=to think, sapere=to know, imparare=to learn, insegnare=to teach, aiutare=to help, giocare=to play, lavorare=to work, cucinare=to cook, pulire=to clean, viaggiare=to travel, dimenticare=to forget, ricordare=to remember, vincere=to win, perdere=to lose, costruire=to build, cercare=to look for, trovare=to find',
    aggettivi: 'grande=big, piccolo=small, alto=tall, basso=short, lungo=long, veloce=fast, lento=slow, caldo=hot, freddo=cold, nuovo=new, vecchio=old, giovane=young, felice=happy, triste=sad, bello=beautiful, brutto=ugly, facile=easy, difficile=difficult, pulito=clean, sporco=dirty, ricco=rich, povero=poor, forte=strong, debole=weak, pieno=full, vuoto=empty, stanco=tired, gentile=kind, coraggioso=brave, pigro=lazy, affamato=hungry, assetato=thirsty, pesante=heavy, leggero=light, morbido=soft, duro=hard, buio=dark, rumoroso=noisy, silenzioso=quiet, economico=cheap',
    scuola: 'libro=book, quaderno=notebook, penna=pen, matita=pencil, gomma=rubber, righello=ruler, zaino=backpack, lavagna=blackboard, banco=desk, compito=homework, esame=exam, lezione=lesson, voto=mark, classe=class, studente=student, pagina=page, parola=word, frase=sentence, lettera=letter, numero=number, domanda=question, risposta=answer, errore=mistake, forbici=scissors, colla=glue, astuccio=pencil case, dizionario=dictionary, orologio=clock, calendario=calendar',
  };
  D.vocab = Object.entries(vocab).map(([group, text]) => ({
    group,
    pairs: text.split(',').map((p) => p.trim().split('=')).map(([it, en]) => ({ it, en })),
  }));

  // Sinonimi: parola | sinonimo | distrattori
  D.synonyms = rows(`
felice|contento|triste;arrabbiato;stanco
veloce|rapido|lento;pesante;calmo
bello|attraente|brutto;sporco;stanco
grande|enorme|minuscolo;stretto;basso
piccolo|minuscolo|immenso;largo;alto
iniziare|cominciare|finire;smettere;terminare
finire|terminare|iniziare;avviare;aprire
arrabbiato|furioso|sereno;allegro;timido
paura|timore|coraggio;gioia;fiducia
coraggioso|audace|pauroso;timido;vile
intelligente|sveglio|stupido;lento;distratto
stanco|affaticato|riposato;energico;sveglio
vecchio|anziano|giovane;nuovo;moderno
casa|abitazione|ufficio;strada;negozio
lavoro|impiego|vacanza;riposo;gioco
aiutare|soccorrere|ostacolare;abbandonare;ignorare
guardare|osservare|ignorare;ascoltare;toccare
parlare|discorrere|tacere;ascoltare;scrivere
camminare|passeggiare|correre;sedersi;dormire
domandare|chiedere|rispondere;dire;negare
costruire|edificare|demolire;distruggere;smontare
distruggere|demolire|costruire;creare;riparare
ricco|benestante|povero;misero;umile
povero|indigente|ricco;agiato;facoltoso
silenzioso|quieto|rumoroso;chiassoso;loquace
allegro|gioioso|malinconico;triste;cupo
triste|malinconico|felice;allegro;euforico
difficile|arduo|facile;semplice;elementare
facile|semplice|complicato;arduo;difficile
antico|vetusto|moderno;recente;nuovo
sbagliato|errato|corretto;giusto;esatto
giusto|corretto|sbagliato;errato;falso
strano|bizzarro|normale;comune;solito
sporco|lercio|pulito;lindo;ordinato
gentile|cortese|scortese;sgarbato;rude
pigro|indolente|attivo;operoso;dinamico
rapido|celere|lento;pigro;tardo
fame|appetito|sete;sonno;sazietà
errore|sbaglio|successo;merito;esattezza
scegliere|selezionare|scartare;rifiutare;ignorare
nascondere|celare|mostrare;esibire;rivelare
abitare|risiedere|viaggiare;partire;traslocare
rompere|spezzare|aggiustare;riparare;unire
paziente|tollerante|impaziente;irascibile;nervoso
noioso|monotono|divertente;vivace;interessante
`).map(([word, syn, wrong]) => ({ word, syn, wrong: wrong.split(';') }));

  // Contrari: parola | contrario
  D.antonyms = rows(`
alto|basso
grande|piccolo
caldo|freddo
veloce|lento
pieno|vuoto
felice|triste
ricco|povero
vecchio|giovane
nuovo|usato
aperto|chiuso
pulito|sporco
facile|difficile
leggero|pesante
forte|debole
lungo|corto
largo|stretto
dolce|amaro
chiaro|scuro
vicino|lontano
sopra|sotto
dentro|fuori
prima|dopo
giorno|notte
inizio|fine
vincere|perdere
entrare|uscire
salire|scendere
comprare|vendere
amare|odiare
ridere|piangere
accendere|spegnere
ricordare|dimenticare
accettare|rifiutare
costruire|distruggere
ordine|disordine
pace|guerra
verità|bugia
coraggio|paura
generoso|avaro
ottimista|pessimista
spesso|raramente
sempre|mai
tutto|niente
maggiore|minore
attivo|passivo
interno|esterno
positivo|negativo
morbido|duro
asciutto|bagnato
silenzio|rumore
gioia|dolore
presente|assente
sveglio|addormentato
coraggioso|vigliacco
umile|superbo
`).map(([a, b]) => ({ a, b }));

  // Grammatica: domanda | forma corretta | forma sbagliata (una o più, separate da «;»)
  D.grammar = rows(`
Quale forma è corretta?|qual è|qual'è
Quale forma è corretta?|un po'|un pò
Quale forma è corretta?|perché|perchè
Quale forma è corretta?|d'accordo|daccordo
Quale forma è corretta?|soprattutto|sopratutto
Quale forma è corretta?|a posto|apposto
Quale forma è corretta?|ognuno|ogniuno
Quale forma è corretta?|nessun altro|nessun'altro
Quale forma è corretta?|qualcun altro|qualcun'altro
Quale forma è corretta?|un'amica|un amica
Quale forma è corretta?|un amico|un'amico
Quale forma è corretta?|fa (verbo fare)|fà
Quale forma è corretta?|sta (verbo stare)|stà
Quale forma è corretta?|va (verbo andare)|và
Quale forma è corretta?|efficiente|efficente
Quale forma è corretta?|sufficiente|sufficente
Quale forma è corretta?|coscienza|coscenza
Quale forma è corretta?|scienza|scenza
Quale forma è corretta?|ingegnere|ingegniere
Quale forma è corretta?|beneficenza|beneficienza
Quale forma è corretta?|aeroporto|aereoporto
Quale forma è corretta?|aeroplano|areoplano
Quale forma è corretta?|meteorologia|metereologia
Quale forma è corretta?|proprio|propio
Quale forma è corretta?|eccezione|eccezzione
Quale forma è corretta?|pazienza|pazenza
Quale forma è corretta?|igiene|igene
Quale forma è corretta?|soqquadro|socquadro;soccuadro
Quale forma è corretta?|redigere|redarre
Quale forma è corretta?|valigie|valige
Quale forma è corretta?|camicie|camice (plurale di camicia)
Quale forma è corretta?|arance|arancie
Quale forma è corretta?|qualcosa|qual cosa
Quale forma è corretta?|davvero|d'avvero
Quale forma è corretta?|tutt'altro|tutt altro
Quale forma è corretta?|ce n'è|c'è n'è;ce nè
Quale forma è corretta?|gli ho detto (a lui)|li ho detto
Quale frase è corretta?|Se avessi tempo, verrei.|Se avrei tempo, verrei.;Se avevo tempo, verrei.
Quale frase è corretta?|Penso che sia giusto.|Penso che è giusto.;Penso che sarà giusto ieri.
Quale frase è corretta?|Gli ho dato il libro (a Marco).|Ci ho dato il libro (a Marco).;Le ho dato il libro (a Marco).
Qual è il passato remoto di «essere» (io)?|fui|ero;sono stato;fossi
Qual è il passato remoto di «avere» (io)?|ebbi|avevo;ho avuto;avessi
Qual è il participio passato di «aprire»?|aperto|aprito;apruto;aprendo
Qual è il participio passato di «rompere»?|rotto|romputo;rompito;rompente
Qual è il participio passato di «scrivere»?|scritto|scriveto;scrivuto;scrisso
Qual è il participio passato di «chiedere»?|chiesto|chieduto;chiedito;chiesso
Qual è il plurale di «uovo»?|uova|uovi;uove;ovi
Qual è il plurale di «uomo»?|uomini|uomi;uomoni;uomine
Qual è il plurale di «bue»?|buoi|bui;bue;buei
Qual è il plurale di «dio»?|dèi|dii;dio;diòi
Qual è il plurale di «mano»?|mani|mane;mano;manie
Qual è il plurale di «ala»?|ali|ale;ala;alie
Qual è il femminile di «attore»?|attrice|attora;attoressa;attrina
Qual è il femminile di «re»?|regina|rea;reina;reessa
Qual è il femminile di «eroe»?|eroina|eroa;eroessa;erina
Qual è il femminile di «gallo»?|gallina|galla;gallessa;galletta
Che tipo di parola è «velocemente»?|Avverbio|Aggettivo;Verbo;Nome
Che tipo di parola è «bello»?|Aggettivo|Avverbio;Pronome;Verbo
Che tipo di parola è «sotto»?|Preposizione|Verbo;Nome;Articolo
Che tipo di parola è «noi»?|Pronome|Articolo;Aggettivo;Avverbio
Quale di queste è una parola sdrucciola (accento sulla terzultima sillaba)?|tavolo|caffè;amore;città
Quale di queste è una parola tronca?|città|tavolo;casa;albero
Quanti sono i modi finiti del verbo in italiano?|4 (indicativo, congiuntivo, condizionale, imperativo)|3;5;7
Come si chiama una parola con significato opposto a un'altra?|Contrario (antonimo)|Sinonimo;Omonimo;Neologismo
Come si chiama una parola con lo stesso significato di un'altra?|Sinonimo|Contrario;Omonimo;Anagramma
Come si chiama una parola ottenuta rimescolando le lettere di un'altra?|Anagramma|Palindromo;Acronimo;Sinonimo
Come si chiama una parola che si legge uguale nei due sensi, come «anna»?|Palindromo|Anagramma;Acronimo;Omofono
`).map(([q, a, wrong]) => ({ q, a, wrong: wrong.split(';') }));

  // Proverbi da completare: inizio | parola mancante | distrattori | fine (facoltativa) | difficoltà
  D.proverbs = rows(`
Chi dorme non piglia|pesci|topi;premi;sonno||1
Chi va piano va sano e va|lontano|veloce;forte;tardi||1
Tra il dire e il fare c'è di mezzo il|mare|monte;tempo;fiume||1
Chi trova un amico trova un|tesoro|fratello;lavoro;regalo||1
Meglio un uovo oggi che una|gallina|frittata;colomba;torta|domani|1
A caval donato non si guarda in|bocca|faccia;groppa;sella||1
Il buongiorno si vede dal|mattino|sole;caffè;sorriso||1
Rosso di sera, bel tempo si|spera|vede;aspetta;dice||1
L'abito non fa il|monaco|frate;prete;sarto||1
Chi la fa l'|aspetti|evita;paghi;sconti||2
Non tutte le ciambelle riescono col|buco|zucchero;cioccolato;forno||1
Chi semina vento raccoglie|tempesta|pioggia;grano;nuvole||1
Can che abbaia non|morde|corre;dorme;mangia||1
Moglie e buoi dei paesi|tuoi|vicini;lontani;nostri||1
Una mela al giorno toglie il|medico|dolore;dottore di casa;malanno|di torno|1
L'unione fa la|forza|pace;vittoria;differenza||1
Ride bene chi ride|ultimo|primo;forte;sempre||1
Chi fa da sé fa per|tre|due;dieci;cento||1
Paese che vai, usanza che|trovi|lasci;vedi;porti||1
Occhio non vede, cuore non|duole|batte;sente;piange||1
Quando il gatto non c'è i topi|ballano|cantano;mangiano;dormono||1
Chi tardi arriva male|alloggia|mangia;dorme;trova||2
Il lupo perde il pelo ma non il|vizio|vestito;dente;passo||1
Gallina vecchia fa buon|brodo|uovo;sugo;arrosto||1
Non c'è rosa senza|spine|petali;profumo;foglie||1
Chi ha tempo non aspetti|tempo|nessuno;domani;l'estate||1
Il mattino ha l'oro in|bocca|tasca;mano;testa||1
Chi si loda s'|imbroda|annoia;offende;inganna||2
Batti il ferro finché è|caldo|duro;nuovo;rosso||1
Non si può avere la botte piena e la moglie|ubriaca|felice;contenta;sazia||1
Chi lascia la strada vecchia per la nuova sa quel che lascia ma non sa quel che|trova|perde;sceglie;spera||1
Tanto va la gatta al lardo che ci lascia lo|zampino|codino;baffo;pelo||1
Dimmi con chi vai e ti dirò chi|sei|diventi;vai;ami||1
L'erba del vicino è sempre più|verde|alta;bella;fresca||1
Ogni lasciata è|persa|ritrovata;sprecata;rimpianta||1
Chi è causa del suo mal pianga|sé stesso|il vicino;in silenzio;domani||1
Fidarsi è bene, non fidarsi è|meglio|male;giusto;peggio||1
Il silenzio è|d'oro|d'argento;prezioso;pace||1
Morto un papa se ne fa un|altro|nuovo;migliore;santo||1
Chi va con lo zoppo impara a|zoppicare|camminare;correre;cadere||1
Anno nuovo, vita|nuova|bella;lunga;felice||1
Natale con i tuoi, Pasqua con|chi vuoi|gli amici;chi ti pare;i parenti||1
Aprile, ogni goccia un|barile|fiore;bicchiere;tesoro||2
Febbraio, febbraietto, mese|corto e maledetto|freddo e piovoso;breve e benedetto;bianco e gelato||2
Sbagliando s'|impara|inciampa;sbaglia;migliora||1
Ad ogni uccello il suo|nido|ramo;volo;canto||1
La gatta frettolosa fa i figli|ciechi|piccoli;tanti;storti||1
Chi non risica non|rosica|vince;mangia;guadagna||1
Acqua passata non macina|più|grano;mulino;farina||1
Campa cavallo che l'erba|cresce|arriva;matura;spunta||1
Chi disprezza|compra|vende;perde;sbaglia||2
Non svegliare il can che|dorme|abbaia;mangia;sogna||1
Lontano dagli occhi, lontano dal|cuore|pensiero;ricordo;sole||1
Patti chiari, amicizia|lunga|vera;sincera;sana||1
Una rondine non fa|primavera|estate;nido;stormo||1
Chi cerca|trova|perde;aspetta;sbaglia||1
`).map(([start, word, wrong, end, d]) => ({ start, word, wrong: wrong.split(';'), end, d: Number(d) }));

  // Proverbi e modi di dire con le emoji: emoji | risposta | difficoltà
  D.emojiSayings = rows(`
🐟🤐|Muto come un pesce|1
🐦🐦🫘|Prendere due piccioni con una fava|1
🥚📅👉🐔|Meglio un uovo oggi che una gallina domani|1
🍎📅👨‍⚕️🚫|Una mela al giorno toglie il medico di torno|1
😴🚫🐟|Chi dorme non piglia pesci|1
🐺🧥❌😈|Il lupo perde il pelo ma non il vizio|2
🐴🎁👄🚫|A caval donato non si guarda in bocca|1
🐱❌🐭💃|Quando il gatto non c'è i topi ballano|1
🐕💤🤫|Non svegliare il can che dorme|1
🔨🔥|Batti il ferro finché è caldo|2
🤫🥇|Il silenzio è d'oro|1
👀❌❤️❌|Lontano dagli occhi, lontano dal cuore|2
🐢🛣️🏁|Chi va piano va sano e va lontano|1
🌹🌵|Non c'è rosa senza spine|1
🌱💨🌪️|Chi semina vento raccoglie tempesta|2
🍩🕳️❌|Non tutte le ciambelle riescono col buco|1
🌅🐓🌞|Il buongiorno si vede dal mattino|2
👘🚫👨‍🦲|L'abito non fa il monaco|2
🐔👵🍲|Gallina vecchia fa buon brodo|2
🦢1️⃣❌🌸|Una rondine non fa primavera|2
🐘🏺|Come un elefante in una cristalleria|2
🧊🔨|Rompere il ghiaccio|1
💸🌳|I soldi non crescono sugli alberi|1
🍰🎂🍒|La ciliegina sulla torta|1
👂👂🔥|Fischiare le orecchie|2
🌙🦶|Avere la luna storta|2
☁️🧠|Avere la testa fra le nuvole|1
🐭🪤|Fare la fine del topo|2
💧🪨|Goccia a goccia si scava la pietra|2
🛢️🍷👩🥴|Non si può avere la botte piena e la moglie ubriaca|2
`).map(([emoji, answer, d]) => ({ emoji, answer, d: Number(d) }));
})(typeof window !== 'undefined' ? window : globalThis);
