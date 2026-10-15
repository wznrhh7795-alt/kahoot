// Categoria «Videogiochi» per Quizzone! — domande in italiano, fatti verificati.
// Formato: public/data/POP-FORMAT.md · controllo: node scripts/check-pop.js public/data/pop-videogiochi.js
(function (root) {
  'use strict';
  const D = (root.QZ_DATA = root.QZ_DATA || {});

  // ---------- Tabella «console» (hardware) ----------
  // Anno = primo lancio commerciale (di solito in Giappone). tipo: s = da salotto, p = portatile (omesso se ibrida/computer).
  const CONSOLE_TIPO = { s: 'console da salotto', p: 'console portatile' };
  const CONSOLE_ALT = {
    Sony: ['Sony Computer Entertainment', 'Sony Interactive Entertainment'],
    Sinclair: ['Sinclair Research'],
    Valve: ['Valve Corporation'],
    Philips: ['Philips Electronics'],
    Bandai: ['Bandai Co.'],
  };
  const consoleRows = [
    // nome, d, produttore, tipo, anno
    ['Famicom (NES)', 2, 'Nintendo', 's', 1983],
    ['Game Boy', 1, 'Nintendo', 'p', 1989],
    ['Super Nintendo (SNES)', 1, 'Nintendo', 's', 1990],
    ['Nintendo 64', 1, 'Nintendo', 's', 1996],
    ['Game Boy Color', 2, 'Nintendo', 'p', 1998],
    ['Game Boy Advance', 2, 'Nintendo', 'p', 2001],
    ['Nintendo GameCube', 1, 'Nintendo', 's', 2001],
    ['Nintendo DS', 1, 'Nintendo', 'p', 2004],
    ['Wii', 1, 'Nintendo', 's', 2006],
    ['Nintendo 3DS', 2, 'Nintendo', 'p', 2011],
    ['Wii U', 2, 'Nintendo', 's', 2012],
    ['Nintendo Switch', 1, 'Nintendo', '', 2017],
    ['Nintendo Switch Lite', 2, 'Nintendo', 'p', 2019],
    ['Virtual Boy', 3, 'Nintendo', '', 1995],
    ['Nintendo Switch 2', 2, 'Nintendo', '', 2025],
    ['PlayStation', 1, 'Sony', 's', 1994],
    ['PlayStation 2', 1, 'Sony', 's', 2000],
    ['PlayStation 3', 1, 'Sony', 's', 2006],
    ['PlayStation 4', 1, 'Sony', 's', 2013],
    ['PlayStation 5', 1, 'Sony', 's', 2020],
    ['PlayStation Portable (PSP)', 2, 'Sony', 'p', 2004],
    ['PlayStation Vita', 2, 'Sony', 'p', 2011],
    ['Xbox', 1, 'Microsoft', 's', 2001],
    ['Xbox 360', 1, 'Microsoft', 's', 2005],
    ['Xbox One', 1, 'Microsoft', 's', 2013],
    ['Xbox Series X', 1, 'Microsoft', 's', 2020],
    ['Master System', 2, 'Sega', 's', 1985],
    ['Mega Drive', 1, 'Sega', 's', 1988],
    ['Game Gear', 2, 'Sega', 'p', 1990],
    ['Sega Saturn', 2, 'Sega', 's', 1994],
    ['Dreamcast', 1, 'Sega', 's', 1998],
    ['Atari 2600', 2, 'Atari', 's', 1977],
    ['Atari Lynx', 3, 'Atari', 'p', 1989],
    ['Atari Jaguar', 3, 'Atari', 's', 1993],
    ['Neo Geo', 3, 'SNK', 's', 1990],
    ['Neo Geo Pocket', 3, 'SNK', 'p', 1998],
    ['PC Engine', 3, 'NEC', 's', 1987],
    ['Intellivision', 3, 'Mattel', 's', 1979],
    ['ColecoVision', 3, 'Coleco', 's', 1982],
    ['Commodore 64', 2, 'Commodore', '', 1982],
    ['ZX Spectrum', 2, 'Sinclair', '', 1982],
    ['Steam Deck', 2, 'Valve', '', 2022],
    ['Philips CD-i', 3, 'Philips', '', 1991],
    ['Magnavox Odyssey', 3, 'Magnavox', 's', 1972],
    ['WonderSwan', 3, 'Bandai', 'p', 1999],
    ['Nokia N-Gage', 3, 'Nokia', 'p', 2003],
  ];
  const consoleItems = consoleRows.map(([name, d, casa, tipo, anno]) => {
    const o = { name, d, casa, anno };
    if (CONSOLE_ALT[casa]) o.casaAlt = CONSOLE_ALT[casa];
    if (tipo) o.tipo = CONSOLE_TIPO[tipo];
    return o;
  });

  // ---------- Tabella «giochi» ----------
  // casa = azienda che ha creato il gioco (sviluppatore/casa madre). Genere solo dove è indiscutibile.
  // Righe: [titolo, d, genere, anno di prima uscita]; genere: p platform, c corse, s sparatutto, f picchiaduro,
  // z puzzle, o sport, t strategia, r gioco di ruolo, m simulazione ('' = non indicato); anno 0 = non indicato.
  const GENERE = { p: 'platform', c: 'corse', s: 'sparatutto', f: 'picchiaduro', z: 'puzzle', o: 'sport', t: 'strategia', r: 'gioco di ruolo', m: 'simulazione' };
  const CASA_ALT = {
    'Mojang Studios': ['Mojang'], 'CD Projekt RED': ['CD Projekt', 'CD Projekt Red'], 'Electronic Arts': ['EA', 'EA Games'],
    'Square Enix': ['Square', 'Enix'], Namco: ['Bandai Namco'], 'Epic Games': ['Epic'], 'Rockstar Games': ['Rockstar'],
    'Blizzard Entertainment': ['Blizzard'], 'Santa Monica Studio': ['Santa Monica'], 'Insomniac Games': ['Insomniac'],
    'Larian Studios': ['Larian'], 'Roblox Corporation': ['Roblox'], 'Rovio Entertainment': ['Rovio'], 'Riot Games': ['Riot'],
    'Team Cherry': [], 'Bethesda Game Studios': ['Bethesda'], 'id Software': ['id'],
    'Supercell': [], 'Bungie': [], 'FromSoftware': ['From Software'], 'Naughty Dog': [],
  };
  const GAMES = {
    Nintendo: [
      ['Super Mario Bros.', 1, 'p', 1985], ['Super Mario Bros. 3', 2, 'p', 1988], ['Super Mario World', 1, 'p', 1990],
      ['Super Mario 64', 1, 'p', 1996], ['Super Mario Sunshine', 2, 'p', 2002], ['Super Mario Galaxy', 2, 'p', 2007],
      ['Super Mario Odyssey', 1, 'p', 2017], ['Super Mario Bros. Wonder', 2, 'p', 2023], ['New Super Mario Bros.', 2, 'p', 2006],
      ['Super Mario Kart', 1, 'c', 1992], ['Mario Kart Wii', 1, 'c', 2008], ['Mario Kart 8', 1, 'c', 2014],
      ['Mario Kart: Double Dash!!', 3, 'c', 2003], ['Donkey Kong', 1, 'p', 1981], ['Dr. Mario', 2, 'z', 1990],
      ['The Legend of Zelda', 1, '', 1986], ['The Legend of Zelda: Ocarina of Time', 1, '', 1998],
      ['The Legend of Zelda: Breath of the Wild', 1, '', 2017], ['The Legend of Zelda: Tears of the Kingdom', 1, '', 2023],
      ['Metroid', 2, '', 1986], ['Animal Crossing: New Horizons', 1, 'm', 2020], ['Splatoon', 2, '', 2015],
      ['Wii Sports', 1, 'o', 2006], ['Pikmin', 2, '', 2001], ['Luigi\'s Mansion', 2, '', 2001], ['Nintendogs', 2, 'm', 2005],
      ['Duck Hunt', 2, '', 1984], ['Excitebike', 3, 'c', 1984], ['Super Mario Maker', 2, 'p', 2015],
    ],
    Sega: [
      ['Sonic the Hedgehog', 1, 'p', 1991], ['Sonic the Hedgehog 2', 1, 'p', 1992], ['Sonic Adventure', 2, '', 1998],
      ['Sonic Colors', 3, '', 2010], ['Sonic Generations', 3, '', 2011], ['Sonic Frontiers', 3, '', 2022],
      ['Super Monkey Ball', 2, '', 2001], ['Shenmue', 3, '', 1999], ['Streets of Rage', 2, 'f', 1991],
      ['Virtua Fighter', 2, 'f', 1993], ['Alex Kidd in Miracle World', 3, 'p', 1986], ['Crazy Taxi', 2, '', 1999],
      ['Out Run', 2, 'c', 1986], ['Space Harrier', 3, 's', 1985], ['Golden Axe', 2, 'f', 1989], ['Altered Beast', 3, 'f', 1988],
      ['Phantasy Star', 3, 'r', 1987],
    ],
    Capcom: [
      ['Street Fighter', 2, 'f', 1987], ['Street Fighter II', 1, 'f', 1991], ['Street Fighter 6', 2, 'f', 2023],
      ['Resident Evil', 1, '', 1996], ['Resident Evil 2', 2, '', 1998], ['Resident Evil 4', 2, '', 2005],
      ['Resident Evil Village', 2, '', 2021], ['Mega Man', 1, '', 1987], ['Mega Man 2', 2, '', 1988],
      ['Monster Hunter', 2, '', 2004], ['Monster Hunter: World', 2, '', 2018], ['Monster Hunter Rise', 3, '', 2021],
      ['Devil May Cry', 2, '', 2001], ['Ghosts \'n Goblins', 3, 'p', 1985], ['Okami', 3, '', 2006],
      ['Phoenix Wright: Ace Attorney', 3, '', 2001], ['Final Fight', 3, 'f', 1989], ['Dead Rising', 3, '', 2006],
      ['Dino Crisis', 3, '', 1999], ['1942', 3, 's', 1984],
    ],
    Konami: [
      ['Metal Gear', 3, '', 1987], ['Metal Gear Solid', 1, '', 1998], ['Metal Gear Solid V: The Phantom Pain', 3, '', 2015],
      ['Castlevania', 2, 'p', 1986], ['Castlevania: Symphony of the Night', 3, '', 1997], ['Contra', 2, '', 1987],
      ['Silent Hill', 2, '', 1999], ['Silent Hill 2', 3, '', 2001], ['Pro Evolution Soccer', 1, 'o', 2001],
      ['Dance Dance Revolution', 2, '', 1998], ['Gradius', 3, 's', 1985], ['Frogger', 2, '', 1981],
    ],
    Namco: [
      ['Pac-Man', 1, '', 1980], ['Galaga', 2, 's', 1981], ['Dig Dug', 3, '', 1982], ['Xevious', 3, 's', 1983],
      ['Pole Position', 3, 'c', 1982], ['Ridge Racer', 3, 'c', 1993], ['Tekken', 1, 'f', 1994],
      ['Katamari Damacy', 3, '', 2004],
    ],
    Atari: [
      ['Pong', 1, 'o', 1972], ['Breakout', 2, '', 1976], ['Asteroids', 2, 's', 1979], ['Missile Command', 3, '', 1980],
      ['Centipede', 3, 's', 1981], ['Tempest', 3, 's', 1981],
    ],
    Taito: [
      ['Space Invaders', 1, 's', 1978], ['Bubble Bobble', 2, 'p', 1986], ['Arkanoid', 3, '', 1986],
      ['Puzzle Bobble', 3, 'z', 1994], ['Operation Wolf', 3, 's', 1987], ['The NewZealand Story', 3, 'p', 1988],
    ],
    'Rockstar Games': [
      ['Grand Theft Auto III', 1, '', 2001], ['Grand Theft Auto: Vice City', 1, '', 2002], ['Grand Theft Auto: San Andreas', 1, '', 2004],
      ['Grand Theft Auto IV', 2, '', 2008], ['Grand Theft Auto V', 1, '', 2013], ['Red Dead Redemption', 2, '', 2010],
      ['Red Dead Redemption 2', 1, '', 2018], ['Bully', 3, '', 2006],
    ],
    'Epic Games': [['Fortnite', 1, 's', 2017], ['Gears of War', 2, 's', 2006], ['Unreal Tournament', 3, 's', 1999]],
    'Mojang Studios': [['Minecraft', 1, '', 0]],
    Ubisoft: [
      ['Assassin\'s Creed', 1, '', 2007], ['Assassin\'s Creed II', 2, '', 2009], ['Assassin\'s Creed IV: Black Flag', 2, '', 2013],
      ['Assassin\'s Creed Unity', 3, '', 2014], ['Assassin\'s Creed Origins', 2, '', 2017], ['Assassin\'s Creed Odyssey', 2, '', 2018],
      ['Assassin\'s Creed Valhalla', 2, '', 2020], ['Far Cry 3', 2, 's', 2012], ['Far Cry 6', 3, 's', 2021],
      ['Just Dance', 1, '', 2009], ['Rayman', 2, 'p', 1995], ['Prince of Persia: Le sabbie del tempo', 2, '', 2003],
      ['Tom Clancy\'s Rainbow Six Siege', 2, 's', 2015], ['Watch Dogs', 2, '', 2014], ['Beyond Good & Evil', 3, '', 2003],
    ],
    'CD Projekt RED': [
      ['The Witcher', 3, 'r', 2007], ['The Witcher 2: Assassins of Kings', 3, 'r', 2011], ['The Witcher 3: Wild Hunt', 1, 'r', 2015],
      ['Cyberpunk 2077', 1, '', 2020],
    ],
    Activision: [
      ['Call of Duty', 2, 's', 2003], ['Call of Duty 4: Modern Warfare', 2, 's', 2007], ['Call of Duty: Black Ops', 1, 's', 2010],
      ['Call of Duty: Modern Warfare II', 2, 's', 2022], ['Call of Duty: Warzone', 1, 's', 2020],
      ['Call of Duty: Black Ops Cold War', 3, 's', 2020], ['Tony Hawk\'s Pro Skater', 2, 'o', 1999],
    ],
    'Electronic Arts': [
      ['FIFA International Soccer', 2, 'o', 1993], ['EA Sports FC 24', 1, 'o', 2023], ['The Sims', 1, 'm', 2000],
      ['The Sims 4', 1, 'm', 2014], ['Need for Speed', 2, 'c', 1994], ['Apex Legends', 1, 's', 2019], ['Dead Space', 3, '', 2008],
    ],
    'Blizzard Entertainment': [
      ['Warcraft: Orcs & Humans', 3, 't', 1994], ['Diablo', 2, 'r', 1996], ['StarCraft', 2, 't', 1998],
      ['Warcraft III: Reign of Chaos', 3, 't', 2002], ['World of Warcraft', 1, 'r', 2004], ['Diablo III', 2, 'r', 2012],
      ['Hearthstone', 2, '', 2014], ['Overwatch', 1, 's', 2016],
    ],
    Valve: [
      ['Half-Life', 2, 's', 1998], ['Half-Life 2', 2, 's', 2004], ['Portal', 1, 'z', 2007], ['Portal 2', 2, 'z', 2011],
      ['Team Fortress 2', 3, 's', 2007], ['Dota 2', 2, '', 0], ['Half-Life: Alyx', 3, 's', 2020],
    ],
    'Riot Games': [['League of Legends', 1, '', 2009], ['Valorant', 1, 's', 2020]],
    'Square Enix': [
      ['Final Fantasy', 2, 'r', 1987], ['Final Fantasy VI', 3, 'r', 1994], ['Final Fantasy VII', 1, 'r', 1997],
      ['Final Fantasy X', 2, 'r', 2001], ['Final Fantasy XV', 3, 'r', 2016], ['Dragon Quest', 2, 'r', 1986],
      ['Dragon Quest XI', 3, 'r', 2017], ['Kingdom Hearts', 2, 'r', 2002], ['Chrono Trigger', 3, 'r', 1995],
    ],
    FromSoftware: [
      ['Demon\'s Souls', 3, 'r', 2009], ['Dark Souls', 2, 'r', 2011], ['Bloodborne', 2, 'r', 2015],
      ['Dark Souls III', 3, 'r', 2016], ['Sekiro: Shadows Die Twice', 3, '', 2019], ['Elden Ring', 1, 'r', 2022],
    ],
    'Naughty Dog': [
      ['Jak and Daxter', 3, 'p', 2001], ['Uncharted: Drake\'s Fortune', 2, '', 2007],
      ['Uncharted 4: Fine di un ladro', 2, '', 2016], ['The Last of Us', 1, '', 2013], ['The Last of Us Part II', 2, '', 2020],
    ],
    'Bethesda Game Studios': [
      ['The Elder Scrolls III: Morrowind', 3, 'r', 2002], ['The Elder Scrolls IV: Oblivion', 2, 'r', 2006],
      ['The Elder Scrolls V: Skyrim', 1, 'r', 2011], ['Fallout 3', 2, '', 2008], ['Fallout 4', 2, '', 2015], ['Starfield', 2, '', 2023],
    ],
    'id Software': [['Wolfenstein 3D', 3, 's', 1992], ['Doom', 2, 's', 1993], ['Quake', 3, 's', 1996]],
    'Santa Monica Studio': [['God of War', 1, '', 2005], ['God of War (2018)', 1, '', 2018], ['God of War Ragnarök', 2, '', 2022]],
    'Insomniac Games': [
      ['Ratchet & Clank', 2, '', 2002], ['Marvel\'s Spider-Man', 1, '', 2018],
      ['Marvel\'s Spider-Man 2', 2, '', 2023],
    ],
    Supercell: [['Clash of Clans', 1, 't', 2012], ['Hay Day', 3, 'm', 2012], ['Clash Royale', 1, 't', 2016], ['Brawl Stars', 2, '', 0]],
    King: [['Candy Crush Saga', 1, 'z', 2012]],
    'Rovio Entertainment': [['Angry Birds', 1, 'z', 2009]],
    Innersloth: [['Among Us', 1, '', 2018]],
    'Roblox Corporation': [['Roblox', 1, '', 2006]],
    'Larian Studios': [['Baldur\'s Gate 3', 2, 'r', 0]],
    ConcernedApe: [['Stardew Valley', 2, '', 2016]],
    'Team Cherry': [['Hollow Knight', 2, '', 2017]],
    Bungie: [['Halo: Combat Evolved', 1, 's', 2001], ['Halo 3', 2, 's', 2007], ['Destiny', 3, 's', 2014]],
    // senza una casa indicata (editori/sviluppatori molteplici o storici): solo genere e anno
    '': [
      ['Tetris', 1, 'z', 1984], ['Rocket League', 1, '', 2015], ['Bejeweled', 2, 'z', 2001], ['Plants vs. Zombies', 1, 't', 2009], ['Crash Bandicoot', 1, 'p', 1996], ['Spyro the Dragon', 2, 'p', 1998], ['Gran Turismo', 2, 'c', 1997], ['Forza Horizon', 3, 'c', 2012], ['Mortal Kombat', 1, 'f', 1992],
      ['Age of Empires', 2, 't', 1997], ['Civilization', 2, 't', 1991], ['NBA 2K', 3, 'o', 1999], ['Lemmings', 3, '', 1991],
    ],
  };
  const gameItems = [];
  for (const [casa, rows] of Object.entries(GAMES)) {
    for (const [name, d, g, anno] of rows) {
      const o = { name, d };
      if (casa) { o.casa = casa; if (CASA_ALT[casa] && CASA_ALT[casa].length) o.casaAlt = CASA_ALT[casa]; }
      if (g) o.genere = GENERE[g];
      if (anno) o.anno = anno;
      gameItems.push(o);
    }
  }

  // ---------- Tabella «personaggi» ----------
  // Righe: [nome, d, ruolo, anno di prima apparizione]; ruolo: b buono, c cattivo ('' = non indicato); anno 0 = non indicato.
  const RUOLO = { b: 'buono', c: 'cattivo' };
  const SERIE_ALT = {
    'Super Mario': ['Mario', 'Super Mario Bros.'], 'The Legend of Zelda': ['Zelda'], 'Sonic the Hedgehog': ['Sonic'],
    'Grand Theft Auto': ['GTA'], 'Red Dead Redemption': ['Red Dead'], 'Final Fantasy': ['FF'], 'Metal Gear': ['Metal Gear Solid'],
    "Assassin's Creed": ['Assassins Creed', 'AC'], 'Resident Evil': ['Biohazard'], 'Street Fighter': [], 'Half-Life': [],
    'Star Fox': ['Starfox'], 'F-Zero': ['F Zero'], 'The Last of Us': ['Last of Us'], 'Crash Bandicoot': ['Crash'],
  };
  const CHARS = {
    'Super Mario': [
      ['Mario', 1, 'b', 1981], ['Luigi', 1, 'b', 1983], ['Principessa Peach', 1, 'b', 1985], ['Bowser', 1, 'c', 1985],
      ['Toad', 1, 'b', 1985], ['Yoshi', 1, 'b', 1990], ['Goomba', 2, '', 1985], ['Koopa Troopa', 3, '', 1985],
      ['Bowser Jr.', 3, 'c', 2002], ['Principessa Daisy', 3, 'b', 1989],
    ],
    'The Legend of Zelda': [
      ['Link', 1, 'b', 1986], ['Principessa Zelda', 1, 'b', 1986], ['Ganondorf', 2, 'c', 0], ['Navi', 2, '', 1998],
      ['Epona', 3, '', 1998], ['Midna', 3, '', 2006], ['Tingle', 3, '', 2000],
    ],
    'Sonic the Hedgehog': [
      ['Sonic', 1, 'b', 1991], ['Tails', 1, 'b', 1992], ['Knuckles', 2, 'b', 1994], ['Amy Rose', 2, 'b', 1993],
      ['Dr. Eggman', 1, 'c', 1991], ['Shadow the Hedgehog', 2, '', 2001],
    ],
    'Street Fighter': [
      ['Ryu', 1, 'b', 1987], ['Ken Masters', 1, 'b', 1987], ['Chun-Li', 1, 'b', 1991], ['Guile', 2, 'b', 1991],
      ['Blanka', 2, '', 1991], ['Zangief', 2, '', 1991], ['Dhalsim', 2, '', 1991], ['E. Honda', 2, '', 1991],
      ['M. Bison', 2, 'c', 1991], ['Cammy', 3, '', 1993], ['Sagat', 3, '', 1987],
    ],
    'Final Fantasy': [
      ['Cloud Strife', 1, 'b', 1997], ['Sephiroth', 1, 'c', 1997], ['Tifa Lockhart', 2, 'b', 1997],
      ['Aerith Gainsborough', 2, 'b', 1997], ['Squall Leonhart', 3, 'b', 1999], ['Tidus', 2, 'b', 2001], ['Yuna', 3, 'b', 2001],
      ['Noctis Lucis Caelum', 3, 'b', 0], ['Terra Branford', 3, 'b', 1994], ['Kefka', 3, 'c', 1994], ['Chocobo', 1, '', 1988],
    ],
    Minecraft: [
      ['Steve', 1, '', 0], ['Creeper', 1, '', 0], ['Enderman', 1, '', 0], ['Ender Dragon', 2, '', 0],
      ['Wither', 3, '', 0], ['Ghast', 3, '', 0],
    ],
    'Pac-Man': [
      ['Blinky', 1, 'c', 1980], ['Pinky', 1, 'c', 1980], ['Inky', 2, 'c', 1980], ['Clyde', 2, 'c', 1980],
    ],
    'The Witcher': [
      ['Geralt di Rivia', 1, 'b', 0], ['Yennefer di Vengerberg', 2, '', 0], ['Ciri', 2, '', 0], ['Triss Merigold', 3, '', 0],
      ['Vesemir', 3, '', 0],
    ],
    "Assassin's Creed": [
      ['Altaïr', 2, 'b', 2007], ['Desmond Miles', 3, 'b', 2007], ['Ezio Auditore', 1, 'b', 2009], ['Connor Kenway', 3, 'b', 2012],
      ['Edward Kenway', 3, '', 2013], ['Arno Dorian', 3, '', 2014], ['Bayek di Siwa', 3, 'b', 2017], ['Kassandra', 2, 'b', 2018],
      ['Eivor', 2, '', 2020],
    ],
    'Resident Evil': [
      ['Chris Redfield', 2, 'b', 1996], ['Jill Valentine', 2, 'b', 1996], ['Albert Wesker', 2, 'c', 1996],
      ['Leon S. Kennedy', 1, 'b', 1998], ['Claire Redfield', 2, 'b', 1998], ['Ada Wong', 3, '', 1998], ['Nemesis', 3, 'c', 1999],
    ],
    'Metal Gear': [
      ['Solid Snake', 1, 'b', 1987], ['Big Boss', 3, '', 1987], ['Revolver Ocelot', 3, 'c', 1998], ['Otacon', 3, 'b', 1998],
      ['Meryl Silverburgh', 3, 'b', 1998],
    ],
    'Mortal Kombat': [
      ['Scorpion', 1, '', 1992], ['Sub-Zero', 1, '', 1992], ['Liu Kang', 2, 'b', 1992], ['Johnny Cage', 2, 'b', 1992],
      ['Sonya Blade', 3, 'b', 1992], ['Shang Tsung', 3, 'c', 1992],
    ],
    Tekken: [
      ['Kazuya Mishima', 2, '', 1994], ['Heihachi Mishima', 2, '', 1994], ['Paul Phoenix', 3, '', 1994],
      ['Nina Williams', 3, '', 1994], ['Yoshimitsu', 3, '', 1994], ['Jin Kazama', 3, '', 1995],
    ],
    Kirby: [['King Dedede', 2, '', 1992], ['Meta Knight', 2, '', 1993], ['Waddle Dee', 3, '', 1992]],
    'Mega Man': [['Dr. Wily', 2, 'c', 1987]],
    Metroid: [['Samus Aran', 1, 'b', 1986], ['Ridley', 3, 'c', 1986], ['Mother Brain', 3, 'c', 1986]],
    Castlevania: [
      ['Simon Belmont', 2, 'b', 1986], ['Dracula', 1, 'c', 1986], ['Alucard', 3, '', 1989], ['Richter Belmont', 3, 'b', 1993],
    ],
    'God of War': [['Kratos', 1, '', 2005], ['Atreus', 2, '', 2018]],
    'Tomb Raider': [['Lara Croft', 1, 'b', 1996]],
    Uncharted: [
      ['Nathan Drake', 1, 'b', 2007], ['Victor Sullivan', 2, 'b', 2007], ['Elena Fisher', 3, 'b', 2007], ['Chloe Frazer', 3, '', 2009],
    ],
    'The Last of Us': [['Joel Miller', 2, '', 2013], ['Ellie', 1, 'b', 2013]],
    Halo: [['Master Chief', 1, 'b', 2001]],
    'Half-Life': [
      ['Gordon Freeman', 1, 'b', 1998], ['G-Man', 3, '', 1998], ['Alyx Vance', 3, 'b', 2004], ['Barney Calhoun', 3, 'b', 1998],
    ],
    Portal: [['GLaDOS', 2, 'c', 2007], ['Chell', 2, 'b', 2007]],
    'Crash Bandicoot': [['Dr. Neo Cortex', 2, 'c', 1996], ['Aku Aku', 3, '', 1996]],
    'Animal Crossing': [['Tom Nook', 1, '', 2001]],
    Overwatch: [
      ['Tracer', 1, 'b', 2016], ['Winston', 2, 'b', 2016], ['Mercy', 2, 'b', 2016], ['Genji', 3, '', 2016], ['D.Va', 3, '', 2016],
    ],
    'Grand Theft Auto': [
      ['Tommy Vercetti', 2, '', 2002], ['Carl Johnson (CJ)', 2, '', 2004], ['Niko Bellic', 2, '', 2008],
      ['Franklin Clinton', 2, '', 2013], ['Trevor Philips', 2, '', 2013], ['Michael De Santa', 2, '', 2013],
    ],
    'Red Dead Redemption': [['John Marston', 2, '', 2010], ['Arthur Morgan', 2, '', 2018]],
    Fallout: [['Vault Boy', 2, '', 1997]],
    Pikmin: [['Olimar', 3, 'b', 2001]],
    'Star Fox': [['Fox McCloud', 2, 'b', 1993]],
    'F-Zero': [['Captain Falcon', 3, 'b', 1990]],
  };
  const charItems = [];
  for (const [serie, rows] of Object.entries(CHARS)) {
    for (const [name, d, ruolo, anno] of rows) {
      const o = { name, d, serie };
      if (SERIE_ALT[serie] && SERIE_ALT[serie].length) o.serieAlt = SERIE_ALT[serie];
      if (ruolo) o.ruolo = RUOLO[ruolo];
      if (anno) o.anno = anno;
      charItems.push(o);
    }
  }

  // ---------- Tabella «serie» (franchise) ----------
  // Righe: [serie, d, casa, paese, anno del primo capitolo]; '' / 0 = non indicato.
  const PAESE_ALT = {
    'Stati Uniti': ['USA', 'America', 'Stati Uniti d\'America', 'Stati Uniti d America'],
    'Regno Unito': ['Inghilterra', 'UK', 'Gran Bretagna', 'Scozia'],
    Giappone: [], Francia: [], Finlandia: [], Polonia: [], Svezia: [],
  };
  const SERIE_CASA_ALT = {
    'Square Enix': ['Square', 'Enix'], Namco: ['Bandai Namco'], 'Rockstar Games': ['Rockstar'],
    'CD Projekt RED': ['CD Projekt', 'CD Projekt Red'], 'Blizzard Entertainment': ['Blizzard'], 'id Software': ['id'],
    Bethesda: ['Bethesda Softworks', 'Bethesda Game Studios'], 'Electronic Arts': ['EA'], 'Epic Games': ['Epic'],
    'Riot Games': ['Riot'], 'Mojang Studios': ['Mojang'], 'Rovio Entertainment': ['Rovio'], 'Santa Monica Studio': ['Santa Monica'],
    'Polyphony Digital': ['Polyphony'], FromSoftware: ['From Software'],
  };
  const serieRows = [
    ['Super Mario', 1, 'Nintendo', 'Giappone', 1985], ['The Legend of Zelda', 1, 'Nintendo', 'Giappone', 1986],
    ['Metroid', 2, 'Nintendo', 'Giappone', 1986], ['Donkey Kong', 1, 'Nintendo', 'Giappone', 1981],
    ['Mario Kart', 1, 'Nintendo', 'Giappone', 1992], ['Animal Crossing', 1, 'Nintendo', 'Giappone', 2001],
    ['Splatoon', 2, 'Nintendo', 'Giappone', 2015], ['Pikmin', 3, 'Nintendo', 'Giappone', 2001],
    ['Kirby', 2, '', 'Giappone', 1992], ['Fire Emblem', 3, '', 'Giappone', 1990],
    ['Sonic the Hedgehog', 1, 'Sega', 'Giappone', 1991],
    ['Street Fighter', 1, 'Capcom', 'Giappone', 1987], ['Mega Man', 2, 'Capcom', 'Giappone', 1987],
    ['Resident Evil', 1, 'Capcom', 'Giappone', 1996], ['Monster Hunter', 2, 'Capcom', 'Giappone', 2004],
    ['Devil May Cry', 2, 'Capcom', 'Giappone', 2001],
    ['Final Fantasy', 1, 'Square Enix', 'Giappone', 1987], ['Dragon Quest', 2, 'Square Enix', 'Giappone', 1986],
    ['Kingdom Hearts', 2, 'Square Enix', 'Giappone', 2002],
    ['Castlevania', 2, 'Konami', 'Giappone', 1986], ['Metal Gear', 2, 'Konami', 'Giappone', 1987],
    ['Silent Hill', 2, 'Konami', 'Giappone', 1999],
    ['Pac-Man', 1, 'Namco', 'Giappone', 1980], ['Tekken', 1, 'Namco', 'Giappone', 1994],
    ['Space Invaders', 1, 'Taito', 'Giappone', 1978], ['Gran Turismo', 2, 'Polyphony Digital', 'Giappone', 1997],
    ['Dark Souls', 2, 'FromSoftware', 'Giappone', 2011],
    ['Grand Theft Auto', 1, 'Rockstar Games', '', 1997], ['Call of Duty', 1, 'Activision', 'Stati Uniti', 2003],
    ['Tony Hawk\'s Pro Skater', 2, 'Activision', 'Stati Uniti', 1999],
    ['Assassin\'s Creed', 1, 'Ubisoft', '', 2007], ['Just Dance', 2, 'Ubisoft', 'Francia', 2009], ['Rayman', 2, 'Ubisoft', 'Francia', 1995],
    ['The Witcher', 2, 'CD Projekt RED', 'Polonia', 2007],
    ['Half-Life', 2, 'Valve', 'Stati Uniti', 1998], ['Portal', 2, 'Valve', 'Stati Uniti', 2007],
    ['Doom', 2, 'id Software', 'Stati Uniti', 1993], ['Quake', 3, 'id Software', 'Stati Uniti', 1996],
    ['Diablo', 2, 'Blizzard Entertainment', 'Stati Uniti', 1996], ['StarCraft', 2, 'Blizzard Entertainment', 'Stati Uniti', 1998],
    ['Warcraft', 2, 'Blizzard Entertainment', 'Stati Uniti', 1994], ['Overwatch', 2, 'Blizzard Entertainment', 'Stati Uniti', 2016],
    ['The Elder Scrolls', 2, 'Bethesda', 'Stati Uniti', 1994], ['Fallout', 2, '', 'Stati Uniti', 1997],
    ['The Sims', 1, 'Electronic Arts', 'Stati Uniti', 2000], ['Need for Speed', 2, 'Electronic Arts', '', 1994],
    ['FIFA / EA Sports FC', 1, 'Electronic Arts', '', 1993],
    ['Fortnite', 1, 'Epic Games', 'Stati Uniti', 2017], ['League of Legends', 2, 'Riot Games', 'Stati Uniti', 2009],
    ['Minecraft', 1, 'Mojang Studios', 'Svezia', 0], ['Angry Birds', 1, 'Rovio Entertainment', 'Finlandia', 2009],
    ['Clash of Clans', 2, 'Supercell', 'Finlandia', 2012], ['Candy Crush Saga', 1, 'King', '', 2012],
    ['God of War', 1, 'Santa Monica Studio', 'Stati Uniti', 2005], ['Uncharted', 2, 'Naughty Dog', 'Stati Uniti', 2007],
    ['The Last of Us', 1, 'Naughty Dog', 'Stati Uniti', 2013], ['Crash Bandicoot', 2, 'Naughty Dog', 'Stati Uniti', 1996],
    ['Tomb Raider', 1, '', 'Regno Unito', 1996], ['Lemmings', 3, '', 'Regno Unito', 1991], ['Worms', 3, '', 'Regno Unito', 1995],
    ['Tetris', 1, '', '', 1984], ['Mortal Kombat', 1, '', 'Stati Uniti', 1992], ['Halo', 1, '', 'Stati Uniti', 2001],
    ['Age of Empires', 2, '', 'Stati Uniti', 1997], ['Civilization', 2, '', 'Stati Uniti', 1991],
  ];
  const serieItems = serieRows.map(([name, d, casa, paese, anno]) => {
    const o = { name, d };
    if (casa) { o.casa = casa; if (SERIE_CASA_ALT[casa]) o.casaAlt = SERIE_CASA_ALT[casa]; }
    if (paese) { o.paese = paese; if (PAESE_ALT[paese].length) o.paeseAlt = PAESE_ALT[paese]; }
    if (anno) o.anno = anno;
    return o;
  });

  // ---------- Quiz a scelta multipla ----------
  const Q = (q, a, wrong, d) => ({ q, a, wrong, d });
  const quizA = [
    Q('Come si chiama l\'idraulico con i baffi e il cappello rosso, mascotte di Nintendo?', 'Mario', ['Luigi', 'Wario', 'Toad'], 1),
    Q('Chi rapisce la principessa Peach nella maggior parte dei giochi di Super Mario?', 'Bowser', ['Ganondorf', 'Dr. Eggman', 'King Dedede'], 1),
    Q('Come si chiama il fratello di Mario?', 'Luigi', ['Wario', 'Waluigi', 'Yoshi'], 1),
    Q('Di che colore è il cappello di Luigi?', 'Verde', ['Blu', 'Giallo', 'Viola'], 1),
    Q('Come si chiama il dinosauro verde che aiuta Mario?', 'Yoshi', ['Toad', 'Goomba', 'Kirby'], 1),
    Q('In che anno è uscito Super Mario Bros.?', '1985', ['1981', '1989', '1991'], 2),
    Q('Come si chiama l\'eroe della serie The Legend of Zelda?', 'Link', ['Zelda', 'Ganon', 'Epona'], 1),
    Q('Come si chiama il regno in cui è ambientata la serie The Legend of Zelda?', 'Hyrule', ['Regno dei Funghi', 'Azeroth', 'Tamriel'], 1),
    Q('Quante parti compongono la Triforza?', '3', ['2', '4', '5'], 2),
    Q('Come si chiama la volpe a due code amica di Sonic?', 'Tails', ['Knuckles', 'Shadow', 'Amy'], 1),
    Q('Che cosa raccoglie Sonic per proteggersi dai colpi dei nemici?', 'Anelli', ['Monete', 'Funghi', 'Stelle'], 1),
    Q('Chi è il nemico storico di Sonic?', 'Dr. Eggman', ['Bowser', 'Dr. Wily', 'Ganon'], 1),
    Q('Come si chiama il primo livello di Sonic the Hedgehog (1991)?', 'Green Hill Zone', ['Marble Zone', 'Emerald Hill Zone', 'Chemical Plant Zone'], 3),
    Q('Quante sono le Chaos Emerald nei giochi classici di Sonic?', '7', ['5', '6', '8'], 2),
    Q('Chi è il creatore originale di Minecraft?', 'Markus «Notch» Persson', ['Shigeru Miyamoto', 'Hideo Kojima', 'Gabe Newell'], 2),
    Q('Di che colore è un Creeper di Minecraft?', 'Verde', ['Rosso', 'Blu', 'Viola'], 1),
    Q('Con quale materiale si costruisce un portale per il Nether in Minecraft?', 'Ossidiana', ['Diamante', 'Pietra', 'Ferro'], 2),
    Q('Come si chiama la dimensione in cui vive l\'Ender Dragon?', 'L\'End', ['Il Nether', 'Il Sottosuolo', 'La Superficie'], 2),
    Q('Quale azienda ha acquistato Mojang, la casa di Minecraft, nel 2014?', 'Microsoft', ['Sony', 'Google', 'Disney'], 2),
    Q('Come si chiama la valuta virtuale di Fortnite?', 'V-Buck', ['Robux', 'Rupie', 'Anelli'], 1),
    Q('Come si chiama il mezzo da cui i giocatori si lanciano all\'inizio di una partita di Fortnite?', 'Bus da battaglia', ['Aereo da carico', 'Navicella spaziale', 'Elicottero'], 1),
    Q('Chi ha inventato Tetris?', 'Aleksej Pažitnov', ['Shigeru Miyamoto', 'Tōru Iwatani', 'Satoru Iwata'], 2),
    Q('In quale paese è stato inventato Tetris?', 'Unione Sovietica', ['Giappone', 'Stati Uniti', 'Germania'], 2),
    Q('Quanti quadratini compongono ogni pezzo di Tetris?', '4', ['3', '5', '6'], 2),
    Q('Come si chiama la celebre melodia popolare russa associata a Tetris?', 'Korobeiniki', ['Kalinka', 'Katjuša', 'Notti di Mosca'], 3),
    Q('Che cosa mangia Pac-Man nel labirinto?', 'Puntini', ['Monete', 'Funghi', 'Anelli'], 1),
    Q('Come si chiama il fantasma rosso di Pac-Man?', 'Blinky', ['Pinky', 'Inky', 'Clyde'], 2),
    Q('Chi ha ideato Pac-Man?', 'Tōru Iwatani', ['Shigeru Miyamoto', 'Nolan Bushnell', 'Yuji Naka'], 3),
    Q('Come si chiama la lottatrice cinese di Street Fighter famosa per le sue gambe potenti?', 'Chun-Li', ['Cammy', 'Sonya Blade', 'Nina Williams'], 1),
    Q('Quale lottatore di Street Fighter ha la pelle verde e lancia scariche elettriche?', 'Blanka', ['Zangief', 'Dhalsim', 'Guile'], 2),
    Q('Quale frase pronuncia la voce di Mortal Kombat prima della mossa finale?', 'Finish Him!', ['Game Over!', 'Round Two!', 'Last Chance!'], 1),
    Q('Come si chiama il nemico principale di Final Fantasy VII?', 'Sephiroth', ['Kefka', 'Ganondorf', 'Vergil'], 1),
    Q('Chi è il protagonista di Final Fantasy VII?', 'Cloud Strife', ['Squall Leonhart', 'Tidus', 'Noctis'], 1),
    Q('Come si chiamano i grandi uccelli cavalcabili di Final Fantasy?', 'Chocobo', ['Moguri', 'Tonberry', 'Cactuar'], 2),
    Q('Chi ha disegnato i personaggi di Dragon Quest?', 'Akira Toriyama', ['Hayao Miyazaki', 'Eiichiro Oda', 'Tetsuya Nomura'], 2),
    Q('Che cos\'è Geralt di Rivia?', 'Un cacciatore di mostri', ['Un mago', 'Un cavaliere', 'Un ladro'], 1),
    Q('Chi ha scritto i romanzi da cui nasce The Witcher?', 'Andrzej Sapkowski', ['J. R. R. Tolkien', 'George R. R. Martin', 'Stephen King'], 2),
    Q('Chi è il protagonista di Assassin\'s Creed II?', 'Ezio Auditore', ['Altaïr', 'Connor', 'Edward Kenway'], 1),
    Q('In quale paese è ambientato soprattutto Assassin\'s Creed II?', 'Italia', ['Francia', 'Spagna', 'Grecia'], 1),
    Q('Quale epoca racconta Assassin\'s Creed Origins?', 'L\'antico Egitto', ['La Grecia antica', 'L\'età dei vichinghi', 'Il Rinascimento italiano'], 2),
    Q('In quale ambientazione si svolge Assassin\'s Creed Odyssey?', 'La Grecia antica', ['L\'antico Egitto', 'L\'Inghilterra medievale', 'Il Giappone feudale'], 2),
    Q('Come si chiama la città di Grand Theft Auto V?', 'Los Santos', ['Vice City', 'Liberty City', 'San Fierro'], 1),
    Q('Quale città reale ha ispirato Vice City di GTA?', 'Miami', ['Los Angeles', 'New York', 'Las Vegas'], 2),
    Q('Chi è il protagonista di Grand Theft Auto IV?', 'Niko Bellic', ['Tommy Vercetti', 'Carl Johnson', 'Trevor Philips'], 2),
    Q('Chi è il protagonista principale di Red Dead Redemption 2?', 'Arthur Morgan', ['Niko Bellic', 'Joel Miller', 'Geralt di Rivia'], 2),
    Q('Quale serie ha sostituito FIFA di Electronic Arts a partire dal 2023?', 'EA Sports FC', ['eFootball', 'Football Manager', 'Pro Soccer'], 2),
    Q('Quale celebre attore dà il volto a Johnny Silverhand in Cyberpunk 2077?', 'Keanu Reeves', ['Tom Cruise', 'Brad Pitt', 'Johnny Depp'], 2),
    Q('Come si chiama la città in cui è ambientato Cyberpunk 2077?', 'Night City', ['Neo-Tokyo', 'Los Santos', 'Gotham'], 2),
  ];
  const quizB = [
    Q('Chi è considerato il papà di Mario e Zelda?', 'Shigeru Miyamoto', ['Hideo Kojima', 'Satoru Iwata', 'Masahiro Sakurai'], 1),
    Q('Con quale nome compare Mario in Donkey Kong del 1981?', 'Jumpman', ['Pipeman', 'Mr. Plumber', 'Capitan Salto'], 3),
    Q('Come si chiama la ragazza che Donkey Kong rapisce nel gioco originale del 1981?', 'Pauline', ['Peach', 'Zelda', 'Daisy'], 3),
    Q('Quale oggetto di Mario Kart insegue il pilota al primo posto?', 'Guscio blu', ['Guscio verde', 'Banana', 'Fungo'], 2),
    Q('Di che colore è Kirby?', 'Rosa', ['Giallo', 'Azzurro', 'Verde'], 1),
    Q('Quale abilità rende speciale Kirby?', 'Copia i poteri dei nemici inghiottendoli', ['Vola nello spazio senza tuta', 'Rende invisibili gli oggetti', 'Si teletrasporta tra i livelli'], 1),
    Q('Che animale è Tom Nook di Animal Crossing?', 'Un procione tanuki', ['Una volpe', 'Un gatto', 'Un orso'], 2),
    Q('Che cosa spruzzano i personaggi di Splatoon?', 'Inchiostro', ['Acqua', 'Schiuma', 'Polvere'], 1),
    Q('Come si chiama la spada leggendaria di Link?', 'Master Sword', ['Excalibur', 'Masamune', 'Buster Sword'], 2),
    Q('Su quali console è uscito The Legend of Zelda: Breath of the Wild nel 2017?', 'Nintendo Switch e Wii U', ['PlayStation 4 e Xbox One', 'Nintendo 3DS e Wii', 'GameCube e Wii'], 3),
    Q('Come si chiamava negli Stati Uniti il Sega Mega Drive?', 'Genesis', ['Saturn', 'Dreamcast', 'Mark III'], 3),
    Q('Quale è considerata la prima console casalinga della storia?', 'Magnavox Odyssey', ['Atari 2600', 'Famicom', 'ColecoVision'], 3),
    Q('Quale console Nintendo si può usare sia collegata alla TV sia in modalità portatile?', 'Nintendo Switch', ['Wii U', 'GameCube', 'Nintendo 64'], 1),
    Q('Quale console Nintendo del 2006 si controllava muovendo il telecomando nell\'aria?', 'Wii', ['GameCube', 'Nintendo DS', 'Wii U'], 1),
    Q('Quale console portatile Nintendo aveva due schermi?', 'Nintendo DS', ['Game Boy', 'Game Boy Color', 'Virtual Boy'], 1),
    Q('Come si chiama il negozio digitale di videogiochi per PC di Valve?', 'Steam', ['Origin', 'Battle.net', 'Epic Games Store'], 1),
    Q('Come si chiamava il servizio di gioco in streaming di Google, chiuso nel 2023?', 'Stadia', ['Luna', 'GeForce Now', 'xCloud'], 3),
    Q('Quale azienda ha acquistato Activision Blizzard nel 2023?', 'Microsoft', ['Sony', 'Tencent', 'Electronic Arts'], 3),
    Q('Quale azienda produce la console PlayStation?', 'Sony', ['Sega', 'Microsoft', 'Atari'], 1),
    Q('Quale azienda produce la console Xbox?', 'Microsoft', ['Sony', 'Nintendo', 'Sega'], 1),
    Q('Che cosa significa la sigla «RPG» nei videogiochi?', 'Gioco di ruolo', ['Gioco di corse', 'Gioco di puzzle', 'Gioco di piattaforme'], 1),
    Q('Che cosa significa la sigla «FPS» in un gioco sparatutto?', 'First-Person Shooter', ['Free Play System', 'Fast Player Skill', 'Final Power Stage'], 2),
    Q('Che cosa significa la sigla «DLC»?', 'Contenuto scaricabile aggiuntivo', ['Livello di difficoltà crescente', 'Disco a doppio strato', 'Lega dei giocatori connessi'], 2),
    Q('Che cosa indica la sigla «NPC» in un videogioco?', 'Personaggio non giocabile', ['Nuovo giocatore collegato', 'Nemico più cattivo', 'Punteggio massimo'], 2),
    Q('Che cosa indica «HP» in molti giochi di ruolo?', 'Punti vita', ['Punti magia', 'Punti esperienza', 'Punti abilità'], 2),
    Q('Che sport simula Pong?', 'Ping pong', ['Calcio', 'Basket', 'Golf'], 1),
    Q('Quale gioco di Valve ha come arma il Portal Gun?', 'Portal', ['Half-Life', 'Team Fortress 2', 'Dota 2'], 2),
    Q('Quale arma è il simbolo di Gordon Freeman in Half-Life?', 'Il piede di porco', ['La spada laser', 'Il martello', 'L\'ascia'], 2),
    Q('Come si chiama l\'intelligenza artificiale che accompagna Master Chief in Halo?', 'Cortana', ['GLaDOS', 'HAL 9000', 'EDI'], 2),
    Q('Che cosa provoca l\'apocalisse in The Last of Us?', 'Un fungo che infetta gli esseri umani', ['Un virus alieno', 'Un meteorite', 'Radiazioni nucleari'], 2),
    Q('Quale mitologia è al centro di God of War del 2018?', 'Quella norrena', ['Quella greca', 'Quella egizia', 'Quella azteca'], 2),
    Q('Di quale nazionalità è Lara Croft?', 'Britannica', ['Americana', 'Australiana', 'Francese'], 2),
    Q('Come si chiama il protagonista di Skyrim, capace di assorbire le anime dei draghi?', 'Dovahkiin', ['Commander Shepard', 'Geralt', 'Il Vault Dweller'], 2),
    Q('Quale scrittore ha collaborato con FromSoftware alla mitologia di Elden Ring?', 'George R. R. Martin', ['J. K. Rowling', 'Stephen King', 'Neil Gaiman'], 2),
    Q('Come si chiama la città infestata dagli zombie in Resident Evil 2?', 'Raccoon City', ['Silent Hill', 'Rapture', 'Liberty City'], 2),
    Q('Chi ha creato la serie Metal Gear?', 'Hideo Kojima', ['Shigeru Miyamoto', 'Shinji Mikami', 'Yu Suzuki'], 2),
    Q('Come si chiama la lingua inventata parlata dai personaggi di The Sims?', 'Simlish', ['Simmish', 'Sim-Speak', 'Plumbese'], 2),
    Q('Come si chiama il diamante verde che fluttua sopra la testa dei Sims?', 'Plumbob', ['Simbob', 'Greenstone', 'Gemma Sim'], 2),
    Q('Come vengono chiamati in Among Us i giocatori che sabotano l\'equipaggio?', 'Impostori', ['Traditori', 'Spie', 'Ladri'], 1),
    Q('Come si chiama la valuta virtuale di Roblox?', 'Robux', ['V-Buck', 'Gemme', 'Rupie'], 1),
    Q('Che cosa sono i nemici di Angry Birds?', 'Maiali verdi', ['Gatti', 'Volpi', 'Serpenti'], 1),
    Q('A quale genere appartiene League of Legends?', 'MOBA', ['Platform', 'Picchiaduro', 'Gestionale'], 2),
    Q('Quale gioco ospita il torneo di eSport «The International»?', 'Dota 2', ['League of Legends', 'Fortnite', 'Counter-Strike'], 3),
    Q('Chi ha dato la voce a Mario nei videogiochi fino al 2023?', 'Charles Martinet', ['Chris Pratt', 'Jack Black', 'Seth Rogen'], 3),
    Q('Quale azienda fu fondata da Nolan Bushnell nel 1972?', 'Atari', ['Nintendo', 'Sega', 'Commodore'], 3),
    Q('Quale console Sony ha debuttato in Giappone nel 1994?', 'PlayStation', ['Xbox', 'Wii', 'Dreamcast'], 1),
    Q('Quale personaggio è la mascotte storica di Sega?', 'Sonic', ['Mario', 'Link', 'Kirby'], 1),
    Q('Come si chiama la principessa del regno di Hyrule?', 'Zelda', ['Peach', 'Daisy', 'Midna'], 1),
    Q('Quale gioco ha reso famosa la modalità «battle royale» a livello mondiale con costruzioni e balli?', 'Fortnite', ['Tetris', 'Pac-Man', 'FIFA'], 1),
    Q('Quale gioco di calcio di Konami è il rivale storico di FIFA?', 'Pro Evolution Soccer', ['Madden NFL', 'NBA 2K', 'Gran Turismo'], 2),
    Q('Quale gioco di corse è celebre per le gare con gusci e banane?', 'Mario Kart', ['Gran Turismo', 'Need for Speed', 'Forza Horizon'], 1),
    Q('Quale serie di corse realistiche per PlayStation è stata creata da Polyphony Digital?', 'Gran Turismo', ['Mario Kart', 'Out Run', 'Crazy Taxi'], 2),
  ];

  // ---------- Vero o falso ----------
  const T = (q, d) => ({ q, a: true, d });
  const F = (q, why, d) => ({ q, a: false, d, why });
  const tf = [
    T('Minecraft è stato ideato dallo svedese Markus «Notch» Persson.', 2),
    T('Mario è comparso per la prima volta nel videogioco Donkey Kong del 1981.', 2),
    T('Nel Pac-Man originale i fantasmi che inseguono il giocatore sono quattro.', 1),
    T('Tetris è stato inventato in Unione Sovietica.', 2),
    T('Sonic the Hedgehog è la mascotte di Sega.', 1),
    T('La PlayStation è prodotta da Sony.', 1),
    T('Nintendo è stata fondata nel 1889 come azienda di carte da gioco.', 3),
    T('Il Game Boy è una console portatile di Nintendo.', 1),
    T('In Fortnite si possono costruire muri e rampe.', 1),
    T('In Minecraft il Creeper esplode avvicinandosi al giocatore.', 1),
    T('Nella serie The Legend of Zelda il protagonista giocabile principale è Link, non Zelda.', 1),
    T('Il Nether è una dimensione di Minecraft.', 1),
    T('The Witcher 3: Wild Hunt è stato sviluppato dalla polacca CD Projekt RED.', 2),
    T('Nei giochi di Super Mario, Bowser è il re dei Koopa.', 1),
    T('Grand Theft Auto V è ambientato nella città fittizia di Los Santos.', 1),
    T('God of War del 2018 è ambientato nella mitologia norrena.', 2),
    T('Half-Life 2 è stato sviluppato da Valve.', 2),
    T('Dark Souls è stato sviluppato da FromSoftware.', 2),
    T('Final Fantasy VII è uscito originariamente su PlayStation.', 2),
    T('Assassin\'s Creed è una serie di Ubisoft.', 1),
    T('Lara Croft è la protagonista di Tomb Raider.', 1),
    T('L\'Atari 2600 è uscita nel 1977.', 2),
    T('Nintendo Switch è stata lanciata nel 2017.', 1),
    T('PlayStation 5 è uscita nel 2020.', 1),
    T('Xbox Series X è una console di Microsoft.', 1),
    T('In Animal Crossing il negoziante dell\'isola è Tom Nook.', 1),
    T('Overwatch è stato creato da Blizzard Entertainment.', 2),
    T('The Last of Us è stato sviluppato da Naughty Dog.', 2),
    T('La sede principale di Nintendo si trova a Kyoto, in Giappone.', 2),
    T('Epic Games, che ha creato Fortnite, sviluppa anche il motore grafico Unreal Engine.', 2),
    T('Among Us è stato creato dallo studio Innersloth.', 2),
    T('Roblox permette agli utenti di creare e condividere i propri giochi.', 1),
    T('La Master Sword è la spada simbolo di Link.', 2),
    T('In Mortal Kombat le mosse finali si chiamano Fatality.', 1),
    T('Il Chocobo è una creatura tipica di Final Fantasy.', 2),
    T('Stardew Valley è stato realizzato quasi interamente da una sola persona, Eric Barone.', 3),
    T('Il primo Grand Theft Auto è uscito nel 1997.', 3),
    T('League of Legends è stato creato da Riot Games.', 1),
    T('Il Dreamcast era una console di Sega.', 1),
    T('Nel 2014 Microsoft ha acquistato Mojang, la casa di Minecraft.', 2),
    T('Half-Life è uscito nel 1998.', 2),
    T('Metal Gear Solid è stato creato da Hideo Kojima.', 2),
    T('Cyberpunk 2077 è un videogioco di CD Projekt RED.', 2),
    T('Il Super Nintendo è uscito dopo il Famicom (NES).', 1),
    T('Con Wii Sports si giocava muovendo il telecomando Wii.', 1),
    T('Il Game Boy Advance è uscito dopo il Game Boy Color.', 2),
    F('Super Mario Bros. è stato creato da Sega.', 'È un gioco Nintendo.', 1),
    F('Sonic the Hedgehog è un personaggio Nintendo.', 'Sonic è la mascotte di Sega.', 1),
    F('Il Nether è una dimensione del gioco The Sims.', 'Il Nether appartiene a Minecraft.', 1),
    F('La PlayStation è prodotta da Microsoft.', 'La PlayStation è di Sony; Microsoft produce Xbox.', 1),
    F('Tetris è stato inventato in Giappone.', 'Nacque in Unione Sovietica, ideato da Aleksej Pažitnov.', 2),
    F('In Pac-Man il giocatore raccoglie anelli.', 'Pac-Man mangia puntini; gli anelli sono di Sonic.', 1),
    F('Link è la principessa di Hyrule.', 'Link è l\'eroe; la principessa è Zelda.', 1),
    F('In Fortnite la valuta virtuale si chiama Robux.', 'In Fortnite si chiama V-Buck; Robux è di Roblox.', 1),
    F('Halo è stato creato da Nintendo.', 'Halo nacque su Xbox, creato da Bungie.', 2),
    F('The Witcher 3 è stato sviluppato dalla giapponese Capcom.', 'È opera della polacca CD Projekt RED.', 2),
    F('Il Game Boy è una console da salotto.', 'Il Game Boy è una console portatile.', 1),
    F('Il Nintendo 64 è uscito nel 2001.', 'Il Nintendo 64 è uscito nel 1996.', 2),
    F('Il creatore di Metal Gear è Shigeru Miyamoto.', 'Metal Gear è stato creato da Hideo Kojima.', 2),
    F('Kratos è il protagonista della serie Uncharted.', 'Kratos è di God of War; Uncharted ha Nathan Drake.', 1),
    F('In Skyrim il protagonista è Geralt di Rivia.', 'Geralt è il protagonista di The Witcher.', 1),
    F('Cloud Strife è il protagonista di Final Fantasy X.', 'Cloud è di Final Fantasy VII; in X c\'è Tidus.', 2),
    F('Grand Theft Auto V è ambientato a Vice City.', 'È ambientato a Los Santos.', 2),
    F('Dark Souls è stato sviluppato da Capcom.', 'Dark Souls è di FromSoftware.', 2),
    F('Mega Man è un personaggio di Konami.', 'Mega Man è una creatura di Capcom.', 2),
    F('Castlevania è una serie di Capcom.', 'Castlevania è una serie di Konami.', 2),
    F('Master Chief è il protagonista di Gears of War.', 'Master Chief è il protagonista di Halo.', 1),
    F('Il Creeper è un animale di Fortnite.', 'Il Creeper è un mostro di Minecraft.', 1),
    F('Il Dreamcast è stata l\'ultima console di Nintendo.', 'Il Dreamcast era di Sega.', 2),
    F('Il Nintendo Switch è uscito nel 2011.', 'Switch è del 2017; nel 2011 uscì il Nintendo 3DS.', 2),
    F('La PlayStation 2 è uscita nel 2010.', 'È uscita nel 2000.', 2),
    F('Il Wii U è una console di Sony.', 'Il Wii U è di Nintendo.', 1),
    F('Pong è un gioco di corse automobilistiche.', 'Pong simula il ping pong.', 1),
    F('Space Invaders è stato creato da Atari.', 'Space Invaders è un gioco Taito.', 3),
    F('Minecraft è stato creato da Epic Games.', 'Minecraft è di Mojang; Epic Games ha creato Fortnite.', 1),
    F('Angry Birds è stato creato da un\'azienda giapponese.', 'Angry Birds è della finlandese Rovio.', 2),
    F('Among Us è un gioco di corse.', 'È un gioco di deduzione sociale.', 1),
    F('Overwatch è un videogioco di Valve.', 'Overwatch è di Blizzard.', 2),
    F('League of Legends è stato creato da Blizzard.', 'League of Legends è di Riot Games.', 2),
    F('Street Fighter è una serie creata da Sega.', 'Street Fighter è di Capcom.', 2),
    F('I pezzi di Tetris sono formati da cinque quadratini.', 'Ogni pezzo è un tetramino, formato da quattro quadratini.', 2),
    F('Il Chocobo è una creatura della serie The Legend of Zelda.', 'Il Chocobo appartiene a Final Fantasy.', 2),
    F('Lara Croft è un\'archeologa americana.', 'Lara Croft è britannica.', 2),
    F('Il primo Mario Kart è uscito per Nintendo 64.', 'Il primo, Super Mario Kart, uscì su Super Nintendo nel 1992.', 3),
  ];

  // ---------- Citazioni, emoji, ordine, numeri, scrivi ----------
  const quotes = [
    ['Grazie Mario! Ma la principessa è in un altro castello!', 'Toad', 1],
    ['It\'s-a me, Mario!', 'Mario', 1],
    ['Let\'s-a go!', 'Mario', 1],
    ['Ehi! Ascolta!', 'Navi', 1],
    ['È pericoloso andare da soli! Prendi questo!', 'Il vecchio della caverna', 2],
    ['Sei troppo lento!', 'Sonic', 1],
    ['Svegliati e splendi, signor Freeman.', 'G-Man', 2],
    ['L\'uomo giusto nel posto sbagliato può cambiare il mondo.', 'G-Man', 3],
    ['Lode al Sole!', 'Solaire di Astora', 2],
    ['Ehi, tu. Finalmente ti sei svegliato.', 'Ralof', 2],
    ['Ero un avventuriero come te, poi ho preso una freccia nel ginocchio.', 'Una guardia di Skyrim', 2],
    ['Cos\'è un uomo? Un misero mucchietto di segreti!', 'Dracula', 2],
    ['Gli eroi non muoiono mai!', 'Mercy', 2],
    ['Salve, tesoro! È arrivata la cavalleria!', 'Tracer', 2],
    ['Per la scienza. Sei un mostro.', 'GLaDOS', 3],
    ['Svegliami quando avrai bisogno di me.', 'Master Chief', 3],
    ['Non mi interessa.', 'Cloud Strife', 2],
    ['Ho un piano.', 'Dutch van der Linde', 3],
    ['Metal Gear?!', 'Solid Snake', 2],
    ['Quando la vita ti dà limoni, non fare la limonata!', 'Cave Johnson', 3],
    ['Devi sconfiggere Sheng Long per avere una possibilità.', 'Ryu', 3],
    ['Fermati un po\' e ascolta!', 'Deckard Cain', 2],
    ['Saresti così gentile?', 'Atlas', 3],
    ['Fus Ro Dah!', 'Il Dovahkiin', 1],
    ['Il vento ulula.', 'Geralt di Rivia', 2],
    ['Ragazzo.', 'Kratos', 2],
  ].map(([text, who, d]) => ({ text, who, d }));

  const emojis = [
    ['🍄👨‍🔧👸🏰', 'Super Mario', 1], ['🗡️🛡️🧝‍♂️🔺', 'The Legend of Zelda', 1], ['🦔💨💍', 'Sonic', 1],
    ['⛏️🟩🧱', 'Minecraft', 1], ['🟡👻👻🍒', 'Pac-Man', 1], ['🟦🟪🟧🟩', 'Tetris', 1], ['🏎️🐢🍌', 'Mario Kart', 1],
    ['🥋👊🔥', 'Street Fighter', 2], ['🚗🔫🌴💰', 'Grand Theft Auto', 1], ['🔫🪖🎖️', 'Call of Duty', 2],
    ['⚽🎮🏆', 'FIFA / EA Sports FC', 1], ['🏝️🦝🔨', 'Animal Crossing', 2], ['🦑🎨🔫', 'Splatoon', 2],
    ['🧙‍♂️⚔️🐺', 'The Witcher', 2], ['🦅🗡️🕵️', 'Assassin\'s Creed', 2], ['🧟‍♂️🔫🏚️', 'Resident Evil', 2],
    ['🪂🏗️🔫🕺', 'Fortnite', 1], ['🧑‍🚀🔪🔴', 'Among Us', 1], ['🐷🐦💥', 'Angry Birds', 1], ['🍬🍭🍫', 'Candy Crush Saga', 1],
    ['🌀🔫🍰', 'Portal', 2], ['🧟🌻🧠', 'Plants vs. Zombies', 2], ['🐉🏔️🗣️', 'Skyrim', 2], ['🔥⚔️💀', 'Dark Souls', 2],
    ['🪖🟢🛰️', 'Halo', 2], ['🪓👦🧔', 'God of War', 2], ['🕷️🕸️🏙️', 'Spider-Man', 1], ['👾👾🔫', 'Space Invaders', 1],
    ['🏓⚪', 'Pong', 1], ['🦊🚀🛩️', 'Star Fox', 3], ['🟩💥😮', 'Creeper', 1], ['🐢🔥👑', 'Bowser', 1],
    ['🚗⚽🚀', 'Rocket League', 2], ['🤖🌃🏙️🔫', 'Cyberpunk 2077', 2], ['💚🏠🧑‍🤝‍🧑', 'The Sims', 1],
    ['🏺🔫🧗‍♀️', 'Tomb Raider', 2], ['🦍🍌🛢️', 'Donkey Kong', 1], ['🌸😋🌟', 'Kirby', 1], ['📦🕵️‍♂️❗', 'Metal Gear Solid', 3],
    ['🦖🥚', 'Yoshi', 1],
  ].map(([emoji, answer, d]) => ({ emoji, answer, d }));

  const O = (q, items, d) => ({ q, items, d });
  const order = [
    O('Metti in ordine di uscita queste console Nintendo, dalla più vecchia', ['Game Boy', 'Super Nintendo', 'Nintendo 64', 'Wii', 'Nintendo Switch'], 1),
    O('Metti in ordine di uscita queste console Sony, dalla più vecchia', ['PlayStation', 'PlayStation 2', 'PlayStation 3', 'PlayStation 4', 'PlayStation 5'], 1),
    O('Metti in ordine di uscita queste console Xbox, dalla più vecchia', ['Xbox', 'Xbox 360', 'Xbox One', 'Xbox Series X'], 1),
    O('Metti in ordine di uscita queste console Sega, dalla più vecchia', ['Master System', 'Mega Drive', 'Sega Saturn', 'Dreamcast'], 2),
    O('Metti in ordine di uscita questi giochi di Super Mario, dal più vecchio', ['Super Mario Bros.', 'Super Mario World', 'Super Mario 64', 'Super Mario Galaxy', 'Super Mario Odyssey'], 2),
    O('Metti in ordine di uscita questi giochi di Zelda, dal più vecchio', ['The Legend of Zelda', 'Ocarina of Time', 'Twilight Princess', 'Breath of the Wild', 'Tears of the Kingdom'], 2),
    O('Metti in ordine di uscita questi Grand Theft Auto, dal più vecchio', ['Grand Theft Auto III', 'Vice City', 'San Andreas', 'Grand Theft Auto IV', 'Grand Theft Auto V'], 2),
    O('Metti in ordine di uscita questi Final Fantasy, dal più vecchio', ['Final Fantasy VI', 'Final Fantasy VII', 'Final Fantasy VIII', 'Final Fantasy X', 'Final Fantasy XV'], 3),
    O('Metti in ordine di uscita questi Call of Duty, dal più vecchio', ['Call of Duty', 'Modern Warfare (2007)', 'Black Ops (2010)', 'Warzone'], 2),
    O('Metti in ordine di uscita questi classici, dal più vecchio', ['Pong', 'Space Invaders', 'Pac-Man', 'Donkey Kong', 'Tetris'], 2),
    O('Metti in ordine di uscita questi giochi di Sonic, dal più vecchio', ['Sonic the Hedgehog', 'Sonic the Hedgehog 2', 'Sonic Adventure', 'Sonic Frontiers'], 2),
    O('Metti in ordine di uscita questi Assassin\'s Creed, dal più vecchio', ['Assassin\'s Creed', 'Assassin\'s Creed II', 'Black Flag', 'Origins', 'Valhalla'], 2),
    O('Metti in ordine di uscita questi Resident Evil, dal più vecchio', ['Resident Evil', 'Resident Evil 2', 'Resident Evil 4', 'Resident Evil Village'], 2),
    O('Metti in ordine di uscita questi Street Fighter, dal più vecchio', ['Street Fighter', 'Street Fighter II', 'Street Fighter IV', 'Street Fighter V', 'Street Fighter 6'], 3),
    O('Metti in ordine di uscita queste console portatili Nintendo, dalla più vecchia', ['Game Boy', 'Game Boy Advance', 'Nintendo DS', 'Nintendo 3DS'], 1),
    O('Metti in ordine di uscita questi Mario Kart, dal più vecchio', ['Super Mario Kart', 'Mario Kart 64', 'Double Dash!!', 'Mario Kart Wii', 'Mario Kart 8'], 3),
    O('Metti in ordine di uscita questi giochi di FromSoftware, dal più vecchio', ['Demon\'s Souls', 'Dark Souls', 'Bloodborne', 'Sekiro', 'Elden Ring'], 3),
    O('Metti in ordine di uscita questi giochi polacchi di CD Projekt RED, dal più vecchio', ['The Witcher', 'The Witcher 2', 'The Witcher 3', 'Cyberpunk 2077'], 2),
    O('Metti in ordine di uscita questi giochi di Blizzard, dal più vecchio', ['Diablo', 'StarCraft', 'World of Warcraft', 'Hearthstone', 'Overwatch'], 3),
    O('Metti in ordine di uscita questi giochi di Valve, dal più vecchio', ['Half-Life', 'Half-Life 2', 'Portal', 'Portal 2', 'Half-Life: Alyx'], 3),
    O('Metti in ordine di uscita queste console casalinghe Nintendo, dalla più vecchia', ['Famicom (NES)', 'Super Nintendo', 'Nintendo 64', 'GameCube', 'Wii', 'Wii U'], 2),
    O('Metti in ordine di uscita queste console, dalla più vecchia', ['Magnavox Odyssey', 'Atari 2600', 'Famicom (NES)', 'Mega Drive', 'PlayStation'], 3),
    O('Metti in ordine di uscita questi giochi online, dal più vecchio', ['League of Legends', 'Fortnite', 'Among Us', 'Valorant'], 2),
    O('Metti in ordine di uscita questi God of War, dal più vecchio', ['God of War (2005)', 'God of War II', 'God of War III', 'God of War (2018)', 'God of War Ragnarök'], 3),
    O('Metti in ordine di uscita questi giochi di Naughty Dog, dal più vecchio', ['Crash Bandicoot', 'Jak and Daxter', 'Uncharted', 'The Last of Us', 'The Last of Us Part II'], 3),
  ];

  const N = (q, v, min, max, tol, unit, d, format) => (format ? { q, v, min, max, tol, unit, d, format } : { q, v, min, max, tol, unit, d });
  const numbers = [
    N('Quanti tipi di pezzi (tetramini) esistono in Tetris?', 7, 3, 12, 0, 'pezzi', 2),
    N('Quanti fantasmi inseguono Pac-Man nel gioco originale?', 4, 1, 8, 0, 'fantasmi', 1),
    N('Quante colonne è larga l\'area di gioco classica di Tetris?', 10, 5, 20, 0, 'colonne', 3),
    N('Quante righe si cancellano insieme con un «Tetris»?', 4, 1, 8, 0, 'righe', 1),
    N('Quanti giocatori partecipano di norma a una partita battle royale di Fortnite?', 100, 20, 200, 10, 'giocatori', 2),
    N('Quanti giocatori ci sono in ogni squadra sulla mappa classica di League of Legends?', 5, 1, 10, 0, 'giocatori', 2),
    N('Quanti personaggi giocabili ci sono in Grand Theft Auto V?', 3, 1, 6, 0, 'personaggi', 2),
    N('Quante dimensioni principali ha Minecraft (Mondo, Nether, End)?', 3, 1, 8, 0, 'dimensioni', 2),
    N('Quanti calciatori per squadra scendono in campo in una partita di calcio di EA Sports FC?', 11, 5, 15, 0, 'calciatori', 1),
    N('A quanti bit funzionava il Nintendo 64?', 64, 8, 128, 0, 'bit', 2),
    N('A quanti bit funzionava il NES (Famicom)?', 8, 4, 32, 0, 'bit', 2),
    N('In che anno è uscita la versione 1.0 completa di Minecraft?', 2011, 2000, 2020, 0, '', 2, 'year'),
    N('In che anno è stato lanciato Steam, il negozio digitale di Valve?', 2003, 1995, 2015, 1, '', 3, 'year'),
    N('In che anno è stata fondata Nintendo?', 1889, 1850, 1950, 5, '', 3, 'year'),
    N('Quanti mondi ha il primo Super Mario Bros. del 1985?', 8, 3, 16, 0, 'mondi', 2),
    N('Quanti livelli in tutto ha il primo Super Mario Bros.?', 32, 8, 64, 2, 'livelli', 3),
    N('Quante Stelle Potenza si possono raccogliere in Super Mario 64?', 120, 50, 200, 10, 'stelle', 2),
    N('Quanti cuori ha Link all\'inizio del primo The Legend of Zelda?', 3, 1, 8, 0, 'cuori', 3),
    N('Quanti sotterranei ci sono nel primo The Legend of Zelda?', 9, 3, 16, 0, 'sotterranei', 3),
    N('Quanti lottatori selezionabili aveva Street Fighter II nella versione originale?', 8, 4, 16, 0, 'lottatori', 2),
    N('Quanti simboli diversi compaiono sui pulsanti d\'azione di un controller PlayStation?', 4, 2, 8, 0, 'simboli', 1),
    N('Quanti giocatori partecipano di norma a una partita di Fall Guys?', 60, 20, 120, 5, 'giocatori', 3),
  ];

  const W = (q, a, accept, d) => ({ q, a, accept, d });
  const typed = [
    W('Come si chiama il fratello di Mario?', 'Luigi', [], 1),
    W('Come si chiama la principessa del Regno dei Funghi?', 'Peach', ['Principessa Peach'], 1),
    W('Come si chiama il re dei Koopa, nemico di Mario?', 'Bowser', [], 1),
    W('Come si chiama l\'eroe della serie The Legend of Zelda?', 'Link', [], 1),
    W('Come si chiama il riccio blu di Sega?', 'Sonic', ['Sonic the Hedgehog'], 1),
    W('Come si chiama il celebre gioco di blocchi che cadono, nato in URSS?', 'Tetris', [], 1),
    W('Come si chiama il gioco in cui una sfera gialla mangia puntini in un labirinto?', 'Pac-Man', ['Pacman', 'Pac Man'], 1),
    W('Quale gioco permette di costruire con blocchi cubici e di sconfiggere l\'Ender Dragon?', 'Minecraft', [], 1),
    W('Come si chiama il battle royale di Epic Games con i V-Buck?', 'Fortnite', [], 1),
    W('Come si chiama la console Sony uscita nel 2013, dopo la PlayStation 3?', 'PlayStation 4', ['PS4', 'Playstation 4'], 1),
    W('Quale azienda giapponese ha creato Super Mario e Zelda?', 'Nintendo', [], 1),
    W('Quale azienda ha creato Sonic?', 'Sega', [], 1),
    W('Quale azienda ha creato Grand Theft Auto?', 'Rockstar Games', ['Rockstar'], 2),
    W('Come si chiama la città di Grand Theft Auto V?', 'Los Santos', [], 1),
    W('Come si chiama la serie di calcio di EA nata come FIFA e rinominata nel 2023?', 'EA Sports FC', ['EA FC', 'FC', 'FC 24'], 2),
    W('Come si chiama il cacciatore di mostri protagonista di The Witcher?', 'Geralt di Rivia', ['Geralt'], 1),
    W('Come si chiama il creatore di Mario e Zelda?', 'Shigeru Miyamoto', ['Miyamoto'], 1),
    W('Come si chiama il creatore di Metal Gear?', 'Hideo Kojima', ['Kojima'], 2),
    W('Come si chiama il protagonista di Assassin\'s Creed II?', 'Ezio Auditore', ['Ezio'], 1),
    W('Quale picchiaduro di Capcom ha Ryu, Ken e Chun-Li?', 'Street Fighter', [], 1),
    W('Come si chiama il nemico principale di Final Fantasy VII?', 'Sephiroth', [], 1),
    W('Come si chiama il protagonista di Final Fantasy VII?', 'Cloud Strife', ['Cloud'], 1),
    W('Come si chiama il fantasma rosso di Pac-Man?', 'Blinky', [], 2),
    W('Come si chiama il dinosauro verde amico di Mario?', 'Yoshi', [], 1),
    W('Come si chiama la console portatile Nintendo del 2004 con due schermi?', 'Nintendo DS', ['DS'], 1),
    W('Come si chiama la console ibrida di Nintendo uscita nel 2017?', 'Nintendo Switch', ['Switch'], 1),
    W('Come si chiama il negozio digitale per PC di Valve?', 'Steam', [], 1),
    W('Come si chiama la moneta virtuale di Roblox?', 'Robux', [], 1),
    W('Come si chiama l\'intelligenza artificiale che accompagna Master Chief?', 'Cortana', [], 2),
    W('Come si chiama il principale cattivo di The Legend of Zelda?', 'Ganon', ['Ganondorf'], 2),
    W('Quale gioco di Valve si gioca con un fucile che apre portali?', 'Portal', [], 2),
    W('Quale gioco Nintendo vede squadre di calamari che spruzzano inchiostro?', 'Splatoon', [], 2),
    W('Quale gioco Nintendo ha come protagonista una volpe pilota, Fox McCloud?', 'Star Fox', ['Starfox'], 3),
    W('Quale serie di giochi ha come protagonista Lara Croft?', 'Tomb Raider', [], 1),
    W('Quale serie ha come protagonista Kratos?', 'God of War', [], 1),
    W('Come si chiama la ragazza protagonista di The Last of Us?', 'Ellie', [], 2),
    W('Quale serie ha come protagonista Nathan Drake?', 'Uncharted', [], 2),
    W('Come si chiama il gioco di carte collezionabili di Blizzard?', 'Hearthstone', [], 2),
    W('Come si chiama il gioco di ruolo online di Blizzard ambientato ad Azeroth?', 'World of Warcraft', ['WoW'], 1),
    W('Come si chiama il MOBA più famoso di Riot Games?', 'League of Legends', ['LoL'], 1),
    W('Quale gioco ha come protagonisti gli «impostori» nello spazio?', 'Among Us', [], 1),
    W('Come si chiama il gioco in cui degli uccelli lanciati con una fionda colpiscono i maiali?', 'Angry Birds', [], 1),
    W('Come si chiama il gioco di dolcetti di King, famoso su smartphone?', 'Candy Crush Saga', ['Candy Crush'], 1),
    W('Come si chiama il gioco di skateboard legato al campione Tony Hawk?', 'Tony Hawk\'s Pro Skater', ['Tony Hawk'], 2),
    W('Come si chiama il robot blu eroe di Capcom?', 'Mega Man', ['Megaman'], 2),
    W('Come si chiama il rivale e amico biondo di Ryu in Street Fighter?', 'Ken', ['Ken Masters'], 2),
    W('Come si chiama il servizio in abbonamento di Microsoft per i giochi Xbox?', 'Xbox Game Pass', ['Game Pass'], 2),
    W('Come si chiama il servizio in abbonamento di Sony per PlayStation?', 'PlayStation Plus', ['PS Plus'], 2),
    W('Come si chiama la console portatile di Valve uscita nel 2022?', 'Steam Deck', [], 2),
    W('Come si chiama il gioco di Nintendo in cui un procione ti vende la casa su un\'isola?', 'Animal Crossing', ['Animal Crossing: New Horizons'], 2),
    W('Come si chiama il genere in cui vince l\'ultimo sopravvissuto?', 'Battle royale', [], 1),
    W('Come si chiama il gioco di FromSoftware ambientato nelle Terre Interne?', 'Elden Ring', [], 2),
    W('Come si chiama il cavallo di Link in Ocarina of Time?', 'Epona', [], 2),
    W('Come si chiama la fata che accompagna Link in Ocarina of Time?', 'Navi', [], 2),
    W('Quale gioco ha come protagonista Master Chief?', 'Halo', [], 1),
    W('Come si chiama il primo livello del primo Sonic the Hedgehog?', 'Green Hill Zone', ['Green Hill'], 3),
    W('Come si chiama la mascotte di Sega prima di Sonic?', 'Alex Kidd', [], 3),
    W('Chi ha dato la voce a Mario nei videogiochi fino al 2023?', 'Charles Martinet', ['Martinet'], 3),
  ];

  (D.pop = D.pop || []).push({
    id: 'videogiochi',
    name: 'Videogiochi',
    emoji: '🎮',
    color: '#3730a3',
    description: 'Mario, Zelda, Sonic, Minecraft, GTA, console, case produttrici e personaggi',
    quiz: [...quizA, ...quizB],
    tf,
    tables: [
      {
        id: 'console',
        items: consoleItems,
        fields: {
          casa: {
            ask: 'Chi ha prodotto {name}?',
            who: 'Quale di questi dispositivi è prodotto da {value}?',
            tf: 'Il produttore di {name} è {value}.',
            odd: 'Quale di questi dispositivi NON è prodotto da {value}?',
            typed: true,
          },
          tipo: {
            tf: '{name} è una {value}.',
            who: 'Quale di questi dispositivi è una {value}?',
            odd: 'Quale di questi dispositivi NON è una {value}?',
          },
        },
        numeric: {
          anno: {
            ask: 'In che anno ha debuttato {name}?',
            span: 30, tol: 1, format: 'year', duel: 'Quale è uscito per primo?', lowerWins: true,
            order: 'Metti in ordine di uscita, dal più vecchio', gap: 2,
          },
        },
      },
      {
        id: 'giochi',
        items: gameItems,
        fields: {
          casa: {
            ask: 'Quale azienda ha creato il videogioco {name}?',
            who: 'Quale di questi videogiochi è stato creato da {value}?',
            tf: '{name} è stato creato da {value}.',
            odd: 'Quale di questi videogiochi NON è stato creato da {value}?',
            typed: true,
          },
          genere: {
            ask: 'A quale genere appartiene il videogioco {name}?',
            who: 'Quale di questi videogiochi appartiene al genere «{value}»?',
            tf: '{name} appartiene al genere «{value}».',
            odd: 'Quale di questi videogiochi NON appartiene al genere «{value}»?',
          },
        },
        numeric: {
          anno: {
            ask: 'In che anno è uscito per la prima volta {name}?',
            span: 30, tol: 1, format: 'year', duel: 'Quale è uscito per primo?', lowerWins: true,
            order: 'Metti in ordine di uscita, dal più vecchio', gap: 2,
          },
        },
      },
      {
        id: 'personaggi',
        items: charItems,
        fields: {
          serie: {
            ask: 'A quale serie di videogiochi appartiene {name}?',
            who: 'Quale di questi personaggi appartiene alla serie «{value}»?',
            tf: '{name} appartiene alla serie «{value}».',
            odd: 'Quale di questi personaggi NON appartiene alla serie «{value}»?',
            typed: true,
          },
          ruolo: {
            tf: '{name} è un personaggio {value}.',
            who: 'Quale di questi è un personaggio {value}?',
            odd: 'Trova l\'intruso: quale NON è un personaggio {value}?',
          },
        },
        numeric: {
          anno: {
            ask: 'In che anno compare per la prima volta {name}?',
            span: 30, tol: 1, format: 'year', duel: 'Chi è comparso per primo?', lowerWins: true,
            order: 'Metti in ordine di prima apparizione, dal primo', gap: 2,
          },
        },
      },
      {
        id: 'serie',
        items: serieItems,
        fields: {
          casa: {
            ask: 'Quale azienda ha creato {name}?',
            who: 'Quale di questi titoli è opera di {value}?',
            tf: 'L\'azienda che ha creato {name} è {value}.',
            odd: 'Quale di questi titoli NON è opera di {value}?',
            typed: true,
          },
          paese: {
            ask: 'Qual è il paese d\'origine di {name}?',
            who: 'Quale di questi titoli ha origine in questo paese: {value}?',
            tf: 'Paese d\'origine di {name}: {value}.',
            odd: 'Quale di questi titoli NON ha origine in questo paese: {value}?',
            typed: true,
          },
        },
        numeric: {
          anno: {
            ask: 'In che anno è uscito il primo gioco di {name}?',
            span: 30, tol: 1, format: 'year', duel: 'Quale è nato prima?', lowerWins: true,
            order: 'Metti in ordine di nascita, dal più antico', gap: 2,
          },
        },
      },
    ],
    quotes,
    quoteText: 'Chi pronuncia questa frase nel videogioco?',
    emojis,
    emojiText: 'Quale videogioco (o personaggio) raccontano queste emoji?',
    order,
    numbers,
    typed,
  });
})(typeof window !== 'undefined' ? window : globalThis);
