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

// update 5-day forecast

for (var i = 1; i < 6; i++) {
  let counter = now.getDay() + i;

  // in case the counter passes 6, it means that is out of bounds, so need to remove 7 days in order to map correctly.
  if (counter > 6) {
    counter -= 7;
  }

  let day = document.querySelector(`#day${i}`);

  day.innerHTML = weekdays[counter];
}
//add API data
function displayWindSpeedData(response) {
  console.log(response.data);
  let windSpeed = document.querySelector("#wind-speed");
  windSpeed.innerHTML = response.data.wind.speed;
}
function displayHumidityData(response) {
  let humidity = document.querySelector("#humidity");
  humidity.innerHTML = response.data.main.humidity;
}
function displayWeatherDescription(response) {
  let weatherDescription = document.querySelector("#weather-descriptor");
  weatherDescription.innerHTML = response.data.weather[0].description;
}
function displayTemperatureData(response) {
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
let apiKey = "384f3fcc4eae2c9d9d7b5addae0cb3cb";
let apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=toronto&units=metric&appid=${apiKey}`;
axios.get(apiUrl).then(displayWeatherDescription);
axios.get(apiUrl).then(displayWindSpeedData);
axios.get(apiUrl).then(displayHumidityData);
axios.get(apiUrl).then(displayTemperatureData);
axios.get(apiUrl).then(displayWeatherIcon);

// add search engine
let citySearch = document.querySelector("#search-form");

function updateTemperatureData(response) {
  let newTemp = document.querySelector("#current-temperature");
  newTemp.innerHTML = Math.round(response.data.main.temp);
}
function updateWindSpeed(response) {
  console.log(response.data);
  let windSpeed = document.querySelector("#wind-speed");
  windSpeed.innerHTML = response.data.wind.speed;
}
function updateHumidity(response) {
  let humidity = document.querySelector("#humidity");
  humidity.innerHTML = response.data.main.humidity;
}
function updateWeatherDescription(response) {
  let weatherDescription = document.querySelector("#weather-descriptor");
  weatherDescription.innerHTML = response.data.weather[0].description;
}
function updateWeatherIcon(response) {
  let weatherIcon = document.querySelector("#weather-icon");
  let iconID = response.data.weather[0].icon;
  weatherIcon.setAttribute(
    "src",
    `http://openweathermap.org/img/wn/${iconID}@2x.png`
  );
}
function updateCity(event) {
  event.preventDefault();
  let newCity = document.querySelector("#city-search-input");
  let h1 = document.querySelector("h1");
  h1.innerHTML = `${newCity.value}`;

  let apiKey = "384f3fcc4eae2c9d9d7b5addae0cb3cb";
  let apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${newCity.value}&units=metric&appid=${apiKey}`;
  axios.get(apiUrl).then(updateTemperatureData);
  axios.get(apiUrl).then(updateWeatherDescription);
  axios.get(apiUrl).then(updateWindSpeed);
  axios.get(apiUrl).then(updateHumidity);
  axios.get(apiUrl).then(updateWeatherIcon);
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
  let currentCity = "toronto";
  let apiKey = "384f3fcc4eae2c9d9d7b5addae0cb3cb";
  let apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${currentCity}&units=imperial&appid=${apiKey}`;

  axios.get(apiUrl).then(getFarenheit);
}

function displayCelcius(event) {
  event.preventDefault();
  let currentCity = "toronto";
  let apiKey = "384f3fcc4eae2c9d9d7b5addae0cb3cb";
  let apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${currentCity}&units=metric&appid=${apiKey}`;
  axios.get(apiUrl).then(getCelcius);
}
farenheit.addEventListener("click", displayFarenheit);
celsius.addEventListener("click", displayCelcius);
