// Rete peer-to-peer (WebRTC tramite PeerJS): il browser dell'host fa da server di gioco,
// i telefoni dei giocatori si collegano direttamente a lui. Il server di segnalazione pubblico
// di PeerJS serve solo a far "incontrare" i dispositivi; il sito può quindi essere statico.
(function (root) {
  'use strict';

  const PREFIX = 'quizzone-it-';

  // Per i test locali: ?signal=localhost:9000 usa un server PeerJS locale.
  function peerOptions() {
    const signal = new URLSearchParams(location.search).get('signal');
    const options = { debug: 1 };
    if (signal) {
      const [host, port] = signal.split(':');
      Object.assign(options, { host, port: Number(port) || 9000, path: '/', secure: false });
    }
    return options;
  }

  // Impedisce allo schermo del telefono di spegnersi durante la partita (dove supportato).
  let wakeLock = null;
  async function keepScreenOn() {
    try {
      if ('wakeLock' in navigator && document.visibilityState === 'visible' && !wakeLock) {
        wakeLock = await navigator.wakeLock.request('screen');
        wakeLock.addEventListener('release', () => (wakeLock = null));
      }
    } catch {
      // Non supportato o negato: si gioca lo stesso.
    }
  }
  document.addEventListener('visibilitychange', () => {
    if (root.QuizNet.wantWakeLock) keepScreenOn();
  });

  function randomKey() {
    if (root.crypto?.randomUUID) return root.crypto.randomUUID();
    return Math.random().toString(36).slice(2) + Date.now().toString(36);
  }

  root.QuizNet = {
    peerId: (pin) => PREFIX + pin,
    peerOptions,
    randomKey,
    wantWakeLock: false,
    keepScreenOn() {
      this.wantWakeLock = true;
      keepScreenOn();
    },
  };
})(window);
