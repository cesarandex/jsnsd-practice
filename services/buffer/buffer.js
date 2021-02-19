'use strict'

const express = require('express');
const { read } = require('./buffer.controller');

const PORT = 3014;

const app = express();

app.get('/:file', read);

app.listen(PORT, () => {
  console.log(`[BUFFER] Listening on port ${PORT}`);
}).on('error', () => {
  console.log(`[BUFFER] There was an error setting up the listener`)
});