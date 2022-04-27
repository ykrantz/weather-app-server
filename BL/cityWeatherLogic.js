require("dotenv").config();
const Respond = require("../Utils/respondFormat");
const cityWeather = require("../DL/controllers/cityWeatherController");
const citylogic = require("../BL/cityLogic");
const { city } = require("../DL/models/IndexModel");

const HOURS_DELTA_TO_UPDATE = 6;

const RAPID_API_KEY = process.env.RAPID_API_KEY;

const getCityWeather = async (cityName, country) => {
  // TODO: to check why when the city exist it creates another city. problum with the finding od city

  // const city_id = await citylogic.getCityDetails(cityName, country).data?._id;
  const city_id = await citylogic.getCity_id(cityName, country);
  let cityWeatherDetails = "";
  // console.log({ city_id }, "222");
  if (city_id) {
    const filter = { city: city_id.toString() };
    cityWeatherDetails = await cityWeather.readOne(filter);

    if (
      hoursDifrance(Date.now(), cityWeatherDetails?.updatedAt.getTime()) <=
      HOURS_DELTA_TO_UPDATE
      // cityWeatherDetails?.updatedAt.toDateString() === new Date().toDateString()
    ) {
      console.log("have already  update weather in DB");
      return new Respond(200, cityWeatherDetails);
      // return { code: 200, data: cityWeatherDetails };
    } else {
      console.log("data in DB isn't update. will look from API");

      // get details from server and update DB:
      cityWeatherDetails = await getCityWeatherFromApiAndUpdateDb(
        cityName,
        country
      );
    }
  } else {
    console.log("city isn't in DB. will look from API");
    // get details from server and update DB:
    cityWeatherDetails = await getCityWeatherFromApiAndUpdateDb(
      cityName,
      country
    );
  }

  //  if city weather is found in db and is update to today => send res

  if (cityWeatherDetails) {
    // return { code: 200, data: cityDetails };
    return new Respond(200, cityWeatherDetails);
  } else {
    // return { code: 404, data: "city wasn't found" };
    return new Respond(404, "", "city wasn't found");
  }
};

// side functions:

const getCityWeatherFromApiAndUpdateDb = async (cityName, country) => {
  const cityWeatherDitails = await getCityWeatherFromApi(cityName, country);

  if (!cityWeatherDitails) {
    console.log("didn't find city weather in API");
    return false;
  }

  const updateCityWeather = await updateCityWeatherInDb(cityWeatherDitails);
  // console.log({updateCityWeather});
  return cityWeatherDitails;
};

const updateCityWeatherInDb = async (data) => {
  // look fot city _ID
  const { id, name, coord, country, population, timezone } = data.city;
  // console.log({ name, coord, country });
  let city_id = await citylogic.getCity_id(name, country);

  let updatedCityWeather = "";
  // if city doesnt exist => create city

  if (!city_id) {
    console.log("didn't find city in server");
    const cityDetails = { id, name, coord, country, population, timezone };
    cityDetails.name = cityDetails.name.toLowerCase();
    cityDetails.country = cityDetails.country.toLowerCase();

    const newCity = await city.create(cityDetails);
    console.log("city was created :", { newCity });
    city_id = newCity._id;

    // update date in server
    const newData = {
      city: city_id,
      daysWeather: data.list,
    };
    console.log("cityweather was created  in server");

    updatedCityWeather = await cityWeather.create(newData);
  } else {
    const cityWeather_id = cityWeather.readOne({ city: city_id });

    if (cityWeather_id) {
      updatedCityWeather = await cityWeather.update(city_id, {
        daysWeather: data.list,
      });

      console.log("cityweather was upddated in server :");
    } else {
      // if city weather never was update in server
      console.log("no record of weater city in server");
      updatedCityWeather = await cityWeather.create(newData);
      console.log("cityweather was created  in server :", { newCity });
    }
  }

  return updatedCityWeather;
};

const getCityWeatherFromApi = (cityName, country) => {
  const axios = require("axios");

  const options = {
    method: "GET",
    url: "https://community-open-weather-map.p.rapidapi.com/forecast/daily",
    params: {
      q: `${cityName}
      ${country ? "," + country : ""}`,

      units: "metric or imperial",
    },
    headers: {
      "X-RapidAPI-Host": "community-open-weather-map.p.rapidapi.com",
      "X-RapidAPI-Key": RAPID_API_KEY,
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

const hoursDifrance = (start, end) => {
  return Math.abs(end - start) / 36e10;
};

module.exports = { getCityWeather };
