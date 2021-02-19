'use strict'

const express = require('express');
const path = require('path');

// path definition
const staticPath = path.join(__dirname, 'public')

// express init
const app = express();
const port = 3053;

// denial of service middleware for specific IP (DDOS security)
const blockIPMiddleware = (req, res, next) => {
  if (req.ip === '123.123.123.123') {
    res.status(500).send('Stop DDOS pls');
  } else {
    next();
  }
}

// attach security middleware
app.use(blockIPMiddleware);

// server static files through express
app.use('/', express.static(staticPath, { fallthrough: false }));

// express listen on port
app.listen(port, () => {
  console.log('Listening on port', port)
}).on('error', err => {
  console.log('Error listening on port', err)
});