const city = require("../DL/controllers/cityController");
const citySearch = require("../DL/controllers/citySearchController");
const Respond = require("../Utils/respondFormat");
const searchCitiesFromApi = require("../Utils/citiesApiSpot");

// search from CitiesApi:

const searchCitiesByString = async (searchStr) => {
  // check if it was search before and there is results from DB:
  const searchResultsFromDb = await await citySearch.readOne({ searchStr });
  console.log("###", { searchResultsFromDb });
  let searchResults = searchResultsFromDb?.cityResults;

  if (!searchResults) {
    // if wasn't found in DB. search from API:
    console.log("did't find search in DB. will look in api");
    searchResults = await searchCitiesFromApi(searchStr);

    // update DB with results:
    const updateSearchCityResultsInDb = await citySearch.create({
      searchStr,
      cityResults: searchResults,
    });
    console.log({ updateSearchCityResultsInDb });
  } else {
    console.log("found search in DB");
  }

  const cityNameResults = searchResults.map((val) => val.name);

  // Api results includes also results that doesn't have exact string in name
  const cityFilteredResults = cityNameResults.filter((val) =>
    val.toLowerCase().includes(searchStr.toLowerCase())
  );
  // remove duplicate results
  const cityUnicResults = cityFilteredResults.filter(
    (val, idx, arr) => arr.indexOf(val) === idx
  );
  // console.log(
  //   { cityFilteredResults },
  //   { cityNameResults },
  //   { cityUnicResults }
  // );
  if (cityUnicResults.length) {
    return new Respond(200, cityUnicResults);
    // return { code: 200, data: citiesList };
  } else {
    // return { code: 404, data: "no cities wasn't found" };
    return new Respond(404, "", "no cities wasn't found");
  }
};

// const searchResultFromDb = async (searchStr) => {
//   return await citySearch.readOne({ searchStr });
// };

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

module.exports = {
  getCitiesList,
  getCityDetails,
  getCity_id,
  getCity_idByid,
  searchCitiesByString,
};

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
