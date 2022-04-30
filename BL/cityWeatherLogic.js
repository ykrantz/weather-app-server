require("dotenv").config();
const Respond = require("../Utils/respondFormat");
const cityWeather = require("../DL/controllers/cityWeatherController");
const citylogic = require("../BL/cityLogic");
const { city } = require("../DL/models/IndexModel");
const getCityWeatherFromApi = require("../Utils/weatherApiYahoo");
const HOURS_DELTA_TO_UPDATE = 6;

const getCityWeather = async (cityName) => {
  cityName = cityName.toLowerCase();
  const city_id = await citylogic.getCity_id(cityName);
  let cityWeatherDetails = "";
  if (city_id) {
    // if city exist in DB:
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
      // if city weather already update in server:
      console.log("have already  update weather in DB");
      return new Respond(200, cityWeatherDetails);
      // return { code: 200, data: cityWeatherDetails };
    } else {
      // if city weather isn't update in server, we need to get details and update:
      console.log("data in DB isn't update. will look from API");

      // get details from server and update DB:
      cityWeatherDetails = await getCityWeatherFromApiAndUpdateDb(cityName);
    }
  } else {
    // if city  isn't exist in server, we need to create a new city and then get details and update in DB:

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
  if (!cityWeatherDitails) {
    // if cuty does't exist in api:
    console.log("didn't find city weather in API");
    return false;
  } else if (
    // note: if there is exact name of city in API , the API returns a random city. so we need  to compare to the original name
    cityWeatherDitails?.location.city.toLowerCase() != cityName.trim()
  ) {
    console.log("didn't find city weather in API");
    return false;
  }

  const updateCityWeather = await updateCityWeatherInDb(cityWeatherDitails);
  console.log("city weather was update in server");
  const filter = { _id: updateCityWeather._id };
  //  get the updated ditails from DB and populate:
  const cityWeatherDetails = await cityWeather.readOneAndPopulate(
    filter,
    "",
    "city"
  );

  return cityWeatherDetails;
};

// TODO: upate inpur to DB

const updateCityWeatherInDb = async (data) => {
  // look for city _ID
  const { region, woeid, country, lat, long, timezone_id } = data.location;
  let city_id = await citylogic.getCity_id(city);

  let updatedCityWeather = "";

  // if city doesnt exist => create city

  if (!city_id) {
    console.log("didn't find city in DB. will create city");
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
    console.log("cityweather was created  in DB");
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

const hoursDifrance = (start, end) => {
  return Math.abs(end - start) / 36e5;
};

module.exports = { getCityWeather, getCityWeatherById };
