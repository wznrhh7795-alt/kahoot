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
Amore e Psiche che si abbracciano|Antonio Canova|||2
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
    tables,
  });
})(typeof window !== 'undefined' ? window : globalThis);
