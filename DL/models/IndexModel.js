const city = require("./city");
const cityWeather = require("./cityWeather");
const citySearch = require("./citySearch");
const dayWeather = require("./dayWeather");
const user = require("./user");
const userFavorites = require("./userFavorites");

const model = {
  city,
  cityWeather,
  dayWeather,
  citySearch,
  user,
  userFavorites,
};

module.exports = model;
