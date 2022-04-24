// TODO: to get from api details
const cityWeather = require("../DL/controllers/cityWeatherController");
const RAPID_API_KEY = process.env.RAPID_API_KEY;

const getCityWeather = async (cityName) => {
  cityWeatherDetails = await cityWeather.readOne(cityName);
  if (
    cityWeatherDetails?.updatedAt.toDateString() === new Date().toDateString()
  ) {
    console.log("have update weather in DB");
    return { code: 200, data: cityWeatherDetails };
  } else {
    // get details from server
    //update DB
    //send results
  }
};
