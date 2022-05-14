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
router.post("/favoritecities", async (req, res) => {
  try {
    // TODO: when add JWT to change to get anf get user from heade
    // TODO:. and change the variable that pass to function

    const userDetails = req?.body?.body;
    const favoritecities = await userFavorites.getAllFavoriteCitiesOfUser(
      userDetails
    );
    console.log({ favoritecities }, req.body);
    res
      .status(favoritecities?.code)
      .json(favoritecities?.data || favoritecities?.message);
  } catch (e) {
    console.log(e);
    res.status(500).json({ message: "internal server eror" });
  }
});

router.put("/addcitytofavorite/:cityName", async (req, res) => {
  try {
    console.log("$$$");
    const cityName = req.params.cityName;
    console.log("12", req.body);
    const user = req.body.body;
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
