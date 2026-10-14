// Dati di geografia. Formato compatto: una riga per voce, campi separati da «|».
// d = difficoltà (1 facile, 2 media, 3 difficile).
(function (root) {
  'use strict';
  const D = (root.QZ_DATA = root.QZ_DATA || {});
  const rows = (text) => text.trim().split('\n').map((l) => l.trim()).filter((l) => l && !l.startsWith('#')).map((l) => l.split('|'));

  // Paese | Capitale | Continente | codice ISO (bandiera) | difficoltà | flag opzionale «nocap» (capitale da non chiedere)
  D.countries = rows(`
Albania|Tirana|EU|al|2
Andorra|Andorra la Vella|EU|ad|2
Austria|Vienna|EU|at|1
Belgio|Bruxelles|EU|be|1
Bielorussia|Minsk|EU|by|2
Bosnia ed Erzegovina|Sarajevo|EU|ba|2
Bulgaria|Sofia|EU|bg|2
Cipro|Nicosia|EU|cy|2
Croazia|Zagabria|EU|hr|2
Danimarca|Copenaghen|EU|dk|1
Estonia|Tallinn|EU|ee|2
Finlandia|Helsinki|EU|fi|1
Francia|Parigi|EU|fr|1
Germania|Berlino|EU|de|1
Grecia|Atene|EU|gr|1
Irlanda|Dublino|EU|ie|1
Islanda|Reykjavík|EU|is|2
Italia|Roma|EU|it|1
Kosovo|Pristina|EU|xk|3
Lettonia|Riga|EU|lv|2
Liechtenstein|Vaduz|EU|li|3
Lituania|Vilnius|EU|lt|2
Lussemburgo|Lussemburgo|EU|lu|2
Macedonia del Nord|Skopje|EU|mk|3
Malta|La Valletta|EU|mt|2
Moldavia|Chișinău|EU|md|3
Monaco|Monaco|EU|mc|2
Montenegro|Podgorica|EU|me|3
Norvegia|Oslo|EU|no|1
Paesi Bassi|Amsterdam|EU|nl|1
Polonia|Varsavia|EU|pl|1
Portogallo|Lisbona|EU|pt|1
Regno Unito|Londra|EU|gb|1
Repubblica Ceca|Praga|EU|cz|1
Romania|Bucarest|EU|ro|2
Russia|Mosca|EU|ru|1
San Marino|San Marino|EU|sm|1
Serbia|Belgrado|EU|rs|2
Slovacchia|Bratislava|EU|sk|2
Slovenia|Lubiana|EU|si|2
Spagna|Madrid|EU|es|1
Svezia|Stoccolma|EU|se|1
Svizzera|Berna|EU|ch|1
Ucraina|Kiev|EU|ua|1
Ungheria|Budapest|EU|hu|1
Città del Vaticano|Città del Vaticano|EU|va|1
Afghanistan|Kabul|AS|af|2
Arabia Saudita|Riad|AS|sa|2
Armenia|Erevan|AS|am|3
Azerbaigian|Baku|AS|az|3
Bahrein|Manama|AS|bh|3
Bangladesh|Dacca|AS|bd|3
Bhutan|Thimphu|AS|bt|3
Brunei|Bandar Seri Begawan|AS|bn|3
Cambogia|Phnom Penh|AS|kh|3
Cina|Pechino|AS|cn|1
Corea del Nord|Pyongyang|AS|kp|2
Corea del Sud|Seul|AS|kr|1
Emirati Arabi Uniti|Abu Dhabi|AS|ae|2
Filippine|Manila|AS|ph|2
Georgia|Tbilisi|AS|ge|3
Giappone|Tokyo|AS|jp|1
Giordania|Amman|AS|jo|2
India|Nuova Delhi|AS|in|1
Indonesia|Giacarta|AS|id|2|nocap
Iran|Teheran|AS|ir|2
Iraq|Baghdad|AS|iq|2
Israele|Gerusalemme|AS|il|2|nocap
Kazakistan|Astana|AS|kz|3
Kirghizistan|Biškek|AS|kg|3
Kuwait|Kuwait|AS|kw|3
Laos|Vientiane|AS|la|3
Libano|Beirut|AS|lb|2
Malaysia|Kuala Lumpur|AS|my|2
Maldive|Malé|AS|mv|3
Mongolia|Ulan Bator|AS|mn|3
Myanmar|Naypyidaw|AS|mm|3
Nepal|Katmandu|AS|np|2
Oman|Mascate|AS|om|3
Pakistan|Islamabad|AS|pk|2
Qatar|Doha|AS|qa|2
Singapore|Singapore|AS|sg|2
Siria|Damasco|AS|sy|2
Sri Lanka|Sri Jayawardenepura Kotte|AS|lk|3|nocap
Tagikistan|Dušanbe|AS|tj|3
Thailandia|Bangkok|AS|th|1
Timor Est|Dili|AS|tl|3
Turchia|Ankara|AS|tr|1
Turkmenistan|Aşgabat|AS|tm|3
Uzbekistan|Tashkent|AS|uz|3
Vietnam|Hanoi|AS|vn|2
Yemen|Sana'a|AS|ye|3
Algeria|Algeri|AF|dz|2
Angola|Luanda|AF|ao|3
Benin|Porto-Novo|AF|bj|3
Botswana|Gaborone|AF|bw|3
Burkina Faso|Ouagadougou|AF|bf|3
Burundi|Gitega|AF|bi|3
Camerun|Yaoundé|AF|cm|3
Capo Verde|Praia|AF|cv|3
Ciad|N'Djamena|AF|td|3
Comore|Moroni|AF|km|3
Costa d'Avorio|Yamoussoukro|AF|ci|3
Egitto|Il Cairo|AF|eg|1
Eritrea|Asmara|AF|er|3
Eswatini|Mbabane|AF|sz|3
Etiopia|Addis Abeba|AF|et|2
Gabon|Libreville|AF|ga|3
Gambia|Banjul|AF|gm|3
Ghana|Accra|AF|gh|2
Gibuti|Gibuti|AF|dj|3
Guinea|Conakry|AF|gn|3
Guinea-Bissau|Bissau|AF|gw|3
Guinea Equatoriale|Malabo|AF|gq|3
Kenya|Nairobi|AF|ke|2
Lesotho|Maseru|AF|ls|3
Liberia|Monrovia|AF|lr|3
Libia|Tripoli|AF|ly|2
Madagascar|Antananarivo|AF|mg|2
Malawi|Lilongwe|AF|mw|3
Mali|Bamako|AF|ml|3
Marocco|Rabat|AF|ma|1
Mauritania|Nouakchott|AF|mr|3
Mauritius|Port Louis|AF|mu|3
Mozambico|Maputo|AF|mz|3
Namibia|Windhoek|AF|na|3
Niger|Niamey|AF|ne|3
Nigeria|Abuja|AF|ng|2
Repubblica Centrafricana|Bangui|AF|cf|3
Repubblica del Congo|Brazzaville|AF|cg|3
Repubblica Democratica del Congo|Kinshasa|AF|cd|2
Ruanda|Kigali|AF|rw|3
São Tomé e Príncipe|São Tomé|AF|st|3
Senegal|Dakar|AF|sn|2
Seychelles|Victoria|AF|sc|3
Sierra Leone|Freetown|AF|sl|3
Somalia|Mogadiscio|AF|so|2
Sudafrica|Pretoria|AF|za|2
Sudan|Khartum|AF|sd|3
Sudan del Sud|Giuba|AF|ss|3
Tanzania|Dodoma|AF|tz|3
Togo|Lomé|AF|tg|3
Tunisia|Tunisi|AF|tn|1
Uganda|Kampala|AF|ug|3
Zambia|Lusaka|AF|zm|3
Zimbabwe|Harare|AF|zw|3
Antigua e Barbuda|Saint John's|NA|ag|3
Bahamas|Nassau|NA|bs|3
Barbados|Bridgetown|NA|bb|3
Belize|Belmopan|NA|bz|3
Canada|Ottawa|NA|ca|1
Costa Rica|San José|NA|cr|2
Cuba|L'Avana|NA|cu|1
Dominica|Roseau|NA|dm|3
El Salvador|San Salvador|NA|sv|3
Giamaica|Kingston|NA|jm|2
Grenada|Saint George's|NA|gd|3
Guatemala|Città del Guatemala|NA|gt|2
Haiti|Port-au-Prince|NA|ht|3
Honduras|Tegucigalpa|NA|hn|3
Messico|Città del Messico|NA|mx|1
Nicaragua|Managua|NA|ni|3
Panama|Panama|NA|pa|2
Repubblica Dominicana|Santo Domingo|NA|do|2
Saint Kitts e Nevis|Basseterre|NA|kn|3
Saint Lucia|Castries|NA|lc|3
Saint Vincent e Grenadine|Kingstown|NA|vc|3
Stati Uniti|Washington|NA|us|1
Trinidad e Tobago|Port of Spain|NA|tt|3
Argentina|Buenos Aires|SA|ar|1
Bolivia|Sucre|SA|bo|2|nocap
Brasile|Brasília|SA|br|1
Cile|Santiago del Cile|SA|cl|1
Colombia|Bogotà|SA|co|2
Ecuador|Quito|SA|ec|2
Guyana|Georgetown|SA|gy|3
Paraguay|Asunción|SA|py|2
Perù|Lima|SA|pe|1
Suriname|Paramaribo|SA|sr|3
Uruguay|Montevideo|SA|uy|2
Venezuela|Caracas|SA|ve|2
Australia|Canberra|OC|au|1
Figi|Suva|OC|fj|3
Isole Marshall|Majuro|OC|mh|3
Isole Salomone|Honiara|OC|sb|3
Kiribati|Tarawa Sud|OC|ki|3
Micronesia|Palikir|OC|fm|3
Nauru|Yaren|OC|nr|3|nocap
Nuova Zelanda|Wellington|OC|nz|1
Palau|Ngerulmud|OC|pw|3
Papua Nuova Guinea|Port Moresby|OC|pg|3
Samoa|Apia|OC|ws|3
Tonga|Nukuʻalofa|OC|to|3
Tuvalu|Funafuti|OC|tv|3
Vanuatu|Port Vila|OC|vu|3
`).map(([name, capital, cont, iso, d, flag]) => ({ name, capital, cont, iso, d: Number(d), nocap: flag === 'nocap' }));

  D.continents = { EU: 'Europa', AS: 'Asia', AF: 'Africa', NA: 'America del Nord e centrale', SA: 'America del Sud', OC: 'Oceania' };

  // Regione | Capoluogo
  D.regions = rows(`
Abruzzo|L'Aquila
Basilicata|Potenza
Calabria|Catanzaro
Campania|Napoli
Emilia-Romagna|Bologna
Friuli-Venezia Giulia|Trieste
Lazio|Roma
Liguria|Genova
Lombardia|Milano
Marche|Ancona
Molise|Campobasso
Piemonte|Torino
Puglia|Bari
Sardegna|Cagliari
Sicilia|Palermo
Toscana|Firenze
Trentino-Alto Adige|Trento
Umbria|Perugia
Valle d'Aosta|Aosta
Veneto|Venezia
`).map(([name, capital]) => ({ name, capital }));

  // Città | Regione | difficoltà
  D.cities = rows(`
Torino|Piemonte|1
Alessandria|Piemonte|2
Asti|Piemonte|2
Biella|Piemonte|2
Cuneo|Piemonte|2
Novara|Piemonte|2
Verbania|Piemonte|3
Vercelli|Piemonte|2
Aosta|Valle d'Aosta|1
Courmayeur|Valle d'Aosta|2
Milano|Lombardia|1
Bergamo|Lombardia|1
Brescia|Lombardia|1
Como|Lombardia|1
Cremona|Lombardia|2
Lecco|Lombardia|2
Lodi|Lombardia|2
Mantova|Lombardia|2
Monza|Lombardia|1
Pavia|Lombardia|2
Sondrio|Lombardia|2
Varese|Lombardia|2
Bellagio|Lombardia|3
Trento|Trentino-Alto Adige|1
Bolzano|Trentino-Alto Adige|1
Merano|Trentino-Alto Adige|2
Rovereto|Trentino-Alto Adige|3
Venezia|Veneto|1
Belluno|Veneto|2
Padova|Veneto|1
Rovigo|Veneto|2
Treviso|Veneto|2
Verona|Veneto|1
Vicenza|Veneto|2
Cortina d'Ampezzo|Veneto|2
Chioggia|Veneto|3
Bassano del Grappa|Veneto|3
Trieste|Friuli-Venezia Giulia|1
Gorizia|Friuli-Venezia Giulia|2
Pordenone|Friuli-Venezia Giulia|2
Udine|Friuli-Venezia Giulia|2
Aquileia|Friuli-Venezia Giulia|3
Lignano Sabbiadoro|Friuli-Venezia Giulia|3
Genova|Liguria|1
Imperia|Liguria|2
La Spezia|Liguria|2
Savona|Liguria|2
Sanremo|Liguria|1
Portofino|Liguria|2
Bologna|Emilia-Romagna|1
Ferrara|Emilia-Romagna|2
Forlì|Emilia-Romagna|2
Cesena|Emilia-Romagna|3
Modena|Emilia-Romagna|1
Parma|Emilia-Romagna|1
Piacenza|Emilia-Romagna|2
Ravenna|Emilia-Romagna|2
Reggio Emilia|Emilia-Romagna|2
Rimini|Emilia-Romagna|1
Firenze|Toscana|1
Arezzo|Toscana|2
Grosseto|Toscana|2
Livorno|Toscana|2
Lucca|Toscana|2
Massa|Toscana|3
Carrara|Toscana|3
Pisa|Toscana|1
Pistoia|Toscana|2
Prato|Toscana|2
Siena|Toscana|1
San Gimignano|Toscana|2
Montepulciano|Toscana|3
Viareggio|Toscana|2
Volterra|Toscana|3
Perugia|Umbria|1
Terni|Umbria|2
Assisi|Umbria|1
Gubbio|Umbria|2
Orvieto|Umbria|2
Spoleto|Umbria|3
Ancona|Marche|1
Ascoli Piceno|Marche|2
Fermo|Marche|3
Macerata|Marche|2
Pesaro|Marche|2
Urbino|Marche|2
Recanati|Marche|2
Loreto|Marche|3
Roma|Lazio|1
Frosinone|Lazio|2
Latina|Lazio|2
Rieti|Lazio|2
Viterbo|Lazio|2
Tivoli|Lazio|3
Gaeta|Lazio|3
L'Aquila|Abruzzo|1
Chieti|Abruzzo|2
Pescara|Abruzzo|1
Teramo|Abruzzo|2
Sulmona|Abruzzo|3
Campobasso|Molise|1
Isernia|Molise|2
Termoli|Molise|3
Napoli|Campania|1
Avellino|Campania|2
Benevento|Campania|2
Caserta|Campania|2
Salerno|Campania|1
Pompei|Campania|1
Sorrento|Campania|2
Amalfi|Campania|2
Positano|Campania|2
Ercolano|Campania|2
Bari|Puglia|1
Barletta|Puglia|3
Brindisi|Puglia|2
Foggia|Puglia|2
Lecce|Puglia|1
Taranto|Puglia|2
Alberobello|Puglia|2
Gallipoli|Puglia|2
Otranto|Puglia|3
Polignano a Mare|Puglia|3
Potenza|Basilicata|1
Matera|Basilicata|1
Maratea|Basilicata|3
Catanzaro|Calabria|1
Cosenza|Calabria|2
Crotone|Calabria|2
Reggio Calabria|Calabria|1
Vibo Valentia|Calabria|3
Tropea|Calabria|2
Scilla|Calabria|3
Palermo|Sicilia|1
Agrigento|Sicilia|2
Caltanissetta|Sicilia|2
Catania|Sicilia|1
Enna|Sicilia|2
Messina|Sicilia|1
Ragusa|Sicilia|2
Siracusa|Sicilia|1
Trapani|Sicilia|2
Taormina|Sicilia|2
Cefalù|Sicilia|2
Noto|Sicilia|3
Modica|Sicilia|3
Cagliari|Sardegna|1
Nuoro|Sardegna|2
Oristano|Sardegna|2
Sassari|Sardegna|2
Olbia|Sardegna|2
Alghero|Sardegna|2
Porto Cervo|Sardegna|3
`).map(([name, region, d]) => ({ name, region, d: Number(d) }));

  // Classifiche per «metti in ordine»: [etichetta, valore] (valori approssimati, l'ordine è certo).
  D.rankings = [
    { q: 'Ordina questi fiumi italiani dal più lungo al più corto', unit: 'km', items: [['Po', 652], ['Adige', 410], ['Tevere', 405], ['Adda', 313], ['Oglio', 280], ['Tanaro', 276], ['Ticino', 248], ['Arno', 241], ['Piave', 220], ['Volturno', 175]], minGap: 1.08 },
    { q: 'Ordina queste montagne dalla più alta alla più bassa', unit: 'm', items: [['Monte Everest', 8849], ['K2', 8611], ['Aconcagua', 6961], ['Denali', 6190], ['Kilimangiaro', 5895], ['Monte Bianco', 4806], ['Monte Rosa', 4634], ['Cervino', 4478], ['Gran Paradiso', 4061], ['Etna', 3357], ['Gran Sasso', 2912], ['Vesuvio', 1281]], minGap: 1.05 },
    { q: 'Ordina questi laghi italiani dal più grande al più piccolo', unit: 'km²', items: [['Lago di Garda', 370], ['Lago Maggiore', 212], ['Lago di Como', 146], ['Lago Trasimeno', 128], ['Lago di Bolsena', 114], ['Lago d\'Iseo', 65], ['Lago di Bracciano', 57], ['Lago d\'Orta', 18]], minGap: 1.1 },
    { q: 'Ordina i continenti dal più grande al più piccolo', unit: 'milioni di km²', items: [['Asia', 44.6], ['Africa', 30.4], ['America del Nord', 24.7], ['America del Sud', 17.8], ['Antartide', 14.2], ['Europa', 10.2], ['Oceania', 8.6]], minGap: 1.1 },
    { q: 'Ordina gli oceani dal più grande al più piccolo', unit: 'milioni di km²', items: [['Oceano Pacifico', 165], ['Oceano Atlantico', 106], ['Oceano Indiano', 70], ['Oceano Antartico', 21], ['Oceano Artico', 15]], minGap: 1.2 },
    { q: 'Ordina questi Paesi dal più esteso al meno esteso', unit: 'km²', items: [['Russia', 17098000], ['Canada', 9985000], ['Brasile', 8516000], ['Australia', 7692000], ['India', 3287000], ['Argentina', 2780000], ['Algeria', 2382000], ['Messico', 1964000], ['Egitto', 1002000], ['Francia', 551000], ['Spagna', 506000], ['Svezia', 450000], ['Germania', 357000], ['Italia', 302000], ['Regno Unito', 243000], ['Grecia', 132000], ['Portogallo', 92000], ['Svizzera', 41000], ['Belgio', 30500], ['Malta', 316]], minGap: 1.25 },
    { q: 'Ordina queste regioni italiane dalla più estesa alla meno estesa', unit: 'km²', items: [['Sicilia', 25832], ['Piemonte', 25387], ['Sardegna', 24100], ['Lombardia', 23864], ['Toscana', 22987], ['Emilia-Romagna', 22446], ['Puglia', 19541], ['Veneto', 18345], ['Lazio', 17232], ['Calabria', 15222], ['Campania', 13671], ['Trentino-Alto Adige', 13606], ['Abruzzo', 10832], ['Basilicata', 10073], ['Marche', 9401], ['Umbria', 8464], ['Friuli-Venezia Giulia', 7932], ['Liguria', 5416], ['Molise', 4461], ['Valle d\'Aosta', 3261]], minGap: 1.12 },
    { q: 'Ordina queste città italiane dalla più popolosa alla meno popolosa', unit: 'abitanti', items: [['Roma', 2750000], ['Milano', 1370000], ['Napoli', 910000], ['Torino', 850000], ['Palermo', 630000], ['Genova', 560000], ['Bologna', 390000], ['Firenze', 360000], ['Bari', 315000], ['Venezia', 250000], ['Trieste', 200000], ['Perugia', 160000], ['Pisa', 89000], ['Aosta', 33000]], minGap: 1.12 },
    { q: 'Ordina questi deserti dal più grande al più piccolo', unit: 'milioni di km²', items: [['Sahara', 9.2], ['Deserto arabico', 2.3], ['Deserto del Gobi', 1.3], ['Kalahari', 0.9], ['Deserto di Atacama', 0.1]], minGap: 1.3 },
    { q: 'Ordina queste isole italiane dalla più grande alla più piccola', unit: 'km²', items: [['Sicilia', 25426], ['Sardegna', 23813], ['Isola d\'Elba', 224], ['Isola di Sant\'Antioco', 109], ['Ischia', 46], ['Lipari', 37], ['Capri', 10]], minGap: 1.2 },
  ];

  // Domande scritte a mano: domanda | risposta corretta | distrattori separati da «;» | difficoltà
  D.geoWorldQuiz = rows(`
Qual è il continente più grande?|Asia|Africa;America del Nord;Europa|1
Qual è l'oceano più grande?|Oceano Pacifico|Oceano Atlantico;Oceano Indiano;Oceano Artico|1
Qual è la montagna più alta del mondo?|Monte Everest|K2;Monte Bianco;Kilimangiaro|1
Qual è il deserto caldo più grande del mondo?|Sahara|Gobi;Kalahari;Atacama|1
Qual è il Paese più grande del mondo per superficie?|Russia|Canada;Cina;Stati Uniti|1
Qual è il Paese più piccolo del mondo?|Città del Vaticano|Monaco;San Marino;Malta|1
In quale continente si trova l'Egitto?|Africa|Asia;Europa;Oceania|1
Quale fiume attraversa Parigi?|Senna|Loira;Reno;Danubio|1
Quale fiume attraversa Londra?|Tamigi|Senna;Shannon;Severn|1
Quale fiume attraversa Vienna, Budapest e Belgrado?|Danubio|Reno;Elba;Volga|2
Qual è il fiume più lungo d'Europa?|Volga|Danubio;Reno;Po|2
Qual è il lago più profondo del mondo?|Lago Bajkal|Lago Tanganica;Lago Vittoria;Mar Caspio|2
Qual è il lago più esteso del mondo?|Mar Caspio|Lago Superiore;Lago Vittoria;Lago Bajkal|2
Quale catena montuosa separa la Spagna dalla Francia?|Pirenei|Alpi;Appennini;Carpazi|1
Quale catena montuosa separa l'Europa dall'Asia?|Urali|Carpazi;Caucaso;Balcani|2
In quale Paese si trova la città di Marrakech?|Marocco|Algeria;Tunisia;Egitto|1
In quale Paese si trova Machu Picchu?|Perù|Bolivia;Messico;Cile|1
In quale Paese si trova il Taj Mahal?|India|Pakistan;Iran;Bangladesh|1
In quale Paese si trova la città di Petra?|Giordania|Egitto;Israele;Siria|2
In quale Paese si trova Angkor Wat?|Cambogia|Thailandia;Vietnam;Laos|2
In quale città si trova la Sagrada Família?|Barcellona|Madrid;Siviglia;Valencia|1
In quale città si trova la Statua della Libertà?|New York|Washington;Boston;Chicago|1
In quale città si trova la Porta di Brandeburgo?|Berlino|Monaco di Baviera;Vienna;Amburgo|1
In quale città si trova il Cristo Redentore?|Rio de Janeiro|San Paolo;Brasília;Buenos Aires|1
In quale città si trova l'Opera House più famosa d'Australia?|Sydney|Melbourne;Canberra;Perth|1
Quale stretto separa l'Europa dall'Africa?|Stretto di Gibilterra|Stretto di Messina;Bosforo;Stretto di Bonifacio|1
Quale stretto separa la Sicilia dalla Calabria?|Stretto di Messina|Stretto di Bonifacio;Canale d'Otranto;Stretto di Gibilterra|1
Quale stretto separa la Corsica dalla Sardegna?|Stretto di Bonifacio|Stretto di Messina;Canale di Sicilia;Stretto di Piombino|2
Quale canale collega il Mar Mediterraneo al Mar Rosso?|Canale di Suez|Canale di Panama;Canale di Corinto;Canale della Manica|1
Quale canale collega l'Oceano Atlantico al Pacifico in America centrale?|Canale di Panama|Canale di Suez;Canale di Kiel;Stretto di Magellano|1
Qual è la lingua più parlata in Brasile?|Portoghese|Spagnolo;Brasiliano;Inglese|1
Qual è la lingua ufficiale dell'Argentina?|Spagnolo|Portoghese;Argentino;Italiano|1
Quante lingue nazionali ha la Svizzera?|4|2;3;5|2
Qual è la moneta del Giappone?|Yen|Yuan;Won;Ringgit|1
Qual è la moneta del Regno Unito?|Sterlina|Euro;Dollaro;Corona|1
Qual è la moneta della Svizzera?|Franco svizzero|Euro;Corona;Marco|1
Qual è la moneta della Cina?|Renminbi (yuan)|Yen;Won;Rupia|2
Qual è la moneta dell'India?|Rupia|Rand;Dinaro;Baht|2
Qual è la moneta della Russia?|Rublo|Zloty;Corona;Grivnia|1
Qual è la moneta della Polonia?|Złoty|Fiorino;Corona;Euro|2
Qual è la moneta della Thailandia?|Baht|Yen;Rupia;Dong|3
Qual è la moneta del Sudafrica?|Rand|Dollaro;Naira;Scellino|3
In quale emisfero si trova l'Australia?|Australe|Boreale;Equatoriale;Settentrionale|1
Quale linea immaginaria divide la Terra in emisfero nord e sud?|Equatore|Tropico del Cancro;Meridiano di Greenwich;Circolo polare|1
Per quale città passa il meridiano fondamentale (longitudine 0°)?|Greenwich (Londra)|Parigi;Roma;New York|1
Quale Paese ha più abitanti tra questi?|India|Stati Uniti;Brasile;Russia|1
In quale Paese si trovano le cascate Vittoria?|Zambia e Zimbabwe|Kenya e Tanzania;Brasile e Argentina;Canada e Stati Uniti|2
Tra quali Paesi si trovano le cascate del Niagara?|Canada e Stati Uniti|Stati Uniti e Messico;Brasile e Argentina;Zambia e Zimbabwe|1
Tra quali Paesi si trovano le cascate dell'Iguazú?|Argentina e Brasile|Perù e Bolivia;Cile e Argentina;Venezuela e Colombia|2
Qual è la cascata più alta del mondo?|Salto Angel|Cascate del Niagara;Cascate Vittoria;Cascate dell'Iguazú|2
Qual è il vulcano attivo più alto d'Italia?|Etna|Vesuvio;Stromboli;Vulcano|1
Su quale isola delle Canarie si trova il vulcano Teide?|Tenerife|Gran Canaria;Lanzarote;Fuerteventura|2
Quale Paese è formato da più di 6.000 isole tra cui Honshu?|Giappone|Filippine;Indonesia;Corea del Sud|2
Qual è l'isola più grande del mondo?|Groenlandia|Australia;Madagascar;Borneo|1
A quale Paese appartiene la Groenlandia?|Danimarca|Norvegia;Islanda;Canada|2
Qual è la capitale dello stato americano della California?|Sacramento|Los Angeles;San Francisco;San Diego|2
In quale Paese si trova il Kilimangiaro?|Tanzania|Kenya;Uganda;Etiopia|2
Quale Paese ha la forma di uno stivale?|Italia|Cile;Grecia;Portogallo|1
Quale Paese è lungo e stretto lungo la costa del Pacifico in Sud America?|Cile|Perù;Ecuador;Colombia|1
Quale mare bagna Venezia?|Mar Adriatico|Mar Tirreno;Mar Ionio;Mar Ligure|1
Quale mare si trova tra Italia e Grecia a sud?|Mar Ionio|Mar Adriatico;Mar Egeo;Mar Tirreno|2
Quale mare separa la Grecia dalla Turchia?|Mar Egeo|Mar Ionio;Mar Nero;Mar di Marmara|2
Quale città è divisa tra Europa e Asia dal Bosforo?|Istanbul|Ankara;Atene;Baku|1
Quale deserto si trova in Mongolia e Cina?|Deserto del Gobi|Sahara;Kalahari;Atacama|2
Qual è il deserto più arido del mondo (non polare)?|Deserto di Atacama|Sahara;Gobi;Kalahari|2
Il Monte Fuji si trova in…|Giappone|Cina;Corea del Sud;Nepal|1
Quale fiume attraversa il Cairo?|Nilo|Congo;Niger;Eufrate|1
Quale grande fiume attraversa la foresta pluviale più grande del mondo?|Rio delle Amazzoni|Orinoco;Paraná;Mississippi|1
Quale fiume attraversa New Orleans?|Mississippi|Missouri;Hudson;Colorado|2
Il Grand Canyon è stato scavato dal fiume…|Colorado|Mississippi;Rio Grande;Missouri|2
In quale Paese si trova la regione della Patagonia?|Argentina e Cile|Brasile e Uruguay;Perù e Bolivia;Messico|2
Qual è la capitale più alta del mondo (sede di governo)?|La Paz|Quito;Bogotà;Katmandu|3
In quale oceano si trovano le Maldive?|Oceano Indiano|Oceano Pacifico;Oceano Atlantico;Mar Rosso|1
In quale oceano si trovano le Hawaii?|Oceano Pacifico|Oceano Atlantico;Oceano Indiano;Mar dei Caraibi|1
A quale Paese appartengono le isole Canarie?|Spagna|Portogallo;Marocco;Francia|1
A quale Paese appartengono le Azzorre?|Portogallo|Spagna;Francia;Regno Unito|2
A quale Paese appartiene la Corsica?|Francia|Italia;Spagna;Malta|1
Quale isola è chiamata «l'isola di smeraldo»?|Irlanda|Islanda;Sicilia;Cuba|2
Quale Paese è famoso per i fiordi?|Norvegia|Paesi Bassi;Portogallo;Grecia|1
Quale Paese è soprannominato «il Paese del Sol Levante»?|Giappone|Cina;Corea del Sud;Thailandia|1
Quale Paese è soprannominato «la terra dei mille laghi»?|Finlandia|Svezia;Canada;Scozia|2
Quale città è chiamata «la Grande Mela»?|New York|Los Angeles;Chicago;Londra|1
Quale città è chiamata «la Città Eterna»?|Roma|Atene;Gerusalemme;Istanbul|1
Quale città è chiamata «la Ville Lumière»?|Parigi|Lione;Bruxelles;Montréal|1
Quale città è soprannominata «la Serenissima»?|Venezia|Genova;Firenze;Trieste|1
Quale città è chiamata «la Superba»?|Genova|Venezia;Napoli;Torino|2
Quale città si chiamava un tempo Bisanzio e poi Costantinopoli?|Istanbul|Atene;Ankara;Alessandria|2
Quale città russa si è chiamata Leningrado?|San Pietroburgo|Mosca;Volgograd;Kaliningrad|2
Quale Paese era chiamato un tempo Persia?|Iran|Iraq;Turchia;Afghanistan|2
Quale Paese era chiamato un tempo Siam?|Thailandia|Vietnam;Cambogia;Myanmar|2
Quale Paese era chiamato un tempo Ceylon?|Sri Lanka|India;Madagascar;Indonesia|2
`).map(([q, a, wrong, d]) => ({ q, a, wrong: wrong.split(';'), d: Number(d) }));

  D.geoWorldTF = rows(`
L'Australia è sia un Paese sia un continente.|V|1|
Il Sahara è il deserto più grande del mondo in assoluto.|F|2|Il più grande è l'Antartide (deserto polare); il Sahara è il più grande deserto caldo.
Il Canada ha più laghi di qualsiasi altro Paese al mondo.|V|2|
La Svizzera fa parte dell'Unione Europea.|F|1|La Svizzera non è membro dell'UE.
Il Regno Unito usa l'euro.|F|1|Usa la sterlina.
La Norvegia fa parte dell'Unione Europea.|F|2|La Norvegia non è membro dell'UE.
L'Islanda si trova nell'Oceano Atlantico.|V|1|
Il Mar Morto è il punto più basso delle terre emerse.|V|2|
La Russia si estende su due continenti.|V|1|
Il Nilo sfocia nel Mar Rosso.|F|2|Sfocia nel Mar Mediterraneo.
Il Danubio sfocia nel Mar Nero.|V|2|
Il Monte Bianco si trova al confine tra Italia e Francia.|V|1|
L'Everest si trova al confine tra Nepal e Cina.|V|2|
Tokyo è la capitale della Cina.|F|1|Tokyo è la capitale del Giappone; quella della Cina è Pechino.
Il Brasile è il Paese più grande del Sud America.|V|1|
Il Messico confina con il Canada.|F|1|Il Messico confina con gli Stati Uniti, non con il Canada.
L'Egitto si trova in Africa.|V|1|
Madrid è la capitale del Portogallo.|F|1|La capitale del Portogallo è Lisbona.
Il Lussemburgo confina con il mare.|F|2|Il Lussemburgo non ha sbocchi sul mare.
La Groenlandia è più grande dell'Australia.|F|2|L'Australia è molto più grande ed è considerata un continente.
Istanbul è la capitale della Turchia.|F|1|La capitale è Ankara.
Sydney è la capitale dell'Australia.|F|1|La capitale è Canberra.
Rio de Janeiro è la capitale del Brasile.|F|1|La capitale è Brasília.
L'Equatore attraversa il Brasile.|V|2|
L'Equatore attraversa l'Italia.|F|1|
L'Antartide non ha una popolazione permanente.|V|2|
Il Kilimangiaro si trova in Africa.|V|1|
Il fiume Reno attraversa la Germania.|V|1|
Venezia è costruita su più di 100 isolette.|V|2|
Il Polo Sud si trova in mezzo all'oceano, senza terraferma.|F|2|Il Polo Sud si trova sul continente antartico; è il Polo Nord a trovarsi sul mare ghiacciato.
`).map(([q, a, d, why]) => ({ q, a: a === 'V', d: Number(d), why }));

  D.geoItalyQuiz = rows(`
Qual è il fiume più lungo d'Italia?|Po|Tevere;Adige;Arno|1
Qual è il lago più grande d'Italia?|Lago di Garda|Lago Maggiore;Lago di Como;Lago Trasimeno|1
Qual è la montagna più alta d'Italia?|Monte Bianco|Monte Rosa;Cervino;Gran Paradiso|1
Quante regioni ha l'Italia?|20|18;21;22|1
Quante regioni italiane hanno uno statuto speciale?|5|3;4;6|2
Qual è la regione più piccola d'Italia?|Valle d'Aosta|Molise;Liguria;Umbria|1
Qual è la regione più estesa d'Italia?|Sicilia|Piemonte;Sardegna;Lombardia|2
Qual è la regione più popolosa d'Italia?|Lombardia|Lazio;Campania;Sicilia|1
Quale regione non è bagnata dal mare?|Umbria|Marche;Molise;Basilicata|1
Quale di queste regioni non ha sbocco sul mare?|Lombardia|Liguria;Abruzzo;Calabria|1
Quale fiume attraversa Roma?|Tevere|Arno;Po;Aniene|1
Quale fiume attraversa Firenze e Pisa?|Arno|Tevere;Serchio;Ombrone|1
Quale fiume attraversa Torino?|Po|Dora Baltea;Tanaro;Adige|1
Quale fiume attraversa Verona?|Adige|Po;Brenta;Piave|1
In quale mare sfocia il Po?|Mar Adriatico|Mar Tirreno;Mar Ligure;Mar Ionio|1
Quale catena montuosa attraversa l'Italia da nord a sud?|Appennini|Alpi;Dolomiti;Prealpi|1
Le Dolomiti fanno parte di quale catena montuosa?|Alpi|Appennini;Pirenei;Carpazi|1
Quale vulcano si trova vicino a Napoli?|Vesuvio|Etna;Stromboli;Vulcano|1
Su quale isola si trova l'Etna?|Sicilia|Sardegna;Lipari;Ischia|1
A quale arcipelago appartiene Stromboli?|Isole Eolie|Isole Egadi;Isole Pelagie;Arcipelago toscano|1
A quale arcipelago appartiene Lampedusa?|Isole Pelagie|Isole Eolie;Isole Egadi;Isole Tremiti|2
A quale arcipelago appartiene l'Isola d'Elba?|Arcipelago toscano|Isole Ponziane;Isole Eolie;Arcipelago della Maddalena|1
In quale regione si trovano le isole Tremiti?|Puglia|Molise;Abruzzo;Marche|2
In quale regione si trovano le Cinque Terre?|Liguria|Toscana;Campania;Sardegna|1
In quale regione si trova la Costiera Amalfitana?|Campania|Calabria;Puglia;Basilicata|1
In quale regione si trovano i trulli?|Puglia|Basilicata;Calabria;Sicilia|1
In quale regione si trova la Valle dei Templi?|Sicilia|Sardegna;Calabria;Campania|1
In quale regione si trovano i nuraghi?|Sardegna|Sicilia;Toscana;Puglia|1
In quale regione si trova il Chianti?|Toscana|Umbria;Piemonte;Veneto|1
In quale regione si trovano le Langhe?|Piemonte|Lombardia;Liguria;Valle d'Aosta|2
In quale regione si trova il Salento?|Puglia|Calabria;Campania;Basilicata|1
In quale regione si trova il Cilento?|Campania|Calabria;Basilicata;Lazio|2
In quale regione si trova la Maremma?|Toscana e Lazio|Puglia;Sardegna;Calabria|2
In quale regione si trova il Gargano?|Puglia|Molise;Abruzzo;Basilicata|2
In quale regione si trova la Sila?|Calabria|Basilicata;Sicilia;Campania|2
In quale regione si trova il lago Trasimeno?|Umbria|Toscana;Lazio;Marche|1
Quale lago si trova tra Lombardia e Piemonte (e Svizzera)?|Lago Maggiore|Lago di Como;Lago di Garda;Lago d'Iseo|2
Su quale lago si affacciano Bellagio e Menaggio?|Lago di Como|Lago di Garda;Lago Maggiore;Lago d'Orta|2
Su quale lago si trova Sirmione?|Lago di Garda|Lago Maggiore;Lago di Como;Lago d'Iseo|2
Quale passo collega la Valle d'Aosta alla Svizzera?|Colle del Gran San Bernardo|Passo del Brennero;Passo dello Stelvio;Passo del Tonale|3
Quale passo alpino collega l'Italia all'Austria in Alto Adige?|Passo del Brennero|Passo dello Stelvio;Passo del Sempione;Colle di Tenda|2
Quale pianura è la più estesa d'Italia?|Pianura Padana|Tavoliere delle Puglie;Maremma;Campidano|1
Quali due Stati indipendenti si trovano all'interno del territorio italiano?|San Marino e Città del Vaticano|Monaco e Andorra;Malta e San Marino;Liechtenstein e Vaticano|1
Con quali Paesi confina l'Italia?|Francia, Svizzera, Austria, Slovenia|Francia, Germania, Austria, Croazia;Spagna, Francia, Svizzera, Austria;Svizzera, Austria, Ungheria, Slovenia|2
Quale mare bagna la Liguria?|Mar Ligure|Mar Tirreno;Mar Adriatico;Mar Ionio|1
Quale mare bagna Bari?|Mar Adriatico|Mar Ionio;Mar Tirreno;Mar Ligure|1
Quale mare bagna Taranto?|Mar Ionio|Mar Adriatico;Mar Tirreno;Canale di Sicilia|2
Quale mare bagna Napoli?|Mar Tirreno|Mar Ionio;Mar Adriatico;Mar Ligure|1
Qual è il capoluogo della Puglia?|Bari|Lecce;Taranto;Foggia|1
Qual è il capoluogo dell'Abruzzo?|L'Aquila|Pescara;Chieti;Teramo|2
Qual è il capoluogo della Calabria?|Catanzaro|Reggio Calabria;Cosenza;Crotone|2
Quale città italiana è famosa per il Palio?|Siena|Lucca;Arezzo;Pisa|1
Quale città ospita la Mostra del Cinema più antica del mondo?|Venezia|Roma;Cannes;Torino|1
Quale città ospita il Festival della canzone italiana?|Sanremo|Venezia;Napoli;Milano|1
Quale città è famosa per l'Arena dove si tiene la stagione lirica estiva?|Verona|Roma;Pola;Nîmes|1
Quale città è detta «la Dotta, la Grassa e la Rossa»?|Bologna|Parma;Firenze;Modena|1
In quale città si trova la Mole Antonelliana?|Torino|Milano;Genova;Novara|1
In quale città si trova Piazza dei Miracoli?|Pisa|Firenze;Siena;Lucca|1
In quale città si trova la Cappella degli Scrovegni?|Padova|Venezia;Vicenza;Ravenna|2
In quale città si trovano famosi mosaici bizantini come quelli di San Vitale?|Ravenna|Venezia;Palermo;Monreale|2
In quale città si trova il Teatro alla Scala?|Milano|Torino;Napoli;Venezia|1
In quale città si trova il Teatro San Carlo?|Napoli|Palermo;Roma;Bari|2
In quale città si trova la Reggia più grande d'Italia, patrimonio UNESCO?|Caserta|Napoli;Torino;Parma|2
I Sassi sono il simbolo di quale città?|Matera|Potenza;Lecce;Bari|1
Quale città si trova sullo Stretto di Messina in Calabria?|Reggio Calabria|Catanzaro;Crotone;Cosenza|1
Quale città è il capoluogo della Valle d'Aosta?|Aosta|Courmayeur;Cervinia;Saint-Vincent|1
`).map(([q, a, wrong, d]) => ({ q, a, wrong: wrong.split(';'), d: Number(d) }));

  D.geoItalyTF = rows(`
Il Po attraversa Milano.|F|2|Il Po non passa per Milano; attraversa Torino, Piacenza e Cremona.
La Sardegna è la seconda isola più grande del Mediterraneo.|V|1|
La Sardegna è l'isola più grande del Mediterraneo.|F|1|La più grande è la Sicilia.
Il Vesuvio è un vulcano attivo.|V|1|
L'Umbria è l'unica regione dell'Italia peninsulare senza sbocco sul mare.|V|2|
Trieste si trova in Friuli-Venezia Giulia.|V|1|
Il Molise è la regione più piccola d'Italia.|F|1|La più piccola è la Valle d'Aosta; il Molise è la seconda.
Roma è attraversata dal fiume Arno.|F|1|Roma è attraversata dal Tevere.
Il Lago di Garda è il lago più grande d'Italia.|V|1|
Le Dolomiti sono patrimonio dell'UNESCO.|V|2|
Bologna è il capoluogo dell'Emilia-Romagna.|V|1|
Pescara è il capoluogo dell'Abruzzo.|F|2|Il capoluogo è L'Aquila.
La Basilicata è bagnata da due mari.|V|2|Il Tirreno e lo Ionio.
La Calabria è bagnata dal Mar Adriatico.|F|2|È bagnata dal Tirreno e dallo Ionio.
San Marino si trova tra Emilia-Romagna e Marche.|V|2|
L'Etna è il vulcano attivo più alto d'Italia.|V|1|
Capri si trova nel Golfo di Napoli.|V|1|
Il Cervino si trova al confine tra Italia e Austria.|F|2|Si trova al confine tra Italia e Svizzera.
`).map(([q, a, d, why]) => ({ q, a: a === 'V', d: Number(d), why }));
})(typeof window !== 'undefined' ? window : globalThis);
