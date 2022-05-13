const express = require("express");
const router = express.Router();
const userFavorites = require("../BL/userFavoritesLogic");

// create user:
router.get("/", async (req, res) => {
  try {
    const userDetails = req.body;
    const favoritecities = await userFavorites.getAllFavoriteCitiesOfUser(
      userDetails
    );
    res
      .status(favoritecities?.code)
      .json(favoritecities?.data || favoritecities?.message);
  } catch (e) {
    console.log(e);
    res.status(500).json({ message: "internal server eror" });
  }
});

// get all favorite city
// TODO: change to get with header
router.get("/favoritecities", async (req, res) => {
  try {
    const favoritecities = await userFavorites.getAllFavoriteCities();
    res
      .status(favoritecities?.code)
      .json(favoritecities?.data || favoritecities?.message);
  } catch (e) {
    console.log(e);
    res.status(500).json({ message: "internal server eror" });
  }
});

router.put("/addcitytofavorite", async (req, res) => {
  try {
    console.log("$$$");
    const { cityName, user } = req.body;
    const newFavotiteList = await userFavorites.addCityToUserFavorite(
      user,
      cityName
    );
    res
      .status(newFavotiteList?.code)
      .json(newFavotiteList?.data || newFavotiteList?.message);
  } catch (e) {
    console.log(e);
    res.status(500).json({ message: "internal server eror" });
  }
});

module.exports = router;
