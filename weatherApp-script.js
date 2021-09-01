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

// add search engine
let citySearch = document.querySelector("#search-form");

function updateTemperatureData(response) {
  console.log(response.data.main.temp);
  let localTemp = Math.round(response.data.main.temp);
  let newTemp = document.querySelector("#convertible-current-temperature");
  newTemp.innerHTML = `${localTemp} °C`;
}
function updateCity(event) {
  event.preventDefault();
  let newCity = document.querySelector("#city-search-input");
  let h1 = document.querySelector("h1");
  h1.innerHTML = `${newCity.value}`;

  let apiKey = "384f3fcc4eae2c9d9d7b5addae0cb3cb";
  let apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${newCity.value}&units=metric&appid=${apiKey}`;
  axios.get(apiUrl).then(updateTemperatureData);
}

citySearch.addEventListener("submit", updateCity);

//add temp conversion

let currentForecast = document.querySelector(
  "#convertible-current-temperature"
);
let currentTemp = currentForecast.textContent;
let farenheit = document.querySelector("#farenheit-conversion-link");
let celsius = document.querySelector("#celcius-conversion-link");
function farenheitConversion(event) {
  event.preventDefault();
  if (currentTemp.includes("°C")) {
    let currentFarenheit = Math.round(28 * 1.8 + 32); // convert to F
    currentForecast.textContent = `🌤 ${currentFarenheit}°F`;
  } else if (currentTemp.includes("°F")) {
    currentForecast.textContent = `28°C`;
  }
}
function celsiusConversion(event) {
  event.preventDefault();
  let currentTemp = currentForecast.textContent;
  if (currentTemp.includes("°F")) {
    currentForecast.textContent = `🌤 28°C`;
  }
}
farenheit.addEventListener("click", farenheitConversion);
celsius.addEventListener("click", celsiusConversion);
