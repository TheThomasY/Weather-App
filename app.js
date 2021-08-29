window.addEventListener('load', () => {
  let lon;
  let lat;
  let weatherDescription = document.querySelector('.weather-description');
  let windSpeed = document.querySelector('.wind-speed');
  let locationName = document.querySelector('.location-name');
  let tempDegree = document.querySelector('.temp-degree');
  let tempWeek = [];
  let tempHours = [];

  let date = new Date();
  const days = ['SUN', 'MON', 'TUE', 'WED', 'THU', 'FRI', 'SAT'];
  let daysRow = document.getElementById('tr-days');
  for (let i = 1; i < 6; i++) {
    let cell = daysRow.insertCell();
    let day = document.createTextNode(days[(date.getDay() + i) % 7]);
    cell.appendChild(day);
  }

  let time = date.getHours();
  console.log(Math.floor(time / 3));

  const times = [
    '00:00',
    '03:00',
    '06:00',
    '09:00',
    '12:00',
    '15:00',
    '18:00',
    '21:00',
  ];
  let timesRow = document.getElementById('tr-hours');
  for (let i = Math.floor(time / 3); i < Math.floor(time / 3) + 5; i++) {
    let cell = timesRow.insertCell();
    let time = document.createTextNode(times[i % 8]);
    cell.appendChild(time);
  }

  var degSpan = document.createElement('span');
  degSpan.innerHTML = '&deg;';

  if (navigator.geolocation) {
    navigator.geolocation.getCurrentPosition((position) => {
      lon = position.coords.longitude;
      lat = position.coords.latitude;

      const apiCurrent = `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=8387cd973eb203343fef3dfb3fb92974`;

      fetch(apiCurrent)
        .then((response) => {
          return response.json();
        })
        .then((dataCurrent) => {
          // console.log(dataCurrent);
          // Get relevant API data
          const { temp } = dataCurrent.main;
          const { main, icon } = dataCurrent.weather[0];
          const { speed } = dataCurrent.wind;
          // Set DOM Elements from the API --------------------

          // Current temperature
          tempDegree.textContent = (temp - 273.15).toFixed(0);
          tempDegree.append(degSpan);

          // Current weather description
          weatherDescription.textContent = main;

          // Current wind speed
          windSpeed.textContent = 'Wind ' + speed + 'm/s';

          // Current Location
          locationName.textContent = dataCurrent.name;

          // Icon for weather
          document.getElementById(
            'weather-img'
          ).src = `https://openweathermap.org/img/wn/${icon}@4x.png`;
        });

      const apiWeek = `https://api.openweathermap.org/data/2.5/forecast?lat=${lat}&lon=${lon}&appid=8387cd973eb203343fef3dfb3fb92974`;

      fetch(apiWeek)
        .then((response) => {
          return response.json();
        })
        .then((dataWeek) => {
          console.log(dataWeek);

          // Temperature forecast for next 5 days
          for (let i = 7; i < 40; i += 8) {
            tempWeek.push(dataWeek.list[i].main.temp);
          }

          let tempWeekRow = document.getElementById('tr-temp-week');
          for (let i = 0; i < 5; i++) {
            let cell = tempWeekRow.insertCell();
            let temp = document.createTextNode(
              (tempWeek[i] - 273.15).toFixed(0) + ' \xB0'
            );
            cell.appendChild(temp);
          }

          // Temperature forecast for next 5 days
          for (let i = 0; i < 5; i += 1) {
            tempHours.push(dataWeek.list[i].main.temp);
          }

          let tempHoursRow = document.getElementById('tr-temp-hours');
          for (let i = 0; i < 5; i++) {
            let cell = tempHoursRow.insertCell();
            let temp = document.createTextNode(
              (tempHours[i] - 273.15).toFixed(0) + ' \xB0'
            );
            cell.appendChild(temp);
          }
        });
    });
  }
});

// Change forecast view

let toggleToday = document.getElementById('toggle-today');
let toggleWeek = document.getElementById('toggle-week');
let weekTable = document.querySelector('.week-table');
let hourTable = document.querySelector('.hour-table');

const toggleTodayForecast = () => {
  if (!toggleToday.classList.contains('button-selected')) {
    toggleToday.classList.add('button-selected');
    toggleWeek.classList.remove('button-selected');
    weekTable.style.display = 'none';
    hourTable.style.display = 'table';
  }
};

const toggleWeekForecast = () => {
  if (!toggleWeek.classList.contains('button-selected')) {
    toggleWeek.classList.add('button-selected');
    toggleToday.classList.remove('button-selected');
    weekTable.style.display = 'table';
    hourTable.style.display = 'none';
  }
};
