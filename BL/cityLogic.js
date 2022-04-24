const city = require("../DL/controllers/cityController");

const getCitiesList = async () => {
  const citiesList = await city.read();
  if (citiesList.length) {
    return { code: 200, data: citiesList };
  } else {
    return { code: 404, data: "no cities wasn't found" };
  }
};

const getCityDetails = async (cityName) => {
  const cityDetails = await city.readOne({ name: cityName });
  if (cityDetails) {
    return { code: 200, data: cityDetails };
  } else {
    return { code: 404, data: "city wasn'r found" };
  }
};

module.exports = { getCitiesList, getCityDetails };
