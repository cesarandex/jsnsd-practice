'use strict'

const {
  PORT
} = process.env;

function fibonacci (num) {
  let a = 1
  let b = 0
  let temp

  while (num >= 0) {
    temp = a
    a = a + b
    b = temp
    num--
  }

  return b
};

const controller = {
  calculate: (req, res) => {
    const queryLength = Object.keys(req.query).length;
    let digit = req.query.digit;

    if (digit === undefined) {
      res.sendStatus(400);
      return;
    } else {
      const isNumber = !isNaN(digit);
      if (!isNumber) {
        res.sendStatus(400);
        return;
      }
      digit = +digit;
      if (queryLength > 1) {
        res.sendStatus(406);
        return;
      }
      if (digit > 50) {
        res.sendStatus(413);
        return;
      }
      const result = fibonacci(digit);
      res.json({ digit, result });
    }
  }
};

const express = require('express');

const app = express();

app.get('/calculate-fibonacci', controller.calculate);

app.listen(PORT || 3060, () => {
  console.log(`[FIBONACCI SERVICE] Listening on port ${PORT || 3060}`)
}).on('error', () => {
  console.log(`[FIBONACCI SERVICE] There was an error setting up the listener`)
});