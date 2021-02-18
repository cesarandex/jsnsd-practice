const countries = require('./countries.json');

const countriesController = {
  getCountries: (_req, res) => {
    res.json(countries);
  },
}

module.exports = {
  getCountries: countriesController.getCountries,
}