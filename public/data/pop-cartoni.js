// Categoria «Cartoni animati» per Quizzone! — domande in italiano, fatti verificati.
// Cartoni TV occidentali (niente anime, niente film Disney/Pixar). Formato: public/data/POP-FORMAT.md
// Controllo: node scripts/check-pop.js public/data/pop-cartoni.js
(function (root) {
  'use strict';
  const D = (root.QZ_DATA = root.QZ_DATA || {});

  // ---------- Tabella «serie» (i cartoni) ----------
  // Righe: [titolo italiano, d, paese, creatore, canale di prima messa in onda, anno d'inizio]; '' / 0 = non indicato.
  const PAESE_ALT = {
    'Stati Uniti': ['USA', 'America', 'Stati Uniti d\'America'],
    'Regno Unito': ['Inghilterra', 'UK', 'Gran Bretagna'],
    Russia: ['Federazione Russa'],
  };
  const HB = 'William Hanna e Joseph Barbera';
  const CREATORE_ALT = {
    'Matt Groening': ['Groening'], 'Stephen Hillenburg': ['Hillenburg'], 'Seth MacFarlane': ['MacFarlane', 'McFarlane'],
    [HB]: ['Hanna e Barbera', 'Hanna-Barbera', 'Hanna Barbera'], Peyo: ['Pierre Culliford'],
    'Neville Astley e Mark Baker': ['Astley e Baker'], 'Iginio Straffi': ['Straffi'], ' Ben Bocquelet': [],
    'Ben Bocquelet': ['Bocquelet'], 'Pendleton Ward': ['Ward'], 'Joe Brumm': ['Brumm'], 'Oleg Kuznetsov': ['Kuznetsov'],
    Altan: ['Francesco Tullio Altan', 'Tullio Altan'], 'Nino e Toni Pagot': ['Pagot', 'Fratelli Pagot'],
    'Dan Povenmire e Jeff Marsh': ['Povenmire e Marsh'], 'Genndy Tartakovsky': ['Tartakovsky'], 'Craig McCracken': ['McCracken'],
    'Van Partible': ['Partible'], 'David Feiss': ['Feiss'], 'John R. Dilworth': ['Dilworth', 'John Dilworth'],
    'DiMartino e Konietzko': ['Michael Dante DiMartino e Bryan Konietzko'], 'Butch Hartman': ['Hartman'], 'Keith Chapman': ['Chapman'],
    'Kevin Eastman e Peter Laird': ['Eastman e Laird'], 'Olivier Jean-Marie': ['Jean-Marie'], 'Thomas Astruc': ['Astruc'],
    'Chalvon-Demersay e Michel': ['Vincent Chalvon-Demersay e David Michel'], 'Rebecca Sugar': ['Sugar'],
    'Craig Bartlett': ['Bartlett'], 'Bob Schooley e Mark McCorkle': ['Schooley e McCorkle'], 'Joe Murray': ['Murray'],
    'Bruno Bozzetto': ['Bozzetto'], 'Osvaldo Cavandoli': ['Cavandoli'],
  };
  const serieRows = [
    ['I Simpson', 1, 'Stati Uniti', 'Matt Groening', 'Fox', 1989],
    ['SpongeBob', 1, 'Stati Uniti', 'Stephen Hillenburg', 'Nickelodeon', 1999],
    ['I Griffin', 1, 'Stati Uniti', 'Seth MacFarlane', 'Fox', 1999],
    ['Futurama', 2, 'Stati Uniti', 'Matt Groening', 'Fox', 1999],
    ['Looney Tunes', 1, 'Stati Uniti', '', '', 1930],
    ['Tom & Jerry', 1, 'Stati Uniti', HB, '', 1940],
    ['Scooby-Doo', 1, 'Stati Uniti', '', '', 1969],
    ['Gli Antenati', 1, 'Stati Uniti', HB, '', 1960],
    ['I Pronipoti', 3, 'Stati Uniti', HB, '', 1962],
    ['Yoghi e Bubu', 2, 'Stati Uniti', HB, '', 1961],
    ['I Puffi', 1, 'Belgio', 'Peyo', '', 0],
    ['Peppa Pig', 1, 'Regno Unito', 'Neville Astley e Mark Baker', 'Channel 5', 2004],
    ['Winx Club', 1, 'Italia', 'Iginio Straffi', '', 2004],
    ['Ben 10', 1, 'Stati Uniti', 'Man of Action', 'Cartoon Network', 2005],
    ['Lo straordinario mondo di Gumball', 1, 'Regno Unito', 'Ben Bocquelet', 'Cartoon Network', 2011],
    ['Adventure Time', 1, 'Stati Uniti', 'Pendleton Ward', 'Cartoon Network', 2010],
    ['Bluey', 1, 'Australia', 'Joe Brumm', 'ABC Kids', 2018],
    ['Masha e Orso', 1, 'Russia', 'Oleg Kuznetsov', '', 2009],
    ['La Pimpa', 2, 'Italia', 'Altan', '', 0],
    ['Calimero', 2, 'Italia', 'Nino e Toni Pagot', '', 1963],
    ['Phineas e Ferb', 2, 'Stati Uniti', 'Dan Povenmire e Jeff Marsh', 'Disney Channel', 2007],
    ['Il laboratorio di Dexter', 2, 'Stati Uniti', 'Genndy Tartakovsky', 'Cartoon Network', 1996],
    ['Le Superchicche', 2, 'Stati Uniti', 'Craig McCracken', 'Cartoon Network', 1998],
    ['Johnny Bravo', 2, 'Stati Uniti', 'Van Partible', 'Cartoon Network', 1997],
    ['Mucca e Pollo', 3, 'Stati Uniti', 'David Feiss', 'Cartoon Network', 1997],
    ['Leone il cane fifone', 3, 'Stati Uniti', 'John R. Dilworth', 'Cartoon Network', 1999],
    ['Steven Universe', 3, 'Stati Uniti', 'Rebecca Sugar', 'Cartoon Network', 2013],
    ['Teen Titans Go!', 2, 'Stati Uniti', '', 'Cartoon Network', 2013],
    ['Rugrats', 2, 'Stati Uniti', '', 'Nickelodeon', 1991],
    ['Avatar - La leggenda di Aang', 2, 'Stati Uniti', 'DiMartino e Konietzko', 'Nickelodeon', 2005],
    ['Due fantagenitori', 2, 'Stati Uniti', 'Butch Hartman', 'Nickelodeon', 0],
    ['Dora l\'esploratrice', 2, 'Stati Uniti', '', 'Nickelodeon', 2000],
    ['Hey Arnold!', 3, 'Stati Uniti', 'Craig Bartlett', 'Nickelodeon', 1996],
    ['La vita moderna di Rocko', 3, 'Stati Uniti', 'Joe Murray', 'Nickelodeon', 1993],
    ['Kim Possible', 3, 'Stati Uniti', 'Bob Schooley e Mark McCorkle', 'Disney Channel', 2002],
    ['PAW Patrol', 1, 'Canada', 'Keith Chapman', '', 2013],
    ['Bob Aggiustatutto', 2, 'Regno Unito', 'Keith Chapman', '', 1998],
    ['Il trenino Thomas', 2, 'Regno Unito', '', '', 1984],
    ['Shaun, vita da pecora', 3, 'Regno Unito', '', '', 2007],
    ['Pocoyo', 2, 'Spagna', '', '', 2005],
    ['Oggy e i maledetti scarafaggi', 3, 'Francia', 'Olivier Jean-Marie', '', 1998],
    ['Totally Spies!', 3, 'Francia', 'Chalvon-Demersay e Michel', '', 2001],
    ['Miraculous', 2, 'Francia', 'Thomas Astruc', '', 2015],
    ['Tartarughe Ninja', 2, 'Stati Uniti', 'Kevin Eastman e Peter Laird', '', 0],
    ['He-Man e i dominatori dell\'universo', 2, 'Stati Uniti', '', '', 1983],
    ['Il Signor Rossi', 3, 'Italia', 'Bruno Bozzetto', '', 0],
    ['La Linea', 3, 'Italia', 'Osvaldo Cavandoli', '', 0],
  ];
  const serieItems = serieRows.map(([name, d, paese, creatore, rete, anno]) => {
    const o = { name, d };
    if (paese) { o.paese = paese; if (PAESE_ALT[paese]) o.paeseAlt = PAESE_ALT[paese]; }
    if (creatore) { o.creatore = creatore; if ((CREATORE_ALT[creatore] || []).length) o.creatoreAlt = CREATORE_ALT[creatore]; }
    if (rete) o.rete = rete;
    if (anno) o.anno = anno;
    return o;
  });

  // ---------- Tabella «personaggi» ----------
  // Righe per cartone: [nome, d, specie, anno di prima apparizione]; '' / 0 = non indicato.
  const SERIE_ALT = {
    'I Simpson': ['Simpson', 'The Simpsons', 'Simpsons'], SpongeBob: ['SpongeBob SquarePants', 'Bob Esponja'],
    'I Griffin': ['Griffin', 'Family Guy'], 'Tom & Jerry': ['Tom e Jerry', 'Tom and Jerry'], 'Scooby-Doo': ['Scooby Doo'],
    'Gli Antenati': ['Antenati', 'The Flintstones', 'Flintstones'], 'I Puffi': ['Puffi', 'Smurfs'], 'Peppa Pig': ['Peppa'],
    'Winx Club': ['Winx'], 'Ben 10': ['Ben Ten'], 'Lo straordinario mondo di Gumball': ['Gumball'],
    'Masha e Orso': ['Masha'], 'La Pimpa': ['Pimpa'], 'Phineas e Ferb': ['Phineas e Ferb'], 'Le Superchicche': ['Superchicche', 'The Powerpuff Girls'],
    'Avatar - La leggenda di Aang': ['Avatar', 'La leggenda di Aang'], 'Dora l\'esploratrice': ['Dora'],
    'PAW Patrol': ['Paw Patrol'], 'Il trenino Thomas': ['Thomas', 'Trenino Thomas'], Miraculous: ['Miraculous - Le storie di Ladybug e Chat Noir', 'Ladybug'],
    'He-Man e i dominatori dell\'universo': ['He-Man'], 'Oggy e i maledetti scarafaggi': ['Oggy'], 'Yoghi e Bubu': ['Yoghi', 'Yogi Bear'],
    'Il laboratorio di Dexter': ['Dexter', 'Laboratorio di Dexter'], 'Tartarughe Ninja': ['Tartarughe Ninja alla riscossa'],
  };
  const CH = {
    'I Simpson': [
      ['Homer Simpson', 1, '', 1987], ['Marge Simpson', 1, '', 1987], ['Bart Simpson', 1, '', 1987], ['Lisa Simpson', 1, '', 1987],
      ['Maggie Simpson', 1, '', 1987], ['Montgomery Burns', 1, '', 0], ['Ned Flanders', 1, '', 0], ['Krusty il Clown', 1, '', 0],
      ['Milhouse Van Houten', 2, '', 0], ['Waylon Smithers', 2, '', 0], ['Apu Nahasapeemapetilon', 2, '', 0], ['Nelson Muntz', 2, '', 0],
      ['Barney Gumble', 2, '', 0], ['Preside Skinner', 2, '', 0], ['Telespalla Bob', 2, '', 0], ['Professor Frink', 3, '', 0],
      ['Palla di Neve', 3, 'gatto', 0], ['Piccolo Aiutante di Babbo Natale', 3, 'cane', 0],
    ],
    SpongeBob: [
      ['SpongeBob SquarePants', 1, 'spugna', 1999], ['Patrick Stella', 1, 'stella marina', 1999], ['Squiddi Tentacolo', 1, 'polpo', 1999],
      ['Plankton', 2, 'plancton', 1999], ['Sandy Cheeks', 2, 'scoiattolo', 1999],
    ],
    'I Griffin': [
      ['Peter Griffin', 1, '', 1999], ['Lois Griffin', 1, '', 1999], ['Meg Griffin', 1, '', 1999], ['Chris Griffin', 1, '', 1999],
      ['Stewie Griffin', 1, '', 1999], ['Brian Griffin', 1, 'cane', 1999], ['Glenn Quagmire', 2, '', 0], ['Cleveland Brown', 3, '', 0],
      ['Joe Swanson', 3, '', 0],
    ],
    Futurama: [
      ['Philip J. Fry', 1, '', 1999], ['Leela', 1, '', 1999], ['Bender', 1, 'robot', 1999], ['Professor Farnsworth', 2, '', 1999],
      ['Zoidberg', 2, '', 1999], ['Amy Wong', 2, '', 0], ['Hermes Conrad', 3, '', 0], ['Zapp Brannigan', 3, '', 0], ['Nibbler', 3, '', 0],
      ['Kif Kroker', 3, '', 0],
    ],
    'Looney Tunes': [
      ['Bugs Bunny', 1, 'coniglio', 1940], ['Daffy Duck', 1, 'anatra', 1937], ['Porky Pig', 1, 'maiale', 1935], ['Titti', 1, 'canarino', 1942],
      ['Gatto Silvestro', 1, 'gatto', 1945], ['Beep Beep', 1, '', 1949], ['Willy il Coyote', 1, 'coyote', 1949],
      ['Taz', 2, 'diavolo della Tasmania', 1954], ['Pepé Le Pew', 2, 'puzzola', 1945], ['Speedy Gonzales', 2, 'topo', 0],
      ['Gallo Claudio', 3, 'gallo', 1946], ['Yosemite Sam', 3, '', 1945], ['Marvin il Marziano', 3, '', 1948], ['Lola Bunny', 3, 'coniglio', 1996],
    ],
    'Tom & Jerry': [['Tom', 1, 'gatto', 1940], ['Jerry', 1, 'topo', 1940], ['Spike', 2, 'cane', 1942]],
    'Scooby-Doo': [
      ['Scooby-Doo', 1, 'cane', 1969], ['Shaggy Rogers', 1, '', 1969], ['Fred Jones', 2, '', 1969], ['Daphne Blake', 2, '', 1969],
      ['Velma Dinkley', 2, '', 1969], ['Scrappy-Doo', 2, 'cane', 1979],
    ],
    'Gli Antenati': [
      ['Fred Flintstone', 1, '', 1960], ['Wilma Flintstone', 1, '', 1960], ['Barney Rubble', 2, '', 1960], ['Betty Rubble', 2, '', 1960],
      ['Pebbles', 2, '', 1963], ['Bamm-Bamm', 3, '', 1963], ['Dino', 2, 'dinosauro', 1960],
    ],
    'Yoghi e Bubu': [['Yoghi', 1, 'orso', 1958], ['Bubu', 2, 'orso', 1958], ['Ranger Smith', 3, '', 0]],
    'I Puffi': [
      ['Grande Puffo', 1, '', 0], ['Puffetta', 1, '', 1966], ['Puffo Quattrocchi', 2, '', 0], ['Puffo Brontolone', 2, '', 0],
      ['Puffo Vanitoso', 2, '', 0], ['Puffo Forzuto', 2, '', 0], ['Gargamella', 1, '', 0], ['Birba', 2, 'gatto', 0],
    ],
    'Peppa Pig': [
      ['Peppa Pig', 1, 'maiale', 2004], ['George Pig', 1, 'maiale', 0], ['Mamma Pig', 1, 'maiale', 0], ['Papà Pig', 1, 'maiale', 0],
      ['Nonno Pig', 2, 'maiale', 0], ['Nonna Pig', 2, 'maiale', 0], ['Suzy Pecora', 1, 'pecora', 0], ['Rebecca Coniglio', 2, 'coniglio', 0],
      ['Danny Cane', 2, 'cane', 0], ['Pedro Pony', 2, 'pony', 0], ['Zoe Zebra', 2, 'zebra', 0], ['Candy Gatto', 3, 'gatto', 0],
      ['Emily Elefante', 3, 'elefante', 0],
    ],
    'Winx Club': [
      ['Bloom', 1, '', 2004], ['Stella', 1, '', 2004], ['Flora', 1, '', 2004], ['Musa', 1, '', 2004], ['Tecna', 1, '', 2004],
      ['Icy', 2, '', 2004], ['Stormy', 3, '', 2004], ['Sky', 2, '', 2004], ['Brandon', 3, '', 2004], ['Riven', 3, '', 2004],
      ['Helia', 3, '', 2004], ['Timmy', 3, '', 2004], ['Faragonda', 2, '', 2004], ['Saladin', 3, '', 2004], ['Kiko', 2, 'coniglio', 2004],
    ],
    'Ben 10': [['Ben Tennyson', 1, '', 2005], ['Gwen Tennyson', 1, '', 2005], ['Nonno Max', 2, '', 2005], ['Vilgax', 2, '', 2005], ['Kevin Levin', 3, '', 0]],
    'Lo straordinario mondo di Gumball': [
      ['Gumball Watterson', 1, 'gatto', 0], ['Darwin Watterson', 1, 'pesce', 0], ['Anais Watterson', 2, 'coniglio', 0],
      ['Nicole Watterson', 2, 'gatto', 0], ['Richard Watterson', 2, 'coniglio', 0],
    ],
    'Adventure Time': [['Finn', 1, '', 0], ['Jake', 1, 'cane', 0], ['BMO', 2, '', 0], ['Marceline', 2, '', 0], ['Re Ghiaccio', 2, '', 0]],
    Bluey: [
      ['Bluey', 1, 'cane', 2018], ['Bingo', 1, 'cane', 2018], ['Bandit', 1, 'cane', 2018], ['Chilli', 1, 'cane', 2018],
      ['Muffin', 2, 'cane', 2018], ['Socks', 3, 'cane', 2018], ['Lucky', 3, 'cane', 2018], ['Rusty', 3, 'cane', 2018], ['Honey', 3, 'cane', 2018],
    ],
    'Masha e Orso': [['Masha', 1, '', 2009]],
    'La Pimpa': [['Pimpa', 1, 'cane', 0], ['Armando', 2, '', 0]],
    Calimero: [['Calimero', 1, 'pulcino', 1963], ['Priscilla', 3, 'pulcino', 0]],
    'Phineas e Ferb': [
      ['Phineas Flynn', 1, '', 2007], ['Ferb Fletcher', 1, '', 2007], ['Candace Flynn', 2, '', 2007], ['Perry l\'ornitorinco', 1, 'ornitorinco', 2007],
      ['Isabella Garcia-Shapiro', 3, '', 2007], ['Dottor Doofenshmirtz', 2, '', 2007], ['Baljeet', 3, '', 2007], ['Buford', 3, '', 2007],
    ],
    'Il laboratorio di Dexter': [['Dexter', 1, '', 1996], ['Dee Dee', 2, '', 1996], ['Mandark', 3, '', 0]],
    'Le Superchicche': [['Professor Utonio', 2, '', 1998], ['Mojo Jojo', 2, '', 1998]],
    'Avatar - La leggenda di Aang': [
      ['Aang', 1, '', 2005], ['Katara', 1, '', 2005], ['Sokka', 2, '', 2005], ['Toph', 2, '', 2005], ['Zuko', 1, '', 2005],
      ['Iroh', 2, '', 2005], ['Azula', 2, '', 2005], ['Appa', 2, 'bisonte volante', 2005], ['Momo', 2, 'lemure volante', 2005],
    ],
    'Due fantagenitori': [['Timmy Turner', 1, '', 0], ['Cosmo', 1, '', 0], ['Wanda', 1, '', 0], ['Vicky', 2, '', 0]],
    'Dora l\'esploratrice': [['Dora', 1, '', 2000], ['Boots', 2, 'scimmia', 2000]],
    Rugrats: [['Tommy Pickles', 1, '', 1991], ['Chuckie Finster', 2, '', 1991], ['Angelica Pickles', 2, '', 1991]],
    'PAW Patrol': [
      ['Ryder', 1, '', 2013], ['Chase', 1, 'cane', 2013], ['Marshall', 1, 'cane', 2013], ['Zuma', 2, 'cane', 2013],
      ['Rubble', 2, 'cane', 2013], ['Skye', 2, 'cane', 2013],
    ],
    'Il trenino Thomas': [['Thomas', 1, '', 0], ['Percy', 2, '', 0], ['Gordon', 2, '', 0]],
    Pocoyo: [['Pocoyo', 1, '', 2005], ['Elly', 2, 'elefante', 2005], ['Pato', 2, 'anatra', 2005], ['Loula', 3, 'cane', 2005]],
    'Oggy e i maledetti scarafaggi': [['Oggy', 2, 'gatto', 1998], ['Joey', 3, '', 1998], ['Marky', 3, '', 1998]],
    Miraculous: [['Ladybug', 1, '', 2015], ['Chat Noir', 1, '', 2015], ['Papillon', 2, '', 2015], ['Tikki', 2, '', 2015], ['Plagg', 2, '', 2015], ['Alya', 3, '', 2015]],
    'Totally Spies!': [['Clover', 3, '', 2001]],
    'Tartarughe Ninja': [['Splinter', 2, '', 0], ['April O\'Neil', 2, '', 0]],
    'He-Man e i dominatori dell\'universo': [['He-Man', 1, '', 1983], ['Skeletor', 1, '', 1983], ['Orko', 3, '', 1983], ['Teela', 3, '', 1983]],
    Barbapapà: [['Barbamamma', 2, '', 0], ['Barbabravo', 3, '', 0], ['Barbalalla', 3, '', 0]],
  };
  const charItems = [];
  for (const [serie, rows] of Object.entries(CH)) {
    for (const [name, d, specie, anno] of rows) {
      const o = { name, d, serie };
      if (SERIE_ALT[serie]) o.serieAlt = SERIE_ALT[serie];
      if (specie) o.specie = specie;
      if (anno) o.anno = anno;
      charItems.push(o);
    }
  }

  // ---------- Tabella «luoghi e oggetti» ----------
  const lugRows = [
    ['Springfield', 1, 'I Simpson'], ['Centrale nucleare di Springfield', 1, 'I Simpson'], ['Birra Duff', 2, 'I Simpson'],
    ['742 Evergreen Terrace', 3, 'I Simpson'], ['Bikini Bottom', 1, 'SpongeBob'], ['Krusty Krab', 1, 'SpongeBob'],
    ['Chum Bucket', 2, 'SpongeBob'], ['Quahog', 2, 'I Griffin'], ['Pawtucket Brewery', 3, 'I Griffin'], ['New New York', 2, 'Futurama'],
    ['Planet Express', 2, 'Futurama'], ['Slurm', 3, 'Futurama'], ['Alfea', 1, 'Winx Club'], ['Magix', 2, 'Winx Club'],
    ['Fonterossa', 2, 'Winx Club'], ['Torre Nuvola', 2, 'Winx Club'], ['Acme', 2, 'Looney Tunes'], ['Parco di Jellystone', 3, 'Yoghi e Bubu'],
    ['Mystery Machine', 1, 'Scooby-Doo'], ['Omnitrix', 1, 'Ben 10'], ['Elmore', 2, 'Lo straordinario mondo di Gumball'],
    ['Bedrock', 1, 'Gli Antenati'], ['Townsville', 3, 'Le Superchicche'], ['Ooo', 3, 'Adventure Time'], ['Danville', 3, 'Phineas e Ferb'],
    ['Ba Sing Se', 3, 'Avatar - La leggenda di Aang'],
  ];
  const lugItems = lugRows.map(([name, d, serie]) => {
    const o = { name, d, serie };
    if (SERIE_ALT[serie]) o.serieAlt = SERIE_ALT[serie];
    return o;
  });

  // ---------- Quiz a scelta multipla ----------
  const Q = (q, a, wrong, d) => ({ q, a, wrong, d });
  const quiz = [
    Q('Come si chiama la città in cui vivono i Simpson?', 'Springfield', ['Quahog', 'Bedrock', 'Townsville'], 1),
    Q('Di che colore è la pelle dei Simpson?', 'Gialla', ['Blu', 'Verde', 'Rosa'], 1),
    Q('Dove lavora Homer Simpson?', 'In una centrale nucleare', ['In una scuola', 'In un ospedale', 'In un negozio di fumetti'], 1),
    Q('Che cosa ama mangiare Homer Simpson?', 'Ciambelle', ['Sushi', 'Insalata', 'Broccoli'], 1),
    Q('Come si chiama il padrone della centrale nucleare di Springfield?', 'Montgomery Burns', ['Ned Flanders', 'Krusty il Clown', 'Apu'], 1),
    Q('Quale strumento suona Lisa Simpson?', 'Il sassofono', ['Il violino', 'La chitarra', 'La tromba'], 1),
    Q('Chi ha creato I Simpson?', 'Matt Groening', ['Seth MacFarlane', 'Stephen Hillenburg', 'Craig McCracken'], 1),
    Q('Dove vive SpongeBob?', 'In un ananas', ['In una conchiglia', 'In un sasso', 'In una testa dell\'Isola di Pasqua'], 1),
    Q('Che cosa prepara SpongeBob al Krusty Krab?', 'Hamburger', ['Pizze', 'Gelati', 'Sushi'], 1),
    Q('Chi è il migliore amico di SpongeBob?', 'Patrick Stella', ['Squiddi', 'Plankton', 'Sandy'], 1),
    Q('Chi cerca di rubare la ricetta segreta del Krusty Krab?', 'Plankton', ['Squiddi', 'Sandy', 'Patrick'], 1),
    Q('Da quale stato americano viene lo scoiattolo Sandy Cheeks?', 'Texas', ['California', 'Florida', 'Alaska'], 2),
    Q('Che animale è Gary, l\'animale domestico di SpongeBob?', 'Una lumaca', ['Un pesce', 'Un granchio', 'Un riccio'], 2),
    Q('Come si chiama il cane parlante della famiglia Griffin?', 'Brian', ['Stewie', 'Cleveland', 'Quagmire'], 1),
    Q('In quale città vivono i Griffin?', 'Quahog', ['Springfield', 'Bikini Bottom', 'Elmore'], 2),
    Q('Chi ha creato I Griffin?', 'Seth MacFarlane', ['Matt Groening', 'Trey Parker', 'Genndy Tartakovsky'], 2),
    Q('In Futurama, chi viene scongelato dopo mille anni?', 'Fry', ['Bender', 'Leela', 'Zoidberg'], 1),
    Q('Che cos\'è Bender, in Futurama?', 'Un robot', ['Un alieno', 'Un mutante', 'Un cane parlante'], 1),
    Q('Quanti occhi ha Leela, in Futurama?', 'Uno', ['Due', 'Tre', 'Quattro'], 1),
    Q('Come si chiama l\'azienda di consegne di Futurama?', 'Planet Express', ['Acme', 'Duff', 'Slurm'], 2),
    Q('Che cosa dice Bugs Bunny sgranocchiando una carota (in originale)?', '«What\'s up, Doc?»', ['«Yabba Dabba Doo!»', '«Jinkies!»', '«Cowabunga!»'], 1),
    Q('Quale azienda fornisce i gadget a Willy il Coyote?', 'Acme', ['Duff', 'Slurm', 'Wayne'], 1),
    Q('Chi insegue sempre Titti?', 'Il Gatto Silvestro', ['Tom', 'Willy il Coyote', 'Spike'], 1),
    Q('Con quale frase finiscono tradizionalmente i Looney Tunes (in originale)?', '«That\'s all, folks!»', ['«See you later, alligator!»', '«Game over!»', '«Yabba Dabba Doo!»'], 1),
    Q('Quale personaggio dei Looney Tunes si muove come un tornado?', 'Taz', ['Speedy Gonzales', 'Porky Pig', 'Daffy Duck'], 2),
    Q('Di quale paese è originario il topo Speedy Gonzales?', 'Messico', ['Spagna', 'Argentina', 'Brasile'], 2),
    Q('Che animale è Pepé Le Pew?', 'Una puzzola', ['Un gatto', 'Una volpe', 'Un procione'], 2),
    Q('Che animale è Titti?', 'Un canarino', ['Un pulcino', 'Un passero', 'Un pappagallo'], 1),
    Q('Chi sono Tom e Jerry?', 'Un gatto e un topo', ['Un cane e un gatto', 'Una volpe e una gallina', 'Un topo e un cane'], 1),
    Q('Chi ha creato Tom & Jerry?', 'Hanna e Barbera', ['Walt Disney', 'Matt Groening', 'Peyo'], 2),
    Q('Come si chiama il bulldog che minaccia Tom?', 'Spike', ['Butch', 'Scooby', 'Pluto'], 2),
    Q('Di che razza è Scooby-Doo?', 'Alano', ['Dalmata', 'Labrador', 'Pastore tedesco'], 2),
    Q('Come si chiama il furgone della banda di Scooby-Doo?', 'Mystery Machine', ['Batmobile', 'Magic Bus', 'Time Machine'], 1),
    Q('Chi è il migliore amico di Scooby-Doo?', 'Shaggy', ['Fred', 'Daphne', 'Velma'], 1),
    Q('Quale personaggio di Scooby-Doo porta gli occhiali e li perde spesso?', 'Velma', ['Daphne', 'Fred', 'Shaggy'], 2),
    Q('In quale città vivono gli Antenati?', 'Bedrock', ['Springfield', 'Quahog', 'Townsville'], 1),
    Q('Come si chiama la figlia di Fred e Wilma Flintstone?', 'Pebbles', ['Betty', 'Bamm-Bamm', 'Dino'], 1),
    Q('Qual è il grido di Fred Flintstone?', '«Yabba Dabba Doo!»', ['«Eat my shorts!»', '«Jinkies!»', '«Cowabunga!»'], 1),
    Q('Come si chiama il dinosauro domestico degli Antenati?', 'Dino', ['Rex', 'Sparky', 'Scooby'], 1),
    Q('Di che colore sono i Puffi?', 'Blu', ['Verde', 'Rosso', 'Giallo'], 1),
    Q('Come si chiama il mago cattivo dei Puffi?', 'Gargamella', ['Skeletor', 'Vilgax', 'Mojo Jojo'], 1),
    Q('Quanto sono alti i Puffi?', 'Tre mele', ['Una mela', 'Cinque mele', 'Dieci mele'], 1),
    Q('Chi ha creato i Puffi?', 'Peyo', ['Hergé', 'Uderzo', 'Altan'], 2),
    Q('Che cosa ama fare Peppa Pig?', 'Saltare nelle pozzanghere di fango', ['Nuotare nel mare', 'Costruire castelli di sabbia', 'Guidare il trattore'], 1),
    Q('Come si chiama il fratellino di Peppa Pig?', 'George', ['Pedro', 'Danny', 'Freddy'], 1),
    Q('Qual è il giocattolo preferito di George, il fratellino di Peppa?', 'Il Signor Dinosauro', ['Un orsacchiotto', 'Un trenino', 'Un pallone'], 2),
    Q('Come si chiama la scuola delle fate in Winx Club?', 'Alfea', ['Fonterossa', 'Torre Nuvola', 'Magix'], 2),
    Q('Quale fata di Winx Club ha il potere della Fiamma del Drago?', 'Bloom', ['Stella', 'Flora', 'Musa'], 1),
    Q('Chi ha creato Winx Club?', 'Iginio Straffi', ['Bruno Bozzetto', 'Altan', 'Osvaldo Cavandoli'], 2),
    Q('Come si chiama il dispositivo che trasforma Ben in alieno?', 'Omnitrix', ['Pokédex', 'Digivice', 'Cubo di Rubik'], 1),
    Q('Come si chiama la cugina di Ben in Ben 10?', 'Gwen', ['Kevin', 'Max', 'Julie'], 1),
    Q('Che animale è Gumball Watterson?', 'Un gatto', ['Un cane', 'Un coniglio', 'Un pesce'], 1),
    Q('Che animale è Darwin, il fratello adottivo di Gumball?', 'Un pesce', ['Un gatto', 'Una rana', 'Una tartaruga'], 1),
    Q('Chi sono Finn e Jake, in Adventure Time?', 'Un umano e un cane magico', ['Due cani', 'Due robot', 'Due principi'], 1),
    Q('Di che razza è Bluey?', 'Cane da bestiame australiano', ['Labrador', 'Beagle', 'Barboncino'], 2),
    Q('In quale paese è nato il cartone Bluey?', 'Australia', ['Regno Unito', 'Stati Uniti', 'Nuova Zelanda'], 2),
    Q('Chi è il compagno principale di Masha?', 'Un orso', ['Una volpe', 'Un cane', 'Un coniglio'], 1),
    Q('Di che colore sono le macchie della Pimpa?', 'Rosse', ['Blu', 'Verdi', 'Gialle'], 1),
    Q('Che cosa porta sulla testa Calimero?', 'Mezzo guscio d\'uovo', ['Un cappello', 'Una corona', 'Un fiocco'], 1),
    Q('Quale frase è tipica di Calimero?', '«Eh, ma è un\'ingiustizia però!»', ['«Che bello!»', '«Sono pronto!»', '«Possiamo farcela!»'], 2),
    Q('Che animale è Perry di Phineas e Ferb?', 'Un ornitorinco', ['Un castoro', 'Un tasso', 'Una lontra'], 1),
    Q('Qual è il cibo preferito delle Tartarughe Ninja?', 'La pizza', ['Il sushi', 'L\'hamburger', 'Il gelato'], 1),
    Q('Come si chiama il bisonte volante di Aang?', 'Appa', ['Momo', 'Zuko', 'Iroh'], 2),
    Q('Quale cucciolo della PAW Patrol fa il poliziotto?', 'Chase', ['Marshall', 'Rubble', 'Zuma'], 1),
    Q('Quale cucciolo della PAW Patrol è un pompiere?', 'Marshall', ['Chase', 'Skye', 'Rocky'], 1),
    Q('Con quale frase He-Man si trasforma?', '«Per il potere di Grayskull!»', ['«Per il potere del Sole!»', '«Trasformazione!»', '«Forza Leone!»'], 2),
    Q('Che cos\'è Zoidberg in Futurama?', 'Un decapodiano, simile a un\'aragosta', ['Una medusa', 'Un polpo', 'Un robot'], 3),
    Q('Quale emittente trasmette Bluey nel paese d\'origine?', 'ABC Kids', ['Nickelodeon', 'Disney Channel', 'Cartoon Network'], 3),
    Q('Come si chiama lo scoiattolo scienziato di SpongeBob?', 'Sandy Cheeks', ['Plankton', 'Squiddi', 'Patrick'], 2),
    Q('Quale famiglia ha un cane di nome Piccolo Aiutante di Babbo Natale?', 'I Simpson', ['I Griffin', 'Gli Antenati', 'I Puffi'], 3),
  ];

  // ---------- Vero o falso ----------
  const T = (q, d) => ({ q, a: true, d });
  const F = (q, why, d) => ({ q, a: false, d, why });
  const tf = [
    T('I Simpson sono ambientati nella città di Springfield.', 1),
    T('Bart Simpson ha dieci anni.', 2),
    T('Lisa Simpson suona il sassofono.', 1),
    T('SpongeBob vive in un ananas.', 1),
    T('Patrick Stella è una stella marina.', 1),
    T('Brian è il cane dei Griffin.', 1),
    T('Bender, di Futurama, è un robot.', 1),
    T('Fred Flintstone urla «Yabba Dabba Doo!».', 1),
    T('I Puffi sono alti tre mele.', 1),
    T('Winx Club è stato creato in Italia.', 2),
    T('Bluey è un cartone animato australiano.', 2),
    T('La Pimpa è una cagnolina bianca a macchie rosse.', 1),
    T('Calimero è un pulcino nero.', 1),
    T('Tom è un gatto e Jerry è un topo.', 1),
    T('Scooby-Doo è un alano.', 2),
    T('Gumball è un gatto blu.', 1),
    T('Peppa Pig è una maialina.', 1),
    T('Masha e Orso è un cartone di origine russa.', 1),
    T('Gli Antenati è stato il primo cartone animato in prima serata della TV americana.', 3),
    T('Ryder è il bambino che guida la PAW Patrol.', 2),
    F('Gli Antenati è ambientato a Springfield.', 'È ambientato a Bedrock; Springfield è la città dei Simpson.', 1),
    F('Homer Simpson lavora in una scuola.', 'Lavora nella centrale nucleare di Springfield.', 1),
    F('SpongeBob è un granchio.', 'SpongeBob è una spugna di mare.', 1),
    F('Il Gatto Silvestro insegue il topo Jerry.', 'Silvestro insegue Titti; Jerry è inseguito da Tom.', 1),
    F('I Puffi sono verdi.', 'I Puffi sono blu.', 1),
    F('Peppa Pig è un cartone animato americano.', 'Peppa Pig è britannico.', 2),
    F('Winx Club è un cartone animato giapponese.', 'Winx Club è italiano, creato da Iginio Straffi.', 2),
    F('Bluey è un gatto.', 'Bluey è una cagnolina.', 1),
    F('Calimero è un pulcino rosso.', 'Calimero è un pulcino nero.', 1),
    F('Scooby-Doo è nato negli anni Novanta.', 'Scooby-Doo debuttò nel 1969.', 2),
    F('Leela di Futurama ha tre occhi.', 'Leela ha un occhio solo.', 2),
    F('Tom e Jerry sono stati creati da Walt Disney.', 'Furono creati da Hanna e Barbera.', 2),
    F('In Ben 10 il dispositivo che trasforma Ben si chiama Pokédex.', 'Si chiama Omnitrix.', 1),
    F('Lo straordinario mondo di Gumball è un cartone giapponese.', 'È una produzione britannica.', 2),
    F('Willy il Coyote usa i gadget dell\'azienda Duff.', 'I gadget sono dell\'azienda Acme.', 2),
    F('Bart Simpson ha otto anni.', 'Bart ha dieci anni; otto sono quelli di Lisa.', 2),
    F('Marge Simpson ha i capelli rossi.', 'Marge ha i capelli blu.', 2),
    F('Peter Griffin vive a Springfield.', 'I Griffin vivono a Quahog.', 2),
  ];

  // ---------- Citazioni, emoji, ordine, numeri, scrivi ----------
  const quotes = [
    ['Eh, ma è un\'ingiustizia però!', 'Calimero', 1], ['Yabba Dabba Doo!', 'Fred Flintstone', 1], ['D\'oh!', 'Homer Simpson', 1],
    ['What\'s up, Doc?', 'Bugs Bunny', 1], ['Sufferin\' succotash!', 'Gatto Silvestro', 3], ['Beep beep!', 'Beep Beep', 1],
    ['Jinkies!', 'Velma', 2], ['Zoinks!', 'Shaggy', 2], ['Scooby-Dooby-Doo!', 'Scooby-Doo', 1],
    ['Ferb, ho capito cosa faremo oggi!', 'Phineas', 1], ['Perry l\'ornitorinco?!', 'Dottor Doofenshmirtz', 2],
    ['Per il potere di Grayskull!', 'He-Man', 1], ['Possiamo farcela!', 'Bob Aggiustatutto', 1],
    ['Sono più furbo dell\'orso medio!', 'Yoghi', 2], ['Sono pronto!', 'SpongeBob', 1], ['Eccellente...', 'Montgomery Burns', 2],
  ].map(([text, who, d]) => ({ text, who, d }));

  const emojis = [
    ['🐭🐱🏃', 'Tom & Jerry', 1], ['🍩🟡🏭', 'I Simpson', 1], ['🧽🍍🌊', 'SpongeBob', 1], ['🐷💦🥾', 'Peppa Pig', 1],
    ['🐶🕵️👻🚐', 'Scooby-Doo', 1], ['🦴🪨🚗🦕', 'Gli Antenati', 2], ['🔵🍄🏘️', 'I Puffi', 1], ['🧚‍♀️🔥✨', 'Winx Club', 2],
    ['⌚👽💚', 'Ben 10', 2], ['🐤⬛🥚', 'Calimero', 2], ['🐻👧🍳', 'Masha e Orso', 2], ['🐶🔵🏠', 'Bluey', 2],
    ['🥕🐰💬', 'Bugs Bunny', 1], ['🐤🐈🏠', 'Titti e Gatto Silvestro', 2], ['🤖🍺🚀', 'Futurama', 2], ['🐢🍕🥷', 'Tartarughe Ninja', 1],
    ['🐕‍🦺🚒🚓', 'PAW Patrol', 1], ['🐞🐈‍⬛', 'Miraculous', 2], ['🐻🧺🌲', 'Yoghi e Bubu', 2], ['👧👧👧💥', 'Le Superchicche', 2],
    ['🐶🐱🧑‍🚀', 'Gumball', 3], ['🏴‍☠️🐶', 'Dottor Doofenshmirtz', 3],
  ].map(([emoji, answer, d]) => ({ emoji, answer, d })).filter((e) => e.answer !== 'Gumball' && e.answer !== 'Dottor Doofenshmirtz');

  const O = (q, items, d) => ({ q, items, d });
  const order = [
    O('Metti in ordine di inizio questi cartoni, dal più vecchio', ['Tom & Jerry', 'Gli Antenati', 'I Simpson', 'SpongeBob', 'Peppa Pig'], 1),
    O('Metti in ordine di inizio questi cartoni, dal più vecchio', ['Looney Tunes', 'Scooby-Doo', 'I Simpson', 'Ben 10', 'Bluey'], 2),
    O('Metti in ordine di debutto questi personaggi dei Looney Tunes, dal primo', ['Porky Pig', 'Bugs Bunny', 'Titti', 'Gatto Silvestro', 'Willy il Coyote'], 3),
    O('Metti in ordine di età i membri della famiglia Simpson, dal più piccolo', ['Maggie', 'Lisa', 'Bart', 'Marge', 'Homer'], 2),
    O('Metti in ordine di inizio questi cartoni di Cartoon Network, dal più vecchio', ['Il laboratorio di Dexter', 'Le Superchicche', 'Ben 10', 'Adventure Time', 'Lo straordinario mondo di Gumball'], 3),
    O('Metti in ordine di inizio questi cartoni di Nickelodeon, dal più vecchio', ['Rugrats', 'Hey Arnold!', 'SpongeBob', 'Dora l\'esploratrice', 'Avatar - La leggenda di Aang'], 3),
    O('Metti in ordine di inizio questi cartoni di Hanna e Barbera, dal più vecchio', ['Gli Antenati', 'Yoghi e Bubu', 'I Pronipoti', 'Scooby-Doo'], 3),
  ];

  const N = (q, v, min, max, tol, unit, d) => ({ q, v, min, max, tol, unit, d });
  const numbers = [
    N('Quanti anni ha Bart Simpson?', 10, 3, 30, 0, 'anni', 1),
    N('Quanti anni ha Lisa Simpson?', 8, 3, 30, 0, 'anni', 2),
    N('Quanti anni passa Fry congelato prima di svegliarsi nel futuro, in Futurama?', 1000, 100, 2000, 50, 'anni', 2),
    N('Quanti sono i protagonisti di Scooby-Doo, Scooby compreso?', 5, 2, 10, 0, 'personaggi', 1),
    N('Quante dita ha ogni mano dei personaggi dei Simpson?', 4, 2, 8, 0, 'dita', 2),
    N('Quanti Oscar ha vinto la serie Tom & Jerry?', 7, 1, 15, 0, 'Oscar', 3),
    N('Quante sono le Tartarughe Ninja?', 4, 2, 8, 0, 'tartarughe', 1),
    N('Quanti elementi domina l\'Avatar in Avatar - La leggenda di Aang?', 4, 2, 8, 0, 'elementi', 1),
    N('Quanti anni ha Peppa Pig?', 4, 1, 10, 0, 'anni', 3),
    N('Quanti anni ha Bluey?', 6, 2, 12, 0, 'anni', 2),
    N('Quanti anni ha Gumball Watterson?', 12, 6, 20, 0, 'anni', 3),
    N('Quanti figli hanno Homer e Marge Simpson?', 3, 1, 8, 0, 'figli', 1),
  ];

  const W = (q, a, accept, d) => ({ q, a, accept, d });
  const typed = [
    W('Come si chiama la moglie di Homer Simpson?', 'Marge', ['Marge Simpson'], 1),
    W('Come si chiama la città dei Simpson?', 'Springfield', [], 1),
    W('Come si chiama il migliore amico di SpongeBob?', 'Patrick', ['Patrick Stella', 'Patrick Star'], 1),
    W('Chi è il nemico di SpongeBob che vuole la ricetta segreta?', 'Plankton', [], 1),
    W('Come si chiama il cane parlante dei Griffin?', 'Brian', ['Brian Griffin'], 1),
    W('Come si chiama il robot più famoso di Futurama?', 'Bender', [], 1),
    W('Come si chiama il mago nemico dei Puffi?', 'Gargamella', [], 1),
    W('Chi ha creato i Puffi?', 'Peyo', ['Pierre Culliford'], 2),
    W('Come si chiama il canarino giallo dei Looney Tunes?', 'Titti', [], 1),
    W('Chi insegue Titti?', 'Gatto Silvestro', ['Silvestro'], 1),
    W('Come si chiama il coniglio più famoso dei Looney Tunes?', 'Bugs Bunny', ['Bugs'], 1),
    W('Quale azienda fornisce i gadget a Willy il Coyote?', 'Acme', [], 1),
    W('Come si chiama il topo che batte sempre Tom?', 'Jerry', [], 1),
    W('Come si chiama il bulldog di Tom & Jerry?', 'Spike', [], 2),
    W('Come si chiama il padrone di Scooby-Doo?', 'Shaggy', ['Shaggy Rogers'], 1),
    W('Come si chiama il furgone della banda di Scooby-Doo?', 'Mystery Machine', [], 1),
    W('Come si chiama il capofamiglia degli Antenati?', 'Fred', ['Fred Flintstone'], 1),
    W('In quale città vivono gli Antenati?', 'Bedrock', [], 1),
    W('Come si chiama la figlia di Fred e Wilma?', 'Pebbles', [], 1),
    W('Come si chiama la protagonista di Winx Club?', 'Bloom', [], 1),
    W('Come si chiama la scuola delle fate in Winx Club?', 'Alfea', [], 2),
    W('Come si chiama il dispositivo di Ben 10?', 'Omnitrix', [], 1),
    W('Come si chiama la cugina di Ben?', 'Gwen', ['Gwen Tennyson'], 1),
    W('Come si chiama l\'umano protagonista di Adventure Time?', 'Finn', ['Finn l\'umano'], 1),
    W('Come si chiama la sorellina di Bluey?', 'Bingo', [], 1),
    W('Chi ha creato La Pimpa?', 'Altan', ['Francesco Tullio Altan', 'Tullio Altan'], 2),
    W('Come si chiama l\'amico umano della Pimpa?', 'Armando', [], 3),
    W('Come si chiama l\'ornitorinco di Phineas e Ferb?', 'Perry', ['Perry l\'ornitorinco'], 1),
    W('Come si chiama il cucciolo poliziotto della PAW Patrol?', 'Chase', [], 1),
    W('Come si chiama il bisonte volante di Aang?', 'Appa', [], 2),
    W('Come si chiama il nemico di He-Man?', 'Skeletor', [], 1),
    W('Come si chiama il cattivo di Miraculous?', 'Papillon', [], 2),
  ];

  (D.pop = D.pop || []).push({
    id: 'cartoni',
    name: 'Cartoni animati',
    emoji: '📺',
    color: '#be185d',
    description: 'I Simpson, SpongeBob, Looney Tunes, Peppa Pig, Winx, Bluey e tanti altri cartoni TV',
    quiz,
    tf,
    tables: [
      {
        id: 'serie',
        items: serieItems,
        fields: {
          paese: {
            ask: 'In quale paese è nato il cartone animato {name}?',
            who: 'Quale di questi cartoni è nato in questo paese: {value}?',
            tf: 'Paese d\'origine del cartone {name}: {value}.',
            odd: 'Quale di questi cartoni NON è nato in questo paese: {value}?',
            typed: true,
          },
          creatore: {
            ask: 'Chi ha creato il cartone animato {name}?',
            who: 'Quale di questi cartoni è stato creato da {value}?',
            tf: 'Il cartone animato {name} è stato creato da {value}.',
            odd: 'Quale di questi cartoni NON è stato creato da {value}?',
            typed: true,
          },
          rete: {
            ask: 'Su quale canale è andato in onda per la prima volta il cartone {name}?',
            who: 'Quale di questi cartoni è andato in onda per la prima volta su {value}?',
            tf: 'Il cartone {name} è andato in onda per la prima volta su {value}.',
            odd: 'Quale di questi cartoni NON è andato in onda per la prima volta su {value}?',
            typed: true,
          },
        },
        numeric: {
          anno: {
            ask: 'In che anno è iniziato il cartone animato {name}?',
            span: 30, tol: 1, format: 'year', duel: 'Quale cartone è iniziato prima?', lowerWins: true,
            order: 'Metti in ordine di inizio, dal più vecchio', gap: 2,
          },
        },
      },
      {
        id: 'personaggi',
        items: charItems,
        fields: {
          serie: {
            ask: 'In quale cartone animato compare {name}?',
            who: 'Quale di questi personaggi compare nel cartone «{value}»?',
            tf: '{name} compare nel cartone «{value}».',
            odd: 'Quale di questi personaggi NON compare nel cartone «{value}»?',
            typed: true,
          },
          specie: {
            ask: 'Che tipo di creatura è {name}?',
            who: 'Quale di questi personaggi è di questa specie: {value}?',
            tf: 'Specie di {name}: {value}.',
            odd: 'Quale di questi personaggi NON è di questa specie: {value}?',
            typed: true,
          },
        },
        numeric: {
          anno: {
            ask: 'In che anno compare per la prima volta {name}?',
            span: 30, tol: 1, format: 'year', duel: 'Quale personaggio è comparso prima?', lowerWins: true,
            order: 'Metti in ordine di prima apparizione, dal primo', gap: 2,
          },
        },
      },
      {
        id: 'luoghi',
        items: lugItems,
        fields: {
          serie: {
            ask: 'In quale cartone animato si trova (o compare) {name}?',
            who: 'Quale di questi luoghi o oggetti appartiene al cartone «{value}»?',
            tf: '{name} appartiene al cartone «{value}».',
            odd: 'Quale di questi NON appartiene al cartone «{value}»?',
            typed: true,
          },
        },
      },
      {
        id: 'winx',
        items: [
          { name: 'Bloom', d: 1, potere: 'Fiamma del Drago' }, { name: 'Stella', d: 1, potere: 'Sole e Luna' },
          { name: 'Flora', d: 1, potere: 'Natura' }, { name: 'Musa', d: 1, potere: 'Musica' },
          { name: 'Tecna', d: 1, potere: 'Tecnologia' }, { name: 'Icy', d: 2, potere: 'Ghiaccio' },
          { name: 'Stormy', d: 3, potere: 'Tempesta' },
        ],
        fields: {
          potere: {
            ask: 'Quale potere ha {name} in Winx Club?',
            who: 'Quale personaggio di Winx Club ha questo potere: {value}?',
            tf: 'In Winx Club il potere di {name} è: {value}.',
          },
        },
      },
      {
        id: 'pawpatrol',
        items: [
          { name: 'Chase', d: 1, compito: 'polizia' }, { name: 'Marshall', d: 1, compito: 'incendi' },
          { name: 'Skye', d: 2, compito: 'volo' }, { name: 'Rubble', d: 2, compito: 'costruzioni' },
          { name: 'Zuma', d: 2, compito: 'soccorso in acqua' }, { name: 'Rocky', d: 3, compito: 'riciclo' },
        ],
        fields: {
          compito: {
            ask: 'Di che cosa si occupa {name} nella PAW Patrol?',
            who: 'Quale cucciolo della PAW Patrol si occupa di questo: {value}?',
            tf: 'Nella PAW Patrol, {name} si occupa di: {value}.',
          },
        },
      },
      {
        id: 'avatar',
        items: [
          { name: 'Aang', d: 1, popolo: 'Nomadi dell\'Aria' }, { name: 'Katara', d: 1, popolo: 'Tribù dell\'Acqua' },
          { name: 'Sokka', d: 2, popolo: 'Tribù dell\'Acqua' }, { name: 'Toph', d: 2, popolo: 'Regno della Terra' },
          { name: 'Zuko', d: 1, popolo: 'Nazione del Fuoco' }, { name: 'Iroh', d: 2, popolo: 'Nazione del Fuoco' },
          { name: 'Azula', d: 2, popolo: 'Nazione del Fuoco' },
        ],
        fields: {
          popolo: {
            ask: 'A quale popolo appartiene {name} in Avatar - La leggenda di Aang?',
            who: 'Quale personaggio di Avatar appartiene a questo popolo: {value}?',
            tf: 'In Avatar - La leggenda di Aang, {name} appartiene a questo popolo: {value}.',
            odd: 'Quale personaggio di Avatar NON appartiene a questo popolo: {value}?',
          },
        },
      },
      {
        id: 'tartarughe',
        items: [
          { name: 'Leonardo', d: 1, colore: 'blu' }, { name: 'Raffaello', d: 1, colore: 'rosso' },
          { name: 'Donatello', d: 1, colore: 'viola' }, { name: 'Michelangelo', d: 1, colore: 'arancione' },
        ],
        fields: {
          colore: {
            ask: 'Di che colore è la maschera di {name}, tartaruga ninja?',
            who: 'Quale tartaruga ninja ha la maschera di questo colore: {value}?',
            tf: 'La maschera di {name}, tartaruga ninja, è di colore {value}.',
          },
        },
      },
    ],
    quotes,
    quoteText: 'Quale personaggio dice questa frase?',
    emojis,
    emojiText: 'Quale cartone animato (o personaggio) raccontano queste emoji?',
    order,
    numbers,
    typed,
  });
})(typeof window !== 'undefined' ? window : globalThis);
