const express = require("express");
const cors = require("cors");
const bodyParser = require("body-parser");

const cityRoute = require("./Routes/cityRoute");
const cityWeatherRoute = require("./Routes/cityWeatherRoute");
const userRoute = require("./Routes/userRoute");
const userFavoritesRoute = require("./Routes/userFavoritesRoute");

require("dotenv").config();

const port = process.env.PORT;

const app = express();

// Uses:
app.use(express.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cors());

app.use("/api/city", cityRoute);
app.use("/api/cityWeather", cityWeatherRoute);
app.use("/api/user", userRoute);
app.use("/api/userFavorites", userFavoritesRoute);
// app.use("/api/city", cityWeatherRoute);

require("./DL/db")
  .connect()
  .then(() => {
    console.log("***connected succsesfuly to DB***");
    app.listen(port, () => {
      console.log(`#### Server on air. Port: ${port} ####`);
    });
  });
