const mongoose = require("mongoose");

const citySearchSchema = new mongoose.Schema(
  {
    searchStr: { type: String },
    cityResults: [],
  },

  { timestamps: true }
);

const citySearch = mongoose.model("citySearch", citySearchSchema);

module.exports = citySearch;
