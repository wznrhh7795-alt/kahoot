// Dati di arte, letteratura, musica, cinema e citazioni.
(function (root) {
  'use strict';
  const D = (root.QZ_DATA = root.QZ_DATA || {});
  const rows = (text) => text.trim().split('\n').map((l) => l.trim()).filter((l) => l && !l.startsWith('#')).map((l) => l.split('|'));
  const quiz = (text) => rows(text).map(([q, a, wrong, d]) => ({ q, a, wrong: wrong.split(';'), d: Number(d) }));
  const tf = (text) => rows(text).map(([q, a, d, why]) => ({ q, a: a === 'V', d: Number(d), why }));

  // Opera | Autore | difficoltà | titolo della voce su it.wikipedia (per l'immagine)
  D.paintings = rows(`
La Gioconda|Leonardo da Vinci|1|Gioconda
L'Ultima Cena|Leonardo da Vinci|1|Ultima Cena (Leonardo)
La nascita di Venere|Sandro Botticelli|1|Nascita di Venere
La Primavera|Sandro Botticelli|2|Primavera (Botticelli)
La creazione di Adamo|Michelangelo|1|Creazione di Adamo
La scuola di Atene|Raffaello|2|Scuola di Atene
La Madonna Sistina|Raffaello|3|Madonna Sistina
Lo sposalizio della Vergine|Raffaello|3|Sposalizio della Vergine (Raffaello)
La notte stellata|Vincent van Gogh|1|Notte stellata
Notte stellata sul Rodano|Vincent van Gogh|3|Notte stellata sul Rodano
Terrazza del caffè la sera|Vincent van Gogh|2|Terrazza del caffè la sera, Place du Forum, Arles
La camera da letto ad Arles|Vincent van Gogh|2|La camera di Vincent ad Arles
L'urlo|Edvard Munch|1|L'urlo
Ragazza col turbante (con l'orecchino di perla)|Jan Vermeer|1|Ragazza col turbante
La ronda di notte|Rembrandt|2|La ronda di notte
Il bacio (1907-08)|Gustav Klimt|1|Il bacio (Klimt)
Il bacio (1859)|Francesco Hayez|2|Il bacio (Hayez)
Impressione, levar del sole|Claude Monet|2|Impressione, levar del sole
La grande onda di Kanagawa|Katsushika Hokusai|1|La grande onda di Kanagawa
Las Meninas|Diego Velázquez|2|Las Meninas (Velázquez)
Il 3 maggio 1808|Francisco Goya|2|Il 3 maggio 1808
La Libertà che guida il popolo|Eugène Delacroix|1|La Libertà che guida il popolo
Il giardino delle delizie|Hieronymus Bosch|2|Trittico del Giardino delle delizie
Canestra di frutta|Caravaggio|2|Canestra di frutta
Vocazione di san Matteo|Caravaggio|2|Vocazione di san Matteo
Bacco|Caravaggio|2|Bacco (Caravaggio)
Medusa|Caravaggio|2|Medusa (Caravaggio)
Giuditta e Oloferne|Caravaggio|3|Giuditta e Oloferne (Caravaggio)
Il Quarto Stato|Giuseppe Pellizza da Volpedo|1|Il Quarto Stato
La città che sale|Umberto Boccioni|2|La città che sale
Venere di Urbino|Tiziano|2|Venere di Urbino
Amor sacro e Amor profano|Tiziano|3|Amor sacro e Amor profano
Cristo morto|Andrea Mantegna|2|Cristo morto (Mantegna)
Dittico dei duchi di Urbino|Piero della Francesca|3|Dittico dei Duchi d'Urbino
La Tempesta|Giorgione|3|Tempesta (Giorgione)
Compianto sul Cristo morto|Giotto|2|Compianto sul Cristo morto (Giotto)
Vertumno|Giuseppe Arcimboldo|2|Vertumno (Arcimboldo)
Colazione sull'erba|Édouard Manet|2|Colazione sull'erba (Manet)
Bal au moulin de la Galette|Pierre-Auguste Renoir|2|Bal au moulin de la Galette
Una domenica pomeriggio sull'isola della Grande-Jatte|Georges Seurat|2|Una domenica pomeriggio sull'isola della Grande-Jatte
I giocatori di carte|Paul Cézanne|3|I giocatori di carte
Viandante sul mare di nebbia|Caspar David Friedrich|2|Viandante sul mare di nebbia
Il giuramento degli Orazi|Jacques-Louis David|3|Il giuramento degli Orazi
La morte di Marat|Jacques-Louis David|2|La morte di Marat
Le spigolatrici|Jean-François Millet|3|Le spigolatrici (Millet)
Cacciatori nella neve|Pieter Bruegel il Vecchio|2|Cacciatori nella neve
La torre di Babele|Pieter Bruegel il Vecchio|2|Torre di Babele (Bruegel)
Ritratto dei coniugi Arnolfini|Jan van Eyck|2|Ritratto dei coniugi Arnolfini
Pioggia, vapore e velocità|William Turner|3|Pioggia, vapore e velocità
Da dove veniamo? Chi siamo? Dove andiamo?|Paul Gauguin|3|Da dove veniamo? Chi siamo? Dove andiamo?
La zattera della Medusa|Théodore Géricault|3|La zattera della Medusa
`).map(([title, artist, d, wiki]) => ({ title, artist, d: Number(d), wiki }));

  // Opera letteraria | Autore | difficoltà
  D.books = rows(`
La Divina Commedia|Dante Alighieri|1
I promessi sposi|Alessandro Manzoni|1
Il Decameron|Giovanni Boccaccio|1
Il Canzoniere|Francesco Petrarca|1
Orlando furioso|Ludovico Ariosto|2
Gerusalemme liberata|Torquato Tasso|2
Il principe|Niccolò Machiavelli|1
Le avventure di Pinocchio|Carlo Collodi|1
Cuore|Edmondo De Amicis|1
I Malavoglia|Giovanni Verga|1
Mastro-don Gesualdo|Giovanni Verga|2
Il fu Mattia Pascal|Luigi Pirandello|1
Uno, nessuno e centomila|Luigi Pirandello|1
Sei personaggi in cerca d'autore|Luigi Pirandello|2
La coscienza di Zeno|Italo Svevo|1
Il piacere|Gabriele D'Annunzio|2
Il Gattopardo|Giuseppe Tomasi di Lampedusa|1
Il nome della rosa|Umberto Eco|1
Il pendolo di Foucault|Umberto Eco|2
Il barone rampante|Italo Calvino|1
Il visconte dimezzato|Italo Calvino|2
Il cavaliere inesistente|Italo Calvino|2
Le città invisibili|Italo Calvino|2
Marcovaldo|Italo Calvino|2
Il sentiero dei nidi di ragno|Italo Calvino|3
Se una notte d'inverno un viaggiatore|Italo Calvino|3
Se questo è un uomo|Primo Levi|1
La tregua|Primo Levi|2
Il sistema periodico|Primo Levi|3
La Storia|Elsa Morante|2
L'isola di Arturo|Elsa Morante|2
Gli indifferenti|Alberto Moravia|2
La noia|Alberto Moravia|3
Il giardino dei Finzi-Contini|Giorgio Bassani|2
Il deserto dei Tartari|Dino Buzzati|2
La luna e i falò|Cesare Pavese|2
Cristo si è fermato a Eboli|Carlo Levi|2
Il giorno della civetta|Leonardo Sciascia|2
Lessico famigliare|Natalia Ginzburg|2
Novecento|Alessandro Baricco|2
Seta|Alessandro Baricco|2
Io non ho paura|Niccolò Ammaniti|2
La solitudine dei numeri primi|Paolo Giordano|2
L'amica geniale|Elena Ferrante|1
Gomorra|Roberto Saviano|1
Va' dove ti porta il cuore|Susanna Tamaro|2
La forma dell'acqua|Andrea Camilleri|2
Le tigri di Mompracem|Emilio Salgari|2
Il Corsaro Nero|Emilio Salgari|2
Favole al telefono|Gianni Rodari|1
Il giornalino di Gian Burrasca|Vamba|3
Le ultime lettere di Jacopo Ortis|Ugo Foscolo|2
Dei Sepolcri|Ugo Foscolo|2
Operette morali|Giacomo Leopardi|2
Myricae|Giovanni Pascoli|2
Ossi di seppia|Eugenio Montale|2
L'allegria|Giuseppe Ungaretti|2
Il giorno|Giuseppe Parini|3
Il Milione|Marco Polo|2
Il Cantico delle creature|San Francesco d'Assisi|1
Iliade|Omero|1
Odissea|Omero|1
Eneide|Virgilio|1
Le metamorfosi|Ovidio|2
Romeo e Giulietta|William Shakespeare|1
Amleto|William Shakespeare|1
Macbeth|William Shakespeare|1
Otello|William Shakespeare|2
Don Chisciotte della Mancia|Miguel de Cervantes|1
I miserabili|Victor Hugo|1
Notre-Dame de Paris|Victor Hugo|2
Il conte di Montecristo|Alexandre Dumas|1
I tre moschettieri|Alexandre Dumas|1
Madame Bovary|Gustave Flaubert|2
Guerra e pace|Lev Tolstoj|1
Anna Karenina|Lev Tolstoj|1
Delitto e castigo|Fëdor Dostoevskij|1
I fratelli Karamazov|Fëdor Dostoevskij|2
Moby Dick|Herman Melville|1
Le avventure di Tom Sawyer|Mark Twain|1
Il grande Gatsby|Francis Scott Fitzgerald|2
Il vecchio e il mare|Ernest Hemingway|1
Addio alle armi|Ernest Hemingway|2
Per chi suona la campana|Ernest Hemingway|2
1984|George Orwell|1
La fattoria degli animali|George Orwell|1
Il Signore degli Anelli|J. R. R. Tolkien|1
Lo Hobbit|J. R. R. Tolkien|1
Harry Potter e la pietra filosofale|J. K. Rowling|1
Il Piccolo Principe|Antoine de Saint-Exupéry|1
Alice nel Paese delle Meraviglie|Lewis Carroll|1
Le cronache di Narnia|C. S. Lewis|2
Il buio oltre la siepe|Harper Lee|2
Il giovane Holden|J. D. Salinger|2
Cent'anni di solitudine|Gabriel García Márquez|1
L'amore ai tempi del colera|Gabriel García Márquez|2
Il processo|Franz Kafka|2
La metamorfosi|Franz Kafka|1
Ulisse|James Joyce|2
Frankenstein|Mary Shelley|1
Dracula|Bram Stoker|1
Cime tempestose|Emily Brontë|2
Jane Eyre|Charlotte Brontë|2
Orgoglio e pregiudizio|Jane Austen|1
Oliver Twist|Charles Dickens|1
Canto di Natale|Charles Dickens|1
David Copperfield|Charles Dickens|2
Ventimila leghe sotto i mari|Jules Verne|1
Il giro del mondo in 80 giorni|Jules Verne|1
L'isola del tesoro|Robert Louis Stevenson|1
Lo strano caso del dottor Jekyll e del signor Hyde|Robert Louis Stevenson|2
Il richiamo della foresta|Jack London|2
Zanna Bianca|Jack London|1
Uomini e topi|John Steinbeck|2
Furore|John Steinbeck|2
Lolita|Vladimir Nabokov|2
Siddharta|Hermann Hesse|1
Il lupo della steppa|Hermann Hesse|2
Lo straniero|Albert Camus|2
La peste|Albert Camus|2
Il codice da Vinci|Dan Brown|1
It|Stephen King|1
Shining|Stephen King|1
Il ritratto di Dorian Gray|Oscar Wilde|1
Il signore delle mosche|William Golding|2
Fahrenheit 451|Ray Bradbury|2
Il mondo nuovo|Aldous Huxley|2
Piccole donne|Louisa May Alcott|1
La capanna dello zio Tom|Harriet Beecher Stowe|2
Via col vento|Margaret Mitchell|1
Il meraviglioso mago di Oz|L. Frank Baum|2
Peter Pan|J. M. Barrie|1
Il libro della giungla|Rudyard Kipling|1
Robinson Crusoe|Daniel Defoe|1
I viaggi di Gulliver|Jonathan Swift|1
I dolori del giovane Werther|Johann Wolfgang von Goethe|2
Faust|Johann Wolfgang von Goethe|2
Il nome del vento|Patrick Rothfuss|3
Il trono di spade|George R. R. Martin|1
Dieci piccoli indiani|Agatha Christie|1
Assassinio sull'Orient Express|Agatha Christie|1
Uno studio in rosso|Arthur Conan Doyle|2
Il mastino dei Baskerville|Arthur Conan Doyle|2
`).map(([title, author, d]) => ({ title, author, d: Number(d) }));

  // Incipit famosi: testo | opera | autore | difficoltà
  D.incipits = rows(`
Nel mezzo del cammin di nostra vita mi ritrovai per una selva oscura|La Divina Commedia|Dante Alighieri|1
Quel ramo del lago di Como, che volge a mezzogiorno|I promessi sposi|Alessandro Manzoni|1
C'era una volta... - Un re! - diranno subito i miei piccoli lettori. No, ragazzi, avete sbagliato. C'era una volta un pezzo di legno.|Le avventure di Pinocchio|Carlo Collodi|1
Le donne, i cavallier, l'arme, gli amori, le cortesie, l'audaci imprese io canto|Orlando furioso|Ludovico Ariosto|2
Canto l'arme pietose e 'l capitano che 'l gran sepolcro liberò di Cristo|Gerusalemme liberata|Torquato Tasso|3
Cantami, o Diva, del Pelìde Achille l'ira funesta|Iliade (trad. Vincenzo Monti)|Omero|1
Chiamatemi Ismaele.|Moby Dick|Herman Melville|2
Tutte le famiglie felici si somigliano; ogni famiglia infelice è invece infelice a modo suo.|Anna Karenina|Lev Tolstoj|2
È una verità universalmente riconosciuta che uno scapolo in possesso di un cospicuo patrimonio debba essere in cerca di moglie.|Orgoglio e pregiudizio|Jane Austen|2
Era il migliore dei tempi, era il peggiore dei tempi|Racconto di due città|Charles Dickens|3
Molti anni dopo, di fronte al plotone di esecuzione, il colonnello Aureliano Buendía si sarebbe ricordato di quel remoto pomeriggio in cui suo padre lo aveva condotto a conoscere il ghiaccio.|Cent'anni di solitudine|Gabriel García Márquez|2
Una mattina Gregor Samsa, destandosi da sogni inquieti, si trovò mutato, nel suo letto, in un enorme insetto.|La metamorfosi|Franz Kafka|1
In una caverna sotto terra viveva uno hobbit.|Lo Hobbit|J. R. R. Tolkien|2
Il signore e la signora Dursley, di Privet Drive numero 4, erano orgogliosi di poter affermare che erano perfettamente normali, e grazie tante.|Harry Potter e la pietra filosofale|J. K. Rowling|2
Era una fredda e luminosa giornata d'aprile, e gli orologi battevano tredici colpi.|1984|George Orwell|2
Oggi la mamma è morta. O forse ieri, non so.|Lo straniero|Albert Camus|2
`).map(([text, work, author, d]) => ({ text, work, author, d: Number(d) }));

  // Citazioni: frase | autore | fonte (facoltativa) | difficoltà
  D.quotes = rows(`
Fatti non foste a viver come bruti, ma per seguir virtute e canoscenza.|Dante Alighieri|Inferno, canto XXVI|1
Lasciate ogne speranza, voi ch'intrate.|Dante Alighieri|Inferno, canto III|1
Amor, ch'a nullo amato amar perdona.|Dante Alighieri|Inferno, canto V|2
Considerate la vostra semenza.|Dante Alighieri|Inferno, canto XXVI|2
Tanto gentile e tanto onesta pare la donna mia quand'ella altrui saluta.|Dante Alighieri|Vita Nova|2
Questo matrimonio non s'ha da fare, né domani, né mai.|Alessandro Manzoni|I promessi sposi|1
Sempre caro mi fu quest'ermo colle.|Giacomo Leopardi|L'infinito|1
E il naufragar m'è dolce in questo mare.|Giacomo Leopardi|L'infinito|1
Silvia, rimembri ancora quel tempo della tua vita mortale.|Giacomo Leopardi|A Silvia|2
La donzelletta vien dalla campagna, in sul calar del sole.|Giacomo Leopardi|Il sabato del villaggio|2
Ognuno sta solo sul cuor della terra trafitto da un raggio di sole: ed è subito sera.|Salvatore Quasimodo|Ed è subito sera|1
M'illumino d'immenso.|Giuseppe Ungaretti|Mattina|1
Si sta come d'autunno sugli alberi le foglie.|Giuseppe Ungaretti|Soldati|1
Meriggiare pallido e assorto presso un rovente muro d'orto.|Eugenio Montale|Ossi di seppia|2
Spesso il male di vivere ho incontrato.|Eugenio Montale|Ossi di seppia|2
Ho sceso, dandoti il braccio, almeno un milione di scale.|Eugenio Montale|Satura|2
La nebbia a gl'irti colli piovigginando sale.|Giosuè Carducci|San Martino|2
T'amo, pio bove.|Giosuè Carducci|Il bove|3
C'è qualcosa di nuovo oggi nel sole, anzi d'antico.|Giovanni Pascoli|L'aquilone|3
Piove su le tamerici salmastre ed arse.|Gabriele D'Annunzio|La pioggia nel pineto|2
Erano i capei d'oro a l'aura sparsi.|Francesco Petrarca|Canzoniere|2
Chiare, fresche et dolci acque.|Francesco Petrarca|Canzoniere|2
Chi vuol esser lieto, sia: di doman non c'è certezza.|Lorenzo de' Medici|Canzona di Bacco|2
Se vogliamo che tutto rimanga com'è, bisogna che tutto cambi.|Giuseppe Tomasi di Lampedusa|Il Gattopardo|1
Essere o non essere, questo è il problema.|William Shakespeare|Amleto|1
Il mondo intero è un palcoscenico.|William Shakespeare|Come vi piace|2
Veni, vidi, vici.|Giulio Cesare|riferita da Svetonio e Plutarco|1
Alea iacta est (Il dado è tratto).|Giulio Cesare|riferita da Svetonio|1
Penso, dunque sono.|Cartesio|Discorso sul metodo|1
L'uomo è per natura un animale politico.|Aristotele|Politica|2
Obbedisco.|Giuseppe Garibaldi|telegramma del 1866|2
L'essenziale è invisibile agli occhi.|Antoine de Saint-Exupéry|Il Piccolo Principe|1
Tutti gli animali sono uguali, ma alcuni animali sono più uguali degli altri.|George Orwell|La fattoria degli animali|1
Il Grande Fratello ti guarda.|George Orwell|1984|1
Dopotutto, domani è un altro giorno!|Margaret Mitchell|Via col vento|2
Ho un sogno.|Martin Luther King|discorso del 1963|1
Un piccolo passo per un uomo, un grande balzo per l'umanità.|Neil Armstrong|sbarco sulla Luna, 1969|1
Siate affamati, siate folli.|Steve Jobs|discorso a Stanford, 2005|1
Nulla si crea, nulla si distrugge, tutto si trasforma.|Antoine Lavoisier|principio di conservazione della massa|2
La filosofia è scritta in questo grandissimo libro che continuamente ci sta aperto innanzi a gli occhi (io dico l'universo).|Galileo Galilei|Il Saggiatore|3
Conosci te stesso.|Oracolo di Delfi|iscrizione nel tempio di Apollo|2
Panta rei (tutto scorre).|Eraclito|attribuita|2
So di non sapere.|Socrate|dall'Apologia di Platone|1
Dio è morto.|Friedrich Nietzsche|La gaia scienza|2
L'inferno sono gli altri.|Jean-Paul Sartre|A porte chiuse|2
`).map(([text, author, source, d]) => ({ text, author, source, d: Number(d) }));

  // Battute di film: battuta | film | difficoltà
  D.filmQuotes = rows(`
Che la Forza sia con te.|Star Wars|1
No, io sono tuo padre.|L'Impero colpisce ancora|1
Houston, abbiamo un problema.|Apollo 13|1
Francamente, me ne infischio.|Via col vento|2
Sono il re del mondo!|Titanic|1
Ti spiezzo in due.|Rocky IV|1
Hasta la vista, baby.|Terminator 2 - Il giorno del giudizio|1
Tornerò.|Terminator|2
Nessuno è perfetto.|A qualcuno piace caldo|2
Buongiorno, principessa!|La vita è bella|1
Il mio nome è Bond, James Bond.|Agente 007 - Licenza di uccidere|1
Hakuna matata!|Il re leone|1
Verso l'infinito e oltre!|Toy Story|1
Corri, Forrest, corri!|Forrest Gump|1
La vita è uguale a una scatola di cioccolatini: non sai mai quello che ti capita.|Forrest Gump|1
Gli farò un'offerta che non potrà rifiutare.|Il padrino|1
Specchio, servo delle mie brame, chi è la più bella del reame?|Biancaneve e i sette nani|1
Mi chiamo Inigo Montoya. Tu hai ucciso mio padre. Preparati a morire.|La storia fantastica|3
Al mio segnale, scatenate l'inferno.|Il gladiatore|1
Io ho visto cose che voi umani non potreste immaginarvi.|Blade Runner|2
Mi piace l'odore del napalm al mattino.|Apocalypse Now|3
Vedo la gente morta.|Il sesto senso|2
Siamo in missione per conto di Dio.|The Blues Brothers|2
Oh capitano! Mio capitano!|L'attimo fuggente|1
Carpe diem. Cogliete l'attimo, ragazzi.|L'attimo fuggente|2
E.T. telefono casa.|E.T. l'extra-terrestre|1
Toto, ho la sensazione che non siamo più nel Kansas.|Il mago di Oz|2
Io sono Groot.|Guardiani della Galassia|1
Wakanda per sempre!|Black Panther|2
Io sono Iron Man.|Iron Man|1
Da un grande potere derivano grandi responsabilità.|Spider-Man|1
Ogni volta che un campanello suona, un angelo prende le ali.|La vita è meravigliosa|3
`).map(([text, film, d]) => ({ text, film, d: Number(d) }));

  // Opere liriche: titolo | compositore | difficoltà
  D.operas = rows(`
La traviata|Giuseppe Verdi|1
Rigoletto|Giuseppe Verdi|1
Aida|Giuseppe Verdi|1
Nabucco|Giuseppe Verdi|1
Il trovatore|Giuseppe Verdi|2
Otello|Giuseppe Verdi|2
Falstaff|Giuseppe Verdi|3
La forza del destino|Giuseppe Verdi|3
Un ballo in maschera|Giuseppe Verdi|3
La bohème|Giacomo Puccini|1
Tosca|Giacomo Puccini|1
Madama Butterfly|Giacomo Puccini|1
Turandot|Giacomo Puccini|1
Manon Lescaut|Giacomo Puccini|2
Gianni Schicchi|Giacomo Puccini|3
Il barbiere di Siviglia|Gioachino Rossini|1
Guglielmo Tell|Gioachino Rossini|2
La Cenerentola|Gioachino Rossini|2
L'italiana in Algeri|Gioachino Rossini|3
Le nozze di Figaro|Wolfgang Amadeus Mozart|1
Don Giovanni|Wolfgang Amadeus Mozart|1
Il flauto magico|Wolfgang Amadeus Mozart|1
Così fan tutte|Wolfgang Amadeus Mozart|2
L'elisir d'amore|Gaetano Donizetti|2
Lucia di Lammermoor|Gaetano Donizetti|2
Don Pasquale|Gaetano Donizetti|3
Norma|Vincenzo Bellini|2
La sonnambula|Vincenzo Bellini|3
I puritani|Vincenzo Bellini|3
Cavalleria rusticana|Pietro Mascagni|2
Pagliacci|Ruggero Leoncavallo|2
Carmen|Georges Bizet|1
L'Orfeo|Claudio Monteverdi|3
Lohengrin|Richard Wagner|2
Tristano e Isotta|Richard Wagner|2
`).map(([title, composer, d]) => ({ title, composer, d: Number(d) }));

  // Brani di musica classica: titolo | compositore | difficoltà
  D.classical = rows(`
Le quattro stagioni|Antonio Vivaldi|1
Bolero|Maurice Ravel|1
Il lago dei cigni|Pëtr Il'ič Čajkovskij|1
Lo schiaccianoci|Pëtr Il'ič Čajkovskij|1
La Nona Sinfonia (con l'Inno alla gioia)|Ludwig van Beethoven|1
Per Elisa|Ludwig van Beethoven|1
Sonata «Al chiaro di luna»|Ludwig van Beethoven|2
Eine kleine Nachtmusik|Wolfgang Amadeus Mozart|2
Requiem in re minore|Wolfgang Amadeus Mozart|2
Il Messia|Georg Friedrich Händel|2
Sul bel Danubio blu|Johann Strauss figlio|2
Rapsodia in blu|George Gershwin|2
Canone in re|Johann Pachelbel|2
Toccata e fuga in re minore|Johann Sebastian Bach|2
Concerti brandeburghesi|Johann Sebastian Bach|2
Il volo del calabrone|Nikolaj Rimskij-Korsakov|2
Clair de lune|Claude Debussy|2
Il carnevale degli animali|Camille Saint-Saëns|2
Pierino e il lupo|Sergej Prokof'ev|2
Carmina Burana|Carl Orff|2
Peer Gynt (Nell'antro del re della montagna)|Edvard Grieg|3
Sinfonia «Dal Nuovo Mondo»|Antonín Dvořák|3
I pianeti|Gustav Holst|3
Notturni per pianoforte|Fryderyk Chopin|2
Danze ungheresi|Johannes Brahms|3
Ave Maria|Franz Schubert|2
`).map(([title, composer, d]) => ({ title, composer, d: Number(d) }));

  // Film | regista | anno | difficoltà
  D.films = rows(`
La dolce vita|Federico Fellini|1960|1
8½|Federico Fellini|1963|2
Amarcord|Federico Fellini|1973|2
La strada|Federico Fellini|1954|2
La vita è bella|Roberto Benigni|1997|1
Nuovo Cinema Paradiso|Giuseppe Tornatore|1988|1
La grande bellezza|Paolo Sorrentino|2013|1
Il buono, il brutto, il cattivo|Sergio Leone|1966|1
C'era una volta il West|Sergio Leone|1968|2
Per un pugno di dollari|Sergio Leone|1964|2
Roma città aperta|Roberto Rossellini|1945|2
Ladri di biciclette|Vittorio De Sica|1948|2
Il Gattopardo|Luchino Visconti|1963|2
Mediterraneo|Gabriele Salvatores|1991|2
Caro diario|Nanni Moretti|1993|2
L'ultimo imperatore|Bernardo Bertolucci|1987|2
Titanic|James Cameron|1997|1
Avatar|James Cameron|2009|1
Terminator|James Cameron|1984|2
Lo squalo|Steven Spielberg|1975|1
E.T. l'extra-terrestre|Steven Spielberg|1982|1
Jurassic Park|Steven Spielberg|1993|1
Schindler's List|Steven Spielberg|1993|1
Il padrino|Francis Ford Coppola|1972|1
Apocalypse Now|Francis Ford Coppola|1979|2
Pulp Fiction|Quentin Tarantino|1994|1
Kill Bill|Quentin Tarantino|2003|2
Psyco|Alfred Hitchcock|1960|1
La finestra sul cortile|Alfred Hitchcock|1954|2
Gli uccelli|Alfred Hitchcock|1963|2
2001: Odissea nello spazio|Stanley Kubrick|1968|1
Arancia meccanica|Stanley Kubrick|1971|2
Shining|Stanley Kubrick|1980|1
Inception|Christopher Nolan|2010|1
Interstellar|Christopher Nolan|2014|1
Oppenheimer|Christopher Nolan|2023|1
Taxi Driver|Martin Scorsese|1976|2
Quei bravi ragazzi|Martin Scorsese|1990|2
Guerre stellari|George Lucas|1977|1
Il Signore degli Anelli - La compagnia dell'anello|Peter Jackson|2001|1
Forrest Gump|Robert Zemeckis|1994|1
Ritorno al futuro|Robert Zemeckis|1985|1
Il silenzio degli innocenti|Jonathan Demme|1991|2
Il gladiatore|Ridley Scott|2000|1
Alien|Ridley Scott|1979|2
Blade Runner|Ridley Scott|1982|2
La città incantata|Hayao Miyazaki|2001|2
Il mio vicino Totoro|Hayao Miyazaki|1988|2
Tempi moderni|Charlie Chaplin|1936|1
Il grande dittatore|Charlie Chaplin|1940|2
Barbie|Greta Gerwig|2023|2
Parasite|Bong Joon-ho|2019|2
Matrix|Lana e Lilly Wachowski|1999|2
`).map(([title, director, year, d]) => ({ title, director, year: Number(year), d: Number(d) }));

  // Film da indovinare con le emoji: emoji | titolo | difficoltà
  D.emojiFilms = rows(`
🦁👑🌅|Il re leone|1
🚢🧊💔|Titanic|1
🕷️🧑🏙️|Spider-Man|1
🦇🌃🃏|Batman|1
💍🌋🧙‍♂️|Il Signore degli Anelli|1
⚡👓🧙‍♂️🏰|Harry Potter|1
🦖🦕🏝️🚙|Jurassic Park|1
👽📞🏠🚲|E.T. l'extra-terrestre|1
🦈🏖️🎶|Lo squalo|1
🐠🔍🌊|Alla ricerca di Nemo|1
❄️👸⛄|Frozen|1
🐀👨‍🍳🍝|Ratatouille|1
🚗⚡🏁|Cars|1
🤠🚀🧸|Toy Story|1
👻🚫🔫|Ghostbusters|1
🏃‍♂️🍫🪶|Forrest Gump|1
⏰🚗⚡🔙|Ritorno al futuro|1
🌌⚔️🤖|Guerre stellari|1
🤖🌱🌍|WALL•E|1
🎈🏠👴|Up|1
🐉👦🔥|Dragon Trainer|2
🧞‍♂️🪔🐒|Aladdin|1
🧜‍♀️🦀🔱|La sirenetta|1
🌹👸🐃|La bella e la bestia|1
🐶🐶🍝|Lilli e il vagabondo|1
🐘👂🎪|Dumbo|1
🦌🌲❄️|Bambi|2
🍎👸⛏️|Biancaneve e i sette nani|1
👠🎃🕛|Cenerentola|1
🐼🥋🥟|Kung Fu Panda|1
👹🧅🐴|Shrek|1
🔨⚡🌩️|Thor|2
🛡️⭐🇺🇸|Captain America|2
🐇🕰️🍵|Alice nel Paese delle Meraviglie|1
🍫🏭🎫|La fabbrica di cioccolato|1
☂️👩🎶|Mary Poppins|1
🌪️🏠👠|Il mago di Oz|2
🦍🏙️✈️|King Kong|2
🐒🐒🪐|Il pianeta delle scimmie|2
🔴💊🔵💊|Matrix|1
🪐🚀⏳|Interstellar|2
💤🌀🏙️|Inception|2
🃏🤡🪜|Joker|2
🍊⏰|Arancia meccanica|3
🏠👦🎄✈️|Mamma, ho perso l'aereo|1
🏴‍☠️💀⚓🦜|Pirati dei Caraibi|1
🐰🦊🚓|Zootropolis|2
👨‍👩‍👧‍👦🦸|Gli Incredibili|1
😄😢😡😱🤢|Inside Out|1
💀🎸🌼|Coco|1
🌊🛶🌺|Oceania|2
🐿️🌰🧊|L'era glaciale|1
👨‍🚀🥔🔴|Sopravvissuto - The Martian|2
🥊🇺🇸🏃|Rocky|1
🤵🍸🔫|007|1
🕶️👽🔫|Men in Black|1
🐢🐢🐢🐢🍕|Tartarughe Ninja|1
👸💤🌹|La bella addormentata nel bosco|1
🐻🍯🎈|Winnie the Pooh|1
🧛🩸🏰|Dracula|2
🏹👧🔥|Hunger Games|2
🍌💛👓|Cattivissimo me|1
🦸‍♂️🦸‍♀️💎🧤|Avengers|2
🐍🐍✈️|Snakes on a Plane|3
`).map(([emoji, title, d]) => ({ emoji, title, d: Number(d) }));

  D.artQuiz = quiz(`
In quale museo è esposta la Gioconda?|Louvre|Uffizi;Prado;British Museum|1
In quale museo è esposta la Nascita di Venere di Botticelli?|Galleria degli Uffizi|Musei Vaticani;Louvre;Pinacoteca di Brera|1
In quale città si trova l'Ultima Cena di Leonardo?|Milano|Firenze;Roma;Venezia|1
In quale città si trova il David di Michelangelo (originale)?|Firenze|Roma;Milano;Venezia|1
Chi ha affrescato la volta della Cappella Sistina?|Michelangelo|Raffaello;Leonardo;Giotto|1
Chi ha scolpito la Pietà conservata in San Pietro?|Michelangelo|Bernini;Donatello;Canova|1
Chi ha realizzato il colonnato di Piazza San Pietro?|Gian Lorenzo Bernini|Michelangelo;Borromini;Bramante|2
Chi ha progettato la cupola del Duomo di Firenze?|Filippo Brunelleschi|Michelangelo;Giotto;Leon Battista Alberti|1
Chi ha scolpito «Amore e Psiche» e «Paolina Borghese»?|Antonio Canova|Bernini;Michelangelo;Donatello|2
Chi ha affrescato la Cappella degli Scrovegni a Padova?|Giotto|Cimabue;Masaccio;Mantegna|2
A quale corrente appartiene Claude Monet?|Impressionismo|Cubismo;Surrealismo;Futurismo|1
A quale corrente appartiene Umberto Boccioni?|Futurismo|Cubismo;Impressionismo;Barocco|2
Quale artista si tagliò parte di un orecchio?|Vincent van Gogh|Paul Gauguin;Pablo Picasso;Edvard Munch|1
Chi ha dipinto «Guernica»?|Pablo Picasso|Salvador Dalí;Joan Miró;Francisco Goya|1
Chi ha dipinto «La persistenza della memoria» con gli orologi molli?|Salvador Dalí|René Magritte;Pablo Picasso;Max Ernst|1
Chi ha dipinto la serie di ritratti di Marilyn Monroe in stile pop?|Andy Warhol|Roy Lichtenstein;Keith Haring;Jackson Pollock|1
Chi ha dipinto «Il figlio dell'uomo», con una mela davanti al volto?|René Magritte|Salvador Dalí;Max Ernst;Giorgio de Chirico|2
Quale pittore italiano è famoso per la «pittura metafisica»?|Giorgio de Chirico|Amedeo Modigliani;Giorgio Morandi;Carlo Carrà|2
Quale artista livornese è famoso per i ritratti con colli allungati?|Amedeo Modigliani|Giorgio Morandi;Giovanni Fattori;Giorgio de Chirico|2
Quale pittore bolognese è famoso per le nature morte con bottiglie?|Giorgio Morandi|Amedeo Modigliani;Renato Guttuso;Giorgio de Chirico|3
Quale gruppo di pittori toscani dell'Ottocento dipingeva «a macchie»?|I Macchiaioli|I Futuristi;Gli Scapigliati;I Divisionisti|2
Chi è l'autore del «Cenacolo» e dell'«Uomo vitruviano»?|Leonardo da Vinci|Michelangelo;Raffaello;Botticelli|1
Quale tecnica pittorica si esegue sull'intonaco fresco?|Affresco|Tempera;Acquerello;Olio|1
Che cosa è un «autoritratto»?|Un ritratto dell'artista fatto da sé stesso|Un ritratto di un re;Un ritratto senza volto;Un ritratto di gruppo|1
Quali sono i tre colori primari in pittura (sintesi sottrattiva tradizionale)?|Rosso, giallo, blu|Verde, arancione, viola;Bianco, nero, grigio;Rosso, verde, blu|1
Quale colore si ottiene mescolando giallo e blu?|Verde|Arancione;Viola;Marrone|1
Quale colore si ottiene mescolando rosso e giallo?|Arancione|Verde;Viola;Rosa|1
Quale colore si ottiene mescolando rosso e blu?|Viola|Verde;Arancione;Marrone|1
In quale città si trova il Museo del Prado?|Madrid|Barcellona;Lisbona;Siviglia|1
In quale città si trova il Rijksmuseum?|Amsterdam|Bruxelles;Berlino;Vienna|2
In quale città si trova il Museo Egizio più importante d'Italia?|Torino|Milano;Roma;Napoli|1
In quale città si trova la Pinacoteca di Brera?|Milano|Torino;Bologna;Bergamo|2
In quale città si trova la Galleria Borghese?|Roma|Firenze;Milano;Napoli|2
In quale città si trova il Museo Archeologico con i reperti di Pompei?|Napoli|Roma;Salerno;Pompei|2
Quale architetto progettò la Sagrada Família?|Antoni Gaudí|Le Corbusier;Renzo Piano;Frank Gehry|1
Quale architetto italiano ha progettato il Centre Pompidou con Richard Rogers?|Renzo Piano|Gae Aulenti;Aldo Rossi;Massimiliano Fuksas|2
Quale architetto ha progettato il Guggenheim di Bilbao?|Frank Gehry|Renzo Piano;Zaha Hadid;Santiago Calatrava|2
`);

  D.artTF = tf(`
La Gioconda è esposta al Louvre di Parigi.|V|1|
Michelangelo ha dipinto la Gioconda.|F|1|L'ha dipinta Leonardo da Vinci.
Van Gogh vendette moltissimi quadri in vita.|F|2|In vita ne vendette pochissimi.
Il David di Michelangelo è in marmo.|V|1|
La Torre di Pisa è il campanile del Duomo di Pisa.|V|2|
Raffaello e Leonardo erano contemporanei.|V|2|
Caravaggio è famoso per il forte contrasto tra luce e ombra.|V|1|
Picasso è uno dei fondatori del Cubismo.|V|1|
`);

  D.musicQuiz = quiz(`
Quante note ci sono nella scala musicale (do re mi fa sol la si)?|7|5;8;12|1
Quante linee ha il pentagramma?|5|4;6;7|1
Quale strumento ha 88 tasti?|Pianoforte|Organo;Fisarmonica;Clavicembalo|1
Quale strumento suonava Niccolò Paganini?|Violino|Pianoforte;Chitarra;Flauto|1
Di quale città era il liutaio Antonio Stradivari?|Cremona|Venezia;Firenze;Bologna|1
Quale compositore divenne sordo ma continuò a comporre?|Ludwig van Beethoven|Mozart;Bach;Vivaldi|1
Quale compositore era detto «il prete rosso»?|Antonio Vivaldi|Gioachino Rossini;Giuseppe Verdi;Arcangelo Corelli|2
Quale compositore scrisse «Va', pensiero»?|Giuseppe Verdi|Giacomo Puccini;Gioachino Rossini;Vincenzo Bellini|1
In quale opera si canta «Nessun dorma»?|Turandot|Tosca;La bohème;Aida|1
In quale opera si canta «La donna è mobile»?|Rigoletto|La traviata;Aida;Nabucco|1
In quale opera si canta «Libiamo ne' lieti calici»?|La traviata|Rigoletto;Il trovatore;Carmen|2
Quale cantante tenore italiano rese famoso «Nessun dorma» in tutto il mondo?|Luciano Pavarotti|Andrea Bocelli;Enrico Caruso;Plácido Domingo|1
Quale tenore italiano cantò «Con te partirò»?|Andrea Bocelli|Luciano Pavarotti;Il Volo;Zucchero|1
Quale gruppo britannico era composto da John, Paul, George e Ringo?|The Beatles|The Rolling Stones;Queen;The Who|1
Chi era il cantante dei Queen?|Freddie Mercury|Mick Jagger;David Bowie;Elton John|1
Chi era soprannominato «il re del rock and roll»?|Elvis Presley|Chuck Berry;Little Richard;Johnny Cash|1
Chi era soprannominato «il re del pop»?|Michael Jackson|Prince;Elvis Presley;Justin Timberlake|1
Quale gruppo italiano ha vinto l'Eurovision Song Contest nel 2021?|Måneskin|Il Volo;Pinguini Tattici Nucleari;Modà|1
Chi ha cantato «Nel blu, dipinto di blu (Volare)»?|Domenico Modugno|Adriano Celentano;Gianni Morandi;Lucio Dalla|1
Chi ha cantato «Azzurro» nel 1968?|Adriano Celentano|Paolo Conte;Lucio Battisti;Gianni Morandi|2
Chi è l'autore della canzone «Azzurro»?|Paolo Conte (con Vito Pallavicini e Michele Virano)|Lucio Battisti;Fabrizio De André;Mogol|3
Chi ha cantato «La canzone di Marinella» e «Bocca di rosa»?|Fabrizio De André|Francesco Guccini;Lucio Dalla;Francesco De Gregori|2
Chi ha cantato «Caruso»?|Lucio Dalla|Lucio Battisti;Andrea Bocelli;Vasco Rossi|1
Chi ha cantato «Vita spericolata»?|Vasco Rossi|Ligabue;Zucchero;Gianna Nannini|1
Chi ha cantato «Certe notti»?|Ligabue|Vasco Rossi;Jovanotti;Eros Ramazzotti|1
Chi ha cantato «Emozioni» e «La canzone del sole»?|Lucio Battisti|Lucio Dalla;Renato Zero;Claudio Baglioni|2
Chi ha cantato «La solitudine» a Sanremo 1993?|Laura Pausini|Elisa;Giorgia;Alessandra Amoroso|1
Quale festival musicale si tiene ogni anno a Sanremo?|Festival della canzone italiana|Umbria Jazz;Festivalbar;Primo Maggio|1
Quale strumento è a fiato tra questi?|Clarinetto|Violoncello;Arpa;Timpano|1
Quale strumento ha 47 corde nella versione da concerto?|Arpa|Chitarra;Violino;Mandolino|3
Quale strumento si suona con l'archetto?|Violoncello|Tromba;Chitarra;Batteria|1
Come si chiama chi dirige un'orchestra?|Direttore d'orchestra|Maestro di cappella;Primo violino;Regista|1
Qual è la voce femminile più acuta?|Soprano|Contralto;Mezzosoprano;Baritono|1
Qual è la voce maschile più grave?|Basso|Tenore;Baritono;Controtenore|1
Che cosa indica il termine «forte» in uno spartito?|Suonare a volume alto|Suonare veloce;Suonare lento;Suonare staccato|1
Che cosa indica il termine «adagio»?|Un tempo lento|Un tempo veloce;Un volume alto;Una pausa|2
`);

  D.cinemaQuiz = quiz(`
Quale film italiano ha vinto l'Oscar come miglior film straniero nel 1999 (cerimonia)?|La vita è bella|Nuovo Cinema Paradiso;Mediterraneo;La grande bellezza|2
Chi ha interpretato il ragionier Ugo Fantozzi?|Paolo Villaggio|Lino Banfi;Alberto Sordi;Carlo Verdone|1
Chi ha recitato in «Un americano a Roma»?|Alberto Sordi|Nino Manfredi;Vittorio Gassman;Totò|2
Chi era detto «il principe della risata»?|Totò|Alberto Sordi;Peppino De Filippo;Massimo Troisi|1
Quale attrice italiana vinse l'Oscar per «La ciociara»?|Sophia Loren|Anna Magnani;Monica Vitti;Claudia Cardinale|1
Quale compositore ha scritto le musiche dei western di Sergio Leone?|Ennio Morricone|Nino Rota;Nicola Piovani;Riz Ortolani|1
Chi ha composto le musiche de «Il padrino» e di molti film di Fellini?|Nino Rota|Ennio Morricone;Nicola Piovani;Armando Trovajoli|2
In quale città si tiene il festival del cinema con la Palma d'oro?|Cannes|Venezia;Berlino;Locarno|1
Qual è il premio principale della Mostra del Cinema di Venezia?|Leone d'oro|Palma d'oro;Orso d'oro;Oscar|1
Qual è il premio principale del Festival di Berlino?|Orso d'oro|Leone d'oro;Palma d'oro;Pardo d'oro|2
Come si chiama la statuetta dei premi dell'Academy americana?|Oscar|Emmy;Golden Globe;Grammy|1
Quale film ha vinto 11 Oscar nel 1998?|Titanic|Avatar;Il gladiatore;Forrest Gump|2
Chi ha interpretato Jack in «Titanic»?|Leonardo DiCaprio|Brad Pitt;Johnny Depp;Matt Damon|1
Chi ha interpretato Jack Sparrow?|Johnny Depp|Orlando Bloom;Keanu Reeves;Tom Cruise|1
Chi interpreta Ethan Hunt in «Mission: Impossible»?|Tom Cruise|Brad Pitt;Matt Damon;Daniel Craig|1
Come si chiama il mago protagonista della saga di J. K. Rowling?|Harry Potter|Gandalf;Merlino;Percy Jackson|1
Come si chiama il cowboy di «Toy Story»?|Woody|Buzz;Jessie;Andy|1
Come si chiama il pesce pagliaccio padre di Nemo?|Marlin|Dory;Gill;Bruce|2
Come si chiama la principessa di «Frozen» con i poteri del ghiaccio?|Elsa|Anna;Aurora;Ariel|1
Come si chiama il leoncino protagonista de «Il re leone»?|Simba|Mufasa;Scar;Nala|1
Quale studio ha prodotto «Toy Story», il primo lungometraggio interamente in computer grafica?|Pixar|DreamWorks;Disney Animation;Illumination|1
Come si chiama il topo più famoso di Walt Disney?|Topolino|Gambadilegno;Pippo;Paperino|1
Qual è il nome originale inglese di Topolino?|Mickey Mouse|Minnie Mouse;Donald Duck;Goofy|1
Chi è il nemico storico di Superman?|Lex Luthor|Joker;Magneto;Thanos|2
Chi è l'acerrimo nemico di Batman con il volto da clown?|Joker|Pinguino;Enigmista;Bane|1
Come si chiama il robottino giallo di Star Wars insieme a R2-D2?|C-3PO|BB-8;K-2SO;WALL•E|1
Chi è il padre di Luke Skywalker?|Darth Vader|Obi-Wan Kenobi;Yoda;Han Solo|1
Come si chiama la città di Batman?|Gotham City|Metropolis;Springfield;Smallville|1
Come si chiama la famiglia gialla di Springfield?|I Simpson|I Griffin;Gli Addams;I Flintstones|1
`);

  D.cultureTF = tf(`
Dante Alighieri è nato a Firenze.|V|1|
Alessandro Manzoni ha scritto «I Malavoglia».|F|1|I Malavoglia sono di Giovanni Verga; Manzoni ha scritto I promessi sposi.
La Divina Commedia è divisa in Inferno, Purgatorio e Paradiso.|V|1|
Pinocchio è stato scritto da Gianni Rodari.|F|1|L'autore è Carlo Collodi.
Shakespeare ha scritto «Romeo e Giulietta».|V|1|
«Il nome della rosa» è ambientato in un'abbazia medievale.|V|1|
Giuseppe Verdi ha composto «La bohème».|F|1|La bohème è di Giacomo Puccini.
Il Teatro alla Scala si trova a Milano.|V|1|
Mozart era austriaco.|V|1|Nacque a Salisburgo.
Ennio Morricone ha vinto l'Oscar per la colonna sonora di «The Hateful Eight».|V|2|
Federico Fellini era di Rimini.|V|2|
Il premio Strega è un premio letterario italiano.|V|2|
Harry Potter frequenta la scuola di Hogwarts.|V|1|
Sherlock Holmes è stato creato da Agatha Christie.|F|1|È stato creato da Arthur Conan Doyle.
Il Piccolo Principe viene dall'asteroide B 612.|V|2|
`);
})(typeof window !== 'undefined' ? window : globalThis);
