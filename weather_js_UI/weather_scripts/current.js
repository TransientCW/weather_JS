class Current extends AbstractWeatherConditions {
  constructor(data, icon, summary) {
    super(data);
    this.icon = icon;
    this.summary = summary;
  }

  setDetailsList = el => {
    try {
      const currently = this.data;
      const detailsData = [
        {
          label: 'Dew Point',
          value: `${currently.dewPoint} \u00B0F` || 'NA',
          icon: null
        },
        {
          label: 'Humidity',
          value: currently.humidity || 'NA',
          icon: `<i class="wi wi-humidity iconImg sm"></i>`
        },
        {
          label: 'Wind Bearing',
          value: `${currently.windBearing} \u00B0` || 'NA',
          icon: this.getWindBearingIcon(currently.windBearing)
        },
        {
          label: 'Wind Gusts',
          value: `${currently.windGust} mph` || 'NA',
          icon: `<i class="wi wi-strong-wind iconImg sm"></i>`
        },
        { label: 'Wind Speed', value: `${currently.windSpeed} mph` || 'NA' }
      ];

      detailsData.forEach(detail => {
        // create list item
        const li = document.createElement('li');
        li.className = `w-75
        mx-auto
        text-center
        list-group-item
        list-group-item-primary
        d-flex
        flex-row
        justify-content-between
        align-items-center`;

        // create text label
        const label = document.createTextNode(`${detail.label}: `);
        // create value label
        const value = document.createTextNode(detail.value);

        // append text nodes to list item
        li.appendChild(label);
        li.appendChild(value);
        if (detail.icon) {
          const p = document.createElement('p');
          p.innerHTML = detail.icon;
          li.appendChild(p);
        }
        el.appendChild(li);
      });
    } catch (e) {
      console.log(e);
    }
  };

  setSummaryStatus = el => {
    this.setSummary(el, this.summary);
  };

  setTemperatureWithIcon = (iconEl, textEl) => {
    this.setTemperature(iconEl, textEl, this.data.temperature);
  };
}
