const cities = require('./cities.json');

const citiesController = {
  getCities: (_req, res) => {
    res.json(cities);
  },
}

module.exports = {
  getCities: citiesController.getCities,
}