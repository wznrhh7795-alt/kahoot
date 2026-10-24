// Cinema (domande in più per la categoria classica «Cinema») per Quizzone! — fatti verificati, titoli italiani.
(function (root) {
  'use strict';
  const D = (root.QZ_DATA = root.QZ_DATA || {});
  const quiz = [], tf = [], tables = [], quotes = [], emojis = [], order = [], numbers = [], typed = [];
  // Quiz: Q(domanda, giusta, 'sbagliata1|sbagliata2|sbagliata3', difficoltà)
  const Q = (q, a, w, d) => quiz.push({ q, a, wrong: w.split('|'), d });
  // Vero/falso: V(affermazione, vero?, difficoltà, spiegazione se falso)
  const V = (q, a, d, why) => tf.push(why ? { q, a, d, why } : { q, a, d });
  // Righe di tabella "colonna|colonna|…" → oggetti (le colonne numeriche e «d» diventano numeri; vuoto = omesso)
  const NUM = new Set(['anno', 'cerimonia', 'd']);
  const rows = (cols, s) => s.trim().split('\n').filter((l) => l.trim()).map((l) => {
    const p = l.split('|').map((x) => x.trim());
    if (p.length !== cols.length) throw new Error('colonne errate: ' + l);
    const o = {};
    cols.forEach((c, i) => { if (p[i] !== '') o[c] = NUM.has(c) ? Number(p[i]) : p[i]; });
    return o;
  });
  // ===== Tabella 1: film (regista + anno) — nessun titolo già nella categoria classica =====
  tables.push({
    id: 'filmregisti',
    items: rows(['name', 'regista', 'anno', 'd'], `
La donna che visse due volte|Alfred Hitchcock|1958|2
Intrigo internazionale|Alfred Hitchcock|1959|2
Rebecca - La prima moglie|Alfred Hitchcock|1940|3
Il delitto perfetto|Alfred Hitchcock|1954|2
Nodo alla gola|Alfred Hitchcock|1948|3
Il club dei 39|Alfred Hitchcock|1935|3
Marnie|Alfred Hitchcock|1964|3
Io ti salverò|Alfred Hitchcock|1945|3
Il sospetto|Alfred Hitchcock|1941|3
Orizzonti di gloria|Stanley Kubrick|1957|2
Spartacus|Stanley Kubrick|1960|2
Il dottor Stranamore|Stanley Kubrick|1964|2
Barry Lyndon|Stanley Kubrick|1975|2
Full Metal Jacket|Stanley Kubrick|1987|1
Eyes Wide Shut|Stanley Kubrick|1999|1
Incontri ravvicinati del terzo tipo|Steven Spielberg|1977|2
Il colore viola|Steven Spielberg|1985|2
Hook - Capitan Uncino|Steven Spielberg|1991|1
Salvate il soldato Ryan|Steven Spielberg|1998|1
A.I. - Intelligenza artificiale|Steven Spielberg|2001|2
Prova a prendermi|Steven Spielberg|2002|2
Minority Report|Steven Spielberg|2002|2
The Terminal|Steven Spielberg|2004|2
Munich|Steven Spielberg|2005|3
War Horse|Steven Spielberg|2011|3
Lincoln|Steven Spielberg|2012|2
Il ponte delle spie|Steven Spielberg|2015|3
Il GGG - Il grande gigante gentile|Steven Spielberg|2016|3
Ready Player One|Steven Spielberg|2018|2
West Side Story|Steven Spielberg|2021|2
The Fabelmans|Steven Spielberg|2022|2
Mean Streets|Martin Scorsese|1973|3
Toro scatenato|Martin Scorsese|1980|2
Re per una notte|Martin Scorsese|1982|3
Fuori orario|Martin Scorsese|1985|3
Il colore dei soldi|Martin Scorsese|1986|3
Cape Fear - Il promontorio della paura|Martin Scorsese|1991|3
L'età dell'innocenza|Martin Scorsese|1993|3
Casinò|Martin Scorsese|1995|2
Gangs of New York|Martin Scorsese|2002|2
The Aviator|Martin Scorsese|2004|2
The Departed - Il bene e il male|Martin Scorsese|2006|1
Shutter Island|Martin Scorsese|2010|1
Hugo Cabret|Martin Scorsese|2011|2
The Wolf of Wall Street|Martin Scorsese|2013|1
Silence|Martin Scorsese|2016|3
The Irishman|Martin Scorsese|2019|2
Killers of the Flower Moon|Martin Scorsese|2023|2
Il padrino - Parte II|Francis Ford Coppola|1974|2
La conversazione|Francis Ford Coppola|1974|3
Rusty il selvaggio|Francis Ford Coppola|1983|3
I ragazzi della 56ª strada|Francis Ford Coppola|1983|3
Cotton Club|Francis Ford Coppola|1984|3
Peggy Sue si è sposata|Francis Ford Coppola|1986|3
Il padrino - Parte III|Francis Ford Coppola|1990|2
Dracula di Bram Stoker|Francis Ford Coppola|1992|2
Megalopolis|Francis Ford Coppola|2024|3
Le iene|Quentin Tarantino|1992|1
Jackie Brown|Quentin Tarantino|1997|2
Kill Bill: Volume 2|Quentin Tarantino|2004|2
A prova di morte|Quentin Tarantino|2007|3
Bastardi senza gloria|Quentin Tarantino|2009|1
Django Unchained|Quentin Tarantino|2012|1
The Hateful Eight|Quentin Tarantino|2015|2
C'era una volta a... Hollywood|Quentin Tarantino|2019|1
Following|Christopher Nolan|1998|3
Memento|Christopher Nolan|2000|2
Batman Begins|Christopher Nolan|2005|2
The Prestige|Christopher Nolan|2006|2
Il cavaliere oscuro|Christopher Nolan|2008|1
Il cavaliere oscuro - Il ritorno|Christopher Nolan|2012|2
Dunkirk|Christopher Nolan|2017|2
Tenet|Christopher Nolan|2020|2
I duellanti|Ridley Scott|1977|3
Legend|Ridley Scott|1985|3
Thelma & Louise|Ridley Scott|1991|1
1492 - La conquista del paradiso|Ridley Scott|1992|3
Soldato Jane|Ridley Scott|1997|3
Black Hawk Down - Black Hawk abbattuto|Ridley Scott|2001|2
Le crociate - Kingdom of Heaven|Ridley Scott|2005|2
American Gangster|Ridley Scott|2007|2
Prometheus|Ridley Scott|2012|2
Sopravvissuto - The Martian|Ridley Scott|2015|1
Alien: Covenant|Ridley Scott|2017|3
Tutti i soldi del mondo|Ridley Scott|2017|2
House of Gucci|Ridley Scott|2021|2
Napoleon|Ridley Scott|2023|2
Il gladiatore II|Ridley Scott|2024|2
Aliens - Scontro finale|James Cameron|1986|2
Abyss|James Cameron|1989|2
Terminator 2 - Il giorno del giudizio|James Cameron|1991|1
True Lies|James Cameron|1994|1
Avatar - La via dell'acqua|James Cameron|2022|1
Chi ha incastrato Roger Rabbit|Robert Zemeckis|1988|2
Ritorno al futuro - Parte II|Robert Zemeckis|1989|2
Ritorno al futuro - Parte III|Robert Zemeckis|1990|2
La morte ti fa bella|Robert Zemeckis|1992|3
Contact|Robert Zemeckis|1997|2
Cast Away|Robert Zemeckis|2000|1
Le verità nascoste|Robert Zemeckis|2000|3
Polar Express|Robert Zemeckis|2004|2
Flight|Robert Zemeckis|2012|3
The Walk|Robert Zemeckis|2015|3
Allied - Un'ombra nascosta|Robert Zemeckis|2016|3
Creature del cielo|Peter Jackson|1994|3
Amabili resti|Peter Jackson|2009|3
Lo Hobbit - Un viaggio inaspettato|Peter Jackson|2012|2
Beetlejuice - Spiritello porcello|Tim Burton|1988|2
Batman|Tim Burton|1989|1
Edward mani di forbice|Tim Burton|1990|1
Batman - Il ritorno|Tim Burton|1992|2
Ed Wood|Tim Burton|1994|3
Mars Attacks!|Tim Burton|1996|2
Il mistero di Sleepy Hollow|Tim Burton|1999|2
Big Fish - Le storie di una vita incredibile|Tim Burton|2003|2
La fabbrica di cioccolato|Tim Burton|2005|1
La sposa cadavere|Tim Burton|2005|2
Sweeney Todd - Il diabolico barbiere di Fleet Street|Tim Burton|2007|3
Alice in Wonderland|Tim Burton|2010|1
Frankenweenie|Tim Burton|2012|3
Big Eyes|Tim Burton|2014|3
Beetlejuice Beetlejuice|Tim Burton|2024|2
Gli spietati|Clint Eastwood|1992|2
Un mondo perfetto|Clint Eastwood|1993|3
I ponti di Madison County|Clint Eastwood|1995|2
Mystic River|Clint Eastwood|2003|2
Million Dollar Baby|Clint Eastwood|2004|1
Lettere da Iwo Jima|Clint Eastwood|2006|3
Changeling|Clint Eastwood|2008|3
Gran Torino|Clint Eastwood|2008|1
Invictus - L'invincibile|Clint Eastwood|2009|2
American Sniper|Clint Eastwood|2014|1
Sully|Clint Eastwood|2016|2
Il corriere - The Mule|Clint Eastwood|2018|3
Giurato numero 2|Clint Eastwood|2024|3
Il dormiglione|Woody Allen|1973|3
Io e Annie|Woody Allen|1977|2
Manhattan|Woody Allen|1979|2
Zelig|Woody Allen|1983|3
Broadway Danny Rose|Woody Allen|1984|3
La rosa purpurea del Cairo|Woody Allen|1985|3
Hannah e le sue sorelle|Woody Allen|1986|3
Pallottole su Broadway|Woody Allen|1994|3
Match Point|Woody Allen|2005|1
Vicky Cristina Barcelona|Woody Allen|2008|2
Midnight in Paris|Woody Allen|2011|1
To Rome with Love|Woody Allen|2012|2
Blue Jasmine|Woody Allen|2013|2
Café Society|Woody Allen|2016|2
Un giorno di pioggia a New York|Woody Allen|2019|3
Rushmore|Wes Anderson|1998|3
I Tenenbaum|Wes Anderson|2001|2
Le avventure acquatiche di Steve Zissou|Wes Anderson|2004|3
Il treno per il Darjeeling|Wes Anderson|2007|3
Fantastic Mr. Fox|Wes Anderson|2009|3
Moonrise Kingdom|Wes Anderson|2012|2
Grand Budapest Hotel|Wes Anderson|2014|1
L'isola dei cani|Wes Anderson|2018|2
The French Dispatch|Wes Anderson|2021|3
Asteroid City|Wes Anderson|2023|3
Arizona Junior|Joel ed Ethan Coen|1987|3
Crocevia della morte|Joel ed Ethan Coen|1990|3
Barton Fink|Joel ed Ethan Coen|1991|3
Mister Hula Hoop|Joel ed Ethan Coen|1994|3
Fargo|Joel ed Ethan Coen|1996|1
Il grande Lebowski|Joel ed Ethan Coen|1998|1
Fratello, dove sei?|Joel ed Ethan Coen|2000|2
Prima ti sposo poi ti rovino|Joel ed Ethan Coen|2003|3
Non è un paese per vecchi|Joel ed Ethan Coen|2007|1
Burn After Reading - A prova di spia|Joel ed Ethan Coen|2008|2
A Serious Man|Joel ed Ethan Coen|2009|3
A proposito di Davis|Joel ed Ethan Coen|2013|3
Ave, Cesare!|Joel ed Ethan Coen|2016|3
Il coltello nell'acqua|Roman Polanski|1962|3
Repulsione|Roman Polanski|1965|3
Rosemary's Baby - Nastro rosso a New York|Roman Polanski|1968|2
Chinatown|Roman Polanski|1974|2
Tess|Roman Polanski|1979|3
Frantic|Roman Polanski|1988|3
La morte e la fanciulla|Roman Polanski|1994|3
La nona porta|Roman Polanski|1999|3
Il pianista|Roman Polanski|2002|1
L'uomo nell'ombra|Roman Polanski|2010|3
Carnage|Roman Polanski|2011|3
L'ufficiale e la spia|Roman Polanski|2019|3
Alien 3|David Fincher|1992|3
Seven|David Fincher|1995|1
The Game - Nessuna regola|David Fincher|1997|3
Fight Club|David Fincher|1999|1
Panic Room|David Fincher|2002|2
Zodiac|David Fincher|2007|2
Il curioso caso di Benjamin Button|David Fincher|2008|1
The Social Network|David Fincher|2010|1
Millennium - Uomini che odiano le donne|David Fincher|2011|2
L'amore bugiardo - Gone Girl|David Fincher|2014|2
Mank|David Fincher|2020|3
The Killer|David Fincher|2023|3
La donna che canta|Denis Villeneuve|2010|3
Prisoners|Denis Villeneuve|2013|2
Enemy|Denis Villeneuve|2013|3
Sicario|Denis Villeneuve|2015|2
Arrival|Denis Villeneuve|2016|1
Blade Runner 2049|Denis Villeneuve|2017|1
Dune - Parte due|Denis Villeneuve|2024|1
Piccoli omicidi tra amici|Danny Boyle|1994|3
Trainspotting|Danny Boyle|1996|1
The Beach|Danny Boyle|2000|2
28 giorni dopo|Danny Boyle|2002|2
Sunshine|Danny Boyle|2007|3
The Millionaire|Danny Boyle|2008|1
127 ore|Danny Boyle|2010|2
Steve Jobs|Danny Boyle|2015|2
Yesterday|Danny Boyle|2019|2
Boogie Nights - L'altra Hollywood|Paul Thomas Anderson|1997|2
Magnolia|Paul Thomas Anderson|1999|2
Ubriaco d'amore|Paul Thomas Anderson|2002|3
Il petroliere|Paul Thomas Anderson|2007|2
The Master|Paul Thomas Anderson|2012|3
Vizio di forma|Paul Thomas Anderson|2014|3
Il filo nascosto|Paul Thomas Anderson|2017|2
Licorice Pizza|Paul Thomas Anderson|2021|2
Donne sull'orlo di una crisi di nervi|Pedro Almodóvar|1988|2
Légami!|Pedro Almodóvar|1989|3
Tacchi a spillo|Pedro Almodóvar|1991|3
Tutto su mia madre|Pedro Almodóvar|1999|1
Parla con lei|Pedro Almodóvar|2002|2
La mala educación|Pedro Almodóvar|2004|3
Volver|Pedro Almodóvar|2006|2
Gli abbracci spezzati|Pedro Almodóvar|2009|3
La pelle che abito|Pedro Almodóvar|2011|2
Dolor y gloria|Pedro Almodóvar|2019|3
Madres paralelas|Pedro Almodóvar|2021|3
La stanza accanto|Pedro Almodóvar|2024|3
Rashomon|Akira Kurosawa|1950|2
Vivere|Akira Kurosawa|1952|3
I sette samurai|Akira Kurosawa|1954|1
La fortezza nascosta|Akira Kurosawa|1958|3
Yojimbo - La sfida del samurai|Akira Kurosawa|1961|3
Kagemusha - L'ombra del guerriero|Akira Kurosawa|1980|3
Ran|Akira Kurosawa|1985|2
I 400 colpi|François Truffaut|1959|2
Jules e Jim|François Truffaut|1962|2
Fahrenheit 451|François Truffaut|1966|2
Baci rubati|François Truffaut|1968|3
Il ragazzo selvaggio|François Truffaut|1970|3
Effetto notte|François Truffaut|1973|3
L'ultimo metrò|François Truffaut|1980|3
Il settimo sigillo|Ingmar Bergman|1957|2
Il posto delle fragole|Ingmar Bergman|1957|3
Persona|Ingmar Bergman|1966|3
L'ora del lupo|Ingmar Bergman|1968|3
Sussurri e grida|Ingmar Bergman|1972|3
Sinfonia d'autunno|Ingmar Bergman|1978|3
Fanny e Alexander|Ingmar Bergman|1982|2
Le onde del destino|Lars von Trier|1996|3
Dancer in the Dark|Lars von Trier|2000|3
Dogville|Lars von Trier|2003|3
Antichrist|Lars von Trier|2009|3
Melancholia|Lars von Trier|2011|2
Nymphomaniac|Lars von Trier|2013|3
Alice nelle città|Wim Wenders|1974|3
Paris, Texas|Wim Wenders|1984|2
Il cielo sopra Berlino|Wim Wenders|1987|2
Buena Vista Social Club|Wim Wenders|1999|3
Pina|Wim Wenders|2011|3
Perfect Days|Wim Wenders|2023|2
Aguirre, furore di Dio|Werner Herzog|1972|3
L'enigma di Kaspar Hauser|Werner Herzog|1974|3
Nosferatu, il principe della notte|Werner Herzog|1979|3
Fitzcarraldo|Werner Herzog|1982|3
Grizzly Man|Werner Herzog|2005|3
Il dottor Mabuse|Fritz Lang|1922|3
I Nibelunghi|Fritz Lang|1924|3
Metropolis|Fritz Lang|1927|1
M - Il mostro di Düsseldorf|Fritz Lang|1931|2
Furia|Fritz Lang|1936|3
Il grande caldo|Fritz Lang|1953|3
Nosferatu il vampiro|Friedrich Wilhelm Murnau|1922|2
L'ultima risata|Friedrich Wilhelm Murnau|1924|3
Faust|Friedrich Wilhelm Murnau|1926|3
Aurora|Friedrich Wilhelm Murnau|1927|3
Il monello|Charlie Chaplin|1921|2
La febbre dell'oro|Charlie Chaplin|1925|1
Il circo|Charlie Chaplin|1928|3
Luci della città|Charlie Chaplin|1931|2
Monsieur Verdoux|Charlie Chaplin|1947|3
Luci della ribalta|Charlie Chaplin|1952|3
Un re a New York|Charlie Chaplin|1957|3
Quarto potere|Orson Welles|1941|1
L'orgoglio degli Amberson|Orson Welles|1942|3
La signora di Shanghai|Orson Welles|1947|3
L'infernale Quinlan|Orson Welles|1958|3
La fiamma del peccato|Billy Wilder|1944|3
Giorni perduti|Billy Wilder|1945|3
Viale del tramonto|Billy Wilder|1950|2
Stalag 17|Billy Wilder|1953|3
Quando la moglie è in vacanza|Billy Wilder|1955|2
Testimone d'accusa|Billy Wilder|1957|2
A qualcuno piace caldo|Billy Wilder|1959|1
L'appartamento|Billy Wilder|1960|2
Irma la dolce|Billy Wilder|1963|3
Prima pagina|Billy Wilder|1974|3
Accadde una notte|Frank Capra|1934|2
È arrivata la felicità|Frank Capra|1936|3
L'eterna illusione|Frank Capra|1938|3
Mr. Smith va a Washington|Frank Capra|1939|3
Arsenico e vecchi merletti|Frank Capra|1944|2
La vita è meravigliosa|Frank Capra|1946|1
Ombre rosse|John Ford|1939|2
Furore|John Ford|1940|2
Com'era verde la mia valle|John Ford|1941|3
Il massacro di Fort Apache|John Ford|1948|3
Rio Grande|John Ford|1950|3
Un uomo tranquillo|John Ford|1952|2
Sentieri selvaggi|John Ford|1956|2
L'uomo che uccise Liberty Valance|John Ford|1962|2
La signora Miniver|William Wyler|1942|3
I migliori anni della nostra vita|William Wyler|1946|3
L'ereditiera|William Wyler|1949|3
Vacanze romane|William Wyler|1953|1
Il collezionista|William Wyler|1965|3
Funny Girl|William Wyler|1968|3
Breve incontro|David Lean|1945|3
Il ponte sul fiume Kwai|David Lean|1957|1
Lawrence d'Arabia|David Lean|1962|1
Il dottor Živago|David Lean|1965|1
La figlia di Ryan|David Lean|1970|3
Passaggio in India|David Lean|1984|3
This Is Spinal Tap|Rob Reiner|1984|3
Stand by Me - Ricordo di un'estate|Rob Reiner|1986|2
La storia fantastica|Rob Reiner|1987|2
Harry, ti presento Sally|Rob Reiner|1989|1
Misery non deve morire|Rob Reiner|1990|2
Codice d'onore|Rob Reiner|1992|2
Il presidente - Una storia d'amore|Rob Reiner|1995|3
Carrie - Lo sguardo di Satana|Brian De Palma|1976|2
Vestito per uccidere|Brian De Palma|1980|3
Blow Out|Brian De Palma|1981|3
Omicidio a luci rosse|Brian De Palma|1984|3
Gli intoccabili|Brian De Palma|1987|2
Carlito's Way|Brian De Palma|1993|2
Mission: Impossible|Brian De Palma|1996|2
Dahlia nera|Brian De Palma|2006|3
Platoon|Oliver Stone|1986|1
Wall Street|Oliver Stone|1987|2
Talk Radio|Oliver Stone|1988|3
Nato il quattro luglio|Oliver Stone|1989|2
The Doors|Oliver Stone|1991|2
JFK - Un caso ancora aperto|Oliver Stone|1991|2
Assassini nati|Oliver Stone|1994|2
Nixon|Oliver Stone|1995|3
Ogni maledetta domenica|Oliver Stone|1999|2
Alexander|Oliver Stone|2004|2
W.|Oliver Stone|2008|3
Splash - Una sirena a Manhattan|Ron Howard|1984|2
Cocoon|Ron Howard|1985|2
Willow|Ron Howard|1988|3
Apollo 13|Ron Howard|1995|1
A Beautiful Mind|Ron Howard|2001|2
Il codice da Vinci|Ron Howard|2006|1
Frost/Nixon - Il duello|Ron Howard|2008|3
Angeli e demoni|Ron Howard|2009|2
Rush|Ron Howard|2013|2
Solo: A Star Wars Story|Ron Howard|2018|3
L'ululato|Joe Dante|1981|3
Gremlins|Joe Dante|1984|1
Explorers|Joe Dante|1985|3
Salto nel buio|Joe Dante|1987|3
Gremlins 2 - La nuova stirpe|Joe Dante|1990|2
Matinée|Joe Dante|1993|3
Il presagio|Richard Donner|1976|2
Superman|Richard Donner|1978|1
Ladyhawke|Richard Donner|1985|3
I Goonies|Richard Donner|1985|1
Arma letale|Richard Donner|1987|2
Radio Flyer|Richard Donner|1992|3
Maverick|Richard Donner|1994|3
Distretto 13 - Le brigate della morte|John Carpenter|1976|3
Halloween - La notte delle streghe|John Carpenter|1978|1
Fog|John Carpenter|1980|3
1997: Fuga da New York|John Carpenter|1981|2
La cosa|John Carpenter|1982|2
Grosso guaio a Chinatown|John Carpenter|1986|2
Il signore del male|John Carpenter|1987|3
Essi vivono|John Carpenter|1988|3
Il seme della follia|John Carpenter|1994|3
Le colline hanno gli occhi|Wes Craven|1977|3
Nightmare - Dal profondo della notte|Wes Craven|1984|1
Il serpente e l'arcobaleno|Wes Craven|1988|3
Vampiro a Brooklyn|Wes Craven|1995|3
Scream|Wes Craven|1996|1
La casa 2|Sam Raimi|1987|3
Darkman|Sam Raimi|1990|3
L'armata delle tenebre|Sam Raimi|1992|2
Un semplice piano|Sam Raimi|1998|3
Drag Me to Hell|Sam Raimi|2009|3
La notte dei morti viventi|George A. Romero|1968|2
Zombi|George A. Romero|1978|2
Creepshow|George A. Romero|1982|3
Il giorno degli zombi|George A. Romero|1985|3
La terra dei morti viventi|George A. Romero|2005|3
Il braccio violento della legge|William Friedkin|1971|3
L'esorcista|William Friedkin|1973|1
Il salario della paura|William Friedkin|1977|3
Cruising|William Friedkin|1980|3
Vivere e morire a Los Angeles|William Friedkin|1985|3
La parola ai giurati|Sidney Lumet|1957|2
Serpico|Sidney Lumet|1973|2
Assassinio sull'Orient Express|Sidney Lumet|1974|2
Quel pomeriggio di un giorno da cani|Sidney Lumet|1975|2
Network|Sidney Lumet|1976|3
Il verdetto|Sidney Lumet|1982|3
Come eravamo|Sydney Pollack|1973|2
I tre giorni del Condor|Sydney Pollack|1975|2
Tootsie|Sydney Pollack|1982|1
La mia Africa|Sydney Pollack|1985|1
Havana|Sydney Pollack|1990|3
Il socio|Sydney Pollack|1993|2
Chi ha paura di Virginia Woolf?|Mike Nichols|1966|2
Il laureato|Mike Nichols|1967|1
Conoscenza carnale|Mike Nichols|1971|3
Silkwood|Mike Nichols|1983|3
Una donna in carriera|Mike Nichols|1988|2
Closer|Mike Nichols|2004|2
La guerra di Charlie Wilson|Mike Nichols|2007|3
Un tram che si chiama Desiderio|Elia Kazan|1951|2
Viva Zapata!|Elia Kazan|1952|3
Fronte del porto|Elia Kazan|1954|2
La valle dell'Eden|Elia Kazan|1955|2
Splendore nell'erba|Elia Kazan|1961|3
Mezzogiorno di fuoco|Fred Zinnemann|1952|1
Da qui all'eternità|Fred Zinnemann|1953|2
Oklahoma!|Fred Zinnemann|1955|3
Un uomo per tutte le stagioni|Fred Zinnemann|1966|3
Il giorno dello sciacallo|Fred Zinnemann|1973|3
Julia|Fred Zinnemann|1977|3
Lettera a tre mogli|Joseph L. Mankiewicz|1949|3
Eva contro Eva|Joseph L. Mankiewicz|1950|2
Improvvisamente l'estate scorsa|Joseph L. Mankiewicz|1959|3
Gli insospettabili|Joseph L. Mankiewicz|1972|3
Scandalo a Filadelfia|George Cukor|1940|3
Angoscia|George Cukor|1944|3
La costola di Adamo|George Cukor|1949|3
My Fair Lady|George Cukor|1964|1
Il pirata|Vincente Minnelli|1948|3
Un americano a Parigi|Vincente Minnelli|1951|2
Spettacolo di varietà|Vincente Minnelli|1953|3
Brama di vivere|Vincente Minnelli|1956|3
Gigi|Vincente Minnelli|1958|2
Sette spose per sette fratelli|Stanley Donen|1954|2
Sciarada|Stanley Donen|1963|2
Arabesque|Stanley Donen|1966|3
Due per la strada|Stanley Donen|1967|2
Operazione sottoveste|Blake Edwards|1959|3
Colazione da Tiffany|Blake Edwards|1961|1
Giorni di vino e rose|Blake Edwards|1962|3
La pantera rosa|Blake Edwards|1963|1
Hollywood Party|Blake Edwards|1968|2
"10"|Blake Edwards|1979|3
S.O.B.|Blake Edwards|1981|3
Victor Victoria|Blake Edwards|1982|2
Per favore, non toccate le vecchiette|Mel Brooks|1967|3
Mezzogiorno e mezzo di fuoco|Mel Brooks|1974|2
Il giovane Frankenstein|Mel Brooks|1974|1
Alta tensione|Mel Brooks|1977|3
La pazza storia del mondo|Mel Brooks|1981|3
Balle spaziali|Mel Brooks|1987|1
Robin Hood - Un uomo in calzamaglia|Mel Brooks|1993|2
Dracula morto e contento|Mel Brooks|1995|3
Palla da golf|Harold Ramis|1980|3
Ricomincio da capo|Harold Ramis|1993|1
Mi sdoppio, mi triplico|Harold Ramis|1996|3
Terapia e pallottole|Harold Ramis|1999|2
Ghostbusters - Acchiappafantasmi|Ivan Reitman|1984|1
Ghostbusters II|Ivan Reitman|1989|2
Gemelli|Ivan Reitman|1988|2
Un poliziotto alle elementari|Ivan Reitman|1990|3
Dave - Presidente per un giorno|Ivan Reitman|1993|3
Junior|Ivan Reitman|1994|3
Evolution|Ivan Reitman|2001|3
La famiglia Addams|Barry Sonnenfeld|1991|1
I valori della famiglia Addams|Barry Sonnenfeld|1993|2
Get Shorty|Barry Sonnenfeld|1995|3
Men in Black|Barry Sonnenfeld|1997|1
Wild Wild West|Barry Sonnenfeld|1999|3
Men in Black II|Barry Sonnenfeld|2002|2
Fa' la cosa giusta|Spike Lee|1989|2
Mo' Better Blues|Spike Lee|1990|3
Jungle Fever|Spike Lee|1991|3
Malcolm X|Spike Lee|1992|2
Inside Man|Spike Lee|2006|2
BlacKkKlansman|Spike Lee|2018|2
Da 5 Bloods - Come fratelli|Spike Lee|2020|3
Point Break - Punto di rottura|Kathryn Bigelow|1991|2
Strange Days|Kathryn Bigelow|1995|3
K-19|Kathryn Bigelow|2002|3
The Hurt Locker|Kathryn Bigelow|2008|2
Zero Dark Thirty|Kathryn Bigelow|2012|2
Detroit|Kathryn Bigelow|2017|3
Il giardino delle vergini suicide|Sofia Coppola|1999|3
Lost in Translation - L'amore tradotto|Sofia Coppola|2003|2
Marie Antoinette|Sofia Coppola|2006|2
Somewhere|Sofia Coppola|2010|3
The Bling Ring|Sofia Coppola|2013|3
L'inganno|Sofia Coppola|2017|3
Priscilla|Sofia Coppola|2023|2
Un angelo alla mia tavola|Jane Campion|1990|3
Lezioni di piano|Jane Campion|1993|2
Ritratto di signora|Jane Campion|1996|3
In the Cut|Jane Campion|2003|3
Bright Star|Jane Campion|2009|3
Il potere del cane|Jane Campion|2021|2
Mangiare bere uomo donna|Ang Lee|1994|3
Ragione e sentimento|Ang Lee|1995|2
La tempesta di ghiaccio|Ang Lee|1997|3
La tigre e il dragone|Ang Lee|2000|1
I segreti di Brokeback Mountain|Ang Lee|2005|1
Vita di Pi|Ang Lee|2012|1
Gemini Man|Ang Lee|2019|3
Memorie di un assassino|Bong Joon-ho|2003|3
The Host|Bong Joon-ho|2006|2
Snowpiercer|Bong Joon-ho|2013|2
Okja|Bong Joon-ho|2017|2
Mickey 17|Bong Joon-ho|2025|2
Mr. Vendetta|Park Chan-wook|2002|3
Oldboy|Park Chan-wook|2003|2
Lady Vendetta|Park Chan-wook|2005|3
Mademoiselle|Park Chan-wook|2016|2
Decision to Leave|Park Chan-wook|2022|3
Hong Kong Express|Wong Kar-wai|1994|3
Angeli perduti|Wong Kar-wai|1995|3
Happy Together|Wong Kar-wai|1997|3
In the Mood for Love|Wong Kar-wai|2000|2
2046|Wong Kar-wai|2004|3
Sorgo rosso|Zhang Yimou|1987|3
Lanterne rosse|Zhang Yimou|1991|3
Hero|Zhang Yimou|2002|2
La foresta dei pugnali volanti|Zhang Yimou|2004|3
Subway|Luc Besson|1985|3
Nikita|Luc Besson|1990|2
Léon|Luc Besson|1994|1
Il quinto elemento|Luc Besson|1997|1
Lucy|Luc Besson|2014|2
Valerian e la città dei mille pianeti|Luc Besson|2017|3
Lock & Stock - Pazzi scatenati|Guy Ritchie|1998|2
Snatch - Lo strappo|Guy Ritchie|2000|2
RocknRolla|Guy Ritchie|2008|3
Sherlock Holmes|Guy Ritchie|2009|1
Operazione U.N.C.L.E.|Guy Ritchie|2015|3
King Arthur - Il potere della spada|Guy Ritchie|2017|3
The Gentlemen|Guy Ritchie|2019|2
Prima dell'alba|Richard Linklater|1995|2
School of Rock|Richard Linklater|2003|1
A Scanner Darkly - Un oscuro scrutare|Richard Linklater|2006|3
Boyhood|Richard Linklater|2014|2
Daunbailò|Jim Jarmusch|1986|3
Taxisti di notte|Jim Jarmusch|1991|3
Dead Man|Jim Jarmusch|1995|3
Coffee and Cigarettes|Jim Jarmusch|2003|3
Broken Flowers|Jim Jarmusch|2005|3
Paterson|Jim Jarmusch|2016|3
Eraserhead|David Lynch|1977|3
The Elephant Man|David Lynch|1980|2
Velluto blu|David Lynch|1986|2
Cuore selvaggio|David Lynch|1990|3
Strade perdute|David Lynch|1997|3
Una storia vera|David Lynch|1999|3
Mulholland Drive|David Lynch|2001|1
Inland Empire|David Lynch|2006|3
Brazil|Terry Gilliam|1985|2
Le avventure del barone di Munchausen|Terry Gilliam|1988|3
L'esercito delle 12 scimmie|Terry Gilliam|1995|2
Paura e delirio a Las Vegas|Terry Gilliam|1998|2
I fratelli Grimm e l'incantevole strega|Terry Gilliam|2005|3
Scanners|David Cronenberg|1981|3
Videodrome|David Cronenberg|1983|3
La zona morta|David Cronenberg|1983|3
La mosca|David Cronenberg|1986|2
Inseparabili|David Cronenberg|1988|3
A History of Violence|David Cronenberg|2005|2
La promessa dell'assassino|David Cronenberg|2007|3
Cosmopolis|David Cronenberg|2012|3
Le ali della libertà|Frank Darabont|1994|1
Il miglio verde|Frank Darabont|1999|1
Majestic|Frank Darabont|2001|3
The Mist|Frank Darabont|2007|3
Chicago|Rob Marshall|2002|2
Memorie di una geisha|Rob Marshall|2005|2
Nine|Rob Marshall|2009|3
Into the Woods|Rob Marshall|2014|3
Il ritorno di Mary Poppins|Rob Marshall|2018|3
Mamma, ho perso l'aereo|Chris Columbus|1990|1
Mrs. Doubtfire - Mammo per sempre|Chris Columbus|1993|1
Rent|Chris Columbus|2005|3
Pixels|Chris Columbus|2015|3
The Ring|Gore Verbinski|2002|2
Rango|Gore Verbinski|2011|3
The Lone Ranger|Gore Verbinski|2013|3
The Mexican - Amore senza la sicura|Gore Verbinski|2001|3
`),
    fields: {
      regista: {
        ask: 'Chi ha diretto «{name}»?',
        who: 'Quale di questi film è stato diretto da {value}?',
        tf: '«{name}» è stato diretto da {value}.',
        odd: 'Trova l\'intruso: quale di questi film NON è stato diretto da {value}?',
        typed: 'person',
      },
    },
    numeric: {
      anno: {
        ask: 'In che anno è uscito «{name}»?',
        span: 30, tol: 1, format: 'year', unit: '', step: 1,
        duel: 'Quale film è uscito prima?', lowerWins: true,
        order: 'Metti in ordine di uscita, dal film più vecchio', gap: 3,
      },
    },
  });
  // ===== Tabella 2: cinema italiano (regista + anno) =====
  tables.push({
    id: 'filmitaliani',
    items: rows(['name', 'regista', 'anno', 'd'], `
Lo sceicco bianco|Federico Fellini|1952|3
I vitelloni|Federico Fellini|1953|2
Le notti di Cabiria|Federico Fellini|1957|2
Giulietta degli spiriti|Federico Fellini|1965|3
Fellini Satyricon|Federico Fellini|1969|3
Il Casanova di Federico Fellini|Federico Fellini|1976|3
Prova d'orchestra|Federico Fellini|1979|3
La città delle donne|Federico Fellini|1980|3
E la nave va|Federico Fellini|1983|2
Ginger e Fred|Federico Fellini|1986|2
Intervista|Federico Fellini|1987|3
La voce della luna|Federico Fellini|1990|3
Il colosso di Rodi|Sergio Leone|1961|3
Per qualche dollaro in più|Sergio Leone|1965|1
Giù la testa|Sergio Leone|1971|2
C'era una volta in America|Sergio Leone|1984|1
Ossessione|Luchino Visconti|1943|3
La terra trema|Luchino Visconti|1948|3
Bellissima|Luchino Visconti|1951|3
Senso|Luchino Visconti|1954|2
Le notti bianche|Luchino Visconti|1957|3
Rocco e i suoi fratelli|Luchino Visconti|1960|2
La caduta degli dei|Luchino Visconti|1969|2
Morte a Venezia|Luchino Visconti|1971|2
Ludwig|Luchino Visconti|1973|2
L'innocente|Luchino Visconti|1976|3
Cronaca di un amore|Michelangelo Antonioni|1950|3
L'avventura|Michelangelo Antonioni|1960|2
La notte|Michelangelo Antonioni|1961|2
L'eclisse|Michelangelo Antonioni|1962|2
Il deserto rosso|Michelangelo Antonioni|1964|2
Blow-Up|Michelangelo Antonioni|1966|1
Zabriskie Point|Michelangelo Antonioni|1970|2
Professione: reporter|Michelangelo Antonioni|1975|2
Accattone|Pier Paolo Pasolini|1961|2
Mamma Roma|Pier Paolo Pasolini|1962|2
Il Vangelo secondo Matteo|Pier Paolo Pasolini|1964|2
Uccellacci e uccellini|Pier Paolo Pasolini|1966|3
Edipo re|Pier Paolo Pasolini|1967|3
Teorema|Pier Paolo Pasolini|1968|2
Il Decameron|Pier Paolo Pasolini|1971|2
I racconti di Canterbury|Pier Paolo Pasolini|1972|3
Il fiore delle Mille e una notte|Pier Paolo Pasolini|1974|3
Salò o le 120 giornate di Sodoma|Pier Paolo Pasolini|1975|2
Paisà|Roberto Rossellini|1946|2
Germania anno zero|Roberto Rossellini|1948|3
Stromboli - Terra di Dio|Roberto Rossellini|1950|3
Europa '51|Roberto Rossellini|1952|3
Viaggio in Italia|Roberto Rossellini|1954|2
Il generale Della Rovere|Roberto Rossellini|1959|3
Sciuscià|Vittorio De Sica|1946|2
Miracolo a Milano|Vittorio De Sica|1951|3
Umberto D.|Vittorio De Sica|1952|2
L'oro di Napoli|Vittorio De Sica|1954|3
Il tetto|Vittorio De Sica|1956|3
La ciociara|Vittorio De Sica|1960|1
Ieri, oggi, domani|Vittorio De Sica|1963|2
Matrimonio all'italiana|Vittorio De Sica|1964|2
Il giardino dei Finzi-Contini|Vittorio De Sica|1970|2
I soliti ignoti|Mario Monicelli|1958|1
La grande guerra|Mario Monicelli|1959|1
L'armata Brancaleone|Mario Monicelli|1966|1
Romanzo popolare|Mario Monicelli|1974|3
Amici miei|Mario Monicelli|1975|1
Caro Michele|Mario Monicelli|1976|3
Un borghese piccolo piccolo|Mario Monicelli|1977|2
Il marchese del Grillo|Mario Monicelli|1981|1
Speriamo che sia femmina|Mario Monicelli|1986|2
Le rose del deserto|Mario Monicelli|2006|3
Il mattatore|Dino Risi|1960|3
Una vita difficile|Dino Risi|1961|2
Il sorpasso|Dino Risi|1962|1
I mostri|Dino Risi|1963|2
Il gaucho|Dino Risi|1964|3
Straziami ma di baci saziami|Dino Risi|1968|3
In nome del popolo italiano|Dino Risi|1971|3
Profumo di donna|Dino Risi|1974|1
Anima persa|Dino Risi|1977|3
Il giocattolo|Dino Risi|1979|3
Dramma della gelosia|Ettore Scola|1970|3
C'eravamo tanto amati|Ettore Scola|1974|1
Brutti, sporchi e cattivi|Ettore Scola|1976|2
Una giornata particolare|Ettore Scola|1977|1
La terrazza|Ettore Scola|1980|3
Ballando ballando|Ettore Scola|1983|3
La famiglia|Ettore Scola|1987|2
Che ora è|Ettore Scola|1989|3
Concorrenza sleale|Ettore Scola|2001|3
Gente di Roma|Ettore Scola|2003|3
Il cammino della speranza|Pietro Germi|1950|3
Il ferroviere|Pietro Germi|1956|2
L'uomo di paglia|Pietro Germi|1958|3
Un maledetto imbroglio|Pietro Germi|1959|3
Divorzio all'italiana|Pietro Germi|1961|1
Sedotta e abbandonata|Pietro Germi|1964|2
Signore & signori|Pietro Germi|1966|3
Alfredo Alfredo|Pietro Germi|1972|3
Pane, amore e fantasia|Luigi Comencini|1953|2
Tutti a casa|Luigi Comencini|1960|2
La ragazza di Bube|Luigi Comencini|1963|3
Lo scopone scientifico|Luigi Comencini|1972|3
La donna della domenica|Luigi Comencini|1975|3
Il gatto|Luigi Comencini|1977|3
Voltati Eugenio|Luigi Comencini|1980|3
Un ragazzo di Calabria|Luigi Comencini|1987|3
Buon Natale... buon anno|Luigi Comencini|1989|3
Totò a colori|Steno|1952|2
Un americano a Roma|Steno|1954|1
Piedone lo sbirro|Steno|1973|2
Piedone a Hong Kong|Steno|1975|3
Febbre da cavallo|Steno|1976|1
Piedone l'africano|Steno|1978|3
Piedone d'Egitto|Steno|1980|3
Banana Joe|Steno|1982|2
Siamo uomini o caporali|Camillo Mastrocinque|1955|2
Totò, Peppino e la malafemmina|Camillo Mastrocinque|1956|1
La banda degli onesti|Camillo Mastrocinque|1956|2
Totò, Peppino e i fuorilegge|Camillo Mastrocinque|1956|3
Totò sceicco|Mario Mattoli|1950|3
Miseria e nobiltà|Mario Mattoli|1954|2
Il medico dei pazzi|Mario Mattoli|1954|3
Signori si nasce|Mario Mattoli|1960|3
Fumo di Londra|Alberto Sordi|1966|3
Scusi, lei è favorevole o contrario?|Alberto Sordi|1966|3
Un italiano in America|Alberto Sordi|1967|3
Il comune senso del pudore|Alberto Sordi|1976|3
Io e Caterina|Alberto Sordi|1980|3
Il tassinaro|Alberto Sordi|1983|2
Un tassinaro a New York|Alberto Sordi|1987|3
Il federale|Luciano Salce|1961|3
La pecora nera|Luciano Salce|1968|3
Fantozzi|Luciano Salce|1975|1
Il secondo tragico Fantozzi|Luciano Salce|1976|1
Fantozzi contro tutti|Neri Parenti|1980|2
Fracchia la belva umana|Neri Parenti|1981|2
Fantozzi subisce ancora|Neri Parenti|1983|3
Fracchia contro Dracula|Neri Parenti|1985|3
Superfantozzi|Neri Parenti|1986|2
Fantozzi va in pensione|Neri Parenti|1988|2
Fantozzi alla riscossa|Neri Parenti|1990|3
Fantozzi in paradiso|Neri Parenti|1993|3
Eccezzziunale... veramente|Carlo Vanzina|1982|2
Sapore di mare|Carlo Vanzina|1983|1
Vacanze di Natale|Carlo Vanzina|1983|1
Vacanze in America|Carlo Vanzina|1984|3
Yuppies - I giovani di successo|Carlo Vanzina|1986|3
Selvaggi|Carlo Vanzina|1995|3
Un'estate al mare|Carlo Vanzina|2008|3
Un sacco bello|Carlo Verdone|1980|1
Bianco, rosso e Verdone|Carlo Verdone|1981|2
Borotalco|Carlo Verdone|1982|1
Acqua e sapone|Carlo Verdone|1983|2
Troppo forte|Carlo Verdone|1986|3
Compagni di scuola|Carlo Verdone|1988|1
Stasera a casa di Alice|Carlo Verdone|1990|3
Maledetto il giorno che t'ho incontrato|Carlo Verdone|1992|2
Perdiamoci di vista|Carlo Verdone|1994|2
Viaggi di nozze|Carlo Verdone|1995|1
Sono pazzo di Iris Blond|Carlo Verdone|1996|2
C'era un cinese in coma|Carlo Verdone|2000|3
Il mio miglior nemico|Carlo Verdone|2006|2
Io, loro e Lara|Carlo Verdone|2010|2
Posti in piedi in paradiso|Carlo Verdone|2012|2
Sotto una buona stella|Carlo Verdone|2014|3
L'abbiamo fatta grossa|Carlo Verdone|2016|3
Benedetta follia|Carlo Verdone|2018|3
Si vive una volta sola|Carlo Verdone|2021|3
Ricomincio da tre|Massimo Troisi|1981|1
Scusate il ritardo|Massimo Troisi|1983|2
Le vie del Signore sono finite|Massimo Troisi|1987|3
Pensavo fosse amore... invece era un calesse|Massimo Troisi|1991|3
I laureati|Leonardo Pieraccioni|1995|2
Il ciclone|Leonardo Pieraccioni|1996|1
Fuochi d'artificio|Leonardo Pieraccioni|1997|2
Il pesce innamorato|Leonardo Pieraccioni|1999|2
Il principe e il pirata|Leonardo Pieraccioni|2001|3
Il paradiso all'improvviso|Leonardo Pieraccioni|2003|3
Ti amo in tutte le lingue del mondo|Leonardo Pieraccioni|2005|3
Tre uomini e una gamba|Massimo Venier|1997|1
Così è la vita|Massimo Venier|1998|2
Chiedimi se sono felice|Massimo Venier|2000|2
Tu la conosci Claudia?|Massimo Venier|2004|3
Il cosmo sul comò|Massimo Venier|2008|3
La banda dei Babbi Natale|Massimo Venier|2010|3
Cado dalle nubi|Gennaro Nunziante|2009|2
Che bella giornata|Gennaro Nunziante|2011|1
Sole a catinelle|Gennaro Nunziante|2013|1
Quo vado?|Gennaro Nunziante|2016|1
Io sono un autarchico|Nanni Moretti|1976|3
Ecce Bombo|Nanni Moretti|1978|2
Sogni d'oro|Nanni Moretti|1981|3
Bianca|Nanni Moretti|1984|2
La messa è finita|Nanni Moretti|1985|2
Palombella rossa|Nanni Moretti|1989|2
Aprile|Nanni Moretti|1998|2
La stanza del figlio|Nanni Moretti|2001|1
Il caimano|Nanni Moretti|2006|2
Habemus Papam|Nanni Moretti|2011|1
Mia madre|Nanni Moretti|2015|2
Tre piani|Nanni Moretti|2021|3
Il sol dell'avvenire|Nanni Moretti|2023|2
Tu mi turbi|Roberto Benigni|1983|3
Il piccolo diavolo|Roberto Benigni|1988|3
Johnny Stecchino|Roberto Benigni|1991|1
Il mostro|Roberto Benigni|1994|2
La tigre e la neve|Roberto Benigni|2005|2
Marrakech Express|Gabriele Salvatores|1989|2
Turné|Gabriele Salvatores|1990|3
Puerto Escondido|Gabriele Salvatores|1992|3
Sud|Gabriele Salvatores|1993|3
Nirvana|Gabriele Salvatores|1997|3
Denti|Gabriele Salvatores|2000|3
Io non ho paura|Gabriele Salvatores|2003|2
Come Dio comanda|Gabriele Salvatores|2008|3
Il ragazzo invisibile|Gabriele Salvatores|2014|2
Il camorrista|Giuseppe Tornatore|1986|3
Stanno tutti bene|Giuseppe Tornatore|1990|2
Una pura formalità|Giuseppe Tornatore|1994|3
L'uomo delle stelle|Giuseppe Tornatore|1995|2
La leggenda del pianista sull'oceano|Giuseppe Tornatore|1998|1
Malèna|Giuseppe Tornatore|2000|1
La sconosciuta|Giuseppe Tornatore|2006|2
Baarìa|Giuseppe Tornatore|2009|2
La migliore offerta|Giuseppe Tornatore|2013|2
La corrispondenza|Giuseppe Tornatore|2016|3
L'uomo in più|Paolo Sorrentino|2001|3
Le conseguenze dell'amore|Paolo Sorrentino|2004|2
L'amico di famiglia|Paolo Sorrentino|2006|3
Il divo|Paolo Sorrentino|2008|1
This Must Be the Place|Paolo Sorrentino|2011|2
Youth - La giovinezza|Paolo Sorrentino|2015|2
Loro|Paolo Sorrentino|2018|2
È stata la mano di Dio|Paolo Sorrentino|2021|1
Parthenope|Paolo Sorrentino|2024|2
L'imbalsamatore|Matteo Garrone|2002|3
Primo amore|Matteo Garrone|2004|3
Gomorra|Matteo Garrone|2008|1
Reality|Matteo Garrone|2012|2
Il racconto dei racconti|Matteo Garrone|2015|3
Dogman|Matteo Garrone|2018|2
Io capitano|Matteo Garrone|2023|1
I pugni in tasca|Marco Bellocchio|1965|3
La balia|Marco Bellocchio|1999|3
L'ora di religione|Marco Bellocchio|2002|3
Buongiorno, notte|Marco Bellocchio|2003|2
Vincere|Marco Bellocchio|2009|2
Il traditore|Marco Bellocchio|2019|2
Rapito|Marco Bellocchio|2023|3
Prima della rivoluzione|Bernardo Bertolucci|1964|3
Il conformista|Bernardo Bertolucci|1970|2
Ultimo tango a Parigi|Bernardo Bertolucci|1972|1
Novecento|Bernardo Bertolucci|1976|2
Il tè nel deserto|Bernardo Bertolucci|1990|2
Piccolo Buddha|Bernardo Bertolucci|1993|3
Io ballo da sola|Bernardo Bertolucci|1996|3
The Dreamers - I sognatori|Bernardo Bertolucci|2003|2
Il bagno turco|Ferzan Özpetek|1997|3
Le fate ignoranti|Ferzan Özpetek|2001|1
La finestra di fronte|Ferzan Özpetek|2003|2
Cuore sacro|Ferzan Özpetek|2005|3
Saturno contro|Ferzan Özpetek|2007|2
Mine vaganti|Ferzan Özpetek|2010|1
Magnifica presenza|Ferzan Özpetek|2012|3
Allacciate le cinture|Ferzan Özpetek|2014|2
Rosso Istanbul|Ferzan Özpetek|2017|3
Ovosodo|Paolo Virzì|1997|2
Caterina va in città|Paolo Virzì|2003|3
Tutta la vita davanti|Paolo Virzì|2008|2
La prima cosa bella|Paolo Virzì|2010|2
Tutti i santi giorni|Paolo Virzì|2012|3
Il capitale umano|Paolo Virzì|2013|2
La pazza gioia|Paolo Virzì|2016|2
Notti magiche|Paolo Virzì|2018|3
Siccità|Paolo Virzì|2022|3
L'ultimo bacio|Gabriele Muccino|2001|1
Ricordati di me|Gabriele Muccino|2003|3
La ricerca della felicità|Gabriele Muccino|2006|1
Sette anime|Gabriele Muccino|2008|3
Baciami ancora|Gabriele Muccino|2010|2
Quello che so sull'amore|Gabriele Muccino|2012|3
A casa tutti bene|Gabriele Muccino|2018|2
Gli anni più belli|Gabriele Muccino|2020|3
Immaturi|Paolo Genovese|2011|2
Tutta colpa di Freud|Paolo Genovese|2014|2
Perfetti sconosciuti|Paolo Genovese|2016|1
The Place|Paolo Genovese|2017|3
Supereroi|Paolo Genovese|2021|3
Il primo giorno della mia vita|Paolo Genovese|2023|3
Benvenuti al Sud|Luca Miniero|2010|1
Benvenuti al Nord|Luca Miniero|2012|2
Un boss in salotto|Luca Miniero|2014|3
Sono tornato|Luca Miniero|2018|2
Non c'è più religione|Luca Miniero|2022|3
Corpo celeste|Alice Rohrwacher|2011|3
Le meraviglie|Alice Rohrwacher|2014|3
Lazzaro felice|Alice Rohrwacher|2018|3
La chimera|Alice Rohrwacher|2023|3
Allonsanfàn|Paolo e Vittorio Taviani|1974|3
Padre padrone|Paolo e Vittorio Taviani|1977|2
La notte di San Lorenzo|Paolo e Vittorio Taviani|1982|2
Kaos|Paolo e Vittorio Taviani|1984|3
Good Morning Babilonia|Paolo e Vittorio Taviani|1987|3
Cesare deve morire|Paolo e Vittorio Taviani|2012|2
Colpire al cuore|Gianni Amelio|1983|3
Porte aperte|Gianni Amelio|1990|3
Il ladro di bambini|Gianni Amelio|1992|2
Lamerica|Gianni Amelio|1994|2
Così ridevano|Gianni Amelio|1998|3
Le chiavi di casa|Gianni Amelio|2004|2
Hammamet|Gianni Amelio|2020|3
I cento passi|Marco Tullio Giordana|2000|2
La meglio gioventù|Marco Tullio Giordana|2003|2
Quando sei nato non puoi più nasconderti|Marco Tullio Giordana|2005|3
Sanguepazzo|Marco Tullio Giordana|2008|3
Romanzo di una strage|Marco Tullio Giordana|2012|3
Mimì metallurgico ferito nell'onore|Lina Wertmüller|1972|3
Film d'amore e d'anarchia|Lina Wertmüller|1973|3
Travolti da un insolito destino nell'azzurro mare d'agosto|Lina Wertmüller|1974|2
Pasqualino Settebellezze|Lina Wertmüller|1975|3
L'ape regina|Marco Ferreri|1963|3
Dillinger è morto|Marco Ferreri|1969|3
La grande abbuffata|Marco Ferreri|1973|2
Non toccare la donna bianca|Marco Ferreri|1974|3
Ciao maschio|Marco Ferreri|1978|3
La decima vittima|Elio Petri|1965|3
A ciascuno il suo|Elio Petri|1967|3
Indagine su un cittadino al di sopra di ogni sospetto|Elio Petri|1970|2
La classe operaia va in paradiso|Elio Petri|1971|3
Todo modo|Elio Petri|1976|3
Salvatore Giuliano|Francesco Rosi|1962|3
Le mani sulla città|Francesco Rosi|1963|3
Il caso Mattei|Francesco Rosi|1972|3
Cadaveri eccellenti|Francesco Rosi|1976|3
Cristo si è fermato a Eboli|Francesco Rosi|1979|3
Tre fratelli|Francesco Rosi|1981|3
Kapò|Gillo Pontecorvo|1960|3
La battaglia di Algeri|Gillo Pontecorvo|1966|2
Queimada|Gillo Pontecorvo|1969|3
Ogro|Gillo Pontecorvo|1979|3
Il posto|Ermanno Olmi|1961|3
I fidanzati|Ermanno Olmi|1963|3
L'albero degli zoccoli|Ermanno Olmi|1978|2
La leggenda del santo bevitore|Ermanno Olmi|1988|3
Il mestiere delle armi|Ermanno Olmi|2001|3
L'uccello dalle piume di cristallo|Dario Argento|1970|3
Profondo rosso|Dario Argento|1975|1
Tenebre|Dario Argento|1982|2
Phenomena|Dario Argento|1985|2
Opera|Dario Argento|1987|3
La maschera del demonio|Mario Bava|1960|3
La ragazza che sapeva troppo|Mario Bava|1963|3
I tre volti della paura|Mario Bava|1963|3
Sei donne per l'assassino|Mario Bava|1964|3
Terrore nello spazio|Mario Bava|1965|3
Operazione paura|Mario Bava|1966|3
Reazione a catena|Mario Bava|1971|3
Django|Sergio Corbucci|1966|1
Navajo Joe|Sergio Corbucci|1966|3
I crudeli|Sergio Corbucci|1967|3
Il grande silenzio|Sergio Corbucci|1968|2
Il mercenario|Sergio Corbucci|1968|3
Il bianco, il giallo, il nero|Sergio Corbucci|1975|3
La resa dei conti|Sergio Sollima|1966|3
Faccia a faccia|Sergio Sollima|1967|3
Corri uomo corri|Sergio Sollima|1968|3
Sacco e Vanzetti|Giuliano Montaldo|1971|3
Giordano Bruno|Giuliano Montaldo|1973|3
L'Agnese va a morire|Giuliano Montaldo|1976|3
Tempo di uccidere|Giuliano Montaldo|1989|3
La casa dalle finestre che ridono|Pupi Avati|1976|3
Regalo di Natale|Pupi Avati|1986|3
Il cuore altrove|Pupi Avati|2003|3
La seconda notte di nozze|Pupi Avati|2005|3
Il papà di Giovanna|Pupi Avati|2008|3
Pummarò|Michele Placido|1990|3
Del perduto amore|Michele Placido|1998|3
Romanzo criminale|Michele Placido|2005|1
Il grande sogno|Michele Placido|2009|3
Vallanzasca - Gli angeli del male|Michele Placido|2010|3
La bisbetica domata|Franco Zeffirelli|1967|3
Fratello sole, sorella luna|Franco Zeffirelli|1972|2
Il campione|Franco Zeffirelli|1979|3
Storia di una capinera|Franco Zeffirelli|1993|3
Un tè con Mussolini|Franco Zeffirelli|1999|3
Pane e tulipani|Silvio Soldini|2000|2
Brucio nel vento|Silvio Soldini|2002|3
Agata e la tempesta|Silvio Soldini|2004|3
Giorni e nuvole|Silvio Soldini|2007|3
Cosa voglio di più|Silvio Soldini|2010|3
Il comandante e la cicogna|Silvio Soldini|2012|3
Mignon è partita|Francesca Archibugi|1988|3
Verso sera|Francesca Archibugi|1990|3
Il grande cocomero|Francesca Archibugi|1993|3
L'albero delle pere|Francesca Archibugi|1998|3
Domani|Francesca Archibugi|2001|3
Il nome del figlio|Francesca Archibugi|2015|2
Il portaborse|Daniele Luchetti|1991|3
La scuola|Daniele Luchetti|1995|3
Mio fratello è figlio unico|Daniele Luchetti|2007|2
La nostra vita|Daniele Luchetti|2010|2
Morte di un matematico napoletano|Mario Martone|1992|3
Noi credevamo|Mario Martone|2010|3
Il giovane favoloso|Mario Martone|2014|3
Qui rido io|Mario Martone|2021|3
Nostalgia|Mario Martone|2022|3
Io sono l'amore|Luca Guadagnino|2009|3
A Bigger Splash|Luca Guadagnino|2015|3
Chiamami col tuo nome|Luca Guadagnino|2017|1
Bones and All|Luca Guadagnino|2022|3
Challengers|Luca Guadagnino|2024|2
Queer|Luca Guadagnino|2024|3
`),
    fields: {
      regista: {
        ask: 'Chi ha diretto il film «{name}»?',
        who: 'Quale di questi film italiani è stato diretto da {value}?',
        tf: 'Il film «{name}» è stato diretto da {value}.',
        odd: 'Trova l\'intruso: quale di questi film NON è stato diretto da {value}?',
        typed: 'person',
      },
    },
    numeric: {
      anno: {
        ask: 'In che anno è uscito il film «{name}»?',
        span: 30, tol: 1, format: 'year', unit: '', step: 1,
        duel: 'Quale di questi film italiani è uscito prima?', lowerWins: true,
        order: 'Metti in ordine di uscita questi film italiani, dal più vecchio', gap: 3,
      },
    },
  });
  // ===== Tabella 3: James Bond (film EON) =====
  tables.push({
    id: 'bond',
    items: rows(['name', 'attore', 'cantante', 'anno', 'd'], `
Agente 007 - Licenza di uccidere|Sean Connery||1962|2
Dalla Russia con amore|Sean Connery|Matt Monro|1963|2
Missione Goldfinger|Sean Connery|Shirley Bassey|1964|1
Thunderball - Operazione tuono|Sean Connery|Tom Jones|1965|2
Si vive solo due volte|Sean Connery|Nancy Sinatra|1967|2
Al servizio segreto di Sua Maestà|George Lazenby||1969|3
Una cascata di diamanti|Sean Connery|Shirley Bassey|1971|2
Vivi e lascia morire|Roger Moore|Paul McCartney e i Wings|1973|2
L'uomo dalla pistola d'oro|Roger Moore|Lulu|1974|3
La spia che mi amava|Roger Moore|Carly Simon|1977|1
Moonraker - Operazione spazio|Roger Moore|Shirley Bassey|1979|2
Solo per i tuoi occhi|Roger Moore|Sheena Easton|1981|2
Octopussy - Operazione piovra|Roger Moore|Rita Coolidge|1983|3
007 - Bersaglio mobile|Roger Moore|Duran Duran|1985|2
007 - Zona pericolo|Timothy Dalton|a-ha|1987|2
007 - Vendetta privata|Timothy Dalton|Gladys Knight|1989|3
007 - GoldenEye|Pierce Brosnan|Tina Turner|1995|1
Il domani non muore mai|Pierce Brosnan|Sheryl Crow|1997|2
Il mondo non basta|Pierce Brosnan|Garbage|1999|2
La morte può attendere|Pierce Brosnan|Madonna|2002|2
Casino Royale (2006)|Daniel Craig|Chris Cornell||1
Quantum of Solace|Daniel Craig|Jack White e Alicia Keys|2008|2
Skyfall|Daniel Craig|Adele|2012|1
Spectre|Daniel Craig|Sam Smith|2015|2
No Time to Die|Daniel Craig|Billie Eilish|2021|1
`),
    fields: {
      attore: {
        ask: 'Quale attore interpreta James Bond in «{name}»?',
        who: 'In quale di questi film James Bond è interpretato da {value}?',
        tf: 'In «{name}» James Bond è interpretato da {value}.',
        odd: 'Trova l\'intruso: in quale di questi film James Bond NON è interpretato da {value}?',
        typed: 'person',
      },
      cantante: {
        ask: 'Chi canta il tema principale di «{name}»?',
        who: 'Quale di questi film di 007 ha un tema principale cantato da {value}?',
        tf: 'Il tema principale di «{name}» è cantato da {value}.',
        odd: 'Trova l\'intruso: quale di questi film di 007 NON ha un tema cantato da {value}?',
      },
    },
    numeric: {
      anno: {
        ask: 'In che anno è uscito il film di 007 «{name}»?',
        span: 30, tol: 1, format: 'year', unit: '', step: 1,
        duel: 'Quale film di James Bond è uscito prima?', lowerWins: true,
        order: 'Metti in ordine di uscita questi film di 007, dal primo', gap: 2,
      },
    },
  });

  // ===== Tabella 4: Oscar al miglior film (anno della cerimonia) =====
  tables.push({
    id: 'oscarfilm',
    items: rows(['name', 'regista', 'cerimonia', 'd'], `
Via col vento|Victor Fleming|1940|1
Rebecca - La prima moglie|Alfred Hitchcock|1941|2
Com'era verde la mia valle|John Ford|1942|3
La signora Miniver|William Wyler|1943|3
Casablanca|Michael Curtiz|1944|1
I migliori anni della nostra vita|William Wyler|1947|3
Amleto|Laurence Olivier|1949|3
Eva contro Eva|Joseph L. Mankiewicz|1951|2
Un americano a Parigi|Vincente Minnelli|1952|3
Il più grande spettacolo del mondo|Cecil B. DeMille|1953|3
Da qui all'eternità|Fred Zinnemann|1954|2
Fronte del porto|Elia Kazan|1955|2
Il giro del mondo in 80 giorni|Michael Anderson|1957|3
Il ponte sul fiume Kwai|David Lean|1958|1
Gigi|Vincente Minnelli|1959|3
Ben-Hur|William Wyler|1960|1
L'appartamento|Billy Wilder|1961|2
West Side Story|Robert Wise|1962|1
Lawrence d'Arabia|David Lean|1963|1
Tom Jones|Tony Richardson|1964|3
My Fair Lady|George Cukor|1965|1
Tutti insieme appassionatamente|Robert Wise|1966|1
La calda notte dell'ispettore Tibbs|Norman Jewison|1968|3
Oliver!|Carol Reed|1969|3
Un uomo da marciapiede|John Schlesinger|1970|2
Patton, generale d'acciaio|Franklin J. Schaffner|1971|2
Il braccio violento della legge|William Friedkin|1972|2
Il padrino||1973|1
La stangata|George Roy Hill|1974|2
Il padrino - Parte II|Francis Ford Coppola|1975|2
Qualcuno volò sul nido del cuculo|Miloš Forman|1976|1
Rocky|John G. Avildsen|1977|1
Io e Annie|Woody Allen|1978|2
Il cacciatore|Michael Cimino|1979|2
Kramer contro Kramer|Robert Benton|1980|2
Gente comune|Robert Redford|1981|3
Momenti di gloria|Hugh Hudson|1982|2
Gandhi|Richard Attenborough|1983|1
Voglia di tenerezza|James L. Brooks|1984|3
Amadeus|Miloš Forman|1985|1
La mia Africa|Sydney Pollack|1986|1
Platoon|Oliver Stone|1987|1
L'ultimo imperatore||1988|1
Rain Man|Barry Levinson|1989|1
A spasso con Daisy|Bruce Beresford|1990|2
Balla coi lupi|Kevin Costner|1991|1
Il silenzio degli innocenti||1992|1
Gli spietati|Clint Eastwood|1993|1
Schindler's List||1994|1
Forrest Gump||1995|1
Braveheart - Cuore impavido|Mel Gibson|1996|1
Il paziente inglese|Anthony Minghella|1997|1
Titanic||1998|1
Shakespeare in Love|John Madden|1999|2
American Beauty|Sam Mendes|2000|1
Il gladiatore||2001|1
A Beautiful Mind|Ron Howard|2002|1
Chicago|Rob Marshall|2003|2
Il Signore degli Anelli - Il ritorno del re|Peter Jackson|2004|1
Million Dollar Baby|Clint Eastwood|2005|1
Crash - Contatto fisico|Paul Haggis|2006|2
The Departed - Il bene e il male|Martin Scorsese|2007|1
Non è un paese per vecchi|Joel ed Ethan Coen|2008|1
The Millionaire|Danny Boyle|2009|1
The Hurt Locker|Kathryn Bigelow|2010|2
Il discorso del re|Tom Hooper|2011|1
The Artist|Michel Hazanavicius|2012|1
Argo|Ben Affleck|2013|2
12 anni schiavo|Steve McQueen|2014|1
Birdman|Alejandro González Iñárritu|2015|2
Il caso Spotlight|Tom McCarthy|2016|2
Moonlight|Barry Jenkins|2017|1
La forma dell'acqua - The Shape of Water|Guillermo del Toro|2018|1
Green Book|Peter Farrelly|2019|1
Parasite|Bong Joon-ho|2020|1
Nomadland|Chloé Zhao|2021|1
CODA - I segni del cuore|Sian Heder|2022|2
Everything Everywhere All at Once|Daniel Kwan e Daniel Scheinert|2023|1
Oppenheimer|Christopher Nolan|2024|1
Anora|Sean Baker|2025|2
`),
    fields: {
      regista: {
        ask: 'Chi ha diretto «{name}», vincitore dell\'Oscar come miglior film?',
        who: 'Quale di questi film premiati con l\'Oscar come miglior film è stato diretto da {value}?',
        tf: '«{name}», Oscar come miglior film, è stato diretto da {value}.',
        odd: 'Trova l\'intruso: quale di questi film premiati con l\'Oscar NON è stato diretto da {value}?',
        typed: 'person',
      },
    },
    numeric: {
      cerimonia: {
        ask: 'In che anno si è tenuta la cerimonia degli Oscar in cui «{name}» ha vinto come miglior film?',
        span: 40, tol: 1, format: 'year', unit: '', step: 1,
        duel: 'Quale film ha vinto prima l\'Oscar come miglior film?', lowerWins: true,
        order: 'Metti in ordine di vittoria dell\'Oscar come miglior film, dal primo', gap: 2,
      },
    },
  });
  // ===== Tabella 5: attori e ruoli famosi =====
  tables.push({
    id: 'ruoli',
    items: rows(['name', 'attore', 'd'], `
Indiana Jones|Harrison Ford|1
Han Solo nella trilogia originale di Guerre stellari|Harrison Ford|2
Rick Deckard in «Blade Runner»|Harrison Ford|3
Richard Kimble ne «Il fuggitivo»|Harrison Ford|3
Chuck Noland in «Cast Away»|Tom Hanks|1
Il capitano John Miller in «Salvate il soldato Ryan»|Tom Hanks|2
Jim Lovell in «Apollo 13»|Tom Hanks|2
Robert Langdon ne «Il codice da Vinci»|Tom Hanks|2
Andrew Beckett in «Philadelphia»|Tom Hanks|3
Forrest Gump|Tom Hanks|1
Travis Bickle in «Taxi Driver»|Robert De Niro|1
Jake LaMotta in «Toro scatenato»|Robert De Niro|2
Vito Corleone da giovane ne «Il padrino - Parte II»|Robert De Niro|2
Rupert Pupkin in «Re per una notte»|Robert De Niro|3
Max Cady in «Cape Fear»|Robert De Niro|3
Jimmy Conway in «Quei bravi ragazzi»|Robert De Niro|3
Michael Corleone|Al Pacino|1
Tony Montana in «Scarface»|Al Pacino|1
Frank Serpico in «Serpico»|Al Pacino|2
Il colonnello Frank Slade in «Profumo di donna» (1992)|Al Pacino|3
Carlito Brigante in «Carlito's Way»|Al Pacino|3
Jack Torrance in «Shining»|Jack Nicholson|1
Joker nel «Batman» del 1989|Jack Nicholson|2
Randle McMurphy in «Qualcuno volò sul nido del cuculo»|Jack Nicholson|2
Melvin Udall in «Qualcosa è cambiato»|Jack Nicholson|3
Jake Gittes in «Chinatown»|Jack Nicholson|3
Pete «Maverick» Mitchell in «Top Gun»|Tom Cruise|1
Jerry Maguire|Tom Cruise|2
Lestat in «Intervista col vampiro»|Tom Cruise|3
Ron Kovic in «Nato il quattro luglio»|Tom Cruise|3
Tyler Durden in «Fight Club»|Brad Pitt|1
Benjamin Button|Brad Pitt|2
Cliff Booth in «C'era una volta a... Hollywood»|Brad Pitt|2
Achille in «Troy»|Brad Pitt|2
Billy Beane ne «L'arte di vincere»|Brad Pitt|3
Il tenente Aldo Raine in «Bastardi senza gloria»|Brad Pitt|2
Jordan Belfort in «The Wolf of Wall Street»|Leonardo DiCaprio|1
Dom Cobb in «Inception»|Leonardo DiCaprio|2
Hugh Glass in «Revenant - Redivivo»|Leonardo DiCaprio|2
Frank Abagnale Jr. in «Prova a prendermi»|Leonardo DiCaprio|2
Howard Hughes in «The Aviator»|Leonardo DiCaprio|3
Billy Costigan in «The Departed»|Leonardo DiCaprio|3
Rick Dalton in «C'era una volta a... Hollywood»|Leonardo DiCaprio|3
John Keating ne «L'attimo fuggente»|Robin Williams|1
Mrs. Doubtfire|Robin Williams|1
Patch Adams|Robin Williams|2
Sean Maguire in «Will Hunting - Genio ribelle»|Robin Williams|3
Peter Banning in «Hook - Capitan Uncino»|Robin Williams|3
Ace Ventura|Jim Carrey|1
Stanley Ipkiss in «The Mask»|Jim Carrey|1
Truman Burbank in «The Truman Show»|Jim Carrey|1
Lloyd Christmas in «Scemo & più scemo»|Jim Carrey|2
Joel Barish in «Se mi lasci ti cancello»|Jim Carrey|3
Andy Kaufman in «Man on the Moon»|Jim Carrey|3
Vivian Ward in «Pretty Woman»|Julia Roberts|1
Erin Brockovich|Julia Roberts|1
Anna Scott in «Notting Hill»|Julia Roberts|2
Julianne Potter ne «Il matrimonio del mio migliore amico»|Julia Roberts|3
Miranda Priestly ne «Il diavolo veste Prada»|Meryl Streep|1
Margaret Thatcher in «The Iron Lady»|Meryl Streep|2
Karen Blixen ne «La mia Africa»|Meryl Streep|2
Francesca Johnson ne «I ponti di Madison County»|Meryl Streep|3
Donna in «Mamma Mia!»|Meryl Streep|2
Joanna Kramer in «Kramer contro Kramer»|Meryl Streep|3
Marcello Rubini ne «La dolce vita»|Marcello Mastroianni|1
Guido Anselmi in «8½»|Marcello Mastroianni|2
Ferdinando Cefalù in «Divorzio all'italiana»|Marcello Mastroianni|3
Domenico Soriano in «Matrimonio all'italiana»|Marcello Mastroianni|3
Gabriele in «Una giornata particolare»|Marcello Mastroianni|3
Nando Mericoni in «Un americano a Roma»|Alberto Sordi|1
Il marchese Onofrio del Grillo|Alberto Sordi|1
Guido Tersilli ne «Il medico della mutua»|Alberto Sordi|2
Giovanni Vivaldi in «Un borghese piccolo piccolo»|Alberto Sordi|3
Cesira ne «La ciociara»|Sophia Loren|2
Filumena Marturano|Sophia Loren|3
Antonietta in «Una giornata particolare»|Sophia Loren|2
Il conte Raffaello Mascetti in «Amici miei»|Ugo Tognazzi|1
Renato Baldi ne «Il vizietto»|Ugo Tognazzi|3
Bruno Cortona ne «Il sorpasso»|Vittorio Gassman|1
Brancaleone da Norcia|Vittorio Gassman|1
Fausto Consolo in «Profumo di donna» (1974)|Vittorio Gassman|3
Gianni Perego in «C'eravamo tanto amati»|Vittorio Gassman|3
Jep Gambardella ne «La grande bellezza»|Toni Servillo|1
Giulio Andreotti ne «Il divo»|Toni Servillo|2
Titta Di Girolamo ne «Le conseguenze dell'amore»|Toni Servillo|3
Tommaso Buscetta ne «Il traditore»|Pierfrancesco Favino|2
Bettino Craxi in «Hammamet»|Pierfrancesco Favino|3
Il Libano in «Romanzo criminale»|Pierfrancesco Favino|3
Guido Orefice ne «La vita è bella»|Roberto Benigni|1
Dante in «Johnny Stecchino»|Roberto Benigni|2
Saverio in «Non ci resta che piangere»|Roberto Benigni|2
Gaetano in «Ricomincio da tre»|Massimo Troisi|2
Mario Ruoppolo ne «Il postino»|Massimo Troisi|1
Mario in «Non ci resta che piangere»|Massimo Troisi|2
Holly Golightly in «Colazione da Tiffany»|Audrey Hepburn|1
La principessa Ann in «Vacanze romane»|Audrey Hepburn|2
Eliza Doolittle in «My Fair Lady»|Audrey Hepburn|2
Sugar Kane in «A qualcuno piace caldo»|Marilyn Monroe|2
Lorelei Lee in «Gli uomini preferiscono le bionde»|Marilyn Monroe|3
Guglielmo da Baskerville ne «Il nome della rosa»|Sean Connery|2
Henry Jones senior in «Indiana Jones e l'ultima crociata»|Sean Connery|2
Juan Ramírez in «Highlander»|Sean Connery|3
John Mason in «The Rock»|Sean Connery|3
L'ispettore Callaghan|Clint Eastwood|1
Walt Kowalski in «Gran Torino»|Clint Eastwood|2
Bill Munny ne «Gli spietati»|Clint Eastwood|3
Robert Kincaid ne «I ponti di Madison County»|Clint Eastwood|3
Frankie Dunn in «Million Dollar Baby»|Clint Eastwood|3
Conan il barbaro|Arnold Schwarzenegger|2
Douglas Quaid in «Atto di forza»|Arnold Schwarzenegger|3
Julius Benedict in «Gemelli»|Arnold Schwarzenegger|3
John Matrix in «Commando»|Arnold Schwarzenegger|3
Rocky Balboa|Sylvester Stallone|1
John Rambo|Sylvester Stallone|1
Barney Ross ne «I mercenari»|Sylvester Stallone|2
Il giudice Dredd|Sylvester Stallone|3
John McClane in «Trappola di cristallo»|Bruce Willis|1
Butch Coolidge in «Pulp Fiction»|Bruce Willis|2
Malcolm Crowe ne «Il sesto senso»|Bruce Willis|2
Korben Dallas ne «Il quinto elemento»|Bruce Willis|3
Harry Stamper in «Armageddon»|Bruce Willis|3
Max Rockatansky in «Interceptor»|Mel Gibson|3
William Wallace in «Braveheart»|Mel Gibson|1
Martin Riggs in «Arma letale»|Mel Gibson|2
Neo in «Matrix»|Keanu Reeves|1
John Wick|Keanu Reeves|1
Jack Traven in «Speed»|Keanu Reeves|2
Johnny Utah in «Point Break»|Keanu Reeves|3
Ted Logan in «Bill & Ted's Excellent Adventure»|Keanu Reeves|3
Edward mani di forbice|Johnny Depp|1
Willy Wonka ne «La fabbrica di cioccolato» (2005)|Johnny Depp|1
Sweeney Todd|Johnny Depp|2
Il Cappellaio Matto in «Alice in Wonderland» (2010)|Johnny Depp|2
Gilbert Grape in «Buon compleanno Mr. Grape»|Johnny Depp|3
Donnie Brasco|Johnny Depp|3
L'agente J in «Men in Black»|Will Smith|1
Robert Neville in «Io sono leggenda»|Will Smith|2
Chris Gardner ne «La ricerca della felicità»|Will Smith|2
Mike Lowrey in «Bad Boys»|Will Smith|2
Del Spooner in «Io, Robot»|Will Smith|3
Axel Foley in «Beverly Hills Cop»|Eddie Murphy|2
Il principe Akeem ne «Il principe cerca moglie»|Eddie Murphy|2
Billy Ray Valentine in «Una poltrona per due»|Eddie Murphy|3
Benjamin Braddock ne «Il laureato»|Dustin Hoffman|2
Ratso Rizzo in «Un uomo da marciapiede»|Dustin Hoffman|3
Raymond Babbitt in «Rain Man»|Dustin Hoffman|1
Dorothy Michaels in «Tootsie»|Dustin Hoffman|2
Il capitano Uncino in «Hook - Capitan Uncino»|Dustin Hoffman|3
Hannibal Lecter ne «Il silenzio degli innocenti»|Anthony Hopkins|1
Alfred Hitchcock nel film «Hitchcock» (2012)|Anthony Hopkins|3
Mr. Stevens in «Quel che resta del giorno»|Anthony Hopkins|3
Odino nei film di «Thor»|Anthony Hopkins|2
Ellis «Red» Redding ne «Le ali della libertà»|Morgan Freeman|1
Nelson Mandela in «Invictus - L'invincibile»|Morgan Freeman|2
Hoke Colburn in «A spasso con Daisy»|Morgan Freeman|3
Il detective Somerset in «Seven»|Morgan Freeman|3
Dio in «Una settimana da Dio»|Morgan Freeman|2
Marty McFly in «Ritorno al futuro»|Michael J. Fox|1
Doc Emmett Brown in «Ritorno al futuro»|Christopher Lloyd|1
Zio Fester ne «La famiglia Addams»|Christopher Lloyd|3
Il giudice Doom in «Chi ha incastrato Roger Rabbit»|Christopher Lloyd|3
Christy Brown ne «Il mio piede sinistro»|Daniel Day-Lewis|3
Bill il Macellaio in «Gangs of New York»|Daniel Day-Lewis|2
Daniel Plainview ne «Il petroliere»|Daniel Day-Lewis|3
Abraham Lincoln nel film «Lincoln»|Daniel Day-Lewis|2
Occhio di Falco ne «L'ultimo dei Mohicani»|Daniel Day-Lewis|3
Patrick Bateman in «American Psycho»|Christian Bale|2
Dicky Eklund in «The Fighter»|Christian Bale|3
Dick Cheney in «Vice - L'uomo nell'ombra»|Christian Bale|3
Trevor Reznik ne «L'uomo senza sonno»|Christian Bale|3
Joker ne «Il cavaliere oscuro»|Heath Ledger|1
Ennis Del Mar in «I segreti di Brokeback Mountain»|Heath Ledger|3
Arthur Fleck nel film «Joker» (2019)|Joaquin Phoenix|1
Commodo ne «Il gladiatore»|Joaquin Phoenix|2
Johnny Cash in «Quando l'amore brucia l'anima»|Joaquin Phoenix|3
Nina Sayers ne «Il cigno nero»|Natalie Portman|1
Jackie Kennedy nel film «Jackie»|Natalie Portman|3
Mathilda in «Léon»|Natalie Portman|2
Padmé Amidala nei prequel di «Star Wars»|Natalie Portman|2
Evey Hammond in «V per Vendetta»|Natalie Portman|3
Katharine Hepburn in «The Aviator»|Cate Blanchett|3
Jasmine in «Blue Jasmine»|Cate Blanchett|3
Lydia Tár nel film «Tár»|Cate Blanchett|3
Galadriel ne «Il Signore degli Anelli»|Cate Blanchett|2
Satine in «Moulin Rouge!»|Nicole Kidman|2
Virginia Woolf ne «The Hours»|Nicole Kidman|3
Grace in «Dogville»|Nicole Kidman|3
Ada Monroe in «Ritorno a Cold Mountain»|Nicole Kidman|3
Rose DeWitt Bukater in «Titanic»|Kate Winslet|1
Hanna Schmitz in «The Reader - A voce alta»|Kate Winslet|3
Clementine in «Se mi lasci ti cancello»|Kate Winslet|3
Marianne Dashwood in «Ragione e sentimento»|Kate Winslet|3
Vedova Nera nei film Marvel|Scarlett Johansson|1
Charlotte in «Lost in Translation»|Scarlett Johansson|3
Nicole Barber in «Storia di un matrimonio»|Scarlett Johansson|3
Lara Croft nei film del 2001 e 2003|Angelina Jolie|1
Malefica nel film del 2014|Angelina Jolie|2
Jane Smith in «Mr. & Mrs. Smith»|Angelina Jolie|2
Mia Dolan in «La La Land»|Emma Stone|1
Bella Baxter in «Povere creature!»|Emma Stone|3
Cruella nel film del 2021|Emma Stone|2
Billie Jean King ne «La battaglia dei sessi»|Emma Stone|3
Sebastian in «La La Land»|Ryan Gosling|1
Ken nel film «Barbie»|Ryan Gosling|1
Il pilota di «Drive»|Ryan Gosling|2
L'agente K in «Blade Runner 2049»|Ryan Gosling|3
Noah in «Le pagine della nostra vita»|Ryan Gosling|3
Rossella O'Hara in «Via col vento»|Vivien Leigh|2
Rhett Butler in «Via col vento»|Clark Gable|2
Dorothy Gale ne «Il mago di Oz»|Judy Garland|1
Mary Poppins nel film del 1964|Julie Andrews|1
Maria in «Tutti insieme appassionatamente»|Julie Andrews|2
Danny Zuko in «Grease»|John Travolta|1
Vincent Vega in «Pulp Fiction»|John Travolta|2
Tony Manero ne «La febbre del sabato sera»|John Travolta|2
Sandy in «Grease»|Olivia Newton-John|2
Jules Winnfield in «Pulp Fiction»|Samuel L. Jackson|2
Nick Fury nei film Marvel|Samuel L. Jackson|2
Mace Windu nei prequel di «Star Wars»|Samuel L. Jackson|3
Mia Wallace in «Pulp Fiction»|Uma Thurman|2
La Sposa in «Kill Bill»|Uma Thurman|1
Ellen Ripley in «Alien»|Sigourney Weaver|1
Dana Barrett in «Ghostbusters»|Sigourney Weaver|3
Sarah Connor in «Terminator»|Linda Hamilton|2
Clarice Starling ne «Il silenzio degli innocenti»|Jodie Foster|1
Il dottor Alan Grant in «Jurassic Park»|Sam Neill|2
Ian Malcolm in «Jurassic Park»|Jeff Goldblum|1
Peter Venkman in «Ghostbusters»|Bill Murray|2
Phil Connors in «Ricomincio da capo»|Bill Murray|2
Jake Blues in «The Blues Brothers»|John Belushi|2
Elwood Blues in «The Blues Brothers»|Dan Aykroyd|2
Beetlejuice nel film del 1988|Michael Keaton|2
Batman nel film del 1989|Michael Keaton|1
Kevin McCallister in «Mamma, ho perso l'aereo»|Macaulay Culkin|1
Ferris Bueller in «Una pazza giornata di vacanza»|Matthew Broderick|3
Lex Luthor nel «Superman» del 1978|Gene Hackman|3
Willy Wonka ne «Willy Wonka e la fabbrica di cioccolato» (1971)|Gene Wilder|2
Il dottor Frankenstein ne «Il giovane Frankenstein»|Gene Wilder|3
Massimo Decimo Meridio ne «Il gladiatore»|Russell Crowe|1
John Nash in «A Beautiful Mind»|Russell Crowe|2
Il capitano Jack Aubrey in «Master & Commander»|Russell Crowe|3
Aragorn ne «Il Signore degli Anelli»|Viggo Mortensen|1
Gandalf ne «Il Signore degli Anelli»|Ian McKellen|1
Frodo Baggins ne «Il Signore degli Anelli»|Elijah Wood|1
Gollum ne «Il Signore degli Anelli»|Andy Serkis|2
Legolas ne «Il Signore degli Anelli»|Orlando Bloom|2
Mark Watney in «Sopravvissuto - The Martian»|Matt Damon|2
Jason Bourne|Matt Damon|1
Will Hunting in «Will Hunting - Genio ribelle»|Matt Damon|2
Tony Stark|Robert Downey Jr.|1
Sherlock Holmes nei film di Guy Ritchie|Robert Downey Jr.|2
J. Robert Oppenheimer nel film «Oppenheimer»|Cillian Murphy|1
Mad Max in «Fury Road»|Tom Hardy|2
Bane ne «Il cavaliere oscuro - Il ritorno»|Tom Hardy|2
Furiosa in «Mad Max: Fury Road»|Charlize Theron|2
Aileen Wuornos in «Monster»|Charlize Theron|3
`),
    fields: {
      attore: {
        ask: 'Chi ha interpretato {name}?',
        who: 'Quale di questi personaggi è interpretato da {value}?',
        tf: '{name} è interpretato da {value}.',
        odd: 'Trova l\'intruso: quale di questi personaggi NON è interpretato da {value}?',
        typed: 'person',
      },
    },
  });
  // ===== Tabella 6: saghe e sequel =====
  tables.push({
    id: 'saghe',
    items: rows(['name', 'saga', 'anno', 'd'], `
La maledizione della prima luna|Pirati dei Caraibi|2003|1
Il forziere del morto|Pirati dei Caraibi|2006|2
Ai confini del mondo|Pirati dei Caraibi|2007|2
Oltre i confini del mare|Pirati dei Caraibi|2011|3
La vendetta di Salazar|Pirati dei Caraibi|2017|3
Il mondo perduto|Jurassic Park e Jurassic World|1997|2
Il regno distrutto|Jurassic Park e Jurassic World|2018|2
Il dominio|Jurassic Park e Jurassic World|2022|2
Interceptor|Mad Max|1979|3
Il guerriero della strada|Mad Max|1981|3
Oltre la sfera del tuono|Mad Max|1985|3
Fury Road|Mad Max|2015|1
Trappola di cristallo|Die Hard|1988|1
58 minuti per morire|Die Hard|1990|3
Duri a morire|Die Hard|1995|2
Vivere o morire|Die Hard|2007|3
Un buon giorno per morire|Die Hard|2013|3
Protocollo fantasma|Mission: Impossible|2011|2
Rogue Nation|Mission: Impossible|2015|2
Fallout|Mission: Impossible|2018|2
Dead Reckoning - Parte uno|Mission: Impossible|2023|2
La ragazza di fuoco|Hunger Games|2013|2
Il canto della rivolta - Parte 1|Hunger Games|2014|3
Il canto della rivolta - Parte 2|Hunger Games|2015|3
La ballata dell'usignolo e del serpente|Hunger Games|2023|3
New Moon|Twilight|2009|2
Eclipse|Twilight|2010|2
Breaking Dawn - Parte 1|Twilight|2011|2
Breaking Dawn - Parte 2|Twilight|2012|2
Il leone, la strega e l'armadio|Le cronache di Narnia|2005|2
Il principe Caspian|Le cronache di Narnia|2008|3
Il viaggio del veliero|Le cronache di Narnia|2010|3
`),
    fields: {
      saga: {
        ask: 'A quale saga cinematografica appartiene «{name}»?',
        who: 'Quale di questi film appartiene alla saga di {value}?',
        tf: '«{name}» appartiene alla saga di {value}.',
        odd: 'Trova l\'intruso: quale di questi film NON appartiene alla saga di {value}?',
      },
    },
    numeric: {
      anno: {
        ask: 'In che anno è uscito «{name}»?',
        span: 20, tol: 1, format: 'year', unit: '', step: 1,
        duel: 'Quale di questi capitoli di saga è uscito prima?', lowerWins: true,
        order: 'Metti in ordine di uscita questi capitoli di saga, dal primo', gap: 2,
      },
    },
  });

  // ===== Tabella 7: colonne sonore e compositori =====
  tables.push({
    id: 'colonne',
    items: rows(['name', 'compositore', 'd'], `
Lo squalo|John Williams|1
Jurassic Park|John Williams|1
Schindler's List|John Williams|1
I predatori dell'arca perduta|John Williams|2
Superman (1978)|John Williams|2
Mamma, ho perso l'aereo|John Williams|2
Hook - Capitan Uncino|John Williams|3
Guerre stellari|John Williams|1
Incontri ravvicinati del terzo tipo|John Williams|2
Salvate il soldato Ryan|John Williams|2
Minority Report|John Williams|3
Il re leone|Hans Zimmer|1
Il gladiatore|Hans Zimmer|1
Inception|Hans Zimmer|1
Interstellar|Hans Zimmer|1
Dunkirk|Hans Zimmer|2
Rain Man|Hans Zimmer|3
Dune (2021)|Hans Zimmer|2
Il codice da Vinci|Hans Zimmer|2
Thelma & Louise|Hans Zimmer|3
L'uomo d'acciaio|Hans Zimmer|3
Il buono, il brutto, il cattivo|Ennio Morricone|1
C'era una volta il West|Ennio Morricone|1
C'era una volta in America|Ennio Morricone|2
Mission|Ennio Morricone|2
Gli intoccabili|Ennio Morricone|2
Malèna|Ennio Morricone|2
The Hateful Eight|Ennio Morricone|2
Per un pugno di dollari|Ennio Morricone|2
Giù la testa|Ennio Morricone|3
Il grande silenzio|Ennio Morricone|3
La leggenda del pianista sull'oceano|Ennio Morricone|2
Novecento|Ennio Morricone|3
Indagine su un cittadino al di sopra di ogni sospetto|Ennio Morricone|3
La strada|Nino Rota|2
La dolce vita|Nino Rota|1
8½|Nino Rota|2
Amarcord|Nino Rota|2
Il Gattopardo|Nino Rota|2
Romeo e Giulietta (1968)|Nino Rota|3
I vitelloni|Nino Rota|3
Le notti di Cabiria|Nino Rota|3
Rocco e i suoi fratelli|Nino Rota|3
Prova d'orchestra|Nino Rota|3
Psyco|Bernard Herrmann|1
Quarto potere|Bernard Herrmann|3
La donna che visse due volte|Bernard Herrmann|2
Taxi Driver|Bernard Herrmann|2
Intrigo internazionale|Bernard Herrmann|3
Fahrenheit 451|Bernard Herrmann|3
Titanic|James Horner|1
Braveheart - Cuore impavido|James Horner|2
Apollo 13|James Horner|2
Aliens - Scontro finale|James Horner|3
Avatar|James Horner|2
A Beautiful Mind|James Horner|3
Cocoon|James Horner|3
Willow|James Horner|3
Momenti di gloria|Vangelis|2
Blade Runner|Vangelis|2
1492 - La conquista del paradiso|Vangelis|3
Alexander|Vangelis|3
Batman (1989)|Danny Elfman|2
Edward mani di forbice|Danny Elfman|2
Beetlejuice - Spiritello porcello|Danny Elfman|3
Big Fish - Le storie di una vita incredibile|Danny Elfman|3
La sposa cadavere|Danny Elfman|3
Men in Black|Danny Elfman|2
Nightmare Before Christmas|Danny Elfman|2
Mars Attacks!|Danny Elfman|3
Il mistero di Sleepy Hollow|Danny Elfman|3
Ritorno al futuro|Alan Silvestri|1
Forrest Gump|Alan Silvestri|2
Chi ha incastrato Roger Rabbit|Alan Silvestri|3
Contact|Alan Silvestri|3
Cast Away|Alan Silvestri|3
Predator|Alan Silvestri|3
Polar Express|Alan Silvestri|3
Ready Player One|Alan Silvestri|3
Il silenzio degli innocenti|Howard Shore|3
Seven|Howard Shore|3
Hugo Cabret|Howard Shore|3
Gangs of New York|Howard Shore|3
The Aviator|Howard Shore|3
The Departed - Il bene e il male|Howard Shore|3
Philadelphia|Howard Shore|3
La mosca|Howard Shore|3
Grand Budapest Hotel|Alexandre Desplat|2
La forma dell'acqua - The Shape of Water|Alexandre Desplat|3
Il discorso del re|Alexandre Desplat|3
Argo|Alexandre Desplat|3
Il curioso caso di Benjamin Button|Alexandre Desplat|3
La ragazza con l'orecchino di perla|Alexandre Desplat|3
Fantastic Mr. Fox|Alexandre Desplat|3
Moonrise Kingdom|Alexandre Desplat|3
L'isola dei cani|Alexandre Desplat|3
The Imitation Game|Alexandre Desplat|3
Le ali della libertà|Thomas Newman|2
American Beauty|Thomas Newman|2
Alla ricerca di Nemo|Thomas Newman|2
Skyfall|Thomas Newman|2
WALL•E|Thomas Newman|2
Il miglio verde|Thomas Newman|3
1917|Thomas Newman|3
Up|Michael Giacchino|2
Ratatouille|Michael Giacchino|2
Gli Incredibili|Michael Giacchino|2
Inside Out|Michael Giacchino|2
Coco|Michael Giacchino|3
The Batman|Michael Giacchino|2
Rogue One: A Star Wars Story|Michael Giacchino|3
Doctor Strange|Michael Giacchino|3
Toy Story|Randy Newman|2
Monsters & Co.|Randy Newman|3
Cars|Randy Newman|3
Il presagio|Jerry Goldsmith|3
Alien|Jerry Goldsmith|2
Chinatown|Jerry Goldsmith|3
Basic Instinct|Jerry Goldsmith|3
Gremlins|Jerry Goldsmith|3
Poltergeist|Jerry Goldsmith|3
Atto di forza|Jerry Goldsmith|3
L.A. Confidential|Jerry Goldsmith|3
La mummia|Jerry Goldsmith|3
Il pianeta delle scimmie (1968)|Jerry Goldsmith|3
Lawrence d'Arabia|Maurice Jarre|3
Il dottor Živago|Maurice Jarre|2
Passaggio in India|Maurice Jarre|3
Witness - Il testimone|Maurice Jarre|3
Ghost - Fantasma|Maurice Jarre|3
L'attimo fuggente|Maurice Jarre|3
Colazione da Tiffany|Henry Mancini|2
La pantera rosa|Henry Mancini|1
Hollywood Party|Henry Mancini|3
Victor Victoria|Henry Mancini|3
Sciarada|Henry Mancini|3
Giorni di vino e rose|Henry Mancini|3
Missione Goldfinger|John Barry|2
Dalla Russia con amore|John Barry|2
Si vive solo due volte|John Barry|3
La mia Africa|John Barry|2
Balla coi lupi|John Barry|2
Un uomo da marciapiede|John Barry|3
Il leone d'inverno|John Barry|3
Chaplin|John Barry|3
La vita è bella|Nicola Piovani|1
Ginger e Fred|Nicola Piovani|3
La voce della luna|Nicola Piovani|3
Intervista|Nicola Piovani|3
Caro diario|Nicola Piovani|3
Il postino|Luis Bacalov|1
Django|Luis Bacalov|2
Il Vangelo secondo Matteo|Luis Bacalov|3
Divorzio all'italiana|Carlo Rustichelli|3
Sedotta e abbandonata|Carlo Rustichelli|3
L'armata Brancaleone|Carlo Rustichelli|3
C'eravamo tanto amati|Armando Trovajoli|3
Una giornata particolare|Armando Trovajoli|3
Ieri, oggi, domani|Armando Trovajoli|3
Matrimonio all'italiana|Armando Trovajoli|3
Profumo di donna (1974)|Armando Trovajoli|3
Brutti, sporchi e cattivi|Armando Trovajoli|3
Carrie - Lo sguardo di Satana|Pino Donaggio|3
Vestito per uccidere|Pino Donaggio|3
Blow Out|Pino Donaggio|3
A Venezia... un dicembre rosso shocking|Pino Donaggio|3
Omicidio a luci rosse|Pino Donaggio|3
Furyo|Ryuichi Sakamoto|3
Il tè nel deserto|Ryuichi Sakamoto|3
Piccolo Buddha|Ryuichi Sakamoto|3
Il mio vicino Totoro|Joe Hisaishi|2
La città incantata|Joe Hisaishi|2
Principessa Mononoke|Joe Hisaishi|2
Il castello errante di Howl|Joe Hisaishi|2
Kiki - Consegne a domicilio|Joe Hisaishi|3
Ponyo sulla scogliera|Joe Hisaishi|3
Si alza il vento|Joe Hisaishi|3
Nausicaä della Valle del vento|Joe Hisaishi|3
La La Land|Justin Hurwitz|1
Whiplash|Justin Hurwitz|2
First Man - Il primo uomo|Justin Hurwitz|3
Babylon|Justin Hurwitz|3
Lezioni di piano|Michael Nyman|3
Gattaca|Michael Nyman|3
Il cuoco, il ladro, sua moglie e l'amante|Michael Nyman|3
I segreti di Brokeback Mountain|Gustavo Santaolalla|3
Babel|Gustavo Santaolalla|3
I diari della motocicletta|Gustavo Santaolalla|3
21 grammi|Gustavo Santaolalla|3
Amores perros|Gustavo Santaolalla|3
Oppenheimer|Ludwig Göransson|2
Black Panther|Ludwig Göransson|3
Tenet|Ludwig Göransson|3
Creed - Nato per combattere|Ludwig Göransson|3
Bullitt|Lalo Schifrin|3
Ispettore Callaghan: il caso Scorpio è tuo|Lalo Schifrin|3
Nick mano fredda|Lalo Schifrin|3
I magnifici sette|Elmer Bernstein|2
La grande fuga|Elmer Bernstein|2
Il buio oltre la siepe|Elmer Bernstein|3
Ghostbusters|Elmer Bernstein|2
L'uomo dal braccio d'oro|Elmer Bernstein|3
Una poltrona per due|Elmer Bernstein|3
I dieci comandamenti|Elmer Bernstein|3
L'aereo più pazzo del mondo|Elmer Bernstein|3
Fargo|Carter Burwell|3
Il grande Lebowski|Carter Burwell|3
Non è un paese per vecchi|Carter Burwell|3
Arizona Junior|Carter Burwell|3
Crocevia della morte|Carter Burwell|3
Twilight|Carter Burwell|3
Requiem for a Dream|Clint Mansell|3
Il cigno nero|Clint Mansell|3
Moon|Clint Mansell|3
The Fountain|Clint Mansell|3
Fuga di mezzanotte|Giorgio Moroder|3
Scarface (1983)|Giorgio Moroder|3
Flashdance|Giorgio Moroder|3
`),
    fields: {
      compositore: {
        ask: 'Chi ha composto le musiche del film «{name}»?',
        who: 'Quale di questi film ha le musiche composte da {value}?',
        tf: 'Le musiche di «{name}» sono di {value}.',
        odd: 'Trova l\'intruso: quale di questi film NON ha le musiche di {value}?',
        typed: 'person',
      },
    },
  });
  // ===== Tabella 8: generi cinematografici =====
  tables.push({
    id: 'generi',
    items: rows(['name', 'genere', 'd'], `
Mezzogiorno di fuoco|Western|2
Sentieri selvaggi|Western|2
Il mucchio selvaggio|Western|2
Gli spietati|Western|2
Ombre rosse|Western|2
I magnifici sette|Western|1
Un dollaro d'onore|Western|3
Butch Cassidy|Western|2
Balla coi lupi|Western|1
Django Unchained|Western|1
Il cavaliere della valle solitaria|Western|3
Tombstone|Western|3
L'uomo che uccise Liberty Valance|Western|3
Per un pugno di dollari|Western|1
C'era una volta il West|Western|1
Lo chiamavano Trinità|Western|1
L'esorcista|Horror|1
Halloween - La notte delle streghe|Horror|1
Venerdì 13|Horror|1
Nightmare - Dal profondo della notte|Horror|1
Scream|Horror|1
The Ring|Horror|2
Poltergeist|Horror|2
Shining|Horror|1
La notte dei morti viventi|Horror|2
Non aprite quella porta|Horror|2
Carrie - Lo sguardo di Satana|Horror|2
Get Out - Scappa|Horror|2
Hereditary - Le radici del male|Horror|3
Rosemary's Baby - Nastro rosso a New York|Horror|2
Nosferatu il vampiro|Horror|3
Midsommar - Il villaggio dei dannati|Horror|3
Metropolis|Fantascienza|2
Solaris|Fantascienza|3
Incontri ravvicinati del terzo tipo|Fantascienza|2
Atto di forza|Fantascienza|2
RoboCop|Fantascienza|2
Minority Report|Fantascienza|2
Arrival|Fantascienza|2
Gravity|Fantascienza|1
Ex Machina|Fantascienza|3
Blade Runner|Fantascienza|1
Matrix|Fantascienza|1
Interstellar|Fantascienza|1
Il quinto elemento|Fantascienza|2
Ritorno al futuro|Fantascienza|1
Gattaca - La porta dell'universo|Fantascienza|3
Moon|Fantascienza|3
Tron|Fantascienza|2
Il pianeta delle scimmie (1968)|Fantascienza|2
Cantando sotto la pioggia|Musical|1
West Side Story|Musical|1
Tutti insieme appassionatamente|Musical|1
Grease|Musical|1
Chicago|Musical|2
La La Land|Musical|1
Mamma Mia!|Musical|1
Moulin Rouge!|Musical|2
Cabaret|Musical|2
Fame - Saranno famosi|Musical|3
My Fair Lady|Musical|2
Il violinista sul tetto|Musical|3
The Rocky Horror Picture Show|Musical|3
Evita|Musical|3
Hairspray - Grasso è bello|Musical|3
The Greatest Showman|Musical|1
Sette spose per sette fratelli|Musical|3
Il ponte sul fiume Kwai|Film di guerra|1
La grande fuga|Film di guerra|1
Il cacciatore|Film di guerra|2
Platoon|Film di guerra|1
Full Metal Jacket|Film di guerra|1
Salvate il soldato Ryan|Film di guerra|1
La sottile linea rossa|Film di guerra|2
Dunkirk|Film di guerra|2
Fury|Film di guerra|2
1917|Film di guerra|2
Black Hawk Down - Black Hawk abbattuto|Film di guerra|2
Patton, generale d'acciaio|Film di guerra|3
Quella sporca dozzina|Film di guerra|2
Il giorno più lungo|Film di guerra|3
Lettere da Iwo Jima|Film di guerra|3
Uomini contro|Film di guerra|3
Apocalypse Now|Film di guerra|1
Pretty Woman|Commedia romantica|1
Harry, ti presento Sally|Commedia romantica|1
C'è posta per te|Commedia romantica|1
Notting Hill|Commedia romantica|1
Quattro matrimoni e un funerale|Commedia romantica|2
Il diario di Bridget Jones|Commedia romantica|1
Love Actually|Commedia romantica|1
Il matrimonio del mio migliore amico|Commedia romantica|2
10 cose che odio di te|Commedia romantica|2
Se scappi ti sposo|Commedia romantica|3
Insonnia d'amore|Commedia romantica|2
Come farsi lasciare in 10 giorni|Commedia romantica|3
Colazione da Tiffany|Commedia romantica|2
Il principe cerca moglie|Commedia romantica|3
`),
    fields: {
      genere: {
        ask: 'A quale genere appartiene il film «{name}»?',
        who: 'Quale di questi film appartiene al genere «{value}»?',
        tf: 'Il film «{name}» appartiene al genere «{value}».',
        odd: 'Trova l\'intruso: quale di questi film NON appartiene al genere «{value}»?',
      },
    },
  });
  // ===== Tabella 9: nazionalità dei film =====
  tables.push({
    id: 'nazionalita',
    items: rows(['name', 'paese', 'd'], `
Casablanca|americano|1
Via col vento|americano|1
Quarto potere|americano|2
Rocky|americano|1
Top Gun|americano|1
Dirty Dancing|americano|1
Grease|americano|1
Ghost - Fantasma|americano|1
Pretty Woman|americano|1
Il mago di Oz|americano|1
Taxi Driver|americano|2
Forrest Gump|americano|1
Titanic|americano|1
Jurassic Park|americano|1
Mamma, ho perso l'aereo|americano|1
Ritorno al futuro|americano|1
Lo squalo|americano|1
Il padrino|americano|1
Pulp Fiction|americano|1
Fight Club|americano|2
Il silenzio degli innocenti|americano|2
Gli Incredibili|americano|2
Fargo|americano|2
Le ali della libertà|americano|2
Rain Man|americano|2
Philadelphia|americano|3
Scarface (1983)|americano|2
Rambo|americano|2
Terminator|americano|1
Shrek|americano|1
Mission: Impossible|americano|1
Armageddon|americano|2
Cast Away|americano|1
Speed|americano|2
Il laureato|americano|2
Cantando sotto la pioggia|americano|2
La vita è bella|italiano|1
Fantozzi|italiano|1
Amici miei|italiano|1
Il sorpasso|italiano|2
Il ciclone|italiano|2
Johnny Stecchino|italiano|2
Tre uomini e una gamba|italiano|1
Ricomincio da tre|italiano|2
Quo vado?|italiano|1
Perfetti sconosciuti|italiano|1
Il postino|italiano|1
Gomorra|italiano|1
La grande bellezza|italiano|1
Romanzo criminale|italiano|2
Profondo rosso|italiano|2
Lo chiamavano Jeeg Robot|italiano|2
Benvenuti al Sud|italiano|2
Mediterraneo|italiano|2
Il divo|italiano|3
Nuovo Cinema Paradiso|italiano|1
Il Gattopardo|italiano|2
Ladri di biciclette|italiano|2
Roma città aperta|italiano|2
Il favoloso mondo di Amélie|francese|1
Quasi amici|francese|1
Léon|francese|2
Fino all'ultimo respiro|francese|3
I 400 colpi|francese|3
Il tempo delle mele|francese|2
Giù al nord|francese|3
Non sposate le mie figlie!|francese|3
L'odio|francese|3
Mio zio|francese|3
Un uomo, una donna|francese|3
The Artist|francese|3
Quattro matrimoni e un funerale|britannico|2
Trainspotting|britannico|2
Full Monty|britannico|2
Billy Elliot|britannico|2
Notting Hill|britannico|1
Il discorso del re|britannico|2
The Millionaire|britannico|2
Love Actually|britannico|1
Il diario di Bridget Jones|britannico|2
Monty Python e il Sacro Graal|britannico|3
Il terzo uomo|britannico|3
Breve incontro|britannico|3
Le ragazze del calendario|britannico|3
Paddington|britannico|2
I sette samurai|giapponese|2
Rashomon|giapponese|3
Godzilla (1954)|giapponese|2
Akira|giapponese|2
Principessa Mononoke|giapponese|2
Il castello errante di Howl|giapponese|2
Ran|giapponese|3
Kagemusha - L'ombra del guerriero|giapponese|3
Metropolis|tedesco|2
Nosferatu il vampiro|tedesco|3
Das Boot|tedesco|2
Le vite degli altri|tedesco|2
Good Bye, Lenin!|tedesco|2
La caduta|tedesco|2
Lola corre|tedesco|3
Il gabinetto del dottor Caligari|tedesco|3
Volver|spagnolo|2
Tutto su mia madre|spagnolo|2
Parla con lei|spagnolo|3
Mare dentro|spagnolo|3
Donne sull'orlo di una crisi di nervi|spagnolo|2
REC|spagnolo|3
Il settimo sigillo|svedese|2
Il posto delle fragole|svedese|3
Fanny e Alexander|svedese|3
Lasciami entrare|svedese|3
Persona|svedese|3
Oldboy|sudcoreano|2
Train to Busan|sudcoreano|2
Memorie di un assassino|sudcoreano|3
The Host|sudcoreano|3
Festen|danese|3
Dogville|danese|3
Melancholia|danese|3
Il sospetto|danese|3
Il pranzo di Babette|danese|3
Mad Max (1979)|australiano|2
Mr. Crocodile Dundee|australiano|2
Priscilla - La regina del deserto|australiano|3
Roma (2018)|messicano|3
Amores perros|messicano|3
Y tu mamá también|messicano|3
Una separazione|iraniano|3
Il sapore della ciliegia|iraniano|3
`),
    fields: {
      paese: {
        ask: 'Di quale nazionalità è il film «{name}»?',
        who: 'Quale di questi film è {value}?',
        tf: '«{name}» è un film {value}.',
        odd: 'Trova l\'intruso: quale di questi film NON è {value}?',
      },
    },
  });
  // ===== Quiz scritti a mano =====
  // Storia e tecnica del cinema
  Q(`Chi organizzò nel 1895 a Parigi la prima proiezione pubblica a pagamento di un film?`, `I fratelli Lumière`, `I fratelli Warner|I fratelli Marx|Thomas Edison e Charlie Chaplin`, 1);
  Q(`Quale film del 1927 è considerato il primo lungometraggio sonoro?`, `Il cantante di jazz`, `Metropolis|Il monello|La febbre dell'oro`, 2);
  Q(`Chi girò nel 1902 «Viaggio nella Luna», con il razzo che colpisce la Luna in un occhio?`, `Georges Méliès`, `Charlie Chaplin|David W. Griffith|Sergej Ėjzenštejn`, 2);
  Q(`Come si chiamano gli studi cinematografici fondati a Roma nel 1937?`, `Cinecittà`, `Dinocittà|Titanus|Lux Film`, 1);
  Q(`Che cosa c'è scritto a grandi lettere bianche sulla collina sopra Los Angeles?`, `Hollywood`, `Los Angeles|Universal|Cinemaland`, 1);
  Q(`Come si chiama il genere di film ambientati nel Far West girati in Italia negli anni Sessanta?`, `Spaghetti western`, `Cinepanettone|Poliziottesco|Peplum`, 1);
  Q(`Come si chiama il genere dei film italiani ambientati nell'antichità classica, con eroi muscolosi?`, `Peplum`, `Cinepanettone|Poliziottesco|Neorealismo`, 3);
  Q(`Quale movimento del cinema italiano del dopoguerra raccontava la gente comune, spesso con attori non professionisti?`, `Neorealismo`, `Surrealismo|Espressionismo|Futurismo`, 2);
  Q(`Come si chiama la corrente francese di Truffaut e Godard nata alla fine degli anni Cinquanta?`, `Nouvelle vague`, `Neorealismo|Dogma 95|Free cinema`, 2);
  Q(`Quale movimento fondato nel 1995 da Lars von Trier e altri registi imponeva regole molto rigide alle riprese?`, `Dogma 95`, `Nouvelle vague|Neorealismo|Cinema Novo`, 3);
  Q(`Quanti fotogrammi al secondo ha lo standard storico del cinema?`, `24`, `12|30|60`, 2);
  Q(`Che cos'è un «cameo» al cinema?`, `Una breve apparizione di una persona nota`, `Una scena girata dall'alto|Un tipo di obiettivo|La musica dei titoli di coda`, 1);
  Q(`Come si chiama un film che racconta fatti avvenuti prima di quelli di un film precedente?`, `Prequel`, `Sequel|Remake|Spin-off`, 1);
  Q(`Come si chiama un nuovo film che rifà una storia già portata sullo schermo?`, `Remake`, `Prequel|Spin-off|Trailer`, 1);
  Q(`Come si chiama un film derivato che ha per protagonista un personaggio secondario di un'altra storia?`, `Spin-off`, `Remake|Prequel|Cameo`, 2);
  Q(`Che cosa fa il «direttore della fotografia» di un film?`, `Cura luci e inquadrature`, `Scrive i dialoghi|Compone le musiche|Dirige gli attori`, 2);
  Q(`Che cosa fa il «montatore» di un film?`, `Assembla le scene girate nell'ordine definitivo`, `Costruisce le scenografie|Sceglie i costumi|Dirige le comparse`, 2);
  Q(`A che cosa serve il ciak sul set?`, `Identificare e sincronizzare ogni ripresa`, `Illuminare la scena|Dare il via alla musica|Registrare il pubblico`, 2);
  Q(`Come si chiamano le scritte che scorrono alla fine di un film?`, `Titoli di coda`, `Titoli di testa|Sottotitoli|Didascalie`, 1);
  Q(`Come si chiama la tecnica che anima oggetti reali scattando una foto per ogni piccolo movimento?`, `Stop motion`, `Motion capture|Rotoscopio|Green screen`, 2);
  Q(`Come si chiama la tecnica che registra i movimenti di attori reali per animare personaggi digitali?`, `Motion capture`, `Stop motion|Rotoscopio|Dissolvenza`, 2);
  Q(`A che cosa serve un fondale verde («green screen») sul set?`, `A sostituire lo sfondo con immagini digitali`, `A riflettere la luce sugli attori|A nascondere il microfono|A registrare l'audio`, 2);
  Q(`Che cosa significa «girare in esterni»?`, `Riprendere le scene fuori dagli studi`, `Girare di notte|Girare senza dialoghi|Girare con una sola macchina da presa`, 1);
  Q(`Come si chiama il filmato di pochi minuti che anticipa un film per promuoverlo?`, `Trailer`, `Cameo|Prequel|Ciak`, 1);
  Q(`Come si chiama la persona che finanzia e organizza la realizzazione di un film?`, `Produttore`, `Sceneggiatore|Montatore|Direttore della fotografia`, 1);
  // Oscar
  Q(`Quale fu il primo film non in lingua inglese a vincere l'Oscar come miglior film?`, `Parasite`, `La vita è bella|La grande bellezza|La tigre e il dragone`, 2);
  Q(`Chi è stata la prima donna a vincere l'Oscar come miglior regista?`, `Kathryn Bigelow`, `Jane Campion|Sofia Coppola|Greta Gerwig`, 2);
  Q(`Chi ha vinto l'Oscar come miglior attore protagonista per «La vita è bella»?`, `Roberto Benigni`, `Marcello Mastroianni|Massimo Troisi|Alberto Sordi`, 1);
  Q(`Quale attrice ha vinto quattro Oscar per la recitazione, record assoluto?`, `Katharine Hepburn`, `Meryl Streep|Ingrid Bergman|Audrey Hepburn`, 3);
  Q(`Quale attore ha vinto tre Oscar come miglior attore protagonista?`, `Daniel Day-Lewis`, `Tom Hanks|Robert De Niro|Al Pacino`, 3);
  Q(`Chi ha vinto l'Oscar come miglior attore per «Joker» (2019)?`, `Joaquin Phoenix`, `Jared Leto|Robert De Niro|Christian Bale`, 1);
  Q(`Per quale film Leonardo DiCaprio ha vinto il suo primo Oscar?`, `Revenant - Redivivo`, `The Wolf of Wall Street|Titanic|The Aviator`, 1);
  Q(`Quale compositore italiano ha vinto l'Oscar per la colonna sonora di «The Hateful Eight»?`, `Ennio Morricone`, `Nino Rota|Nicola Piovani|Riz Ortolani`, 2);
  Q(`Quale regista ha vinto quattro Oscar come miglior regista, record assoluto?`, `John Ford`, `Frank Capra|Steven Spielberg|Billy Wilder`, 3);
  Q(`Quale film fu annunciato per errore come vincitore dell'Oscar al miglior film nel 2017?`, `La La Land`, `Arrival|Manchester by the Sea|Il diritto di contare`, 2);
  Q(`Dove si tiene la cerimonia degli Oscar?`, `A Los Angeles`, `A New York|A Las Vegas|A San Francisco`, 1);
  Q(`Quale di questi film di Fellini NON ha vinto l'Oscar come miglior film straniero?`, `La dolce vita`, `La strada|8½|Amarcord`, 3);
  Q(`Quale film di Paolo Sorrentino ha vinto l'Oscar come miglior film straniero?`, `La grande bellezza`, `Il divo|Youth - La giovinezza|È stata la mano di Dio`, 1);
  Q(`Chi ha vinto l'Oscar come miglior attore per «Il pianista» di Roman Polanski?`, `Adrien Brody`, `Daniel Day-Lewis|Jack Nicholson|Nicolas Cage`, 3);
  Q(`Per quale film Marlon Brando vinse nel 1973 un Oscar che rifiutò di ritirare?`, `Il padrino`, `Fronte del porto|Ultimo tango a Parigi|Apocalypse Now`, 2);
  Q(`Quale attrice italiana vinse l'Oscar per «La rosa tatuata»?`, `Anna Magnani`, `Gina Lollobrigida|Claudia Cardinale|Silvana Mangano`, 2);
  Q(`Quale scenografo italiano ha vinto tre Oscar, tra cui quelli per «The Aviator» e «Hugo Cabret»?`, `Dante Ferretti`, `Piero Gherardi|Danilo Donati|Vittorio Storaro`, 3);
  Q(`Quale direttore della fotografia italiano ha vinto tre Oscar, tra cui «Apocalypse Now» e «L'ultimo imperatore»?`, `Vittorio Storaro`, `Tonino Delli Colli|Giuseppe Rotunno|Carlo Di Palma`, 3);
  Q(`Quale costumista italiana vinse l'Oscar per «L'età dell'innocenza» di Scorsese?`, `Gabriella Pescucci`, `Milena Canonero|Piero Tosi|Maurizio Millenotti`, 3);
  Q(`Chi creò i effetti speciali del piccolo extraterrestre di «E.T.» e vinse l'Oscar?`, `Carlo Rambaldi`, `Dante Ferretti|Ennio Morricone|Dario Argento`, 3);
  Q(`Quale film ha vinto l'Oscar come miglior film d'animazione nel 2003 e fu diretto da Hayao Miyazaki?`, `La città incantata`, `Il mio vicino Totoro|Principessa Mononoke|Il castello errante di Howl`, 2);
  Q(`Chi ha vinto l'Oscar come miglior attore nel 2020 per «The Father»?`, `Anthony Hopkins`, `Gary Oldman|Chadwick Boseman|Riz Ahmed`, 3);
  Q(`Quale attrice ha vinto l'Oscar nel 2024 per «Povere creature!»?`, `Emma Stone`, `Lily Gladstone|Margot Robbie|Sandra Hüller`, 2);
  // Festival
  Q(`Quale film di Quentin Tarantino vinse la Palma d'oro a Cannes nel 1994?`, `Pulp Fiction`, `Le iene|Jackie Brown|Kill Bill`, 1);
  Q(`Quale film vinse la Palma d'oro a Cannes e poi l'Oscar come miglior film nel 2019-2020?`, `Parasite`, `Joker|Roma|1917`, 1);
  Q(`Quale film di Nanni Moretti ha vinto la Palma d'oro a Cannes nel 2001?`, `La stanza del figlio`, `Caro diario|Aprile|Habemus Papam`, 2);
  Q(`Quale film di Federico Fellini vinse la Palma d'oro a Cannes nel 1960?`, `La dolce vita`, `8½|La strada|Amarcord`, 2);
  Q(`Quale film ha vinto il Leone d'oro alla Mostra del Cinema di Venezia nel 2019?`, `Joker`, `Parasite|Storia di un matrimonio|The Irishman`, 2);
  Q(`Quale film ha vinto il Leone d'oro alla Mostra del Cinema di Venezia nel 2023?`, `Povere creature!`, `Oppenheimer|Io capitano|Barbie`, 2);
  Q(`Quale documentario di Gianfranco Rosi ha vinto il Leone d'oro a Venezia nel 2013?`, `Sacro GRA`, `Fuocoammare|Notturno|Below Sea Level`, 3);
  Q(`Quale film di Gianfranco Rosi ha vinto l'Orso d'oro al Festival di Berlino 2016?`, `Fuocoammare`, `Sacro GRA|Notturno|Lampedusa in inverno`, 3);
  Q(`Quale film dei fratelli Taviani ha vinto l'Orso d'oro a Berlino nel 2012?`, `Cesare deve morire`, `Padre padrone|Kaos|La notte di San Lorenzo`, 3);
  Q(`Quale film di Gianni Amelio ha vinto il Leone d'oro a Venezia nel 1998?`, `Così ridevano`, `Il ladro di bambini|Lamerica|Le chiavi di casa`, 3);
  Q(`Quale film di Luchino Visconti vinse la Palma d'oro a Cannes nel 1963?`, `Il Gattopardo`, `Senso|Rocco e i suoi fratelli|Morte a Venezia`, 3);
  Q(`Quale film di Ermanno Olmi vinse la Palma d'oro a Cannes nel 1978?`, `L'albero degli zoccoli`, `Il posto|I fidanzati|Il mestiere delle armi`, 3);
  // Cinema italiano
  Q(`Quale film di Monicelli ha per protagonisti una banda di ladri maldestri e il «furto» a una cassaforte?`, `I soliti ignoti`, `Il sorpasso|Amici miei|La grande guerra`, 1);
  Q(`A bordo di quale auto viaggia Bruno Cortona ne «Il sorpasso»?`, `Lancia Aurelia B24`, `Alfa Romeo Giulietta|Fiat 500|Lancia Fulvia`, 3);
  Q(`Come si chiama la moglie di Fantozzi?`, `Pina`, `Franca|Mara|Giovanna`, 1);
  Q(`Con quale attore Terence Hill ha formato una celebre coppia cinematografica?`, `Bud Spencer`, `Franco Franchi|Adriano Celentano|Renato Pozzetto`, 1);
  Q(`Chi interpretava Peppone nei film di Don Camillo?`, `Gino Cervi`, `Fernandel|Totò|Aldo Fabrizi`, 2);
  Q(`Chi interpretava Don Camillo nei film tratti dai racconti di Giovannino Guareschi?`, `Fernandel`, `Gino Cervi|Aldo Fabrizi|Vittorio De Sica`, 2);
  Q(`Chi dirige «Il nome della rosa» con Sean Connery?`, `Jean-Jacques Annaud`, `Ridley Scott|Franco Zeffirelli|Bernardo Bertolucci`, 3);
  Q(`Quale poeta insegna a scrivere poesie a Mario ne «Il postino»?`, `Pablo Neruda`, `Federico García Lorca|Jorge Luis Borges|Pablo Picasso`, 1);
  Q(`Quale attrice interpreta Malèna nel film di Giuseppe Tornatore?`, `Monica Bellucci`, `Sophia Loren|Claudia Cardinale|Laura Morante`, 1);
  Q(`In quale regione è ambientato il film «Gomorra» di Matteo Garrone?`, `Campania`, `Sicilia|Calabria|Puglia`, 1);
  Q(`Chi ha diretto il film «Lo chiamavano Jeeg Robot»?`, `Gabriele Mainetti`, `Matteo Garrone|Paolo Sorrentino|Stefano Sollima`, 2);
  Q(`Quale film di Pasolini racconta in chiave classica la vita di Gesù con attori non professionisti?`, `Il Vangelo secondo Matteo`, `Accattone|Teorema|Mamma Roma`, 2);
  Q(`Quale attrice è la protagonista di «Mamma Roma» di Pasolini?`, `Anna Magnani`, `Sophia Loren|Silvana Mangano|Giulietta Masina`, 3);
  Q(`Quale attrice è la protagonista femminile de «La strada» di Fellini?`, `Giulietta Masina`, `Anna Magnani|Sophia Loren|Anita Ekberg`, 2);
  Q(`Quale attrice nuota nella Fontana di Trevi in «La dolce vita»?`, `Anita Ekberg`, `Sophia Loren|Claudia Cardinale|Monica Vitti`, 1);
  Q(`Quale attrice è la musa di Antonioni, protagonista de «L'avventura» e «L'eclisse»?`, `Monica Vitti`, `Claudia Cardinale|Stefania Sandrelli|Virna Lisi`, 2);
  Q(`Quale attrice interpreta Angelica ne «Il Gattopardo» di Visconti?`, `Claudia Cardinale`, `Sophia Loren|Monica Vitti|Gina Lollobrigida`, 2);
  Q(`Quale attore francese è Tancredi ne «Il Gattopardo»?`, `Alain Delon`, `Jean-Paul Belmondo|Jean Gabin|Yves Montand`, 3);
  Q(`Quale attore americano interpreta il principe di Salina ne «Il Gattopardo»?`, `Burt Lancaster`, `Kirk Douglas|Gregory Peck|Marlon Brando`, 3);
  Q(`Quale cantante interpreta il tema della Pantera Rosa... chi lo compose?`, `Henry Mancini`, `Nino Rota|Ennio Morricone|John Williams`, 2);
  Q(`In quale film Alberto Sordi interpreta Nando Mericoni, un ragazzo romano che sogna l'America?`, `Un americano a Roma`, `Il vigile|Il medico della mutua|Il marchese del Grillo`, 1);
  Q(`Quale attore napoletano è il protagonista de «Il postino» e morì poco dopo le riprese?`, `Massimo Troisi`, `Nino Manfredi|Alberto Sordi|Ugo Tognazzi`, 1);
  Q(`In quale città è ambientato «Perfetti sconosciuti» di Paolo Genovese?`, `Roma`, `Milano|Napoli|Torino`, 2);
  Q(`Quale commedia di Checco Zalone racconta l'avventura di un impiegato che vuole mantenere il posto fisso?`, `Quo vado?`, `Sole a catinelle|Che bella giornata|Cado dalle nubi`, 1);
  Q(`Quale commedia con Aldo, Giovanni e Giacomo racconta il viaggio di tre amici con una gamba in più?`, `Tre uomini e una gamba`, `Così è la vita|Chiedimi se sono felice|Il cosmo sul comò`, 2);
  Q(`Quale attore romano è il protagonista de «Il marchese del Grillo»?`, `Alberto Sordi`, `Vittorio Gassman|Ugo Tognazzi|Nino Manfredi`, 1);
  Q(`In quale film Roberto Benigni e Massimo Troisi viaggiano nel tempo e arrivano nel 1492?`, `Non ci resta che piangere`, `Il piccolo diavolo|Il mostro|Tu mi turbi`, 2);
  Q(`Chi ha diretto «Malèna»?`, `Giuseppe Tornatore`, `Paolo Sorrentino|Gabriele Salvatores|Marco Bellocchio`, 1);
  Q(`Qual è il film italiano di maggior successo di Carlo Verdone con la coppia di sposi Ivano e Jessica?`, `Viaggi di nozze`, `Borotalco|Un sacco bello|Compagni di scuola`, 2);
  Q(`Chi interpreta Ivano e Jessica insieme a Verdone in «Viaggi di nozze»?`, `Claudia Gerini`, `Asia Argento|Monica Bellucci|Margherita Buy`, 3);
  Q(`Quale film di Gabriele Salvatores racconta i soldati italiani su un'isola greca nella Seconda guerra mondiale?`, `Mediterraneo`, `Marrakech Express|Turné|Puerto Escondido`, 1);
  Q(`Quale regista italiano è noto come «il maestro del brivido» per «Profondo rosso» e «Suspiria»?`, `Dario Argento`, `Mario Bava|Lucio Fulci|Pupi Avati`, 2);
  Q(`Quale compositore ha firmato le musiche di «C'era una volta il West»?`, `Ennio Morricone`, `Nino Rota|Piero Piccioni|Armando Trovajoli`, 1);
  Q(`In quale città è nato Federico Fellini?`, `Rimini`, `Roma|Bologna|Ravenna`, 2);
  Q(`Qual è il vero nome del comico noto come Totò?`, `Antonio de Curtis`, `Antonio Griffo|Salvatore De Filippo|Eduardo De Filippo`, 2);
  // Hollywood, attori, registi
  Q(`Quale regista compare per pochi secondi in quasi tutti i suoi film?`, `Alfred Hitchcock`, `Stanley Kubrick|Steven Spielberg|Ridley Scott`, 1);
  Q(`Chi fu il primo attore a interpretare James Bond al cinema?`, `Sean Connery`, `Roger Moore|George Lazenby|David Niven`, 1);
  Q(`Quale attore ha interpretato 007 una sola volta, nel 1969?`, `George Lazenby`, `Timothy Dalton|Pierce Brosnan|Roger Moore`, 2);
  Q(`Quale animale è il protagonista del film «Free Willy»?`, `Un'orca`, `Un delfino|Una balena azzurra|Uno squalo`, 1);
  Q(`Cosa è «Rosebud», l'ultima parola di Charles Foster Kane in «Quarto potere»?`, `Una slitta`, `Un cavallo a dondolo|Una bambola|Un cappello`, 2);
  Q(`Chi interpreta Elvis Presley nel film di Baz Luhrmann del 2022?`, `Austin Butler`, `Tom Hiddleston|Miles Teller|Jared Leto`, 2);
  Q(`Chi interpreta Freddie Mercury in «Bohemian Rhapsody»?`, `Rami Malek`, `Taron Egerton|Sacha Baron Cohen|Eddie Redmayne`, 1);
  Q(`Chi interpreta Elton John nel film «Rocketman»?`, `Taron Egerton`, `Rami Malek|Eddie Redmayne|Jamie Bell`, 2);
  Q(`Quale attore interpreta Stephen Hawking in «La teoria del tutto»?`, `Eddie Redmayne`, `Benedict Cumberbatch|Rami Malek|Tom Hardy`, 2);
  Q(`Quale attore interpreta Winston Churchill ne «L'ora più buia»?`, `Gary Oldman`, `Anthony Hopkins|Brendan Gleeson|Tom Hanks`, 2);
  Q(`Chi interpreta Barbie nel film di Greta Gerwig?`, `Margot Robbie`, `Emma Stone|Anne Hathaway|Scarlett Johansson`, 1);
  Q(`Quale attrice interpreta Lady Diana nel film «Spencer»?`, `Kristen Stewart`, `Emma Corrin|Naomi Watts|Claire Foy`, 2);
  Q(`Chi interpreta Napoleone nel film di Ridley Scott del 2023?`, `Joaquin Phoenix`, `Christian Bale|Russell Crowe|Joel Edgerton`, 2);
  Q(`Chi interpreta Ray Charles nel film «Ray»?`, `Jamie Foxx`, `Denzel Washington|Don Cheadle|Forest Whitaker`, 3);
  Q(`Chi interpreta Truman Capote nel film «Truman Capote - A sangue freddo»?`, `Philip Seymour Hoffman`, `Daniel Day-Lewis|Kevin Spacey|Paul Giamatti`, 3);
  Q(`Chi ha diretto «Mamma Mia!» (2008)?`, `Phyllida Lloyd`, `Nora Ephron|Nancy Meyers|Greta Gerwig`, 3);
  Q(`Che cosa beve spesso il Drugo ne «Il grande Lebowski»?`, `White Russian`, `Mojito|Negroni|Cosmopolitan`, 2);
  Q(`Con quale soprannome è noto Jeffrey Lebowski nella versione italiana del film dei fratelli Coen?`, `Drugo`, `Dude|Tizio|Lebo`, 2);
  Q(`Come si chiama il pianeta degli alieni blu in «Avatar»?`, `Pandora`, `Naboo|Endor|Arrakis`, 1);
  Q(`Come si chiama il computer di bordo di «2001: Odissea nello spazio»?`, `HAL 9000`, `Skynet|Mother|Jarvis`, 1);
  Q(`Come si chiama l'astronave commerciale del film «Alien» (1979)?`, `Nostromo`, `Sulaco|Prometheus|Discovery One`, 3);
  Q(`Che numero ha la stanza maledetta dell'Overlook Hotel nel film «Shining»?`, `237`, `217|666|101`, 2);
  Q(`Quale automobile è la macchina del tempo di «Ritorno al futuro»?`, `DeLorean`, `Ford Mustang|Chevrolet Camaro|Cadillac Eldorado`, 1);
  Q(`Quale ballo eseguono Vincent e Mia in «Pulp Fiction»?`, `Il twist`, `Il tango|Il valzer|Il rock and roll`, 2);
  Q(`Quale città viene incendiata in «Via col vento»?`, `Atlanta`, `Savannah|Charleston|Richmond`, 2);
  Q(`Chi ha cantato «My Heart Will Go On», il tema di «Titanic»?`, `Celine Dion`, `Whitney Houston|Mariah Carey|Barbra Streisand`, 1);
  Q(`Chi ha cantato «Streets of Philadelphia» nel film «Philadelphia»?`, `Bruce Springsteen`, `Bob Dylan|Elton John|Neil Young`, 3);
  Q(`Quale film fu il primo a superare i 2 miliardi di dollari di incassi?`, `Avatar`, `Titanic|Avengers: Endgame|Il risveglio della Forza`, 2);
  Q(`Quale film detiene il record assoluto d'incassi nella storia del cinema?`, `Avatar`, `Avengers: Endgame|Titanic|Il risveglio della Forza`, 2);
  Q(`Quale pellicola racconta la storia vera del tassista e del cantante in «Green Book»?`, `Green Book`, `Il diritto di contare|Hidden Figures|A spasso con Daisy`, 3);
  Q(`In quale decennio uscì «Il Padrino»?`, `Anni Settanta`, `Anni Sessanta|Anni Ottanta|Anni Novanta`, 1);
  Q(`Quale attore interpreta il protagonista ne «Il Grande Gatsby» di Baz Luhrmann (2013)?`, `Leonardo DiCaprio`, `Brad Pitt|Tom Hardy|Christian Bale`, 1);
  Q(`Quale attore interpreta il protagonista di «Whiplash», un giovane batterista?`, `Miles Teller`, `Ansel Elgort|Dev Patel|Timothée Chalamet`, 3);
  Q(`Chi ha diretto «Whiplash» e «La La Land»?`, `Damien Chazelle`, `Jordan Peele|Ari Aster|Denis Villeneuve`, 2);
  Q(`Chi ha diretto «Get Out - Scappa» e «Noi»?`, `Jordan Peele`, `Ari Aster|James Wan|Jason Blum`, 3);
  Q(`Chi ha diretto il film horror «Hereditary - Le radici del male»?`, `Ari Aster`, `Jordan Peele|Robert Eggers|Mike Flanagan`, 3);
  Q(`Quale regista ha diretto «Il labirinto del fauno» e «La forma dell'acqua»?`, `Guillermo del Toro`, `Alfonso Cuarón|Alejandro González Iñárritu|Pedro Almodóvar`, 2);
  Q(`Quale regista messicano ha diretto «Gravity» e «Roma»?`, `Alfonso Cuarón`, `Guillermo del Toro|Alejandro González Iñárritu|Robert Rodriguez`, 2);
  Q(`Chi ha diretto «Birdman» e «Revenant - Redivivo»?`, `Alejandro González Iñárritu`, `Alfonso Cuarón|Guillermo del Toro|Darren Aronofsky`, 3);
  Q(`Quale regista è noto per «Il cigno nero» e «Requiem for a Dream»?`, `Darren Aronofsky`, `David Fincher|Danny Boyle|Paul Thomas Anderson`, 3);
  Q(`Chi ha diretto «Parasite» e «Snowpiercer»?`, `Bong Joon-ho`, `Park Chan-wook|Ang Lee|Hirokazu Kore'eda`, 2);
  Q(`Chi ha diretto il film d'animazione «La città incantata»?`, `Hayao Miyazaki`, `Isao Takahata|Makoto Shinkai|Satoshi Kon`, 2);
  Q(`Quale cuoco-attore protagonista del film «Chef - La ricetta perfetta» è anche il regista?`, `Jon Favreau`, `Vince Vaughn|Seth Rogen|Jonah Hill`, 3);
  Q(`Quale attore interpreta Tony Stark nei film Marvel?`, `Robert Downey Jr.`, `Chris Evans|Chris Hemsworth|Mark Ruffalo`, 1);
  // ===== Vero/falso scritti a mano =====
  V(`«Il cantante di jazz» (1927) è considerato il primo lungometraggio sonoro.`, true, 2);
  V(`Cinecittà, gli studi cinematografici italiani, si trova a Milano.`, false, 1, `Si trova a Roma, fondata nel 1937.`);
  V(`La Palma d'oro è il premio principale del Festival di Berlino.`, false, 1, `A Berlino si assegna l'Orso d'oro; la Palma d'oro è di Cannes.`);
  V(`Federico Fellini è nato a Rimini.`, true, 2);
  V(`Sergio Leone è nato a Napoli.`, false, 2, `Sergio Leone è nato a Roma.`);
  V(`«La dolce vita» di Fellini ha vinto la Palma d'oro a Cannes nel 1960.`, true, 2);
  V(`Roberto Benigni ha vinto l'Oscar come miglior attore protagonista per «La vita è bella».`, true, 1);
  V(`«La grande bellezza» ha vinto l'Oscar come miglior film straniero.`, true, 1);
  V(`Paolo Sorrentino ha diretto «Nuovo Cinema Paradiso».`, false, 1, `È un film di Giuseppe Tornatore.`);
  V(`Giuseppe Tornatore ha diretto «Malèna».`, true, 2);
  V(`Ennio Morricone ha vinto un Oscar competitivo per la colonna sonora di «The Hateful Eight».`, true, 2);
  V(`Nel film «Shining» l'albergo isolato si chiama Overlook Hotel.`, true, 2);
  V(`Stanley Kubrick ha diretto «Il silenzio degli innocenti».`, false, 1, `Il film è di Jonathan Demme.`);
  V(`«Il padrino - Parte II» ha vinto l'Oscar come miglior film.`, true, 2);
  V(`Prima di «Parasite», nessun film non in lingua inglese aveva vinto l'Oscar come miglior film.`, true, 2);
  V(`Kathryn Bigelow è stata la prima donna a vincere l'Oscar come miglior regista.`, true, 2);
  V(`Katharine Hepburn ha vinto quattro Oscar per la recitazione.`, true, 3);
  V(`Meryl Streep ha vinto più Oscar per la recitazione di Katharine Hepburn.`, false, 3, `Hepburn ne ha vinti quattro, Streep tre.`);
  V(`«Titanic» e «Il Signore degli Anelli - Il ritorno del re» hanno vinto entrambi 11 Oscar.`, true, 2);
  V(`«Il Signore degli Anelli - Il ritorno del re» ha vinto tutti gli 11 Oscar per cui era candidato.`, true, 3);
  V(`Il personaggio di Fantozzi è stato creato da Paolo Villaggio.`, true, 1);
  V(`I primi due film di Fantozzi sono stati diretti da Luciano Salce.`, true, 3);
  V(`«Amici miei» è stato diretto da Dino Risi.`, false, 2, `Lo ha diretto Mario Monicelli.`);
  V(`«Il sorpasso» è un film di Dino Risi con Vittorio Gassman.`, true, 2);
  V(`«Django» (1966) è un film di Sergio Corbucci.`, true, 3);
  V(`«Bud Spencer» è un nome d'arte.`, true, 1);
  V(`Terence Hill si chiama in realtà Mario Girotti.`, true, 2);
  V(`Il vero nome di Totò era Antonio de Curtis.`, true, 2);
  V(`Totò è nato a Roma.`, false, 2, `Totò è nato a Napoli, nel rione Sanità.`);
  V(`Anna Magnani vinse l'Oscar come miglior attrice per «La rosa tatuata».`, true, 3);
  V(`Sophia Loren è nata a Napoli.`, false, 3, `È nata a Roma ed è cresciuta a Pozzuoli.`);
  V(`Monica Bellucci interpreta Malèna nel film di Tornatore.`, true, 1);
  V(`«Il postino» è stato l'ultimo film di Massimo Troisi, morto poco dopo la fine delle riprese.`, true, 2);
  V(`«Gomorra» di Matteo Garrone è tratto da un libro di Roberto Saviano.`, true, 1);
  V(`«Il nome della rosa» è tratto da un romanzo di Umberto Eco.`, true, 1);
  V(`«Indiana Jones e il tempio maledetto» è uscito prima de «I predatori dell'arca perduta».`, false, 2, `I predatori dell'arca perduta è del 1981, il tempio maledetto del 1984.`);
  V(`Alfred Hitchcock compare in un breve cameo in molti dei suoi film.`, true, 1);
  V(`«Psyco» di Hitchcock è un film a colori.`, false, 2, `È girato in bianco e nero.`);
  V(`«Schindler's List» è girato quasi interamente in bianco e nero.`, true, 1);
  V(`«Casablanca» è ambientato a Marrakech.`, false, 2, `È ambientato a Casablanca, in Marocco.`);
  V(`«Il pianista» di Roman Polanski è ambientato soprattutto a Varsavia.`, true, 2);
  V(`«Il cacciatore» è un film ambientato nel periodo della guerra del Vietnam.`, true, 2);
  V(`«Rocky» ha vinto l'Oscar come miglior film.`, true, 1);
  V(`«Oppenheimer» ha vinto l'Oscar come miglior film.`, true, 1);
  V(`«Oppenheimer» ha vinto sette Oscar.`, true, 2);
  V(`Il film «Avatar» è ambientato sul pianeta Pandora.`, true, 1);
  V(`La saga di «Mission: Impossible» è ispirata a una serie televisiva.`, true, 2);
  V(`James Bond è un personaggio creato da Ian Fleming.`, true, 1);
  V(`Daniel Craig ha interpretato 007 in «Missione Goldfinger».`, false, 1, `In Goldfinger il protagonista è Sean Connery.`);
  V(`Pierce Brosnan ha interpretato 007 in «Skyfall».`, false, 1, `In Skyfall l'agente 007 è Daniel Craig.`);
  V(`Il tema principale di «Skyfall» è cantato da Adele.`, true, 1);
  V(`«Quasi amici» è un film francese.`, true, 1);
  V(`«Il favoloso mondo di Amélie» è ambientato a Roma.`, false, 1, `È ambientato a Parigi, nel quartiere di Montmartre.`);
  V(`«Train to Busan» è un film sudcoreano.`, true, 2);
  V(`«Oldboy» è un film giapponese.`, false, 2, `Oldboy è un film sudcoreano di Park Chan-wook.`);
  V(`«Parasite» è stato girato in lingua inglese.`, false, 1, `È girato in coreano.`);
  V(`«I sette samurai» è stato diretto da Akira Kurosawa.`, true, 2);
  V(`«La città incantata» è stato diretto da Akira Kurosawa.`, false, 1, `Lo ha diretto Hayao Miyazaki.`);
  V(`«Metropolis» è un film muto di Fritz Lang del 1927.`, true, 2);
  V(`«Nosferatu il vampiro» (1922) è un film muto.`, true, 2);
  V(`«Il settimo sigillo» è un film di Ingmar Bergman.`, true, 2);
  V(`«Seven» è stato diretto da Christopher Nolan.`, false, 1, `Lo ha diretto David Fincher.`);
  V(`«Fight Club» è stato diretto da David Fincher.`, true, 1);
  V(`«Memento» di Christopher Nolan è raccontato in gran parte a ritroso.`, true, 3);
  V(`«Pulp Fiction» ha vinto la Palma d'oro a Cannes.`, true, 2);
  V(`«Joker» di Todd Phillips ha vinto il Leone d'oro alla Mostra di Venezia.`, true, 2);
  V(`«Nuovo Cinema Paradiso» ha vinto l'Oscar come miglior film straniero.`, true, 2);
  V(`«Mediterraneo» di Gabriele Salvatores ha vinto l'Oscar come miglior film straniero.`, true, 2);
  V(`«Lo chiamavano Trinità» ha per protagonisti Bud Spencer e Terence Hill.`, true, 1);
  V(`«Il buono, il brutto, il cattivo» fa parte della cosiddetta «trilogia del dollaro» di Sergio Leone.`, true, 1);
  V(`«C'era una volta in America» è l'ultimo film diretto da Sergio Leone.`, true, 2);
  V(`Gli effetti speciali di «E.T.» furono ideati dall'italiano Carlo Rambaldi.`, true, 3);
  V(`Dante Ferretti ha vinto tre Oscar per la scenografia.`, true, 3);
  V(`Vittorio Storaro ha vinto tre Oscar per la fotografia.`, true, 3);
  V(`«Kill Bill» è uscito al cinema in due parti.`, true, 1);
  V(`«Il Gattopardo» di Visconti ha vinto la Palma d'oro a Cannes.`, true, 3);
  V(`«La stanza del figlio» di Nanni Moretti ha vinto la Palma d'oro nel 2001.`, true, 2);
  V(`Al tempo del cinema muto le sale non avevano alcun accompagnamento musicale.`, false, 2, `Spesso c'era musica dal vivo, con pianisti o orchestre.`);
  V(`Hayao Miyazaki ha vinto un Oscar per «La città incantata».`, true, 2);
  V(`«Il ragazzo e l'airone» di Hayao Miyazaki ha vinto l'Oscar come miglior film d'animazione.`, true, 3);
  V(`Il film «The Artist» è quasi interamente muto.`, true, 2);
  V(`«Arancia meccanica» è tratto da un romanzo di Anthony Burgess.`, true, 2);
  V(`«Shining» è tratto da un romanzo di Stephen King.`, true, 1);
  V(`«Il silenzio degli innocenti» è tratto da un romanzo di Thomas Harris.`, true, 2);
  V(`«Il padrino» è tratto da un romanzo di Mario Puzo.`, true, 1);
  V(`Sofia Coppola è la figlia del regista Francis Ford Coppola.`, true, 2);
  V(`Nicolas Cage è il nipote del regista Francis Ford Coppola.`, true, 3);
  V(`Liza Minnelli è la figlia di Judy Garland.`, true, 3);
  V(`Angelina Jolie è la figlia dell'attore Jon Voight.`, true, 3);
  V(`Isabella Rossellini è figlia del regista Roberto Rossellini e di Ingrid Bergman.`, true, 3);
  V(`Il regista Ridley Scott aveva un fratello regista, Tony Scott.`, true, 3);
  V(`Joel ed Ethan Coen sono fratelli.`, true, 1);
  V(`Lana e Lilly Wachowski, registrici di «Matrix», sono sorelle.`, true, 2);
  V(`«La La Land» è ambientato a Los Angeles.`, true, 1);
  V(`«Mamma Mia!» è ambientato su un'isola greca.`, true, 1);
  V(`«Billy Elliot» racconta la storia di un ragazzo che vuole fare il ballerino.`, true, 1);
  V(`Boris Karloff è l'attore che interpreta il mostro in «Frankenstein» (1931).`, true, 2);
  V(`Bela Lugosi interpreta il mostro in «Frankenstein» (1931).`, false, 3, `Il mostro è Boris Karloff; Lugosi è il Dracula del 1931.`);
  V(`Nel formato IMAX lo schermo è molto più piccolo di quello di un normale cinema.`, false, 2, `Gli schermi IMAX sono giganteschi.`);
  V(`«Lawrence d'Arabia» è un film di Stanley Kubrick.`, false, 2, `Lo ha diretto David Lean.`);
  V(`«Il ponte sul fiume Kwai» ha vinto sette Oscar.`, true, 3);
  V(`«Ben-Hur» (1959) ha vinto 11 Oscar.`, true, 2);
  V(`«La La Land» ha ricevuto 14 candidature agli Oscar, come «Titanic» e «Eva contro Eva».`, true, 3);
  V(`Il film «Il Gladiatore» è ambientato nell'antica Roma.`, true, 1);
  V(`Quentin Tarantino ha diretto «Bastardi senza gloria».`, true, 1);
  V(`Wes Anderson ha diretto «Grand Budapest Hotel».`, true, 1);
  (D.pop = D.pop || []).push({
    id: 'pluscinema', extends: 'cinema',
    quiz, tf, tables, quotes,
    quoteText: 'Da quale film è tratta questa battuta?',
    emojis, emojiText: 'Quale film raccontano queste emoji?',
    order, numbers, typed,
  });
})(typeof window !== 'undefined' ? window : globalThis);
