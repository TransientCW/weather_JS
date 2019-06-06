class Hourly extends AbstractWeatherConditions {
  constructor(data, icon, summary) {
    super(data);
    this.icon = icon;
    this.summary = summary;
    this.foreCastCard = null;
    this.twentyFourHours = null;
    this.hourlyObjects = [];
    this.hourlyBody = null;
  }

  initialize = () => {
    this.foreCastCard = this.setForecastList();
    this.twentyFourHours = this.buildHourlyObjects(this.data.slice(0, 25));
  };

  buildHourlyObjects = hourlyArray => {
    // This function will build the entire hourly summary graph bar,
    // and each individual hourly summary beneath it
  };

  setForecastList = () => {
    // Create outer wrapper div
    const outer = document.createElement("div");
    outer.className = "card border-secondary mb-3 mx-auto w-100";
    // Create summary header div
    const header = document.createElement("div");
    header.className =
      "card-header d-flex flex-row justify-content-between align-items-center";
    // Append summary status to summary header div
    const headerStatus = document.createElement("h4");
    headerStatus.className = "text-success mb-0";
    headerStatus.appendChild(document.createTextNode(`${this.summary}`));
    // Create weather icon
    const iconSpan = document.createElement("span");
    iconSpan.innerHTML = `${this.iconMap[this.icon]}`;
    // Append both header summary and weather icon to summary header div
    header.appendChild(headerStatus);
    header.appendChild(iconSpan);
    // Append entire header to outer wrapper
    outer.appendChild(header);
    // Create hr for beneath summary header
    const hr = document.createElement("hr");
    hr.className = "m-0 ml-1 mr-1";
    hr.setAttribute(
      "style",
      "border: 1px solid orange; box-shadow: 1px 1px 7px green"
    );
    // Create body for all dynamic hourly content and set reference in field
    const hourlyBody = document.createElement("div");
    hourlyBody.className = "card-body";
    hourlyBody.setAttribute("id", "hourly-body");
    this.hourlyBody = hourlyBody;
    // Append the hr and the hourly body to the outer wrapper
    outer.appendChild(hr);
    outer.appendChild(hourlyBody);
    return outer;
  };

  getCurrentForecast = () => {
    return this.foreCastCard;
  };
}
