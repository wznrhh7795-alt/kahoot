// Bandiere — domande di solo testo in più per la categoria classica «bandiere» (extends): schemi, simboli, stelle,
// strisce, colori, bandiere simili, curiosità e simboli nazionali. Solo fatti verificati (fino al 2024).
(function (root) {
  'use strict';
  const D = (root.QZ_DATA = root.QZ_DATA || {});
  // Una riga = un elemento, colonne separate da «|».
  const rows = (s) => s.trim().split('\n').map((l) => l.split('|').map((x) => x.trim()));

  // ── Com'è composta la bandiera: Paese | schema | difficoltà ──
  const sch = (v, list) => list.trim().split('\n').map((l) => { const [name, d] = l.split('|'); return { name: name.trim(), d: +d, schema: v }; });
  const schemi = [
    ...sch('tre bande verticali', `
Francia|1
Italia|1
Irlanda|1
Belgio|1
Romania|2
Ciad|3
Mali|2
Nigeria|2
Guinea|3
Costa d'Avorio|2
Perù|2
Senegal|2
Camerun|3
Messico|1
Andorra|3
Moldavia|3
Canada|3
Mongolia|3
`),
    ...sch('tre bande orizzontali', `
Germania|1
Ungheria|1
Paesi Bassi|1
Russia|1
Bulgaria|2
Estonia|2
Lituania|2
Lettonia|3
Lussemburgo|2
Austria|1
Armenia|3
Bolivia|3
Colombia|2
Ecuador|3
Venezuela|3
Iran|2
Spagna|1
Egitto|2
Iraq|3
Yemen|3
Libia|3
Ghana|2
Etiopia|3
Gabon|3
Sierra Leone|3
Niger|3
Ruanda|3
Slovacchia|2
Slovenia|2
Croazia|2
Serbia|2
Paraguay|3
Honduras|3
El Salvador|3
Nicaragua|3
Argentina|2
`),
    ...sch('due bande orizzontali', `
Polonia|1
Indonesia|1
Monaco|2
Ucraina|1
Singapore|2
Haiti|3
Liechtenstein|3
`),
    ...sch('due bande verticali', `
Malta|2
Città del Vaticano|2
`),
    ...sch('la croce scandinava', `
Danimarca|1
Svezia|1
Norvegia|1
Finlandia|1
Islanda|2
`),
    ...sch('un disco su fondo unito', `
Giappone|1
Bangladesh|2
Palau|3
`),
    ...sch('l\'Union Jack nel cantone', `
Australia|1
Nuova Zelanda|1
Figi|2
Tuvalu|3
`),
  ];

  // ── Simbolo principale: Paese | simbolo | difficoltà ──
  const simboli = rows(`
Canada|una foglia d'acero|1
Libano|un cedro|2
Bhutan|un drago|2
Messico|un'aquila su un cactus che stringe un serpente|2
Uganda|una gru coronata|3
Zimbabwe|un uccello di pietra|3
Guatemala|un quetzal|3
Dominica|un pappagallo|3
Papua Nuova Guinea|un uccello del paradiso|3
Kiribati|una fregata sopra un sole nascente|3
Cipro|la sagoma dell'isola|2
Mozambico|un fucile Kalashnikov|3
Angola|un machete e mezza ruota dentata|3
Sri Lanka|un leone con una spada|2
Kenya|uno scudo masai con due lance|2
Albania|un'aquila bicipite|2
Serbia|un'aquila bicipite|3
Montenegro|un'aquila bicipite|3
Kazakistan|un'aquila delle steppe sotto un sole|3
Egitto|l'aquila di Saladino|2
Arabia Saudita|la professione di fede islamica e una spada|2
Brasile|un globo blu con il motto «Ordem e Progresso»|2
Corea del Sud|il taegeuk con quattro trigrammi|3
Israele|la stella di Davide|1
Giappone|un disco rosso su fondo bianco|1
Bangladesh|un disco rosso su fondo verde|2
Repubblica Dominicana|una Bibbia aperta|3
Haiti|una palma reale con cannoni e bandiere|3
Malta|la croce di San Giorgio|3
Cambogia|il tempio di Angkor Wat|2
Nepal|due triangoli sovrapposti|2
Città del Vaticano|le chiavi di San Pietro e la tiara|2
Argentina|il Sol de Mayo|3
Uruguay|il Sol de Mayo|3
Ecuador|un condor delle Ande|3
Spagna|le colonne d'Ercole|3
Portogallo|una sfera armillare|2
Andorra|due mucche|3
San Marino|tre torri|2
Slovacchia|una doppia croce su tre colli|3
Croazia|uno scudo a scacchi rossi e bianchi|2
Slovenia|il monte Triglav|3
Liechtenstein|una corona|3
Macedonia del Nord|un sole a otto raggi|2
`).map(([name, simbolo, d]) => ({ name, d: +d, simbolo }));

  // ── Numeri sulle bandiere ──
  const num = (s, key) => rows(s).map(([name, v, d]) => ({ name, d: +d, [key]: +v }));
  const stelle = num(`
Stati Uniti|50|1
Brasile|27|2
Cina|5|1
Venezuela|8|3
Nuova Zelanda|4|2
Australia|6|3
Vietnam|1|1
Cuba|1|1
Cile|1|1
Marocco|1|2
Ghana|1|2
Senegal|1|2
Camerun|1|3
Somalia|1|3
Turchia|1|1
Pakistan|1|2
Algeria|1|2
Tunisia|1|2
Panama|2|2
Honduras|5|3
Capo Verde|10|3
Dominica|10|3
Burundi|3|3
Grenada|7|3
Comore|4|3
Guinea Equatoriale|6|3
Kosovo|6|3
Isole Salomone|5|3
Papua Nuova Guinea|5|3
Samoa|5|3
Singapore|5|3
Uzbekistan|12|3
São Tomé e Príncipe|2|3
Giordania|1|3
Corea del Nord|1|2
Myanmar|1|3
Malesia|1|3
Liberia|1|2
Azerbaigian|1|3
`, 'stelle');
  const strisce = num(`
Stati Uniti|13|1
Malesia|14|3
Liberia|11|3
Grecia|9|2
Uruguay|9|3
Cuba|5|2
Thailandia|5|2
Togo|5|3
Uganda|6|3
Zimbabwe|7|3
Mauritius|4|3
Germania|3|1
Paesi Bassi|3|1
Russia|3|1
Austria|3|1
Ungheria|3|1
Bulgaria|3|2
Spagna|3|1
Estonia|3|2
Lituania|3|2
Lettonia|3|2
Argentina|3|2
Colombia|3|2
Bolivia|3|3
Lussemburgo|3|2
Armenia|3|3
Polonia|2|1
Indonesia|2|1
Monaco|2|2
Ucraina|2|1
Singapore|2|2
Haiti|2|3
Liechtenstein|2|3
`, 'strisce');
  const adozioni = num(`
Canada|1965|1
India|1947|2
Israele|1948|2
Cina|1949|2
Sudafrica|1994|2
Brasile|1889|3
Nepal|1962|3
Kosovo|2008|2
Bangladesh|1972|3
Pakistan|1947|3
Kazakistan|1992|3
Libano|1943|3
Turchia|1936|3
Nuova Zelanda|1902|3
Sudan|1970|3
Namibia|1990|3
Zimbabwe|1980|3
Giamaica|1962|3
Barbados|1966|3
Libia|2011|3
Sud Sudan|2011|3
Stati Uniti|1960|2
Cipro|1960|3
Kenya|1963|3
Tanzania|1964|3
Malta|1964|3
Nigeria|1960|3
Georgia|2004|3
Francia|1794|2
Regno Unito|1801|3
Norvegia|1821|3
Finlandia|1918|3
Islanda|1944|3
`, 'anno');

  // ── Quiz scritti a mano ──
  const Q = (q, a, wrong, d) => ({ q, a, wrong, d });
  const quiz = [
    // Simboli sulle bandiere
    Q('Quale Paese ha una foglia d\'acero rossa al centro della bandiera?', 'Canada', ['Stati Uniti', 'Svizzera', 'Danimarca'], 1),
    Q('Quale Paese ha un cedro verde al centro della bandiera?', 'Libano', ['Siria', 'Giordania', 'Cipro'], 2),
    Q('Quale Stato sovrano ha un drago sulla bandiera?', 'Bhutan', ['Cina', 'Vietnam', 'Giappone'], 2),
    Q('Quale Paese ha un fucile Kalashnikov sulla bandiera?', 'Mozambico', ['Angola', 'Zimbabwe', 'Namibia'], 3),
    Q('Quale Paese ha l\'immagine di un tempio, Angkor Wat, sulla bandiera?', 'Cambogia', ['Thailandia', 'Laos', 'Myanmar'], 2),
    Q('Quale Paese ha l\'unica bandiera nazionale con la Bibbia aperta?', 'Repubblica Dominicana', ['Haiti', 'Cuba', 'Giamaica'], 3),
    Q('Quale animale compare sulla bandiera dello Sri Lanka?', 'Un leone', ['Un elefante', 'Una tigre', 'Un cobra'], 2),
    Q('Quale uccello compare sulla bandiera della Dominica?', 'Un pappagallo', ['Un tucano', 'Un pellicano', 'Una gru'], 3),
    Q('Quale Paese ha sulla bandiera la sagoma della sua isola?', 'Cipro', ['Malta', 'Islanda', 'Irlanda'], 2),
    Q('Quale Paese ha un\'aquila che sta su un cactus e stringe un serpente?', 'Messico', ['Colombia', 'Bolivia', 'Perù'], 2),
    Q('Quale Paese ha sulla bandiera una gru coronata?', 'Uganda', ['Kenya', 'Tanzania', 'Ruanda'], 3),
    Q('Quale animale compare sullo stemma e sulla bandiera dell\'Albania?', 'Un\'aquila bicipite', ['Un leone', 'Un lupo', 'Un\'aquila a una testa'], 2),
    Q('Quale Paese ha sulla bandiera una scritta sacra dell\'islam e una spada su fondo verde?', 'Arabia Saudita', ['Pakistan', 'Libia', 'Iraq'], 2),
    Q('Quali oggetti compaiono sulla bandiera del Kenya?', 'Uno scudo masai e due lance', ['Un arco e una freccia', 'Una torcia e un libro', 'Un machete e una zappa'], 2),
    Q('Che cosa è raffigurato sulla bandiera del Brasile?', 'Un globo blu con le stelle e il motto «Ordem e Progresso»', ['Un\'aquila su un cactus', 'Un leone con una spada', 'Un sole nascente con volto'], 2),
    Q('Quale forma ha il simbolo al centro della bandiera di Israele?', 'Stella di Davide a sei punte', ['Stella a cinque punte', 'Mezzaluna e stella', 'Croce'], 1),
    Q('Che cosa significa «Sol de Mayo», il sole con il volto sulle bandiere di Argentina e Uruguay?', 'Sole di maggio', ['Sole dell\'indipendenza', 'Sole del Sud', 'Sole d\'oro'], 3),
    Q('Come si chiama il simbolo giallo sul lato dell\'asta della bandiera mongola?', 'Soyombo', ['Yin e yang', 'Dorje', 'Ensō'], 3),
    Q('Come si chiama la ruota blu al centro della bandiera indiana?', 'Chakra di Ashoka', ['Dharma di Buddha', 'Sudarshana', 'Mandala'], 2),
    Q('Come si chiama la bandiera del Giappone, un disco rosso su fondo bianco?', 'Hinomaru', ['Kimigayo', 'Sakura', 'Nippon'], 3),
    Q('Quale santo dà il nome alla croce rossa su fondo bianco della bandiera inglese?', 'San Giorgio', ['Sant\'Andrea', 'San Patrizio', 'San Davide'], 2),
    Q('Quali tre santi patroni sono rappresentati dalle croci dell\'Union Jack?', 'San Giorgio, Sant\'Andrea e San Patrizio', ['San Giorgio, San Davide e San Patrizio', 'San Giorgio, Sant\'Andrea e San Davide', 'San Giorgio, San Patrizio e San Giovanni'], 3),
    Q('Quale Paese ha una bandiera blu con una croce bianca diagonale, la croce di Sant\'Andrea?', 'Scozia', ['Galles', 'Irlanda del Nord', 'Inghilterra'], 2),
    Q('Quale costellazione compare sulle bandiere di Australia e Nuova Zelanda?', 'Croce del Sud', ['Orsa Maggiore', 'Orione', 'Cassiopea'], 1),
    Q('Che cosa rappresentano le 27 stelle della bandiera del Brasile?', 'Gli Stati e il Distretto Federale', ['I presidenti', 'I fiumi principali', 'Le regioni storiche'], 2),
    Q('Che cosa rappresentano le 50 stelle della bandiera degli Stati Uniti?', 'Gli Stati dell\'Unione', ['Le contee', 'I presidenti', 'Le città principali'], 1),
    Q('Che cosa rappresentano le 13 strisce della bandiera degli Stati Uniti?', 'Le tredici colonie originarie', ['I primi tredici presidenti', 'Gli Stati del Sud', 'Gli anni della guerra d\'indipendenza'], 2),
    Q('Che cosa rappresenta la grande stella della bandiera cinese?', 'Il Partito Comunista Cinese', ['L\'imperatore', 'La Grande Muraglia', 'Il fiume Giallo'], 3),
    Q('A quale oggetto religioso si ispirano le strisce blu della bandiera di Israele?', 'Al tallit, lo scialle di preghiera', ['Alla menorah', 'Allo shofar', 'Alla kippah'], 3),
    Q('A che cosa corrispondono le nove strisce della bandiera greca, secondo la tradizione?', 'Alle sillabe del motto «Libertà o morte»', ['Alle nove isole principali', 'Alle nove regioni storiche', 'Alle nove battaglie dell\'indipendenza'], 3),
    Q('Che cosa rappresentano i colori blu e giallo della bandiera ucraina?', 'Il cielo e i campi di grano', ['Il mare e la sabbia', 'Il fiume e il sole', 'La neve e il fuoco'], 1),
    Q('Quali sono i tre colori «panafricani» ispirati alla bandiera dell\'Etiopia?', 'Verde, giallo e rosso', ['Blu, giallo e rosso', 'Blu, bianco e rosso', 'Verde, bianco e arancione'], 2),
    Q('Quali colori della bandiera francese erano quelli della città di Parigi?', 'Blu e rosso', ['Bianco e blu', 'Bianco e rosso', 'Rosso e giallo'], 3),
    // Colori
    Q('Quali sono i colori della bandiera dell\'Irlanda, da sinistra verso destra?', 'Verde, bianco e arancione', ['Arancione, bianco e verde', 'Verde, bianco e rosso', 'Verde, giallo e arancione'], 1),
    Q('Quali sono i colori della bandiera indiana, dall\'alto verso il basso?', 'Zafferano, bianco e verde', ['Verde, bianco e zafferano', 'Rosso, bianco e verde', 'Arancione, giallo e verde'], 1),
    Q('Quali sono i colori della bandiera tedesca, dall\'alto verso il basso?', 'Nero, rosso e oro', ['Rosso, nero e oro', 'Oro, rosso e nero', 'Nero, bianco e rosso'], 1),
    Q('Quali sono i colori della bandiera belga, da sinistra verso destra?', 'Nero, giallo e rosso', ['Blu, bianco e rosso', 'Nero, rosso e giallo', 'Verde, giallo e rosso'], 1),
    Q('Quali sono i colori della bandiera spagnola?', 'Rosso e giallo', ['Rosso e bianco', 'Giallo e blu', 'Rosso e blu'], 1),
    Q('Quali sono i colori della bandiera del Portogallo?', 'Verde e rosso', ['Blu e rosso', 'Verde e bianco', 'Rosso e giallo'], 1),
    Q('Quali sono i colori della bandiera dei Paesi Bassi, dall\'alto verso il basso?', 'Rosso, bianco e blu', ['Blu, bianco e rosso', 'Arancione, bianco e blu', 'Rosso, blu e bianco'], 1),
    Q('Quali sono i colori della bandiera ungherese, dall\'alto verso il basso?', 'Rosso, bianco e verde', ['Verde, bianco e rosso', 'Bianco, rosso e verde', 'Rosso, giallo e verde'], 2),
    Q('Quali sono i colori della bandiera bulgara, dall\'alto verso il basso?', 'Bianco, verde e rosso', ['Rosso, bianco e verde', 'Bianco, rosso e verde', 'Verde, bianco e rosso'], 2),
    Q('Quali sono i colori della bandiera romena, da sinistra verso destra?', 'Blu, giallo e rosso', ['Rosso, giallo e blu', 'Blu, bianco e rosso', 'Verde, giallo e rosso'], 2),
    Q('Quali sono i colori della bandiera lituana, dall\'alto verso il basso?', 'Giallo, verde e rosso', ['Rosso, verde e giallo', 'Verde, giallo e rosso', 'Giallo, rosso e verde'], 3),
    Q('Quali sono i colori della bandiera estone, dall\'alto verso il basso?', 'Blu, nero e bianco', ['Bianco, nero e blu', 'Nero, blu e bianco', 'Blu, bianco e nero'], 3),
    Q('Quali sono i colori della bandiera colombiana, dall\'alto verso il basso?', 'Giallo, blu e rosso', ['Rosso, blu e giallo', 'Blu, giallo e rosso', 'Giallo, rosso e blu'], 2),
    Q('Quali sono i colori della bandiera dell\'Ucraina, dall\'alto verso il basso?', 'Azzurro e giallo', ['Giallo e azzurro', 'Blu e rosso', 'Verde e giallo'], 1),
    Q('Quale di queste bandiere NON usa il verde, il bianco e il rosso?', 'Paesi Bassi', ['Ungheria', 'Bulgaria', 'Iran'], 2),
    Q('Quale di queste bandiere è solo rossa e bianca?', 'Giappone', ['Svezia', 'Brasile', 'Grecia'], 1),
    Q('Quale di queste bandiere NON ha il colore blu?', 'Giappone', ['Francia', 'Grecia', 'Stati Uniti'], 1),
    Q('Quale di queste bandiere NON ha il colore rosso?', 'Grecia', ['Francia', 'Stati Uniti', 'Paesi Bassi'], 2),
    Q('Quale di queste bandiere NON ha il colore verde?', 'Francia', ['Italia', 'Messico', 'Portogallo'], 1),
    Q('Fino al 2011 quale Paese aveva una bandiera completamente verde?', 'Libia', ['Arabia Saudita', 'Algeria', 'Pakistan'], 3),
    // Bandiere simili
    Q('Quali due Paesi hanno bandiere quasi identiche, con il rosso sopra e il bianco sotto?', 'Indonesia e Monaco', ['Polonia e Indonesia', 'Monaco e Polonia', 'Austria e Perù'], 2),
    Q('Quale Paese ha una bandiera con il bianco sopra e il rosso sotto?', 'Polonia', ['Indonesia', 'Monaco', 'Singapore'], 1),
    Q('Quale Paese africano ha una bandiera che è l\'inverso di quella irlandese, con l\'arancione a sinistra?', 'Costa d\'Avorio', ['Nigeria', 'Guinea', 'Mali'], 2),
    Q('Quale Paese ha una bandiera quasi uguale a quella della Romania, ma con un blu più scuro?', 'Ciad', ['Mali', 'Bulgaria', 'Belgio'], 3),
    Q('Quale bandiera è molto simile a quella dei Paesi Bassi, ma ha un azzurro chiaro al posto del blu scuro?', 'Lussemburgo', ['Francia', 'Islanda', 'Cile'], 2),
    Q('Quale bandiera nordica è blu con una croce rossa bordata di bianco?', 'Islanda', ['Norvegia', 'Finlandia', 'Svezia'], 2),
    Q('Quale bandiera nordica è rossa con una croce blu bordata di bianco?', 'Norvegia', ['Danimarca', 'Islanda', 'Finlandia'], 2),
    Q('Quale bandiera nordica è bianca con una croce blu?', 'Finlandia', ['Svezia', 'Norvegia', 'Danimarca'], 1),
    Q('Quale Paese ha una bandiera blu e gialla con la croce scandinava?', 'Svezia', ['Ucraina', 'Finlandia', 'Norvegia'], 1),
    Q('Quale bandiera ha quattro stelle rosse con bordo bianco accanto all\'Union Jack?', 'Nuova Zelanda', ['Australia', 'Figi', 'Tuvalu'], 2),
    Q('Quale bandiera ha stelle bianche accanto all\'Union Jack su fondo blu scuro e una grande stella sotto di esso?', 'Australia', ['Nuova Zelanda', 'Figi', 'Tuvalu'], 2),
    Q('Quale Paese ha una bandiera verde-giallo-rossa con una stella verde al centro della banda gialla?', 'Senegal', ['Mali', 'Guinea', 'Bolivia'], 2),
    Q('Quale dei Paesi con bandiera gialla, blu e rossa ha otto stelle bianche sulla banda blu?', 'Venezuela', ['Colombia', 'Ecuador', 'Perù'], 3),
    Q('Quale bandiera ha bande rossa, bianca e nera con un\'aquila dorata al centro?', 'Egitto', ['Yemen', 'Iraq', 'Sudan'], 2),
    Q('Quale Paese africano ha una bandiera simile a quella americana, con 11 strisce e una sola stella?', 'Liberia', ['Ghana', 'Sierra Leone', 'Costa d\'Avorio'], 2),
    Q('Quale Paese asiatico ha una bandiera con 14 strisce e una mezzaluna con stella?', 'Malesia', ['Indonesia', 'Singapore', 'Pakistan'], 3),
    Q('Quale bandiera rossa ha una mezzaluna e una stella bianche?', 'Turchia', ['Algeria', 'Marocco', 'Libia'], 1),
    Q('Quale Paese ha una bandiera bianca con una croce rossa e quattro piccole croci negli angoli?', 'Georgia', ['Inghilterra', 'Danimarca', 'Svizzera'], 3),
    Q('Quale elemento distingue la bandiera messicana da quella italiana?', 'Lo stemma al centro', ['Il colore della banda centrale', 'Le bande orizzontali', 'Una stella'], 1),
    // Forme e record
    Q('Qual è l\'unica bandiera nazionale che non ha forma quadrangolare?', 'Nepal', ['Bhutan', 'Svizzera', 'Sri Lanka'], 2),
    Q('Quali due Stati hanno bandiere quadrate?', 'Svizzera e Città del Vaticano', ['Svizzera e Austria', 'Danimarca e Svizzera', 'Malta e Città del Vaticano'], 2),
    Q('Quale Paese vanta la bandiera nazionale più antica ancora in uso, il «Dannebrog»?', 'Danimarca', ['Svezia', 'Regno Unito', 'Francia'], 2),
    Q('Come è soprannominata la bandiera degli Stati Uniti?', 'Stars and Stripes', ['Union Jack', 'Tricolore', 'Jolly Roger'], 1),
    Q('Come si chiama la bandiera nera con teschio e tibie incrociate dei pirati?', 'Jolly Roger', ['Union Jack', 'Old Glory', 'Dannebrog'], 1),
    Q('Come si chiama la bandiera del Regno Unito?', 'Union Jack', ['Stars and Stripes', 'Dannebrog', 'Maple Leaf'], 1),
    Q('Come si chiama la disciplina che studia le bandiere?', 'Vessillologia', ['Araldica', 'Sfragistica', 'Numismatica'], 2),
    Q('Come si chiama l\'angolo in alto vicino all\'asta di una bandiera?', 'Cantone', ['Drappo', 'Asta', 'Gonfalone'], 3),
    Q('In quale città nacque il Tricolore italiano nel 1797?', 'Reggio Emilia', ['Milano', 'Torino', 'Bologna'], 3),
    Q('In quale giorno si celebra in Italia la Giornata nazionale della Bandiera?', '7 gennaio', ['2 giugno', '4 novembre', '25 aprile'], 3),
    Q('Quali colori ha la bandiera italiana, da sinistra verso destra?', 'Verde, bianco e rosso', ['Rosso, bianco e verde', 'Verde, rosso e bianco', 'Bianco, rosso e verde'], 1),
    Q('Quale Stato ora scomparso aveva una bandiera rossa con falce, martello e stella?', 'Unione Sovietica', ['Jugoslavia', 'Cecoslovacchia', 'Germania Est'], 1),
    Q('Quale emblema compare sulla bandiera delle Nazioni Unite?', 'Un planisfero circondato da rami d\'ulivo', ['Una colomba bianca', 'Una torcia', 'Una bilancia'], 2),
    Q('Quante stelle ha la bandiera dell\'Unione europea?', '12', ['27', '15', '28'], 1),
    Q('Quanti anelli compaiono sulla bandiera olimpica?', 'Cinque', ['Quattro', 'Sei', 'Sette'], 1),
    Q('Quale bandiera si ottiene invertendo i colori di quella svizzera?', 'Quella della Croce Rossa', ['Quella della Svezia', 'Quella dell\'ONU', 'Quella della Croce Verde'], 2),
    // Bandiere nella vita quotidiana
    Q('Che cosa significa una bandiera issata a mezz\'asta?', 'Lutto', ['Vittoria', 'Resa', 'Festa'], 1),
    Q('Che cosa significa tradizionalmente una bandiera bianca sventolata in guerra?', 'Resa o richiesta di tregua', ['Attacco', 'Vittoria', 'Lutto'], 1),
    Q('Che cosa segnala la bandiera a scacchi bianca e nera in una gara automobilistica?', 'La fine della gara', ['L\'inizio della gara', 'Un pericolo in pista', 'Un incidente'], 1),
    Q('Che cosa significa la bandiera rossa in Formula 1?', 'La gara è sospesa', ['Ultimo giro', 'Pericolo in pista', 'Fine della gara'], 2),
    Q('Che cosa significa una bandiera rossa sulla spiaggia?', 'Divieto di balneazione', ['Spiaggia gratuita', 'Presenza di bagnini', 'Acqua molto calda'], 1),
    Q('A che cosa serve la «Bandiera Blu» assegnata a spiagge e porti?', 'Premia la qualità ambientale', ['Segnala il divieto di balneazione', 'Segnala la presenza di meduse', 'Indica un porto militare'], 2),
    Q('Quale bandiera fu piantata sulla Luna nel 1969 dagli astronauti dell\'Apollo 11?', 'Quella degli Stati Uniti', ['Quella dell\'ONU', 'Quella della NASA', 'Quella dell\'URSS'], 1),
    Q('Di quali colori sono gli anelli della bandiera olimpica?', 'Blu, giallo, nero, verde e rosso', ['Blu, giallo, bianco, verde e rosso', 'Blu, arancione, nero, verde e rosso', 'Azzurro, giallo, nero, viola e rosso'], 2),
    // Bandiere italiane e storiche
    Q('Quale regione italiana ha una bandiera bianca con la croce rossa e quattro teste di moro?', 'Sardegna', ['Sicilia', 'Corsica', 'Liguria'], 1),
    Q('Quale simbolo a tre gambe compare sulla bandiera della Sicilia?', 'La Trinacria', ['Il Tridente', 'La Triquetra', 'Il Trifoglio'], 2),
    Q('Quale animale compare sulla bandiera della Repubblica di Venezia?', 'Il leone alato', ['L\'aquila', 'Il lupo', 'Il toro'], 1),
    Q('Quale fiore compare nello stemma di Firenze?', 'Il giglio', ['La rosa', 'Il tulipano', 'La margherita'], 1),
    Q('Quali due rami circondano la stella nell\'emblema della Repubblica italiana?', 'Ulivo e quercia', ['Alloro e quercia', 'Ulivo e alloro', 'Palma e ulivo'], 2),
    Q('Come si chiama la stella a cinque punte, simbolo dell\'Italia?', 'Stella d\'Italia', ['Stella polare', 'Stella di Savoia', 'Stella dei Mille'], 2),
    // Simboli nazionali
    Q('Quale pianta è il simbolo nazionale dell\'Irlanda?', 'Il trifoglio', ['Il cardo', 'Il giglio', 'La rosa'], 1),
    Q('Quale pianta è simbolo della Scozia?', 'Il cardo', ['Il trifoglio', 'La rosa', 'Il narciso'], 2),
    Q('Quale fiore giallo è simbolo del Galles?', 'Il narciso', ['La rosa', 'Il cardo', 'Il trifoglio'], 3),
    Q('Quale fiore è simbolo dell\'Inghilterra?', 'La rosa', ['Il cardo', 'Il narciso', 'Il trifoglio'], 1),
    Q('Quale animale è simbolo nazionale del Canada?', 'Il castoro', ['L\'alce', 'L\'orso grizzly', 'Il lupo'], 2),
    Q('Quale uccello è simbolo nazionale degli Stati Uniti?', 'L\'aquila calva', ['Il tacchino', 'Il falco', 'Il pellicano'], 1),
    Q('Quali due animali sostengono lo stemma dell\'Australia?', 'Canguro ed emù', ['Koala e wombat', 'Canguro e koala', 'Emù e ornitorinco'], 2),
    Q('Quale uccello che non vola è simbolo della Nuova Zelanda?', 'Kiwi', ['Emù', 'Struzzo', 'Pinguino'], 1),
    Q('Quale animale è simbolo della Francia?', 'Il gallo', ['L\'aquila', 'Il leone', 'L\'orso'], 1),
    Q('Quale animale è il simbolo nazionale dell\'India?', 'La tigre del Bengala', ['Il rinoceronte', 'Il leone', 'Il cobra'], 2),
    Q('Quale uccello è simbolo del Guatemala e dà il nome alla sua moneta?', 'Quetzal', ['Condor', 'Tucano', 'Colibrì'], 2),
    Q('Quali due animali sostengono lo stemma del Cile?', 'Condor e huemul', ['Puma e lama', 'Aquila e puma', 'Lama e condor'], 3),
    Q('Quale fiore è il sigillo imperiale giapponese?', 'Il crisantemo', ['Il ciliegio', 'La peonia', 'Il loto'], 3),
    Q('Quale fiore è simbolo nazionale del Sudafrica?', 'La protea', ['La rosa', 'Il girasole', 'L\'orchidea'], 3),
    Q('Quale simbolo compare nello stemma dello Stato di Israele?', 'La menorah', ['Il cedro', 'Il leone', 'La stella di Davide da sola'], 2),
    Q('Quale pianta è simbolo del Libano?', 'Il cedro', ['L\'ulivo', 'La palma', 'Il pino'], 1),
    Q('Quale uccello è sullo stemma dell\'Ecuador e sulla sua bandiera di Stato?', 'Il condor', ['L\'aquila', 'Il pappagallo', 'Il colibrì'], 3),
    Q('Quale piccolo uccello di pietra è il simbolo dello Zimbabwe?', 'L\'uccello di Zimbabwe', ['Il gufo di Atena', 'La fenice', 'Il falco di Horus'], 3),
  ];

  // ── Vero o falso (le affermazioni false hanno la spiegazione) ──
  const TF = (q, a, d, why) => (why ? { q, a, d, why } : { q, a, d });
  const tf = [
    TF('La bandiera del Canada ha una foglia d\'acero rossa su fondo bianco tra due bande rosse.', true, 1),
    TF('La bandiera del Giappone è un disco rosso su fondo bianco.', true, 1),
    TF('La bandiera della Svizzera è rettangolare e molto allungata.', false, 1, 'È quadrata: la croce bianca è su fondo rosso.'),
    TF('La Città del Vaticano e la Svizzera hanno entrambe una bandiera quadrata.', true, 2),
    TF('La bandiera del Nepal è l\'unica bandiera nazionale non quadrangolare.', true, 2),
    TF('La bandiera della Danimarca è bianca con una croce rossa.', false, 1, 'È rossa con una croce scandinava bianca.'),
    TF('Il Dannebrog danese è considerato la più antica bandiera nazionale ancora in uso.', true, 2),
    TF('La bandiera finlandese è bianca con una croce blu.', true, 1),
    TF('La bandiera della Svezia è blu con una croce gialla.', true, 1),
    TF('La bandiera della Norvegia ha una croce blu bordata di bianco su fondo rosso.', true, 2),
    TF('La bandiera dell\'Islanda è rossa con una croce blu.', false, 2, 'È blu con una croce rossa bordata di bianco.'),
    TF('La bandiera dell\'Irlanda è verde, bianca e arancione.', true, 1),
    TF('La bandiera della Costa d\'Avorio ha i colori di quella irlandese in ordine inverso.', true, 2),
    TF('La bandiera dell\'Indonesia è rossa e bianca.', true, 1),
    TF('La bandiera della Polonia è rossa sopra e bianca sotto.', false, 1, 'È bianca sopra e rossa sotto.'),
    TF('Le bandiere di Indonesia e Monaco sono quasi identiche.', true, 2),
    TF('La bandiera del Lussemburgo ha le stesse tre bande di quella olandese, ma con un azzurro più chiaro.', true, 2),
    TF('La bandiera dell\'Austria è rossa, bianca e rossa.', true, 1),
    TF('La bandiera della Francia ha bande orizzontali.', false, 1, 'Le tre bande del tricolore francese sono verticali.'),
    TF('La bandiera della Germania è nera, rossa e oro, dall\'alto verso il basso.', true, 1),
    TF('La bandiera dell\'Italia ha la banda bianca al centro.', true, 1),
    TF('La bandiera del Messico è uguale a quella italiana.', false, 1, 'Ha gli stessi colori ma, al centro, lo stemma con l\'aquila.'),
    TF('La bandiera dell\'India ha una ruota blu al centro.', true, 1),
    TF('La ruota al centro della bandiera indiana ha 24 raggi.', true, 3),
    TF('La bandiera del Pakistan è verde e bianca con una mezzaluna e una stella.', true, 2),
    TF('La bandiera della Turchia è rossa con una mezzaluna e una stella bianche.', true, 1),
    TF('La bandiera del Brasile ha un\'aquila al centro.', false, 1, 'Al centro ha un globo blu con il motto «Ordem e Progresso».'),
    TF('La bandiera del Brasile ha 27 stelle.', true, 3),
    TF('La bandiera degli Stati Uniti ha 50 stelle e 13 strisce.', true, 1),
    TF('La bandiera della Cina è rossa con cinque stelle gialle.', true, 1),
    TF('La bandiera del Vietnam è rossa con una stella gialla a cinque punte.', true, 1),
    TF('La bandiera di Cuba ha una stella bianca su un triangolo rosso.', true, 2),
    TF('La bandiera del Cile ha una stella bianca su un quadrato blu.', true, 2),
    TF('La bandiera di Israele ha una stella a sei punte.', true, 1),
    TF('La bandiera dell\'Australia contiene l\'Union Jack.', true, 1),
    TF('La bandiera della Nuova Zelanda ha stelle rosse con bordo bianco.', true, 2),
    TF('La bandiera della Svezia contiene l\'Union Jack.', false, 1, 'L\'Union Jack compare solo sulle bandiere di alcuni Paesi del Commonwealth, come Australia e Nuova Zelanda.'),
    TF('L\'Union Jack unisce le croci di San Giorgio, Sant\'Andrea e San Patrizio.', true, 3),
    TF('Il Jolly Roger è la bandiera storica dei pirati.', true, 1),
    TF('La bandiera olimpica ha cinque anelli.', true, 1),
    TF('Gli anelli della bandiera olimpica sono tutti dello stesso colore.', false, 1, 'Sono di cinque colori: blu, giallo, nero, verde e rosso.'),
    TF('La bandiera dell\'Unione europea ha dodici stelle gialle in cerchio.', true, 1),
    TF('La bandiera dell\'Unione europea ha una stella per ogni Paese membro.', false, 2, 'Ha sempre dodici stelle, simbolo di perfezione e unità, a prescindere dal numero dei membri.'),
    TF('Una bandiera a mezz\'asta indica lutto.', true, 1),
    TF('La bandiera bianca è un segno di resa o di richiesta di tregua.', true, 1),
    TF('La bandiera a scacchi in Formula 1 segnala la fine della gara.', true, 1),
    TF('In Formula 1 la bandiera rossa indica che la gara è sospesa.', true, 2),
    TF('Gli astronauti dell\'Apollo 11 piantarono sulla Luna la bandiera degli Stati Uniti.', true, 1),
    TF('La bandiera del Libano ha un cedro verde.', true, 2),
    TF('La bandiera del Bhutan ha un drago.', true, 2),
    TF('La bandiera della Cambogia raffigura un tempio.', true, 2),
    TF('La bandiera del Mozambico mostra un fucile Kalashnikov.', true, 3),
    TF('La bandiera dell\'Uganda ha un leone al centro.', false, 3, 'Ha al centro una gru coronata.'),
    TF('La bandiera dello Sri Lanka ha un leone con una spada.', true, 2),
    TF('La bandiera dell\'Albania ha un\'aquila a due teste.', true, 2),
    TF('La bandiera del Kazakistan ha un sole e un\'aquila.', true, 3),
    TF('La bandiera di Cipro mostra la sagoma dell\'isola.', true, 2),
    TF('La bandiera di Malta ha la croce di San Giorgio in un angolo.', true, 3),
    TF('La bandiera della Grecia ha nove strisce.', true, 2),
    TF('La bandiera della Grecia ha una croce bianca su fondo blu nell\'angolo vicino all\'asta.', true, 2),
    TF('La bandiera della Spagna è rossa, gialla e rossa.', true, 1),
    TF('La bandiera del Portogallo è verde e rossa.', true, 1),
    TF('La bandiera del Portogallo ha una sfera armillare.', true, 3),
    TF('La bandiera dell\'Ucraina è azzurra sopra e gialla sotto.', true, 1),
    TF('La bandiera della Romania e quella del Ciad sono molto simili.', true, 2),
    TF('La bandiera dell\'Argentina ha un sole con il volto al centro.', true, 2),
    TF('La bandiera dell\'Uruguay ha nove strisce orizzontali.', true, 3),
    TF('La bandiera della Malesia ha 14 strisce.', true, 3),
    TF('La bandiera della Liberia ricorda quella degli Stati Uniti.', true, 2),
    TF('La bandiera della Thailandia ha cinque bande orizzontali.', true, 2),
    TF('La bandiera dell\'Arabia Saudita porta la professione di fede islamica.', true, 2),
    TF('La bandiera del Sudafrica ha una grande «Y» coricata e sei colori.', true, 3),
    TF('La bandiera di Cuba ha cinque strisce.', true, 2),
    TF('La bandiera della Bolivia è rossa, gialla e verde.', true, 3),
    TF('La bandiera della Colombia ha le bande orizzontali gialla, blu e rossa.', true, 2),
    TF('La bandiera dell\'Egitto ha un\'aquila dorata al centro.', true, 2),
    TF('La bandiera del Ghana ha una stella nera.', true, 3),
    TF('La bandiera del Senegal ha una stella verde.', true, 2),
    TF('La bandiera del Camerun ha una stella gialla.', true, 3),
    TF('La bandiera della Costa Rica è identica a quella della Thailandia.', false, 2, 'Hanno le stesse cinque bande, ma con blu e rosso scambiati: la Costa Rica ha il blu agli estremi.'),
    TF('Il Tricolore italiano nacque a Reggio Emilia nel 1797.', true, 3),
    TF('Il 7 gennaio si celebra in Italia la Giornata nazionale della Bandiera.', true, 3),
    TF('La bandiera italiana ha tre bande orizzontali.', false, 1, 'Le tre bande sono verticali.'),
    TF('La bandiera dei Paesi Bassi è rossa, bianca e blu.', true, 1),
    TF('La bandiera della Russia è bianca, blu e rossa.', true, 1),
    TF('La bandiera dell\'Ungheria è rossa, bianca e verde.', true, 2),
    TF('La bandiera dell\'Ucraina è identica a quella della Svezia.', false, 1, 'Condividono il blu e il giallo, ma quella svedese ha una croce scandinava.'),
    TF('La bandiera della Libia fu completamente verde dal 1977 al 2011.', true, 3),
    TF('La bandiera dell\'ONU è blu con un planisfero circondato da rami d\'ulivo.', true, 2),
    TF('La bandiera della Croce Rossa si ottiene invertendo i colori di quella svizzera.', true, 2),
    TF('La vessillologia è la disciplina che studia le bandiere.', true, 2),
    TF('Il Sol de Mayo compare sulle bandiere di Argentina e Uruguay.', true, 3),
    TF('Il simbolo del Soyombo compare sulla bandiera della Mongolia.', true, 3),
    TF('Il cedro è il simbolo nazionale del Libano.', true, 1),
    TF('Il trifoglio è simbolo dell\'Irlanda.', true, 1),
    TF('Il cardo è un simbolo della Scozia.', true, 2),
    TF('Il kiwi è l\'uccello simbolo del Canada.', false, 1, 'Il kiwi è simbolo della Nuova Zelanda.'),
    TF('Il castoro è un simbolo nazionale del Canada.', true, 2),
    TF('L\'aquila calva è il simbolo degli Stati Uniti.', true, 1),
    TF('Il gallo è un simbolo della Francia.', true, 1),
    TF('Canguro ed emù sostengono lo stemma dell\'Australia.', true, 2),
    TF('La Trinacria è il simbolo della Sicilia.', true, 1),
    TF('I quattro mori sono il simbolo della Sardegna.', true, 1),
    TF('Il leone alato è il simbolo di Venezia.', true, 1),
    TF('Il giglio è il simbolo di Firenze.', true, 1),
  ];

  // ── Metti in ordine ──
  const order = [
    { q: 'Metti in ordine i colori della bandiera italiana, da sinistra', items: ['Verde', 'Bianco', 'Rosso'], d: 1 },
    { q: 'Metti in ordine i colori della bandiera tedesca, dall\'alto', items: ['Nero', 'Rosso', 'Oro'], d: 1 },
    { q: 'Metti in ordine i colori della bandiera francese, da sinistra', items: ['Blu', 'Bianco', 'Rosso'], d: 1 },
    { q: 'Metti in ordine i colori della bandiera irlandese, da sinistra', items: ['Verde', 'Bianco', 'Arancione'], d: 1 },
    { q: 'Metti in ordine i colori della bandiera indiana, dall\'alto', items: ['Zafferano', 'Bianco', 'Verde'], d: 1 },
    { q: 'Metti in ordine i colori della bandiera dei Paesi Bassi, dall\'alto', items: ['Rosso', 'Bianco', 'Blu'], d: 1 },
    { q: 'Metti in ordine i colori della bandiera belga, da sinistra', items: ['Nero', 'Giallo', 'Rosso'], d: 1 },
    { q: 'Metti in ordine i colori della bandiera russa, dall\'alto', items: ['Bianco', 'Blu', 'Rosso'], d: 1 },
    { q: 'Metti in ordine i colori della bandiera ungherese, dall\'alto', items: ['Rosso', 'Bianco', 'Verde'], d: 2 },
    { q: 'Metti in ordine i colori della bandiera bulgara, dall\'alto', items: ['Bianco', 'Verde', 'Rosso'], d: 2 },
    { q: 'Metti in ordine i colori della bandiera romena, da sinistra', items: ['Blu', 'Giallo', 'Rosso'], d: 2 },
    { q: 'Metti in ordine i colori della bandiera colombiana, dall\'alto', items: ['Giallo', 'Blu', 'Rosso'], d: 2 },
    { q: 'Metti in ordine i colori della bandiera lituana, dall\'alto', items: ['Giallo', 'Verde', 'Rosso'], d: 3 },
    { q: 'Metti in ordine i colori della bandiera estone, dall\'alto', items: ['Blu', 'Nero', 'Bianco'], d: 3 },
    { q: 'Metti in ordine i colori della bandiera armena, dall\'alto', items: ['Rosso', 'Blu', 'Arancione'], d: 3 },
    { q: 'Metti in ordine i colori della bandiera dell\'Iran, dall\'alto', items: ['Verde', 'Bianco', 'Rosso'], d: 2 },
    { q: 'Metti in ordine i colori della bandiera del Ghana, dall\'alto', items: ['Rosso', 'Oro', 'Verde'], d: 3 },
    { q: 'Metti in ordine i colori della bandiera lussemburghese, dall\'alto', items: ['Rosso', 'Bianco', 'Azzurro'], d: 3 },
    { q: 'Metti in ordine i colori degli anelli olimpici, da sinistra', items: ['Blu', 'Giallo', 'Nero', 'Verde', 'Rosso'], d: 3 },
    { q: 'Metti in ordine di numero di stelle sulla bandiera, dal maggiore', items: ['Stati Uniti', 'Brasile', 'Venezuela', 'Cina'], d: 2 },
    { q: 'Metti in ordine di numero di strisce sulla bandiera, dal maggiore', items: ['Malesia', 'Stati Uniti', 'Grecia', 'Cuba'], d: 3 },
  ];

  // ── Indovina il numero ──
  const N = (q, v, min, max, tol, unit, d) => ({ q, v, min, max, tol, unit, d });
  const numbers = [
    N('Quante stelle ha la bandiera degli Stati Uniti?', 50, 10, 100, 0, 'stelle', 1),
    N('Quante strisce ha la bandiera degli Stati Uniti?', 13, 5, 25, 0, 'strisce', 1),
    N('Quante stelle ha la bandiera dell\'Unione europea?', 12, 5, 30, 0, 'stelle', 1),
    N('Quante stelle ha la bandiera del Brasile?', 27, 10, 50, 0, 'stelle', 3),
    N('Quanti raggi ha la ruota al centro della bandiera indiana?', 24, 8, 40, 0, 'raggi', 3),
    N('Quanti anelli ha la bandiera olimpica?', 5, 2, 10, 0, 'anelli', 1),
    N('Quante strisce ha la bandiera della Grecia?', 9, 3, 15, 0, 'strisce', 2),
    N('Quante strisce ha la bandiera della Malesia?', 14, 5, 25, 0, 'strisce', 3),
    N('Quante strisce ha la bandiera della Liberia?', 11, 5, 20, 0, 'strisce', 3),
    N('Quante stelle ha la bandiera della Cina?', 5, 1, 12, 0, 'stelle', 1),
    N('Quante stelle ha la bandiera della Nuova Zelanda?', 4, 1, 10, 0, 'stelle', 2),
    N('Quante stelle ha la bandiera del Venezuela?', 8, 3, 15, 0, 'stelle', 3),
    N('Quante stelle ha la bandiera dell\'Australia?', 6, 2, 12, 0, 'stelle', 3),
    N('Quante bande orizzontali ha la bandiera della Thailandia?', 5, 2, 9, 0, 'bande', 2),
    N('Quanti trigrammi ci sono sulla bandiera della Corea del Sud?', 4, 1, 8, 0, 'trigrammi', 3),
    N('Quanti Paesi dell\'Unione europea hanno una croce scandinava sulla bandiera?', 3, 1, 8, 0, 'Paesi', 3),
    N('In che anno fu adottata l\'attuale bandiera del Canada con la foglia d\'acero?', 1965, 1900, 2000, 1, '', 2),
    N('In che anno nacque il Tricolore italiano a Reggio Emilia?', 1797, 1700, 1900, 1, '', 3),
    N('In che anno fu adottata l\'attuale bandiera del Sudafrica?', 1994, 1950, 2024, 0, '', 2),
    N('Quanti Stati ha l\'Unione europea (2024)?', 27, 15, 40, 0, 'Stati', 2),
  ];

  // ── Indovina dalle emoji ──
  const E = (emoji, answer, d) => ({ emoji, answer, d });
  const emojis = [
    E('🍁🏒🥞', 'Canada', 1),
    E('🌞⛩️🍣', 'Giappone', 1),
    E('🗽🦅🍔', 'Stati Uniti', 1),
    E('🦅🌵🐍', 'Messico', 2),
    E('🐉🏔️🙏', 'Bhutan', 3),
    E('🦘🐨🌟', 'Australia', 1),
    E('🥝🐑🌟', 'Nuova Zelanda', 1),
    E('🦁⚔️🍵', 'Sri Lanka', 3),
    E('☘️🍺🎻', 'Irlanda', 1),
    E('🥐🥖🗼', 'Francia', 1),
    E('🐻🪆❄️', 'Russia', 1),
  ];

  // ── Scrivi la risposta ──
  const typed = [
    { q: 'Quale Paese ha una foglia d\'acero sulla bandiera?', a: 'Canada', d: 1 },
    { q: 'Quale Paese ha un cedro sulla bandiera?', a: 'Libano', d: 2 },
    { q: 'Quale Stato sovrano ha un drago sulla bandiera? (inizia con B)', a: 'Bhutan', accept: ['Buthan'], d: 3 },
    { q: 'Come si chiama la bandiera nera dei pirati con il teschio?', a: 'Jolly Roger', d: 1 },
    { q: 'Come si chiama la bandiera del Regno Unito?', a: 'Union Jack', accept: ['Union Flag'], d: 1 },
    { q: 'Come si chiama la bandiera della Danimarca, la più antica ancora in uso?', a: 'Dannebrog', d: 3 },
    { q: 'Come si chiama la disciplina che studia le bandiere?', a: 'Vessillologia', d: 2 },
    { q: 'Come è soprannominata la bandiera degli Stati Uniti? (due parole, in inglese, con «and»)', a: 'Stars and Stripes', accept: ['Stars & Stripes', 'Old Glory'], d: 2 },
    { q: 'Quale Paese ha l\'unica bandiera nazionale non quadrangolare?', a: 'Nepal', d: 2 },
    { q: 'Quale Paese ha una bandiera rossa con cinque stelle gialle?', a: 'Cina', accept: ['Repubblica Popolare Cinese'], d: 1 },
    { q: 'Quale Paese ha un tempio di nome Angkor Wat sulla bandiera?', a: 'Cambogia', d: 2 },
    { q: 'Quale Paese ha una bandiera con 14 strisce e una mezzaluna? (iniziale M)', a: 'Malesia', accept: ['Malaysia'], d: 3 },
    { q: 'Quale Paese ha una bandiera con un cerchio rosso su sfondo bianco?', a: 'Giappone', d: 1 },
    { q: 'Quale Paese ha una bandiera con tre bande verticali: verde, bianca e arancione (da sinistra)?', a: 'Irlanda', d: 1 },
    { q: 'Quale Paese ha una bandiera con un\'aquila e un serpente su un cactus?', a: 'Messico', d: 2 },
    { q: 'Quale Paese è rappresentato da una bandiera con la stella di Davide?', a: 'Israele', d: 1 },
    { q: 'Quale Paese ha la bandiera con 27 stelle in un globo blu?', a: 'Brasile', d: 2 },
    { q: 'Quale Paese ha una bandiera blu con croce gialla scandinava?', a: 'Svezia', d: 1 },
    { q: 'Quale Paese ha una bandiera con una croce bianca su fondo rosso, quadrata?', a: 'Svizzera', d: 1 },
    { q: 'Come si chiama la bandiera del Giappone?', a: 'Hinomaru', d: 3 },
    { q: 'Quale colore ha la croce della bandiera svizzera?', a: 'Bianco', accept: ['Bianca'], d: 1 },
    { q: 'Quale Paese ha la bandiera con il simbolo Soyombo? (iniziale M)', a: 'Mongolia', d: 3 },
    { q: 'Qual è l\'unico Paese con una Bibbia sulla bandiera? (due parole)', a: 'Repubblica Dominicana', accept: ['Dominicana'], d: 3 },
  ];

  // ── Tabelle ──
  const T = (id, items, fields, numeric) => ({ id, items, fields, ...(numeric ? { numeric } : {}) });
  const tables = [
    T('schemi', schemi, {
      schema: {
        ask: 'Come è composta la bandiera di questo Paese: {name}?',
        who: 'Quale di questi Paesi ha una bandiera con {value}?',
        tf: '{name}: la bandiera ha {value}.',
        odd: 'Trova l\'intruso: quale di questi Paesi NON ha una bandiera con {value}?',
      },
    }),
    T('simboli', simboli, {
      simbolo: {
        ask: 'Quale simbolo spicca sulla bandiera di questo Paese: {name}?',
        who: 'Quale di queste bandiere ha come simbolo principale {value}?',
        tf: '{name}: sulla bandiera spicca questo simbolo: {value}.',
        odd: 'Trova l\'intruso: quale di queste bandiere NON ha come simbolo principale {value}?',
      },
    }),
    T('stelle', stelle, {}, {
      stelle: { ask: 'Quante stelle ha la bandiera di questo Paese: {name}?', span: 20, tol: 0, unit: 'stelle', step: 1,
        duel: 'Quale di queste due bandiere ha più stelle?', order: 'Metti in ordine di numero di stelle, dal maggiore', gap: 2 },
    }),
    T('strisce', strisce, {}, {
      strisce: { ask: 'Quante strisce (o bande) orizzontali ha la bandiera di questo Paese: {name}?', span: 14, tol: 0, unit: 'strisce', step: 1,
        duel: 'Quale di queste due bandiere ha più strisce?', order: 'Metti in ordine di numero di strisce, dal maggiore', gap: 2 },
    }),
    T('adozioni', adozioni, {}, {
      anno: { ask: 'In che anno è stata adottata l\'attuale bandiera di questo Paese: {name}?', span: 120, tol: 2, format: 'year', step: 1,
        duel: 'La bandiera di quale Paese è stata adottata prima?', lowerWins: true, order: 'Metti in ordine di adozione della bandiera, dalla più antica', gap: 8 },
    }),
  ];

  (D.pop = D.pop || []).push({
    id: 'plusbandiere', extends: 'bandiere',
    quiz, tf, tables, order, numbers, emojis, typed,
    emojiText: 'Di quale Paese parlano queste emoji?',
  });
})(typeof window !== 'undefined' ? window : globalThis);
