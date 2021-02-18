'use strict'

const express = require('express');
const path = require('path');
// const serveStatic = require('server-static');

// path definition
const staticPath = path.join(__dirname, 'public')

// express init
const app = express();
const port = 3053;

// server static files through express
app.use('/', express.static(staticPath, { fallthrough: false }))

// express listen on port
app.listen(port, () => {
  console.log('Listening on port', port)
}).on('error', err => {
  console.log('Error listening on port', err)
});