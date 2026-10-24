// Arte — domande in più per la categoria classica «arte» (extends): opere ↔ artisti ↔ musei ↔ città ↔ anni, movimenti,
// nazionalità, date di nascita e di morte, scultori, architetti, tecniche e curiosità. Solo testo; fatti verificati (fino al 2024).
(function (root) {
  'use strict';
  const D = (root.QZ_DATA = root.QZ_DATA || {});
  // Una riga = un elemento, colonne separate da «|».
  const rows = (s) => s.trim().split('\n').map((l) => l.split('|').map((x) => x.trim()));
  const T = (id, items, fields, numeric) => ({ id, items, fields, ...(numeric ? { numeric } : {}) });
  const Q = (q, a, wrong, d) => ({ q, a, wrong, d });
  const TF = (q, a, d, why) => (why ? { q, a, d, why } : { q, a, d });
  const N = (q, v, min, max, tol, unit, d) => ({ q, v, min, max, tol, unit, d });
  const E = (emoji, answer, d) => ({ emoji, answer, d });
  const quiz = [], tf = [];
  // Quiz: QQ(d, domanda, giusta, sbagliata1, sbagliata2, sbagliata3)
  const QQ = (d, q, a, w1, w2, w3) => quiz.push(Q(q, a, [w1, w2, w3], d));
  // Vero/falso: TT(d, affermazione, vero?, spiegazione se falsa)
  const TT = (d, q, a, why) => tf.push(TF(q, a, d, why));

  // ── Dove si trovano: luogo → città ──
  const CITTA = {
    'Louvre': 'Parigi', 'Museo d\'Orsay': 'Parigi', 'Musée de l\'Orangerie': 'Parigi', 'Musée Marmottan Monet': 'Parigi',
    'Galleria degli Uffizi': 'Firenze', 'Palazzo Pitti': 'Firenze', 'Basilica di Santa Maria Novella': 'Firenze', 'Cappella Brancacci': 'Firenze',
    'Chiesa di Santa Felicita': 'Firenze',
    'Museo del Prado': 'Madrid', 'Museo Reina Sofía': 'Madrid', 'Rijksmuseum': 'Amsterdam', 'Museo Van Gogh': 'Amsterdam', 'Mauritshuis': 'L\'Aia',
    'National Gallery': 'Londra', 'Tate Britain': 'Londra', 'Tate Modern': 'Londra', 'Wallace Collection': 'Londra', 'Courtauld Gallery': 'Londra',
    'Ermitage': 'San Pietroburgo', 'Galleria Tret\'jakov': 'Mosca',
    'Kunsthistorisches Museum': 'Vienna', 'Belvedere': 'Vienna', 'Albertina': 'Vienna',
    'Gallerie dell\'Accademia di Venezia': 'Venezia', 'Basilica dei Frari': 'Venezia', 'Basilica di San Giorgio Maggiore': 'Venezia',
    'Chiesa di San Zaccaria': 'Venezia',
    'Pinacoteca di Brera': 'Milano', 'Pinacoteca Ambrosiana': 'Milano', 'Museo del Novecento': 'Milano', 'Chiesa di Santa Maria delle Grazie': 'Milano',
    'Galleria Borghese': 'Roma', 'Palazzo Barberini': 'Roma', 'Galleria Doria Pamphilj': 'Roma', 'Chiesa di San Luigi dei Francesi': 'Roma',
    'Basilica di Santa Maria del Popolo': 'Roma', 'Basilica di Sant\'Agostino': 'Roma',
    'Musei Vaticani': 'Città del Vaticano', 'Cappella Sistina': 'Città del Vaticano',
    'MoMA': 'New York', 'Metropolitan Museum of Art': 'New York', 'Museo Guggenheim di New York': 'New York', 'Neue Galerie': 'New York',
    'Art Institute of Chicago': 'Chicago', 'Phillips Collection': 'Washington', 'Museum of Fine Arts': 'Boston',
    'Alte Pinakothek': 'Monaco di Baviera', 'Gemäldegalerie Alte Meister': 'Dresda', 'Gemäldegalerie di Berlino': 'Berlino',
    'Kunsthalle di Amburgo': 'Amburgo', 'Musée Unterlinden': 'Colmar',
    'Cattedrale di San Bavone': 'Gand', 'Cattedrale di Anversa': 'Anversa', 'Museo Czartoryski': 'Cracovia',
    'Cappella degli Scrovegni': 'Padova', 'Palazzo Ducale di Mantova': 'Mantova', 'Palazzo Pubblico': 'Siena', 'Museo dell\'Opera del Duomo': 'Siena',
    'Galleria Nazionale delle Marche': 'Urbino', 'Palazzo Abatellis': 'Palermo', 'Museo di Capodimonte': 'Napoli',
    'Basilica di San Francesco di Arezzo': 'Arezzo', 'Chiesa di Santo Tomé': 'Toledo', 'Kelvingrove Art Gallery': 'Glasgow',
    'Museo de Arte Moderno': 'Città del Messico', 'LACMA': 'Los Angeles', 'Musées royaux des Beaux-Arts': 'Bruxelles',
    'Villa Farnesina': 'Roma', 'Museo Mandralisca': 'Cefalù', 'Galleria Nazionale di Parma': 'Parma', 'Philadelphia Museum of Art': 'Filadelfia',
    'Museo dell\'Opera di Santa Croce': 'Firenze', 'Loggia dei Lanzi': 'Firenze', 'Basilica di San Pietro in Vincoli': 'Roma', 'Castello Sforzesco': 'Milano',
    'Chiesa di Santa Maria della Vittoria': 'Roma', 'Musei Capitolini': 'Roma', 'Museo Nazionale della Magna Grecia': 'Reggio Calabria',
    'Museo Archeologico di Delfi': 'Delfi', 'Glyptothek': 'Monaco di Baviera', 'Naturhistorisches Museum': 'Vienna',
    'Museo Guggenheim di Bilbao': 'Bilbao', 'Millennium Park': 'Chicago',
  };

  // ── Opere: titolo | artista | luogo | anno | difficoltà (campo vuoto = non si usa) ──
  // Per le opere già presenti nella categoria («Chi ha dipinto…?») l'artista è lasciato vuoto.
  const operePittura = rows(`
La Gioconda||||1
L'Ultima Cena||Chiesa di Santa Maria delle Grazie|1498|1
L'Uomo vitruviano|Leonardo da Vinci|Gallerie dell'Accademia di Venezia|1490|2
La dama con l'ermellino|Leonardo da Vinci|Museo Czartoryski|1490|3
La Scapigliata|Leonardo da Vinci|Galleria Nazionale di Parma||3
Tondo Doni|Michelangelo|Galleria degli Uffizi|1507|2
Il Giudizio Universale di Michelangelo||Cappella Sistina|1541|1
La creazione di Adamo||Cappella Sistina|1511|1
La Fornarina|Raffaello|Palazzo Barberini||2
La Velata|Raffaello|Palazzo Pitti||3
La Madonna della seggiola|Raffaello|Palazzo Pitti||3
La Trasfigurazione|Raffaello|Musei Vaticani|1520|2
Ritratto di Baldassarre Castiglione|Raffaello|Louvre||3
La Madonna del Cardellino|Raffaello|Galleria degli Uffizi||3
Il trionfo di Galatea|Raffaello|Villa Farnesina|1512|3
La scuola di Atene||Musei Vaticani|1511|1
Lo sposalizio della Vergine||Pinacoteca di Brera|1504|2
La nascita di Venere|||1485|1
Venere e Marte|Sandro Botticelli|National Gallery||3
La Madonna del Magnificat|Sandro Botticelli|Galleria degli Uffizi||3
Pallade e il Centauro|Sandro Botticelli|Galleria degli Uffizi||3
La Calunnia di Apelle|Sandro Botticelli|Galleria degli Uffizi||3
La Primavera||Galleria degli Uffizi||1
Bacco||Galleria degli Uffizi|1596|2
Medusa||Galleria degli Uffizi|1597|2
Canestra di frutta||Pinacoteca Ambrosiana|1599|2
Giuditta e Oloferne||Palazzo Barberini|1599|2
Vocazione di san Matteo||Chiesa di San Luigi dei Francesi|1600|2
Amor vincit omnia|Caravaggio|Gemäldegalerie di Berlino|1602|3
La Madonna dei Pellegrini|Caravaggio|Basilica di Sant'Agostino|1606|3
Giuditta che decapita Oloferne|Artemisia Gentileschi|||2
Il mangiafagioli|Annibale Carracci|||3
La Madonna dal collo lungo|Parmigianino|Galleria degli Uffizi||3
Venere, Cupido, la Follia e il Tempo|Bronzino|National Gallery||3
Venere di Urbino||Galleria degli Uffizi|1538|1
Amor sacro e Amor profano||Galleria Borghese||2
Carlo V a Mühlberg|Tiziano|Museo del Prado|1548|3
La Tempesta||Gallerie dell'Accademia di Venezia|1508|2
La Venere dormiente|Giorgione|Gemäldegalerie Alte Meister|1510|3
Il miracolo dello schiavo|Tintoretto|Gallerie dell'Accademia di Venezia|1548|3
La cena in casa di Levi|Paolo Veronese|Gallerie dell'Accademia di Venezia|1573|3
Camera degli Sposi|Andrea Mantegna|Palazzo Ducale di Mantova|1474|2
Cristo morto||Pinacoteca di Brera||2
L'Annunciata|Antonello da Messina|Palazzo Abatellis||3
Ritratto d'ignoto marinaio|Antonello da Messina|Museo Mandralisca||3
Pala di San Zaccaria|Giovanni Bellini|Chiesa di San Zaccaria|1505|3
Maestà di Ognissanti|Giotto|Galleria degli Uffizi||2
Affreschi della Cappella degli Scrovegni|Giotto||1305|2
Maestà di Duccio||Museo dell'Opera del Duomo|1311|3
Maestà di Simone Martini||Palazzo Pubblico|1315|3
Allegoria ed effetti del Buono e del Cattivo Governo|Ambrogio Lorenzetti|Palazzo Pubblico|1339|3
Il polittico dell'Agnello mistico|Jan van Eyck|Cattedrale di San Bavone|1432|2
Ritratto dei coniugi Arnolfini||National Gallery|1434|2
Il giardino delle delizie||Museo del Prado||1
Cacciatori nella neve||Kunsthistorisches Museum|1565|2
La torre di Babele||Kunsthistorisches Museum|1563|2
I proverbi fiamminghi|Pieter Bruegel il Vecchio|Gemäldegalerie di Berlino|1559|3
La parabola dei ciechi|Pieter Bruegel il Vecchio|Museo di Capodimonte|1568|3
Autoritratto con pelliccia|Albrecht Dürer|Alte Pinakothek|1500|3
La lepre (acquerello)|Albrecht Dürer|Albertina|1502|3
Melencolia I|Albrecht Dürer||1514|3
Il rinoceronte (xilografia)|Albrecht Dürer||1515|3
Gli ambasciatori|Hans Holbein il Giovane|National Gallery|1533|2
L'altare di Isenheim|Matthias Grünewald|Musée Unterlinden|1515|3
La ronda di notte||Rijksmuseum|1642|1
La lezione di anatomia del dottor Tulp|Rembrandt|Mauritshuis|1632|2
La sposa ebrea|Rembrandt|Rijksmuseum|1665|3
Il ritorno del figliol prodigo|Rembrandt|Ermitage|1669|3
Il bue squartato|Rembrandt|Louvre|1655|3
Ragazza col turbante (con l'orecchino di perla)||Mauritshuis|1665|1
La lattaia|Jan Vermeer|Rijksmuseum|1658|2
Veduta di Delft|Jan Vermeer|Mauritshuis|1661|3
L'arte della pittura|Jan Vermeer|Kunsthistorisches Museum||3
Il cavaliere sorridente|Frans Hals|Wallace Collection|1624|3
Las Meninas||Museo del Prado|1656|1
La resa di Breda|Diego Velázquez|Museo del Prado|1635|2
Venere Rokeby|Diego Velázquez|National Gallery|1651|3
Ritratto di Innocenzo X|Diego Velázquez|Galleria Doria Pamphilj|1650|3
Il funerale del conte di Orgaz|El Greco|Chiesa di Santo Tomé|1588|2
Veduta di Toledo|El Greco|Metropolitan Museum of Art|1600|3
La maja desnuda|Francisco Goya|Museo del Prado|1800|2
La famiglia di Carlo IV|Francisco Goya|Museo del Prado|1801|3
Saturno che divora un figlio|Francisco Goya|Museo del Prado|1823|2
Il 3 maggio 1808||Museo del Prado|1814|2
Pellegrinaggio all'isola di Citera|Jean-Antoine Watteau|Louvre|1717|3
L'altalena|Jean-Honoré Fragonard|Wallace Collection|1767|3
Il giuramento degli Orazi||Louvre|1784|2
La morte di Marat||Musées royaux des Beaux-Arts|1793|3
L'incoronazione di Napoleone|Jacques-Louis David|Louvre|1807|2
La grande odalisca|Jean-Auguste-Dominique Ingres|Louvre|1814|2
La zattera della Medusa||Louvre|1819|1
La Libertà che guida il popolo||Louvre|1830|1
Viandante sul mare di nebbia||Kunsthalle di Amburgo|1818|2
La grande onda di Kanagawa|||1831|1
Il Temerario|William Turner|National Gallery|1839|2
Pioggia, vapore e velocità||National Gallery|1844|2
Il bacio (1859)||Pinacoteca di Brera|1859|1
Il Quarto Stato||Museo del Novecento|1901|2
La Signora di Shalott|John William Waterhouse|||3
Un funerale a Ornans|Gustave Courbet|Museo d'Orsay|1850|3
L'atelier del pittore|Gustave Courbet|Museo d'Orsay|1855|3
Le spigolatrici||Museo d'Orsay|1857|2
L'Angelus|Jean-François Millet|Museo d'Orsay|1859|2
Olympia|Édouard Manet|Museo d'Orsay|1863|2
Colazione sull'erba||Museo d'Orsay|1863|2
Il bar delle Folies-Bergère|Édouard Manet|Courtauld Gallery|1882|3
Impressione, levar del sole||Musée Marmottan Monet|1872|1
I papaveri|Claude Monet|Museo d'Orsay|1873|3
Bal au moulin de la Galette||Museo d'Orsay|1876|2
La colazione dei canottieri|Pierre-Auguste Renoir|Phillips Collection|1881|3
L'assenzio|Edgar Degas|Museo d'Orsay|1876|3
I giocatori di carte||||1
Le grandi bagnanti|Paul Cézanne|||3
Una domenica pomeriggio sull'isola della Grande-Jatte|||1886|2
Bagnanti ad Asnières|Georges Seurat|National Gallery|1884|3
I mangiatori di patate|Vincent van Gogh||1885|2
La notte stellata||MoMA|1889|1
La camera da letto ad Arles|||1888|1
Terrazza del caffè la sera|||1888|2
Autoritratto con l'orecchio bendato|Vincent van Gogh|Courtauld Gallery|1889|3
Campo di grano con volo di corvi|Vincent van Gogh|Museo Van Gogh|1890|2
Da dove veniamo? Chi siamo? Dove andiamo?||Museum of Fine Arts|1897|2
Al Moulin Rouge|Henri de Toulouse-Lautrec|Art Institute of Chicago||3
L'urlo|||1893|1
Il bacio (1907-08)||Belvedere|1908|1
Ritratto di Adele Bloch-Bauer I|Gustav Klimt|Neue Galerie|1907|3
Il vecchio chitarrista|Pablo Picasso|Art Institute of Chicago|1903|3
Ritratto di Gertrude Stein|Pablo Picasso|Metropolitan Museum of Art|1906|3
Les Demoiselles d'Avignon|Pablo Picasso|MoMA|1907|1
Guernica|Pablo Picasso|Museo Reina Sofía|1937|1
La gioia di vivere|Henri Matisse|||3
Quadrato nero|Kazimir Malevič|Galleria Tret'jakov|1915|2
Composizione VIII|Wassily Kandinsky|Museo Guggenheim di New York|1923|3
Broadway Boogie Woogie|Piet Mondrian|MoMA|1943|2
Io e il villaggio|Marc Chagall|MoMA|1911|3
La città che sale||MoMA|1911|2
I funerali dell'anarchico Galli|Carlo Carrà|MoMA|1911|3
Le muse inquietanti|Giorgio de Chirico||1918|2
La persistenza della memoria|Salvador Dalí|MoMA|1931|1
Cristo di san Giovanni della Croce|Salvador Dalí|Kelvingrove Art Gallery|1951|3
Il tradimento delle immagini|René Magritte|LACMA|1929|3
Le due Frida|Frida Kahlo|Museo de Arte Moderno|1939|3
Nighthawks (I nottambuli)|Edward Hopper|Art Institute of Chicago|1942|2
American Gothic|Grant Wood|Art Institute of Chicago|1930|2
Autumn Rhythm (Number 30)|Jackson Pollock|Metropolitan Museum of Art|1950|3
Barattoli di zuppa Campbell's|Andy Warhol|MoMA|1962|2
Ragazza che annega|Roy Lichtenstein|MoMA|1963|3
Whaam!|Roy Lichtenstein|Tate Modern|1963|3
La madre di Whistler|James Abbott McNeill Whistler|Museo d'Orsay|1871|3
Fontana (l'orinatoio)|Marcel Duchamp||1917|2
Paolina Borghese come Venere vincitrice|Antonio Canova|Galleria Borghese|1808|2
Psiche rianimata dal bacio di Amore|Antonio Canova|||2
Il Pensatore|Auguste Rodin|||1
I borghesi di Calais|Auguste Rodin|||3
La porta dell'Inferno|Auguste Rodin|||3
Il bacio (scultura in marmo)|Auguste Rodin|||2
Monumento equestre al Gattamelata|Donatello||1453|3
La porta del Paradiso|Lorenzo Ghiberti||1452|3
Perseo con la testa di Medusa|Benvenuto Cellini|Loggia dei Lanzi|1554|3
Il ratto delle Sabine|Giambologna|Loggia dei Lanzi|1583|3
Il Mosè|Michelangelo|Basilica di San Pietro in Vincoli|1515|2
La Pietà Rondanini|Michelangelo|Castello Sforzesco||3
L'estasi di santa Teresa|Gian Lorenzo Bernini|Chiesa di Santa Maria della Vittoria|1652|2
Apollo e Dafne|Gian Lorenzo Bernini|Galleria Borghese|1625|2
Il ratto di Proserpina|Gian Lorenzo Bernini|Galleria Borghese||2
Baldacchino di San Pietro|Gian Lorenzo Bernini|||3
Monumento equestre a Bartolomeo Colleoni|Andrea del Verrocchio|||3
Il Discobolo|Mirone|||2
Il Doriforo|Policleto|||3
Nike di Samotracia||Louvre||1
Venere di Milo||Louvre||1
Il Galata morente||Musei Capitolini||3
La Lupa capitolina||Musei Capitolini||2
I Bronzi di Riace||Museo Nazionale della Magna Grecia||1
L'Auriga di Delfi||Museo Archeologico di Delfi||3
Venere dei Medici||Galleria degli Uffizi||3
Il Fauno Barberini||Glyptothek||3
Venere di Willendorf||Naturhistorisches Museum||2
L'uomo che cammina|Alberto Giacometti|||2
La colonna senza fine|Constantin Brâncuși|||3
Forme uniche della continuità nello spazio|Umberto Boccioni||1913|2
Puppy|Jeff Koons|Museo Guggenheim di Bilbao||2
Cloud Gate (The Bean)|Anish Kapoor|Millennium Park|2006|2
Maman (il grande ragno)|Louise Bourgeois|||3
L'angelo del Nord|Antony Gormley||1998|3
Comedian (la banana attaccata al muro)|Maurizio Cattelan||2019|2
`);
  const NASCOSTI = new Set(['Cappella Sistina']);
  const SENZA_CITTA = new Set(['Cappella Sistina', 'Musei Vaticani']); // Città del Vaticano ≠ Roma: meglio non confrontarle
  for (const r of operePittura) if (r.length !== 5) throw new Error('riga opere: ' + r.join('|'));
  const opere = operePittura.map(([name, artista, luogo, , d]) => {
    const it = { name, d: +d };
    if (artista) it.artista = artista;
    if (luogo) {
      if (!CITTA[luogo]) throw new Error('luogo sconosciuto: ' + luogo);
      if (!SENZA_CITTA.has(luogo)) it.citta = CITTA[luogo];
      if (!NASCOSTI.has(luogo)) it.luogo = luogo;
    }
    return it;
  });
  const anniOpere = operePittura.filter((r) => r[3]).map((r) => ({ name: r[0], d: +r[4], anno: +r[3] }));
  const annoField = (span, tol, gap) => ({
    anno: { ask: 'In che anno è stata realizzata (o completata) quest\'opera: «{name}»?', span, tol, format: 'year', step: 1,
      duel: 'Quale delle due opere è stata realizzata prima?', lowerWins: true, order: 'Metti in ordine di realizzazione, dalla più antica', gap },
  });

  // ── Artisti e architetti: nome | Paese di nascita | nascita | morte | movimento | difficoltà (vuoto = non si usa) ──
  const artistiRows = rows(`
Giotto|Italia||1337||2
Masaccio|Italia|1401|1428|Rinascimento|2
Beato Angelico|Italia|1395|1455|Rinascimento|3
Donatello|Italia|1386|1466|Rinascimento|1
Filippo Brunelleschi|Italia|1377|1446|Rinascimento|2
Sandro Botticelli|Italia|1445|1510|Rinascimento|1
Leonardo da Vinci|Italia|1452|1519|Rinascimento|1
Michelangelo|Italia|1475|1564|Rinascimento|1
Raffaello|Italia|1483|1520|Rinascimento|1
Tiziano|Italia||1576|Rinascimento|2
Giorgione|Italia|1478|1510|Rinascimento|3
Andrea Mantegna|Italia|1431|1506|Rinascimento|2
Piero della Francesca|Italia||1492|Rinascimento|3
Giovanni Bellini|Italia||1516|Rinascimento|3
Antonello da Messina|Italia||1479|Rinascimento|3
Paolo Uccello|Italia|1397|1475|Rinascimento|3
Andrea del Verrocchio|Italia|1435|1488|Rinascimento|3
Donato Bramante|Italia|1444|1514|Rinascimento|3
Leon Battista Alberti|Italia|1404|1472|Rinascimento|3
Andrea Palladio|Italia|1508|1580|Rinascimento|2
Giorgio Vasari|Italia|1511|1574||2
Benvenuto Cellini|Italia|1500|1571||3
Tintoretto|Italia|1518|1594||2
Paolo Veronese|Italia|1528|1588||2
Correggio|Italia||1534||3
Parmigianino|Italia|1503|1540||3
Pontormo|Italia|1494|1557||3
Bronzino|Italia|1503|1572||3
Giuseppe Arcimboldo|Italia|1526|1593||2
Caravaggio|Italia|1571|1610|Barocco|1
Annibale Carracci|Italia|1560|1609|Barocco|3
Guido Reni|Italia|1575|1642|Barocco|3
Artemisia Gentileschi|Italia|1593||Barocco|2
Gian Lorenzo Bernini|Italia|1598|1680|Barocco|1
Francesco Borromini||1599|1667|Barocco|2
Pietro da Cortona|Italia|1596|1669|Barocco|3
Guercino|Italia|1591|1666|Barocco|3
Canaletto|Italia|1697|1768||2
Giambattista Tiepolo|Italia|1696|1770||2
Antonio Canova|Italia|1757|1822|Neoclassicismo|1
Francesco Hayez|Italia|1791|1882|Romanticismo|2
Giovanni Fattori|Italia|1825|1908||2
Telemaco Signorini|Italia|1835|1901||3
Silvestro Lega|Italia|1826|1895||3
Giuseppe Pellizza da Volpedo|Italia|1868|1907|Divisionismo|2
Giovanni Segantini||1858|1899|Divisionismo|3
Gaetano Previati|Italia|1852|1920|Divisionismo|3
Umberto Boccioni|Italia|1882|1916|Futurismo|1
Giacomo Balla|Italia|1871|1958|Futurismo|2
Gino Severini|Italia|1883|1966|Futurismo|3
Luigi Russolo|Italia|1885|1947|Futurismo|3
Fortunato Depero|Italia|1892|1960|Futurismo|3
Amedeo Modigliani|Italia|1884|1920||1
Giorgio de Chirico||1888|1978||2
Giorgio Morandi|Italia|1890|1964||2
Mario Sironi|Italia|1885|1961||3
Lucio Fontana||1899|1968|Spazialismo|2
Alberto Burri|Italia|1915|1995||2
Piero Manzoni|Italia|1933|1963||2
Michelangelo Pistoletto|Italia|1933||Arte povera|3
Mario Merz|Italia|1925|2003|Arte povera|3
Giuseppe Penone|Italia|1947||Arte povera|3
Sandro Chia|Italia|1946||Transavanguardia|3
Francesco Clemente|Italia|1952||Transavanguardia|3
Enzo Cucchi|Italia|1949||Transavanguardia|3
Maurizio Cattelan|Italia|1960|||2
Marino Marini|Italia|1901|1980||3
Gio Ponti|Italia|1891|1979||3
Pier Luigi Nervi|Italia|1891|1979||3
Carlo Scarpa|Italia|1906|1978||3
Renzo Piano|Italia|1937|||1
Stefano Boeri|Italia|1956|||2
Mario Botta|Svizzera|1943|||3
Nicolas Poussin|Francia|1594|1665||3
Jean-Antoine Watteau|Francia|1684|1721|Rococò|3
François Boucher|Francia|1703|1770|Rococò|3
Jean-Honoré Fragonard|Francia|1732|1806|Rococò|3
Jacques-Louis David|Francia|1748|1825|Neoclassicismo|2
Jean-Auguste-Dominique Ingres|Francia|1780|1867||3
Théodore Géricault|Francia|1791|1824|Romanticismo|2
Eugène Delacroix|Francia|1798|1863|Romanticismo|2
Gustave Courbet|Francia|1819|1877|Realismo|2
Jean-François Millet|Francia|1814|1875|Realismo|3
Honoré Daumier|Francia|1808|1879|Realismo|3
Camille Corot|Francia|1796|1875||3
Édouard Manet|Francia|1832|1883||2
Claude Monet|Francia|1840|1926|Impressionismo|1
Pierre-Auguste Renoir|Francia|1841|1919|Impressionismo|1
Edgar Degas|Francia|1834|1917|Impressionismo|1
Camille Pissarro||1830|1903|Impressionismo|2
Alfred Sisley||1839|1899|Impressionismo|3
Berthe Morisot|Francia|1841|1895|Impressionismo|3
Mary Cassatt|Stati Uniti|1844|1926|Impressionismo|3
Gustave Caillebotte|Francia|1848|1894|Impressionismo|3
Paul Cézanne|Francia|1839|1906||1
Georges Seurat|Francia|1859|1891||2
Paul Signac|Francia|1863|1935||3
Paul Gauguin|Francia|1848|1903||1
Henri de Toulouse-Lautrec|Francia|1864|1901||1
Henri Rousseau|Francia|1844|1910||3
Henri Matisse|Francia|1869|1954||1
André Derain|Francia|1880|1954||3
Maurice de Vlaminck|Francia|1876|1958||3
Georges Braque|Francia|1882|1963|Cubismo|2
Fernand Léger|Francia|1881|1955||3
Marcel Duchamp|Francia|1887|1968|Dadaismo|2
Yves Klein|Francia|1928|1962||3
Yves Tanguy|Francia|1900|1955|Surrealismo|3
Auguste Rodin|Francia|1840|1917||1
Camille Claudel|Francia|1864|1943||3
Aristide Maillol|Francia|1861|1944||3
El Greco||1541|1614||2
Diego Velázquez|Spagna|1599|1660|Barocco|1
Bartolomé Esteban Murillo|Spagna|1617|1682|Barocco|3
Francisco de Zurbarán|Spagna|1598|1664|Barocco|3
Jusepe de Ribera|Spagna|1591|1652|Barocco|3
Francisco Goya|Spagna|1746|1828||1
Joaquín Sorolla|Spagna|1863|1923||3
Pablo Picasso|Spagna|1881|1973|Cubismo|1
Juan Gris|Spagna|1887|1927|Cubismo|3
Joan Miró|Spagna|1893|1983|Surrealismo|2
Salvador Dalí|Spagna|1904|1989|Surrealismo|1
Antoni Gaudí|Spagna|1852|1926||1
Antoni Tàpies|Spagna|1923|2012||3
Santiago Calatrava|Spagna|1951|||2
Albrecht Dürer|Germania|1471|1528|Rinascimento|2
Hans Holbein il Giovane|Germania|1497|1543|Rinascimento|3
Matthias Grünewald|Germania||1528||3
Lucas Cranach il Vecchio|Germania|1472|1553||3
Caspar David Friedrich|Germania|1774|1840|Romanticismo|2
Franz Marc|Germania|1880|1916|Espressionismo|3
Ernst Ludwig Kirchner|Germania|1880|1938|Espressionismo|3
Emil Nolde||1867|1956|Espressionismo|3
Max Ernst|Germania|1891|1976||3
Otto Dix|Germania|1891|1969||3
Joseph Beuys|Germania|1921|1986||3
Gerhard Richter|Germania|1932|||3
Anselm Kiefer|Germania|1945|||3
Walter Gropius|Germania|1883|1969||3
Ludwig Mies van der Rohe|Germania|1886|1969||3
Gustav Klimt|Austria|1862|1918||1
Egon Schiele|Austria|1890|1918|Espressionismo|2
Oskar Kokoschka|Austria|1886|1980|Espressionismo|3
Friedensreich Hundertwasser|Austria|1928|2000||3
Otto Wagner|Austria|1841|1918||3
Hieronymus Bosch|Paesi Bassi|1450|1516||1
Rembrandt|Paesi Bassi|1606|1669|Barocco|1
Jan Vermeer|Paesi Bassi|1632|1675|Barocco|1
Jan Steen|Paesi Bassi|1626|1679||3
Jacob van Ruisdael|Paesi Bassi|1628|1682||3
Vincent van Gogh|Paesi Bassi|1853|1890||1
Piet Mondrian|Paesi Bassi|1872|1944|Neoplasticismo|1
Maurits Cornelis Escher|Paesi Bassi|1898|1972||1
Theo van Doesburg|Paesi Bassi|1883|1931|Neoplasticismo|3
Rem Koolhaas|Paesi Bassi|1944|||3
René Magritte|Belgio|1898|1967|Surrealismo|1
James Ensor|Belgio|1860|1949||3
Paul Delvaux|Belgio|1897|1994|Surrealismo|3
Victor Horta|Belgio|1861|1947||3
Pieter Bruegel il Vecchio|||1569||2
Jan van Eyck|||1441||2
Pieter Paul Rubens||1577|1640|Barocco|1
Anthony van Dyck||1599|1641|Barocco|3
Frans Hals|||1666||3
William Turner|Regno Unito|1775|1851|Romanticismo|2
John Constable|Regno Unito|1776|1837|Romanticismo|3
Thomas Gainsborough|Regno Unito|1727|1788||3
William Hogarth|Regno Unito|1697|1764||3
William Blake|Regno Unito|1757|1827||3
John Everett Millais|Regno Unito|1829|1896|Preraffaellismo|3
Dante Gabriel Rossetti|Regno Unito|1828|1882|Preraffaellismo|3
Edward Burne-Jones|Regno Unito|1833|1898|Preraffaellismo|3
William Holman Hunt|Regno Unito|1827|1910|Preraffaellismo|3
David Hockney|Regno Unito|1937|||2
Henry Moore|Regno Unito|1898|1986||2
Christopher Wren|Regno Unito|1632|1723||3
Norman Foster|Regno Unito|1935|||3
Bridget Riley|Regno Unito|1931||Op Art|3
James Abbott McNeill Whistler|Stati Uniti|1834|1903||3
Edward Hopper|Stati Uniti|1882|1967||1
Grant Wood|Stati Uniti|1891|1942||3
Georgia O'Keeffe|Stati Uniti|1887|1986||2
Jackson Pollock|Stati Uniti|1912|1956|Espressionismo astratto|1
Mark Rothko||1903|1970|Espressionismo astratto|2
Willem de Kooning||1904|1997|Espressionismo astratto|3
Franz Kline|Stati Uniti|1910|1962|Espressionismo astratto|3
Andy Warhol|Stati Uniti|1928|1987|Pop Art|1
Roy Lichtenstein|Stati Uniti|1923|1997|Pop Art|2
James Rosenquist|Stati Uniti|1933|2017|Pop Art|3
Jasper Johns|Stati Uniti|1930|||3
Robert Rauschenberg|Stati Uniti|1925|2008||3
Jean-Michel Basquiat|Stati Uniti|1960|1988||2
Keith Haring|Stati Uniti|1958|1990||2
Norman Rockwell|Stati Uniti|1894|1978||2
Alexander Calder|Stati Uniti|1898|1976||3
Jeff Koons|Stati Uniti|1955|||2
Man Ray|Stati Uniti|1890|1976||3
Frank Lloyd Wright|Stati Uniti|1867|1959||1
Donald Judd|Stati Uniti|1928|1994|Minimalismo|3
Dan Flavin|Stati Uniti|1933|1996|Minimalismo|3
Wassily Kandinsky|Russia|1866|1944||2
Kazimir Malevič||1879|1935|Suprematismo|2
Marc Chagall||1887|1985||2
Alphonse Mucha|Repubblica Ceca|1860|1939||2
Constantin Brâncuși|Romania|1876|1957||3
Paul Klee||1879|1940||2
Alberto Giacometti|Svizzera|1901|1966||2
Le Corbusier|Svizzera|1887|1965||2
Frida Kahlo|Messico|1907|1954||1
Diego Rivera|Messico|1886|1957||2
José Clemente Orozco|Messico|1883|1949||3
David Alfaro Siqueiros|Messico|1896|1974||3
Fernando Botero|Colombia|1932|2023||2
Oscar Niemeyer|Brasile|1907|2012||2
Katsushika Hokusai|Giappone|1760|1849|Ukiyo-e|1
Utagawa Hiroshige|Giappone|1797|1858|Ukiyo-e|2
Yayoi Kusama|Giappone|1929|||2
Takashi Murakami|Giappone|1962|||3
Tadao Ando|Giappone|1941|||3
Ai Weiwei|Cina|1957|||2
Ieoh Ming Pei|Cina|1917|2019||3
Olafur Eliasson|Danimarca|1967|||3
Bertel Thorvaldsen|Danimarca|1770|1844|Neoclassicismo|3
Jørn Utzon|Danimarca|1918|2008||3
Alvar Aalto|Finlandia|1898|1976||3
Edvard Munch|Norvegia|1863|1944|Espressionismo|1
Carl Larsson|Svezia|1853|1919||3
Zaha Hadid||1950|2016||2
Frank Gehry||1929|||2
`);
  const artisti = artistiRows.map(([name, paese, nascita, morte, movimento, d]) => {
    const it = { name, d: +d };
    if (paese) it.paese = paese;
    if (movimento) it.movimento = movimento;
    return it;
  });
  const annoArt = (key, filtro) => artistiRows.filter((r) => r[key === 'nascita' ? 2 : 3] && filtro(+r[key === 'nascita' ? 2 : 3]))
    .map((r) => ({ name: r[0], d: +r[5], [key]: +r[key === 'nascita' ? 2 : 3] }));
  const nascField = (span, tol, gap) => ({
    nascita: { ask: 'In che anno è nato (o nata) {name}?', span, tol, format: 'year', step: 1,
      duel: 'Chi è nato prima?', lowerWins: true, order: 'Metti in ordine di nascita, dal più anziano', gap },
  });
  const morteField = (span, tol, gap) => ({
    morte: { ask: 'In che anno è morto (o morta) {name}?', span, tol, format: 'year', step: 1,
      duel: 'Chi è morto prima?', lowerWins: true, order: 'Metti in ordine di morte, dal primo a morire', gap },
  });

  // ── Quiz: tecniche, termini, movimenti ──
  QQ(1, 'Come si chiama la tecnica che usa piccoli pezzi di vetro o pietra per comporre immagini?', 'Mosaico', 'Affresco', 'Collage', 'Bassorilievo');
  QQ(1, 'Come si chiama la tecnica di incollare su un supporto materiali diversi, come carta e stoffa?', 'Collage', 'Mosaico', 'Tempera', 'Cesello');
  QQ(1, 'Con quale olio vegetale si preparano tradizionalmente i colori a olio?', 'Olio di lino', 'Olio d\'oliva', 'Olio di palma', 'Olio di mais');
  QQ(2, 'Con quale legante si preparano i colori a tempera «all\'uovo»?', 'Tuorlo d\'uovo', 'Olio di lino', 'Cera d\'api', 'Gomma arabica');
  QQ(2, 'Che cos\'è un «cartone» nella pittura a fresco?', 'Il disegno preparatorio a grandezza naturale', 'Il supporto di carta su cui si dipinge', 'Il pennello più largo', 'La cornice dell\'affresco');
  QQ(2, 'Come si chiama la tecnica che consiste nel riportare un disegno su un muro bucherellando i contorni?', 'Spolvero', 'Sinopia', 'Sfumato', 'Craquelé');
  QQ(2, 'Come si chiama il disegno preparatorio tracciato in rosso sul muro prima dell\'affresco?', 'Sinopia', 'Spolvero', 'Intonachino', 'Giornata');
  QQ(2, 'Come si chiama la porzione di intonaco che l\'affrescatore dipinge in un giorno?', 'Giornata', 'Sinopia', 'Lunetta', 'Campitura');
  QQ(1, 'Come si chiama la sfumatura dei contorni che Leonardo usava per rendere morbidi i volti?', 'Sfumato', 'Chiaroscuro', 'Craquelé', 'Impasto');
  QQ(2, 'Come si chiama la tecnica che sfrutta il forte contrasto tra luce e ombra?', 'Chiaroscuro', 'Sfumato', 'Collage', 'Puntinismo');
  QQ(2, 'Come si chiamano le sottili crepe che si formano sulla superficie di un dipinto antico?', 'Craquelé', 'Sfumato', 'Velatura', 'Impasto');
  QQ(3, 'Come si chiama la pittura spessa, stesa a grumi di colore, tipica di Van Gogh?', 'Impasto', 'Velatura', 'Sfumato', 'Spolvero');
  QQ(2, 'Come si chiama la tecnica di sovrapporre strati sottili e trasparenti di colore a olio?', 'Velatura', 'Impasto', 'Spolvero', 'Sinopia');
  QQ(2, 'Come si chiama la tecnica che consiste nell\'incidere una lastra metallica con l\'acido?', 'Acquaforte', 'Xilografia', 'Litografia', 'Affresco');
  QQ(2, 'Come si chiama l\'incisione su legno?', 'Xilografia', 'Litografia', 'Acquaforte', 'Serigrafia');
  QQ(2, 'Quale tecnica di stampa usano Andy Warhol e la Pop Art per riprodurre immagini a colori piatti?', 'Serigrafia', 'Xilografia', 'Acquaforte', 'Mosaico');
  QQ(2, 'Come si chiama una scultura a tutto tondo, visibile da ogni lato?', 'Statua', 'Bassorilievo', 'Medaglione', 'Stele');
  QQ(2, 'Come si chiama una scultura che sporge poco dal piano di fondo?', 'Bassorilievo', 'Tutto tondo', 'Monolite', 'Fusione');
  QQ(3, 'Come si chiama la tecnica di fusione del bronzo con modello di cera che si perde?', 'Cera persa', 'Fusione a stampo', 'Cesellatura', 'Sbalzo');
  QQ(1, 'Come si chiama una pittura che raffigura frutta, fiori o oggetti inanimati?', 'Natura morta', 'Paesaggio', 'Veduta', 'Ritratto');
  QQ(1, 'Che cosa raffigura un «paesaggio» nella pittura?', 'Un ambiente naturale o rurale', 'Una persona in primo piano', 'Una battaglia', 'Un oggetto d\'arredo');
  QQ(2, 'Come si chiama un dipinto composto da tre pannelli uniti da cerniere?', 'Trittico', 'Dittico', 'Polittico', 'Pala');
  QQ(2, 'Come si chiama un dipinto composto da due pannelli?', 'Dittico', 'Trittico', 'Polittico', 'Lunetta');
  QQ(3, 'Come si chiama il grande dipinto che sta sopra un altare?', 'Pala d\'altare', 'Predella', 'Paliotto', 'Sinopia');
  QQ(3, 'Come si chiama la fascia dipinta alla base di una pala d\'altare?', 'Predella', 'Lunetta', 'Cornice', 'Cimasa');
  QQ(1, 'Quale supporto usavano i pittori del Rinascimento prima della tela?', 'La tavola di legno', 'Il vetro', 'La carta di riso', 'La lamiera');
  QQ(2, 'Quale tecnica pittorica si pratica con colori diluiti in acqua su carta?', 'Acquerello', 'Olio', 'Encausto', 'Tempera grassa');
  QQ(3, 'Come si chiama la tecnica antica che usa colori mescolati a cera calda?', 'Encausto', 'Tempera', 'Affresco', 'Pastello');
  QQ(2, 'In quale secolo si diffuse in Europa la pittura a olio, grazie ai pittori fiamminghi?', 'XV secolo', 'XI secolo', 'XVIII secolo', 'XX secolo');
  QQ(2, 'Come si chiama lo strumento d\'acciaio appuntito usato per incidere le lastre di rame?', 'Bulino', 'Pennello', 'Spatola', 'Sanguigna');
  QQ(2, 'Di che colore è la «sanguigna», matita usata dagli artisti del Rinascimento?', 'Rosso bruno', 'Blu', 'Verde', 'Nero');
  QQ(1, 'Quale colore si ottiene mescolando bianco e nero?', 'Grigio', 'Marrone', 'Verde', 'Beige');
  QQ(1, 'Quali sono i colori primari della sintesi additiva della luce?', 'Rosso, verde, blu', 'Rosso, giallo, blu', 'Ciano, magenta, giallo', 'Bianco, nero, grigio');
  QQ(2, 'Come si chiamano due colori opposti sul cerchio cromatico, come rosso e verde?', 'Complementari', 'Analoghi', 'Primari', 'Neutri');
  QQ(1, 'Quale movimento prende il nome da un quadro di Monet intitolato «Impressione, levar del sole»?', 'Impressionismo', 'Espressionismo', 'Fauvismo', 'Realismo');
  QQ(2, 'Che cosa significa «fauve» (da cui il Fauvismo)?', 'Belva', 'Colore', 'Sogno', 'Macchia');
  QQ(2, 'Quale pittore guidò il gruppo dei Fauves nei primi del Novecento?', 'Henri Matisse', 'Paul Cézanne', 'Claude Monet', 'Umberto Boccioni');
  QQ(1, 'Quale movimento nasce a Parigi intorno al 1907 con Picasso e Braque?', 'Cubismo', 'Futurismo', 'Dadaismo', 'Pop Art');
  QQ(2, 'Chi scrisse il «Manifesto del Futurismo», pubblicato nel 1909?', 'Filippo Tommaso Marinetti', 'Umberto Boccioni', 'Gabriele D\'Annunzio', 'Giacomo Balla');
  QQ(2, 'Su quale quotidiano francese fu pubblicato il Manifesto del Futurismo?', 'Le Figaro', 'Le Monde', 'Libération', 'Le Parisien');
  QQ(2, 'Quale movimento artistico fu fondato a Zurigo nel 1916 al Cabaret Voltaire?', 'Dadaismo', 'Surrealismo', 'Cubismo', 'Futurismo');
  QQ(2, 'Chi scrisse il primo «Manifesto del Surrealismo», nel 1924?', 'André Breton', 'Tristan Tzara', 'Salvador Dalí', 'Filippo Tommaso Marinetti');
  QQ(1, 'Quale movimento artistico si ispira ai sogni e all\'inconscio?', 'Surrealismo', 'Impressionismo', 'Realismo', 'Neoclassicismo');
  QQ(2, 'Quale artista espose nel 1917 un orinatoio capovolto intitolato «Fontana»?', 'Marcel Duchamp', 'Man Ray', 'Max Ernst', 'Joan Miró');
  QQ(2, 'Come si chiamano gli oggetti comuni scelti da Duchamp ed esposti come opere d\'arte?', 'Ready-made', 'Collage', 'Assemblage', 'Installazioni');
  QQ(1, 'In quale paese nasce la Pop Art negli anni Cinquanta e Sessanta?', 'Regno Unito e Stati Uniti', 'Italia', 'Giappone', 'Russia');
  QQ(2, 'Quale artista è famoso per i fumetti ingranditi con i puntini tipografici?', 'Roy Lichtenstein', 'Jackson Pollock', 'Mark Rothko', 'Jasper Johns');
  QQ(1, 'Quale tecnica usava Jackson Pollock sul pavimento, facendo colare i colori sulla tela?', 'Dripping', 'Collage', 'Sfumato', 'Frottage');
  QQ(2, 'Come si intitola la serie di tele tagliate di Lucio Fontana?', 'Concetto spaziale', 'Arte povera', 'Dripping', 'Pittura metafisica');
  QQ(2, 'Quale movimento italiano degli anni Sessanta usa materiali umili, come stracci e pietre?', 'Arte povera', 'Pop Art', 'Transavanguardia', 'Futurismo');
  QQ(3, 'Quale critico d\'arte coniò il termine «Arte povera»?', 'Germano Celant', 'Achille Bonito Oliva', 'Giulio Carlo Argan', 'Vittorio Sgarbi');
  QQ(3, 'Quale critico lanciò la Transavanguardia italiana nel 1979?', 'Achille Bonito Oliva', 'Germano Celant', 'Philippe Daverio', 'Federico Zeri');
  QQ(2, 'Quale artista è famoso per le sue installazioni di zucche e specchi con puntini colorati?', 'Yayoi Kusama', 'Takashi Murakami', 'Ai Weiwei', 'Hokusai');
  QQ(1, 'Quale movimento si ispira all\'arte classica greca e romana nel Settecento?', 'Neoclassicismo', 'Barocco', 'Romanticismo', 'Realismo');
  QQ(2, 'Quale scoperta archeologica del 1748 diede impulso al Neoclassicismo?', 'Gli scavi di Pompei', 'La tomba di Tutankhamon', 'La Stele di Rosetta', 'Il Colosso di Rodi');
  QQ(2, 'Quale studioso tedesco è considerato il padre della storia dell\'arte e teorico del Neoclassicismo?', 'Johann Joachim Winckelmann', 'Giorgio Vasari', 'Ernst Gombrich', 'Erwin Panofsky');
  QQ(2, 'Chi scrisse «Le vite de\' più eccellenti pittori, scultori e architetti», nel 1550?', 'Giorgio Vasari', 'Giovanni Bellori', 'Cennino Cennini', 'Leon Battista Alberti');
  QQ(3, 'Chi scrisse il «Libro dell\'arte», manuale sulle tecniche pittoriche, intorno al 1400?', 'Cennino Cennini', 'Giorgio Vasari', 'Piero della Francesca', 'Lorenzo Ghiberti');
  QQ(2, 'Quale architetto fiorentino ideò la prospettiva lineare nel Quattrocento?', 'Filippo Brunelleschi', 'Giotto', 'Giorgio Vasari', 'Raffaello');
  QQ(2, 'Chi scrisse il trattato «De pictura» (1435), con le regole della prospettiva?', 'Leon Battista Alberti', 'Piero della Francesca', 'Leonardo da Vinci', 'Donatello');
  QQ(3, 'Quale pittore del Quattrocento scrisse «De prospectiva pingendi»?', 'Piero della Francesca', 'Paolo Uccello', 'Masaccio', 'Sandro Botticelli');
  QQ(2, 'Come si chiama il periodo artistico successivo al Rinascimento, caratterizzato da forme artificiose?', 'Manierismo', 'Barocco', 'Rococò', 'Gotico');
  QQ(2, 'Come si chiama lo stile decorativo leggero e ricco di ornamenti del Settecento francese?', 'Rococò', 'Barocco', 'Gotico', 'Liberty');
  QQ(2, 'Come si chiama in Italia lo stile Art Nouveau?', 'Liberty', 'Barocco', 'Déco', 'Gotico');
  QQ(3, 'Da quale negozio londinese prende il nome lo stile Liberty?', 'Liberty & Co.', 'Harrods', 'Selfridges', 'Fortnum & Mason');
  QQ(2, 'Quale scuola d\'arte e architettura fu fondata a Weimar nel 1919 da Walter Gropius?', 'Bauhaus', 'De Stijl', 'Secessione', 'Brücke');
  QQ(2, 'Quale gruppo di artisti tedeschi fondato a Dresda nel 1905 significa «il ponte»?', 'Die Brücke', 'Der Blaue Reiter', 'Bauhaus', 'Dada');
  QQ(2, 'Quale gruppo artistico di Monaco di Baviera, con Kandinsky e Marc, significa «il cavaliere azzurro»?', 'Der Blaue Reiter', 'Die Brücke', 'Bauhaus', 'De Stijl');
  QQ(2, 'Come si chiama il movimento olandese del 1917 di Mondrian e van Doesburg?', 'De Stijl', 'Bauhaus', 'Die Brücke', 'Cobra');
  QQ(2, 'Quali colori primari usa Mondrian, oltre al bianco e al nero, nelle sue composizioni?', 'Rosso, giallo e blu', 'Rosso, verde e blu', 'Giallo, verde e viola', 'Arancione, verde e viola');
  QQ(2, 'Quale scultore italiano del Novecento è famoso per le sue figure di cavallo e cavaliere?', 'Marino Marini', 'Arnaldo Pomodoro', 'Giacomo Manzù', 'Medardo Rosso');
  QQ(3, 'Quale artista italiano è noto per le sfere di bronzo dorato squarciate, come «Sfera con sfera»?', 'Arnaldo Pomodoro', 'Marino Marini', 'Giò Pomodoro', 'Fausto Melotti');

  // ── Quiz: artisti, aneddoti, epoche, scultura ──
  QQ(1, 'A quale secolo corrisponde il Quattrocento?', 'XV secolo', 'XIV secolo', 'XVI secolo', 'XIII secolo');
  QQ(1, 'A quale secolo corrisponde il Cinquecento?', 'XVI secolo', 'XV secolo', 'XVII secolo', 'XVIII secolo');
  QQ(1, 'A quale secolo corrisponde il Seicento?', 'XVII secolo', 'XVI secolo', 'XVIII secolo', 'XV secolo');
  QQ(1, 'A quale secolo corrisponde l\'Ottocento?', 'XIX secolo', 'XVIII secolo', 'XX secolo', 'XVII secolo');
  QQ(2, 'A quale secolo corrisponde il Trecento, il secolo di Giotto?', 'XIV secolo', 'XIII secolo', 'XV secolo', 'XII secolo');
  QQ(1, 'Che cosa significa la parola «Rinascimento»?', 'Rinascita della cultura classica', 'Nascita di nuovi regni', 'Ritorno del Medioevo', 'Fine dell\'arte antica');
  QQ(1, 'Quale famiglia fiorentina fu la più celebre mecenate del Rinascimento?', 'I Medici', 'Gli Sforza', 'I Gonzaga', 'I Borgia');
  QQ(2, 'Quale signore di Firenze fu detto «il Magnifico» e protesse Botticelli e Michelangelo?', 'Lorenzo de\' Medici', 'Cosimo de\' Medici', 'Ludovico Sforza', 'Federico da Montefeltro');
  QQ(2, 'Quale duca di Milano chiese a Leonardo di dipingere l\'Ultima Cena?', 'Ludovico il Moro', 'Lorenzo il Magnifico', 'Francesco Sforza', 'Gian Galeazzo Visconti');
  QQ(2, 'Quale papa commissionò a Michelangelo l\'affresco della volta della Cappella Sistina?', 'Giulio II', 'Sisto IV', 'Paolo III', 'Leone X');
  QQ(3, 'Da quale papa prende il nome la Cappella Sistina?', 'Sisto IV', 'Sisto V', 'Giulio II', 'Paolo III');
  QQ(2, 'Quale scena occupa la parete di fondo della Cappella Sistina, dipinta da Michelangelo tra il 1536 e il 1541?', 'Il Giudizio Universale', 'La creazione di Adamo', 'Il Diluvio', 'La Trasfigurazione');
  QQ(1, 'In che città morì Leonardo da Vinci, nel 1519?', 'Amboise, in Francia', 'Firenze', 'Milano', 'Roma');
  QQ(2, 'Quale re di Francia ospitò Leonardo negli ultimi anni di vita?', 'Francesco I', 'Luigi XIV', 'Enrico IV', 'Carlo VIII');
  QQ(2, 'In quale paese toscano è nato Leonardo da Vinci?', 'Vinci', 'Caprese', 'Urbino', 'Anghiari');
  QQ(2, 'Come scriveva Leonardo nei suoi taccuini?', 'Al contrario, da destra a sinistra', 'In greco antico', 'Solo in latino', 'Con simboli inventati');
  QQ(2, 'Presso la bottega di quale artista fiorentino si formò Leonardo?', 'Andrea del Verrocchio', 'Domenico Ghirlandaio', 'Pietro Perugino', 'Donatello');
  QQ(2, 'Chi fu il principale maestro di Raffaello giovane?', 'Pietro Perugino', 'Andrea del Verrocchio', 'Michelangelo', 'Leonardo da Vinci');
  QQ(2, 'In quale città è nato Raffaello?', 'Urbino', 'Perugia', 'Firenze', 'Roma');
  QQ(2, 'A quanti anni morì Raffaello, nel 1520?', '37', '27', '47', '57');
  QQ(2, 'In quale piccolo paese toscano è nato Michelangelo?', 'Caprese', 'Vinci', 'Settignano', 'Anghiari');
  QQ(2, 'Qual è il vero cognome del pittore detto Caravaggio?', 'Merisi', 'Caravaggi', 'Buonarroti', 'Vecellio');
  QQ(2, 'Qual è il vero nome di Sandro Botticelli?', 'Alessandro Filipepi', 'Alessandro Botti', 'Sandro Pitti', 'Alessandro Vecellio');
  QQ(3, 'Qual è il vero nome di Tintoretto?', 'Jacopo Robusti', 'Tommaso Cassai', 'Giovanni Canal', 'Paolo Caliari');
  QQ(3, 'Qual è il vero nome di Canaletto?', 'Giovanni Antonio Canal', 'Bernardo Bellotto', 'Giovanni Battista Piranesi', 'Antonio Guardi');
  QQ(3, 'Qual è il vero nome del Veronese?', 'Paolo Caliari', 'Jacopo Robusti', 'Paolo Farinati', 'Paolo Uccello');
  QQ(3, 'Quale pittore umbro aveva come vero nome Pietro Vannucci?', 'Perugino', 'Pinturicchio', 'Giorgione', 'Correggio');
  QQ(2, 'Chi fu, secondo la tradizione, il maestro di Giotto?', 'Cimabue', 'Duccio di Buoninsegna', 'Simone Martini', 'Masaccio');
  QQ(3, 'Chi commissionò a Giotto gli affreschi della cappella di Padova?', 'Enrico Scrovegni', 'Cangrande della Scala', 'Gian Galeazzo Visconti', 'Papa Bonifacio VIII');
  QQ(2, 'Quale scultore vinse nel 1401 il concorso per una porta del Battistero di Firenze?', 'Lorenzo Ghiberti', 'Filippo Brunelleschi', 'Donatello', 'Jacopo della Quercia');
  QQ(2, 'Con quale nome è nota la porta orientale del Battistero di Firenze, opera di Ghiberti?', 'Porta del Paradiso', 'Porta d\'Oro', 'Porta del Cielo', 'Porta della Gloria');
  QQ(3, 'Quale artista realizzò la «Saliera» d\'oro per il re di Francia, rubata da un museo di Vienna nel 2003?', 'Benvenuto Cellini', 'Giambologna', 'Lorenzo Ghiberti', 'Donatello');
  QQ(2, 'Quale scultore realizzò il Baldacchino in bronzo della basilica di San Pietro?', 'Gian Lorenzo Bernini', 'Michelangelo', 'Antonio Canova', 'Donatello');
  QQ(2, 'Quale grande rivale di Bernini progettò Sant\'Ivo alla Sapienza e San Carlo alle Quattro Fontane?', 'Francesco Borromini', 'Carlo Maderno', 'Pietro da Cortona', 'Luigi Vanvitelli');
  QQ(2, 'Il celebre premio cinematografico italiano «David di Donatello» prende il nome da una scultura di...', 'Donatello', 'Michelangelo', 'Verrocchio', 'Bernini');
  QQ(2, 'Quale pittore uccise un uomo a Roma nel 1606 e fu costretto a fuggire?', 'Caravaggio', 'Guido Reni', 'Annibale Carracci', 'Guercino');
  QQ(3, 'In quale chiesa romana si trovano la «Conversione di san Paolo» e la «Crocifissione di san Pietro» di Caravaggio?', 'Santa Maria del Popolo', 'San Luigi dei Francesi', 'Sant\'Agostino', 'San Pietro in Vincoli');
  QQ(3, 'Quale pittrice del Seicento, figlia del pittore Orazio, dipinse «Giuditta che decapita Oloferne»?', 'Artemisia Gentileschi', 'Sofonisba Anguissola', 'Lavinia Fontana', 'Elisabetta Sirani');
  QQ(3, 'Quale pittrice cremonese del Cinquecento fu pittrice di corte del re di Spagna Filippo II?', 'Sofonisba Anguissola', 'Artemisia Gentileschi', 'Lavinia Fontana', 'Rosalba Carriera');
  QQ(2, 'Qual è il vero titolo della «Ronda di notte» di Rembrandt?', 'La compagnia del capitano Frans Banninck Cocq', 'La guardia civica di Amsterdam', 'La parata della notte', 'Il giuramento della milizia');
  QQ(2, 'A quale città olandese è legato Vermeer, che vi nacque e vi morì?', 'Delft', 'Leida', 'Haarlem', 'Rotterdam');
  QQ(2, 'Quale grande pittore olandese era nato a Leida nel 1606?', 'Rembrandt', 'Vermeer', 'Frans Hals', 'Van Gogh');
  QQ(2, 'Quali due versioni dipinse Goya della stessa donna, una vestita e una nuda?', 'La maja vestida e la maja desnuda', 'La Venere nera e la Venere bianca', 'La Duchessa rossa e la Duchessa blu', 'La Gitana e la Dama');
  QQ(2, 'Quale pittore ritrasse la famiglia reale spagnola con sé stesso nel quadro «Las Meninas»?', 'Diego Velázquez', 'Francisco Goya', 'El Greco', 'Murillo');
  QQ(3, 'Quale pittore decorò la sua casa, la «Quinta del Sordo», con le «Pitture nere»?', 'Francisco Goya', 'Diego Velázquez', 'Salvador Dalí', 'Pablo Picasso');
  QQ(2, 'Quale ciclo di dipinti di Monet è esposto al Musée de l\'Orangerie di Parigi?', 'Le ninfee', 'I covoni', 'La cattedrale di Rouen', 'I papaveri');
  QQ(2, 'In quale località normanna Monet creò il suo giardino con le ninfee?', 'Giverny', 'Auvers-sur-Oise', 'Étretat', 'Honfleur');
  QQ(2, 'Quale pittore morì nel 1890 a Auvers-sur-Oise?', 'Vincent van Gogh', 'Paul Cézanne', 'Camille Pissarro', 'Georges Seurat');
  QQ(2, 'Come si chiamava il fratello di Vincent van Gogh, che lo sostenne economicamente?', 'Theo', 'Paul', 'Jan', 'Pieter');
  QQ(2, 'In quale città francese Van Gogh visse con Gauguin nel 1888?', 'Arles', 'Parigi', 'Marsiglia', 'Avignone');
  QQ(3, 'Che colore aveva la casa di Arles in cui Van Gogh sognava di fondare una comunità di artisti?', 'Gialla', 'Rossa', 'Bianca', 'Azzurra');
  QQ(2, 'In quale isola della Polinesia Gauguin visse e dipinse nei suoi ultimi anni?', 'Tahiti', 'Bali', 'Samoa', 'Hawaii');
  QQ(2, 'Quale montagna della Provenza Cézanne dipinse decine di volte?', 'Montagna Sainte-Victoire', 'Mont Blanc', 'Monte Ventoso', 'Montagna Nera');
  QQ(3, 'Quale malattia costrinse Renoir, negli ultimi anni, a dipingere con il pennello legato alle mani?', 'L\'artrite reumatoide', 'La cataratta', 'L\'emicrania', 'La gotta');
  QQ(2, 'Quali soggetti sono la specialità di Edgar Degas?', 'Ballerine e cavalli da corsa', 'Paesaggi marini', 'Nature morte di frutta', 'Battaglie');
  QQ(2, 'Quale locale di Parigi è reso celebre dai manifesti di Toulouse-Lautrec?', 'Moulin Rouge', 'Folies Bergère', 'Lido', 'Crazy Horse');
  QQ(1, 'Quale tecnica ha reso celebre Georges Seurat, con tanti puntini di colore puro accostati?', 'Puntinismo', 'Collage', 'Dripping', 'Sfumato');
  QQ(2, 'Quale fotografo ospitò nel 1874 la prima mostra degli Impressionisti a Parigi?', 'Nadar', 'Daguerre', 'Man Ray', 'Atget');
  QQ(3, 'Come si chiamava la mostra parigina del 1863 dove furono esposte le opere rifiutate dalla giuria ufficiale?', 'Salon des Refusés', 'Salon d\'Automne', 'Esposizione Universale', 'Salon des Indépendants');
  QQ(2, 'Quale artista austriaco usò la foglia d\'oro nel «Bacio» e nel ritratto di Adele Bloch-Bauer?', 'Gustav Klimt', 'Egon Schiele', 'Oskar Kokoschka', 'Alfons Mucha');
  QQ(1, 'Quale colore domina nel «periodo blu» di Pablo Picasso?', 'Blu', 'Rosa', 'Rosso', 'Verde');
  QQ(2, 'Come si chiamano le sagome di carta colorata ritagliata che Matisse realizzò nell\'ultima parte della vita?', 'Papiers découpés', 'Collage dadaisti', 'Fotomontaggi', 'Silhouette');
  QQ(2, 'Come si chiamava lo studio newyorchese di Andy Warhol?', 'The Factory', 'The Studio 54', 'The Workshop', 'The Garage');
  QQ(2, 'Per quale celebre gruppo rock Andy Warhol disegnò la copertina con una banana?', 'The Velvet Underground', 'The Rolling Stones', 'The Beatles', 'Pink Floyd');
  QQ(2, 'Quale artista di strada anonimo è famoso per «Girl with Balloon»?', 'Banksy', 'Keith Haring', 'Shepard Fairey', 'Basquiat');
  QQ(3, 'Quale opera di Banksy si autodistrusse parzialmente dopo l\'asta da Sotheby\'s del 2018?', 'Girl with Balloon', 'Flower Thrower', 'Devolved Parliament', 'Kissing Coppers');
  QQ(2, 'Come si chiama la casa-museo di Frida Kahlo a Città del Messico?', 'Casa Azul', 'Casa Rosa', 'Casa Gialla', 'Casa Blanca');
  QQ(2, 'Come si chiama la serie di xilografie di Hokusai che contiene «La grande onda»?', 'Trentasei vedute del monte Fuji', 'Cento vedute famose di Edo', 'Le cinquantatré stazioni del Tōkaidō', 'Sei vedute del lago');
  QQ(2, 'Quale artista è celebre per i suoi disegni con scale impossibili, come «Salita e discesa»?', 'M. C. Escher', 'René Magritte', 'Piet Mondrian', 'Victor Vasarely');
  QQ(2, 'Quale scultore svizzero è famoso per le figure sottilissime e allungate?', 'Alberto Giacometti', 'Jean Tinguely', 'Max Bill', 'Constantin Brâncuși');
  QQ(2, 'Come si chiamano le sculture sospese e in movimento ideate da Alexander Calder?', 'Mobiles', 'Stabiles', 'Assemblage', 'Totem');
  QQ(2, 'Quale pittore e scultore colombiano è noto per le figure dai volumi esagerati?', 'Fernando Botero', 'Diego Rivera', 'Oswaldo Guayasamín', 'Wifredo Lam');
  QQ(2, 'Quale lago italiano ospitò nel 2016 le passerelle galleggianti «The Floating Piers» di Christo?', 'Lago d\'Iseo', 'Lago di Como', 'Lago di Garda', 'Lago Maggiore');
  QQ(2, 'Quale edificio tedesco Christo e Jeanne-Claude impacchettarono nel 1995?', 'Il Reichstag', 'La Porta di Brandeburgo', 'Il Duomo di Colonia', 'Il castello di Neuschwanstein');
  QQ(3, 'In quale paese siciliano si trova il Grande Cretto di Alberto Burri?', 'Gibellina', 'Corleone', 'Noto', 'Erice');
  QQ(3, 'Quale opera di land art di Robert Smithson è una spirale di rocce nel Grande Lago Salato?', 'Spiral Jetty', 'Lightning Field', 'Double Negative', 'Running Fence');
  QQ(2, 'Per quale cifra, circa, fu venduto nel 2021 da Christie\'s l\'NFT di Beeple?', '69 milioni di dollari', '6,9 milioni di dollari', '690 milioni di dollari', '690.000 dollari');
  QQ(2, 'Quale dipinto attribuito a Leonardo fu venduto nel 2017 per circa 450 milioni di dollari?', 'Salvator Mundi', 'La Belle Ferronnière', 'La Scapigliata', 'La Madonna Benois');
  QQ(1, 'Chi rubò la Gioconda dal Louvre nel 1911?', 'Vincenzo Peruggia', 'Arsenio Lupin', 'Gino Lisa', 'Alfredo Tosi');
  QQ(2, 'In quale città fu ritrovata la Gioconda nel 1913?', 'Firenze', 'Milano', 'Roma', 'Parigi');
  QQ(2, 'Chi è la donna ritratta, secondo la tradizione, nella Gioconda?', 'Lisa Gherardini', 'Isabella d\'Este', 'Cecilia Gallerani', 'Ginevra Benci');
  QQ(3, 'Perché l\'Ultima Cena di Leonardo si è deteriorata già pochi decenni dopo?', 'Fu dipinta a secco sul muro, non ad affresco', 'Fu dipinta con colori troppo chiari', 'Fu bombardata subito', 'Fu dipinta su tela');
  QQ(3, 'In che anno si concluse il lungo restauro dell\'Ultima Cena di Leonardo?', '1999', '1979', '1989', '2009');
  QQ(1, 'Quale scultura di Michelangelo è l\'unica da lui firmata?', 'La Pietà Vaticana', 'Il David', 'Il Mosè', 'Il Bacco');
  QQ(2, 'Dove firmò Michelangelo la Pietà Vaticana?', 'Sulla fascia che attraversa il petto della Madonna', 'Sul basamento', 'Sul retro del manto', 'Sul volto di Cristo');
  QQ(2, 'In che anno la Pietà di Michelangelo fu colpita a martellate da un uomo?', '1972', '1952', '1982', '1992');
  QQ(2, 'Dove fu collocato il David di Michelangelo nel 1504?', 'In piazza della Signoria, a Firenze', 'Nel Duomo di Firenze', 'In piazza San Pietro', 'A Palazzo Pitti');
  QQ(3, 'In quale anno il David di Michelangelo fu trasferito nella Galleria dell\'Accademia?', '1873', '1773', '1923', '1973');
  QQ(2, 'Quale scultura è stata ritrovata nel 1820 sull\'isola greca di Milo?', 'La Venere di Milo', 'La Nike di Samotracia', 'Il Discobolo', 'Il Laocoonte');
  QQ(2, 'Dove si trovano i Bronzi di Riace?', 'Reggio Calabria', 'Taranto', 'Napoli', 'Siracusa');
  QQ(2, 'Al largo di quale località calabrese furono scoperti nel 1972 i Bronzi di Riace?', 'Riace', 'Crotone', 'Tropea', 'Scilla');
  QQ(2, 'Chi scolpì l\'originale in bronzo del Discobolo?', 'Mirone', 'Fidia', 'Policleto', 'Prassitele');
  QQ(3, 'Quale scultore greco realizzò il «Doriforo», modello del canone delle proporzioni?', 'Policleto', 'Mirone', 'Lisippo', 'Fidia');
  QQ(2, 'Quale scultore greco sovrintese ai lavori scultorei del Partenone?', 'Fidia', 'Mirone', 'Prassitele', 'Lisippo');
  QQ(2, 'Dove si trovano i marmi del Partenone portati in Inghilterra da Lord Elgin?', 'British Museum', 'National Gallery', 'Victoria and Albert Museum', 'Tate Britain');
  QQ(2, 'Dove si trova la Stele di Rosetta?', 'British Museum di Londra', 'Louvre di Parigi', 'Museo Egizio del Cairo', 'Neues Museum di Berlino');
  QQ(2, 'Dove si trova il celebre busto di Nefertiti?', 'Neues Museum di Berlino', 'Museo Egizio di Torino', 'Louvre', 'British Museum');
  QQ(2, 'In quale paese si trovano le grotte di Altamira, con bisonti dipinti?', 'Spagna', 'Francia', 'Italia', 'Portogallo');
  QQ(2, 'In quale paese si trovano le grotte di Lascaux con pitture preistoriche?', 'Francia', 'Spagna', 'Germania', 'Grecia');
  QQ(2, 'In quale città italiana si trovano i mosaici bizantini di San Vitale con l\'imperatore Giustiniano?', 'Ravenna', 'Venezia', 'Palermo', 'Monreale');
  QQ(2, 'Che cosa racconta il ricamo noto come Arazzo di Bayeux?', 'La conquista normanna dell\'Inghilterra', 'La vita di Carlo Magno', 'La Prima crociata', 'La Guerra dei cent\'anni');

  // ── Quiz: architettura e musei ──
  QQ(1, 'Quali sono i tre ordini architettonici dell\'antica Grecia?', 'Dorico, ionico, corinzio', 'Tuscanico, composito, gotico', 'Romanico, gotico, barocco', 'Dorico, tuscanico, romano');
  QQ(2, 'Quale ordine architettonico ha il capitello decorato con foglie d\'acanto?', 'Corinzio', 'Dorico', 'Ionico', 'Tuscanico');
  QQ(2, 'Quale ordine architettonico ha il capitello con due volute laterali?', 'Ionico', 'Dorico', 'Corinzio', 'Composito');
  QQ(2, 'Di quale ordine è il Partenone di Atene?', 'Dorico', 'Ionico', 'Corinzio', 'Composito');
  QQ(2, 'Come si chiama la stanza interna del tempio greco in cui si trovava la statua del dio?', 'Cella', 'Pronao', 'Abside', 'Cripta');
  QQ(1, 'Che forma ha l\'arco tipico dell\'architettura gotica?', 'A sesto acuto', 'A tutto sesto', 'Ribassato', 'Piatto');
  QQ(2, 'Che forma ha l\'arco tipico dell\'architettura romanica?', 'A tutto sesto (semicircolare)', 'A sesto acuto', 'A ferro di cavallo', 'A trilobo');
  QQ(2, 'Come si chiama l\'arco esterno che sostiene la spinta delle volte nelle cattedrali gotiche?', 'Arco rampante', 'Arco di trionfo', 'Arco ogivale', 'Arco ribassato');
  QQ(2, 'Come si chiama la grande finestra circolare decorata sulla facciata di molte chiese gotiche?', 'Rosone', 'Bifora', 'Lunetta', 'Oculo');
  QQ(2, 'Come si chiama la parte della chiesa che si trova dietro all\'altare, di forma semicircolare?', 'Abside', 'Navata', 'Transetto', 'Nartece');
  QQ(2, 'Come si chiama il braccio trasversale che incrocia la navata in una chiesa a croce latina?', 'Transetto', 'Abside', 'Nartece', 'Deambulatorio');
  QQ(2, 'Come si chiama la struttura di copertura formata da due volte a botte che si incrociano?', 'Volta a crociera', 'Volta a botte', 'Cupola', 'Catino');
  QQ(2, 'Come si chiama il foro circolare alla sommità della cupola del Pantheon di Roma?', 'Oculo', 'Lanterna', 'Rosone', 'Tamburo');
  QQ(2, 'Quale imperatore romano fece ricostruire il Pantheon nella forma attuale?', 'Adriano', 'Augusto', 'Traiano', 'Nerone');
  QQ(2, 'Che cosa ha di particolare la cupola del Duomo di Firenze rispetto a quelle del tempo?', 'Fu costruita senza armatura di legno', 'Fu costruita interamente in legno', 'Fu costruita in un solo anno', 'Fu costruita in ferro');
  QQ(2, 'Chi progettò il campanile del Duomo di Firenze (iniziato nel 1334)?', 'Giotto', 'Brunelleschi', 'Arnolfo di Cambio', 'Donatello');
  QQ(3, 'Quale architetto progettò il Palazzo Vecchio di Firenze e iniziò il Duomo?', 'Arnolfo di Cambio', 'Giorgio Vasari', 'Michelozzo', 'Filippo Brunelleschi');
  QQ(2, 'Quale artista aretino progettò gli Uffizi, su incarico di Cosimo I de\' Medici?', 'Giorgio Vasari', 'Michelangelo', 'Bartolomeo Ammannati', 'Filippo Brunelleschi');
  QQ(2, 'Come si chiama il corridoio sopraelevato che collega Palazzo Vecchio a Palazzo Pitti attraverso gli Uffizi?', 'Corridoio Vasariano', 'Corridoio Mediceo', 'Passaggio del Duca', 'Loggia dei Lanzi');
  QQ(2, 'Quale ponte di Firenze ospita botteghe di orafi?', 'Ponte Vecchio', 'Ponte alla Carraia', 'Ponte Santa Trinita', 'Ponte alle Grazie');
  QQ(2, 'Quale architetto è considerato il più importante del Rinascimento veneto, autore di ville nel Veneto?', 'Andrea Palladio', 'Baldassare Longhena', 'Jacopo Sansovino', 'Vincenzo Scamozzi');
  QQ(3, 'Quale teatro di Vicenza fu progettato da Palladio, ultima sua opera?', 'Teatro Olimpico', 'Teatro Farnese', 'Teatro La Fenice', 'Teatro Regio');
  QQ(3, 'In quale città si trova il Teatro Farnese, in legno, costruito nel 1618?', 'Parma', 'Piacenza', 'Mantova', 'Ferrara');
  QQ(2, 'Quale architetto ha progettato Palazzo Te a Mantova, con gli affreschi della Sala dei Giganti?', 'Giulio Romano', 'Andrea Palladio', 'Michelangelo', 'Leon Battista Alberti');
  QQ(2, 'Qual è il vero nome dell\'architetto noto come Le Corbusier?', 'Charles-Édouard Jeanneret', 'Auguste Perret', 'Jean Nouvel', 'Henri Sauvage');
  QQ(3, 'Come si chiama il sistema di proporzioni ideato da Le Corbusier basato sull\'altezza di un uomo?', 'Modulor', 'Modulo aureo', 'Canone', 'Proporzione');
  QQ(2, 'Quale tecnica decorativa di Gaudí usa frammenti di ceramica colorata?', 'Trencadís', 'Sgraffito', 'Intarsio', 'Azulejo');
  QQ(2, 'In che anno morì Antoni Gaudí, investito da un tram a Barcellona?', '1926', '1906', '1936', '1946');
  QQ(2, 'Quale architetto fu la prima donna a vincere il premio Pritzker, nel 2004?', 'Zaha Hadid', 'Kazuyo Sejima', 'Gae Aulenti', 'Odile Decq');
  QQ(2, 'Come viene spesso definito il premio Pritzker?', 'Il Nobel dell\'architettura', 'L\'Oscar dell\'architettura', 'Il Leone d\'oro dell\'architettura', 'Il Pulitzer dell\'architettura');
  QQ(2, 'Quale architetto italiano ha vinto il premio Pritzker nel 1998?', 'Renzo Piano', 'Massimiliano Fuksas', 'Mario Botta', 'Carlo Scarpa');
  QQ(3, 'Chi fu il primo architetto italiano a vincere il premio Pritzker, nel 1990?', 'Aldo Rossi', 'Renzo Piano', 'Gae Aulenti', 'Pier Luigi Nervi');
  QQ(2, 'Quale città ospita le torri gemelle del «Bosco Verticale»?', 'Milano', 'Torino', 'Roma', 'Bologna');
  QQ(2, 'Quale grande architetto brasiliano progettò gli edifici principali di Brasilia?', 'Oscar Niemeyer', 'Lúcio Costa', 'Paulo Mendes da Rocha', 'Roberto Burle Marx');
  QQ(2, 'Quale museo di Bilbao è rivestito di pannelli di titanio?', 'Guggenheim', 'Museo Reina Sofía', 'Museo del Prado', 'Museo Thyssen');
  QQ(2, 'Quale ex stazione ferroviaria di Parigi ospita oggi i capolavori dell\'Impressionismo?', 'Musée d\'Orsay', 'Louvre', 'Centre Pompidou', 'Petit Palais');
  QQ(2, 'Quale ex centrale elettrica di Londra ospita oggi un grande museo d\'arte moderna?', 'Tate Modern', 'National Gallery', 'Courtauld Gallery', 'Saatchi Gallery');
  QQ(2, 'Quale museo parigino mostra gli impianti tecnici del palazzo all\'esterno, con tubi colorati?', 'Centre Pompidou', 'Louvre', 'Musée d\'Orsay', 'Grand Palais');
  QQ(2, 'In quale palazzo di Venezia ha sede la Collezione Peggy Guggenheim?', 'Palazzo Venier dei Leoni', 'Ca\' d\'Oro', 'Palazzo Ducale', 'Ca\' Rezzonico');
  QQ(2, 'Ogni quanti anni si tiene la mostra Documenta a Kassel, in Germania?', 'Ogni cinque anni', 'Ogni anno', 'Ogni due anni', 'Ogni dieci anni');
  QQ(2, 'Ogni quanti anni si tiene, di norma, la Biennale d\'Arte di Venezia?', 'Ogni due anni', 'Ogni anno', 'Ogni cinque anni', 'Ogni quattro anni');
  QQ(2, 'Come si chiama il premio principale della Biennale d\'Arte di Venezia?', 'Leone d\'oro', 'Palma d\'oro', 'Orso d\'oro', 'Aquila d\'oro');
  QQ(2, 'Dove si trova la Cappella Sansevero con il «Cristo velato»?', 'Napoli', 'Roma', 'Palermo', 'Bari');
  QQ(2, 'In quale città si trova il Bargello, che ospita il David in bronzo di Donatello?', 'Firenze', 'Siena', 'Pisa', 'Bologna');
  QQ(2, 'In quale museo di Firenze si trovano gli «Schiavi» di Michelangelo e il David?', 'Galleria dell\'Accademia', 'Galleria degli Uffizi', 'Museo del Bargello', 'Palazzo Pitti');
  QQ(2, 'In quale città si trova il Museo di Capodimonte?', 'Napoli', 'Palermo', 'Roma', 'Bari');
  QQ(2, 'In quale città si trova la Galleria Nazionale d\'Arte Moderna di Valle Giulia?', 'Roma', 'Milano', 'Torino', 'Firenze');
  QQ(2, 'In quale città si trova il museo MART, dedicato all\'arte moderna e contemporanea?', 'Rovereto', 'Bolzano', 'Trieste', 'Verona');
  QQ(2, 'In quale città si trova il Palazzo Ducale con la Camera degli Sposi di Mantegna?', 'Mantova', 'Ferrara', 'Parma', 'Verona');
  QQ(1, 'Quale museo di Firenze ha la sede in un palazzo progettato da Giorgio Vasari?', 'Galleria degli Uffizi', 'Palazzo Pitti', 'Museo del Bargello', 'Galleria dell\'Accademia');
  QQ(2, 'Quale architetto americano ha progettato il museo che ospita l\'Ara Pacis a Roma?', 'Richard Meier', 'Frank Gehry', 'Peter Eisenman', 'I. M. Pei');
  QQ(2, 'Quale ingegnere ha progettato la struttura interna della Statua della Libertà?', 'Gustave Eiffel', 'Frédéric Auguste Bartholdi', 'Alexandre Dumas', 'Charles Garnier');
  QQ(2, 'Per quale evento fu costruita la Torre Eiffel nel 1889?', 'L\'Esposizione universale di Parigi', 'Le Olimpiadi', 'Il Giubileo', 'L\'incoronazione di un re');
  QQ(2, 'Di quale paese europeo la Statua della Libertà fu un dono agli Stati Uniti?', 'Francia', 'Regno Unito', 'Spagna', 'Italia');
  QQ(2, 'In quale città si trova la Sagrada Família?', 'Barcellona', 'Madrid', 'Valencia', 'Siviglia');
  QQ(1, 'Quale città ospita il teatro dell\'Opera con le caratteristiche «vele» bianche progettato da Utzon?', 'Sydney', 'Melbourne', 'Auckland', 'Singapore');
  QQ(2, 'Quale grande architetto americano progettò la Casa sulla cascata, in Pennsylvania?', 'Frank Lloyd Wright', 'Philip Johnson', 'Louis Sullivan', 'Richard Neutra');

  // ── Quiz: che cosa raffigurano le opere, storie e curiosità ──
  QQ(2, "Che cosa raffigura «La zattera della Medusa» di Géricault?", "I naufraghi di una nave francese affondata", "Una battaglia navale", "Un porto di pescatori", "Il mito di Medusa e Perseo");
  QQ(2, "Che cosa mostra «Il 3 maggio 1808» di Goya?", "La fucilazione di patrioti spagnoli da parte dei soldati francesi", "Una corrida a Madrid", "L'incoronazione di un re", "Una festa di paese");
  QQ(2, "Chi è la protagonista al centro di «Las Meninas» di Velázquez?", "L'infanta Margherita Teresa", "La regina Isabella di Castiglia", "La Vergine Maria", "La duchessa d'Alba");
  QQ(2, "Che cosa raffigura «La ronda di notte» di Rembrandt?", "Una compagnia di guardie civiche di Amsterdam", "Una processione religiosa", "Una battaglia navale", "Un banchetto di nozze");
  QQ(3, "Che cosa si riflette nello specchio convesso del «Ritratto dei coniugi Arnolfini» di van Eyck?", "La stanza vista da dietro, con due figure sulla porta", "Un paesaggio di campagna", "Il volto del committente", "Una croce e un altare");
  QQ(2, "Quale evento storico celebra «La Libertà che guida il popolo» di Delacroix?", "La rivoluzione di luglio del 1830", "La presa della Bastiglia del 1789", "La Comune di Parigi del 1871", "L'incoronazione di Napoleone");
  QQ(2, "Quale evento ricorda il «Guernica» di Picasso?", "Il bombardamento aereo di una città basca nel 1937", "La Prima guerra mondiale", "Lo sbarco in Normandia", "La caduta del Muro di Berlino");
  QQ(3, "Chi uccise Jean-Paul Marat, ritratto nella celebre tela di David?", "Charlotte Corday", "Maria Antonietta", "Madame Roland", "Olympe de Gouges");
  QQ(2, "Che cosa raffigura «Il Quarto Stato» di Pellizza da Volpedo?", "Una folla di lavoratori in marcia", "Una battaglia risorgimentale", "Una processione di nobili", "Un mercato di campagna");
  QQ(3, "Quale momento storico italiano è evocato dal «Bacio» di Hayez, secondo molti storici dell'arte?", "Il Risorgimento", "La Resistenza", "Il Rinascimento", "L'unificazione di Roma antica");
  QQ(3, "Quale porto francese è raffigurato in «Impressione, levar del sole» di Monet?", "Le Havre", "Marsiglia", "Calais", "Saint-Tropez");
  QQ(2, "Che forma ha «Il giardino delle delizie» di Bosch?", "Un trittico", "Un tondo", "Un affresco a soffitto", "Un dittico");
  QQ(1, "Quale montagna si vede sullo sfondo della «Grande onda di Kanagawa» di Hokusai?", "Il monte Fuji", "Il monte Everest", "Il Kilimangiaro", "Il monte Ararat");
  QQ(3, "Dove si trovava Van Gogh quando dipinse «La notte stellata»?", "In un ospedale psichiatrico a Saint-Rémy-de-Provence", "Nella Casa gialla di Arles", "A Parigi, nello studio del fratello", "Ad Auvers-sur-Oise");
  QQ(2, "Quale attrezzo agricolo tiene in mano l'uomo in «American Gothic» di Grant Wood?", "Un forcone", "Una falce", "Una zappa", "Un'ascia");
  QQ(2, "Quale luogo raffigura «Nighthawks» di Edward Hopper?", "Una tavola calda aperta di notte", "Un cinema all'aperto", "Una stazione ferroviaria", "Una sala da ballo");
  QQ(2, "Perché fece scandalo «Colazione sull'erba» di Manet al Salon des Refusés?", "Una donna nuda siede accanto a uomini vestiti", "Era troppo grande per le sale", "Raffigurava un sovrano in modo irriverente", "Era dipinta con colori troppo scuri");
  QQ(2, "Quale mezzo di trasporto moderno è protagonista di «Pioggia, vapore e velocità» di Turner?", "Il treno", "Il piroscafo", "L'automobile", "La mongolfiera");
  QQ(3, "Che cosa fa l'uomo ritratto di spalle in «Viandante sul mare di nebbia» di Friedrich?", "Contempla il paesaggio da una roccia", "Pesca da una barca", "Cavalca verso l'orizzonte", "Prega davanti a una croce");
  QQ(3, "Che cosa raffigura «Whaam!» di Roy Lichtenstein?", "Un aereo da combattimento che esplode", "Un pugno che colpisce", "Un'automobile in corsa", "Un fucile che spara");
  QQ(3, "In quale ambiente si trova l'Ultima Cena di Leonardo?", "Nel refettorio di un convento", "Nella sacrestia di una cattedrale", "In una cappella privata", "Nel salone di un palazzo ducale");
  QQ(3, "Dove avrebbe dovuto dipingere Leonardo la «Battaglia di Anghiari»?", "Palazzo Vecchio, a Firenze", "Palazzo Pitti, a Firenze", "Castello Sforzesco, a Milano", "Palazzo Ducale, a Mantova");
  QQ(3, "Quale opera di Munch fu rubata a mano armata dal museo di Oslo nel 2004 e ritrovata nel 2006?", "L'urlo", "Pubertà", "Sera sul viale Karl Johan", "La danza della vita");
  QQ(3, "Di quale pittore olandese è «Il concerto», rubato nel 1990 dal museo Gardner di Boston e mai ritrovato?", "Jan Vermeer", "Frans Hals", "Jan Steen", "Pieter de Hooch");
  QQ(3, "Con quale soprannome è nota la tela «Ritratto di Adele Bloch-Bauer I» di Klimt?", "La Dama d'oro", "La Signora in giallo", "La Regina d'argento", "La Dama del bacio");
  QQ(3, "Quale celebre dipinto è chiamato anche «la Gioconda del Nord»?", "La ragazza col turbante di Vermeer", "La Giovane perlata di Rembrandt", "La Dama con ventaglio di Hals", "La Maja vestida di Goya");

  // ── Quiz: artisti, maestri, biografie ──
  QQ(3, "Quale artista del Rinascimento scrisse anche numerose poesie e sonetti?", "Michelangelo", "Donatello", "Tiziano", "Caravaggio");
  QQ(3, "Presso quale pittore fiorentino fece apprendistato il giovane Michelangelo?", "Domenico Ghirlandaio", "Andrea del Verrocchio", "Pietro Perugino", "Sandro Botticelli");
  QQ(3, "Come si chiamava la prima moglie di Rembrandt, da lui spesso ritratta?", "Saskia", "Hendrickje", "Judith", "Margaretha");
  QQ(2, "Da quale isola greca proveniva El Greco?", "Creta", "Rodi", "Corfù", "Cipro");
  QQ(2, "Quale pittore fu al servizio del re Filippo IV di Spagna come pittore di corte?", "Diego Velázquez", "Francisco Goya", "Bartolomé Murillo", "El Greco");
  QQ(3, "Quale pittore tedesco fu al servizio di Enrico VIII d'Inghilterra?", "Hans Holbein il Giovane", "Albrecht Dürer", "Lucas Cranach il Vecchio", "Matthias Grünewald");
  QQ(3, "Quale grande pittore barocco svolse anche missioni diplomatiche per i sovrani d'Europa?", "Pieter Paul Rubens", "Caravaggio", "Jan Vermeer", "Rembrandt");
  QQ(2, "In quale città spagnola nacque Pablo Picasso?", "Málaga", "Barcellona", "Madrid", "Siviglia");
  QQ(2, "In quale città catalana si trova il Teatro-Museo di Salvador Dalí?", "Figueres", "Girona", "Tarragona", "Lleida");
  QQ(2, "Con quale nome firmava i suoi quadri Vincent van Gogh?", "Vincent", "V. van Gogh", "Theo", "Van G.");
  QQ(3, "Quale pittore, ex impiegato alla dogana, è detto «il Doganiere»?", "Henri Rousseau", "Paul Gauguin", "Georges Seurat", "Camille Pissarro");
  QQ(3, "Quale pittore italiano, nato a Ferrara, divenne a Parigi il ritrattista della Belle Époque?", "Giovanni Boldini", "Giovanni Fattori", "Telemaco Signorini", "Silvestro Lega");
  QQ(2, "Quale pittrice messicana è celebre per i suoi autoritratti?", "Frida Kahlo", "Georgia O'Keeffe", "Tamara de Lempicka", "Artemisia Gentileschi");
  QQ(2, "Quale artista americana è famosa per i grandi fiori e i teschi di animali nel deserto?", "Georgia O'Keeffe", "Mary Cassatt", "Frida Kahlo", "Louise Bourgeois");
  QQ(3, "Quale fu la prima donna ammessa all'Accademia delle Arti del Disegno di Firenze, nel 1616?", "Artemisia Gentileschi", "Sofonisba Anguissola", "Lavinia Fontana", "Rosalba Carriera");
  QQ(3, "Quale critico d'arte coniò, nel 1874, il termine «impressionisti» in tono ironico?", "Louis Leroy", "Émile Zola", "Charles Baudelaire", "Théophile Gautier");
  QQ(2, "Quale artista inglese è noto per le piscine californiane e i paesaggi dello Yorkshire?", "David Hockney", "Lucian Freud", "Francis Bacon", "Damien Hirst");
  QQ(1, "Quale artista americano è celebre per le serigrafie di Marilyn Monroe?", "Andy Warhol", "Jackson Pollock", "Edward Hopper", "Jasper Johns");
  QQ(2, "Quale artista italiano è celebre per i «sacchi» e per le combustioni su plastica?", "Alberto Burri", "Piero Manzoni", "Giorgio Morandi", "Mimmo Rotella");
  QQ(3, "Quale artista italiano, nato in Argentina, è celebre per i «tagli» sulla tela?", "Lucio Fontana", "Alberto Burri", "Piero Manzoni", "Enrico Castellani");
  QQ(3, "In quale Paese nacque il pittore Giorgio de Chirico, fondatore della pittura metafisica?", "Grecia", "Italia", "Francia", "Argentina");
  QQ(3, "In quale Paese nacque l'architetto barocco Francesco Borromini?", "Svizzera", "Italia", "Francia", "Spagna");
  QQ(3, "Quale scultore realizzò il «Cristo velato» della Cappella Sansevero a Napoli?", "Giuseppe Sanmartino", "Antonio Canova", "Gian Lorenzo Bernini", "Francesco Queirolo");
  QQ(3, "Quale scultore realizzò la Fontana del Nettuno di Bologna?", "Giambologna", "Gian Lorenzo Bernini", "Bartolomeo Ammannati", "Nicola Pisano");
  QQ(2, "Quale scultore realizzò il primo nudo a tutto tondo in bronzo del Rinascimento, il suo «David»?", "Donatello", "Michelangelo", "Luca della Robbia", "Lorenzo Ghiberti");
  QQ(2, "Quale scultore neoclassico realizzò il gruppo delle «Tre Grazie»?", "Antonio Canova", "Gian Lorenzo Bernini", "Auguste Rodin", "Donatello");
  QQ(2, "Quale scultore creò il gruppo marmoreo «Il bacio» (1882) e «Il Pensatore»?", "Auguste Rodin", "Antonio Canova", "Camille Claudel", "Medardo Rosso");
  QQ(3, "Quale scultrice francese fu allieva e compagna di Rodin?", "Camille Claudel", "Berthe Morisot", "Louise Bourgeois", "Niki de Saint Phalle");
  QQ(3, "Quale scultore inglese è famoso per le grandi figure umane sdraiate dalle forme sinuose?", "Henry Moore", "Antony Gormley", "Anish Kapoor", "Barbara Hepworth");
  QQ(2, "Quale artista olandese realizzò «Salita e discesa» e «Relatività» con scale impossibili?", "M. C. Escher", "Piet Mondrian", "Vincent van Gogh", "Jan Steen");

  // ── Quiz: movimenti, termini e stili ──
  QQ(1, "Quale movimento artistico esaltava la velocità, la macchina e la vita moderna?", "Futurismo", "Impressionismo", "Neoclassicismo", "Romanticismo");
  QQ(2, "Quale movimento rifiuta la prospettiva e scompone gli oggetti in forme geometriche?", "Cubismo", "Realismo", "Rococò", "Preraffaellismo");
  QQ(3, "Quale artista russo fondò il Suprematismo?", "Kazimir Malevič", "Wassily Kandinsky", "Marc Chagall", "Vladimir Tatlin");
  QQ(2, "Quale movimento americano del dopoguerra è legato a Pollock e Rothko?", "Espressionismo astratto", "Pop Art", "Minimalismo", "Iperrealismo");
  QQ(2, "Da quale parola inglese deriva «Pop» in Pop Art?", "Popular, popolare", "Poppy, papavero", "Pop-up, a comparsa", "Population, popolazione");
  QQ(3, "Quale stile architettonico e artistico è detto in Catalogna «Modernismo»?", "L'Art Nouveau", "Il Barocco", "Il Neoclassicismo", "Il Gotico");
  QQ(3, "Da quale espressione francese deriva il nome del Brutalismo architettonico?", "Béton brut, cemento grezzo", "Beauté brute, bellezza selvaggia", "Brut de fonderie, fuso grezzo", "Bois brut, legno grezzo");
  QQ(3, "Chi coniò la celebre frase «la forma segue la funzione» in architettura?", "Louis Sullivan", "Le Corbusier", "Walter Gropius", "Frank Gehry");
  QQ(3, "A quale architetto si attribuisce la frase «meno è più» (less is more)?", "Ludwig Mies van der Rohe", "Le Corbusier", "Frank Lloyd Wright", "Oscar Niemeyer");
  QQ(3, "In quale città americana nacque il grattacielo moderno, con l'edificio del 1885 a struttura d'acciaio?", "Chicago", "New York", "Boston", "Filadelfia");
  QQ(2, "Quale genere pittorico raffigura vedute di città, come quelle di Canaletto?", "Il vedutismo", "La natura morta", "Il ritratto", "La pittura di storia");
  QQ(2, "Che cos'è un «bozzetto»?", "Un modello preparatorio di piccole dimensioni", "Un grande affresco su soffitto", "Una cornice dorata", "Un ritratto di famiglia");
  QQ(2, "Che cosa rappresenta una «Pietà» nell'arte cristiana?", "Maria che sorregge Cristo morto", "L'Annunciazione dell'angelo", "L'Ultima Cena", "La fuga in Egitto");
  QQ(3, "Che cos'è una «lunetta» in architettura e in pittura?", "Uno spazio semicircolare sopra una porta o una finestra", "Una piccola sfera di marmo", "Una cornice ovale", "Un ornamento per il tetto");
  QQ(3, "Chi è raffigurato nel «Pantocratore» dell'arte bizantina?", "Cristo benedicente", "L'imperatore Giustiniano", "San Marco", "La Vergine col Bambino");
  QQ(2, "Che cosa significa dipingere «en plein air»?", "Dipingere all'aperto, dal vero", "Dipingere su vetro", "Dipingere di notte", "Dipingere senza pennelli");
  QQ(2, "Con quale pietra preziosa si otteneva nel Rinascimento il costoso blu oltremare?", "Lapislazzuli", "Zaffiro", "Turchese", "Smeraldo");
  QQ(2, "Da quale città toscana proviene il marmo bianco usato da Michelangelo?", "Carrara", "Siena", "Massa Marittima", "Volterra");
  QQ(2, "Di quale materiale è fatta la Venere di Milo?", "Marmo", "Bronzo", "Terracotta", "Avorio");
  QQ(3, "Quale movimento pittorico inglese dell'Ottocento si ispirava all'arte precedente a Raffaello?", "I Preraffaelliti", "I Fauves", "I Nabis", "I Macchiaioli");
  QQ(2, "Quale villaggio presso Parigi diede il nome alla scuola di pittori paesaggisti precursori degli Impressionisti?", "Barbizon", "Giverny", "Argenteuil", "Auvers-sur-Oise");
  QQ(3, "Quale tecnica pittorica italiana di fine Ottocento accosta filamenti di colore puro?", "Il Divisionismo", "Il Macchiaiolismo", "Il Manierismo", "Il Verismo");
  QQ(2, "Quale pittore divisionista, nato ad Arco, dipinse paesaggi alpini e «Le due madri»?", "Giovanni Segantini", "Gaetano Previati", "Giuseppe Pellizza da Volpedo", "Angelo Morbelli");
  QQ(1, "Quale città italiana è considerata la culla del Rinascimento?", "Firenze", "Milano", "Napoli", "Torino");
  QQ(2, "Quale famiglia romana, con il cardinale Scipione, fu mecenate di Caravaggio e di Bernini?", "I Borghese", "I Medici", "Gli Sforza", "I Gonzaga");
  QQ(2, "Quale museo è il più visitato del mondo?", "Il Louvre", "Il Prado", "Gli Uffizi", "Il Metropolitan");
  QQ(2, "Quale famoso museo di New York ha la forma di una spirale bianca?", "Il Guggenheim", "Il MoMA", "Il Metropolitan", "Il Whitney");
  QQ(2, "In quale città si trova l'Ermitage?", "San Pietroburgo", "Mosca", "Kiev", "Varsavia");
  QQ(2, "In quale città si trova il Belvedere, che custodisce «Il bacio» di Klimt?", "Vienna", "Budapest", "Praga", "Monaco di Baviera");
  QQ(3, "In quale città si trova la Galleria Estense?", "Modena", "Ferrara", "Reggio Emilia", "Parma");
  QQ(3, "In quale città si trova la Galleria Sabauda?", "Torino", "Genova", "Cuneo", "Alessandria");
  QQ(3, "In quale città si trova il Museo di Castelvecchio?", "Verona", "Vicenza", "Padova", "Brescia");
  QQ(2, "In quale città si trova la Cappella degli Scrovegni, affrescata da Giotto?", "Padova", "Assisi", "Firenze", "Ravenna");
  QQ(2, "In quale città italiana si trova il Palazzo Pubblico con il «Buon Governo» di Lorenzetti?", "Siena", "Arezzo", "Perugia", "Pisa");
  QQ(2, "In quale città umbra si trova la Basilica con gli affreschi attribuiti a Giotto sulla vita di san Francesco?", "Assisi", "Perugia", "Spoleto", "Orvieto");
  QQ(3, "In quale città si trova la Galleria Nazionale dell'Umbria?", "Perugia", "Terni", "Foligno", "Gubbio");

  // ── Vero o falso ──
  TT(3, "La Gioconda è dipinta a olio su una tavola di pioppo.", true);
  TT(3, "L'Ultima Cena di Leonardo è un affresco vero e proprio, dipinto sull'intonaco ancora bagnato.", false, "Leonardo sperimentò una tecnica a secco sul muro, per questo l'opera si deteriorò presto");
  TT(2, "Il David di Michelangelo è stato scolpito in un unico blocco di marmo.", true);
  TT(2, "Raffaello morì a 37 anni.", true);
  TT(2, "Caravaggio nacque a Roma.", false, "Nacque a Milano e prese il nome dal paese di Caravaggio, dove la famiglia aveva radici");
  TT(2, "Rembrandt nacque a Leida.", true);
  TT(1, "Vermeer era un pittore francese.", false, "Era olandese, di Delft");
  TT(2, "Francisco Goya divenne sordo da adulto, dopo una grave malattia.", true);
  TT(1, "Il nome «Impressionismo» deriva da un quadro di Claude Monet.", true);
  TT(1, "Vincent van Gogh visse a lungo a Roma.", false, "Visse nei Paesi Bassi e in Francia, a Parigi, Arles, Saint-Rémy e Auvers-sur-Oise");
  TT(3, "Van Gogh dipinse molte opere mentre era ricoverato a Saint-Rémy-de-Provence.", true);
  TT(1, "Frida Kahlo era una pittrice brasiliana.", false, "Era messicana");
  TT(2, "Salvador Dalí era catalano.", true);
  TT(1, "Pablo Picasso nacque a Madrid.", false, "Nacque a Málaga");
  TT(1, "Edvard Munch, l'autore de «L'urlo», era norvegese.", true);
  TT(2, "La Pietà di Michelangelo è conservata nella Basilica di San Pietro, in Vaticano.", true);
  TT(2, "La Pietà di Michelangelo si trova a Firenze, nel Museo degli Uffizi.", false, "È in San Pietro, in Vaticano; a Firenze c'è un'altra Pietà, quella detta «Bandini», al Museo dell'Opera del Duomo");
  TT(2, "La Nike di Samotracia è esposta al Louvre.", true);
  TT(1, "La Venere di Milo ha le braccia intatte.", false, "Le braccia mancano");
  TT(1, "Il Rinascimento nacque a Firenze.", true);
  TT(2, "Il Barocco precede il Rinascimento.", false, "Lo segue: il Barocco è del Seicento");
  TT(2, "Georges Braque fu, con Picasso, tra i fondatori del Cubismo.", true);
  TT(2, "Il Dadaismo nacque a Zurigo, durante la Prima guerra mondiale.", true);
  TT(1, "Jackson Pollock faceva colare il colore sulla tela distesa a terra.", true);
  TT(1, "Andy Warhol è un esponente del Surrealismo.", false, "È il simbolo della Pop Art");
  TT(2, "I colori ad acquerello sono legati con olio di lino.", false, "Il legante è la gomma arabica");
  TT(2, "La pittura a olio si diffuse in Europa a partire dal Quattrocento.", true);
  TT(2, "La sanguigna è una matita di colore rossastro.", true);
  TT(1, "Un trittico è un dipinto composto da tre parti.", true);
  TT(1, "Un dittico è un dipinto composto da quattro parti.", false, "Il dittico ha due parti");
  TT(2, "Il Louvre era un palazzo reale prima di diventare museo.", true);
  TT(3, "L'Ermitage di San Pietroburgo ha sede nel Palazzo d'Inverno.", true);
  TT(2, "Il Museo d'Orsay di Parigi si trova in un'ex stazione ferroviaria.", true);
  TT(2, "La Tate Modern di Londra ha sede in un antico castello medievale.", false, "Occupa una ex centrale elettrica");
  TT(2, "L'Uomo vitruviano di Leonardo è un disegno a penna e inchiostro.", true);
  TT(2, "L'Uomo vitruviano di Leonardo è un dipinto a olio su tela.", false, "È un disegno a penna e inchiostro su carta");
  TT(2, "Leonardo da Vinci era mancino.", true);
  TT(2, "Michelangelo dipinse «La scuola di Atene».", false, "È un affresco di Raffaello");
  TT(2, "Tiziano fu il maggiore pittore veneziano del Cinquecento.", true);
  TT(1, "Sandro Botticelli era veneziano.", false, "Era fiorentino");
  TT(2, "Antonio Canova è il maggiore scultore neoclassico italiano.", true);
  TT(2, "Gian Lorenzo Bernini fu uno scultore del Rinascimento.", false, "Fu il grande scultore del Barocco");
  TT(1, "«Il Pensatore» è una scultura di Auguste Rodin.", true);
  TT(1, "«Il Pensatore» è una scultura di Michelangelo.", false, "È di Rodin");
  TT(2, "«La grande onda di Kanagawa» di Hokusai è una xilografia.", true);
  TT(2, "«La grande onda di Kanagawa» è un dipinto a olio su tela.", false, "È una stampa xilografica giapponese");
  TT(2, "Il «Guernica» di Picasso ricorda il bombardamento di una città basca nel 1937.", true);
  TT(1, "Il «Guernica» di Picasso è dipinto a colori vivaci.", false, "È dipinto in bianco, nero e grigio");
  TT(1, "Nella «Persistenza della memoria» di Dalí compaiono orologi molli.", true);
  TT(2, "Nel «Bacio» di Klimt prevalgono il blu e il verde, senza oro.", false, "Il dipinto è reso celebre dalla foglia d'oro");
  TT(2, "«L'urlo» di Munch esiste in più versioni.", true);
  TT(3, "La «Ragazza col turbante» di Vermeer è detta anche «la Gioconda del Nord».", true);
  TT(3, "Di Vermeer si conservano centinaia di dipinti.", false, "Ne restano poco più di trenta");
  TT(3, "Artemisia Gentileschi fu la prima donna ammessa all'Accademia delle Arti del Disegno di Firenze.", true);
  TT(1, "Lo stile Art Nouveau si chiama «Liberty» in Italia.", true);
  TT(2, "Il Bauhaus fu fondato in Francia.", false, "Nacque in Germania, a Weimar, nel 1919");
  TT(3, "Le Corbusier nacque in Svizzera.", true);
  TT(2, "Zaha Hadid era un'architetta di origine irachena.", true);
  TT(2, "La cupola del Pantheon di Roma è completamente chiusa.", false, "Ha un grande foro circolare in cima, l'oculo");
  TT(3, "La Pietà Rondanini è l'ultima opera di Michelangelo.", true);
  TT(3, "Michelangelo visse più a lungo di Leonardo da Vinci.", true);
  TT(2, "Raffaello e Michelangelo lavorarono entrambi in Vaticano.", true);
  TT(1, "Il Rinascimento riscoprì i modelli dell'arte classica.", true);
  TT(2, "Giotto è considerato il precursore della pittura rinascimentale.", true);
  TT(1, "Giotto visse nel Cinquecento.", false, "Visse tra Duecento e Trecento");
  TT(3, "«Impressione, levar del sole» di Monet raffigura il porto di Le Havre.", true);
  TT(1, "Edgar Degas è famoso per i suoi quadri di ballerine.", true);
  TT(3, "Cézanne influenzò profondamente Picasso e il Cubismo.", true);
  TT(2, "Georges Seurat dipingeva con grandi pennellate fluide e sfumate.", false, "Usava piccoli puntini di colore puro: il puntinismo");
  TT(1, "Piet Mondrian usava linee nere ortogonali e campi di colori primari.", true);
  TT(2, "Il Louvre è il museo più visitato del mondo.", true);
  TT(2, "Il Museo del Prado di Madrid conserva molte opere di Velázquez e di Goya.", true);
  TT(1, "Il Museo del Prado si trova a Barcellona.", false, "Si trova a Madrid");
  TT(1, "La Galleria degli Uffizi si trova a Roma.", false, "Si trova a Firenze");
  TT(2, "«Fontana» di Marcel Duchamp è un orinatoio capovolto.", true);
  TT(2, "Un «ready-made» è un oggetto comune scelto e presentato come opera d'arte.", true);
  TT(2, "Jeff Koons è noto per sculture che ricordano palloncini giganti.", true);
  TT(1, "Maurizio Cattelan è un artista italiano.", true);
  TT(1, "Yayoi Kusama è famosa per i suoi motivi a pois.", true);
  TT(2, "Jean-Michel Basquiat iniziò la carriera come autore di graffiti.", true);
  TT(3, "Henry Moore è noto per le sue sculture di figure sdraiate.", true);
  TT(1, "Antonio Canova scolpì il David di Firenze.", false, "Il David di Firenze è di Michelangelo");
  TT(2, "Il David di Michelangelo è alto più di cinque metri.", true);
  TT(1, "La xilografia è una tecnica di stampa che usa il legno.", true);
  TT(3, "La litografia si esegue su una pietra calcarea.", true);
  TT(2, "L'acquaforte si esegue incidendo una lastra di legno.", false, "Si incide una lastra di metallo con l'acido");
  TT(1, "Il mosaico è composto da tante piccole tessere.", true);
  TT(1, "Gli affreschi si dipingono su tela.", false, "Si dipingono sul muro, sull'intonaco fresco");
  TT(3, "Il blu oltremare si otteneva un tempo dal lapislazzuli.", true);
  TT(2, "Hieronymus Bosch era un pittore olandese del Quattrocento e Cinquecento.", true);
  TT(2, "Pieter Bruegel il Vecchio è celebre per le scene di vita contadina.", true);
  TT(2, "Rubens era uno dei maggiori pittori del Barocco.", true);
  TT(3, "Velázquez era il pittore di corte di Filippo IV di Spagna.", true);
  TT(1, "La Sagrada Família è l'opera più famosa di Antoni Gaudí.", true);
  TT(2, "Il Cristo velato si trova a Napoli.", true);
  TT(3, "Il Cristo velato fu scolpito da Gian Lorenzo Bernini.", false, "È opera di Giuseppe Sanmartino");
  TT(2, "Il Futurismo italiano fu fondato da Filippo Tommaso Marinetti.", true);
  TT(2, "Il Futurismo esaltava il passato e la tradizione.", false, "Esaltava la velocità, la macchina e la modernità");
  TT(2, "I Macchiaioli erano pittori toscani dell'Ottocento.", true);
  TT(3, "Il Preraffaellismo nacque in Inghilterra a metà Ottocento.", true);
  TT(2, "Hokusai era un artista cinese.", false, "Era giapponese");
  TT(3, "Lucio Fontana, celebre per i tagli sulla tela, nacque in Argentina.", true);

  // ── Metti in ordine ──
  const order = [
    { q: 'Metti in ordine cronologico gli stili, dal più antico', items: ['Romanico', 'Gotico', 'Rinascimento', 'Barocco'], d: 1 },
    { q: 'Metti in ordine cronologico i movimenti, dal più antico', items: ['Rinascimento', 'Barocco', 'Neoclassicismo', 'Impressionismo'], d: 1 },
    { q: 'Metti in ordine cronologico i movimenti, dal più antico', items: ['Impressionismo', 'Cubismo', 'Surrealismo', 'Pop Art'], d: 2 },
    { q: 'Metti in ordine cronologico i movimenti, dal più antico', items: ['Fauvismo', 'Cubismo', 'Futurismo', 'Surrealismo'], d: 3 },
    { q: 'Metti in ordine cronologico, dal più antico', items: ['Futurismo', 'Dadaismo', 'Surrealismo', 'Espressionismo astratto'], d: 3 },
    { q: 'Metti in ordine cronologico, dal più antico', items: ['Gotico', 'Rinascimento', 'Barocco', 'Rococò'], d: 2 },
    { q: 'Metti in ordine di nascita, dal più anziano', items: ['Giotto', 'Masaccio', 'Leonardo da Vinci', 'Caravaggio'], d: 1 },
    { q: 'Metti in ordine di nascita, dal più anziano', items: ['Raffaello', 'Tiziano', 'Caravaggio', 'Bernini'], d: 2 },
    { q: 'Metti in ordine le opere di Michelangelo, dalla più antica', items: ['Pietà vaticana', 'David', 'Volta della Cappella Sistina', 'Giudizio Universale'], d: 2 },
    { q: 'Metti in ordine cronologico le opere, dalla più antica', items: ['La nascita di Venere', 'L\'Ultima Cena', 'Il David di Michelangelo', 'La scuola di Atene'], d: 3 },
    { q: 'Metti in ordine cronologico le costruzioni, dalla più antica', items: ['Partenone', 'Colosseo', 'Cattedrale di Notre-Dame', 'Torre Eiffel'], d: 1 },
    { q: 'Metti in ordine cronologico le fasi e le opere di Picasso, dalla più antica', items: ['Periodo blu', 'Periodo rosa', 'Cubismo', 'Guernica'], d: 3 },
    { q: 'Metti in ordine cronologico, dal più antico', items: ['La ronda di notte', 'La zattera della Medusa', 'Impressione, levar del sole', 'L\'urlo'], d: 2 },
    { q: 'Metti in ordine cronologico, dal più antico', items: ['La Libertà che guida il popolo', 'Colazione sull\'erba', 'La notte stellata', 'Guernica'], d: 2 },
  ];

  // ── Indovina il numero ──
  const numbers = [
    N('Quante persone, Gesù compreso, siedono a tavola nell\'Ultima Cena di Leonardo?', 13, 5, 20, 0, 'persone', 2),
    N('Quanti anni circa impiegò Michelangelo a dipingere la volta della Cappella Sistina?', 4, 1, 12, 1, 'anni', 2),
    N('Quanto è alto, circa, il David di Michelangelo?', 517, 200, 900, 40, 'cm', 2),
    N('Quanto è alta la Gioconda, circa?', 77, 30, 200, 6, 'cm', 3),
    N('A quanti anni morì Raffaello?', 37, 20, 80, 1, 'anni', 2),
    N('A quanti anni morì Vincent van Gogh?', 37, 20, 80, 1, 'anni', 2),
    N('A quanti anni morì Leonardo da Vinci?', 67, 40, 100, 2, 'anni', 2),
    N('A quanti anni morì Michelangelo?', 88, 50, 110, 2, 'anni', 2),
    N('A quanti anni morì Pablo Picasso?', 91, 60, 110, 2, 'anni', 2),
    N('A quanti anni morì Claude Monet?', 86, 60, 110, 2, 'anni', 3),
    N('A quanti anni morì Frida Kahlo?', 47, 25, 80, 2, 'anni', 2),
    N('A quanti anni morì Amedeo Modigliani?', 35, 20, 70, 1, 'anni', 2),
    N('A quanti anni morì Jean-Michel Basquiat?', 27, 15, 60, 1, 'anni', 3),
    N('In che anno fu rubata la Gioconda dal Louvre?', 1911, 1850, 1960, 3, '', 2),
    N('In che anno si tenne la prima mostra degli Impressionisti a Parigi?', 1874, 1820, 1930, 3, '', 2),
    N('In che anno fu pubblicato il Manifesto del Futurismo?', 1909, 1850, 1960, 3, '', 2),
    N('In che anno fu fondato il Bauhaus a Weimar?', 1919, 1850, 1980, 3, '', 3),
    N('In che anno furono scoperti i Bronzi di Riace?', 1972, 1900, 2010, 3, '', 3),
    N('In che anno fu inaugurato il Guggenheim di Bilbao?', 1997, 1950, 2020, 2, '', 3),
  ];

  // ── Indovina dalle emoji ──
  const emojis = [
    E('🌌🌙⭐🌀', 'La notte stellata', 1),
    E('🕰️🫠🏜️', 'La persistenza della memoria', 1),
    E('🍎🎩🕴️', 'Il figlio dell\'uomo', 2),
    E('🌊🗻⛵', 'La grande onda di Kanagawa', 2),
    E('😱🌉🧑', 'L\'urlo', 1),
    E('🥫🔴⬜', 'Barattoli di zuppa Campbell\'s', 2),
    E('🧔☝️👨🌤️', 'La creazione di Adamo', 2),
    E('🐚👩🌊', 'La nascita di Venere', 1),
    E('🤨👩🖼️🇫🇷', 'La Gioconda', 1),
    E('🍞🍷👥🕯️', 'L\'Ultima Cena', 1),
    E('💋✨🟡', 'Il bacio di Klimt', 2),
    E('🤔🪨', 'Il Pensatore', 1),
    E('🌻🌻🌻', 'I girasoli', 1),
    E('🪷🌿🌉', 'Le ninfee', 2),
    E('👩🇫🇷🚩⚔️', 'La Libertà che guida il popolo', 2),
  ];
  const emojiText = 'Quale celebre opera d\'arte raccontano queste emoji?';

  // ── Scrivi la risposta ──
  const typed = [
    { q: 'Quale pittore austriaco dipinse «Il bacio» con la foglia d\'oro?', a: 'Gustav Klimt', accept: ['Klimt'], d: 1 },
    { q: 'Quale artista realizzò i «Girasoli» e «La notte stellata»?', a: 'Vincent van Gogh', accept: ['Van Gogh', 'Vincent'], d: 1 },
    { q: 'Come si chiama il museo di Madrid che ospita «Las Meninas»?', a: 'Museo del Prado', accept: ['Prado'], d: 1 },
    { q: 'Come si chiama il museo parigino ospitato in un\'ex stazione ferroviaria?', a: 'Museo d\'Orsay', accept: ['Orsay', 'Musée d\'Orsay', 'd\'Orsay'], d: 2 },
    { q: 'Come si chiama il museo di Amsterdam che custodisce «La ronda di notte»?', a: 'Rijksmuseum', accept: ['Rijks museum', 'Rijks'], d: 2 },
    { q: 'Come si chiama il museo di Londra che custodisce «Gli ambasciatori» di Holbein?', a: 'National Gallery', accept: ['The National Gallery'], d: 3 },
    { q: 'Come si chiama il pittore spagnolo surrealista dai baffi all\'insù?', a: 'Salvador Dalí', accept: ['Dalí', 'Dali', 'Salvador Dali'], d: 1 },
    { q: 'Quale artista americano dipinse i barattoli di zuppa Campbell\'s?', a: 'Andy Warhol', accept: ['Warhol'], d: 1 },
    { q: 'Come si chiama il movimento di Monet, Renoir e Degas?', a: 'Impressionismo', accept: ['Impressionisti', 'L\'Impressionismo'], d: 1 },
    { q: 'Quale scultore francese realizzò «Il Pensatore»?', a: 'Auguste Rodin', accept: ['Rodin'], d: 1 },
    { q: 'Quale scultore realizzò il «Mosè» di San Pietro in Vincoli?', a: 'Michelangelo', accept: ['Michelangelo Buonarroti', 'Buonarroti'], d: 2 },
    { q: 'Come si chiama la tecnica di Pollock che consiste nel far colare il colore sulla tela?', a: 'Dripping', accept: ['Action painting'], d: 2 },
    { q: 'Come si chiama la sfumatura morbida dei contorni resa celebre da Leonardo?', a: 'Sfumato', accept: ['Lo sfumato'], d: 2 },
    { q: 'Come si chiama in Italia lo stile Art Nouveau?', a: 'Liberty', accept: ['Stile Liberty'], d: 2 },
    { q: 'Quale architetto catalano progettò la Sagrada Família e il Parco Güell?', a: 'Antoni Gaudí', accept: ['Gaudí', 'Gaudi', 'Antoni Gaudi'], d: 1 },
    { q: 'Come si chiama l\'artista messicana celebre per gli autoritratti e le sopracciglia unite?', a: 'Frida Kahlo', accept: ['Kahlo', 'Frida'], d: 1 },
  ];

  const tables = [
    T('opere', opere, {
      artista: {
        ask: 'Chi è l\'autore dell\'opera «{name}»?',
        who: 'Quale di queste opere è di {value}?',
        tf: 'L\'opera «{name}» è di {value}.',
        odd: 'Trova l\'intruso: quale di queste opere NON è di {value}?',
        typed: 'person',
      },
      luogo: {
        ask: 'In quale museo o luogo si trova l\'opera «{name}»?',
        who: 'Quale di queste opere si trova in questo museo o luogo: {value}?',
        tf: 'L\'opera «{name}» è conservata in questo museo o luogo: {value}.',
        odd: 'Trova l\'intruso: quale di queste opere NON è conservata in questo museo o luogo: {value}?',
      },
      citta: {
        ask: 'In quale città si trova l\'opera «{name}»?',
        who: 'Quale di queste opere si trova nella città di {value}?',
        tf: 'L\'opera «{name}» si trova nella città di {value}.',
        odd: 'Trova l\'intruso: quale di queste opere NON si trova nella città di {value}?',
      },
    }),
    T('anniAntichi', anniOpere.filter((x) => x.anno < 1600), {}, annoField(450, 8, 20)),
    T('anniBarocchi', anniOpere.filter((x) => x.anno >= 1600 && x.anno < 1850), {}, annoField(260, 6, 15)),
    T('anniModerni', anniOpere.filter((x) => x.anno >= 1850), {}, annoField(120, 4, 6)),
    T('artisti', artisti, {
      paese: {
        ask: 'In quale Paese è nato (o nata) {name}?',
        who: 'Quale di questi artisti è nato in questo Paese: {value}?',
        tf: '{name} è nato (o nata) in questo Paese: {value}.',
        odd: 'Trova l\'intruso: quale di questi artisti NON è nato in questo Paese: {value}?',
      },
      movimento: {
        ask: 'A quale movimento artistico è legato {name}?',
        who: 'Quale di questi artisti è legato a questo movimento: {value}?',
        tf: '{name} è legato a questo movimento artistico: {value}.',
        odd: 'Trova l\'intruso: quale di questi artisti NON è legato a questo movimento: {value}?',
      },
    }),
    T('nascitaAntica', annoArt('nascita', (y) => y < 1600), {}, nascField(260, 6, 12)),
    T('nascitaMedia', annoArt('nascita', (y) => y >= 1600 && y < 1850), {}, nascField(250, 5, 12)),
    T('nascitaModerna', annoArt('nascita', (y) => y >= 1850), {}, nascField(120, 3, 6)),
    T('morteAntica', annoArt('morte', (y) => y < 1650), {}, morteField(300, 6, 12)),
    T('morteMedia', annoArt('morte', (y) => y >= 1650 && y < 1900), {}, morteField(260, 5, 12)),
    T('morteModerna', annoArt('morte', (y) => y >= 1900), {}, morteField(130, 3, 6)),
  ];

  (D.pop = D.pop || []).push({
    id: 'plusarte', extends: 'arte',
    quiz, tf, tables, order, numbers, emojis, emojiText, typed,
  });
})(typeof window !== 'undefined' ? window : globalThis);
