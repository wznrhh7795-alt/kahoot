// «Cultura generale» — domande in più (feste e ricorrenze, zodiaco, unità di misura, sigle, giochi, galateo, mestieri…).
// Generato da dati verificati a mano; controllo: node scripts/check-pop.js public/data/pop-pluscultura.js --sample=5
(function (root) {
  'use strict';
  const D = (root.QZ_DATA = root.QZ_DATA || {});
  (D.pop = D.pop || []).push({
 "id": "pluscultura",
 "extends": "cultura",
 "quiz": [
  {
   "q": "Quale animale è il protagonista tradizionale del pranzo del Ringraziamento americano?",
   "a": "Il tacchino",
   "wrong": [
    "L'oca",
    "L'anatra",
    "Il pollo"
   ],
   "d": 1
  },
  {
   "q": "Quale ortaggio si intaglia tradizionalmente per Halloween?",
   "a": "La zucca",
   "wrong": [
    "Il cavolo",
    "Il melone",
    "La barbabietola"
   ],
   "d": 1
  },
  {
   "q": "Quale frase si pronuncia bussando alle porte a Halloween?",
   "a": "«Dolcetto o scherzetto?»",
   "wrong": [
    "«Auguri e figli maschi!»",
    "«Chi è?»",
    "«Buona Pasqua!»"
   ],
   "d": 1
  },
  {
   "q": "Chi porta i doni ai bambini italiani nella notte tra il 5 e il 6 gennaio?",
   "a": "La Befana",
   "wrong": [
    "Babbo Natale",
    "Santa Lucia",
    "San Nicola"
   ],
   "d": 1
  },
  {
   "q": "Che cosa trovano nella calza i bambini cattivi, secondo la tradizione della Befana?",
   "a": "Il carbone",
   "wrong": [
    "Le noci",
    "Il sale",
    "Una cipolla"
   ],
   "d": 1
  },
  {
   "q": "Come si chiama il periodo di quattro settimane che precede il Natale?",
   "a": "Avvento",
   "wrong": [
    "Quaresima",
    "Pentecoste",
    "Epifania"
   ],
   "d": 1
  },
  {
   "q": "Come si chiama il periodo di quaranta giorni che precede la Pasqua?",
   "a": "Quaresima",
   "wrong": [
    "Avvento",
    "Triduo",
    "Ottava"
   ],
   "d": 1
  },
  {
   "q": "Come si chiama l'ultimo giorno di Carnevale, che precede il Mercoledì delle Ceneri?",
   "a": "Martedì grasso",
   "wrong": [
    "Giovedì grasso",
    "Lunedì dell'Angelo",
    "Sabato santo"
   ],
   "d": 2
  },
  {
   "q": "Come si chiama il lunedì dopo la Pasqua?",
   "a": "Pasquetta (Lunedì dell'Angelo)",
   "wrong": [
    "Lunedì grasso",
    "Lunedì santo",
    "Lunedì delle Palme"
   ],
   "d": 1
  },
  {
   "q": "Che cosa si mangia tradizionalmente a Capodanno in Italia per augurare ricchezza?",
   "a": "Le lenticchie",
   "wrong": [
    "La pasta al forno",
    "Il risotto",
    "Le patate"
   ],
   "d": 1
  },
  {
   "q": "Quale dolce natalizio milanese ha forma di cupola ed è ricco di uvetta e canditi?",
   "a": "Il panettone",
   "wrong": [
    "Il pandoro",
    "Il panforte",
    "Il torrone"
   ],
   "d": 1
  },
  {
   "q": "Quale dolce natalizio veronese ha forma di stella a otto punte ed è coperto di zucchero a velo?",
   "a": "Il pandoro",
   "wrong": [
    "Il panettone",
    "Gli struffoli",
    "I cavallucci"
   ],
   "d": 2
  },
  {
   "q": "Quale dolce natalizio di Siena è fatto di frutta candita, miele e spezie?",
   "a": "Il panforte",
   "wrong": [
    "Il pandoro",
    "Il torrone",
    "Il nadalin"
   ],
   "d": 2
  },
  {
   "q": "Che cosa si fa tradizionalmente sotto il vischio a Natale?",
   "a": "Ci si bacia",
   "wrong": [
    "Si balla",
    "Si prega",
    "Si brinda"
   ],
   "d": 1
  },
  {
   "q": "Come si chiama la festa ebraica delle luci, che dura otto giorni?",
   "a": "Hanukkah",
   "wrong": [
    "Pesach",
    "Yom Kippur",
    "Sukkot"
   ],
   "d": 2
  },
  {
   "q": "Come si chiama la Pasqua ebraica?",
   "a": "Pesach",
   "wrong": [
    "Hanukkah",
    "Purim",
    "Rosh Hashanah"
   ],
   "d": 2
  },
  {
   "q": "Come si chiama il mese sacro del digiuno per i musulmani?",
   "a": "Ramadan",
   "wrong": [
    "Hajj",
    "Zakat",
    "Hijra"
   ],
   "d": 1
  },
  {
   "q": "Come si chiama la festa induista delle luci?",
   "a": "Diwali",
   "wrong": [
    "Holi",
    "Vesak",
    "Navratri"
   ],
   "d": 2
  },
  {
   "q": "Come si chiama la festa indiana in cui ci si lancia addosso polveri colorate?",
   "a": "Holi",
   "wrong": [
    "Diwali",
    "Onam",
    "Eid"
   ],
   "d": 2
  },
  {
   "q": "Quale popolo antico celebrava la festa di Samhain, all'origine di Halloween?",
   "a": "I Celti",
   "wrong": [
    "Gli Etruschi",
    "I Vichinghi",
    "I Romani"
   ],
   "d": 3
  },
  {
   "q": "In quale Paese si festeggia il «Día de Muertos», con altari e teschi di zucchero?",
   "a": "Messico",
   "wrong": [
    "Spagna",
    "Perù",
    "Argentina"
   ],
   "d": 2
  },
  {
   "q": "Quale fiore si regala tradizionalmente per la Festa della Donna in Italia?",
   "a": "La mimosa",
   "wrong": [
    "La rosa",
    "Il giglio",
    "La gardenia"
   ],
   "d": 1
  },
  {
   "q": "Quale pesce si mangia tradizionalmente alla vigilia di Natale a Napoli?",
   "a": "Il capitone",
   "wrong": [
    "Il salmone",
    "La spigola",
    "Il tonno"
   ],
   "d": 2
  },
  {
   "q": "Che cosa si accende sulla torta di compleanno?",
   "a": "Le candeline",
   "wrong": [
    "Le lanterne",
    "I lumini",
    "Le torce"
   ],
   "d": 1
  },
  {
   "q": "Che cosa si fa, secondo la tradizione, prima di soffiare sulle candeline di compleanno?",
   "a": "Si esprime un desiderio",
   "wrong": [
    "Si recita una poesia",
    "Si dice una preghiera",
    "Si conta fino a dieci"
   ],
   "d": 1
  },
  {
   "q": "Che cosa si lancia tradizionalmente agli sposi all'uscita dalla chiesa?",
   "a": "Il riso",
   "wrong": [
    "Il sale",
    "I fagioli",
    "La farina"
   ],
   "d": 1
  },
  {
   "q": "Che cosa contengono le buste rosse che si regalano per il Capodanno cinese?",
   "a": "Denaro",
   "wrong": [
    "Dolci",
    "Lettere",
    "Fiori"
   ],
   "d": 3
  },
  {
   "q": "Quale dolce pasquale ha la forma di un uccello?",
   "a": "La colomba",
   "wrong": [
    "Il casatiello",
    "La pastiera",
    "La ciambella"
   ],
   "d": 1
  },
  {
   "q": "Quale dolce napoletano di Pasqua è fatto con grano cotto e ricotta?",
   "a": "La pastiera",
   "wrong": [
    "La sfogliatella",
    "Il babà",
    "Gli struffoli"
   ],
   "d": 3
  },
  {
   "q": "In quale città si corre il Palio in Piazza del Campo?",
   "a": "Siena",
   "wrong": [
    "Asti",
    "Pisa",
    "Ferrara"
   ],
   "d": 1
  },
  {
   "q": "In quale città italiana si svolge ogni anno il Festival della canzone italiana?",
   "a": "Sanremo",
   "wrong": [
    "Venezia",
    "Napoli",
    "Viareggio"
   ],
   "d": 1
  },
  {
   "q": "Quale festival del cinema assegna la Palma d'Oro?",
   "a": "Festival di Cannes",
   "wrong": [
    "Mostra di Venezia",
    "Festival di Berlino",
    "Festival di Locarno"
   ],
   "d": 2
  },
  {
   "q": "Quale festival del cinema assegna l'Orso d'Oro?",
   "a": "Festival di Berlino",
   "wrong": [
    "Festival di Cannes",
    "Mostra di Venezia",
    "Festival di Locarno"
   ],
   "d": 2
  },
  {
   "q": "Che cosa raffigura la statuetta dell'Oscar?",
   "a": "Un cavaliere con una spada",
   "wrong": [
    "Un'aquila",
    "Una stella",
    "Una maschera"
   ],
   "d": 2
  },
  {
   "q": "Quale città ospita il Carnevale più famoso del Brasile?",
   "a": "Rio de Janeiro",
   "wrong": [
    "San Paolo",
    "Brasilia",
    "Salvador"
   ],
   "d": 2
  },
  {
   "q": "In quale città spagnola si corre davanti ai tori durante la festa di San Firmino?",
   "a": "Pamplona",
   "wrong": [
    "Siviglia",
    "Valencia",
    "Madrid"
   ],
   "d": 2
  },
  {
   "q": "Che cosa si lancia durante la Tomatina, la festa di Buñol in Spagna?",
   "a": "Pomodori",
   "wrong": [
    "Arance",
    "Uova",
    "Farina"
   ],
   "d": 1
  },
  {
   "q": "Quale segno è l'ultimo dell'oroscopo occidentale?",
   "a": "Pesci",
   "wrong": [
    "Acquario",
    "Capricorno",
    "Sagittario"
   ],
   "d": 1
  },
  {
   "q": "Quale segno zodiacale è l'unico rappresentato da un oggetto?",
   "a": "Bilancia",
   "wrong": [
    "Vergine",
    "Acquario",
    "Gemelli"
   ],
   "d": 2
  },
  {
   "q": "Quale segno zodiacale è raffigurato da un arciere con il corpo di cavallo?",
   "a": "Sagittario",
   "wrong": [
    "Capricorno",
    "Scorpione",
    "Leone"
   ],
   "d": 1
  },
  {
   "q": "Quale segno zodiacale è raffigurato da un granchio?",
   "a": "Cancro",
   "wrong": [
    "Scorpione",
    "Pesci",
    "Capricorno"
   ],
   "d": 1
  },
  {
   "q": "Quale segno zodiacale è raffigurato da una capra con la coda di pesce?",
   "a": "Capricorno",
   "wrong": [
    "Ariete",
    "Toro",
    "Acquario"
   ],
   "d": 2
  },
  {
   "q": "Quale segno zodiacale è raffigurato da una fanciulla con una spiga di grano?",
   "a": "Vergine",
   "wrong": [
    "Bilancia",
    "Acquario",
    "Gemelli"
   ],
   "d": 2
  },
  {
   "q": "Quale segno zodiacale è raffigurato da un portatore d'acqua?",
   "a": "Acquario",
   "wrong": [
    "Pesci",
    "Cancro",
    "Scorpione"
   ],
   "d": 2
  },
  {
   "q": "Quale segno zodiacale ha come simbolo il «re della foresta»?",
   "a": "Leone",
   "wrong": [
    "Toro",
    "Ariete",
    "Sagittario"
   ],
   "d": 1
  },
  {
   "q": "Quale animale apre il ciclo di dodici anni dello zodiaco cinese?",
   "a": "Il topo",
   "wrong": [
    "La tigre",
    "Il drago",
    "Il bue"
   ],
   "d": 2
  },
  {
   "q": "Quale animale chiude il ciclo di dodici anni dello zodiaco cinese?",
   "a": "Il maiale",
   "wrong": [
    "Il cane",
    "Il gallo",
    "La capra"
   ],
   "d": 3
  },
  {
   "q": "Il Capodanno cinese del 2024 ha aperto l'anno di quale animale?",
   "a": "Il drago",
   "wrong": [
    "La tigre",
    "Il coniglio",
    "Il serpente"
   ],
   "d": 2
  },
  {
   "q": "Il Capodanno cinese del 2025 ha aperto l'anno di quale animale?",
   "a": "Il serpente",
   "wrong": [
    "Il drago",
    "Il cavallo",
    "Il coniglio"
   ],
   "d": 2
  },
  {
   "q": "Il Capodanno cinese del 2026 ha aperto l'anno di quale animale?",
   "a": "Il cavallo",
   "wrong": [
    "La capra",
    "La scimmia",
    "Il serpente"
   ],
   "d": 3
  },
  {
   "q": "Quale, tra gli animali dello zodiaco cinese, è l'unico creatura mitologica?",
   "a": "Il drago",
   "wrong": [
    "La tigre",
    "Il serpente",
    "Il gallo"
   ],
   "d": 2
  },
  {
   "q": "Quale colore si ottiene mescolando blu e giallo?",
   "a": "Verde",
   "wrong": [
    "Viola",
    "Arancione",
    "Marrone"
   ],
   "d": 1
  },
  {
   "q": "Quale colore si ottiene mescolando rosso e giallo?",
   "a": "Arancione",
   "wrong": [
    "Verde",
    "Viola",
    "Rosa"
   ],
   "d": 1
  },
  {
   "q": "Quale colore si ottiene mescolando rosso e blu?",
   "a": "Viola",
   "wrong": [
    "Verde",
    "Arancione",
    "Grigio"
   ],
   "d": 1
  },
  {
   "q": "Quale colore si ottiene mescolando bianco e nero?",
   "a": "Grigio",
   "wrong": [
    "Marrone",
    "Beige",
    "Azzurro"
   ],
   "d": 1
  },
  {
   "q": "Quale colore si ottiene mescolando rosso e bianco?",
   "a": "Rosa",
   "wrong": [
    "Arancione",
    "Viola",
    "Marrone"
   ],
   "d": 1
  },
  {
   "q": "Quali sono i tre colori primari nella pittura tradizionale?",
   "a": "Rosso, giallo e blu",
   "wrong": [
    "Rosso, verde e blu",
    "Giallo, verde e arancione",
    "Bianco, nero e rosso"
   ],
   "d": 2
  },
  {
   "q": "Quali sono i tre colori primari della luce (sistema RGB)?",
   "a": "Rosso, verde e blu",
   "wrong": [
    "Rosso, giallo e blu",
    "Giallo, verde e viola",
    "Arancione, verde e viola"
   ],
   "d": 2
  },
  {
   "q": "Quale colore ha la bandiera che si espone per arrendersi?",
   "a": "Bianco",
   "wrong": [
    "Rosso",
    "Giallo",
    "Nero"
   ],
   "d": 1
  },
  {
   "q": "Di che colore sono i cartelli segnaletici delle autostrade italiane?",
   "a": "Verde",
   "wrong": [
    "Blu",
    "Bianco",
    "Giallo"
   ],
   "d": 1
  },
  {
   "q": "Di che colore sono i cartelli delle strade extraurbane principali in Italia?",
   "a": "Blu",
   "wrong": [
    "Verde",
    "Bianco",
    "Marrone"
   ],
   "d": 2
  },
  {
   "q": "Che forma ha il segnale stradale di STOP?",
   "a": "Ottagonale",
   "wrong": [
    "Esagonale",
    "Circolare",
    "Triangolare"
   ],
   "d": 1
  },
  {
   "q": "Che forma hanno la maggior parte dei segnali stradali di pericolo?",
   "a": "Triangolare",
   "wrong": [
    "Circolare",
    "Quadrata",
    "Rettangolare"
   ],
   "d": 1
  },
  {
   "q": "Che cosa simboleggia una colomba con un ramoscello d'ulivo?",
   "a": "La pace",
   "wrong": [
    "La vittoria",
    "La giustizia",
    "La libertà"
   ],
   "d": 1
  },
  {
   "q": "Che cosa indica il simbolo delle tre frecce che si inseguono?",
   "a": "Il riciclo",
   "wrong": [
    "La ripetizione",
    "L'aggiornamento",
    "Il percorso"
   ],
   "d": 1
  },
  {
   "q": "Come si chiama in italiano il simbolo @ degli indirizzi e-mail?",
   "a": "Chiocciola",
   "wrong": [
    "Coccinella",
    "Farfalla",
    "Tartaruga"
   ],
   "d": 1
  },
  {
   "q": "Come si chiama in italiano il simbolo # davanti agli «hashtag»?",
   "a": "Cancelletto",
   "wrong": [
    "Asterisco",
    "Barra",
    "Graticola"
   ],
   "d": 1
  },
  {
   "q": "Come si chiama il simbolo «&»?",
   "a": "E commerciale",
   "wrong": [
    "Chiocciola",
    "Cancelletto",
    "Asterisco"
   ],
   "d": 2
  },
  {
   "q": "Quale colore, in Asia orientale, è tradizionalmente associato al lutto?",
   "a": "Il bianco",
   "wrong": [
    "Il rosso",
    "Il verde",
    "Il rosa"
   ],
   "d": 3
  },
  {
   "q": "Quale colore porta fortuna in Cina e viene usato per le feste?",
   "a": "Il rosso",
   "wrong": [
    "Il bianco",
    "Il nero",
    "Il blu"
   ],
   "d": 2
  },
  {
   "q": "Quale colore ha la bandiera della Croce Rossa Internazionale?",
   "a": "Bianca con una croce rossa",
   "wrong": [
    "Rossa con una croce bianca",
    "Bianca con una croce nera",
    "Verde con una croce bianca"
   ],
   "d": 2
  },
  {
   "q": "Quanti metri ha un chilometro?",
   "a": "1.000",
   "wrong": [
    "100",
    "10.000",
    "500"
   ],
   "d": 1
  },
  {
   "q": "Quanti grammi ha un chilogrammo?",
   "a": "1.000",
   "wrong": [
    "100",
    "10.000",
    "500"
   ],
   "d": 1
  },
  {
   "q": "Quanti centimetri ha un metro?",
   "a": "100",
   "wrong": [
    "10",
    "1.000",
    "50"
   ],
   "d": 1
  },
  {
   "q": "Quanti millilitri ha un litro?",
   "a": "1.000",
   "wrong": [
    "100",
    "10",
    "10.000"
   ],
   "d": 1
  },
  {
   "q": "Quanti metri quadrati ha un ettaro?",
   "a": "10.000",
   "wrong": [
    "1.000",
    "100",
    "100.000"
   ],
   "d": 2
  },
  {
   "q": "Quanti metri è lungo un miglio marino (miglio nautico)?",
   "a": "1.852",
   "wrong": [
    "1.609",
    "1.000",
    "2.000"
   ],
   "d": 3
  },
  {
   "q": "Circa quanto è lungo un pollice?",
   "a": "2,5 centimetri",
   "wrong": [
    "5 centimetri",
    "10 centimetri",
    "1 centimetro"
   ],
   "d": 2
  },
  {
   "q": "Circa quanto è lungo un piede inglese?",
   "a": "30 centimetri",
   "wrong": [
    "20 centimetri",
    "50 centimetri",
    "10 centimetri"
   ],
   "d": 2
  },
  {
   "q": "Qual è, circa, il peso di un litro d'acqua?",
   "a": "Un chilogrammo",
   "wrong": [
    "Un etto",
    "Mezzo chilogrammo",
    "Dieci chilogrammi"
   ],
   "d": 1
  },
  {
   "q": "A quale temperatura in gradi Celsius congela l'acqua?",
   "a": "0 °C",
   "wrong": [
    "10 °C",
    "-10 °C",
    "32 °C"
   ],
   "d": 1
  },
  {
   "q": "A quale temperatura in gradi Celsius bolle l'acqua a livello del mare?",
   "a": "100 °C",
   "wrong": [
    "50 °C",
    "80 °C",
    "212 °C"
   ],
   "d": 1
  },
  {
   "q": "A quanti gradi Fahrenheit congela l'acqua?",
   "a": "32 °F",
   "wrong": [
    "0 °F",
    "100 °F",
    "212 °F"
   ],
   "d": 3
  },
  {
   "q": "Quanti gradi misura la somma degli angoli interni di un triangolo?",
   "a": "180",
   "wrong": [
    "90",
    "360",
    "270"
   ],
   "d": 2
  },
  {
   "q": "Quanti gradi misura un angolo retto?",
   "a": "90",
   "wrong": [
    "45",
    "180",
    "60"
   ],
   "d": 2
  },
  {
   "q": "Quale unità di misura è usata dalle navi per la velocità?",
   "a": "Il nodo",
   "wrong": [
    "Il miglio orario",
    "Il metro al secondo",
    "Il decibel"
   ],
   "d": 1
  },
  {
   "q": "Quanti bit ci sono in un byte?",
   "a": "8",
   "wrong": [
    "4",
    "16",
    "10"
   ],
   "d": 3
  },
  {
   "q": "In quale gioco da tavolo bisogna scoprire l'assassino, l'arma e il luogo del delitto?",
   "a": "Cluedo",
   "wrong": [
    "Risiko",
    "Monopoly",
    "Scarabeo"
   ],
   "d": 1
  },
  {
   "q": "Quale gioco da tavolo prevede di conquistare territori con le armate?",
   "a": "Risiko",
   "wrong": [
    "Cluedo",
    "Monopoly",
    "Forza 4"
   ],
   "d": 1
  },
  {
   "q": "Qual è la casella più costosa del Monopoly italiano?",
   "a": "Parco della Vittoria",
   "wrong": [
    "Largo Augusto",
    "Via Roma",
    "Corso Impero"
   ],
   "d": 2
  },
  {
   "q": "Quale gioco da tavolo ha le carte «Imprevisti» e «Probabilità»?",
   "a": "Monopoly",
   "wrong": [
    "Cluedo",
    "Risiko",
    "Scarabeo"
   ],
   "d": 1
  },
  {
   "q": "Come si chiama il gioco in cui si cerca di affondare le navi dell'avversario?",
   "a": "Battaglia navale",
   "wrong": [
    "Dama",
    "Forza 4",
    "Tris"
   ],
   "d": 1
  },
  {
   "q": "Quale gioco usa una griglia di 3 per 3 caselle e i simboli X e O?",
   "a": "Tris",
   "wrong": [
    "Dama",
    "Forza 4",
    "Battaglia navale"
   ],
   "d": 1
  },
  {
   "q": "Quale gioco da tavolo consiste nel formare parole con tessere-lettera su una griglia?",
   "a": "Scarabeo",
   "wrong": [
    "Cluedo",
    "Risiko",
    "Forza 4"
   ],
   "d": 1
  },
  {
   "q": "Quale pezzo degli scacchi si muove ad «L»?",
   "a": "Il cavallo",
   "wrong": [
    "L'alfiere",
    "La torre",
    "La regina"
   ],
   "d": 1
  },
  {
   "q": "Quale pezzo degli scacchi si muove solo in diagonale?",
   "a": "L'alfiere",
   "wrong": [
    "La torre",
    "Il cavallo",
    "Il pedone"
   ],
   "d": 1
  },
  {
   "q": "Come si chiama la mossa con cui re e torre si scambiano di posto negli scacchi?",
   "a": "Arrocco",
   "wrong": [
    "Promozione",
    "Scacco",
    "Cattura"
   ],
   "d": 2
  },
  {
   "q": "Come si chiama la situazione in cui il re è sotto attacco e non ha scampo?",
   "a": "Scacco matto",
   "wrong": [
    "Stallo",
    "Arrocco",
    "Patta"
   ],
   "d": 1
  },
  {
   "q": "Come si chiama, negli scacchi, la posizione in cui non si può muovere ma il re non è sotto scacco?",
   "a": "Stallo",
   "wrong": [
    "Scacco matto",
    "Arrocco",
    "Promozione"
   ],
   "d": 2
  },
  {
   "q": "Quali sono i semi delle carte napoletane?",
   "a": "Denari, coppe, spade e bastoni",
   "wrong": [
    "Cuori, quadri, fiori e picche",
    "Denari, coppe, spade e fiori",
    "Oro, coppe, picche e bastoni"
   ],
   "d": 1
  },
  {
   "q": "Quali sono i semi delle carte francesi?",
   "a": "Cuori, quadri, fiori e picche",
   "wrong": [
    "Denari, coppe, spade e bastoni",
    "Cuori, coppe, fiori e spade",
    "Cuori, quadri, denari e picche"
   ],
   "d": 1
  },
  {
   "q": "Nel gioco della Scopa, che cosa è il «settebello»?",
   "a": "Il sette di denari",
   "wrong": [
    "Il sette di coppe",
    "Il re di denari",
    "L'asso di spade"
   ],
   "d": 1
  },
  {
   "q": "A briscola, quale carta ha il valore più alto?",
   "a": "L'asso",
   "wrong": [
    "Il re",
    "Il tre",
    "Il sette"
   ],
   "d": 1
  },
  {
   "q": "In quale gioco di carte si dice «busso», «striscio» e «volo»?",
   "a": "Tressette",
   "wrong": [
    "Scopa",
    "Briscola",
    "Scala 40"
   ],
   "d": 2
  },
  {
   "q": "In quale gioco di carte esistono le combinazioni «scala reale», «colore» e «full»?",
   "a": "Poker",
   "wrong": [
    "Briscola",
    "Scopa",
    "Tressette"
   ],
   "d": 1
  },
  {
   "q": "Nel Blackjack, qual è il punteggio massimo da raggiungere senza sballare?",
   "a": "21",
   "wrong": [
    "18",
    "25",
    "31"
   ],
   "d": 1
  },
  {
   "q": "Quanti numeri deve completare una cartella per fare «tombola»?",
   "a": "Tutti i 15 numeri",
   "wrong": [
    "Una riga",
    "Cinque numeri",
    "Tutti i 90 numeri"
   ],
   "d": 2
  },
  {
   "q": "Come si chiama il libro che associa sogni e numeri nella tombola napoletana?",
   "a": "Smorfia",
   "wrong": [
    "Almanacco",
    "Lunario",
    "Bussola"
   ],
   "d": 2
  },
  {
   "q": "Nel gioco della morra cinese (sasso, carta, forbici), che cosa batte la carta?",
   "a": "Le forbici",
   "wrong": [
    "Il sasso",
    "Il fuoco",
    "Niente"
   ],
   "d": 1
  },
  {
   "q": "Come si chiama il gioco d'azzardo con una pallina che gira su una ruota numerata?",
   "a": "Roulette",
   "wrong": [
    "Tombola",
    "Baccarat",
    "Craps"
   ],
   "d": 1
  },
  {
   "q": "Di che colore è lo zero sulla roulette europea?",
   "a": "Verde",
   "wrong": [
    "Rosso",
    "Nero",
    "Blu"
   ],
   "d": 2
  },
  {
   "q": "Quale gioco di strategia orientale si gioca con pietre bianche e nere su una griglia di 19 per 19 linee?",
   "a": "Go",
   "wrong": [
    "Shogi",
    "Mahjong",
    "Dama"
   ],
   "d": 3
  },
  {
   "q": "Quanti pezzi ha ciascun giocatore all'inizio di una partita a scacchi?",
   "a": "16",
   "wrong": [
    "12",
    "20",
    "32"
   ],
   "d": 1
  },
  {
   "q": "Quanti pezzi ha ciascun giocatore all'inizio di una partita a dama italiana?",
   "a": "12",
   "wrong": [
    "16",
    "8",
    "20"
   ],
   "d": 1
  },
  {
   "q": "Quale somma danno sempre le facce opposte di un dado a sei facce?",
   "a": "7",
   "wrong": [
    "6",
    "8",
    "9"
   ],
   "d": 2
  },
  {
   "q": "Quanti punti ha la faccia opposta al 2 su un dado a sei facce?",
   "a": "5",
   "wrong": [
    "4",
    "3",
    "6"
   ],
   "d": 2
  },
  {
   "q": "Quante pedine consecutive bisogna allineare per vincere a Forza 4?",
   "a": "4",
   "wrong": [
    "3",
    "5",
    "6"
   ],
   "d": 1
  },
  {
   "q": "Quale Paese ha inventato il gioco del Monopoly nella sua forma commerciale?",
   "a": "Stati Uniti",
   "wrong": [
    "Regno Unito",
    "Francia",
    "Italia"
   ],
   "d": 2
  },
  {
   "q": "Da quale lato del piatto si posa la forchetta nell'apparecchiatura classica?",
   "a": "A sinistra",
   "wrong": [
    "A destra",
    "Sopra il piatto",
    "Sotto il piatto"
   ],
   "d": 1
  },
  {
   "q": "Dove si posa il coltello nell'apparecchiatura classica?",
   "a": "A destra del piatto",
   "wrong": [
    "A sinistra del piatto",
    "Sopra il piatto",
    "Sul tovagliolo"
   ],
   "d": 2
  },
  {
   "q": "Dove si mette il tovagliolo quando ci si siede a tavola?",
   "a": "Sulle ginocchia",
   "wrong": [
    "Nel colletto",
    "Sul bracciolo della sedia",
    "Accanto al piatto, piegato"
   ],
   "d": 1
  },
  {
   "q": "Come si posano le posate nel piatto per indicare che si è finito di mangiare?",
   "a": "Parallele, una accanto all'altra",
   "wrong": [
    "Incrociate a X",
    "Appoggiate sul bordo del tavolo",
    "Infilate nel tovagliolo"
   ],
   "d": 2
  },
  {
   "q": "Che cosa significa la sigla «R.S.V.P.» in un invito?",
   "a": "Rispondete, per favore",
   "wrong": [
    "Regalo senza valore previsto",
    "Ricordatevi di venire puntuali",
    "Riservato a soli ventenni"
   ],
   "d": 2
  },
  {
   "q": "Come si tiene un calice di vino bianco per non scaldarlo con la mano?",
   "a": "Per lo stelo",
   "wrong": [
    "Per la coppa",
    "Con due mani",
    "Per la base larga"
   ],
   "d": 2
  },
  {
   "q": "Come ci si rivolge a una persona sconosciuta in italiano formale?",
   "a": "Dando del «Lei»",
   "wrong": [
    "Dando del «tu»",
    "Dando del «noi»",
    "Dando del «loro»"
   ],
   "d": 1
  },
  {
   "q": "Che bicchiere si usa tradizionalmente per lo spumante?",
   "a": "Il flûte",
   "wrong": [
    "Il tumbler",
    "Il balloon",
    "Il boccale"
   ],
   "d": 2
  },
  {
   "q": "Come si chiama il bicchiere basso e largo usato per il whisky?",
   "a": "Tumbler",
   "wrong": [
    "Flûte",
    "Calice",
    "Boccale"
   ],
   "d": 2
  },
  {
   "q": "Come si chiama il tessuto con cui si fanno i jeans?",
   "a": "Denim",
   "wrong": [
    "Velluto",
    "Lino",
    "Tweed"
   ],
   "d": 1
  },
  {
   "q": "Da quale città italiana deriva, secondo l'etimologia più accreditata, il nome «jeans»?",
   "a": "Genova",
   "wrong": [
    "Milano",
    "Torino",
    "Livorno"
   ],
   "d": 3
  },
  {
   "q": "Il kilt è un indumento tradizionale di quale Paese?",
   "a": "Scozia",
   "wrong": [
    "Irlanda",
    "Galles",
    "Inghilterra"
   ],
   "d": 1
  },
  {
   "q": "Di quale Paese è tipico il sari, indossato dalle donne?",
   "a": "India",
   "wrong": [
    "Giappone",
    "Thailandia",
    "Egitto"
   ],
   "d": 1
  },
  {
   "q": "Come si chiama l'abito tradizionale giapponese chiuso da una cintura detta obi?",
   "a": "Kimono",
   "wrong": [
    "Sari",
    "Hanbok",
    "Poncho"
   ],
   "d": 1
  },
  {
   "q": "Quale cappello è tipico del Messico?",
   "a": "Il sombrero",
   "wrong": [
    "Il basco",
    "Il fez",
    "Il cilindro"
   ],
   "d": 1
  },
  {
   "q": "Da quale animale si ricava la lana cashmere?",
   "a": "Dalla capra",
   "wrong": [
    "Dalla pecora",
    "Dall'alpaca",
    "Dal coniglio"
   ],
   "d": 2
  },
  {
   "q": "Quale stilista ha reso celebre il «tubino nero» negli anni Venti?",
   "a": "Coco Chanel",
   "wrong": [
    "Christian Dior",
    "Giorgio Armani",
    "Valentino"
   ],
   "d": 2
  },
  {
   "q": "Quale marca sportiva ha come logo tre strisce?",
   "a": "Adidas",
   "wrong": [
    "Nike",
    "Puma",
    "Reebok"
   ],
   "d": 1
  },
  {
   "q": "Quale marca di polo ha come simbolo un coccodrillo?",
   "a": "Lacoste",
   "wrong": [
    "Fred Perry",
    "Ralph Lauren",
    "Tommy Hilfiger"
   ],
   "d": 1
  },
  {
   "q": "Quale marca di moda italiana ha come logo la testa di Medusa?",
   "a": "Versace",
   "wrong": [
    "Armani",
    "Prada",
    "Gucci"
   ],
   "d": 1
  },
  {
   "q": "Quale marca di moda ha come logo due C intrecciate?",
   "a": "Chanel",
   "wrong": [
    "Gucci",
    "Fendi",
    "Dior"
   ],
   "d": 1
  },
  {
   "q": "Come si chiama il capo leggero che si annoda in vita o sul petto, tipico dei Paesi tropicali?",
   "a": "Pareo",
   "wrong": [
    "Poncho",
    "Caftano",
    "Kimono"
   ],
   "d": 2
  },
  {
   "q": "Che cosa significa la lettera «S» nelle taglie dei vestiti?",
   "a": "Small (piccola)",
   "wrong": [
    "Standard",
    "Super",
    "Slim"
   ],
   "d": 1
  },
  {
   "q": "Che cosa si porta tradizionalmente con lo smoking?",
   "a": "Il papillon",
   "wrong": [
    "La sciarpa",
    "Il gilet di lana",
    "Il foulard"
   ],
   "d": 1
  },
  {
   "q": "Come si chiama chi guida un treno?",
   "a": "Macchinista",
   "wrong": [
    "Controllore",
    "Capostazione",
    "Bigliettaio"
   ],
   "d": 1
  },
  {
   "q": "Come si chiama chi lavora il ferro con il fuoco e l'incudine?",
   "a": "Fabbro",
   "wrong": [
    "Orafo",
    "Falegname",
    "Sarto"
   ],
   "d": 1
  },
  {
   "q": "Come si chiama chi lavora l'oro per creare gioielli?",
   "a": "Orafo",
   "wrong": [
    "Fabbro",
    "Vasaio",
    "Sarto"
   ],
   "d": 2
  },
  {
   "q": "Come si chiama chi ripara scarpe e calzature?",
   "a": "Calzolaio",
   "wrong": [
    "Sarto",
    "Pellicciaio",
    "Cappellaio"
   ],
   "d": 1
  },
  {
   "q": "Come si chiama chi ferra i cavalli?",
   "a": "Maniscalco",
   "wrong": [
    "Fantino",
    "Mandriano",
    "Bovaro"
   ],
   "d": 3
  },
  {
   "q": "Come si chiama chi vende fiori?",
   "a": "Fioraio",
   "wrong": [
    "Giardiniere",
    "Erborista",
    "Fruttivendolo"
   ],
   "d": 1
  },
  {
   "q": "Come si chiama chi vende il pesce?",
   "a": "Pescivendolo",
   "wrong": [
    "Pescatore",
    "Macellaio",
    "Salumiere"
   ],
   "d": 1
  },
  {
   "q": "Come si chiama chi tinteggia le pareti di casa?",
   "a": "Imbianchino",
   "wrong": [
    "Tappezziere",
    "Carpentiere",
    "Vetraio"
   ],
   "d": 1
  },
  {
   "q": "Come si chiama l'esperto che consiglia i vini al ristorante?",
   "a": "Sommelier",
   "wrong": [
    "Barman",
    "Cameriere",
    "Maître"
   ],
   "d": 1
  },
  {
   "q": "Come si chiama chi nel circo ammaestra le belve?",
   "a": "Domatore",
   "wrong": [
    "Giocoliere",
    "Equilibrista",
    "Mago"
   ],
   "d": 1
  },
  {
   "q": "Quale professionista redige gli atti di compravendita di una casa?",
   "a": "Il notaio",
   "wrong": [
    "Il geometra",
    "Il commercialista",
    "L'agente immobiliare"
   ],
   "d": 2
  },
  {
   "q": "Come si chiama chi guida la gru in un cantiere?",
   "a": "Gruista",
   "wrong": [
    "Carpentiere",
    "Palista",
    "Ponteggiatore"
   ],
   "d": 3
  },
  {
   "q": "Come si chiama chi lavora l'argilla al tornio?",
   "a": "Vasaio",
   "wrong": [
    "Fabbro",
    "Scultore",
    "Tornitore di legno"
   ],
   "d": 2
  },
  {
   "q": "Come si chiama chi taglia e cuce abiti su misura?",
   "a": "Sarto",
   "wrong": [
    "Calzolaio",
    "Modellista",
    "Cucitore di guanti"
   ],
   "d": 2
  },
  {
   "q": "Come si chiama chi prepara e vende il gelato?",
   "a": "Gelataio",
   "wrong": [
    "Pasticciere",
    "Pizzaiolo",
    "Panettiere"
   ],
   "d": 1
  },
  {
   "q": "Come si chiama chi spegne gli incendi?",
   "a": "Vigile del fuoco",
   "wrong": [
    "Poliziotto",
    "Guardia giurata",
    "Netturbino"
   ],
   "d": 1
  },
  {
   "q": "In quale anno l'euro è entrato in circolazione come moneta fisica in Italia?",
   "a": "2002",
   "wrong": [
    "1999",
    "2000",
    "2001"
   ],
   "d": 2
  },
  {
   "q": "Come si chiamano i centesimi della sterlina?",
   "a": "Penny",
   "wrong": [
    "Cent",
    "Centavo",
    "Centesimi"
   ],
   "d": 2
  },
  {
   "q": "Quale moneta romana era d'argento?",
   "a": "Il denario",
   "wrong": [
    "L'aureo",
    "L'asse",
    "Il solido"
   ],
   "d": 2
  },
  {
   "q": "Quale moneta romana era d'oro?",
   "a": "L'aureo",
   "wrong": [
    "Il denario",
    "L'asse",
    "Il sesterzio"
   ],
   "d": 3
  },
  {
   "q": "Quale città italiana ha dato il nome al fiorino, moneta d'oro medievale?",
   "a": "Firenze",
   "wrong": [
    "Venezia",
    "Genova",
    "Milano"
   ],
   "d": 2
  },
  {
   "q": "Quanti tipi di monete ha l'euro?",
   "a": "8",
   "wrong": [
    "6",
    "10",
    "12"
   ],
   "d": 2
  },
  {
   "q": "Come si chiamava la moneta italiana prima dell'euro?",
   "a": "Lira",
   "wrong": [
    "Scudo",
    "Ducato",
    "Franco"
   ],
   "d": 1
  },
  {
   "q": "Qual è il numero considerato sfortunato nei Paesi anglosassoni?",
   "a": "13",
   "wrong": [
    "7",
    "17",
    "9"
   ],
   "d": 1
  },
  {
   "q": "In Italia, quale numero è tradizionalmente considerato sfortunato?",
   "a": "17",
   "wrong": [
    "7",
    "3",
    "21"
   ],
   "d": 1
  },
  {
   "q": "In Cina, quale numero è considerato molto fortunato?",
   "a": "8",
   "wrong": [
    "4",
    "7",
    "13"
   ],
   "d": 2
  },
  {
   "q": "In Cina e in Giappone, quale numero è considerato sfortunato perché il suo suono ricorda la parola «morte»?",
   "a": "4",
   "wrong": [
    "8",
    "6",
    "9"
   ],
   "d": 3
  },
  {
   "q": "Quanti anni dura un lustro?",
   "a": "5",
   "wrong": [
    "4",
    "10",
    "3"
   ],
   "d": 2
  },
  {
   "q": "Quante unità formano una dozzina?",
   "a": "12",
   "wrong": [
    "10",
    "6",
    "24"
   ],
   "d": 1
  },
  {
   "q": "A quanti pezzi corrisponde una «grossa», unità usata nel commercio?",
   "a": "144",
   "wrong": [
    "100",
    "120",
    "1.000"
   ],
   "d": 3
  },
  {
   "q": "Quanti chili ha un quintale?",
   "a": "100",
   "wrong": [
    "10",
    "50",
    "1.000"
   ],
   "d": 1
  },
  {
   "q": "Quanti grammi ha un etto?",
   "a": "100",
   "wrong": [
    "10",
    "1.000",
    "50"
   ],
   "d": 1
  },
  {
   "q": "Quanti zeri ha un milione?",
   "a": "6",
   "wrong": [
    "3",
    "9",
    "5"
   ],
   "d": 1
  },
  {
   "q": "Quanti zeri ha un miliardo?",
   "a": "9",
   "wrong": [
    "6",
    "12",
    "10"
   ],
   "d": 2
  },
  {
   "q": "Qual è il più piccolo numero primo?",
   "a": "2",
   "wrong": [
    "1",
    "3",
    "0"
   ],
   "d": 2
  },
  {
   "q": "Quale numero compare sulla palla nera del biliardo all'americana?",
   "a": "8",
   "wrong": [
    "1",
    "9",
    "15"
   ],
   "d": 2
  },
  {
   "q": "Qual è il numero più alto che compare su un dado normale?",
   "a": "6",
   "wrong": [
    "5",
    "8",
    "12"
   ],
   "d": 1
  },
  {
   "q": "Quante carte ha un mazzo di tarocchi?",
   "a": "78",
   "wrong": [
    "52",
    "40",
    "90"
   ],
   "d": 3
  },
  {
   "q": "Da quanti arcani maggiori sono formati i tarocchi?",
   "a": "22",
   "wrong": [
    "21",
    "36",
    "56"
   ],
   "d": 3
  },
  {
   "q": "Qual è lo Stato più piccolo del mondo?",
   "a": "Città del Vaticano",
   "wrong": [
    "Monaco",
    "San Marino",
    "Liechtenstein"
   ],
   "d": 1
  },
  {
   "q": "Qual è l'unico mammifero capace di volare?",
   "a": "Il pipistrello",
   "wrong": [
    "Lo scoiattolo volante",
    "Il colibrì",
    "Il pesce volante"
   ],
   "d": 1
  },
  {
   "q": "Qual è il libro più venduto della storia?",
   "a": "La Bibbia",
   "wrong": [
    "Il Piccolo Principe",
    "Don Chisciotte",
    "Il Signore degli Anelli"
   ],
   "d": 1
  },
  {
   "q": "Qual è l'animale terrestre più veloce?",
   "a": "Il ghepardo",
   "wrong": [
    "Il leone",
    "L'antilope",
    "Lo struzzo"
   ],
   "d": 1
  },
  {
   "q": "Qual è l'animale più alto del mondo?",
   "a": "La giraffa",
   "wrong": [
    "L'elefante",
    "Lo struzzo",
    "Il cammello"
   ],
   "d": 1
  },
  {
   "q": "Come si chiama l'alfabeto fatto di punti e linee usato per la telegrafia?",
   "a": "Alfabeto Morse",
   "wrong": [
    "Alfabeto Braille",
    "Alfabeto runico",
    "Alfabeto cirillico"
   ],
   "d": 2
  },
  {
   "q": "Come si chiama il sistema di scrittura in rilievo usato dai ciechi?",
   "a": "Braille",
   "wrong": [
    "Morse",
    "Esperanto",
    "Stenografia"
   ],
   "d": 1
  },
  {
   "q": "Come si chiama la lingua artificiale creata da Ludwik Zamenhof?",
   "a": "Esperanto",
   "wrong": [
    "Volapük",
    "Interlingua",
    "Klingon"
   ],
   "d": 2
  },
  {
   "q": "Quale città ha dato il nome al denim, tessuto dei jeans?",
   "a": "Nîmes",
   "wrong": [
    "Lione",
    "Marsiglia",
    "Tolosa"
   ],
   "d": 2
  },
  {
   "q": "Quale città italiana è nota per la sua Torre pendente?",
   "a": "Pisa",
   "wrong": [
    "Bologna",
    "Siena",
    "Firenze"
   ],
   "d": 1
  },
  {
   "q": "Come si chiama il segnale di soccorso internazionale in codice Morse?",
   "a": "SOS",
   "wrong": [
    "MAYDAY",
    "CQD",
    "HELP"
   ],
   "d": 2
  },
  {
   "q": "Da quanti punti in rilievo è formata ogni cella dell'alfabeto Braille?",
   "a": "Sei",
   "wrong": [
    "Quattro",
    "Otto",
    "Dieci"
   ],
   "d": 3
  }
 ],
 "tf": [
  {
   "q": "La Befana arriva in Italia la notte tra il 5 e il 6 gennaio.",
   "a": true,
   "d": 1
  },
  {
   "q": "Il Giorno del Ringraziamento americano si festeggia a dicembre.",
   "a": false,
   "d": 2,
   "why": "Cade il quarto giovedì di novembre."
  },
  {
   "q": "Il Carnevale precede la Quaresima.",
   "a": true,
   "d": 1
  },
  {
   "q": "La Pasqua cade ogni anno nella stessa data.",
   "a": false,
   "d": 1,
   "why": "È una festa mobile: la data cambia ogni anno."
  },
  {
   "q": "In Spagna, a mezzanotte di Capodanno, si mangiano dodici acini d'uva.",
   "a": true,
   "d": 3
  },
  {
   "q": "Il «Mardi Gras» francese corrisponde al Martedì grasso.",
   "a": true,
   "d": 2
  },
  {
   "q": "Secondo la tradizione, Babbo Natale vive al Polo Nord.",
   "a": true,
   "d": 1
  },
  {
   "q": "San Nicola è all'origine della figura di Babbo Natale.",
   "a": true,
   "d": 2
  },
  {
   "q": "Il panettone è un dolce tipico della Sicilia.",
   "a": false,
   "d": 1,
   "why": "È originario di Milano."
  },
  {
   "q": "La pastiera è un dolce tipico di Napoli.",
   "a": true,
   "d": 1
  },
  {
   "q": "Il torrone è un dolce tradizionalmente associato a Cremona.",
   "a": true,
   "d": 2
  },
  {
   "q": "Gli struffoli sono un dolce natalizio napoletano.",
   "a": true,
   "d": 2
  },
  {
   "q": "Il Giubileo ordinario ricorre ogni 25 anni.",
   "a": true,
   "d": 2
  },
  {
   "q": "L'ultimo Giubileo ordinario si è celebrato nel 2025.",
   "a": true,
   "d": 2
  },
  {
   "q": "Il Natale cade il 25 dicembre sia per i cattolici sia per tutte le Chiese ortodosse.",
   "a": false,
   "d": 1,
   "why": "Alcune Chiese ortodosse lo celebrano il 7 gennaio."
  },
  {
   "q": "La mimosa è il fiore simbolo della Festa della Donna in Italia.",
   "a": true,
   "d": 1
  },
  {
   "q": "L'oroscopo cinese si ripete in cicli di 12 anni.",
   "a": true,
   "d": 1
  },
  {
   "q": "Nell'oroscopo vietnamita il gatto prende il posto del coniglio.",
   "a": true,
   "d": 2
  },
  {
   "q": "Il segno zodiacale della Vergine è rappresentato da una bilancia.",
   "a": false,
   "d": 1,
   "why": "Il simbolo della Vergine è una fanciulla; la bilancia è il segno della Bilancia."
  },
  {
   "q": "Il verde si ottiene mescolando giallo e blu.",
   "a": true,
   "d": 1
  },
  {
   "q": "Il bianco è la somma di tutti i colori della luce visibile.",
   "a": true,
   "d": 2
  },
  {
   "q": "Il nero è l'assenza di luce.",
   "a": true,
   "d": 2
  },
  {
   "q": "Il rosa si ottiene mescolando rosso e bianco.",
   "a": true,
   "d": 1
  },
  {
   "q": "In Italia i taxi sono gialli.",
   "a": false,
   "d": 1,
   "why": "Sono per lo più bianchi; i taxi gialli sono tipici di New York."
  },
  {
   "q": "Gli autobus a due piani di Londra sono tradizionalmente rossi.",
   "a": true,
   "d": 1
  },
  {
   "q": "Una bandiera bianca sventolata indica la resa.",
   "a": true,
   "d": 1
  },
  {
   "q": "In Cina il bianco è tradizionalmente il colore del lutto.",
   "a": true,
   "d": 3
  },
  {
   "q": "Il cartellino giallo nel calcio indica un'espulsione.",
   "a": false,
   "d": 1,
   "why": "Il giallo è un'ammonizione; l'espulsione è il cartellino rosso."
  },
  {
   "q": "Il simbolo della Croce Rossa è una croce rossa su fondo bianco.",
   "a": true,
   "d": 2
  },
  {
   "q": "La bandiera della Svizzera è quadrata.",
   "a": true,
   "d": 2
  },
  {
   "q": "Un miglio nautico equivale a 1.852 metri.",
   "a": true,
   "d": 2
  },
  {
   "q": "Un litro d'acqua pesa circa un chilogrammo.",
   "a": true,
   "d": 1
  },
  {
   "q": "Il nodo è un'unità di misura della velocità usata in navigazione.",
   "a": true,
   "d": 2
  },
  {
   "q": "Un ettaro corrisponde a 10.000 metri quadrati.",
   "a": true,
   "d": 2
  },
  {
   "q": "Un gigabyte è più grande di un megabyte.",
   "a": true,
   "d": 1
  },
  {
   "q": "Lo zero della scala Kelvin corrisponde allo zero assoluto.",
   "a": true,
   "d": 3
  },
  {
   "q": "Sulla cima di un'alta montagna l'acqua bolle a 100 °C come al livello del mare.",
   "a": false,
   "d": 3,
   "why": "In quota la pressione è minore e l'acqua bolle a una temperatura più bassa."
  },
  {
   "q": "Una libbra pesa circa 100 grammi.",
   "a": false,
   "d": 3,
   "why": "Una libbra pesa circa 454 grammi."
  },
  {
   "q": "Un pollice è lungo circa 2,5 centimetri.",
   "a": true,
   "d": 2
  },
  {
   "q": "Negli Stati Uniti la temperatura si misura comunemente in gradi Fahrenheit.",
   "a": true,
   "d": 1
  },
  {
   "q": "L'acqua congela a 32 gradi Fahrenheit.",
   "a": true,
   "d": 3
  },
  {
   "q": "Un piede inglese è più corto di un metro.",
   "a": true,
   "d": 1
  },
  {
   "q": "L'anno luce è un'unità di misura del tempo.",
   "a": false,
   "d": 1,
   "why": "È un'unità di lunghezza: la distanza percorsa dalla luce in un anno."
  },
  {
   "q": "Gli spaghetti si tagliano con il coltello.",
   "a": false,
   "d": 1,
   "why": "Il galateo vuole che si arrotolino sulla forchetta."
  },
  {
   "q": "Il tovagliolo si appoggia sulle ginocchia.",
   "a": true,
   "d": 1
  },
  {
   "q": "Nell'apparecchiatura classica la forchetta si posa a sinistra del piatto.",
   "a": true,
   "d": 1
  },
  {
   "q": "Nell'apparecchiatura classica il coltello si posa a destra, con la lama rivolta verso il piatto.",
   "a": true,
   "d": 2
  },
  {
   "q": "Secondo il galateo i gomiti si tengono sul tavolo mentre si mangia.",
   "a": false,
   "d": 1,
   "why": "Il galateo li vuole lontani dal tavolo."
  },
  {
   "q": "A cena è buona educazione tenere il telefono lontano dalla tavola.",
   "a": true,
   "d": 1
  },
  {
   "q": "Quando si brinda è buona educazione guardare negli occhi chi sta di fronte.",
   "a": true,
   "d": 2
  },
  {
   "q": "Secondo il galateo il pane si spezza con le mani, senza tagliarlo con il coltello.",
   "a": true,
   "d": 2
  },
  {
   "q": "Una richiesta «R.S.V.P.» su un invito chiede di confermare la presenza.",
   "a": true,
   "d": 2
  },
  {
   "q": "Come ospite a un matrimonio è consigliato vestirsi di bianco.",
   "a": false,
   "d": 1,
   "why": "Il bianco è tradizionalmente riservato alla sposa."
  },
  {
   "q": "In Giappone la mancia al ristorante di solito non si usa.",
   "a": true,
   "d": 2
  },
  {
   "q": "Secondo il galateo, per gli spaghetti si usa anche il cucchiaio.",
   "a": false,
   "d": 2,
   "why": "Si usa solo la forchetta."
  },
  {
   "q": "Il kilt è un indumento tradizionale scozzese.",
   "a": true,
   "d": 1
  },
  {
   "q": "Il sari è un indumento tradizionale giapponese.",
   "a": false,
   "d": 1,
   "why": "È indiano; quello giapponese è il kimono."
  },
  {
   "q": "Il denim è il tessuto dei jeans.",
   "a": true,
   "d": 1
  },
  {
   "q": "La lana cashmere si ricava dalle capre.",
   "a": true,
   "d": 2
  },
  {
   "q": "Il trench nasce come indumento militare.",
   "a": true,
   "d": 3
  },
  {
   "q": "Il bikini prende il nome da un atollo del Pacifico.",
   "a": true,
   "d": 3
  },
  {
   "q": "Il papillon si porta tradizionalmente con lo smoking.",
   "a": true,
   "d": 1
  },
  {
   "q": "Il poncho è un indumento tipico del Sud America.",
   "a": true,
   "d": 2
  },
  {
   "q": "I jeans sono stati brevettati nel 1873 da Levi Strauss e Jacob Davis.",
   "a": true,
   "d": 3
  },
  {
   "q": "La seta si ricava dal baco da seta.",
   "a": true,
   "d": 1
  },
  {
   "q": "Il lino è una fibra che si ricava da una pianta.",
   "a": true,
   "d": 2
  },
  {
   "q": "In Italia il venerdì 17 è considerato un giorno sfortunato.",
   "a": true,
   "d": 1
  },
  {
   "q": "Nei Paesi anglosassoni il venerdì 13 è considerato un giorno sfortunato.",
   "a": true,
   "d": 1
  },
  {
   "q": "In Cina il numero 8 è considerato di buon augurio.",
   "a": true,
   "d": 2
  },
  {
   "q": "In Cina e in Giappone il numero 4 è considerato sfortunato.",
   "a": true,
   "d": 3
  },
  {
   "q": "Il quadrifoglio, secondo la superstizione, porta fortuna.",
   "a": true,
   "d": 1
  },
  {
   "q": "Secondo la superstizione, passare sotto una scala porta sfortuna.",
   "a": true,
   "d": 1
  },
  {
   "q": "Secondo la superstizione, rompere uno specchio porta sette anni di sfortuna.",
   "a": true,
   "d": 1
  },
  {
   "q": "Un gatto nero che attraversa la strada porta sfortuna in tutto il mondo.",
   "a": false,
   "d": 2,
   "why": "In Gran Bretagna, per esempio, un gatto nero porta fortuna."
  },
  {
   "q": "Secondo la superstizione, versare il sale porta sfortuna.",
   "a": true,
   "d": 1
  },
  {
   "q": "Il ferro di cavallo è considerato un portafortuna.",
   "a": true,
   "d": 1
  },
  {
   "q": "All'augurio «in bocca al lupo!» si risponde «crepi!».",
   "a": true,
   "d": 1
  },
  {
   "q": "All'augurio «in bocca al lupo!» la risposta tradizionale è «grazie».",
   "a": false,
   "d": 1,
   "why": "Per scaramanzia si risponde «crepi!»."
  },
  {
   "q": "Il vasaio lavora l'argilla.",
   "a": true,
   "d": 1
  },
  {
   "q": "Il maniscalco ferra i cavalli.",
   "a": true,
   "d": 2
  },
  {
   "q": "Il fabbro lavora principalmente il legno.",
   "a": false,
   "d": 1,
   "why": "Il fabbro lavora il ferro; è il falegname a lavorare il legno."
  },
  {
   "q": "Il cartografo disegna le mappe.",
   "a": true,
   "d": 2
  },
  {
   "q": "L'apicoltore alleva le api.",
   "a": true,
   "d": 1
  },
  {
   "q": "Il mugnaio macina il grano.",
   "a": true,
   "d": 2
  },
  {
   "q": "Lo speleologo esplora le grotte.",
   "a": true,
   "d": 1
  },
  {
   "q": "Il sommelier è un esperto di vini.",
   "a": true,
   "d": 2
  },
  {
   "q": "Il Vaticano è lo Stato più piccolo del mondo.",
   "a": true,
   "d": 1
  },
  {
   "q": "La Bibbia è considerata il libro più venduto della storia.",
   "a": true,
   "d": 1
  },
  {
   "q": "L'euro è stato introdotto in Italia come moneta fisica nel 2002.",
   "a": true,
   "d": 2
  },
  {
   "q": "La lira è stata sostituita dall'euro nel 1990.",
   "a": false,
   "d": 1,
   "why": "L'euro fisico è arrivato nel 2002."
  },
  {
   "q": "Prima dell'euro in Francia si usava il franco.",
   "a": true,
   "d": 1
  },
  {
   "q": "Prima dell'euro in Germania si usava il marco.",
   "a": true,
   "d": 1
  },
  {
   "q": "Prima dell'euro in Spagna si usava la peseta.",
   "a": true,
   "d": 2
  },
  {
   "q": "Prima dell'euro in Grecia si usava la dracma.",
   "a": true,
   "d": 2
  },
  {
   "q": "Nel Regno Unito si usa l'euro.",
   "a": false,
   "d": 1,
   "why": "Si usa la sterlina."
  },
  {
   "q": "Il Giappone usa lo yuan come moneta.",
   "a": false,
   "d": 1,
   "why": "Lo yuan è cinese: la moneta giapponese è lo yen."
  },
  {
   "q": "In Svizzera la moneta è l'euro.",
   "a": false,
   "d": 1,
   "why": "In Svizzera si usa il franco svizzero."
  },
  {
   "q": "Il dollaro è usato solo negli Stati Uniti.",
   "a": false,
   "d": 1,
   "why": "Esistono molti altri dollari, per esempio quello canadese e quello australiano."
  },
  {
   "q": "La sterlina è divisa in 100 penny.",
   "a": true,
   "d": 2
  },
  {
   "q": "Il primo francobollo della storia è stato il britannico Penny Black, del 1840.",
   "a": true,
   "d": 3
  },
  {
   "q": "Il Monopoly è nato negli Stati Uniti.",
   "a": true,
   "d": 2
  },
  {
   "q": "Gli scacchi hanno origine in India.",
   "a": true,
   "d": 3
  },
  {
   "q": "Il gioco del Go ha origine in Cina.",
   "a": true,
   "d": 3
  },
  {
   "q": "Nella roulette europea i numeri vanno da 0 a 36.",
   "a": true,
   "d": 2
  },
  {
   "q": "Nella roulette americana ci sono due zeri.",
   "a": true,
   "d": 3
  },
  {
   "q": "Un mazzo di tarocchi ha 78 carte.",
   "a": true,
   "d": 3
  },
  {
   "q": "Su un dado normale le facce opposte sommano sempre 7.",
   "a": true,
   "d": 2
  },
  {
   "q": "Un mazzo di carte francesi ha quattro semi da tredici carte ciascuno.",
   "a": true,
   "d": 1
  },
  {
   "q": "Nel poker il colore batte il full.",
   "a": false,
   "d": 3,
   "why": "Il full è una combinazione più forte del colore."
  },
  {
   "q": "La scala reale è la combinazione più alta del poker.",
   "a": true,
   "d": 2
  },
  {
   "q": "Il bridge si gioca in quattro.",
   "a": true,
   "d": 2
  },
  {
   "q": "L'alfabeto Morse usa punti e linee.",
   "a": true,
   "d": 1
  },
  {
   "q": "Il segnale SOS in Morse è formato da tre punti, tre linee e tre punti.",
   "a": true,
   "d": 2
  },
  {
   "q": "Il Braille è un sistema di scrittura in rilievo per i ciechi.",
   "a": true,
   "d": 1
  },
  {
   "q": "L'esperanto è una lingua artificiale.",
   "a": true,
   "d": 1
  },
  {
   "q": "L'Italia si trova nel fuso orario UTC+1 (UTC+2 con l'ora legale).",
   "a": true,
   "d": 2
  },
  {
   "q": "Una dozzina corrisponde a dieci elementi.",
   "a": false,
   "d": 1,
   "why": "Una dozzina è formata da dodici elementi."
  },
  {
   "q": "Un quintale equivale a cento chilogrammi.",
   "a": true,
   "d": 1
  },
  {
   "q": "Un lustro equivale a quattro anni.",
   "a": false,
   "d": 2,
   "why": "Un lustro dura cinque anni."
  },
  {
   "q": "Il sismografo misura la pressione atmosferica.",
   "a": false,
   "d": 2,
   "why": "Il sismografo registra le vibrazioni del suolo; la pressione si misura con il barometro."
  },
  {
   "q": "Il giallo e il blu mescolati danno il rosso.",
   "a": false,
   "d": 1,
   "why": "Danno il verde."
  }
 ],
 "tables": [
  {
   "id": "feste",
   "items": [
    {
     "name": "Capodanno",
     "data": "1º gennaio",
     "d": 1,
     "mese": "Gennaio"
    },
    {
     "name": "Sant'Antonio Abate",
     "data": "17 gennaio",
     "d": 3,
     "mese": "Gennaio"
    },
    {
     "name": "Giorno della Memoria",
     "data": "27 gennaio",
     "d": 2,
     "mese": "Gennaio"
    },
    {
     "name": "Candelora",
     "data": "2 febbraio",
     "d": 3,
     "mese": "Febbraio"
    },
    {
     "name": "Giorno del Ricordo",
     "data": "10 febbraio",
     "d": 3,
     "mese": "Febbraio"
    },
    {
     "name": "San Valentino",
     "data": "14 febbraio",
     "d": 1,
     "mese": "Febbraio"
    },
    {
     "name": "Festa della Donna",
     "data": "8 marzo",
     "d": 1,
     "mese": "Marzo"
    },
    {
     "name": "San Patrizio",
     "data": "17 marzo",
     "d": 2,
     "mese": "Marzo"
    },
    {
     "name": "Festa del Papà",
     "data": "19 marzo",
     "d": 1,
     "mese": "Marzo"
    },
    {
     "name": "Giornata mondiale dell'Acqua",
     "data": "22 marzo",
     "d": 3,
     "mese": "Marzo"
    },
    {
     "name": "Pesce d'aprile",
     "data": "1º aprile",
     "d": 1,
     "mese": "Aprile"
    },
    {
     "name": "Giornata mondiale della Salute",
     "data": "7 aprile",
     "d": 3,
     "mese": "Aprile"
    },
    {
     "name": "Giornata della Terra",
     "data": "22 aprile",
     "d": 2,
     "mese": "Aprile"
    },
    {
     "name": "Giornata mondiale del Libro",
     "data": "23 aprile",
     "d": 3,
     "mese": "Aprile"
    },
    {
     "name": "Festa della Liberazione",
     "data": "25 aprile",
     "d": 1,
     "mese": "Aprile"
    },
    {
     "name": "Festa dei Lavoratori",
     "data": "1º maggio",
     "d": 1,
     "mese": "Maggio"
    },
    {
     "name": "Giornata dell'Europa",
     "data": "9 maggio",
     "d": 2,
     "mese": "Maggio"
    },
    {
     "name": "Giornata mondiale dell'Ambiente",
     "data": "5 giugno",
     "d": 3,
     "mese": "Giugno"
    },
    {
     "name": "Festa della Musica",
     "data": "21 giugno",
     "d": 2,
     "mese": "Giugno"
    },
    {
     "name": "San Giovanni",
     "data": "24 giugno",
     "d": 3,
     "mese": "Giugno"
    },
    {
     "name": "Santi Pietro e Paolo",
     "data": "29 giugno",
     "d": 2,
     "mese": "Giugno"
    },
    {
     "name": "Festa dell'Indipendenza americana",
     "data": "4 luglio",
     "d": 1,
     "mese": "Luglio"
    },
    {
     "name": "Presa della Bastiglia",
     "data": "14 luglio",
     "d": 2,
     "mese": "Luglio"
    },
    {
     "name": "Notte di San Lorenzo",
     "data": "10 agosto",
     "d": 2,
     "mese": "Agosto"
    },
    {
     "name": "San Michele Arcangelo",
     "data": "29 settembre",
     "d": 3,
     "mese": "Settembre"
    },
    {
     "name": "Festa dei Nonni",
     "data": "2 ottobre",
     "d": 3,
     "mese": "Ottobre"
    },
    {
     "name": "San Francesco d'Assisi",
     "data": "4 ottobre",
     "d": 2,
     "mese": "Ottobre"
    },
    {
     "name": "Giornata mondiale dell'Alimentazione",
     "data": "16 ottobre",
     "d": 3,
     "mese": "Ottobre"
    },
    {
     "name": "Halloween",
     "data": "31 ottobre",
     "d": 1,
     "mese": "Ottobre"
    },
    {
     "name": "Commemorazione dei defunti",
     "data": "2 novembre",
     "d": 1,
     "mese": "Novembre"
    },
    {
     "name": "Giornata dell'Unità nazionale e delle Forze Armate",
     "data": "4 novembre",
     "d": 2,
     "mese": "Novembre"
    },
    {
     "name": "Guy Fawkes Night",
     "data": "5 novembre",
     "d": 3,
     "mese": "Novembre"
    },
    {
     "name": "San Martino",
     "data": "11 novembre",
     "d": 2,
     "mese": "Novembre"
    },
    {
     "name": "Santa Cecilia",
     "data": "22 novembre",
     "d": 3,
     "mese": "Novembre"
    },
    {
     "name": "Giornata contro la violenza sulle donne",
     "data": "25 novembre",
     "d": 2,
     "mese": "Novembre"
    },
    {
     "name": "Giornata mondiale contro l'AIDS",
     "data": "1º dicembre",
     "d": 3,
     "mese": "Dicembre"
    },
    {
     "name": "Santa Barbara",
     "data": "4 dicembre",
     "d": 3,
     "mese": "Dicembre"
    },
    {
     "name": "San Nicola",
     "data": "6 dicembre",
     "d": 2,
     "mese": "Dicembre"
    },
    {
     "name": "Giornata dei diritti umani",
     "data": "10 dicembre",
     "d": 3,
     "mese": "Dicembre"
    },
    {
     "name": "Santa Lucia",
     "data": "13 dicembre",
     "d": 2,
     "mese": "Dicembre"
    },
    {
     "name": "Vigilia di Natale",
     "data": "24 dicembre",
     "d": 1,
     "mese": "Dicembre"
    },
    {
     "name": "Santo Stefano",
     "data": "26 dicembre",
     "d": 1,
     "mese": "Dicembre"
    },
    {
     "name": "San Silvestro",
     "data": "31 dicembre",
     "d": 1,
     "mese": "Dicembre"
    }
   ],
   "fields": {
    "data": {
     "ask": "In quale data cade «{name}»?",
     "who": "Quale di queste ricorrenze ha come data {value}?",
     "tf": "La data di «{name}» è: {value}."
    },
    "mese": {
     "ask": "In quale mese cade «{name}»?",
     "who": "Quale di queste ricorrenze cade in {value}?",
     "tf": "Il mese in cui cade «{name}» è: {value}.",
     "odd": "Trova l'intruso: quale di queste ricorrenze NON cade in {value}?"
    }
   }
  },
  {
   "id": "festemondo",
   "items": [
    {
     "name": "Oktoberfest",
     "paese": "Germania",
     "d": 1
    },
    {
     "name": "Fiera del Libro di Francoforte",
     "paese": "Germania",
     "d": 3
    },
    {
     "name": "Carnevale di Rio",
     "paese": "Brasile",
     "d": 1
    },
    {
     "name": "Holi",
     "paese": "India",
     "d": 2
    },
    {
     "name": "Diwali",
     "paese": "India",
     "d": 2
    },
    {
     "name": "Día de Muertos",
     "paese": "Messico",
     "d": 2
    },
    {
     "name": "Hogmanay",
     "paese": "Scozia",
     "d": 3
    },
    {
     "name": "Festival Fringe di Edimburgo",
     "paese": "Scozia",
     "d": 3
    },
    {
     "name": "La Tomatina",
     "paese": "Spagna",
     "d": 2
    },
    {
     "name": "Sanfermines (corsa dei tori a Pamplona)",
     "paese": "Spagna",
     "d": 2
    },
    {
     "name": "Las Fallas",
     "paese": "Spagna",
     "d": 3
    },
    {
     "name": "Hanami (fioritura dei ciliegi)",
     "paese": "Giappone",
     "d": 2
    },
    {
     "name": "Obon",
     "paese": "Giappone",
     "d": 3
    },
    {
     "name": "Songkran",
     "paese": "Thailandia",
     "d": 3
    },
    {
     "name": "Inti Raymi",
     "paese": "Perù",
     "d": 3
    },
    {
     "name": "Waitangi Day",
     "paese": "Nuova Zelanda",
     "d": 3
    },
    {
     "name": "Calgary Stampede",
     "paese": "Canada",
     "d": 3
    },
    {
     "name": "Mardi Gras di New Orleans",
     "paese": "Stati Uniti",
     "d": 2
    },
    {
     "name": "Burning Man",
     "paese": "Stati Uniti",
     "d": 3
    },
    {
     "name": "Palio di Siena",
     "paese": "Italia",
     "d": 1
    },
    {
     "name": "Carnevale di Viareggio",
     "paese": "Italia",
     "d": 1
    },
    {
     "name": "Calcio storico fiorentino",
     "paese": "Italia",
     "d": 2
    },
    {
     "name": "Festival di Cannes",
     "paese": "Francia",
     "d": 1
    },
    {
     "name": "Festival di Glastonbury",
     "paese": "Inghilterra",
     "d": 3
    },
    {
     "name": "Carnevale di Basilea",
     "paese": "Svizzera",
     "d": 3
    },
    {
     "name": "Festival di Salisburgo",
     "paese": "Austria",
     "d": 3
    }
   ],
   "fields": {
    "paese": {
     "ask": "In quale Paese ha origine o si svolge tradizionalmente «{name}»?",
     "who": "Quale di queste feste o eventi ha origine o si svolge tradizionalmente in questo Paese: {value}?",
     "tf": "«{name}» ha origine o si svolge tradizionalmente in questo Paese: {value}.",
     "odd": "Trova l'intruso: quale di questi eventi NON si svolge tradizionalmente in questo Paese: {value}?"
    }
   }
  },
  {
   "id": "segni",
   "items": [
    {
     "name": "Ariete",
     "elemento": "Fuoco",
     "modalita": "Cardinale",
     "d": 2,
     "posto": 1
    },
    {
     "name": "Toro",
     "elemento": "Terra",
     "modalita": "Fisso",
     "d": 2,
     "posto": 2
    },
    {
     "name": "Gemelli",
     "elemento": "Aria",
     "modalita": "Mutevole",
     "d": 2,
     "posto": 3
    },
    {
     "name": "Cancro",
     "elemento": "Acqua",
     "modalita": "Cardinale",
     "d": 2,
     "posto": 4
    },
    {
     "name": "Leone",
     "elemento": "Fuoco",
     "modalita": "Fisso",
     "d": 2,
     "posto": 5
    },
    {
     "name": "Vergine",
     "elemento": "Terra",
     "modalita": "Mutevole",
     "d": 2,
     "posto": 6
    },
    {
     "name": "Bilancia",
     "elemento": "Aria",
     "modalita": "Cardinale",
     "d": 2,
     "posto": 7
    },
    {
     "name": "Scorpione",
     "elemento": "Acqua",
     "modalita": "Fisso",
     "d": 2,
     "posto": 8
    },
    {
     "name": "Sagittario",
     "elemento": "Fuoco",
     "modalita": "Mutevole",
     "d": 2,
     "posto": 9
    },
    {
     "name": "Capricorno",
     "elemento": "Terra",
     "modalita": "Cardinale",
     "d": 2,
     "posto": 10
    },
    {
     "name": "Acquario",
     "elemento": "Aria",
     "modalita": "Fisso",
     "d": 2,
     "posto": 11
    },
    {
     "name": "Pesci",
     "elemento": "Acqua",
     "modalita": "Mutevole",
     "d": 2,
     "posto": 12
    }
   ],
   "fields": {
    "elemento": {
     "ask": "A quale elemento appartiene il segno zodiacale {name}?",
     "who": "Quale di questi segni zodiacali appartiene all'elemento {value}?",
     "tf": "Il segno zodiacale {name} appartiene all'elemento {value}.",
     "odd": "Trova l'intruso: quale segno zodiacale NON appartiene all'elemento {value}?"
    },
    "modalita": {
     "who": "Quale di questi segni zodiacali ha come modalità: {value}?",
     "tf": "La modalità del segno zodiacale {name} è: {value}.",
     "odd": "Trova l'intruso: quale segno zodiacale NON ha come modalità: {value}?"
    }
   },
   "numeric": {
    "posto": {
     "ask": "Che posto occupa il segno {name} nell'ordine dello zodiaco (Ariete = 1)?",
     "span": 12,
     "tol": 0,
     "unit": "",
     "duel": "Quale segno viene prima nell'ordine dello zodiaco?",
     "lowerWins": true,
     "order": "Metti in ordine i segni zodiacali, dal primo",
     "gap": 1
    }
   }
  },
  {
   "id": "datesegno",
   "items": [
    {
     "name": "il 25 marzo",
     "segno": "Ariete",
     "d": 1
    },
    {
     "name": "il 1º aprile",
     "segno": "Ariete",
     "d": 1
    },
    {
     "name": "il 10 aprile",
     "segno": "Ariete",
     "d": 2
    },
    {
     "name": "il 25 aprile",
     "segno": "Toro",
     "d": 2
    },
    {
     "name": "il 5 maggio",
     "segno": "Toro",
     "d": 1
    },
    {
     "name": "il 15 maggio",
     "segno": "Toro",
     "d": 2
    },
    {
     "name": "il 25 maggio",
     "segno": "Gemelli",
     "d": 2
    },
    {
     "name": "il 5 giugno",
     "segno": "Gemelli",
     "d": 1
    },
    {
     "name": "il 15 giugno",
     "segno": "Gemelli",
     "d": 2
    },
    {
     "name": "il 25 giugno",
     "segno": "Cancro",
     "d": 2
    },
    {
     "name": "il 5 luglio",
     "segno": "Cancro",
     "d": 1
    },
    {
     "name": "il 15 luglio",
     "segno": "Cancro",
     "d": 2
    },
    {
     "name": "il 28 luglio",
     "segno": "Leone",
     "d": 2
    },
    {
     "name": "il 10 agosto",
     "segno": "Leone",
     "d": 1
    },
    {
     "name": "il 18 agosto",
     "segno": "Leone",
     "d": 2
    },
    {
     "name": "il 28 agosto",
     "segno": "Vergine",
     "d": 2
    },
    {
     "name": "il 5 settembre",
     "segno": "Vergine",
     "d": 1
    },
    {
     "name": "il 15 settembre",
     "segno": "Vergine",
     "d": 2
    },
    {
     "name": "il 28 settembre",
     "segno": "Bilancia",
     "d": 2
    },
    {
     "name": "il 10 ottobre",
     "segno": "Bilancia",
     "d": 1
    },
    {
     "name": "il 15 ottobre",
     "segno": "Bilancia",
     "d": 2
    },
    {
     "name": "il 28 ottobre",
     "segno": "Scorpione",
     "d": 2
    },
    {
     "name": "il 5 novembre",
     "segno": "Scorpione",
     "d": 1
    },
    {
     "name": "il 15 novembre",
     "segno": "Scorpione",
     "d": 2
    },
    {
     "name": "il 28 novembre",
     "segno": "Sagittario",
     "d": 2
    },
    {
     "name": "il 5 dicembre",
     "segno": "Sagittario",
     "d": 1
    },
    {
     "name": "il 15 dicembre",
     "segno": "Sagittario",
     "d": 2
    },
    {
     "name": "il 25 dicembre",
     "segno": "Capricorno",
     "d": 1
    },
    {
     "name": "il 1º gennaio",
     "segno": "Capricorno",
     "d": 1
    },
    {
     "name": "il 10 gennaio",
     "segno": "Capricorno",
     "d": 2
    },
    {
     "name": "il 25 gennaio",
     "segno": "Acquario",
     "d": 2
    },
    {
     "name": "il 5 febbraio",
     "segno": "Acquario",
     "d": 1
    },
    {
     "name": "il 14 febbraio",
     "segno": "Acquario",
     "d": 1
    },
    {
     "name": "il 25 febbraio",
     "segno": "Pesci",
     "d": 2
    },
    {
     "name": "il 5 marzo",
     "segno": "Pesci",
     "d": 1
    },
    {
     "name": "il 15 marzo",
     "segno": "Pesci",
     "d": 2
    }
   ],
   "fields": {
    "segno": {
     "ask": "Secondo l'oroscopo occidentale, di che segno è chi è nato {name}?",
     "who": "Quale di queste date di nascita corrisponde al segno {value}?",
     "tf": "Chi è nato {name} è del segno {value}.",
     "odd": "Trova l'intruso: quale di queste date NON appartiene al segno {value}?"
    }
   }
  },
  {
   "id": "nozze",
   "items": [
    {
     "name": "nozze di legno",
     "anni": 5,
     "d": 2
    },
    {
     "name": "nozze di stagno",
     "anni": 10,
     "d": 3
    },
    {
     "name": "nozze di cristallo",
     "anni": 15,
     "d": 3
    },
    {
     "name": "nozze di porcellana",
     "anni": 20,
     "d": 3
    },
    {
     "name": "nozze d'argento",
     "anni": 25,
     "d": 1
    },
    {
     "name": "nozze di perla",
     "anni": 30,
     "d": 2
    },
    {
     "name": "nozze di rubino",
     "anni": 40,
     "d": 2
    },
    {
     "name": "nozze d'oro",
     "anni": 50,
     "d": 1
    },
    {
     "name": "nozze di diamante",
     "anni": 60,
     "d": 2
    }
   ],
   "fields": {},
   "numeric": {
    "anni": {
     "ask": "Dopo quanti anni di matrimonio si festeggiano le {name}?",
     "span": 60,
     "tol": 0,
     "unit": "anni",
     "duel": "Quali nozze si festeggiano per prime?",
     "lowerWins": true,
     "order": "Metti in ordine le nozze, dalle prime a essere festeggiate",
     "gap": 5
    }
   }
  },
  {
   "id": "nozzenome",
   "items": [
    {
     "name": "5 anni",
     "nozze": "Nozze di legno",
     "d": 2
    },
    {
     "name": "10 anni",
     "nozze": "Nozze di stagno",
     "d": 3
    },
    {
     "name": "15 anni",
     "nozze": "Nozze di cristallo",
     "d": 3
    },
    {
     "name": "20 anni",
     "nozze": "Nozze di porcellana",
     "d": 3
    },
    {
     "name": "25 anni",
     "nozze": "Nozze d'argento",
     "d": 1
    },
    {
     "name": "30 anni",
     "nozze": "Nozze di perla",
     "d": 2
    },
    {
     "name": "40 anni",
     "nozze": "Nozze di rubino",
     "d": 2
    },
    {
     "name": "50 anni",
     "nozze": "Nozze d'oro",
     "d": 1
    },
    {
     "name": "60 anni",
     "nozze": "Nozze di diamante",
     "d": 2
    }
   ],
   "fields": {
    "nozze": {
     "ask": "Come si chiamano le nozze che si festeggiano dopo {name} di matrimonio?",
     "who": "Dopo quanti anni di matrimonio si festeggiano le {value}?",
     "tf": "Dopo {name} di matrimonio si festeggiano: {value}."
    }
   }
  },
  {
   "id": "preeuro",
   "items": [
    {
     "name": "Italia",
     "moneta": "Lira",
     "d": 1
    },
    {
     "name": "Germania",
     "moneta": "Marco tedesco",
     "d": 1
    },
    {
     "name": "Francia",
     "moneta": "Franco francese",
     "d": 1
    },
    {
     "name": "Spagna",
     "moneta": "Peseta",
     "d": 1
    },
    {
     "name": "Grecia",
     "moneta": "Dracma",
     "d": 2
    },
    {
     "name": "Portogallo",
     "moneta": "Escudo",
     "d": 2
    },
    {
     "name": "Austria",
     "moneta": "Scellino",
     "d": 2
    },
    {
     "name": "Paesi Bassi",
     "moneta": "Fiorino olandese",
     "d": 3
    },
    {
     "name": "Irlanda",
     "moneta": "Sterlina irlandese",
     "d": 3
    },
    {
     "name": "Finlandia",
     "moneta": "Marco finlandese",
     "d": 3
    },
    {
     "name": "Belgio",
     "moneta": "Franco belga",
     "d": 3
    },
    {
     "name": "Slovenia",
     "moneta": "Tallero sloveno",
     "d": 3
    },
    {
     "name": "Cipro",
     "moneta": "Sterlina cipriota",
     "d": 3
    },
    {
     "name": "Malta",
     "moneta": "Lira maltese",
     "d": 3
    },
    {
     "name": "Slovacchia",
     "moneta": "Corona slovacca",
     "d": 3
    },
    {
     "name": "Estonia",
     "moneta": "Corona estone",
     "d": 3
    },
    {
     "name": "Lituania",
     "moneta": "Litas",
     "d": 3
    },
    {
     "name": "Lettonia",
     "moneta": "Lats",
     "d": 3
    },
    {
     "name": "Croazia",
     "moneta": "Kuna",
     "d": 3
    }
   ],
   "fields": {
    "moneta": {
     "ask": "Quale moneta usava questo Paese prima dell'euro: {name}?",
     "who": "Quale di questi Paesi usava prima dell'euro questa moneta: {value}?",
     "tf": "Prima dell'euro, in questo Paese ({name}) si usava: {value}."
    }
   }
  },
  {
   "id": "euroita",
   "items": [
    {
     "name": "moneta da 1 euro",
     "faccia": "L'Uomo vitruviano di Leonardo",
     "d": 2
    },
    {
     "name": "moneta da 2 euro",
     "faccia": "Il ritratto di Dante di Raffaello",
     "d": 2
    },
    {
     "name": "moneta da 50 centesimi",
     "faccia": "La statua equestre di Marco Aurelio",
     "d": 3
    },
    {
     "name": "moneta da 20 centesimi",
     "faccia": "Una scultura di Boccioni",
     "d": 3
    },
    {
     "name": "moneta da 10 centesimi",
     "faccia": "La Nascita di Venere di Botticelli",
     "d": 3
    },
    {
     "name": "moneta da 5 centesimi",
     "faccia": "Il Colosseo",
     "d": 2
    },
    {
     "name": "moneta da 2 centesimi",
     "faccia": "La Mole Antonelliana",
     "d": 2
    },
    {
     "name": "moneta da 1 centesimo",
     "faccia": "Castel del Monte",
     "d": 3
    }
   ],
   "fields": {
    "faccia": {
     "ask": "Che cosa è raffigurato sul lato italiano della {name}?",
     "who": "Quale moneta italiana raffigura: {value}?",
     "tf": "Sul lato italiano della {name} è raffigurato: {value}."
    }
   }
  },
  {
   "id": "colori",
   "items": [
    {
     "name": "il pomodoro maturo",
     "colore": "Rosso",
     "d": 1
    },
    {
     "name": "la fragola",
     "colore": "Rosso",
     "d": 1
    },
    {
     "name": "il rubino",
     "colore": "Rosso",
     "d": 1
    },
    {
     "name": "il vestito di Babbo Natale",
     "colore": "Rosso",
     "d": 1
    },
    {
     "name": "le Ferrari da corsa",
     "colore": "Rosso",
     "d": 1
    },
    {
     "name": "l'estintore",
     "colore": "Rosso",
     "d": 1
    },
    {
     "name": "la cassetta delle lettere di Poste Italiane",
     "colore": "Rosso",
     "d": 2
    },
    {
     "name": "gli autobus a due piani di Londra",
     "colore": "Rosso",
     "d": 1
    },
    {
     "name": "il cartellino dell'espulsione nel calcio",
     "colore": "Rosso",
     "d": 1
    },
    {
     "name": "la banana matura",
     "colore": "Giallo",
     "d": 1
    },
    {
     "name": "il limone",
     "colore": "Giallo",
     "d": 1
    },
    {
     "name": "il girasole",
     "colore": "Giallo",
     "d": 1
    },
    {
     "name": "Homer Simpson",
     "colore": "Giallo",
     "d": 1
    },
    {
     "name": "il cartellino dell'ammonizione nel calcio",
     "colore": "Giallo",
     "d": 1
    },
    {
     "name": "la maglia del leader del Tour de France",
     "colore": "Giallo",
     "d": 1
    },
    {
     "name": "i taxi di New York",
     "colore": "Giallo",
     "d": 1
    },
    {
     "name": "lo scuolabus americano",
     "colore": "Giallo",
     "d": 2
    },
    {
     "name": "gli spinaci",
     "colore": "Verde",
     "d": 1
    },
    {
     "name": "lo smeraldo",
     "colore": "Verde",
     "d": 1
    },
    {
     "name": "il Grinch",
     "colore": "Verde",
     "d": 1
    },
    {
     "name": "Hulk",
     "colore": "Verde",
     "d": 1
    },
    {
     "name": "il semaforo che dà via libera",
     "colore": "Verde",
     "d": 1
    },
    {
     "name": "il campo centrale di Wimbledon",
     "colore": "Verde",
     "d": 2
    },
    {
     "name": "la croce delle farmacie italiane",
     "colore": "Verde",
     "d": 2
    },
    {
     "name": "lo zaffiro",
     "colore": "Blu",
     "d": 2
    },
    {
     "name": "il lapislazzuli",
     "colore": "Blu",
     "d": 3
    },
    {
     "name": "Sonic the Hedgehog",
     "colore": "Blu",
     "d": 2
    },
    {
     "name": "Cookie Monster",
     "colore": "Blu",
     "d": 2
    },
    {
     "name": "Dory di «Alla ricerca di Nemo»",
     "colore": "Blu",
     "d": 2
    },
    {
     "name": "il Genio di «Aladdin»",
     "colore": "Blu",
     "d": 2
    },
    {
     "name": "la melanzana",
     "colore": "Viola",
     "d": 1
    },
    {
     "name": "l'ametista",
     "colore": "Viola",
     "d": 2
    },
    {
     "name": "la lavanda",
     "colore": "Viola",
     "d": 1
    },
    {
     "name": "Barney il dinosauro",
     "colore": "Viola",
     "d": 2
    },
    {
     "name": "la zucca di Halloween",
     "colore": "Arancione",
     "d": 1
    },
    {
     "name": "la carota",
     "colore": "Arancione",
     "d": 1
    },
    {
     "name": "la scatola nera degli aerei",
     "colore": "Arancione",
     "d": 2
    },
    {
     "name": "Nemo",
     "colore": "Arancione",
     "d": 2
    },
    {
     "name": "Garfield",
     "colore": "Arancione",
     "d": 1
    },
    {
     "name": "la maglia del leader del Giro d'Italia",
     "colore": "Rosa",
     "d": 1
    },
    {
     "name": "il fiocco per la nascita di una femmina",
     "colore": "Rosa",
     "d": 1
    },
    {
     "name": "i fenicotteri",
     "colore": "Rosa",
     "d": 1
    },
    {
     "name": "Peppa Pig",
     "colore": "Rosa",
     "d": 1
    },
    {
     "name": "la bandiera dei pirati",
     "colore": "Nero",
     "d": 1
    },
    {
     "name": "il carbone",
     "colore": "Nero",
     "d": 1
    },
    {
     "name": "il lutto in Italia",
     "colore": "Nero",
     "d": 1
    },
    {
     "name": "l'abito da sposa tradizionale",
     "colore": "Bianco",
     "d": 1
    },
    {
     "name": "il latte",
     "colore": "Bianco",
     "d": 1
    },
    {
     "name": "la neve",
     "colore": "Bianco",
     "d": 1
    },
    {
     "name": "i taxi italiani",
     "colore": "Bianco",
     "d": 2
    },
    {
     "name": "la maglia del Real Madrid",
     "colore": "Bianco",
     "d": 2
    },
    {
     "name": "il cioccolato",
     "colore": "Marrone",
     "d": 1
    },
    {
     "name": "il caffè",
     "colore": "Marrone",
     "d": 1
    },
    {
     "name": "la corteccia degli alberi",
     "colore": "Marrone",
     "d": 1
    },
    {
     "name": "le nuvole temporalesche",
     "colore": "Grigio",
     "d": 1
    },
    {
     "name": "l'elefante",
     "colore": "Grigio",
     "d": 1
    }
   ],
   "fields": {
    "colore": {
     "ask": "Qual è il colore tipico di questa cosa: {name}?",
     "who": "Quale di queste cose ha come colore tipico: {value}?",
     "tf": "Per {name} il colore tipico è: {value}.",
     "odd": "Trova l'intruso: quale di queste cose NON ha come colore tipico: {value}?"
    }
   }
  },
  {
   "id": "unita",
   "items": [
    {
     "name": "Metro",
     "grandezza": "Lunghezza",
     "d": 1
    },
    {
     "name": "Chilometro",
     "grandezza": "Lunghezza",
     "d": 1
    },
    {
     "name": "Miglio",
     "grandezza": "Lunghezza",
     "d": 2
    },
    {
     "name": "Pollice",
     "grandezza": "Lunghezza",
     "d": 2
    },
    {
     "name": "Piede",
     "grandezza": "Lunghezza",
     "d": 2
    },
    {
     "name": "Anno luce",
     "grandezza": "Lunghezza",
     "d": 2
    },
    {
     "name": "Chilogrammo",
     "grandezza": "Massa",
     "d": 1
    },
    {
     "name": "Grammo",
     "grandezza": "Massa",
     "d": 1
    },
    {
     "name": "Tonnellata",
     "grandezza": "Massa",
     "d": 1
    },
    {
     "name": "Libbra",
     "grandezza": "Massa",
     "d": 2
    },
    {
     "name": "Secondo",
     "grandezza": "Tempo",
     "d": 1
    },
    {
     "name": "Minuto",
     "grandezza": "Tempo",
     "d": 1
    },
    {
     "name": "Newton",
     "grandezza": "Forza",
     "d": 2
    },
    {
     "name": "Joule",
     "grandezza": "Energia",
     "d": 2
    },
    {
     "name": "Caloria",
     "grandezza": "Energia",
     "d": 2
    },
    {
     "name": "Chilowattora",
     "grandezza": "Energia",
     "d": 3
    },
    {
     "name": "Watt",
     "grandezza": "Potenza",
     "d": 2
    },
    {
     "name": "Cavallo vapore",
     "grandezza": "Potenza",
     "d": 3
    },
    {
     "name": "Pascal",
     "grandezza": "Pressione",
     "d": 3
    },
    {
     "name": "Bar",
     "grandezza": "Pressione",
     "d": 3
    },
    {
     "name": "Hertz",
     "grandezza": "Frequenza",
     "d": 2
    },
    {
     "name": "Ampere",
     "grandezza": "Corrente elettrica",
     "d": 2
    },
    {
     "name": "Volt",
     "grandezza": "Tensione elettrica",
     "d": 2
    },
    {
     "name": "Ohm",
     "grandezza": "Resistenza elettrica",
     "d": 3
    },
    {
     "name": "Grado Celsius",
     "grandezza": "Temperatura",
     "d": 1
    },
    {
     "name": "Kelvin",
     "grandezza": "Temperatura",
     "d": 2
    },
    {
     "name": "Fahrenheit",
     "grandezza": "Temperatura",
     "d": 2
    },
    {
     "name": "Litro",
     "grandezza": "Volume",
     "d": 1
    },
    {
     "name": "Ettaro",
     "grandezza": "Superficie",
     "d": 2
    },
    {
     "name": "Metro quadrato",
     "grandezza": "Superficie",
     "d": 1
    },
    {
     "name": "Nodo",
     "grandezza": "Velocità",
     "d": 2
    },
    {
     "name": "Decibel",
     "grandezza": "Intensità del suono",
     "d": 2
    },
    {
     "name": "Candela",
     "grandezza": "Intensità luminosa",
     "d": 3
    },
    {
     "name": "Byte",
     "grandezza": "Quantità di dati",
     "d": 2
    },
    {
     "name": "Becquerel",
     "grandezza": "Radioattività",
     "d": 3
    }
   ],
   "fields": {
    "grandezza": {
     "ask": "Che cosa si misura con l'unità «{name}»?",
     "who": "Quale di queste unità di misura serve a misurare: {value}?",
     "tf": "L'unità «{name}» misura questa grandezza: {value}.",
     "odd": "Trova l'intruso: quale di queste unità NON misura: {value}?"
    }
   }
  },
  {
   "id": "prefissi",
   "items": [
    {
     "name": "chilo",
     "valore": "Mille volte",
     "d": 1
    },
    {
     "name": "etto",
     "valore": "Cento volte",
     "d": 1
    },
    {
     "name": "deca",
     "valore": "Dieci volte",
     "d": 2
    },
    {
     "name": "deci",
     "valore": "Un decimo",
     "d": 2
    },
    {
     "name": "centi",
     "valore": "Un centesimo",
     "d": 1
    },
    {
     "name": "milli",
     "valore": "Un millesimo",
     "d": 1
    },
    {
     "name": "micro",
     "valore": "Un milionesimo",
     "d": 2
    },
    {
     "name": "nano",
     "valore": "Un miliardesimo",
     "d": 3
    },
    {
     "name": "mega",
     "valore": "Un milione di volte",
     "d": 2
    },
    {
     "name": "giga",
     "valore": "Un miliardo di volte",
     "d": 2
    },
    {
     "name": "tera",
     "valore": "Mille miliardi di volte",
     "d": 3
    }
   ],
   "fields": {
    "valore": {
     "ask": "Che cosa indica il prefisso «{name}» davanti a un'unità di misura?",
     "who": "Quale prefisso delle unità di misura indica: {value}?",
     "tf": "Il prefisso «{name}» davanti a un'unità indica: {value}."
    }
   }
  },
  {
   "id": "strumenti",
   "items": [
    {
     "name": "Termometro",
     "misura": "Temperatura",
     "d": 1
    },
    {
     "name": "Barometro",
     "misura": "Pressione atmosferica",
     "d": 2
    },
    {
     "name": "Igrometro",
     "misura": "Umidità dell'aria",
     "d": 3
    },
    {
     "name": "Anemometro",
     "misura": "Velocità del vento",
     "d": 2
    },
    {
     "name": "Sismografo",
     "misura": "Terremoti",
     "d": 2
    },
    {
     "name": "Pluviometro",
     "misura": "Pioggia caduta",
     "d": 2
    },
    {
     "name": "Cronometro",
     "misura": "Tempo trascorso",
     "d": 1
    },
    {
     "name": "Contachilometri",
     "misura": "Distanza percorsa",
     "d": 1
    },
    {
     "name": "Tachimetro",
     "misura": "Velocità di un veicolo",
     "d": 2
    },
    {
     "name": "Contagiri",
     "misura": "Giri del motore",
     "d": 2
    },
    {
     "name": "Altimetro",
     "misura": "Altitudine",
     "d": 2
    },
    {
     "name": "Bussola",
     "misura": "Direzione del nord magnetico",
     "d": 1
    },
    {
     "name": "Goniometro",
     "misura": "Angoli",
     "d": 2
    },
    {
     "name": "Voltmetro",
     "misura": "Tensione elettrica",
     "d": 3
    },
    {
     "name": "Amperometro",
     "misura": "Corrente elettrica",
     "d": 3
    },
    {
     "name": "Contatore Geiger",
     "misura": "Radioattività",
     "d": 2
    },
    {
     "name": "Sfigmomanometro",
     "misura": "Pressione del sangue",
     "d": 3
    },
    {
     "name": "Contapassi",
     "misura": "Passi compiuti",
     "d": 1
    },
    {
     "name": "Cardiofrequenzimetro",
     "misura": "Battito cardiaco",
     "d": 2
    },
    {
     "name": "Bilancia",
     "misura": "Peso",
     "d": 1
    }
   ],
   "fields": {
    "misura": {
     "ask": "Che cosa misura lo strumento chiamato «{name}»?",
     "who": "Quale strumento serve a misurare: {value}?",
     "tf": "Lo strumento «{name}» misura: {value}."
    }
   }
  },
  {
   "id": "esperti",
   "items": [
    {
     "name": "stelle e pianeti",
     "esperto": "Astronomo",
     "d": 1
    },
    {
     "name": "uccelli",
     "esperto": "Ornitologo",
     "d": 2
    },
    {
     "name": "insetti",
     "esperto": "Entomologo",
     "d": 2
    },
    {
     "name": "pesci",
     "esperto": "Ittiologo",
     "d": 3
    },
    {
     "name": "ragni",
     "esperto": "Aracnologo",
     "d": 3
    },
    {
     "name": "funghi",
     "esperto": "Micologo",
     "d": 2
    },
    {
     "name": "fossili",
     "esperto": "Paleontologo",
     "d": 2
    },
    {
     "name": "terremoti",
     "esperto": "Sismologo",
     "d": 2
    },
    {
     "name": "vulcani",
     "esperto": "Vulcanologo",
     "d": 2
    },
    {
     "name": "previsioni del tempo",
     "esperto": "Meteorologo",
     "d": 1
    },
    {
     "name": "reperti dell'antichità",
     "esperto": "Archeologo",
     "d": 1
    },
    {
     "name": "monete antiche",
     "esperto": "Numismatico",
     "d": 2
    },
    {
     "name": "francobolli",
     "esperto": "Filatelista",
     "d": 2
    },
    {
     "name": "lingue",
     "esperto": "Linguista",
     "d": 2
    },
    {
     "name": "batteri",
     "esperto": "Batteriologo",
     "d": 3
    },
    {
     "name": "cellule",
     "esperto": "Citologo",
     "d": 3
    },
    {
     "name": "cuore",
     "esperto": "Cardiologo",
     "d": 1
    },
    {
     "name": "pelle",
     "esperto": "Dermatologo",
     "d": 1
    },
    {
     "name": "occhi",
     "esperto": "Oculista",
     "d": 1
    },
    {
     "name": "bambini",
     "esperto": "Pediatra",
     "d": 1
    },
    {
     "name": "denti",
     "esperto": "Dentista",
     "d": 1
    },
    {
     "name": "ossa e articolazioni",
     "esperto": "Ortopedico",
     "d": 2
    },
    {
     "name": "reni",
     "esperto": "Nefrologo",
     "d": 3
    },
    {
     "name": "cervello e sistema nervoso",
     "esperto": "Neurologo",
     "d": 2
    },
    {
     "name": "tumori",
     "esperto": "Oncologo",
     "d": 2
    },
    {
     "name": "mente e comportamento",
     "esperto": "Psicologo",
     "d": 1
    },
    {
     "name": "orecchio, naso e gola",
     "esperto": "Otorinolaringoiatra",
     "d": 3
    }
   ],
   "fields": {
    "esperto": {
     "ask": "Come si chiama lo specialista che si occupa di {name}?",
     "who": "Di che cosa si occupa questo specialista: {value}?",
     "tf": "Lo specialista che si occupa di {name} è: {value}.",
     "odd": "Trova l'intruso: di che cosa NON si occupa questo specialista: {value}?"
    }
   }
  },
  {
   "id": "mestieri",
   "items": [
    {
     "name": "cazzuola",
     "mestiere": "Muratore",
     "d": 1
    },
    {
     "name": "filo a piombo",
     "mestiere": "Muratore",
     "d": 2
    },
    {
     "name": "pialla",
     "mestiere": "Falegname",
     "d": 1
    },
    {
     "name": "incudine",
     "mestiere": "Fabbro",
     "d": 1
    },
    {
     "name": "ago e ditale",
     "mestiere": "Sarto",
     "d": 1
    },
    {
     "name": "lesina",
     "mestiere": "Calzolaio",
     "d": 3
    },
    {
     "name": "forma da scarpe",
     "mestiere": "Calzolaio",
     "d": 2
    },
    {
     "name": "tavolozza",
     "mestiere": "Pittore",
     "d": 1
    },
    {
     "name": "cavalletto da pittura",
     "mestiere": "Pittore",
     "d": 1
    },
    {
     "name": "teleobiettivo",
     "mestiere": "Fotografo",
     "d": 1
    },
    {
     "name": "camera oscura",
     "mestiere": "Fotografo",
     "d": 2
    },
    {
     "name": "argilla e tornio",
     "mestiere": "Vasaio",
     "d": 2
    },
    {
     "name": "blocco di marmo e subbia",
     "mestiere": "Scultore",
     "d": 3
    },
    {
     "name": "bisturi",
     "mestiere": "Chirurgo",
     "d": 1
    },
    {
     "name": "sac à poche",
     "mestiere": "Pasticciere",
     "d": 2
    },
    {
     "name": "shaker",
     "mestiere": "Barman",
     "d": 1
    },
    {
     "name": "tastevin",
     "mestiere": "Sommelier",
     "d": 3
    },
    {
     "name": "rasoio a mano libera",
     "mestiere": "Barbiere",
     "d": 2
    },
    {
     "name": "piccozza",
     "mestiere": "Alpinista",
     "d": 2
    },
    {
     "name": "telescopio",
     "mestiere": "Astronomo",
     "d": 1
    },
    {
     "name": "lancia antincendio",
     "mestiere": "Pompiere",
     "d": 1
    },
    {
     "name": "rete da pesca",
     "mestiere": "Pescatore",
     "d": 1
    },
    {
     "name": "aratro",
     "mestiere": "Agricoltore",
     "d": 1
    },
    {
     "name": "bacchetta del direttore",
     "mestiere": "Direttore d'orchestra",
     "d": 1
    },
    {
     "name": "fischietto e cartellini",
     "mestiere": "Arbitro",
     "d": 1
    }
   ],
   "fields": {
    "mestiere": {
     "ask": "Quale mestiere è legato a questo strumento: {name}?",
     "who": "Quale di questi strumenti è legato a questo mestiere: {value}?",
     "tf": "Lo strumento «{name}» è legato a questo mestiere: {value}."
    }
   }
  },
  {
   "id": "premi",
   "items": [
    {
     "name": "Oscar",
     "ambito": "Cinema",
     "d": 1
    },
    {
     "name": "Palma d'Oro",
     "ambito": "Cinema",
     "d": 2
    },
    {
     "name": "Orso d'Oro",
     "ambito": "Cinema",
     "d": 2
    },
    {
     "name": "Davide di Donatello",
     "ambito": "Cinema",
     "d": 3
    },
    {
     "name": "Grammy",
     "ambito": "Musica",
     "d": 1
    },
    {
     "name": "Brit Awards",
     "ambito": "Musica",
     "d": 3
    },
    {
     "name": "Premio Tenco",
     "ambito": "Musica",
     "d": 3
    },
    {
     "name": "Tony Award",
     "ambito": "Teatro",
     "d": 3
    },
    {
     "name": "Emmy",
     "ambito": "Televisione",
     "d": 2
    },
    {
     "name": "Pallone d'Oro",
     "ambito": "Calcio",
     "d": 1
    },
    {
     "name": "Scarpa d'Oro",
     "ambito": "Calcio",
     "d": 3
    },
    {
     "name": "Premio Strega",
     "ambito": "Letteratura",
     "d": 2
    },
    {
     "name": "Premio Campiello",
     "ambito": "Letteratura",
     "d": 3
    },
    {
     "name": "Booker Prize",
     "ambito": "Letteratura",
     "d": 3
    },
    {
     "name": "Premio Goncourt",
     "ambito": "Letteratura",
     "d": 3
    },
    {
     "name": "Medaglia Fields",
     "ambito": "Matematica",
     "d": 3
    },
    {
     "name": "Premio Turing",
     "ambito": "Informatica",
     "d": 3
    },
    {
     "name": "Premio Pritzker",
     "ambito": "Architettura",
     "d": 3
    }
   ],
   "fields": {
    "ambito": {
     "ask": "In quale ambito si assegna il premio «{name}»?",
     "who": "Quale di questi premi riguarda questo ambito: {value}?",
     "tf": "Il premio «{name}» appartiene a questo ambito: {value}.",
     "odd": "Trova l'intruso: quale di questi premi NON riguarda questo ambito: {value}?"
    }
   }
  },
  {
   "id": "smorfia",
   "items": [
    {
     "name": "1",
     "significato": "L'Italia",
     "d": 3
    },
    {
     "name": "3",
     "significato": "La gatta",
     "d": 3
    },
    {
     "name": "4",
     "significato": "Il maiale",
     "d": 3
    },
    {
     "name": "8",
     "significato": "La Madonna",
     "d": 3
    },
    {
     "name": "13",
     "significato": "Sant'Antonio",
     "d": 2
    },
    {
     "name": "17",
     "significato": "La disgrazia",
     "d": 2
    },
    {
     "name": "18",
     "significato": "Il sangue",
     "d": 3
    },
    {
     "name": "20",
     "significato": "La festa",
     "d": 3
    },
    {
     "name": "22",
     "significato": "Il pazzo",
     "d": 3
    },
    {
     "name": "25",
     "significato": "Natale",
     "d": 2
    },
    {
     "name": "32",
     "significato": "Il capitone",
     "d": 3
    },
    {
     "name": "33",
     "significato": "Gli anni di Cristo",
     "d": 3
    },
    {
     "name": "42",
     "significato": "Il caffè",
     "d": 3
    },
    {
     "name": "48",
     "significato": "Il morto che parla",
     "d": 3
    },
    {
     "name": "50",
     "significato": "Il pane",
     "d": 3
    },
    {
     "name": "90",
     "significato": "La paura",
     "d": 2
    }
   ],
   "fields": {
    "significato": {
     "ask": "Nella smorfia napoletana, che cosa rappresenta il numero {name}?",
     "who": "Quale di questi numeri rappresenta, nella smorfia napoletana: {value}?",
     "tf": "Nella smorfia napoletana il numero {name} rappresenta: {value}."
    }
   }
  },
  {
   "id": "sigleint",
   "items": [
    {
     "name": "ONU",
     "significato": "Organizzazione delle Nazioni Unite",
     "d": 1
    },
    {
     "name": "UE",
     "significato": "Unione Europea",
     "d": 1
    },
    {
     "name": "NATO",
     "significato": "Organizzazione del Trattato del Nord Atlantico",
     "d": 2
    },
    {
     "name": "OMS",
     "significato": "Organizzazione Mondiale della Sanità",
     "d": 1
    },
    {
     "name": "UNESCO",
     "significato": "ONU per l'educazione, la scienza e la cultura",
     "d": 2
    },
    {
     "name": "UNICEF",
     "significato": "Fondo delle Nazioni Unite per l'infanzia",
     "d": 2
    },
    {
     "name": "FMI",
     "significato": "Fondo Monetario Internazionale",
     "d": 2
    },
    {
     "name": "WWF",
     "significato": "Fondo mondiale per la natura",
     "d": 1
    },
    {
     "name": "NASA",
     "significato": "National Aeronautics and Space Administration",
     "d": 2
    },
    {
     "name": "ESA",
     "significato": "Agenzia spaziale europea",
     "d": 2
    },
    {
     "name": "FBI",
     "significato": "Federal Bureau of Investigation",
     "d": 1
    },
    {
     "name": "CIA",
     "significato": "Central Intelligence Agency",
     "d": 1
    },
    {
     "name": "OPEC",
     "significato": "Organizzazione dei Paesi esportatori di petrolio",
     "d": 3
    },
    {
     "name": "BCE",
     "significato": "Banca Centrale Europea",
     "d": 1
    },
    {
     "name": "FIFA",
     "significato": "Federazione internazionale di calcio",
     "d": 1
    },
    {
     "name": "UEFA",
     "significato": "Unione delle federazioni calcistiche europee",
     "d": 2
    },
    {
     "name": "CIO",
     "significato": "Comitato Internazionale Olimpico",
     "d": 2
    },
    {
     "name": "NBA",
     "significato": "National Basketball Association",
     "d": 1
    },
    {
     "name": "BBC",
     "significato": "British Broadcasting Corporation",
     "d": 1
    },
    {
     "name": "CNN",
     "significato": "Cable News Network",
     "d": 1
    },
    {
     "name": "USA",
     "significato": "Stati Uniti d'America",
     "d": 1
    },
    {
     "name": "URSS",
     "significato": "Unione delle Repubbliche Socialiste Sovietiche",
     "d": 2
    },
    {
     "name": "BMW",
     "significato": "Bayerische Motoren Werke",
     "d": 2
    },
    {
     "name": "IBAN",
     "significato": "International Bank Account Number",
     "d": 2
    },
    {
     "name": "PIN",
     "significato": "Personal Identification Number",
     "d": 1
    },
    {
     "name": "SMS",
     "significato": "Short Message Service",
     "d": 1
    },
    {
     "name": "PDF",
     "significato": "Portable Document Format",
     "d": 2
    },
    {
     "name": "USB",
     "significato": "Universal Serial Bus",
     "d": 1
    },
    {
     "name": "WWW",
     "significato": "World Wide Web",
     "d": 1
    },
    {
     "name": "GPS",
     "significato": "Global Positioning System",
     "d": 1
    },
    {
     "name": "LED",
     "significato": "Light Emitting Diode",
     "d": 2
    },
    {
     "name": "DNA",
     "significato": "Acido desossiribonucleico",
     "d": 1
    },
    {
     "name": "HIV",
     "significato": "Virus dell'immunodeficienza umana",
     "d": 2
    },
    {
     "name": "UFO",
     "significato": "Oggetto volante non identificato",
     "d": 1
    },
    {
     "name": "VIP",
     "significato": "Very Important Person",
     "d": 1
    },
    {
     "name": "SUV",
     "significato": "Sport Utility Vehicle",
     "d": 1
    },
    {
     "name": "DJ",
     "significato": "Disc jockey",
     "d": 1
    },
    {
     "name": "ASAP",
     "significato": "Il prima possibile",
     "d": 2
    },
    {
     "name": "ISBN",
     "significato": "International Standard Book Number",
     "d": 3
    },
    {
     "name": "IVA",
     "significato": "Imposta sul valore aggiunto",
     "d": 1
    }
   ],
   "fields": {
    "significato": {
     "ask": "Che cosa significa la sigla «{name}»?",
     "who": "Quale di queste sigle significa: {value}?",
     "tf": "La sigla «{name}» significa: {value}."
    }
   }
  },
  {
   "id": "sigleita",
   "items": [
    {
     "name": "RAI",
     "significato": "Radiotelevisione italiana",
     "d": 1
    },
    {
     "name": "ENI",
     "significato": "Ente nazionale idrocarburi",
     "d": 2
    },
    {
     "name": "FIAT",
     "significato": "Fabbrica Italiana Automobili Torino",
     "d": 1
    },
    {
     "name": "ALFA",
     "significato": "Anonima Lombarda Fabbrica Automobili",
     "d": 3
    },
    {
     "name": "ISTAT",
     "significato": "Istituto nazionale di statistica",
     "d": 2
    },
    {
     "name": "INPS",
     "significato": "Istituto nazionale della previdenza sociale",
     "d": 2
    },
    {
     "name": "ACI",
     "significato": "Automobile Club d'Italia",
     "d": 2
    },
    {
     "name": "CAI",
     "significato": "Club Alpino Italiano",
     "d": 2
    },
    {
     "name": "CONI",
     "significato": "Comitato Olimpico Nazionale Italiano",
     "d": 2
    },
    {
     "name": "ASL",
     "significato": "Azienda sanitaria locale",
     "d": 2
    },
    {
     "name": "TAR",
     "significato": "Tribunale amministrativo regionale",
     "d": 3
    },
    {
     "name": "ZTL",
     "significato": "Zona a traffico limitato",
     "d": 1
    },
    {
     "name": "SIAE",
     "significato": "Società italiana degli autori ed editori",
     "d": 2
    },
    {
     "name": "ENEL",
     "significato": "Ente nazionale per l'energia elettrica",
     "d": 2
    },
    {
     "name": "IRPEF",
     "significato": "Imposta sul reddito delle persone fisiche",
     "d": 2
    },
    {
     "name": "IMU",
     "significato": "Imposta municipale unica",
     "d": 1
    },
    {
     "name": "FS",
     "significato": "Ferrovie dello Stato",
     "d": 1
    },
    {
     "name": "DOC",
     "significato": "Denominazione di origine controllata",
     "d": 2
    },
    {
     "name": "DOP",
     "significato": "Denominazione di origine protetta",
     "d": 2
    },
    {
     "name": "IGP",
     "significato": "Indicazione geografica protetta",
     "d": 3
    },
    {
     "name": "CAP",
     "significato": "Codice di avviamento postale",
     "d": 1
    },
    {
     "name": "TAV",
     "significato": "Treno ad alta velocità",
     "d": 1
    },
    {
     "name": "ANAS",
     "significato": "Azienda nazionale autonoma delle strade",
     "d": 3
    }
   ],
   "fields": {
    "significato": {
     "ask": "Che cosa significa la sigla «{name}»?",
     "who": "Quale di queste sigle significa: {value}?",
     "tf": "La sigla «{name}» significa: {value}."
    }
   }
  },
  {
   "id": "romani",
   "items": [
    {
     "name": "4",
     "romano": "IV",
     "d": 1
    },
    {
     "name": "6",
     "romano": "VI",
     "d": 1
    },
    {
     "name": "7",
     "romano": "VII",
     "d": 1
    },
    {
     "name": "8",
     "romano": "VIII",
     "d": 1
    },
    {
     "name": "9",
     "romano": "IX",
     "d": 1
    },
    {
     "name": "11",
     "romano": "XI",
     "d": 1
    },
    {
     "name": "12",
     "romano": "XII",
     "d": 1
    },
    {
     "name": "13",
     "romano": "XIII",
     "d": 2
    },
    {
     "name": "14",
     "romano": "XIV",
     "d": 2
    },
    {
     "name": "15",
     "romano": "XV",
     "d": 2
    },
    {
     "name": "16",
     "romano": "XVI",
     "d": 2
    },
    {
     "name": "17",
     "romano": "XVII",
     "d": 2
    },
    {
     "name": "18",
     "romano": "XVIII",
     "d": 2
    },
    {
     "name": "19",
     "romano": "XIX",
     "d": 2
    },
    {
     "name": "20",
     "romano": "XX",
     "d": 2
    },
    {
     "name": "24",
     "romano": "XXIV",
     "d": 2
    },
    {
     "name": "29",
     "romano": "XXIX",
     "d": 2
    },
    {
     "name": "30",
     "romano": "XXX",
     "d": 2
    },
    {
     "name": "34",
     "romano": "XXXIV",
     "d": 2
    },
    {
     "name": "39",
     "romano": "XXXIX",
     "d": 2
    },
    {
     "name": "40",
     "romano": "XL",
     "d": 2
    },
    {
     "name": "44",
     "romano": "XLIV",
     "d": 2
    },
    {
     "name": "49",
     "romano": "XLIX",
     "d": 2
    },
    {
     "name": "50",
     "romano": "L",
     "d": 2
    },
    {
     "name": "54",
     "romano": "LIV",
     "d": 3
    },
    {
     "name": "59",
     "romano": "LIX",
     "d": 3
    },
    {
     "name": "60",
     "romano": "LX",
     "d": 3
    },
    {
     "name": "64",
     "romano": "LXIV",
     "d": 3
    },
    {
     "name": "69",
     "romano": "LXIX",
     "d": 3
    },
    {
     "name": "70",
     "romano": "LXX",
     "d": 3
    },
    {
     "name": "74",
     "romano": "LXXIV",
     "d": 3
    },
    {
     "name": "79",
     "romano": "LXXIX",
     "d": 3
    },
    {
     "name": "80",
     "romano": "LXXX",
     "d": 3
    },
    {
     "name": "84",
     "romano": "LXXXIV",
     "d": 3
    },
    {
     "name": "89",
     "romano": "LXXXIX",
     "d": 3
    },
    {
     "name": "90",
     "romano": "XC",
     "d": 3
    },
    {
     "name": "94",
     "romano": "XCIV",
     "d": 3
    },
    {
     "name": "99",
     "romano": "XCIX",
     "d": 3
    },
    {
     "name": "100",
     "romano": "C",
     "d": 3
    },
    {
     "name": "150",
     "romano": "CL",
     "d": 3
    },
    {
     "name": "200",
     "romano": "CC",
     "d": 3
    },
    {
     "name": "400",
     "romano": "CD",
     "d": 3
    },
    {
     "name": "500",
     "romano": "D",
     "d": 3
    },
    {
     "name": "900",
     "romano": "CM",
     "d": 3
    },
    {
     "name": "1000",
     "romano": "M",
     "d": 3
    },
    {
     "name": "1500",
     "romano": "MD",
     "d": 3
    },
    {
     "name": "1900",
     "romano": "MCM",
     "d": 3
    },
    {
     "name": "1999",
     "romano": "MCMXCIX",
     "d": 3
    },
    {
     "name": "2000",
     "romano": "MM",
     "d": 3
    },
    {
     "name": "2024",
     "romano": "MMXXIV",
     "d": 3
    }
   ],
   "fields": {
    "romano": {
     "ask": "Come si scrive il numero {name} in numeri romani?",
     "who": "Quale di questi numeri si scrive {value} in numeri romani?",
     "tf": "In numeri romani il numero {name} si scrive {value}.",
     "typed": true
    }
   }
  },
  {
   "id": "romanilettura",
   "items": [
    {
     "name": "IV",
     "numero": "4",
     "d": 1
    },
    {
     "name": "VI",
     "numero": "6",
     "d": 1
    },
    {
     "name": "VII",
     "numero": "7",
     "d": 1
    },
    {
     "name": "VIII",
     "numero": "8",
     "d": 1
    },
    {
     "name": "IX",
     "numero": "9",
     "d": 1
    },
    {
     "name": "XI",
     "numero": "11",
     "d": 1
    },
    {
     "name": "XII",
     "numero": "12",
     "d": 1
    },
    {
     "name": "XIII",
     "numero": "13",
     "d": 2
    },
    {
     "name": "XIV",
     "numero": "14",
     "d": 2
    },
    {
     "name": "XV",
     "numero": "15",
     "d": 2
    },
    {
     "name": "XVI",
     "numero": "16",
     "d": 2
    },
    {
     "name": "XVII",
     "numero": "17",
     "d": 2
    },
    {
     "name": "XVIII",
     "numero": "18",
     "d": 2
    },
    {
     "name": "XIX",
     "numero": "19",
     "d": 2
    },
    {
     "name": "XX",
     "numero": "20",
     "d": 2
    },
    {
     "name": "XXIV",
     "numero": "24",
     "d": 2
    },
    {
     "name": "XXIX",
     "numero": "29",
     "d": 2
    },
    {
     "name": "XXX",
     "numero": "30",
     "d": 2
    },
    {
     "name": "XXXIV",
     "numero": "34",
     "d": 2
    },
    {
     "name": "XXXIX",
     "numero": "39",
     "d": 2
    },
    {
     "name": "XL",
     "numero": "40",
     "d": 2
    },
    {
     "name": "XLIV",
     "numero": "44",
     "d": 2
    },
    {
     "name": "XLIX",
     "numero": "49",
     "d": 2
    },
    {
     "name": "L",
     "numero": "50",
     "d": 2
    },
    {
     "name": "LIV",
     "numero": "54",
     "d": 3
    },
    {
     "name": "LIX",
     "numero": "59",
     "d": 3
    },
    {
     "name": "LX",
     "numero": "60",
     "d": 3
    },
    {
     "name": "LXIV",
     "numero": "64",
     "d": 3
    },
    {
     "name": "LXIX",
     "numero": "69",
     "d": 3
    },
    {
     "name": "LXX",
     "numero": "70",
     "d": 3
    },
    {
     "name": "LXXIV",
     "numero": "74",
     "d": 3
    },
    {
     "name": "LXXIX",
     "numero": "79",
     "d": 3
    },
    {
     "name": "LXXX",
     "numero": "80",
     "d": 3
    },
    {
     "name": "LXXXIV",
     "numero": "84",
     "d": 3
    },
    {
     "name": "LXXXIX",
     "numero": "89",
     "d": 3
    },
    {
     "name": "XC",
     "numero": "90",
     "d": 3
    },
    {
     "name": "XCIV",
     "numero": "94",
     "d": 3
    },
    {
     "name": "XCIX",
     "numero": "99",
     "d": 3
    },
    {
     "name": "C",
     "numero": "100",
     "d": 3
    },
    {
     "name": "CL",
     "numero": "150",
     "d": 3
    },
    {
     "name": "CC",
     "numero": "200",
     "d": 3
    },
    {
     "name": "CD",
     "numero": "400",
     "d": 3
    },
    {
     "name": "D",
     "numero": "500",
     "d": 3
    },
    {
     "name": "CM",
     "numero": "900",
     "d": 3
    },
    {
     "name": "M",
     "numero": "1000",
     "d": 3
    },
    {
     "name": "MD",
     "numero": "1500",
     "d": 3
    },
    {
     "name": "MCM",
     "numero": "1900",
     "d": 3
    },
    {
     "name": "MCMXCIX",
     "numero": "1999",
     "d": 3
    },
    {
     "name": "MM",
     "numero": "2000",
     "d": 3
    },
    {
     "name": "MMXXIV",
     "numero": "2024",
     "d": 3
    }
   ],
   "fields": {
    "numero": {
     "ask": "Quale numero indica il numero romano «{name}»?",
     "who": "Quale di questi numeri romani indica il numero {value}?",
     "tf": "Il numero romano «{name}» indica il numero {value}.",
     "typed": true
    }
   }
  },
  {
   "id": "quantip",
   "items": [
    {
     "name": "i lati di un pentagono",
     "n": 5,
     "d": 1
    },
    {
     "name": "i lati di un esagono",
     "n": 6,
     "d": 1
    },
    {
     "name": "i lati di un ettagono",
     "n": 7,
     "d": 2
    },
    {
     "name": "i lati di un ottagono",
     "n": 8,
     "d": 1
    },
    {
     "name": "i lati di un decagono",
     "n": 10,
     "d": 2
    },
    {
     "name": "le facce di un cubo",
     "n": 6,
     "d": 1
    },
    {
     "name": "gli spigoli di un cubo",
     "n": 12,
     "d": 2
    },
    {
     "name": "i vertici di un cubo",
     "n": 8,
     "d": 2
    },
    {
     "name": "le zampe di un ragno",
     "n": 8,
     "d": 1
    },
    {
     "name": "le zampe di un'ape",
     "n": 6,
     "d": 1
    },
    {
     "name": "le braccia di un polpo",
     "n": 8,
     "d": 1
    },
    {
     "name": "i cuori di un polpo",
     "n": 3,
     "d": 3
    },
    {
     "name": "le corde di una chitarra classica",
     "n": 6,
     "d": 1
    },
    {
     "name": "le corde di un violino",
     "n": 4,
     "d": 2
    },
    {
     "name": "i tasti bianchi di un'ottava del pianoforte",
     "n": 7,
     "d": 2
    },
    {
     "name": "i tasti neri di un'ottava del pianoforte",
     "n": 5,
     "d": 2
    },
    {
     "name": "i colori dell'arcobaleno",
     "n": 7,
     "d": 1
    },
    {
     "name": "i cerchi della bandiera olimpica",
     "n": 5,
     "d": 1
    },
    {
     "name": "i pianeti del Sistema solare",
     "n": 8,
     "d": 1
    },
    {
     "name": "gli apostoli di Gesù",
     "n": 12,
     "d": 1
    },
    {
     "name": "i Re Magi della tradizione",
     "n": 3,
     "d": 1
    },
    {
     "name": "i peccati capitali",
     "n": 7,
     "d": 1
    },
    {
     "name": "i comandamenti",
     "n": 10,
     "d": 1
    },
    {
     "name": "le mogli di Enrico VIII",
     "n": 6,
     "d": 3
    },
    {
     "name": "le strisce della bandiera degli Stati Uniti",
     "n": 13,
     "d": 3
    },
    {
     "name": "le caselle di un tris (tic-tac-toe)",
     "n": 9,
     "d": 1
    },
    {
     "name": "i birilli del bowling",
     "n": 10,
     "d": 1
    },
    {
     "name": "i giocatori in campo per squadra nella pallavolo",
     "n": 6,
     "d": 1
    }
   ],
   "fields": {},
   "numeric": {
    "n": {
     "ask": "Indovina il numero: {name}.",
     "span": 16,
     "tol": 0,
     "unit": "",
     "duel": "Quale delle due ha il numero più alto?",
     "lowerWins": false,
     "order": "Metti in ordine, dal numero più alto",
     "gap": 1
    }
   }
  },
  {
   "id": "quantig",
   "items": [
    {
     "name": "i punti totali sulle sei facce di un dado",
     "n": 21,
     "d": 3
    },
    {
     "name": "i denti di un adulto",
     "n": 32,
     "d": 2
    },
    {
     "name": "le ossa di un adulto",
     "n": 206,
     "d": 3
    },
    {
     "name": "i tasti di un pianoforte",
     "n": 88,
     "d": 2
    },
    {
     "name": "gli Stati degli USA",
     "n": 50,
     "d": 1
    },
    {
     "name": "le regioni italiane",
     "n": 20,
     "d": 1
    },
    {
     "name": "le lettere dell'alfabeto greco",
     "n": 24,
     "d": 2
    },
    {
     "name": "le caselle di una scacchiera",
     "n": 64,
     "d": 1
    },
    {
     "name": "i pezzi di un set di scacchi",
     "n": 32,
     "d": 1
    },
    {
     "name": "le carte dei tarocchi",
     "n": 78,
     "d": 3
    },
    {
     "name": "i numeri sulla ruota della roulette europea (zero compreso)",
     "n": 37,
     "d": 2
    },
    {
     "name": "le caselle del Monopoly",
     "n": 40,
     "d": 2
    },
    {
     "name": "le carte del gioco Uno",
     "n": 108,
     "d": 3
    },
    {
     "name": "le tessere del Rummikub",
     "n": 106,
     "d": 3
    },
    {
     "name": "le carte di un mazzo di Burraco (due mazzi e quattro jolly)",
     "n": 108,
     "d": 3
    },
    {
     "name": "le carte del Dobble",
     "n": 55,
     "d": 3
    },
    {
     "name": "i numeri del sacchetto della tombola",
     "n": 90,
     "d": 1
    },
    {
     "name": "i numeri di una cartella della tombola",
     "n": 15,
     "d": 2
    },
    {
     "name": "i Paesi membri dell'Unione europea nel 2024",
     "n": 27,
     "d": 2
    },
    {
     "name": "i deputati della Camera dopo la riforma del 2020",
     "n": 400,
     "d": 3
    },
    {
     "name": "gli anni che separano due giubilei ordinari",
     "n": 25,
     "d": 2
    }
   ],
   "fields": {},
   "numeric": {
    "n": {
     "ask": "Indovina il numero: {name}.",
     "span": 150,
     "tol": 3,
     "unit": "",
     "duel": "Quale delle due ha il numero più alto?",
     "lowerWins": false,
     "order": "Metti in ordine, dal numero più alto",
     "gap": 8
    }
   }
  }
 ],
 "emojis": [
  {
   "emoji": "🎅🎄🎁",
   "answer": "Natale",
   "d": 1
  },
  {
   "emoji": "🐰🥚🌷",
   "answer": "Pasqua",
   "d": 1
  },
  {
   "emoji": "🎃👻🦇",
   "answer": "Halloween",
   "d": 1
  },
  {
   "emoji": "💘🌹🍫",
   "answer": "San Valentino",
   "d": 1
  },
  {
   "emoji": "🎆🥂🕛",
   "answer": "Capodanno",
   "d": 1
  },
  {
   "emoji": "🧙‍♀️🧹🧦",
   "answer": "Befana",
   "d": 1
  },
  {
   "emoji": "🎂🕯️🎈",
   "answer": "Compleanno",
   "d": 1
  },
  {
   "emoji": "👰🤵💍",
   "answer": "Matrimonio",
   "d": 1
  },
  {
   "emoji": "🦃🍂🙏",
   "answer": "Ringraziamento",
   "d": 2
  },
  {
   "emoji": "🏖️☀️🍉",
   "answer": "Ferragosto",
   "d": 2
  },
  {
   "emoji": "🎭🎊🍩",
   "answer": "Carnevale",
   "d": 1
  },
  {
   "emoji": "🌼💐👩",
   "answer": "Festa della Donna",
   "d": 2
  },
  {
   "emoji": "🏮🧧🐉",
   "answer": "Capodanno cinese",
   "d": 2
  },
  {
   "emoji": "🌙⭐🕌",
   "answer": "Ramadan",
   "d": 2
  },
  {
   "emoji": "🪔✨🇮🇳",
   "answer": "Diwali",
   "d": 3
  },
  {
   "emoji": "🕎",
   "answer": "Hanukkah",
   "d": 3
  },
  {
   "emoji": "🐈‍⬛",
   "answer": "Gatto nero",
   "d": 1
  },
  {
   "emoji": "🪞🔨",
   "answer": "Specchio rotto",
   "d": 2
  },
  {
   "emoji": "🪜🚶",
   "answer": "Passare sotto una scala",
   "d": 2
  },
  {
   "emoji": "🍀",
   "answer": "Quadrifoglio",
   "d": 1
  },
  {
   "emoji": "🧂💧",
   "answer": "Sale versato",
   "d": 2
  },
  {
   "emoji": "🍺🥨🇩🇪",
   "answer": "Oktoberfest",
   "d": 2
  }
 ],
 "emojiText": "Quale festa, tradizione o superstizione raccontano queste emoji?",
 "order": [
  {
   "q": "Metti in ordine i segni zodiacali, a partire dall'Ariete",
   "items": [
    "Ariete",
    "Toro",
    "Gemelli",
    "Cancro"
   ],
   "d": 1
  },
  {
   "q": "Metti in ordine questi segni zodiacali, a partire dal Leone",
   "items": [
    "Leone",
    "Vergine",
    "Bilancia",
    "Scorpione"
   ],
   "d": 2
  },
  {
   "q": "Metti in ordine questi segni zodiacali, a partire dal Sagittario",
   "items": [
    "Sagittario",
    "Capricorno",
    "Acquario",
    "Pesci"
   ],
   "d": 2
  },
  {
   "q": "Metti in ordine gli animali dello zodiaco cinese, dal primo",
   "items": [
    "Topo",
    "Bue",
    "Tigre",
    "Coniglio",
    "Drago"
   ],
   "d": 3
  },
  {
   "q": "Metti in ordine gli animali dello zodiaco cinese, a partire dal Serpente",
   "items": [
    "Serpente",
    "Cavallo",
    "Capra",
    "Scimmia",
    "Gallo"
   ],
   "d": 3
  },
  {
   "q": "Metti in ordine le nozze, dalle prime a essere festeggiate",
   "items": [
    "Nozze di legno",
    "Nozze di cristallo",
    "Nozze d'argento",
    "Nozze d'oro"
   ],
   "d": 2
  },
  {
   "q": "Metti in ordine le nozze, dalle prime a essere festeggiate",
   "items": [
    "Nozze di stagno",
    "Nozze di porcellana",
    "Nozze di perla",
    "Nozze di rubino",
    "Nozze di diamante"
   ],
   "d": 3
  },
  {
   "q": "Metti in ordine cronologico queste ricorrenze, da inizio anno",
   "items": [
    "San Valentino",
    "Festa della Liberazione",
    "Festa dei Lavoratori",
    "Halloween",
    "Santo Stefano"
   ],
   "d": 1
  },
  {
   "q": "Metti in ordine cronologico queste ricorrenze, da inizio anno",
   "items": [
    "Epifania",
    "Festa della Donna",
    "Festa della Repubblica",
    "Ferragosto",
    "Ognissanti"
   ],
   "d": 2
  },
  {
   "q": "Metti in ordine cronologico queste ricorrenze, da inizio anno",
   "items": [
    "Capodanno",
    "San Valentino",
    "Festa del Papà",
    "Pesce d'aprile"
   ],
   "d": 2
  },
  {
   "q": "Metti in ordine cronologico queste ricorrenze, da inizio anno",
   "items": [
    "Giorno della Memoria",
    "San Valentino",
    "Festa della Donna",
    "Festa della Liberazione"
   ],
   "d": 2
  },
  {
   "q": "Metti in ordine cronologico queste ricorrenze, da inizio anno",
   "items": [
    "Notte di San Lorenzo",
    "Ferragosto",
    "San Michele Arcangelo",
    "Ognissanti"
   ],
   "d": 3
  },
  {
   "q": "Metti in ordine i numeri romani, dal più piccolo",
   "items": [
    "IV",
    "IX",
    "XL",
    "C",
    "D",
    "M"
   ],
   "d": 2
  },
  {
   "q": "Metti in ordine i numeri romani, dal più piccolo",
   "items": [
    "XIV",
    "XIX",
    "XXIV",
    "XLIV",
    "LIX"
   ],
   "d": 3
  },
  {
   "q": "Metti in ordine i numeri romani, dal più piccolo",
   "items": [
    "VI",
    "XI",
    "XV",
    "XX",
    "L"
   ],
   "d": 2
  },
  {
   "q": "Metti in ordine queste unità di lunghezza, dalla più piccola",
   "items": [
    "Millimetro",
    "Centimetro",
    "Decimetro",
    "Metro",
    "Chilometro"
   ],
   "d": 1
  },
  {
   "q": "Metti in ordine queste unità di massa, dalla più piccola",
   "items": [
    "Grammo",
    "Etto",
    "Chilogrammo",
    "Quintale",
    "Tonnellata"
   ],
   "d": 1
  },
  {
   "q": "Metti in ordine queste unità di tempo, dalla più breve",
   "items": [
    "Secondo",
    "Minuto",
    "Ora",
    "Giorno",
    "Settimana"
   ],
   "d": 1
  },
  {
   "q": "Metti in ordine queste unità informatiche, dalla più piccola",
   "items": [
    "Byte",
    "Kilobyte",
    "Megabyte",
    "Gigabyte",
    "Terabyte"
   ],
   "d": 1
  },
  {
   "q": "Metti in ordine queste unità di capacità, dalla più piccola",
   "items": [
    "Millilitro",
    "Centilitro",
    "Decilitro",
    "Litro",
    "Ettolitro"
   ],
   "d": 2
  },
  {
   "q": "Metti in ordine questi prefissi, dal più piccolo al più grande",
   "items": [
    "Micro",
    "Milli",
    "Centi",
    "Chilo",
    "Mega"
   ],
   "d": 3
  },
  {
   "q": "Metti in ordine queste frazioni decimali, dalla più grande",
   "items": [
    "Decimo",
    "Centesimo",
    "Millesimo",
    "Milionesimo"
   ],
   "d": 2
  },
  {
   "q": "Metti in ordine le età della vita, dalla prima",
   "items": [
    "Neonato",
    "Bambino",
    "Adolescente",
    "Adulto",
    "Anziano"
   ],
   "d": 1
  },
  {
   "q": "Metti in ordine le portate di un pranzo all'italiana",
   "items": [
    "Antipasto",
    "Primo",
    "Secondo",
    "Dolce",
    "Caffè"
   ],
   "d": 1
  },
  {
   "q": "Metti in ordine i momenti della giornata, dall'alba",
   "items": [
    "Alba",
    "Mattina",
    "Mezzogiorno",
    "Pomeriggio",
    "Sera",
    "Notte"
   ],
   "d": 1
  },
  {
   "q": "Metti in ordine i pasti della giornata, dal primo",
   "items": [
    "Colazione",
    "Pranzo",
    "Merenda",
    "Cena"
   ],
   "d": 1
  },
  {
   "q": "Metti in ordine questi titoli nobiliari, dal più alto",
   "items": [
    "Duca",
    "Marchese",
    "Conte",
    "Visconte",
    "Barone"
   ],
   "d": 3
  },
  {
   "q": "Metti in ordine questi poligoni, da quello con meno lati",
   "items": [
    "Triangolo",
    "Quadrato",
    "Pentagono",
    "Esagono",
    "Ottagono"
   ],
   "d": 1
  },
  {
   "q": "Metti in ordine questi pezzi degli scacchi, dal valore convenzionale più basso",
   "items": [
    "Pedone",
    "Cavallo",
    "Torre",
    "Regina"
   ],
   "d": 2
  },
  {
   "q": "Metti in ordine queste combinazioni del poker, dalla più debole",
   "items": [
    "Coppia",
    "Tris",
    "Scala",
    "Colore",
    "Full"
   ],
   "d": 3
  },
  {
   "q": "Metti in ordine i gradi di istruzione, dal primo",
   "items": [
    "Scuola dell'infanzia",
    "Scuola primaria",
    "Scuola secondaria di primo grado",
    "Scuola secondaria di secondo grado",
    "Università"
   ],
   "d": 1
  },
  {
   "q": "Metti in ordine i titoli di studio universitari, dal primo",
   "items": [
    "Laurea triennale",
    "Laurea magistrale",
    "Dottorato di ricerca"
   ],
   "d": 2
  }
 ],
 "numbers": [
  {
   "q": "Quanti giorni ha un anno non bisestile?",
   "v": 365,
   "min": 300,
   "max": 400,
   "tol": 0,
   "unit": "giorni",
   "d": 1
  },
  {
   "q": "Quante ore ci sono in un giorno?",
   "v": 24,
   "min": 0,
   "max": 48,
   "tol": 0,
   "unit": "ore",
   "d": 1
  },
  {
   "q": "Quanti secondi ci sono in un minuto?",
   "v": 60,
   "min": 0,
   "max": 120,
   "tol": 0,
   "unit": "secondi",
   "d": 1
  },
  {
   "q": "Quanti minuti ci sono in un giorno?",
   "v": 1440,
   "min": 1000,
   "max": 2000,
   "tol": 20,
   "unit": "minuti",
   "d": 2
  },
  {
   "q": "Quanti mesi dell'anno hanno 31 giorni?",
   "v": 7,
   "min": 0,
   "max": 12,
   "tol": 0,
   "unit": "mesi",
   "d": 1
  },
  {
   "q": "Quanti mesi dell'anno hanno 30 giorni?",
   "v": 4,
   "min": 0,
   "max": 12,
   "tol": 0,
   "unit": "mesi",
   "d": 2
  },
  {
   "q": "Quanti metri ci sono in un chilometro?",
   "v": 1000,
   "min": 0,
   "max": 2000,
   "tol": 0,
   "unit": "metri",
   "d": 1
  },
  {
   "q": "Quanti centimetri ci sono in un metro?",
   "v": 100,
   "min": 0,
   "max": 200,
   "tol": 0,
   "unit": "centimetri",
   "d": 1
  },
  {
   "q": "Quanti grammi ci sono in un chilogrammo?",
   "v": 1000,
   "min": 0,
   "max": 2000,
   "tol": 0,
   "unit": "grammi",
   "d": 1
  },
  {
   "q": "Quanti millilitri ci sono in un litro?",
   "v": 1000,
   "min": 0,
   "max": 2000,
   "tol": 0,
   "unit": "millilitri",
   "d": 1
  },
  {
   "q": "Quanti litri ci sono in un metro cubo?",
   "v": 1000,
   "min": 0,
   "max": 2000,
   "tol": 0,
   "unit": "litri",
   "d": 2
  },
  {
   "q": "Quanti metri quadrati ci sono in un ettaro?",
   "v": 10000,
   "min": 0,
   "max": 20000,
   "tol": 0,
   "unit": "metri quadrati",
   "d": 2
  },
  {
   "q": "Quanti metri è lungo un miglio nautico?",
   "v": 1852,
   "min": 1000,
   "max": 2500,
   "tol": 20,
   "unit": "metri",
   "d": 3
  },
  {
   "q": "Quanti grammi pesa circa una libbra?",
   "v": 454,
   "min": 200,
   "max": 800,
   "tol": 40,
   "unit": "grammi",
   "d": 2
  },
  {
   "q": "Qual è la temperatura di ebollizione dell'acqua a livello del mare?",
   "v": 100,
   "min": 0,
   "max": 200,
   "tol": 0,
   "unit": "°C",
   "d": 1
  },
  {
   "q": "A quanti gradi Fahrenheit bolle l'acqua a livello del mare?",
   "v": 212,
   "min": 100,
   "max": 300,
   "tol": 5,
   "unit": "°F",
   "d": 2
  },
  {
   "q": "Quanti gradi ha un angolo giro?",
   "v": 360,
   "min": 0,
   "max": 720,
   "tol": 0,
   "unit": "gradi",
   "d": 1
  },
  {
   "q": "Quanti gradi ha la somma degli angoli interni di un triangolo?",
   "v": 180,
   "min": 0,
   "max": 360,
   "tol": 0,
   "unit": "gradi",
   "d": 1
  },
  {
   "q": "Quanti gradi di longitudine corrispondono a un fuso orario?",
   "v": 15,
   "min": 0,
   "max": 60,
   "tol": 0,
   "unit": "gradi",
   "d": 3
  },
  {
   "q": "Quanti anni dura il mandato del Presidente della Repubblica italiana?",
   "v": 7,
   "min": 0,
   "max": 15,
   "tol": 0,
   "unit": "anni",
   "d": 2
  },
  {
   "q": "Quanti sono i senatori elettivi dopo la riforma del 2020?",
   "v": 200,
   "min": 100,
   "max": 400,
   "tol": 10,
   "unit": "senatori",
   "d": 3
  },
  {
   "q": "Qual è l'età minima per essere eletti Presidente della Repubblica italiana?",
   "v": 50,
   "min": 30,
   "max": 70,
   "tol": 0,
   "unit": "anni",
   "d": 2
  },
  {
   "q": "A quale età in Italia si può prendere la patente B?",
   "v": 18,
   "min": 14,
   "max": 25,
   "tol": 0,
   "unit": "anni",
   "d": 1
  },
  {
   "q": "Quanti Paesi membri ha l'ONU?",
   "v": 193,
   "min": 100,
   "max": 250,
   "tol": 5,
   "unit": "Paesi",
   "d": 3
  },
  {
   "q": "Quanti sono i colori dell'arcobaleno?",
   "v": 7,
   "min": 0,
   "max": 12,
   "tol": 0,
   "unit": "colori",
   "d": 1
  },
  {
   "q": "Quante monete diverse ha l'euro?",
   "v": 8,
   "min": 0,
   "max": 15,
   "tol": 0,
   "unit": "monete",
   "d": 2
  },
  {
   "q": "Quanti giorni dura la Quaresima?",
   "v": 40,
   "min": 10,
   "max": 70,
   "tol": 0,
   "unit": "giorni",
   "d": 2
  },
  {
   "q": "Quante sono le piaghe d'Egitto?",
   "v": 10,
   "min": 0,
   "max": 20,
   "tol": 0,
   "unit": "piaghe",
   "d": 3
  },
  {
   "q": "Quante sono le stazioni della Via Crucis?",
   "v": 14,
   "min": 5,
   "max": 25,
   "tol": 0,
   "unit": "stazioni",
   "d": 3
  },
  {
   "q": "Quanti mesi dura, in media, una gravidanza?",
   "v": 9,
   "min": 0,
   "max": 18,
   "tol": 0,
   "unit": "mesi",
   "d": 1
  },
  {
   "q": "Quante carte riceve ciascun giocatore a ogni mano di Scopa?",
   "v": 3,
   "min": 0,
   "max": 10,
   "tol": 0,
   "unit": "carte",
   "d": 2
  },
  {
   "q": "Quanti sono i segni dello zodiaco cinese?",
   "v": 12,
   "min": 0,
   "max": 24,
   "tol": 0,
   "unit": "segni",
   "d": 2
  },
  {
   "q": "Quante settimane dura, in media, una gravidanza?",
   "v": 40,
   "min": 20,
   "max": 60,
   "tol": 2,
   "unit": "settimane",
   "d": 2
  }
 ],
 "typed": [
  {
   "q": "Quale gioco di carte napoletane ha il «settebello»?",
   "a": "Scopa",
   "d": 1
  },
  {
   "q": "Come si chiama l'unità di misura della potenza elettrica?",
   "a": "Watt",
   "d": 1
  },
  {
   "q": "Come si chiama l'unità di misura della frequenza?",
   "a": "Hertz",
   "accept": [
    "Hz"
   ],
   "d": 2
  },
  {
   "q": "Come si chiama l'unità di misura della forza?",
   "a": "Newton",
   "d": 2
  },
  {
   "q": "Come si chiama l'unità di misura della corrente elettrica?",
   "a": "Ampere",
   "d": 2
  },
  {
   "q": "Come si chiama l'unità di misura della resistenza elettrica?",
   "a": "Ohm",
   "d": 2
  },
  {
   "q": "Quale unità di misura si usa per l'intensità del suono?",
   "a": "Decibel",
   "accept": [
    "dB"
   ],
   "d": 2
  },
  {
   "q": "Come si chiama la moneta del Giappone?",
   "a": "Yen",
   "d": 1
  },
  {
   "q": "Come si chiama la moneta del Regno Unito?",
   "a": "Sterlina",
   "accept": [
    "Pound",
    "Lira sterlina",
    "Sterlina britannica"
   ],
   "d": 1
  },
  {
   "q": "Come si chiama il simbolo # in italiano?",
   "a": "Cancelletto",
   "d": 1
  },
  {
   "q": "Come si chiama il simbolo @ in italiano?",
   "a": "Chiocciola",
   "d": 1
  },
  {
   "q": "Come si chiama il simbolo * in italiano?",
   "a": "Asterisco",
   "d": 1
  },
  {
   "q": "Come si chiama lo scienziato che studia gli insetti?",
   "a": "Entomologo",
   "d": 2
  },
  {
   "q": "Come si chiama lo scienziato che studia gli uccelli?",
   "a": "Ornitologo",
   "d": 2
  },
  {
   "q": "Come si chiama chi raccoglie e studia i francobolli?",
   "a": "Filatelista",
   "d": 2
  },
  {
   "q": "Come si chiama chi raccoglie e studia le monete antiche?",
   "a": "Numismatico",
   "d": 2
  },
  {
   "q": "Come si chiama il medico specialista dei bambini?",
   "a": "Pediatra",
   "d": 1
  },
  {
   "q": "Come si chiama il giorno che precede il Natale?",
   "a": "Vigilia di Natale",
   "accept": [
    "Vigilia"
   ],
   "d": 1
  },
  {
   "q": "Come si chiama il dolce pasquale a forma di uccello?",
   "a": "Colomba",
   "accept": [
    "La colomba"
   ],
   "d": 1
  },
  {
   "q": "Come si chiama il gioco con 64 caselle, re, regina e pedoni?",
   "a": "Scacchi",
   "accept": [
    "Gli scacchi"
   ],
   "d": 1
  },
  {
   "q": "Quale gioco da tavolo ha le caselle «Parco della Vittoria» e «Vicolo Corto»?",
   "a": "Monopoly",
   "d": 1
  },
  {
   "q": "Quale lettera indica il numero 50 nei numeri romani?",
   "a": "L",
   "d": 1
  },
  {
   "q": "Quale lettera indica il numero 100 nei numeri romani?",
   "a": "C",
   "d": 1
  },
  {
   "q": "Quale lettera indica il numero 500 nei numeri romani?",
   "a": "D",
   "d": 1
  },
  {
   "q": "Quale lettera indica il numero 1000 nei numeri romani?",
   "a": "M",
   "d": 1
  },
  {
   "q": "Come si chiama il mese sacro del digiuno per i musulmani?",
   "a": "Ramadan",
   "d": 1
  },
  {
   "q": "Come si chiama la festa ebraica delle luci?",
   "a": "Hanukkah",
   "accept": [
    "Chanukkah",
    "Hanukka",
    "Chanukah"
   ],
   "d": 2
  },
  {
   "q": "Come si chiama la festa indiana dei colori?",
   "a": "Holi",
   "d": 2
  },
  {
   "q": "Come si chiama la festa indiana delle luci?",
   "a": "Diwali",
   "accept": [
    "Deepavali"
   ],
   "d": 2
  },
  {
   "q": "Come si chiama la lingua artificiale creata da Zamenhof?",
   "a": "Esperanto",
   "d": 2
  },
  {
   "q": "Come si chiama il sistema di scrittura in rilievo per i ciechi?",
   "a": "Braille",
   "d": 1
  },
  {
   "q": "Come si chiama il codice di punti e linee usato nella telegrafia?",
   "a": "Morse",
   "accept": [
    "Codice Morse",
    "Alfabeto Morse"
   ],
   "d": 1
  },
  {
   "q": "Come si chiama il tessuto dei jeans?",
   "a": "Denim",
   "d": 1
  },
  {
   "q": "Come si chiama la gonna maschile tradizionale scozzese?",
   "a": "Kilt",
   "d": 1
  },
  {
   "q": "Come si chiama l'abito tradizionale giapponese?",
   "a": "Kimono",
   "d": 1
  },
  {
   "q": "Come si chiama lo strumento che misura la pressione atmosferica?",
   "a": "Barometro",
   "d": 2
  },
  {
   "q": "Come si chiama lo strumento che registra i terremoti?",
   "a": "Sismografo",
   "d": 2
  },
  {
   "q": "Come si chiama chi ferra i cavalli?",
   "a": "Maniscalco",
   "d": 3
  },
  {
   "q": "Come si chiama chi guida un treno?",
   "a": "Macchinista",
   "d": 2
  },
  {
   "q": "Come si chiama chi lavora l'argilla al tornio?",
   "a": "Vasaio",
   "accept": [
    "Ceramista"
   ],
   "d": 2
  },
  {
   "q": "Come si chiama chi lavora il ferro battuto?",
   "a": "Fabbro",
   "d": 1
  },
  {
   "q": "Come si chiama il gioco da tavolo orientale con pietre bianche e nere su una griglia di 19 linee?",
   "a": "Go",
   "d": 3
  },
  {
   "q": "Come si chiama l'ultimo giorno di Carnevale prima delle Ceneri?",
   "a": "Martedì grasso",
   "d": 1
  },
  {
   "q": "Come si chiama il periodo di preparazione al Natale di quattro settimane?",
   "a": "Avvento",
   "d": 2
  },
  {
   "q": "Come si chiama il periodo di quaranta giorni che precede la Pasqua?",
   "a": "Quaresima",
   "d": 2
  },
  {
   "q": "Come si chiama la Pasqua ebraica?",
   "a": "Pesach",
   "accept": [
    "Pasqua ebraica"
   ],
   "d": 2
  },
  {
   "q": "Quale segno zodiacale ha come simbolo una capra con la coda di pesce?",
   "a": "Capricorno",
   "d": 2
  },
  {
   "q": "Quale festa si celebra il 14 febbraio?",
   "a": "San Valentino",
   "d": 1
  }
 ]
});
})(typeof window !== 'undefined' ? window : globalThis);
