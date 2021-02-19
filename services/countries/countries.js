'use strict'

const express = require('express');

const { getCountries } = require('./countries.controller');

// express init
const app = express();
const port = 3052;

// create default error middleware
const errorMiddleware = (_req, res) => {
  res.status(404).send('Invalid URL');
};

// express routing
app.get('/countries', getCountries);
app.get('*', errorMiddleware)

// express listen on port
app.listen(port, () => {
  console.log('Listening on port', port)
}).on('error', err => {
  console.log('Error listening on port', err)
});