function getIconMap() {
  return {
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
}

function getBearingsMap() {
  return {
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

function getHoursMap() {
  return {
    0: "12:00AM",
    1: "01:00AM",
    2: "02:00AM",
    3: "03:00AM",
    4: "04:00AM",
    5: "05:00AM",
    6: "06:00AM",
    7: "07:00AM",
    8: "08:00AM",
    9: "09:00AM",
    10: "10:00AM",
    11: "11:00AM",
    12: "12:00PM",
    13: "01:00PM",
    14: "02:00PM",
    15: "03:00PM",
    16: "04:00PM",
    17: "05:00PM",
    18: "06:00PM",
    19: "07:00PM",
    20: "08:00PM",
    21: "09:00PM",
    22: "10:00PM",
    23: "11:00PM"
  };
}

function getSummaryColors() {
  return {
    "clear-day": "#ccffff",
    "clear-night": "#ccffff",
    cloudy: "#e6e6e6",
    default: "#ccffff",
    fog: "#cccccc",
    "partly-cloudy-day": "#cccccc",
    "partly-cloudy-night": "#cccccc",
    rain: "#1a8cff",
    sleet: "#1a8cff",
    snow: "#1a8cff",
    wind: "#e6f2ff"
  };
}
