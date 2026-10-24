// Domande aggiuntive per la categoria «Storia» di Quizzone! — fatti verificati, italiano d'Italia.
(function (root) {
  'use strict';
  const D = (root.QZ_DATA = root.QZ_DATA || {});
  const quiz = [], tf = [], tables = [], quotes = [], emojis = [], order = [], numbers = [], typed = [];
  // Aiutanti compatti: ogni riga è [name, d, ...valori] nell'ordine delle colonne.
  const mk = (cols, rows) => rows.map((r) => { const o = {}; cols.forEach((c, i) => { if (r[i] !== undefined && r[i] !== null) o[c] = r[i]; }); return o; });
  const Q = (d, q, a, w) => quiz.push({ q, a, wrong: w, d });
  const T = (d, q, a, why) => tf.push(why ? { q, a, d, why } : { q, a, d });
  const Y = (d, q, a, accept) => typed.push(accept ? { q, a, accept, d } : { q, a, d });
  const O = (d, q, items) => order.push({ q, items, d });
  const N = (d, q, v, min, max, tol, unit) => numbers.push({ q, v, min, max, tol, unit, d });

  // ---------- Imperatori romani ----------
  tables.push({
    id: 'imperatori',
    items: mk(['name', 'd', 'dinastia', 'anno'], [
      ['Augusto', 1, 'Giulio-Claudia', null], ['Tiberio', 2, 'Giulio-Claudia', 14], ['Caligola', 1, 'Giulio-Claudia', 37],
      ['Claudio', 2, 'Giulio-Claudia', 41], ['Nerone', 1, 'Giulio-Claudia', 54], ['Galba', 3, null, 68],
      ['Vespasiano', 2, 'Flavia', 69], ['Tito', 2, 'Flavia', 79], ['Domiziano', 2, 'Flavia', 81],
      ['Nerva', 3, null, 96], ['Traiano', 1, null, 98], ['Adriano', 1, null, 117],
      ['Antonino Pio', 2, 'Antonina', 138], ['Marco Aurelio', 1, 'Antonina', 161], ['Commodo', 2, 'Antonina', 180],
      ['Settimio Severo', 2, 'Severiana', 193], ['Caracalla', 2, 'Severiana', 211], ['Eliogabalo', 3, 'Severiana', 218],
      ['Alessandro Severo', 3, 'Severiana', 222], ['Aureliano', 3, null, 270], ['Diocleziano', 2, null, 284],
      ['Costantino', 1, null, 306], ['Teodosio I', 2, null, 379], ['Onorio', 3, null, 395], ['Romolo Augustolo', 2, null, 475],
    ]),
    fields: {
      dinastia: {
        ask: 'A quale dinastia imperiale romana appartiene {name}?',
        who: 'Quale di questi imperatori romani appartiene alla dinastia {value}?',
        tf: 'L\'imperatore romano {name} appartiene alla dinastia {value}.',
        odd: 'Trova l\'intruso: quale imperatore NON appartiene alla dinastia {value}?',
      },
    },
    numeric: {
      anno: { ask: 'In che anno iniziò il regno dell\'imperatore romano {name}?', span: 60, tol: 2, format: 'year', duel: 'Quale imperatore salì al trono per primo?', lowerWins: true, order: 'Metti in ordine di ascesa al trono, dal primo', gap: 8 },
    },
  });

  // ---------- Battaglie ----------
  tables.push({
    id: 'battaglie',
    items: mk(['name', 'd', 'paese', 'guerra', 'anno'], [
      ['Trasimeno', 2, 'Italia', 'Seconda guerra punica', null], ['Canne', 2, 'Italia', 'Seconda guerra punica', null], ['Zama', 2, 'Tunisia', 'Seconda guerra punica', null],
      ['Salamina', 2, 'Grecia', null, null], ['Gaugamela', 3, 'Iraq', null, null], ['Alesia', 2, 'Francia', null, null],
      ['Farsalo', 3, 'Grecia', 'Guerre civili romane', null], ['Filippi', 3, 'Grecia', 'Guerre civili romane', null], ['Azio', 2, 'Grecia', 'Guerre civili romane', null],
      ['Teutoburgo', 3, 'Germania', null, 9], ['Adrianopoli', 3, 'Turchia', null, 378], ['Châlons (451)', 3, 'Francia', null, 451],
      ['Poitiers (732)', 3, 'Francia', null, 732], ['Legnano', 2, 'Italia', null, 1176], ['Bouvines', 3, 'Francia', null, 1214],
      ['Crécy', 3, 'Francia', 'Guerra dei cent\'anni', 1346], ['Azincourt', 2, 'Francia', 'Guerra dei cent\'anni', 1415], ['Bosworth', 3, 'Regno Unito', 'Guerra delle Due Rose', 1485],
      ['Marignano', 3, 'Italia', null, 1515], ['Pavia', 2, 'Italia', null, 1525], ['Vienna (1683)', 2, 'Austria', null, 1683],
      ['Blenheim', 3, 'Germania', 'Guerra di successione spagnola', 1704], ['Poltava', 3, 'Ucraina', null, 1709], ['Marengo', 2, 'Italia', null, 1800],
      ['Trafalgar', 2, 'Spagna', 'Guerre napoleoniche', 1805], ['Austerlitz', 2, 'Repubblica Ceca', 'Guerre napoleoniche', 1805], ['Borodino', 2, 'Russia', 'Guerre napoleoniche', 1812],
      ['Lipsia', 2, 'Germania', 'Guerre napoleoniche', 1813], ['Novara', 2, 'Italia', 'Prima guerra d\'indipendenza', 1849], ['Magenta', 2, 'Italia', 'Seconda guerra d\'indipendenza', 1859],
      ['Solferino', 2, 'Italia', 'Seconda guerra d\'indipendenza', 1859], ['Calatafimi', 3, 'Italia', null, 1860], ['Gettysburg', 1, 'Stati Uniti', 'Guerra di secessione americana', 1863],
      ['Lissa', 3, 'Croazia', 'Terza guerra d\'indipendenza', 1866], ['Sedan', 3, 'Francia', 'Guerra franco-prussiana', 1870], ['Little Bighorn', 2, 'Stati Uniti', null, 1876],
      ['Adua', 2, 'Etiopia', null, 1896], ['Tsushima', 3, 'Giappone', 'Guerra russo-giapponese', 1905], ['Marna', 2, 'Francia', 'Prima guerra mondiale', 1914],
      ['Tannenberg', 3, 'Polonia', 'Prima guerra mondiale', 1914], ['Gallipoli', 3, 'Turchia', 'Prima guerra mondiale', 1915], ['Verdun', 1, 'Francia', 'Prima guerra mondiale', 1916],
      ['Somme', 2, 'Francia', 'Prima guerra mondiale', 1916], ['Caporetto', 1, 'Slovenia', 'Prima guerra mondiale', 1917], ['Vittorio Veneto', 2, 'Italia', 'Prima guerra mondiale', 1918],
      ['Dunkerque', 2, 'Francia', 'Seconda guerra mondiale', 1940], ['Stalingrado', 1, 'Russia', 'Seconda guerra mondiale', null], ['El Alamein', 2, 'Egitto', 'Seconda guerra mondiale', 1942],
      ['Kursk', 3, 'Russia', 'Seconda guerra mondiale', 1943], ['Montecassino', 2, 'Italia', 'Seconda guerra mondiale', 1944], ['Anzio', 3, 'Italia', 'Seconda guerra mondiale', 1944],
      ['Dien Bien Phu', 3, 'Vietnam', 'Guerra d\'Indocina', 1954],
    ]),
    fields: {
      paese: {
        ask: 'In quale Paese attuale (o davanti alle sue coste) si svolse la battaglia di {name}?',
        tf: 'Battaglia di {name}. Luogo: {value}.',
        odd: 'Trova l\'intruso: quale battaglia NON si svolse in {value}?',
      },
      guerra: {
        ask: 'A quale conflitto appartiene la battaglia di {name}?',
        who: 'Quale di queste battaglie appartiene a questo conflitto: {value}?',
        tf: 'Battaglia di {name}. Conflitto: {value}.',
        odd: 'Trova l\'intruso: quale battaglia NON appartiene a questo conflitto: {value}?',
      },
    },
    numeric: {
      anno: { ask: 'In che anno si svolse la battaglia di {name}?', span: 60, tol: 2, format: 'year', duel: 'Quale battaglia si svolse prima?', lowerWins: true, order: 'Metti in ordine cronologico le battaglie, dalla più antica', gap: 8 },
    },
  });

  // ---------- Papi ----------
  tables.push({
    id: 'papi',
    items: mk(['name', 'd', 'nome', 'anno'], [
      ['Niccolò V', 3, 'Tommaso Parentucelli', 1447], ['Sisto IV', 3, 'Francesco della Rovere', 1471], ['Alessandro VI', 2, 'Rodrigo Borgia', 1492],
      ['Giulio II', 2, 'Giuliano della Rovere', 1503], ['Leone X', 2, 'Giovanni de\' Medici', 1513], ['Clemente VII', 3, 'Giulio de\' Medici', 1523],
      ['Paolo III', 3, 'Alessandro Farnese', 1534], ['Gregorio XIII', 3, 'Ugo Boncompagni', 1572], ['Sisto V', 3, 'Felice Peretti', 1585],
      ['Pio IX', 2, 'Giovanni Maria Mastai Ferretti', 1846], ['Leone XIII', 3, 'Vincenzo Gioacchino Pecci', 1878], ['Pio X', 2, 'Giuseppe Sarto', 1903],
      ['Benedetto XV', 3, 'Giacomo Della Chiesa', 1914], ['Pio XI', 3, 'Achille Ratti', 1922], ['Pio XII', 2, 'Eugenio Pacelli', 1939],
      ['Giovanni XXIII', 1, 'Angelo Giuseppe Roncalli', 1958], ['Paolo VI', 2, 'Giovanni Battista Montini', 1963], ['Giovanni Paolo I', 2, 'Albino Luciani', 1978],
      ['Giovanni Paolo II', 1, 'Karol Wojtyła', 1978], ['Benedetto XVI', 1, 'Joseph Ratzinger', 2005], ['Francesco', 1, 'Jorge Mario Bergoglio', 2013],
      ['Innocenzo III', 3, 'Lotario dei conti di Segni', 1198], ['Bonifacio VIII', 3, 'Benedetto Caetani', 1294],
    ]),
    fields: {
      nome: {
        ask: 'Qual era il nome di nascita di papa {name}?',
        tf: 'Prima di diventare papa {name}, il suo nome era {value}.',
        typed: 'person',
      },
    },
    numeric: {
      anno: { ask: 'In che anno fu eletto papa {name}?', span: 40, tol: 1, format: 'year', duel: 'Quale papa fu eletto per primo?', lowerWins: true, order: 'Metti in ordine di elezione i papi, dal primo', gap: 5 },
    },
  });

  // ---------- Sovrani europei ----------
  tables.push({
    id: 'sovrani',
    items: mk(['name', 'd', 'paese', 'anno'], [
      ['Luigi XIV', 1, 'Francia', 1643], ['Luigi XV', 2, 'Francia', 1715], ['Luigi XVI', 1, 'Francia', 1774], ['Filippo il Bello', 3, 'Francia', 1285],
      ['Napoleone III', 2, 'Francia', 1852], ['Luigi Filippo', 3, 'Francia', 1830], ['San Luigi (Luigi IX)', 3, 'Francia', 1226],
      ['Pietro il Grande', 1, 'Russia', null], ['Caterina la Grande', 1, 'Russia', 1762], ['Ivan il Terribile', 1, 'Russia', null], ['Nicola II', 1, 'Russia', 1894],
      ['Isabella II', 3, 'Spagna', 1833], ['Alfonso XIII', 3, 'Spagna', 1886], ['Juan Carlos I', 1, 'Spagna', 1975],
      ['Maria Teresa', 1, 'Austria', 1740], ['Francesco Giuseppe', 1, 'Austria', 1848],
      ['Federico il Grande', 1, 'Prussia', 1740], ['Federico Guglielmo I', 3, 'Prussia', 1713], ['Federico Guglielmo III', 3, 'Prussia', 1797],
      ['Gustavo II Adolfo', 2, 'Svezia', 1611], ['Carlo XII', 3, 'Svezia', 1697], ['Gustavo III', 3, 'Svezia', 1771], ['Carlo XVI Gustavo', 2, 'Svezia', 1973],
      ['Margherita II', 2, 'Danimarca', 1972], ['Cristiano IV', 3, 'Danimarca', 1588],
      ['Haakon VII', 3, 'Norvegia', 1905], ['Olav V', 3, 'Norvegia', 1957], ['Harald V', 2, 'Norvegia', 1991],
      ['Guglielmina', 3, 'Paesi Bassi', 1890],
      ['Umberto I', 1, 'Italia', 1878], ['Vittorio Emanuele III', 1, 'Italia', 1900], ['Umberto II', 2, 'Italia', 1946],
    ]),
    fields: {
      paese: {
        ask: 'Su quale Paese regnò {name}?',
        who: 'Quale di questi sovrani regnò su questo Paese: {value}?',
        tf: 'Sovrano: {name}. Paese su cui regnò: {value}.',
        odd: 'Trova l\'intruso: quale di questi sovrani NON regnò su questo Paese: {value}?',
      },
    },
    numeric: {
      anno: { ask: 'In che anno salì al trono {name}?', span: 60, tol: 2, format: 'year', duel: 'Quale sovrano salì al trono per primo?', lowerWins: true, order: 'Metti in ordine di salita al trono, dal primo', gap: 8 },
    },
  });

  // ---------- Sovrani britannici ----------
  tables.push({
    id: 'britannici',
    items: mk(['name', 'd', 'casa', 'anno'], [
      ['Enrico VII', 3, 'Tudor', 1485], ['Enrico VIII', 1, 'Tudor', 1509], ['Edoardo VI', 3, 'Tudor', 1547], ['Maria la Sanguinaria', 2, 'Tudor', 1553], ['Elisabetta I', 1, 'Tudor', 1558],
      ['Giacomo I', 2, 'Stuart', 1603], ['Carlo I', 2, 'Stuart', 1625], ['Carlo II', 3, 'Stuart', null], ['Giacomo II', 3, 'Stuart', 1685],
      ['Giorgio I', 3, 'Hannover', 1714], ['Giorgio III', 2, 'Hannover', 1760], ['Giorgio IV', 3, 'Hannover', 1820], ['Guglielmo IV', 3, 'Hannover', 1830], ['Vittoria', 1, 'Hannover', 1837],
      ['Edoardo VII', 2, 'Sassonia-Coburgo-Gotha', 1901], ['Giorgio V', 3, null, 1910],
      ['Edoardo VIII', 2, 'Windsor', 1936], ['Giorgio VI', 2, 'Windsor', 1936], ['Elisabetta II', 1, 'Windsor', 1952], ['Carlo III', 1, 'Windsor', 2022],
    ]),
    fields: {
      casa: {
        ask: 'A quale casa regnante britannica appartiene il sovrano {name}?',
        who: 'Quale di questi sovrani britannici appartiene alla casa {value}?',
        tf: 'Il sovrano britannico {name} appartiene alla casa {value}.',
        odd: 'Trova l\'intruso: quale sovrano britannico NON appartiene alla casa {value}?',
      },
    },
    numeric: {
      anno: { ask: 'In che anno salì al trono il sovrano britannico {name}?', span: 60, tol: 2, format: 'year', duel: 'Quale sovrano britannico salì al trono per primo?', lowerWins: true, order: 'Metti in ordine di salita al trono i sovrani britannici, dal primo', gap: 8 },
    },
  });

  // ---------- Presidenti del Consiglio ----------
  tables.push({
    id: 'consiglio',
    items: mk(['name', 'd', 'anno'], [
      ['Agostino Depretis', 3, 1876], ['Francesco Crispi', 2, 1887], ['Giovanni Giolitti', 2, 1892], ['Antonio Salandra', 3, 1914], ['Vittorio Emanuele Orlando', 2, 1917],
      ['Benito Mussolini', 1, 1922], ['Pietro Badoglio', 2, 1943], ['Ferruccio Parri', 3, 1945], ['Alcide De Gasperi', 1, 1945], ['Amintore Fanfani', 2, 1954],
      ['Antonio Segni', 3, 1955], ['Fernando Tambroni', 3, 1960], ['Aldo Moro', 1, 1963], ['Mariano Rumor', 3, 1968], ['Emilio Colombo', 3, 1970],
      ['Giulio Andreotti', 1, 1972], ['Francesco Cossiga', 2, 1979], ['Arnaldo Forlani', 3, 1980], ['Giovanni Spadolini', 2, 1981], ['Bettino Craxi', 1, 1983],
      ['Ciriaco De Mita', 2, 1988], ['Giuliano Amato', 2, 1992], ['Carlo Azeglio Ciampi', 2, 1993], ['Silvio Berlusconi', 1, 1994], ['Lamberto Dini', 3, 1995],
      ['Romano Prodi', 1, 1996], ['Massimo D\'Alema', 2, 1998], ['Mario Monti', 1, 2011], ['Enrico Letta', 2, 2013], ['Matteo Renzi', 1, 2014],
      ['Paolo Gentiloni', 2, 2016], ['Giuseppe Conte', 1, 2018], ['Mario Draghi', 1, 2021], ['Giorgia Meloni', 1, 2022],
    ]),
    fields: {},
    numeric: {
      anno: { ask: 'In che anno {name} guidò per la prima volta un governo italiano?', span: 40, tol: 1, format: 'year', duel: 'Chi guidò per primo un governo italiano?', lowerWins: true, order: 'Metti in ordine di primo incarico i presidenti del Consiglio, dal primo', gap: 4 },
    },
  });

  // ---------- Personaggi storici ----------
  tables.push({
    id: 'personaggi',
    items: mk(['name', 'd', 'paese', 'nascita', 'morte'], [
      ['Nerone', 1, null, 37, 68], ['Dante Alighieri', 1, 'Italia', 1265, 1321], ['Francesco Petrarca', 2, 'Italia', 1304, 1374], ['Giovanni Boccaccio', 2, 'Italia', 1313, 1375],
      ['Marco Polo', 1, 'Italia', 1254, 1324], ['Federico II di Svevia', 3, null, 1194, 1250], ['Lorenzo il Magnifico', 2, 'Italia', 1449, 1492], ['Leonardo da Vinci', 1, 'Italia', 1452, 1519],
      ['Michelangelo Buonarroti', 1, 'Italia', 1475, 1564], ['Raffaello Sanzio', 1, 'Italia', 1483, 1520], ['Niccolò Machiavelli', 2, 'Italia', 1469, 1527],
      ['Cristoforo Colombo', 1, null, 1451, 1506], ['Niccolò Copernico', 2, null, 1473, 1543], ['Martin Lutero', 1, 'Germania', 1483, 1546], ['Oliver Cromwell', 3, null, 1599, 1658],
      ['Luigi XIV', 1, 'Francia', 1638, 1715], ['Isaac Newton', 1, null, 1643, 1727], ['Pietro il Grande', 2, 'Russia', 1672, 1725], ['George Washington', 1, 'Stati Uniti', 1732, 1799],
      ['Maximilien de Robespierre', 3, 'Francia', 1758, 1794], ['Napoleone Bonaparte', 1, 'Francia', 1769, 1821], ['Simón Bolívar', 2, null, 1783, 1830],
      ['Giuseppe Mazzini', 1, 'Italia', 1805, 1872], ['Giuseppe Garibaldi', 1, null, 1807, 1882], ['Camillo Benso di Cavour', 1, 'Italia', 1810, 1861],
      ['Vittorio Emanuele II', 1, 'Italia', 1820, 1878], ['Abraham Lincoln', 1, 'Stati Uniti', 1809, 1865], ['Charles Darwin', 1, 'Regno Unito', 1809, 1882],
      ['Otto von Bismarck', 2, 'Germania', 1815, 1898], ['Karl Marx', 1, 'Germania', 1818, 1883], ['Regina Vittoria', 1, 'Regno Unito', 1819, 1901],
      ['Vladimir Lenin', 1, 'Russia', 1870, 1924], ['Mahatma Gandhi', 1, 'India', 1869, 1948], ['Winston Churchill', 1, 'Regno Unito', 1874, 1965],
      ['Benito Mussolini', 1, 'Italia', 1883, 1945], ['Stalin', 1, null, 1878, 1953], ['Adolf Hitler', 1, null, 1889, 1945],
      ['Franklin D. Roosevelt', 2, 'Stati Uniti', 1882, 1945], ['Charles de Gaulle', 2, 'Francia', 1890, 1970], ['Mao Zedong', 2, 'Cina', 1893, 1976],
      ['John F. Kennedy', 1, 'Stati Uniti', 1917, 1963], ['Martin Luther King', 1, 'Stati Uniti', 1929, 1968], ['Che Guevara', 1, 'Argentina', 1928, 1967],
      ['Nelson Mandela', 1, 'Sudafrica', 1918, 2013], ['Alcide De Gasperi', 2, 'Italia', 1881, 1954], ['Aldo Moro', 2, 'Italia', 1916, 1978],
      ['Enrico Berlinguer', 3, 'Italia', 1922, 1984], ['Sandro Pertini', 2, 'Italia', 1896, 1990], ['Giovanni Falcone', 1, 'Italia', 1939, 1992],
      ['Paolo Borsellino', 1, 'Italia', 1940, 1992], ['Papa Giovanni XXIII', 2, 'Italia', 1881, 1963],
    ]),
    fields: {
      paese: {
        ask: 'Di quale Paese era {name}?',
        who: 'Quale di questi personaggi storici era di questo Paese: {value}?',
        tf: '{name}. Paese di appartenenza: {value}.',
        odd: 'Trova l\'intruso: quale di questi personaggi storici NON era di questo Paese: {value}?',
      },
    },
    numeric: {
      nascita: { ask: 'In che anno nacque {name}?', span: 60, tol: 3, format: 'year', duel: 'Chi è nato prima?', lowerWins: true, order: 'Metti in ordine di nascita questi personaggi, dal più antico', gap: 10 },
      morte: { ask: 'In che anno morì {name}?', span: 60, tol: 3, format: 'year', duel: 'Chi è morto prima?', lowerWins: true, order: 'Metti in ordine di morte questi personaggi, dal più antico', gap: 10 },
    },
  });

  // ---------- Esploratori ----------
  tables.push({
    id: 'esploratori',
    items: mk(['name', 'd', 'nazione', 'impresa', 'anno'], [
      ['Cristoforo Colombo', 1, 'Spagna', 'Sbarcò nelle Bahamas', 1492], ['Bartolomeo Dias', 3, 'Portogallo', 'Doppiò il Capo di Buona Speranza', 1488],
      ['Vasco da Gama', 1, 'Portogallo', 'Raggiunse l\'India via mare', 1498], ['Pedro Álvares Cabral', 3, 'Portogallo', 'Sbarcò in Brasile', 1500],
      ['Giovanni Caboto', 3, null, 'Raggiunse Terranova', 1497], ['Giovanni da Verrazzano', 3, 'Francia', 'Esplorò la baia di New York', 1524],
      ['Jacques Cartier', 3, 'Francia', 'Risalì il fiume San Lorenzo', 1534], ['Samuel de Champlain', 3, 'Francia', 'Fondò la città di Québec', 1608],
      ['Hernán Cortés', 1, 'Spagna', 'Conquistò l\'impero azteco', 1519], ['Francisco Pizarro', 2, 'Spagna', 'Conquistò l\'impero inca', 1532],
      ['Vasco Núñez de Balboa', 3, 'Spagna', 'Avvistò l\'oceano Pacifico dalle Americhe', 1513], ['Ferdinando Magellano', 1, 'Spagna', 'Guidò la prima circumnavigazione del globo', 1519],
      ['Francis Drake', 2, null, 'Fu il primo inglese a circumnavigare il globo', 1577], ['Abel Tasman', 3, 'Paesi Bassi', 'Raggiunse la Tasmania', 1642],
      ['Lewis e Clark', 3, 'Stati Uniti', 'Attraversarono il Nordamerica fino al Pacifico', 1804], ['Fridtjof Nansen', 3, 'Norvegia', 'Attraversò l\'Artico con la nave Fram', 1893],
      ['Roald Amundsen', 1, 'Norvegia', 'Raggiunse il Polo Sud', 1911], ['Robert Falcon Scott', 2, 'Regno Unito', null, 1912],
      ['Ernest Shackleton', 3, 'Regno Unito', 'Guidò la spedizione dell\'Endurance in Antartide', 1914],
    ]),
    fields: {
      nazione: {
        ask: 'Al servizio di quale Paese compì la sua impresa l\'esploratore {name}?',
        who: 'Quale di questi esploratori agì per conto di questo Paese: {value}?',
        tf: 'Esploratore: {name}. Agì per conto di: {value}.',
      },
      impresa: {
        ask: 'Per quale impresa è famoso l\'esploratore {name}?',
        tf: 'Esploratore: {name}. Impresa: {value}.',
      },
    },
    numeric: {
      anno: { ask: 'Intorno a quale anno avvenne l\'impresa di {name}?', span: 60, tol: 3, format: 'year', duel: 'Quale impresa avvenne prima?', lowerWins: true, order: 'Metti in ordine cronologico le imprese degli esploratori, dalla più antica', gap: 6 },
    },
  });

  // ---------- Luoghi di eventi e trattati ----------
  tables.push({
    id: 'luoghi',
    items: mk(['name', 'd', 'luogo', 'anno'], [
      ['La spartizione del Nuovo Mondo tra Spagna e Portogallo', 3, 'Tordesillas', 1494], ['Il patto Molotov-Ribbentrop', 2, 'Mosca', 1939],
      ['Il Patto d\'Acciaio tra Italia e Germania', 3, 'Berlino', 1939], ['I Patti Lateranensi', 1, 'Roma', 1929],
      ['La Carta delle Nazioni Unite', 3, 'San Francisco', 1945], ['La Dichiarazione universale dei diritti umani', 3, 'Parigi', 1948],
      ['Il Patto atlantico (NATO)', 2, 'Washington', 1949], ['La pace che pose fine alla Prima guerra mondiale con la Germania', 1, 'Versailles', 1919],
      ['Il congresso che riordinò l\'Europa dopo Napoleone', 1, 'Vienna', 1815], ['La pace che pose fine alla guerra di successione spagnola', 3, 'Utrecht', 1713],
      ['La pace con cui Napoleone cedette Venezia all\'Austria', 3, 'Campoformio', 1797], ['Il trattato che fece uscire la Russia dalla Prima guerra mondiale', 3, 'Brest-Litovsk', 1918],
      ['Gli accordi che consegnarono i Sudeti alla Germania nazista', 2, 'Monaco di Baviera', 1938], ['Il trattato sul confine tra Italia e Jugoslavia del 1975', 3, 'Osimo', 1975],
      ['L\'incontro Roosevelt-Churchill-Stalin in Crimea', 2, 'Yalta', 1945], ['La conferenza dei Tre Grandi sulla Germania nell\'estate 1945', 3, 'Potsdam', 1945],
      ['Il primo incontro dei Tre Grandi', 3, 'Teheran', 1943], ['La Magna Carta', 3, 'Runnymede', 1215],
      ['La Dichiarazione d\'indipendenza americana', 2, 'Filadelfia', 1776], ['L\'incoronazione di Carlo Magno a imperatore', 2, 'Roma', 800],
      ['La proclamazione del Regno d\'Italia', 2, 'Torino', 1861], ['Il giuramento della Pallacorda', 3, 'Versailles', 1789],
    ]),
    fields: {
      luogo: {
        ask: 'In quale luogo si svolse o fu firmato questo evento: {name}?',
        tf: 'Evento: {name}. Luogo: {value}.',
      },
    },
    numeric: {
      anno: { ask: 'In che anno avvenne questo evento: {name}?', span: 60, tol: 2, format: 'year', duel: 'Quale evento avvenne prima?', lowerWins: true, order: 'Metti in ordine cronologico questi eventi, dal più antico', gap: 6 },
    },
  });

  // ---------- Rivolte e movimenti ----------
  tables.push({
    id: 'rivolte',
    items: mk(['name', 'd', 'paese', 'anno'], [
      ['La rivoluzione dei garofani', 3, 'Portogallo', 1974], ['La rivoluzione di velluto', 3, 'Cecoslovacchia', 1989], ['La rivoluzione dei gelsomini', 3, 'Tunisia', 2011],
      ['La rivoluzione arancione', 3, 'Ucraina', 2004], ['La rivoluzione delle rose', 3, 'Georgia', 2003], ['La Primavera di Praga', 2, 'Cecoslovacchia', 1968],
      ['La rivolta dei Sepoy', 3, 'India', 1857], ['La marcia del sale di Gandhi', 3, 'India', 1930], ['La rivolta di Spartaco', 2, 'Italia', null],
      ['La rivolta dei Ciompi', 3, 'Italia', 1378], ['I Vespri siciliani', 3, 'Italia', 1282], ['La rivolta di Masaniello', 3, 'Italia', 1647],
      ['La congiura dei Pazzi', 3, 'Italia', 1478], ['Il sacco di Roma dei lanzichenecchi', 2, 'Italia', 1527], ['La Lunga marcia di Mao', 2, 'Cina', 1934],
      ['La Boston Tea Party', 2, 'Stati Uniti', 1773], ['La marcia su Washington di Martin Luther King', 2, 'Stati Uniti', 1963],
    ]),
    fields: {
      paese: {
        ask: 'In quale Paese ebbe luogo questo evento: {name}?',
        tf: 'Evento: {name}. Paese: {value}.',
        odd: 'Trova l\'intruso: quale di questi eventi NON ebbe luogo in questo Paese: {value}?',
      },
    },
    numeric: {
      anno: { ask: 'In che anno avvenne questo evento: {name}?', span: 60, tol: 2, format: 'year', duel: 'Quale evento avvenne prima?', lowerWins: true, order: 'Metti in ordine cronologico questi eventi, dal più antico', gap: 6 },
    },
  });

  // ---------- Guerre ----------
  tables.push({
    id: 'guerre',
    items: mk(['name', 'd', 'inizio', 'fine'], [
      ['Guerra dei Cent\'anni', 2, 1337, 1453], ['Guerra dei Trent\'anni', 2, 1618, 1648], ['Guerra di successione spagnola', 3, 1701, 1714],
      ['Guerra dei Sette anni', 3, 1756, 1763], ['Guerra anglo-americana', 3, 1812, 1815], ['Guerra messicano-americana', 3, 1846, 1848],
      ['Guerra di Crimea', 2, 1853, 1856], ['Guerra di secessione americana', 1, 1861, 1865], ['Guerra franco-prussiana', 3, 1870, 1871],
      ['Seconda guerra anglo-boera', 3, 1899, 1902], ['Guerra russo-giapponese', 3, 1904, 1905], ['Guerra italo-turca', 2, 1911, 1912],
      ['Guerra civile spagnola', 1, 1936, 1939], ['Guerra di Corea', 2, 1950, 1953], ['Guerra d\'Algeria', 3, 1954, 1962],
      ['Guerra tra Iran e Iraq', 3, 1980, 1988], ['Guerra d\'Etiopia', 2, 1935, 1936], ['Prima guerra d\'indipendenza italiana', 2, 1848, 1849],
      ['Guerra dei Sei giorni', 2, 1967, null], ['Guerra dello Yom Kippur', 3, 1973, null], ['Guerra delle Falkland', 2, 1982, null],
      ['Guerra delle Due Rose', 3, 1455, null],
    ]),
    fields: {},
    numeric: {
      inizio: { ask: 'In che anno iniziò la {name}?', span: 60, tol: 2, format: 'year', duel: 'Quale guerra iniziò prima?', lowerWins: true, order: 'Metti in ordine di inizio queste guerre, dalla più antica', gap: 6 },
      fine: { ask: 'In che anno terminò la {name}?', span: 60, tol: 2, format: 'year', duel: 'Quale guerra terminò prima?', lowerWins: true, order: 'Metti in ordine di fine queste guerre, dalla più antica', gap: 6 },
    },
  });

  // ---------- Quiz: antichità ----------
  Q(1, 'Quale imperatore romano è ricordato per l\'incendio di Roma del 64 d.C.?', 'Nerone', ['Caligola', 'Domiziano', 'Traiano']);
  Q(2, 'Quale imperatore fece costruire un grande muro nel nord della Britannia romana?', 'Adriano', ['Traiano', 'Claudio', 'Settimio Severo']);
  Q(2, 'Quale imperatore romano scrisse il libro di riflessioni filosofiche «Pensieri»?', 'Marco Aurelio', ['Augusto', 'Adriano', 'Costantino']);
  Q(2, 'Quale imperatore divise il governo di Roma in una tetrarchia?', 'Diocleziano', ['Costantino', 'Traiano', 'Teodosio']);
  Q(2, 'Quale imperatore proclamò il cristianesimo religione ufficiale dell\'Impero nel 380?', 'Teodosio I', ['Costantino', 'Nerone', 'Giuliano']);
  Q(2, 'Quale imperatore, detto «l\'Apostata», tentò di restaurare il paganesimo?', 'Giuliano', ['Costantino', 'Teodosio I', 'Diocleziano']);
  Q(2, 'Chi uscì vincitore dall\'«anno dei quattro imperatori» (69 d.C.) e fondò una nuova dinastia?', 'Vespasiano', ['Tito', 'Nerone', 'Traiano']);
  Q(1, 'Chi fu l\'imperatore romano che fece costruire il Pantheon nella forma attuale?', 'Adriano', ['Nerone', 'Augusto', 'Costantino']);
  Q(2, 'Quale imperatore, insieme a Licinio, concesse la libertà di culto ai cristiani nel 313?', 'Costantino', ['Diocleziano', 'Traiano', 'Teodosio I']);
  Q(1, 'Come si chiamavano i combattenti che si sfidavano nell\'arena del Colosseo?', 'Gladiatori', ['Legionari', 'Pretoriani', 'Centurioni']);
  Q(1, 'Come si chiamava il capo dei Galli sconfitto da Giulio Cesare ad Alesia?', 'Vercingetorige', ['Brenno', 'Arminio', 'Attila']);
  Q(2, 'Quale capo dei Galli saccheggiò Roma nel 390 a.C. secondo la tradizione?', 'Brenno', ['Vercingetorige', 'Arminio', 'Boudicca']);
  Q(2, 'Quale regina degli Iceni guidò una rivolta contro i Romani in Britannia?', 'Boudicca', ['Zenobia', 'Cleopatra', 'Agrippina']);
  Q(2, 'Come si chiamava il capo germanico che sconfisse Varo nella selva di Teutoburgo?', 'Arminio', ['Alarico', 'Odoacre', 'Attila']);
  Q(2, 'Chi era Spartaco?', 'Un gladiatore che guidò una rivolta di schiavi', ['Un console romano', 'Un filosofo greco', 'Un re dei Galli']);
  Q(1, 'Quale re degli Unni era detto «il flagello di Dio»?', 'Attila', ['Alarico', 'Odoacre', 'Genserico']);
  Q(2, 'Quale re dei Visigoti saccheggiò Roma nel 410?', 'Alarico', ['Attila', 'Odoacre', 'Teodorico']);
  Q(2, 'Quale generale barbaro depose Romolo Augustolo nel 476?', 'Odoacre', ['Alarico', 'Attila', 'Teodorico']);
  Q(2, 'Quale re degli Ostrogoti governò l\'Italia da Ravenna?', 'Teodorico', ['Odoacre', 'Alboino', 'Alarico']);
  Q(2, 'Quale popolo, guidato da Alboino, invase l\'Italia nel 568?', 'Longobardi', ['Ostrogoti', 'Unni', 'Franchi']);
  Q(2, 'Quale imperatore bizantino tentò di riconquistare l\'Occidente e fece compilare il «Corpus iuris civilis»?', 'Giustiniano', ['Costantino', 'Eraclio', 'Teodosio II']);
  Q(2, 'In quale città fu costruita la basilica di Santa Sofia, voluta da Giustiniano?', 'Costantinopoli', ['Atene', 'Alessandria', 'Ravenna']);
  Q(1, 'Quale città greca era famosa per i suoi guerrieri e per l\'educazione severa?', 'Sparta', ['Atene', 'Corinto', 'Tebe']);
  Q(1, 'In quale città greca nacque la democrazia?', 'Atene', ['Sparta', 'Tebe', 'Corinto']);
  Q(2, 'Quale statista guidò Atene nel suo periodo d\'oro nel V secolo a.C.?', 'Pericle', ['Solone', 'Temistocle', 'Milziade']);
  Q(2, 'Chi vinse a Maratona contro i Persiani nel 490 a.C.?', 'Gli Ateniesi', ['Gli Spartani', 'I Tebani', 'I Macedoni']);
  Q(2, 'Quale re spartano morì alle Termopili con i suoi 300 uomini?', 'Leonida', ['Pericle', 'Agesilao', 'Licurgo']);
  Q(2, 'Quale filosofo greco fu condannato a bere la cicuta?', 'Socrate', ['Platone', 'Aristotele', 'Epicuro']);
  Q(2, 'Chi fu il maestro di Alessandro Magno?', 'Aristotele', ['Socrate', 'Platone', 'Pitagora']);
  Q(2, 'Come si chiamava il padre di Alessandro Magno?', 'Filippo II', ['Dario III', 'Leonida', 'Pericle']);
  Q(2, 'Quale regno fu governato dalla dinastia dei Tolomei?', 'Egitto', ['Persia', 'Macedonia', 'Siria']);
  Q(1, 'Quale famosa biblioteca dell\'antichità si trovava in Egitto?', 'Biblioteca di Alessandria', ['Biblioteca di Pergamo', 'Biblioteca di Efeso', 'Biblioteca di Atene']);
  Q(1, 'Come si chiama il sistema di scrittura dell\'antico Egitto con immagini?', 'Geroglifici', ['Cuneiforme', 'Alfabeto fenicio', 'Rune']);
  Q(2, 'Quale pietra, trovata nel 1799, permise di decifrare i geroglifici?', 'Stele di Rosetta', ['Stele di Hammurabi', 'Pietra di Palermo', 'Stele di Mesha']);
  Q(3, 'Chi decifrò i geroglifici nel 1822 grazie alla stele di Rosetta?', 'Jean-François Champollion', ['Howard Carter', 'Ernesto Schiaparelli', 'Heinrich Schliemann']);
  Q(2, 'Quale archeologo scoprì la tomba di Tutankhamon nel 1922?', 'Howard Carter', ['Heinrich Schliemann', 'Arthur Evans', 'Giovanni Belzoni']);
  Q(2, 'Quale archeologo tedesco scavò il sito dell\'antica Troia?', 'Heinrich Schliemann', ['Howard Carter', 'Arthur Evans', 'Jean Champollion']);
  Q(2, 'Quale faraone eresse il tempio di Abu Simbel?', 'Ramses II', ['Cheope', 'Tutankhamon', 'Akhenaton']);
  Q(2, 'Quale faraone cercò di imporre il culto del dio-sole Aton?', 'Akhenaton', ['Ramses II', 'Cheope', 'Tolomeo I']);
  Q(2, 'Quale faraone-donna governò l\'Egitto nel XV secolo a.C. circa?', 'Hatshepsut', ['Nefertiti', 'Cleopatra', 'Nefertari']);
  Q(2, 'Quale fiume era la fonte di vita dell\'antico Egitto?', 'Nilo', ['Tigri', 'Eufrate', 'Giordano']);
  Q(2, 'Quale civiltà sorse tra il Tigri e l\'Eufrate?', 'Mesopotamia', ['Egitto', 'Fenicia', 'Creta']);
  Q(3, 'Quale re babilonese emanò un celebre codice di leggi inciso su una stele?', 'Hammurabi', ['Nabucodonosor', 'Sargon', 'Dario']);
  Q(2, 'Quale popolo antico inventò l\'alfabeto da cui derivano quello greco e quello latino?', 'Fenici', ['Egizi', 'Sumeri', 'Ittiti']);
  Q(2, 'Quale città fenicia fondò Cartagine, secondo la tradizione?', 'Tiro', ['Biblo', 'Sidone', 'Ugarit']);
  Q(3, 'Quale regina cartaginese, secondo Virgilio, si innamorò di Enea?', 'Didone', ['Cleopatra', 'Giocasta', 'Penelope']);
  Q(2, 'Quale civiltà prosperò nell\'isola di Creta, con il palazzo di Cnosso?', 'Minoica', ['Micenea', 'Etrusca', 'Fenicia']);
  Q(2, 'Quale civiltà abitava la Toscana prima dei Romani?', 'Etruschi', ['Sanniti', 'Liguri', 'Latini']);
  Q(2, 'Quale popolo italico abitava il Sannio e combatté contro Roma?', 'Sanniti', ['Etruschi', 'Veneti', 'Liguri']);
  Q(2, 'Quale città etrusca è nota per la Tomba dei Leopardi e per le tombe dipinte?', 'Tarquinia', ['Siena', 'Pisa', 'Spoleto']);
  Q(1, 'Quale fiume fu attraversato da Cesare nel 49 a.C. con la frase «il dado è tratto»?', 'Rubicone', ['Tevere', 'Po', 'Arno']);
  Q(2, 'Il primo triumvirato fu formato da Cesare, Crasso e...?', 'Pompeo', ['Cicerone', 'Marco Antonio', 'Catone']);
  Q(2, 'Quale battaglia nel 31 a.C. segnò la sconfitta di Marco Antonio e Cleopatra?', 'Azio', ['Filippi', 'Farsalo', 'Zama']);
  Q(2, 'Come si chiamava la moglie di Augusto, madre di Tiberio?', 'Livia', ['Agrippina', 'Messalina', 'Poppea']);
  Q(2, 'Come si chiamava la madre di Nerone?', 'Agrippina', ['Livia', 'Messalina', 'Poppea']);
  Q(2, 'Quale scrittore romano morì nell\'eruzione del Vesuvio del 79 per osservarla da vicino?', 'Plinio il Vecchio', ['Plinio il Giovane', 'Seneca', 'Tacito']);
  Q(2, 'Quale storico romano descrisse l\'eruzione del Vesuvio in due lettere?', 'Plinio il Giovane', ['Tacito', 'Livio', 'Svetonio']);
  Q(3, 'Quale storico romano scrisse gli «Annali» e le «Historiae»?', 'Tacito', ['Livio', 'Svetonio', 'Sallustio']);
  Q(2, 'Quale storico romano scrisse «Ab Urbe condita»?', 'Tito Livio', ['Tacito', 'Plutarco', 'Erodoto']);
  Q(2, 'Quale filosofo fu precettore di Nerone e fu costretto a uccidersi?', 'Seneca', ['Cicerone', 'Epitteto', 'Lucrezio']);
  Q(3, 'Quale ponte-acquedotto romano, in Francia, attraversa il fiume Gardon?', 'Pont du Gard', ['Ponte di Alcántara', 'Acquedotto di Segovia', 'Ponte Milvio']);
  Q(2, 'Quale via romana collegava Roma a Brindisi?', 'Via Appia', ['Via Aurelia', 'Via Flaminia', 'Via Emilia']);
  Q(2, 'Quale via romana collegava Rimini a Piacenza?', 'Via Emilia', ['Via Appia', 'Via Cassia', 'Via Aurelia']);
  Q(3, 'Quale via romana collegava Roma a Rimini?', 'Via Flaminia', ['Via Appia', 'Via Aurelia', 'Via Salaria']);
  Q(2, 'Come si chiamava il grande stadio per le corse dei carri a Roma?', 'Circo Massimo', ['Colosseo', 'Foro Romano', 'Stadio di Domiziano']);
  Q(1, 'In quale città si trovano le Terme di Caracalla?', 'Roma', ['Pompei', 'Napoli', 'Ostia']);
  Q(2, 'Quale città romana, vicino a Roma, era il suo porto principale?', 'Ostia', ['Anzio', 'Civitavecchia', 'Gaeta']);

  // ---------- Quiz: date avanti Cristo ----------
  Q(2, 'In che anno Annibale sconfisse i Romani a Canne?', '216 a.C.', ['218 a.C.', '202 a.C.', '241 a.C.']);
  Q(2, 'In che anno Scipione sconfisse Annibale a Zama?', '202 a.C.', ['216 a.C.', '146 a.C.', '241 a.C.']);
  Q(3, 'In che anno i Romani distrussero Cartagine alla fine della terza guerra punica?', '146 a.C.', ['202 a.C.', '216 a.C.', '241 a.C.']);
  Q(3, 'In che anno terminò la prima guerra punica?', '241 a.C.', ['264 a.C.', '218 a.C.', '202 a.C.']);
  Q(3, 'In che anno gli Ateniesi vinsero la battaglia navale di Salamina?', '480 a.C.', ['490 a.C.', '431 a.C.', '323 a.C.']);
  Q(3, 'In che anno fu condannato a morte Socrate?', '399 a.C.', ['469 a.C.', '323 a.C.', '431 a.C.']);
  Q(3, 'In che anno iniziò la guerra del Peloponneso?', '431 a.C.', ['480 a.C.', '404 a.C.', '490 a.C.']);
  Q(3, 'In che anno Alessandro Magno vinse la battaglia di Gaugamela?', '331 a.C.', ['356 a.C.', '323 a.C.', '480 a.C.']);
  Q(3, 'In che anno Cesare vinse la battaglia di Alesia contro Vercingetorige?', '52 a.C.', ['58 a.C.', '44 a.C.', '31 a.C.']);
  Q(2, 'In che anno Cesare attraversò il Rubicone?', '49 a.C.', ['58 a.C.', '44 a.C.', '27 a.C.']);
  Q(2, 'In che anno Ottaviano vinse la battaglia di Azio?', '31 a.C.', ['44 a.C.', '27 a.C.', '49 a.C.']);
  Q(3, 'In che anno morì Cleopatra?', '30 a.C.', ['44 a.C.', '49 a.C.', '27 a.C.']);
  Q(3, 'In che anno nacque Giulio Cesare?', '100 a.C.', ['63 a.C.', '106 a.C.', '44 a.C.']);
  Q(3, 'In che anno iniziò la rivolta di Spartaco?', '73 a.C.', ['88 a.C.', '49 a.C.', '44 a.C.']);
  Q(3, 'In che anno, secondo la tradizione, i Galli di Brenno saccheggiarono Roma?', '390 a.C.', ['509 a.C.', '753 a.C.', '264 a.C.']);
  Q(3, 'In che anno fu ucciso Cicerone?', '43 a.C.', ['44 a.C.', '49 a.C.', '31 a.C.']);

  // ---------- Quiz: Medioevo e età moderna ----------
  Q(2, 'Chi fu incoronato imperatore del Sacro Romano Impero nel 962 da papa Giovanni XII?', 'Ottone I di Sassonia', ['Carlo Magno', 'Federico Barbarossa', 'Carlo V']);
  Q(1, 'Quale imperatore, detto «Barbarossa», fu sconfitto a Legnano dalla Lega Lombarda?', 'Federico I', ['Federico II', 'Ottone I', 'Carlo V']);
  Q(2, 'Quale imperatore, detto «stupor mundi», visse alla corte di Palermo?', 'Federico II di Svevia', ['Federico Barbarossa', 'Ottone I', 'Carlo Magno']);
  Q(2, 'In quale regione italiana si trova Castel del Monte, fatto costruire da Federico II?', 'Puglia', ['Sicilia', 'Toscana', 'Campania']);
  Q(2, 'Quale imperatore subì l\'«umiliazione di Canossa» davanti a papa Gregorio VII nel 1077?', 'Enrico IV', ['Federico Barbarossa', 'Ottone I', 'Carlo V']);
  Q(2, 'Come si chiamava la lotta tra papato e Impero per la nomina dei vescovi?', 'Lotta per le investiture', ['Scisma d\'Occidente', 'Riforma protestante', 'Guerra dei Trent\'anni']);
  Q(2, 'Quale papa bandì la prima crociata a Clermont nel 1095?', 'Urbano II', ['Gregorio VII', 'Innocenzo III', 'Bonifacio VIII']);
  Q(2, 'Quale città santa fu conquistata dai crociati nel 1099?', 'Gerusalemme', ['Costantinopoli', 'Antiochia', 'Damasco']);
  Q(2, 'Quale sultano riconquistò Gerusalemme nel 1187?', 'Saladino', ['Solimano', 'Maometto II', 'Harun al-Rashid']);
  Q(2, 'Quale città cristiana fu saccheggiata dai crociati nella quarta crociata (1204)?', 'Costantinopoli', ['Gerusalemme', 'Roma', 'Venezia']);
  Q(2, 'Quale repubblica marinara guidò la quarta crociata con il doge Enrico Dandolo?', 'Venezia', ['Genova', 'Pisa', 'Amalfi']);
  Q(1, 'Quali sono le quattro repubbliche marinare italiane?', 'Amalfi, Pisa, Genova, Venezia', ['Amalfi, Pisa, Napoli, Venezia', 'Gaeta, Pisa, Genova, Venezia', 'Amalfi, Livorno, Genova, Venezia']);
  Q(2, 'Come si chiamava la bandiera della Repubblica di Venezia, con il leone alato?', 'Leone di San Marco', ['Croce di Genova', 'Aquila di Pisa', 'Giglio di Firenze']);
  Q(2, 'Come si chiamava il capo della Repubblica di Venezia?', 'Doge', ['Podestà', 'Gonfaloniere', 'Console']);
  Q(2, 'Quale ordine religioso fondò san Francesco d\'Assisi?', 'Francescani', ['Domenicani', 'Benedettini', 'Gesuiti']);
  Q(2, 'Quale santo fondò il monastero di Montecassino e l\'ordine benedettino?', 'San Benedetto da Norcia', ['San Francesco', 'San Domenico', 'Sant\'Agostino']);
  Q(3, 'Quale ordine religioso-militare, nato per proteggere i pellegrini in Terra Santa, fu soppresso nel 1312?', 'Templari', ['Ospitalieri', 'Teutonici', 'Gesuiti']);
  Q(2, 'Quale epidemia colpì l\'Europa a partire dal 1347 uccidendo circa un terzo della popolazione?', 'Peste nera', ['Colera', 'Vaiolo', 'Influenza spagnola']);
  Q(2, 'Quale scrittore descrisse la peste nera a Firenze nel «Decameron»?', 'Giovanni Boccaccio', ['Dante Alighieri', 'Francesco Petrarca', 'Niccolò Machiavelli']);
  Q(2, 'Come si chiamava il periodo di divisione della Chiesa con papi rivali, nel 1378-1417?', 'Scisma d\'Occidente', ['Riforma protestante', 'Cattività avignonese', 'Concilio di Trento']);
  Q(2, 'In quale città francese si trasferì la corte papale nel Trecento?', 'Avignone', ['Parigi', 'Lione', 'Marsiglia']);
  Q(1, 'Quale eroina francese fu bruciata sul rogo a Rouen nel 1431?', 'Giovanna d\'Arco', ['Maria Antonietta', 'Caterina de\' Medici', 'Eleonora d\'Aquitania']);
  Q(2, 'Quale re d\'Inghilterra vinse ad Azincourt nel 1415?', 'Enrico V', ['Riccardo III', 'Enrico VIII', 'Edoardo III']);
  Q(2, 'Quale imperatore bizantino regnava quando i Turchi conquistarono Costantinopoli nel 1453?', 'Costantino XI', ['Giustiniano', 'Eraclio', 'Basilio II']);
  Q(2, 'Quale sultano ottomano conquistò Costantinopoli nel 1453?', 'Maometto II', ['Solimano il Magnifico', 'Saladino', 'Selim I']);
  Q(2, 'Quale sultano ottomano, detto «il Magnifico», assediò Vienna nel 1529?', 'Solimano', ['Maometto II', 'Selim I', 'Saladino']);
  Q(1, 'Chi inventò la stampa a caratteri mobili in Europa verso la metà del Quattrocento?', 'Johannes Gutenberg', ['Aldo Manuzio', 'Martin Lutero', 'Leonardo da Vinci']);
  Q(2, 'Quale famosa opera di Gutenberg è considerata il primo grande libro stampato in Europa?', 'La Bibbia', ['Il Decameron', 'La Divina Commedia', 'L\'Iliade']);
  Q(2, 'Quale tipografo veneziano creò il formato tascabile dei libri e il corsivo?', 'Aldo Manuzio', ['Johannes Gutenberg', 'Giambattista Bodoni', 'William Caxton']);
  Q(2, 'Quale famiglia di banchieri governò Firenze nel Quattrocento?', 'Medici', ['Sforza', 'Gonzaga', 'Borgia']);
  Q(2, 'Quale signoria governò Mantova durante il Rinascimento?', 'Gonzaga', ['Este', 'Sforza', 'Visconti']);
  Q(2, 'Quale famiglia governò Ferrara nel Rinascimento?', 'Este', ['Gonzaga', 'Medici', 'Malatesta']);
  Q(2, 'Quale famiglia governò Urbino con il duca Federico da Montefeltro?', 'Montefeltro', ['Este', 'Malatesta', 'Sforza']);
  Q(2, 'Quale frate domenicano governò Firenze dopo la cacciata dei Medici e fu bruciato nel 1498?', 'Girolamo Savonarola', ['Tommaso d\'Aquino', 'Giordano Bruno', 'Tommaso Campanella']);
  Q(2, 'Quale filosofo fu bruciato a Roma nel 1600 in Campo de\' Fiori?', 'Giordano Bruno', ['Tommaso Campanella', 'Galileo Galilei', 'Girolamo Savonarola']);
  Q(2, 'Quale monaco tedesco avviò la Riforma protestante?', 'Martin Lutero', ['Giovanni Calvino', 'Erasmo da Rotterdam', 'Ulrico Zwingli']);
  Q(2, 'Come si chiamava il concilio indetto per rispondere alla Riforma protestante, aperto nel 1545?', 'Concilio di Trento', ['Concilio di Nicea', 'Concilio Vaticano II', 'Concilio di Costanza']);
  Q(2, 'Quale ordine religioso fu fondato da sant\'Ignazio di Loyola?', 'Gesuiti', ['Francescani', 'Domenicani', 'Cappuccini']);
  Q(2, 'Quale pace del 1555 stabilì «cuius regio, eius religio» nell\'Impero?', 'Pace di Augusta', ['Pace di Westfalia', 'Pace di Utrecht', 'Pace di Lodi']);
  Q(2, 'Quale monarca inglese si staccò da Roma e fondò la Chiesa anglicana?', 'Enrico VIII', ['Elisabetta I', 'Giacomo I', 'Carlo I']);
  Q(1, 'Quante mogli ebbe Enrico VIII?', 'Sei', ['Tre', 'Quattro', 'Otto']);
  Q(2, 'Quale regina d\'Inghilterra sconfisse l\'Invincibile Armata spagnola nel 1588?', 'Elisabetta I', ['Maria I', 'Vittoria', 'Anna']);
  Q(2, 'Quale regina di Scozia fu decapitata nel 1587 per ordine di Elisabetta I?', 'Maria Stuarda', ['Anna Bolena', 'Giovanna Grey', 'Caterina d\'Aragona']);
  Q(2, 'Quale moglie di Enrico VIII fu decapitata nel 1536?', 'Anna Bolena', ['Caterina d\'Aragona', 'Giovanna Seymour', 'Anna di Clèves']);
  Q(2, 'Quale re d\'Inghilterra fu decapitato nel 1649 dopo la guerra civile?', 'Carlo I', ['Giacomo I', 'Carlo II', 'Riccardo III']);
  Q(2, 'Chi governò l\'Inghilterra come Lord protettore dopo la morte di Carlo I?', 'Oliver Cromwell', ['Giacomo II', 'Guglielmo d\'Orange', 'William Pitt']);
  Q(2, 'Quale re francese costruì la reggia di Versailles?', 'Luigi XIV', ['Luigi XVI', 'Napoleone', 'Francesco I']);
  Q(2, 'Quale re francese invitò Leonardo da Vinci a vivere in Francia?', 'Francesco I', ['Luigi XIV', 'Enrico IV', 'Carlo VII']);
  Q(2, 'Chi era Caterina de\' Medici?', 'Regina di Francia di origine fiorentina', ['Duchessa di Milano', 'Regina d\'Inghilterra', 'Imperatrice d\'Austria']);
  Q(2, 'Quale massacro contro gli ugonotti avvenne a Parigi nel 1572?', 'Notte di San Bartolomeo', ['Vespri siciliani', 'Strage di Wassy', 'Notte dei cristalli']);
  Q(2, 'Quale re francese emanò l\'editto di Nantes nel 1598 sulla tolleranza dei protestanti?', 'Enrico IV', ['Luigi XIV', 'Francesco I', 'Luigi XIII']);
  Q(3, 'Quale ministro di Luigi XIII governò di fatto la Francia con il titolo di cardinale?', 'Richelieu', ['Mazzarino', 'Colbert', 'Talleyrand']);
  Q(2, 'Quale imperatore asburgico, re di Spagna e del Sacro Romano Impero, abdicò nel 1556?', 'Carlo V', ['Francesco Giuseppe', 'Rodolfo II', 'Leopoldo I']);
  Q(2, 'Quale città italiana fu saccheggiata nel 1527 dai lanzichenecchi di Carlo V?', 'Roma', ['Firenze', 'Milano', 'Napoli']);
  Q(2, 'Quale zar russo fondò San Pietroburgo nel 1703?', 'Pietro il Grande', ['Ivan il Terribile', 'Nicola II', 'Alessandro I']);
  Q(2, 'Quale pirata gallese, poi governatore della Giamaica, saccheggiò i Caraibi nel Seicento?', 'Henry Morgan', ['Barbanera', 'Francis Drake', 'William Kidd']);
  Q(2, 'Quale popolo nativo americano fu protagonista del primo Giorno del Ringraziamento con i coloni di Plymouth?', 'Wampanoag', ['Sioux', 'Apache', 'Cherokee']);
  Q(2, 'Quale nave portò i Padri Pellegrini in America nel 1620?', 'Mayflower', ['Santa María', 'Endeavour', 'Beagle']);
  Q(2, 'Quale nave portò Charles Darwin alle isole Galápagos?', 'Beagle', ['Endeavour', 'Mayflower', 'Bounty']);
  Q(2, 'Quale capitano esplorò le coste australiane con la nave «Endeavour»?', 'James Cook', ['Abel Tasman', 'Francis Drake', 'Fridtjof Nansen']);
  Q(2, 'Quale nave fu teatro di un famoso ammutinamento nel 1789 nel Pacifico?', 'Bounty', ['Beagle', 'Endeavour', 'Victory']);
  Q(2, 'Quale ammiraglio britannico morì a Trafalgar sulla nave Victory?', 'Horatio Nelson', ['James Cook', 'Francis Drake', 'Arthur Wellesley']);
  Q(2, 'Quale generale britannico sconfisse Napoleone a Waterloo?', 'Duca di Wellington', ['Horatio Nelson', 'Winston Churchill', 'Montgomery']);
  Q(2, 'Quale maresciallo prussiano arrivò in aiuto a Wellington a Waterloo?', 'Blücher', ['Moltke', 'Hindenburg', 'Bismarck']);

  // ---------- Quiz: Risorgimento e storia d'Italia ----------
  Q(2, 'Come si chiamava la società segreta patriottica attiva in Italia nel primo Ottocento?', 'Carboneria', ['Massoneria', 'Giovine Italia', 'Camorra']);
  Q(2, 'Quale scrittore patriota raccontò la sua prigionia allo Spielberg in «Le mie prigioni»?', 'Silvio Pellico', ['Alessandro Manzoni', 'Ugo Foscolo', 'Giuseppe Giusti']);
  Q(2, 'Quale cancelliere austriaco fu il protagonista del Congresso di Vienna?', 'Metternich', ['Bismarck', 'Richelieu', 'Talleyrand']);
  Q(2, 'Quale re di Sardegna concesse lo Statuto nel 1848 e abdicò dopo Novara?', 'Carlo Alberto', ['Vittorio Emanuele II', 'Carlo Felice', 'Umberto I']);
  Q(2, 'Contro quale dominazione insorse Milano nelle Cinque giornate del 1848?', 'Austriaca', ['Francese', 'Spagnola', 'Borbonica']);
  Q(2, 'Quale maresciallo austriaco sconfisse i piemontesi a Custoza e Novara?', 'Radetzky', ['Metternich', 'Moltke', 'Wellington']);
  Q(2, 'Quale patriota guidò il triumvirato della Repubblica Romana del 1849?', 'Giuseppe Mazzini', ['Giuseppe Garibaldi', 'Camillo Cavour', 'Carlo Cattaneo']);
  Q(1, 'Quale soprannome fu dato a Vittorio Emanuele II?', 'Re Galantuomo', ['Re Sole', 'Re Magnifico', 'Re Buono']);
  Q(3, 'Dove si svolse nel 1858 il patto segreto tra Cavour e Napoleone III?', 'Plombières', ['Teano', 'Villafranca', 'Compiègne']);
  Q(2, 'Quale imperatore francese si alleò con il Piemonte nella seconda guerra d\'indipendenza?', 'Napoleone III', ['Napoleone Bonaparte', 'Luigi XVIII', 'Carlo X']);
  Q(2, 'Chi fondò la Croce Rossa dopo aver visto gli orrori della battaglia di Solferino?', 'Henry Dunant', ['Florence Nightingale', 'Giuseppe Garibaldi', 'Louis Pasteur']);
  Q(1, 'Quale regno fu conquistato dai Mille di Garibaldi nel 1860?', 'Regno delle Due Sicilie', ['Regno di Sardegna', 'Stato Pontificio', 'Granducato di Toscana']);
  Q(3, 'Chi fu l\'ultimo re delle Due Sicilie?', 'Francesco II', ['Ferdinando II', 'Ferdinando I', 'Gioacchino Murat']);
  Q(2, 'In quale località Garibaldi consegnò l\'Italia meridionale a Vittorio Emanuele II nel 1860?', 'Teano', ['Marsala', 'Caprera', 'Calatafimi']);
  Q(2, 'In quale località siciliana sbarcarono i Mille nel 1860?', 'Marsala', ['Palermo', 'Messina', 'Siracusa']);
  Q(1, 'Quale isola scelse Garibaldi per ritirarsi a vita privata?', 'Caprera', ['Elba', 'Ponza', 'Capri']);
  Q(2, 'Quale città fu la prima capitale del Regno d\'Italia?', 'Torino', ['Firenze', 'Roma', 'Milano']);
  Q(2, 'Quale regione fu annessa all\'Italia dopo la terza guerra d\'indipendenza, nel 1866?', 'Veneto', ['Lazio', 'Trentino', 'Friuli']);
  Q(2, 'Quale re d\'Italia fu ucciso a Monza nel 1900 da un anarchico?', 'Umberto I', ['Vittorio Emanuele II', 'Vittorio Emanuele III', 'Umberto II']);
  Q(2, 'Quale statista dominò la vita politica italiana nei primi anni del Novecento, nell\'«età giolittiana»?', 'Giovanni Giolitti', ['Francesco Crispi', 'Benito Mussolini', 'Camillo Cavour']);
  Q(1, 'Quale territorio africano l\'Italia conquistò con la guerra del 1911-1912?', 'Libia', ['Etiopia', 'Eritrea', 'Somalia']);
  Q(1, 'Chi era re d\'Italia durante le due guerre mondiali e il fascismo?', 'Vittorio Emanuele III', ['Umberto I', 'Umberto II', 'Vittorio Emanuele II']);
  Q(2, 'Quale deputato socialista fu rapito e ucciso dai fascisti nel 1924?', 'Giacomo Matteotti', ['Antonio Gramsci', 'Filippo Turati', 'Carlo Rosselli']);
  Q(2, 'Quale fondatore del Partito comunista italiano morì dopo anni di carcere fascista?', 'Antonio Gramsci', ['Palmiro Togliatti', 'Enrico Berlinguer', 'Giacomo Matteotti']);
  Q(1, 'Come si chiamano le leggi del 1938 che discriminarono gli ebrei in Italia?', 'Leggi razziali', ['Leggi fascistissime', 'Leggi Rocco', 'Leggi Zanardelli']);
  Q(2, 'Quale organo votò la sfiducia a Mussolini il 25 luglio 1943?', 'Gran Consiglio del Fascismo', ['Parlamento', 'Senato del Regno', 'Consiglio dei ministri']);
  Q(2, 'Quale maresciallo guidò il governo dopo la caduta di Mussolini nel 1943?', 'Pietro Badoglio', ['Rodolfo Graziani', 'Italo Balbo', 'Armando Diaz']);
  Q(2, 'Come si chiamò lo Stato fantoccio creato da Mussolini nel Nord Italia nel 1943?', 'Repubblica Sociale Italiana', ['Regno del Sud', 'Repubblica Cisalpina', 'Stato Libero di Fiume']);
  Q(2, 'Che cosa indica la sigla CLN?', 'Comitato di Liberazione Nazionale', ['Comitato Lavoratori Nazionali', 'Confederazione Libera Nazionale', 'Corpo di Liberazione del Nord']);
  Q(2, 'Quale città insorse contro i tedeschi nel settembre 1943 nelle «Quattro giornate»?', 'Napoli', ['Roma', 'Firenze', 'Milano']);
  Q(2, 'Quale eccidio nazista del 1944 a Roma causò 335 vittime?', 'Fosse Ardeatine', ['Marzabotto', 'Sant\'Anna di Stazzema', 'Strage di Cefalonia']);
  Q(2, 'Come si chiamava la linea difensiva tedesca che tagliava l\'Italia centrale nel 1944-45?', 'Linea Gotica', ['Linea Maginot', 'Linea Sigfrido', 'Linea Piave']);
  Q(1, 'Come si chiamò il programma di aiuti americani all\'Europa dopo la Seconda guerra mondiale?', 'Piano Marshall', ['Piano Schuman', 'Piano Morgenthau', 'Piano Dawes']);
  Q(1, 'Quale partito guidò De Gasperi?', 'Democrazia Cristiana', ['Partito Socialista', 'Partito Comunista', 'Partito Liberale']);
  Q(2, 'Quale attentato del 1969 a Milano inaugurò la «strategia della tensione»?', 'Strage di piazza Fontana', ['Strage di Bologna', 'Strage di Capaci', 'Strage di via D\'Amelio']);
  Q(2, 'Quale strage del 1980 colpì la stazione ferroviaria di una città emiliana?', 'Strage di Bologna', ['Strage di Ustica', 'Strage di Brescia', 'Strage dell\'Italicus']);
  Q(1, 'Come si chiamano gli anni Settanta segnati dal terrorismo politico in Italia?', 'Anni di piombo', ['Anni del boom', 'Anni di ferro', 'Anni di fuoco']);
  Q(1, 'Quale gruppo terroristico rapì Aldo Moro nel 1978?', 'Brigate Rosse', ['Prima Linea', 'Nuclei Armati Rivoluzionari', 'Ordine Nuovo']);
  Q(2, 'Su quale tema gli italiani votarono al referendum del 1974?', 'Divorzio', ['Aborto', 'Nucleare', 'Monarchia']);
  Q(2, 'Su quale tema gli italiani votarono al referendum istituzionale del 1946?', 'Monarchia o repubblica', ['Divorzio', 'Nucleare', 'Aborto']);
  Q(2, 'Quale legge del 1978 avviò la chiusura dei manicomi in Italia?', 'Legge Basaglia', ['Legge Merlin', 'Legge Fornero', 'Legge Gelmini']);
  Q(2, 'Quale legge del 1958 chiuse le case di tolleranza in Italia?', 'Legge Merlin', ['Legge Basaglia', 'Legge Mancino', 'Legge Bossi-Fini']);
  Q(1, 'Come è chiamata l\'inchiesta giudiziaria che nel 1992 travolse la classe politica italiana?', 'Mani pulite', ['Mafia capitale', 'Piazza pulita', 'Operazione Clean']);
  Q(2, 'Quale pubblico ministero divenne il volto di Mani pulite?', 'Antonio Di Pietro', ['Giovanni Falcone', 'Piercamillo Davigo', 'Paolo Borsellino']);
  Q(2, 'Quale disastro del 1963 fu causato da una frana caduta in un bacino idroelettrico?', 'Vajont', ['Stava', 'Sarno', 'Gleno']);
  Q(2, 'Quale terremoto del 1980 colpì la Campania e la Basilicata?', 'Terremoto dell\'Irpinia', ['Terremoto del Friuli', 'Terremoto di Messina', 'Terremoto del Belice']);
  Q(2, 'Quale terremoto colpì il Friuli nel 1976?', 'Terremoto del Friuli', ['Terremoto dell\'Irpinia', 'Terremoto dell\'Umbria', 'Terremoto dell\'Aquila']);
  Q(3, 'Chi fu il primo astronauta italiano nello spazio (1992)?', 'Franco Malerba', ['Umberto Guidoni', 'Paolo Nespoli', 'Luca Parmitano']);
  Q(2, 'Quale città italiana ospitò le Olimpiadi invernali del 2006?', 'Torino', ['Cortina', 'Milano', 'Bormio']);
  Q(2, 'Quale evento nel 1957 segnò la nascita della Comunità economica europea?', 'Trattati di Roma', ['Trattato di Maastricht', 'Trattato di Lisbona', 'Accordi di Schengen']);
  Q(3, 'Quale opera del 1764 di Cesare Beccaria criticò la tortura e la pena di morte?', 'Dei delitti e delle pene', ['Il Principe', 'Il Contratto sociale', 'La Città del Sole']);
  Q(2, 'Quale granduca di Toscana abolì per primo la pena di morte nel 1786?', 'Pietro Leopoldo', ['Cosimo I', 'Leopoldo II', 'Ferdinando III']);
  Q(2, 'In quale città morì Dante Alighieri?', 'Ravenna', ['Firenze', 'Verona', 'Roma']);
  Q(2, 'Da quale città fu esiliato Dante nel 1302?', 'Firenze', ['Roma', 'Pisa', 'Siena']);

  // ---------- Quiz: Novecento e oggi ----------
  Q(1, 'Chi fu assassinato a Sarajevo il 28 giugno 1914, scatenando la Prima guerra mondiale?', 'Francesco Ferdinando', ['Francesco Giuseppe', 'Guglielmo II', 'Nicola II']);
  Q(3, 'Come si chiamava il giovane nazionalista serbo che uccise l\'erede al trono austro-ungarico?', 'Gavrilo Princip', ['Slobodan Milošević', 'Josip Broz', 'Radovan Karadžić']);
  Q(2, 'Quale alleanza legava Germania, Austria-Ungheria e Italia prima della Grande Guerra?', 'Triplice Alleanza', ['Triplice Intesa', 'Santa Alleanza', 'Patto d\'Acciaio']);
  Q(2, 'Quale generale italiano sostituì Cadorna dopo la disfatta di Caporetto?', 'Armando Diaz', ['Pietro Badoglio', 'Luigi Cadorna', 'Italo Balbo']);
  Q(1, 'Quale fiume fu la linea di resistenza dell\'esercito italiano dopo Caporetto?', 'Piave', ['Isonzo', 'Adige', 'Tagliamento']);
  Q(1, 'Dove è sepolto il Milite Ignoto in Italia?', 'Altare della Patria', ['Pantheon', 'Colosseo', 'Basilica di San Pietro']);
  Q(2, 'Quale presidente americano propose i «Quattordici punti» per la pace nel 1918?', 'Woodrow Wilson', ['Theodore Roosevelt', 'Franklin Roosevelt', 'Herbert Hoover']);
  Q(3, 'Quale transatlantico britannico affondato da un sommergibile tedesco nel 1915 spinse gli USA verso la guerra?', 'Lusitania', ['Titanic', 'Britannic', 'Queen Mary']);
  Q(2, 'Quale arma chimica fu usata su larga scala a Ypres nel 1915?', 'Gas asfissianti', ['Napalm', 'Fosforo bianco', 'Agente arancio']);
  Q(2, 'Quale famiglia reale russa fu uccisa a Ekaterinburg nel 1918?', 'I Romanov', ['Gli Asburgo', 'Gli Hohenzollern', 'I Savoia']);
  Q(1, 'Chi guidò i bolscevichi nella rivoluzione russa del 1917?', 'Lenin', ['Stalin', 'Trotskij', 'Kerenskij']);
  Q(2, 'Quale presidente americano lanciò il New Deal per uscire dalla Grande Depressione?', 'Franklin D. Roosevelt', ['Herbert Hoover', 'Harry Truman', 'Woodrow Wilson']);
  Q(1, 'Quale dittatore governò la Spagna dal 1939 al 1975?', 'Francisco Franco', ['Miguel Primo de Rivera', 'António Salazar', 'Benito Mussolini']);
  Q(3, 'Quale dittatore portoghese guidò l\'Estado Novo per decenni?', 'António de Oliveira Salazar', ['Francisco Franco', 'Marcelo Caetano', 'Mário Soares']);
  Q(2, 'Come è ricordata la notte tra il 9 e il 10 novembre 1938, con l\'attacco ai negozi ebraici in Germania?', 'Notte dei cristalli', ['Notte dei lunghi coltelli', 'Notte di San Bartolomeo', 'Notte di Valpurga']);
  Q(2, 'Quale giorno si celebra il Giorno della Memoria per le vittime della Shoah?', '27 gennaio', ['25 aprile', '2 giugno', '4 novembre']);
  Q(1, 'In quale Paese si trovava il campo di sterminio di Auschwitz?', 'Polonia', ['Germania', 'Austria', 'Ucraina']);
  Q(1, 'Quale ragazza ebrea scrisse un celebre diario nascosta ad Amsterdam durante la guerra?', 'Anne Frank', ['Etty Hillesum', 'Liliana Segre', 'Hannah Arendt']);
  Q(1, 'Quale attacco giapponese del 7 dicembre 1941 portò gli Stati Uniti in guerra?', 'Pearl Harbor', ['Midway', 'Iwo Jima', 'Okinawa']);
  Q(2, 'Come si chiamava il progetto americano che sviluppò la bomba atomica?', 'Progetto Manhattan', ['Progetto Apollo', 'Operazione Overlord', 'Progetto Gemini']);
  Q(2, 'Quale presidente americano decise di usare la bomba atomica contro il Giappone?', 'Harry Truman', ['Franklin Roosevelt', 'Dwight Eisenhower', 'Herbert Hoover']);
  Q(1, 'Come è ricordato lo sbarco alleato in Normandia del 6 giugno 1944?', 'D-Day', ['V-Day', 'Operazione Husky', 'Operazione Barbarossa']);
  Q(2, 'Come si chiamava l\'invasione tedesca dell\'Unione Sovietica del 1941?', 'Operazione Barbarossa', ['Operazione Overlord', 'Operazione Husky', 'Operazione Leone Marino']);
  Q(3, 'Come si chiamava l\'operazione alleata che sbarcò in Sicilia nel 1943?', 'Operazione Husky', ['Operazione Overlord', 'Operazione Torch', 'Operazione Market Garden']);
  Q(2, 'Quale generale americano comandò gli Alleati in Europa e fu poi presidente degli Stati Uniti?', 'Dwight Eisenhower', ['Douglas MacArthur', 'George Patton', 'Omar Bradley']);
  Q(2, 'Quale generale tedesco era soprannominato «la volpe del deserto»?', 'Erwin Rommel', ['Heinz Guderian', 'Erich von Manstein', 'Karl Dönitz']);
  Q(2, 'Quale generale britannico sconfisse Rommel a El Alamein?', 'Bernard Montgomery', ['Archibald Wavell', 'Orde Wingate', 'Louis Mountbatten']);
  Q(2, 'Quale evento ebbe luogo a Norimberga tra il 1945 e il 1946?', 'Il processo ai capi nazisti', ['La firma della resa tedesca', 'Il congresso di Yalta', 'Il processo a Eichmann']);
  Q(1, 'Quale città fu divisa dopo la guerra in quattro settori tra gli Alleati?', 'Berlino', ['Vienna', 'Varsavia', 'Praga']);
  Q(2, 'Come si chiamò l\'operazione di rifornimenti per Berlino Ovest del 1948-1949?', 'Ponte aereo', ['Piano Marshall', 'Cortina di ferro', 'Operazione Overlord']);
  Q(2, 'Come si chiamava l\'alleanza militare dei Paesi comunisti dell\'Europa orientale, fondata nel 1955?', 'Patto di Varsavia', ['Comecon', 'Cominform', 'Patto Atlantico']);
  Q(2, 'Quale espressione di Churchill indicò la divisione dell\'Europa dopo il 1945?', 'Cortina di ferro', ['Guerra lampo', 'Muro di Berlino', 'Linea Maginot']);
  Q(1, 'Quale crisi del 1962 portò USA e URSS vicini a una guerra nucleare?', 'Crisi dei missili di Cuba', ['Crisi di Suez', 'Crisi di Berlino', 'Guerra di Corea']);
  Q(1, 'Chi guidò Cuba dopo la rivoluzione del 1959?', 'Fidel Castro', ['Che Guevara', 'Fulgencio Batista', 'Hugo Chávez']);
  Q(1, 'Quale leader sovietico avviò le riforme chiamate glasnost e perestrojka?', 'Michail Gorbačëv', ['Leonid Brežnev', 'Nikita Chruščëv', 'Boris El\'cin']);
  Q(2, 'Quale presidente russo guidò il Paese dopo la fine dell\'URSS, dal 1991 al 1999?', 'Boris El\'cin', ['Michail Gorbačëv', 'Vladimir Putin', 'Dmitrij Medvedev']);
  Q(1, 'Quale presidente americano si dimise nel 1974 a causa dello scandalo Watergate?', 'Richard Nixon', ['Gerald Ford', 'Lyndon Johnson', 'Jimmy Carter']);
  Q(1, 'Chi fu eletto nel 2008 primo presidente afroamericano degli Stati Uniti?', 'Barack Obama', ['Bill Clinton', 'Jesse Jackson', 'Colin Powell']);
  Q(2, 'In quale piazza di Pechino furono represse le proteste studentesche del 1989?', 'Piazza Tienanmen', ['Piazza Rossa', 'Piazza Taksim', 'Piazza Tahrir']);
  Q(3, 'Quale leader cinese avviò le riforme economiche dopo la morte di Mao?', 'Deng Xiaoping', ['Zhou Enlai', 'Xi Jinping', 'Jiang Zemin']);
  Q(1, 'Quale regime di segregazione razziale fu in vigore in Sudafrica fino al 1994?', 'Apartheid', ['Segregazione di Jim Crow', 'Colonialismo', 'Panafricanismo']);
  Q(3, 'In quale isola fu imprigionato Nelson Mandela per quasi 18 anni?', 'Robben Island', ['Sant\'Elena', 'Zanzibar', 'Madagascar']);
  Q(2, 'Quale leader palestinese ottenne il Nobel per la pace nel 1994 con Rabin e Peres?', 'Yasser Arafat', ['Mahmoud Abbas', 'Anwar Sadat', 'Hosni Mubarak']);
  Q(2, 'Quale evento del 1979 portò al potere l\'ayatollah Khomeini?', 'Rivoluzione iraniana', ['Rivoluzione cubana', 'Guerra del Golfo', 'Rivoluzione russa']);
  Q(2, 'Quale Paese invase il Kuwait nel 1990?', 'Iraq', ['Iran', 'Siria', 'Arabia Saudita']);
  Q(2, 'Quale capitale fu assediata dal 1992 al 1996 durante la guerra di Bosnia?', 'Sarajevo', ['Belgrado', 'Zagabria', 'Pristina']);
  Q(2, 'Quale cancelliere tedesco guidò la riunificazione della Germania nel 1990?', 'Helmut Kohl', ['Willy Brandt', 'Gerhard Schröder', 'Konrad Adenauer']);
  Q(1, 'Quale prima ministra britannica era soprannominata «la Lady di ferro»?', 'Margaret Thatcher', ['Theresa May', 'Elisabetta II', 'Indira Gandhi']);
  Q(1, 'Quale cancelliera tedesca ha governato dal 2005 al 2021?', 'Angela Merkel', ['Margaret Thatcher', 'Ursula von der Leyen', 'Giorgia Meloni']);
  Q(1, 'Quale principessa del Galles morì a Parigi in un incidente nel 1997?', 'Diana', ['Margaret', 'Anna', 'Carolina']);
  Q(3, 'Come si chiamava l\'attentatore turco che sparò a papa Giovanni Paolo II nel 1981?', 'Mehmet Ali Ağca', ['Carlos lo Sciacallo', 'Osama bin Laden', 'Lee Harvey Oswald']);
  Q(3, 'In quale città americana fu ucciso Martin Luther King nel 1968?', 'Memphis', ['Dallas', 'Atlanta', 'Birmingham']);
  Q(2, 'Quale donna, nel 1955, rifiutò di cedere il posto su un autobus a Montgomery?', 'Rosa Parks', ['Coretta King', 'Angela Davis', 'Harriet Tubman']);
  Q(2, 'Quale presidente americano firmò il Civil Rights Act del 1964?', 'Lyndon Johnson', ['John Kennedy', 'Richard Nixon', 'Dwight Eisenhower']);
  Q(2, 'Quale accordo del 1992 istituì l\'Unione europea?', 'Trattato di Maastricht', ['Trattato di Roma', 'Trattato di Lisbona', 'Accordi di Schengen']);
  Q(2, 'Quale città ospitò i Giochi olimpici estivi del 1936, sotto il nazismo?', 'Berlino', ['Monaco', 'Amburgo', 'Vienna']);
  Q(2, 'Quale atleta afroamericano vinse quattro ori alle Olimpiadi di Berlino del 1936?', 'Jesse Owens', ['Carl Lewis', 'Muhammad Ali', 'Tommie Smith']);
  Q(2, 'Quale Paese ospitò i Giochi olimpici estivi del 1972, segnati dall\'attentato ai danni degli atleti israeliani?', 'Germania Ovest', ['Italia', 'Unione Sovietica', 'Stati Uniti']);
  Q(2, 'Quale leader indiano, figlia di Nehru, fu primo ministro e fu assassinata nel 1984?', 'Indira Gandhi', ['Benazir Bhutto', 'Golda Meir', 'Sonia Gandhi']);
  Q(2, 'Quale primo ministro israeliano fu ucciso nel 1995 da un estremista?', 'Yitzhak Rabin', ['Menachem Begin', 'Golda Meir', 'Ariel Sharon']);
  Q(2, 'Quale presidente egiziano fu ucciso nel 1981 dopo la pace con Israele?', 'Anwar Sadat', ['Gamal Abdel Nasser', 'Hosni Mubarak', 'Yasser Arafat']);
  Q(2, 'Come è chiamata la serie di rivolte popolari scoppiate nel 2010-2011 nel mondo arabo?', 'Primavera araba', ['Primavera di Praga', 'Rivoluzione dei garofani', 'Guerra del Golfo']);

  // ---------- Vero o falso ----------
  T(1, 'Giulio Cesare fu assassinato alle Idi di marzo.', true);
  T(2, 'Il Colosseo fu fatto costruire dall\'imperatore Nerone.', false, 'Fu iniziato da Vespasiano e inaugurato da Tito, della dinastia flavia');
  T(2, 'Il Pantheon di Roma fu ricostruito nella forma attuale sotto l\'imperatore Adriano.', true);
  T(2, 'Gli antichi Romani usavano un tipo di calcestruzzo per costruire.', true);
  T(2, 'Annibale conquistò Roma dopo la vittoria di Canne.', false, 'Annibale vinse a Canne ma non conquistò mai Roma');
  T(3, 'Cleopatra apparteneva a una dinastia di origine greco-macedone.', true);
  T(1, 'Le Olimpiadi dell\'antichità si svolgevano a Olimpia.', true);
  T(2, 'Atene e Sparta si scontrarono nella guerra del Peloponneso.', true);
  T(2, 'Alessandro Magno ebbe come maestro il filosofo Aristotele.', true);
  T(2, 'Cartagine fu fondata dai Fenici.', true);
  T(2, 'Carlo Magno fu incoronato imperatore da papa Leone III.', true);
  T(3, 'Il Sacro Romano Impero fu sciolto da Napoleone nel 1806.', true);
  T(2, 'La peste nera arrivò in Europa nel Cinquecento.', false, 'Arrivò nel 1347, nel Trecento');
  T(1, 'Giovanna d\'Arco morì sul rogo.', true);
  T(2, 'La Guerra dei Cent\'anni durò esattamente cento anni.', false, 'Durò 116 anni, dal 1337 al 1453');
  T(2, 'Secondo la tradizione, Lutero affisse le 95 tesi a Wittenberg.', true);
  T(1, 'Enrico VIII d\'Inghilterra ebbe sei mogli.', true);
  T(3, 'Elisabetta I d\'Inghilterra sposò Filippo II di Spagna.', false, 'Elisabetta I non si sposò mai; Filippo II era stato marito di sua sorella Maria');
  T(2, 'Luigi XVI di Francia fu ghigliottinato nel 1793.', true);
  T(3, 'Non esistono prove che Maria Antonietta abbia detto «Che mangino brioche».', true);
  T(2, 'Napoleone era molto più basso dei suoi contemporanei.', false, 'Era alto circa 1,68 m, nella media; il mito nasce da un equivoco sulle unità di misura');
  T(2, 'Il Congresso di Vienna si tenne dopo la sconfitta di Napoleone.', true);
  T(2, 'Napoleone fu sconfitto a Waterloo da inglesi e prussiani.', true);
  T(2, 'Garibaldi fu anche presidente del Consiglio del Regno d\'Italia.', false, 'Fu generale e deputato, ma non guidò mai il governo');
  T(2, 'Cavour morì pochi mesi dopo la proclamazione del Regno d\'Italia.', true);
  T(2, 'Venezia fu annessa all\'Italia nel 1866.', true);
  T(2, 'Trento e Trieste furono annesse all\'Italia dopo la Prima guerra mondiale.', true);
  T(2, 'I Mille di Garibaldi partirono dallo scoglio di Quarto, vicino a Genova.', true);
  T(3, 'Il tricolore italiano nacque a Reggio Emilia nel 1797.', true);
  T(3, 'Garibaldi nacque a Genova.', false, 'Nacque a Nizza, nel 1807');
  T(1, 'Cavour fu il primo re d\'Italia.', false, 'Il primo re d\'Italia fu Vittorio Emanuele II; Cavour fu il primo presidente del Consiglio');
  T(1, 'Il fascismo italiano rimase al governo per oltre quarant\'anni.', false, 'Durò circa vent\'anni, dal 1922 al 1943');
  T(1, 'Mussolini fu fucilato dai partigiani nell\'aprile 1945.', true);
  T(1, 'L\'Italia fu una monarchia fino al 1946.', true);
  T(2, 'I Patti Lateranensi del 1929 crearono lo Stato della Città del Vaticano.', true);
  T(3, 'Dopo il 1946 una norma della Costituzione vietò per decenni l\'ingresso in Italia ai discendenti maschi di casa Savoia.', true);
  T(3, 'Altiero Spinelli è tra gli autori del Manifesto di Ventotene.', true);
  T(2, 'Alcide De Gasperi è considerato uno dei padri fondatori dell\'Europa unita.', true);
  T(1, 'Il primo governo italiano guidato da una donna è stato quello di Giorgia Meloni.', true);
  T(1, 'Il Piano Marshall aiutò la ricostruzione dell\'Europa occidentale.', true);
  T(2, 'Il Muro di Berlino fu costruito dalla Germania Est.', true);
  T(1, 'La Germania Est era un Paese alleato degli Stati Uniti.', false, 'Faceva parte del blocco sovietico');
  T(2, 'Hiroshima fu colpita dalla bomba atomica prima di Nagasaki.', true);
  T(2, 'La Seconda guerra mondiale in Europa finì prima della resa del Giappone.', true);
  T(2, 'Pearl Harbor si trova nelle Filippine.', false, 'Si trova alle Hawaii');
  T(3, 'Winston Churchill tornò a essere primo ministro britannico dal 1951 al 1955.', true);
  T(2, 'Nel 1939 Germania e Unione Sovietica firmarono un patto di non aggressione.', true);
  T(2, 'La Svizzera fu invasa dalla Germania nazista.', false, 'Rimase neutrale per tutta la guerra');
  T(2, 'Anne Frank scrisse il suo diario a Berlino.', false, 'Lo scrisse ad Amsterdam, dove la famiglia si nascondeva');
  T(2, 'Mahatma Gandhi fu ucciso nel 1948.', true);
  T(2, 'Il Muro di Berlino cadde quando Gorbačëv guidava ancora l\'Unione Sovietica.', true);
  T(2, 'Durante la Guerra fredda USA e URSS si combatterono direttamente in grandi battaglie.', false, 'Fu uno scontro indiretto, combattuto tramite alleati e guerre locali');
  T(2, 'La NATO è nata prima del Patto di Varsavia.', true);
  T(1, 'Il Titanic era diretto a New York.', true);
  T(2, 'Il Regno d\'Italia fu proclamato a Roma nel 1861.', false, 'Fu proclamato a Torino; Roma divenne capitale nel 1871');
  T(1, 'Pompei fu distrutta dall\'eruzione dell\'Etna.', false, 'Fu distrutta dal Vesuvio nel 79 d.C.');
  T(1, 'I Vichinghi provenivano dalla Scandinavia.', true);
  T(1, 'Gengis Khan fondò l\'Impero mongolo.', true);
  T(2, 'Marco Polo fu ricevuto alla corte del Gran Khan Kublai.', true);
  T(1, 'La Rivoluzione industriale iniziò in Gran Bretagna.', true);
  T(2, 'Le piramidi di Giza furono costruite da schiavi ebrei.', false, 'Furono costruite da lavoratori egiziani, non da schiavi ebrei');
  T(2, 'Tutankhamon regnò per oltre cinquant\'anni.', false, 'Salì al trono bambino e morì a circa 18-19 anni');
  T(2, 'La Grande Piramide di Giza è legata al faraone Cheope.', true);
  T(1, 'Gli Aztechi vivevano nell\'attuale Perù.', false, 'Vivevano nell\'attuale Messico; gli Inca vivevano in Perù');
  T(2, 'Hernán Cortés conquistò l\'impero inca.', false, 'Cortés conquistò l\'impero azteco; gli Inca furono sconfitti da Pizarro');
  T(3, 'Napoleone vendette la Louisiana agli Stati Uniti nel 1803.', true);
  T(2, 'L\'Alaska fu acquistata dagli Stati Uniti dalla Russia.', true);
  T(2, 'La regina Vittoria fu anche imperatrice dell\'India.', true);
  T(2, 'Abraham Lincoln fu ucciso mentre assisteva a uno spettacolo teatrale.', true);
  T(1, 'Il Canale di Suez collega il Mediterraneo al Mar Rosso.', true);
  T(1, 'Il Canale di Panama collega l\'Atlantico al Pacifico.', true);
  T(1, 'L\'Unione europea ha adottato l\'euro in tutti i suoi Paesi membri.', false, 'Alcuni Paesi, come Polonia e Svezia, hanno ancora una valuta propria');
  T(2, 'Il Regno Unito è uscito formalmente dall\'Unione europea nel 2020.', true);
  T(3, 'La Croazia ha adottato l\'euro nel 2023.', true);
  T(3, 'Dante Alighieri apparteneva alla fazione guelfa.', true);
  T(1, 'Il Colosseo si chiamava in origine Anfiteatro Flavio.', true);

  // ---------- Metti in ordine ----------
  O(2, 'Metti in ordine queste battaglie della Seconda guerra mondiale, dalla prima', ['Dunkerque', 'Pearl Harbor', 'Stalingrado', 'Sbarco in Normandia']);
  O(2, 'Metti in ordine questi eventi del Rinascimento, dal primo', ['Gutenberg stampa la Bibbia', 'Colombo arriva in America', 'Lutero pubblica le 95 tesi', 'Il sacco di Roma']);
  O(2, 'Metti in ordine questi sovrani francesi, dal primo a regnare', ['Luigi IX', 'Filippo il Bello', 'Luigi XIV', 'Napoleone III']);
  O(2, 'Metti in ordine le capitali d\'Italia, dalla prima', ['Torino', 'Firenze', 'Roma']);
  O(2, 'Metti in ordine queste rivoluzioni, dalla prima', ['Rivoluzione inglese', 'Rivoluzione americana', 'Rivoluzione francese', 'Rivoluzione russa']);
  O(2, 'Metti in ordine queste guerre, dalla prima a iniziare', ['Guerra dei Cent\'anni', 'Guerra dei Trent\'anni', 'Guerra dei Sette anni', 'Guerra di secessione americana']);
  O(2, 'Metti in ordine questi presidenti americani, dal primo in carica', ['George Washington', 'Abraham Lincoln', 'Theodore Roosevelt', 'John F. Kennedy']);
  O(2, 'Metti in ordine questi presidenti americani, dal primo in carica', ['Franklin D. Roosevelt', 'Harry Truman', 'Richard Nixon', 'Ronald Reagan']);
  O(3, 'Metti in ordine queste imprese di esplorazione, dalla prima', ['Dias doppia il Capo di Buona Speranza', 'Colombo sbarca nelle Bahamas', 'Vasco da Gama raggiunge l\'India', 'Parte la spedizione di Magellano']);
  O(2, 'Metti in ordine questi eventi del Risorgimento, dal primo', ['Cinque giornate di Milano', 'Spedizione dei Mille', 'Annessione del Veneto', 'Presa di Porta Pia']);
  O(2, 'Metti in ordine questi eventi del fascismo, dal primo', ['Marcia su Roma', 'Delitto Matteotti', 'Leggi razziali', 'Caduta di Mussolini']);
  O(2, 'Metti in ordine questi eventi della Guerra fredda, dal primo', ['Blocco di Berlino', 'Costruzione del Muro di Berlino', 'Crisi dei missili di Cuba', 'Caduta del Muro di Berlino']);
  O(2, 'Metti in ordine questi eventi dell\'antichità, dal più antico', ['Fondazione di Roma', 'Battaglia di Maratona', 'Morte di Alessandro Magno', 'Battaglia di Azio']);
  O(2, 'Metti in ordine questi eventi medievali, dal più antico', ['Incoronazione di Carlo Magno', 'Battaglia di Hastings', 'Firma della Magna Carta', 'Presa di Costantinopoli']);
  O(2, 'Metti in ordine questi italiani celebri per data di nascita, dal più antico', ['Dante Alighieri', 'Leonardo da Vinci', 'Galileo Galilei', 'Giuseppe Garibaldi']);
  O(2, 'Metti in ordine queste guerre del Novecento, dalla prima', ['Prima guerra mondiale', 'Guerra civile spagnola', 'Seconda guerra mondiale', 'Guerra di Corea']);
  O(2, 'Metti in ordine questi eventi, dal più antico', ['Affondamento del Titanic', 'Inizio della Prima guerra mondiale', 'Crollo di Wall Street', 'Inizio della Seconda guerra mondiale']);
  O(2, 'Metti in ordine questi eventi del nuovo millennio, dal primo', ['Attentati dell\'11 settembre', 'Euro in circolazione', 'Crisi di Lehman Brothers', 'Referendum sulla Brexit']);

  // ---------- Indovina il numero ----------
  N(1, 'Quanti sono i colli storici di Roma?', 7, 0, 15, 0, 'colli');
  N(2, 'Quanti furono i re di Roma secondo la tradizione?', 7, 0, 15, 0, 're');
  N(2, 'Quanti articoli ha la Costituzione italiana (esclusi i transitori)?', 139, 60, 250, 5, 'articoli');
  N(1, 'Quante mogli ebbe Enrico VIII d\'Inghilterra?', 6, 0, 12, 0, 'mogli');
  N(2, 'Quanti anni durò la Guerra dei Cent\'anni?', 116, 50, 200, 5, 'anni');
  N(2, 'Quanti presidenti della Repubblica italiana ci sono stati fino al 2022, Mattarella compreso?', 12, 0, 25, 0, 'presidenti');
  N(2, 'Quante colonie originarie diedero vita agli Stati Uniti?', 13, 0, 30, 0, 'colonie');
  N(1, 'Quanti Paesi fanno parte dell\'Unione europea (dopo l\'uscita del Regno Unito)?', 27, 10, 45, 0, 'Paesi');
  N(2, 'Quanti Paesi fondarono la Comunità economica europea nel 1957?', 6, 0, 15, 0, 'Paesi');
  N(2, 'Quanti anni regnò la regina Vittoria?', 63, 30, 90, 2, 'anni');
  N(3, 'Quanti anni regnò Luigi XIV di Francia?', 72, 30, 90, 3, 'anni');
  N(1, 'Quante bombe atomiche furono sganciate su città giapponesi nel 1945?', 2, 0, 10, 0, 'bombe');
  N(2, 'Quanti anni aveva circa Giovanna d\'Arco quando morì sul rogo?', 19, 10, 40, 1, 'anni');
  N(2, 'Quanti anni rimase in piedi il Muro di Berlino (1961-1989)?', 28, 10, 50, 1, 'anni');
  N(1, 'Quante sono le repubbliche marinare italiane?', 4, 0, 10, 0, 'repubbliche');
  N(1, 'Quante stelle ha la bandiera dell\'Unione europea?', 12, 0, 30, 0, 'stelle');
  N(2, 'Quante tesi pubblicò Lutero nel 1517?', 95, 20, 200, 0, 'tesi');
  N(2, 'Quanti anni durò il Regno d\'Italia (1861-1946)?', 85, 40, 130, 2, 'anni');
  N(2, 'Quanti anni passarono tra la fine della Prima guerra mondiale e l\'inizio della Seconda?', 21, 5, 40, 1, 'anni');
  N(1, 'Quanti anni durò la Seconda guerra mondiale?', 6, 0, 15, 0, 'anni');
  N(2, 'Quante repubbliche formavano l\'Unione Sovietica al momento del suo scioglimento?', 15, 5, 30, 0, 'repubbliche');
  N(2, 'Quanti anni aveva Napoleone quando morì?', 51, 30, 80, 1, 'anni');

  // ---------- Scrivi la risposta ----------
  Y(2, 'Come si chiamava il cavallo di Alessandro Magno?', 'Bucefalo');
  Y(2, 'Chi fu l\'ultimo zar di Russia?', 'Nicola II', ['Nicola Romanov', 'Nikolaj II']);
  Y(1, 'Come si chiamava il re degli Unni detto «flagello di Dio»?', 'Attila');
  Y(2, 'Qual era la capitale dell\'Impero inca?', 'Cusco', ['Cuzco']);
  Y(2, 'Quale famiglia governò Mantova nel Rinascimento?', 'Gonzaga');
  Y(2, 'Quale famiglia di Alessandro VI e Lucrezia dominò Roma nel Rinascimento?', 'Borgia');
  Y(2, 'Chi fu il primo cancelliere della Germania unificata nel 1871?', 'Bismarck', ['Otto von Bismarck']);
  Y(1, 'Chi scrisse il «De bello Gallico»?', 'Giulio Cesare', ['Cesare']);
  Y(2, 'Come si chiamava la prima moglie di Napoleone?', 'Giuseppina', ['Joséphine', 'Josephine', 'Giuseppina di Beauharnais']);
  Y(1, 'Chi era il capo del Partito nazista?', 'Adolf Hitler', ['Hitler']);
  Y(1, 'In quale isola sbarcarono i Mille nel 1860?', 'Sicilia');
  Y(1, 'Quale regina di Francia fu ghigliottinata nel 1793?', 'Maria Antonietta');
  Y(1, 'Qual era la capitale dell\'Impero bizantino?', 'Costantinopoli', ['Bisanzio', 'Istanbul']);
  Y(3, 'Quale popolo, guidato da Genserico, saccheggiò Roma nel 455?', 'Vandali', ['I Vandali']);
  Y(2, 'Come si chiamava la Repubblica fondata da Mazzini e Garibaldi a Roma nel 1849?', 'Repubblica Romana');
  Y(2, 'Come si chiama il periodo di terrore politico durante la Rivoluzione francese, nel 1793-94?', 'Il Terrore', ['Terrore', 'Regime del Terrore']);

  // ---------- Citazioni ----------
  [
    ['Veni, vidi, vici.', 'Giulio Cesare', 1], ['Alea iacta est.', 'Giulio Cesare', 1],
    ['Dalla sommità di queste piramidi, quaranta secoli vi guardano.', 'Napoleone Bonaparte', 2], ['Obbedisco.', 'Giuseppe Garibaldi', 2],
    ['Offro fame, sete, marce forzate, battaglie e morte.', 'Giuseppe Garibaldi', 3], ['Libera Chiesa in libero Stato.', 'Camillo Benso di Cavour', 3],
    ['Proletari di tutti i paesi, unitevi!', 'Karl Marx', 2], ['Ich bin ein Berliner.', 'John F. Kennedy', 2],
    ['Non chiedere cosa può fare il tuo Paese per te, ma cosa puoi fare tu per il tuo Paese.', 'John F. Kennedy', 2], ['Ho un sogno.', 'Martin Luther King', 1],
    ['Sangue, fatica, lacrime e sudore.', 'Winston Churchill', 2], ['Un piccolo passo per l\'uomo, un grande balzo per l\'umanità.', 'Neil Armstrong', 1],
    ['L\'unica cosa di cui dobbiamo aver paura è la paura stessa.', 'Franklin D. Roosevelt', 3], ['Signor Gorbačëv, abbatta questo muro!', 'Ronald Reagan', 3],
  ].forEach(([text, who, d]) => quotes.push({ text, who, d }));

  // ---------- Emoji ----------
  [
    ['🐴🏛️🔥', 'Cavallo di Troia', 1], ['🚢🧊🌊', 'Titanic', 1], ['🧱🇩🇪🔨', 'Caduta del Muro di Berlino', 1], ['🔺🐪☀️', 'Piramidi di Giza', 1],
    ['👸🐍🏺', 'Cleopatra', 1], ['⚔️🏟️🦁', 'Gladiatori', 1], ['⛵🪓🧔', 'Vichinghi', 1], ['🐀☠️🏚️', 'Peste nera', 1],
    ['🌋🏺🏛️', 'Pompei', 1], ['🔴👕⚔️🇮🇹', 'Garibaldi', 2], ['⛵🌍🧭', 'Cristoforo Colombo', 1], ['🇫🇷🗡️👑✂️', 'Rivoluzione francese', 1],
    ['🛡️🔥👩🇫🇷', 'Giovanna d\'Arco', 2], ['🚀🌕👨‍🚀', 'Sbarco sulla Luna', 1], ['🇺🇸🇷🇺❄️☢️', 'Guerra fredda', 1], ['🐺👶👶🏛️', 'Romolo e Remo', 1],
    ['🔭⛪⚖️', 'Galileo Galilei', 2], ['🎩🇫🇷🏝️', 'Napoleone', 1], ['📜✒️👑🇬🇧', 'Magna Carta', 3], ['💣🍄🇯🇵', 'Hiroshima', 1],
    ['🎨🖼️🚁💡', 'Leonardo da Vinci', 1], ['🇨🇺🚀🇺🇸', 'Crisi dei missili di Cuba', 2], ['🚂🏭☁️', 'Rivoluzione industriale', 2], ['🧂🚶🇮🇳', 'Marcia del sale', 3],
  ].forEach(([emoji, answer, d]) => emojis.push({ emoji, answer, d }));

  (D.pop = D.pop || []).push({
    id: 'plusstoria', extends: 'storia',
    quiz, tf, tables, quotes,
    quoteText: 'Chi pronunciò o scrisse questa frase famosa?',
    emojis, emojiText: 'Quale evento o personaggio della storia raccontano queste emoji?',
    order, numbers, typed,
  });
})(typeof window !== 'undefined' ? window : globalThis);
