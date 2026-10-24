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
Medea|Pier Paolo Pasolini|1969|3
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
Vita smeralda|Carlo Vanzina|2006|3
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
Pinocchio|Roberto Benigni|2002|1
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
Suspiria|Dario Argento|1977|1
Inferno|Dario Argento|1980|3
Tenebre|Dario Argento|1982|2
Phenomena|Dario Argento|1985|2
Opera|Dario Argento|1987|3
La maschera del demonio|Mario Bava|1960|3
La ragazza che sapeva troppo|Mario Bava|1963|3
I tre volti della paura|Mario Bava|1963|3
Sei donne per l'assassino|Mario Bava|1964|3
Terrore nello spazio|Mario Bava|1965|3
Operazione paura|Mario Bava|1966|3
Diabolik|Mario Bava|1968|2
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
Romeo e Giulietta|Franco Zeffirelli|1968|1
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
  (D.pop = D.pop || []).push({
    id: 'pluscinema', extends: 'cinema',
    quiz, tf, tables, quotes,
    quoteText: 'Da quale film è tratta questa battuta?',
    emojis, emojiText: 'Quale film raccontano queste emoji?',
    order, numbers, typed,
  });
})(typeof window !== 'undefined' ? window : globalThis);
