const city = require("../DL/controllers/cityController");
const Respond = require("../Utils/respondFormat");

const getCitiesList = async () => {
  const citiesList = await city.read();
  if (citiesList.length) {
    return new Respond(200, citiesList);
    // return { code: 200, data: citiesList };
  } else {
    // return { code: 404, data: "no cities wasn't found" };
    return new Respond(404, "", "no cities wasn't found");
  }
};

const getCity_id = async (cityName, country) => {
  const filter = country
    ? {
        name: cityName,
        country: country,
      }
    : {
        name: cityName,
      };
  const cityDetails = await city.readOne(filter);
  const city_id = cityDetails?._id.toString();

  if (city_id) {
    return city_id;
  } else {
    return false;
  }
};

const getCityDetails = async (cityName, country) => {
  const filter = country
    ? {
        name: cityName,
        country: country,
      }
    : {
        name: cityName,
      };

  // const filter = country
  //   ? {
  //       name: "london",
  //       country: "gb",
  //     }
  //   : {
  //       name: "london",
  //     };
  // console.log("^^^", { filter });

  const cityDetails = await city.readOne(filter);
  // console.log("^^^^", { cityDetails });
  if (cityDetails) {
    // return { code: 200, data: cityDetails };
    return new Respond(200, cityDetails);
  } else {
    // return { code: 404, data: "city wasn't found" };
    return new Respond(404, "", "city wasn't found");
  }
};

const createCity = (cityName, country) => {
  const cityDetails = { city: cityName, country };
  const newCity = city.create(cityDetails);
};

module.exports = { getCitiesList, getCityDetails, getCity_id };
