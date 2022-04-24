const mongoose = require("mongoose");

const dayWeatherSchema = new mongoose.Schema(
  {
    date: { type: Date, required: true },
    temp: { type: Number, required: true },
    pressure: { type: String },
    humidity: { type: String },
    city: { type: mongoose.SchemaTypes.ObjectId, ref: "city" },
  },

  { timestamps: true }
);

const dayWeather = mongoose.model("dayWeather", dayWeatherSchema);

module.exports = dayWeather;
