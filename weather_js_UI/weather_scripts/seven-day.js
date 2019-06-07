class SevenDay extends AbstractWeatherConditions {
  constructor(data, icon, summary) {
    super(data);
    this.icon = icon;
    this.summary = summary;
    this.foreCastCard = null;
    this.moonPhasesCard = null;
  }

  initialize = () => {
    this.foreCastCard = this.setForecastList();
    this.moonPhasesCard = this.setMoonPhasesList();
  };

  setForecastList = () => {
    const wrapper = `
      <div class="card border-secondary mb-3 mx-auto" style="width: 98%">
        <div class="card-header d-flex flex-row justify-content-around align-items-center">
          <h4 class="text-success mb-0">${this.summary}</h4>
          ${this.iconMap[this.icon]}
        </div>
        <hr class="m-0 ml-1 mr-1" style="border: 1px solid orange; box-shadow: 1px 1px 7px green" />
        <div class="card-body">
          <h4 class="card-title">Success card title</h4>
          <p class="card-text">content</p>
        </div>
      </div>
    `;
    const div = document.createElement("div");
    div.classList.add("row");
    div.innerHTML = wrapper;
    return div;
  };

  setMoonPhasesList = () => {
    const wrapper = `
      <div class="card border-secondary mb-3 mx-auto" style="width: 98%">
        <div class="card-header d-flex flex-row justify-content-around align-items-center">
          <h4 class="text-success mb-0">${this.summary}</h4>
          ${this.iconMap[this.icon]}
        </div>
        <hr class="m-0 ml-1 mr-1" style="border: 1px solid orange; box-shadow: 1px 1px 7px green" />
        <div class="card-body">
          <h4 class="card-title">Success card title</h4>
          <p class="card-text">content</p>
        </div>
      </div>
    `;
    const div = document.createElement("div");
    div.classList.add("row");
    div.innerHTML = wrapper;
    return div;
  };

  getCurrentForecast = type => {
    if (type === "daily") {
      return this.foreCastCard;
    }
    if (type === "moon") {
      return this.moonPhasesCard;
    }
  };
}
