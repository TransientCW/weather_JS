const iconMap = {
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

// Change this to the port the node app is running on
const PORT = 8080;

const card = document.querySelector("#w-card");
const citySelect = document.querySelector("#w-city");
const description = document.querySelector("#w-desc");
const detailsList = document.querySelector("#w-details-list");
const foreCastsCard = document.querySelector("#w-forecasts-card");
const hourlyTab = document.querySelector("#hourly-tab");
const iconEl = document.querySelector("#w-icon");
const locationHeader = document.querySelector("#w-location");
const moonPhasesTab = document.querySelector("#moon-phases-tab");
const otherCard = document.querySelector("#w-other");
const sevenDayTab = document.querySelector("#seven-day-tab");
const statusHeader = document.querySelector("#w-status");
const tempIcon = document.querySelector("#w-temp");
const tempText = document.querySelector("#w-temp-text");
const weatherSubmit = document.querySelector("#w-changebtn");

const cardElements = [
  locationHeader,
  description,
  iconEl,
  detailsList,
  statusHeader,
  tempIcon,
  tempText
];

weatherSubmit.addEventListener("click", async e => {
  e.preventDefault();

  // Toggle spinner on
  $("#spinner-modal").modal("show");

  const city = citySelect.value;

  if (document.querySelector("#w-alert-warning")) {
    card.firstChild.remove();
  }

  if (city && city !== "") {
    fetch(`http://localhost:${PORT}/?city=${city}`)
      .then(result => {
        return result.json();
      })
      .then(weather => {
        if (!weather.error) {
          // Hide main header
          document.querySelector("#w-main-header").innerHTML = "";
          // Toggle spinner off
          $("#spinner-modal").modal("hide");
          processWeather(weather.data, weather.formattedAddress);
        } else {
          console.log(weather.error);
          $("#spinner-modal").modal("hide");
          showError(weather.error);
        }
      })
      .catch(e => {
        console.log(e);
        $("#spinner-modal").modal("hide");
        showError(e);
      });
  } else {
    $("#spinner-modal").modal("hide");
    showError("Address not provided");
  }

  document.querySelector("#w-close-modal").click();
});

/**
 * Clear elements html
 */
clearInner = el => {
  if (el && el.hasChildNodes()) {
    while (el.hasChildNodes()) {
      el.removeChild(el.firstChild);
    }
  }
};

/**
 * Clear each card elements child nodes
 */
clearWeatherCard = () => {
  cardElements.forEach(el => {
    clearInner(el);
  });
};

processCurrentForecast = (currentClass, city) => {
  // Set location header
  currentClass.setHeader(locationHeader, city);
  // Set conditions icon
  currentClass.setIcon(iconEl, currentClass.icon);
  // Set summary header
  currentClass.setSummaryStatus(statusHeader);
  // Set up thermometer icon and temp
  currentClass.setTemperatureWithIcon(tempIcon, tempText);
  // Set up current details list
  currentClass.setDetailsList(detailsList);
};

processHourlyForecast = (hourlyClass, city) => {
  hourlyTab.addEventListener("click", e => {
    const hourlyForecast = hourlyClass.getCurrentForecast();
    showForecastCard(hourlyForecast);
  });
};

processSevenDayForecast = (sevenDayClass, city) => {
  sevenDayTab.addEventListener("click", e => {
    const sevenDayForecast = sevenDayClass.getCurrentForecast("daily");
    showForecastCard(sevenDayForecast);
  });
  moonPhasesTab.addEventListener("click", e => {
    const moonPhasesForecast = sevenDayClass.getCurrentForecast("moon");
    showForecastCard(moonPhasesForecast);
  });
};

/**
 * Load data into weather card
 */
processWeather = (weather, city) => {
  console.log(weather);
  // Show hourly/daily card
  otherCard.classList.remove("hidden");
  otherCard.classList.add("visible");

  // Create new current/hourly/daily data objects
  const _currentForecast = new Current(
    weather.currently,
    weather.currently.icon,
    weather.currently.summary
  );
  const _hourlyForecast = new Hourly(
    weather.hourly.data,
    weather.hourly.icon,
    weather.hourly.summary
  );
  _hourlyForecast.initialize();
  const _sevenDayForecast = new SevenDay(
    weather.daily.data,
    weather.daily.icon,
    weather.daily.summary
  );
  _sevenDayForecast.initialize();

  // Clear current weather data
  clearWeatherCard();

  // Process current forecast
  processCurrentForecast(_currentForecast, city);
  // Process hourly forecast
  processHourlyForecast(_hourlyForecast, city);
  // Process 7 day forecast
  processSevenDayForecast(_sevenDayForecast, city);

  // Show default hourly forecast card
  showForecastCard(_hourlyForecast.getCurrentForecast());
};

/**
 * Show friendly error on page
 */
showError = msg => {
  let errorMsg = "Something went wrong";
  if (msg) {
    errorMsg = msg;
  }
  const error = document.createElement("div");
  error.className = "alert alert-dismissible alert-warning";
  // error.classList.add("alert");
  // error.classList.add("alert-dismissible");
  // error.classList.add("alert-warning");
  error.setAttribute("id", "w-alert-warning");
  error.innerHTML = `
    <button type="button" class="close" data-dismiss="alert">&times;</button>
    <h4 class="alert-heading">Warning!</h4>
    <p class="mb-0">${errorMsg}</p>
  `;
  if (document.querySelector("#w-alert-warning")) {
    card.firstChild.remove();
  }
  const topContainer = document.querySelector("#w-top-container");
  card.insertBefore(error, topContainer);
};

showForecastCard = card => {
  foreCastsCard.innerHTML = "";
  foreCastsCard.appendChild(card);
};
