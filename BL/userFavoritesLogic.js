const Respond = require("../Utils/respondFormat");
const userFavorites = require("../DL/controllers/userFavoritesController");
const user = require("../DL/controllers/userController");
const city = require("../DL/controllers/cityController");

// const getAllFavoriteCities = async () => {
//   const FavoriteCities = await userFavorites.readAndPopulate(
//     { user: existUser._id },
//     "",
//     "favoriteCities"
//   );
//   return new Respond(200, FavoriteCities.favoriteCities);
// };

const getAllFavoriteCitiesOfUser = async (userDetails) => {
  const userId = userDetails?._id;
  const existUser = await user.readOne({ _id: userId });
  if (existUser) {
    const FavoriteCities = await userFavorites.readAndPopulate(
      { user: existUser._id },
      "",
      "favoriteCities"
    );
    return new Respond(200, FavoriteCities.favoriteCities);
  } else {
    // return { code: 404, data: "no cities wasn't found" };
    return new Respond(404, "", "user doesn't exist");
  }
};

const addCityToUserFavorite = async (userDetails, cityName) => {
  console.log("ADDDD");
  const userId = userDetails?._id;
  const city_id = await city.readOne({ name: cityName.toLowerCase() }, "_id");
  console.log({ city_id }, { userId });
  if (city_id) {
    const existUserCityFavorites = await userFavorites.readOne({
      user: userId,
    });
    console.log({ existUserCityFavorites });
    let newUserCityFavorites = {};
    if (!existUserCityFavorites) {
      // if favortie for user doesn;t exist create favorite

      newUserCityFavorites = await userFavorites.create({
        user: userId,
        $push: { favoriteCities: city_id },
      });
    } else {
      // if favortie for user  exist=> update it
      checkIfCityAlreadyExistInFavorite(userId, city_id);
      if (!checkIfCityAlreadyExistInFavorite) {
        newUserCityFavorites = await userFavorites.update(
          existUserCityFavorites._id,
          { $push: { favoriteCities: city_id } }
        );
      } else {
        // if city already in favorites , won't add it
        return new Respond(401, "", "city already exist in favorite  list");
      }
    }

    // const newUserCityFavorites = await userFavorites.updateByFilter(
    //   {
    //     user: userId,
    //   },
    //   { favoriteCities: city_id }
    //   //   { $push: { favoriteCities: city_id } }
    // );
    const newUserCityFavoritesPopulate = await userFavorites.readAndPopulate(
      { _id: newUserCityFavorites._id },
      "",
      "favoriteCities"
    );
    return new Respond(200, newUserCityFavoritesPopulate);
  } else {
    // return { code: 404, data: "no cities wasn't found" };
    return new Respond(404, "", "city wan't found and not added");
  }
};

const checkIfCityAlreadyExistInFavorite = async (userId, city_Id) => {
  // TODO: why if city doesnr exist i get message of exist
  const cityAlreadyInFavorite = await userFavorites.readOne({
    user: userId,
    favoriteCities: { $in: city_Id },
  });
  console.log({ cityAlreadyInFavorite });
  return cityAlreadyInFavorite ? true : false;
};
module.exports = {
  //   getAllFavoriteCities,
  getAllFavoriteCitiesOfUser,
  addCityToUserFavorite,
};
