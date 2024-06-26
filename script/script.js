const API_KEY = "2ae326ae5f944be1d909ee9185b67a10";
const BASE_URL = "https://api.openweathermap.org/data/2.5/weather?";
const input = document.querySelector(".search__input");
const form = document.querySelector(".search__form");

form.addEventListener("submit", (evt) => {
  evt.preventDefault();
  const querry = input.value;
  fetchData(BASE_URL, "q=" + querry);
});

async function fetchData(url, querry) {
  const response = await fetch(
    url + querry + "&appid=" + API_KEY + "&units=metric"
  );
  const data = await response.json();
  render(data);
}

async function render(data) {
  const app = document.querySelector(".container__app");
  app.innerHTML = ``;
  const div = document.createElement("div");
  app.append(div);
  div.className = "app";
  let currentDate = new Date();
  let options = {
    weekday: "long",
    day: "numeric",
    month: "short",
  };
  div.innerHTML = `
  <button class="app__btn">
          <img
            src="./src/img/current location icon.svg"
            class="app__current"
            alt=""
          />
          Current Location
        </button>
        <p class="app__city">${data.name}</p>
        <p class="app__day">${currentDate.toLocaleString("en-US", options)}</p>
        <p class="app__temp">${Math.round(data.main.temp)}°C</p>
        <img src= "https://openweathermap.org/img/wn/${
          data.weather[0].icon
        }@4x.png" class="app__img" alt="" />
        <p class="app__status">${data.weather[0].description}</p>
        `;
  console.log(data);
}
