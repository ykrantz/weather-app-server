const express = require("express");
const router = express.Router();
const cityWeather = require("../BL/cityWeatherLogic");

router.get("/", async (req, res) => {
  try {
    console.log("###");
    const cityName = req.query.city;
    const country = req.query.country;
    console.log({ cityName });
    const cityWeatherDetails = await cityWeather.getCityWeather(
      cityName,
      country
    );

    // console.log(cityWeatherDetails);
    res
      .status(cityWeatherDetails?.code)
      .json(cityWeatherDetails?.data || cityWeatherDetails?.message);
  } catch (e) {
    console.log(e);
    res.status(500).json({ message: "internal server eror" });
  }
});

module.exports = router;
