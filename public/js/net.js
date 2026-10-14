// Rete di gioco tramite relay pubblici Nostr (WebSocket sicuri sulla porta 443).
//
// Perché non WebRTC: tra reti diverse (4G/5G, Wi-Fi diversi) i collegamenti diretti tra telefoni
// spesso non passano il NAT dell'operatore. Qui invece ogni dispositivo si collega in uscita a più
// relay pubblici e i messaggi passano da lì: funziona su qualsiasi rete che apre i siti web.
//
// - Ogni messaggio è un evento Nostr "effimero" (kind 25050: inoltrato ma non salvato dai relay),
//   firmato con la chiave del dispositivo: la chiave pubblica identifica il giocatore.
// - Lo stesso messaggio viene pubblicato su tutti i relay; chi riceve scarta i duplicati.
//   Se un relay cade, gli altri continuano a funzionare.
// - Per ogni partita ci sono due etichette: "<pin>-h" (messaggi verso l'host) e "<pin>-p"
//   (messaggi dall'host ai giocatori).
(function (root) {
  'use strict';

  const RELAYS = [
    'wss://relay.snort.social',
    'wss://nos.lol',
    'wss://relay.primal.net',
    'wss://nostr.mom',
    'wss://nostr-pub.wellorder.net',
  ];
  const KIND = 25050;
  const TAG_BASE = 'quizzone-it-v1-';
  const MAX_PENDING = 50;
  const { generateSecretKey, getPublicKey, finalizeEvent, verifyEvent } = root.NostrTools;

  const toHex = (bytes) => Array.from(bytes, (b) => b.toString(16).padStart(2, '0')).join('');
  const fromHex = (hex) => new Uint8Array(hex.match(/../g).map((h) => parseInt(h, 16)));

  class RelaySocket {
    constructor(url, bus) {
      this.url = url;
      this.bus = bus;
      this.ws = null;
      this.open = false;
      this.retry = 0;
      this.timer = null;
      this.closed = false;
      this.connect();
    }

    connect() {
      if (this.closed) return;
      clearTimeout(this.timer);
      let ws;
      try {
        ws = new WebSocket(this.url);
      } catch {
        return this.scheduleReconnect();
      }
      this.ws = ws;
      ws.onopen = () => {
        this.open = true;
        this.retry = 0;
        ws.send(JSON.stringify(['REQ', this.bus.subId, this.bus.filter()]));
        this.bus.relayOpened();
      };
      ws.onmessage = (e) => {
        let m;
        try {
          m = JSON.parse(e.data);
        } catch {
          return;
        }
        if (m[0] === 'EVENT' && m[1] === this.bus.subId) this.bus.receive(m[2]);
      };
      ws.onclose = () => {
        if (this.ws !== ws) return;
        this.open = false;
        this.bus.relayChanged();
        this.scheduleReconnect();
      };
      ws.onerror = () => {}; // segue sempre onclose
    }

    scheduleReconnect() {
      if (this.closed) return;
      clearTimeout(this.timer);
      const delay = Math.min(15000, 1000 * 2 ** this.retry++);
      this.timer = setTimeout(() => this.connect(), delay);
    }

    // Riconnessione immediata (es. quando il telefono torna in primo piano).
    nudge() {
      if (this.closed || (this.ws && this.ws.readyState <= 1)) return;
      this.retry = 0;
      this.connect();
    }

    send(data) {
      if (!this.open || this.ws.readyState !== 1) return false;
      this.ws.send(data);
      return true;
    }

    close() {
      this.closed = true;
      clearTimeout(this.timer);
      try {
        this.ws?.close();
      } catch {}
    }
  }

  class Bus {
    // listenTag: etichetta dei messaggi da ricevere; sendTag: etichetta di quelli inviati.
    constructor({ secretKey, listenTag, sendTag, onMessage, onStatus }) {
      this.sk = secretKey;
      this.pubkey = getPublicKey(secretKey);
      this.listenTag = listenTag;
      this.sendTag = sendTag;
      this.onMessage = onMessage;
      this.onStatus = onStatus;
      this.subId = 'qz' + Math.random().toString(36).slice(2, 10);
      this.since = Math.floor(Date.now() / 1000) - 120;
      this.seen = new Set();
      this.seenOrder = [];
      this.pending = [];
      this.waiters = [];
      this.relays = RELAYS.map((url) => new RelaySocket(url, this));
      this.onVisible = () => {
        if (document.visibilityState === 'visible') this.relays.forEach((r) => r.nudge());
      };
      document.addEventListener('visibilitychange', this.onVisible);
      root.addEventListener('online', this.onVisible);
    }

    filter() {
      return { kinds: [KIND], '#t': [this.listenTag], since: this.since };
    }

    get connected() {
      return this.relays.filter((r) => r.open).length;
    }

    relayOpened() {
      // Messaggi rimasti in coda mentre nessun relay era raggiungibile.
      const pending = this.pending.splice(0);
      for (const data of pending) this.relays.forEach((r) => r.send(data));
      this.waiters.splice(0).forEach((resolve) => resolve());
      this.relayChanged();
    }

    relayChanged() {
      this.onStatus?.(this.connected);
    }

    // Si risolve appena almeno un relay è collegato.
    ready(timeoutMs = 10000) {
      if (this.connected > 0) return Promise.resolve();
      return new Promise((resolve, reject) => {
        const t = setTimeout(() => reject(new Error('timeout')), timeoutMs);
        this.waiters.push(() => {
          clearTimeout(t);
          resolve();
        });
      });
    }

    send(msg) {
      const event = finalizeEvent(
        { kind: KIND, created_at: Math.floor(Date.now() / 1000), tags: [['t', this.sendTag]], content: JSON.stringify(msg) },
        this.sk,
      );
      const data = JSON.stringify(['EVENT', event]);
      let sent = 0;
      for (const r of this.relays) if (r.send(data)) sent++;
      if (sent === 0) {
        this.pending.push(data);
        if (this.pending.length > MAX_PENDING) this.pending.shift();
      }
      return sent;
    }

    receive(event) {
      if (!event || typeof event.id !== 'string' || this.seen.has(event.id)) return;
      this.seen.add(event.id);
      this.seenOrder.push(event.id);
      if (this.seenOrder.length > 3000) this.seen.delete(this.seenOrder.shift());

      if (event.kind !== KIND || event.pubkey === this.pubkey) return;
      if (!Array.isArray(event.tags) || !event.tags.some((t) => t[0] === 't' && t[1] === this.listenTag)) return;
      let msg;
      try {
        msg = JSON.parse(event.content);
      } catch {
        return;
      }
      if (!msg || typeof msg !== 'object') return;
      // Messaggi indirizzati ad altri: li vediamo ma non li verifichiamo né li elaboriamo.
      if (msg.to && msg.to !== '*' && msg.to !== this.pubkey) return;
      if (!verifyEvent(event)) return;
      this.onMessage(event.pubkey, msg);
    }

    close() {
      document.removeEventListener('visibilitychange', this.onVisible);
      root.removeEventListener('online', this.onVisible);
      this.relays.forEach((r) => r.close());
    }
  }

  // Impedisce allo schermo del telefono di spegnersi durante la partita (dove supportato).
  let wakeLock = null;
  let wantWakeLock = false;
  async function requestWakeLock() {
    try {
      if (wantWakeLock && 'wakeLock' in navigator && document.visibilityState === 'visible' && !wakeLock) {
        wakeLock = await navigator.wakeLock.request('screen');
        wakeLock.addEventListener('release', () => (wakeLock = null));
      }
    } catch {
      // Non supportato o negato: si gioca lo stesso.
    }
  }
  document.addEventListener('visibilitychange', requestWakeLock);

  root.QuizNet = {
    Bus,
    hostTag: (pin) => `${TAG_BASE}${pin}-h`,
    playersTag: (pin) => `${TAG_BASE}${pin}-p`,
    newSecretKey: generateSecretKey,
    toHex,
    fromHex,
    keepScreenOn() {
      wantWakeLock = true;
      requestWakeLock();
    },
  };
})(window);
