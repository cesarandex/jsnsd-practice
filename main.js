'use strict'

// express dependencies
const express = require('express');
const bodyParser = require('body-parser');

const { get, getAll } = require('./main.controller');

// express init
const app = express();
const port = 3050;

// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: false }));

// parse application/json
app.use(bodyParser.json());

// express routing
app.get('/:id', get);
app.get('/', getAll);

// express listen on port
app.listen(port, () => {
  console.log('Listening on port', port);
}).on('error', err => {
  console.log('Error listening on port', err);
});