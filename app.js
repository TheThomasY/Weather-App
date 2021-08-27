window.addEventListener('load', () => {
  let long;
  let lat;
  let weatherDescription = document.querySelector('.weather-description');
  let locationName = document.querySelector('.location-name');
  let tempDegree = document.querySelector('.temp-degree');

  let date = new Date();
  const days = ['SUN', 'MON', 'TUE', 'WED', 'THU', 'FRI', 'SAT'];
  let daysRow = document.getElementById('tr-days');
  for (let i = 1; i < 6; i++) {
    let cell = daysRow.insertCell();
    let day = document.createTextNode(days[(date.getDay() + i) % 7]);
    cell.appendChild(day);
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
          const { temp } = dataCurrent.main;
          const { main, icon } = dataCurrent.weather[0];
          // Set DOM Elements from the API --------------------

          // Current temperature
          tempDegree.textContent = (temp - 273.15).toFixed(0);
          tempDegree.append(degSpan);

          // Current weather description
          weatherDescription.textContent = main;

          // Current Location
          locationName.textContent = dataCurrent.name;

          // Icon for weather
          document.getElementById(
            'weather-img'
          ).src = `http://openweathermap.org/img/wn/${icon}@4x.png`;
        });

      const apiWeek = `https://api.openweathermap.org/data/2.5/forecast?lat=${lat}&lon=${lon}&appid=8387cd973eb203343fef3dfb3fb92974`;

      fetch(apiWeek)
        .then((response) => {
          return response.json();
        })
        .then((dataWeek) => {
          console.log(dataWeek);
        });
    });
  }
});
