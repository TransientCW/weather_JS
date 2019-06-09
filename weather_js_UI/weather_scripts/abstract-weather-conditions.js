/**
 * Abstract weather class, parent to the current, hourly, and daily forecast
 * classes. Uses common functions shared between the children
 */
class AbstractWeatherConditions {
  constructor(data) {
    this.bearingsMap = getBearingsMap();
    this.data = data;
    this.daysOfWeek = getDaysOfWeek();
    this.hoursMap = getHoursMap();
    this.iconMap = getIconMap();
    this.moonPhasesMap = getMoonPhaseMap();
    this.summaryColors = getSummaryColors();
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
   * Function to return the icon associated with the moon phase.
   * It rounds the phase number down to the next lowest phase
   * and returns the icon
   *
   * @param {Number} the bearing/degrees
   */
  getMoonPhaseIcon = phase => {
    const comparators = {
      "0": loadComparators(0, 0.03),
      "0.03": loadComparators(0.03, 0.07),
      "0.07": loadComparators(0.07, 0.1),
      "0.1": loadComparators(0.1, 0.14),
      "0.14": loadComparators(0.14, 0.18),
      "0.18": loadComparators(0.18, 0.21),
      "0.21": loadComparators(0.21, 0.25),
      "0.25": loadComparators(0.25, 0.28),
      "0.28": loadComparators(0.28, 0.32),
      "0.32": loadComparators(0.32, 0.36),
      "0.36": loadComparators(0.36, 0.39),
      "0.39": loadComparators(0.39, 0.43),
      "0.43": loadComparators(0.43, 0.46),
      "0.46": loadComparators(0.46, 0.5),
      "0.5": loadComparators(0.5, 0.54),
      "0.54": loadComparators(0.54, 0.57),
      "0.57": loadComparators(0.57, 0.61),
      "0.61": loadComparators(0.61, 0.64),
      "0.64": loadComparators(0.64, 0.68),
      "0.68": loadComparators(0.68, 0.72),
      "0.72": loadComparators(0.72, 0.75),
      "0.75": loadComparators(0.75, 0.79),
      "0.79": loadComparators(0.79, 0.82),
      "0.82": loadComparators(0.82, 0.86),
      "0.86": loadComparators(0.86, 0.89),
      "0.89": loadComparators(0.89, 0.93),
      "0.93": loadComparators(0.93, 0.97),
      "0.97": loadComparators(0.97, 1)
    };

    console.log(comparators);

    let finalPhase;
    Object.keys(comparators).forEach(key => {
      if (comparators[key].indexOf(phase) !== -1) {
        finalPhase = key;
      }
    });

    if (finalPhase) {
      return this.moonPhasesMap[finalPhase];
    } else {
      return this.moonPhasesMap[0];
    }

    function loadComparators(start, finish) {
      let nums = [];
      for (let i = start; i < finish; i += 0.01) {
        nums.push(i.toFixed(2));
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
