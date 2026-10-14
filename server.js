'use strict';

// Server statico solo per lo sviluppo locale: in produzione il sito è statico (Netlify)
// e la partita gira nel browser dell'host tramite WebRTC (vedi public/js/net.js).
const path = require('path');
const express = require('express');

const app = express();
app.use(express.static(path.join(__dirname, 'public'), { extensions: ['html'] }));

const port = Number(process.env.PORT) || 3000;
app.listen(port, () => {
  console.log(`Quizzone! su http://localhost:${port}  (host: http://localhost:${port}/host)`);
});
