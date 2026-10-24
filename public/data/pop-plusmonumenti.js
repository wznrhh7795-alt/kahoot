// Monumenti e luoghi — domande in più per la categoria classica «monumenti» (extends): città e Paesi di monumenti,
// piazze, ponti, musei e opere, architetti, stili, regioni italiane, altezze e anni. Solo fatti verificati (fino al 2024).
(function (root) {
  'use strict';
  const D = (root.QZ_DATA = root.QZ_DATA || {});
  // Una riga = un elemento, colonne separate da «|».
  const rows = (s) => s.trim().split('\n').map((l) => l.split('|').map((x) => x.trim()));

  // ── Luoghi e monumenti: nome | città | Paese | difficoltà ──
  const luoghi = rows(`
Foro Romano|Roma|Italia|1
Altare della Patria|Roma|Italia|1
Piazza Navona|Roma|Italia|1
Piazza di Spagna|Roma|Italia|1
Terme di Caracalla|Roma|Italia|2
Circo Massimo|Roma|Italia|1
Ara Pacis|Roma|Italia|3
Scalinata di Trinità dei Monti|Roma|Italia|2
Villa Borghese|Roma|Italia|2
Bocca della Verità|Roma|Italia|2
Ponte Milvio|Roma|Italia|3
Basilica di San Giovanni in Laterano|Roma|Italia|3
Piazza San Pietro|Città del Vaticano|Città del Vaticano|1
Cappella Sistina|Città del Vaticano|Città del Vaticano|1
Musei Vaticani|Città del Vaticano|Città del Vaticano|1
Galleria Vittorio Emanuele II|Milano|Italia|1
Teatro alla Scala|Milano|Italia|1
Castello Sforzesco|Milano|Italia|1
Chiesa di Santa Maria delle Grazie|Milano|Italia|2
Pinacoteca di Brera|Milano|Italia|2
Bosco Verticale|Milano|Italia|2
Piazza dei Miracoli|Pisa|Italia|1
Piazza dei Cavalieri|Pisa|Italia|3
Palazzo Vecchio|Firenze|Italia|1
Galleria degli Uffizi|Firenze|Italia|1
Piazzale Michelangelo|Firenze|Italia|2
Palazzo Pitti|Firenze|Italia|2
Giardino di Boboli|Firenze|Italia|2
Campanile di Giotto|Firenze|Italia|2
Basilica di Santa Croce a Firenze|Firenze|Italia|2
Piazza della Signoria|Firenze|Italia|1
Palazzo Ducale di Venezia|Venezia|Italia|1
Piazza San Marco|Venezia|Italia|1
Campanile di San Marco|Venezia|Italia|2
Basilica di Santa Maria della Salute|Venezia|Italia|2
Teatro La Fenice|Venezia|Italia|2
Ca' d'Oro|Venezia|Italia|3
Torre degli Asinelli|Bologna|Italia|2
Piazza Maggiore|Bologna|Italia|2
Basilica di San Petronio|Bologna|Italia|2
Museo Egizio di Torino|Torino|Italia|1
Basilica di Superga|Torino|Italia|2
Castel dell'Ovo|Napoli|Italia|1
Maschio Angioino|Napoli|Italia|2
Teatro di San Carlo|Napoli|Italia|2
Galleria Umberto I|Napoli|Italia|3
Piazza del Plebiscito|Napoli|Italia|2
Certosa di San Martino|Napoli|Italia|3
Scavi di Pompei|Pompei|Italia|1
Scavi di Ercolano|Ercolano|Italia|2
Valle dei Templi|Agrigento|Italia|1
Teatro Greco di Taormina|Taormina|Italia|2
Cappella Palatina di Palermo|Palermo|Italia|3
Teatro Massimo di Palermo|Palermo|Italia|2
Duomo di Monreale|Monreale|Italia|3
Basilica di San Francesco d'Assisi|Assisi|Italia|1
Torre del Mangia|Siena|Italia|2
Duomo di Siena|Siena|Italia|2
Palazzo Ducale di Urbino|Urbino|Italia|3
Basilica di San Vitale|Ravenna|Italia|2
Mausoleo di Galla Placidia|Ravenna|Italia|3
Castello Estense|Ferrara|Italia|2
Palazzo Te|Mantova|Italia|3
Palazzo Ducale di Mantova|Mantova|Italia|3
Teatro Olimpico|Vicenza|Italia|3
Villa Rotonda|Vicenza|Italia|3
Cappella degli Scrovegni|Padova|Italia|2
Basilica di Sant'Antonio di Padova|Padova|Italia|2
Prato della Valle|Padova|Italia|3
Casa di Giulietta|Verona|Italia|1
Castelvecchio|Verona|Italia|3
Castello di Miramare|Trieste|Italia|2
Piazza Unità d'Italia di Trieste|Trieste|Italia|2
Duomo di Orvieto|Orvieto|Italia|2
Duomo di Modena|Modena|Italia|3
Basilica di San Nicola di Bari|Bari|Italia|3
Louvre|Parigi|Francia|1
Sacré-Cœur|Parigi|Francia|1
Moulin Rouge|Parigi|Francia|1
Opéra Garnier|Parigi|Francia|2
Centre Pompidou|Parigi|Francia|2
Les Invalides|Parigi|Francia|2
Panthéon di Parigi|Parigi|Francia|3
Sainte-Chapelle|Parigi|Francia|3
Museo d'Orsay|Parigi|Francia|2
Place de la Concorde|Parigi|Francia|2
Champs-Élysées|Parigi|Francia|1
Cimitero di Père-Lachaise|Parigi|Francia|2
Castello di Chambord|Chambord|Francia|3
Castello di Chenonceau|Chenonceaux|Francia|3
Palazzo dei Papi|Avignone|Francia|3
Cattedrale di Reims|Reims|Francia|2
Cattedrale di Chartres|Chartres|Francia|2
Cité de Carcassonne|Carcassonne|Francia|3
Promenade des Anglais|Nizza|Francia|2
Casinò di Monte Carlo|Monte Carlo|Principato di Monaco|2
Park Güell|Barcellona|Spagna|1
Casa Batlló|Barcellona|Spagna|2
Casa Milà|Barcellona|Spagna|2
Palau de la Música Catalana|Barcellona|Spagna|3
Museo del Prado|Madrid|Spagna|1
Palazzo Reale di Madrid|Madrid|Spagna|2
Puerta del Sol|Madrid|Spagna|2
Fontana di Cibeles|Madrid|Spagna|3
Monastero dell'Escorial|San Lorenzo de El Escorial|Spagna|3
Alcázar di Siviglia|Siviglia|Spagna|2
Giralda|Siviglia|Spagna|3
Mezquita di Cordova|Cordova|Spagna|2
Acquedotto di Segovia|Segovia|Spagna|2
Museo Guggenheim di Bilbao|Bilbao|Spagna|2
Città delle Arti e delle Scienze|Valencia|Spagna|3
Cattedrale di Santiago de Compostela|Santiago de Compostela|Spagna|2
Westminster Abbey|Londra|Regno Unito|1
Cattedrale di St Paul|Londra|Regno Unito|1
London Eye|Londra|Regno Unito|1
Trafalgar Square|Londra|Regno Unito|1
British Museum|Londra|Regno Unito|1
Palazzo di Westminster|Londra|Regno Unito|1
The Shard|Londra|Regno Unito|2
Piccadilly Circus|Londra|Regno Unito|1
Tate Modern|Londra|Regno Unito|2
Royal Albert Hall|Londra|Regno Unito|3
Castello di Windsor|Windsor|Regno Unito|1
Castello di Edimburgo|Edimburgo|Regno Unito|2
Cattedrale di Canterbury|Canterbury|Regno Unito|2
Bagni romani|Bath|Regno Unito|3
Reichstag|Berlino|Germania|1
East Side Gallery|Berlino|Germania|2
Torre della televisione di Berlino|Berlino|Germania|2
Checkpoint Charlie|Berlino|Germania|2
Isola dei Musei|Berlino|Germania|3
Castello di Heidelberg|Heidelberg|Germania|2
Frauenkirche di Dresda|Dresda|Germania|3
Zwinger|Dresda|Germania|3
Marienplatz di Monaco di Baviera|Monaco di Baviera|Germania|2
Castello di Nymphenburg|Monaco di Baviera|Germania|3
Cattedrale di Aquisgrana|Aquisgrana|Germania|3
Porta Nigra|Treviri|Germania|3
Elbphilharmonie|Amburgo|Germania|3
Palazzo di Schönbrunn|Vienna|Austria|1
Hofburg|Vienna|Austria|2
Cattedrale di Santo Stefano|Vienna|Austria|2
Opera di Stato di Vienna|Vienna|Austria|2
Palazzo del Belvedere|Vienna|Austria|3
Fortezza di Hohensalzburg|Salisburgo|Austria|2
Ponte della Cappella|Lucerna|Svizzera|3
Monumento al Leone|Lucerna|Svizzera|3
Jet d'Eau|Ginevra|Svizzera|2
Castelli di Bellinzona|Bellinzona|Svizzera|3
Casa di Anna Frank|Amsterdam|Paesi Bassi|1
Rijksmuseum|Amsterdam|Paesi Bassi|2
Museo Van Gogh|Amsterdam|Paesi Bassi|2
Binnenhof|L'Aia|Paesi Bassi|3
Grand-Place|Bruxelles|Belgio|2
Manneken Pis|Bruxelles|Belgio|1
Belfort di Bruges|Bruges|Belgio|3
Torre di Belém|Lisbona|Portogallo|1
Monastero dos Jerónimos|Lisbona|Portogallo|3
Elevador de Santa Justa|Lisbona|Portogallo|3
Palácio da Pena|Sintra|Portogallo|3
Torre dei Clérigos|Porto|Portogallo|3
Sirenetta|Copenaghen|Danimarca|1
Giardini di Tivoli|Copenaghen|Danimarca|2
Nyhavn|Copenaghen|Danimarca|2
Castello di Kronborg|Elsinore|Danimarca|3
Museo Vasa|Stoccolma|Svezia|2
Municipio di Stoccolma|Stoccolma|Svezia|3
Parco Vigeland|Oslo|Norvegia|3
Teatro dell'Opera di Oslo|Oslo|Norvegia|3
Hallgrímskirkja|Reykjavík|Islanda|2
Harpa|Reykjavík|Islanda|3
Cattedrale di Helsinki|Helsinki|Finlandia|2
Fortezza di Suomenlinna|Helsinki|Finlandia|3
Teatro Bolshoi|Mosca|Russia|1
Mausoleo di Lenin|Mosca|Russia|2
Ermitage|San Pietroburgo|Russia|1
Palazzo d'Inverno|San Pietroburgo|Russia|2
Chiesa del Salvatore sul Sangue Versato|San Pietroburgo|Russia|3
Cattedrale di Sant'Isacco|San Pietroburgo|Russia|3
Ponte Carlo|Praga|Repubblica Ceca|1
Orologio astronomico di Praga|Praga|Repubblica Ceca|2
Castello di Praga|Praga|Repubblica Ceca|1
Piazza Venceslao|Praga|Repubblica Ceca|2
Ponte delle Catene Széchenyi|Budapest|Ungheria|2
Parlamento di Budapest|Budapest|Ungheria|1
Bastione dei Pescatori|Budapest|Ungheria|2
Castello del Wawel|Cracovia|Polonia|2
Piazza del Mercato di Cracovia|Cracovia|Polonia|3
Miniera di sale di Wieliczka|Wieliczka|Polonia|3
Palazzo della Cultura e della Scienza|Varsavia|Polonia|3
Castello di Bran|Bran|Romania|2
Palazzo del Parlamento di Bucarest|Bucarest|Romania|3
Monastero di Rila|Rila|Bulgaria|3
Cattedrale Aleksandr Nevskij|Sofia|Bulgaria|3
Mura di Dubrovnik|Dubrovnik|Croazia|2
Palazzo di Diocleziano|Spalato|Croazia|2
Anfiteatro di Pola|Pola|Croazia|3
Stari Most|Mostar|Bosnia ed Erzegovina|3
Castello di Bled|Bled|Slovenia|3
Grotte di Postumia|Postumia|Slovenia|3
Fortezza di Kalemegdan|Belgrado|Serbia|3
Tempio di San Sava|Belgrado|Serbia|3
Cattedrale di Santa Sofia di Kiev|Kiev|Ucraina|3
Tempio di Zeus Olimpio|Atene|Grecia|3
Stadio Panathinaiko|Atene|Grecia|3
Santuario di Delfi|Delfi|Grecia|2
Olimpia|Olimpia|Grecia|2
Teatro di Epidauro|Epidauro|Grecia|3
Porta dei Leoni di Micene|Micene|Grecia|3
Palazzo del Gran Maestro dei Cavalieri|Rodi|Grecia|3
Moschea Blu|Istanbul|Turchia|1
Palazzo Topkapi|Istanbul|Turchia|2
Gran Bazar|Istanbul|Turchia|1
Cisterna Basilica|Istanbul|Turchia|3
Torre di Galata|Istanbul|Turchia|3
Moschea di Solimano|Istanbul|Turchia|3
Palazzo di Dolmabahçe|Istanbul|Turchia|3
Efeso|Efeso|Turchia|2
Troia|Troia|Turchia|2
Kaaba|La Mecca|Arabia Saudita|1
Moschea del Profeta|Medina|Arabia Saudita|2
Burj Al Arab|Dubai|Emirati Arabi Uniti|1
Grande Moschea dello sceicco Zayed|Abu Dhabi|Emirati Arabi Uniti|2
Louvre Abu Dhabi|Abu Dhabi|Emirati Arabi Uniti|3
Persepoli|Persepoli|Iran|2
Piazza Naqsh-e Jahan|Isfahan|Iran|3
Torre Azadi|Teheran|Iran|3
Palmira|Palmira|Siria|2
Moschea degli Omayyadi|Damasco|Siria|3
Jerash|Jerash|Giordania|3
Grande Moschea del Sultano Qaboos|Mascate|Oman|3
Muro del Pianto|Gerusalemme|—|1
Cupola della Roccia|Gerusalemme|—|1
Basilica del Santo Sepolcro|Gerusalemme|—|2
Piazza Tienanmen|Pechino|Cina|1
Tempio del Cielo|Pechino|Cina|2
Palazzo d'Estate|Pechino|Cina|2
Stadio Nazionale «Nido d'uccello»|Pechino|Cina|2
Esercito di terracotta|Xi'an|Cina|1
Bund|Shanghai|Cina|2
Oriental Pearl Tower|Shanghai|Cina|2
Torre di Tokyo|Tokyo|Giappone|1
Tokyo Skytree|Tokyo|Giappone|1
Tempio Senso-ji|Tokyo|Giappone|2
Santuario Meiji|Tokyo|Giappone|3
Incrocio di Shibuya|Tokyo|Giappone|1
Castello di Himeji|Himeji|Giappone|2
Tempio Kiyomizu-dera|Kyoto|Giappone|2
Castello di Osaka|Osaka|Giappone|2
Parco della Pace di Hiroshima|Hiroshima|Giappone|2
Tempio Tōdai-ji|Nara|Giappone|3
Palazzo Gyeongbokgung|Seul|Corea del Sud|2
N Seoul Tower|Seul|Corea del Sud|3
Wat Arun|Bangkok|Thailandia|2
Grande Palazzo Reale|Bangkok|Thailandia|2
Wat Pho|Bangkok|Thailandia|3
Marina Bay Sands|Singapore|Singapore|1
Gardens by the Bay|Singapore|Singapore|2
Merlion|Singapore|Singapore|2
Pagoda Shwedagon|Yangon|Myanmar|3
Forte Rosso|—|India|2
India Gate|—|India|2
Qutb Minar|—|India|3
Tempio del Loto|—|India|3
Hawa Mahal|Jaipur|India|2
Tempio d'Oro|Amritsar|India|2
Gateway of India|Mumbai|India|2
Forte di Agra|Agra|India|3
Stupa di Boudhanath|Kathmandu|Nepal|3
Registan|Samarcanda|Uzbekistan|3
Bayterek|Astana|Kazakistan|3
Flame Towers|Baku|Azerbaigian|3
Valle dei Re|Luxor|Egitto|1
Tempio di Karnak|Luxor|Egitto|2
Museo Egizio del Cairo|Il Cairo|Egitto|1
Cittadella di Saladino|Il Cairo|Egitto|3
Biblioteca di Alessandria|Alessandria d'Egitto|Egitto|2
Moschea Hassan II|Casablanca|Marocco|2
Jemaa el-Fna|Marrakech|Marocco|2
Moschea della Koutoubia|Marrakech|Marocco|3
Anfiteatro di El Djem|El Djem|Tunisia|3
Cartagine|Cartagine|Tunisia|2
Union Buildings|Pretoria|Sudafrica|3
Chiese rupestri di Lalibela|Lalibela|Etiopia|3
Grande Moschea di Djenné|Djenné|Mali|3
Monumento al Rinascimento Africano|Dakar|Senegal|3
Casa Bianca|Washington D.C.|Stati Uniti|1
Campidoglio degli Stati Uniti|Washington D.C.|Stati Uniti|1
Lincoln Memorial|Washington D.C.|Stati Uniti|1
Monumento a Washington|Washington D.C.|Stati Uniti|1
Times Square|New York|Stati Uniti|1
Central Park|New York|Stati Uniti|1
Ponte di Brooklyn|New York|Stati Uniti|1
Rockefeller Center|New York|Stati Uniti|2
Chrysler Building|New York|Stati Uniti|1
One World Trade Center|New York|Stati Uniti|1
Grand Central Terminal|New York|Stati Uniti|2
Museo Guggenheim di New York|New York|Stati Uniti|2
Metropolitan Museum of Art|New York|Stati Uniti|1
Liberty Bell|Filadelfia|Stati Uniti|2
Alamo|San Antonio|Stati Uniti|2
Gateway Arch|Saint Louis|Stati Uniti|2
Space Needle|Seattle|Stati Uniti|1
Scritta Hollywood|Los Angeles|Stati Uniti|1
Graceland|Memphis|Stati Uniti|2
Alcatraz|San Francisco|Stati Uniti|1
Willis Tower|Chicago|Stati Uniti|2
Cloud Gate|Chicago|Stati Uniti|3
CN Tower|Toronto|Canada|1
Parliament Hill|Ottawa|Canada|3
Château Frontenac|Québec|Canada|3
Teotihuacán|Teotihuacán|Messico|2
Zócalo|Città del Messico|Messico|2
Palacio de Bellas Artes|Città del Messico|Messico|3
Casa Azul|Città del Messico|Messico|2
Tulum|Tulum|Messico|2
Malecón|L'Avana|Cuba|2
Capitolio dell'Avana|L'Avana|Cuba|3
Linee di Nazca|Nazca|Perù|2
Sacsayhuamán|Cusco|Perù|3
Pan di Zucchero|Rio de Janeiro|Brasile|1
Stadio Maracanã|Rio de Janeiro|Brasile|1
Cattedrale di Brasilia|Brasilia|Brasile|3
Teatro Amazonas|Manaus|Brasile|3
Casa Rosada|Buenos Aires|Argentina|2
Obelisco di Buenos Aires|Buenos Aires|Argentina|2
Teatro Colón|Buenos Aires|Argentina|3
Sydney Harbour Bridge|Sydney|Australia|1
Royal Exhibition Building|Melbourne|Australia|3
Sky Tower|Auckland|Nuova Zelanda|2
Te Papa|Wellington|Nuova Zelanda|3
`).map(([name, citta, paese, d]) => ({ name, d: +d, citta, ...(paese !== '—' ? { paese } : {}) }));
  // Se il nome contiene già la città (o la città è «—») la domanda «in quale città» sarebbe banale: la omettiamo.
  const noCity = ['Biblioteca di Alessandria', 'Monastero dell\'Escorial'];
  for (const it of luoghi) {
    const base = (it.citta || '').replace(/^(Il |La |L')/, '').toLowerCase();
    if (it.citta === '—' || noCity.includes(it.name) || it.name.toLowerCase().includes(base) || /^(Efeso|Troia|Olimpia|Persepoli|Palmira|Jerash|Teotihuacán|Tulum|Cartagine|Scavi di Pompei|Scavi di Ercolano)$/.test(it.name)) delete it.citta;
  }

  // ── Monumenti italiani per regione: nome | regione | difficoltà ──
  const regioni = rows(`
Foro Romano|Lazio|1
Altare della Patria|Lazio|1
Villa d'Este a Tivoli|Lazio|3
Villa Adriana|Lazio|3
Abbazia di Montecassino|Lazio|3
Cascata delle Marmore|Umbria|2
Duomo di Orvieto|Umbria|2
Basilica di San Francesco d'Assisi|Umbria|1
Palazzo Ducale di Urbino|Marche|3
Santuario della Santa Casa di Loreto|Marche|3
Grotte di Frasassi|Marche|3
Arco di Traiano di Ancona|Marche|3
Torre degli Asinelli|Emilia-Romagna|2
Basilica di San Vitale|Emilia-Romagna|2
Castello Estense|Emilia-Romagna|2
Duomo di Modena|Emilia-Romagna|3
Battistero di Parma|Emilia-Romagna|3
Piazza dei Miracoli|Toscana|1
Torre del Mangia|Toscana|2
Piazza del Campo|Toscana|1
Torri di San Gimignano|Toscana|2
Ponte Vecchio|Toscana|1
Galleria degli Uffizi|Toscana|1
Cinque Terre|Liguria|1
Portofino|Liguria|1
Lanterna di Genova|Liguria|2
Acquario di Genova|Liguria|2
Duomo di Milano|Lombardia|1
Castello Sforzesco|Lombardia|1
Villa Carlotta|Lombardia|3
Teatro alla Scala|Lombardia|1
Isola Bella sul Lago Maggiore|Piemonte|3
Sacra di San Michele|Piemonte|3
Reggia di Venaria Reale|Piemonte|2
Mole Antonelliana|Piemonte|1
Castello di Fénis|Valle d'Aosta|3
Forte di Bard|Valle d'Aosta|3
Castel Tirolo|Trentino-Alto Adige|3
Castel Roncolo|Trentino-Alto Adige|3
Castello del Buonconsiglio|Trentino-Alto Adige|3
Castello di Miramare|Friuli-Venezia Giulia|2
Basilica di Aquileia|Friuli-Venezia Giulia|3
Palmanova|Friuli-Venezia Giulia|3
Arena di Verona|Veneto|1
Teatro Olimpico|Veneto|3
Cappella degli Scrovegni|Veneto|2
Basilica di San Marco|Veneto|1
Ponte di Rialto|Veneto|1
Villa Rotonda|Veneto|3
Reggia di Caserta|Campania|1
Scavi di Pompei|Campania|1
Templi di Paestum|Campania|2
Certosa di Padula|Campania|3
Duomo di Amalfi|Campania|2
Villa Rufolo a Ravello|Campania|3
Grotta Azzurra|Campania|2
Castel dell'Ovo|Campania|2
Trulli di Alberobello|Puglia|1
Castello Aragonese di Otranto|Puglia|3
Cattedrale di Trani|Puglia|3
Grotte di Castellana|Puglia|2
Sassi di Matera|Basilicata|1
Castello di Melfi|Basilicata|3
Castello Ruffo di Scilla|Calabria|3
Cattolica di Stilo|Calabria|3
Valle dei Templi|Sicilia|1
Teatro Greco di Siracusa|Sicilia|2
Duomo di Cefalù|Sicilia|2
Villa Romana del Casale|Sicilia|3
Cappella Palatina di Palermo|Sicilia|3
Tempio di Segesta|Sicilia|2
Templi di Selinunte|Sicilia|3
Teatro Massimo di Palermo|Sicilia|2
Nuraghe Su Nuraxi|Sardegna|2
Grotta di Nettuno|Sardegna|3
Rocca di Calascio|Abruzzo|3
Castello Monforte di Campobasso|Molise|3
`).map(([name, regione, d]) => ({ name, regione, d: +d }));

  // ── Meraviglie, opere e musei: opera | museo | difficoltà ──
  const opere = rows(`
La Gioconda|Louvre|1
Venere di Milo|Louvre|1
Nike di Samotracia|Louvre|2
La zattera della Medusa|Louvre|2
La Libertà che guida il popolo|Louvre|2
Le nozze di Cana di Veronese|Louvre|3
La nascita di Venere|Galleria degli Uffizi|1
La Primavera|Galleria degli Uffizi|1
Venere di Urbino|Galleria degli Uffizi|2
Tondo Doni|Galleria degli Uffizi|3
Guernica|Museo Reina Sofía|1
Las Meninas|Museo del Prado|2
Il giardino delle delizie|Museo del Prado|2
La maja desnuda|Museo del Prado|3
La ronda di notte|Rijksmuseum|1
La lattaia di Vermeer|Rijksmuseum|3
La ragazza con l'orecchino di perla|Mauritshuis|1
Pietra di Rosetta|British Museum|1
Notte stellata|MoMA|1
La persistenza della memoria|MoMA|2
Les Demoiselles d'Avignon|MoMA|3
Il bacio di Klimt|Palazzo del Belvedere|2
Il Giudizio universale di Michelangelo|Musei Vaticani|1
La scuola di Atene|Musei Vaticani|2
Laocoonte e i suoi figli|Musei Vaticani|3
Apollo del Belvedere|Musei Vaticani|3
Il bacio di Hayez|Pinacoteca di Brera|2
Il Cristo morto di Mantegna|Pinacoteca di Brera|3
Lo sposalizio della Vergine di Raffaello|Pinacoteca di Brera|3
David di Michelangelo|Galleria dell'Accademia|1
David di Donatello|Museo del Bargello|3
Bronzi di Riace|Museo Nazionale della Magna Grecia|2
Busto di Nefertiti|Neues Museum|2
Altare di Pergamo|Pergamonmuseum|3
Pietà Rondanini|Castello Sforzesco|3
Apollo e Dafne|Galleria Borghese|2
Ratto di Proserpina|Galleria Borghese|2
`).map(([name, museo, d]) => ({ name, museo, d: +d }));

  // ── Musei: nome | città | Paese | difficoltà ──
  const musei = rows(`
Louvre|Parigi|Francia|1
Museo d'Orsay|Parigi|Francia|1
Musée de l'Orangerie|Parigi|Francia|3
Museo Rodin|Parigi|Francia|3
Fondation Louis Vuitton|Parigi|Francia|3
Museo del Prado|Madrid|Spagna|1
Museo Reina Sofía|Madrid|Spagna|2
Museo Thyssen-Bornemisza|Madrid|Spagna|3
Galleria degli Uffizi|Firenze|Italia|1
Galleria dell'Accademia di Firenze|Firenze|Italia|1
Museo del Bargello|Firenze|Italia|3
Musei Vaticani|Città del Vaticano|Città del Vaticano|1
Galleria Borghese|Roma|Italia|2
MAXXI|Roma|Italia|3
Pinacoteca di Brera|Milano|Italia|2
Museo Nazionale del Cinema|Torino|Italia|2
Museo di Capodimonte|Napoli|Italia|3
Museo Archeologico Nazionale di Napoli|Napoli|Italia|2
Museo Correr|Venezia|Italia|3
Peggy Guggenheim Collection|Venezia|Italia|2
Rijksmuseum|Amsterdam|Paesi Bassi|1
Museo Van Gogh|Amsterdam|Paesi Bassi|1
Mauritshuis|L'Aia|Paesi Bassi|3
British Museum|Londra|Regno Unito|1
National Gallery|Londra|Regno Unito|1
Victoria and Albert Museum|Londra|Regno Unito|3
Tate Modern|Londra|Regno Unito|2
Metropolitan Museum of Art|New York|Stati Uniti|1
MoMA|New York|Stati Uniti|1
Museo Guggenheim di New York|New York|Stati Uniti|2
National Gallery of Art|Washington D.C.|Stati Uniti|3
National Air and Space Museum|Washington D.C.|Stati Uniti|3
Getty Center|Los Angeles|Stati Uniti|3
Art Institute of Chicago|Chicago|Stati Uniti|2
Ermitage|San Pietroburgo|Russia|1
Galleria Tret'jakov|Mosca|Russia|3
Pergamonmuseum|Berlino|Germania|2
Alte Pinakothek|Monaco di Baviera|Germania|3
Kunsthistorisches Museum|Vienna|Austria|3
Albertina|Vienna|Austria|3
Museo Munch|Oslo|Norvegia|3
Museo Vasa|Stoccolma|Svezia|2
Museo dell'Acropoli|Atene|Grecia|2
Museo Egizio del Cairo|Il Cairo|Egitto|2
Museo Nazionale di Antropologia|Città del Messico|Messico|3
Museo Guggenheim di Bilbao|Bilbao|Spagna|2
Museum of Old and New Art|Hobart|Australia|3
Museo Nazionale della Cina|Pechino|Cina|3
`).map(([name, citta, paese, d]) => ({ name, d: +d, citta, paese }));
  for (const it of musei) {
    const base = it.citta.replace(/^(Il |La |L')/, '').toLowerCase();
    if (it.name.toLowerCase().includes(base)) delete it.citta;
  }

  // ── Chi ha progettato (o scolpito): opera | autore | difficoltà ──
  const autori = rows(`
Opera House di Sydney|Jørn Utzon|2
Museo Guggenheim di Bilbao|Frank Gehry|2
Walt Disney Concert Hall|Frank Gehry|3
Piramide del Louvre|Ieoh Ming Pei|2
Fallingwater, la casa sulla cascata|Frank Lloyd Wright|3
Museo Guggenheim di New York|Frank Lloyd Wright|2
Villa Savoye|Le Corbusier|3
Cappella di Notre-Dame du Haut a Ronchamp|Le Corbusier|3
The Shard|Renzo Piano|2
Auditorium Parco della Musica di Roma|Renzo Piano|3
Aeroporto del Kansai|Renzo Piano|3
Mole Antonelliana|Alessandro Antonelli|2
Villa Rotonda|Andrea Palladio|2
Teatro Olimpico di Vicenza|Andrea Palladio|3
Basilica di San Giorgio Maggiore|Andrea Palladio|3
Colonnato di Piazza San Pietro|Gian Lorenzo Bernini|2
Fontana dei Quattro Fiumi|Gian Lorenzo Bernini|2
Fontana di Trevi|Nicola Salvi|3
Sant'Ivo alla Sapienza|Francesco Borromini|3
San Carlo alle Quattro Fontane|Francesco Borromini|3
Teatro alla Scala|Giuseppe Piermarini|3
Galleria Vittorio Emanuele II|Giuseppe Mengoni|3
Reggia di Caserta|Luigi Vanvitelli|2
Ponte di Rialto|Antonio da Ponte|3
Ponte dei Sospiri|Antonio Contino|3
Ospedale degli Innocenti|Filippo Brunelleschi|3
Cupola di Santa Maria del Fiore|Filippo Brunelleschi|1
Cappella dei Pazzi|Filippo Brunelleschi|3
Basilica di Superga|Filippo Juvarra|3
Palazzo Carignano|Guarino Guarini|3
Opéra Garnier|Charles Garnier|2
Basilica del Sacro Cuore di Parigi|Paul Abadie|3
Grande Arche de la Défense|Johan Otto von Spreckelsen|3
Panthéon di Parigi|Jacques-Germain Soufflot|3
Sagrada Família|Antoni Gaudí|1
Casa Batlló|Antoni Gaudí|1
Casa Milà|Antoni Gaudí|2
Park Güell|Antoni Gaudí|1
Palau de la Música Catalana|Lluís Domènech i Montaner|3
Città delle Arti e delle Scienze di Valencia|Santiago Calatrava|2
Ponte della Costituzione di Venezia|Santiago Calatrava|3
Cupola del Reichstag|Norman Foster|3
The Gherkin|Norman Foster|2
Chrysler Building|William Van Alen|3
Flatiron Building|Daniel Burnham|3
Ponte di Brooklyn|John Roebling|3
Lincoln Memorial|Henry Bacon|3
Monumento a Washington|Robert Mills|3
Casa Bianca|James Hoban|3
Vietnam Veterans Memorial|Maya Lin|3
Cattedrale di Brasilia|Oscar Niemeyer|2
Palácio da Alvorada|Oscar Niemeyer|3
Torri Petronas|César Pelli|3
Cattedrale di St Paul a Londra|Christopher Wren|2
Crystal Palace|Joseph Paxton|3
British Museum|Robert Smirke|3
Sirenetta di Copenaghen|Edvard Eriksen|2
Statua della Libertà|Frédéric Auguste Bartholdi|2
Monte Rushmore|Gutzon Borglum|2
Atomium|André Waterkeyn|3
Altare della Patria|Giuseppe Sacconi|3
David di Michelangelo|Michelangelo Buonarroti|1
Cupola di San Pietro|Michelangelo Buonarroti|1
Piazza del Campidoglio|Michelangelo Buonarroti|2
Tempio Malatestiano di Rimini|Leon Battista Alberti|3
Palazzo Rucellai|Leon Battista Alberti|3
Tempietto di San Pietro in Montorio|Donato Bramante|3
Scalinata di Trinità dei Monti|Francesco de Sanctis|3
Grattacielo Pirelli|Gio Ponti|3
MAXXI di Roma|Zaha Hadid|2
Heydar Aliyev Center|Zaha Hadid|3
Louvre Abu Dhabi|Jean Nouvel|2
Moschea di Solimano|Mimar Sinan|3
Zwinger di Dresda|Matthäus Daniel Pöppelmann|3
Palazzo di Sanssouci|Georg Wenzeslaus von Knobelsdorff|3
Bosco Verticale|Stefano Boeri|2
Casa da Música di Porto|Rem Koolhaas|3
Stazione di Liegi-Guillemins|Santiago Calatrava|3
`).map(([name, autore, d]) => ({ name, d: +d, autore }));
  const altAutore = { 'Ieoh Ming Pei': ['I. M. Pei', 'Pei', 'Ieoh Ming Pei'], 'Michelangelo Buonarroti': ['Michelangelo'], 'Frédéric Auguste Bartholdi': ['Bartholdi', 'Auguste Bartholdi', 'Frederic Auguste Bartholdi'], 'Gian Lorenzo Bernini': ['Bernini'], 'Antoni Gaudí': ['Gaudi', 'Antoni Gaudi'], 'Jørn Utzon': ['Jorn Utzon', 'Utzon'], 'César Pelli': ['Cesar Pelli', 'Pelli'], 'Le Corbusier': ['Corbusier'], 'Mimar Sinan': ['Sinan'], 'Gutzon Borglum': ['Borglum'], 'Maya Lin': ['Lin'] };
  for (const it of autori) if (altAutore[it.autore]) it.autoreAlt = altAutore[it.autore];

  // ── Stile architettonico: edificio | stile | difficoltà ──
  const stili = rows(`
Duomo di Milano|Gotico|1
Cattedrale di Notre-Dame di Parigi|Gotico|1
Cattedrale di Chartres|Gotico|2
Duomo di Colonia|Gotico|2
Cattedrale di Reims|Gotico|2
Cattedrale di Amiens|Gotico|3
Westminster Abbey|Gotico|2
Sainte-Chapelle|Gotico|3
Duomo di Orvieto|Gotico|3
Cattedrale di Burgos|Gotico|3
Duomo di Pisa|Romanico|2
Torre di Pisa|Romanico|2
Duomo di Modena|Romanico|3
Basilica di Sant'Ambrogio a Milano|Romanico|3
Basilica di San Nicola di Bari|Romanico|3
Cattedrale di Spira|Romanico|3
Abbazia di Sant'Antimo|Romanico|3
Fontana di Trevi|Barocco|2
Colonnato di Piazza San Pietro|Barocco|2
Fontana dei Quattro Fiumi|Barocco|3
Basilica di Superga|Barocco|3
San Carlo alle Quattro Fontane|Barocco|3
Sant'Ivo alla Sapienza|Barocco|3
Basilica di Santa Maria della Salute|Barocco|2
Cattedrale di Noto|Barocco|3
Palazzo Carignano|Barocco|3
Zwinger di Dresda|Barocco|3
Panthéon di Parigi|Neoclassico|3
Porta di Brandeburgo|Neoclassico|2
Casa Bianca|Neoclassico|2
Campidoglio degli Stati Uniti|Neoclassico|2
Arco della Pace di Milano|Neoclassico|3
Teatro alla Scala|Neoclassico|3
Teatro La Fenice|Neoclassico|3
British Museum|Neoclassico|3
Chiesa della Madeleine a Parigi|Neoclassico|3
Lincoln Memorial|Neoclassico|2
Ospedale degli Innocenti|Rinascimentale|3
Palazzo Rucellai|Rinascimentale|3
Tempietto di San Pietro in Montorio|Rinascimentale|3
Villa Rotonda|Rinascimentale|3
Basilica di San Giorgio Maggiore|Rinascimentale|3
Teatro Olimpico di Vicenza|Rinascimentale|3
Palazzo Ducale di Urbino|Rinascimentale|3
Cappella dei Pazzi|Rinascimentale|3
Castello di Chambord|Rinascimentale|2
Palazzo Pitti|Rinascimentale|3
Chrysler Building|Art déco|2
Empire State Building|Art déco|2
Rockefeller Center|Art déco|3
Cristo Redentore|Art déco|3
Radio City Music Hall|Art déco|3
Sagrada Família|Modernismo catalano|1
Casa Batlló|Modernismo catalano|2
Casa Milà|Modernismo catalano|2
Park Güell|Modernismo catalano|2
Palau de la Música Catalana|Modernismo catalano|3
Ospedale di Sant Pau a Barcellona|Modernismo catalano|3
Basilica di Santa Sofia|Bizantino|2
Basilica di San Vitale|Bizantino|2
Basilica di Sant'Apollinare in Classe|Bizantino|3
Taj Mahal|Mogul|1
Forte Rosso|Mogul|3
Tomba di Humayun|Mogul|3
Forte di Agra|Mogul|3
`).map(([name, stile, d]) => ({ name, d: +d, stile }));

  // ── Numeri: anni di inaugurazione, inizio dei lavori e altezze ──
  const num = (s, key) => rows(s).map(([name, v, d]) => ({ name, d: +d, [key]: +v }));
  const inaugurazioni = num(`
Torre Eiffel|1889|1
Statua della Libertà|1886|1
Empire State Building|1931|1
Chrysler Building|1930|2
Golden Gate Bridge|1937|1
Ponte di Brooklyn|1883|2
Tower Bridge|1894|2
Opera House di Sydney|1973|2
Sydney Harbour Bridge|1932|2
Burj Khalifa|2010|1
The Shard|2012|2
London Eye|2000|2
Museo Guggenheim di Bilbao|1997|2
Museo Guggenheim di New York|1959|3
Piramide del Louvre|1989|2
Centre Pompidou|1977|2
Grande Arche de la Défense|1989|3
Atomium|1958|2
Torre di Tokyo|1958|2
Tokyo Skytree|2012|2
CN Tower|1976|2
Space Needle|1962|2
Gateway Arch|1965|3
Cristo Redentore|1931|1
Altare della Patria|1911|2
Teatro alla Scala|1778|2
Teatro La Fenice|1792|3
Opéra Garnier|1875|3
Tour Montparnasse|1973|3
Torre della televisione di Berlino|1969|3
Torre Velasca|1958|3
Grattacielo Pirelli|1960|3
Stazione Centrale di Milano|1931|3
Lincoln Memorial|1922|3
Monte Rushmore|1941|3
Taipei 101|2004|3
Burj Al Arab|1999|3
Crystal Palace|1851|3
Royal Albert Hall|1871|3
Big Ben|1859|3
Viadotto di Millau|2004|3
Tunnel della Manica|1994|2
Ponte dell'Øresund|2000|3
Louvre Abu Dhabi|2017|3
Shanghai Tower|2015|3
One World Trade Center|2014|2
Willis Tower|1973|3
Flatiron Building|1902|3
Cattedrale di Brasilia|1970|3
Arco di Trionfo|1836|2
Porta di Brandeburgo|1791|3
Oriental Pearl Tower|1994|3
Harpa|2011|3
Elbphilharmonie|2017|3
Grande Moschea dello sceicco Zayed|2007|3
Teatro dell'Opera di Oslo|2008|3
`, 'anno');
  const inizi = num(`
Duomo di Milano|1386|2
Torre di Pisa|1173|2
Cattedrale di Notre-Dame di Parigi|1163|2
Cattedrale di Santa Maria del Fiore|1296|3
Basilica di San Pietro (edificio attuale)|1506|3
Taj Mahal|1632|2
Sagrada Família|1882|2
Duomo di Colonia|1248|3
Reggia di Caserta|1752|3
Torre di Londra|1078|3
Basilica di San Marco (edificio attuale)|1063|3
Campanile di Giotto|1334|3
Palazzo Vecchio|1299|3
Cappella Sistina|1473|3
Castello di Chambord|1519|3
Monastero dell'Escorial|1563|3
Cattedrale di San Basilio|1555|3
Mole Antonelliana|1863|3
Castello di Neuschwanstein|1869|2
Città Proibita|1406|3
Basilica di Santa Sofia|532|3
Ponte di Rialto|1588|3
Torre Eiffel|1887|3
Empire State Building|1930|3
Cattedrale di Reims|1211|3
Westminster Abbey (edificio attuale)|1245|3
Duomo di Pisa|1064|3
Reggia di Venaria|1675|3
Basilica di Superga|1717|3
`, 'inizio');
  const grattacieli = num(`
Burj Khalifa|828|1
Shanghai Tower|632|2
Abraj Al-Bait (La Mecca)|601|3
Ping An Finance Center|599|3
Lotte World Tower|555|3
One World Trade Center|541|2
Taipei 101|508|2
Tokyo Skytree|634|1
CN Tower|553|1
Torre di Canton|600|3
Torre Ostankino|540|3
Oriental Pearl Tower|468|2
Torre Eiffel|330|1
Empire State Building|443|1
Willis Tower|442|2
Torri Petronas|452|2
Lakhta Center|462|3
Burj Al Arab|321|3
Chrysler Building|319|2
The Shard|310|2
Torre di Tokyo|333|2
Torre della televisione di Berlino|368|2
Torre di Kuala Lumpur|421|3
Sky Tower di Auckland|328|3
`, 'altezza');
  const edifici = num(`
Torre Unicredit|231|2
Tour Montparnasse|210|3
Gateway Arch|192|2
Space Needle|184|2
The Gherkin|180|2
Big Ben|96|2
Torre di Pisa|56|1
Torre degli Asinelli|97|3
Campanile di San Marco|99|3
Basilica di San Pietro|136|2
Duomo di Colonia|157|2
Cattedrale di Ulm|162|3
Monumento a Washington|169|2
Mole Antonelliana|167|2
Grattacielo Pirelli|127|3
Atomium|102|3
London Eye|135|2
Torre Velasca|106|3
Grande Arche de la Défense|110|3
Cattedrale di Strasburgo|142|3
`, 'altezza');

  // ── Quiz scritti a mano ──
  const Q = (q, a, wrong, d) => ({ q, a, wrong, d });
  const quiz = [
    // Meraviglie del mondo
    Q('Quale delle sette meraviglie del mondo antico è l\'unica ancora in piedi?', 'Piramide di Cheope', ['Colosso di Rodi', 'Faro di Alessandria', 'Giardini pensili di Babilonia'], 1),
    Q('Quale meraviglia del mondo antico sorgeva sull\'isola di Rodi?', 'Il Colosso', ['Il Faro', 'Il Mausoleo', 'Il Tempio di Artemide'], 2),
    Q('In quale città sorgeva il Faro, una delle sette meraviglie del mondo antico?', 'Alessandria d\'Egitto', ['Atene', 'Rodi', 'Efeso'], 2),
    Q('In quale città sorgeva il Tempio di Artemide, una delle sette meraviglie antiche?', 'Efeso', ['Atene', 'Corinto', 'Sparta'], 3),
    Q('Quale scultore realizzò la statua di Zeus a Olimpia, una delle sette meraviglie antiche?', 'Fidia', ['Prassitele', 'Policleto', 'Mirone'], 3),
    Q('In onore di chi fu costruito il Mausoleo di Alicarnasso?', 'Mausolo, governatore della Caria', ['Dario I di Persia', 'Alessandro Magno', 'Ciro il Grande'], 3),
    Q('A quale sovrano la tradizione attribuisce i Giardini pensili di Babilonia?', 'Nabucodonosor II', ['Hammurabi', 'Ciro il Grande', 'Dario I'], 3),
    Q('Quale faraone fece costruire la Grande Piramide di Giza?', 'Cheope', ['Tutankhamon', 'Ramses II', 'Akhenaton'], 1),
    Q('Quali sono le tre grandi piramidi di Giza?', 'Cheope, Chefren e Micerino', ['Cheope, Djoser e Micerino', 'Chefren, Ramses e Micerino', 'Cheope, Chefren e Snefru'], 2),
    Q('Chi progettò la piramide a gradoni del faraone Djoser a Saqqara?', 'Imhotep', ['Senenmut', 'Ptahhotep', 'Hemiunu'], 3),
    Q('Quale di questi monumenti NON è stato eletto tra le «nuove sette meraviglie del mondo» nel 2007?', 'Torre Eiffel', ['Petra', 'Taj Mahal', 'Colosseo'], 2),
    Q('Quale delle nuove sette meraviglie del mondo si trova in Giordania?', 'Petra', ['Chichén Itzá', 'Machu Picchu', 'Taj Mahal'], 1),
    Q('Quale delle nuove sette meraviglie del mondo si trova in Messico?', 'Chichén Itzá', ['Petra', 'Machu Picchu', 'Cristo Redentore'], 1),
    Q('Quale delle nuove sette meraviglie del mondo si trova in Perù?', 'Machu Picchu', ['Chichén Itzá', 'Cristo Redentore', 'Petra'], 1),
    Q('Quale delle nuove sette meraviglie del mondo si trova in Brasile?', 'Cristo Redentore', ['Machu Picchu', 'Chichén Itzá', 'Colosseo'], 1),
    Q('Quale delle nuove sette meraviglie del mondo si trova in India?', 'Taj Mahal', ['Petra', 'Grande Muraglia', 'Colosseo'], 1),
    // Roma e Vaticano
    Q('Qual era il nome originario del Colosseo?', 'Anfiteatro Flavio', ['Anfiteatro Traiano', 'Anfiteatro Augusteo', 'Circo Massimo'], 2),
    Q('Quale imperatore inaugurò il Colosseo nell\'anno 80 d.C.?', 'Tito', ['Nerone', 'Traiano', 'Adriano'], 3),
    Q('Come si chiama l\'apertura circolare al centro della cupola del Pantheon?', 'Oculus', ['Rosone', 'Lanterna', 'Abside'], 2),
    Q('Quale imperatore fece ricostruire il Pantheon di Roma nella forma attuale?', 'Adriano', ['Augusto', 'Nerone', 'Costantino'], 2),
    Q('Quale grande pittore del Rinascimento è sepolto nel Pantheon di Roma?', 'Raffaello', ['Michelangelo', 'Leonardo da Vinci', 'Caravaggio'], 2),
    Q('Che cosa si fa per tradizione alla Fontana di Trevi per assicurarsi di tornare a Roma?', 'Si lancia una moneta', ['Si beve un sorso d\'acqua', 'Si lascia un lucchetto', 'Si fa un giro intorno alla fontana'], 1),
    Q('Castel Sant\'Angelo era in origine il mausoleo di quale imperatore?', 'Adriano', ['Augusto', 'Traiano', 'Marco Aurelio'], 2),
    Q('Quale fiume attraversa Roma?', 'Tevere', ['Arno', 'Reno', 'Po'], 1),
    Q('Quale antica strada romana era detta «regina viarum»?', 'Via Appia', ['Via Aurelia', 'Via Flaminia', 'Via Emilia'], 2),
    Q('Dove si svolgevano le corse dei carri nell\'antica Roma?', 'Circo Massimo', ['Foro Romano', 'Colosseo', 'Terme di Caracalla'], 1),
    Q('Quale era il centro della vita pubblica dell\'antica Roma?', 'Foro Romano', ['Circo Massimo', 'Colle Oppio', 'Campo Marzio'], 1),
    Q('Su quale piazza di Roma si trova la Fontana dei Quattro Fiumi di Bernini?', 'Piazza Navona', ['Piazza di Spagna', 'Piazza del Popolo', 'Piazza Venezia'], 2),
    Q('Su quale ponte di Roma gli innamorati appendono lucchetti, reso famoso da un romanzo di Federico Moccia?', 'Ponte Milvio', ['Ponte Sisto', 'Ponte Sant\'Angelo', 'Ponte Garibaldi'], 2),
    Q('Quale artista affrescò la volta della Cappella Sistina?', 'Michelangelo', ['Raffaello', 'Leonardo da Vinci', 'Giotto'], 1),
    Q('Quale cappella ospita il conclave per l\'elezione del papa?', 'Cappella Sistina', ['Cappella Paolina', 'Cappella Palatina', 'Basilica di San Pietro'], 1),
    Q('Quale artista affrescò le Stanze vaticane con «La scuola di Atene»?', 'Raffaello', ['Michelangelo', 'Caravaggio', 'Tiziano'], 2),
    Q('Quale scultore progettò il grande colonnato di Piazza San Pietro?', 'Gian Lorenzo Bernini', ['Michelangelo', 'Francesco Borromini', 'Antonio Canova'], 2),
    Q('Che cosa custodisce al suo interno l\'Altare della Patria a Roma?', 'La Tomba del Milite Ignoto', ['La tomba di Garibaldi', 'La tomba di Cavour', 'La tomba di Mazzini'], 2),
    Q('Dove si trova la Bocca della Verità?', 'Roma', ['Firenze', 'Napoli', 'Venezia'], 1),
    // Milano e il Nord
    Q('Come si chiama la statua dorata sulla guglia più alta del Duomo di Milano?', 'Madonnina', ['Angelo d\'oro', 'Santa Tecla', 'Dama di Milano'], 1),
    Q('Come è soprannominata la Galleria Vittorio Emanuele II di Milano?', 'Il salotto di Milano', ['Il corridoio di Milano', 'Il ventre di Milano', 'La vetrina d\'Italia'], 2),
    Q('In quale giorno inizia tradizionalmente la stagione lirica del Teatro alla Scala?', '7 dicembre', ['24 dicembre', '1 gennaio', '25 aprile'], 2),
    Q('In quale edificio milanese si trova l\'Ultima Cena di Leonardo da Vinci?', 'Santa Maria delle Grazie', ['Castello Sforzesco', 'Pinacoteca di Brera', 'Duomo di Milano'], 2),
    Q('Quale museo ospita la Mole Antonelliana a Torino?', 'Museo Nazionale del Cinema', ['Museo Egizio', 'Museo del Risorgimento', 'Museo dell\'Automobile'], 2),
    Q('Quale monumento veneziano collega Palazzo Ducale alle antiche prigioni?', 'Ponte dei Sospiri', ['Ponte di Rialto', 'Ponte degli Scalzi', 'Ponte dell\'Accademia'], 2),
    Q('Quale canale attraversa il Ponte di Rialto a Venezia?', 'Canal Grande', ['Canale della Giudecca', 'Rio di Cannaregio', 'Canale di San Marco'], 2),
    Q('Chi risiedeva nel Palazzo Ducale di Venezia?', 'Il doge', ['Il papa', 'Il re', 'L\'imperatore'], 1),
    Q('Quale animale è il simbolo di Venezia e di San Marco evangelista?', 'Il leone alato', ['L\'aquila bicipite', 'Il lupo', 'Il toro alato'], 1),
    Q('Quale piazza veneziana è chiamata «il salotto d\'Europa»?', 'Piazza San Marco', ['Campo Santa Margherita', 'Piazza del Popolo', 'Campo dei Mori'], 2),
    Q('Quale cittadina veneta ospita la casa di Giulietta con il celebre balcone?', 'Verona', ['Padova', 'Vicenza', 'Treviso'], 1),
    Q('Quale spettacolo ospita ogni estate l\'Arena di Verona?', 'Opere liriche', ['Partite di calcio', 'Gare di nuoto', 'Fiere agricole'], 1),
    Q('Quale pittore affrescò la Cappella degli Scrovegni a Padova?', 'Giotto', ['Mantegna', 'Tiziano', 'Cimabue'], 2),
    Q('Quale architetto progettò la Villa Rotonda e il Teatro Olimpico di Vicenza?', 'Andrea Palladio', ['Michele Sanmicheli', 'Jacopo Sansovino', 'Baldassarre Longhena'], 2),
    Q('Quale fiume attraversa Verona, ripiegando a forma di S?', 'Adige', ['Po', 'Brenta', 'Piave'], 2),
    // Toscana e Centro Italia
    Q('Di quale edificio è il campanile la Torre di Pisa?', 'Duomo di Pisa', ['Battistero di Pisa', 'Camposanto monumentale', 'Chiesa di Santa Maria della Spina'], 2),
    Q('Quale architetto progettò la cupola di Santa Maria del Fiore a Firenze?', 'Filippo Brunelleschi', ['Leon Battista Alberti', 'Michelozzo', 'Donatello'], 1),
    Q('Chi scolpì la «Porta del Paradiso» del Battistero di Firenze?', 'Lorenzo Ghiberti', ['Donatello', 'Filippo Brunelleschi', 'Luca della Robbia'], 3),
    Q('Quale artista progettò il complesso degli Uffizi di Firenze?', 'Giorgio Vasari', ['Brunelleschi', 'Michelangelo', 'Bernini'], 3),
    Q('Quale celebre ponte fiorentino ospita da secoli botteghe di orafi e gioiellieri?', 'Ponte Vecchio', ['Ponte alla Carraia', 'Ponte Santa Trinita', 'Ponte alle Grazie'], 1),
    Q('Sul fiume Arno si trova il Ponte Vecchio. In quale città scorre l\'Arno?', 'Firenze', ['Roma', 'Bologna', 'Venezia'], 1),
    Q('Quale piazza di Firenze ospita una copia del David di Michelangelo e Palazzo Vecchio?', 'Piazza della Signoria', ['Piazza Santa Croce', 'Piazzale Michelangelo', 'Piazza della Repubblica'], 2),
    Q('Quale museo fiorentino custodisce il David originale di Michelangelo?', 'Galleria dell\'Accademia', ['Galleria degli Uffizi', 'Museo del Bargello', 'Palazzo Pitti'], 1),
    Q('Quale cittadina toscana è famosa per le sue torri medievali?', 'San Gimignano', ['Montepulciano', 'Pienza', 'Cortona'], 2),
    Q('Quante volte all\'anno si corre il Palio in Piazza del Campo a Siena?', 'Due', ['Una', 'Tre', 'Quattro'], 2),
    Q('Quale santo è legato alla Basilica di Assisi?', 'San Francesco', ['Sant\'Antonio', 'San Benedetto', 'San Domenico'], 1),
    Q('Quale tipo di strutture sono i nuraghi della Sardegna?', 'Torri in pietra preistoriche', ['Tombe a piramide', 'Mulini a vento', 'Teatri antichi'], 2),
    Q('Quale città italiana è stata Capitale europea della cultura nel 2019?', 'Matera', ['Lecce', 'Siena', 'Ravenna'], 2),
    Q('Quale città ospita il Museo Egizio, tra i più importanti al mondo insieme a quello del Cairo?', 'Torino', ['Milano', 'Napoli', 'Roma'], 2),
    Q('Quale celebre eruzione distrusse Pompei ed Ercolano?', 'Quella del Vesuvio nel 79 d.C.', ['Quella dell\'Etna nel 44 a.C.', 'Quella del Vesuvio nel 1631', 'Quella dello Stromboli nel 79 d.C.'], 1),
    Q('Quale vulcano domina la città di Napoli?', 'Vesuvio', ['Etna', 'Stromboli', 'Vulcano'], 1),
    Q('Quale architetto progettò la Reggia di Caserta?', 'Luigi Vanvitelli', ['Filippo Juvarra', 'Gian Lorenzo Bernini', 'Guarino Guarini'], 2),
    Q('Quale Paese ha più siti UNESCO al mondo (2024)?', 'Italia', ['Cina', 'Francia', 'Spagna'], 2),
    Q('Quale di questi monumenti italiani NON è un sito UNESCO come singolo monumento?', 'Duomo di Milano', ['Castel del Monte', 'Reggia di Caserta', 'Cenacolo di Leonardo'], 3),
    // Francia
    Q('Quale ingegnere ha dato il nome alla Torre Eiffel?', 'Gustave Eiffel', ['Ferdinand de Lesseps', 'Georges Haussmann', 'Auguste Perret'], 1),
    Q('Chi ordinò nel 1806 la costruzione dell\'Arco di Trionfo di Parigi?', 'Napoleone Bonaparte', ['Luigi XIV', 'Luigi XVI', 'Carlo X'], 1),
    Q('Che cosa era in origine il Louvre?', 'Una fortezza', ['Un monastero', 'Un teatro', 'Una cattedrale'], 2),
    Q('Quale museo parigino si trova in una ex stazione ferroviaria?', 'Museo d\'Orsay', ['Louvre', 'Centre Pompidou', 'Museo Rodin'], 2),
    Q('Quale è il museo d\'arte più visitato del mondo?', 'Louvre', ['Museo del Prado', 'Museo d\'Orsay', 'British Museum'], 2),
    Q('Quale re trasformò Versailles in una grande reggia?', 'Luigi XIV', ['Napoleone III', 'Enrico IV', 'Francesco I'], 1),
    Q('In quale reggia si trova la celebre Galleria degli Specchi?', 'Versailles', ['Fontainebleau', 'Chambord', 'Louvre'], 1),
    Q('In quale anno un grande incendio danneggiò la cattedrale di Notre-Dame di Parigi?', '2019', ['2015', '2017', '2021'], 1),
    Q('Per quale evento fu costruita la Torre Eiffel?', 'L\'Esposizione universale del 1889', ['I Giochi olimpici del 1900', 'L\'incoronazione di Napoleone', 'L\'inaugurazione della metropolitana'], 2),
    Q('Da quale tempio egiziano proviene l\'obelisco di Place de la Concorde a Parigi?', 'Tempio di Luxor', ['Tempio di Abu Simbel', 'Tempio di File', 'Tempio di Edfu'], 3),
    Q('Quale architetto cinese-americano ha disegnato la piramide di vetro del Louvre?', 'Ieoh Ming Pei', ['Frank Gehry', 'Renzo Piano', 'Norman Foster'], 2),
    Q('Quale città francese ospita la cattedrale in cui venivano incoronati i re di Francia?', 'Reims', ['Chartres', 'Amiens', 'Rouen'], 3),
    Q('In quale città francese si trova il Palazzo dei Papi?', 'Avignone', ['Marsiglia', 'Lione', 'Tolosa'], 3),
    Q('Quale lungo viale di Parigi collega Place de la Concorde all\'Arco di Trionfo?', 'Champs-Élysées', ['Boulevard Saint-Germain', 'Rue de Rivoli', 'Avenue Montaigne'], 1),
    Q('Quale celebre locale di Montmartre ha un mulino rosso sul tetto?', 'Moulin Rouge', ['Lido', 'Folies Bergère', 'Crazy Horse'], 1),
    // Spagna e Portogallo
    Q('In quale città spagnola termina il Cammino di Santiago?', 'Santiago de Compostela', ['Siviglia', 'Burgos', 'Salamanca'], 1),
    Q('Quale dinastia musulmana costruì i palazzi dell\'Alhambra di Granada?', 'I Nasridi', ['Gli Omayyadi', 'Gli Abbasidi', 'Gli Almohadi'], 3),
    Q('Che cosa è diventata la grande moschea di Cordova dopo la Reconquista?', 'Una cattedrale cattolica', ['Un palazzo reale', 'Un museo', 'Una fortezza'], 2),
    Q('Quale architetto catalano progettò Casa Batlló e Park Güell?', 'Antoni Gaudí', ['Lluís Domènech i Montaner', 'Santiago Calatrava', 'Ricardo Bofill'], 1),
    Q('Quale museo di Madrid ospita «Las Meninas» di Velázquez?', 'Museo del Prado', ['Museo Reina Sofía', 'Museo Thyssen-Bornemisza', 'Palazzo Reale'], 2),
    Q('Quale museo di Madrid custodisce «Guernica» di Picasso?', 'Museo Reina Sofía', ['Museo del Prado', 'Museo Thyssen-Bornemisza', 'CaixaForum'], 1),
    Q('Quale architetto ha progettato il Museo Guggenheim di Bilbao?', 'Frank Gehry', ['Norman Foster', 'Zaha Hadid', 'Santiago Calatrava'], 2),
    Q('Quale torre fortificata del XVI secolo, sulla riva del Tago, è simbolo di Lisbona e dell\'età delle scoperte?', 'Torre di Belém', ['Castello di São Jorge', 'Torre dos Clérigos', 'Torre Vasco da Gama'], 2),
    Q('Quale opera romana a più arcate attraversa il centro di Segovia?', 'L\'acquedotto', ['Il ponte', 'L\'anfiteatro', 'Il teatro'], 2),
    // Regno Unito, Irlanda, Nord Europa
    Q('A che cosa si riferisce propriamente il nome «Big Ben»?', 'Alla grande campana della torre', ['All\'intera torre', 'Al Palazzo di Westminster', 'All\'orologio di Buckingham Palace'], 2),
    Q('Come si chiama ufficialmente dal 2012 la torre dell\'orologio del Big Ben?', 'Elizabeth Tower', ['Victoria Tower', 'Albert Tower', 'Churchill Tower'], 2),
    Q('In quale chiesa londinese si svolge l\'incoronazione dei sovrani britannici?', 'Westminster Abbey', ['Cattedrale di St Paul', 'Southwark Cathedral', 'Chiesa di St Martin-in-the-Fields'], 2),
    Q('Quale architetto progettò la cattedrale di St Paul a Londra dopo il Grande incendio del 1666?', 'Christopher Wren', ['Inigo Jones', 'Charles Barry', 'Norman Foster'], 2),
    Q('Quale colonna sovrasta Trafalgar Square a Londra?', 'La colonna di Nelson', ['La colonna di Wellington', 'La colonna di Churchill', 'La colonna di Drake'], 2),
    Q('Quale celebre pietra del British Museum permise di decifrare i geroglifici?', 'Pietra di Rosetta', ['Pietra di Behistun', 'Stele di Hammurabi', 'Pietra di Palermo'], 2),
    Q('In quale contea inglese si trova Stonehenge?', 'Wiltshire', ['Cornovaglia', 'Kent', 'Yorkshire'], 3),
    Q('Quale statua simbolo di Copenaghen si ispira a una fiaba di Andersen?', 'La Sirenetta', ['Il Brutto anatroccolo', 'La Regina delle nevi', 'Il Soldatino di stagno'], 1),
    Q('Quale nave del Seicento è conservata in un museo a Stoccolma?', 'Vasa', ['Victory', 'Mary Rose', 'Fram'], 2),
    Q('Quale scultore creò il celebre parco con oltre 200 sculture a Oslo?', 'Gustav Vigeland', ['Edvard Munch', 'Auguste Rodin', 'Henry Moore'], 3),
    // Europa centro-orientale
    Q('Quale fiume attraversa Praga e ospita il Ponte Carlo?', 'Moldava', ['Elba', 'Danubio', 'Vistola'], 2),
    Q('Quale fiume attraversa Budapest dividendo Buda da Pest?', 'Danubio', ['Moldava', 'Vistola', 'Tibisco'], 1),
    Q('Quale zar fece costruire la Cattedrale di San Basilio a Mosca?', 'Ivan IV il Terribile', ['Pietro il Grande', 'Nicola II', 'Alessandro III'], 2),
    Q('Quale ex residenza degli zar ospita oggi il museo dell\'Ermitage?', 'Palazzo d\'Inverno', ['Palazzo di Caterina', 'Palazzo di Peterhof', 'Cremlino'], 2),
    Q('Quale ritratto è appeso sulla Porta della Pace Celeste, affacciata su Piazza Tienanmen?', 'Mao Zedong', ['Deng Xiaoping', 'Zhou Enlai', 'Xi Jinping'], 2),
    Q('Quale edificio di Mosca custodisce il corpo imbalsamato di Lenin?', 'Il Mausoleo di Lenin', ['La Cattedrale di Cristo Salvatore', 'Il Cremlino', 'Il Teatro Bolshoi'], 2),
    Q('Che cosa significa «Sofia» nel nome della basilica di Santa Sofia?', 'Saggezza', ['Santità', 'Luce', 'Pace'], 3),
    Q('Quale città polacca ospita il castello reale del Wawel?', 'Cracovia', ['Varsavia', 'Danzica', 'Breslavia'], 2),
    Q('Quale ponte di Mostar, distrutto nel 1993, è stato ricostruito nel 2004?', 'Stari Most', ['Ponte Carlo', 'Ponte di Rialto', 'Ponte Latino'], 3),
    Q('Quale imperatore romano si fece costruire un palazzo oggi nel centro storico di Spalato?', 'Diocleziano', ['Traiano', 'Adriano', 'Costantino'], 3),
    Q('Quale città croata è famosa per le sue mura medievali sul mare Adriatico?', 'Dubrovnik', ['Zara', 'Spalato', 'Pola'], 1),
    Q('Quale celebre castello romeno è associato alla leggenda di Dracula?', 'Castello di Bran', ['Castello di Peleș', 'Castello di Hohenzollern', 'Castello di Eltz'], 2),
    Q('Quale lago sloveno ha al centro un\'isoletta con una chiesa ed è dominato da un castello?', 'Lago di Bled', ['Lago di Bohinj', 'Lago di Cerknica', 'Lago di Jasna'], 3),
    // Germania, Austria, Svizzera, Benelux
    Q('Quale edificio berlinese ha una cupola di vetro progettata da Norman Foster?', 'Reichstag', ['Porta di Brandeburgo', 'Duomo di Berlino', 'Neues Museum'], 2),
    Q('Quale cattedrale tedesca, iniziata nel 1248, fu completata solo nel 1880?', 'Duomo di Colonia', ['Cattedrale di Ulm', 'Duomo di Magonza', 'Cattedrale di Aquisgrana'], 2),
    Q('Quale re bavarese fece costruire il castello di Neuschwanstein?', 'Ludovico II', ['Massimiliano II', 'Ludovico I', 'Ottone I'], 2),
    Q('Quale celebre palazzo di Vienna fu residenza estiva degli Asburgo?', 'Schönbrunn', ['Hofburg', 'Belvedere', 'Hundertwasserhaus'], 2),
    Q('Quale celebre compositore è nato nella casa di Getreidegasse a Salisburgo?', 'Wolfgang Amadeus Mozart', ['Ludwig van Beethoven', 'Johann Strauss', 'Franz Schubert'], 1),
    Q('Quale ponte coperto in legno, con una torre ottagonale, è il simbolo di Lucerna?', 'Kapellbrücke (Ponte della Cappella)', ['Ponte Carlo', 'Ponte Vecchio', 'Pont du Gard'], 3),
    Q('Quale celebre getto d\'acqua simboleggia la città di Ginevra?', 'Jet d\'Eau', ['Fontana di Trevi', 'Manneken Pis', 'Fontana di Cibeles'], 2),
    Q('Quale bambino-statua simbolo di Bruxelles è celebre per il suo guardaroba?', 'Manneken Pis', ['Il Piccolo Principe', 'Tintin', 'Il Piccolo Nicolas'], 1),
    Q('A quale pittore è dedicato il museo di Amsterdam che custodisce «I mangiatori di patate»?', 'Vincent van Gogh', ['Rembrandt', 'Johannes Vermeer', 'Piet Mondrian'], 2),
    // Medio Oriente e Africa
    Q('Quale imperatore bizantino fece costruire Santa Sofia a Costantinopoli nel VI secolo?', 'Giustiniano', ['Costantino', 'Teodosio', 'Eraclio'], 3),
    Q('Quanti minareti ha la Moschea Blu di Istanbul?', 'Sei', ['Due', 'Quattro', 'Otto'], 3),
    Q('Verso quale edificio si rivolgono i musulmani nella preghiera?', 'La Kaaba', ['La Cupola della Roccia', 'La Moschea di al-Aqsa', 'La Moschea del Profeta'], 1),
    Q('In quale città si trova la Kaaba?', 'La Mecca', ['Medina', 'Gerusalemme', 'Il Cairo'], 1),
    Q('Quale antica capitale dell\'impero achemenide si trova in Iran?', 'Persepoli', ['Babilonia', 'Ninive', 'Palmira'], 3),
    Q('Quale popolo costruì la città di Petra?', 'I Nabatei', ['I Fenici', 'Gli Ittiti', 'Gli Assiri'], 3),
    Q('Con quale soprannome è nota Petra per il colore della roccia?', 'Città rosa', ['Città bianca', 'Città d\'oro', 'Città azzurra'], 2),
    Q('Perché negli anni Sessanta il tempio di Abu Simbel fu smontato e spostato?', 'Per la costruzione della diga di Assuan', ['Per un terremoto', 'Per una guerra', 'Per un\'eruzione vulcanica'], 2),
    Q('Quale archeologo scoprì la tomba di Tutankhamon nel 1922?', 'Howard Carter', ['Heinrich Schliemann', 'Arthur Evans', 'Hiram Bingham'], 2),
    Q('Dove si trova la Valle dei Re, che custodisce le tombe di molti faraoni?', 'Presso Luxor, in Egitto', ['Presso Assuan, in Egitto', 'Presso Giza, in Egitto', 'Presso Petra, in Giordania'], 2),
    Q('Quale tempio egizio è dedicato soprattutto al dio Amon-Ra?', 'Karnak', ['Dendera', 'File', 'Edfu'], 3),
    Q('Che aspetto ha la Sfinge di Giza?', 'Corpo di leone e testa umana', ['Corpo di toro e testa di falco', 'Corpo di cavallo e testa di donna', 'Corpo umano e testa di sciacallo'], 1),
    Q('Quale celebre piazza di Marrakech è animata da venditori e artisti di strada?', 'Jemaa el-Fna', ['Plaza Mayor', 'Piazza Tahrir', 'Piazza Bab Mansour'], 3),
    // Asia
    Q('Per chi l\'imperatore Shah Jahan fece costruire il Taj Mahal?', 'Per la moglie Mumtaz Mahal', ['Per la madre', 'Per il padre', 'Per il figlio'], 2),
    Q('Di quale materiale è rivestito il Taj Mahal?', 'Marmo bianco', ['Granito rosa', 'Arenaria rossa', 'Calcare giallo'], 1),
    Q('Quale fiume scorre accanto al Taj Mahal?', 'Yamuna', ['Gange', 'Indo', 'Brahmaputra'], 3),
    Q('A quale divinità fu dedicato in origine Angkor Wat?', 'Vishnu', ['Shiva', 'Buddha', 'Brahma'], 3),
    Q('Quale civiltà costruì Machu Picchu?', 'Gli Inca', ['I Maya', 'Gli Aztechi', 'I Nazca'], 1),
    Q('Quale esploratore americano rese famosa Machu Picchu al mondo nel 1911?', 'Hiram Bingham', ['Howard Carter', 'Heinrich Schliemann', 'Thor Heyerdahl'], 3),
    Q('Per quale imperatore furono creati i soldati dell\'Esercito di terracotta?', 'Qin Shi Huang', ['Kublai Khan', 'Puyi', 'Hongwu'], 2),
    Q('Quali dinastie imperiali abitarono la Città Proibita di Pechino?', 'Ming e Qing', ['Han e Tang', 'Song e Yuan', 'Zhou e Qin'], 3),
    Q('Quale torre di Tokyo, alta 333 metri e rossa e bianca, si ispira alla Torre Eiffel?', 'Tokyo Tower', ['Tokyo Skytree', 'Tokyo Metropolitan Government Building', 'Shinjuku Park Tower'], 2),
    Q('Quale santuario giapponese è famoso per il grande torii che sembra galleggiare sul mare?', 'Itsukushima', ['Fushimi Inari', 'Meiji', 'Sensō-ji'], 2),
    Q('Come è chiamato il castello di Himeji per il suo colore chiaro?', 'Castello dell\'Airone Bianco', ['Castello del Cigno', 'Castello della Luna', 'Castello della Neve'], 3),
    Q('Quale monumento di Hiroshima ricorda il bombardamento atomico del 1945?', 'Cupola della bomba atomica', ['Torre della pace', 'Porta Rashomon', 'Tempio Itsukushima'], 2),
    Q('Quale creatura con testa di leone e corpo di pesce è simbolo di Singapore?', 'Merlion', ['Garuda', 'Naga', 'Qilin'], 2),
    Q('Che cosa collega le due Torri Petronas di Kuala Lumpur a metà altezza?', 'Una passerella (skybridge)', ['Un ascensore panoramico', 'Un grande arco', 'Una cupola di vetro'], 2),
    Q('Quale grattacielo di Taipei detenne il record di edificio più alto del mondo dal 2004 al 2010?', 'Taipei 101', ['Torri Petronas', 'Shanghai Tower', 'Burj Al Arab'], 3),
    Q('Quale tempio di Bangkok è detto «Tempio dell\'Alba»?', 'Wat Arun', ['Wat Pho', 'Wat Phra Kaew', 'Wat Traimit'], 3),
    Q('Quale sito indonesiano di Giava è il più grande tempio buddista del mondo?', 'Borobudur', ['Prambanan', 'Shwedagon', 'Besakih'], 3),
    Q('Quale città dell\'Uzbekistan è nota per la piazza del Registan?', 'Samarcanda', ['Bukhara', 'Tashkent', 'Khiva'], 3),
    // Americhe e Oceania
    Q('Da quale Paese gli Stati Uniti hanno ricevuto in dono la Statua della Libertà?', 'Francia', ['Regno Unito', 'Italia', 'Spagna'], 1),
    Q('Su quale isola sorge la Statua della Libertà?', 'Liberty Island', ['Ellis Island', 'Staten Island', 'Long Island'], 2),
    Q('Quale di questi presidenti NON è scolpito sul Monte Rushmore?', 'John F. Kennedy', ['George Washington', 'Thomas Jefferson', 'Abraham Lincoln'], 1),
    Q('Quale presidente di cognome Roosevelt è scolpito sul Monte Rushmore?', 'Theodore Roosevelt', ['Franklin Delano Roosevelt', 'Eleanor Roosevelt', 'Kermit Roosevelt'], 2),
    Q('Qual è l\'indirizzo della Casa Bianca?', '1600 Pennsylvania Avenue', ['350 Fifth Avenue', '1 Capitol Street', '1600 Broadway'], 3),
    Q('Di che colore è dipinto il Golden Gate Bridge?', 'Arancione', ['Grigio', 'Blu', 'Verde'], 1),
    Q('Quali due parti di New York collega il Ponte di Brooklyn?', 'Manhattan e Brooklyn', ['Manhattan e Queens', 'Brooklyn e Staten Island', 'Manhattan e il Bronx'], 1),
    Q('Quale fiume scorre sotto il Ponte di Brooklyn?', 'East River', ['Hudson', 'Potomac', 'Mississippi'], 2),
    Q('Quanti piani ha l\'Empire State Building?', '102', ['86', '120', '150'], 3),
    Q('Che cosa scende a mezzanotte a Times Square per festeggiare il Capodanno?', 'Una sfera luminosa', ['Un enorme orologio', 'Una stella di cristallo', 'Un albero illuminato'], 1),
    Q('In quale città si trova Graceland, la villa di Elvis Presley?', 'Memphis', ['Nashville', 'New Orleans', 'Dallas'], 2),
    Q('In quale città americana si trova Alcatraz, l\'ex prigione su un\'isola?', 'San Francisco', ['Los Angeles', 'Boston', 'Seattle'], 1),
    Q('Quale monumento di Saint Louis è alto 192 metri ed è chiamato «Porta del West»?', 'Gateway Arch', ['Space Needle', 'Liberty Bell', 'Alamo'], 3),
    Q('In quale città americana si trova la Liberty Bell?', 'Filadelfia', ['Boston', 'Washington', 'New York'], 2),
    Q('Come era chiamata in origine la scritta Hollywood di Los Angeles nel 1923?', 'Hollywoodland', ['Hollywood Hills', 'Moviewood', 'Cinecittà'], 3),
    Q('In quale Stato americano si trova il forte Alamo?', 'Texas', ['Arizona', 'Nuovo Messico', 'Florida'], 2),
    Q('Quale torre di Toronto fu per molti anni la struttura autoportante più alta del mondo?', 'CN Tower', ['Space Needle', 'Torre Eiffel', 'Willis Tower'], 2),
    Q('Quale civiltà costruì la piramide di Kukulkán a Chichén Itzá?', 'I Maya', ['Gli Inca', 'Gli Aztechi', 'Gli Olmechi'], 1),
    Q('Quale popolo ha eretto i moai dell\'Isola di Pasqua?', 'I Rapa Nui', ['Gli Inca', 'I Maori', 'I Maya'], 2),
    Q('A quale Paese appartiene l\'Isola di Pasqua?', 'Cile', ['Perù', 'Messico', 'Polinesia Francese'], 2),
    Q('Su quale monte sorge il Cristo Redentore di Rio de Janeiro?', 'Corcovado', ['Pan di Zucchero', 'Monte Roraima', 'Serra dos Órgãos'], 2),
    Q('Quale architetto brasiliano progettò i principali edifici pubblici di Brasilia?', 'Oscar Niemeyer', ['Lúcio Costa', 'Paulo Mendes da Rocha', 'Burle Marx'], 2),
    Q('Da quale edificio di Buenos Aires parlava alla folla Evita Perón?', 'Casa Rosada', ['Teatro Colón', 'Palazzo del Congresso', 'Cattedrale metropolitana'], 2),
    Q('Quale città messicana ospita la Casa Azul, casa-museo di Frida Kahlo?', 'Città del Messico', ['Guadalajara', 'Oaxaca', 'Puebla'], 2),
    Q('Quale grande piazza di Città del Messico è circondata dalla cattedrale e dal Palazzo Nazionale?', 'Zócalo', ['Plaza de Mayo', 'Plaza Mayor', 'Plaza de la Revolución'], 3),
    Q('Quali misteriose figure sono disegnate nel deserto peruviano di Nazca?', 'Linee e geoglifi', ['Piramidi di sabbia', 'Cerchi di pietra', 'Statue di argilla'], 2),
    Q('Quale soprannome ha il Sydney Harbour Bridge?', 'L\'attaccapanni', ['Il pettine', 'La mezzaluna', 'L\'arcobaleno'], 3),
    Q('Quale popolo aborigeno considera sacro Uluru?', 'Gli Anangu', ['I Maori', 'I Sami', 'I Rapa Nui'], 3),
    // Grattacieli, ponti, musei, curiosità
    Q('Qual è il grattacielo più alto d\'Italia (2024)?', 'Torre Unicredit di Milano', ['Torre Allianz di Milano', 'Grattacielo Pirelli', 'Torre Velasca'], 2),
    Q('Come è soprannominata a Milano la torre Allianz progettata da Arata Isozaki?', 'Il Dritto', ['Lo Storto', 'Il Curvo', 'Il Grande'], 3),
    Q('Quale architetto ha ideato il Bosco Verticale di Milano?', 'Stefano Boeri', ['Renzo Piano', 'Mario Botta', 'Massimiliano Fuksas'], 2),
    Q('Qual è il grattacielo più alto d\'Europa (2024)?', 'Lakhta Center', ['Torre Federazione', 'The Shard', 'Commerzbank Tower'], 3),
    Q('Quale grattacielo ha preso il posto delle Torri Gemelle come edificio più alto di New York?', 'One World Trade Center', ['Empire State Building', 'Chrysler Building', 'Bank of America Tower'], 2),
    Q('Quale grattacielo di New York ha il coronamento a raggiera d\'acciaio in stile Art déco?', 'Chrysler Building', ['Empire State Building', 'Flatiron Building', 'Woolworth Building'], 2),
    Q('Quale celebre grattacielo londinese è chiamato «il cetriolino»?', '30 St Mary Axe (The Gherkin)', ['The Shard', 'Walkie-Talkie', 'Tower 42'], 2),
    Q('Quale ponte sospeso di Londra, dalle due torri, si apre per far passare le navi?', 'Tower Bridge', ['London Bridge', 'Westminster Bridge', 'Millennium Bridge'], 1),
    Q('Quale viadotto francese è il ponte più alto d\'Europa?', 'Viadotto di Millau', ['Pont du Gard', 'Ponte Alexandre III', 'Viadotto di Garabit'], 3),
    Q('Quale ponte collega Danimarca e Svezia attraverso l\'Øresund?', 'Ponte dell\'Øresund', ['Ponte del Gran Belt', 'Ponte di Öland', 'Ponte dello Skagerrak'], 3),
    Q('Quale celebre ponte parigino riceve il nome da uno zar russo?', 'Ponte Alexandre III', ['Pont Neuf', 'Pont des Arts', 'Pont de l\'Alma'], 3),
    Q('Quale tunnel sotto la Manica collega Francia e Inghilterra?', 'Eurotunnel', ['Tunnel del Fréjus', 'Tunnel del Gottardo', 'Tunnel del Brennero'], 1),
    Q('Quale museo di Londra ha sede in un\'ex centrale elettrica sul Tamigi?', 'Tate Modern', ['National Gallery', 'British Museum', 'Victoria and Albert Museum'], 3),
    Q('Quale museo fiorentino ha una celebre «Nascita di Venere» di Botticelli?', 'Galleria degli Uffizi', ['Museo del Bargello', 'Palazzo Pitti', 'Galleria dell\'Accademia'], 1),
    Q('Quale museo romano ospita «Apollo e Dafne» di Bernini?', 'Galleria Borghese', ['Musei Capitolini', 'Museo Nazionale Romano', 'Palazzo Barberini'], 3),
    Q('Quale museo ospita la Gioconda di Leonardo da Vinci?', 'Louvre', ['Uffizi', 'Prado', 'National Gallery'], 1),
    Q('Quale museo di New York ha una celebre struttura a spirale progettata da Frank Lloyd Wright?', 'Museo Guggenheim', ['MoMA', 'Metropolitan Museum', 'Whitney Museum'], 2),
    Q('Quale museo di Amsterdam espone «La ronda di notte» di Rembrandt?', 'Rijksmuseum', ['Museo Van Gogh', 'Stedelijk Museum', 'Mauritshuis'], 1),
    Q('Quale cattedrale italiana ha un celebre pavimento di marmo intarsiato con scene bibliche?', 'Duomo di Siena', ['Duomo di Pisa', 'Duomo di Orvieto', 'Duomo di Modena'], 3),
    Q('Quale architetto progettò il Palazzo del Parlamento di Budapest?', 'Imre Steindl', ['Antoni Gaudí', 'Otto Wagner', 'Josef Hoffmann'], 3),
  ];

  // ── Vero o falso (le affermazioni false hanno la spiegazione) ──
  const TF = (q, a, d, why) => (why ? { q, a, d, why } : { q, a, d });
  const tf = [
    TF('La Grande Piramide di Giza è l\'unica delle sette meraviglie del mondo antico ancora in piedi.', true, 1),
    TF('Il Colosso di Rodi esiste ancora e si può visitare.', false, 1, 'Fu distrutto da un terremoto nel 226 a.C. circa.'),
    TF('Il Faro di Alessandria sorgeva sull\'isola di Pharos.', true, 2),
    TF('Il Mausoleo di Alicarnasso diede origine al nome comune «mausoleo».', true, 2),
    TF('I Giardini pensili di Babilonia sorgevano nell\'odierno Egitto.', false, 2, 'Babilonia si trovava nell\'odierno Iraq.'),
    TF('Il Colosseo si trova a Milano.', false, 1, 'Si trova a Roma.'),
    TF('Il Colosseo poteva ospitare decine di migliaia di spettatori.', true, 1),
    TF('Il Pantheon di Roma ha un grande foro circolare al centro della cupola.', true, 1),
    TF('La Fontana di Trevi si trova a Firenze.', false, 1, 'Si trova a Roma.'),
    TF('Il Ponte Vecchio attraversa il fiume Arno.', true, 1),
    TF('Il Ponte di Rialto attraversa il Canal Grande a Venezia.', true, 1),
    TF('Il Ponte dei Sospiri si trova a Firenze.', false, 1, 'Si trova a Venezia.'),
    TF('La Torre di Pisa è il campanile del Duomo di Pisa.', true, 2),
    TF('La Mole Antonelliana è il simbolo di Torino.', true, 1),
    TF('Il Duomo di Milano è stato costruito in meno di dieci anni.', false, 2, 'I lavori iniziarono nel 1386 e durarono secoli.'),
    TF('La statua della Madonnina domina la guglia più alta del Duomo di Milano.', true, 1),
    TF('Il Teatro alla Scala si trova a Roma.', false, 1, 'Si trova a Milano.'),
    TF('La Reggia di Caserta fu progettata da Luigi Vanvitelli.', true, 2),
    TF('Le rovine di Pompei si trovano vicino a Napoli.', true, 1),
    TF('Nella Piazza del Campo di Siena si corre il Palio.', true, 1),
    TF('Il David di Michelangelo è esposto agli Uffizi.', false, 2, 'L\'originale è alla Galleria dell\'Accademia di Firenze.'),
    TF('La Cappella Sistina si trova nei Musei Vaticani.', true, 2),
    TF('Il Cenacolo di Leonardo da Vinci si trova a Milano.', true, 1),
    TF('I trulli di Alberobello si trovano in Puglia.', true, 1),
    TF('I Sassi di Matera sono in Sicilia.', false, 1, 'Matera è in Basilicata.'),
    TF('Venezia è costruita su una laguna.', true, 1),
    TF('L\'Italia è, nel 2024, il Paese con più siti UNESCO al mondo.', true, 2),
    TF('La Torre Eiffel è stata costruita per l\'Esposizione universale del 1889.', true, 1),
    TF('La Torre Eiffel è nata come monumento permanente e tutti i parigini la amarono subito.', false, 2, 'Doveva restare solo vent\'anni e molti artisti la criticarono.'),
    TF('L\'Arco di Trionfo si trova in Place de la Concorde.', false, 2, 'Si trova in Place Charles-de-Gaulle, in cima agli Champs-Élysées.'),
    TF('Il Louvre era in origine una fortezza medievale.', true, 2),
    TF('La Reggia di Versailles si trova nel centro di Parigi.', false, 1, 'Si trova a Versailles, a una ventina di chilometri da Parigi.'),
    TF('La cattedrale di Notre-Dame di Parigi è stata danneggiata da un incendio nel 2019.', true, 1),
    TF('La cattedrale di Notre-Dame è stata riaperta al pubblico nel dicembre 2024.', true, 2),
    TF('Il Moulin Rouge si trova a Lione.', false, 1, 'Si trova a Parigi, a Montmartre.'),
    TF('La Sagrada Família si trova a Madrid.', false, 1, 'Si trova a Barcellona.'),
    TF('La Sagrada Família è un\'opera di Antoni Gaudí.', true, 1),
    TF('L\'Alhambra si trova a Granada.', true, 1),
    TF('La Mezquita di Cordova è nata come moschea.', true, 2),
    TF('Il Museo del Prado si trova a Barcellona.', false, 1, 'Si trova a Madrid.'),
    TF('«Guernica» di Picasso è esposta al Museo Reina Sofía di Madrid.', true, 2),
    TF('Il Big Ben è il nome ufficiale dell\'intera torre dell\'orologio del Parlamento britannico.', false, 2, 'Big Ben è la grande campana; la torre è la Elizabeth Tower.'),
    TF('Il Tower Bridge è il ponte più vicino alla Torre di Londra.', true, 2),
    TF('Stonehenge si trova in Scozia.', false, 1, 'Si trova in Inghilterra, nel Wiltshire.'),
    TF('Il British Museum custodisce la Stele di Rosetta.', true, 1),
    TF('La Sirenetta è un monumento simbolo di Copenaghen.', true, 1),
    TF('La Porta di Brandeburgo si trova a Vienna.', false, 1, 'Si trova a Berlino.'),
    TF('Il Reichstag di Berlino ha una cupola di vetro aperta ai visitatori.', true, 2),
    TF('Il castello di Neuschwanstein fu voluto da Ludovico II di Baviera.', true, 2),
    TF('Il Duomo di Colonia è una cattedrale gotica.', true, 1),
    TF('Il Palazzo di Schönbrunn si trova a Vienna.', true, 1),
    TF('Il Manneken Pis è una celebre statuetta di Bruxelles.', true, 1),
    TF('La Casa di Anna Frank si trova a Rotterdam.', false, 1, 'Si trova ad Amsterdam.'),
    TF('Il Ponte Carlo attraversa la Moldava a Praga.', true, 2),
    TF('Il Cremlino si trova a San Pietroburgo.', false, 1, 'Si trova a Mosca.'),
    TF('L\'Ermitage ha sede nel Palazzo d\'Inverno a San Pietroburgo.', true, 2),
    TF('La Cattedrale di San Basilio si affaccia sulla Piazza Rossa di Mosca.', true, 1),
    TF('L\'Acropoli di Atene ospita il Partenone.', true, 1),
    TF('Il Partenone era dedicato alla dea Atena.', true, 1),
    TF('Delfi era famosa nell\'antichità per il suo oracolo.', true, 1),
    TF('I Giochi olimpici antichi si svolgevano a Olimpia.', true, 1),
    TF('Santa Sofia a Istanbul è stata nuovamente convertita in moschea nel 2020.', true, 2),
    TF('La Moschea Blu di Istanbul ha sei minareti.', true, 3),
    TF('La Kaaba si trova a Medina.', false, 2, 'Si trova alla Mecca.'),
    TF('Petra si trova in Giordania.', true, 1),
    TF('Il tempio di Abu Simbel è stato spostato per salvarlo dalle acque del Lago Nasser.', true, 2),
    TF('La Sfinge di Giza ha il corpo di un leone.', true, 1),
    TF('La Valle dei Re si trova vicino a Luxor.', true, 2),
    TF('Il Taj Mahal si trova a Nuova Delhi.', false, 2, 'Si trova ad Agra.'),
    TF('Il Taj Mahal è una tomba.', true, 1),
    TF('Angkor Wat si trova in Thailandia.', false, 2, 'Si trova in Cambogia.'),
    TF('La Città Proibita si trova a Pechino.', true, 1),
    TF('La Grande Muraglia cinese è visibile a occhio nudo dalla Luna.', false, 2, 'È un mito: dalla Luna non si distingue nessuna opera umana a occhio nudo.'),
    TF('L\'Esercito di terracotta fu sepolto con il primo imperatore della Cina.', true, 2),
    TF('Il castello di Himeji è in Giappone.', true, 1),
    TF('Il Tempio d\'Oro di Amritsar è un luogo sacro dei sikh.', true, 2),
    TF('Il Merlion è il simbolo di Singapore.', true, 1),
    TF('L\'Opera House di Sydney è stata progettata dall\'architetto danese Jørn Utzon.', true, 2),
    TF('Uluru si trova in Nuova Zelanda.', false, 1, 'Si trova in Australia.'),
    TF('La Statua della Libertà fu un dono della Francia agli Stati Uniti.', true, 1),
    TF('La Statua della Libertà si trova a Washington.', false, 1, 'Si trova a New York, su Liberty Island.'),
    TF('La Casa Bianca si trova a New York.', false, 1, 'Si trova a Washington.'),
    TF('Sul Monte Rushmore sono scolpiti quattro presidenti americani.', true, 1),
    TF('Il Golden Gate Bridge si trova a Los Angeles.', false, 1, 'Si trova a San Francisco.'),
    TF('L\'Empire State Building è stato per quasi quarant\'anni l\'edificio più alto del mondo.', true, 2),
    TF('Il Cristo Redentore sorge a Buenos Aires.', false, 1, 'Sorge a Rio de Janeiro.'),
    TF('Machu Picchu fu costruita dagli Inca.', true, 1),
    TF('Chichén Itzá è una città maya del Messico.', true, 1),
    TF('I moai dell\'Isola di Pasqua sono statue di pietra.', true, 1),
    TF('La CN Tower si trova a Montréal.', false, 2, 'Si trova a Toronto.'),
    TF('Il Burj Khalifa è a Dubai.', true, 1),
    TF('Il Burj Khalifa supera gli 800 metri di altezza.', true, 2),
    TF('Le Torri Petronas si trovano a Giacarta.', false, 2, 'Si trovano a Kuala Lumpur, in Malaysia.'),
    TF('Il Chrysler Building è un grattacielo in stile Art déco.', true, 2),
    TF('Il Louvre Abu Dhabi è stato inaugurato nel 2017.', true, 3),
    TF('La Piramide di vetro del Louvre fu progettata da Frank Gehry.', false, 2, 'La progettò Ieoh Ming Pei.'),
    TF('Il Museo Guggenheim di Bilbao è stato progettato da Frank Gehry.', true, 2),
    TF('Il Museo Egizio di Torino è uno dei più importanti musei egizi al mondo.', true, 2),
    TF('Il Museo d\'Orsay occupa un\'antica stazione ferroviaria.', true, 2),
    TF('Il Rijksmuseum si trova a Bruxelles.', false, 2, 'Si trova ad Amsterdam.'),
    TF('La Gioconda è esposta al Museo del Prado.', false, 1, 'È esposta al Louvre di Parigi.'),
    TF('Gaudí progettò anche il Park Güell di Barcellona.', true, 2),
    TF('Il Cammino di Santiago termina a Santiago de Compostela.', true, 1),
    TF('La Torre degli Asinelli si trova a Bologna.', true, 2),
    TF('Il Castello Sforzesco è una grande fortezza di Milano.', true, 1),
    TF('Il Campanile di Giotto si trova a Firenze.', true, 2),
    TF('Il Palazzo Ducale di Venezia era la residenza del doge.', true, 1),
    TF('Il Bosco Verticale è un complesso di due torri residenziali di Milano coperte di alberi.', true, 2),
    TF('La Valle dei Templi è un sito archeologico vicino ad Agrigento.', true, 1),
    TF('La Fontana di Trevi è in stile barocco.', true, 2),
    TF('La Sagrada Família è un esempio di architettura barocca.', false, 2, 'È il più celebre esempio di Modernismo catalano.'),
    TF('La Basilica di San Pietro si trova a Roma, in territorio italiano.', false, 2, 'Si trova nella Città del Vaticano, uno Stato indipendente.'),
    TF('La Cupola di San Pietro fu ideata da Michelangelo.', true, 2),
    TF('La Torre di Londra è stata usata anche come prigione.', true, 2),
    TF('Il Taipei 101 è a Taipei.', true, 1),
    TF('Il Palazzo di Westminster ospita il Parlamento del Regno Unito.', true, 1),
    TF('La Cattedrale di San Basilio fu voluta da Ivan il Terribile.', true, 2),
    TF('La Fontana dei Quattro Fiumi si trova in Piazza Navona.', true, 2),
    TF('Il Ponte di Brooklyn collega Manhattan e Brooklyn.', true, 1),
    TF('Il Gateway Arch è il simbolo della città di Seattle.', false, 2, 'È il simbolo di Saint Louis; a Seattle c\'è la Space Needle.'),
  ];

  // ── Metti in ordine ──
  const order = [
    { q: 'Metti in ordine di costruzione, dal più antico', items: ['Piramide di Cheope', 'Partenone', 'Colosseo', 'Santa Sofia', 'Notre-Dame di Parigi', 'Taj Mahal'], d: 2 },
    { q: 'Metti in ordine di inizio dei lavori, dal più antico', items: ['Torre di Pisa', 'Duomo di Milano', 'Basilica di San Pietro (attuale)', 'Reggia di Caserta', 'Torre Eiffel'], d: 3 },
    { q: 'Metti in ordine di inaugurazione, dal più antico', items: ['Torre Eiffel', 'Tower Bridge', 'Empire State Building', 'Opera House di Sydney', 'Burj Khalifa'], d: 2 },
    { q: 'Metti in ordine di altezza, dal più alto', items: ['Burj Khalifa', 'Tokyo Skytree', 'CN Tower', 'Empire State Building', 'Torre Eiffel'], d: 2 },
    { q: 'Metti in ordine di altezza, dal più alto', items: ['Torre Eiffel', 'Mole Antonelliana', 'Grattacielo Pirelli', 'Torre di Pisa'], d: 3 },
    { q: 'Metti in ordine di costruzione, dal più antico', items: ['Colosseo', 'Pantheon', 'Basilica di San Pietro', 'Fontana di Trevi', 'Altare della Patria'], d: 3 },
    { q: 'Metti in ordine da ovest a est, dal più occidentale', items: ['Statua della Libertà', 'Torre Eiffel', 'Colosseo', 'Taj Mahal', 'Opera House di Sydney'], d: 2 },
    { q: 'Metti in ordine dal più a nord al più a sud', items: ['Hallgrímskirkja (Reykjavík)', 'Cremlino (Mosca)', 'Torre Eiffel (Parigi)', 'Colosseo (Roma)', 'Piramidi di Giza'], d: 3 },
    { q: 'Metti in ordine di inaugurazione, dal più antico', items: ['Statua della Libertà', 'Cristo Redentore', 'Opera House di Sydney', 'Guggenheim di Bilbao'], d: 3 },
    { q: 'Metti in ordine di fondazione o costruzione, dal più antico', items: ['Stonehenge', 'Acropoli di Atene', 'Pantheon', 'Alhambra', 'Sagrada Família'], d: 3 },
  ];

  // ── Indovina il numero ──
  const N = (q, v, min, max, tol, unit, d) => ({ q, v, min, max, tol, unit, d });
  const numbers = [
    N('Quante sono le meraviglie del mondo antico?', 7, 3, 15, 0, 'meraviglie', 1),
    N('Quanti presidenti americani sono scolpiti sul Monte Rushmore?', 4, 2, 10, 0, 'presidenti', 1),
    N('Quanti minareti ha la Moschea Blu di Istanbul?', 6, 2, 10, 0, 'minareti', 3),
    N('Quanti piani ha l\'Empire State Building?', 102, 50, 150, 3, 'piani', 3),
    N('Quanti piani ha il Burj Khalifa?', 163, 100, 250, 5, 'piani', 3),
    N('Quanto è alta circa la Torre Eiffel, antenne comprese?', 330, 200, 500, 10, 'm', 2),
    N('Quanto è alto circa il Burj Khalifa?', 828, 500, 1100, 30, 'm', 2),
    N('Quanto è alta circa la Torre Unicredit di Milano?', 231, 120, 350, 10, 'm', 3),
    N('Quanto è alto circa il Campanile di San Marco a Venezia?', 99, 40, 160, 6, 'm', 3),
    N('Quanto è alta circa la Torre di Pisa?', 56, 20, 120, 4, 'm', 2),
    N('Quanto è alta circa la torre dell\'orologio del Big Ben (Elizabeth Tower)?', 96, 40, 160, 6, 'm', 3),
    N('Quanto è alta circa la cupola di San Pietro, dal suolo alla croce?', 136, 70, 220, 8, 'm', 3),
    N('Quanto era alta circa la Piramide di Cheope in origine?', 147, 80, 250, 8, 'm', 3),
    N('Quanto è alta circa la CN Tower di Toronto?', 553, 300, 800, 20, 'm', 2),
    N('Quanti spettatori poteva ospitare circa il Colosseo?', 50000, 10000, 100000, 12000, 'spettatori', 2),
    N('Quanti siti italiani sono Patrimonio UNESCO (2024)?', 60, 30, 90, 3, 'siti', 3),
    N('In che anno un grande incendio danneggiò Notre-Dame di Parigi?', 2019, 2000, 2024, 0, '', 1),
    N('In che anno fu inaugurata la Torre Eiffel?', 1889, 1800, 1950, 1, '', 2),
    N('In che anno fu inaugurata la Statua della Libertà?', 1886, 1800, 1950, 1, '', 2),
    N('In che anno fu eretto il Muro di Berlino?', 1961, 1920, 2000, 1, '', 2),
    N('In che anno fu inaugurato l\'Empire State Building?', 1931, 1900, 1960, 1, '', 2),
    N('In che anno fu aperta al pubblico l\'Opera House di Sydney?', 1973, 1920, 2000, 1, '', 3),
    N('In che anno iniziarono i lavori del Duomo di Milano?', 1386, 1100, 1700, 20, '', 3),
    N('In che anno fu inaugurato il Burj Khalifa?', 2010, 1990, 2024, 1, '', 2),
    N('In che anno eruttò il Vesuvio distruggendo Pompei (d.C.)?', 79, 1, 200, 0, 'd.C.', 1),
    N('In che anno fu ricostruito il Ponte di Mostar (Stari Most)?', 2004, 1990, 2020, 0, '', 3),
  ];

  // ── Indovina dalle emoji ──
  const E = (emoji, answer, d) => ({ emoji, answer, d });
  const emojis = [
    E('🗼🥖🇫🇷', 'Torre Eiffel', 1),
    E('🗽🌃🍎', 'Statua della Libertà', 1),
    E('🏟️⚔️🦁', 'Colosseo', 1),
    E('🌉🔴🌫️', 'Golden Gate Bridge', 1),
    E('🕰️🔔🇬🇧', 'Big Ben', 1),
    E('🔺🐪☀️', 'Piramidi di Giza', 1),
    E('🕌🤍💞', 'Taj Mahal', 1),
    E('🧱🐉🇨🇳', 'Grande Muraglia', 1),
    E('🍝🗼↗️', 'Torre di Pisa', 1),
    E('🪙⛲🏛️', 'Fontana di Trevi', 1),
    E('🌋🏺🏛️', 'Pompei', 1),
    E('⛰️✝️🇧🇷', 'Cristo Redentore', 1),
    E('🗿🌴🌊', 'Moai', 1),
    E('🦘🎭⛵', 'Opera House di Sydney', 2),
    E('🏰❄️👸', 'Castello di Neuschwanstein', 2),
    E('🧜‍♀️🌊🇩🇰', 'Sirenetta di Copenaghen', 2),
    E('🛕🐘🌴', 'Angkor Wat', 2),
    E('🏛️🦉🇬🇷', 'Partenone', 2),
    E('🚇🔴🏰', 'Cremlino', 2),
    E('🏔️🦙☁️', 'Machu Picchu', 1),
    E('🌉💬😮‍💨', 'Ponte dei Sospiri', 2),
    E('🔔🇺🇸📜', 'Liberty Bell', 3),
    E('🧊🌹🏜️', 'Petra', 2),
    E('🎡🇬🇧🌉', 'London Eye', 2),
    E('🛕⛩️🦊', 'Fushimi Inari', 3),
  ];

  // ── Scrivi la risposta ──
  const typed = [
    { q: 'In quale città si trova la Torre pendente?', a: 'Pisa', d: 1 },
    { q: 'Come si chiama il celebre teatro lirico di Milano?', a: 'Teatro alla Scala', accept: ['La Scala', 'Scala', 'Alla Scala'], d: 1 },
    { q: 'Come si chiama il grande museo di Parigi che custodisce la Gioconda?', a: 'Louvre', accept: ['Museo del Louvre', 'Il Louvre'], d: 1 },
    { q: 'Come si chiama la cattedrale gotica sull\'Île de la Cité a Parigi?', a: 'Notre-Dame', accept: ['Notre Dame', 'Notre-Dame de Paris', 'Cattedrale di Notre-Dame'], d: 1 },
    { q: 'Come si chiama la grande campana nella torre del Parlamento di Londra?', a: 'Big Ben', d: 1 },
    { q: 'In quale città si trova la Sagrada Família?', a: 'Barcellona', d: 1 },
    { q: 'In quale città spagnola si trova l\'Alhambra?', a: 'Granada', d: 1 },
    { q: 'In quale Paese si trova il sito archeologico di Petra?', a: 'Giordania', d: 1 },
    { q: 'In quale Paese si trova Machu Picchu?', a: 'Perù', d: 1 },
    { q: 'In quale Paese si trova il complesso di Angkor Wat?', a: 'Cambogia', d: 2 },
    { q: 'Quale architetto danese progettò l\'Opera House di Sydney?', a: 'Jørn Utzon', accept: ['Utzon', 'Jorn Utzon'], d: 3 },
    { q: 'Chi scolpì il David custodito alla Galleria dell\'Accademia di Firenze?', a: 'Michelangelo', accept: ['Michelangelo Buonarroti'], d: 1 },
    { q: 'Quale architetto catalano progettò la Sagrada Família?', a: 'Antoni Gaudí', accept: ['Gaudi', 'Gaudí', 'Antoni Gaudi'], d: 1 },
    { q: 'In quale città si trova il Cremlino?', a: 'Mosca', d: 1 },
    { q: 'In quale città si trova l\'Acropoli con il Partenone?', a: 'Atene', d: 1 },
    { q: 'In quale città indiana si trova il Taj Mahal?', a: 'Agra', d: 1 },
    { q: 'In quale città brasiliana si trova il Cristo Redentore?', a: 'Rio de Janeiro', accept: ['Rio'], d: 1 },
    { q: 'Come si chiama il castello bavarese che ispirò quello della Bella Addormentata di Disney?', a: 'Neuschwanstein', accept: ['Castello di Neuschwanstein'], d: 2 },
    { q: 'Come si chiama il tempio di Atene dedicato alla dea Atena?', a: 'Partenone', accept: ['Il Partenone'], d: 1 },
    { q: 'Come si chiama la grande piazza di Mosca vicino alla cattedrale di San Basilio?', a: 'Piazza Rossa', accept: ['La Piazza Rossa'], d: 1 },
    { q: 'Come si chiama il grande palazzo imperiale di Pechino?', a: 'Città Proibita', accept: ['La Città Proibita'], d: 2 },
    { q: 'Quale architetto svizzero-francese progettò la Villa Savoye?', a: 'Le Corbusier', accept: ['Corbusier'], d: 3 },
    { q: 'In quale città si trova la Torre Eiffel?', a: 'Parigi', d: 1 },
    { q: 'Qual è la più grande delle tre piramidi di Giza?', a: 'Cheope', accept: ['Piramide di Cheope', 'Khufu'], d: 2 },
    { q: 'Come si chiama l\'isola di New York su cui sorge la Statua della Libertà?', a: 'Liberty Island', accept: ['Isola della Libertà'], d: 2 },
    { q: 'In quale città si trova la Mole Antonelliana?', a: 'Torino', d: 1 },
    { q: 'Come si chiama la cattedrale di Firenze con la cupola del Brunelleschi?', a: 'Santa Maria del Fiore', accept: ['Duomo di Firenze', 'Cattedrale di Santa Maria del Fiore'], d: 2 },
    { q: 'In quale città argentina si trova la Casa Rosada?', a: 'Buenos Aires', d: 2 },
    { q: 'In quale città russa si trova il museo dell\'Ermitage?', a: 'San Pietroburgo', accept: ['Pietroburgo'], d: 2 },
    { q: 'Come si chiama la grande chiesa-moschea-museo di Istanbul dedicata alla «Saggezza divina»?', a: 'Santa Sofia', accept: ['Hagia Sophia', 'Basilica di Santa Sofia', 'Aya Sofya'], d: 1 },
    { q: 'In quale città polacca si trova il castello reale del Wawel?', a: 'Cracovia', d: 3 },
    { q: 'In quale città si trova il Duomo con la Madonnina dorata?', a: 'Milano', d: 1 },
    { q: 'In quale città si trova il Ponte di Rialto?', a: 'Venezia', d: 1 },
    { q: 'In quale città si trova la Fontana di Trevi?', a: 'Roma', d: 1 },
    { q: 'Come si chiama la cupola di vetro dell\'edificio del Parlamento tedesco a Berlino?', a: 'Reichstag', accept: ['Cupola del Reichstag'], d: 3 },
    { q: 'Come si chiama il museo di Madrid in cui è conservato «Las Meninas»?', a: 'Museo del Prado', accept: ['Prado', 'Il Prado'], d: 2 },
    { q: 'Quale ponte di Venezia collega Palazzo Ducale alle prigioni?', a: 'Ponte dei Sospiri', accept: ['Dei Sospiri'], d: 2 },
  ];

  // ── Tabelle ──
  const T = (id, items, fields, numeric) => ({ id, items, fields, ...(numeric ? { numeric } : {}) });
  const tables = [
    T('luoghi', luoghi, {
      citta: {
        ask: 'In quale città si può visitare: {name}?',
        who: 'Quale di questi luoghi si trova in questa città: {value}?',
        tf: '{name}: luogo situato in questa città: {value}.',
        odd: 'Trova l\'intruso: quale di questi luoghi NON si trova in questa città: {value}?',
      },
      paese: {
        ask: 'In quale Paese si può visitare: {name}?',
        who: 'Quale di questi luoghi si trova in questo Paese: {value}?',
        tf: '{name}: luogo situato in questo Paese: {value}.',
        odd: 'Trova l\'intruso: quale di questi luoghi NON si trova in questo Paese: {value}?',
      },
    }),
    T('regioni', regioni, {
      regione: {
        ask: 'In quale regione italiana si può visitare: {name}?',
        who: 'Quale di questi luoghi italiani si trova in questa regione: {value}?',
        tf: '{name}: luogo situato in questa regione italiana: {value}.',
        odd: 'Trova l\'intruso: quale di questi luoghi NON si trova in questa regione: {value}?',
      },
    }),
    T('musei', musei, {
      citta: {
        ask: 'In quale città si trova questo museo: {name}?',
        who: 'Quale di questi musei si trova in questa città: {value}?',
        tf: '{name}: museo situato in questa città: {value}.',
        odd: 'Trova l\'intruso: quale di questi musei NON si trova in questa città: {value}?',
      },
      paese: {
        ask: 'In quale Paese si trova questo museo: {name}?',
        who: 'Quale di questi musei si trova in questo Paese: {value}?',
        odd: 'Trova l\'intruso: quale di questi musei NON si trova in questo Paese: {value}?',
      },
    }),
    T('opere', opere, {
      museo: {
        ask: 'In quale museo o luogo è conservata quest\'opera: {name}?',
        who: 'Quale di queste opere è conservata in questo museo o luogo: {value}?',
        tf: 'L\'opera «{name}» è conservata in questo museo o luogo: {value}.',
        odd: 'Trova l\'intruso: quale di queste opere NON è conservata in questo museo o luogo: {value}?',
      },
    }),
    T('autori', autori, {
      autore: {
        ask: 'Chi ha progettato (o scolpito) quest\'opera: {name}?',
        who: 'Quale di queste opere è stata progettata (o scolpita) da {value}?',
        tf: '{name}: opera di {value}.',
        odd: 'Trova l\'intruso: quale di queste opere NON è stata progettata (o scolpita) da {value}?',
        typed: 'person',
      },
    }),
    T('stili', stili, {
      stile: {
        ask: 'In quale stile architettonico è costruito questo edificio: {name}?',
        who: 'Quale di questi edifici è in stile {value}?',
        tf: '{name}: lo stile architettonico è {value}.',
        odd: 'Trova l\'intruso: quale di questi edifici NON è in stile {value}?',
      },
    }),
    T('inaugurazioni', inaugurazioni, {}, {
      anno: { ask: 'In che anno è stata inaugurata (o completata) quest\'opera: {name}?', span: 140, tol: 2, format: 'year', step: 1,
        duel: 'Quale delle due opere è stata inaugurata (o completata) prima?', lowerWins: true, order: 'Metti in ordine di inaugurazione, dal più antico', gap: 8 },
    }),
    T('inizi', inizi, {}, {
      inizio: { ask: 'In che anno circa iniziò la costruzione di questo monumento: {name}?', span: 400, tol: 10, format: 'year', step: 5,
        duel: 'Quale delle due costruzioni è iniziata prima?', lowerWins: true, order: 'Metti in ordine di inizio dei lavori, dal più antico', gap: 40 },
    }),
    T('grattacieli', grattacieli, {}, {
      altezza: { ask: 'Quanto è alta questa torre o questo grattacielo: {name}?', span: 500, tol: 20, unit: 'm', step: 10,
        duel: 'Quale di queste due costruzioni è più alta?', order: 'Metti in ordine di altezza, dalla più alta', gap: 40 },
    }),
    T('edifici', edifici, {}, {
      altezza: { ask: 'Quanto è alta questa costruzione: {name}?', span: 200, tol: 8, unit: 'm', step: 5,
        duel: 'Quale di queste due costruzioni è più alta?', order: 'Metti in ordine di altezza, dalla più alta', gap: 15 },
    }),
  ];

  (D.pop = D.pop || []).push({
    id: 'plusmonumenti', extends: 'monumenti',
    quiz, tf, tables, order, numbers, emojis, typed,
    emojiText: 'Quale monumento o luogo famoso raccontano queste emoji?',
  });
})(typeof window !== 'undefined' ? window : globalThis);
