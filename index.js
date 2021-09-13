let h2 = document.querySelector("h2");
let now = new Date();
let date = now.getDate();
let weekdays = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];
let day = weekdays[now.getDay()];
let months = [
  "Jan",
  "Feb",
  "Mar",
  "Apr",
  "May",
  "Jun",
  "Jul",
  "Aug",
  "Sep",
  "Oct",
  "Nov",
  "Dec",
];
let month = months[now.getMonth()];
let hour = now.getHours();
let minute = now.getMinutes();
h2.innerHTML = `${day}, ${month} ${date}, ${hour}:${minute}`;

//add API data
function displayWindSpeed(response) {
  let windSpeed = document.querySelector("#wind-speed");
  windSpeed.innerHTML = response.data.wind.speed;
}
function displayHumidity(response) {
  let humidity = document.querySelector("#humidity");
  humidity.innerHTML = response.data.main.humidity;
}
function displayWeatherDescription(response) {
  let weatherDescription = document.querySelector("#weather-descriptor");
  weatherDescription.innerHTML = response.data.weather[0].description;
}
function displayTemperature(response) {
  let currentTemperature = document.querySelector("#current-temperature");
  currentTemperature.innerHTML = Math.round(response.data.main.temp);
}
function displayWeatherIcon(response) {
  let weatherIcon = document.querySelector("#weather-icon");
  let iconID = response.data.weather[0].icon;
  weatherIcon.setAttribute(
    "src",
    `http://openweathermap.org/img/wn/${iconID}@2x.png`
  );
}
function displayForecast(response) {
  for (var i = 1; i < 6; i++) {
    let counter = now.getDay() + i;

    if (counter > 6) {
      counter -= 7;
    }

    let day = document.querySelector(`#day${i}`);
    day.innerHTML = weekdays[counter];
  }
  for (var n = 0; n < 5; n++) {
    console.log(response.data.daily[n]);
    let forecast = document.querySelector(`#forecast${n + 1}`);
    console.log(forecast);
    let forecastTemp = Math.round(response.data.daily[n].temp.day);
    forecast.innerHTML = `${forecastTemp}` + `°C`;

    let forecastIconID = response.data.daily[n].weather[0].icon;
    document
      .querySelector(`#forecast-icon${n + 1}`)
      .setAttribute(
        "src",
        `http://openweathermap.org/img/wn/${forecastIconID}@2x.png`
      );
  }
}
function getForecastData(response) {
  let lat = response.data.coord.lat;
  let lon = response.data.coord.lon;

  let apiKey = "384f3fcc4eae2c9d9d7b5addae0cb3cb";
  let apiUrl = `https://api.openweathermap.org/data/2.5/onecall?lat=${lat}&lon=${lon}&exclude=current,minutely,hourly&units=metric&appid=${apiKey}`;
  axios.get(apiUrl).then(displayForecast);
}

let apiKey = "384f3fcc4eae2c9d9d7b5addae0cb3cb";
let apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=toronto&units=metric&appid=${apiKey}`;
axios.get(apiUrl).then(displayWeatherDescription);
axios.get(apiUrl).then(displayWindSpeed);
axios.get(apiUrl).then(displayHumidity);
axios.get(apiUrl).then(displayTemperature);
axios.get(apiUrl).then(displayWeatherIcon);
axios.get(apiUrl).then(getForecastData);

// add search engine
let citySearch = document.querySelector("#search-form");

function updateCity(event) {
  event.preventDefault();
  let newCity = document.querySelector("#city-search-input");
  let h1 = document.querySelector("#current-city");
  h1.innerHTML = `${newCity.value}`;

  let apiKey = "384f3fcc4eae2c9d9d7b5addae0cb3cb";
  let apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${newCity.value}&units=metric&appid=${apiKey}`;
  axios.get(apiUrl).then(displayTemperature);
  axios.get(apiUrl).then(displayWeatherDescription);
  axios.get(apiUrl).then(displayWindSpeed);
  axios.get(apiUrl).then(displayHumidity);
  axios.get(apiUrl).then(displayWeatherIcon);
  axios.get(apiUrl).then(getForecastData);
}

citySearch.addEventListener("submit", updateCity);

//add temp conversion
let farenheit = document.querySelector("#farenheit-conversion-link");
let celsius = document.querySelector("#celcius-conversion-link");

function getFarenheit(response) {
  let currentTemperature = document.querySelector("#current-temperature");
  currentTemperature.innerHTML = Math.round(response.data.main.temp);
  let metric = document.querySelector("#temp-metric");
  metric.innerHTML = "°F";
}
function getCelcius(response) {
  let currentTemperature = document.querySelector("#current-temperature");
  currentTemperature.innerHTML = Math.round(response.data.main.temp);
  let metric = document.querySelector("#temp-metric");
  metric.innerHTML = "°C";
}
function displayFarenheit() {
  let currentCity = document.querySelector("#current-city");
  cityName = `${currentCity.innerHTML.toLowerCase()}`;
  let apiKey = "384f3fcc4eae2c9d9d7b5addae0cb3cb";
  let apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${cityName}&units=imperial&appid=${apiKey}`;

  axios.get(apiUrl).then(getFarenheit);
}

function displayCelcius(event) {
  event.preventDefault();
  let currentCity = document.querySelector("#current-city");
  cityName = `${currentCity.innerHTML.toLowerCase()}`;

  let apiKey = "384f3fcc4eae2c9d9d7b5addae0cb3cb";
  let apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${cityName}&units=metric&appid=${apiKey}`;
  axios.get(apiUrl).then(getCelcius);
}
farenheit.addEventListener("click", displayFarenheit);
celsius.addEventListener("click", displayCelcius);
