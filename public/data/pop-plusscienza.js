// Scienza (extends) per Quizzone! — scienziati, unità di misura, strumenti, composti, rocce, vulcani, animali, corpo umano, leggi.
// Solo fatti certi (fino al 2024). Quiz: ['domanda', 'giusta', 'sbagliata1|sbagliata2|sbagliata3', d].
(function (root) {
  'use strict';
  const D = (root.QZ_DATA = root.QZ_DATA || {});
  const Q = (rows) => rows.map(([q, a, w, d]) => ({ q, a, wrong: w.split('|'), d }));
  const T = (rows) => rows.map(([q, a, d, why]) => (why ? { q, a, d, why } : { q, a, d }));
  const quiz = [];
  const tf = [];
  const tables = [];
  const emojis = [];
  const order = [];
  const numbers = [];
  const typed = [];
  const quotes = [];
  // ---------- TABELLA: scienziati ----------
  {
    // [nome, paese di nascita, anno di nascita, scoperta/invenzione, d]
    const rows = [
      ['Galileo Galilei', 'Italia', 1564, 'Le quattro lune maggiori di Giove', 1],
      ['Alessandro Volta', 'Italia', 1745, 'La pila elettrica', 1],
      ['Enrico Fermi', 'Italia', 1901, 'Il primo reattore nucleare a fissione', 2],
      ['Evangelista Torricelli', 'Italia', 1608, 'Il barometro a mercurio', 2],
      ['Guglielmo Marconi', 'Italia', 1874, 'La telegrafia senza fili', 1],
      ['Luigi Galvani', 'Italia', 1737, 'L\'elettricità animale (esperimenti sulle rane)', 2],
      ['Amedeo Avogadro', 'Italia', 1776, 'La legge sul volume dei gas e il numero che porta il suo nome', 3],
      ['Camillo Golgi', 'Italia', 1843, 'L\'apparato che porta il suo nome nelle cellule', 3],
      ['Rita Levi-Montalcini', 'Italia', 1909, 'Il fattore di crescita nervoso (NGF)', 2],
      ['Francesco Redi', 'Italia', 1626, 'L\'esperimento contro la generazione spontanea (carne e mosche)', 3],
      ['Giovanni Schiaparelli', 'Italia', 1835, 'I «canali» di Marte', 3],
      ['Giulio Natta', 'Italia', 1903, 'Il polipropilene isotattico', 3],
      ['Emilio Segrè', 'Italia', 1905, 'L\'antiprotone', 3],
      ['Carlo Rubbia', 'Italia', 1934, 'I bosoni W e Z', 3],
      ['Isaac Newton', 'Inghilterra', 1643, 'La legge di gravitazione universale', 1],
      ['Albert Einstein', 'Germania', 1879, 'La teoria della relatività', 1],
      ['Charles Darwin', 'Inghilterra', 1809, 'L\'evoluzione per selezione naturale', 1],
      ['Gregor Mendel', null, 1822, 'Le leggi dell\'ereditarietà', 1],
      ['Louis Pasteur', 'Francia', 1822, 'Il vaccino antirabbico e la pastorizzazione', 1],
      ['Marie Curie', 'Polonia', 1867, 'Il polonio e il radio', 1],
      ['Alexander Fleming', 'Scozia', 1881, 'La penicillina', 1],
      ['Edward Jenner', 'Inghilterra', 1749, 'Il primo vaccino (contro il vaiolo)', 2],
      ['Robert Koch', 'Germania', 1843, 'Il bacillo della tubercolosi', 3],
      ['Wilhelm Röntgen', 'Germania', 1845, 'I raggi X', 2],
      ['Henri Becquerel', 'Francia', 1852, 'La radioattività naturale', 3],
      ['Max Planck', 'Germania', 1858, 'I quanti di energia', 2],
      ['Niels Bohr', 'Danimarca', 1885, 'Il modello atomico a livelli di energia', 2],
      ['Ernest Rutherford', 'Nuova Zelanda', 1871, 'Il nucleo dell\'atomo', 2],
      ['J. J. Thomson', 'Inghilterra', 1856, 'L\'elettrone', 3],
      ['James Chadwick', 'Inghilterra', 1891, 'Il neutrone', 3],
      ['Werner Heisenberg', 'Germania', 1901, 'Il principio di indeterminazione', 2],
      ['Erwin Schrödinger', 'Austria', 1887, 'L\'equazione d\'onda della meccanica quantistica', 3],
      ['Edwin Hubble', 'Stati Uniti', 1889, 'L\'espansione dell\'universo', 2],
      ['Giovanni Keplero', 'Germania', 1571, 'Le leggi del moto dei pianeti', 2],
      ['Niccolò Copernico', 'Polonia', 1473, 'Il sistema eliocentrico', 1],
      ['Robert Hooke', 'Inghilterra', 1635, 'Il termine «cellula» (osservando il sughero)', 3],
      ['Antonie van Leeuwenhoek', 'Paesi Bassi', 1632, 'I microrganismi osservati al microscopio', 3],
      ['Carlo Linneo', 'Svezia', 1707, 'La classificazione binomia degli esseri viventi', 2],
      ['Antoine Lavoisier', 'Francia', 1743, 'La conservazione della massa nelle reazioni chimiche', 2],
      ['Dmitrij Mendeleev', 'Russia', 1834, 'La tavola periodica degli elementi', 1],
      ['John Dalton', 'Inghilterra', 1766, 'La teoria atomica moderna', 3],
      ['Robert Boyle', 'Irlanda', 1627, 'La relazione tra pressione e volume di un gas', 3],
      ['Michael Faraday', 'Inghilterra', 1791, 'L\'induzione elettromagnetica', 2],
      ['James Clerk Maxwell', 'Scozia', 1831, 'Le equazioni dell\'elettromagnetismo', 3],
      ['Georg Ohm', 'Germania', 1789, 'La legge sulla resistenza elettrica', 2],
      ['Heinrich Hertz', 'Germania', 1857, 'Le onde elettromagnetiche', 3],
      ['James Prescott Joule', 'Inghilterra', 1818, 'L\'equivalenza tra lavoro meccanico e calore', 3],
      ['James Watt', 'Scozia', 1736, 'Il perfezionamento della macchina a vapore', 2],
      ['Anders Celsius', 'Svezia', 1701, 'La scala di temperatura centigrada', 2],
      ['Ivan Pavlov', 'Russia', 1849, 'Il riflesso condizionato', 2],
      ['Alfred Wegener', 'Germania', 1880, 'La deriva dei continenti', 2],
      ['Stephen Hawking', 'Inghilterra', 1942, 'La radiazione emessa dai buchi neri', 2],
      ['Alfred Nobel', 'Svezia', 1833, 'La dinamite', 2],
      ['Alan Turing', 'Inghilterra', 1912, 'La macchina di Turing', 2],
      ['Hans Christian Ørsted', 'Danimarca', 1777, 'Il legame tra elettricità e magnetismo', 3],
      ['André-Marie Ampère', 'Francia', 1775, 'L\'elettrodinamica', 3],
      ['Charles-Augustin de Coulomb', 'Francia', 1736, 'La legge sulla forza tra cariche elettriche', 3],
      ['Blaise Pascal', 'Francia', 1623, 'Il principio sulla pressione nei fluidi', 2],
      ['Christian Doppler', 'Austria', 1803, 'L\'effetto sulla frequenza di un\'onda in movimento', 3],
      ['Lise Meitner', 'Austria', 1878, 'La spiegazione teorica della fissione nucleare', 3],
      ['Paul Dirac', 'Inghilterra', 1902, 'La previsione dell\'antimateria', 3],
      ['Christiaan Huygens', 'Paesi Bassi', 1629, 'Titano, la luna di Saturno', 3],
      ['Thomas Edison', 'Stati Uniti', 1847, 'La lampadina a incandescenza commerciale', 1],
      ['Samuel Morse', 'Stati Uniti', 1791, 'Il telegrafo elettrico e il suo alfabeto', 2],
      ['Richard Feynman', 'Stati Uniti', 1918, 'I diagrammi che portano il suo nome', 3],
      ['Robert Oppenheimer', 'Stati Uniti', 1904, 'La direzione scientifica del Progetto Manhattan', 2],
      ['Nikola Tesla', null, 1856, 'Il motore a induzione a corrente alternata', 2],
      ['Rosalind Franklin', 'Inghilterra', 1920, 'La «Fotografia 51» del DNA ai raggi X', 3],
      ['Lord Kelvin', null, 1824, 'La scala assoluta delle temperature', 3],
    ];
    const items = rows.map(([name, paese, nascita, scoperta, d]) => {
      const o = { name, d, nascita, scoperta };
      if (paese) o.paese = paese;
      return o;
    });
    tables.push({
      id: 'scienziati',
      items,
      fields: {
        paese: {
          ask: 'Qual è il paese di nascita di {name}?',
          who: 'Quale di questi scienziati ha come paese di nascita {value}?',
          tf: 'Paese di nascita di {name}: {value}.',
          odd: 'Trova l\'intruso: quale di questi scienziati NON è nato in {value}?',
        },
        scoperta: {
          ask: 'Per quale scoperta o invenzione è famoso {name}?',
          who: 'Chi è famoso per: {value}?',
          tf: '{name} è famoso per: {value}.',
        },
      },
      numeric: {
        nascita: {
          ask: 'In che anno è nato {name}?',
          span: 120, tol: 5, format: 'year', step: 1,
          duel: 'Chi è nato prima?', lowerWins: true,
          order: 'Metti in ordine di nascita, dal primo a nascere', gap: 12,
        },
      },
    });
  }
  // ---------- TABELLA: unità di misura ----------
  {
    // [unità, simbolo, grandezza, d]
    const rows = [
      ['coulomb', 'C', 'Carica elettrica', 3],
      ['volt', 'V', 'Tensione elettrica', 1],
      ['farad', 'F', 'Capacità elettrica', 3],
      ['henry', 'H', 'Induttanza', 3],
      ['tesla', 'T', 'Induzione magnetica', 3],
      ['becquerel', 'Bq', 'Attività di una sorgente radioattiva', 3],
      ['gray', 'Gy', 'Dose di radiazioni assorbita', 3],
      ['candela', 'cd', 'Intensità luminosa', 3],
      ['mole', 'mol', 'Quantità di sostanza', 2],
      ['chilogrammo', 'kg', 'Massa', 1],
      ['metro', 'm', 'Lunghezza', 1],
      ['secondo', 's', 'Tempo', 1],
      ['kelvin', 'K', 'Temperatura termodinamica', 2],
      ['lux', 'lx', 'Illuminamento', 3],
      ['lumen', 'lm', 'Flusso luminoso', 3],
      ['siemens', null, 'Conduttanza elettrica', 3],
      ['radiante', 'rad', 'Angolo piano', 2],
      ['ampere', 'A'], ['ohm', 'Ω'], ['watt', 'W'], ['hertz', 'Hz'], ['newton', 'N'], ['joule', 'J'], ['pascal', 'Pa'],
      ['decibel', 'dB'], ['caloria', 'cal'], ['bar', 'bar'], ['grammo', 'g'], ['minuto', 'min'],
    ];
    const items = rows.map(([name, simbolo, grandezza, d]) => {
      const o = { name, d: d || 1 };
      if (simbolo) o.simbolo = simbolo;
      if (grandezza) o.grandezza = grandezza;
      return o;
    });
    tables.push({
      id: 'unita',
      items,
      fields: {
        grandezza: {
          ask: 'Quale grandezza si misura in {name} (unità del Sistema Internazionale)?',
          who: 'Quale unità del Sistema Internazionale misura la grandezza «{value}»?',
          tf: 'L\'unità «{name}» misura questa grandezza: {value}.',
        },
        simbolo: {
          ask: 'Qual è il simbolo dell\'unità di misura «{name}»?',
          tf: 'Il simbolo dell\'unità «{name}» è «{value}».',
        },
      },
    });
  }
  // ---------- TABELLA: strumenti di misura ----------
  tables.push({
    id: 'strumenti',
    items: [
      ['Dinamometro', 'La forza', 2], ['Voltmetro', 'La tensione elettrica', 2], ['Amperometro', 'L\'intensità della corrente elettrica', 2],
      ['Ohmmetro', 'La resistenza elettrica', 3], ['Termometro', 'La temperatura', 1], ['Cronometro', 'Il tempo', 1],
      ['Pluviometro', 'La quantità di pioggia caduta', 2], ['Altimetro', 'L\'altitudine', 2], ['Tachimetro', 'La velocità di un veicolo', 1],
      ['Contatore Geiger', 'La radioattività', 2], ['Sfigmomanometro', 'La pressione arteriosa', 2], ['Areometro', 'La densità dei liquidi', 3],
      ['Goniometro', 'L\'ampiezza degli angoli', 1], ['pH-metro', 'L\'acidità di una soluzione', 2], ['Fonometro', 'Il livello del rumore', 3],
      ['Luxmetro', 'L\'illuminamento', 3], ['Spirometro', 'La capacità respiratoria dei polmoni', 3],
      ['Elettrocardiografo', 'L\'attività elettrica del cuore', 2], ['Elettroencefalografo', 'L\'attività elettrica del cervello', 3],
      ['Bussola', 'La direzione del nord magnetico', 1], ['Odometro', 'La distanza percorsa da un veicolo', 2],
      ['Calorimetro', 'Il calore scambiato in un processo', 3], ['Cilindro graduato', 'Il volume dei liquidi', 2], ['Pedometro', 'Il numero dei passi', 1],
      ['Cardiofrequenzimetro', 'La frequenza dei battiti del cuore', 2],
    ].map(([name, misura, d]) => ({ name, misura, d })),
    fields: {
      misura: {
        ask: 'Che cosa misura lo strumento chiamato «{name}»?',
        who: 'Quale strumento serve a misurare questo: {value}?',
        tf: 'Lo strumento «{name}» misura questo: {value}.',
      },
    },
  });

  // ---------- TABELLA: composti chimici ----------
  {
    // [nome, formula, stato a temperatura ambiente, nome comune, d]
    const rows = [
      ['Ossigeno (molecola)', 'O₂', 'Gas', null, 1],
      ['Azoto (molecola)', 'N₂', 'Gas', null, 2],
      ['Idrogeno (molecola)', 'H₂', 'Gas', null, 1],
      ['Ozono', 'O₃', 'Gas', null, 2],
      ['Cloro (molecola)', 'Cl₂', 'Gas', null, 3],
      ['Acido cloridrico', 'HCl', null, 'Acido muriatico', 2],
      ['Acido solforico', 'H₂SO₄', 'Liquido', null, 2],
      ['Acido nitrico', 'HNO₃', 'Liquido', null, 3],
      ['Idrossido di sodio', 'NaOH', 'Solido', 'Soda caustica', 2],
      ['Glucosio', 'C₆H₁₂O₆', 'Solido', null, 2],
      ['Etanolo', 'C₂H₅OH', 'Liquido', null, 2],
      ['Monossido di carbonio', 'CO', 'Gas', null, 2],
      ['Perossido di idrogeno', 'H₂O₂', 'Liquido', 'Acqua ossigenata', 2],
      ['Carbonato di calcio', 'CaCO₃', 'Solido', 'Calcare', 2],
      ['Bicarbonato di sodio', 'NaHCO₃', 'Solido', 'Bicarbonato', 1],
      ['Biossido di silicio', 'SiO₂', 'Solido', 'Silice', 3],
      ['Ossido di ferro (III)', 'Fe₂O₃', 'Solido', null, 3],
      ['Propano', 'C₃H₈', null, null, 2],
      ['Butano', 'C₄H₁₀', null, null, 2],
      ['Etano', 'C₂H₆', 'Gas', null, 3],
      ['Acetilene', 'C₂H₂', 'Gas', null, 3],
      ['Etilene', 'C₂H₄', 'Gas', null, 3],
      ['Cloruro di potassio', 'KCl', 'Solido', null, 3],
      ['Solfato di rame', 'CuSO₄', 'Solido', null, 3],
      ['Nitrato d\'argento', 'AgNO₃', 'Solido', null, 3],
      ['Ossido di calcio', 'CaO', 'Solido', 'Calce viva', 3],
      ['Idrossido di calcio', 'Ca(OH)₂', 'Solido', 'Calce spenta', 3],
      ['Acido acetico', 'CH₃COOH', null, null, 2],
      ['Biossido di zolfo', 'SO₂', 'Gas', null, 3],
      ['Biossido di azoto', 'NO₂', null, null, 3],
      ['Protossido di azoto', 'N₂O', 'Gas', 'Gas esilarante', 3],
      ['Acido fosforico', 'H₃PO₄', null, null, 3],
      ['Idrossido di potassio', 'KOH', 'Solido', null, 3],
      ['Ossido di magnesio', 'MgO', 'Solido', null, 3],
      ['Cloruro di calcio', 'CaCl₂', 'Solido', null, 3],
      ['Acido solfidrico', 'H₂S', 'Gas', null, 3],
      ['Saccarosio', 'C₁₂H₂₂O₁₁', 'Solido', 'Zucchero da cucina', 2],
      ['Urea', 'CO(NH₂)₂', 'Solido', null, 3],
      ['Benzene', 'C₆H₆', 'Liquido', null, 3],
      ['Metanolo', 'CH₃OH', 'Liquido', null, 3],
      ['Acetone', 'C₃H₆O', 'Liquido', null, 3],
      ['Cloroformio', 'CHCl₃', 'Liquido', null, 3],
      ['Ossido di alluminio', 'Al₂O₃', 'Solido', null, 3],
      ['Carbonato di sodio', 'Na₂CO₃', 'Solido', null, 3],
      ['Ipoclorito di sodio', 'NaClO', null, 'Candeggina', 2],
      ['Nitrato di potassio', 'KNO₃', 'Solido', 'Salnitro', 3],
      ['Anidride carbonica', null, 'Gas', null, 1],
      ['Metano', null, 'Gas', null, 1],
            ['Cloruro di sodio', null, 'Solido', null, 1],
      ['Acqua', null, 'Liquido', null, 1],
    ];
    tables.push({
      id: 'composti',
      items: rows.map(([name, formula, stato, comune, d]) => {
        const o = { name, d };
        if (formula) o.formula = formula;
        if (stato) o.stato = stato;
        if (comune) o.comune = comune;
        return o;
      }),
      fields: {
        formula: {
          ask: 'Qual è la formula chimica di questa sostanza: {name}?',
          who: 'Quale sostanza ha formula chimica {value}?',
          tf: 'La formula chimica di «{name}» è {value}.',
        },
        stato: {
          ask: 'In quale stato fisico si trova «{name}» a temperatura ambiente (circa 20 °C)?',
          tf: 'A temperatura ambiente «{name}» si trova nello stato: {value}.',
          odd: 'Trova l\'intruso: quale di queste sostanze NON è allo stato «{value}» a temperatura ambiente?',
        },
        comune: {
          ask: 'Con quale nome comune è conosciuto «{name}»?',
          tf: 'Il nome comune di «{name}» è «{value}».',
          who: 'Quale sostanza è comunemente chiamata «{value}»?',
        },
      },
    });
  }
  // ---------- TABELLA: rocce ----------
  tables.push({
    id: 'rocce',
    items: [
      ['Granito', 'Magmatica', 1], ['Basalto', 'Magmatica', 2], ['Pomice', 'Magmatica', 2], ['Ossidiana', 'Magmatica', 3],
      ['Gabbro', 'Magmatica', 3], ['Porfido', 'Magmatica', 3], ['Diorite', 'Magmatica', 3],
      ['Calcare', 'Sedimentaria', 1], ['Arenaria', 'Sedimentaria', 2], ['Dolomia', 'Sedimentaria', 2], ['Conglomerato', 'Sedimentaria', 3],
      ['Salgemma', 'Sedimentaria', 3], ['Travertino', 'Sedimentaria', 2], ['Carbone fossile', 'Sedimentaria', 2], ['Selce', 'Sedimentaria', 3], ['Marna', 'Sedimentaria', 3],
      ['Marmo', 'Metamorfica', 1], ['Ardesia', 'Metamorfica', 2], ['Gneiss', 'Metamorfica', 2], ['Quarzite', 'Metamorfica', 3],
      ['Micascisto', 'Metamorfica', 3], ['Serpentinite', 'Metamorfica', 3], ['Anfibolite', 'Metamorfica', 3],
    ].map(([name, tipo, d]) => ({ name, tipo, d })),
    fields: {
      tipo: {
        ask: 'A quale tipo appartiene la roccia «{name}»?',
        who: 'Quale di queste rocce è di tipo {value}?',
        tf: 'La roccia «{name}» è di tipo {value}.',
        odd: 'Trova l\'intruso: quale di queste rocce NON è di tipo {value}?',
      },
    },
  });

  // ---------- TABELLA: scala di Mohs ----------
  tables.push({
    id: 'mohs',
    items: [
      { name: 'Talco', durezza: 1, d: 2 }, { name: 'Gesso', durezza: 2, d: 2 }, { name: 'Calcite', durezza: 3, d: 3 },
      { name: 'Fluorite', durezza: 4, d: 3 }, { name: 'Apatite', durezza: 5, d: 3 }, { name: 'Ortoclasio', durezza: 6, d: 3 },
      { name: 'Quarzo', durezza: 7, d: 2 }, { name: 'Topazio', durezza: 8, d: 3 }, { name: 'Corindone', durezza: 9, d: 3 },
      { name: 'Diamante', durezza: 10, d: 1 },
    ],
    numeric: {
      durezza: {
        ask: 'Quale valore ha il minerale «{name}» nella scala di Mohs?',
        span: 10, tol: 0, format: 'number', unit: '', step: 1,
        duel: 'Quale dei due minerali è più tenero (meno duro)?', lowerWins: true,
        order: 'Metti in ordine di durezza, dal più tenero al più duro', gap: 1,
      },
    },
  });

  // ---------- TABELLA: vulcani ----------
  {
    // [nome, paese, altezza in m (o null), d]
    const rows = [
      ['Etna', 'Italia', null, 1], ['Vesuvio', 'Italia', 1281, 1], ['Stromboli', 'Italia', 924, 1], ['Vulcano (Isole Eolie)', 'Italia', null, 2],
      ['Campi Flegrei', 'Italia', null, 2],
      ['Fuji', 'Giappone', 3776, 1], ['Sakurajima', 'Giappone', 1117, 3],
      ['Krakatoa', 'Indonesia', null, 2], ['Tambora', 'Indonesia', 2850, 3], ['Merapi', 'Indonesia', null, 3],
      ['Pinatubo', 'Filippine', 1486, 2], ['Mayon', 'Filippine', 2462, 3], ['Taal', 'Filippine', null, 3],
      ['Popocatépetl', 'Messico', 5426, 2], ['Colima', 'Messico', null, 3],
      ['Kilauea', 'Stati Uniti', 1247, 2], ['Mauna Loa', 'Stati Uniti', 4169, 2], ['Monte Sant\'Elena', 'Stati Uniti', 2549, 2], ['Yellowstone', 'Stati Uniti', null, 2],
      ['Eyjafjallajökull', 'Islanda', 1651, 2], ['Hekla', 'Islanda', 1491, 3], ['Katla', 'Islanda', null, 3],
      ['Teide', 'Spagna', 3715, 2], ['Cotopaxi', 'Ecuador', 5897, 3], ['Villarrica', 'Cile', 2847, 3],
      ['Nyiragongo', 'Repubblica Democratica del Congo', 3470, 3], ['Ol Doinyo Lengai', 'Tanzania', null, 3],
      ['Santorini', 'Grecia', null, 2], ['Ruapehu', 'Nuova Zelanda', 2797, 3], ['Nevado del Ruiz', 'Colombia', 5321, 3],
      ['Fuego', 'Guatemala', 3763, 3], ['Kilimangiaro', 'Tanzania', 5895, 2],
    ];
    tables.push({
      id: 'vulcani',
      items: rows.map(([name, paese, altezza, d]) => {
        const o = { name, paese, d };
        if (altezza) o.altezza = altezza;
        return o;
      }),
      fields: {
        paese: {
          ask: 'In quale paese si trova il vulcano {name}?',
          who: 'Quale di questi vulcani si trova in questo paese: {value}?',
          tf: 'Il vulcano {name} si trova in questo paese: {value}.',
          odd: 'Trova l\'intruso: quale di questi vulcani NON si trova in questo paese: {value}?',
        },
      },
      numeric: {
        altezza: {
          ask: 'Quanto è alto, circa, il vulcano {name}?',
          span: 6000, tol: 300, format: 'number', unit: 'm', step: 50,
          duel: 'Quale dei due vulcani è più alto?', lowerWins: false,
          order: 'Metti in ordine di altezza, dal più alto al più basso', gap: 400,
        },
      },
    });
  }

  // ---------- TABELLA: animali e classificazione ----------
  tables.push({
    id: 'animali',
    items: [
      ['Delfino', 'Mammiferi', 1], ['Balena', 'Mammiferi', 1], ['Pipistrello', 'Mammiferi', 1], ['Ornitorinco', 'Mammiferi', 2],
      ['Canguro', 'Mammiferi', 1], ['Foca', 'Mammiferi', 1], ['Pinguino', 'Uccelli', 1], ['Struzzo', 'Uccelli', 1], ['Kiwi', 'Uccelli', 2],
      ['Gufo', 'Uccelli', 1], ['Colibrì', 'Uccelli', 2], ['Coccodrillo', 'Rettili', 1], ['Tartaruga', 'Rettili', 1], ['Camaleonte', 'Rettili', 1],
      ['Geco', 'Rettili', 2], ['Iguana', 'Rettili', 2], ['Rana', 'Anfibi', 1], ['Rospo', 'Anfibi', 1], ['Salamandra', 'Anfibi', 1], ['Tritone', 'Anfibi', 2],
      ['Squalo', 'Pesci', 1], ['Tonno', 'Pesci', 1], ['Cavalluccio marino', 'Pesci', 2], ['Anguilla', 'Pesci', 2], ['Razza', 'Pesci', 3], ['Salmone', 'Pesci', 1],
      ['Farfalla', 'Insetti', 1], ['Ape', 'Insetti', 1], ['Formica', 'Insetti', 1], ['Coccinella', 'Insetti', 1], ['Libellula', 'Insetti', 2],
      ['Cavalletta', 'Insetti', 2], ['Zanzara', 'Insetti', 1], ['Scarabeo', 'Insetti', 2],
      ['Ragno', 'Aracnidi', 1], ['Scorpione', 'Aracnidi', 1], ['Zecca', 'Aracnidi', 2],
      ['Granchio', 'Crostacei', 1], ['Aragosta', 'Crostacei', 1], ['Gambero', 'Crostacei', 1],
      ['Polpo', 'Molluschi', 1], ['Calamaro', 'Molluschi', 1], ['Seppia', 'Molluschi', 2], ['Lumaca', 'Molluschi', 1], ['Cozza', 'Molluschi', 2], ['Ostrica', 'Molluschi', 2],
    ].map(([name, classe, d]) => ({ name, classe, d })),
    fields: {
      classe: {
        ask: 'A quale gruppo di animali appartiene «{name}»?',
        who: 'Quale di questi animali appartiene al gruppo «{value}»?',
        tf: '«{name}» appartiene al gruppo di animali «{value}».',
        odd: 'Trova l\'intruso: quale di questi animali NON appartiene al gruppo «{value}»?',
      },
    },
  });

  // ---------- TABELLA: organi del corpo ----------
  tables.push({
    id: 'organi',
    items: [
      ['Cuore', 'Apparato circolatorio', 1], ['Aorta', 'Apparato circolatorio', 2], ['Vena cava', 'Apparato circolatorio', 3], ['Capillari', 'Apparato circolatorio', 3],
      ['Polmoni', 'Apparato respiratorio', 1], ['Trachea', 'Apparato respiratorio', 2], ['Bronchi', 'Apparato respiratorio', 2], ['Laringe', 'Apparato respiratorio', 3], ['Alveoli', 'Apparato respiratorio', 3],
      ['Stomaco', 'Apparato digerente', 1], ['Esofago', 'Apparato digerente', 2], ['Intestino tenue', 'Apparato digerente', 2], ['Fegato', 'Apparato digerente', 2], ['Colon', 'Apparato digerente', 3],
      ['Reni', 'Apparato urinario', 2], ['Vescica', 'Apparato urinario', 2], ['Uretere', 'Apparato urinario', 3],
      ['Cervello', 'Sistema nervoso', 1], ['Midollo spinale', 'Sistema nervoso', 2], ['Nervo sciatico', 'Sistema nervoso', 3], ['Cervelletto', 'Sistema nervoso', 3],
      ['Femore', 'Sistema scheletrico', 1], ['Cranio', 'Sistema scheletrico', 1], ['Costole', 'Sistema scheletrico', 1], ['Sterno', 'Sistema scheletrico', 3], ['Tibia', 'Sistema scheletrico', 2],
      ['Bicipite', 'Sistema muscolare', 1], ['Quadricipite', 'Sistema muscolare', 3], ['Gluteo', 'Sistema muscolare', 2],
      ['Tiroide', 'Sistema endocrino', 2], ['Ipofisi', 'Sistema endocrino', 3], ['Ghiandole surrenali', 'Sistema endocrino', 3],
    ].map(([name, sistema, d]) => ({ name, sistema, d })),
    fields: {
      sistema: {
        ask: 'A quale apparato o sistema del corpo umano appartiene «{name}»?',
        who: 'Quale di questi organi fa parte del seguente apparato o sistema: {value}?',
        tf: '«{name}» fa parte di questo apparato o sistema: {value}.',
        odd: 'Trova l\'intruso: quale NON fa parte del seguente apparato o sistema: {value}?',
      },
    },
  });
  // ---------- TABELLA: leggi, principi e teorie ----------
  tables.push({
    id: 'leggi',
    items: [
      ['Il principio di inerzia (primo principio della dinamica)', 'Isaac Newton', 1], ['La legge F = m · a (secondo principio della dinamica)', 'Isaac Newton', 2],
      ['Il principio di azione e reazione', 'Isaac Newton', 2], ['La legge di gravitazione universale', 'Isaac Newton', 1],
      ['La legge sull\'allungamento delle molle', 'Robert Hooke', 3], ['La legge su pressione e volume dei gas a temperatura costante', 'Robert Boyle', 3],
      ['La legge che lega tensione, corrente e resistenza', 'Georg Ohm', 1], ['La legge sulla forza tra due cariche elettriche', 'Charles-Augustin de Coulomb', 3],
      ['Il principio sul galleggiamento dei corpi', 'Archimede', 1], ['Il principio sulla trasmissione della pressione nei fluidi', 'Blaise Pascal', 2],
      ['La legge sul numero di molecole contenute in volumi uguali di gas', 'Amedeo Avogadro', 3], ['La legge sull\'allontanamento delle galassie', 'Edwin Hubble', 3],
      ['Il principio di indeterminazione', 'Werner Heisenberg', 2], ['Il principio che vieta a due elettroni di avere gli stessi numeri quantici', 'Wolfgang Pauli', 3],
      ['L\'equazione E = mc²', 'Albert Einstein', 1], ['L\'effetto fotoelettrico spiegato con i quanti di luce', 'Albert Einstein', 3],
      ['La legge sul calore prodotto da una corrente elettrica in un conduttore', 'James Prescott Joule', 3], ['L\'effetto sulla frequenza delle onde dovuto al moto della sorgente', 'Christian Doppler', 2],
      ['La legge sulla rifrazione della luce', 'Willebrord Snell', 3], ['Il principio sui fluidi in movimento che spiega la portanza', 'Daniel Bernoulli', 3],
      ['L\'ipotesi dei quanti di energia', 'Max Planck', 3],
    ].map(([name, chi, d]) => ({ name, chi, d })),
    fields: {
      chi: {
        ask: 'Chi ha formulato questa legge o teoria? {name}',
        who: 'Quale di queste leggi o teorie è dovuta a {value}?',
        tf: 'Questa legge o teoria è di {value}: {name}.',
        typed: 'person',
      },
    },
  });

  // ---------- TABELLA: eventi e date ----------
  tables.push({
    id: 'eventi',
    items: [
      ['La scoperta dei raggi X', 1895, 2], ['La scoperta della radioattività', 1896, 3], ['La scoperta dell\'elettrone', 1897, 3],
      ['La scoperta del neutrone', 1932, 3], ['La scoperta della fissione nucleare', 1938, 3], ['Il primo reattore nucleare (Chicago)', 1942, 3],
      ['La teoria della relatività generale di Einstein', 1915, 2], ['I quanti di energia di Planck', 1900, 3],
      ['Le leggi di Mendel sull\'ereditarietà', 1866, 3], ['La tavola periodica di Mendeleev', 1869, 2], ['La deriva dei continenti di Wegener', 1912, 3],
      ['Il «De revolutionibus» di Copernico', 1543, 2], ['La lampadina di Edison', 1879, 2], ['Il primo vaccino di Jenner', 1796, 2],
      ['Il vaccino antipolio di Salk', 1955, 3], ['L\'isolamento dell\'insulina', 1921, 3], ['Il primo trapianto di cuore', 1967, 2],
      ['La nascita della pecora Dolly', 1996, 2], ['La scoperta del bosone di Higgs', 2012, 2], ['Il primo premio Nobel assegnato', 1901, 2],
      ['La messa in funzione del grande acceleratore LHC al CERN', 2008, 3], ['L\'eruzione del Vesuvio che distrusse Pompei', 79, 1],
      ['L\'eruzione del Tambora', 1815, 3], ['L\'eruzione del Krakatoa', 1883, 2], ['L\'eruzione del Monte Sant\'Elena', 1980, 3],
      ['L\'eruzione del Pinatubo', 1991, 3], ['L\'eruzione del vulcano Eyjafjallajökull', 2010, 2],
      ['Il terremoto di Lisbona', 1755, 3], ['Il terremoto di San Francisco', 1906, 2], ['Il terremoto di Messina e Reggio Calabria', 1908, 2],
      ['Il terremoto del Friuli', 1976, 2], ['Il terremoto dell\'Irpinia', 1980, 2], ['Il terremoto dell\'Aquila', 2009, 1],
      ['Il terremoto dell\'Emilia', 2012, 2], ['Il terremoto di Amatrice', 2016, 2], ['Il terremoto e lo tsunami del Tōhoku in Giappone', 2011, 2],
      ['Lo tsunami dell\'Oceano Indiano', 2004, 1], ['Il disastro nucleare di Černobyl\'', 1986, 1], ['Il disastro del Vajont', 1963, 2],
    ].map(([name, anno, d]) => ({ name, anno, d })),
    numeric: {
      anno: {
        ask: 'In che anno è avvenuto questo fatto: «{name}»?',
        span: 80, tol: 2, format: 'year', step: 1,
        duel: 'Quale dei due fatti è avvenuto prima?', lowerWins: true,
        order: 'Metti in ordine cronologico, dal più antico', gap: 8,
      },
    },
  });
  // ---------- QUIZ: scienziati e scoperte ----------
  quiz.push(...Q([
    ["Chi scoprì i raggi X nel 1895?", "Wilhelm Röntgen", "Henri Becquerel|Marie Curie|Max Planck", 2],
    ["Chi scoprì la radioattività nel 1896?", "Henri Becquerel", "Wilhelm Röntgen|Ernest Rutherford|Niels Bohr", 3],
    ["Quale studioso propose nel 1543 che la Terra giri attorno al Sole?", "Niccolò Copernico", "Galileo Galilei|Giovanni Keplero|Tolomeo", 1],
    ["Chi dimostrò, con un esperimento su carne e mosche, che la vita non nasce da generazione spontanea?", "Francesco Redi", "Antonie van Leeuwenhoek|Robert Koch|Jean-Baptiste Lamarck", 3],
    ["Quale scienziato italiano ricevette il Nobel per la fisica nel 1909 per la telegrafia senza fili?", "Guglielmo Marconi", "Enrico Fermi|Alessandro Volta|Carlo Rubbia", 1],
    ["Per quale scoperta Albert Einstein ricevette il premio Nobel per la fisica?", "La legge dell'effetto fotoelettrico", "La teoria della relatività generale|L'equivalenza tra massa ed energia|Il moto browniano", 2],
    ["Quale scienziata scoprì il polonio e il radio insieme al marito Pierre?", "Marie Curie", "Lise Meitner|Rosalind Franklin|Rita Levi-Montalcini", 1],
    ["Rita Levi-Montalcini ottenne il Nobel per la medicina nel 1986 grazie alla scoperta del…", "Fattore di crescita nervoso", "DNA ricombinante|Vaccino antipolio|Gruppo sanguigno Rh", 2],
    ["Quale scienziata ottenne la «Fotografia 51», decisiva per capire la struttura del DNA?", "Rosalind Franklin", "Marie Curie|Barbara McClintock|Lise Meitner", 3],
    ["Chi scoprì il neutrone nel 1932?", "James Chadwick", "Ernest Rutherford|Niels Bohr|J. J. Thomson", 3],
    ["Chi scoprì l'elettrone nel 1897?", "J. J. Thomson", "Ernest Rutherford|Niels Bohr|James Chadwick", 3],
    ["Quale scienziato propose un modello dell'atomo con un piccolo nucleo centrale carico positivamente?", "Ernest Rutherford", "John Dalton|J. J. Thomson|Democrito", 3],
    ["Chi sviluppò il vaccino contro la rabbia nel 1885?", "Louis Pasteur", "Robert Koch|Edward Jenner|Alexander Fleming", 2],
    ["Chi per primo osservò i batteri al microscopio, chiamandoli «animalcula»?", "Antonie van Leeuwenhoek", "Robert Hooke|Louis Pasteur|Carlo Linneo", 3],
    ["Chi introdusse il termine «cellula» osservando una fetta di sughero?", "Robert Hooke", "Charles Darwin|Gregor Mendel|Louis Pasteur", 3],
    ["Chi propose la classificazione degli esseri viventi con nomi di genere e specie?", "Carlo Linneo", "Charles Darwin|Aristotele|Gregor Mendel", 2],
    ["Da quale mineralogo prende il nome la scala che misura la durezza dei minerali?", "Friedrich Mohs", "Charles Richter|Giuseppe Mercalli|Anders Celsius", 2],
    ["Da quale scienziato italiano prende il nome una scala che misura l'intensità dei terremoti in base ai danni?", "Giuseppe Mercalli", "Charles Richter|Francis Beaufort|Anders Celsius", 2],
    ["Da quale scienziato svedese prende il nome la scala di temperatura centigrada?", "Anders Celsius", "Daniel Fahrenheit|Lord Kelvin|Giuseppe Mercalli", 2],
    ["Da quale scienziato prende il nome l'unità di temperatura assoluta, il kelvin?", "William Thomson (Lord Kelvin)", "Anders Celsius|Daniel Fahrenheit|James Joule", 3],
    ["Con quale pianta Gregor Mendel condusse i suoi celebri esperimenti sull'ereditarietà?", "Il pisello", "Il mais|Il fagiolo|Il girasole", 1],
    ["Su quale nave viaggiò Charles Darwin durante il suo celebre viaggio di esplorazione?", "HMS Beagle", "HMS Victory|Endeavour|Mayflower", 2],
    ["Su quali isole Darwin osservò i fringuelli che ispirarono le sue idee sull'evoluzione?", "Galápagos", "Canarie|Hawaii|Azzorre", 2],
    ["Quale naturalista francese propose, prima di Darwin, che i caratteri acquisiti si trasmettessero ai discendenti?", "Jean-Baptiste Lamarck", "Georges Cuvier|Louis Pasteur|Carlo Linneo", 3],
    ["Quale naturalista arrivò, in modo indipendente da Darwin, a una teoria dell'evoluzione per selezione naturale?", "Alfred Russel Wallace", "Thomas Huxley|Gregor Mendel|Jean-Baptiste Lamarck", 3],
    ["In quale laboratorio europeo vicino a Ginevra è stato scoperto il bosone di Higgs?", "CERN", "Fermilab|DESY|Laboratori del Gran Sasso", 2],
    ["Quale fisico italiano ricevette il Nobel nel 1984 per la scoperta dei bosoni W e Z?", "Carlo Rubbia", "Enrico Fermi|Emilio Segrè|Riccardo Giacconi", 3],
    ["Quale fisico italiano, Nobel nel 1938, emigrò negli Stati Uniti e costruì il primo reattore nucleare?", "Enrico Fermi", "Emilio Segrè|Guglielmo Marconi|Carlo Rubbia", 2],
    ["Quale fisico italiano scomparve misteriosamente nel 1938 durante un viaggio per mare?", "Ettore Majorana", "Enrico Fermi|Bruno Pontecorvo|Franco Rasetti", 3],
    ["Chi inventò la dinamite e lasciò i suoi beni per istituire i premi Nobel?", "Alfred Nobel", "Dmitrij Mendeleev|Thomas Edison|Alessandro Volta", 1],
    ["Quale scienziato russo è famoso per gli esperimenti sul riflesso condizionato con i cani?", "Ivan Pavlov", "Dmitrij Mendeleev|Sigmund Freud|Nikola Tesla", 2],
    ["Chi scoprì, nel 1820, il legame tra elettricità e magnetismo osservando l'ago di una bussola?", "Hans Christian Ørsted", "Michael Faraday|Georg Ohm|André-Marie Ampère", 3],
    ["Quale scienziato tedesco scoprì le onde radio generandole in laboratorio?", "Heinrich Hertz", "Guglielmo Marconi|Nikola Tesla|Georg Ohm", 3],
    ["Quale fisica austriaca contribuì a spiegare la fissione nucleare nel 1938?", "Lise Meitner", "Marie Curie|Rosalind Franklin|Maria Goeppert Mayer", 3],
    ["Chi guidò scientificamente il Progetto Manhattan per costruire la prima bomba atomica?", "Robert Oppenheimer", "Enrico Fermi|Albert Einstein|Werner Heisenberg", 2],
    ["Quale matematico britannico decifrò il codice Enigma e ideò una celebre macchina teorica?", "Alan Turing", "Charles Babbage|Isaac Newton|Stephen Hawking", 2],
    ["Quale fisico britannico, scomparso nel 2018, è noto per gli studi sui buchi neri e per «Dal Big Bang ai buchi neri»?", "Stephen Hawking", "Roger Penrose|Paul Dirac|Richard Feynman", 1],
    ["Quale scienziato italiano ideò il barometro a mercurio?", "Evangelista Torricelli", "Galileo Galilei|Alessandro Volta|Amedeo Avogadro", 2],
    ["Quale fisico italiano scoprì che i muscoli di una rana si contraggono a contatto con metalli?", "Luigi Galvani", "Alessandro Volta|Galileo Galilei|Amedeo Avogadro", 2],
    ["Quale scienziato italiano individuò una legge sul numero di molecole contenute in volumi uguali di gas?", "Amedeo Avogadro", "Alessandro Volta|Enrico Fermi|Evangelista Torricelli", 3],
    ["Per quale scoperta è famoso Camillo Golgi, Nobel per la medicina nel 1906?", "Un metodo per colorare le cellule nervose", "La struttura del DNA|Il vaccino antirabbico|La penicillina", 3],
  ]));
  // ---------- QUIZ: unità e misure ----------
  quiz.push(...Q([
    ["Quanti metri ci sono in un chilometro?", "1000", "100|10.000|500", 1],
    ["Quanti grammi ci sono in un chilogrammo?", "1000", "100|10|10.000", 1],
    ["Quanti millilitri ci sono in un litro?", "1000", "100|10|10.000", 1],
    ["Quale prefisso del Sistema Internazionale indica mille volte l'unità?", "Chilo", "Etto|Deca|Mega", 1],
    ["Quale prefisso indica un milionesimo dell'unità?", "Micro", "Milli|Nano|Mega", 2],
    ["Quale prefisso indica un miliardesimo dell'unità?", "Nano", "Micro|Pico|Milli", 2],
    ["Quale prefisso indica un milione di volte l'unità?", "Mega", "Chilo|Giga|Micro", 2],
    ["Qual è l'unità di misura della massa nel Sistema Internazionale?", "Chilogrammo", "Grammo|Newton|Libbra", 2],
    ["Qual è l'unità di misura del tempo nel Sistema Internazionale?", "Secondo", "Minuto|Ora|Giorno", 1],
    ["Che cosa si misura in calorie?", "L'energia", "La potenza|La temperatura|La pressione", 1],
    ["Che cosa misura il cavallo vapore?", "La potenza", "La forza|La velocità|L'energia", 2],
    ["Che cosa misura il chilowattora riportato in bolletta?", "L'energia", "La potenza|La tensione|La corrente", 2],
    ["Che cosa si misura in bar?", "La pressione", "La temperatura|La massa|L'energia", 2],
    ["Che cosa misura il «nodo» usato in marina?", "La velocità", "La distanza|Il peso|La profondità", 1],
    ["A quanti gradi Fahrenheit corrisponde 0 °C?", "32 °F", "0 °F|100 °F|212 °F", 2],
    ["A quanti gradi Fahrenheit bolle l'acqua al livello del mare?", "212 °F", "100 °F|180 °F|273 °F", 2],
    ["A quanti kelvin corrispondono circa 0 °C?", "273 K", "0 K|100 K|373 K", 2],
    ["Che cosa misura il pH?", "L'acidità o basicità di una soluzione", "La pressione di un gas|La densità di un liquido|La temperatura di ebollizione", 1],
    ["Una sostanza con pH 12 è…", "Basica", "Acida|Neutra|Un acido forte", 1],
    ["Qual è il pH del succo di limone, circa?", "2", "7|10|13", 2],
    ["Qual è l'unità di misura dell'angolo piano nel Sistema Internazionale?", "Radiante", "Grado|Metro|Steradiante", 3],
    ["In quale unità si misura la quantità di sostanza in chimica?", "Mole", "Grammo|Litro|Dalton", 2],
    ["Quale unità misura la radioattività di una sorgente?", "Becquerel", "Sievert|Pascal|Watt", 3],
    ["Quale unità misura la carica elettrica nel Sistema Internazionale?", "Coulomb", "Volt|Ampere|Farad", 3],
    ["In quale unità si misura la tensione elettrica?", "Volt", "Ampere|Ohm|Watt", 1],
  ]));
  // ---------- QUIZ: fisica ----------
  quiz.push(...Q([
    ["Che cosa afferma il terzo principio della dinamica?", "A ogni azione corrisponde una reazione uguale e contraria", "La forza è uguale a massa per accelerazione|Un corpo resta fermo se non c'è attrito|L'energia non si crea né si distrugge", 2],
    ["Che cosa accade a un corpo in moto se su di esso non agisce nessuna forza?", "Continua a muoversi a velocità costante in linea retta", "Rallenta fino a fermarsi|Accelera sempre di più|Cade verso il basso", 2],
    ["Che cosa misura davvero il «peso» di un oggetto?", "La forza con cui la gravità lo attira", "La quantità di materia che contiene|Il volume che occupa|La sua densità", 2],
    ["Come si chiama la forza che si oppone allo scivolamento tra due superfici a contatto?", "Attrito", "Gravità|Inerzia|Spinta", 1],
    ["Quale principio spiega perché una nave d'acciaio galleggia?", "Principio di Archimede", "Principio di Pascal|Legge di Ohm|Principio di inerzia", 2],
    ["Qual è la formula della densità?", "Massa diviso volume", "Volume diviso massa|Massa per volume|Forza diviso superficie", 2],
    ["Qual è la formula della velocità media?", "Spazio diviso tempo", "Tempo diviso spazio|Spazio per tempo|Forza diviso massa", 1],
    ["Quale formula esprime il secondo principio della dinamica?", "F = m · a", "F = m / a|F = m + a|F = a / m", 2],
    ["Quale formula esprime l'equivalenza tra massa ed energia?", "E = mc²", "F = ma|V = RI|P = mg", 1],
    ["Quale formula esprime la legge di Ohm?", "V = R · I", "F = m · a|E = m · c²|P = F / A", 2],
    ["Come si chiama l'energia legata al movimento di un corpo?", "Energia cinetica", "Energia potenziale|Energia termica|Energia chimica", 1],
    ["Come si chiama l'energia posseduta da un corpo per la sua posizione in altezza?", "Energia potenziale", "Energia cinetica|Energia nucleare|Energia elettrica", 1],
    ["Che cosa trasforma in elettricità un pannello fotovoltaico?", "La luce solare", "Il calore del terreno|Il vento|L'acqua piovana", 1],
    ["Quale fenomeno produce l'arcobaleno?", "Rifrazione e riflessione della luce nelle gocce d'acqua", "L'eclissi della luce solare|La combustione di gas nell'aria|L'elettricità statica delle nuvole", 2],
    ["Rispetto all'aria, il suono nell'acciaio viaggia…", "Più velocemente", "Più lentamente|Alla stessa velocità|Non si propaga", 3],
    ["Perché durante un temporale si vede prima il lampo e poi si sente il tuono?", "La luce viaggia molto più veloce del suono", "Il suono viaggia più veloce della luce|Il tuono precede il lampo ma non lo si sente|Il lampo è più vicino del tuono", 1],
    ["Che tipo di onda è il suono?", "Un'onda meccanica", "Un'onda elettromagnetica|Un'onda gravitazionale|Un'onda luminosa", 2],
    ["Quale di questi materiali è un buon isolante elettrico?", "Gomma", "Rame|Alluminio|Argento", 1],
    ["Quale metallo è il miglior conduttore di elettricità?", "Argento", "Rame|Oro|Alluminio", 3],
    ["Quale di questi è un materiale semiconduttore usato nei chip?", "Silicio", "Rame|Oro|Zolfo", 2],
    ["Quali particelle trasportano la corrente elettrica nei fili metallici?", "Elettroni", "Protoni|Neutroni|Fotoni", 2],
    ["Come si chiamano i due poli di un magnete?", "Nord e sud", "Positivo e negativo|Est e ovest|Alto e basso", 1],
    ["Che cosa accade avvicinando due poli magnetici uguali?", "Si respingono", "Si attraggono|Non accade nulla|Si fondono", 1],
    ["Quale di questi metalli è attratto da un magnete?", "Ferro", "Rame|Alluminio|Oro", 1],
    ["Come si propaga il calore all'interno di un solido, ad esempio un cucchiaio nella minestra?", "Per conduzione", "Per convezione|Per irraggiamento|Per evaporazione", 2],
    ["Come arriva il calore del Sole sulla Terra?", "Per irraggiamento", "Per conduzione|Per convezione|Per condensazione", 2],
    ["Come si chiama la propagazione del calore tramite il movimento di un fluido caldo che sale?", "Convezione", "Conduzione|Irraggiamento|Sublimazione", 2],
    ["Come si chiama la deviazione di un raggio di luce quando passa dall'aria all'acqua?", "Rifrazione", "Riflessione|Diffrazione|Assorbimento", 2],
    ["Quale tipo di lente corregge la miopia?", "Divergente", "Convergente|Bifocale|Polarizzata", 3],
    ["Quale tipo di lente corregge l'ipermetropia?", "Convergente", "Divergente|Concava|Opaca", 3],
    ["Quale colore della luce visibile ha la lunghezza d'onda più lunga?", "Rosso", "Verde|Blu|Violetto", 2],
    ["Quale radiazione usa il telecomando della televisione?", "Infrarossi", "Raggi X|Ultravioletti|Microonde", 2],
    ["Quale radiazione provoca le scottature solari sulla pelle?", "Ultravioletti", "Infrarossi|Onde radio|Microonde", 1],
    ["Che cos'è un fotone?", "Un quanto di luce", "Un frammento di nucleo|Un elettrone libero|Una molecola d'acqua", 2],
    ["Quale particella dell'atomo ha carica elettrica positiva?", "Protone", "Elettrone|Neutrone|Fotone", 1],
    ["Che cosa sono gli isotopi di un elemento?", "Atomi con lo stesso numero di protoni e diverso numero di neutroni", "Atomi con diverso numero di protoni|Atomi carichi positivamente|Molecole di due atomi uguali", 3],
    ["Come si chiama la reazione nucleare che unisce nuclei leggeri e alimenta il Sole?", "Fusione nucleare", "Fissione nucleare|Combustione|Ossidazione", 2],
    ["Come si chiama la reazione nucleare in cui un nucleo pesante si spezza?", "Fissione nucleare", "Fusione nucleare|Combustione|Sublimazione", 2],
    ["Quale elemento è usato come combustibile nelle centrali nucleari?", "Uranio", "Carbonio|Zolfo|Elio", 1],
    ["Quale fenomeno consente di sentire l'eco in montagna?", "La riflessione del suono", "La rifrazione della luce|L'assorbimento del suono|La conduzione del calore", 1],
    ["Quale grandezza fisica determina l'altezza (acuto o grave) di un suono?", "La frequenza", "L'intensità|Il timbro|La durata", 2],
    ["Quale grandezza determina la «forza» (volume) di un suono?", "L'ampiezza dell'onda", "La frequenza|La velocità|La lunghezza d'onda", 3],
  ]));
  // ---------- QUIZ: chimica e materia ----------
  quiz.push(...Q([
    ["Come si chiama il passaggio dallo stato liquido a quello solido?", "Solidificazione", "Fusione|Sublimazione|Condensazione", 1],
    ["Come si chiama il passaggio dallo stato liquido a quello gassoso?", "Vaporizzazione", "Fusione|Condensazione|Sublimazione", 2],
    ["Come si chiama il passaggio diretto dallo stato gassoso a quello solido, come nella brina?", "Brinamento (deposizione)", "Sublimazione|Evaporazione|Fusione", 3],
    ["Qual è lo stato della materia più diffuso nell'universo visibile, quello delle stelle?", "Plasma", "Gas neutro|Solido|Liquido", 3],
    ["In quale stato della materia si trova il Sole?", "Plasma", "Liquido|Solido|Gas neutro", 2],
    ["Quale di queste è una miscela omogenea?", "Acqua con sale sciolto", "Acqua e olio|Acqua e sabbia|Sabbia e ghiaia", 2],
    ["Quale metodo permette di ottenere il sale dall'acqua di mare?", "Evaporazione dell'acqua", "Filtrazione con un colino|Decantazione|Uso di una calamita", 1],
    ["Quale tecnica separa liquidi con diverso punto di ebollizione, ad esempio per produrre i distillati?", "Distillazione", "Filtrazione|Centrifugazione|Cromatografia", 2],
    ["Che cosa fa un catalizzatore in una reazione chimica?", "La accelera senza consumarsi", "La rallenta sempre|Ne cambia i prodotti|Ne fornisce l'energia", 3],
    ["Quale di queste sostanze di uso domestico è fortemente basica?", "Candeggina", "Aceto|Succo di limone|Cola", 2],
    ["Che cosa si ottiene, in generale, dalla reazione tra un acido e una base?", "Un sale e acqua", "Un metallo e un gas|Solo un gas|Una miscela eterogenea", 2],
    ["Come si chiama la reazione di una sostanza con l'ossigeno che produce calore e luce?", "Combustione", "Fermentazione|Elettrolisi|Neutralizzazione", 1],
    ["Quale gas si libera quando si scioglie una pastiglia effervescente in acqua?", "Anidride carbonica", "Ossigeno|Idrogeno|Azoto", 2],
    ["Quali gas si ottengono scomponendo l'acqua con l'elettrolisi?", "Idrogeno e ossigeno", "Azoto e ossigeno|Idrogeno e azoto|Carbonio e ossigeno", 2],
    ["Quale gas rende frizzanti le bevande gassate?", "Anidride carbonica", "Ossigeno|Azoto|Metano", 1],
    ["Qual è il solvente più comune in natura?", "L'acqua", "L'alcol|L'olio|L'acetone", 1],
    ["Perché d'inverno si getta il sale sulle strade ghiacciate?", "Abbassa la temperatura di congelamento dell'acqua", "Scalda il ghiaccio chimicamente|Rende l'asfalto più ruvido|Aumenta il punto di congelamento", 2],
    ["Come si chiama il processo con cui il lievito trasforma gli zuccheri in alcol e anidride carbonica?", "Fermentazione", "Distillazione|Combustione|Elettrolisi", 1],
    ["Quale gas è responsabile dell'odore di uova marce?", "Acido solfidrico", "Metano|Ozono|Azoto", 3],
    ["Il polietilene, usato per i sacchetti di plastica, è un esempio di…", "Polimero", "Metallo|Vetro|Sale", 2],
    ["Da quale materia prima si ricava la maggior parte delle plastiche?", "Dal petrolio", "Dalla sabbia|Dal legno|Dall'argilla", 1],
    ["Qual è il componente principale del vetro comune?", "Silice (sabbia)", "Argilla|Gesso|Zolfo", 2],
    ["Quale lega è formata da rame e stagno?", "Bronzo", "Ottone|Acciaio|Amalgama", 2],
    ["Quale lega è formata da rame e zinco?", "Ottone", "Bronzo|Acciaio|Amalgama", 3],
    ["L'acciaio è una lega di ferro e…", "Carbonio", "Rame|Zinco|Piombo", 2],
    ["Quale gas serra è prodotto in gran quantità dagli allevamenti di bovini e dalle risaie?", "Metano", "Elio|Ossigeno|Argon", 2],
    ["Quali sostanze, usate in passato nei frigoriferi e negli spray, danneggiavano lo strato di ozono?", "Clorofluorocarburi (CFC)", "Anidride carbonica|Metano|Azoto", 2],
    ["Qual è il principale componente del gas naturale usato nelle case?", "Metano", "Propano|Idrogeno|Anidride carbonica", 2],
    ["Quale di questi è un combustibile fossile?", "Carbone", "Legna|Idrogeno|Etanolo", 1],
    ["Da che cosa si è formato il petrolio nel corso di milioni di anni?", "Da resti di organismi marini sepolti", "Dalla fusione di rocce vulcaniche|Dal sale marino|Da foreste attuali", 2],
    ["Quale scienziato ricavava il tornasole? Da quale organismo si ottiene la colorazione del tornasole?", "Licheni", "Alghe brune|Cavolo rosso|Muschi", 3],
    ["Che cosa indica la cartina al tornasole?", "Se una soluzione è acida o basica", "La temperatura|La densità|La quantità di sale", 1],
    ["Che cosa succede alla maggior parte dei solidi quando vengono riscaldati?", "Si dilatano", "Si contraggono|Diventano più densi|Perdono massa", 2],
    ["Quale di queste trasformazioni è un cambiamento chimico?", "Un chiodo che arrugginisce", "Il ghiaccio che si scioglie|L'acqua che evapora|Lo zucchero che si scioglie nel tè", 2],
    ["Quale di queste trasformazioni è un cambiamento solo fisico?", "L'acqua che evapora", "Il legno che brucia|Il latte che diventa yogurt|Il ferro che arrugginisce", 2],
    ["Quanti atomi di idrogeno ci sono in una molecola d'acqua?", "Due", "Uno|Tre|Quattro", 1],
    ["Quanti atomi di ossigeno ci sono in una molecola di anidride carbonica?", "Due", "Uno|Tre|Quattro", 2],
    ["Come si chiama il legame in cui due atomi mettono in comune degli elettroni?", "Covalente", "Ionico|Gravitazionale|Nucleare", 3],
    ["Come si chiamano gli atomi che hanno perso o acquistato elettroni e quindi hanno carica elettrica?", "Ioni", "Isotopi|Molecole|Neutroni", 3],
    ["A quale tipo di sostanza appartiene il cloruro di sodio, cioè il sale da cucina?", "Composto ionico", "Elemento|Miscela|Metallo", 3],
    ["Che cosa avviene in una reazione di ossidoriduzione?", "Uno scambio di elettroni", "Uno scambio di neutroni|Una fusione di nuclei|Un cambio di stato", 3],
    ["Quale scienziato enunciò che «nulla si crea e nulla si distrugge» nelle reazioni chimiche?", "Antoine Lavoisier", "Dmitrij Mendeleev|John Dalton|Robert Boyle", 2],
  ]));
  // ---------- QUIZ: corpo umano e biologia ----------
  quiz.push(...Q([
    ["Quanti cromosomi ha una normale cellula del corpo umano?", "46", "23|44|48", 2],
    ["Che cosa significa la sigla DNA?", "Acido desossiribonucleico", "Acido ribonucleico|Amminoacido nucleare|Acido dinamico nucleare", 2],
    ["Quali sono le quattro basi azotate del DNA?", "Adenina, citosina, guanina, timina", "Adenina, citosina, guanina, uracile|Alanina, citosina, glicina, timina|Arginina, cisteina, glutammina, tirosina", 3],
    ["Quale base azotata è presente nell'RNA al posto della timina?", "Uracile", "Adenina|Citosina|Guanina", 3],
    ["Nel DNA, con quale base si appaia l'adenina?", "Timina", "Citosina|Guanina|Uracile", 3],
    ["Come si chiama la divisione cellulare che produce due cellule figlie identiche alla madre?", "Mitosi", "Meiosi|Fecondazione|Gemmazione", 2],
    ["Quale divisione cellulare produce i gameti, cioè le cellule uovo e gli spermatozoi?", "Meiosi", "Mitosi|Gemmazione|Fermentazione", 2],
    ["In quale organello della cellula vegetale avviene la fotosintesi?", "Cloroplasto", "Mitocondrio|Nucleo|Vacuolo", 2],
    ["Quali organelli producono le proteine seguendo le istruzioni dell'RNA?", "Ribosomi", "Lisosomi|Mitocondri|Vacuoli", 3],
    ["Quale struttura si trova nelle cellule vegetali ma non in quelle animali?", "Parete cellulare", "Nucleo|Membrana plasmatica|Mitocondri", 2],
    ["Quale organo produce la bile?", "Fegato", "Pancreas|Stomaco|Milza", 2],
    ["Quale ormone regola il livello di zucchero nel sangue e viene a mancare nel diabete di tipo 1?", "Insulina", "Adrenalina|Melatonina|Tiroxina", 1],
    ["Quale organo produce l'insulina?", "Pancreas", "Fegato|Rene|Stomaco", 2],
    ["Quale proteina trasporta l'ossigeno nel sangue?", "Emoglobina", "Insulina|Collagene|Cheratina", 2],
    ["Quale gruppo sanguigno è considerato donatore universale per i globuli rossi?", "0 negativo", "AB positivo|A positivo|B negativo", 3],
    ["Quale gruppo sanguigno è considerato ricevente universale per i globuli rossi?", "AB positivo", "0 negativo|A negativo|B positivo", 3],
    ["Qual è l'osso più lungo del corpo umano?", "Femore", "Tibia|Omero|Perone", 1],
    ["Qual è l'organo più esteso del corpo umano?", "La pelle", "Il fegato|L'intestino|I polmoni", 2],
    ["Qual è il più grande organo interno del corpo umano?", "Il fegato", "Il cuore|Il cervello|Il rene", 2],
    ["Dove avviene la maggior parte dell'assorbimento dei nutrienti?", "Nell'intestino tenue", "Nello stomaco|Nell'esofago|Nel colon", 2],
    ["Quale organo di senso contiene la coclea?", "L'orecchio", "L'occhio|Il naso|La lingua", 2],
    ["Quale parte dell'occhio regola la quantità di luce che entra, restringendo o allargando la pupilla?", "Iride", "Cornea|Retina|Cristallino", 2],
    ["In quale parte dell'occhio si forma l'immagine?", "Retina", "Cornea|Iride|Sclera", 2],
    ["Quali cellule della retina permettono di distinguere i colori?", "Coni", "Bastoncelli|Neuroni olfattivi|Cheratinociti", 3],
    ["Qual è la più grande arteria del corpo umano?", "Aorta", "Carotide|Femorale|Polmonare", 2],
    ["Le arterie portano il sangue…", "Lontano dal cuore", "Verso il cuore|Solo ai polmoni|Solo al cervello", 2],
    ["Quale ormone, prodotto dalle ghiandole surrenali, prepara il corpo alla reazione di «lotta o fuga»?", "Adrenalina", "Insulina|Melatonina|Estrogeno", 2],
    ["Quale ormone regola il ritmo tra sonno e veglia?", "Melatonina", "Insulina|Adrenalina|Tiroxina", 2],
    ["Quale malattia è causata dalla carenza di vitamina C?", "Scorbuto", "Rachitismo|Beriberi|Pellagra", 2],
    ["Quale malattia dei bambini è causata dalla carenza di vitamina D?", "Rachitismo", "Scorbuto|Beriberi|Pellagra", 3],
    ["Quale vitamina è importante per la vista?", "Vitamina A", "Vitamina C|Vitamina D|Vitamina K", 2],
    ["Quale sostanza dà il colore alla pelle?", "Melanina", "Cheratina|Emoglobina|Collagene", 2],
    ["Quale proteina forma capelli e unghie?", "Cheratina", "Collagene|Melanina|Insulina", 3],
    ["Quale proteina dà resistenza ed elasticità a pelle, tendini e ossa ed è la più abbondante nel corpo umano?", "Collagene", "Cheratina|Emoglobina|Insulina", 3],
    ["Come si chiama un organismo capace di produrre da solo il proprio nutrimento, come le piante?", "Autotrofo", "Eterotrofo|Parassita|Decompositore", 2],
    ["Come si chiama il rapporto in cui due organismi traggono entrambi vantaggio dalla convivenza?", "Mutualismo", "Parassitismo|Predazione|Competizione", 2],
    ["Come si chiama il rapporto in cui un organismo vive a spese di un altro danneggiandolo?", "Parassitismo", "Mutualismo|Simbiosi mutualistica|Commensalismo", 2],
    ["Come si chiama l'insieme degli esseri viventi e dell'ambiente in cui vivono, in relazione tra loro?", "Ecosistema", "Bioma|Popolazione|Specie", 1],
    ["Chi sta alla base di una catena alimentare?", "Le piante (produttori)", "I carnivori|I decompositori|I predatori più grandi", 2],
    ["Quale di questi animali è un marsupiale?", "Canguro", "Lemure|Alpaca|Armadillo", 1],
    ["Quale mammifero depone le uova?", "Ornitorinco", "Delfino|Canguro|Pipistrello", 2],
    ["Qual è l'unico mammifero capace di volare attivamente?", "Pipistrello", "Scoiattolo volante|Colibrì|Pangolino", 1],
    ["Qual è il più veloce animale in picchiata?", "Falco pellegrino", "Aquila reale|Ghepardo|Condor", 2],
    ["Come si chiama la trasformazione di un bruco in farfalla?", "Metamorfosi", "Mimetismo|Muta|Ibernazione", 1],
    ["Come si chiama lo stadio, avvolto nella crisalide, tra il bruco e la farfalla adulta?", "Pupa", "Larva|Uovo|Ninfa", 2],
    ["I girini, giovani degli anfibi, respirano con…", "Branchie", "Polmoni|Trachee|Stomi", 2],
    ["Quale di questi gruppi di animali è a «sangue freddo» (ectotermo)?", "Rettili", "Mammiferi|Uccelli|Marsupiali", 2],
    ["Quale tecnica usano pipistrelli e delfini per orientarsi emettendo suoni?", "Ecolocalizzazione", "Mimetismo|Fototropismo|Ibernazione", 2],
    ["Quale organo respira un pesce?", "Le branchie", "I polmoni|Le trachee|Gli stomi", 1],
    ["Quale organo del corpo umano contiene i neuroni e coordina il sistema nervoso?", "L'encefalo e il midollo spinale", "Il cuore e le arterie|Lo stomaco e l'intestino|I reni e la vescica", 2],
    ["Quale ghiandola produce la tiroxina, ormone che regola il metabolismo?", "Tiroide", "Ipofisi|Pancreas|Timo", 3],
  ]));
  (D.pop = D.pop || []).push({
    id: 'plusscienza', extends: 'scienza',
    quiz, tf, tables, quotes,
    quoteText: 'Quale scienziato ha pronunciato o scritto questa frase?',
    emojis, emojiText: 'A quale concetto scientifico si riferiscono queste emoji?',
    order, numbers, typed,
  });
})(typeof window !== 'undefined' ? window : globalThis);
