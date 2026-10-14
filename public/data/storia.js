// Dati di storia e mitologia.
(function (root) {
  'use strict';
  const D = (root.QZ_DATA = root.QZ_DATA || {});
  const rows = (text) => text.trim().split('\n').map((l) => l.trim()).filter((l) => l && !l.startsWith('#')).map((l) => l.split('|'));
  const quiz = (text) => rows(text).map(([q, a, wrong, d]) => ({ q, a, wrong: wrong.split(';'), d: Number(d) }));
  const tf = (text) => rows(text).map(([q, a, d, why]) => ({ q, a: a === 'V', d: Number(d), why }));

  // Anno (negativo = a.C.) | evento | difficoltà. Solo date certe o tradizionali dichiarate.
  D.events = rows(`
-776|Le prime Olimpiadi dell'antica Grecia (secondo la tradizione)|2
-753|La fondazione di Roma (secondo la tradizione)|1
-509|La nascita della Repubblica romana (secondo la tradizione)|2
-490|La battaglia di Maratona|2
-480|La battaglia delle Termopili|2
-323|La morte di Alessandro Magno|2
-218|Annibale attraversa le Alpi|2
-44|L'assassinio di Giulio Cesare|1
-27|Augusto diventa il primo imperatore romano|2
79|L'eruzione del Vesuvio che seppellisce Pompei|1
80|L'inaugurazione del Colosseo|2
313|L'editto di Milano di Costantino|2
476|La caduta dell'Impero romano d'Occidente|1
800|Carlo Magno incoronato imperatore|1
1066|La battaglia di Hastings|2
1096|L'inizio della prima crociata|2
1215|La firma della Magna Carta|2
1271|Marco Polo parte per la Cina|2
1321|La morte di Dante Alighieri|2
1348|La peste nera arriva a Firenze|2
1453|La caduta di Costantinopoli|2
1492|Cristoforo Colombo arriva in America|1
1498|Vasco da Gama raggiunge l'India via mare|2
1504|Michelangelo completa il David|2
1512|Michelangelo completa la volta della Cappella Sistina|2
1517|Lutero pubblica le 95 tesi|2
1519|La morte di Leonardo da Vinci|2
1522|Si conclude la prima circumnavigazione del globo|2
1564|La nascita di Galileo Galilei|2
1571|La battaglia di Lepanto|3
1582|L'introduzione del calendario gregoriano|2
1610|Galileo pubblica il Sidereus Nuncius|3
1633|Il processo a Galileo|2
1687|Newton pubblica i Principia|3
1748|L'inizio degli scavi di Pompei|3
1769|La nascita di Napoleone Bonaparte|2
1776|La Dichiarazione d'indipendenza degli Stati Uniti|1
1789|La presa della Bastiglia|1
1800|Alessandro Volta presenta la pila|2
1804|Napoleone si incorona imperatore|2
1815|La battaglia di Waterloo|1
1821|La morte di Napoleone|2
1827|La prima edizione dei Promessi sposi|2
1839|La presentazione del dagherrotipo, antenato della fotografia|3
1848|La concessione dello Statuto Albertino|2
1859|Darwin pubblica «L'origine delle specie»|2
1860|La spedizione dei Mille|1
1861|La proclamazione del Regno d'Italia|1
1865|L'assassinio di Abraham Lincoln|2
1869|L'apertura del Canale di Suez|2
1870|La presa di Roma (breccia di Porta Pia)|2
1876|Bell brevetta il telefono|2
1886|Karl Benz brevetta la prima automobile|2
1889|L'inaugurazione della Torre Eiffel|1
1895|I fratelli Lumière presentano il cinematografo|2
1896|Le prime Olimpiadi moderne ad Atene|1
1899|La fondazione della FIAT|3
1903|Il primo volo a motore dei fratelli Wright|1
1905|Einstein pubblica la relatività ristretta|2
1908|Il terremoto di Messina e Reggio Calabria|3
1911|Amundsen raggiunge il Polo Sud|2
1912|L'affondamento del Titanic|1
1914|L'inizio della Prima guerra mondiale|1
1915|L'Italia entra nella Prima guerra mondiale|2
1917|La Rivoluzione russa|1
1918|La fine della Prima guerra mondiale|1
1922|La marcia su Roma|2
1928|Fleming scopre la penicillina|2
1929|Il crollo della Borsa di Wall Street|1
1934|L'Italia vince il suo primo Mondiale di calcio|2
1939|L'inizio della Seconda guerra mondiale|1
1940|L'Italia entra nella Seconda guerra mondiale|2
1943|L'armistizio dell'8 settembre|2
1945|La fine della Seconda guerra mondiale|1
1946|Il referendum che fa nascere la Repubblica Italiana|1
1947|L'indipendenza dell'India|2
1948|L'entrata in vigore della Costituzione italiana|1
1949|La nascita della NATO|2
1953|La scoperta della struttura del DNA|2
1954|L'inizio delle trasmissioni televisive RAI|2
1957|Il lancio dello Sputnik 1|2
1960|Le Olimpiadi di Roma|2
1961|Jurij Gagarin è il primo uomo nello spazio|1
1963|L'assassinio di John F. Kennedy|1
1966|L'alluvione di Firenze|2
1969|Il primo uomo sulla Luna|1
1976|La fondazione di Apple|2
1978|L'elezione di papa Giovanni Paolo II|2
1982|L'Italia vince il Mondiale in Spagna|1
1986|Il disastro di Černobyl'|1
1989|La caduta del Muro di Berlino|1
1990|I Mondiali di calcio in Italia|2
1991|Lo scioglimento dell'Unione Sovietica|1
1992|La firma del Trattato di Maastricht|2
1996|La nascita della pecora Dolly, primo mammifero clonato|2
1998|La fondazione di Google|2
2001|Gli attentati dell'11 settembre|1
2002|L'euro entra in circolazione|1
2004|La nascita di Facebook|1
2005|La nascita di YouTube|2
2006|L'Italia vince il Mondiale in Germania|1
2007|La presentazione del primo iPhone|1
2008|Il fallimento di Lehman Brothers e la crisi finanziaria|2
2013|L'elezione di papa Francesco|1
2016|Il referendum sulla Brexit|1
2019|L'incendio di Notre-Dame di Parigi|1
2020|L'OMS dichiara la pandemia di COVID-19|1
2021|L'Italia vince l'Europeo di calcio|1
2026|Le Olimpiadi invernali di Milano Cortina|1
`).map(([y, e, d]) => ({ y: Number(y), e, d: Number(d) }));

  // Presidenti della Repubblica Italiana in ordine
  D.presidents = [
    ['Enrico De Nicola', 1946], ['Luigi Einaudi', 1948], ['Giovanni Gronchi', 1955], ['Antonio Segni', 1962],
    ['Giuseppe Saragat', 1964], ['Giovanni Leone', 1971], ['Sandro Pertini', 1978], ['Francesco Cossiga', 1985],
    ['Oscar Luigi Scalfaro', 1992], ['Carlo Azeglio Ciampi', 1999], ['Giorgio Napolitano', 2006], ['Sergio Mattarella', 2015],
  ];

  // Re di Roma (tradizione) in ordine
  D.romanKings = ['Romolo', 'Numa Pompilio', 'Tullo Ostilio', 'Anco Marzio', 'Tarquinio Prisco', 'Servio Tullio', 'Tarquinio il Superbo'];

  // Sequenze storiche/culturali da ordinare (dal primo all'ultimo)
  D.historySequences = [
    { q: 'Metti in ordine queste epoche storiche, dalla più antica', items: ['Preistoria', 'Età antica', 'Medioevo', 'Età moderna', 'Età contemporanea'] },
    { q: 'Metti in ordine questi imperatori romani, dal primo', items: ['Augusto', 'Tiberio', 'Caligola', 'Claudio', 'Nerone'] },
    { q: 'Metti in ordine queste civiltà, dalla più antica', items: ['Sumeri', 'Antichi Egizi (Antico Regno)', 'Impero romano', 'Impero ottomano'] },
    { q: 'Metti in ordine questi stili artistici, dal più antico', items: ['Romanico', 'Gotico', 'Rinascimento', 'Barocco', 'Neoclassicismo', 'Impressionismo'] },
    { q: 'Metti in ordine questi periodi geologici, dal più antico', items: ['Cambriano', 'Triassico', 'Giurassico', 'Cretaceo', 'Paleogene'] },
    { q: 'Metti in ordine queste specie umane, dalla più antica', items: ['Australopiteco', 'Homo habilis', 'Homo erectus', 'Homo sapiens'] },
    { q: 'Metti in ordine queste età della preistoria, dalla più antica', items: ['Paleolitico', 'Mesolitico', 'Neolitico', 'Età del bronzo', 'Età del ferro'] },
    { q: 'Metti in ordine queste guerre d\'indipendenza italiane, dalla prima', items: ['Prima guerra d\'indipendenza (1848)', 'Seconda guerra d\'indipendenza (1859)', 'Terza guerra d\'indipendenza (1866)'] },
    { q: 'Metti in ordine questi papi, dal più antico', items: ['Giovanni XXIII', 'Paolo VI', 'Giovanni Paolo II', 'Benedetto XVI', 'Francesco', 'Leone XIV'] },
  ];

  D.historyQuiz = quiz(`
Chi è stato il primo re d'Italia?|Vittorio Emanuele II|Umberto I;Carlo Alberto;Vittorio Emanuele III|1
Chi guidò la spedizione dei Mille?|Giuseppe Garibaldi|Giuseppe Mazzini;Camillo Cavour;Nino Bixio|1
Chi fu il primo presidente del Consiglio del Regno d'Italia?|Camillo Benso di Cavour|Giuseppe Mazzini;Francesco Crispi;Giovanni Giolitti|2
Chi fondò la «Giovine Italia»?|Giuseppe Mazzini|Giuseppe Garibaldi;Camillo Cavour;Silvio Pellico|2
Chi fu il primo presidente della Repubblica Italiana (capo provvisorio)?|Enrico De Nicola|Luigi Einaudi;Alcide De Gasperi;Sandro Pertini|2
Chi è il presidente della Repubblica Italiana eletto nel 2015 e rieletto nel 2022?|Sergio Mattarella|Giorgio Napolitano;Carlo Azeglio Ciampi;Mario Draghi|1
Quale presidente della Repubblica, ex partigiano, esultò in tribuna per la vittoria dell'Italia ai Mondiali del 1982?|Sandro Pertini|Luigi Einaudi;Francesco Cossiga;Giovanni Leone|2
In quale città fu ucciso Giulio Cesare?|Roma|Alessandria;Ravenna;Atene|1
Chi fu il primo imperatore romano?|Augusto|Giulio Cesare;Nerone;Traiano|1
Sotto quale imperatore l'Impero romano raggiunse la massima estensione?|Traiano|Augusto;Adriano;Costantino|2
Quale imperatore spostò la capitale a Costantinopoli?|Costantino|Teodosio;Diocleziano;Giustiniano|2
Chi fu l'ultimo imperatore romano d'Occidente?|Romolo Augustolo|Odoacre;Costantino;Teodosio|2
Come si chiamava il generale cartaginese che attraversò le Alpi con gli elefanti?|Annibale|Amilcare;Asdrubale;Scipione|1
Chi sconfisse Annibale a Zama?|Scipione l'Africano|Giulio Cesare;Fabio Massimo;Marco Antonio|2
Con chi si alleò Marco Antonio contro Ottaviano?|Cleopatra|Nefertiti;Didone;Zenobia|1
Quale popolo costruì le piramidi di Giza?|Antichi Egizi|Maya;Sumeri;Babilonesi|1
Quale civiltà costruì Machu Picchu?|Inca|Maya;Aztechi;Olmechi|1
Quale civiltà fondò Tenochtitlán, oggi Città del Messico?|Aztechi|Maya;Inca;Toltechi|2
Chi era il re dei Macedoni che conquistò l'Impero persiano?|Alessandro Magno|Filippo II;Dario III;Serse|1
Chi scrisse le «Storie», considerato il padre della storiografia?|Erodoto|Tucidide;Plutarco;Senofonte|2
Chi era il faraone bambino la cui tomba fu scoperta nel 1922?|Tutankhamon|Ramses II;Cheope;Akhenaton|1
Quale dinastia governò Firenze nel Rinascimento?|Medici|Sforza;Gonzaga;Este|1
Quale famiglia governò Milano nel Quattrocento dopo i Visconti?|Sforza|Medici;Estensi;Gonzaga|2
Chi era detto «il Magnifico»?|Lorenzo de' Medici|Cosimo de' Medici;Ludovico il Moro;Federico da Montefeltro|1
Quale navigatore italiano diede il nome all'America?|Amerigo Vespucci|Cristoforo Colombo;Giovanni Caboto;Antonio Pigafetta|1
Su quali navi viaggiò Colombo nel 1492?|Niña, Pinta e Santa María|Victoria, Trinidad e Concepción;Mayflower, Speedwell e Pinta;Santa Lucia, Niña e Vittoria|1
Per quale Paese navigava Cristoforo Colombo?|Spagna|Portogallo;Repubblica di Genova;Francia|1
Chi completò la prima circumnavigazione del globo dopo la morte di Magellano?|Juan Sebastián Elcano|Francis Drake;Amerigo Vespucci;Vasco da Gama|3
Quale italiano scrisse il diario del viaggio di Magellano?|Antonio Pigafetta|Marco Polo;Amerigo Vespucci;Giovanni da Verrazzano|3
Chi fu l'imperatore dei francesi sconfitto a Waterloo?|Napoleone Bonaparte|Luigi XIV;Luigi XVI;Napoleone III|1
Su quale isola morì Napoleone?|Sant'Elena|Elba;Corsica;Malta|1
Su quale isola fu esiliato Napoleone la prima volta?|Elba|Sant'Elena;Corsica;Capri|1
Quale re francese fu ghigliottinato durante la Rivoluzione?|Luigi XVI|Luigi XIV;Luigi XV;Carlo X|1
Chi era il «Re Sole»?|Luigi XIV|Luigi XVI;Enrico IV;Napoleone|1
Quale regina regnò sul Regno Unito per 70 anni fino al 2022?|Elisabetta II|Vittoria;Elisabetta I;Maria Stuarda|1
Chi fu il primo presidente degli Stati Uniti?|George Washington|Abraham Lincoln;Thomas Jefferson;John Adams|1
Quale presidente americano abolì la schiavitù?|Abraham Lincoln|George Washington;Franklin D. Roosevelt;Thomas Jefferson|1
Chi pronunciò il discorso «I have a dream»?|Martin Luther King|Malcolm X;Nelson Mandela;John F. Kennedy|1
Chi fu il primo presidente nero del Sudafrica?|Nelson Mandela|Desmond Tutu;Kofi Annan;Thabo Mbeki|1
Chi guidò la lotta non violenta per l'indipendenza dell'India?|Mahatma Gandhi|Jawaharlal Nehru;Indira Gandhi;Buddha|1
Quale muro divideva Berlino dal 1961 al 1989?|Il Muro di Berlino|La Cortina di ferro;Il Vallo di Adriano;La Linea Maginot|1
Come si chiamava il periodo di tensione tra USA e URSS dopo il 1945?|Guerra fredda|Guerra dei cent'anni;Guerra lampo;Guerra di posizione|1
In quale città fu firmato nel 1957 il trattato che istituì la CEE?|Roma|Parigi;Bruxelles;Maastricht|2
Quale data si festeggia come Festa della Liberazione in Italia?|25 aprile|2 giugno;1 maggio;4 novembre|1
Quale data si festeggia come Festa della Repubblica in Italia?|2 giugno|25 aprile;17 marzo;4 novembre|1
Chi scrisse il testo dell'inno nazionale italiano?|Goffredo Mameli|Michele Novaro;Giuseppe Verdi;Giuseppe Mazzini|1
Chi compose la musica dell'inno di Mameli?|Michele Novaro|Goffredo Mameli;Giuseppe Verdi;Gioachino Rossini|2
Come si chiama l'inno nazionale italiano?|Il Canto degli Italiani|Va' pensiero;Inno alla gioia;La leggenda del Piave|1
Quale battaglia della Prima guerra mondiale è sinonimo di disfatta in italiano?|Caporetto|Vittorio Veneto;Isonzo;Piave|1
Con quale battaglia finì la Prima guerra mondiale per l'Italia?|Vittorio Veneto|Caporetto;Piave;Isonzo|2
Quale nave affondò nel 1912 durante il viaggio inaugurale?|Titanic|Lusitania;Andrea Doria;Britannic|1
In quale città si tenne il processo ai capi nazisti?|Norimberga|Berlino;Monaco di Baviera;Vienna|2
Chi era il leader dell'Unione Sovietica durante la Seconda guerra mondiale?|Stalin|Lenin;Chruščëv;Trockij|1
Chi era il primo ministro britannico durante gran parte della Seconda guerra mondiale?|Winston Churchill|Neville Chamberlain;Clement Attlee;Margaret Thatcher|1
Chi fu il primo uomo a raggiungere il Polo Sud?|Roald Amundsen|Robert Scott;Ernest Shackleton;Umberto Nobile|2
Chi furono i primi a scalare l'Everest nel 1953?|Edmund Hillary e Tenzing Norgay|Reinhold Messner e Peter Habeler;George Mallory e Andrew Irvine;Walter Bonatti e Achille Compagnoni|2
Quale alpinista italiano salì per primo tutti i 14 «ottomila»?|Reinhold Messner|Walter Bonatti;Achille Compagnoni;Simone Moro|1
Quali alpinisti italiani conquistarono per primi il K2 nel 1954?|Lino Lacedelli e Achille Compagnoni|Reinhold Messner e Peter Habeler;Walter Bonatti e Cesare Maestri;Hillary e Norgay|3
Chi era la regina d'Egitto amata da Giulio Cesare e Marco Antonio?|Cleopatra|Nefertiti;Hatshepsut;Didone|1
Chi fu la prima donna a vincere un premio Nobel?|Marie Curie|Rita Levi-Montalcini;Grazia Deledda;Madre Teresa|2
Quale scrittrice italiana vinse il Nobel per la letteratura nel 1926?|Grazia Deledda|Elsa Morante;Natalia Ginzburg;Matilde Serao|2
Quale scienziata italiana vinse il Nobel per la medicina nel 1986?|Rita Levi-Montalcini|Margherita Hack;Maria Montessori;Fabiola Gianotti|2
Quale pedagogista italiana creò un famoso metodo educativo?|Maria Montessori|Rita Levi-Montalcini;Grazia Deledda;Anna Kuliscioff|1
Chi furono i due magistrati uccisi dalla mafia nel 1992, simbolo della lotta antimafia?|Giovanni Falcone e Paolo Borsellino|Carlo Alberto dalla Chiesa e Rocco Chinnici;Aldo Moro e Piersanti Mattarella;Antonino Caponnetto e Gian Carlo Caselli|1
`);

  D.historyTF = tf(`
Cristoforo Colombo era genovese.|V|1|
Colombo pensava di essere arrivato in India.|V|1|
Giulio Cesare fu il primo imperatore romano.|F|1|Il primo imperatore fu Augusto.
Napoleone era nato in Corsica.|V|1|
Il Colosseo fu costruito sotto la dinastia flavia.|V|2|
La Magna Carta fu firmata in Francia.|F|2|Fu concessa in Inghilterra da re Giovanni.
L'Italia è stata unificata nel 1861.|V|1|
Roma è diventata capitale d'Italia nel 1861.|F|2|Divenne capitale nel 1871; prima lo furono Torino e Firenze.
Firenze è stata capitale del Regno d'Italia.|V|2|Dal 1865 al 1871.
Il voto alle donne in Italia è stato introdotto nel 1946.|V|2|
La Costituzione italiana è entrata in vigore il 1º gennaio 1948.|V|2|
La Prima guerra mondiale è finita nel 1918.|V|1|
La Seconda guerra mondiale è iniziata nel 1945.|F|1|Iniziò nel 1939 e finì nel 1945.
Il Muro di Berlino è caduto nel 1989.|V|1|
Le piramidi di Giza furono costruite dai Romani.|F|1|Furono costruite dagli antichi Egizi.
I Vichinghi arrivarono in America prima di Colombo.|V|2|Intorno all'anno 1000, a Terranova.
Marco Polo era veneziano.|V|1|
Galileo Galilei fu processato dall'Inquisizione.|V|1|
Leonardo da Vinci morì in Francia.|V|2|Ad Amboise, nel 1519.
Garibaldi era detto «l'eroe dei due mondi».|V|1|
L'euro è entrato in circolazione nel 1999.|F|2|Fu introdotto come moneta di conto nel 1999; le banconote e le monete circolano dal 2002.
`);

  D.mythQuiz = quiz(`
Chi è il re degli dèi nella mitologia greca?|Zeus|Ade;Poseidone;Apollo|1
Qual è il nome romano di Zeus?|Giove|Marte;Nettuno;Saturno|1
Qual è il nome romano di Ares, dio della guerra?|Marte|Giove;Vulcano;Mercurio|1
Qual è il nome romano di Afrodite?|Venere|Minerva;Diana;Giunone|1
Qual è il nome romano di Atena?|Minerva|Venere;Diana;Vesta|1
Qual è il nome romano di Poseidone?|Nettuno|Plutone;Giove;Saturno|1
Qual è il nome romano di Ermes, messaggero degli dèi?|Mercurio|Marte;Apollo;Vulcano|1
Qual è il nome romano di Era, moglie di Zeus?|Giunone|Minerva;Cerere;Vesta|2
Qual è il nome romano di Artemide?|Diana|Venere;Minerva;Aurora|2
Qual è il nome romano di Efesto?|Vulcano|Marte;Mercurio;Saturno|2
Qual è il nome romano di Demetra?|Cerere|Vesta;Giunone;Proserpina|2
Qual è il nome romano di Dioniso?|Bacco|Apollo;Mercurio;Giano|2
Qual è il nome romano di Ade?|Plutone|Nettuno;Saturno;Vulcano|2
Chi è il dio greco del mare?|Poseidone|Zeus;Ade;Ares|1
Chi è il dio greco degli inferi?|Ade|Ermes;Crono;Efesto|1
Chi è la dea greca della sapienza?|Atena|Afrodite;Era;Artemide|1
Chi è il dio del sole e delle arti nella mitologia greca e romana?|Apollo|Ermes;Dioniso;Efesto|1
Chi rubò il fuoco agli dèi per donarlo agli uomini?|Prometeo|Ercole;Icaro;Atlante|1
Chi volò troppo vicino al sole con ali di cera?|Icaro|Dedalo;Perseo;Teseo|1
Chi costruì il labirinto di Creta?|Dedalo|Icaro;Minosse;Teseo|2
Quale eroe uccise il Minotauro?|Teseo|Ercole;Perseo;Achille|1
Quale eroe tagliò la testa a Medusa?|Perseo|Teseo;Giasone;Ulisse|1
Quante fatiche compì Ercole?|12|7;10;9|1
Chi guidò gli Argonauti alla ricerca del vello d'oro?|Giasone|Ulisse;Teseo;Achille|1
Quale era il punto debole di Achille?|Il tallone|La spalla;Il cuore;Gli occhi|1
Chi è il protagonista dell'Odissea?|Ulisse (Odisseo)|Achille;Enea;Ettore|1
Come si chiamava la moglie di Ulisse?|Penelope|Elena;Andromaca;Circe|1
Come si chiamava il ciclope accecato da Ulisse?|Polifemo|Argo;Ciclope di Troia;Tifone|1
Chi è l'eroe troiano protagonista dell'Eneide?|Enea|Ettore;Paride;Priamo|1
Chi rapì Elena scatenando la guerra di Troia?|Paride|Ettore;Achille;Menelao|1
Chi uccise Ettore nella guerra di Troia?|Achille|Ulisse;Agamennone;Patroclo|1
Con quale stratagemma i Greci entrarono a Troia?|Un cavallo di legno|Un tunnel;Una nave volante;Un travestimento|1
Chi aprì il vaso che liberò i mali nel mondo?|Pandora|Elena;Persefone;Medea|1
Quale creatura mitologica aveva serpenti al posto dei capelli?|Medusa|Sfinge;Arpia;Chimera|1
Quale creatura era metà uomo e metà cavallo?|Centauro|Minotauro;Satiro;Grifone|1
Quale creatura era metà uomo e metà toro?|Minotauro|Centauro;Satiro;Chimera|1
Quale uccello mitologico rinasce dalle proprie ceneri?|Fenice|Grifone;Pegaso;Arpia|1
Come si chiama il cavallo alato della mitologia greca?|Pegaso|Bucefalo;Sleipnir;Centauro|1
Chi sono i gemelli fondatori di Roma secondo la leggenda?|Romolo e Remo|Castore e Polluce;Caino e Abele;Apollo e Artemide|1
Quale animale allattò Romolo e Remo?|Una lupa|Un'orsa;Una capra;Una cerva|1
Chi è il dio del fulmine nella mitologia norrena?|Thor|Odino;Loki;Freyr|1
Chi è il padre degli dèi nella mitologia norrena?|Odino|Thor;Loki;Baldr|2
Chi è il dio egizio del sole?|Ra|Anubi;Osiride;Horus|2
Quale dio egizio ha la testa di sciacallo?|Anubi|Horus;Thot;Seth|2
Su quale monte vivevano gli dèi greci?|Olimpo|Parnaso;Etna;Ida|1
Come si chiamano le nove dee delle arti?|Muse|Ninfe;Grazie;Parche|1
Chi era il dio romano con due volti, da cui prende il nome gennaio?|Giano|Saturno;Mercurio;Marte|2
`);
})(typeof window !== 'undefined' ? window : globalThis);
