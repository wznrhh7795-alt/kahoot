// Dati vari: sport, cucina, animali, cultura generale, sequenze, elenchi per le foto.
(function (root) {
  'use strict';
  const D = (root.QZ_DATA = root.QZ_DATA || {});
  const rows = (text) => text.trim().split('\n').map((l) => l.trim()).filter((l) => l && !l.startsWith('#')).map((l) => l.split('|'));
  const quiz = (text) => rows(text).map(([q, a, wrong, d]) => ({ q, a, wrong: wrong.split(';'), d: Number(d) }));
  const tf = (text) => rows(text).map(([q, a, d, why]) => ({ q, a: a === 'V', d: Number(d), why }));

  // Mondiali di calcio maschili: anno | vincitore | Paese ospitante
  D.worldCups = rows(`
1930|Uruguay|Uruguay
1934|Italia|Italia
1938|Italia|Francia
1950|Uruguay|Brasile
1954|Germania Ovest|Svizzera
1958|Brasile|Svezia
1962|Brasile|Cile
1966|Inghilterra|Inghilterra
1970|Brasile|Messico
1974|Germania Ovest|Germania Ovest
1978|Argentina|Argentina
1982|Italia|Spagna
1986|Argentina|Messico
1990|Germania Ovest|Italia
1994|Brasile|Stati Uniti
1998|Francia|Francia
2002|Brasile|Corea del Sud e Giappone
2006|Italia|Germania
2010|Spagna|Sudafrica
2014|Germania|Brasile
2018|Francia|Russia
2022|Argentina|Qatar
`).map(([y, winner, host]) => ({ y: Number(y), winner, host }));

  // Olimpiadi: anno | città | tipo (E estive, I invernali)
  D.olympics = rows(`
1896|Atene|E
1900|Parigi|E
1908|Londra|E
1912|Stoccolma|E
1920|Anversa|E
1924|Parigi|E
1928|Amsterdam|E
1932|Los Angeles|E
1936|Berlino|E
1948|Londra|E
1952|Helsinki|E
1956|Melbourne|E
1960|Roma|E
1964|Tokyo|E
1968|Città del Messico|E
1972|Monaco di Baviera|E
1976|Montréal|E
1980|Mosca|E
1984|Los Angeles|E
1988|Seul|E
1992|Barcellona|E
1996|Atlanta|E
2000|Sydney|E
2004|Atene|E
2008|Pechino|E
2012|Londra|E
2016|Rio de Janeiro|E
2024|Parigi|E
1924|Chamonix|I
1928|Sankt Moritz|I
1936|Garmisch-Partenkirchen|I
1952|Oslo|I
1956|Cortina d'Ampezzo|I
1964|Innsbruck|I
1968|Grenoble|I
1972|Sapporo|I
1980|Lake Placid|I
1984|Sarajevo|I
1988|Calgary|I
1992|Albertville|I
1994|Lillehammer|I
1998|Nagano|I
2002|Salt Lake City|I
2006|Torino|I
2010|Vancouver|I
2014|Soči|I
2018|Pyeongchang|I
2022|Pechino|I
2026|Milano Cortina|I
`).map(([y, city, kind]) => ({ y: Number(y), city, winter: kind === 'I' }));

  D.sportQuiz = quiz(`
Di che colore è la maglia del leader del Giro d'Italia?|Rosa|Gialla;Verde;Azzurra|1
Di che colore è la maglia del leader del Tour de France?|Gialla|Rosa;Verde;A pois|1
Dove ha sede la Ferrari?|Maranello|Modena;Torino;Imola|1
In quale circuito si corre il Gran Premio d'Italia di Formula 1?|Monza|Imola;Mugello;Misano|1
Quanti titoli mondiali ha vinto Valentino Rossi in carriera?|9|7;5;10|2
Quale numero di gara usava Valentino Rossi?|46|93;99;7|1
In quale sport ha gareggiato Federica Pellegrini?|Nuoto|Atletica;Scherma;Sci|1
In quale sport è famoso Alberto Tomba?|Sci alpino|Bob;Pattinaggio;Snowboard|1
In quale sport è famoso Jannik Sinner?|Tennis|Sci;Ciclismo;Golf|1
Chi ha vinto i 100 metri alle Olimpiadi di Tokyo 2020?|Marcell Jacobs|Usain Bolt;Filippo Tortu;Fred Kerley|1
Con quale atleta Gianmarco Tamberi condivise l'oro nel salto in alto a Tokyo 2020?|Mutaz Essa Barshim (Qatar)|Usain Bolt (Giamaica);Marcell Jacobs (Italia);Armand Duplantis (Svezia)|2
Quale velocista italiano detenne per 17 anni il record mondiale dei 200 metri?|Pietro Mennea|Livio Berruti;Marcell Jacobs;Filippo Tortu|2
Quale ciclista era soprannominato «il Pirata»?|Marco Pantani|Fausto Coppi;Gino Bartali;Vincenzo Nibali|1
Quali due grandi ciclisti italiani erano rivali negli anni Quaranta e Cinquanta?|Fausto Coppi e Gino Bartali|Pantani e Cipollini;Moser e Saronni;Nibali e Basso|1
Quale velocista giamaicano detiene il record mondiale dei 100 metri?|Usain Bolt|Carl Lewis;Yohan Blake;Asafa Powell|1
Quale nuotatore americano ha vinto più medaglie olimpiche d'oro?|Michael Phelps|Mark Spitz;Ryan Lochte;Ian Thorpe|1
In quale sport si usa il termine «birdie»?|Golf|Tennis;Badminton;Baseball|2
In quale sport si fa «scacco matto»?|Scacchi|Dama;Backgammon;Go|1
In quale sport si effettua un «ace» sul servizio?|Tennis|Calcio;Rugby;Basket|1
Come si chiama il punteggio di 40 pari nel tennis?|Parità (deuce)|Vantaggio;Love;Match point|2
Quanto vale un canestro da fuori dalla linea dei tre punti nel basket?|3 punti|2 punti;1 punto;4 punti|1
Quanti punti vale una meta nel rugby a 15?|5|3;6;7|2
Fino a quanti punti si gioca un set di pallavolo (esclusi tie-break)?|25|21;15;30|1
Ogni quanti anni si disputano le Olimpiadi estive?|4|2;3;5|1
Quale città ha ospitato le Olimpiadi estive del 1960?|Roma|Milano;Torino;Napoli|1
Quale città italiana ha ospitato le Olimpiadi invernali del 2006?|Torino|Cortina d'Ampezzo;Milano;Bormio|1
Quali città hanno ospitato le Olimpiadi invernali del 2026?|Milano e Cortina d'Ampezzo|Torino e Sestriere;Bolzano e Trento;Cortina e Livigno|1
Quanti Mondiali di calcio ha vinto l'Italia?|4|3;5;2|1
In quale anno l'Italia ha vinto il suo quarto Mondiale?|2006|1982;2002;1994|1
Quale Paese ha vinto più Mondiali di calcio?|Brasile|Germania;Italia;Argentina|1
Quale squadra è soprannominata «la Vecchia Signora»?|Juventus|Inter;Torino;Milan|1
Di che colore è la maglia della Fiorentina?|Viola|Granata;Celeste;Gialloblù|1
Di che colori è la maglia dell'Inter?|Nerazzurra|Rossonera;Bianconera;Giallorossa|1
Di che colori è la maglia del Milan?|Rossonera|Nerazzurra;Bianconera;Biancoceleste|1
Quale squadra è detta «granata»?|Torino|Fiorentina;Genoa;Bologna|1
Quale campione argentino ha giocato nel Napoli vincendo due scudetti?|Diego Armando Maradona|Lionel Messi;Gabriel Batistuta;Javier Zanetti|1
Come si chiama il campionato di calcio italiano di massima serie?|Serie A|Premier League;Liga;Bundesliga|1
Come si chiama il campionato di calcio spagnolo?|Liga|Ligue 1;Premier League;Serie A|1
Quale premio viene assegnato al miglior calciatore dell'anno dalla rivista France Football?|Pallone d'oro|Scarpa d'oro;Golden Boy;The Best|1
In quale sport si usano il fioretto, la spada e la sciabola?|Scherma|Tiro con l'arco;Judo;Pentathlon|1
Quale arte marziale giapponese ha cinture colorate e significa «via della gentilezza»?|Judo|Karate;Kendo;Sumo|2
Quale sport si gioca a Wimbledon?|Tennis|Golf;Cricket;Polo|1
In quale sport si corre la «Parigi-Roubaix»?|Ciclismo|Maratona;Automobilismo;Equitazione|2
In quale città si corre la storica corsa di cavalli del Palio?|Siena|Asti;Firenze;Ferrara|1
Quale sport combina nuoto, ciclismo e corsa?|Triathlon|Pentathlon;Decathlon;Biathlon|1
Quale sport combina sci di fondo e tiro a segno?|Biathlon|Triathlon;Combinata nordica;Pentathlon|2
Quante prove ci sono nel decathlon?|10|5;7;12|1
Quale sport si pratica nel Tour de France?|Ciclismo|Automobilismo;Corsa;Vela|1
In quale sport si assegna la Stanley Cup?|Hockey su ghiaccio|Basket;Baseball;Football americano|2
Come si chiama la finale del campionato di football americano?|Super Bowl|World Series;NBA Finals;Stanley Cup|1
Quale squadra di basket NBA ha reso famoso Michael Jordan?|Chicago Bulls|Los Angeles Lakers;Boston Celtics;Miami Heat|1
`);

  D.sportTF = tf(`
Una partita di calcio dura 90 minuti più eventuale recupero.|V|1|
Nel calcio il portiere può prendere la palla con le mani in tutta la sua metà campo.|F|1|Solo all'interno della propria area di rigore.
Il Giro d'Italia si corre in bicicletta.|V|1|
Le Olimpiadi moderne sono nate ad Atene.|V|1|
La Formula 1 è uno sport di motociclismo.|F|1|È automobilismo.
Nel tennis il punteggio va 15, 30, 40.|V|1|
Una squadra di rugby a 15 ha 15 giocatori in campo.|V|1|
La maratona misura circa 42 km.|V|1|
Il golf si gioca con una palla ovale.|F|1|La palla ovale è del rugby e del football americano.
Il Brasile ha vinto 5 Mondiali di calcio.|V|1|
L'Italia ha ospitato i Mondiali di calcio due volte.|V|2|Nel 1934 e nel 1990.
`);

  // Piatti tipici: piatto | regione | difficoltà
  D.dishes = rows(`
Pesto alla genovese|Liguria|1
Focaccia di Recco|Liguria|2
Farinata di ceci|Liguria|2
Pasta alla carbonara|Lazio|1
Bucatini all'amatriciana|Lazio|1
Cacio e pepe|Lazio|1
Saltimbocca alla romana|Lazio|2
Risotto alla milanese|Lombardia|1
Cotoletta alla milanese|Lombardia|1
Ossobuco|Lombardia|2
Pizzoccheri|Lombardia|2
Panettone|Lombardia|1
Bagna càuda|Piemonte|2
Vitello tonnato|Piemonte|2
Agnolotti del plin|Piemonte|3
Bicerin|Piemonte|3
Tortellini|Emilia-Romagna|1
Lasagne alla bolognese|Emilia-Romagna|1
Piadina|Emilia-Romagna|1
Prosciutto di Parma|Emilia-Romagna|1
Aceto balsamico di Modena|Emilia-Romagna|1
Ribollita|Toscana|1
Bistecca alla fiorentina|Toscana|1
Cantucci|Toscana|2
Panforte|Toscana|2
Pappa al pomodoro|Toscana|2
Pizza Margherita|Campania|1
Sfogliatella|Campania|1
Babà|Campania|1
Mozzarella di bufala|Campania|1
Pastiera|Campania|2
Gnocchi alla sorrentina|Campania|2
Orecchiette|Puglia|1
Taralli|Puglia|1
Burrata|Puglia|2
Arancini|Sicilia|1
Cannoli|Sicilia|1
Cassata|Sicilia|1
Pasta alla Norma|Sicilia|2
Granita|Sicilia|1
Seadas|Sardegna|2
Pane carasau|Sardegna|1
Porceddu|Sardegna|2
'Nduja|Calabria|1
Arrosticini|Abruzzo|1
Fonduta|Valle d'Aosta|2
Fontina|Valle d'Aosta|2
Canederli|Trentino-Alto Adige|1
Strudel di mele|Trentino-Alto Adige|1
Speck|Trentino-Alto Adige|1
Baccalà alla vicentina|Veneto|2
Pandoro|Veneto|1
Bigoli|Veneto|3
Frico|Friuli-Venezia Giulia|2
Gubana|Friuli-Venezia Giulia|3
Olive all'ascolana|Marche|1
Vincisgrassi|Marche|3
Torta al testo|Umbria|2
Strangozzi|Umbria|3
Peperoni cruschi|Basilicata|3
`).map(([name, region, d]) => ({ name, region, d: Number(d) }));

  // Piatti del mondo: piatto | Paese | difficoltà
  D.worldDishes = rows(`
Paella|Spagna|1
Gazpacho|Spagna|2
Moussaka|Grecia|1
Gulasch|Ungheria|2
Kimchi|Corea del Sud|2
Sushi|Giappone|1
Ramen|Giappone|1
Tacos|Messico|1
Guacamole|Messico|1
Fish and chips|Regno Unito|1
Pierogi|Polonia|2
Feijoada|Brasile|2
Pad thai|Thailandia|1
Fonduta di formaggio (fondue)|Svizzera|1
Wiener Schnitzel|Austria|1
Ceviche|Perù|2
Poutine|Canada|2
Hamburger|Stati Uniti|1
Croque-monsieur|Francia|2
Ratatouille|Francia|1
Tandoori chicken|India|2
Dim sum|Cina|2
Anatra alla pechinese|Cina|1
Bratwurst|Germania|1
Smørrebrød|Danimarca|3
Pastel de nata|Portogallo|2
`).map(([name, country, d]) => ({ name, country, d: Number(d) }));

  D.foodQuiz = quiz(`
Qual è l'ingrediente principale del guacamole?|Avocado|Pomodoro;Lime;Peperoncino|1
Con quale legume si prepara l'hummus?|Ceci|Lenticchie;Fagioli;Piselli|1
Quale carne si usa nella carbonara tradizionale?|Guanciale|Pancetta affumicata;Prosciutto cotto;Salsiccia|1
Quale formaggio si usa nella carbonara tradizionale?|Pecorino romano|Mozzarella;Gorgonzola;Fontina|1
Quale formaggio si usa nel tiramisù?|Mascarpone|Ricotta;Panna;Robiola|1
Che cosa dà il colore giallo al risotto alla milanese?|Zafferano|Curcuma;Uovo;Curry|1
Con quale farina si fa la polenta tradizionale?|Farina di mais|Farina di grano;Farina di riso;Farina di castagne|1
Da quale animale si ricava il latte per la mozzarella di bufala?|Bufala|Mucca;Capra;Pecora|1
Da quale latte si produce il pecorino?|Latte di pecora|Latte di capra;Latte di mucca;Latte di bufala|1
Quanti mesi stagiona minimo il Parmigiano Reggiano?|12|3;6;24|2
Quali sono gli ingredienti della pizza Margherita?|Pomodoro, mozzarella e basilico|Pomodoro, aglio e origano;Mozzarella, prosciutto e funghi;Pomodoro, acciughe e capperi|1
Quale pizza ha solo pomodoro, aglio, origano e olio?|Marinara|Margherita;Diavola;Capricciosa|1
In onore di chi fu chiamata la pizza Margherita, secondo la tradizione?|La regina Margherita di Savoia|Una pizzaiola napoletana;Santa Margherita;La figlia di Garibaldi|1
Da quale pianta si ricava il caffè?|Dai semi della pianta del caffè|Dalle foglie del tè;Dalle bacche del ginepro;Dalle radici della cicoria|1
Quale spezia è la più costosa al mondo?|Zafferano|Vaniglia;Cardamomo;Pepe nero|1
Da quale pianta si ottiene il cioccolato?|Cacao|Carrubo;Caffè;Vaniglia|1
Quale frutto secco si usa nel pesto alla genovese?|Pinoli|Noci;Mandorle;Nocciole|1
Che cosa sono le «orecchiette»?|Un formato di pasta|Un dolce;Un formaggio;Un salume|1
Che cosa è il «lampredotto» fiorentino?|Uno stomaco di bovino|Un pesce di fiume;Un tipo di pane;Un dolce|2
Quale vitigno produce il Barolo?|Nebbiolo|Sangiovese;Montepulciano;Nero d'Avola|2
In quale regione si produce il Chianti?|Toscana|Piemonte;Veneto;Umbria|1
In quale regione si produce il Prosecco?|Veneto e Friuli-Venezia Giulia|Piemonte e Lombardia;Toscana;Sicilia|2
Quale liquore campano si fa con le scorze di limone?|Limoncello|Amaretto;Sambuca;Nocino|1
Quale bevanda si fa con espresso e latte montato?|Cappuccino|Americano;Ristretto;Shakerato|1
Come si chiama il caffè con un goccio di liquore?|Caffè corretto|Caffè macchiato;Marocchino;Caffè freddo|1
Quale pasta ripiena è tipica di Bologna?|Tortellini|Ravioli;Agnolotti;Cappelletti|1
Quale dolce siciliano ha la ricotta in un guscio fritto croccante?|Cannolo|Cassata;Sfogliatella;Babà|1
`);

  D.foodTF = tf(`
La carbonara tradizionale contiene la panna.|F|1|La ricetta tradizionale usa uova, guanciale, pecorino e pepe.
Il pomodoro arrivò in Europa dalle Americhe.|V|1|
Gli spaghetti alla bolognese sono un piatto tipico di Bologna.|F|2|A Bologna il ragù si usa con le tagliatelle; gli «spaghetti alla bolognese» sono un'invenzione estera.
La pizza Margherita è nata a Napoli.|V|1|
Il panettone è un dolce tipico di Natale.|V|1|
Il pesto alla genovese contiene il basilico.|V|1|
Il sushi contiene sempre pesce crudo.|F|2|Il sushi è a base di riso condito; esistono molte varianti senza pesce crudo.
Il miele non scade praticamente mai se conservato bene.|V|2|
`);

  D.animalQuiz = quiz(`
Qual è l'animale terrestre più veloce?|Ghepardo|Leone;Antilope;Cavallo|1
Qual è l'animale più grande del mondo?|Balenottera azzurra|Elefante africano;Squalo balena;Capodoglio|1
Qual è l'animale terrestre più grande?|Elefante africano|Rinoceronte;Ippopotamo;Giraffa|1
Qual è l'animale più alto del mondo?|Giraffa|Elefante;Struzzo;Cammello|1
Qual è l'uccello più grande del mondo?|Struzzo|Emù;Albatro;Condor|1
Qual è l'uccello più piccolo del mondo?|Colibrì|Passero;Scricciolo;Cinciallegra|1
Quale uccello non sa volare?|Pinguino|Aquila;Gabbiano;Rondine|1
Quale mammifero sa volare?|Pipistrello|Lemure;Gufo;Colibrì|1
Quale mammifero depone le uova?|Ornitorinco|Canguro;Koala;Delfino|1
Dove tiene il cucciolo il canguro?|Nel marsupio|Sulla schiena;Nella tana;In un nido|1
Di che cosa si nutre principalmente il panda gigante?|Bambù|Pesce;Frutta;Insetti|1
Di che cosa si nutre principalmente il koala?|Foglie di eucalipto|Bambù;Insetti;Erba|1
Quante zampe ha un ragno?|8|6;10;4|1
Quante zampe ha un insetto?|6|8;4;10|1
Come si chiama il cucciolo della mucca?|Vitello|Puledro;Agnello;Capretto|1
Come si chiama il cucciolo del cavallo?|Puledro|Vitello;Cucciolo;Capretto|1
Come si chiama il cucciolo della pecora?|Agnello|Capretto;Vitello;Porcellino|1
Come si chiama la femmina del cervo?|Cerva|Daina;Capra;Renna|2
Come si chiama la casa delle api?|Alveare|Formicaio;Nido;Tana|1
Come si chiama il verso dell'asino?|Raglio|Nitrito;Muggito;Belato|1
Come si chiama il verso del cavallo?|Nitrito|Raglio;Ruggito;Barrito|1
Come si chiama il verso dell'elefante?|Barrito|Ruggito;Nitrito;Muggito|2
Come si chiama il verso del leone?|Ruggito|Barrito;Ululato;Grugnito|1
Come si chiama il verso del lupo?|Ululato|Latrato;Ruggito;Bramito|1
Quale animale è il simbolo del WWF?|Panda gigante|Tigre;Orso polare;Elefante|1
Quale animale cambia colore per mimetizzarsi?|Camaleonte|Iguana;Geco;Lucertola|1
Quale animale ha tre cuori?|Polpo|Squalo;Stella marina;Medusa|2
Quale mammifero marino ha una lunga zanna a spirale?|Narvalo|Tricheco;Beluga;Orca|2
Quale animale dorme fino a 20 ore al giorno appeso agli alberi?|Bradipo|Koala;Pipistrello;Lemure|2
Quale animale è detto «re della foresta»?|Leone|Tigre;Gorilla;Elefante|1
Qual è il cane più piccolo per taglia tra queste razze?|Chihuahua|Beagle;Bassotto;Barboncino|1
Da quale animale deriva la seta?|Baco da seta|Ragno;Ape;Pecora|1
Quale animale produce il miele?|Ape|Vespa;Calabrone;Formica|1
Quale di questi animali è un rettile?|Coccodrillo|Rana;Salamandra;Delfino|1
Quale di questi animali è un anfibio?|Rana|Lucertola;Tartaruga;Serpente|1
Quale di questi animali è un mammifero?|Delfino|Squalo;Pesce spada;Tonno|1
Quale di questi animali è un pesce?|Cavalluccio marino|Delfino;Balena;Foca|2
In quale continente vivono i canguri allo stato selvatico?|Oceania|Africa;Sud America;Asia|1
In quale continente vivono i lemuri allo stato selvatico?|Africa (Madagascar)|Asia;Sud America;Oceania|2
In quale continente vivono i pinguini imperatori?|Antartide|Artico;Sud America;Oceania|1
Dove vivono gli orsi polari?|Nell'Artico|In Antartide;Nelle Alpi;In Siberia meridionale|1
Come si chiama la trasformazione da bruco a farfalla?|Metamorfosi|Mutazione;Evoluzione;Muta|1
Quale animale è il simbolo di Roma?|Lupa|Aquila;Leone;Orso|1
Quale animale compare sullo stemma di Venezia?|Leone alato|Aquila;Grifone;Lupo|1
Quale animale è simbolo di Berna e compare nel suo nome?|Orso|Lupo;Cervo;Aquila|2
`);

  D.animalTF = tf(`
Le balene sono pesci.|F|1|Sono mammiferi.
I delfini respirano con i polmoni.|V|1|
Gli struzzi nascondono la testa sotto la sabbia quando hanno paura.|F|2|È un mito.
I gatti hanno le vibrisse (baffi) che li aiutano a orientarsi.|V|1|
I serpenti hanno le palpebre.|F|3|I serpenti non hanno palpebre mobili.
Gli squali sono mammiferi.|F|1|Sono pesci cartilaginei.
I pipistrelli sono ciechi.|F|2|Vedono, e molti usano anche l'ecolocalizzazione.
I polpi hanno otto tentacoli (braccia).|V|1|
Le giraffe hanno sette vertebre cervicali, come gli umani.|V|3|
I koala sono orsi.|F|2|Sono marsupiali.
Il pinguino è un uccello.|V|1|
La tartaruga può uscire dal suo guscio.|F|2|Il guscio è parte del suo scheletro.
I camaleonti cambiano colore anche in base all'umore e alla temperatura.|V|2|
Le formiche possono sollevare molte volte il proprio peso.|V|1|
Il colibrì può volare all'indietro.|V|2|
Gli elefanti hanno paura dei topi (fatto dimostrato).|F|2|È una credenza popolare senza basi.
I cani sudano soprattutto dai polpastrelli delle zampe.|V|3|
`);

  D.generalQuiz = quiz(`
Quanti giorni ha un anno bisestile?|366|365;364;367|1
Quanti anni ci sono in un secolo?|100|10;50;1000|1
Quanti anni ci sono in un millennio?|1000|100;500;10.000|1
Quanti minuti ci sono in un'ora?|60|100;30;90|1
Quante settimane ci sono in un anno?|52|48;50;54|1
Quale mese ha 28 giorni (29 negli anni bisestili)?|Febbraio|Aprile;Giugno;Novembre|1
Quanti sono i colori del semaforo?|3|2;4;5|1
Qual è il numero di emergenza unico europeo?|112|113;118;911|1
Quale numero chiama il soccorso sanitario in Italia (oltre al 112)?|118|113;115;117|1
Quale numero chiama i vigili del fuoco in Italia (oltre al 112)?|115|113;118;117|2
Quale simbolo chimico si usa anche per indicare l'oro?|Au|Ag;Or;Go|1
Quanti sono i nani di Biancaneve?|7|5;6;9|1
Come si chiama il burattino a cui cresce il naso?|Pinocchio|Arlecchino;Pulcinella;Geppetto|1
Quale maschera di carnevale è di Bergamo e ha un vestito a rombi colorati?|Arlecchino|Pulcinella;Balanzone;Brighella|1
Quale maschera è il simbolo di Napoli?|Pulcinella|Arlecchino;Pantalone;Gianduia|1
Quale maschera è legata a Torino?|Gianduia|Meneghino;Pulcinella;Stenterello|2
Quale maschera è di Milano?|Meneghino|Gianduia;Arlecchino;Rugantino|2
Quale maschera veneziana rappresenta un vecchio mercante?|Pantalone|Brighella;Arlecchino;Colombina|2
Quale santo è il patrono d'Italia insieme a Santa Caterina da Siena?|San Francesco d'Assisi|San Pietro;San Marco;San Giuseppe|1
Qual è il santo patrono di Milano?|Sant'Ambrogio|San Carlo;San Marco;San Giovanni|1
Qual è il santo patrono di Napoli?|San Gennaro|San Francesco;San Nicola;Sant'Antonio|1
Qual è il santo patrono di Venezia?|San Marco|San Giorgio;San Pietro;San Nicolò|1
Qual è il santo patrono di Roma?|Santi Pietro e Paolo|San Giovanni;San Lorenzo;San Sebastiano|2
Qual è il santo patrono di Firenze?|San Giovanni Battista|San Marco;San Lorenzo;Sant'Antonino|2
Di quale città è patrona Santa Rosalia?|Palermo|Catania;Siracusa;Messina|2
Quale festa si celebra il 6 gennaio?|Epifania|Ognissanti;Assunzione;Immacolata|1
Quale festa si celebra il 15 agosto?|Ferragosto|Epifania;Ognissanti;Festa della Repubblica|1
Quale festa si celebra il 1º novembre?|Ognissanti|Epifania;Immacolata;Ferragosto|1
Quale festa si celebra l'8 dicembre?|Immacolata Concezione|Santo Stefano;Epifania;Ognissanti|1
Qual è il simbolo della Croce Rossa?|Una croce rossa su sfondo bianco|Una croce bianca su sfondo rosso;Una mezzaluna verde;Un cuore rosso|1
Di quali colori è la bandiera italiana?|Verde, bianco e rosso|Rosso, bianco e blu;Verde, giallo e rosso;Bianco, rosso e nero|1
Quante stelle ci sono sulla bandiera dell'Unione Europea?|12|15;27;10|1
Quale lingua ha più parlanti madrelingua al mondo?|Cinese mandarino|Inglese;Spagnolo;Hindi|1
Quale alfabeto si usa in Russia?|Cirillico|Latino;Greco;Arabo|1
Quante lettere ha l'alfabeto italiano?|21|26;24;22|1
Quante lettere ha l'alfabeto inglese?|26|21;24;28|1
Qual è il nome della moneta usata in Italia prima dell'euro?|Lira|Franco;Peseta;Marco|1
A quante lire corrispondeva un euro al cambio fisso?|1.936,27|1.000;2.000;1.500|2
In quale città si trova la sede principale dell'ONU?|New York|Ginevra;Parigi;Bruxelles|1
In quale città ha sede la FAO?|Roma|Ginevra;New York;Parigi|2
In quale città ha sede il Parlamento europeo (sede ufficiale)?|Strasburgo|Bruxelles;Lussemburgo;Francoforte|2
In quale città ha sede la Banca centrale europea?|Francoforte|Bruxelles;Parigi;Lussemburgo|2
In quale città viene consegnato il premio Nobel per la pace?|Oslo|Stoccolma;Ginevra;Copenaghen|2
Che cosa misura il «PIL»?|Il valore della produzione di un Paese|La popolazione;Il debito pubblico;L'inflazione|2
`);

  D.generalTF = tf(`
Un anno bisestile ha 366 giorni.|V|1|
Il Natale si festeggia il 25 dicembre.|V|1|
La Festa della Repubblica italiana è il 25 aprile.|F|1|È il 2 giugno; il 25 aprile è la Festa della Liberazione.
L'euro è la moneta di tutti i Paesi europei.|F|1|Molti Paesi europei non usano l'euro, come Regno Unito, Svizzera e Svezia.
Il numero di emergenza 112 funziona in tutta l'Unione Europea.|V|1|
Arlecchino è una maschera napoletana.|F|1|È una maschera bergamasca; quella napoletana è Pulcinella.
La bandiera del Giappone ha un cerchio rosso su sfondo bianco.|V|1|
La FAO ha sede a Roma.|V|2|
`);

  // Sequenze da mettere in ordine (dal primo all'ultimo)
  D.sequences = [
    { q: 'Metti in ordine il ciclo di vita della farfalla', items: ['Uovo', 'Bruco', 'Crisalide', 'Farfalla'] },
    { q: 'Metti in ordine il ciclo di vita della rana', items: ['Uovo', 'Girino', 'Girino con le zampe', 'Rana'] },
    { q: 'Metti in ordine i colori dell\'arcobaleno, dall\'esterno', items: ['Rosso', 'Arancione', 'Giallo', 'Verde', 'Blu', 'Indaco', 'Violetto'] },
    { q: 'Metti in ordine le note musicali', items: ['Do', 'Re', 'Mi', 'Fa', 'Sol', 'La', 'Si'] },
    { q: 'Metti in ordine i giorni della settimana, da lunedì', items: ['Lunedì', 'Martedì', 'Mercoledì', 'Giovedì', 'Venerdì', 'Sabato', 'Domenica'] },
    { q: 'Metti in ordine i mesi dell\'anno', items: ['Gennaio', 'Febbraio', 'Marzo', 'Aprile', 'Maggio', 'Giugno', 'Luglio', 'Agosto', 'Settembre', 'Ottobre', 'Novembre', 'Dicembre'] },
    { q: 'Metti in ordine le stagioni, a partire dalla primavera', items: ['Primavera', 'Estate', 'Autunno', 'Inverno'] },
    { q: 'Metti in ordine i pianeti, dal più vicino al Sole', items: ['Mercurio', 'Venere', 'Terra', 'Marte', 'Giove', 'Saturno', 'Urano', 'Nettuno'] },
    { q: 'Metti in ordine i pianeti, dal più grande al più piccolo', items: ['Giove', 'Saturno', 'Urano', 'Nettuno', 'Terra', 'Venere', 'Marte', 'Mercurio'] },
    { q: 'Metti in ordine queste unità di misura, dalla più piccola', items: ['Millimetro', 'Centimetro', 'Decimetro', 'Metro', 'Chilometro'] },
    { q: 'Metti in ordine queste unità di memoria, dalla più piccola', items: ['Bit', 'Byte', 'Kilobyte', 'Megabyte', 'Gigabyte', 'Terabyte'] },
    { q: 'Metti in ordine queste medaglie, dalla più importante', items: ['Oro', 'Argento', 'Bronzo'] },
    { q: 'Metti in ordine le fasi della Luna, dalla Luna nuova', items: ['Luna nuova', 'Primo quarto', 'Luna piena', 'Ultimo quarto'] },
    { q: 'Metti in ordine i passaggi per fare il pane', items: ['Impastare farina, acqua e lievito', 'Far lievitare', 'Dare la forma', 'Cuocere in forno'] },
    { q: 'Metti in ordine le cantiche della Divina Commedia', items: ['Inferno', 'Purgatorio', 'Paradiso'] },
    { q: 'Metti in ordine le parti di un pasto all\'italiana', items: ['Antipasto', 'Primo', 'Secondo', 'Dolce', 'Caffè'] },
    { q: 'Metti in ordine questi numeri romani, dal più piccolo', items: ['V', 'X', 'L', 'C', 'D', 'M'] },
    { q: 'Metti in ordine le fasi della digestione', items: ['Bocca', 'Esofago', 'Stomaco', 'Intestino tenue', 'Intestino crasso'] },
    { q: 'Metti in ordine le voci maschili dalla più acuta', items: ['Tenore', 'Baritono', 'Basso'] },
    { q: 'Metti in ordine i gradi militari dell\'Esercito, dal più basso', items: ['Soldato', 'Caporale', 'Sergente', 'Tenente', 'Capitano', 'Colonnello', 'Generale'] },
    { q: 'Metti in ordine le cinture del judo, dalla prima', items: ['Bianca', 'Gialla', 'Arancione', 'Verde', 'Blu', 'Marrone', 'Nera'] },
    { q: 'Metti in ordine le lettere dell\'alfabeto greco', items: ['Alfa', 'Beta', 'Gamma', 'Delta', 'Epsilon'] },
    { q: 'Metti in ordine queste figure, dal numero di lati minore', items: ['Triangolo', 'Quadrato', 'Pentagono', 'Esagono', 'Ottagono'] },
  ];

  // Monumenti e luoghi (foto da Wikimedia Commons): nome | dove si trova | voce di it.wikipedia | difficoltà
  D.landmarks = rows(`
Colosseo|Roma, Italia|Colosseo|1
Torre di Pisa|Pisa, Italia|Torre di Pisa|1
Torre Eiffel|Parigi, Francia|Torre Eiffel|1
Big Ben|Londra, Regno Unito|Big Ben|1
Statua della Libertà|New York, Stati Uniti|Statua della Libertà|1
Taj Mahal|Agra, India|Taj Mahal|1
Grande Muraglia|Cina|Grande Muraglia|1
Machu Picchu|Perù|Machu Picchu|1
Partenone|Atene, Grecia|Partenone|1
Sagrada Família|Barcellona, Spagna|Sagrada Família|1
Cristo Redentore|Rio de Janeiro, Brasile|Cristo Redentore|1
Petra|Giordania|Petra (Giordania)|2
Stonehenge|Inghilterra, Regno Unito|Stonehenge|1
Opera House di Sydney|Sydney, Australia|Sydney Opera House|1
Golden Gate Bridge|San Francisco, Stati Uniti|Golden Gate Bridge|1
Piramidi di Giza|Giza, Egitto|Necropoli di Giza|1
Sfinge di Giza|Giza, Egitto|Grande Sfinge di Giza|1
Alhambra|Granada, Spagna|Alhambra|2
Castello di Neuschwanstein|Baviera, Germania|Castello di Neuschwanstein|2
Burj Khalifa|Dubai, Emirati Arabi Uniti|Burj Khalifa|1
Cattedrale di San Basilio|Mosca, Russia|Cattedrale di San Basilio|2
Duomo di Milano|Milano, Italia|Duomo di Milano|1
Basilica di San Pietro|Città del Vaticano|Basilica di San Pietro in Vaticano|1
Ponte di Rialto|Venezia, Italia|Ponte di Rialto|1
Ponte Vecchio|Firenze, Italia|Ponte Vecchio|1
Fontana di Trevi|Roma, Italia|Fontana di Trevi|1
Pantheon|Roma, Italia|Pantheon (Roma)|1
Arena di Verona|Verona, Italia|Arena di Verona|1
Trulli di Alberobello|Alberobello, Italia|Trullo|1
Sassi di Matera|Matera, Italia|Sassi di Matera|1
Reggia di Caserta|Caserta, Italia|Reggia di Caserta|2
Castel del Monte|Andria, Italia|Castel del Monte|2
Mole Antonelliana|Torino, Italia|Mole Antonelliana|1
Tempio della Concordia|Agrigento, Italia|Tempio della Concordia (Agrigento)|2
Cattedrale di Santa Maria del Fiore|Firenze, Italia|Cattedrale di Santa Maria del Fiore|1
Basilica di San Marco|Venezia, Italia|Basilica di San Marco|1
Tower Bridge|Londra, Regno Unito|Tower Bridge|1
Cattedrale di Notre-Dame|Parigi, Francia|Cattedrale di Notre-Dame|1
Arco di Trionfo|Parigi, Francia|Arco di Trionfo (Parigi)|1
Atomium|Bruxelles, Belgio|Atomium|2
Angkor Wat|Cambogia|Angkor Wat|2
Chichén Itzá|Messico|Chichén Itzá|2
Moai dell'Isola di Pasqua|Isola di Pasqua, Cile|Moai|2
Monte Rushmore|Dakota del Sud, Stati Uniti|Monte Rushmore|2
Empire State Building|New York, Stati Uniti|Empire State Building|1
Acropoli di Atene|Atene, Grecia|Acropoli di Atene|1
Basilica di Santa Sofia|Istanbul, Turchia|Santa Sofia (Istanbul)|2
Città Proibita|Pechino, Cina|Città Proibita|2
Porta di Brandeburgo|Berlino, Germania|Porta di Brandeburgo|1
Duomo di Colonia|Colonia, Germania|Duomo di Colonia|2
Torri Petronas|Kuala Lumpur, Malaysia|Torri Petronas|2
Cremlino di Mosca|Mosca, Russia|Cremlino di Mosca|2
Kinkaku-ji|Kyoto, Giappone|Kinkaku-ji|3
Uluru|Australia|Uluru|2
Cascate del Niagara|Canada e Stati Uniti|Cascate del Niagara|1
Monte Fuji|Giappone|Monte Fuji|1
Cervino|Italia e Svizzera|Cervino|2
Castel Sant'Angelo|Roma, Italia|Castel Sant'Angelo|1
Ponte dei Sospiri|Venezia, Italia|Ponte dei Sospiri|2
Piazza del Campo|Siena, Italia|Piazza del Campo|2
Torre di Londra|Londra, Regno Unito|Torre di Londra|2
Buckingham Palace|Londra, Regno Unito|Buckingham Palace|1
Mont-Saint-Michel|Normandia, Francia|Mont-Saint-Michel|2
Reggia di Versailles|Versailles, Francia|Reggia di Versailles|1
Santuario di Fushimi Inari|Kyoto, Giappone|Fushimi Inari-taisha|3
Abu Simbel|Egitto|Abu Simbel|3
`).map(([name, where, wiki, d]) => ({ name, where, wiki, d: Number(d) }));

  // Animali (foto da Wikimedia Commons): nome | voce di it.wikipedia | difficoltà
  D.animalPhotos = rows(`
Leone|Panthera leo|1
Tigre|Panthera tigris|1
Elefante africano|Loxodonta africana|1
Giraffa|Giraffa di Rothschild|1
Zebra|Equus quagga burchellii|1
Ippopotamo|Hippopotamus amphibius|1
Rinoceronte bianco|Ceratotherium simum|1
Ghepardo|Acinonyx jubatus|2
Leopardo|Panthera pardus|2
Giaguaro|Panthera onca|2
Orso polare|Ursus maritimus|1
Panda gigante|Ailuropoda melanoleuca|1
Koala|Phascolarctos cinereus|1
Canguro rosso|Macropus rufus|1
Ornitorinco|Ornithorhynchus anatinus|2
Pinguino imperatore|Aptenodytes forsteri|1
Fenicottero rosa|Phoenicopterus roseus|1
Pavone|Pavo cristatus|1
Aquila reale|Aquila chrysaetos|1
Gufo reale|Bubo bubo|2
Tucano toco|Ramphastos toco|1
Ara macao|Ara macao|2
Tursiope (delfino)|Tursiops truncatus|1
Megattera|Megaptera novaeangliae|2
Squalo bianco|Carcharodon carcharias|1
Polpo comune|Octopus vulgaris|1
Tartaruga verde|Chelonia mydas|2
Coccodrillo del Nilo|Crocodylus niloticus|1
Lupo|Canis lupus|1
Volpe rossa|Vulpes vulpes|1
Lince euroasiatica|Lynx lynx|2
Orso bruno|Ursus arctos|1
Alce|Alces alces|2
Renna|Rangifer tarandus|2
Bisonte americano|Bison bison|2
Gorilla occidentale|Gorilla gorilla|1
Scimpanzé|Pan troglodytes|1
Orango del Borneo|Pongo pygmaeus|2
Formichiere gigante|Myrmecophaga tridactyla|2
Armadillo a nove fasce|Dasypus novemcinctus|2
Riccio europeo|Erinaceus europaeus|1
Scoiattolo rosso|Sciurus vulgaris|1
Castoro europeo|Castor fiber|2
Lontra europea|Lutra lutra|2
Tasso|Meles meles|3
Dromedario|Camelus dromedarius|1
Lama|Lama glama|1
Struzzo|Struthio camelus|1
Lemure catta|Lemur catta|2
Suricato|Suricata suricatta|1
Facocero|Facocero|2
Iena macchiata|Crocuta crocuta|2
Okapi|Okapia johnstoni|3
Narvalo|Monodon monoceros|2
Tricheco|Odobenus rosmarus|1
Stambecco delle Alpi|Capra ibex|2
Camoscio|Rupicapra rupicapra|2
Marmotta alpina|Marmota marmota|2
Coccinella|Coccinella septempunctata|1
Farfalla monarca|Danaus plexippus|2
Pellicano comune|Pelecanus onocrotalus|2
Cigno reale|Cygnus olor|1
Cicogna bianca|Ciconia ciconia|2
Martin pescatore|Alcedo atthis|2
Axolotl|Ambystoma mexicanum|2
Capibara|Hydrochoerus hydrochaeris|2
Vombato comune|Vombatus ursinus|3
Panda rosso|Ailurus fulgens|2
Fennec|Vulpes zerda|2
Camaleonte velato|Chamaeleo calyptratus|2
`).map(([name, wiki, d]) => ({ name, wiki, d: Number(d) }));
})(typeof window !== 'undefined' ? window : globalThis);
