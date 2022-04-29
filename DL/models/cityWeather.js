const mongoose = require("mongoose");

const cityWeahterSchema = new mongoose.Schema(
  {
    city: { type: mongoose.SchemaTypes.ObjectId, ref: "city", required: true },

    daysWeather: [],
  },

  { timestamps: true }
);

const cityWeahter = mongoose.model("cityWeahter", cityWeahterSchema);

module.exports = cityWeahter;
