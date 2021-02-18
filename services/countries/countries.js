'use strict'

const express = require('express');
// const bodyParser = require('body-parser');

const { getCountries } = require('./countries.controller');

// express init
const app = express();
const port = 3052;


// express routing
app.get('/countries', getCountries);

// express listen on port
app.listen(port, () => {
  console.log('Listening on port', port)
}).on('error', err => {
  console.log('Error listening on port', err)
});