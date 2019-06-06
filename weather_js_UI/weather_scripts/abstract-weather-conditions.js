/**
 * Abstract weather class, parent to the current, hourly, and daily forecast
 * classes. Uses common functions shared between the children
 */
class AbstractWeatherConditions {
  constructor(data) {
    this.data = data;
    this.iconMap = {
      "clear-day": `<img src="svg/day.svg" width="60" height="60" />`,
      "clear-night": `<img src="svg/night.svg" width="60" height="60" />`,
      cloudy: `<img src="svg/cloudy.svg" width="60" height="60" />`,
      default: `<img src="svg/weather_sagittarius.svg" width="60" height="60" />`,
      fog: `<i class="wi wi-fog iconImg"></i>`,
      "partly-cloudy-day": `<img src="svg/cloudy-day-3.svg" width="60" height="60" />`,
      "partly-cloudy-night": `<img src="svg/cloudy-night-3.svg" width="60" height="60" />`,
      rain: `<img src="svg/rainy-6.svg" width="60" height="60" />`,
      sleet: `<img src="svg/rainy-7.svg" width="60" height="60" />`,
      snow: `<img src="svg/snowy-6.svg" width="60" height="60" />`,
      wind: `<img src="svg/cloudy.svg" width="60" height="60" />`
    };
    this.bearingsMap = {
      0: `<i class="wi wi-wind from-0-deg iconImg sm"></i>`,
      23: `<i class="wi wi-wind from-23-deg iconImg sm"></i>`,
      45: `<i class="wi wi-wind from-45-deg iconImg sm"></i>`,
      68: `<i class="wi wi-wind from-68-deg iconImg sm"></i>`,
      90: `<i class="wi wi-wind from-90-deg iconImg sm"></i>`,
      113: `<i class="wi wi-wind from-113-deg iconImg sm"></i>`,
      135: `<i class="wi wi-wind from-135-deg iconImg sm"></i>`,
      158: `<i class="wi wi-wind from-158-deg iconImg sm"></i>`,
      180: `<i class="wi wi-wind from-180-deg iconImg sm"></i>`,
      203: `<i class="wi wi-wind from-203-deg iconImg sm"></i>`,
      225: `<i class="wi wi-wind from-225-deg iconImg sm"></i>`,
      248: `<i class="wi wi-wind from-248-deg iconImg sm"></i>`,
      270: `<i class="wi wi-wind from-270-deg iconImg sm"></i>`,
      293: `<i class="wi wi-wind from-293-deg iconImg sm"></i>`,
      313: `<i class="wi wi-wind from-313-deg iconImg sm"></i>`,
      336: `<i class="wi wi-wind from-336-deg iconImg sm"></i>`
    };
  }

  /**
   * Helper function to capitalize first letter of the summary heading
   *
   * @param {String} the heading to capitalize
   */
  capitalizeFirst = str => {
    try {
      str = str.toLowerCase();
      let firstIndex = str.charAt(0);
      firstIndex = firstIndex.toUpperCase();
      return firstIndex + str.substr(1, str.length);
    } catch (e) {
      return str;
    }
  };

  /**
   * Function to return the icon associated with the bearing degrees
   * It rounds the bearing number down to the next lowest bearing direction
   * and returns the icon
   *
   * @param {Number} the bearing/degrees
   */
  getWindBearingIcon = bearing => {
    const comparators = {
      0: loadComparators(0, 23),
      23: loadComparators(23, 45),
      45: loadComparators(45, 68),
      68: loadComparators(68, 90),
      90: loadComparators(90, 113),
      113: loadComparators(113, 135),
      135: loadComparators(135, 158),
      158: loadComparators(158, 180),
      180: loadComparators(180, 203),
      203: loadComparators(203, 225),
      225: loadComparators(225, 248),
      248: loadComparators(248, 270),
      270: loadComparators(270, 293),
      293: loadComparators(293, 313),
      313: loadComparators(313, 336),
      336: loadComparators(336, 361)
    };

    let finalBearing;
    Object.keys(comparators).forEach(key => {
      if (comparators[key].indexOf(bearing) !== -1) {
        finalBearing = key;
      }
    });

    if (finalBearing) {
      return this.bearingsMap[finalBearing];
    } else {
      return this.bearingsMap[0];
    }

    function loadComparators(start, finish) {
      let nums = [];
      for (let i = start; i < finish; i++) {
        nums.push(i);
      }
      return nums;
    }
  };

  /**
   * Function to set the header in the current forecast card
   *
   * @param {HTMLElement} el
   *     The html element to bind the text to
   *
   * @param {String} text
   *     The text to append to the element
   */
  setHeader = (el, text) => {
    el.innerHTML = text;
  };

  /**
   * Function to set the current forecast weather icon
   *
   * @param {HTMLElement} el
   *     The html element to bind the icon to
   *
   * @param {String} icon
   *     The icon element template literal
   */
  setIcon = (el, icon) => {
    let iconImg = this.iconMap.default;
    try {
      iconImg = this.iconMap[icon];
    } catch (e) {
      // do nothing
    }
    el.innerHTML = iconImg;
  };

  /**
   * Function to set the current status/summary in the current forecast card
   *
   * @param {HTMLElement} el
   *     The html element to bind the status to
   *
   * @param {String} summary
   *     The text to append to the element
   */
  setSummary = (el, summary) => {
    let currentStatus;
    try {
      currentStatus = summary;
    } catch (e) {
      currentStatus = "Conditions Unavailable";
    }
    currentStatus = this.capitalizeFirst(currentStatus).replace(/-/g, " ");
    const statusText = document.createTextNode(currentStatus);
    el.appendChild(statusText);
  };

  /**
   * Function to add the thermometer icon and current degrees in the current
   * forecast card
   *
   * @param {HTMLElement} iconEl
   *     The element to bind the thermometer to
   *
   * @param {HTMLElement} textEl
   *     The element to bind the temperature text to
   *
   * @param {Number} temperature
   *     The temperature
   */
  setTemperature = (iconEl, textEl, temperature) => {
    iconEl.innerHTML = `<i class="wi wi-thermometer iconImg"></i>`;
    let temp;
    try {
      temp = temperature;
      temp += "\u00B0";
    } catch (e) {
      temp = "Temp N/A";
    }
    const temperatureText = document.createTextNode(temp);
    textEl.appendChild(temperatureText);
  };
}
