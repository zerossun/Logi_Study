const API_KEY = '213495ccd45cffb2586f4488fb6d6d04';

function onGeoOk(position) {
  const lat = position.coords.latitude;
  const lng = position.coords.longitude;
  const url = `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lng}&appid=${API_KEY}&units=metric`;

  fetch(url)
    .then((response) => response.json())
    .then((data) => {
      const name = data.name;
      const weather = data.weather[0].description;
      const tem = data.main.temp;

      const weather1 = document.querySelector('#weather span:first-child');
      const tem1 = document.querySelector('#weather span:nth-child(2)');
      const name1 = document.querySelector('#weather span:last-child');

      weather1.innerText = weather;
      tem1.innerText = tem;
      name1.innerText = name;
    });
}
function onGeoError() {
  alert("Can't find you. No weather for you.");
}

navigator.geolocation.getCurrentPosition(onGeoOk, onGeoError);
