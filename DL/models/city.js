const mongoose = require("mongoose");

const citySchema = new mongoose.Schema({
  id: { type: String },
  name: { type: String, required: true },
  country: { type: String, required: true },

  coord: {
    lon: { type: Number },
    lat: { type: Number },
  },
  population: { type: Number },
  timezone: { type: Number },
});

const city = mongoose.model("city", citySchema);

module.exports = city;
