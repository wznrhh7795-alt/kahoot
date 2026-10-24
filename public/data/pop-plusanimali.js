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
  // Quiz da righe «domanda ## giusta ## sbagliata ## sbagliata ## sbagliata ## d»
  const qz = (rows) => rows.map((r) => { const p = r.split(' ## '); return { q: p[0], a: p[1], wrong: [p[2], p[3], p[4]], d: +p[5] || 2 }; });
  // Vero/falso da righe «V|F ## d ## frase ## (spiegazione)»
  const tfs = (rows) => rows.map((r) => { const p = r.split(' ## '); const x = { q: p[2], a: p[0] === 'V', d: +p[1] || 2 }; if (p[3]) x.why = p[3]; return x; });

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
    ['Cerbiatto', 'Cervo', 1], ['Capretto', 'Capra', 1], ['Leprotto', 'Lepre', 2], ['Anatroccolo', 'Anatra', 1], ['Pulcino', 'Gallina', 1],
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
    Giurassico: 'Stegosauro~1|Diplodoco~1|Brontosauro~1|Brachiosauro~2|Allosauro~2|Compsognato~3|Dilofosauro~3|Archaeopteryx~3',
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
    quiz: [],
    tf: [],
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
            who: 'Quale di questi animali ha un\'alimentazione «{value}»?',
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
