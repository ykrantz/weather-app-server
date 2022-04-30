require("dotenv").config();
const RAPID_API_KEY_CITY_SPOT = process.env.RAPID_API_KEY_CITY_SPOT;
const RESULTS_LIMIT = 50;

const searchCitiesFromApi = (searchStr) => {
  const axios = require("axios");
  const options = {
    method: "GET",
    url: "https://spott.p.rapidapi.com/places",
    params: { q: searchStr, limit: RESULTS_LIMIT, skip: "0", type: "CITY" },
    headers: {
      "X-RapidAPI-Host": "spott.p.rapidapi.com",
      "X-RapidAPI-Key": RAPID_API_KEY_CITY_SPOT,
    },
  };

  return axios
    .request(options)
    .then(function (response) {
      // console.log(response.data);
      return response.data;
    })
    .catch(function (error) {
      console.error(error);
    });
};

module.exports = searchCitiesFromApi;
