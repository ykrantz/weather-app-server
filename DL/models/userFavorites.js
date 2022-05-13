const mongoose = require("mongoose");

const userFavoritesSchema = new mongoose.Schema(
  {
    user: { type: mongoose.SchemaTypes.ObjectId, ref: "user", required: true },

    favoriteCities: [
      { type: mongoose.SchemaTypes.ObjectId, ref: "city", required: true },
    ],
  },

  { timestamps: true }
);

const userFavorites = mongoose.model("userFavorites", userFavoritesSchema);

module.exports = userFavorites;
