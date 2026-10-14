// Dati di scienza: elementi chimici, spazio, corpo umano, fisica, chimica, biologia, tecnologia.
(function (root) {
  'use strict';
  const D = (root.QZ_DATA = root.QZ_DATA || {});
  const rows = (text) => text.trim().split('\n').map((l) => l.trim()).filter((l) => l && !l.startsWith('#')).map((l) => l.split('|'));
  const quiz = (text) => rows(text).map(([q, a, wrong, d]) => ({ q, a, wrong: wrong.split(';'), d: Number(d) }));
  const tf = (text) => rows(text).map(([q, a, d, why]) => ({ q, a: a === 'V', d: Number(d), why }));
  // domanda | valore | minimo | massimo | tolleranza | unità | difficoltà
  const num = (text) => rows(text).map(([q, v, min, max, tol, unit, d]) => ({ q, v: Number(v), min: Number(min), max: Number(max), tol: Number(tol), unit, d: Number(d) }));

  // Numero atomico = posizione nella lista. Nome | simbolo | difficoltà
  D.elements = rows(`
Idrogeno|H|1
Elio|He|1
Litio|Li|1
Berillio|Be|2
Boro|B|2
Carbonio|C|1
Azoto|N|1
Ossigeno|O|1
Fluoro|F|1
Neon|Ne|1
Sodio|Na|1
Magnesio|Mg|1
Alluminio|Al|1
Silicio|Si|1
Fosforo|P|1
Zolfo|S|1
Cloro|Cl|1
Argon|Ar|2
Potassio|K|1
Calcio|Ca|1
Scandio|Sc|3
Titanio|Ti|2
Vanadio|V|3
Cromo|Cr|2
Manganese|Mn|2
Ferro|Fe|1
Cobalto|Co|2
Nichel|Ni|2
Rame|Cu|1
Zinco|Zn|1
Gallio|Ga|3
Germanio|Ge|3
Arsenico|As|2
Selenio|Se|3
Bromo|Br|2
Kripton|Kr|3
Rubidio|Rb|3
Stronzio|Sr|3
Ittrio|Y|3
Zirconio|Zr|3
Niobio|Nb|3
Molibdeno|Mo|3
Tecnezio|Tc|3
Rutenio|Ru|3
Rodio|Rh|3
Palladio|Pd|3
Argento|Ag|1
Cadmio|Cd|3
Indio|In|3
Stagno|Sn|1
Antimonio|Sb|3
Tellurio|Te|3
Iodio|I|1
Xeno|Xe|2
Cesio|Cs|3
Bario|Ba|3
Lantanio|La|3
Cerio|Ce|3
Praseodimio|Pr|3
Neodimio|Nd|3
Promezio|Pm|3
Samario|Sm|3
Europio|Eu|3
Gadolinio|Gd|3
Terbio|Tb|3
Disprosio|Dy|3
Olmio|Ho|3
Erbio|Er|3
Tulio|Tm|3
Itterbio|Yb|3
Lutezio|Lu|3
Afnio|Hf|3
Tantalio|Ta|3
Tungsteno|W|2
Renio|Re|3
Osmio|Os|3
Iridio|Ir|3
Platino|Pt|1
Oro|Au|1
Mercurio|Hg|1
Tallio|Tl|3
Piombo|Pb|1
Bismuto|Bi|3
Polonio|Po|3
Astato|At|3
Radon|Rn|2
Francio|Fr|3
Radio|Ra|2
Attinio|Ac|3
Torio|Th|3
Protoattinio|Pa|3
Uranio|U|1
Nettunio|Np|3
Plutonio|Pu|2
Americio|Am|3
Curio|Cm|3
Berkelio|Bk|3
Californio|Cf|3
Einsteinio|Es|3
Fermio|Fm|3
Mendelevio|Md|3
Nobelio|No|3
Laurenzio|Lr|3
Rutherfordio|Rf|3
Dubnio|Db|3
Seaborgio|Sg|3
Bohrio|Bh|3
Hassio|Hs|3
Meitnerio|Mt|3
Darmstadtio|Ds|3
Roentgenio|Rg|3
Copernicio|Cn|3
Nihonio|Nh|3
Flerovio|Fl|3
Moscovio|Mc|3
Livermorio|Lv|3
Tennesso|Ts|3
Oganesson|Og|3
`).map(([name, sym, d], i) => ({ name, sym, z: i + 1, d: Number(d) }));

  D.planets = ['Mercurio', 'Venere', 'Terra', 'Marte', 'Giove', 'Saturno', 'Urano', 'Nettuno'];
  // dal più grande al più piccolo (diametro)
  D.planetsBySize = ['Giove', 'Saturno', 'Urano', 'Nettuno', 'Terra', 'Venere', 'Marte', 'Mercurio'];

  D.scienceQuiz = quiz(`
Qual è la formula chimica dell'acqua?|H₂O|CO₂;O₂;H₂O₂|1
Qual è la formula chimica dell'anidride carbonica?|CO₂|CO;O₂;CH₄|1
Qual è la formula chimica del sale da cucina?|NaCl|KCl;NaOH;CaCO₃|2
Qual è la formula chimica del metano?|CH₄|C₂H₆;CO₂;NH₃|2
Qual è la formula chimica dell'ammoniaca?|NH₃|NO₂;CH₄;H₂S|2
Quale gas respiriamo per vivere?|Ossigeno|Azoto;Anidride carbonica;Elio|1
Quale gas è il più abbondante nell'aria?|Azoto|Ossigeno;Anidride carbonica;Argon|2
Quale gas usano le piante per la fotosintesi?|Anidride carbonica|Ossigeno;Azoto;Idrogeno|1
Qual è l'elemento più abbondante nell'universo?|Idrogeno|Elio;Ossigeno;Carbonio|1
Qual è l'elemento più abbondante nella crosta terrestre?|Ossigeno|Silicio;Ferro;Alluminio|2
Qual è l'unico metallo liquido a temperatura ambiente?|Mercurio|Gallio;Piombo;Sodio|1
Qual è il materiale naturale più duro?|Diamante|Quarzo;Granito;Ferro|1
Di quale elemento è fatto il diamante?|Carbonio|Silicio;Quarzo;Zolfo|1
Qual è il pH dell'acqua pura a 25 °C?|7|0;5;14|1
Una sostanza con pH 2 è…|Acida|Basica;Neutra;Salina|1
A quanti gradi Celsius congela l'acqua al livello del mare?|0 °C|−10 °C;4 °C;32 °C|1
A quanti gradi Celsius bolle l'acqua al livello del mare?|100 °C|90 °C;120 °C;212 °C|1
Qual è la velocità della luce nel vuoto (circa)?|300.000 km/s|30.000 km/s;3.000 km/s;1.000.000 km/s|2
Qual è la velocità del suono nell'aria (circa)?|343 m/s|34 m/s;3.430 m/s;34.300 m/s|2
Chi ha formulato la teoria della relatività?|Albert Einstein|Isaac Newton;Niels Bohr;Galileo Galilei|1
Chi ha formulato la legge di gravitazione universale?|Isaac Newton|Albert Einstein;Galileo Galilei;Keplero|1
Chi ha proposto la teoria dell'evoluzione per selezione naturale?|Charles Darwin|Gregor Mendel;Louis Pasteur;Jean-Baptiste Lamarck|1
Chi è considerato il padre della genetica?|Gregor Mendel|Charles Darwin;Louis Pasteur;Rosalind Franklin|2
Chi ha scoperto la penicillina?|Alexander Fleming|Louis Pasteur;Robert Koch;Edward Jenner|1
Chi ha sviluppato il primo vaccino (contro il vaiolo)?|Edward Jenner|Louis Pasteur;Alexander Fleming;Albert Sabin|2
Chi ha vinto due premi Nobel in due discipline scientifiche diverse?|Marie Curie|Albert Einstein;Linus Pauling;Niels Bohr|2
Chi ha inventato la pila elettrica?|Alessandro Volta|Luigi Galvani;Thomas Edison;Nikola Tesla|1
Chi ha ideato la tavola periodica degli elementi?|Dmitrij Mendeleev|Antoine Lavoisier;John Dalton;Marie Curie|2
Chi è considerato il padre della chimica moderna?|Antoine Lavoisier|Dmitrij Mendeleev;Robert Boyle;Amedeo Avogadro|3
In che unità si misura la forza nel Sistema Internazionale?|Newton|Joule;Watt;Pascal|1
In che unità si misura l'energia nel Sistema Internazionale?|Joule|Newton;Watt;Volt|1
In che unità si misura la potenza?|Watt|Joule;Ampere;Ohm|1
In che unità si misura la corrente elettrica?|Ampere|Volt;Ohm;Watt|1
In che unità si misura la resistenza elettrica?|Ohm|Volt;Ampere;Tesla|1
In che unità si misura la pressione nel Sistema Internazionale?|Pascal|Newton;Watt;Joule|2
In che unità si misura la frequenza?|Hertz|Decibel;Watt;Metri|1
In che unità si misura l'intensità di un suono?|Decibel|Hertz;Lux;Newton|1
Quale strumento misura la pressione atmosferica?|Barometro|Termometro;Igrometro;Anemometro|1
Quale strumento misura l'umidità dell'aria?|Igrometro|Barometro;Anemometro;Pluviometro|2
Quale strumento misura la velocità del vento?|Anemometro|Barometro;Igrometro;Sismografo|2
Quale strumento registra i terremoti?|Sismografo|Barometro;Anemometro;Altimetro|1
Come si chiama il passaggio dallo stato solido a quello gassoso?|Sublimazione|Evaporazione;Fusione;Condensazione|2
Come si chiama il passaggio dallo stato gassoso a quello liquido?|Condensazione|Solidificazione;Evaporazione;Sublimazione|1
Come si chiama il passaggio da solido a liquido?|Fusione|Solidificazione;Evaporazione;Brinamento|1
Qual è la particella con carica negativa dell'atomo?|Elettrone|Protone;Neutrone;Fotone|1
Qual è la particella senza carica nel nucleo dell'atomo?|Neutrone|Protone;Elettrone;Positrone|1
Quanti colori ha l'arcobaleno secondo la tradizione?|7|5;6;8|1
In quali colori Newton scompose la luce bianca con un prisma?|I colori dell'arcobaleno|Solo rosso e blu;Bianco e nero;Tre colori primari|2
Quale forza ci tiene attaccati alla Terra?|Gravità|Magnetismo;Attrito;Forza centrifuga|1
Quale scienza studia i fossili?|Paleontologia|Archeologia;Geologia;Antropologia|1
Quale scienza studia i terremoti?|Sismologia|Vulcanologia;Meteorologia;Geografia|1
Quale scienza studia gli insetti?|Entomologia|Ornitologia;Erpetologia;Ittiologia|2
Quale scienza studia gli uccelli?|Ornitologia|Entomologia;Ittiologia;Zoologia marina|2
Quale scienza studia i funghi?|Micologia|Botanica;Virologia;Entomologia|2
Quale scienza studia il clima e il tempo atmosferico?|Meteorologia|Astronomia;Geologia;Ecologia|1
Come si chiama la parte verde delle foglie che cattura la luce?|Clorofilla|Linfa;Cellulosa;Amido|1
In quale parte della cellula si trova il DNA?|Nucleo|Membrana;Citoplasma;Parete|1
Quale organello è la «centrale energetica» della cellula?|Mitocondrio|Ribosoma;Nucleo;Vacuolo|2
Chi ha scoperto la struttura a doppia elica del DNA (1953)?|Watson e Crick|Darwin e Wallace;Pasteur e Koch;Curie e Becquerel|2
Quale vitamina produce la pelle esposta al sole?|Vitamina D|Vitamina C;Vitamina A;Vitamina B12|1
Quale vitamina è abbondante negli agrumi?|Vitamina C|Vitamina D;Vitamina K;Vitamina B1|1
Come si chiamano gli animali che mangiano sia carne sia vegetali?|Onnivori|Carnivori;Erbivori;Insettivori|1
Come si chiama un animale che si nutre solo di piante?|Erbivoro|Carnivoro;Onnivoro;Saprofago|1
Quale strato dell'atmosfera ci protegge dai raggi ultravioletti?|Ozonosfera|Troposfera;Ionosfera;Esosfera|2
Quale strato dell'atmosfera è il più vicino alla Terra?|Troposfera|Stratosfera;Mesosfera;Termosfera|2
Come si chiama il magma quando esce da un vulcano?|Lava|Lapillo;Cenere;Pomice|1
Qual è lo strato più interno della Terra?|Nucleo interno|Mantello;Crosta;Nucleo esterno|1
Su quale scala si misura la magnitudo di un terremoto?|Scala Richter|Scala Mercalli;Scala Beaufort;Scala Kelvin|2
Quale scala misura la forza del vento?|Scala Beaufort|Scala Richter;Scala Mercalli;Scala Celsius|3
A quanti gradi Celsius corrisponde lo zero assoluto (circa)?|−273 °C|−100 °C;−459 °C;0 °C|2
`);

  D.scienceTF = tf(`
Il suono viaggia più veloce della luce.|F|1|La luce è circa un milione di volte più veloce.
Il suono non si propaga nel vuoto.|V|2|
L'acqua è composta da idrogeno e ossigeno.|V|1|
Il ghiaccio galleggia sull'acqua perché è meno denso.|V|1|
Gli atomi sono formati da protoni, neutroni ed elettroni.|V|1|
I metalli sono in genere buoni conduttori di elettricità.|V|1|
Il vetro è un buon conduttore di elettricità.|F|1|È un isolante.
Il diamante e la grafite sono entrambi fatti di carbonio.|V|2|
L'oro è più denso del piombo.|V|2|
Le piante producono ossigeno con la fotosintesi.|V|1|
I funghi sono piante.|F|2|I funghi formano un regno a sé, distinto da piante e animali.
I virus sono cellule viventi.|F|2|I virus non sono cellule: si replicano solo dentro cellule ospiti.
Gli antibiotici funzionano contro i virus.|F|1|Gli antibiotici agiscono sui batteri, non sui virus.
Un fulmine è più caldo della superficie del Sole.|V|3|Un fulmine può raggiungere circa 30.000 °C.
L'acqua bolle a una temperatura più bassa in alta montagna.|V|2|
Il ferro arrugginisce a contatto con ossigeno e umidità.|V|1|
Il mercurio è un metallo liquido a temperatura ambiente.|V|1|
L'elio è più pesante dell'aria.|F|1|È più leggero: per questo i palloncini salgono.
Il DNA è contenuto nel nucleo delle cellule.|V|1|
I pipistrelli sono uccelli.|F|1|Sono mammiferi.
La luce bianca è formata da tutti i colori.|V|1|
Il magnete attira il legno.|F|1|
Newton ha formulato le tre leggi del moto.|V|1|
Einstein ha inventato la lampadina.|F|1|La lampadina a incandescenza è legata a Edison (e Swan).
L'unità di misura della temperatura nel Sistema Internazionale è il kelvin.|V|2|
`);

  D.spaceQuiz = quiz(`
Qual è il pianeta più vicino al Sole?|Mercurio|Venere;Marte;Terra|1
Qual è il pianeta più grande del Sistema solare?|Giove|Saturno;Nettuno;Urano|1
Qual è il pianeta più piccolo del Sistema solare?|Mercurio|Marte;Venere;Plutone|1
Qual è il pianeta più caldo del Sistema solare?|Venere|Mercurio;Marte;Giove|2
Quale pianeta è chiamato «pianeta rosso»?|Marte|Giove;Venere;Mercurio|1
Quale pianeta è famoso per i suoi anelli ben visibili?|Saturno|Giove;Urano;Marte|1
Quale pianeta ruota «coricato» su un fianco?|Urano|Nettuno;Saturno;Venere|3
Qual è il pianeta più lontano dal Sole?|Nettuno|Urano;Plutone;Saturno|1
Dal 2006 Plutone è classificato come…|Pianeta nano|Pianeta;Satellite;Cometa|1
Come si chiama il satellite naturale della Terra?|Luna|Titano;Europa;Fobos|1
Qual è la luna più grande del Sistema solare?|Ganimede|Titano;Luna;Europa|2
Di quale pianeta è satellite Titano?|Saturno|Giove;Urano;Nettuno|2
Quali sono le due lune di Marte?|Fobos e Deimos|Io ed Europa;Titano e Rea;Tritone e Nereide|3
Chi ha scoperto i quattro satelliti maggiori di Giove?|Galileo Galilei|Copernico;Keplero;Newton|1
Come si chiama la nostra galassia?|Via Lattea|Andromeda;Triangolo;Nube di Magellano|1
Qual è la galassia grande più vicina alla Via Lattea?|Andromeda|Sombrero;Triangolo;Vortice|2
Qual è la stella più vicina alla Terra?|Il Sole|Proxima Centauri;Sirio;Stella Polare|1
Qual è la stella più vicina al Sistema solare dopo il Sole?|Proxima Centauri|Sirio;Betelgeuse;Vega|2
Qual è la stella più luminosa del cielo notturno?|Sirio|Stella Polare;Vega;Betelgeuse|2
Chi è stato il primo uomo nello spazio?|Jurij Gagarin|Neil Armstrong;Buzz Aldrin;John Glenn|1
Chi è stato il primo uomo a camminare sulla Luna?|Neil Armstrong|Buzz Aldrin;Jurij Gagarin;Michael Collins|1
Come si chiamava la missione del primo sbarco sulla Luna?|Apollo 11|Apollo 13;Gemini 4;Sojuz 1|1
Chi è stata la prima donna nello spazio?|Valentina Tereškova|Samantha Cristoforetti;Sally Ride;Svetlana Savickaja|2
Chi è la prima donna italiana andata nello spazio?|Samantha Cristoforetti|Valentina Tereškova;Margherita Hack;Paola Antonelli|1
Come si chiama la prima donna italiana a comandare la Stazione Spaziale Internazionale?|Samantha Cristoforetti|Margherita Hack;Paolo Nespoli;Luca Parmitano|2
Quale scienziata italiana era detta «la signora delle stelle»?|Margherita Hack|Rita Levi-Montalcini;Samantha Cristoforetti;Fabiola Gianotti|2
Chi propose il modello eliocentrico nel Cinquecento?|Niccolò Copernico|Tolomeo;Galileo Galilei;Tycho Brahe|1
Come si chiama il primo satellite artificiale (1957)?|Sputnik 1|Explorer 1;Vostok 1;Hubble|1
Come si chiama il telescopio spaziale lanciato nel 2021?|James Webb|Hubble;Kepler;Chandra|2
Quanto tempo impiega la Terra a girare intorno al Sole?|Circa 365 giorni|24 ore;30 giorni;Circa 100 giorni|1
Quanto tempo impiega la Terra a ruotare su sé stessa?|Circa 24 ore|Circa 365 giorni;12 ore;7 giorni|1
Quanto impiega la luce del Sole ad arrivare sulla Terra?|Circa 8 minuti|Circa 8 secondi;Circa 1 ora;Circa 1 giorno|2
Come si chiama la fascia di asteroidi tra Marte e Giove?|Fascia principale|Fascia di Kuiper;Nube di Oort;Anello di Saturno|2
Come si chiama la scia luminosa di una cometa?|Coda|Chioma;Nucleo;Alone|1
Come si chiama un meteoroide che raggiunge il suolo?|Meteorite|Meteora;Cometa;Asteroide|2
Che cosa provoca le maree sulla Terra?|L'attrazione della Luna (e del Sole)|Il vento;La rotazione dei continenti;I terremoti|1
Come si chiama l'eclissi in cui la Luna copre il Sole?|Eclissi solare|Eclissi lunare;Equinozio;Solstizio|1
Che cosa sono gli equinozi?|Giorni in cui dì e notte durano circa uguale|I giorni più lunghi dell'anno;Eclissi di Luna;Allineamenti dei pianeti|2
Quale costellazione contiene la Stella Polare?|Orsa Minore|Orsa Maggiore;Cassiopea;Orione|2
Quale agenzia spaziale gestisce le missioni Apollo e Artemis?|NASA|ESA;Roscosmos;JAXA|1
Quale sigla indica l'Agenzia Spaziale Europea?|ESA|NASA;ASI;CNES|1
Quale sigla indica l'Agenzia Spaziale Italiana?|ASI|ESA;INAF;CNR|2
`);

  D.spaceTF = tf(`
La Luna ha una sua luce propria.|F|1|Riflette la luce del Sole.
Il Sole è una stella.|V|1|
Il Sole è un pianeta.|F|1|È una stella.
Venere ruota su sé stessa nel verso opposto rispetto alla maggior parte dei pianeti.|V|3|
Su Marte ci sono vulcani, tra cui il più alto del Sistema solare.|V|2|L'Olympus Mons.
Giove è un pianeta roccioso.|F|2|È un gigante gassoso.
Saturno è l'unico pianeta con gli anelli.|F|2|Anche Giove, Urano e Nettuno hanno anelli, molto più deboli.
La Grande Muraglia cinese si vede a occhio nudo dalla Luna.|F|2|È un mito: è troppo stretta.
Nello spazio non c'è suono perché non c'è aria.|V|1|
La Terra è il terzo pianeta dal Sole.|V|1|
Plutone è più piccolo della nostra Luna.|V|2|
Un anno su Mercurio dura meno di un anno terrestre.|V|2|Circa 88 giorni.
La Via Lattea è una galassia a spirale.|V|2|
Le stelle cadenti sono vere stelle che cadono.|F|1|Sono piccoli frammenti che bruciano nell'atmosfera.
`);

  D.bodyQuiz = quiz(`
Qual è l'organo più grande del corpo umano?|La pelle|Il fegato;Il cervello;I polmoni|1
Qual è l'osso più lungo del corpo umano?|Femore|Omero;Tibia;Perone|1
Qual è l'osso più piccolo del corpo umano?|Staffa (nell'orecchio)|Falange;Coccige;Rotula|2
Qual è il muscolo più grande del corpo umano?|Grande gluteo|Bicipite;Quadricipite;Deltoide|2
Quale organo pompa il sangue nel corpo?|Cuore|Fegato;Polmoni;Reni|1
Quale organo filtra il sangue e produce l'urina?|Reni|Fegato;Milza;Stomaco|1
Quale organo produce la bile?|Fegato|Pancreas;Milza;Cistifellea|2
Quale organo produce l'insulina?|Pancreas|Fegato;Reni;Tiroide|2
Dove avviene lo scambio di ossigeno nel corpo?|Negli alveoli polmonari|Nel cuore;Nello stomaco;Nel fegato|2
Quale gruppo sanguigno è detto «donatore universale» (per i globuli rossi)?|0 negativo|AB positivo;A positivo;B negativo|2
Quale gruppo sanguigno è detto «ricevente universale»?|AB positivo|0 negativo;A negativo;B positivo|2
Quale parte dell'occhio dà il colore?|Iride|Pupilla;Cornea;Retina|1
Quale parte del cervello coordina equilibrio e movimenti?|Cervelletto|Ipotalamo;Midollo spinale;Lobo frontale|2
Quante camere ha il cuore umano?|4|2;3;6|1
Quanti polmoni abbiamo?|2|1;3;4|1
Come si chiamano i vasi che portano il sangue dal cuore al corpo?|Arterie|Vene;Capillari;Linfatici|1
Come si chiamano le cellule del sangue che trasportano l'ossigeno?|Globuli rossi|Globuli bianchi;Piastrine;Neuroni|1
Quali cellule del sangue ci difendono dalle infezioni?|Globuli bianchi|Globuli rossi;Piastrine;Plasma|1
Quali elementi del sangue aiutano la coagulazione?|Piastrine|Globuli rossi;Globuli bianchi;Anticorpi|1
Come si chiamano le cellule del sistema nervoso?|Neuroni|Nefroni;Eritrociti;Osteociti|1
Quale ghiandola si trova nel collo e regola il metabolismo?|Tiroide|Ipofisi;Surrene;Timo|2
Qual è il nome scientifico della rotula?|Patella|Clavicola;Scapola;Sterno|3
Come si chiama l'osso della coscia?|Femore|Omero;Radio;Ulna|1
Come si chiama l'osso del braccio tra spalla e gomito?|Omero|Femore;Tibia;Radio|1
In quale organo inizia la digestione degli amidi grazie alla saliva?|Bocca|Stomaco;Intestino tenue;Fegato|2
Quale senso è legato alle papille gustative?|Gusto|Olfatto;Tatto;Udito|1
`);

  D.bodyTF = tf(`
Il cuore è un muscolo.|V|1|
Il corpo umano adulto ha 206 ossa.|V|1|
I neonati hanno meno ossa degli adulti.|F|2|Ne hanno di più (circa 270), che poi si fondono.
Il sangue nelle vene è blu.|F|1|È sempre rosso, più scuro quando è povero di ossigeno.
Le unghie e i capelli sono fatti di cheratina.|V|2|
Usiamo solo il 10% del cervello.|F|1|È un mito: usiamo tutto il cervello.
Lo stomaco produce acido cloridrico.|V|2|
Il fegato può rigenerarsi in parte.|V|2|
Gli esseri umani hanno cinque sensi tradizionali.|V|1|
L'intestino tenue è più corto dell'intestino crasso.|F|2|Il tenue è molto più lungo (circa 6 metri).
I denti sono le parti più dure del corpo umano.|V|2|Lo smalto è il tessuto più duro.
Il cuore batte circa 70 volte al minuto a riposo in un adulto.|V|1|
`);

  D.techQuiz = quiz(`
Chi ha fondato Microsoft insieme a Paul Allen?|Bill Gates|Steve Jobs;Mark Zuckerberg;Larry Page|1
Chi ha fondato Apple insieme a Steve Wozniak?|Steve Jobs|Bill Gates;Elon Musk;Jeff Bezos|1
Chi ha fondato Facebook?|Mark Zuckerberg|Jack Dorsey;Larry Page;Bill Gates|1
Chi ha fondato Amazon?|Jeff Bezos|Elon Musk;Steve Jobs;Larry Ellison|1
Chi ha fondato Google?|Larry Page e Sergey Brin|Bill Gates e Paul Allen;Steve Jobs e Steve Wozniak;Mark Zuckerberg|1
Chi ha inventato il World Wide Web?|Tim Berners-Lee|Bill Gates;Vint Cerf;Alan Turing|2
Chi è considerato il padre dell'informatica teorica e dell'intelligenza artificiale?|Alan Turing|John von Neumann;Ada Lovelace;Charles Babbage|2
Chi è considerata la prima programmatrice della storia?|Ada Lovelace|Grace Hopper;Marie Curie;Hedy Lamarr|2
Chi ha inventato il telefono (brevetto del 1876)?|Alexander Graham Bell|Thomas Edison;Antonio Meucci;Guglielmo Marconi|2
Quale inventore italiano sviluppò un telefono (il «telettrofono») prima di Bell?|Antonio Meucci|Guglielmo Marconi;Alessandro Volta;Galileo Ferraris|2
Chi è considerato il pioniere della radio, Nobel per la fisica nel 1909?|Guglielmo Marconi|Antonio Meucci;Nikola Tesla;Enrico Fermi|1
Chi ha brevettato la lampadina a incandescenza di lunga durata nel 1879?|Thomas Edison|Nikola Tesla;Alessandro Volta;James Watt|1
Chi ha perfezionato la macchina a vapore nel Settecento?|James Watt|Thomas Edison;George Stephenson;Isaac Newton|2
Chi ha inventato la stampa a caratteri mobili in Europa?|Johannes Gutenberg|Leonardo da Vinci;Aldo Manuzio;Martin Lutero|1
Chi costruì il primo reattore nucleare (Chicago, 1942)?|Enrico Fermi|Albert Einstein;Robert Oppenheimer;Ettore Majorana|2
Chi ha inventato la dinamite?|Alfred Nobel|Thomas Edison;Nikola Tesla;Antoine Lavoisier|1
Quale inventore dà il nome a una famosa bobina e all'unità di misura del campo magnetico?|Nikola Tesla|Thomas Edison;Michael Faraday;James Watt|2
Chi realizzò il primo volo a motore controllato nel 1903?|Fratelli Wright|Fratelli Lumière;Louis Blériot;Charles Lindbergh|1
Chi inventò il cinematografo?|Fratelli Lumière|Thomas Edison;Fratelli Wright;Georges Méliès|1
Che cosa significa la sigla «CPU»?|Central Processing Unit|Computer Power Unit;Central Program Utility;Control Panel Unit|2
Quanti bit ci sono in un byte?|8|4;10;16|1
Quale sistema numerico usano i computer?|Binario|Decimale;Esadecimale;Romano|1
Che cosa significa «www»?|World Wide Web|World Wide Wireless;Web World Wide;Wide Web World|1
Quale azienda produce l'iPhone?|Apple|Samsung;Google;Microsoft|1
Quale azienda sviluppa il sistema operativo Android?|Google|Apple;Microsoft;Samsung|1
Come si chiama il linguaggio con cui si scrivono le pagine web?|HTML|SQL;C++;Java|2
Quale social network è nato nel 2010 per condividere foto?|Instagram|Facebook;Twitter;TikTok|2
Come si chiama la valuta digitale creata nel 2009 da «Satoshi Nakamoto»?|Bitcoin|Ethereum;Dogecoin;Euro digitale|1
Quale azienda italiana ha prodotto il personal computer Olivetti Programma 101?|Olivetti|Fiat;Pirelli;Telecom|2
Chi ha inventato il microprocessore lavorando per Intel?|Federico Faggin|Steve Wozniak;Bill Gates;Gordon Moore|3
`);

  D.techTF = tf(`
Il primo iPhone è stato presentato nel 2007.|V|1|
Internet e il World Wide Web sono la stessa cosa.|F|2|Il Web è un servizio che funziona su Internet.
Un kilobyte equivale a circa mille byte.|V|1|
Guglielmo Marconi è stato premiato con il Nobel per la fisica.|V|1|
La prima e-mail è stata inviata negli anni Settanta.|V|2|Nel 1971, da Ray Tomlinson.
Il codice QR è stato inventato in Giappone.|V|3|
`);

  // Domande numeriche (Indovina il numero)
  D.numbers = num(`
Quante ossa ha il corpo umano adulto?|206|100|300|10|ossa|1
Quanti denti ha un adulto con la dentatura completa?|32|20|40|2|denti|1
Quanti denti da latte ha un bambino?|20|10|32|2|denti|2
Quanti cromosomi ha una cellula umana?|46|20|60|2|cromosomi|2
Quante camere ha il cuore umano?|4|1|8|0|camere|1
A quanti gradi Celsius bolle l'acqua al livello del mare?|100|50|150|0|°C|1
Quanti pianeti ci sono nel Sistema solare?|8|5|12|0|pianeti|1
Quanti elementi ha la tavola periodica (riconosciuti dalla IUPAC)?|118|80|150|4|elementi|2
Qual è il numero atomico dell'ossigeno?|8|1|20|1||2
Qual è il numero atomico del carbonio?|6|1|20|1||2
Qual è il numero atomico dell'oro?|79|50|100|4||3
Quanti minuti impiega (circa) la luce del Sole ad arrivare sulla Terra?|8|1|30|1|minuti|2
Quanti giorni dura un anno bisestile?|366|360|370|0|giorni|1
Quante ore ci sono in una settimana?|168|100|200|5|ore|1
Quanti secondi ci sono in un'ora?|3600|1000|6000|100|secondi|1
Quanti metri è alto il Monte Bianco (circa)?|4806|3000|6000|100|m|2
Quanti metri è alto l'Everest (circa)?|8849|7000|10000|150|m|2
Quanti chilometri è lungo il Po (circa)?|652|300|1000|30|km|2
Quanti metri è alta la Torre Eiffel (con antenne, circa)?|330|200|500|15|m|2
Quanti metri è alta la Torre di Pisa (circa)?|57|30|100|4|m|3
Quanti giocatori ha in campo una squadra di calcio?|11|5|15|0|giocatori|1
Quanti giocatori ha in campo una squadra di pallavolo?|6|4|12|0|giocatori|1
Quanti giocatori ha in campo una squadra di basket?|5|3|11|0|giocatori|1
Quanti cerchi ci sono nel simbolo olimpico?|5|3|8|0|cerchi|1
Quanti tasti ha un pianoforte moderno standard?|88|50|120|3|tasti|2
Quante corde ha una chitarra classica?|6|4|12|0|corde|1
Quante corde ha un violino?|4|3|8|0|corde|1
Quante stelle ci sono sulla bandiera degli Stati Uniti?|50|13|60|0|stelle|1
Quanti Stati membri ha l'Unione Europea (dal 2020)?|27|20|35|1|Stati|2
Quanti sono i Paesi membri dell'ONU?|193|150|220|4|Paesi|3
Quanti canti ha la Divina Commedia?|100|50|150|3|canti|2
Quanti versi ha un sonetto?|14|8|20|0|versi|2
Quante zampe ha un ragno?|8|4|12|0|zampe|1
Quante zampe ha un insetto?|6|4|10|0|zampe|1
Quanti cuori ha un polpo?|3|1|6|0|cuori|2
Quante volte batte (circa) il cuore di un adulto in un minuto a riposo?|70|40|120|8|battiti|1
Quanti chilometri è lunga una maratona (circa)?|42|20|60|1|km|1
Quanti metri è lunga una piscina olimpionica?|50|20|100|0|m|1
Quanti minuti dura una partita di calcio (tempi regolamentari)?|90|60|120|0|minuti|1
Quante tessere ha un domino classico?|28|20|40|1|tessere|3
Quante carte ha un mazzo di carte francesi (senza jolly)?|52|40|60|0|carte|1
Quante carte ha un mazzo di carte napoletane?|40|30|60|0|carte|1
Quanti sono i segni dello zodiaco?|12|8|16|0|segni|1
Quanti lati ha un ottagono?|8|5|12|0|lati|1
Quanti gradi misura la somma degli angoli interni di un triangolo?|180|90|360|0|gradi|1
Quanti gradi ha un angolo retto?|90|45|180|0|gradi|1
Quanti centimetri ci sono in un metro?|100|10|1000|0|cm|1
Quanti grammi ci sono in un chilogrammo?|1000|100|10000|0|g|1
Quante regioni ha l'Italia?|20|15|25|0|regioni|1
Quanti abitanti ha l'Italia (circa, in milioni)?|59|40|80|2|milioni|2
`);
})(typeof window !== 'undefined' ? window : globalThis);
