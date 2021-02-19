'use strict'

// FOR DEVELOPMENT
process.env.PORT = 3012;
process.env.HASH = "$2b$10$3JPcfQzLyyf.dOQ3b6bm8eppDPYg1zMvVurTqGRv1CeILuNmBhQN6";
process.env.SALT = "00fc1f5ddf";

const {
  PORT, HASH
} = process.env;

const express = require('express');
const bodyParser = require('body-parser');
const bcrypt = require('bcrypt');

// HASH generator, this is only needed because we don't have access to the provided environment variable HASH
// const saltRounds = 10;
// const myPlaintextPassword = 'developer';

// bcrypt.genSalt(saltRounds, function(err, salt) {
//   bcrypt.hash(myPlaintextPassword, salt, function(err, hash) {
//     console.log('The generated HASH is:', hash)
//   });
// });

const app = express();

// dictionary that will hold the number of attempts per IP
const attempts = {};

// middleware linked to a dictionary that will stop requests after too many invalid attempts
const securityMiddleware = (req, res, next) => {
  if(attempts[req.ip] >= 3) {
    res.sendStatus(500);
  } else {
    next();
  }
}

// set up security middleware
app.use(securityMiddleware);

// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: false }))

// parse application/json
app.use(bodyParser.json())

async function login (user, passwd) {
  if (user === 'node') {
    const result = await bcrypt.compare(passwd, HASH);
    return result;
  }
  return false;
}

const controller = {
  getLogin: async (req, res) => {
    if (req.body) {
      const { username, password } = req.body;
      if (username && password) {
        const result = await login(username, password);
        if (result) {
          res.sendStatus(200);
        } else {
          if (attempts[req.ip]) attempts[req.ip]++;
          else attempts[req.ip] = 1;
          res.sendStatus(401);
        }
        return;
      }
    }
    res.status(400).send('Invalid provided body');
  }
};

app.post('/login', controller.getLogin);

app.listen(PORT, () => {
  console.log(`[HASHED LOGIN] Listening on port ${PORT}`)
}).on('error', () => {
  console.log(`[HASHED LOGIN] There was an error setting up the listener`)
});