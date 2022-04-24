const mongoose = require("mongoose");

const cityWeahterSchema = new mongoose.Schema(
  {
    city: { type: mongoose.SchemaTypes.ObjectId, ref: "city", required: true },
    weather: [
      {
        type: mongoose.SchemaTypes.ObjectId,
        ref: "dayWeather",
        required: true,
      },
    ],
  },

  { timestamps: true }
);

const cityWeahter = mongoose.model("cityWeahter", cityWeahterSchema);

module.exports = cityWeahter;
