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

const getCity_id = async (cityName) => {
  const filter = { name: cityName };
  const cityDetails = await city.readOne(filter);
  console.log("found city id ");
  const city_id = cityDetails?._id;

  if (city_id) {
    return city_id;
  } else {
    return false;
  }
};

const getCity_idByid = async (id) => {
  const filter = { id };

  const cityDetails = await city.readOne(filter);
  console.log("found city id ");
  const city_id = cityDetails?._id;

  if (city_id) {
    return city_id;
  } else {
    return false;
  }
};

const getCityDetails = async (cityName) => {
  const filter = {
    name: cityName.toLowerCase(),
  };

  const cityDetails = await city.readOne(filter);

  if (cityDetails) {
    return new Respond(200, cityDetails);
  } else {
    return new Respond(404, "", "city wasn't found");
  }
};

const createCity = (cityName, country) => {
  const cityDetails = { city: cityName, country };
  const newCity = city.create(cityDetails);
};

module.exports = { getCitiesList, getCityDetails, getCity_id, getCity_idByid };

// test

// require("../DL/db")
//   .connect()
//   .then(() => {
//     console.log("***connected succsesfuly to DB***");
//   });

// const testFunc = async () => {
//   const cityId = await getCity_id("london", "gb");
//   console.log({ cityId });
//   const dityDet = await city.readOne({ _id: cityId });
//   console.log("@@@@@", { dityDet });

//   const dityDet2 = await getCityDetails("london", "gb");
//   console.log({ dityDet2 });
// };

// testFunc();
