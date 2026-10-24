// Domande in più per la categoria «Animali»: classificazione, alimentazione, habitat, cuccioli, versi, insetti, dinosauri, razze, record.
(function (root) {
  'use strict';
  const D = (root.QZ_DATA = root.QZ_DATA || {});
  // Elenchi compatti: «Nome~difficoltà» separati da «|» (difficoltà predefinita 2).
  const mk = (map, key) => {
    const out = [];
    for (const [val, str] of Object.entries(map)) {
      for (const e of str.split('|')) {
        const [name, d] = e.split('~');
        out.push({ name: name.trim(), d: +d || 2, [key]: val });
      }
    }
    return out;
  };
  // Righe di testo → dati. Colonne separate da « ## ».
  const rows = (s) => s.trim().split('\n').map((x) => x.split(' ## ').map((c) => c.trim()));
  const quizData = rows(`
Completa il proverbio: «Can che abbaia…» ## non morde ## morde sempre ## scappa via ## dorme poco ## 1
Completa il proverbio: «Chi dorme non piglia…» ## pesci ## lepri ## uccelli ## topi ## 1
Completa il proverbio: «Il lupo perde il pelo ma non il…» ## vizio ## coraggio ## nome ## sapore ## 1
Completa il proverbio: «Gallina vecchia fa buon…» ## brodo ## sugo ## uovo ## nido ## 1
Completa il proverbio: «Una rondine non fa…» ## primavera ## estate ## stormo ## nido ## 1
Completa il proverbio: «Non svegliare il can che…» ## dorme ## abbaia ## morde ## corre ## 2
Completa il proverbio: «Quando il gatto non c'è i topi…» ## ballano ## dormono ## scappano ## mangiano ## 1
Completa il proverbio: «Meglio un uovo oggi che una gallina…» ## domani ## ieri ## vecchia ## nera ## 1
Completa il proverbio: «Cavallo donato non si guarda in…» ## bocca ## coda ## zampa ## occhio ## 1
Quale animale è legato all'espressione «lacrime false» di chi finge di piangere? ## Coccodrillo ## Ippopotamo ## Iena ## Gatto ## 1
Con quale animale si paragona chi è molto testardo? ## Mulo ## Gallo ## Pesce ## Coniglio ## 1
Chi cambia spesso opinione o atteggiamento viene detto «camaleontico»: da quale animale deriva? ## Camaleonte ## Pavone ## Orso ## Gufo ## 1
Con quale animale si paragona chi è molto vanitoso? ## Pavone ## Passero ## Topo ## Gufo ## 1
Con quale animale si paragona chi è scontroso e solitario? ## Orso ## Delfino ## Pappagallo ## Cigno ## 1
Con quale animale si paragona chi ripete le parole altrui senza capirle? ## Pappagallo ## Gufo ## Scimmia ## Rondine ## 1
Si dice «furbo come una…» ## volpe ## lepre ## gallina ## talpa ## 1
Si dice «muto come un…» ## pesce ## gatto ## gufo ## topo ## 1
Si dice «fare la parte del…» ## leone ## lupo ## gatto ## topo ## 1
Si dice «dormire come un…» ## ghiro ## gufo ## gallo ## canarino ## 1
Si dice «prendere il toro per le…» ## corna ## zampe ## orecchie ## code ## 1
Si dice «sentirsi un pesce fuor d'…» ## acqua ## casa ## mare ## rete ## 1
Si dice «fare la politica dello…» ## struzzo ## avvoltoio ## gatto ## camaleonte ## 1
Nella favola «La cicala e la formica», chi lavora per tutta l'estate? ## La formica ## La cicala ## L'ape ## Il grillo ## 1
Come si chiama la femmina del maiale? ## Scrofa ## Verro ## Manza ## Cerva ## 2
Come si chiama il maschio della pecora? ## Montone ## Verro ## Caprone ## Stallone ## 2
Come si chiama il maschio delle api? ## Fuco ## Operaio ## Regina ## Larva ## 2
Come si chiama il cavallo maschio usato per la riproduzione? ## Stallone ## Montone ## Verro ## Caprone ## 2
Come si chiama il gallo castrato? ## Cappone ## Pollastro ## Tacchino ## Fagiano ## 2
Come si chiama il maschio della capra? ## Caprone ## Montone ## Verro ## Stallone ## 2
Come si chiama la femmina del leone? ## Leonessa ## Pantera ## Lupa ## Iena ## 1
Come si chiama il toro castrato? ## Bue ## Vitello ## Bufalo ## Yak ## 2
Come si chiama un gruppo di api? ## Sciame ## Branco ## Stormo ## Banco ## 1
Come si chiama un gruppo di pesci che nuotano insieme? ## Banco ## Stormo ## Gregge ## Sciame ## 1
Come si chiama un gruppo di uccelli che volano insieme? ## Stormo ## Sciame ## Banco ## Branco ## 1
Come si chiama un gruppo di pecore? ## Gregge ## Branco ## Banco ## Stormo ## 1
Come si chiama un gruppo di cani da caccia? ## Muta ## Mandria ## Nidiata ## Colonia ## 2
Come si chiama un gruppo di lupi? ## Branco ## Gregge ## Stormo ## Sciame ## 1
Come si chiama un gruppo di bovini o cavalli allo stato brado? ## Mandria ## Gregge ## Stormo ## Banco ## 1
Come si chiama l'insieme dei piccoli di un uccello nati dalla stessa covata? ## Nidiata ## Muta ## Mandria ## Colonia ## 2
Qual è il mammifero più lento tra questi? ## Bradipo ## Armadillo ## Riccio ## Vombato ## 1
Qual è il pesce più grande del mondo? ## Squalo balena ## Squalo bianco ## Manta ## Pesce luna ## 2
Qual è il serpente più lungo del mondo? ## Pitone reticolato ## Anaconda verde ## Cobra reale ## Mamba nero ## 3
Qual è l'animale più veloce in picchiata? ## Falco pellegrino ## Aquila reale ## Rondine ## Gabbiano ## 2
Quale di questi uccelli ha la maggiore apertura alare? ## Albatro urlatore ## Aquila reale ## Gabbiano reale ## Cigno reale ## 3
Qual è il vertebrato più longevo che si conosca? ## Squalo della Groenlandia ## Elefante ## Tartaruga gigante ## Pappagallo ara ## 3
Qual è il più grande rettile vivente? ## Coccodrillo marino ## Drago di Komodo ## Alligatore americano ## Anaconda ## 3
Qual è il più grande felino del mondo? ## Tigre ## Leone ## Giaguaro ## Puma ## 1
Qual è il più grande primate vivente? ## Gorilla ## Orango ## Scimpanzé ## Babbuino ## 2
Qual è il più grande carnivoro terrestre? ## Orso polare ## Tigre ## Leone ## Lupo ## 2
Quale animale ha il cervello più grande in assoluto? ## Capodoglio ## Elefante africano ## Gorilla ## Delfino ## 3
Quale uccello vivente depone l'uovo più grande? ## Struzzo ## Emù ## Cigno ## Pinguino imperatore ## 2
Qual è il più grande anfibio del mondo? ## Salamandra gigante cinese ## Rana toro ## Axolotl ## Proteo ## 3
Quale mammifero ha la gestazione più lunga? ## Elefante ## Giraffa ## Rinoceronte ## Cavallo ## 2
Quale di questi animali ha il sangue bluastro? ## Polpo ## Delfino ## Rana ## Serpente ## 2
Quale di questi animali produce luce propria (bioluminescenza)? ## Lucciola ## Coccinella ## Formica ## Cavalletta ## 1
A quale classe di animali appartiene la salamandra? ## Anfibi ## Rettili ## Pesci ## Mammiferi ## 1
Il ragno appartiene alla classe degli… ## Aracnidi ## Insetti ## Crostacei ## Molluschi ## 2
Quale di questi animali NON è un insetto? ## Scorpione ## Formica ## Vespa ## Cavalletta ## 1
Quale di questi animali è un marsupiale? ## Koala ## Procione ## Lemure ## Armadillo ## 2
Insieme all'ornitorinco, quale altro mammifero depone le uova? ## Echidna ## Pangolino ## Tapiro ## Opossum ## 3
Quale di questi animali è un cetaceo? ## Delfino ## Foca ## Tricheco ## Leone marino ## 2
Quale di questi animali è un pinnipede? ## Tricheco ## Delfino ## Narvalo ## Orca ## 3
Il pipistrello appartiene all'ordine dei… ## Chirotteri ## Roditori ## Marsupiali ## Primati ## 3
I topi appartengono all'ordine dei… ## Roditori ## Lagomorfi ## Marsupiali ## Primati ## 2
Quale di questi animali NON è un roditore? ## Coniglio ## Castoro ## Capibara ## Scoiattolo ## 3
Lo scheletro degli squali è fatto di… ## cartilagine ## ossa ## chitina ## calcare ## 2
Quale uccello compie la migrazione più lunga, tra Artico e Antartide? ## Sterna artica ## Rondine ## Oca selvatica ## Cicogna ## 3
Quale pesce risale i fiumi per riprodursi? ## Salmone ## Tonno ## Merluzzo ## Sogliola ## 1
In quale mare si riproducono le anguille europee? ## Mar dei Sargassi ## Mar Baltico ## Mar Rosso ## Mar Nero ## 3
Quale di questi animali va in letargo in inverno? ## Marmotta ## Lupo ## Cervo ## Volpe ## 1
Quale di questi animali è notturno? ## Gufo ## Passero ## Rondine ## Aquila ## 1
Quale insetto costruisce i favi di cera? ## Ape ## Formica ## Cavalletta ## Coccinella ## 1
Con che cosa si nutrono le larve da cui nasce una regina d'ape? ## Pappa reale ## Propoli ## Cera ## Polline secco ## 2
Quale animale costruisce dighe nei fiumi? ## Castoro ## Lontra ## Nutria ## Ratto ## 1
Chi cova l'unico uovo del pinguino imperatore durante l'inverno antartico? ## Il maschio ## La femmina ## Un'altra coppia ## Nessuno ## 2
Nel cavalluccio marino, chi porta le uova nella sacca incubatrice? ## Il maschio ## La femmina ## Entrambi ## Nessuno dei due ## 2
Quale di questi animali usa l'ecolocalizzazione per orientarsi? ## Pipistrello ## Gufo ## Talpa ## Gatto ## 1
Quale animale è detto «la nave del deserto»? ## Cammello ## Struzzo ## Leone ## Scorpione ## 1
Che cosa accumulano le gobbe del cammello? ## Grasso ## Acqua ## Aria ## Sabbia ## 1
Quale animale sputa per difendersi dai pericoli? ## Lama ## Cavallo ## Asino ## Capra ## 1
Come si chiama il cambio periodico della pelle dei serpenti? ## Muta ## Letargo ## Metamorfosi ## Migrazione ## 1
Quale animale marino emette inchiostro per difendersi? ## Seppia ## Medusa ## Stella marina ## Cavalluccio marino ## 1
Come si chiama il sonno invernale di alcuni animali? ## Letargo ## Migrazione ## Metamorfosi ## Muta ## 1
Che cosa succhiano le farfalle dai fiori? ## Nettare ## Resina ## Linfa ## Sangue ## 1
Da che cosa è fatta la ragnatela? ## Seta prodotta dal ragno ## Cera ## Saliva solidificata ## Fango ## 1
Di che cosa si nutrono principalmente i bruchi? ## Foglie ## Nettare ## Sangue ## Legno ## 1
Di che cosa si nutrono soprattutto le termiti? ## Legno ## Sangue ## Nettare ## Carne ## 2
Di che cosa si nutre soprattutto la balenottera azzurra? ## Krill ## Grandi pesci ## Calamari giganti ## Foche ## 2
Qual è il più grande cetaceo dotato di denti? ## Capodoglio ## Orca ## Narvalo ## Beluga ## 2
Quale mammifero marino è chiamato anche «balena assassina»? ## Orca ## Narvalo ## Beluga ## Delfino comune ## 1
Quale pesce cambia sesso nel corso della vita, da maschio a femmina? ## Pesce pagliaccio ## Tonno ## Salmone ## Sogliola ## 2
Di che specie è Nemo, protagonista del film Pixar «Alla ricerca di Nemo»? ## Pesce pagliaccio ## Pesce palla ## Pesce angelo ## Cavalluccio marino ## 1
Quale di questi animali è un invertebrato? ## Medusa ## Salamandra ## Tonno ## Rana ## 1
Quale mollusco produce le perle più apprezzate in gioielleria? ## Ostrica ## Calamaro ## Lumaca ## Seppia ## 1
Quale uccello depone le uova nei nidi di altri uccelli? ## Cuculo ## Passero ## Rondine ## Picchio ## 2
Quale uccello costruisce il nido di fango sotto i tetti e le grondaie? ## Rondine ## Cuculo ## Gufo ## Pettirosso ## 2
Quale uccello è simbolo di pace? ## Colomba ## Cigno ## Gabbiano ## Aquila ## 1
Da che cosa deriva il colore rosa dei fenicotteri? ## Dai carotenoidi del cibo ## Dal calore del sole ## Dalla temperatura corporea ## Da una malattia della pelle ## 2
Quale uccello australiano ha un verso simile a una risata? ## Kookaburra ## Emù ## Cacatua ## Kiwi ## 3
Quale mammifero ha la lingua scura, lunga circa 45 centimetri? ## Giraffa ## Zebra ## Elefante ## Leone ## 3
Quali denti dell'elefante formano le zanne? ## Gli incisivi ## I canini ## I molari ## I premolari ## 3
Quale animale ha le pupille orizzontali, a forma di rettangolo? ## Capra ## Gatto ## Lupo ## Leone ## 3
Quale fu probabilmente il primo animale addomesticato dall'uomo? ## Il cane ## Il gatto ## Il cavallo ## La mucca ## 2
Da quale animale selvatico discende il cane domestico? ## Lupo ## Sciacallo ## Volpe ## Coyote ## 1
Da quale animale selvatico discende il maiale domestico? ## Cinghiale ## Facocero ## Tapiro ## Pecari ## 1
Da quale animale selvatico discende il gatto domestico? ## Gatto selvatico africano ## Lince ## Leone ## Servalo ## 3
Il mulo è figlio di… ## un asino e una cavalla ## un cavallo e un'asina ## una zebra e un cavallo ## due asini ## 2
Di quale razza è il cane Snoopy, dei fumetti «Peanuts»? ## Beagle ## Bassotto ## Carlino ## Barboncino ## 1
Di quale razza è Lassie, la cagna protagonista di film e serie TV? ## Collie ## Pastore tedesco ## Labrador ## Golden retriever ## 1
Di quale razza era Hachiko, il cane famoso per la sua fedeltà? ## Akita ## Husky ## Labrador ## Terranova ## 2
Come si chiamava il cane che nel 1957 fu il primo essere vivente a orbitare attorno alla Terra? ## Laika ## Belka ## Strelka ## Pluto ## 2
Come si chiamava la pecora clonata nel 1996? ## Dolly ## Molly ## Polly ## Lolly ## 1
Quale razza di cane è leggendaria per il soccorso in montagna, con il barilotto al collo? ## San Bernardo ## Dobermann ## Chihuahua ## Bulldog ## 1
Quale razza di cane è bianca a macchie nere, come i protagonisti de «La carica dei 101»? ## Dalmata ## Dobermann ## Beagle ## Boxer ## 1
Quale razza di cane ha la lingua blu-nera? ## Chow chow ## Dalmata ## Beagle ## Boxer ## 2
Quale razza di cane è considerata la più veloce? ## Levriero ## Pastore tedesco ## Labrador ## Terranova ## 2
Quale razza italiana è famosa per cercare i tartufi? ## Lagotto romagnolo ## Pastore maremmano ## Cane corso ## Mastino napoletano ## 2
Quale razza di gatto è priva di pelo? ## Sphynx ## Persiano ## Siamese ## Maine Coon ## 1
Quale razza di gatto è tra le più grandi? ## Maine Coon ## Siamese ## Bobtail giapponese ## Sphynx ## 2
Quale razza di gatto ha le orecchie ripiegate in avanti? ## Scottish fold ## Siamese ## Persiano ## Sphynx ## 3
Quale razza di gatto ha il muso schiacciato e il pelo lungo? ## Persiano ## Siamese ## Sphynx ## Manx ## 2
Come si chiama il gatto dal sorriso enigmatico in «Alice nel Paese delle Meraviglie»? ## Stregatto ## Silvestro ## Garfield ## Tom ## 1
Quale animale compare nello stemma della Ferrari? ## Cavallino rampante ## Toro ## Leone ## Aquila ## 1
Quale animale compare nel logo della Lamborghini? ## Toro ## Cavallo ## Leone ## Serpente ## 1
Quale animale compare nel logo della Peugeot? ## Leone ## Toro ## Lupo ## Aquila ## 1
Quale animale compare nel logo della Jaguar? ## Giaguaro ## Leopardo ## Puma ## Pantera ## 1
Quale animale compare nello stemma dell'Alfa Romeo? ## Biscione (serpente) ## Drago ## Leone ## Cavallo ## 2
Quale animale è il simbolo dell'Abarth? ## Scorpione ## Ragno ## Serpente ## Toro ## 2
Quale animale compare nel logo del marchio Lacoste? ## Coccodrillo ## Rana ## Cavallo ## Leone ## 1
Quale animale è la mascotte del sistema operativo Linux? ## Pinguino ## Gufo ## Foca ## Gatto ## 1
Quale animale è raffigurato nel logo di Firefox, spesso scambiato per una volpe? ## Panda rosso ## Volpe rossa ## Procione ## Lupo ## 3
Quale animale compare nella bandiera del Galles? ## Drago ## Leone ## Aquila ## Orso ## 1
Quale animale compare, insieme all'emù, nello stemma dell'Australia? ## Canguro ## Koala ## Dingo ## Ornitorinco ## 2
Quale uccello è il simbolo nazionale della Nuova Zelanda? ## Kiwi ## Pinguino ## Emù ## Kakapo ## 1
Quale animale è simbolo del Parco Nazionale del Gran Paradiso? ## Stambecco ## Camoscio ## Lupo ## Orso ## 2
Quale uccello rosa nidifica nelle lagune della Sardegna? ## Fenicottero ## Pellicano ## Gru ## Cicogna ## 1
Quale rapace notturno è tradizionalmente simbolo di saggezza? ## Civetta ## Aquila ## Falco ## Avvoltoio ## 1
Quale animale è legato a San Francesco d'Assisi nella leggenda di Gubbio? ## Il lupo ## L'orso ## Il leone ## Il cervo ## 2
Quali animali salvarono il Campidoglio dall'assalto dei Galli, secondo la tradizione? ## Le oche ## I cani ## I lupi ## Le api ## 2
Quali animali usò Annibale per attraversare le Alpi? ## Elefanti ## Cammelli ## Cavalli ## Lama ## 1
Quale animale preistorico era coperto di lungo pelo e viveva nelle steppe fredde? ## Mammut lanoso ## Smilodonte ## Dodo ## Megalodonte ## 1
Quale dinosauro aveva tre corna sul muso? ## Triceratopo ## Stegosauro ## Anchilosauro ## Diplodoco ## 1
Quale dinosauro aveva placche ossee sul dorso e spine sulla coda? ## Stegosauro ## Triceratopo ## Tirannosauro ## Velociraptor ## 1
Quale dinosauro aveva la coda terminante con una «mazza» ossea? ## Anchilosauro ## Stegosauro ## Brontosauro ## Spinosauro ## 3
Da quale periodo geologico prende il nome il film «Jurassic Park»? ## Giurassico ## Cretaceo ## Triassico ## Permiano ## 1
Quale evento è ritenuto la causa principale dell'estinzione dei dinosauri non aviani? ## L'impatto di un grande asteroide ## Un'era glaciale ## Una pandemia ## La caccia dell'uomo ## 2
Quale gruppo di animali viventi discende dai dinosauri? ## Gli uccelli ## I mammiferi ## Gli anfibi ## I pesci ## 2
Quale insetto trasmette la malaria? ## Zanzara ## Mosca ## Pulce ## Cimice ## 1
Quale animale trasmette la malattia di Lyme? ## Zecca ## Zanzara ## Pulce ## Mosca ## 2
Quale animale trasmise la peste nera dai ratti all'uomo? ## La pulce ## La zanzara ## La mosca ## La cimice ## 2
Quale insetto «canta» sfregando le ali tra loro? ## Grillo ## Zanzara ## Ape ## Coccinella ## 3
Il baco da seta, una volta adulto, diventa… ## una falena ## un'ape ## una formica ## una cicala ## 3
Chi depone le uova in un alveare? ## La regina ## Il fuco ## L'operaia ## La guardia ## 1
Quale insetto ha lunghe zampe posteriori adatte al salto e fa un «canto» stridulo? ## Cavalletta ## Libellula ## Coccinella ## Mosca ## 2
Quale insetto, in realtà, è il «cervo volante»? ## Un coleottero ## Una farfalla ## Una libellula ## Una vespa ## 3
Quale insetto è noto per le sue ali trasparenti e il volo veloce vicino a stagni e fiumi? ## Libellula ## Cimice ## Scarabeo ## Pulce ## 1
Che cosa produce l'ape, oltre al miele, per riparare e sigillare l'alveare? ## Propoli ## Pappa reale ## Seta ## Nettare ## 3
`).map((p) => ({ q: p[0], a: p[1], wrong: [p[2], p[3], p[4]], d: +p[5] }));
  const tfData = rows(`
V ## 1 ## Il dromedario ha una sola gobba.
F ## 1 ## Il cammello battriano ha una sola gobba. ## Ne ha due.
F ## 2 ## Le gobbe del cammello contengono acqua. ## Contengono riserve di grasso.
V ## 2 ## Le gobbe del cammello contengono soprattutto grasso.
V ## 2 ## Il polpo ha il sangue di colore bluastro.
V ## 2 ## Nel cavalluccio marino è il maschio a portare le uova nella propria sacca.
V ## 2 ## Quasi tutte le specie di pinguini vivono nell'emisfero australe.
F ## 1 ## Gli orsi polari vivono al Polo Sud. ## Vivono nell'Artico, intorno al Polo Nord.
F ## 1 ## I pinguini imperatori vivono nell'Artico. ## Vivono in Antartide, al Polo Sud.
V ## 2 ## L'orso polare ha la pelle nera.
V ## 3 ## Il pelo dell'orso polare è in realtà trasparente.
V ## 2 ## Il disegno delle strisce è diverso da una tigre all'altra.
F ## 1 ## Il pipistrello è un uccello. ## È un mammifero.
V ## 2 ## Il koala dorme fino a circa venti ore al giorno.
V ## 2 ## I cavalli possono dormire in piedi.
F ## 1 ## I tori si arrabbiano alla vista del colore rosso. ## I bovini non distinguono il rosso: reagiscono al movimento del drappo.
F ## 1 ## I pesci rossi hanno una memoria di appena tre secondi. ## Ricordano cose per settimane o mesi.
F ## 2 ## I lemming si lanciano in massa dalle scogliere per suicidarsi. ## È un mito.
V ## 1 ## Le api producono il miele a partire dal nettare dei fiori.
V ## 2 ## Soltanto le zanzare femmine pungono per nutrirsi di sangue.
V ## 2 ## Il fuco, il maschio dell'ape, non ha il pungiglione.
V ## 2 ## Dopo aver punto un mammifero, l'ape mellifera operaia di solito muore.
F ## 2 ## Le vespe comuni producono miele come le api. ## Non lo producono.
V ## 2 ## La femmina della mantide religiosa a volte divora il maschio dopo l'accoppiamento.
F ## 2 ## Il ragno ha sei zampe. ## Ne ha otto.
V ## 2 ## L'albatro può restare in volo per ore senza battere le ali.
V ## 1 ## La balenottera azzurra è il più grande animale mai vissuto sulla Terra, per quanto sappiamo.
V ## 2 ## Il capodoglio è il più grande cetaceo dotato di denti.
F ## 2 ## La balenottera azzurra si nutre filtrando il plancton con dei denti affilati. ## Ha i fanoni, non i denti.
V ## 3 ## Gli squali non hanno ossa: il loro scheletro è di cartilagine.
F ## 2 ## Gli squali devono salire in superficie per respirare aria. ## Respirano con le branchie.
V ## 2 ## Il pesce spada ha sul muso un lungo prolungamento a forma di spada.
F ## 1 ## La tartaruga è un anfibio. ## È un rettile.
V ## 2 ## Le tartarughe marine depongono le uova sulla terraferma.
V ## 2 ## Il camaleonte può muovere i due occhi in modo indipendente.
V ## 3 ## Il coccodrillo non riesce a tirare fuori la lingua.
F ## 1 ## La rana è un rettile. ## È un anfibio.
V ## 2 ## Le rane possono respirare anche attraverso la pelle.
V ## 2 ## I girini respirano con le branchie.
V ## 1 ## La lumaca è un mollusco.
V ## 3 ## Il riccio di mare è un echinoderma.
F ## 1 ## La medusa ha uno scheletro di ossa. ## È un invertebrato, senza ossa.
V ## 2 ## Il polpo può infilarsi in fessure molto strette perché non ha ossa.
F ## 2 ## Il polpo ha un solo cuore. ## Ne ha tre.
V ## 3 ## Il calamaro colossale ha gli occhi tra i più grandi di tutto il regno animale.
V ## 1 ## Il panda gigante vive in Cina.
V ## 2 ## L'elefante asiatico ha orecchie più piccole di quello africano.
V ## 3 ## I parenti viventi più stretti dell'ippopotamo sono i cetacei.
V ## 2 ## Il ghepardo non sa ruggire, ma fa le fusa.
V ## 2 ## Il leone è l'unico grande felino che vive in gruppi familiari.
F ## 1 ## La tigre vive in Africa. ## Vive in Asia.
F ## 1 ## Il leone vive nella foresta amazzonica. ## Vive nella savana africana e, in piccola parte, in India.
F ## 2 ## In Italia il lupo è scomparso del tutto. ## Il lupo è presente sull'Appennino e sulle Alpi.
V ## 2 ## In Italia vivono ancora sia il lupo sia l'orso bruno.
V ## 2 ## La gallina depone uova anche in assenza del gallo.
V ## 2 ## Il tacchino è originario delle Americhe.
F ## 3 ## Le galline domestiche discendono da uccelli selvatici europei. ## Discendono dal gallo bankiva, un uccello selvatico dell'Asia.
V ## 2 ## Il mulo nasce dall'incrocio tra un asino e una cavalla.
V ## 2 ## Il mulo è, di norma, sterile.
F ## 1 ## I cani vedono soltanto in bianco e nero. ## Distinguono alcuni colori, come il giallo e il blu.
V ## 2 ## I cani distinguono meno colori dell'uomo.
F ## 2 ## I gatti riescono a vedere nel buio totale. ## Hanno bisogno almeno di un po' di luce.
F ## 1 ## Il gatto è un animale erbivoro. ## È un carnivoro.
V ## 3 ## Il gatto è un carnivoro stretto e ha bisogno di nutrirsi di carne.
F ## 1 ## Il koala vive in Africa. ## Vive in Australia.
V ## 2 ## Il dodo viveva sull'isola di Mauritius.
V ## 2 ## Il mammut lanoso era un parente stretto degli elefanti.
F ## 1 ## I dinosauri si estinsero per colpa dell'uomo. ## Si estinsero circa 66 milioni di anni fa, molto prima della comparsa dell'uomo.
V ## 2 ## Gli uccelli discendono dai dinosauri.
F ## 1 ## Il Tyrannosaurus rex è vissuto nel periodo Giurassico. ## Visse nel Cretaceo.
V ## 2 ## Il vero Velociraptor era grande più o meno come un tacchino.
V ## 1 ## Il Triceratopo era un dinosauro erbivoro.
V ## 1 ## La farfalla passa attraverso gli stadi di uovo, bruco, crisalide e adulto.
V ## 2 ## La coccinella si nutre soprattutto di afidi.
V ## 3 ## La regina delle formiche può vivere per anni, molto più delle operaie.
F ## 2 ## Le termiti sono un tipo di formica. ## Sono più imparentate con gli scarafaggi che con le formiche.
V ## 3 ## La cicala trascorre anni sottoterra prima di diventare adulta.
V ## 2 ## La libellula è un insetto predatore.
V ## 2 ## Il gufo può ruotare la testa di circa 270 gradi.
F ## 2 ## Il gufo può ruotare la testa di un giro completo, 360 gradi. ## La rotazione arriva a circa 270 gradi.
V ## 2 ## Il fenicottero riposa spesso stando su una zampa sola.
F ## 1 ## Lo struzzo vola molto bene. ## Ha le ali ma non vola.
V ## 3 ## L'uovo del kiwi è molto grande rispetto alle dimensioni dell'uccello.
V ## 1 ## La rondine passa l'inverno in Africa o in regioni calde.
V ## 2 ## Il cigno nero è originario dell'Australia.
V ## 3 ## La foca monaca è una specie rarissima nel Mediterraneo.
V ## 2 ## Il lamantino è un mammifero marino erbivoro.
V ## 1 ## Il topo è un roditore.
F ## 2 ## Il coniglio è un roditore. ## È un lagomorfo, come la lepre.
V ## 1 ## Il riccio trascorre l'inverno in letargo.
F ## 1 ## La marmotta resta sveglia tutto l'inverno. ## Va in letargo.
V ## 2 ## L'orso bruno passa l'inverno in una tana in uno stato di sonno profondo.
V ## 1 ## Il cane domestico discende dal lupo.
V ## 2 ## La mucca è un ruminante.
V ## 2 ## La capra è un ruminante.
F ## 2 ## Il maiale è un ruminante. ## Ha uno stomaco semplice.
V ## 3 ## Il cavallo non è un ruminante.
V ## 2 ## L'ippopotamo è un erbivoro.
V ## 2 ## L'iguana verde adulta è erbivora.
F ## 2 ## Il panda rosso è un tipo di orso. ## Appartiene a una famiglia a sé, quella degli Ailuridi.
V ## 1 ## La zanzara tigre è originaria dell'Asia.
F ## 2 ## L'ape regina vive di solito pochi giorni. ## Può vivere diversi anni.
V ## 3 ## La stella marina non ha cervello né sangue, ma un sistema di canali pieni d'acqua.
F ## 2 ## I serpenti sentono i suoni attraverso grandi orecchie esterne. ## Non hanno orecchie esterne.
`).map((p) => { const x = { q: p[2], a: p[0] === 'V', d: +p[1] }; if (p[3]) x.why = p[3]; return x; });
  const typedData = rows(`
Come si chiama il cucciolo del cervo? ## Cerbiatto ## - ## 1
Come si chiama il cucciolo della capra? ## Capretto ## - ## 1
Come si chiama il cucciolo della lepre? ## Leprotto ## - ## 2
Come si chiama il cucciolo dell'anatra? ## Anatroccolo ## Paperotto;Paperino ## 1
Come si chiama il cucciolo della gallina? ## Pulcino ## - ## 1
Come si chiama il cucciolo della rana? ## Girino ## - ## 1
Come si chiama il cucciolo della balena? ## Balenottero ## - ## 3
Come si chiama la femmina del maiale? ## Scrofa ## - ## 2
Come si chiama il maschio della pecora? ## Montone ## Ariete ## 2
Come si chiama il maschio dell'ape? ## Fuco ## - ## 2
Come si chiama il cavallo maschio usato per la riproduzione? ## Stallone ## - ## 2
Come si chiama il verso del maiale? ## Grugnito ## - ## 1
Come si chiama il verso del serpente? ## Sibilo ## - ## 1
Come si chiama il verso della rana? ## Gracidio ## - ## 1
Come si chiama il verso del topo? ## Squittio ## - ## 2
Come si chiama il verso del cane? ## Abbaio ## Latrato;Abbaiare ## 1
Come si chiama il verso del gatto? ## Miagolio ## Miagolìo;Miagolare ## 1
Come si chiama il verso della mucca? ## Muggito ## Muggire ## 1
Come si chiama il verso della pecora? ## Belato ## Belare ## 1
Come si chiama il verso del cervo in amore? ## Bramito ## - ## 2
Come si chiama la casa delle formiche? ## Formicaio ## - ## 1
Come si chiama il ricovero delle galline? ## Pollaio ## - ## 1
Come si chiama il ricovero dei maiali? ## Porcile ## - ## 1
Come si chiama il ricovero dei cavalli di una struttura sportiva o da corsa? ## Scuderia ## - ## 1
Come si chiama il nido delle vespe? ## Vespaio ## - ## 2
Come si chiama un gruppo di api? ## Sciame ## - ## 1
Come si chiama un gruppo di pesci? ## Banco ## - ## 1
Come si chiama un gruppo di uccelli in volo? ## Stormo ## - ## 1
Come si chiama un gruppo di pecore? ## Gregge ## - ## 1
Come si chiama il sonno invernale degli animali come la marmotta? ## Letargo ## - ## 1
Come si chiama il cambio di pelle dei serpenti? ## Muta ## - ## 1
Come si chiama il «bozzolo» da cui esce la farfalla? ## Crisalide ## - ## 2
Quale animale è stato clonato nel 1996 con il nome di Dolly? ## Pecora ## - ## 1
Qual è l'uccello più veloce in picchiata? ## Falco pellegrino ## Falco;Pellegrino ## 2
Qual è il pesce più grande del mondo? ## Squalo balena ## - ## 2
Quale uccello depone le uova nei nidi degli altri? ## Cuculo ## - ## 2
Quale animale è il simbolo della Lamborghini? ## Toro ## - ## 1
Quale animale è sullo stemma della Ferrari? ## Cavallino rampante ## Cavallino;Cavallo;Cavallo rampante ## 1
Quale dinosauro aveva tre corna sul muso? ## Triceratopo ## Triceratops ## 1
Quale dinosauro, re dei predatori, aveva braccia minuscole? ## Tirannosauro ## Tyrannosaurus rex;T-rex;T rex;Tirannosauro rex ## 1
Come si chiama il famoso uccello estinto dell'isola di Mauritius? ## Dodo ## - ## 1
Di quale razza è il cane Snoopy? ## Beagle ## - ## 1
Quale razza di cane è famosa per il barilotto di soccorso alpino? ## San Bernardo ## Sanbernardo ## 1
Quale razza di gatto non ha pelo? ## Sphynx ## Sfinge ## 2
Come si chiama il cane protagonista di una serie di film con un collie? ## Lassie ## - ## 1
Come si chiama il mollusco con otto braccia? ## Polpo ## - ## 1
Come si chiama il ragno più grande, detto «mangiauccelli»? ## Ragno Golia ## Golia;Ragno goliath;Goliath ## 3
`).map((p) => { const x = { q: p[0], a: p[1], d: +p[3] }; if (p[2] !== '-') x.accept = p[2].split(';'); return x; });
  const numbersData = rows(`
Quanti compartimenti ha lo stomaco di una mucca? ## 4 ## 1 ## 10 ## 0 ## compartimenti ## 2
Quanti denti ha un cane adulto? ## 42 ## 20 ## 60 ## 3 ## denti ## 3
Quanti denti ha un gatto adulto? ## 30 ## 10 ## 50 ## 3 ## denti ## 3
Quanti occhi hanno la maggior parte dei ragni? ## 8 ## 0 ## 16 ## 0 ## occhi ## 2
Quante zampe, comprese le chele, ha un granchio? ## 10 ## 2 ## 20 ## 0 ## zampe ## 2
Quante ali ha una farfalla? ## 4 ## 0 ## 10 ## 0 ## ali ## 1
Quante ali ha una mosca? ## 2 ## 0 ## 10 ## 0 ## ali ## 2
Quanto dura la gravidanza di un'elefantessa? ## 22 ## 6 ## 36 ## 2 ## mesi ## 2
Quanto dura la gravidanza di una giraffa? ## 15 ## 4 ## 30 ## 2 ## mesi ## 3
Quanto dura la gestazione di una mucca? ## 9 ## 3 ## 18 ## 1 ## mesi ## 2
Quanto dura la gestazione di una gatta? ## 65 ## 20 ## 150 ## 8 ## giorni ## 3
Quanti giorni di incubazione servono a un uovo di gallina? ## 21 ## 5 ## 60 ## 2 ## giorni ## 2
Quante uova all'anno può deporre una gallina ovaiola? ## 300 ## 50 ## 800 ## 60 ## uova ## 3
A quale velocità massima corre il ghepardo? ## 110 ## 30 ## 250 ## 15 ## km/h ## 1
A quale velocità massima corre il leone? ## 80 ## 20 ## 200 ## 12 ## km/h ## 2
A quale velocità massima corre lo struzzo? ## 70 ## 20 ## 200 ## 12 ## km/h ## 2
A quale velocità massima corre un cavallo al galoppo? ## 70 ## 20 ## 200 ## 12 ## km/h ## 2
A quale velocità massima può correre un elefante africano? ## 40 ## 10 ## 150 ## 8 ## km/h ## 3
A quale velocità massima, in picchiata, può arrivare il falco pellegrino? ## 320 ## 100 ## 500 ## 60 ## km/h ## 3
Quanto è lunga una balenottera azzurra adulta, al massimo? ## 30 ## 5 ## 60 ## 4 ## metri ## 2
Quanto pesa, al massimo, una balenottera azzurra? ## 150 ## 10 ## 500 ## 35 ## tonnellate ## 3
Quanto pesa un elefante africano maschio adulto? ## 5 ## 1 ## 15 ## 1 ## tonnellate ## 2
Quanto pesa un ippopotamo maschio adulto? ## 1500 ## 300 ## 5000 ## 400 ## kg ## 3
Quanto pesa un leone maschio adulto? ## 190 ## 50 ## 500 ## 40 ## kg ## 2
Quanto pesa un orso polare maschio adulto? ## 450 ## 100 ## 1000 ## 100 ## kg ## 3
Quanto pesa un gorilla maschio adulto? ## 170 ## 50 ## 500 ## 30 ## kg ## 3
Quanto pesa un panda gigante adulto? ## 100 ## 20 ## 300 ## 20 ## kg ## 2
Quanto pesa un canguro rosso maschio adulto? ## 85 ## 10 ## 250 ## 20 ## kg ## 3
Quanto pesa un colibrì ape, il più piccolo uccello del mondo? ## 2 ## 0 ## 20 ## 1 ## grammi ## 3
Quanto era lungo, circa, un Tyrannosaurus rex adulto? ## 12 ## 2 ## 30 ## 2 ## metri ## 2
Quanto è lungo, al massimo, un coccodrillo marino? ## 6 ## 1 ## 15 ## 1 ## metri ## 3
Quanto è lungo uno squalo balena adulto, in genere? ## 12 ## 2 ## 30 ## 3 ## metri ## 3
Quanto è alto, circa, uno struzzo adulto? ## 250 ## 50 ## 500 ## 30 ## cm ## 2
Quanto è alta, al massimo, una giraffa? ## 5 ## 1 ## 12 ## 1 ## metri ## 2
Qual è l'apertura alare massima di un albatro urlatore? ## 350 ## 100 ## 700 ## 30 ## cm ## 3
Quante volte al secondo batte le ali un colibrì in volo? ## 50 ## 5 ## 200 ## 20 ## battiti ## 3
Quanti anni può vivere una tartaruga gigante? ## 150 ## 20 ## 400 ## 40 ## anni ## 2
Quanti anni vive in media un elefante? ## 65 ## 10 ## 150 ## 10 ## anni ## 2
Quanti anni vive in media un cane? ## 12 ## 2 ## 40 ## 3 ## anni ## 1
Quanti anni vive in media un gatto domestico? ## 15 ## 2 ## 40 ## 3 ## anni ## 1
Quanti anni vive in media un topo domestico? ## 2 ## 0 ## 10 ## 1 ## anni ## 2
Quanti anni vive in media un cavallo? ## 28 ## 5 ## 70 ## 6 ## anni ## 2
Quanti anni vive una regina delle api? ## 4 ## 0 ## 15 ## 1 ## anni ## 3
Quante settimane vive un'ape operaia in piena estate? ## 6 ## 1 ## 30 ## 1 ## settimane ## 3
Quanti anni può vivere uno squalo della Groenlandia? ## 400 ## 50 ## 1000 ## 130 ## anni ## 3
Quanti anni può vivere una balena della Groenlandia? ## 200 ## 30 ## 500 ## 40 ## anni ## 3
Quanto vive in media un criceto? ## 2 ## 0 ## 10 ## 1 ## anni ## 2
Quante ore al giorno dorme in media un gatto adulto? ## 15 ## 3 ## 24 ## 3 ## ore ## 2
Quante ore al giorno dorme in media un koala? ## 20 ## 3 ## 24 ## 2 ## ore ## 2
Quante specie di uccelli esistono, circa? ## 11000 ## 1000 ## 50000 ## 1500 ## specie ## 3
Quante specie di mammiferi esistono, circa? ## 6500 ## 500 ## 30000 ## 800 ## specie ## 3
Quante specie di insetti sono state descritte, circa? ## 1000000 ## 100000 ## 5000000 ## 200000 ## specie ## 3
Quanti anni passa sottoterra, al massimo, la cicala periodica americana prima di emergere? ## 17 ## 1 ## 40 ## 0 ## anni ## 3
Quanti chilometri percorre in un anno, andata e ritorno, la sterna artica? ## 70000 ## 5000 ## 200000 ## 15000 ## km ## 3
Quanti milioni di anni fa si estinsero i dinosauri non aviani? ## 66 ## 10 ## 300 ## 2 ## milioni di anni ## 2
Quanti milioni di anni fa comparvero i primi dinosauri? ## 230 ## 50 ## 600 ## 15 ## milioni di anni ## 3
In che anno fu clonata la pecora Dolly? ## 1996 ## 1970 ## 2015 ## 1 ##  ## 2
In che anno la cagnetta Laika orbitò attorno alla Terra? ## 1957 ## 1930 ## 1980 ## 1 ##  ## 2
`).map((p) => ({ q: p[0], v: +p[1], min: +p[2], max: +p[3], tol: +p[4], unit: p[5], d: +p[6] }));
  const orderData = rows(`
Metti in ordine di dimensione, dal più piccolo ## Ape|Topo|Gatto|Elefante ## 1
Metti in ordine di peso, dal più leggero ## Gatto|Lupo|Leone|Orso polare|Elefante africano ## 1
Metti in ordine di velocità massima, dal più lento ## Lumaca|Elefante africano|Struzzo|Ghepardo ## 1
Metti in ordine di durata della gestazione, dalla più breve ## Topo|Coniglio|Gatto|Mucca|Elefante ## 2
Metti in ordine di altezza, dal più basso ## Topo|Gatto|Cavallo|Giraffa ## 1
Metti in ordine di durata media della vita, dalla più breve ## Topo|Cane|Cavallo|Elefante|Tartaruga gigante ## 2
Metti in ordine le fasi della metamorfosi di un insetto, dalla prima ## Uovo|Larva|Pupa|Adulto ## 1
Metti in ordine di comparsa i periodi geologici, dal più antico ## Permiano|Triassico|Giurassico|Cretaceo ## 3
Metti in ordine di peso gli uccelli, dal più leggero ## Colibrì|Passero|Piccione|Aquila reale|Struzzo ## 2
Metti in ordine di lunghezza i pesci, dal più corto ## Sardina|Salmone|Squalo bianco|Squalo balena ## 2
Metti in ordine di numero di zampe, dal minore ## Delfino|Gallina|Cane|Ragno ## 1
Metti in ordine di numero di zampe, dal minore ## Gallina|Gatto|Ape|Ragno|Granchio ## 1
Metti in ordine di peso le uova, dal più leggero ## Quaglia|Gallina|Oca|Struzzo ## 2
Metti in ordine di altezza al garrese, dal più basso ## Chihuahua|Beagle|Pastore tedesco|Alano ## 2
`).map((p) => ({ q: p[0], items: p[1].split('|'), d: +p[2] }));
  const emojiData = rows(`
🦥 ## Bradipo ## 1
🦦 ## Lontra ## 2
🦔 ## Riccio ## 1
🦩 ## Fenicottero ## 1
🦜 ## Pappagallo ## 1
🦚 ## Pavone ## 1
🦢 ## Cigno ## 1
🦅 ## Aquila ## 1
🦉 ## Gufo ## 1
🦈 ## Squalo ## 1
🐙 ## Polpo ## 1
🦑 ## Calamaro ## 2
🦀 ## Granchio ## 1
🦞 ## Aragosta ## 2
🦐 ## Gambero ## 2
🐌 ## Lumaca ## 1
🦋 ## Farfalla ## 1
🐝 ## Ape ## 1
🐜 ## Formica ## 1
🦗 ## Grillo ## 2
🦂 ## Scorpione ## 1
🕷️ ## Ragno ## 1
🐢 ## Tartaruga ## 1
🐊 ## Coccodrillo ## 1
🦖 ## Tirannosauro ## 1
🐧 ## Pinguino ## 1
🦭 ## Foca ## 2
🦬 ## Bisonte ## 2
🦌 ## Cervo ## 1
🐫 ## Cammello ## 1
🦙 ## Lama ## 1
🦛 ## Ippopotamo ## 1
🦏 ## Rinoceronte ## 1
🐘 ## Elefante ## 1
🦍 ## Gorilla ## 1
🦧 ## Orango ## 2
🦓 ## Zebra ## 1
🦘 ## Canguro ## 1
🦫 ## Castoro ## 2
🦡 ## Tasso ## 2
🦨 ## Moffetta ## 2
🦇 ## Pipistrello ## 1
🐓 ## Gallo ## 1
🦃 ## Tacchino ## 1
🦤 ## Dodo ## 2
🪳 ## Scarafaggio ## 1
🪰 ## Mosca ## 1
🦟 ## Zanzara ## 1
🐋 ## Balena ## 1
🐬 ## Delfino ## 1
🐡 ## Pesce palla ## 2
🦒 ## Giraffa ## 1
🐅 ## Tigre ## 1
🐆 ## Leopardo ## 2
🐿️ ## Scoiattolo ## 1
🐀 ## Ratto ## 2
🦎 ## Lucertola ## 2
🐍 ## Serpente ## 1
🐸 ## Rana ## 1
🐑 ## Pecora ## 1
🐐 ## Capra ## 2
🦆 ## Anatra ## 1
🐗 ## Cinghiale ## 2
🐺 ## Lupo ## 1
🦊 ## Volpe ## 1
🐼 ## Panda ## 1
🐨 ## Koala ## 1
🦁 ## Leone ## 1
🐒 ## Scimmia ## 1
🐞 ## Coccinella ## 1
🪲 ## Coleottero ## 3
`).map((p) => ({ emoji: p[0], answer: p[1], d: +p[2] }));

  const classi = mk({
    Mammifero: 'Pipistrello~1|Delfino~1|Balena~1|Orca~1|Foca~1|Ornitorinco~2|Canguro~1|Koala~1|Riccio~1|Talpa~2|Lamantino~2|Tricheco~2|Pangolino~2|Armadillo~2|Bradipo~1|Scoiattolo~1|Castoro~2|Ippopotamo~1|Cammello~1|Lontra~2|Zebra~1|Procione~2|Lemure~2|Ghepardo~1|Leone marino~1|Capibara~2|Dugongo~3|Narvalo~2|Suricato~2|Istrice~2|Cinghiale~1|Topo~1|Echidna~3',
    Uccello: 'Pinguino~1|Struzzo~1|Kiwi~2|Colibrì~1|Gufo~1|Aquila~1|Pellicano~2|Fenicottero~1|Pavone~1|Cigno~1|Gabbiano~1|Cicogna~1|Tucano~1|Pappagallo~1|Emù~2|Nandù~3|Casuario~3|Albatro~2|Condor~2|Avvoltoio~2|Piccione~1|Passero~1|Rondine~1|Gallina~1|Tacchino~1|Cormorano~3|Airone~2|Cuculo~2|Picchio~2|Corvo~1',
    Rettile: 'Coccodrillo~1|Alligatore~1|Serpente~1|Lucertola~1|Geco~2|Iguana~1|Camaleonte~1|Tartaruga~1|Testuggine~2|Varano~2|Cobra~1|Pitone~1|Anaconda~1|Tuatara~3|Gaviale~3|Basilisco~3|Orbettino~3|Biscia~2|Vipera~1|Mamba nero~2|Drago di Komodo~1',
    Anfibio: 'Rana~1|Rospo~1|Salamandra~1|Tritone~2|Raganella~2|Axolotl~2|Proteo~3|Rana toro~2|Rana freccia velenosa~2|Cecilia~3',
    Pesce: 'Squalo bianco~1|Tonno~1|Salmone~1|Cavalluccio marino~1|Pesce palla~2|Anguilla~2|Razza~2|Manta~2|Trota~1|Luccio~2|Piranha~1|Pesce spada~1|Sogliola~1|Merluzzo~1|Pesce rosso~1|Pesce pagliaccio~1|Squalo balena~2|Barracuda~2|Murena~2|Pesce luna~3|Sardina~1|Storione~2|Carpa~2',
    Insetto: 'Ape~1|Farfalla~1|Formica~1|Mosca~1|Zanzara~1|Coccinella~1|Libellula~1|Cavalletta~1|Grillo~1|Mantide religiosa~2|Scarafaggio~1|Vespa~1|Cicala~1|Lucciola~1|Pulce~2|Insetto stecco~2|Maggiolino~2|Pidocchio~2|Falena~2|Calabrone~1',
    Aracnide: 'Ragno~1|Scorpione~1|Zecca~1|Tarantola~2|Vedova nera~2|Acaro~3',
    Crostaceo: 'Granchio~1|Aragosta~1|Gambero~1|Scampo~2|Astice~2|Paguro~2|Krill~2|Balano~3|Cicala di mare~3|Porcellino di terra~3',
    Mollusco: 'Polpo~1|Calamaro~1|Seppia~1|Chiocciola~1|Cozza~1|Vongola~1|Ostrica~1|Nautilo~3|Capasanta~2|Patella~3',
    Cnidario: 'Medusa~1|Corallo~2|Anemone di mare~2|Idra~3',
    Echinoderma: 'Stella marina~1|Riccio di mare~1|Cetriolo di mare~3|Giglio di mare~3',
  }, 'classe');

  const dieta = mk({
    Erbivoro: 'Mucca~1|Cavallo~1|Pecora~1|Capra~1|Elefante~1|Giraffa~1|Zebra~1|Ippopotamo~2|Rinoceronte~1|Koala~1|Bradipo~1|Canguro~1|Cammello~1|Lama~1|Cervo~1|Coniglio~1|Lepre~1|Bisonte~2|Alce~2|Renna~1|Stambecco~2|Camoscio~2|Vombato~2|Lamantino~2|Bufalo~1|Yak~2|Gnu~2|Tapiro~3|Capibara~2|Cavia~2|Chinchilla~3|Iguana verde~2|Dugongo~3|Antilope~2|Muflone~3|Asino~1|Marmotta~2',
    Carnivoro: 'Leone~1|Tigre~1|Lupo~1|Squalo bianco~1|Orca~1|Aquila reale~1|Falco~2|Coccodrillo~1|Pitone~2|Ghepardo~1|Leopardo~1|Giaguaro~1|Lince~2|Puma~2|Orso polare~1|Gatto~1|Foca~2|Delfino~1|Polpo~2|Mantide religiosa~2|Barracuda~3|Cobra~2|Varano di Komodo~2|Iena macchiata~2|Pesce spada~2|Luccio~3|Airone cenerino~3|Gufo reale~2|Barbagianni~3|Martin pescatore~3|Leone marino~2|Squalo tigre~2|Alligatore~2|Scorpione~2|Libellula~3|Narvalo~3',
    Onnivoro: 'Orso bruno~1|Maiale~1|Cinghiale~1|Corvo~1|Gabbiano~2|Ratto~1|Scimpanzé~2|Procione~2|Tasso~3|Gallina~1|Babbuino~2|Scarafaggio~2|Anatra~2|Tacchino~2|Cornacchia~2|Opossum~3|Orso grizzly~2|Topo~2',
  }, 'dieta');

  const continenti = mk({
    Africa: 'Giraffa~1|Zebra~1|Ippopotamo~1|Okapi~2|Gnu~2|Facocero~2|Suricato~2|Gorilla~1|Mandrillo~2|Iena macchiata~2|Elefante africano~1|Rinoceronte bianco~2|Struzzo~1|Fennec~2|Oritteropo~3|Serval~3|Pappagallo cenerino~3|Impala~3|Gazzella di Thomson~3|Lemure catta~2|Mamba nero~2|Scimpanzé~2|Aye-aye~3|Bufalo cafro~3',
    Asia: 'Tigre~1|Panda gigante~1|Panda rosso~2|Orango~1|Elefante asiatico~1|Rinoceronte indiano~2|Gibbone~2|Cammello battriano~2|Yak~2|Macaco giapponese~2|Tapiro malese~3|Leopardo delle nevi~2|Cobra reale~2|Gaviale~3|Binturong~3|Orso malese~3|Tarsio~3',
    'America del Sud': 'Lama~1|Alpaca~1|Anaconda~1|Capibara~1|Piranha~1|Condor delle Ande~1|Vigogna~2|Guanaco~3|Pinguino di Magellano~3|Ara giacinto~3|Tapiro sudamericano~3|Nandù~2|Orso dagli occhiali~3|Cincillà~2|Pinguino di Humboldt~3|Ragno Golia~3|Mara~3|Delfino rosa~3|Armadillo gigante~3',
    'America del Nord': 'Bisonte americano~1|Aquila calva~1|Orso grizzly~1|Coyote~1|Bue muschiato~3|Mostro di Gila~3|Alligatore americano~2|Tacchino selvatico~2|Cane della prateria~2|Antilocapra~3|Orso nero americano~2|Procione~2|Lince rossa~3|Scoiattolo grigio~2|Moffetta striata~2|Condor della California~3',
    Oceania: 'Canguro rosso~1|Koala~1|Vombato~2|Ornitorinco~1|Diavolo della Tasmania~2|Emù~1|Casuario~3|Kiwi~1|Kookaburra~2|Dingo~2|Wallaby~2|Quokka~3|Tuatara~3|Kakapo~3|Uccello lira~3|Petauro dello zucchero~3|Kea~3',
    Antartide: 'Pinguino imperatore~1|Pinguino di Adelia~2|Foca di Weddell~3|Foca leopardo~3|Petrello delle nevi~3|Stercorario antartico~3',
    Europa: 'Stambecco delle Alpi~2|Marmotta alpina~1|Lince pardina~3|Orso marsicano~3|Camoscio d\'Abruzzo~3|Aquila imperiale iberica~3|Riccio europeo~1|Cervo sardo~3',
  }, 'continente');

  const cuccioli = [
    ['Cerbiatto', 'Cervo', 1], ['Capretto', 'Capra', 1], ['Leprotto', 'Lepre', 2], ['Anatroccolo', 'Anatra', 1],
    ['Girino', 'Rana', 1], ['Gattino', 'Gatto', 1], ['Leoncino', 'Leone', 1], ['Tigrotto', 'Tigre', 1], ['Lupacchiotto', 'Lupo', 2],
    ['Orsetto', 'Orso', 1], ['Aquilotto', 'Aquila', 2], ['Balenottero', 'Balena', 3], ['Elefantino', 'Elefante', 1], ['Maialino', 'Maiale', 1],
    ['Cignetto', 'Cigno', 2], ['Avannotto', 'Pesce', 3], ['Cinghialetto', 'Cinghiale', 2],
  ].map(([name, genitore, d]) => ({ name, genitore, d }));

  const versi = [
    ['Abbaio', 'Cane', 1], ['Miagolio', 'Gatto', 1], ['Muggito', 'Mucca', 1], ['Belato', 'Pecora', 1], ['Grugnito', 'Maiale', 1],
    ['Gracidio', 'Rana', 1], ['Sibilo', 'Serpente', 1], ['Squittio', 'Topo', 2], ['Frinito', 'Cicala', 2], ['Bramito', 'Cervo', 2],
    ['Garrito', 'Rondine', 3], ['Barrito', 'Elefante', 1], ['Ruggito', 'Leone', 1], ['Nitrito', 'Cavallo', 1],
    ['Raglio', 'Asino', 1], ['Ululato', 'Lupo', 1],
  ].map(([name, animale, d]) => ({ name, animale, d }));

  const case_ = [
    ['Alveare', 'Ape', 1], ['Formicaio', 'Formica', 1], ['Pollaio', 'Gallina', 1], ['Porcile', 'Maiale', 1], ['Ovile', 'Pecora', 2],
    ['Scuderia', 'Cavallo', 1], ['Cuccia', 'Cane', 1], ['Conigliera', 'Coniglio', 2], ['Colombaia', 'Piccione', 2], ['Vespaio', 'Vespa', 2],
  ].map(([name, ospite, d]) => ({ name, ospite, d }));

  const insetti = mk({
    Coleotteri: 'Coccinella~1|Maggiolino~2|Cervo volante~2|Lucciola~2|Scarabeo stercorario~3|Scarabeo rinoceronte~3|Punteruolo rosso~3',
    Lepidotteri: 'Farfalla monarca~2|Falena~1|Macaone~3|Cavolaia~3|Sfinge testa di morto~3|Vanessa del cardo~3',
    Imenotteri: 'Ape~1|Vespa~1|Formica~1|Calabrone~1|Bombo~2',
    Ditteri: 'Mosca~1|Zanzara~1|Tafano~2|Moscerino della frutta~2|Zanzara tigre~1|Pappataci~3',
    Ortotteri: 'Grillo~1|Cavalletta~1|Grillotalpa~3|Locusta~2',
    Emitteri: 'Cicala~1|Cimice~1|Afide~2|Cocciniglia~3',
    Odonati: 'Libellula~1|Damigella~3',
    Mantodei: 'Mantide religiosa~2|Mantide orchidea~3',
    Fasmatodei: 'Insetto stecco~2|Insetto foglia~3',
    Blattodei: 'Scarafaggio~1|Blatta orientale~2',
  }, 'ordine');

  const dinosauri = mk({
    Giurassico: 'Stegosauro~1|Diplodoco~1|Brontosauro~1|Brachiosauro~2|Allosauro~2|Compsognato~3|Dilofosauro~3',
    Cretaceo: 'Tirannosauro~1|Triceratopo~1|Velociraptor~1|Spinosauro~2|Iguanodonte~2|Anchilosauro~2|Pachicefalosauro~3|Giganotosauro~3|Carnotauro~3|Deinonico~3|Parasaurolofo~3|Utahraptor~3',
    Triassico: 'Coelophysis~3|Plateosauro~3|Herrerasauro~3',
  }, 'periodo');
  const dinoDieta = mk({
    Carnivoro: 'Tirannosauro~1|Velociraptor~1|Spinosauro~2|Allosauro~2|Giganotosauro~3|Carnotauro~3|Deinonico~3|Dilofosauro~3|Compsognato~3|Utahraptor~3|Coelophysis~3|Herrerasauro~3',
    Erbivoro: 'Triceratopo~1|Stegosauro~1|Diplodoco~1|Brontosauro~1|Brachiosauro~2|Anchilosauro~2|Iguanodonte~2|Parasaurolofo~3',
  }, 'dieta');

  const originiCani = mk({
    'Regno Unito': 'Border collie~2|Bulldog inglese~1|Golden retriever~1|Beagle~1|Cavalier King Charles spaniel~3|Corgi gallese~2|Bull terrier~2|Yorkshire terrier~1|Setter inglese~2|Cocker spaniel inglese~2|Whippet~3',
    Germania: 'Pastore tedesco~1|Dobermann~1|Rottweiler~1|Boxer~1|Schnauzer~2|Bassotto~1|Alano~2|Weimaraner~3|Pinscher~3',
    Italia: 'Pastore maremmano~2|Bracco italiano~2|Cane corso~2|Mastino napoletano~2|Spinone italiano~3|Lagotto romagnolo~3|Volpino italiano~3|Segugio italiano~3',
    Giappone: 'Akita~1|Shiba inu~1',
    Cina: 'Carlino~1|Pechinese~2|Shar pei~2|Chow chow~2',
    Francia: 'Bulldog francese~1|Beauceron~3|Briard~3',
    Svizzera: 'San Bernardo~1|Bovaro del Bernese~2|Appenzeller~3',
    Messico: 'Chihuahua~1|Xoloitzcuintle~3',
    Canada: 'Terranova~2',
    Belgio: 'Pastore belga~2|Bovaro delle Fiandre~3',
    Russia: 'Samoiedo~2|Borzoi~3',
    'Stati Uniti': 'Malamute dell\'Alaska~2|Boston terrier~3',
    Irlanda: 'Setter irlandese~2|Lupo irlandese~2|Kerry blue terrier~3',
    Ungheria: 'Puli~3|Vizsla~3',
    Australia: 'Kelpie australiano~3|Cattle dog australiano~3',
  }, 'origine');
  const taglieCani = mk({
    Piccola: 'Chihuahua~1|Yorkshire terrier~1|Carlino~1|Pechinese~2|Bassotto~1|Cavalier King Charles spaniel~3|Volpino italiano~3|Maltese~1|Papillon~3',
    Grande: 'Pastore tedesco~1|Labrador retriever~1|Golden retriever~1|Dobermann~1|Rottweiler~1|San Bernardo~1|Terranova~2|Alano~2|Mastino napoletano~2|Cane corso~2|Levriero afgano~2|Lupo irlandese~2|Bovaro del Bernese~2|Weimaraner~3',
  }, 'taglia');
  const originiGatti = mk({
    Thailandia: 'Siamese~1',
    Iran: 'Persiano~1',
    'Stati Uniti': 'Maine Coon~1|Ragdoll~3',
    Canada: 'Sphynx~2',
    Francia: 'Certosino~3',
    Turchia: 'Angora turco~2',
    Norvegia: 'Norvegese delle foreste~2',
    Russia: 'Blu di Russia~3|Siberiano~2',
    'Isola di Man': 'Manx~3',
    'Regno Unito': 'British shorthair~2|Devon rex~3|Scottish fold~2',
    Giappone: 'Bobtail giapponese~3',
  }, 'origine');

  const estinti = [
    ['Dodo', 'Mauritius', null, 1], ['Alca impenne', 'Atlantico settentrionale', 1844, 3], ['Piccione migratore', 'America del Nord', 1914, 2],
    ['Quagga', 'Sudafrica', 1883, 3], ['Tilacino (tigre della Tasmania)', 'Australia', 1936, 2], ['Moa', 'Nuova Zelanda', null, 2],
    ['Uccello elefante', 'Madagascar', null, 3], ['Ritina di Steller', 'Mare di Bering', 1768, 3], ['Bucardo (stambecco dei Pirenei)', 'Spagna', 2000, 3],
  ].map(([name, luogo, anno, d]) => { const o = { name, luogo, d }; if (anno) o.anno = anno; return o; });

  (D.pop = D.pop || []).push({
    id: 'plusanimali', extends: 'animali',
    quiz: quizData,
    tf: tfData,
    typed: typedData,
    numbers: numbersData,
    order: orderData,
    emojis: emojiData,
    emojiText: 'Quale animale raffigura questa emoji?',
    tables: [
      {
        id: 'classi', items: classi,
        fields: {
          classe: {
            ask: 'A quale gruppo zoologico appartiene l\'animale «{name}»?',
            who: 'Quale di questi animali appartiene al gruppo «{value}»?',
            tf: 'Per la zoologia, «{name}» appartiene al gruppo «{value}».',
            odd: 'Trova l\'intruso: quale di questi animali NON appartiene al gruppo «{value}»?',
          },
        },
      },
      {
        id: 'dieta', items: dieta,
        fields: {
          dieta: {
            ask: 'Qual è il regime alimentare tipico di questo animale: «{name}»?',
            who: 'Quale di questi animali è «{value}»?',
            tf: 'Il regime alimentare di «{name}» è: {value}.',
            odd: 'Trova l\'intruso: quale di questi animali NON è «{value}»?',
          },
        },
      },
      {
        id: 'continenti', items: continenti,
        fields: {
          continente: {
            ask: 'In quale continente vive naturalmente l\'animale «{name}»?',
            who: 'Quale di questi animali vive naturalmente in {value}?',
            tf: 'Allo stato naturale «{name}» vive in {value}.',
            odd: 'Trova l\'intruso: quale di questi animali NON vive naturalmente in {value}?',
          },
        },
      },

      {
        id: 'cuccioli', items: cuccioli,
        fields: {
          genitore: {
            ask: 'Di quale animale è il cucciolo detto «{name}»?',
            who: 'Quale di questi è il nome del cucciolo di questo animale: {value}?',
            tf: '«{name}» è il nome del cucciolo di questo animale: {value}.',
          },
        },
      },
      {
        id: 'versi', items: versi,
        fields: {
          animale: {
            ask: 'Quale animale emette il verso detto «{name}»?',
            who: 'Come si chiama il verso tipico di questo animale: {value}?',
            tf: 'Il verso detto «{name}» è tipico di questo animale: {value}.',
          },
        },
      },
      {
        id: 'case', items: case_,
        fields: {
          ospite: {
            ask: 'Quale animale vive in un ricovero o dimora detto «{name}»?',
            who: 'Come si chiama il ricovero tipico di questo animale: {value}?',
            tf: 'Il ricovero detto «{name}» ospita questo animale: {value}.',
          },
        },
      },
      {
        id: 'insetti', items: insetti,
        fields: {
          ordine: {
            ask: 'A quale ordine di insetti appartiene «{name}»?',
            who: 'Quale di questi insetti appartiene all\'ordine «{value}»?',
            tf: 'L\'insetto «{name}» appartiene all\'ordine «{value}».',
            odd: 'Trova l\'intruso: quale di questi insetti NON appartiene all\'ordine «{value}»?',
          },
        },
      },
      {
        id: 'dinosauri', items: dinosauri,
        fields: {
          periodo: {
            ask: 'In quale periodo visse il dinosauro «{name}»?',
            who: 'Quale di questi dinosauri visse nel {value}?',
            tf: 'Il dinosauro «{name}» visse nel {value}.',
            odd: 'Trova l\'intruso: quale di questi dinosauri NON visse nel {value}?',
          },
        },
      },
      {
        id: 'dinodieta', items: dinoDieta,
        fields: {
          dieta: {
            tf: 'Il dinosauro «{name}» era «{value}».',
            odd: 'Trova l\'intruso: quale di questi dinosauri NON era «{value}»?',
          },
        },
      },
      {
        id: 'cani', items: originiCani,
        fields: {
          origine: {
            ask: 'Di quale Paese è originaria la razza canina «{name}»?',
            who: 'Quale di queste razze di cani è originaria di questo Paese: {value}?',
            tf: 'La razza canina «{name}» è originaria di questo Paese: {value}.',
            odd: 'Trova l\'intruso: quale di queste razze di cani NON è originaria di questo Paese: {value}?',
          },
        },
      },
      {
        id: 'taglie', items: taglieCani,
        fields: {
          taglia: {
            ask: 'Di che taglia è tipicamente la razza canina «{name}»: piccola o grande?',
            tf: 'La razza canina «{name}» è di taglia {value}.',
            odd: 'Trova l\'intruso: quale di queste razze di cani NON è di taglia {value}?',
          },
        },
      },
      {
        id: 'gatti', items: originiGatti,
        fields: {
          origine: {
            ask: 'Di quale Paese è originaria la razza di gatto «{name}»?',
            who: 'Quale di queste razze di gatti è originaria di questo Paese: {value}?',
            tf: 'La razza di gatto «{name}» è originaria di questo Paese: {value}.',
          },
        },
      },
      {
        id: 'estinti', items: estinti,
        fields: {
          luogo: {
            ask: 'In quale area viveva l\'animale estinto «{name}»?',
            who: 'Quale di questi animali estinti viveva in quest\'area: {value}?',
            tf: 'L\'animale estinto «{name}» viveva in quest\'area: {value}.',
          },
        },
        numeric: {
          anno: { ask: 'In che anno si estinse (o morì l\'ultimo esemplare noto di) «{name}»?', span: 200, tol: 10, format: 'year', duel: 'Quale di questi animali si estinse prima?', lowerWins: true, order: 'Metti in ordine di estinzione, dal primo', gap: 15 },
        },
      },
    ],
  });
})(typeof window !== 'undefined' ? window : globalThis);
