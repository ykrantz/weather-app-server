const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
  userName: { type: String, required: true },
  // password: { type: String, required: true, select: false },
});

const user = mongoose.model("user", userSchema);

module.exports = user;
