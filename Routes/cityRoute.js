const express = require("express");
const router = express.Router();
const city = require("../BL/cityLogic");

router.get("/", async (req, res) => {
  try {
    console.log("###");
    const cityName = req.query.city;
    const country = req.query.country;
    console.log({ cityName });
    const cityDetails = await city.getCityDetails(cityName, country);

    console.log(cityDetails);
    res.status(cityDetails.code).json(cityDetails.data || cityDetails.message);
  } catch (e) {
    console.log(e);
    res.status(500).json({ message: "internal server eror" });
  }
});

router.get("/allcity", async (req, res) => {
  try {
    const citiesList = await city.getCitiesList();

    console.log(citiesList);
    res.status(citiesList.code).json(citiesList.data);
  } catch (e) {
    console.log(e);
    res.status(500).json({ message: "internal server eror" });
  }
});

router.get("/searchcity/:serachstr", async (req, res) => {
  try {
    const serachStr = req.params.serachstr;

    const citiesStrResults = await city.searchCitiesByString(serachStr);
    res.status(citiesStrResults.code).json(citiesStrResults.data);
  } catch (e) {
    console.log(e);
    res.status(500).json({ message: "internal server eror" });
  }
});

module.exports = router;
