// Forme delle risposte: triangolo (rosso), rombo (blu), cerchio (giallo), quadrato (verde).
window.SHAPES = [
  '<svg class="shape" viewBox="0 0 32 32" aria-hidden="true"><path d="M16 4 L29 27 H3 Z"/></svg>',
  '<svg class="shape" viewBox="0 0 32 32" aria-hidden="true"><path d="M16 2 L29 16 L16 30 L3 16 Z"/></svg>',
  '<svg class="shape" viewBox="0 0 32 32" aria-hidden="true"><circle cx="16" cy="16" r="13"/></svg>',
  '<svg class="shape" viewBox="0 0 32 32" aria-hidden="true"><rect x="4" y="4" width="24" height="24" rx="2"/></svg>',
];
window.SHAPE_NAMES = ['Triangolo', 'Rombo', 'Cerchio', 'Quadrato'];

window.escapeHtml = (s) =>
  String(s).replace(/[&<>"']/g, (c) => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' })[c]);
