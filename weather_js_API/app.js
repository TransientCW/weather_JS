require("dotenv").config();
const express = require("express");
const logger = require("morgan");
const http = require("http");
const port = process.env.WEATHER_JS_PORT;
const Weather = require("./weather");

const app = express();

const googleKey = process.env.GOOGLE_KEY;
const darkSkyKey = process.env.DARKSKY_KEY;

let weatherReq;

// set http port
app.set("port", port);

// logging
app.use(logger("short"));

// set headers
app.use(function(req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header(
    "Access-Control-Allow-Headers",
    "Origin, X-Requested-With, Content-Type, Accept"
  );
  next();
});

// routes
app.get("/", (req, res) => {
  let city;
  if (req.query.city) {
    city = req.query.city.replace(" ", "+");
    weatherReq = new Weather(city, googleKey, darkSkyKey);
    weatherReq
      .getWeather()
      .then(weatherData => {
        res.setHeader("Content-Type", "application/json");
        res.json(weatherData);
      })
      .catch(e => {
        res.status(500).send({ error: e });
      });
  } else {
    console.log("nope");
    res.status(500).send({ error: "Error, missing parameters" });
  }
  weatherReq = null;
});

// Spin up app
http.createServer(app).listen(port, () => {
  console.log("App listening on port: ", port);
});
