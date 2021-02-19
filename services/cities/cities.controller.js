const fs = require('fs').promises;
const path = require('path');

const citiesPath = path.join(__dirname, 'cities.json');

const citiesController = {
  getCities: async (_req, res) => {
    const cities = await fs.readFile(citiesPath, 'utf-8');
    res.json(JSON.parse(cities));
  },
}

module.exports = {
  getCities: citiesController.getCities,
}