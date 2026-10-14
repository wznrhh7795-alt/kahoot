'use strict';

const VF = ['Vero', 'Falso'];

const q = (text, answers, correct, time = 20) => ({
  text,
  answers,
  correct,
  time,
  type: answers === VF ? 'vero_falso' : 'quiz',
});

module.exports = [
  {
    id: 'geografia-italia',
    title: "Geografia d'Italia",
    description: 'Fiumi, laghi, vulcani e regioni del Bel Paese.',
    questions: [
      q("Qual è il fiume più lungo d'Italia?", ['Po', 'Tevere', 'Adige', 'Arno'], 0),
      q('Qual è il capoluogo della Sicilia?', ['Catania', 'Palermo', 'Messina', 'Siracusa'], 1),
      q('Il Monte Bianco è la vetta più alta delle Alpi.', VF, 0, 10),
      q("Quante regioni ha l'Italia?", ['18', '21', '20', '22'], 2),
      q("Qual è il lago più grande d'Italia?", ['Lago Maggiore', 'Lago di Como', 'Lago Trasimeno', 'Lago di Garda'], 3),
      q('Quale vulcano si trova vicino a Napoli?', ['Vesuvio', 'Etna', 'Stromboli', 'Vulcano'], 0),
      q("La Sardegna è l'isola più grande del Mediterraneo.", VF, 1, 10),
    ],
  },
  {
    id: 'cultura-generale',
    title: 'Cultura generale',
    description: 'Arte, letteratura, scienza e storia.',
    questions: [
      q('Chi ha dipinto la «Gioconda»?', ['Michelangelo', 'Leonardo da Vinci', 'Raffaello', 'Caravaggio'], 1),
      q('Chi ha scritto la «Divina Commedia»?', ['Dante Alighieri', 'Francesco Petrarca', 'Giovanni Boccaccio', 'Alessandro Manzoni'], 0),
      q('Qual è il pianeta più vicino al Sole?', ['Venere', 'Marte', 'Mercurio', 'Terra'], 2),
      q('Quanti lati ha un esagono?', ['5', '6', '7', '8'], 1, 10),
      q("A livello del mare l'acqua bolle a 100 °C.", VF, 0, 10),
      q('In che anno il referendum istituì la Repubblica Italiana?', ['1945', '1948', '1950', '1946'], 3),
      q("Qual è il simbolo chimico dell'oro?", ['Ag', 'Au', 'Or', 'Go'], 1),
    ],
  },
  {
    id: 'cucina-italiana',
    title: 'Cucina italiana',
    description: 'Quanto ne sai di pizza, pasta e dolci?',
    questions: [
      q('Da quale città proviene la pizza Margherita?', ['Napoli', 'Roma', 'Milano', 'Palermo'], 0),
      q("Qual è l'ingrediente principale del pesto alla genovese?", ['Prezzemolo', 'Rucola', 'Basilico', 'Spinaci'], 2),
      q('La carbonara tradizionale contiene la panna.', VF, 1, 10),
      q('Quale formaggio si usa nel tiramisù?', ['Ricotta', 'Mascarpone', 'Gorgonzola', 'Mozzarella'], 1),
      q('Che cosa dà il colore giallo al risotto alla milanese?', ['Curcuma', 'Paprika', 'Uovo', 'Zafferano'], 3),
      q('In quale regione si trova la città di Parma?', ['Emilia-Romagna', 'Toscana', 'Piemonte', 'Veneto'], 0),
    ],
  },
];
