class SevenDay extends AbstractWeatherConditions {
  constructor(data, icon, summary) {
    super(data);
    this.icon = icon;
    this.summary = summary;
    this.foreCastCard = null;
    this.moonPhasesCard = null;
  }

  initialize = () => {
    this.foreCastCard = this.renderList("daily");
    this.moonPhasesCard = this.renderList("moon");
  };

  getCurrentForecast = type => {
    if (type === "daily") {
      return this.foreCastCard;
    }
    if (type === "moon") {
      return this.moonPhasesCard;
    }
  };

  getDailyDetails() {
    let inner = ``;
    let day = parseInt(new Date().getDay());
    this.data.forEach(daily => {
      if (day === 8) {
        day = 1;
      }
      let today = this.daysOfWeek[day];
      let tempMax = daily.temperatureMax || "NA";
      let tempMin = daily.temperatureLow || "NA";
      tempMax += "\u00B0";
      tempMin += "\u00B0";
      let windSpeed = daily.windSpeed || "";
      windSpeed += " MPH";
      // inner += `
      //   <div class="d-flex flex-column justify-content-center align-items-center w-25">
      //     <div>${this.iconMap[daily.icon]}</div>
      //     <p class="text-dark mdText">${today}</p>
      //     <div class="d-flex flex-row flex-wrap justify-content-between align-items-center>
      //       <div class="d-flex flex-column justify-content-center align-items-center>
      //         <i class="wi wi-direction-down"></i>
      //         <p class="text-dark mdText">${tempMin}</p>
      //       </div>
      //       <div class="d-flex flex-column justify-content-center align-items-center>
      //         <i class="wi wi-direction-up"></i>
      //         <p class="text-dark mdText">${tempMax}</p>
      //       </div>
      //     </div>
      //   </div>
      // `;
      inner += `
      <div class="d-flex flex-column justify-content-center align-items-center w-25 m-1">
        ${this.iconMap[daily.icon]}
        <p class="text-dark mdText">${today}</p>
        <i class="wi wi-direction-up"></i>
        <p class="text-dark mdText">${tempMax}</p>
        <i class="wi wi-direction-down"></i>
        <p class="text-dark mdText">${tempMin}</p>
        <span class="mdText">${this.getWindBearingIcon(
          daily.windBearing
        )} ${windSpeed}</span>
      </div>
      `;
      day++;
    });
    return inner;
  }

  renderList = type => {
    let inner;
    if (type === "daily") {
      inner = this.getDailyDetails();
    } else {
      inner = ``;
    }
    const wrapper = document.createElement("div");
    wrapper.className = "card border-secondary mb-3 mx-auto w-100";
    wrapper.innerHTML = `
      <div class="card-header d-flex flex-row justify-content-around align-items-center">
        <h4 class="text-success mb-0">${this.summary}</h4>
      </div>
      <hr class="m-0 ml-1 mr-1" style="border: 1px solid orange; box-shadow: 1px 1px 7px green" />
      <div class="card-body d-flex flex-row flex-wrap justify-content-center align-items-center">
        ${inner}
      </div>
    `;
    return wrapper;
  };
}
