const mongoose = require("mongoose");

const citySchema = new mongoose.Schema({
  id: { type: Number },
  name: { type: String, required: true },
  country: { type: String, required: true },
  region: { type: String },

  lat: { type: Number },
  long: { type: Number },
  timezone_id: { type: String },
});

const city = mongoose.model("city", citySchema);

module.exports = city;
