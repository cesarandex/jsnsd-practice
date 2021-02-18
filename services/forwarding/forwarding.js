'use strict'

const express = require('express');
// const bodyParser = require('body-parser');

const { get } = require('./forwarding.controller');

// express init
const app = express();
const port = 3054;

// express routing
app.get('/', get);

// express listen on port
app.listen(port, () => {
  console.log('Listening on port', port)
}).on('error', err => {
  console.log('Error listening on port', err)
});