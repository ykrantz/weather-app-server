const express = require("express");
const router = express.Router();
const city = require("../BL/cityLogic");

router.get("/", async (req, res) => {
  try {
    const citiesList = await city.getCitiesList();

    console.log(citiesList);
    res.status(citiesList.code).json(citiesList.data);
  } catch (e) {
    console.log(e);
    res.status(500).json({ message: "internal server eror" });
  }
});

router.get("/:city", async (req, res) => {
  try {
    const cityName = req.params.city;
    console.log({ cityName });
    const cityDetails = await city.getCityDetails(cityName);

    console.log(cityDetails);
    res.status(cityDetails.code).json(cityDetails.data);
  } catch (e) {
    console.log(e);
    res.status(500).json({ message: "internal server eror" });
  }
});

module.exports = router;
