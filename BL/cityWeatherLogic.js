require("dotenv").config();
const Respond = require("../Utils/respondFormat");
const cityWeather = require("../DL/controllers/cityWeatherController");
const citylogic = require("../BL/cityLogic");
const { city } = require("../DL/models/IndexModel");

const HOURS_DELTA_TO_UPDATE = 6;

const RAPID_API_KEY_YAHOO = process.env.RAPID_API_KEY_YAHOO;

const getCityWeather = async (cityName) => {
  // TODO: to check why when the city exist it creates another city. problum with the finding od city
  cityName = cityName.toLowerCase();
  const city_id = await citylogic.getCity_id(cityName);
  let cityWeatherDetails = "";
  if (city_id) {
    const filter = { city: city_id.toString() };
    cityWeatherDetails = await cityWeather.readOneAndPopulate(
      filter,
      "",
      "city"
    );

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
      cityWeatherDetails = await getCityWeatherFromApiAndUpdateDb(cityName);
    }
  } else {
    console.log("city isn't in DB. will look from API");
    // get details from server and update DB:
    cityWeatherDetails = await getCityWeatherFromApiAndUpdateDb(cityName);
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

const getCityWeatherById = async (id) => {
  // TODO: to check why when the city exist it creates another city. problum with the finding od city

  const city_id = await citylogic.getCity_idByid(id);
  let cityWeatherDetails = "";
  // console.log({ city_id }, "222");
  if (city_id) {
    const filter = { city: city_id.toString() };
    // cityWeatherDetails = await cityWeather.readOne(filter);
    cityWeatherDetails = await cityWeather.readOneAndPopulate(
      filter,
      "",
      "city"
    );

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
      cityWeatherDetails = await getCityWeatherFromApiAndUpdateDb(cityName);
    }
  } else {
    console.log("city isn't in DB. will look from API");
    // get details from server and update DB:
    cityWeatherDetails = await getCityWeatherFromApiAndUpdateDb(cityName);
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

const getCityWeatherFromApiAndUpdateDb = async (cityName) => {
  const cityWeatherDitails = await getCityWeatherFromApi(cityName);
  console.log(cityWeatherDitails.location.city, { cityName });
  // note: if there is exact name of city in API it return random city. so we need  to compare to the original name
  if (
    !cityWeatherDitails ||
    cityWeatherDitails.location.city.toLowerCase() != cityName.trim()
  ) {
    console.log("didn't find city weather in API");
    return false;
  }

  const updateCityWeather = await updateCityWeatherInDb(cityWeatherDitails);
  console.log("city weather was update in server");
  const filter = { name: cityName };
  const cityWeatherDetails = await cityWeather.readOneAndPopulate(
    filter,
    "",
    "city"
  );
  // console.log({updateCityWeather});
  return cityWeatherDetails;
};

// TODO: upate inpur to DB

const updateCityWeatherInDb = async (data) => {
  // look fot city _ID
  const { region, woeid, country, lat, long, timezone_id } = data.location;
  let city_id = await citylogic.getCity_id(city);

  let updatedCityWeather = "";

  // if city doesnt exist => create city

  if (!city_id) {
    console.log("didn't find city in server");
    const cityDetails = {
      name: data.location.city,
      region,
      id: woeid,
      country,
      lat,
      long,
      timezone_id,
    };
    console.log({ cityDetails }, "$$$");

    cityDetails.name = cityDetails.name.toLowerCase();
    cityDetails.country = cityDetails.country.toLowerCase();

    //  create city:
    const newCity = await city.create(cityDetails);
    console.log("city was created :", { newCity });
    city_id = newCity._id;

    // update date in server:
    const newData = {
      city: city_id,
      daysWeather: data.forecasts,
    };

    updatedCityWeather = await cityWeather.create(newData);
    console.log("cityweather was created  in server");
  } else {
    const cityWeather_id = cityWeather.readOne({ city: city_id });

    if (cityWeather_id) {
      updatedCityWeather = await cityWeather.update(city_id, {
        daysWeather: data.forecasts,
      });

      console.log("cityweather was upddated in server :");
    } else {
      // if city weather never was update in server
      console.log("no record of weater city in server");
      updatedCityWeather = await cityWeather.create(newData);
      console.log("cityweather was created  in server");
    }
  }

  return updatedCityWeather;
};

//  API of yahoo:

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

const hoursDifrance = (start, end) => {
  return Math.abs(end - start) / 36e10;
};

module.exports = { getCityWeather, getCityWeatherById };
