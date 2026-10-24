// Letteratura (extends) per Quizzone! — domande aggiuntive alla categoria classica «Letteratura». Fatti verificati.
(function (root) {
  'use strict';
  const D = (root.QZ_DATA = root.QZ_DATA || {});
  // Righe compatte → oggetti del formato standard.
  const Q = (rows) => rows.map(([q, a, wrong, d]) => ({ q, a, wrong, d }));
  const TF = (rows) => rows.map(([q, a, d, why]) => (why ? { q, a, d, why } : { q, a, d }));
  const items = (keys, rows) => rows.map((r) => { const o = {}; keys.forEach((k, i) => { if (r[i] !== undefined && r[i] !== null) o[k] = r[i]; }); return o; });
  // Nazionalità (aggettivo femminile, come «nazionalità italiana»)
  const N = { I: 'Italiana', F: 'Francese', R: 'Russa', T: 'Tedesca', B: 'Britannica', U: 'Statunitense', S: 'Spagnola', Co: 'Colombiana', Sv: 'Svedese', Ch: 'Cilena', Pt: 'Portoghese', J: 'Giapponese', Sw: 'Svizzera', Ca: 'Canadese', No: 'Norvegese', Br: 'Brasiliana' };
  // Opere per cui «chi l'ha scritto» esiste già nella categoria classica: niente campo «autore».
  const NOAUT = new Set(["1984", "Addio alle armi", "Alice nel Paese delle Meraviglie", "Amleto", "Anna Karenina", "Assassinio sull'Orient Express", "Canto di Natale", "Cent'anni di solitudine", "Cime tempestose", "Cristo si è fermato a Eboli", "Cuore", "David Copperfield", "Dei Sepolcri", "Delitto e castigo", "Dieci piccoli indiani", "Don Chisciotte della Mancia", "Dracula", "Eneide", "Fahrenheit 451", "Faust", "Favole al telefono", "Frankenstein", "Furore", "Gerusalemme liberata", "Gli indifferenti", "Guerra e pace", "Harry Potter e la pietra filosofale", "I Malavoglia", "I dolori del giovane Werther", "I fratelli Karamazov", "I miserabili", "I promessi sposi", "I tre moschettieri", "I viaggi di Gulliver", "Il Cantico delle creature", "Il Canzoniere", "Il Corsaro Nero", "Il Decameron", "Il Gattopardo", "Il Milione", "Il Piccolo Principe", "Il Signore degli Anelli", "Il barone rampante", "Il buio oltre la siepe", "Il cavaliere inesistente", "Il codice da Vinci", "Il conte di Montecristo", "Il deserto dei Tartari", "Il giardino dei Finzi-Contini", "Il giornalino di Gian Burrasca", "Il giorno", "Il giorno della civetta", "Il giovane Holden", "Il giro del mondo in 80 giorni", "Il grande Gatsby", "Il libro della giungla", "Il lupo della steppa", "Il mastino dei Baskerville", "Il meraviglioso mago di Oz", "Il mondo nuovo", "Il nome del vento", "Il nome della rosa", "Il pendolo di Foucault", "Il piacere", "Il principe", "Il processo", "Il richiamo della foresta", "Il ritratto di Dorian Gray", "Il sentiero dei nidi di ragno", "Il signore delle mosche", "Il sistema periodico", "Il trono di spade", "Il vecchio e il mare", "Iliade", "Io non ho paura", "It", "Jane Eyre", "L'allegria", "L'amica geniale", "L'amore ai tempi del colera", "L'isola del tesoro", "L'isola di Arturo", "La Divina Commedia", "La Storia", "La capanna dello zio Tom", "La coscienza di Zeno", "La fattoria degli animali", "La forma dell'acqua", "La luna e i falò", "La metamorfosi", "La noia", "La solitudine dei numeri primi", "La tregua", "Le avventure di Pinocchio", "Le avventure di Tom Sawyer", "Le città invisibili", "Le cronache di Narnia", "Le metamorfosi", "Le tigri di Mompracem", "Le ultime lettere di Jacopo Ortis", "Lessico famigliare", "Lo Hobbit", "Lo straniero", "Lo strano caso del dottor Jekyll e del signor Hyde", "Lolita", "Macbeth", "Madame Bovary", "Marcovaldo", "Mastro-don Gesualdo", "Moby Dick", "Notre-Dame de Paris", "Novecento", "Odissea", "Oliver Twist", "Operette morali", "Orgoglio e pregiudizio", "Orlando furioso", "Ossi di seppia", "Otello", "Per chi suona la campana", "Peter Pan", "Piccole donne", "Robinson Crusoe", "Romeo e Giulietta", "Se questo è un uomo", "Se una notte d'inverno un viaggiatore", "Sei personaggi in cerca d'autore", "Seta", "Shining", "Siddharta", "Ulisse", "Uno, nessuno e centomila", "Uomini e topi", "Va' dove ti porta il cuore", "Ventimila leghe sotto i mari", "Via col vento", "Zanna Bianca"]);

  // ===== Romanzi: anno di pubblicazione, nazionalità dell'autore, autore =====
  const romanzi = items(['name', 'd', 'anno', 'naz', 'autore'], [
    ['I promessi sposi', 1, 1827, N.I, 'Alessandro Manzoni'],
    ['Il Gattopardo', 2, 1958, N.I, 'Giuseppe Tomasi di Lampedusa'],
    ['La coscienza di Zeno', 2, 1923, N.I, 'Italo Svevo'],
    ['Il fu Mattia Pascal', 2, 1904, N.I, 'Luigi Pirandello'],
    ['Uno, nessuno e centomila', 2, 1926, N.I, 'Luigi Pirandello'],
    ['Il visconte dimezzato', 2, 1952, N.I, 'Italo Calvino'],
    ['Il barone rampante', 2, 1957, N.I, 'Italo Calvino'],
    ['Il cavaliere inesistente', 3, 1959, N.I, 'Italo Calvino'],
    ['Il sentiero dei nidi di ragno', 3, 1947, N.I, 'Italo Calvino'],
    ['Marcovaldo', 2, 1963, N.I, 'Italo Calvino'],
    ['Le città invisibili', 3, 1972, N.I, 'Italo Calvino'],
    ['Se una notte d\'inverno un viaggiatore', 3, 1979, N.I, 'Italo Calvino'],
    ['Il nome della rosa', 1, 1980, N.I, 'Umberto Eco'],
    ['Il pendolo di Foucault', 3, 1988, N.I, 'Umberto Eco'],
    ['Baudolino', 3, 2000, N.I, 'Umberto Eco'],
    ['Il cimitero di Praga', 3, 2010, N.I, 'Umberto Eco'],
    ['Se questo è un uomo', 1, 1947, N.I, 'Primo Levi'],
    ['La tregua', 3, 1963, N.I, 'Primo Levi'],
    ['Il sistema periodico', 3, 1975, N.I, 'Primo Levi'],
    ['Cristo si è fermato a Eboli', 2, 1945, N.I, 'Carlo Levi'],
    ['Il giardino dei Finzi-Contini', 2, 1962, N.I, 'Giorgio Bassani'],
    ['Il deserto dei Tartari', 2, 1940, N.I, 'Dino Buzzati'],
    ['Gli indifferenti', 2, 1929, N.I, 'Alberto Moravia'],
    ['La noia', 3, 1960, N.I, 'Alberto Moravia'],
    ['La ciociara', 3, 1957, N.I, 'Alberto Moravia'],
    ['La Storia', 2, 1974, N.I, 'Elsa Morante'],
    ['L\'isola di Arturo', 3, 1957, N.I, 'Elsa Morante'],
    ['Il giorno della civetta', 2, 1961, N.I, 'Leonardo Sciascia'],
    ['La luna e i falò', 3, 1950, N.I, 'Cesare Pavese'],
    ['Il piacere', 3, 1889, N.I, 'Gabriele D\'Annunzio'],
    ['I Malavoglia', 1, 1881, N.I, 'Giovanni Verga'],
    ['Mastro-don Gesualdo', 3, 1889, N.I, 'Giovanni Verga'],
    ['Cuore', 1, 1886, N.I, 'Edmondo De Amicis'],
    ['Io non ho paura', 1, 2001, N.I, 'Niccolò Ammaniti'],
    ['La solitudine dei numeri primi', 1, 2008, N.I, 'Paolo Giordano'],
    ['Va\' dove ti porta il cuore', 1, 1994, N.I, 'Susanna Tamaro'],
    ['Novecento', 2, 1994, N.I, 'Alessandro Baricco'],
    ['Seta', 2, 1996, N.I, 'Alessandro Baricco'],
    ['L\'amica geniale', 1, 2011, N.I, 'Elena Ferrante'],
    ['Gomorra', 1, 2006, N.I, 'Roberto Saviano'],
    ['La forma dell\'acqua', 2, 1994, N.I, 'Andrea Camilleri'],
    ['Caos calmo', 3, 2005, N.I, 'Sandro Veronesi'],
    ['Le otto montagne', 2, 2016, N.I, 'Paolo Cognetti'],
    ['Il colibrì', 3, 2019, N.I, 'Sandro Veronesi'],
    ['La ragazza di Bube', 3, 1960, N.I, 'Carlo Cassola'],
    ['Orlando furioso', 2, 1516, N.I, 'Ludovico Ariosto'],
    ['Don Chisciotte della Mancia', 1, 1605, N.S, 'Miguel de Cervantes'],
    ['Robinson Crusoe', 1, 1719, N.B, 'Daniel Defoe'],
    ['I viaggi di Gulliver', 2, 1726, null, 'Jonathan Swift'],
    ['Orgoglio e pregiudizio', 1, 1813, N.B, 'Jane Austen'],
    ['Ragione e sentimento', 2, 1811, N.B, 'Jane Austen'],
    ['Emma', 3, 1815, N.B, 'Jane Austen'],
    ['Frankenstein', 1, 1818, N.B, 'Mary Shelley'],
    ['Jane Eyre', 1, 1847, N.B, 'Charlotte Brontë'],
    ['Cime tempestose', 1, 1847, N.B, 'Emily Brontë'],
    ['Canto di Natale', 1, 1843, N.B, 'Charles Dickens'],
    ['Alice nel Paese delle Meraviglie', 1, 1865, N.B, 'Lewis Carroll'],
    ['Dracula', 1, 1897, null, 'Bram Stoker'],
    ['Lo strano caso del dottor Jekyll e del signor Hyde', 2, 1886, N.B, 'Robert Louis Stevenson'],
    ['Il libro della giungla', 1, 1894, N.B, 'Rudyard Kipling'],
    ['Il meraviglioso mago di Oz', 1, 1900, N.U, 'L. Frank Baum'],
    ['Piccole donne', 1, 1868, N.U, 'Louisa May Alcott'],
    ['Le avventure di Tom Sawyer', 1, 1876, N.U, 'Mark Twain'],
    ['Moby Dick', 1, 1851, N.U, 'Herman Melville'],
    ['Il grande Gatsby', 1, 1925, N.U, 'Francis Scott Fitzgerald'],
    ['Addio alle armi', 2, 1929, N.U, 'Ernest Hemingway'],
    ['Per chi suona la campana', 2, 1940, N.U, 'Ernest Hemingway'],
    ['Il vecchio e il mare', 1, 1952, N.U, 'Ernest Hemingway'],
    ['Furore', 2, 1939, N.U, 'John Steinbeck'],
    ['Uomini e topi', 2, 1937, N.U, 'John Steinbeck'],
    ['Il giovane Holden', 1, 1951, N.U, 'J. D. Salinger'],
    ['Il buio oltre la siepe', 1, 1960, N.U, 'Harper Lee'],
    ['Via col vento', 1, 1936, N.U, 'Margaret Mitchell'],
    ['Lolita', 2, 1955, null, 'Vladimir Nabokov'],
    ['Il richiamo della foresta', 1, 1903, N.U, 'Jack London'],
    ['Zanna Bianca', 1, 1906, N.U, 'Jack London'],
    ['Fahrenheit 451', 1, 1953, N.U, 'Ray Bradbury'],
    ['1984', 1, 1949, N.B, 'George Orwell'],
    ['La fattoria degli animali', 1, 1945, N.B, 'George Orwell'],
    ['Il mondo nuovo', 2, 1932, N.B, 'Aldous Huxley'],
    ['Il signore delle mosche', 2, 1954, N.B, 'William Golding'],
    ['Lo Hobbit', 1, 1937, N.B, 'J. R. R. Tolkien'],
    ['Dieci piccoli indiani', 1, 1939, N.B, 'Agatha Christie'],
    ['Assassinio sull\'Orient Express', 1, 1934, N.B, 'Agatha Christie'],
    ['Il mastino dei Baskerville', 2, 1902, N.B, 'Arthur Conan Doyle'],
    ['Uno studio in rosso', 3, 1887, N.B, 'Arthur Conan Doyle'],
    ['Il codice da Vinci', 1, 2003, N.U, 'Dan Brown'],
    ['It', 1, 1986, N.U, 'Stephen King'],
    ['Shining', 1, 1977, N.U, 'Stephen King'],
    ['Il trono di spade', 1, 1996, N.U, 'George R. R. Martin'],
    ['Harry Potter e la pietra filosofale', 1, 1997, N.B, 'J. K. Rowling'],
    ['Twilight', 1, 2005, N.U, 'Stephenie Meyer'],
    ['Hunger Games', 2, 2008, N.U, 'Suzanne Collins'],
    ['Ulisse', 2, 1922, null, 'James Joyce'],
    ['Il processo', 2, 1925, null, 'Franz Kafka'],
    ['La metamorfosi', 1, 1915, null, 'Franz Kafka'],
    ['Il castello', 3, 1926, null, 'Franz Kafka'],
    ['Siddharta', 2, 1922, null, 'Hermann Hesse'],
    ['Il lupo della steppa', 3, 1927, null, 'Hermann Hesse'],
    ['Lo straniero', 1, 1942, N.F, 'Albert Camus'],
    ['La peste', 2, 1947, N.F, 'Albert Camus'],
    ['Il Piccolo Principe', 1, 1943, N.F, 'Antoine de Saint-Exupéry'],
    ['I miserabili', 1, 1862, N.F, 'Victor Hugo'],
    ['Notre-Dame de Paris', 1, 1831, N.F, 'Victor Hugo'],
    ['Il rosso e il nero', 3, 1830, N.F, 'Stendhal'],
    ['Germinale', 3, 1885, N.F, 'Émile Zola'],
    ['Viaggio al centro della Terra', 2, 1864, N.F, 'Jules Verne'],
    ['Cent\'anni di solitudine', 1, 1967, N.Co, 'Gabriel García Márquez'],
    ['L\'amore ai tempi del colera', 2, 1985, N.Co, 'Gabriel García Márquez'],
    ['Cronaca di una morte annunciata', 2, 1981, N.Co, 'Gabriel García Márquez'],
    ['La casa degli spiriti', 2, 1982, N.Ch, 'Isabel Allende'],
    ['L\'alchimista', 1, 1988, N.Br, 'Paulo Coelho'],
    ['Il mondo di Sofia', 2, 1991, N.No, 'Jostein Gaarder'],
    ['Il profumo', 3, 1985, N.T, 'Patrick Süskind'],
    ['La storia infinita', 1, 1979, N.T, 'Michael Ende'],
    ['Momo', 2, 1973, N.T, 'Michael Ende'],
    ['Heidi', 1, 1880, N.Sw, 'Johanna Spyri'],
    ['Pippi Calzelunghe', 1, 1945, N.Sv, 'Astrid Lindgren'],
    ['La fabbrica di cioccolato', 1, 1964, N.B, 'Roald Dahl'],
    ['Matilda', 1, 1988, N.B, 'Roald Dahl'],
    ['Il GGG', 2, 1982, N.B, 'Roald Dahl'],
    ['Mary Poppins', 2, 1934, null, 'P. L. Travers'],
    ['Winnie the Pooh', 1, 1926, N.B, 'A. A. Milne'],
    ['Anna dai capelli rossi', 2, 1908, N.Ca, 'Lucy Maud Montgomery'],
    ['Il vento tra i salici', 3, 1908, N.B, 'Kenneth Grahame'],
    ['Il giardino segreto', 2, 1911, null, 'Frances Hodgson Burnett'],
    ['Il dottor Živago', 2, 1957, N.R, 'Boris Pasternak'],
    ['Padri e figli', 3, 1862, N.R, 'Ivan Turgenev'],
    ['Niente di nuovo sul fronte occidentale', 2, 1929, N.T, 'Erich Maria Remarque'],
    ['La montagna incantata', 3, 1924, N.T, 'Thomas Mann'],
    ['Il tamburo di latta', 3, 1959, N.T, 'Günter Grass'],
    ['Cecità', 3, 1995, N.Pt, 'José Saramago'],
    ['Sulla strada', 2, 1957, N.U, 'Jack Kerouac'],
    ['Colazione da Tiffany', 2, 1958, N.U, 'Truman Capote'],
    ['A sangue freddo', 2, 1966, N.U, 'Truman Capote'],
    ['Dune', 2, 1965, N.U, 'Frank Herbert'],
    ['Neuromante', 3, 1984, N.U, 'William Gibson'],
  ]).map((o) => { if (NOAUT.has(o.name)) delete o.autore; return o; });

  // ===== Autori: nascita, morte, nazionalità, città natale =====
  const P = { I: 'Italiana', F: 'Francese', B: 'Britannica', U: 'Statunitense', R: 'Russa', T: 'Tedesca', S: 'Spagnola', Ar: 'Argentina', Ch: 'Cilena', Co: 'Colombiana', Dk: 'Danese', Sv: 'Svedese', No: 'Norvegese', Sw: 'Svizzera', J: 'Giapponese', Br: 'Brasiliana', Ca: 'Canadese' };
  const autori = items(['name', 'd', 'nato', 'morto', 'naz', 'citta'], [
    ['Dante Alighieri', 1, 1265, 1321, P.I, 'Firenze'],
    ['Francesco Petrarca', 1, 1304, 1374, P.I, 'Arezzo'],
    ['Giovanni Boccaccio', 1, 1313, 1375, P.I],
    ['Niccolò Machiavelli', 1, 1469, 1527, P.I, 'Firenze'],
    ['Ludovico Ariosto', 2, 1474, 1533, P.I, 'Reggio Emilia'],
    ['Torquato Tasso', 2, 1544, 1595, P.I, 'Sorrento'],
    ['Giambattista Marino', 3, 1569, 1625, P.I, 'Napoli'],
    ['Carlo Goldoni', 1, 1707, 1793, P.I, 'Venezia'],
    ['Giuseppe Parini', 2, 1729, 1799, P.I],
    ['Vittorio Alfieri', 2, 1749, 1803, P.I, 'Asti'],
    ['Ugo Foscolo', 2, 1778, 1827, P.I],
    ['Alessandro Manzoni', 1, 1785, 1873, P.I, 'Milano'],
    ['Giacomo Leopardi', 1, 1798, 1837, P.I, 'Recanati'],
    ['Silvio Pellico', 3, 1789, 1854, P.I, 'Saluzzo'],
    ['Ippolito Nievo', 3, 1831, 1861, P.I, 'Padova'],
    ['Giuseppe Gioachino Belli', 3, 1791, 1863, P.I, 'Roma'],
    ['Carlo Porta', 3, 1775, 1821, P.I, 'Milano'],
    ['Giosuè Carducci', 2, 1835, 1907, P.I],
    ['Giovanni Verga', 1, 1840, 1922, P.I, 'Catania'],
    ['Edmondo De Amicis', 2, 1846, 1908, P.I],
    ['Carlo Collodi', 1, 1826, 1890, P.I, 'Firenze'],
    ['Giovanni Pascoli', 1, 1855, 1912, P.I],
    ['Gabriele D\'Annunzio', 1, 1863, 1938, P.I, 'Pescara'],
    ['Luigi Pirandello', 1, 1867, 1936, P.I, 'Agrigento'],
    ['Italo Svevo', 2, 1861, 1928, P.I, 'Trieste'],
    ['Grazia Deledda', 2, 1871, 1936, P.I, 'Nuoro'],
    ['Emilio Salgari', 1, 1862, 1911, P.I, 'Verona'],
    ['Antonio Fogazzaro', 3, 1842, 1911, P.I, 'Vicenza'],
    ['Luigi Capuana', 3, 1839, 1915, P.I, 'Mineo'],
    ['Trilussa', 2, 1871, 1950, P.I, 'Roma'],
    ['Filippo Tommaso Marinetti', 2, 1876, 1944, P.I, 'Alessandria d\'Egitto'],
    ['Guido Gozzano', 3, 1883, 1916, P.I, 'Torino'],
    ['Umberto Saba', 2, 1883, 1957, P.I, 'Trieste'],
    ['Giuseppe Ungaretti', 1, 1888, 1970, P.I, 'Alessandria d\'Egitto'],
    ['Eugenio Montale', 1, 1896, 1981, P.I, 'Genova'],
    ['Salvatore Quasimodo', 2, 1901, 1968, P.I, 'Modica'],
    ['Carlo Emilio Gadda', 3, 1893, 1973, P.I, 'Milano'],
    ['Curzio Malaparte', 3, 1898, 1957, P.I, 'Prato'],
    ['Ignazio Silone', 3, 1900, 1978, P.I, 'Pescina'],
    ['Antonio Gramsci', 2, 1891, 1937, P.I, 'Ales'],
    ['Dino Buzzati', 2, 1906, 1972, P.I, 'Belluno'],
    ['Cesare Pavese', 1, 1908, 1950, P.I, 'Santo Stefano Belbo'],
    ['Elio Vittorini', 3, 1908, 1966, P.I, 'Siracusa'],
    ['Carlo Levi', 2, 1902, 1975, P.I, 'Torino'],
    ['Alberto Moravia', 1, 1907, 1990, P.I, 'Roma'],
    ['Elsa Morante', 2, 1912, 1985, P.I, 'Roma'],
    ['Natalia Ginzburg', 2, 1916, 1991, P.I, 'Palermo'],
    ['Giorgio Bassani', 2, 1916, 2000, P.I, 'Bologna'],
    ['Giuseppe Tomasi di Lampedusa', 2, 1896, 1957, P.I, 'Palermo'],
    ['Beppe Fenoglio', 3, 1922, 1963, P.I, 'Alba'],
    ['Primo Levi', 1, 1919, 1987, P.I, 'Torino'],
    ['Italo Calvino', 1, 1923, 1985, P.I, 'Santiago de Las Vegas (Cuba)'],
    ['Leonardo Sciascia', 2, 1921, 1989, P.I, 'Racalmuto'],
    ['Gianni Rodari', 1, 1920, 1980, P.I, 'Omegna'],
    ['Pier Paolo Pasolini', 1, 1922, 1975, P.I, 'Bologna'],
    ['Giorgio Caproni', 3, 1912, 1990, P.I, 'Livorno'],
    ['Edoardo Sanguineti', 3, 1930, 2010, P.I, 'Genova'],
    ['Umberto Eco', 1, 1932, 2016, P.I, 'Alessandria'],
    ['Andrea Camilleri', 1, 1925, 2019, P.I, 'Porto Empedocle'],
    ['Dario Fo', 1, 1926, 2016, P.I, 'Sangiano'],
    ['Alda Merini', 2, 1931, 2009, P.I, 'Milano'],
    ['Oriana Fallaci', 2, 1929, 2006, P.I, 'Firenze'],
    ['Tiziano Terzani', 3, 1938, 2004, P.I, 'Firenze'],
    ['Michela Murgia', 2, 1972, 2023, P.I],
    ['Susanna Tamaro', 2, 1957, null, P.I, 'Trieste'],
    ['Alessandro Baricco', 2, 1958, null, P.I, 'Torino'],
    ['Niccolò Ammaniti', 2, 1966, null, P.I, 'Roma'],
    ['Paolo Giordano', 2, 1982, null, P.I, 'Torino'],
    ['Roberto Saviano', 1, 1979, null, P.I, 'Napoli'],
    ['William Shakespeare', 1, 1564, 1616, P.B],
    ['Miguel de Cervantes', 1, 1547, 1616, P.S],
    ['Jonathan Swift', 3, 1667, 1745],
    ['Johann Wolfgang von Goethe', 1, 1749, 1832, P.T],
    ['Friedrich Schiller', 3, 1759, 1805, P.T],
    ['Jane Austen', 1, 1775, 1817, P.B],
    ['Mary Shelley', 2, 1797, 1851, P.B],
    ['Victor Hugo', 1, 1802, 1885, P.F],
    ['Alexandre Dumas', 1, 1802, 1870, P.F],
    ['Stendhal', 3, 1783, 1842, P.F],
    ['Honoré de Balzac', 2, 1799, 1850, P.F],
    ['Charles Dickens', 1, 1812, 1870, P.B],
    ['Charlotte Brontë', 2, 1816, 1855, P.B],
    ['Emily Brontë', 2, 1818, 1848, P.B],
    ['Herman Melville', 2, 1819, 1891, P.U],
    ['Gustave Flaubert', 2, 1821, 1880, P.F],
    ['Fëdor Dostoevskij', 1, 1821, 1881, P.R],
    ['Lev Tolstoj', 1, 1828, 1910, P.R],
    ['Jules Verne', 1, 1828, 1905, P.F],
    ['Louisa May Alcott', 2, 1832, 1888, P.U],
    ['Lewis Carroll', 1, 1832, 1898, P.B],
    ['Mark Twain', 1, 1835, 1910, P.U],
    ['Émile Zola', 2, 1840, 1902, P.F],
    ['Robert Louis Stevenson', 2, 1850, 1894, P.B],
    ['Oscar Wilde', 1, 1854, 1900],
    ['Arthur Conan Doyle', 1, 1859, 1930, P.B],
    ['Anton Čechov', 2, 1860, 1904, P.R],
    ['Rudyard Kipling', 2, 1865, 1936, P.B],
    ['H. G. Wells', 2, 1866, 1946, P.B],
    ['Marcel Proust', 2, 1871, 1922, P.F],
    ['Jack London', 2, 1876, 1916, P.U],
    ['Thomas Mann', 2, 1875, 1955, P.T],
    ['James Joyce', 2, 1882, 1941],
    ['Virginia Woolf', 2, 1882, 1941, P.B],
    ['Franz Kafka', 1, 1883, 1924],
    ['Agatha Christie', 1, 1890, 1976, P.B],
    ['J. R. R. Tolkien', 1, 1892, 1973, P.B],
    ['Francis Scott Fitzgerald', 1, 1896, 1940, P.U],
    ['William Faulkner', 2, 1897, 1962, P.U],
    ['Ernest Hemingway', 1, 1899, 1961, P.U],
    ['Jorge Luis Borges', 2, 1899, 1986, P.Ar],
    ['Antoine de Saint-Exupéry', 1, 1900, 1944, P.F],
    ['George Orwell', 1, 1903, 1950, P.B],
    ['John Steinbeck', 2, 1902, 1968, P.U],
    ['Pablo Neruda', 2, 1904, 1973, P.Ch],
    ['Jean-Paul Sartre', 2, 1905, 1980, P.F],
    ['Albert Camus', 1, 1913, 1960, P.F],
    ['Roald Dahl', 1, 1916, 1990, P.B],
    ['Astrid Lindgren', 1, 1907, 2002, P.Sv],
    ['Hans Christian Andersen', 1, 1805, 1875, P.Dk],
    ['Charles Perrault', 2, 1628, 1703, P.F],
    ['Henrik Ibsen', 2, 1828, 1906, P.No],
    ['Aleksandr Puškin', 2, 1799, 1837, P.R],
    ['Edgar Allan Poe', 1, 1809, 1849, P.U],
    ['Walt Whitman', 2, 1819, 1892, P.U],
    ['Emily Dickinson', 3, 1830, 1886, P.U],
    ['Lord Byron', 2, 1788, 1824, P.B],
    ['Charles Baudelaire', 2, 1821, 1867, P.F],
    ['Molière', 2, 1622, 1673, P.F],
    ['Voltaire', 2, 1694, 1778, P.F],
    ['Ray Bradbury', 2, 1920, 2012, P.U],
    ['J. D. Salinger', 2, 1919, 2010, P.U],
    ['Harper Lee', 2, 1926, 2016, P.U],
    ['Gabriel García Márquez', 1, 1927, 2014, P.Co],
    ['Stephen King', 1, 1947, null, P.U],
    ['J. K. Rowling', 1, 1965, null, P.B],
    ['George R. R. Martin', 2, 1948, null, P.U],
    ['Dan Brown', 1, 1964, null, P.U],
    ['Paulo Coelho', 1, 1947, null, P.Br],
    ['Haruki Murakami', 2, 1949, null, P.J],
    ['Isabel Allende', 2, 1942, null, P.Ch],
    ['Margaret Atwood', 3, 1939, null, P.Ca],
  ]);

  // ===== Premi Nobel per la letteratura: anno e nazionalità =====
  const V = { I: 'Italiana', F: 'Francese', B: 'Britannica', U: 'Statunitense', R: 'Russa', T: 'Tedesca', S: 'Spagnola', Sv: 'Svedese', Be: 'Belga', In: 'Indiana', No: 'Norvegese', Ch: 'Cilena', Is: 'Islandese', Gr: 'Greca', J: 'Giapponese', Gu: 'Guatemalteca', Ni: 'Nigeriana', Eg: 'Egiziana', Au: 'Australiana', Me: 'Messicana', Sa: 'Sudafricana', Po: 'Polacca', Pt: 'Portoghese', Co: 'Colombiana', Un: 'Ungherese', At: 'Austriaca', Tu: 'Turca', Pe: 'Peruviana', Cn: 'Cinese', Ca: 'Canadese', Bi: 'Bielorussa', Sk: 'Sudcoreana' };
  const nobel = items(['name', 'd', 'anno', 'naz'], [
    ['Giosuè Carducci', 2, 1906, V.I],
    ['Rudyard Kipling', 1, 1907, V.B],
    ['Selma Lagerlöf', 3, 1909, V.Sv],
    ['Maurice Maeterlinck', 3, 1911, V.Be],
    ['Rabindranath Tagore', 2, 1913, V.In],
    ['Romain Rolland', 3, 1915, V.F],
    ['Knut Hamsun', 3, 1920, V.No],
    ['Anatole France', 3, 1921, V.F],
    ['William Butler Yeats', 2, 1923],
    ['George Bernard Shaw', 2, 1925],
    ['Grazia Deledda', 1, 1926, V.I],
    ['Thomas Mann', 1, 1929, V.T],
    ['Sinclair Lewis', 3, 1930, V.U],
    ['John Galsworthy', 3, 1932, V.B],
    ['Luigi Pirandello', 1, 1934, V.I],
    ['Eugene O\'Neill', 3, 1936, V.U],
    ['Pearl S. Buck', 3, 1938, V.U],
    ['Gabriela Mistral', 2, 1945, V.Ch],
    ['Hermann Hesse', 1, 1946],
    ['André Gide', 3, 1947, V.F],
    ['T. S. Eliot', 2, 1948],
    ['William Faulkner', 2, 1949, V.U],
    ['Bertrand Russell', 3, 1950, V.B],
    ['Winston Churchill', 1, 1953, V.B],
    ['Ernest Hemingway', 1, 1954, V.U],
    ['Halldór Laxness', 3, 1955, V.Is],
    ['Albert Camus', 1, 1957, V.F],
    ['Boris Pasternak', 2, 1958, V.R],
    ['Salvatore Quasimodo', 2, 1959, V.I],
    ['John Steinbeck', 1, 1962, V.U],
    ['Giorgos Seferis', 3, 1963, V.Gr],
    ['Jean-Paul Sartre', 1, 1964, V.F],
    ['Michail Šolochov', 3, 1965, V.R],
    ['Miguel Ángel Asturias', 3, 1967, V.Gu],
    ['Yasunari Kawabata', 3, 1968, V.J],
    ['Samuel Beckett', 2, 1969],
    ['Aleksandr Solženicyn', 2, 1970, V.R],
    ['Pablo Neruda', 1, 1971, V.Ch],
    ['Heinrich Böll', 3, 1972, V.T],
    ['Patrick White', 3, 1973, V.Au],
    ['Eugenio Montale', 1, 1975, V.I],
    ['Saul Bellow', 3, 1976, V.U],
    ['Isaac Bashevis Singer', 3, 1978, V.U],
    ['Odysseas Elytis', 3, 1979, V.Gr],
    ['Czesław Miłosz', 3, 1980],
    ['Elias Canetti', 3, 1981],
    ['Gabriel García Márquez', 1, 1982, V.Co],
    ['William Golding', 2, 1983, V.B],
    ['Wole Soyinka', 3, 1986, V.Ni],
    ['Naghib Mahfuz', 3, 1988, V.Eg],
    ['Camilo José Cela', 3, 1989, V.S],
    ['Octavio Paz', 3, 1990, V.Me],
    ['Nadine Gordimer', 3, 1991, V.Sa],
    ['Toni Morrison', 2, 1993, V.U],
    ['Kenzaburō Ōe', 3, 1994, V.J],
    ['Seamus Heaney', 3, 1995],
    ['Wisława Szymborska', 3, 1996, V.Po],
    ['Dario Fo', 1, 1997, V.I],
    ['José Saramago', 2, 1998, V.Pt],
    ['Günter Grass', 2, 1999, V.T],
    ['Imre Kertész', 3, 2002, V.Un],
    ['J. M. Coetzee', 3, 2003],
    ['Elfriede Jelinek', 3, 2004, V.At],
    ['Harold Pinter', 3, 2005, V.B],
    ['Orhan Pamuk', 2, 2006, V.Tu],
    ['Doris Lessing', 3, 2007, V.B],
    ['J. M. G. Le Clézio', 3, 2008, V.F],
    ['Herta Müller', 3, 2009, V.T],
    ['Mario Vargas Llosa', 2, 2010, V.Pe],
    ['Tomas Tranströmer', 3, 2011, V.Sv],
    ['Mo Yan', 3, 2012, V.Cn],
    ['Alice Munro', 3, 2013, V.Ca],
    ['Patrick Modiano', 3, 2014, V.F],
    ['Svetlana Aleksievič', 3, 2015, V.Bi],
    ['Bob Dylan', 1, 2016, V.U],
    ['Kazuo Ishiguro', 2, 2017],
    ['Peter Handke', 3, 2019, V.At],
    ['Louise Glück', 3, 2020, V.U],
    ['Annie Ernaux', 3, 2022, V.F],
    ['Jon Fosse', 3, 2023, V.No],
    ['Han Kang', 3, 2024, V.Sk],
  ]);

  // ===== Divina Commedia: dove si trovano i personaggi =====
  const C = ['Primo cerchio (Limbo)', 'Secondo cerchio', 'Terzo cerchio', 'Quarto cerchio', 'Quinto cerchio', 'Sesto cerchio', 'Settimo cerchio', 'Ottavo cerchio (Malebolge)', 'Nono cerchio'];
  const inferno = items(['name', 'd', 'luogo'], [
    ['Caronte', 1, 'Acheronte'],
    ['Minosse', 2, C[1]], ['Paolo e Francesca', 1, C[1]], ['Didone', 3, C[1]], ['Cleopatra', 3, C[1]], ['Elena di Troia', 3, C[1]], ['Achille', 3, C[1]],
    ['Cerbero', 2, C[2]], ['Ciacco', 2, C[2]],
    ['Pluto', 3, C[3]],
    ['Flegiàs', 3, C[4]], ['Filippo Argenti', 2, C[4]],
    ['Omero', 2, C[0]], ['Aristotele', 2, C[0]], ['Socrate', 2, C[0]], ['Platone', 2, C[0]], ['Giulio Cesare', 3, C[0]], ['Saladino', 3, C[0]],
    ['Farinata degli Uberti', 1, C[5]], ['Cavalcante de\' Cavalcanti', 3, C[5]], ['Federico II', 3, C[5]],
    ['Capaneo', 3, C[6]], ['Pier della Vigna', 2, C[6]], ['Brunetto Latini', 2, C[6]], ['Minotauro', 2, C[6]], ['Chirone', 3, C[6]], ['Nesso', 3, C[6]],
    ['Ulisse', 1, C[7]], ['Diomede', 3, C[7]], ['Taide', 3, C[7]], ['Vanni Fucci', 3, C[7]], ['Maometto', 2, C[7]], ['Bertran de Born', 3, C[7]], ['Guido da Montefeltro', 3, C[7]], ['Gianni Schicchi', 3, C[7]], ['Maestro Adamo', 3, C[7]],
    ['Conte Ugolino', 1, C[8]], ['Ruggieri degli Ubaldini', 3, C[8]], ['Giuda Iscariota', 1, C[8]], ['Bruto', 2, C[8]], ['Cassio', 3, C[8]], ['Lucifero', 1, C[8]], ['Fra Alberigo', 3, C[8]], ['Branca Doria', 3, C[8]],
  ]);
  const U = ['Antipurgatorio', 'Prima cornice', 'Seconda cornice', 'Terza cornice', 'Quinta cornice', 'Sesta cornice', 'Settima cornice', 'Paradiso terrestre'];
  const purgatorio = items(['name', 'd', 'luogo'], [
    ['Catone l\'Uticense', 2, U[0]], ['Casella', 2, U[0]], ['Manfredi di Svevia', 2, U[0]], ['Belacqua', 3, U[0]], ['Pia de\' Tolomei', 2, U[0]], ['Buonconte da Montefeltro', 3, U[0]], ['Sordello', 2, U[0]],
    ['Oderisi da Gubbio', 3, U[1]], ['Omberto Aldobrandeschi', 3, U[1]],
    ['Sapia', 3, U[2]], ['Guido del Duca', 3, U[2]],
    ['Marco Lombardo', 3, U[3]],
    ['Papa Adriano V', 3, U[4]], ['Ugo Capeto', 3, U[4]],
    ['Forese Donati', 3, U[5]], ['Bonagiunta Orbicciani', 3, U[5]],
    ['Guido Guinizzelli', 3, U[6]], ['Arnaut Daniel', 3, U[6]],
    ['Matelda', 2, U[7]],
  ]);
  const paradiso = items(['name', 'd', 'luogo'], [
    ['Piccarda Donati', 2, 'Cielo della Luna'], ['Costanza d\'Altavilla', 3, 'Cielo della Luna'],
    ['Giustiniano', 3, 'Cielo di Mercurio'],
    ['Carlo Martello', 3, 'Cielo di Venere'], ['Cunizza da Romano', 3, 'Cielo di Venere'], ['Folchetto di Marsiglia', 3, 'Cielo di Venere'],
    ['Tommaso d\'Aquino', 2, 'Cielo del Sole'], ['Bonaventura da Bagnoregio', 3, 'Cielo del Sole'], ['Salomone', 3, 'Cielo del Sole'], ['Sigieri di Brabante', 3, 'Cielo del Sole'],
    ['Cacciaguida', 2, 'Cielo di Marte'], ['Carlo Magno', 3, 'Cielo di Marte'], ['Goffredo di Buglione', 3, 'Cielo di Marte'], ['Giosuè', 3, 'Cielo di Marte'],
    ['Traiano', 3, 'Cielo di Giove'], ['Davide', 3, 'Cielo di Giove'],
    ['Pier Damiani', 3, 'Cielo di Saturno'], ['San Benedetto', 3, 'Cielo di Saturno'],
    ['San Pietro', 2, 'Cielo delle Stelle fisse'], ['Adamo', 3, 'Cielo delle Stelle fisse'],
    ['San Bernardo di Chiaravalle', 2, 'Empireo'],
  ]);

  // ===== Personaggi ↔ libro (ogni personaggio compare in una sola opera della tabella) =====
  const pers = [];
  const book = (libro, rows) => rows.forEach(([name, d]) => pers.push({ name, d, libro }));
  book('I promessi sposi', [['Renzo Tramaglino', 1], ['Lucia Mondella', 1], ['Don Abbondio', 1], ['Don Rodrigo', 1], ['Fra Cristoforo', 2], ['L\'Innominato', 1], ['La monaca di Monza', 2], ['Perpetua', 2], ['Azzeccagarbugli', 2], ['Agnese', 3]]);
  book('Le avventure di Pinocchio', [['Geppetto', 1], ['Mangiafuoco', 1], ['Lucignolo', 1], ['Il Gatto e la Volpe', 1], ['La Fata Turchina', 1], ['Il Grillo Parlante', 1], ['Mastro Ciliegia', 3]]);
  book('Cuore', [['Enrico Bottini', 2], ['Garrone', 2], ['Franti', 2], ['Derossi', 3], ['Nelli', 3], ['Coretti', 3]]);
  book('Il Gattopardo', [['Don Fabrizio Salina', 2], ['Tancredi Falconeri', 2], ['Angelica Sedara', 3], ['Padre Pirrone', 3]]);
  book('Il barone rampante', [['Cosimo Piovasco di Rondò', 2]]);
  book('Il visconte dimezzato', [['Medardo di Terralba', 2]]);
  book('Il cavaliere inesistente', [['Agilulfo', 3], ['Gurdulù', 3]]);
  book('Il sentiero dei nidi di ragno', [['Pin', 3]]);
  book('Il nome della rosa', [['Guglielmo da Baskerville', 1], ['Adso da Melk', 2], ['Jorge da Burgos', 3]]);
  book('Il fu Mattia Pascal', [['Mattia Pascal', 2], ['Adriana Paleari', 3]]);
  book('Uno, nessuno e centomila', [['Vitangelo Moscarda', 3]]);
  book('La coscienza di Zeno', [['Zeno Cosini', 2]]);
  book('Sei personaggi in cerca d\'autore', [['La Figliastra', 3]]);
  book('I Malavoglia', [['Padron \'Ntoni', 2], ['\'Ntoni Malavoglia', 3]]);
  book('Il deserto dei Tartari', [['Giovanni Drogo', 3]]);
  book('Io non ho paura', [['Michele Amitrano', 3]]);
  book('Seta', [['Hervé Joncour', 3]]);
  book('Le avventure di Cipollino', [['Cipollino', 1], ['Il Principe Limone', 2], ['Il Cavalier Pomodoro', 2], ['Mastro Uvetta', 3]]);
  book('Le tigri di Mompracem', [['Sandokan', 1], ['Yanez de Gomera', 2]]);
  book('Orgoglio e pregiudizio', [['Elizabeth Bennet', 1], ['Fitzwilliam Darcy', 1], ['Jane Bennet', 3], ['Mr Collins', 3], ['Lydia Bennet', 3]]);
  book('Emma', [['Emma Woodhouse', 3], ['Mr Knightley', 3]]);
  book('Ragione e sentimento', [['Elinor Dashwood', 3], ['Marianne Dashwood', 3]]);
  book('Jane Eyre', [['Edward Rochester', 2], ['Bertha Mason', 3], ['Helen Burns', 3]]);
  book('Cime tempestose', [['Heathcliff', 1], ['Catherine Earnshaw', 2], ['Edgar Linton', 3]]);
  book('Oliver Twist', [['Fagin', 2], ['Artful Dodger', 2], ['Bill Sikes', 3], ['Nancy', 3]]);
  book('Canto di Natale', [['Ebenezer Scrooge', 1], ['Bob Cratchit', 2], ['Tiny Tim', 1], ['Jacob Marley', 2]]);
  book('Grandi speranze', [['Pip', 2], ['Miss Havisham', 2], ['Estella', 3], ['Abel Magwitch', 3]]);
  book('David Copperfield', [['Uriah Heep', 3], ['Wilkins Micawber', 3], ['Betsey Trotwood', 3]]);
  book('Alice nel Paese delle Meraviglie', [['Il Cappellaio Matto', 1], ['Lo Stregatto', 1], ['La Regina di Cuori', 1], ['Il Bianconiglio', 1], ['Il Brucaliffo', 2], ['La Finta Tartaruga', 3]]);
  book('L\'isola del tesoro', [['Long John Silver', 1], ['Jim Hawkins', 2], ['Ben Gunn', 3], ['Capitano Smollett', 3]]);
  book('Lo strano caso del dottor Jekyll e del signor Hyde', [['Gabriel Utterson', 3]]);
  book('Robinson Crusoe', [['Venerdì', 1]]);
  book('I viaggi di Gulliver', [['Lemuel Gulliver', 2]]);
  book('Moby Dick', [['Capitano Achab', 1], ['Ismaele', 2], ['Queequeg', 2], ['Starbuck', 3]]);
  book('Le avventure di Tom Sawyer', [['Tom Sawyer', 1], ['Becky Thatcher', 2], ['Injun Joe', 3], ['Zia Polly', 3]]);
  book('Il grande Gatsby', [['Jay Gatsby', 1], ['Daisy Buchanan', 2], ['Nick Carraway', 2], ['Tom Buchanan', 3]]);
  book('Il giovane Holden', [['Holden Caulfield', 1], ['Phoebe Caulfield', 3]]);
  book('Il buio oltre la siepe', [['Atticus Finch', 1], ['Scout Finch', 2], ['Boo Radley', 2], ['Tom Robinson', 3]]);
  book('Via col vento', [['Rossella O\'Hara', 1], ['Rhett Butler', 1], ['Ashley Wilkes', 3]]);
  book('1984', [['Winston Smith', 1], ['Julia', 2], ['O\'Brien', 3], ['Il Grande Fratello', 1], ['Emmanuel Goldstein', 3]]);
  book('La fattoria degli animali', [['Napoleon (il maiale)', 1], ['Palla di Neve', 2], ['Boxer (il cavallo)', 2], ['Clover', 3], ['Il Vecchio Maggiore', 3]]);
  book('Fahrenheit 451', [['Guy Montag', 2], ['Clarisse McClellan', 3], ['Capitano Beatty', 3]]);
  book('Il mondo nuovo', [['Bernard Marx', 3], ['Lenina Crowne', 3], ['John il Selvaggio', 2]]);
  book('Il signore delle mosche', [['Ralph', 3], ['Piggy', 1], ['Jack Merridew', 3]]);
  book('Il Signore degli Anelli', [['Frodo Baggins', 1], ['Samvise Gamgee', 1], ['Aragorn', 1], ['Boromir', 2], ['Saruman', 2], ['Legolas', 1], ['Gimli', 1], ['Éowyn', 3]]);
  book('Lo Hobbit', [['Thorin Scudodiquercia', 2], ['Smaug', 1], ['Beorn', 3]]);
  book('Le cronache di Narnia', [['Aslan', 1], ['Lucy Pevensie', 2], ['Edmund Pevensie', 2], ['Il signor Tumnus', 2], ['La Strega Bianca', 2]]);
  book('Dracula', [['Jonathan Harker', 2], ['Mina Harker', 2], ['Abraham Van Helsing', 1], ['Renfield', 3]]);
  book('Frankenstein', [['Victor Frankenstein', 1], ['Elizabeth Lavenza', 3]]);
  book('Il ritratto di Dorian Gray', [['Dorian Gray', 1], ['Lord Henry Wotton', 2], ['Basil Hallward', 2], ['Sibyl Vane', 3]]);
  book('Il conte di Montecristo', [['Edmond Dantès', 1], ['Abate Faria', 2], ['Mercédès', 3], ['Fernand Mondego', 3]]);
  book('I tre moschettieri', [['D\'Artagnan', 1], ['Athos', 1], ['Porthos', 1], ['Aramis', 1], ['Milady', 2], ['Constance Bonacieux', 3]]);
  book('I miserabili', [['Jean Valjean', 1], ['Javert', 1], ['Cosette', 1], ['Fantine', 2], ['Gavroche', 2], ['Marius Pontmercy', 3], ['Thénardier', 3]]);
  book('Notre-Dame de Paris', [['Quasimodo', 1], ['Esmeralda', 1], ['Claude Frollo', 2], ['Febo di Châteaupers', 3]]);
  book('Madame Bovary', [['Emma Bovary', 1], ['Charles Bovary', 2], ['Monsieur Homais', 3]]);
  book('Il rosso e il nero', [['Julien Sorel', 3], ['Madame de Rênal', 3]]);
  book('Il giro del mondo in 80 giorni', [['Phileas Fogg', 1], ['Passepartout', 1], ['Detective Fix', 3], ['Aouda', 3]]);
  book('Ventimila leghe sotto i mari', [['Professor Aronnax', 3], ['Ned Land', 2]]);
  book('Viaggio al centro della Terra', [['Professor Lidenbrock', 3], ['Axel', 3]]);
  book('Delitto e castigo', [['Raskol\'nikov', 1], ['Sonja Marmeladova', 3], ['Porfirij Petrovič', 3], ['Svidrigajlov', 3]]);
  book('I fratelli Karamazov', [['Alëša Karamazov', 2], ['Ivan Karamazov', 2], ['Dmitrij Karamazov', 2], ['Smerdjakov', 3], ['Grušen\'ka', 3]]);
  book('L\'idiota', [['Principe Myškin', 2], ['Nastas\'ja Filippovna', 3]]);
  book('Anna Karenina', [['Anna Karenina', 1], ['Aleksej Vronskij', 2], ['Konstantin Levin', 2], ['Kitty Ščerbackaja', 3]]);
  book('Guerra e pace', [['Pierre Bezuchov', 1], ['Natasha Rostova', 1], ['Andrej Bolkonskij', 2], ['Nikolaj Rostov', 3], ['Anatol\' Kuragin', 3]]);
  book('Il maestro e Margherita', [['Woland', 2], ['Behemoth', 3]]);
  book('I dolori del giovane Werther', [['Werther', 1], ['Lotte', 3]]);
  book('Faust', [['Mefistofele', 1], ['Gretchen', 2]]);
  book('Don Chisciotte della Mancia', [['Sancho Panza', 1], ['Dulcinea del Toboso', 1], ['Ronzinante', 1]]);
  book('Il Decameron', [['Ser Ciappelletto', 2], ['Calandrino', 2], ['Federigo degli Alberighi', 3], ['Griselda', 3], ['Frate Cipolla', 3], ['Andreuccio da Perugia', 3]]);
  book('Orlando furioso', [['Angelica', 1], ['Ruggiero', 2], ['Bradamante', 2], ['Astolfo', 2], ['Rodomonte', 3], ['Medoro', 3]]);
  book('Gerusalemme liberata', [['Clorinda', 2], ['Armida', 2], ['Erminia', 3], ['Argante', 3]]);
  book('Iliade', [['Achille', 1], ['Ettore', 1], ['Patroclo', 2], ['Priamo', 2], ['Andromaca', 2], ['Briseide', 3]]);
  book('Odissea', [['Penelope', 1], ['Telemaco', 1], ['Polifemo', 1], ['Circe', 1], ['Calipso', 2], ['Nausicaa', 2], ['Argo (il cane)', 3]]);
  book('Eneide', [['Turno', 3], ['Lavinia', 3], ['Palinuro', 3]]);
  book('Amleto', [['Ofelia', 1], ['Polonio', 2], ['Laerte', 3], ['Rosencrantz', 3]]);
  book('Otello', [['Iago', 1], ['Desdemona', 1], ['Emilia', 3]]);
  book('Macbeth', [['Lady Macbeth', 1], ['Banquo', 2], ['Macduff', 2], ['Re Duncano', 3]]);
  book('Romeo e Giulietta', [['Mercuzio', 2], ['Tebaldo', 2], ['Frate Lorenzo', 3], ['La Balia', 3]]);
  book('Re Lear', [['Cordelia', 2], ['Gloucester', 3]]);
  book('Il mercante di Venezia', [['Shylock', 1], ['Porzia', 2], ['Bassanio', 3]]);
  book('Sogno di una notte di mezza estate', [['Puck', 1], ['Oberon', 2], ['Titania', 2], ['Bottom', 3]]);
  book('La tempesta', [['Prospero', 2], ['Calibano', 2], ['Ariel', 2], ['Miranda', 3]]);
  book('La bisbetica domata', [['Petruchio', 3]]);
  book('La dodicesima notte', [['Viola', 3], ['Malvolio', 3]]);
  book('Il Piccolo Principe', [['La Volpe', 1], ['La Rosa', 1], ['Il Lampionaio', 2], ['Il Geografo', 3], ['Il Vanitoso', 3]]);
  book('Peter Pan', [['Capitan Uncino', 1], ['Wendy Darling', 1], ['Campanellino', 1], ['Spugna', 2]]);
  book('Il meraviglioso mago di Oz', [['Dorothy Gale', 1], ['Lo Spaventapasseri', 1], ['L\'Uomo di Latta', 1], ['Il Leone Codardo', 1]]);
  book('Heidi', [['Heidi', 1], ['Peter il capraio', 2], ['Clara Sesemann', 2], ['Fräulein Rottenmeier', 3]]);
  book('Anna dai capelli rossi', [['Anna Shirley', 1], ['Marilla Cuthbert', 3], ['Gilbert Blythe', 2], ['Diana Barry', 3]]);
  book('Piccole donne', [['Jo March', 1], ['Meg March', 2], ['Beth March', 2], ['Amy March', 2], ['Laurie', 3]]);
  book('Il libro della giungla', [['Mowgli', 1], ['Baloo', 1], ['Bagheera', 1], ['Shere Khan', 1], ['Kaa', 2], ['Akela', 3]]);
  book('Pippi Calzelunghe', [['Pippi Calzelunghe', 1], ['Annika', 3], ['Signor Nilsson', 3]]);
  book('La fabbrica di cioccolato', [['Charlie Bucket', 1], ['Willy Wonka', 1], ['Veruca Salt', 2], ['Augustus Gloop', 2], ['Gli Umpa-Lumpa', 2]]);
  book('Momo', [['Beppo Spazzino', 3], ['Gigi Cicerone', 3], ['I Signori Grigi', 2]]);
  book('Il giardino segreto', [['Mary Lennox', 3], ['Colin Craven', 3], ['Dickon', 3]]);
  book('La capanna dello zio Tom', [['Zio Tom', 1], ['Simon Legree', 3]]);
  book('Uomini e topi', [['Lennie Small', 2], ['George Milton', 2]]);
  book('Furore', [['Tom Joad', 2]]);
  book('Il vecchio e il mare', [['Santiago', 1], ['Manolin', 3]]);
  book('Per chi suona la campana', [['Robert Jordan', 2], ['Pilar', 3]]);
  book('Addio alle armi', [['Frederic Henry', 3], ['Catherine Barkley', 3]]);
  book('Il processo', [['Josef K.', 2]]);
  book('La metamorfosi', [['Gregor Samsa', 1]]);
  book('Lo straniero', [['Meursault', 2]]);
  book('La peste', [['Dottor Rieux', 3]]);
  book('Ulisse', [['Leopold Bloom', 2], ['Molly Bloom', 3]]);
  book('Lolita', [['Humbert Humbert', 2]]);
  book('Cent\'anni di solitudine', [['Aureliano Buendía', 2], ['Úrsula Iguarán', 3], ['José Arcadio Buendía', 3]]);
  book('L\'amore ai tempi del colera', [['Florentino Ariza', 3], ['Fermina Daza', 3]]);

  // ===== Pseudonimi: nome d'arte → vero nome =====
  const pseudo = items(['name', 'd', 'vero'], [
    ['Carlo Collodi', 1, 'Carlo Lorenzini'],
    ['Italo Svevo', 2, 'Ettore Schmitz'],
    ['Alberto Moravia', 2, 'Alberto Pincherle'],
    ['Trilussa', 3, 'Carlo Alberto Salustri'],
    ['Vamba', 3, 'Luigi Bertelli'],
    ['Umberto Saba', 3, 'Umberto Poli'],
    ['Pitigrilli', 3, 'Dino Segre'],
    ['Curzio Malaparte', 3, 'Kurt Erich Suckert'],
    ['Ignazio Silone', 3, 'Secondino Tranquilli'],
    ['Metastasio', 3, 'Pietro Trapassi'],
    ['Silvio D\'Arzo', 3, 'Ezio Comparoni'],
    ['Cristina Campo', 3, 'Vittoria Guerrini'],
    ['Molière', 2, 'Jean-Baptiste Poquelin'],
    ['Voltaire', 2, 'François-Marie Arouet'],
    ['Stendhal', 3, 'Henri Beyle'],
    ['George Orwell', 1, 'Eric Arthur Blair'],
    ['Mark Twain', 1, 'Samuel Langhorne Clemens'],
    ['Lewis Carroll', 2, 'Charles Lutwidge Dodgson'],
    ['George Eliot', 3, 'Mary Ann Evans'],
    ['Pablo Neruda', 3, 'Ricardo Neftalí Reyes'],
    ['Gabriela Mistral', 3, 'Lucila Godoy Alcayaga'],
    ['Anatole France', 3, 'Jacques Anatole Thibault'],
    ['George Sand', 2, 'Aurore Dupin'],
    ['Maksim Gor\'kij', 3, 'Aleksej Peškov'],
    ['O. Henry', 3, 'William Sydney Porter'],
    ['Isak Dinesen', 3, 'Karen Blixen'],
    ['Joseph Conrad', 3, 'Józef Korzeniowski'],
    ['Paul Celan', 3, 'Paul Antschel'],
    ['Novalis', 3, 'Friedrich von Hardenberg'],
    ['Saki', 3, 'Hector Hugh Munro'],
    ['John le Carré', 2, 'David Cornwell'],
    ['Richard Bachman', 2, 'Stephen King'],
    ['Robert Galbraith', 1, 'J. K. Rowling'],
    ['Lemony Snicket', 3, 'Daniel Handler'],
    ['Currer Bell', 3, 'Charlotte Brontë'],
    ['Ellis Bell', 3, 'Emily Brontë'],
    ['Acton Bell', 3, 'Anne Brontë'],
    ['Pierre Loti', 3, 'Julien Viaud'],
  ]);

  // ===== Premio Strega: libro, autore, anno =====
  const strega = items(['name', 'd', 'autore', 'anno'], [
    ['Tempo di uccidere', 3, 'Ennio Flaiano', 1947],
    ['La bella estate', 2, 'Cesare Pavese', 1950],
    ['L\'isola di Arturo', 3, 'Elsa Morante', 1957],
    ['Il Gattopardo', 2, 'Giuseppe Tomasi di Lampedusa', 1959],
    ['Lessico famigliare', 2, 'Natalia Ginzburg', 1963],
    ['La chiave a stella', 2, 'Primo Levi', 1979],
    ['Il nome della rosa', 1, 'Umberto Eco', 1981],
    ['Le menzogne della notte', 3, 'Gesualdo Bufalino', 1988],
    ['La chimera', 3, 'Sebastiano Vassalli', 1990],
    ['Bella vita e guerre altrui di Mr Pyle gentiluomo', 3, 'Alessandro Barbero', 1996],
    ['Microcosmi', 3, 'Claudio Magris', 1997],
    ['Via Gemito', 3, 'Domenico Starnone', 2001],
    ['Non ti muovere', 2, 'Margaret Mazzantini', 2002],
    ['Vita', 3, 'Melania Mazzucco', 2003],
    ['Il dolore perfetto', 3, 'Ugo Riccarelli', 2004],
    ['Il viaggiatore notturno', 3, 'Maurizio Maggiani', 2005],
    ['Caos calmo', 2, 'Sandro Veronesi', 2006],
    ['Come Dio comanda', 2, 'Niccolò Ammaniti', 2007],
    ['La solitudine dei numeri primi', 1, 'Paolo Giordano', 2008],
    ['Stabat Mater', 3, 'Tiziano Scarpa', 2009],
    ['Canale Mussolini', 3, 'Antonio Pennacchi', 2010],
    ['Storia della mia gente', 3, 'Edoardo Nesi', 2011],
    ['Inseparabili', 3, 'Alessandro Piperno', 2012],
    ['Resistere non serve a niente', 3, 'Walter Siti', 2013],
    ['Il desiderio di essere come tutti', 3, 'Francesco Piccolo', 2014],
    ['La ferocia', 3, 'Nicola Lagioia', 2015],
    ['La scuola cattolica', 3, 'Edoardo Albinati', 2016],
    ['Le otto montagne', 2, 'Paolo Cognetti', 2017],
    ['La ragazza con la Leica', 3, 'Helena Janeczek', 2018],
    ['M. Il figlio del secolo', 2, 'Antonio Scurati', 2019],
    ['Il colibrì', 2, 'Sandro Veronesi', 2020],
    ['Due vite', 3, 'Emanuele Trevi', 2021],
    ['Spatriati', 3, 'Mario Desiati', 2022],
    ['Come d\'aria', 3, 'Ada d\'Adamo', 2023],
    ['L\'età fragile', 3, 'Donatella Di Pietrantonio', 2024],
  ]);

  // ===== Correnti e movimenti letterari =====
  const correnti = items(['name', 'd', 'corrente'], [
    ['Giovanni Verga', 1, 'Verismo'], ['Luigi Capuana', 2, 'Verismo'], ['Federico De Roberto', 3, 'Verismo'],
    ['Filippo Tommaso Marinetti', 1, 'Futurismo'], ['Vladimir Majakovskij', 3, 'Futurismo'],
    ['Guido Gozzano', 2, 'Crepuscolarismo'], ['Sergio Corazzini', 3, 'Crepuscolarismo'], ['Marino Moretti', 3, 'Crepuscolarismo'],
    ['Salvatore Quasimodo', 2, 'Ermetismo'], ['Mario Luzi', 3, 'Ermetismo'], ['Alfonso Gatto', 3, 'Ermetismo'], ['Leonardo Sinisgalli', 3, 'Ermetismo'],
    ['Emilio Praga', 3, 'Scapigliatura'], ['Arrigo Boito', 3, 'Scapigliatura'], ['Iginio Ugo Tarchetti', 3, 'Scapigliatura'], ['Carlo Dossi', 3, 'Scapigliatura'],
    ['Giuseppe Parini', 2, 'Illuminismo'], ['Cesare Beccaria', 2, 'Illuminismo'], ['Pietro Verri', 3, 'Illuminismo'], ['Voltaire', 1, 'Illuminismo'], ['Denis Diderot', 3, 'Illuminismo'],
    ['Alessandro Manzoni', 1, 'Romanticismo'], ['Giovanni Berchet', 3, 'Romanticismo'], ['Tommaso Grossi', 3, 'Romanticismo'], ['Silvio Pellico', 2, 'Romanticismo'], ['Lord Byron', 2, 'Romanticismo'], ['Novalis', 3, 'Romanticismo'],
    ['Gabriele D\'Annunzio', 1, 'Decadentismo'], ['Giovanni Pascoli', 2, 'Decadentismo'], ['Oscar Wilde', 2, 'Decadentismo'], ['Paul Verlaine', 3, 'Decadentismo'], ['Joris-Karl Huysmans', 3, 'Decadentismo'],
    ['Vasco Pratolini', 3, 'Neorealismo'], ['Elio Vittorini', 3, 'Neorealismo'], ['Carlo Levi', 3, 'Neorealismo'],
    ['Émile Zola', 2, 'Naturalismo'], ['Guy de Maupassant', 2, 'Naturalismo'], ['Edmond de Goncourt', 3, 'Naturalismo'],
    ['André Breton', 3, 'Surrealismo'], ['Paul Éluard', 3, 'Surrealismo'], ['Louis Aragon', 3, 'Surrealismo'], ['Philippe Soupault', 3, 'Surrealismo'],
    ['Jack Kerouac', 2, 'Beat Generation'], ['Allen Ginsberg', 3, 'Beat Generation'], ['William S. Burroughs', 3, 'Beat Generation'],
    ['Guido Guinizzelli', 3, 'Dolce stil novo'], ['Guido Cavalcanti', 3, 'Dolce stil novo'], ['Cino da Pistoia', 3, 'Dolce stil novo'], ['Lapo Gianni', 3, 'Dolce stil novo'],
    ['Giacomo da Lentini', 3, 'Scuola siciliana'], ['Guido delle Colonne', 3, 'Scuola siciliana'], ['Rinaldo d\'Aquino', 3, 'Scuola siciliana'],
    ['Cecco Angiolieri', 3, 'Poesia comico-realistica'], ['Rustico Filippi', 3, 'Poesia comico-realistica'], ['Folgore da San Gimignano', 3, 'Poesia comico-realistica'],
    ['Agnolo Poliziano', 3, 'Umanesimo'], ['Lorenzo Valla', 3, 'Umanesimo'], ['Pico della Mirandola', 3, 'Umanesimo'], ['Leon Battista Alberti', 3, 'Umanesimo'],
  ]);

  // ===== Poesie, raccolte e opere in versi: autore =====
  const poesie = items(['name', 'd', 'autore'], [
    ['L\'infinito', 1, 'Giacomo Leopardi'], ['A Silvia', 1, 'Giacomo Leopardi'], ['Il sabato del villaggio', 2, 'Giacomo Leopardi'], ['La quiete dopo la tempesta', 2, 'Giacomo Leopardi'],
    ['Il passero solitario', 2, 'Giacomo Leopardi'], ['La ginestra', 2, 'Giacomo Leopardi'], ['Canto notturno di un pastore errante dell\'Asia', 2, 'Giacomo Leopardi'], ['A se stesso', 3, 'Giacomo Leopardi'], ['Alla luna', 3, 'Giacomo Leopardi'], ['Le ricordanze', 3, 'Giacomo Leopardi'],
    ['A Zacinto', 2, 'Ugo Foscolo'], ['Alla sera', 2, 'Ugo Foscolo'], ['In morte del fratello Giovanni', 3, 'Ugo Foscolo'],
    ['Il cinque maggio', 1, 'Alessandro Manzoni'], ['Marzo 1821', 3, 'Alessandro Manzoni'], ['Adelchi', 2, 'Alessandro Manzoni'], ['Il conte di Carmagnola', 3, 'Alessandro Manzoni'],
    ['Pianto antico', 2, 'Giosuè Carducci'], ['San Martino', 2, 'Giosuè Carducci'], ['Davanti San Guido', 2, 'Giosuè Carducci'], ['Nevicata', 3, 'Giosuè Carducci'], ['Alla stazione in una mattina d\'autunno', 3, 'Giosuè Carducci'], ['Inno a Satana', 3, 'Giosuè Carducci'], ['Traversando la Maremma toscana', 3, 'Giosuè Carducci'],
    ['X Agosto', 1, 'Giovanni Pascoli'], ['Il gelsomino notturno', 2, 'Giovanni Pascoli'], ['Lavandare', 2, 'Giovanni Pascoli'], ['Novembre', 2, 'Giovanni Pascoli'], ['Il lampo', 3, 'Giovanni Pascoli'], ['Il tuono', 3, 'Giovanni Pascoli'], ['La mia sera', 3, 'Giovanni Pascoli'], ['La cavallina storna', 3, 'Giovanni Pascoli'], ['L\'assiuolo', 2, 'Giovanni Pascoli'], ['Temporale', 3, 'Giovanni Pascoli'], ['Digitale purpurea', 3, 'Giovanni Pascoli'], ['Myricae', 2, 'Giovanni Pascoli'], ['Il fanciullino', 2, 'Giovanni Pascoli'], ['Canti di Castelvecchio', 3, 'Giovanni Pascoli'],
    ['La pioggia nel pineto', 1, 'Gabriele D\'Annunzio'], ['I pastori', 2, 'Gabriele D\'Annunzio'], ['La sera fiesolana', 3, 'Gabriele D\'Annunzio'], ['Alcyone', 2, 'Gabriele D\'Annunzio'], ['Notturno', 3, 'Gabriele D\'Annunzio'], ['La figlia di Iorio', 3, 'Gabriele D\'Annunzio'],
    ['Veglia', 2, 'Giuseppe Ungaretti'], ['Fratelli', 2, 'Giuseppe Ungaretti'], ['San Martino del Carso', 2, 'Giuseppe Ungaretti'], ['Soldati', 2, 'Giuseppe Ungaretti'], ['Mattina', 1, 'Giuseppe Ungaretti'], ['I fiumi', 3, 'Giuseppe Ungaretti'], ['Sono una creatura', 3, 'Giuseppe Ungaretti'], ['Il porto sepolto', 3, 'Giuseppe Ungaretti'], ['Sentimento del tempo', 3, 'Giuseppe Ungaretti'],
    ['Non chiederci la parola', 2, 'Eugenio Montale'], ['Meriggiare pallido e assorto', 2, 'Eugenio Montale'], ['Spesso il male di vivere ho incontrato', 2, 'Eugenio Montale'], ['Cigola la carrucola del pozzo', 3, 'Eugenio Montale'], ['I limoni', 3, 'Eugenio Montale'], ['Forse un mattino andando', 3, 'Eugenio Montale'], ['La casa dei doganieri', 3, 'Eugenio Montale'], ['Le occasioni', 3, 'Eugenio Montale'], ['La bufera e altro', 3, 'Eugenio Montale'], ['Satura', 3, 'Eugenio Montale'],
    ['Ed è subito sera', 1, 'Salvatore Quasimodo'], ['Alle fronde dei salici', 2, 'Salvatore Quasimodo'], ['Uomo del mio tempo', 2, 'Salvatore Quasimodo'], ['Milano, agosto 1943', 3, 'Salvatore Quasimodo'], ['Acque e terre', 3, 'Salvatore Quasimodo'],
    ['La capra', 2, 'Umberto Saba'], ['A mia moglie', 3, 'Umberto Saba'], ['Amai', 3, 'Umberto Saba'], ['Goal', 3, 'Umberto Saba'],
    ['La signorina Felicita', 3, 'Guido Gozzano'], ['L\'amica di nonna Speranza', 3, 'Guido Gozzano'],
    ['S\'i\' fosse foco, arderei \'l mondo', 2, 'Cecco Angiolieri'],
    ['Al cor gentil rempaira sempre amore', 3, 'Guido Guinizzelli'],
    ['Tanto gentile e tanto onesta pare', 2, 'Dante Alighieri'], ['Guido, i\' vorrei che tu e Lapo ed io', 3, 'Dante Alighieri'], ['Vita nuova', 2, 'Dante Alighieri'], ['Convivio', 3, 'Dante Alighieri'], ['De vulgari eloquentia', 3, 'Dante Alighieri'], ['Monarchia', 3, 'Dante Alighieri'],
    ['Solo et pensoso i più deserti campi', 2, 'Francesco Petrarca'], ['Chiare, fresche et dolci acque', 2, 'Francesco Petrarca'], ['Erano i capei d\'oro a l\'aura sparsi', 3, 'Francesco Petrarca'], ['Pace non trovo, et non ò da far guerra', 2, 'Francesco Petrarca'], ['Italia mia, benché \'l parlar sia indarno', 3, 'Francesco Petrarca'], ['Secretum', 3, 'Francesco Petrarca'], ['Trionfi', 3, 'Francesco Petrarca'],
    ['Trionfo di Bacco e Arianna', 2, 'Lorenzo de\' Medici'],
    ['Tacito orror di solitaria selva', 3, 'Vittorio Alfieri'],
    ['Il canto degli Italiani', 1, 'Goffredo Mameli'],
    ['La ninna nanna de la guerra', 3, 'Trilussa'],
    ['Er giorno der giudizzio', 3, 'Giuseppe Gioachino Belli'],
    ['L\'albatro', 2, 'Charles Baudelaire'], ['I fiori del male', 2, 'Charles Baudelaire'], ['Corrispondenze', 3, 'Charles Baudelaire'],
    ['Il battello ebbro', 3, 'Arthur Rimbaud'], ['Vocali', 3, 'Arthur Rimbaud'],
    ['Canzone d\'autunno', 3, 'Paul Verlaine'],
    ['Il corvo', 2, 'Edgar Allan Poe'],
    ['Foglie d\'erba', 2, 'Walt Whitman'], ['Canto di me stesso', 3, 'Walt Whitman'],
    ['La terra desolata', 2, 'T. S. Eliot'], ['Il canto d\'amore di J. Alfred Prufrock', 3, 'T. S. Eliot'], ['Quattro quartetti', 3, 'T. S. Eliot'],
    ['La seconda venuta', 3, 'William Butler Yeats'],
    ['Ode a un usignolo', 3, 'John Keats'], ['Ode su un\'urna greca', 3, 'John Keats'],
    ['Ozymandias', 3, 'Percy Bysshe Shelley'],
    ['La ballata del vecchio marinaio', 3, 'Samuel Taylor Coleridge'],
    ['Il pellegrinaggio del giovane Aroldo', 3, 'Lord Byron'],
    ['Il re degli elfi', 3, 'Johann Wolfgang von Goethe'],
    ['Ode alla gioia', 2, 'Friedrich Schiller'],
    ['Il libro dei canti', 3, 'Heinrich Heine'],
    ['Venti poesie d\'amore e una canzone disperata', 2, 'Pablo Neruda'],
    ['Romancero gitano', 3, 'Federico García Lorca'],
    ['Evgenij Onegin', 2, 'Aleksandr Puškin'],
    ['La strada non presa', 3, 'Robert Frost'],
    ['Non andartene docile in quella buona notte', 3, 'Dylan Thomas'],
    ['Il ponte Mirabeau', 3, 'Guillaume Apollinaire'],
    ['Il pomeriggio di un fauno', 3, 'Stéphane Mallarmé'],
    ['Il cimitero marino', 3, 'Paul Valéry'],
    ['Elegie duinesi', 3, 'Rainer Maria Rilke'], ['Sonetti a Orfeo', 3, 'Rainer Maria Rilke'],
    ['A coloro che verranno', 3, 'Bertolt Brecht'],
  ]).filter((o) => !NOAUT.has(o.name));

  // ===== Altre opere (narrativa, teatro, saggi): autore =====
  const opere = [];
  const by = (autore, rows) => rows.forEach(([name, d]) => { if (!NOAUT.has(name)) opere.push({ name, d, autore }); });
  by('Dante Alighieri', []);
  by('Niccolò Machiavelli', [['La Mandragola', 2], ['Discorsi sopra la prima deca di Tito Livio', 3], ['L\'arte della guerra', 3], ['Belfagor arcidiavolo', 3]]);
  by('Giovanni Boccaccio', [['Teseida', 3], ['Filostrato', 3], ['Elegia di Madonna Fiammetta', 3], ['Corbaccio', 3], ['Ninfale fiesolano', 3]]);
  by('Torquato Tasso', [['Aminta', 2], ['Gerusalemme conquistata', 3]]);
  by('Ludovico Ariosto', [['Cinque canti', 3], ['Satire', 3]]);
  by('Baldassarre Castiglione', [['Il Cortegiano', 2]]);
  by('Benvenuto Cellini', [['Vita di Benvenuto Cellini', 3]]);
  by('Giorgio Vasari', [['Le vite de\' più eccellenti pittori, scultori e architettori', 2]]);
  by('Galileo Galilei', [['Il Saggiatore', 2], ['Dialogo sopra i due massimi sistemi del mondo', 2], ['Sidereus Nuncius', 3]]);
  by('Giambattista Vico', [['La scienza nuova', 3]]);
  by('Cesare Beccaria', [['Dei delitti e delle pene', 2]]);
  by('Carlo Goldoni', [['La locandiera', 1], ['Il servitore di due padroni', 1], ['Le baruffe chiozzotte', 2], ['I rusteghi', 3], ['La bottega del caffè', 3], ['Il bugiardo', 3]]);
  by('Vittorio Alfieri', [['Saul', 2], ['Mirra', 3], ['Della tirannide', 3]]);
  by('Giuseppe Parini', [['Le odi', 3]]);
  by('Pietro Metastasio', [['Didone abbandonata', 3], ['Artaserse', 3]]);
  by('Silvio Pellico', [['Le mie prigioni', 2]]);
  by('Ippolito Nievo', [['Le confessioni di un italiano', 2]]);
  by('Massimo d\'Azeglio', [['Ettore Fieramosca', 2], ['I miei ricordi', 3]]);
  by('Antonio Fogazzaro', [['Piccolo mondo antico', 2], ['Malombra', 3], ['Il Santo', 3], ['Daniele Cortis', 3]]);
  by('Luigi Capuana', [['Il marchese di Roccaverdina', 3], ['Giacinta', 3]]);
  by('Federico De Roberto', [['I Viceré', 3]]);
  by('Matilde Serao', [['Il ventre di Napoli', 3], ['Il paese di Cuccagna', 3]]);
  by('Giovanni Verga', [['Vita dei campi', 2], ['Novelle rusticane', 2], ['Storia di una capinera', 2], ['Rosso Malpelo', 1], ['La Lupa', 2], ['Cavalleria rusticana', 2], ['L\'amante di Gramigna', 3], ['La roba', 3], ['Eva', 3]]);
  by('Luigi Pirandello', [['Enrico IV', 2], ['Così è (se vi pare)', 2], ['Il berretto a sonagli', 3], ['Liolà', 3], ['Il giuoco delle parti', 3], ['Novelle per un anno', 2], ['Quaderni di Serafino Gubbio operatore', 3], ['L\'esclusa', 3], ['I vecchi e i giovani', 3], ['La giara', 2], ['Ciàula scopre la luna', 2], ['Il treno ha fischiato', 2], ['La patente', 3], ['L\'uomo dal fiore in bocca', 3], ['Pensaci, Giacomino!', 3], ['Questa sera si recita a soggetto', 3]]);
  by('Italo Svevo', [['Una vita', 2], ['Senilità', 2], ['Corto viaggio sentimentale', 3]]);
  by('Grazia Deledda', [['Canne al vento', 2], ['Elias Portolu', 3], ['Cosima', 3], ['Marianna Sirca', 3], ['La madre', 3], ['Cenere', 3]]);
  by('Gabriele D\'Annunzio', [['Il trionfo della morte', 3], ['Le vergini delle rocce', 3], ['Il fuoco', 3], ['L\'innocente', 3], ['Forse che sì forse che no', 3]]);
  by('Edmondo De Amicis', [['Marocco', 3], ['Sull\'oceano', 3], ['Il romanzo d\'un maestro', 3], ['Amore e ginnastica', 3]]);
  by('Carlo Collodi', [['Giannettino', 3], ['Minuzzolo', 3], ['Occhi e nasi', 3], ['I racconti delle fate', 3]]);
  by('Emilio Salgari', [['I misteri della jungla nera', 2], ['Il Corsaro Rosso', 2], ['I pirati della Malesia', 2], ['Il re del mare', 3], ['La montagna di luce', 3], ['I minatori dell\'Alaska', 3], ['La regina dei Caraibi', 3]]);
  by('Carlo Emilio Gadda', [['Quer pasticciaccio brutto de via Merulana', 2], ['La cognizione del dolore', 3], ['L\'Adalgisa', 3], ['Eros e Priapo', 3]]);
  by('Curzio Malaparte', [['Kaputt', 2], ['La pelle', 2], ['Maledetti toscani', 3], ['Il sole è cieco', 3]]);
  by('Ignazio Silone', [['Fontamara', 2], ['Vino e pane', 2], ['Il seme sotto la neve', 3], ['Uscita di sicurezza', 3]]);
  by('Vitaliano Brancati', [['Il bell\'Antonio', 2], ['Don Giovanni in Sicilia', 3], ['Paolo il caldo', 3]]);
  by('Corrado Alvaro', [['Gente in Aspromonte', 3]]);
  by('Ennio Flaiano', [['Un marziano a Roma', 3], ['Diario notturno', 3]]);
  by('Carlo Cassola', [['Il taglio del bosco', 3], ['Fausto e Anna', 3]]);
  by('Elio Vittorini', [['Conversazione in Sicilia', 2], ['Uomini e no', 2], ['Il garofano rosso', 3], ['Le donne di Messina', 3]]);
  by('Cesare Pavese', [['Lavorare stanca', 2], ['Paesi tuoi', 3], ['Il compagno', 3], ['La casa in collina', 2], ['Il diavolo sulle colline', 3], ['Tra donne sole', 3], ['Dialoghi con Leucò', 3], ['Il mestiere di vivere', 2], ['Verrà la morte e avrà i tuoi occhi', 2]]);
  by('Beppe Fenoglio', [['Il partigiano Johnny', 2], ['Una questione privata', 2], ['La malora', 3], ['I ventitre giorni della città di Alba', 3]]);
  by('Vasco Pratolini', [['Metello', 2], ['Cronache di poveri amanti', 3], ['Un eroe del nostro tempo', 3], ['Il quartiere', 3]]);
  by('Pier Paolo Pasolini', [['Ragazzi di vita', 1], ['Una vita violenta', 2], ['Le ceneri di Gramsci', 2], ['Scritti corsari', 2], ['Petrolio', 3], ['Lettere luterane', 3]]);
  by('Leonardo Sciascia', [['A ciascuno il suo', 2], ['Todo modo', 2], ['Il contesto', 3], ['Il consiglio d\'Egitto', 3], ['Candido ovvero un sogno fatto in Sicilia', 3], ['Una storia semplice', 3], ['L\'affaire Moro', 3], ['Le parrocchie di Regalpetra', 3]]);
  by('Italo Calvino', [['Fiabe italiane', 2], ['Palomar', 2], ['Lezioni americane', 2], ['Ultimo viene il corvo', 3], ['La giornata d\'uno scrutatore', 3], ['La speculazione edilizia', 3], ['Il castello dei destini incrociati', 3], ['Le cosmicomiche', 2], ['Ti con zero', 3], ['Una pietra sopra', 3]]);
  by('Dino Buzzati', [['Un amore', 2], ['Sessanta racconti', 2], ['Il segreto del Bosco Vecchio', 3], ['La boutique del mistero', 3], ['Il colombre', 2], ['I sette messaggeri', 3], ['La famosa invasione degli orsi in Sicilia', 1], ['Barnabo delle montagne', 3]]);
  by('Elsa Morante', [['Menzogna e sortilegio', 2], ['Aracoeli', 3], ['Il mondo salvato dai ragazzini', 3], ['Lo scialle andaluso', 3]]);
  by('Alberto Moravia', [['Il conformista', 2], ['Agostino', 2], ['Racconti romani', 2], ['La romana', 2], ['La disubbidienza', 3], ['Io e lui', 3], ['L\'attenzione', 3]]);
  by('Natalia Ginzburg', [['Caro Michele', 2], ['Le voci della sera', 3], ['Tutti i nostri ieri', 3], ['Valentino', 3], ['Sagittario', 3], ['La famiglia Manzoni', 3], ['Le piccole virtù', 3], ['La città e la casa', 3]]);
  by('Primo Levi', [['I sommersi e i salvati', 2], ['La chiave a stella', 2], ['Se non ora, quando?', 2], ['Storie naturali', 3], ['Vizio di forma', 3], ['Lilít e altri racconti', 3], ['L\'altrui mestiere', 3], ['Ad ora incerta', 3]]);
  by('Carlo Levi', [['L\'orologio', 3], ['Le parole sono pietre', 3], ['Paura della libertà', 3]]);
  by('Giorgio Bassani', [['Gli occhiali d\'oro', 2], ['L\'airone', 2], ['Dietro la porta', 3], ['Cinque storie ferraresi', 2], ['L\'odore del fieno', 3]]);
  by('Andrea Camilleri', [['La stagione della caccia', 2], ['Il birraio di Preston', 2], ['Il re di Girgenti', 3], ['La concessione del telefono', 2], ['Un filo di fumo', 3], ['La mossa del cavallo', 3], ['Il cane di terracotta', 2], ['La voce del violino', 2], ['Il ladro di merendine', 2], ['La gita a Tindari', 2], ['Il giro di boa', 3], ['La pazienza del ragno', 3], ['La vampa d\'agosto', 3], ['La scomparsa di Patò', 3], ['Riccardino', 3]]);
  by('Umberto Eco', [['Opera aperta', 3], ['Apocalittici e integrati', 2], ['Trattato di semiotica generale', 3], ['Lector in fabula', 3], ['Come si fa una tesi di laurea', 1], ['Diario minimo', 2], ['Numero zero', 2], ['La misteriosa fiamma della regina Loana', 3], ['L\'isola del giorno prima', 2], ['Storia della bellezza', 2], ['Dire quasi la stessa cosa', 3], ['Kant e l\'ornitorinco', 3], ['Cinque scritti morali', 3]]);
  by('Dario Fo', [['Mistero buffo', 1], ['Morte accidentale di un anarchico', 1], ['Non si paga! Non si paga!', 2], ['Clacson, trombette e pernacchi', 3], ['Il papa e la strega', 3], ['Johan Padan a la descoverta de le Americhe', 3], ['Manuale minimo dell\'attore', 3], ['Isabella, tre caravelle e un cacciaballe', 3]]);
  by('Oriana Fallaci', [['Lettera a un bambino mai nato', 1], ['Un uomo', 2], ['Insciallah', 2], ['Niente e così sia', 2], ['Intervista con la storia', 2], ['La rabbia e l\'orgoglio', 1], ['Il sesso inutile', 3], ['Penelope alla guerra', 3], ['Un cappello pieno di ciliegie', 3]]);
  by('Tiziano Terzani', [['Un indovino mi disse', 1], ['In Asia', 2], ['La porta proibita', 3], ['Lettere contro la guerra', 3], ['Un altro giro di giostra', 2], ['Buonanotte, signor Lenin', 3], ['Giai Phong!', 3], ['Fantasmi', 3]]);
  by('Antonio Tabucchi', [['Sostiene Pereira', 1], ['Notturno indiano', 2], ['Piazza d\'Italia', 3], ['Il filo dell\'orizzonte', 3], ['Requiem', 3], ['Tristano muore', 3], ['Sogni di sogni', 3]]);
  by('Claudio Magris', [['Danubio', 2], ['Alla cieca', 3], ['Un altro mare', 3], ['L\'infinito viaggiare', 3], ['Non luogo a procedere', 3], ['Livida luce dell\'alba', 3]]);
  by('Mario Rigoni Stern', [['Il sergente nella neve', 2], ['Storia di Tönle', 3], ['Il bosco degli urogalli', 3], ['Stagioni', 3]]);
  by('Luigi Meneghello', [['Libera nos a Malo', 3], ['I piccoli maestri', 3]]);
  by('Goffredo Parise', [['Il prete bello', 3], ['Il padrone', 3], ['Sillabario n. 1', 3]]);
  by('Luciano Bianciardi', [['La vita agra', 3], ['Il lavoro culturale', 3], ['L\'integrazione', 3]]);
  by('Susanna Tamaro', [['Per voce sola', 3], ['Anima mundi', 3], ['Cuore di ciccia', 3], ['Rispondimi', 3], ['Luisito', 3], ['Tobia e l\'angelo', 3]]);
  by('Alessandro Baricco', [['Castelli di rabbia', 2], ['Oceano mare', 2], ['Questa storia', 3], ['Senza sangue', 2], ['City', 2], ['Emmaus', 3], ['Mr Gwyn', 3], ['Smith & Wesson', 3], ['The Game', 2], ['Next', 3]]);
  by('Niccolò Ammaniti', [['Branchie', 3], ['Fango', 3], ['Ti prendo e ti porto via', 2], ['Che la festa cominci', 2], ['Io e te', 1], ['Anna', 2], ['Il bacio', 3]]);
  by('Paolo Giordano', [['Il corpo umano', 2], ['Il nero e l\'argento', 3], ['Divorare il cielo', 2], ['Nel contagio', 2], ['Tasmania', 2]]);
  by('Roberto Saviano', [['ZeroZeroZero', 2], ['La paranza dei bambini', 2], ['Bacio feroce', 3], ['Gridalo', 3]]);
  by('Elena Ferrante', [['L\'amore molesto', 2], ['I giorni dell\'abbandono', 2], ['La figlia oscura', 3], ['Storia del nuovo cognome', 2], ['Storia di chi fugge e di chi resta', 3], ['Storia della bambina perduta', 3], ['La vita bugiarda degli adulti', 2], ['La frantumaglia', 3]]);
  by('Michela Murgia', [['Il mondo deve sapere', 3], ['Accabadora', 1], ['Ave Mary', 2], ['Chiara', 3], ['Stai zitta', 2], ['Morgana', 3], ['God Save the Queer', 3], ['Tre ciotole', 2]]);
  by('Paolo Cognetti', [['Il ragazzo selvatico', 2], ['Sofia si veste sempre di nero', 3], ['Senza mai arrivare in cima', 3], ['La felicità del lupo', 2]]);
  by('Sandro Veronesi', [['Per dove parte questo treno allegro', 3], ['XY', 3], ['Terre rare', 3], ['Brucia Troia', 3], ['Un dolore normale', 3], ['Gli sfiorati', 3]]);
  by('Alessandro Piperno', [['Con le peggiori intenzioni', 3], ['Persecuzione', 3], ['Il fuoco amico dei ricordi', 3], ['Dove la storia finisce', 3]]);
  by('Antonio Scurati', [['M. L\'uomo della provvidenza', 2], ['M. Gli ultimi giorni dell\'Europa', 3], ['Il bambino che sognava la fine del mondo', 3], ['Il sopravvissuto', 3], ['Una storia romantica', 3], ['Gli anni che non stiamo vivendo', 3]]);
  by('Gianrico Carofiglio', [['Testimone inconsapevole', 2], ['Ad occhi chiusi', 2], ['Ragionevoli dubbi', 3], ['Il passato è una terra straniera', 3], ['Le perfezioni provvisorie', 3], ['La regola dell\'equilibrio', 3]]);
  by('Margaret Mazzantini', [['Venuto al mondo', 2], ['Mare al mattino', 3], ['Nessuno si salva da solo', 2], ['Il catino di zinco', 3], ['Splendore', 3]]);
  by('Erri De Luca', [['Montedidio', 2], ['Il giorno prima della felicità', 3], ['Tu, mio', 3], ['Il peso della farfalla', 3], ['Aceto, arcobaleno', 3], ['Solo andata', 3]]);
  // ---- autori stranieri
  by('Hans Christian Andersen', [['La sirenetta', 1], ['Il brutto anatroccolo', 1], ['La piccola fiammiferaia', 1], ['I vestiti nuovi dell\'imperatore', 1], ['La regina delle nevi', 1], ['Il soldatino di stagno', 2], ['Mignolina', 2], ['Le scarpette rosse', 2], ['L\'usignolo', 3], ['La principessa sul pisello', 2]]);
  by('Fratelli Grimm', [['Hänsel e Gretel', 1], ['Biancaneve', 1], ['Rapunzel', 1], ['I musicanti di Brema', 1], ['Il principe ranocchio', 2], ['Tremotino', 3], ['Il lupo e i sette capretti', 2], ['Il pescatore e sua moglie', 3]]);
  by('Charles Perrault', [['Il gatto con gli stivali', 1], ['Barbablù', 2], ['Pelle d\'Asino', 3], ['Riccardo Ciuffo', 3]]);
  by('Roald Dahl', [['Le streghe', 1], ['Il fantastico Signor Volpe', 2], ['La magica medicina', 2], ['James e la pesca gigante', 2], ['Gli Sporcelli', 3], ['Charlie e il grande ascensore di cristallo', 2], ['Storie impreviste', 3]]);
  by('Michael Ende', [['Jim Bottone e Lucas il macchinista', 2], ['Lo specchio nello specchio', 3]]);
  by('Astrid Lindgren', [['I fratelli Cuordileone', 2], ['Ronja figlia del brigante', 3], ['Karlsson sul tetto', 3]]);
  by('Gianni Rodari', [['Le avventure di Cipollino', 1], ['Gelsomino nel paese dei bugiardi', 2], ['C\'era due volte il barone Lamberto', 3], ['Il libro degli errori', 3], ['Il pianeta degli alberi di Natale', 3], ['Grammatica della fantasia', 2], ['Filastrocche in cielo e in terra', 2]]);
  by('Lewis Carroll', [['Attraverso lo specchio', 2], ['La caccia allo Snark', 3]]);
  by('Mark Twain', [['Le avventure di Huckleberry Finn', 1], ['Il principe e il povero', 2], ['Un americano alla corte di re Artù', 3]]);
  by('Louisa May Alcott', [['Piccoli uomini', 3], ['Le piccole donne crescono', 3]]);
  by('Rudyard Kipling', [['Kim', 2], ['Il secondo libro della giungla', 3], ['Racconti proprio così', 3], ['Capitani coraggiosi', 3]]);
  by('Jules Verne', [['Dalla Terra alla Luna', 1], ['Ventimila leghe sotto i mari', 1], ['Il giro del mondo in 80 giorni', 1], ['L\'isola misteriosa', 2], ['Michele Strogoff', 2], ['I figli del capitano Grant', 3], ['Cinque settimane in pallone', 2], ['Intorno alla Luna', 3], ['Il castello dei Carpazi', 3]]);
  by('Alexandre Dumas', [['Vent\'anni dopo', 2], ['Il visconte di Bragelonne', 3], ['La regina Margot', 2], ['Il tulipano nero', 3]]);
  by('Charles Dickens', [['Grandi speranze', 1], ['Racconto di due città', 2], ['Il circolo Pickwick', 2], ['Nicholas Nickleby', 3], ['Tempi difficili', 3], ['La piccola Dorrit', 3], ['Casa desolata', 3]]);
  by('Agatha Christie', [['Assassinio sul Nilo', 1], ['Il delitto di Roger Ackroyd', 2], ['Poirot a Styles Court', 2], ['Un cadavere in biblioteca', 2], ['Trappola per topi', 2], ['Assassinio nel campo di golf', 3]]);
  by('Arthur Conan Doyle', [['Il segno dei quattro', 2], ['La valle della paura', 3], ['Le avventure di Sherlock Holmes', 1], ['Il mondo perduto', 2], ['Il ritorno di Sherlock Holmes', 3]]);
  by('Jane Austen', [['Mansfield Park', 3], ['Persuasione', 3], ['L\'abbazia di Northanger', 3]]);
  by('Charlotte Brontë', [['Villette', 3], ['Il professore', 3], ['Shirley', 3]]);
  by('Robert Louis Stevenson', [['Il signore di Ballantrae', 3], ['Rapito', 3], ['La freccia nera', 3]]);
  by('Oscar Wilde', [['L\'importanza di chiamarsi Ernesto', 1], ['Il principe felice', 2], ['Il fantasma di Canterville', 2], ['Salomè', 3], ['Il ventaglio di Lady Windermere', 3], ['De profundis', 3]]);
  by('George Orwell', [['Omaggio alla Catalogna', 3], ['Senza un soldo a Parigi e a Londra', 3], ['La strada di Wigan Pier', 3], ['Una figlia di reverendo', 3]]);
  by('Aldous Huxley', [['Le porte della percezione', 3], ['Punto contrappunto', 3], ['L\'isola', 3]]);
  by('Virginia Woolf', [['La signora Dalloway', 1], ['Gita al faro', 2], ['Orlando', 2], ['Le onde', 3], ['Una stanza tutta per sé', 2]]);
  by('Joseph Conrad', [['Cuore di tenebra', 1], ['Lord Jim', 2], ['Il compagno segreto', 3], ['Nostromo', 3]]);
  by('James Joyce', [['Gente di Dublino', 2], ['Dedalus', 2], ['Finnegans Wake', 2], ['Esuli', 3]]);
  by('William Shakespeare', [['La dodicesima notte', 2], ['La tempesta', 1], ['Il mercante di Venezia', 1], ['Sogno di una notte di mezza estate', 1], ['Re Lear', 2], ['Giulio Cesare', 1], ['Molto rumore per nulla', 2], ['La bisbetica domata', 2], ['Come vi piace', 3], ['Antonio e Cleopatra', 2], ['Coriolano', 3], ['Il racconto d\'inverno', 3], ['Misura per misura', 3], ['Tito Andronico', 3], ['Riccardo III', 2], ['Enrico V', 3], ['Le allegre comari di Windsor', 3], ['Pene d\'amor perdute', 3], ['La commedia degli errori', 3]]);
  by('Molière', [['Il malato immaginario', 1], ['L\'avaro', 1], ['Il misantropo', 2], ['Tartufo', 1], ['Il borghese gentiluomo', 2], ['Don Giovanni o il convitato di pietra', 3], ['Le preziose ridicole', 3], ['La scuola delle mogli', 3]]);
  by('Victor Hugo', [['L\'uomo che ride', 3], ['I lavoratori del mare', 3], ['Novantatré', 3], ['Ruy Blas', 3], ['Hernani', 3], ['Il re si diverte', 3]]);
  by('Honoré de Balzac', [['Papà Goriot', 1], ['Eugénie Grandet', 2], ['Le illusioni perdute', 3], ['La pelle di zigrino', 3], ['La cugina Bette', 3], ['La commedia umana', 2]]);
  by('Gustave Flaubert', [['L\'educazione sentimentale', 3], ['Salambò', 3], ['Bouvard e Pécuchet', 3], ['Tre racconti', 3]]);
  by('Émile Zola', [['Nanà', 2], ['L\'ammazzatoio', 3], ['La bestia umana', 3], ['Il ventre di Parigi', 3], ['Thérèse Raquin', 3], ['Io accuso', 2]]);
  by('Marcel Proust', [['Alla ricerca del tempo perduto', 1], ['Dalla parte di Swann', 2], ['All\'ombra delle fanciulle in fiore', 3], ['Il tempo ritrovato', 3]]);
  by('Albert Camus', [['Il mito di Sisifo', 2], ['La caduta', 3], ['Caligola', 3], ['L\'uomo in rivolta', 3], ['Il primo uomo', 3]]);
  by('Jean-Paul Sartre', [['La nausea', 1], ['L\'essere e il nulla', 2], ['A porte chiuse', 2], ['Le mosche', 3], ['Le mani sporche', 3]]);
  by('Antoine de Saint-Exupéry', [['Volo di notte', 3], ['Terra degli uomini', 3], ['Pilota di guerra', 3]]);
  by('Lev Tolstoj', [['La morte di Ivan Il\'ič', 2], ['La sonata a Kreutzer', 3], ['Resurrezione', 3], ['Infanzia', 3], ['Hadži Murat', 3]]);
  by('Fëdor Dostoevskij', [['L\'idiota', 2], ['I demoni', 3], ['Memorie dal sottosuolo', 2], ['Il giocatore', 3], ['Le notti bianche', 2], ['L\'adolescente', 3], ['Povera gente', 3], ['Memorie dalla casa dei morti', 3]]);
  by('Anton Čechov', [['Il giardino dei ciliegi', 2], ['Tre sorelle', 2], ['Zio Vanja', 2], ['Il gabbiano', 2], ['La signora col cagnolino', 3], ['Il duello', 3]]);
  by('Nikolaj Gogol\'', [['Le anime morte', 2], ['Il cappotto', 2], ['Il naso', 2], ['Il revisore', 2], ['Taras Bul\'ba', 3]]);
  by('Aleksandr Puškin', [['La figlia del capitano', 3], ['La dama di picche', 3], ['Boris Godunov', 3]]);
  by('Michail Bulgakov', [['Il maestro e Margherita', 1], ['Cuore di cane', 2], ['Uova fatali', 3], ['La guardia bianca', 3]]);
  by('Franz Kafka', [['America', 3], ['Lettera al padre', 2], ['Nella colonia penale', 3], ['Un digiunatore', 3]]);
  by('Thomas Mann', [['I Buddenbrook', 2], ['La morte a Venezia', 1], ['Doctor Faustus', 3], ['Tonio Kröger', 3], ['Giuseppe e i suoi fratelli', 3]]);
  by('Hermann Hesse', [['Narciso e Boccadoro', 2], ['Demian', 2], ['Il giuoco delle perle di vetro', 3], ['Knulp', 3], ['Gertrud', 3]]);
  by('Johann Wolfgang von Goethe', [['Le affinità elettive', 3], ['Viaggio in Italia', 3], ['Gli anni di apprendistato di Wilhelm Meister', 3], ['Egmont', 3], ['Poesia e verità', 3]]);
  by('Friedrich Schiller', [['I masnadieri', 2], ['Guglielmo Tell', 1], ['Maria Stuarda', 3], ['Don Carlos', 3], ['Intrigo e amore', 3]]);
  by('Bertolt Brecht', [['L\'opera da tre soldi', 2], ['Madre Courage e i suoi figli', 2], ['Vita di Galileo', 2], ['L\'anima buona del Sezuan', 3]]);
  by('Miguel de Cervantes', [['Novelle esemplari', 3], ['La Galatea', 3]]);
  by('Federico García Lorca', [['Nozze di sangue', 2], ['La casa di Bernarda Alba', 2], ['Yerma', 3], ['Il pubblico', 3]]);
  by('Jorge Luis Borges', [['Finzioni', 2], ['L\'Aleph', 2], ['Storia universale dell\'infamia', 3], ['Il libro di sabbia', 3]]);
  by('Julio Cortázar', [['Il gioco del mondo', 2], ['Bestiario', 3], ['Storie di cronopios e di famas', 3]]);
  by('Gabriel García Márquez', [['L\'autunno del patriarca', 3], ['Il generale nel suo labirinto', 3], ['Dell\'amore e di altri demoni', 3], ['Vivere per raccontarla', 2], ['Nessuno scrive al colonnello', 2]]);
  by('Isabel Allende', [['Eva Luna', 3], ['Paula', 3], ['D\'amore e ombra', 3], ['Il piano infinito', 3]]);
  by('Paulo Coelho', [['Brida', 3], ['Il cammino di Santiago', 3], ['Veronika decide di morire', 2], ['Undici minuti', 2], ['Il Manoscritto ritrovato ad Accra', 3]]);
  by('Haruki Murakami', [['Norwegian Wood', 1], ['Kafka sulla spiaggia', 2], ['1Q84', 2], ['La ragazza dello Sputnik', 3], ['L\'uccello che girava le viti del mondo', 3], ['Dance Dance Dance', 3]]);
  by('Ernest Hemingway', [['Fiesta', 2], ['Verdi colline d\'Africa', 3], ['Isole nella corrente', 3], ['Festa mobile', 2], ['Avere e non avere', 3], ['I quarantanove racconti', 3]]);
  by('Francis Scott Fitzgerald', [['Tenera è la notte', 2], ['Di qua dal paradiso', 3], ['Belli e dannati', 3], ['Il curioso caso di Benjamin Button', 2]]);
  by('John Steinbeck', [['La valle dell\'Eden', 1], ['Pian della Tortilla', 3], ['Il lungo altopiano', 3], ['Al Dio sconosciuto', 3], ['Diario russo', 3]]);
  by('William Faulkner', [['L\'urlo e il furore', 2], ['Mentre morivo', 3], ['Santuario', 3], ['Assalonne, Assalonne!', 3], ['Luce d\'agosto', 3]]);
  by('Edgar Allan Poe', [['Il gatto nero', 1], ['La caduta della casa Usher', 2], ['Il cuore rivelatore', 2], ['I delitti della Rue Morgue', 2], ['Il barile di Amontillado', 3], ['Le avventure di Gordon Pym', 3], ['Il pozzo e il pendolo', 2]]);
  by('Herman Melville', [['Bartleby lo scrivano', 2], ['Billy Budd', 3], ['Typee', 3], ['Omoo', 3]]);
  by('Jack London', [['Martin Eden', 2], ['Il lupo di mare', 2], ['Il tallone di ferro', 3], ['Il vagabondo delle stelle', 3]]);
  by('Jack Kerouac', [['I vagabondi del Dharma', 3], ['Big Sur', 3], ['I sotterranei', 3]]);
  by('J. D. Salinger', [['Nove racconti', 3], ['Franny e Zooey', 3], ['Alzate l\'architrave, carpentieri', 3]]);
  by('Stephen King', [['Carrie', 1], ['Misery', 1], ['Il miglio verde', 1], ['Pet Sematary', 2], ['L\'ombra dello scorpione', 2], ['Le notti di Salem', 2], ['Cujo', 2], ['Christine', 2], ['Rita Hayworth e la redenzione di Shawshank', 3], ['22/11/63', 3], ['L\'acchiappasogni', 3]]);
  by('Dan Brown', [['Angeli e demoni', 1], ['Il simbolo perduto', 2], ['Inferno', 2], ['Origin', 2]]);
  by('J. R. R. Tolkien', [['Il Silmarillion', 2], ['I figli di Húrin', 3], ['Albero e foglia', 3], ['Racconti incompiuti', 3], ['Il fabbro di Wootton Major', 3]]);
  by('C. S. Lewis', [['Il leone, la strega e l\'armadio', 1], ['Il principe Caspian', 2], ['Il nipote del mago', 3], ['Le lettere di Berlicche', 3], ['Il viaggio del veliero', 3]]);
  by('Ray Bradbury', [['Cronache marziane', 2], ['L\'uomo illustrato', 2], ['Il popolo dell\'autunno', 3], ['Il vino d\'estate', 2]]);
  by('Isaac Asimov', [['Io, Robot', 1], ['Fondazione', 1], ['Il crollo della galassia centrale', 3], ['I robot dell\'alba', 3], ['La fine dell\'eternità', 3], ['Neanche gli dèi', 3]]);
  by('Arthur C. Clarke', [['2001: Odissea nello spazio', 1], ['La città e le stelle', 3], ['Incontro con Rama', 2]]);
  by('Philip K. Dick', [['Ubik', 3], ['La svastica sul sole', 2], ['Il cacciatore di androidi', 1], ['Le tre stimmate di Palmer Eldritch', 3], ['Un oscuro scrutare', 3]]);
  by('Margaret Atwood', [['Il racconto dell\'ancella', 1], ['Occhio di gatto', 3], ['Alias Grace', 3], ['L\'assassino cieco', 3], ['I testamenti', 2]]);
  by('Truman Capote', [['Musica per camaleonti', 3], ['Altre voci, altre stanze', 3]]);
  by('Erich Maria Remarque', [['Arco di trionfo', 2], ['Tre camerati', 3], ['Il ritorno', 3], ['Il cielo non ha preferiti', 3]]);
  by('Günter Grass', [['Il rombo', 3], ['Gatto e topo', 3], ['Il mio secolo', 3], ['Il passo del gambero', 3]]);
  by('José Saramago', [['Il Vangelo secondo Gesù Cristo', 2], ['Memoriale del convento', 3], ['L\'anno della morte di Ricardo Reis', 3], ['Le intermittenze della morte', 2]]);

  // ===== Quiz scritti a mano =====
  const quiz = Q([
    // ---- Dante e la Divina Commedia
    ['Chi accompagna Dante nell\'Inferno e nel Purgatorio?', 'Virgilio', ['Omero', 'Orazio', 'Cicerone'], 1],
    ['Chi guida Dante attraverso il Paradiso, dopo Virgilio?', 'Beatrice', ['Matelda', 'Sordello', 'Catone'], 1],
    ['Chi traghetta le anime dei dannati sul fiume Acheronte?', 'Caronte', ['Minosse', 'Flegiàs', 'Cerbero'], 1],
    ['Quale giudice infernale avvolge la coda attorno al corpo per indicare il cerchio?', 'Minosse', ['Caronte', 'Pluto', 'Gerione'], 2],
    ['Quale mostro a tre teste custodisce il cerchio dei golosi?', 'Cerbero', ['Gerione', 'Pluto', 'Flegiàs'], 2],
    ['Chi si trova al centro dell\'Inferno, conficcato nel ghiaccio?', 'Lucifero', ['Caronte', 'Minosse', 'Cerbero'], 1],
    ['Quale celebre coppia di amanti incontra Dante nel secondo cerchio?', 'Paolo e Francesca', ['Renzo e Lucia', 'Romeo e Giulietta', 'Orlando e Angelica'], 1],
    ['Quanti sono i cerchi dell\'Inferno dantesco?', 'Nove', ['Sette', 'Otto', 'Dieci'], 1],
    ['Quante sono le cornici del Purgatorio?', 'Sette', ['Cinque', 'Nove', 'Dodici'], 2],
    ['Quanti cieli attraversa Dante prima di arrivare all\'Empireo?', 'Nove', ['Sette', 'Dieci', 'Dodici'], 2],
    ['Dove si trova la montagna del Purgatorio secondo Dante?', 'In un\'isola dell\'emisfero australe', ['Al centro dell\'Italia', 'Sull\'Etna', 'Nel deserto del Sahara'], 2],
    ['Sotto quale città si apre la voragine dell\'Inferno, secondo Dante?', 'Gerusalemme', ['Roma', 'Firenze', 'Atene'], 2],
    ['In quale città morì Dante Alighieri?', 'Ravenna', ['Firenze', 'Verona', 'Roma'], 1],
    ['Perché Dante dovette lasciare Firenze nel 1302?', 'Fu condannato all\'esilio', ['Andò a studiare a Parigi', 'Fu inviato come ambasciatore a Roma', 'Fuggì da un\'epidemia'], 2],
    ['Quale donna Dante canta nella «Vita nuova»?', 'Beatrice', ['Laura', 'Fiammetta', 'Lucia'], 1],
    ['Quale donna Petrarca canta nel «Canzoniere»?', 'Laura', ['Beatrice', 'Fiammetta', 'Selvaggia'], 1],
    ['Come si chiama la forma metrica della Divina Commedia?', 'Terzine incatenate', ['Ottave', 'Sonetti', 'Quartine'], 2],
    ['Quale verso usa Dante nella Divina Commedia?', 'L\'endecasillabo', ['Il settenario', 'Il decasillabo', 'Il novenario'], 2],
    ['Quali animali incontra Dante nella selva oscura?', 'Una lonza, un leone e una lupa', ['Un cervo, un cinghiale e un orso', 'Un lupo, un\'aquila e un serpente', 'Un cane, un gatto e un topo'], 2],
    ['In che anno è ambientato il viaggio di Dante nell\'aldilà?', '1300', ['1265', '1302', '1321'], 2],
    ['Chi custodisce l\'Antipurgatorio?', 'Catone l\'Uticense', ['Virgilio', 'Stazio', 'Sordello'], 3],
    ['Quale poeta latino si unisce a Dante e Virgilio nel Purgatorio?', 'Stazio', ['Orazio', 'Ovidio', 'Lucano'], 3],
    ['Quale santo accompagna Dante nell\'ultimo canto del Paradiso?', 'San Bernardo', ['San Pietro', 'San Francesco', 'San Tommaso'], 3],
    ['Con quale parola terminano tutte e tre le cantiche della Commedia?', 'Stelle', ['Luce', 'Amore', 'Cielo'], 2],
    ['Quale verso chiude la Divina Commedia?', 'L\'amor che move il sole e l\'altre stelle', ['E quindi uscimmo a riveder le stelle', 'Lasciate ogne speranza, voi ch\'intrate', 'Nel mezzo del cammin di nostra vita'], 2],
    ['Chi definì per primo «divina» la Commedia di Dante?', 'Giovanni Boccaccio', ['Francesco Petrarca', 'Ludovico Ariosto', 'Ugo Foscolo'], 3],
    ['In quale lingua scrisse Dante la Commedia?', 'In volgare fiorentino', ['In latino', 'In siciliano', 'In provenzale'], 1],
    ['Qual è la seconda cantica della Divina Commedia?', 'Purgatorio', ['Inferno', 'Paradiso', 'Limbo'], 1],
    // ---- Letteratura italiana
    ['Chi è considerato il «padre della lingua italiana»?', 'Dante Alighieri', ['Francesco Petrarca', 'Giovanni Boccaccio', 'Alessandro Manzoni'], 1],
    ['In quale città si svolge la cornice del Decameron?', 'Firenze', ['Venezia', 'Milano', 'Napoli'], 2],
    ['Che cosa significa «Decameron»?', 'Dieci giornate', ['Cento storie', 'Dieci donne', 'Racconti di peste'], 2],
    ['Quale epidemia fa fuggire i dieci giovani del Decameron?', 'La peste del 1348', ['Il colera', 'La peste del 1630', 'L\'influenza spagnola'], 2],
    ['In quale secolo è ambientato «I promessi sposi»?', 'Nel Seicento', ['Nel Cinquecento', 'Nel Settecento', 'Nell\'Ottocento'], 2],
    ['Che mestiere fa Renzo Tramaglino?', 'Filatore di seta', ['Fabbro', 'Mugnaio', 'Notaio'], 2],
    ['Quale personaggio dei «Promessi sposi» si converte dopo l\'incontro con Lucia?', 'L\'Innominato', ['Don Rodrigo', 'Don Abbondio', 'Azzeccagarbugli'], 2],
    ['Come muore Don Rodrigo nei «Promessi sposi»?', 'Di peste', ['In duello', 'Di vecchiaia', 'In battaglia'], 2],
    ['Quale cognome ha Lucia nei «Promessi sposi»?', 'Mondella', ['Tramaglino', 'Ferrer', 'Borromeo'], 2],
    ['Quale città fa da sfondo alla parte finale dei «Promessi sposi», con la peste del 1630?', 'Milano', ['Torino', 'Venezia', 'Bergamo'], 2],
    ['In quale isola greca nacque Ugo Foscolo?', 'Zante', ['Corfù', 'Creta', 'Rodi'], 2],
    ['Come si chiama la residenza di D\'Annunzio sul lago di Garda?', 'Il Vittoriale degli Italiani', ['Villa Reale', 'Il Vittoriano', 'La Rotonda'], 2],
    ['Quale impresa guidò Gabriele D\'Annunzio nel 1919?', 'L\'occupazione di Fiume', ['La marcia su Roma', 'La spedizione dei Mille', 'La presa di Trieste'], 2],
    ['Quale impresa aerea compì D\'Annunzio nel 1918?', 'Il volo su Vienna', ['La trasvolata dell\'Atlantico', 'Il volo Roma-Tokyo', 'Il bombardamento di Berlino'], 2],
    ['Qual è il titolo della poesia di Ungaretti che dice «M\'illumino d\'immenso»?', 'Mattina', ['Veglia', 'Soldati', 'Fratelli'], 2],
    ['In quale raccolta di Montale compare «Meriggiare pallido e assorto»?', 'Ossi di seppia', ['Le occasioni', 'La bufera e altro', 'Satura'], 2],
    ['Chi è stata l\'unica donna italiana a vincere il Nobel per la letteratura?', 'Grazia Deledda', ['Natalia Ginzburg', 'Elsa Morante', 'Oriana Fallaci'], 1],
    ['Quale scrittore italiano vinse il Nobel per la letteratura nel 1934?', 'Luigi Pirandello', ['Italo Svevo', 'Gabriele D\'Annunzio', 'Giosuè Carducci'], 2],
    ['Con quale pseudonimo è noto Carlo Lorenzini?', 'Carlo Collodi', ['Vamba', 'Trilussa', 'Italo Svevo'], 1],
    ['Da che cosa deriva lo pseudonimo Collodi?', 'Dal paese d\'origine della madre', ['Dal nome di un fiume', 'Dalla villa dell\'editore', 'Dal paese natale del padre'], 3],
    ['Su quale giornale uscì a puntate «Pinocchio» nel 1881?', 'Il Giornale per i bambini', ['Il Corriere dei Piccoli', 'Il Vittorioso', 'Topolino'], 3],
    ['In quale città è ambientato il libro «Cuore»?', 'Torino', ['Milano', 'Firenze', 'Roma'], 2],
    ['Dove è ambientato «I Malavoglia»?', 'Ad Aci Trezza', ['A Vizzini', 'A Palermo', 'A Siracusa'], 2],
    ['Che mestiere fa principalmente la famiglia Malavoglia?', 'Pesca', ['Agricoltura', 'Miniera', 'Pastorizia'], 1],
    ['Qual è il cognome della famiglia dei Malavoglia?', 'Toscano', ['Tramaglino', 'Valentini', 'Cosini'], 3],
    ['Quale vizio cerca continuamente di smettere Zeno Cosini?', 'Il fumo', ['Il gioco d\'azzardo', 'L\'alcol', 'Il mangiare troppo'], 1],
    ['Quale trilogia di Calvino comprende «Il barone rampante»?', 'I nostri antenati', ['Le Cosmicomiche', 'Le città invisibili', 'Fiabe italiane'], 3],
    ['Che cosa accade a Medardo di Terralba nel «Visconte dimezzato»?', 'Una palla di cannone lo divide in due', ['Viene trasformato in un lupo', 'Perde la memoria', 'Diventa invisibile'], 2],
    ['A quale ordine religioso appartiene Guglielmo da Baskerville ne «Il nome della rosa»?', 'Francescano', ['Domenicano', 'Benedettino', 'Gesuita'], 2],
    ['Quale libro vuole nascondere Jorge da Burgos ne «Il nome della rosa»?', 'Il secondo libro della «Poetica» di Aristotele', ['Il Decameron', 'La Bibbia', 'L\'Odissea'], 2],
    ['In quale campo di concentramento fu deportato Primo Levi?', 'Auschwitz', ['Dachau', 'Mauthausen', 'Buchenwald'], 1],
    ['Che cosa attende per tutta la vita il tenente Drogo ne «Il deserto dei Tartari»?', 'Un attacco dei nemici', ['Una promozione', 'Una lettera', 'La nascita di un figlio'], 2],
    ['Che cosa significa il titolo «Il Gattopardo»?', 'È lo stemma dei principi Salina', ['È il soprannome di un brigante', 'È un animale donato al principe', 'È il nome di una nave'], 2],
    ['Quale evento storico fa da sfondo a «Il Gattopardo»?', 'Lo sbarco dei Mille in Sicilia', ['I Vespri siciliani', 'La breccia di Porta Pia', 'La marcia su Roma'], 2],
    ['Come si chiama il commissario creato da Andrea Camilleri?', 'Salvo Montalbano', ['Jules Maigret', 'Rocco Schiavone', 'Luigi Alfredo Ricciardi'], 1],
    ['Come si chiama la cittadina immaginaria in cui lavora Montalbano?', 'Vigàta', ['Macondo', 'Aci Trezza', 'Regalpetra'], 2],
    ['Chi ha creato il commissario Ricciardi?', 'Maurizio de Giovanni', ['Andrea Camilleri', 'Gianrico Carofiglio', 'Carlo Lucarelli'], 3],
    ['Chi ha creato il vicequestore Rocco Schiavone?', 'Antonio Manzini', ['Andrea Camilleri', 'Marco Malvaldi', 'Donato Carrisi'], 3],
    ['Chi ha creato Don Camillo e Peppone?', 'Giovannino Guareschi', ['Giovanni Verga', 'Carlo Collodi', 'Gianni Rodari'], 2],
    ['Quale grande poeta italiano nacque a Recanati?', 'Giacomo Leopardi', ['Ugo Foscolo', 'Giovanni Pascoli', 'Giosuè Carducci'], 1],
    ['Quale liquore dà il nome al Premio Strega?', 'Il liquore Strega', ['Il Campari', 'Il Martini', 'Il Fernet-Branca'], 2],
    ['In quale città si assegna ogni anno il Premio Strega?', 'Roma', ['Milano', 'Torino', 'Napoli'], 2],
    ['In quale città si tiene ogni anno il Salone internazionale del Libro?', 'Torino', ['Milano', 'Roma', 'Bologna'], 1],
    ['In quale città si tiene la fiera del libro più grande del mondo?', 'Francoforte', ['Londra', 'Parigi', 'Bologna'], 2],
    ['In quale città italiana si tiene la fiera del libro per ragazzi?', 'Bologna', ['Torino', 'Milano', 'Firenze'], 3],
    // ---- Narrativa straniera e personaggi
    ['Qual è l\'indirizzo di Sherlock Holmes?', '221B Baker Street', ['10 Downing Street', '4 Privet Drive', '7 Eaton Place'], 2],
    ['Come si chiama il grande nemico di Sherlock Holmes?', 'Professor Moriarty', ['Dottor Watson', 'Ispettore Lestrade', 'Mycroft'], 1],
    ['Come si chiama il capitano ossessionato dalla balena bianca di «Moby Dick»?', 'Achab', ['Ismaele', 'Queequeg', 'Nemo'], 1],
    ['Chi racconta la storia in «Moby Dick»?', 'Ismaele', ['Achab', 'Starbuck', 'Queequeg'], 2],
    ['Come si chiama il villaggio immaginario di «Cent\'anni di solitudine»?', 'Macondo', ['Comala', 'Yoknapatawpha', 'Vigàta'], 2],
    ['Come si chiama il dittatore onnipresente di «1984»?', 'Il Grande Fratello', ['Il Vecchio Maggiore', 'Palla di Neve', 'Napoleon'], 1],
    ['Che cos\'è la «neolingua» in «1984»?', 'La lingua ufficiale semplificata di Oceania', ['Un dialetto del Nord', 'L\'esperanto', 'Il linguaggio dei computer'], 2],
    ['Che cosa indica il numero nel titolo «Fahrenheit 451»?', 'La temperatura a cui brucia la carta', ['Il numero di pagine', 'L\'anno in cui è ambientato', 'Il numero di libri bruciati'], 1],
    ['Che mestiere fa Guy Montag in «Fahrenheit 451»?', 'Il pompiere', ['Il bibliotecario', 'Il poliziotto', 'Il giornalista'], 1],
    ['Che cosa c\'è dentro il boa nel primo disegno del narratore ne «Il Piccolo Principe»?', 'Un elefante', ['Un cappello', 'Una pecora', 'Una volpe'], 1],
    ['Quale animale insegna al Piccolo Principe che cosa significa «addomesticare»?', 'La volpe', ['Il serpente', 'Il corvo', 'La pecora'], 1],
    ['In quale città è ambientato «Romeo e Giulietta»?', 'Verona', ['Venezia', 'Padova', 'Firenze'], 1],
    ['Come si chiamano le due famiglie rivali di «Romeo e Giulietta»?', 'Montecchi e Capuleti', ['Medici e Pazzi', 'Orsini e Colonna', 'Visconti e Sforza'], 1],
    ['Chi uccide Giulio Cesare nella tragedia di Shakespeare?', 'Bruto e i congiurati', ['Marco Antonio', 'Ottaviano', 'Cicerone'], 2],
    ['Qual è la celebre frase di Cesare morente nel dramma di Shakespeare?', 'Anche tu, Bruto?', ['Veni, vidi, vici', 'Il dado è tratto', 'Ave, Cesare'], 2],
    ['Chi è il perfido consigliere di Otello?', 'Iago', ['Cassio', 'Rodrigo', 'Brabanzio'], 1],
    ['A chi apparteneva il teschio che Amleto tiene in mano nel cimitero?', 'Yorick, il buffone di corte', ['Polonio', 'Laerte', 'Claudio'], 2],
    ['In quale paese è ambientato «Macbeth»?', 'Scozia', ['Irlanda', 'Danimarca', 'Francia'], 1],
    ['Chi predice a Macbeth che diventerà re?', 'Tre streghe', ['Tre fantasmi', 'Un indovino', 'Il re Duncano'], 1],
    ['Chi è lo spirito dell\'aria che serve Prospero nella «Tempesta»?', 'Ariel', ['Puck', 'Calibano', 'Oberon'], 2],
    ['Chi è il re degli elfi nel «Sogno di una notte di mezza estate»?', 'Oberon', ['Prospero', 'Puck', 'Bottom'], 2],
    ['Quale personaggio viene trasformato in asino nel «Sogno di una notte di mezza estate»?', 'Bottom', ['Puck', 'Lisandro', 'Demetrio'], 3],
    ['Come si chiama il prestatore di denaro nel «Mercante di Venezia»?', 'Shylock', ['Iago', 'Malvolio', 'Falstaff'], 1],
    ['Come si chiamava il celebre teatro londinese di Shakespeare?', 'Globe Theatre', ['Old Vic', 'Covent Garden', 'Royal Albert Hall'], 1],
    ['In quale cittadina inglese è nato Shakespeare?', 'Stratford-upon-Avon', ['Oxford', 'Cambridge', 'Canterbury'], 2],
    ['Come si chiamava la moglie di Shakespeare?', 'Anne Hathaway', ['Jane Seymour', 'Mary Arden', 'Elizabeth Woodville'], 3],
    ['In quale anno morirono Shakespeare e Cervantes?', '1616', ['1599', '1605', '1623'], 2],
    ['Come si chiama la tenuta di Mr Darcy in «Orgoglio e pregiudizio»?', 'Pemberley', ['Thornfield Hall', 'Wuthering Heights', 'Manderley'], 2],
    ['Come si chiama la famiglia con cinque figlie di «Orgoglio e pregiudizio»?', 'I Bennet', ['I Darcy', 'I Bingley', 'I Collins'], 2],
    ['Come si chiama la casa del signor Rochester in «Jane Eyre»?', 'Thornfield Hall', ['Pemberley', 'Wuthering Heights', 'Manderley'], 2],
    ['Chi ha scritto «Rebecca, la prima moglie»?', 'Daphne du Maurier', ['Agatha Christie', 'Jane Austen', 'Emily Brontë'], 2],
    ['In quale regione inglese è ambientato «Cime tempestose»?', 'Yorkshire', ['Cornovaglia', 'Devon', 'Cumbria'], 2],
    ['Come si chiama l\'avaro protagonista di «Canto di Natale»?', 'Ebenezer Scrooge', ['Fagin', 'Mr Pickwick', 'Mr Micawber'], 1],
    ['Quale orfano chiede «Per favore, signore, ne vorrei ancora»?', 'Oliver Twist', ['David Copperfield', 'Pip', 'Nicholas Nickleby'], 2],
    ['In quale città è ambientato «Oliver Twist»?', 'Londra', ['Manchester', 'Liverpool', 'Dublino'], 1],
    ['Che cosa ruba Jean Valjean ne «I miserabili»?', 'Un pezzo di pane', ['Una moneta d\'oro', 'Un cavallo', 'Una pecora'], 1],
    ['Chi è il campanaro di Notre-Dame nel romanzo di Victor Hugo?', 'Quasimodo', ['Frollo', 'Febo', 'Gringoire'], 1],
    ['Come si chiama l\'ispettore che perseguita Jean Valjean?', 'Javert', ['Thénardier', 'Marius', 'Gavroche'], 1],
    ['Qual è il motto dei moschettieri nel romanzo di Dumas?', 'Uno per tutti, tutti per uno', ['Per aspera ad astra', 'Libertà, uguaglianza, fraternità', 'Chi ben comincia è a metà dell\'opera'], 1],
    ['In quale fortezza è imprigionato Edmond Dantès ne «Il conte di Montecristo»?', 'Castello d\'If', ['Bastiglia', 'Torre di Londra', 'Alcatraz'], 2],
    ['Come si chiama il capitano del Nautilus?', 'Nemo', ['Fogg', 'Achab', 'Lidenbrock'], 1],
    ['Come si chiama il servitore di Phileas Fogg?', 'Passepartout', ['Sancho Panza', 'Sam Gamgee', 'Mr Smee'], 2],
    ['Contro che cosa combatte Don Chisciotte credendoli giganti?', 'I mulini a vento', ['Le torri di un castello', 'Alcuni alberi secolari', 'Dei draghi'], 1],
    ['Come si chiama la dama immaginaria amata da Don Chisciotte?', 'Dulcinea', ['Isotta', 'Giulietta', 'Beatrice'], 1],
    ['A chi vende l\'anima Faust nell\'opera di Goethe?', 'Mefistofele', ['Il Grande Inquisitore', 'Dracula', 'Il dottor Jekyll'], 1],
    ['Che cosa invecchia al posto di Dorian Gray?', 'Il suo ritratto', ['Il suo specchio', 'La sua casa', 'Il suo giardino'], 1],
    ['In quale altro personaggio si trasforma il dottor Jekyll?', 'Mister Hyde', ['Mister Utterson', 'Mister Lanyon', 'Mister Poole'], 1],
    ['Quale sottotitolo ha il romanzo «Frankenstein» di Mary Shelley?', 'Il moderno Prometeo', ['Il mostro di Ginevra', 'La creatura della notte', 'L\'uomo artificiale'], 2],
    ['Chi insegue Alice nella tana in cui cade?', 'Il Bianconiglio', ['Il Cappellaio Matto', 'Lo Stregatto', 'Il Ghiro'], 1],
    ['Come si chiama il pirata nemico di Peter Pan?', 'Capitan Uncino', ['Barbanera', 'Long John Silver', 'Capitan Achab'], 1],
    ['Dove vive Peter Pan?', 'Nell\'Isola che non c\'è', ['Nella Terra di Mezzo', 'A Narnia', 'Nel Paese delle Meraviglie'], 1],
    ['Come si chiama la montagna in cui l\'Anello viene distrutto?', 'Monte Fato', ['Minas Tirith', 'Gran Burrone', 'Isengard'], 2],
    ['Come si chiama la terra degli hobbit?', 'La Contea', ['Gondor', 'Rohan', 'Mordor'], 1],
    ['Attraverso quale oggetto i fratelli Pevensie entrano a Narnia?', 'Un armadio', ['Uno specchio', 'Un pozzo', 'Una porta del treno'], 1],
    ['Quale pesce cattura Santiago ne «Il vecchio e il mare»?', 'Un marlin', ['Uno squalo martello', 'Un tonno', 'Una balena'], 2],
    ['In quale decennio è ambientato «Il grande Gatsby»?', 'Anni Venti', ['Anni Trenta', 'Anni Cinquanta', 'Anni Settanta'], 2],
    ['Che lavoro fa Atticus Finch ne «Il buio oltre la siepe»?', 'L\'avvocato', ['Il medico', 'Il giudice', 'Lo sceriffo'], 1],
    ['Che cosa sogna di fare Holden Caulfield nel campo di segale?', 'Impedire ai bambini di cadere nel burrone', ['Coltivare la segale', 'Allevare cavalli', 'Fare il poeta'], 2],
    ['In quale guerra è ambientato «Via col vento»?', 'Guerra di secessione americana', ['Guerra d\'indipendenza americana', 'Prima guerra mondiale', 'Guerra del Vietnam'], 1],
    ['Quale fiume discendono Huckleberry Finn e Jim in zattera?', 'Mississippi', ['Hudson', 'Colorado', 'Potomac'], 1],
    ['In quale regione è ambientato «Il richiamo della foresta»?', 'Klondike, nel nord-ovest del Canada', ['Texas', 'Florida', 'Patagonia'], 2],
    ['Come si chiama la tigre nemica di Mowgli?', 'Shere Khan', ['Kaa', 'Baloo', 'Bagheera'], 1],
    ['In quale città è ambientato «Delitto e castigo»?', 'San Pietroburgo', ['Mosca', 'Kiev', 'Varsavia'], 2],
    ['Quale premio fu costretto a rifiutare Boris Pasternak per pressioni del regime sovietico?', 'Il Nobel per la letteratura', ['Il Pulitzer', 'Il premio Lenin', 'Il Booker Prize'], 2],
    ['In quale lingua scrisse Franz Kafka?', 'In tedesco', ['In ceco', 'In yiddish', 'In ebraico'], 2],
    ['Come si chiama la famiglia protagonista di «Cent\'anni di solitudine»?', 'Buendía', ['Sartoris', 'Karamazov', 'Corleone'], 1],
    ['In quale città visse e ambientò molti racconti Jorge Luis Borges?', 'Buenos Aires', ['Montevideo', 'Santiago del Cile', 'Madrid'], 2],
    ['Che mestiere faceva Antoine de Saint-Exupéry?', 'L\'aviatore', ['Il marinaio', 'L\'esploratore', 'Il medico'], 1],
    ['Come si intitola l\'articolo con cui Émile Zola difese il capitano Dreyfus?', 'Io accuso', ['Il mio dovere', 'La giustizia negata', 'Lettera ai francesi'], 2],
    ['Quale commedia di Beckett ha due vagabondi che attendono un uomo che non arriva?', 'Aspettando Godot', ['Finale di partita', 'L\'ultimo nastro di Krapp', 'Giorni felici'], 1],
    ['Chi ha scritto «Casa di bambola»?', 'Henrik Ibsen', ['August Strindberg', 'Anton Čechov', 'Oscar Wilde'], 2],
    ['Chi ha scritto «Morte di un commesso viaggiatore»?', 'Arthur Miller', ['Tennessee Williams', 'Eugene O\'Neill', 'Edward Albee'], 2],
    ['Chi ha scritto «Un tram che si chiama Desiderio»?', 'Tennessee Williams', ['Arthur Miller', 'Eugene O\'Neill', 'Edward Albee'], 2],
    ['Chi ha scritto «La cantatrice calva»?', 'Eugène Ionesco', ['Samuel Beckett', 'Jean Genet', 'Harold Pinter'], 3],
    ['Chi ha scritto «Edipo re»?', 'Sofocle', ['Eschilo', 'Euripide', 'Aristofane'], 2],
    ['Chi ha scritto la tragedia «Medea»?', 'Euripide', ['Sofocle', 'Eschilo', 'Aristofane'], 2],
    ['Chi ha scritto la commedia «Gli uccelli»?', 'Aristofane', ['Sofocle', 'Euripide', 'Menandro'], 3],
    ['Chi ha scritto «De bello Gallico»?', 'Giulio Cesare', ['Tito Livio', 'Tacito', 'Cicerone'], 2],
    ['Chi ha scritto «Ab Urbe condita»?', 'Tito Livio', ['Tacito', 'Sallustio', 'Plutarco'], 2],
    ['Chi ha scritto il «Satyricon»?', 'Petronio', ['Apuleio', 'Giovenale', 'Marziale'], 3],
    ['Chi ha scritto «De rerum natura»?', 'Lucrezio', ['Virgilio', 'Orazio', 'Seneca'], 3],
    ['Chi ha scritto le «Catilinarie»?', 'Cicerone', ['Cesare', 'Sallustio', 'Seneca'], 2],
    // ---- Creatori di personaggi
    ['Chi ha creato l\'investigatore Hercule Poirot?', 'Agatha Christie', ['Arthur Conan Doyle', 'Georges Simenon', 'Raymond Chandler'], 1],
    ['Chi ha creato il commissario Maigret?', 'Georges Simenon', ['Agatha Christie', 'Arthur Conan Doyle', 'Raymond Chandler'], 2],
    ['Chi ha creato l\'investigatore Philip Marlowe?', 'Raymond Chandler', ['Dashiell Hammett', 'Ian Fleming', 'Mickey Spillane'], 3],
    ['Chi ha creato l\'agente segreto James Bond?', 'Ian Fleming', ['John le Carré', 'Frederick Forsyth', 'Len Deighton'], 1],
    ['Chi ha creato il ladro gentiluomo Arsène Lupin?', 'Maurice Leblanc', ['Gaston Leroux', 'Alexandre Dumas', 'Jules Verne'], 2],
    ['Chi ha creato Tarzan?', 'Edgar Rice Burroughs', ['Rudyard Kipling', 'Jack London', 'Jules Verne'], 2],
    ['Chi ha creato Zorro?', 'Johnston McCulley', ['Alexandre Dumas', 'Emilio Salgari', 'Jack London'], 3],
    ['Chi ha scritto la saga fantasy «Le cronache del ghiaccio e del fuoco», da cui nasce «Il trono di spade»?', 'George R. R. Martin', ['J. R. R. Tolkien', 'Terry Pratchett', 'Robert Jordan'], 2],
    ['Chi ha scritto «Cinquanta sfumature di grigio»?', 'E. L. James', ['Stephenie Meyer', 'Suzanne Collins', 'Veronica Roth'], 2],
    ['Chi ha scritto la saga di «Twilight»?', 'Stephenie Meyer', ['Suzanne Collins', 'J. K. Rowling', 'Veronica Roth'], 1],
    ['Chi ha scritto la trilogia di «Hunger Games»?', 'Suzanne Collins', ['Stephenie Meyer', 'Veronica Roth', 'Cassandra Clare'], 2],
    ['Chi ha scritto «Il cacciatore di aquiloni»?', 'Khaled Hosseini', ['Orhan Pamuk', 'Salman Rushdie', 'Paulo Coelho'], 2],
    ['Chi ha scritto «I pilastri della terra»?', 'Ken Follett', ['Wilbur Smith', 'Dan Brown', 'Umberto Eco'], 2],
    ['Chi ha scritto «Una breve storia del tempo»?', 'Stephen Hawking', ['Carl Sagan', 'Richard Dawkins', 'Albert Einstein'], 1],
    ['Chi ha scritto «Sapiens. Da animali a dèi»?', 'Yuval Noah Harari', ['Jared Diamond', 'Richard Dawkins', 'Steven Pinker'], 2],
    ['Chi ha scritto «La ragazza con l\'orecchino di perla»?', 'Tracy Chevalier', ['Paula Hawkins', 'Donna Tartt', 'Margaret Atwood'], 3],
    // ---- Generi, forme e figure retoriche
    ['Come si chiama un romanzo che racconta la crescita e la maturazione di un giovane?', 'Romanzo di formazione', ['Romanzo epistolare', 'Romanzo storico', 'Romanzo gotico'], 2],
    ['Come si chiama un romanzo scritto sotto forma di lettere?', 'Epistolare', ['Picaresco', 'Storico', 'Gotico'], 2],
    ['Quale di questi romanzi è scritto in forma di lettere?', 'I dolori del giovane Werther', ['Il Piccolo Principe', 'Oliver Twist', 'Moby Dick'], 2],
    ['Come si chiama un breve racconto con animali parlanti che insegna una morale?', 'Favola', ['Saga', 'Epica', 'Ode'], 1],
    ['Chi è considerato il più antico autore di favole della Grecia?', 'Esopo', ['Omero', 'Esiodo', 'Saffo'], 1],
    ['Quale scrittore francese del Seicento scrisse celebri favole in versi?', 'Jean de La Fontaine', ['Molière', 'Voltaire', 'Victor Hugo'], 2],
    ['Come si chiama il verso di undici sillabe?', 'Endecasillabo', ['Settenario', 'Decasillabo', 'Novenario'], 1],
    ['Che cos\'è un haiku?', 'Un breve componimento giapponese di tre versi', ['Un poema epico indiano', 'Una tragedia greca', 'Una ballata medievale'], 2],
    ['Quale figura retorica è «ghiaccio bollente»?', 'Ossimoro', ['Metafora', 'Similitudine', 'Iperbole'], 2],
    ['Quale figura retorica è «Sei una roccia»?', 'Metafora', ['Similitudine', 'Metonimia', 'Allitterazione'], 1],
    ['Quale figura retorica è «Ti ho detto mille volte di non farlo»?', 'Iperbole', ['Ossimoro', 'Metonimia', 'Anafora'], 2],
    ['Quale figura retorica è «Ho letto tutto Dante»?', 'Metonimia', ['Metafora', 'Ossimoro', 'Iperbole'], 3],
    ['Che cos\'è un\'onomatopea?', 'Una parola che imita un suono', ['Una parola che indica il contrario', 'Una ripetizione di versi', 'Una domanda senza risposta'], 1],
    ['Come si chiama il nome inventato con cui uno scrittore firma le sue opere?', 'Pseudonimo', ['Eteronimo', 'Toponimo', 'Patronimico'], 1],
    ['Come si chiama chi scrive un libro per conto di un altro senza comparire come autore?', 'Ghostwriter', ['Copywriter', 'Editor', 'Traduttore'], 2],
    ['Come si chiama il contrario di «utopia», una società immaginaria terribile?', 'Distopia', ['Ucronia', 'Atopia', 'Anarchia'], 2],
    ['A quale genere appartiene «Il Signore degli Anelli»?', 'Fantasy', ['Giallo', 'Western', 'Romanzo storico'], 1],
    ['A quale genere appartiene «1984»?', 'Romanzo distopico', ['Romanzo storico', 'Fantasy', 'Commedia'], 1],
    // ---- Premi e Nobel
    ['In quale città si tiene la cerimonia del Nobel per la letteratura?', 'Stoccolma', ['Oslo', 'Copenaghen', 'Helsinki'], 2],
    ['Quale premio letterario è assegnato ogni anno in Francia?', 'Premio Goncourt', ['Premio Pulitzer', 'Booker Prize', 'Premio Strega'], 2],
    ['Quale premio letterario è assegnato ogni anno a romanzi in lingua inglese del Regno Unito e del Commonwealth?', 'Booker Prize', ['Premio Strega', 'Premio Goncourt', 'Premio Cervantes'], 3],
    ['Quale premio statunitense è assegnato anche a opere di narrativa e di giornalismo?', 'Premio Pulitzer', ['Booker Prize', 'Premio Strega', 'Premio Goncourt'], 2],
    ['Chi vinse il primo Nobel per la letteratura nel 1901?', 'Sully Prudhomme', ['Lev Tolstoj', 'Rudyard Kipling', 'Henrik Ibsen'], 3],
    ['Quale cantautore ha vinto il Nobel per la letteratura nel 2016?', 'Bob Dylan', ['Leonard Cohen', 'Paul McCartney', 'Bruce Springsteen'], 1],
    ['Quale scrittore francese rifiutò il Nobel per la letteratura nel 1964?', 'Jean-Paul Sartre', ['Albert Camus', 'André Malraux', 'François Mauriac'], 2],
    ['Quale scrittrice francese ha vinto il Nobel per la letteratura nel 2022?', 'Annie Ernaux', ['Louise Glück', 'Alice Munro', 'Svetlana Aleksievič'], 2],
    ['Quale scrittore norvegese ha vinto il Nobel per la letteratura nel 2023?', 'Jon Fosse', ['Karl Ove Knausgård', 'Jo Nesbø', 'Per Petterson'], 3],
    ['Chi ha vinto il Nobel per la letteratura nel 2024?', 'Han Kang', ['Haruki Murakami', 'Annie Ernaux', 'Jon Fosse'], 2],
    ['Quale statista britannico ha vinto il Nobel per la letteratura nel 1953?', 'Winston Churchill', ['Clement Attlee', 'Margaret Thatcher', 'Harold Macmillan'], 1],
    ['Quale teatrante italiano ha vinto il Nobel nel 1997?', 'Dario Fo', ['Eduardo De Filippo', 'Giorgio Strehler', 'Carmelo Bene'], 1],
    // ---- Curiosità
    ['Quale libro è il più venduto di tutti i tempi?', 'La Bibbia', ['Il Piccolo Principe', 'Don Chisciotte', 'Harry Potter e la pietra filosofale'], 1],
    ['In quale città si trova la libreria «Shakespeare and Company»?', 'Parigi', ['Londra', 'Dublino', 'New York'], 2],
    ['Quale grande poeta russo morì in duello nel 1837?', 'Aleksandr Puškin', ['Nikolaj Gogol\'', 'Lev Tolstoj', 'Fëdor Dostoevskij'], 2],
    ['Quale scrittore italiano fu assassinato nel 1975 a Ostia?', 'Pier Paolo Pasolini', ['Leonardo Sciascia', 'Alberto Moravia', 'Italo Calvino'], 2],
    ['Quale scrittore americano visse a lungo a Cuba, nella casa di Finca Vigía?', 'Ernest Hemingway', ['William Faulkner', 'John Steinbeck', 'Francis Scott Fitzgerald'], 3],
    ['Quale scrittrice inglese pubblicò il suo primo romanzo senza firma, con la dicitura «By a Lady»?', 'Jane Austen', ['Mary Shelley', 'Virginia Woolf', 'Charlotte Brontë'], 3],
    ['Con quale pseudonimo maschile Emily Brontë pubblicò «Cime tempestose»?', 'Ellis Bell', ['Currer Bell', 'Acton Bell', 'George Eliot'], 3],
    ['Dove nacque l\'idea di «Frankenstein», durante una gara di racconti dell\'orrore?', 'Vicino a Ginevra', ['A Londra', 'A Venezia', 'A Edimburgo'], 3],
  ]);

  // ===== Vero / falso =====
  const tf = TF([
    ['Nella Divina Commedia il Purgatorio è una montagna.', true, 1],
    ['Virgilio guida Dante attraverso l\'Inferno.', true, 1],
    ['Dante Alighieri è sepolto a Ravenna.', true, 2],
    ['Dante chiamò la sua opera «Divina Commedia».', false, 2, 'La chiamò soltanto «Commedia»: l\'aggettivo «Divina» le fu dato in seguito, a partire da Boccaccio.'],
    ['Il «Canzoniere» di Petrarca è dedicato a Beatrice.', false, 1, 'È dedicato a Laura; Beatrice è la donna cantata da Dante.'],
    ['Papa Bonifacio VIII è collocato da Dante in Paradiso.', false, 3, 'Dante lo destina all\'Inferno, tra i simoniaci dell\'ottavo cerchio.'],
    ['Nell\'Inferno di Dante Ulisse si trova tra i consiglieri fraudolenti.', true, 2],
    ['Il Limbo dell\'Inferno ospita i grandi spiriti pagani.', true, 2],
    ['Dante incontra Beatrice nel Paradiso terrestre, in cima alla montagna del Purgatorio.', true, 3],
    ['Dante incontra il suo trisavolo Cacciaguida nel Paradiso.', true, 3],
    ['Le tre cantiche della Commedia terminano tutte con la parola «stelle».', true, 2],
    ['Virgilio non può entrare in Paradiso perché era pagano.', true, 2],
    ['Il «Decameron» è composto da cento novelle.', true, 1],
    ['La cornice del «Decameron» è una guerra tra città.', false, 2, 'La cornice è la peste del 1348 che spinge dieci giovani a lasciare Firenze.'],
    ['Boccaccio e Petrarca furono amici.', true, 3],
    ['Giacomo Leopardi scrisse lo «Zibaldone».', true, 2],
    ['Il «Cantico delle creature» di san Francesco è scritto in volgare umbro.', true, 3],
    ['Manzoni è nato a Firenze.', false, 2, 'Nacque a Milano; a Firenze andò a «sciacquare i panni in Arno» per la lingua dei suoi Promessi sposi.'],
    ['«I Malavoglia» è ambientato in Veneto.', false, 1, 'È ambientato ad Aci Trezza, in Sicilia.'],
    ['«I promessi sposi» è ambientato nel Seicento.', true, 1],
    ['«Il Gattopardo» è ambientato in Sicilia.', true, 1],
    ['Tomasi di Lampedusa non vide pubblicato «Il Gattopardo» in vita.', true, 2],
    ['«Il Gattopardo» fu rifiutato da alcuni grandi editori prima di essere pubblicato da Feltrinelli.', true, 3],
    ['Collodi è uno pseudonimo.', true, 1],
    ['«Pinocchio» uscì a puntate su un giornale per ragazzi prima di diventare un libro.', true, 2],
    ['«Cuore» di De Amicis è ambientato a Torino.', true, 2],
    ['Grazia Deledda è l\'unica donna italiana ad aver vinto il Nobel per la letteratura.', true, 2],
    ['Primo Levi era laureato in chimica.', true, 1],
    ['Umberto Eco era un semiologo e docente universitario.', true, 2],
    ['Gianni Rodari ha vinto il premio Hans Christian Andersen.', true, 3],
    ['Gabriele D\'Annunzio visse a lungo al Vittoriale, sul lago di Garda.', true, 2],
    ['Giovanni Pascoli fu professore all\'Università di Bologna.', true, 3],
    ['Vittorio Alfieri era piemontese.', true, 2],
    ['Carlo Goldoni morì a Parigi.', true, 3],
    ['Ungaretti scrisse molte poesie della sua prima raccolta al fronte, durante la Prima guerra mondiale.', true, 2],
    ['Il Premio Strega prende il nome da un liquore.', true, 2],
    ['Il Premio Strega si assegna a Milano.', false, 2, 'Si assegna a Roma.'],
    ['Il Salone internazionale del Libro si tiene a Torino.', true, 1],
    ['«Fermo e Lucia» è la prima stesura dei «Promessi sposi».', true, 3],
    ['Il sonetto nacque alla corte di Federico II, nella Scuola siciliana.', true, 3],
    ['Il «Don Chisciotte» è diviso in due parti, pubblicate a dieci anni di distanza.', true, 3],
    ['Don Chisciotte ha come scudiero Sancho Panza.', true, 1],
    ['Shakespeare è nato a Stratford-upon-Avon.', true, 2],
    ['Shakespeare ha scritto 154 sonetti.', true, 3],
    ['Il Globe Theatre sorgeva sulla riva sud del Tamigi.', true, 3],
    ['Shakespeare e Cervantes morirono nello stesso anno.', true, 2],
    ['«Romeo e Giulietta» è ambientato a Mantova.', false, 1, 'È ambientato a Verona.'],
    ['Nell\'«Amleto» la vicenda si svolge in Danimarca.', true, 1],
    ['Sherlock Holmes abita al 221B di Baker Street.', true, 2],
    ['Hercule Poirot è un investigatore belga.', true, 2],
    ['Miss Marple vive nel villaggio di St Mary Mead.', true, 3],
    ['Agatha Christie ha creato Hercule Poirot e Miss Marple.', true, 1],
    ['Lewis Carroll era un insegnante di matematica a Oxford.', true, 2],
    ['Jane Austen pubblicò il suo primo romanzo firmandosi «By a Lady».', true, 3],
    ['Emily Brontë pubblicò «Cime tempestose» con lo pseudonimo Ellis Bell.', true, 2],
    ['Mary Shelley era figlia della scrittrice Mary Wollstonecraft.', true, 3],
    ['«Frankenstein» nacque da una gara di racconti dell\'orrore vicino a Ginevra.', true, 3],
    ['Edgar Allan Poe è considerato un precursore del romanzo giallo.', true, 2],
    ['Mark Twain è uno pseudonimo.', true, 1],
    ['George Orwell è uno pseudonimo.', true, 1],
    ['J. K. Rowling ha pubblicato romanzi gialli con lo pseudonimo Robert Galbraith.', true, 2],
    ['Stephen King ha scritto alcuni romanzi con lo pseudonimo Richard Bachman.', true, 3],
    ['Hans Christian Andersen era danese.', true, 1],
    ['Hans Christian Andersen era tedesco.', false, 1, 'Era danese, nato a Odense.'],
    ['I fratelli Grimm raccolsero fiabe della tradizione tedesca.', true, 1],
    ['Pippi Calzelunghe è un personaggio creato da una scrittrice svedese.', true, 1],
    ['Roald Dahl nacque in Galles.', true, 3],
    ['Tolkien insegnò all\'Università di Oxford.', true, 2],
    ['C. S. Lewis e Tolkien erano amici.', true, 2],
    ['«Il Piccolo Principe» fu pubblicato per la prima volta a New York.', true, 3],
    ['«Moby Dick» è il nome di un capodoglio bianco.', true, 1],
    ['«Il vecchio e il mare» è ambientato a Cuba.', true, 2],
    ['«Il vecchio e il mare» fece vincere a Hemingway il Premio Pulitzer.', true, 2],
    ['«Il grande Gatsby» è ambientato negli anni Venti.', true, 1],
    ['«Cent\'anni di solitudine» si svolge nel villaggio immaginario di Macondo.', true, 1],
    ['Gabriel García Márquez era colombiano.', true, 1],
    ['Jorge Luis Borges divenne cieco in età adulta.', true, 2],
    ['Franz Kafka scriveva in tedesco.', true, 2],
    ['«Il processo» di Kafka fu pubblicato dopo la morte dell\'autore.', true, 3],
    ['«Il maestro e Margherita» fu pubblicato dopo la morte di Bulgakov.', true, 3],
    ['«Lolita» fu scritto in inglese.', true, 3],
    ['«La metamorfosi» racconta la trasformazione di Gregor Samsa in un insetto.', true, 1],
    ['Tolstoj e Dostoevskij si conobbero di persona.', false, 3, 'I due grandi scrittori russi non si incontrarono mai.'],
    ['«Guerra e pace» è ambientato durante le guerre napoleoniche.', true, 1],
    ['«Delitto e castigo» è ambientato a San Pietroburgo.', true, 2],
    ['Boris Pasternak, autore del «Dottor Živago», dovette rifiutare il Nobel per la letteratura.', true, 2],
    ['Jean-Paul Sartre rifiutò il Nobel per la letteratura.', true, 2],
    ['Winston Churchill ha vinto il Nobel per la letteratura.', true, 2],
    ['Bob Dylan ha vinto il Nobel per la letteratura.', true, 1],
    ['Il Nobel per la letteratura viene assegnato dall\'Accademia svedese.', true, 2],
    ['L\'«Odissea» racconta il ritorno di Ulisse a Itaca.', true, 1],
    ['L\'«Iliade» inizia con l\'ira di Achille.', true, 1],
    ['L\'«Iliade» racconta l\'episodio del cavallo di Troia.', false, 2, 'L\'Iliade si ferma ai funerali di Ettore: il cavallo di Troia compare nell\'Odissea e nell\'Eneide.'],
    ['Secondo la tradizione Omero era cieco.', true, 2],
    ['Virgilio nacque vicino a Mantova.', true, 2],
    ['L\'«Eneide» è scritta in esametri.', true, 3],
    ['L\'«Eneide» è stata scritta da Omero.', false, 1, 'L\'autore è Virgilio; Omero scrisse Iliade e Odissea.'],
    ['La «Gerusalemme liberata» è opera di Ariosto.', false, 1, 'È di Torquato Tasso; Ariosto scrisse l\'Orlando furioso.'],
    ['Ovidio fu mandato in esilio dall\'imperatore Augusto.', true, 2],
    ['Esopo era, secondo la tradizione, uno schiavo greco.', true, 3],
    ['L\'haiku è una forma poetica tipica del Giappone.', true, 1],
    ['L\'endecasillabo ha undici sillabe.', true, 1],
    ['«Il Gattopardo» è ambientato al tempo del Risorgimento.', true, 2],
    ['«Pippi Calzelunghe» è stato scritto da Gianni Rodari.', false, 1, 'È di Astrid Lindgren, scrittrice svedese.'],
    ['Italo Calvino è nato a Cuba.', true, 2],
    ['Pier Paolo Pasolini fu anche regista cinematografico.', true, 1],
    ['Salvatore Quasimodo nacque in Sicilia.', true, 2],
    ['Lord Byron era un poeta francese.', false, 2, 'Era un poeta inglese.'],
    ['«Il nome della rosa» è stato portato al cinema con Sean Connery nel ruolo di Guglielmo da Baskerville.', true, 2],
    ['«Il codice da Vinci» è in parte ambientato al museo del Louvre.', true, 1],
  ]);

  // ===== Citazioni (solo autori e opere di pubblico dominio) =====
  const quotes = [
    ['Fatti non foste a viver come bruti, ma per seguir virtute e canoscenza', 'Dante Alighieri', 1],
    ['Lasciate ogne speranza, voi ch\'intrate', 'Dante Alighieri', 1],
    ['Amor, ch\'a nullo amato amar perdona', 'Dante Alighieri', 2],
    ['Nessun maggior dolore che ricordarsi del tempo felice ne la miseria', 'Dante Alighieri', 2],
    ['Non ragioniam di lor, ma guarda e passa', 'Dante Alighieri', 2],
    ['Libertà va cercando, ch\'è sì cara', 'Dante Alighieri', 3],
    ['Tanto gentile e tanto onesta pare la donna mia', 'Dante Alighieri', 2],
    ['Solo et pensoso i più deserti campi vo mesurando a passi tardi et lenti', 'Francesco Petrarca', 2],
    ['Chiare, fresche et dolci acque', 'Francesco Petrarca', 2],
    ['Pace non trovo, et non ò da far guerra', 'Francesco Petrarca', 3],
    ['Umana cosa è aver compassione degli afflitti', 'Giovanni Boccaccio', 3],
    ['Ai posteri l\'ardua sentenza', 'Alessandro Manzoni', 1],
    ['Addio, monti sorgenti dall\'acque, ed elevati al cielo', 'Alessandro Manzoni', 2],
    ['Questo matrimonio non s\'ha da fare, né domani, né mai', 'Alessandro Manzoni', 1],
    ['Il coraggio, uno non se lo può dare', 'Alessandro Manzoni', 2],
    ['Ei fu. Siccome immobile, dato il mortal sospiro', 'Alessandro Manzoni', 2],
    ['Sempre caro mi fu quest\'ermo colle', 'Giacomo Leopardi', 1],
    ['E il naufragar m\'è dolce in questo mare', 'Giacomo Leopardi', 1],
    ['Silvia, rimembri ancora quel tempo della tua vita mortale', 'Giacomo Leopardi', 2],
    ['Che fai tu, luna, in ciel? dimmi, che fai, silenziosa luna?', 'Giacomo Leopardi', 3],
    ['Né più mai toccherò le sacre sponde ove il mio corpo fanciulletto giacque', 'Ugo Foscolo', 3],
    ['A egregie cose il forte animo accendono l\'urne dei forti', 'Ugo Foscolo', 3],
    ['San Lorenzo, io lo so perché tanto di stelle per l\'aria tranquilla arde e cade', 'Giovanni Pascoli', 3],
    ['Taci. Su le soglie del bosco non odo parole che dici umane', 'Gabriele D\'Annunzio', 2],
    ['I cipressi che a Bólgheri alti e schietti van da San Guido in duplice filar', 'Giosuè Carducci', 3],
    ['Essere o non essere, questo è il problema', 'William Shakespeare', 1],
    ['C\'è del marcio in Danimarca', 'William Shakespeare', 2],
    ['Il resto è silenzio', 'William Shakespeare', 3],
    ['Tutto il mondo è un palcoscenico', 'William Shakespeare', 2],
    ['Il mio regno per un cavallo!', 'William Shakespeare', 3],
    ['Siamo fatti della stessa sostanza dei sogni', 'William Shakespeare', 2],
    ['Uno per tutti, tutti per uno', 'Alexandre Dumas', 1],
    ['Tutte le famiglie felici si somigliano; ogni famiglia infelice lo è a modo suo', 'Lev Tolstoj', 2],
    ['La bellezza salverà il mondo', 'Fëdor Dostoevskij', 3],
    ['L\'uomo è nato libero, e ovunque è in catene', 'Jean-Jacques Rousseau', 3],
  ].map(([text, who, d]) => ({ text, who, d }));
  const quoteText = 'Chi è l\'autore di queste parole?';

  // ===== Emoji =====
  const emojis = [
    ['🪵👦👃', 'Le avventure di Pinocchio', 1],
    ['🐇🎩⏰', 'Alice nel Paese delle Meraviglie', 1],
    ['🐋🧔⚓', 'Moby Dick', 1],
    ['💍🌋🧙‍♂️', 'Il Signore degli Anelli', 1],
    ['🦊🌹👑', 'Il Piccolo Principe', 1],
    ['🏴‍☠️🏝️💰', 'L\'isola del tesoro', 1],
    ['🧛‍♂️🦇🏰', 'Dracula', 1],
    ['🎅💸👻🎄', 'Canto di Natale', 1],
    ['⚡🧟🔬', 'Frankenstein', 1],
    ['🐷🚜📢', 'La fattoria degli animali', 1],
    ['🎈🌍⏱️', 'Il giro del mondo in 80 giorni', 1],
    ['🦁🧙‍♀️🚪', 'Le cronache di Narnia', 1],
    ['🐒🐻🐅', 'Il libro della giungla', 1],
    ['🧚‍♀️🏴‍☠️✈️', 'Peter Pan', 1],
    ['🌪️👠🦁', 'Il meraviglioso mago di Oz', 1],
    ['🐴🛡️🌬️', 'Don Chisciotte della Mancia', 1],
    ['🕵️🔍🎻', 'Sherlock Holmes', 1],
    ['🔥📚🚒', 'Fahrenheit 451', 1],
    ['🏔️🐐👧', 'Heidi', 1],
    ['🧑‍🍳🍫🏭', 'La fabbrica di cioccolato', 1],
    ['🐙🌊🚢', 'Ventimila leghe sotto i mari', 2],
    ['🎭💀🏰', 'Amleto', 2],
    ['🌹🥀🔮', 'La bella e la bestia', 2],
    ['🧜‍♀️🌊👑', 'La sirenetta', 1],
    ['👸🍎🪞', 'Biancaneve', 1],
    ['🥿🎃🕛', 'Cenerentola', 1],
    ['🐺👧🧺', 'Cappuccetto Rosso', 1],
    ['🐱👢👑', 'Il gatto con gli stivali', 1],
    ['🏰🌹😴', 'La bella addormentata', 1],
    ['⛪🔔💃', 'Notre-Dame de Paris', 2],
    ['🍞⛓️🕯️', 'I miserabili', 2],
  ].map(([emoji, answer, d]) => ({ emoji, answer, d }));
  const emojiText = 'Quale libro o storia raccontano queste emoji?';

  // ===== Metti in ordine =====
  const order = [
    ['Metti in ordine le tre cantiche della Divina Commedia', ['Inferno', 'Purgatorio', 'Paradiso'], 1],
    ['Metti in ordine di pubblicazione, dal più antico', ['Orlando furioso', 'Don Chisciotte della Mancia', 'I promessi sposi', 'Il nome della rosa'], 2],
    ['Metti in ordine di nascita, dal più antico', ['Dante Alighieri', 'Francesco Petrarca', 'Giovanni Boccaccio', 'Niccolò Machiavelli'], 2],
    ['Metti in ordine di nascita questi poeti, dal più antico', ['Ugo Foscolo', 'Giacomo Leopardi', 'Giosuè Carducci', 'Giovanni Pascoli', 'Giuseppe Ungaretti'], 2],
    ['Metti in ordine di pubblicazione i romanzi di Dickens, dal più antico', ['Oliver Twist', 'Canto di Natale', 'David Copperfield', 'Grandi speranze'], 3],
    ['Metti in ordine di pubblicazione i romanzi della trilogia «I nostri antenati» di Calvino', ['Il visconte dimezzato', 'Il barone rampante', 'Il cavaliere inesistente'], 3],
    ['Metti in ordine di pubblicazione i romanzi di Hemingway, dal più antico', ['Addio alle armi', 'Per chi suona la campana', 'Il vecchio e il mare'], 3],
    ['Metti in ordine di pubblicazione, dal più antico', ['Il mondo nuovo', 'La fattoria degli animali', '1984', 'Fahrenheit 451'], 2],
    ['Metti in ordine di pubblicazione i romanzi di Jules Verne, dal più antico', ['Viaggio al centro della Terra', 'Ventimila leghe sotto i mari', 'Il giro del mondo in 80 giorni'], 3],
    ['Metti in ordine di pubblicazione i grandi romanzi russi, dal più antico', ['Delitto e castigo', 'Guerra e pace', 'Anna Karenina', 'I fratelli Karamazov'], 3],
    ['Metti in ordine di pubblicazione i libri di Primo Levi, dal più antico', ['Se questo è un uomo', 'La tregua', 'Il sistema periodico'], 3],
    ['Metti in ordine di anno del Nobel i premiati italiani per la letteratura, dal più antico', ['Giosuè Carducci', 'Grazia Deledda', 'Luigi Pirandello', 'Salvatore Quasimodo', 'Eugenio Montale', 'Dario Fo'], 2],
    ['Metti in ordine di anno del Nobel per la letteratura, dal più antico', ['Ernest Hemingway', 'Albert Camus', 'Gabriel García Márquez', 'Toni Morrison'], 2],
    ['Metti in ordine di composizione, dall\'opera più antica', ['Iliade', 'Eneide', 'Divina Commedia', 'Orlando furioso'], 1],
    ['Metti in ordine di nascita questi autori classici, dal più antico', ['Omero', 'Sofocle', 'Euripide', 'Aristofane'], 3],
    ['Metti in ordine di pubblicazione i romanzi di Jane Austen, dal più antico', ['Ragione e sentimento', 'Orgoglio e pregiudizio', 'Emma'], 3],
    ['Metti in ordine di pubblicazione i libri di Tolkien, dal più antico', ['Lo Hobbit', 'Il Signore degli Anelli', 'Il Silmarillion'], 2],
    ['Metti in ordine, dal più in alto al più in basso, questi gruppi di dannati dell\'Inferno', ['Eretici', 'Violenti', 'Fraudolenti', 'Traditori'], 2],
    ['Metti in ordine i primi sei cerchi dell\'Inferno, dal primo', ['Limbo', 'Lussuriosi', 'Golosi', 'Avari e prodighi', 'Iracondi e accidiosi', 'Eretici'], 2],
    ['Metti in ordine i primi sei cieli del Paradiso, dal più vicino alla Terra', ['Luna', 'Mercurio', 'Venere', 'Sole', 'Marte', 'Giove'], 2],
    ['Metti in ordine le prime sei cornici del Purgatorio, dalla prima', ['Superbi', 'Invidiosi', 'Iracondi', 'Accidiosi', 'Avari e prodighi', 'Golosi'], 3],
    ['Metti in ordine di pubblicazione i romanzi di Dumas sui moschettieri', ['I tre moschettieri', 'Vent\'anni dopo', 'Il visconte di Bragelonne'], 3],
    ['Metti in ordine di vittoria al Premio Strega, dal più antico', ['Il Gattopardo', 'Lessico famigliare', 'Il nome della rosa', 'La solitudine dei numeri primi'], 3],
    ['Metti in ordine di nascita, dal più antico', ['Jane Austen', 'Charles Dickens', 'Mark Twain', 'Virginia Woolf'], 2],
    ['Metti in ordine di nascita questi scrittori italiani, dal più antico', ['Alessandro Manzoni', 'Giacomo Leopardi', 'Giovanni Verga', 'Luigi Pirandello', 'Italo Calvino'], 2],
    ['Metti in ordine cronologico questi movimenti della letteratura italiana, dal più antico', ['Scuola siciliana', 'Dolce stil novo', 'Umanesimo', 'Illuminismo', 'Romanticismo', 'Verismo'], 3],
  ].map(([q, items, d]) => ({ q, items, d }));

  // ===== Indovina il numero =====
  const numbers = [
    ['Quanti canti ha l\'Inferno di Dante?', 34, 20, 50, 0, 'canti', 3],
    ['Quanti canti ha il Purgatorio di Dante?', 33, 20, 50, 0, 'canti', 3],
    ['Quanti canti ha il Paradiso di Dante?', 33, 20, 50, 0, 'canti', 3],
    ['Quanti versi ha la Divina Commedia?', 14233, 10000, 20000, 600, 'versi', 3],
    ['Quante novelle contiene il Decameron?', 100, 40, 160, 0, 'novelle', 1],
    ['In quante giornate sono narrate le novelle del Decameron?', 10, 1, 30, 0, 'giornate', 2],
    ['Quanti giovani narratori ci sono nel Decameron?', 10, 3, 20, 0, 'giovani', 2],
    ['Quanti canti ha l\'Iliade?', 24, 10, 50, 0, 'canti', 3],
    ['Quanti canti ha l\'Odissea?', 24, 10, 50, 0, 'canti', 3],
    ['Quanti libri ha l\'Eneide?', 12, 4, 30, 0, 'libri', 3],
    ['Quanti canti ha l\'Orlando furioso nell\'edizione definitiva?', 46, 20, 80, 2, 'canti', 3],
    ['Quanti canti ha la Gerusalemme liberata?', 20, 8, 40, 0, 'canti', 3],
    ['Quanti capitoli ha l\'edizione definitiva dei Promessi sposi?', 38, 20, 60, 1, 'capitoli', 3],
    ['Quanti sonetti scrisse Shakespeare?', 154, 100, 220, 5, 'sonetti', 3],
    ['Quante sorelle Brontë furono scrittrici?', 3, 1, 6, 0, 'sorelle', 2],
    ['Quanti scrittori italiani hanno vinto il Nobel per la letteratura?', 6, 1, 12, 0, 'scrittori', 2],
    ['Quante sillabe ha un endecasillabo?', 11, 5, 20, 0, 'sillabe', 1],
    ['Quante sillabe ha un settenario?', 7, 3, 15, 0, 'sillabe', 1],
    ['Quanti versi ha una terzina?', 3, 1, 10, 0, 'versi', 1],
    ['Quanti versi ha un\'ottava?', 8, 3, 16, 0, 'versi', 2],
    ['Quante sillabe, in totale, ha un haiku classico (5-7-5)?', 17, 8, 30, 0, 'sillabe', 2],
    ['Quanti anni passa Ulisse lontano da Itaca, tra guerra di Troia e ritorno?', 20, 5, 40, 0, 'anni', 3],
    ['Quanti volumi compongono «Il Signore degli Anelli»?', 3, 1, 8, 0, 'volumi', 1],
    ['In quante parti è diviso il «Don Chisciotte»?', 2, 1, 6, 0, 'parti', 2],
    ['Quanti anni visse Dante Alighieri (1265-1321)?', 56, 30, 80, 1, 'anni', 3],
    ['Quanti fratelli Grimm raccolsero le fiabe tedesche?', 2, 1, 6, 0, 'fratelli', 1],
  ].map(([q, v, min, max, tol, unit, d]) => ({ q, v, min, max, tol, unit, d }));

  // ===== Scrivi la risposta =====
  const typed = [
    ['Come si chiama la donna amata da Dante e sua guida nel Paradiso?', 'Beatrice', ['Beatrice Portinari'], 1],
    ['Come si chiama la donna cantata da Petrarca nel Canzoniere?', 'Laura', [], 1],
    ['Come si chiama la guida di Dante nell\'Inferno?', 'Virgilio', [], 1],
    ['Come si chiama il traghettatore dell\'Acheronte nell\'Inferno?', 'Caronte', [], 1],
    ['Come si chiama il cane a tre teste che custodisce il cerchio dei golosi?', 'Cerbero', [], 2],
    ['Come si chiama il cavallo di Don Chisciotte?', 'Ronzinante', ['Rocinante'], 2],
    ['Come si chiama la dama amata da Don Chisciotte?', 'Dulcinea', ['Dulcinea del Toboso'], 1],
    ['Come si chiama lo scudiero di Don Chisciotte?', 'Sancho Panza', ['Sancho'], 1],
    ['Come si chiama il capitano ossessionato dalla balena bianca di «Moby Dick»?', 'Achab', ['Ahab', 'Capitano Achab'], 1],
    ['Come si chiama il protagonista de «Il giovane Holden»?', 'Holden Caulfield', ['Holden'], 1],
    ['Come si chiama il protagonista di «1984»?', 'Winston Smith', ['Winston'], 2],
    ['Come si chiama la protagonista di «Orgoglio e pregiudizio»?', 'Elizabeth Bennet', ['Elizabeth', 'Lizzy', 'Lizzie'], 2],
    ['Come si chiama il protagonista de «Il conte di Montecristo»?', 'Edmond Dantès', ['Dantès', 'Dantes', 'Edmond Dantes'], 2],
    ['Come si chiama il protagonista de «I miserabili», ex galeotto?', 'Jean Valjean', ['Valjean'], 1],
    ['Come si chiama il campanaro gobbo di Notre-Dame?', 'Quasimodo', [], 1],
    ['Come si chiama il medico amico di Sherlock Holmes?', 'Watson', ['Dottor Watson', 'John Watson', 'Dr Watson'], 1],
    ['Come si chiama il fratello maggiore di Sherlock Holmes?', 'Mycroft', ['Mycroft Holmes'], 3],
    ['Come si chiama il vecchio pescatore protagonista di Hemingway?', 'Santiago', [], 2],
    ['Come si chiama l\'avaro di «Canto di Natale»?', 'Scrooge', ['Ebenezer Scrooge'], 1],
    ['Come si chiama il burattinaio che minaccia di bruciare Pinocchio?', 'Mangiafuoco', ['Mangiafoco'], 1],
    ['Come si chiama il falegname che crea Pinocchio?', 'Geppetto', ['Mastro Geppetto'], 1],
    ['Come si chiama il nemico di Peter Pan?', 'Capitan Uncino', ['Uncino', 'Capitano Uncino'], 1],
    ['Come si chiama il villaggio immaginario di «Cent\'anni di solitudine»?', 'Macondo', [], 1],
    ['Come si chiama il commissario siciliano di Andrea Camilleri?', 'Montalbano', ['Salvo Montalbano'], 1],
    ['Qual è il vero cognome di Carlo Collodi?', 'Lorenzini', ['Carlo Lorenzini'], 2],
    ['Qual è il vero nome di Mark Twain?', 'Samuel Clemens', ['Samuel Langhorne Clemens', 'Clemens'], 2],
    ['Qual è il vero nome di George Orwell?', 'Eric Arthur Blair', ['Eric Blair', 'Blair'], 2],
    ['Come si chiama il poeta nato a Recanati, autore de «L\'infinito»?', 'Giacomo Leopardi', ['Leopardi'], 1],
    ['Come si chiama l\'investigatore belga di Agatha Christie?', 'Hercule Poirot', ['Poirot'], 1],
    ['Come si chiama l\'anziana investigatrice di St Mary Mead creata da Agatha Christie?', 'Miss Marple', ['Marple', 'Jane Marple'], 2],
    ['Come si chiama il grande nemico di Sherlock Holmes?', 'Moriarty', ['Professor Moriarty', 'James Moriarty'], 1],
    ['Come si chiama il capitano del Nautilus?', 'Nemo', ['Capitano Nemo'], 1],
    ['Come si chiama il prestatore di denaro del «Mercante di Venezia»?', 'Shylock', [], 1],
    ['Come si chiama il principe di Danimarca protagonista della tragedia di Shakespeare?', 'Amleto', ['Hamlet'], 1],
    ['Come si chiama il generale moro, geloso di Desdemona, in Shakespeare?', 'Otello', ['Othello'], 1],
    ['Come si chiama il protagonista di «Delitto e castigo»?', 'Raskol\'nikov', ['Raskolnikov', 'Rodion Raskol\'nikov'], 2],
    ['Come si chiama il protagonista de «La coscienza di Zeno»?', 'Zeno Cosini', ['Zeno', 'Cosini'], 2],
    ['Qual è il cognome di Cosimo, il «barone rampante» di Calvino?', 'Piovasco di Rondò', ['Piovasco'], 3],
    ['Come si chiama l\'orfano di Dickens che chiede ancora un po\' di minestra?', 'Oliver Twist', ['Oliver'], 1],
    ['Come si chiama il principe di Salina, protagonista del «Gattopardo»?', 'Fabrizio', ['Don Fabrizio', 'Fabrizio Salina', 'Don Fabrizio Salina'], 2],
    ['Come si chiama il nipote prediletto del principe di Salina nel «Gattopardo»?', 'Tancredi', ['Tancredi Falconeri'], 2],
    ['Come si chiama il parroco pauroso dei «Promessi sposi»?', 'Don Abbondio', ['Abbondio'], 1],
    ['Come si chiama il signorotto prepotente dei «Promessi sposi»?', 'Don Rodrigo', ['Rodrigo'], 1],
  ].map(([q, a, accept, d]) => (accept.length ? { q, a, accept, d } : { q, a, d }));

  // ===== Definizione della categoria =====
  const mk = (id, items, fields, numeric) => ({ id, items, fields, numeric });
  (D.pop = D.pop || []).push({
    id: 'plusletteratura',
    extends: 'letteratura',
    quiz,
    tf,
    tables: [
      mk('romanzi', romanzi, {
        naz: {
          ask: 'Di che nazionalità è l\'autore di «{name}»?',
          who: 'L\'autore di quale di questi libri ha nazionalità {value}?',
          tf: 'L\'autore di «{name}» ha questa nazionalità: {value}.',
          odd: 'Trova l\'intruso: l\'autore di quale libro NON ha nazionalità {value}?',
        },
        autore: {
          ask: 'Chi è l\'autore di «{name}»?',
          who: 'Quale di questi libri è stato scritto da {value}?',
          tf: '«{name}» è opera di {value}.',
          odd: 'Trova l\'intruso: quale di questi libri NON è di {value}?',
          typed: 'person',
        },
      }, {
        anno: { ask: 'In che anno fu pubblicato per la prima volta «{name}»?', span: 50, tol: 2, format: 'year', duel: 'Quale di questi libri è stato pubblicato per primo?', lowerWins: true, order: 'Metti in ordine di pubblicazione, dal più antico', gap: 2 },
      }),
      mk('autori', autori, {
        naz: {
          ask: 'Di che nazionalità è {name}?',
          who: 'Quale di questi scrittori ha nazionalità {value}?',
          tf: '{name} ha questa nazionalità: {value}.',
          odd: 'Trova l\'intruso: chi NON ha nazionalità {value}?',
        },
        citta: {
          ask: 'In quale città è nato {name}?',
          who: 'Quale di questi scrittori è nato a {value}?',
          tf: '{name} è nato qui: {value}.',
          odd: 'Trova l\'intruso: chi NON è nato a {value}?',
          typed: true,
        },
      }, {
        nato: { ask: 'In quale anno è nato {name}?', span: 70, tol: 3, format: 'year', duel: 'Chi è nato prima?', lowerWins: true, order: 'Metti in ordine di nascita, dal più antico', gap: 5 },
        morto: { ask: 'In quale anno è morto {name}?', span: 70, tol: 3, format: 'year', duel: 'Chi è morto prima?', lowerWins: true, order: 'Metti in ordine di morte, dal più antico', gap: 5 },
      }),
      mk('nobel', nobel, {
        naz: {
          ask: 'Di che nazionalità è {name}, premio Nobel per la letteratura?',
          who: 'Quale di questi premi Nobel per la letteratura ha nazionalità {value}?',
          tf: '{name}, premio Nobel per la letteratura, ha questa nazionalità: {value}.',
          odd: 'Trova l\'intruso: quale premio Nobel per la letteratura NON ha nazionalità {value}?',
        },
      }, {
        anno: { ask: 'In che anno è stato assegnato a {name} il Nobel per la letteratura?', span: 40, tol: 2, format: 'year', duel: 'Chi ha ricevuto prima il Nobel per la letteratura?', lowerWins: true, order: 'Metti in ordine di anno del Nobel per la letteratura, dal più antico', gap: 3 },
      }),
      mk('inferno', inferno, {
        luogo: {
          ask: 'Dove si trova {name} nell\'Inferno di Dante?',
          who: 'Quale di questi personaggi dell\'Inferno si trova qui: {value}?',
          tf: 'Nell\'Inferno di Dante, {name} si trova qui: {value}.',
          odd: 'Trova l\'intruso: quale personaggio dell\'Inferno NON si trova qui: {value}?',
        },
      }),
      mk('purgatorio', purgatorio, {
        luogo: {
          ask: 'Dove si trova {name} nel Purgatorio di Dante?',
          who: 'Quale di questi personaggi del Purgatorio si trova qui: {value}?',
          tf: 'Nel Purgatorio di Dante, {name} si trova qui: {value}.',
          odd: 'Trova l\'intruso: quale personaggio del Purgatorio NON si trova qui: {value}?',
        },
      }),
      mk('paradiso', paradiso, {
        luogo: {
          ask: 'Dove incontra Dante {name} nel Paradiso?',
          who: 'Quale di questi personaggi del Paradiso si trova qui: {value}?',
          tf: 'Nel Paradiso di Dante, {name} si trova qui: {value}.',
          odd: 'Trova l\'intruso: quale personaggio del Paradiso NON si trova qui: {value}?',
        },
      }),
      mk('personaggi', pers, {
        libro: {
          ask: 'In quale opera compare il personaggio {name}?',
          who: 'Quale di questi personaggi compare in «{value}»?',
          tf: '{name} è un personaggio di «{value}».',
          odd: 'Trova l\'intruso: quale personaggio NON compare in «{value}»?',
        },
      }),
      mk('pseudonimi', pseudo, {
        vero: {
          ask: 'Qual è il vero nome di {name}?',
          who: 'Quale di questi nomi d\'arte appartiene a {value}?',
          tf: '{name} è il nome d\'arte di {value}.',
          typed: 'person',
        },
      }),
      mk('strega', strega, {
        autore: {
          ask: 'Chi ha vinto il Premio Strega con «{name}»?',
          who: 'Quale di questi libri ha vinto il Premio Strega, scritto da {value}?',
          tf: '«{name}» ha vinto il Premio Strega: l\'autore è {value}.',
          typed: 'person',
        },
      }, {
        anno: { ask: 'In che anno «{name}» ha vinto il Premio Strega?', span: 40, tol: 1, format: 'year', duel: 'Quale di questi libri ha vinto prima il Premio Strega?', lowerWins: true, order: 'Metti in ordine di vittoria al Premio Strega, dal più antico', gap: 2 },
      }),
      mk('correnti', correnti, {
        corrente: {
          ask: 'A quale corrente o movimento letterario è legato {name}?',
          who: 'Quale di questi autori è legato a questo movimento: {value}?',
          tf: '{name} è legato a questo movimento letterario: {value}.',
          odd: 'Trova l\'intruso: quale autore NON è legato a questo movimento: {value}?',
        },
      }),
      mk('poesie', poesie, {
        autore: {
          ask: 'Chi è l\'autore di «{name}»?',
          who: 'Quale di questi titoli è opera di {value}?',
          tf: '«{name}» è opera di {value}.',
          odd: 'Trova l\'intruso: quale di questi titoli NON è di {value}?',
          typed: 'person',
        },
      }),
      mk('opere', opere, {
        autore: {
          ask: 'Chi è l\'autore di «{name}»?',
          who: 'Quale di questi titoli è opera di {value}?',
          tf: '«{name}» è opera di {value}.',
          odd: 'Trova l\'intruso: quale di questi titoli NON è di {value}?',
          typed: 'person',
        },
      }),
    ],
    quotes,
    quoteText,
    emojis,
    emojiText,
    order,
    numbers,
    typed,
  });
})(typeof window !== 'undefined' ? window : globalThis);
