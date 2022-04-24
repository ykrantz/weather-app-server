require("dotenv").config();
const mongoose = require("mongoose");
const mongoUrl = process.env.MONGO_URL;

const connectDB = async () => {
  try {
    return await mongoose.connect(
      mongoUrl,
      {
        useNewUrlParser: true,
      },
      (err) => {
        if (err) {
          console.log("eror: ", err);
          return;
        } else {
          console.log(
            "mongoDB connected. Ready state is: ",
            mongoose.connection.readyState
          );
        }
      }
    );
  } catch (err) {
    console.log("Eror message: ", err);
  }
};

exports.connect = connectDB;
