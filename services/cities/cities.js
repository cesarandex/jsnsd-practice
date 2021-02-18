'use strict'

const express = require('express');

const { getCities } = require('./cities.controller');

// express init
const app = express();
const port = 3051;

// express routing
app.get('/cities', getCities);

// express listen on port
app.listen(port, () => {
  console.log('Listening on port', port)
}).on('error', err => {
  console.log('Error listening on port', err)
});