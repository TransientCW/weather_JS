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
    this.twentyFourHours = this.buildHourlyObjects(this.data.slice(0, 24));
  };

  buildHourlyObjects = hourlyArray => {
    const hoursMap = this.hoursMap;
    const summaryColors = this.summaryColors;

    const weatherBar = document.createElement("div");
    weatherBar.className = `progress
        mt-3
        mb-1
        d-flex
        flex-row
        justify-content-center
        align-items-center
      `;
    weatherBar.style.height = "35px";
    weatherBar.style.width = "98%";
    weatherBar.style.backgroundColor = "transparent";
    weatherBar.style.boxShadow = "0px 1px 10px rgba(0, 0, 0, 0.5)";

    const hourlyBar = document.createElement("div");
    hourlyBar.className =
      "d-flex flex-row justify-content-center align-items-start w-100";
    hourlyBar.style.height = "70px";

    let hourlyDate = new Date().getHours();
    let startHoursModule = hourlyDate % 2 === 0 ? "even" : "odd";

    // Loop through each hourly object and add to the hourlyBody div
    hourlyArray.forEach(hourly => {
      if (hourlyDate >= 24) {
        hourlyDate = 0;
      }
      if (startHoursModule === "even") {
        if (hourlyDate % 2 === 0) {
          hourly.hoursTime = hoursMap[hourlyDate];
        } else {
          hourly.hoursTime = "";
        }
      } else {
        if (hourlyDate % 2 === 0) {
          hourly.hoursTime = "";
        } else {
          hourly.hoursTime = hoursMap[hourlyDate];
        }
      }
      // Add colored box to the weather colored div
      const barPiece = document.createElement("div");
      barPiece.className =
        "progress-bar d-flex flex-column justify-content-center align-items-center";
      const width = 100 / 24;
      barPiece.style.width = `${width}%`;
      barPiece.style.height = "35px";
      let hourlyIcon = "default";
      if (hourly.icon) {
        hourlyIcon = hourly.icon;
      }
      barPiece.style.background = summaryColors[hourlyIcon];

      // Add hourly graph and text/data to the hourly bar
      const hourlyGridBox = document.createElement("div");
      hourlyGridBox.className =
        "d-flex flex-column justify-content-center align-items-center";
      hourlyGridBox.style.width = `${width}%`;
      const temperature =
        hourly.hoursTime === "" ? "" : hourly.temperature + "\u00B0";
      const pipe = hourly.hoursTime === "" ? "ı" : "|";
      hourlyGridBox.innerHTML = `
        <p>${pipe}</p>
        <div style="position: relative; left: 15px;">
          <p class="smText font-weight-light">${hourly.hoursTime}</p>
        </div>
        <div style="position: relative; left: 15px;">
          <p class="font-weight-bold">${temperature}</p>
        </div>
      `;

      weatherBar.appendChild(barPiece);
      hourlyBar.appendChild(hourlyGridBox);
      hourlyDate++;
    });
    this.hourlyBody.appendChild(weatherBar);
    this.hourlyBody.appendChild(hourlyBar);
    this.buildHourlyTextObjects(hourlyArray);
  };

  buildHourlyTextObjects = hourlyArray => {
    const hourlyBar = document.createElement("div");
  };

  setForecastList = () => {
    // Create outer wrapper div
    const outer = document.createElement("div");
    outer.className = "card border-secondary mb-3 mx-auto w-100";
    outer.style.height = "290px";
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
    hourlyBody.className =
      "card-body p-0 d-flex flex-column justify-content-start align-items-center";
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
