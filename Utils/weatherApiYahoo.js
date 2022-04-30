//  API of yahoo:

require("dotenv").config();

const RAPID_API_KEY_YAHOO = process.env.RAPID_API_KEY_YAHOO;

const getCityWeatherFromApi = (cityName, units = "c") => {
  const axios = require("axios");

  const options = {
    method: "GET",
    url: "https://yahoo-weather5.p.rapidapi.com/weather",
    params: { location: cityName, format: "json", u: units },
    headers: {
      "X-RapidAPI-Host": "yahoo-weather5.p.rapidapi.com",
      "X-RapidAPI-Key": RAPID_API_KEY_YAHOO,
    },
  };

  return axios
    .request(options)
    .then(function (response) {
      // console.log(response.data);
      const details = response.data;
      return details;
    })
    .catch(function (error) {
      console.log("Eror");
      console.error(error);
    });
};

module.exports = getCityWeatherFromApi;
