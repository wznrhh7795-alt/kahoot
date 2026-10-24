// Geografia del mondo — domande in più per la categoria classica «mondo» (extends): lingue, monete, città, isole,
// laghi, vulcani, montagne, fiumi, luoghi naturali, stretti, confini e record. Solo fatti verificati (fino al 2024).
(function (root) {
  'use strict';
  const D = (root.QZ_DATA = root.QZ_DATA || {});
  // Piccolo aiuto per scrivere le tabelle in forma compatta: una riga = un elemento, colonne separate da «|».
  const rows = (s) => s.trim().split('\n').map((l) => l.split('|').map((x) => x.trim()));

  // ── Lingua ufficiale a livello nazionale (solo Paesi con una lingua nazionale ufficiale chiara) ──
  const lingue = rows(`
Francia|Francese|1
Senegal|Francese|2
Costa d'Avorio|Francese|2
Gabon|Francese|3
Guinea|Francese|3
Germania|Tedesco|1
Austria|Tedesco|1
Italia|Italiano|1
San Marino|Italiano|2
Spagna|Spagnolo|1
Cuba|Spagnolo|1
Colombia|Spagnolo|1
Venezuela|Spagnolo|2
Guatemala|Spagnolo|2
Panama|Spagnolo|2
Repubblica Dominicana|Spagnolo|2
Ecuador|Spagnolo|2
Portogallo|Portoghese|1
Brasile|Portoghese|1
Angola|Portoghese|2
Capo Verde|Portoghese|3
Regno Unito|Inglese|1
Australia|Inglese|1
Giamaica|Inglese|2
Bahamas|Inglese|2
Trinidad e Tobago|Inglese|3
Belize|Inglese|2
Dominica|Inglese|3
Nigeria|Inglese|2
Ghana|Inglese|2
Liberia|Inglese|3
Gambia|Inglese|3
Zambia|Inglese|3
Paesi Bassi|Olandese|1
Svezia|Svedese|1
Danimarca|Danese|1
Norvegia|Norvegese|1
Polonia|Polacco|1
Repubblica Ceca|Ceco|2
Slovacchia|Slovacco|2
Ungheria|Ungherese|1
Romania|Rumeno|1
Croazia|Croato|1
Slovenia|Sloveno|2
Serbia|Serbo|2
Grecia|Greco|1
Lituania|Lituano|2
Lettonia|Lettone|2
Estonia|Estone|2
Ucraina|Ucraino|1
Russia|Russo|1
Turchia|Turco|1
Armenia|Armeno|2
Giappone|Giapponese|1
Cina|Cinese mandarino|1
Corea del Sud|Coreano|1
Corea del Nord|Coreano|2
Thailandia|Thailandese|1
Cambogia|Khmer|2
Laos|Lao|3
Mongolia|Mongolo|2
Malaysia|Malese|2
Bangladesh|Bengalese|2
Nepal|Nepalese|2
Iran|Persiano|1
Turkmenistan|Turkmeno|3
Maldive|Divehi|3
Arabia Saudita|Arabo|1
Egitto|Arabo|1
Libano|Arabo|2
Siria|Arabo|2
Emirati Arabi Uniti|Arabo|2
Qatar|Arabo|2
Libia|Arabo|2
Tunisia|Arabo|2
Mauritania|Arabo|3
`).map(([name, lingua, d]) => ({ name, lingua, d: +d }));

  // ── Moneta (esclusi i Paesi già coperti dalle domande classiche: Giappone, Regno Unito, Svizzera, Cina, India, Russia, Polonia, Thailandia, Sudafrica) ──
  const monete = rows(`
Francia|Euro|1
Germania|Euro|1
Spagna|Euro|1
Portogallo|Euro|1
Grecia|Euro|1
Irlanda|Euro|1
Austria|Euro|1
Belgio|Euro|1
Paesi Bassi|Euro|1
Finlandia|Euro|1
Slovenia|Euro|2
Estonia|Euro|2
Malta|Euro|2
Cipro|Euro|2
Svezia|Corona svedese|1
Danimarca|Corona danese|1
Norvegia|Corona norvegese|1
Islanda|Corona islandese|2
Repubblica Ceca|Corona ceca|2
Ungheria|Fiorino ungherese|2
Ucraina|Grivnia|2
Turchia|Lira turca|1
Azerbaigian|Manat azero|3
Serbia|Dinaro serbo|2
Bielorussia|Rublo bielorusso|3
Corea del Sud|Won sudcoreano|1
Indonesia|Rupia indonesiana|2
Malaysia|Ringgit|2
Filippine|Peso filippino|2
Laos|Kip|3
Uzbekistan|Sum uzbeko|3
Pakistan|Rupia pakistana|2
Bangladesh|Taka|2
Sri Lanka|Rupia dello Sri Lanka|3
Iraq|Dinaro iracheno|2
Giordania|Dinaro giordano|2
Arabia Saudita|Riyal saudita|2
Oman|Rial omanita|3
Emirati Arabi Uniti|Dirham degli Emirati|2
Egitto|Sterlina egiziana|2
Marocco|Dirham marocchino|2
Algeria|Dinaro algerino|2
Nigeria|Naira|2
Ghana|Cedi|2
Tanzania|Scellino tanzaniano|3
Etiopia|Birr|2
Zambia|Kwacha zambiano|3
Madagascar|Ariary|3
Eritrea|Nakfa|3
Senegal|Franco CFA|2
Camerun|Franco CFA|2
Gabon|Franco CFA|3
Ciad|Franco CFA|3
Stati Uniti|Dollaro statunitense|1
Canada|Dollaro canadese|1
Messico|Peso messicano|1
Cuba|Peso cubano|2
Argentina|Peso argentino|1
Cile|Peso cileno|2
Brasile|Real|1
Perù|Sol|2
Bolivia|Boliviano|3
Guatemala|Quetzal|2
Honduras|Lempira|3
Bahamas|Dollaro delle Bahamas|3
Australia|Dollaro australiano|1
Nuova Zelanda|Dollaro neozelandese|2
Vanuatu|Vatu|3
`).map(([name, moneta, d]) => ({ name, moneta, d: +d }));

  // ── Città importanti che NON sono capitali: in quale Paese si trovano ──
  const citta = rows(`
Barcellona|Spagna|1
San Sebastián|Spagna|2
Porto|Portogallo|1
Marsiglia|Francia|1
Lione|Francia|1
Nizza|Francia|1
Bordeaux|Francia|2
Cannes|Francia|1
Avignone|Francia|2
Amburgo|Germania|1
Monaco di Baviera|Germania|1
Colonia|Germania|1
Francoforte|Germania|1
Norimberga|Germania|2
Zurigo|Svizzera|1
Ginevra|Svizzera|1
Basilea|Svizzera|2
Lugano|Svizzera|2
Salisburgo|Austria|1
Anversa|Belgio|2
Rotterdam|Paesi Bassi|1
Utrecht|Paesi Bassi|3
Manchester|Regno Unito|1
Liverpool|Regno Unito|1
Edimburgo|Regno Unito|1
Glasgow|Regno Unito|2
Oxford|Regno Unito|2
Cracovia|Polonia|1
Breslavia|Polonia|2
Dubrovnik|Croazia|1
Istanbul|Turchia|1
Smirne|Turchia|2
Odessa|Ucraina|1
Charkiv|Ucraina|2
San Pietroburgo|Russia|1
Soči|Russia|2
Malmö|Svezia|2
Trondheim|Norvegia|3
Debrecen|Ungheria|3
Mumbai|India|1
Calcutta|India|2
Karachi|Pakistan|2
Shanghai|Cina|1
Chengdu|Cina|2
Chongqing|Cina|3
Osaka|Giappone|1
Kyoto|Giappone|1
Nagoya|Giappone|2
Hiroshima|Giappone|1
Nagasaki|Giappone|1
Busan|Corea del Sud|2
Phuket|Thailandia|1
Pattaya|Thailandia|2
Yangon|Myanmar|2
Tel Aviv|Israele|1
Gedda|Arabia Saudita|2
La Mecca|Arabia Saudita|1
Dubai|Emirati Arabi Uniti|1
Bassora|Iraq|3
Aleppo|Siria|2
Almaty|Kazakistan|2
Lagos|Nigeria|1
Johannesburg|Sudafrica|1
Città del Capo|Sudafrica|1
Casablanca|Marocco|1
Tangeri|Marocco|2
Alessandria d'Egitto|Egitto|1
Sharm el-Sheikh|Egitto|2
Orano|Algeria|2
Costantina|Algeria|3
Timbuctù|Mali|2
New York|Stati Uniti|1
Los Angeles|Stati Uniti|1
Chicago|Stati Uniti|1
San Francisco|Stati Uniti|1
Las Vegas|Stati Uniti|1
Miami|Stati Uniti|1
Boston|Stati Uniti|1
Seattle|Stati Uniti|2
New Orleans|Stati Uniti|1
Detroit|Stati Uniti|2
Austin|Stati Uniti|3
San Diego|Stati Uniti|2
Toronto|Canada|1
Montréal|Canada|1
Vancouver|Canada|1
Calgary|Canada|2
Monterrey|Messico|2
Cancún|Messico|1
Tijuana|Messico|3
Montego Bay|Giamaica|2
Punta Cana|Repubblica Dominicana|1
San Paolo|Brasile|1
Rio de Janeiro|Brasile|1
Florianópolis|Brasile|3
Rosario|Argentina|2
Bariloche|Argentina|2
Cusco|Perù|1
Medellín|Colombia|1
Cali|Colombia|2
Punta del Este|Uruguay|2
Ciudad del Este|Paraguay|3
Sydney|Australia|1
Melbourne|Australia|1
Gold Coast|Australia|2
Auckland|Nuova Zelanda|1
`).map(([name, paese, d]) => ({ name, paese, d: +d }));

  // ── Isole: a quale Paese appartengono ──
  const isole = rows(`
Capri|Italia|1
Elba|Italia|2
Creta|Grecia|1
Rodi|Grecia|1
Corfù|Grecia|1
Santorini|Grecia|1
Mykonos|Grecia|1
Zante|Grecia|2
Kos|Grecia|2
Maiorca|Spagna|1
Ibiza|Spagna|1
Formentera|Spagna|2
Tenerife|Spagna|1
Gran Canaria|Spagna|1
Lanzarote|Spagna|1
La Gomera|Spagna|3
Madeira|Portogallo|1
Hokkaido|Giappone|2
Honshu|Giappone|2
Okinawa|Giappone|2
Giava|Indonesia|1
Bali|Indonesia|1
Sulawesi|Indonesia|3
Komodo|Indonesia|2
Palawan|Filippine|2
Ko Samui|Thailandia|2
Zanzibar|Tanzania|1
Gorée|Senegal|3
Robben Island|Sudafrica|2
Maui|Stati Uniti|2
Manhattan|Stati Uniti|1
Alcatraz|Stati Uniti|2
Key West|Stati Uniti|2
Vancouver Island|Canada|2
Isola del Principe Edoardo|Canada|3
Tasmania|Australia|1
Isola del Sud|Nuova Zelanda|2
Isola di Pasqua|Cile|1
Fernando de Noronha|Brasile|3
Gran Bretagna|Regno Unito|1
Skye|Regno Unito|2
Gotland|Svezia|2
Öland|Svezia|3
Selandia|Danimarca|2
Sylt|Germania|2
Brač|Croazia|2
Hvar|Croazia|1
Korčula|Croazia|2
Cres|Croazia|3
Sakhalin|Russia|2
Sentosa|Singapore|2
Langkawi|Malaysia|2
Socotra|Yemen|3
`).map(([name, paese, d]) => ({ name, paese, d: +d }));

  // ── Laghi: in quale Paese si trovano (solo laghi interamente in un Paese) ──
  const laghi = rows(`
Garda|Italia|1
Como|Italia|1
Balaton|Ungheria|2
Ladoga|Russia|2
Bajkal|Russia|1
Inari|Finlandia|3
Bled|Slovenia|2
Loch Ness|Regno Unito|1
Lough Neagh|Regno Unito|3
Michigan|Stati Uniti|1
Great Salt Lake|Stati Uniti|2
Tahoe|Stati Uniti|2
Okeechobee|Stati Uniti|3
Winnipeg|Canada|2
Taupo|Nuova Zelanda|2
Biwa|Giappone|2
Toba|Indonesia|2
Sevan|Armenia|2
Urmia|Iran|3
Tana|Etiopia|3
Nahuel Huapi|Argentina|2
`).map(([name, paese, d]) => ({ name, paese, d: +d }));

  // ── Vulcani: in quale Paese si trovano ──
  const vulcani = rows(`
Vesuvio|Italia|1
Etna|Italia|1
Stromboli|Italia|1
Fuji|Giappone|1
Krakatoa|Indonesia|1
Merapi|Indonesia|2
Bromo|Indonesia|2
Agung|Indonesia|2
Taal|Filippine|3
Popocatépetl|Messico|2
Cotopaxi|Ecuador|2
Villarrica|Cile|2
Llaima|Cile|3
Kilauea|Stati Uniti|2
Mount St. Helens|Stati Uniti|1
Katla|Islanda|2
Hekla|Islanda|2
Eyjafjallajökull|Islanda|1
Teide|Spagna|1
Cumbre Vieja|Spagna|3
Kilimangiaro|Tanzania|1
Arenal|Costa Rica|2
Poás|Costa Rica|3
Fuego|Guatemala|2
Ruapehu|Nuova Zelanda|2
Damavand|Iran|3
`).map(([name, paese, d]) => ({ name, paese, d: +d }));

  // ── Montagne: catena, Paese (solo se la vetta sta interamente in un Paese) e altezza in metri ──
  // colonne: nome | catena | Paese | altezza | difficoltà   (campo vuoto = non vale / non univoco)
  const montagne = rows(`
Monte Bianco|Alpi||4806|1
Cervino|Alpi||4478|1
Monte Rosa|Alpi||4634|1
Gran Paradiso|Alpi|Italia|4061|2
Marmolada|Alpi|Italia|3343|2
Grossglockner|Alpi|Austria|3798|2
Eiger|Alpi|Svizzera|3967|2
Jungfrau|Alpi|Svizzera|4158|2
Triglav|Alpi|Slovenia|2864|3
Zugspitze|Alpi||2962|2
Gran Sasso|Appennini|Italia|2912|2
Monte Vettore|Appennini|Italia|2476|3
Everest|Himalaya||8849|1
K2|Karakorum||8611|1
Kangchenjunga|Himalaya||8586|2
Lhotse|Himalaya||8516|2
Cho Oyu|Himalaya||8188|3
Manaslu|Himalaya|Nepal|8163|3
Annapurna|Himalaya|Nepal|8091|2
Gasherbrum I|Karakorum||8080|3
Aconcagua|Ande|Argentina|6961|1
Ojos del Salado|Ande||6893|3
Chimborazo|Ande|Ecuador|6263|2
Denali||Stati Uniti|6190|1
Mount Logan||Canada|5959|3
Elbrus|Caucaso|Russia|5642|2
Mount Elbert|Montagne Rocciose|Stati Uniti|4401|3
Aneto|Pirenei|Spagna|3404|3
Mulhacén||Spagna|3479|3
Monte Kosciuszko||Australia|2228|2
Monte Kenya||Kenya|5199|2
Table Mountain||Sudafrica|1086|2
Olimpo||Grecia|2918|1
Monte Athos||Grecia|2033|3
Ben Nevis||Regno Unito|1345|2
Galdhøpiggen||Norvegia|2469|3
Gerlach|Tatra|Slovacchia|2655|3
Mount Whitney||Stati Uniti|4421|2
Puncak Jaya||Indonesia|4884|3
Aoraki (Monte Cook)|Alpi neozelandesi|Nuova Zelanda|3724|2
Mont Ventoux||Francia|1912|2
Monte Sinai||Egitto|2285|2
Pan di Zucchero||Brasile|396|2
`).map(([name, catena, paese, altezza, d]) => {
    const o = { name, d: +d, altezza: +altezza };
    if (catena) o.catena = catena;
    if (paese) o.paese = paese;
    return o;
  });

  // ── Luoghi naturali famosi: in quale Paese si trovano ──
  const luoghi = rows(`
Grande Barriera Corallina|Australia|1
Uluru|Australia|1
Galápagos|Ecuador|1
Torres del Paine|Cile|2
Perito Moreno|Argentina|2
Serengeti|Tanzania|1
Masai Mara|Kenya|1
Parco Kruger|Sudafrica|1
Delta dell'Okavango|Botswana|2
Etosha|Namibia|2
Sossusvlei|Namibia|3
Lago Rosa|Senegal|3
Yellowstone|Stati Uniti|1
Yosemite|Stati Uniti|1
Grand Canyon|Stati Uniti|1
Everglades|Stati Uniti|2
Death Valley|Stati Uniti|2
Carlsbad Caverns|Stati Uniti|3
Banff|Canada|2
Selciato del Gigante|Regno Unito|2
Scogliere di Moher|Irlanda|2
Lofoten|Norvegia|2
Geysir|Islanda|2
Laguna Blu|Islanda|1
Dettifoss|Islanda|3
Meteore|Grecia|2
Laghi di Plitvice|Croazia|2
Grotte di Postumia|Slovenia|2
Cascate del Reichenbach|Svizzera|3
Foresta Nera|Germania|2
Doñana|Spagna|3
Cappadocia|Turchia|1
Pamukkale|Turchia|2
Baia di Ha Long|Vietnam|1
Jiuzhaigou|Cina|3
Fiordland|Nuova Zelanda|2
Milford Sound|Nuova Zelanda|2
Grotte di Waitomo|Nuova Zelanda|2
`).map(([name, paese, d]) => ({ name, paese, d: +d }));

  // ── Fiumi: lunghezza in km (solo valori su cui le fonti concordano) ──
  const fiumi = rows(`
Danubio|2850|1
Volga|3530|2
Reno|1233|1
Po|652|1
Senna|777|1
Loira|1006|2
Elba|1094|3
Vistola|1047|3
Oder|854|3
Tago|1007|3
Rodano|813|2
Tamigi|346|1
Dnepr|2201|3
Gange|2525|1
Indo|3180|2
Brahmaputra|2900|3
Fiume Giallo|5464|2
Fiume Azzurro (Yangtze)|6300|1
Lena|4400|3
Congo|4700|2
Niger|4180|2
Zambesi|2574|2
Colorado|2330|2
Yukon|3190|3
Mackenzie|1738|3
Eufrate|2800|2
Tigri|1850|2
Murray|2508|3
Orinoco|2140|3
São Francisco|2914|3
Paraná|4880|3
`).map(([name, lunghezza, d]) => ({ name, d: +d, lunghezza: +lunghezza }));

  const T = (id, items, fields, numeric) => ({ id, items, fields, ...(numeric ? { numeric } : {}) });
  const tables = [
    T('lingue', lingue, {
      lingua: {
        ask: 'Qual è la lingua ufficiale a livello nazionale di questo Paese: {name}?',
        who: 'Quale di questi Paesi ha come lingua ufficiale a livello nazionale: {value}?',
        tf: '{name}: la lingua ufficiale a livello nazionale è {value}.',
        odd: 'Trova l\'intruso: quale di questi Paesi NON ha come lingua ufficiale: {value}?',
      },
    }),
    T('monete', monete, {
      moneta: {
        ask: 'Qual è la moneta di questo Paese: {name}?',
        who: 'Quale di questi Paesi ha come moneta: {value}?',
        tf: '{name}: la moneta è {value}.',
        odd: 'Trova l\'intruso: quale di questi Paesi NON ha come moneta: {value}?',
      },
    }),
    T('citta', citta, {
      paese: {
        ask: 'In quale Paese si trova questa città: {name}?',
        who: 'Quale di queste città si trova in questo Paese: {value}?',
        odd: 'Trova l\'intruso: quale di queste città NON si trova in questo Paese: {value}?',
      },
    }),
    T('isole', isole, {
      paese: {
        ask: 'A quale Paese appartiene questa isola: {name}?',
        who: 'Quale di queste isole appartiene a questo Paese: {value}?',
        odd: 'Trova l\'intruso: quale di queste isole NON appartiene a questo Paese: {value}?',
      },
    }),
    T('laghi', laghi, {
      paese: {
        ask: 'In quale Paese si trova questo lago: {name}?',
        who: 'Quale di questi laghi si trova in questo Paese: {value}?',
        odd: 'Trova l\'intruso: quale di questi laghi NON si trova in questo Paese: {value}?',
      },
    }),
    T('vulcani', vulcani, {
      paese: {
        ask: 'In quale Paese si trova questo vulcano: {name}?',
        who: 'Quale di questi vulcani si trova in questo Paese: {value}?',
        odd: 'Trova l\'intruso: quale di questi vulcani NON si trova in questo Paese: {value}?',
      },
    }),
    T('montagne', montagne, {
      catena: {
        ask: 'A quale catena montuosa appartiene questa vetta: {name}?',
        who: 'Quale di queste vette appartiene a questa catena montuosa: {value}?',
        tf: 'La vetta «{name}» appartiene a questa catena montuosa: {value}.',
        odd: 'Trova l\'intruso: quale di queste vette NON appartiene a questa catena: {value}?',
      },
      paese: {
        ask: 'In quale Paese si trova questa montagna: {name}?',
        who: 'Quale di queste montagne si trova in questo Paese: {value}?',
        odd: 'Trova l\'intruso: quale di queste montagne NON si trova in questo Paese: {value}?',
      },
    }, {
      altezza: { ask: 'Quanto è alta questa montagna: {name}?', span: 3000, tol: 100, unit: 'm', step: 50,
        duel: 'Quale di queste due montagne è più alta?', order: 'Ordina queste montagne dalla più alta alla più bassa', gap: 250 },
    }),
    T('luoghi', luoghi, {
      paese: {
        ask: 'In quale Paese si trova questo luogo naturale: {name}?',
        who: 'Quale di questi luoghi naturali si trova in questo Paese: {value}?',
        odd: 'Trova l\'intruso: quale di questi luoghi NON si trova in questo Paese: {value}?',
      },
    }),
    T('fiumi', fiumi, {}, {
      lunghezza: { ask: 'Quanto è lungo questo fiume: {name}?', span: 3000, tol: 100, unit: 'km', step: 50,
        duel: 'Quale di questi due fiumi è più lungo?', order: 'Ordina questi fiumi dal più lungo al più corto', gap: 300 },
    }),
  ];

  // ── Quiz scritti a mano ──
  const Q = (q, a, wrong, d) => ({ q, a, wrong, d });
  const quiz = [
    // Stretti e canali
    Q('Quale stretto separa l\'Asia dall\'America del Nord?', 'Stretto di Bering', ['Stretto di Magellano', 'Stretto di Hormuz', 'Stretto di Malacca'], 2),
    Q('Quale stretto collega il Mar Nero al Mar di Marmara e divide in due Istanbul?', 'Bosforo', ['Dardanelli', 'Stretto di Messina', 'Canale di Suez'], 2),
    Q('Quale stretto collega il Mar di Marmara al Mar Egeo?', 'Dardanelli', ['Bosforo', 'Canale d\'Otranto', 'Stretto di Bonifacio'], 3),
    Q('Come si chiama il braccio di mare tra la Gran Bretagna e la Francia?', 'Canale della Manica', ['Mare del Nord', 'Mare d\'Irlanda', 'Golfo di Biscaglia'], 1),
    Q('Quale opera collega in treno l\'Inghilterra alla Francia sotto il mare?', 'Tunnel della Manica', ['Tunnel del Gottardo', 'Tunnel del Fréjus', 'Tunnel del Monte Bianco'], 1),
    Q('Quale stretto collega il Golfo Persico al Golfo di Oman?', 'Stretto di Hormuz', ['Bab el-Mandeb', 'Stretto di Malacca', 'Stretto di Bering'], 3),
    Q('Quale stretto separa la penisola malese dall\'isola indonesiana di Sumatra?', 'Stretto di Malacca', ['Stretto di Hormuz', 'Stretto di Taiwan', 'Stretto di Magellano'], 3),
    Q('Quale stretto separa il Sud America continentale dalla Terra del Fuoco?', 'Stretto di Magellano', ['Stretto di Bering', 'Stretto di Gibilterra', 'Stretto di Torres'], 2),
    Q('Quale braccio di mare separa l\'estremità del Sud America dall\'Antartide?', 'Passaggio di Drake', ['Stretto di Magellano', 'Stretto di Bering', 'Canale di Beagle'], 3),
    Q('Quale stretto separa la Tasmania dall\'Australia continentale?', 'Stretto di Bass', ['Stretto di Torres', 'Stretto di Cook', 'Stretto di Magellano'], 3),
    Q('Quale stretto separa le due isole principali della Nuova Zelanda?', 'Stretto di Cook', ['Stretto di Bass', 'Stretto di Torres', 'Stretto di Bering'], 3),
    Q('Quale stretto separa l\'India dallo Sri Lanka?', 'Stretto di Palk', ['Stretto di Malacca', 'Bab el-Mandeb', 'Stretto di Hormuz'], 3),
    Q('Quale stretto collega il Mar Rosso al Golfo di Aden?', 'Bab el-Mandeb', ['Stretto di Hormuz', 'Canale di Suez', 'Stretto di Malacca'], 3),
    Q('Quale stretto collega il Mar Nero al Mar d\'Azov?', 'Stretto di Kerč', ['Bosforo', 'Dardanelli', 'Canale d\'Otranto'], 3),
    Q('Quale canale attraversa la Germania collegando il Mare del Nord al Mar Baltico?', 'Canale di Kiel', ['Canale di Suez', 'Canale di Panama', 'Canale di Corinto'], 3),
    Q('In quale Paese si trova il Canale di Corinto?', 'Grecia', ['Turchia', 'Italia', 'Cipro'], 2),
    Q('Quale ingegnere francese guidò la costruzione del Canale di Suez?', 'Ferdinand de Lesseps', ['Gustave Eiffel', 'Louis Pasteur', 'Jacques Cousteau'], 2),
    // Mari, oceani, golfi
    Q('Quale mare, privo di coste, è delimitato solo da correnti dell\'Oceano Atlantico?', 'Mar dei Sargassi', ['Mar Morto', 'Mar Caspio', 'Mar Baltico'], 3),
    Q('Quale mare si trova tra l\'Africa e la penisola arabica?', 'Mar Rosso', ['Mar Arabico', 'Mar Caspio', 'Mar Nero'], 1),
    Q('Quale mare bagna le coste di Romania, Bulgaria, Ucraina e Turchia?', 'Mar Nero', ['Mar Baltico', 'Mar Caspio', 'Mar Egeo'], 1),
    Q('Quale mare bagna le coste di Svezia, Finlandia, Estonia e Polonia?', 'Mar Baltico', ['Mare del Nord', 'Mar Nero', 'Mar di Barents'], 1),
    Q('In quale oceano si trova il Polo Nord?', 'Oceano Glaciale Artico', ['Oceano Atlantico', 'Oceano Pacifico', 'Oceano Indiano'], 1),
    Q('In quale oceano si trova la Fossa delle Marianne, il punto più profondo dei mari?', 'Oceano Pacifico', ['Oceano Atlantico', 'Oceano Indiano', 'Oceano Glaciale Artico'], 2),
    Q('In quale oceano si trova il Punto Nemo, il luogo più lontano da qualsiasi terra emersa?', 'Oceano Pacifico', ['Oceano Atlantico', 'Oceano Indiano', 'Oceano Antartico'], 3),
    Q('Quale golfo si trova tra la penisola arabica e l\'Iran?', 'Golfo Persico', ['Golfo di Aden', 'Golfo del Bengala', 'Golfo di Guinea'], 2),
    Q('Quale golfo bagna le coste di Texas e Louisiana?', 'Golfo del Messico', ['Golfo della California', 'Golfo dell\'Alaska', 'Golfo di Panama'], 1),
    Q('Quale golfo bagna le coste di Ghana, Togo, Benin e Nigeria?', 'Golfo di Guinea', ['Golfo di Aden', 'Golfo di Sidra', 'Golfo Persico'], 2),
    Q('Quale golfo si apre tra la Francia occidentale e la Spagna settentrionale?', 'Golfo di Biscaglia', ['Golfo del Leone', 'Golfo di Genova', 'Golfo di Taranto'], 2),
    Q('Quale golfo bagna la costa meridionale della Francia, davanti a Montpellier e Marsiglia?', 'Golfo del Leone', ['Golfo di Biscaglia', 'Golfo di Finlandia', 'Golfo di Botnia'], 3),
    Q('Quale golfo si trova tra l\'India orientale, il Bangladesh e il Myanmar?', 'Golfo del Bengala', ['Golfo di Tonchino', 'Golfo di Aden', 'Golfo di Oman'], 2),
    // Penisole
    Q('In quale penisola si trovano Spagna e Portogallo?', 'Penisola iberica', ['Penisola balcanica', 'Penisola scandinava', 'Penisola italiana'], 1),
    Q('Quale penisola degli Stati Uniti ospita Miami e Orlando?', 'Florida', ['Baja California', 'Yucatán', 'Labrador'], 1),
    Q('Quale Paese occupa gran parte della penisola dello Yucatán, dove si trova Cancún?', 'Messico', ['Cuba', 'Honduras', 'Colombia'], 2),
    Q('In quale Paese si trova la penisola del Peloponneso, con Sparta e Olimpia?', 'Grecia', ['Italia', 'Turchia', 'Bulgaria'], 1),
    Q('In quale Paese si trova la penisola della Kamčatka, ricca di vulcani?', 'Russia', ['Canada', 'Giappone', 'Mongolia'], 2),
    Q('In quale Paese si trova la penisola del Sinai?', 'Egitto', ['Libia', 'Giordania', 'Arabia Saudita'], 1),
    Q('A quale Paese appartiene in gran parte la penisola dello Jutland (Giutlandia)?', 'Danimarca', ['Svezia', 'Norvegia', 'Paesi Bassi'], 3),
    Q('Quali Paesi occupano la penisola scandinava?', 'Norvegia e Svezia', ['Danimarca e Islanda', 'Islanda e Finlandia', 'Danimarca e Polonia'], 2),
    // Deserti
    Q('Qual è il deserto più grande del mondo, se si contano anche i deserti freddi?', 'Antartide', ['Sahara', 'Deserto arabico', 'Deserto del Gobi'], 2),
    Q('In quale Paese si trova il deserto del Namib?', 'Namibia', ['Libia', 'Etiopia', 'Algeria'], 2),
    Q('Quale deserto si estende in gran parte del Botswana?', 'Kalahari', ['Namib', 'Gobi', 'Atacama'], 2),
    Q('In quale Paese si trova il deserto del Taklamakan?', 'Cina', ['Mongolia', 'Iran', 'Kazakistan'], 3),
    Q('Che cosa significa «Sahara» in arabo?', 'Deserto', ['Sabbia', 'Fuoco', 'Sole'], 2),
    Q('Come si chiama il «Quarto Vuoto», immenso deserto della penisola arabica?', 'Rub\' al-Khali', ['Nefud', 'Negev', 'Karakum'], 3),
    Q('In quale Paese si trova il deserto del Negev?', 'Israele', ['Egitto', 'Giordania', 'Arabia Saudita'], 2),
    Q('In quale deserto si trova la città di Las Vegas?', 'Deserto del Mojave', ['Deserto di Sonora', 'Deserto del Sahara', 'Deserto di Chihuahua'], 3),
    // Fiumi: città e sbocchi
    Q('Quale fiume attraversa il centro di Berlino?', 'Sprea', ['Elba', 'Oder', 'Reno'], 3),
    Q('Quale fiume attraversa Praga?', 'Moldava', ['Danubio', 'Elba', 'Oder'], 2),
    Q('Quale fiume sfocia nell\'Oceano Atlantico a Lisbona?', 'Tago', ['Douro', 'Ebro', 'Guadalquivir'], 2),
    Q('Quale fiume attraversa Siviglia?', 'Guadalquivir', ['Tago', 'Ebro', 'Douro'], 3),
    Q('Quale fiume attraversa Varsavia?', 'Vistola', ['Oder', 'Danubio', 'Elba'], 2),
    Q('Quale fiume attraversa Mosca?', 'Moscova', ['Volga', 'Neva', 'Don'], 3),
    Q('Quale fiume attraversa San Pietroburgo?', 'Neva', ['Volga', 'Don', 'Moscova'], 2),
    Q('Quale fiume attraversa Dublino?', 'Liffey', ['Shannon', 'Tamigi', 'Severn'], 3),
    Q('Quale fiume attraversa Colonia?', 'Reno', ['Meno', 'Elba', 'Danubio'], 1),
    Q('Quale fiume attraversa Francoforte?', 'Meno', ['Reno', 'Elba', 'Neckar'], 3),
    Q('Quale fiume attraversa Monaco di Baviera?', 'Isar', ['Inn', 'Danubio', 'Meno'], 3),
    Q('Quale fiume attraversa Innsbruck?', 'Inn', ['Isar', 'Salzach', 'Danubio'], 2),
    Q('Quale fiume attraversa Zurigo?', 'Limmat', ['Aare', 'Reno', 'Rodano'], 3),
    Q('Quale fiume attraversa Ginevra?', 'Rodano', ['Reno', 'Aare', 'Senna'], 2),
    Q('Quale fiume si unisce alla Saona a Lione?', 'Rodano', ['Senna', 'Loira', 'Garonna'], 3),
    Q('Quale fiume attraversa Bordeaux?', 'Garonna', ['Loira', 'Senna', 'Rodano'], 2),
    Q('Quale fiume attraversa Nantes prima di sfociare nell\'Atlantico?', 'Loira', ['Garonna', 'Senna', 'Dordogna'], 3),
    Q('Quale fiume attraversa Porto?', 'Douro', ['Tago', 'Minho', 'Guadiana'], 3),
    Q('Quale fiume attraversa Saragozza?', 'Ebro', ['Tago', 'Duero', 'Guadalquivir'], 3),
    Q('Quale fiume attraversa Washington?', 'Potomac', ['Hudson', 'Mississippi', 'Delaware'], 2),
    Q('Quale fiume scorre sul lato occidentale di Manhattan?', 'Hudson', ['Potomac', 'Delaware', 'Charles'], 2),
    Q('Quale fiume attraversa Baghdad?', 'Tigri', ['Eufrate', 'Nilo', 'Giordano'], 2),
    Q('Quale fiume attraversa Bangkok?', 'Chao Phraya', ['Mekong', 'Irrawaddy', 'Gange'], 3),
    Q('Quale fiume attraversa Seul?', 'Han', ['Yalu', 'Yangtze', 'Mekong'], 3),
    Q('Quale fiume attraversa Delhi?', 'Yamuna', ['Gange', 'Indo', 'Brahmaputra'], 3),
    Q('Quale fiume sacro bagna la città indiana di Varanasi?', 'Gange', ['Indo', 'Brahmaputra', 'Narmada'], 1),
    Q('Quale fiume attraversa Melbourne?', 'Yarra', ['Murray', 'Swan', 'Torrens'], 3),
    Q('Quale fiume forma gran parte del confine tra Stati Uniti e Messico?', 'Rio Grande', ['Colorado', 'Mississippi', 'Missouri'], 2),
    Q('Quale fiume forma gran parte del confine tra Germania e Polonia?', 'Oder', ['Elba', 'Vistola', 'Reno'], 3),
    Q('Quale fiume forma per un lungo tratto il confine tra Francia e Germania?', 'Reno', ['Senna', 'Elba', 'Danubio'], 2),
    Q('In quale Paese nasce il Danubio?', 'Germania', ['Austria', 'Svizzera', 'Romania'], 3),
    Q('Quale grande fiume africano attraversa l\'Equatore due volte?', 'Congo', ['Nilo', 'Niger', 'Zambesi'], 3),
    Q('Quale città sudanese sorge dove si incontrano il Nilo Bianco e il Nilo Azzurro?', 'Khartum', ['Il Cairo', 'Addis Abeba', 'Assuan'], 3),
    Q('In quale mare sfocia il Volga?', 'Mar Caspio', ['Mar Nero', 'Mar Baltico', 'Mar Bianco'], 2),
    Q('In quale mare sfocia il Nilo?', 'Mar Mediterraneo', ['Mar Rosso', 'Oceano Indiano', 'Mar Nero'], 1),
    Q('In quale oceano sfocia il Rio delle Amazzoni?', 'Oceano Atlantico', ['Oceano Pacifico', 'Oceano Indiano', 'Oceano Glaciale Artico'], 1),
    Q('In quale golfo sfocia il Mississippi?', 'Golfo del Messico', ['Golfo della California', 'Baia di Hudson', 'Golfo dell\'Alaska'], 2),
    // Laghi
    Q('Quale dei Grandi Laghi nordamericani è il più grande per superficie?', 'Lago Superiore', ['Lago Michigan', 'Lago Huron', 'Lago Erie'], 2),
    Q('Quale dei Grandi Laghi nordamericani si trova interamente negli Stati Uniti?', 'Lago Michigan', ['Lago Superiore', 'Lago Huron', 'Lago Erie'], 3),
    Q('Qual è il lago più esteso dell\'Africa?', 'Lago Vittoria', ['Lago Tanganica', 'Lago Malawi', 'Lago Ciad'], 1),
    Q('Quale lago africano è il più profondo?', 'Lago Tanganica', ['Lago Vittoria', 'Lago Malawi', 'Lago Turkana'], 3),
    Q('Quale lago delle Ande, tra Perù e Bolivia, è tra i più alti laghi navigabili del mondo?', 'Lago Titicaca', ['Lago Poopó', 'Lago Maracaibo', 'Lago Nicaragua'], 2),
    Q('Dove si riesce a galleggiare senza sforzo grazie all\'altissima salinità, tra Israele e Giordania?', 'Mar Morto', ['Mar Mediterraneo', 'Mar Caspio', 'Lago Tiberiade'], 1),
    Q('Quale lago indonesiano occupa la caldera di un supervulcano?', 'Lago Toba', ['Lago Biwa', 'Lago Taupo', 'Lago Sevan'], 3),
    // Montagne e catene
    Q('Qual è la vetta più alta del Nord America?', 'Denali', ['Mount Whitney', 'Mount Logan', 'Mount Rainier'], 2),
    Q('Qual è la vetta più alta dell\'Antartide?', 'Massiccio Vinson', ['Monte Erebus', 'Monte Kosciuszko', 'Monte Cook'], 3),
    Q('Qual è la vetta più alta del Caucaso?', 'Elbrus', ['Kazbek', 'Monte Bianco', 'Ararat'], 2),
    Q('Quale montagna è la più alta del mondo se misurata dalla base sul fondo dell\'oceano alla cima?', 'Mauna Kea', ['Everest', 'Denali', 'Kilimangiaro'], 3),
    Q('Quale montagna ha la vetta più lontana dal centro della Terra, grazie al rigonfiamento equatoriale?', 'Chimborazo', ['Everest', 'Aconcagua', 'Kilimangiaro'], 3),
    Q('Quale catena montuosa si estende in Marocco, Algeria e Tunisia?', 'Atlante', ['Drakensberg', 'Ande', 'Urali'], 2),
    Q('Quale catena montuosa corre lungo la costa occidentale del Sud America?', 'Ande', ['Montagne Rocciose', 'Himalaya', 'Appalachi'], 1),
    Q('Qual è la catena montuosa più lunga della terraferma?', 'Ande', ['Himalaya', 'Alpi', 'Montagne Rocciose'], 2),
    Q('Quale catena montuosa del Nord America ospita il Parco di Yellowstone?', 'Montagne Rocciose', ['Appalachi', 'Sierra Nevada', 'Ande'], 2),
    Q('Quale catena montuosa corre lungo la costa orientale degli Stati Uniti?', 'Appalachi', ['Montagne Rocciose', 'Sierra Nevada', 'Catena delle Cascate'], 2),
    // Record e curiosità sui Paesi
    Q('Quale Paese ha il maggior numero di fusi orari, contando anche i territori d\'oltremare?', 'Francia', ['Russia', 'Stati Uniti', 'Regno Unito'], 3),
    Q('Qual è il Paese più esteso dell\'Africa?', 'Algeria', ['Repubblica Democratica del Congo', 'Sudan', 'Libia'], 2),
    Q('Qual è il Paese più popoloso dell\'Africa?', 'Nigeria', ['Etiopia', 'Egitto', 'Repubblica Democratica del Congo'], 1),
    Q('Qual è il Paese più popoloso dell\'Unione Europea?', 'Germania', ['Francia', 'Italia', 'Spagna'], 2),
    Q('Quale Paese è un arcipelago di circa 17.000 isole, tra cui Giava e Sumatra?', 'Indonesia', ['Filippine', 'Giappone', 'Malaysia'], 1),
    Q('Qual è il Paese interamente asiatico più esteso?', 'Cina', ['India', 'Kazakistan', 'Arabia Saudita'], 2),
    Q('Qual è il Paese più esteso tra quelli interamente europei?', 'Ucraina', ['Germania', 'Spagna', 'Svezia'], 2),
    Q('Qual è il secondo Stato più piccolo del mondo, dopo la Città del Vaticano?', 'Monaco', ['San Marino', 'Liechtenstein', 'Malta'], 2),
    Q('Qual è il Paese più piccolo dell\'Africa?', 'Seychelles', ['Mauritius', 'Gambia', 'Comore'], 3),
    Q('Qual è il Paese più piccolo dell\'Asia?', 'Maldive', ['Singapore', 'Bahrein', 'Brunei'], 3),
    Q('Qual è il Paese più piccolo del Sud America?', 'Suriname', ['Uruguay', 'Guyana', 'Ecuador'], 3),
    Q('Qual è il Paese più grande del mondo senza sbocco sul mare?', 'Kazakistan', ['Mongolia', 'Ciad', 'Etiopia'], 3),
    Q('Quale di questi Paesi è «doppiamente» senza sbocco sul mare, circondato solo da Paesi a loro volta senza mare?', 'Uzbekistan', ['Kazakistan', 'Mongolia', 'Nepal'], 3),
    Q('Quale Paese è il terzo più popoloso del mondo?', 'Stati Uniti', ['Indonesia', 'Pakistan', 'Brasile'], 2),
    Q('Quale Paese è diventato il più popoloso del mondo nel 2023?', 'India', ['Cina', 'Stati Uniti', 'Indonesia'], 1),
    Q('Quale Paese ha il maggior numero di lingue parlate, oltre 800?', 'Papua Nuova Guinea', ['India', 'Nigeria', 'Brasile'], 3),
    Q('Qual è la lingua più parlata al mondo come madrelingua?', 'Cinese mandarino', ['Inglese', 'Spagnolo', 'Hindi'], 1),
    Q('Qual è la lingua più diffusa al mondo se si contano anche i parlanti non madrelingua?', 'Inglese', ['Cinese mandarino', 'Spagnolo', 'Hindi'], 1),
    Q('Quale Paese ha adottato l\'euro il 1° gennaio 2023?', 'Croazia', ['Bulgaria', 'Romania', 'Polonia'], 2),
    Q('Quale Stato americano è il più esteso?', 'Alaska', ['Texas', 'California', 'Montana'], 1),
    Q('Qual è lo Stato americano più popoloso?', 'California', ['Texas', 'Florida', 'New York'], 1),
    Q('Qual è l\'ultimo Stato entrato a far parte degli Stati Uniti, nel 1959?', 'Hawaii', ['Alaska', 'Florida', 'Texas'], 2),
    Q('Quale Paese è attraversato dall\'Equatore?', 'Kenya', ['Nigeria', 'Etiopia', 'Tanzania'], 2),
    Q('Quale Paese prende il nome dall\'Equatore?', 'Ecuador', ['Colombia', 'Gabon', 'Uganda'], 1),
    Q('Quale Paese è attraversato sia dall\'Equatore sia dal Tropico del Capricorno?', 'Brasile', ['Indonesia', 'Colombia', 'Kenya'], 3),
    Q('Quale linea immaginaria si trova a circa 23° di latitudine nord?', 'Tropico del Cancro', ['Tropico del Capricorno', 'Circolo polare artico', 'Equatore'], 2),
    Q('Quale meridiano corrisponde grossomodo alla linea internazionale del cambiamento di data?', '180°', ['0°', '90° est', '90° ovest'], 3),
    // Quante lingue / lingue speciali
    Q('Quali lingue sono ufficiali in Canada?', 'Inglese e francese', ['Inglese e spagnolo', 'Francese e olandese', 'Solo inglese'], 1),
    Q('Quali lingue sono ufficiali in Belgio?', 'Olandese, francese e tedesco', ['Solo olandese e francese', 'Francese e inglese', 'Olandese e inglese'], 2),
    Q('Quali lingue sono ufficiali in Finlandia?', 'Finlandese e svedese', ['Finlandese e russo', 'Finlandese e inglese', 'Solo finlandese'], 3),
    Q('Quali lingue sono ufficiali a Malta?', 'Maltese e inglese', ['Maltese e italiano', 'Solo maltese', 'Maltese e arabo'], 2),
    Q('Quali sono le lingue ufficiali dell\'Irlanda?', 'Irlandese e inglese', ['Solo inglese', 'Gaelico scozzese e inglese', 'Irlandese e francese'], 2),
    Q('Quante lingue ufficiali ha il Sudafrica?', '11', ['3', '5', '8'], 3),
    // Capitali di regioni, Stati e province
    Q('Qual è la capitale dello Stato americano di New York?', 'Albany', ['New York', 'Buffalo', 'Rochester'], 2),
    Q('Qual è la capitale del Texas?', 'Austin', ['Houston', 'Dallas', 'San Antonio'], 2),
    Q('Qual è la capitale della Florida?', 'Tallahassee', ['Miami', 'Orlando', 'Tampa'], 3),
    Q('Qual è la capitale dell\'Illinois?', 'Springfield', ['Chicago', 'Peoria', 'Rockford'], 3),
    Q('Qual è la capitale della provincia canadese del Québec?', 'Québec', ['Montréal', 'Ottawa', 'Toronto'], 2),
    Q('Qual è la capitale della Columbia Britannica, in Canada?', 'Victoria', ['Vancouver', 'Calgary', 'Edmonton'], 3),
    Q('Qual è la capitale del Queensland, in Australia?', 'Brisbane', ['Sydney', 'Cairns', 'Gold Coast'], 2),
    Q('Qual è la capitale della Scozia?', 'Edimburgo', ['Glasgow', 'Aberdeen', 'Dundee'], 1),
    Q('Qual è la capitale dell\'Irlanda del Nord?', 'Belfast', ['Dublino', 'Derry', 'Cork'], 2),
    Q('Qual è la capitale della Baviera?', 'Monaco di Baviera', ['Norimberga', 'Augusta', 'Ratisbona'], 2),
    Q('Qual è la capitale del land tedesco della Renania Settentrionale-Vestfalia?', 'Düsseldorf', ['Colonia', 'Dortmund', 'Essen'], 3),
    Q('Qual è la capitale della Sassonia, in Germania?', 'Dresda', ['Lipsia', 'Chemnitz', 'Berlino'], 3),
    Q('Qual è la capitale dell\'Andalusia?', 'Siviglia', ['Malaga', 'Granada', 'Cordova'], 3),
    // Città più popolose e soprannomi
    Q('Qual è la città più popolosa degli Stati Uniti?', 'New York', ['Los Angeles', 'Chicago', 'Houston'], 1),
    Q('Qual è la città più popolosa del Brasile?', 'San Paolo', ['Rio de Janeiro', 'Brasília', 'Salvador'], 1),
    Q('Qual è la città più popolosa del Canada?', 'Toronto', ['Montréal', 'Vancouver', 'Ottawa'], 1),
    Q('Qual è la città più popolosa della Turchia?', 'Istanbul', ['Ankara', 'Smirne', 'Bursa'], 1),
    Q('Qual è la città più popolosa della Svizzera?', 'Zurigo', ['Berna', 'Ginevra', 'Basilea'], 2),
    Q('Qual è la città più popolosa della Nigeria?', 'Lagos', ['Abuja', 'Kano', 'Ibadan'], 2),
    Q('Qual è la città più popolosa del Marocco?', 'Casablanca', ['Rabat', 'Marrakech', 'Fez'], 2),
    Q('Qual è la città più popolosa della Russia dopo Mosca?', 'San Pietroburgo', ['Novosibirsk', 'Kazan\'', 'Ekaterinburg'], 1),
    Q('Quale città è soprannominata «la Città dei Venti» (Windy City)?', 'Chicago', ['Boston', 'Seattle', 'Denver'], 2),
    Q('Quale città è soprannominata «Big Easy»?', 'New Orleans', ['Miami', 'Atlanta', 'Houston'], 3),
    Q('Quale città è soprannominata «la Città degli Angeli»?', 'Los Angeles', ['San Francisco', 'San Diego', 'Las Vegas'], 1),
    Q('Quale città è soprannominata «Sin City», la città del peccato?', 'Las Vegas', ['Miami', 'Houston', 'Phoenix'], 1),
    Q('Quale città indiana è chiamata «la Città Rosa»?', 'Jaipur', ['Delhi', 'Agra', 'Mumbai'], 3),
    // Confini
    Q('Quale di questi Paesi sudamericani confina con il Brasile?', 'Perù', ['Cile', 'Ecuador', 'Panama'], 2),
    Q('Quale Paese è interamente circondato dal Sudafrica?', 'Lesotho', ['Eswatini', 'Botswana', 'Namibia'], 2),
    Q('Con quale unico Paese confina il Portogallo?', 'Spagna', ['Francia', 'Andorra', 'Marocco'], 1),
    Q('Quanti Paesi confinano con la Germania?', '9', ['6', '7', '11'], 3),
    Q('Quale di questi Paesi europei NON confina con la Germania?', 'Slovacchia', ['Polonia', 'Austria', 'Danimarca'], 2),
    Q('Quale di questi Paesi confina con l\'Austria?', 'Slovacchia', ['Polonia', 'Croazia', 'Francia'], 2),
    Q('Quale Paese confina sia con la Francia sia con la Germania?', 'Svizzera', ['Austria', 'Polonia', 'Danimarca'], 2),
    Q('Con quale Paese confina la Norvegia a est, oltre a Svezia e Finlandia?', 'Russia', ['Danimarca', 'Estonia', 'Islanda'], 2),
    Q('Quale Paese confina con la Turchia?', 'Georgia', ['Ucraina', 'Egitto', 'Kazakistan'], 2),
    Q('Quale Paese confina con il Messico a sud?', 'Guatemala', ['Cuba', 'Nicaragua', 'Colombia'], 2),
  ];

  // ── Vero o falso (le affermazioni false hanno la spiegazione) ──
  const TF = (q, a, d, why) => (why ? { q, a, d, why } : { q, a, d });
  const tf = [
    TF('Il Bosforo collega il Mar Nero al Mar di Marmara.', true, 2),
    TF('Il Canale di Suez attraversa l\'Egitto.', true, 1),
    TF('Il Canale di Panama si trova in Messico.', false, 1, 'Si trova a Panama, in America centrale.'),
    TF('Il Mar Caspio è circondato da terre su tutti i lati.', true, 2),
    TF('Il Mar Nero non ha alcun collegamento con gli altri mari.', false, 2, 'Si collega al Mediterraneo attraverso il Bosforo e i Dardanelli.'),
    TF('Il Mar Rosso separa l\'Africa dalla penisola arabica.', true, 1),
    TF('Il Mar Baltico bagna le coste della Spagna.', false, 1, 'Bagna Paesi del Nord Europa come Svezia, Polonia e Finlandia.'),
    TF('Il Polo Nord si trova sulla terraferma.', false, 1, 'È in mezzo all\'Oceano Glaciale Artico, su ghiaccio marino.'),
    TF('L\'Antartide è il continente più freddo della Terra.', true, 1),
    TF('Il deserto del Sahara si trova in Asia.', false, 1, 'Il Sahara si trova nell\'Africa settentrionale.'),
    TF('Il Kalahari è un deserto dell\'Africa meridionale.', true, 2),
    TF('Il deserto di Atacama si trova in Cile.', true, 2),
    TF('Il Cervino si trova interamente in Francia.', false, 2, 'Sorge al confine tra Italia e Svizzera.'),
    TF('Il Monte Bianco è la vetta più alta delle Alpi.', true, 1),
    TF('L\'Aconcagua è la vetta più alta delle Americhe.', true, 2),
    TF('Il K2 è la seconda montagna più alta del mondo.', true, 1),
    TF('Il Kilimangiaro è un vulcano.', true, 2),
    TF('L\'Etna è il vulcano attivo più alto d\'Europa.', true, 2),
    TF('Il Vesuvio si trova in Sicilia.', false, 1, 'Si trova in Campania, vicino a Napoli.'),
    TF('Le isole Hawaii sono di origine vulcanica.', true, 1),
    TF('Il Giappone è un arcipelago.', true, 1),
    TF('Il Madagascar è un\'isola dell\'Oceano Indiano.', true, 1),
    TF('Cuba è la più grande isola dei Caraibi.', true, 2),
    TF('Bali fa parte delle Filippine.', false, 1, 'Bali è un\'isola dell\'Indonesia.'),
    TF('Creta è la più grande isola della Grecia.', true, 2),
    TF('La Corsica è più grande della Sardegna.', false, 2, 'La Sardegna (circa 24.000 km²) è molto più grande della Corsica (circa 8.700 km²).'),
    TF('L\'isola d\'Irlanda è divisa tra due Stati.', true, 1),
    TF('Il Canada è diviso in dieci province e tre territori.', true, 2),
    TF('Gli Stati Uniti sono formati da cinquanta Stati.', true, 1),
    TF('Il Brasile è l\'unico Paese sudamericano indipendente in cui il portoghese è lingua ufficiale.', true, 2),
    TF('Il Messico è il Paese di lingua spagnola con il maggior numero di abitanti.', true, 2),
    TF('L\'Argentina è il Paese di lingua spagnola più esteso.', true, 3),
    TF('Il Perù è attraversato dall\'Equatore.', false, 2, 'L\'Equatore attraversa Ecuador, Colombia e Brasile, ma non il Perù.'),
    TF('Il Kenya è attraversato dall\'Equatore.', true, 2),
    TF('L\'Indonesia è attraversata dall\'Equatore.', true, 2),
    TF('Il Madagascar si trova nell\'emisfero boreale.', false, 2, 'Si trova a sud dell\'Equatore, nell\'emisfero australe.'),
    TF('La Groenlandia è uno Stato indipendente.', false, 2, 'È un territorio autonomo che fa parte del Regno di Danimarca.'),
    TF('Il Portogallo confina con la Francia.', false, 1, 'Il Portogallo confina solo con la Spagna.'),
    TF('L\'Austria non ha sbocco sul mare.', true, 1),
    TF('La Polonia confina con la Germania.', true, 1),
    TF('La Svizzera ha uno sbocco sul mare.', false, 1, 'La Svizzera è circondata da altri Paesi e non ha coste.'),
    TF('La Bolivia non ha sbocco sul mare.', true, 2),
    TF('Il Paraguay non ha sbocco sul mare.', true, 2),
    TF('L\'Egitto confina con la Libia.', true, 2),
    TF('Il Rio delle Amazzoni attraversa il Brasile.', true, 1),
    TF('Il Nilo attraversa sia l\'Egitto sia il Sudan.', true, 1),
    TF('Il Danubio attraversa dieci Paesi.', true, 3),
    TF('Il Danubio nasce in Italia.', false, 2, 'Nasce in Germania, nella Foresta Nera.'),
    TF('La Senna attraversa Londra.', false, 1, 'Londra sorge sul Tamigi; la Senna attraversa Parigi.'),
    TF('Il Gange è un fiume sacro per gli induisti.', true, 1),
    TF('Il lago Titicaca si trova in Africa.', false, 1, 'Si trova sulle Ande, tra Perù e Bolivia.'),
    TF('Il Lago Vittoria bagna Uganda, Kenya e Tanzania.', true, 2),
    TF('Il lago Bajkal contiene circa un quinto dell\'acqua dolce liquida superficiale del pianeta.', true, 3),
    TF('Il Lago di Ginevra si trova tra Svizzera e Francia.', true, 2),
    TF('Il Lago di Costanza bagna Germania, Austria e Svizzera.', true, 3),
    TF('Il Grand Canyon si trova in Arizona.', true, 2),
    TF('Le Montagne Rocciose attraversano sia il Canada sia gli Stati Uniti.', true, 2),
    TF('La Turchia si trova interamente in Asia.', false, 2, 'Una piccola parte, la Tracia orientale, è in Europa.'),
    TF('Il Kazakistan si estende tra Europa e Asia.', true, 3),
    TF('La Finlandia non fa parte dell\'Unione Europea.', false, 2, 'La Finlandia è nell\'Unione Europea dal 1995.'),
    TF('La Svezia usa l\'euro come moneta.', false, 1, 'In Svezia si usa la corona svedese.'),
    TF('L\'Islanda fa parte dell\'Unione Europea.', false, 2, 'L\'Islanda non è un membro dell\'UE.'),
    TF('La Danimarca usa l\'euro come moneta.', false, 2, 'In Danimarca si usa la corona danese.'),
    TF('La Croazia usa l\'euro come moneta.', true, 2),
    TF('La Cina confina con quattordici Paesi.', true, 3),
    TF('La Russia confina con la Cina.', true, 1),
    TF('L\'India confina con la Thailandia.', false, 2, 'L\'India non ha un confine terrestre con la Thailandia: la separa il Myanmar.'),
    TF('Il Nepal si trova tra l\'India e la Cina.', true, 1),
    TF('Il Sudafrica ha tre capitali.', true, 2),
    TF('Hong Kong è uno Stato indipendente.', false, 2, 'È una regione amministrativa speciale della Cina.'),
    TF('Singapore è una città-Stato.', true, 1),
    TF('Il Mar Morto è un lago salato.', true, 1),
  ];

  // ── Metti in ordine ──
  const order = [
    { q: 'Metti in ordine di apertura, dal più antico', items: ['Canale di Suez', 'Canale di Corinto', 'Canale di Kiel', 'Canale di Panama'], d: 3 },
    { q: 'Metti in ordine di popolazione (2023), dal più popoloso', items: ['India', 'Stati Uniti', 'Indonesia', 'Brasile'], d: 2 },
    { q: 'Metti in ordine di popolazione (2023), dal più popoloso', items: ['Pakistan', 'Nigeria', 'Bangladesh', 'Giappone'], d: 3 },
    { q: 'Metti in ordine i Grandi Laghi per superficie, dal più esteso', items: ['Lago Superiore', 'Lago Huron', 'Lago Michigan', 'Lago Erie', 'Lago Ontario'], d: 3 },
    { q: 'Metti in ordine queste isole per superficie, dalla più grande', items: ['Groenlandia', 'Nuova Guinea', 'Borneo', 'Madagascar'], d: 2 },
    { q: 'Metti in ordine queste isole per superficie, dalla più grande', items: ['Sumatra', 'Honshu', 'Gran Bretagna', 'Islanda'], d: 3 },
    { q: 'Metti in ordine queste città da nord a sud', items: ['Reykjavík', 'Roma', 'Nairobi', 'Città del Capo'], d: 2 },
    { q: 'Metti in ordine questi Paesi africani per superficie, dal più esteso', items: ['Algeria', 'Repubblica Democratica del Congo', 'Sudan', 'Libia'], d: 3 },
    { q: 'Metti in ordine questi Paesi europei per superficie, dal più esteso', items: ['Ucraina', 'Spagna', 'Svezia', 'Germania'], d: 2 },
    { q: 'Metti in ordine questi Paesi sudamericani per superficie, dal più esteso', items: ['Brasile', 'Argentina', 'Perù', 'Colombia'], d: 2 },
    { q: 'Metti in ordine questi Stati americani per superficie, dal più esteso', items: ['Alaska', 'Texas', 'California', 'Montana'], d: 3 },
  ];

  // ── Indovina il numero ──
  const N = (q, v, min, max, tol, unit, d) => ({ q, v, min, max, tol, unit, d });
  const numbers = [
    N('Quanti Paesi sono membri dell\'ONU?', 193, 150, 230, 3, 'Paesi', 2),
    N('Quanti Paesi fanno parte dell\'Unione Europea (2024)?', 27, 15, 40, 1, 'Paesi', 1),
    N('Quanti Paesi dell\'Africa sono riconosciuti dall\'ONU?', 54, 30, 80, 2, 'Paesi', 3),
    N('Quanti Stati federati (Länder) ha la Germania?', 16, 5, 30, 0, 'Länder', 2),
    N('Quanti cantoni ha la Svizzera?', 26, 10, 40, 0, 'cantoni', 2),
    N('Quante comunità autonome ha la Spagna?', 17, 5, 30, 0, 'comunità', 3),
    N('Quante province ha il Canada?', 10, 3, 20, 0, 'province', 2),
    N('Quanti fusi orari ha la Russia?', 11, 3, 20, 0, 'fusi', 3),
    N('Quanti Paesi confinano con l\'Italia?', 6, 2, 12, 0, 'Paesi', 2),
    N('Quanti Paesi confinano con la Cina?', 14, 5, 25, 1, 'Paesi', 3),
    N('Quanti Paesi indipendenti ci sono in Sud America?', 12, 5, 20, 0, 'Paesi', 2),
    N('Quanti Stati ha l\'Australia?', 6, 2, 12, 0, 'Stati', 3),
    N('Quanti Stati americani confinano con il Messico?', 4, 1, 10, 0, 'Stati', 2),
    N('Quanti Paesi attraversa il Danubio?', 10, 3, 20, 0, 'Paesi', 3),
    N('Quanti miliardi di abitanti ha circa la Terra (2024)?', 8, 4, 12, 0, 'miliardi', 1),
    N('Quanto è profonda circa la Fossa delle Marianne?', 10900, 8000, 14000, 400, 'm', 3),
    N('Quanto è lungo circa il Canale di Suez?', 193, 100, 300, 10, 'km', 3),
    N('Quanto è lungo circa il Canale di Panama?', 82, 40, 160, 6, 'km', 3),
  ];
  const yearN = (q, v, d) => ({ q, v, min: 1800, max: 1950, tol: 1, unit: '', d });
  numbers.push(yearN('In che anno fu inaugurato il Canale di Suez?', 1869, 2), yearN('In che anno fu inaugurato il Canale di Panama?', 1914, 2));

  // ── Indovina dalle emoji ──
  const E = (emoji, answer, d) => ({ emoji, answer, d });
  const emojis = [
    E('🗽🍎🚕', 'New York', 1),
    E('🥐🗼🎨', 'Parigi', 1),
    E('🌉🚋🌫️', 'San Francisco', 2),
    E('🎰🎲🏜️', 'Las Vegas', 1),
    E('🐨🦘🏄', 'Australia', 1),
    E('🍣🗻🌸', 'Giappone', 1),
    E('🍺🥨🏰', 'Germania', 1),
    E('🌮🌵🎺', 'Messico', 1),
    E('🍁🦫🏒', 'Canada', 1),
    E('🐼🏮🥢', 'Cina', 1),
    E('🧀⛰️⌚🍫', 'Svizzera', 1),
    E('🌷🌬️🚲', 'Paesi Bassi', 1),
    E('🦁🐘🦒🌍', 'Africa', 1),
    E('🐧🧊❄️', 'Antartide', 1),
    E('⚽🎭🌴☕', 'Brasile', 1),
    E('💃🐂🥘', 'Spagna', 1),
    E('🌋🧊🌌', 'Islanda', 2),
    E('🥝🐑🏉', 'Nuova Zelanda', 1),
    E('🌺🏄🌋', 'Hawaii', 1),
    E('☘️🍺🎻', 'Irlanda', 1),
    E('🐻🪆❄️', 'Russia', 1),
    E('🛕🐘🍛', 'India', 1),
    E('🎬🌟🌴', 'Los Angeles', 2),
  ];

  // ── Scrivi la risposta ──
  const typed = [
    { q: 'Come si chiama la penisola in cui si trovano Spagna e Portogallo? (due parole)', a: 'Penisola iberica', accept: ['Iberica'], d: 1 },
    { q: 'Come si chiama l\'arcipelago ecuadoriano famoso per le tartarughe giganti e per Darwin?', a: 'Galápagos', accept: ['Galapagos', 'Isole Galápagos'], d: 2 },
    { q: 'Come si chiama il vulcano islandese la cui eruzione nel 2010 bloccò il traffico aereo europeo?', a: 'Eyjafjallajökull', accept: ['Eyjafjallajokull'], d: 3 },
    { q: 'Qual è il fiume più lungo dell\'Asia?', a: 'Yangtze', accept: ['Fiume Azzurro', 'Chang Jiang', 'Yangzi'], d: 2 },
    { q: 'Come si chiama l\'isola dell\'arcipelago delle Hawaii in cui si trova Honolulu?', a: 'Oahu', accept: ['O\'ahu'], d: 3 },
    { q: 'Come si chiama l\'oceano tra l\'Africa e l\'Australia?', a: 'Oceano Indiano', accept: ['Indiano'], d: 1 },
    { q: 'Quale Stato americano è formato solo da isole?', a: 'Hawaii', d: 1 },
    { q: 'In quale Stato americano si trova la città di Las Vegas?', a: 'Nevada', d: 2 },
    { q: 'In quale Stato americano si trova la città di Los Angeles?', a: 'California', d: 1 },
    { q: 'In quale Stato americano si trova la città di Miami?', a: 'Florida', d: 1 },
    { q: 'In quale Stato americano si trova la città di New Orleans?', a: 'Louisiana', d: 2 },
    { q: 'In quale Stato americano si trova il Grand Canyon?', a: 'Arizona', d: 2 },
    { q: 'In quale Stato americano si trova la città di Seattle?', a: 'Washington', accept: ['Stato di Washington'], d: 2 },
    { q: 'In quale Stato americano si trova la città di Boston?', a: 'Massachusetts', d: 3 },
    { q: 'In quale Stato americano si trova la città di Detroit?', a: 'Michigan', d: 3 },
  ];

  (D.pop = D.pop || []).push({
    id: 'plusmondo', extends: 'mondo',
    quiz, tf, tables, order, numbers, emojis, typed,
    emojiText: 'Quale luogo del mondo raccontano queste emoji?',
  });
})(typeof window !== 'undefined' ? window : globalThis);
