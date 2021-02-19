const fs = require('fs').promises;
const path = require('path');

const countriesPath = path.join(__dirname, 'countries.json');

const countriesController = {
  getCountries: async (_req, res) => {
    const countries = await fs.readFile(countriesPath, 'utf-8');
    res.json(JSON.parse(countries));
  },
}

module.exports = {
  getCountries: countriesController.getCountries,
}