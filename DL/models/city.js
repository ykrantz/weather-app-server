const mongoose = require("mongoose");

const citySchema = new mongoose.Schema({
  id: { type: String, required: true },
  name: { type: String, required: true },
  country: { type: String, required: true },
});

const city = mongoose.model("city", citySchema);

module.exports = city;
