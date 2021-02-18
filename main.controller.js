// axios dependency and init
const axios = require('axios');
const Http = axios.create();

const mainController = {
  get: async (req, res) => {
    const countryId = req.params.id;
    if (!countryId) {
      res.status(400).send('Country ID was not provided');
      return;
    }
    try {
      const _cities = Http.get('http://localhost:3051/sdfsdfsdf').then(res => res.data);
      const _countries = Http.get('http://localhost:3052/countries').then(res => res.data);
      const [cities, countries] = await Promise.all([_cities, _countries]);
      try {
        const selected = cities.filter(city => city.country === countryId)
        selected.forEach(city => delete city.country);
        const result = {
          ...countries[countryId],
          cities: selected
        }
        res.json(result);
      } catch (_err) {
        res.sendStatus(500);
      }
    } catch (err) {
      res.status(404).send(err);
    }
  },
  getAll: async (_req, res) => {
    const _cities = Http.get('http://localhost:3051/cities').then(res => res.data);
    const _countries = Http.get('http://localhost:3052/countries').then(res => res.data);
    const [cities, countries] = await Promise.all([_cities, _countries]);
    cities.forEach(city => city.country = countries[city.country]);
    // Return only first 100 entries to avoid large JSON
    res.json(cities.slice(0, 100));
  }
}

module.exports = {
  get: mainController.get,
  getAll: mainController.getAll
}