const fetch = require("node-fetch");

// Create weather object for each forecast request
class Weather {
  constructor(city, googleKey, darkSkyKey) {
    this.google_key = googleKey;
    this.dark_key = darkSkyKey;
    this.city = city;
    this.darkSkyURL = `https://api.darksky.net/forecast/${this.dark_key}/`;
    this.googleGeoURL = `https://maps.googleapis.com/maps/api/geocode/json?address=+${
      this.city
    }&key=${googleKey}`;
  }

  /**
   * Initialization function
   */
  getWeather() {
    return this.getLatLong().then(data => {
      if (data.results && data.results.length === 0) {
        return Promise.reject("City not found");
      }
      try {
        let formattedAddress = data.results[0]["formatted_address"];
        const location = data.results[0].geometry.location;
        return this.getCurrentWeather(location).then(data => {
          if (data && data.error) {
            return Promise.reject("Invalid lat/long location");
          } else {
            return Promise.resolve({ data, formattedAddress });
          }
        });
      } catch (e) {
        return Promise.reject("Error getting weather data");
      }
    });
  }

  /**
   * Query google geocode API for lat long from city/state
   */
  async getLatLong() {
    let response = await fetch(this.googleGeoURL);
    let data = await response.json();
    return data;
  }

  /**
   * Query darkSky API to get current details of lat/long
   *
   * @param {Object} location
   */
  async getCurrentWeather(location) {
    const lat = location.lat;
    const lng = location.lng;
    let response = await fetch(`${this.darkSkyURL}${lat},${lng}?units=auto`);
    let data = await response.json();
    return data;
  }
}

module.exports = Weather;
