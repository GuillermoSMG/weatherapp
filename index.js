const main = document.getElementById("location");
const btnSubmit = document.getElementById("submitBtn");
const cityInput = document.getElementById("cityInput");

let article = document.createElement("article");
article.classList.add(
  "rounded",
  "p-3",
  "my-5",
  "bg-slate-500",
  "text-white",
  "w-96",
  "text-center",
  "shadow-slate-800",
  "shadow-sm"
);

const getGeolocation = () => {
  const success = (position) => {
    let coords = position.coords;

    const lat = coords.latitude;
    const lon = coords.longitude;

    apiFetch(lat, lon);
  };

  const error = (err) => {
    main.innerHTML = "ERROR";
  };

  const options = {
    enableHighAccuracy: true,
    timeout: 5000,
    maximumAge: 0,
  };

  navigator.geolocation.getCurrentPosition(success, error, options);
};

const upperCase = (word) => {
  let newWord = word.split("").slice(1).join("");
  return word[0].toUpperCase() + newWord;
};

const apiFetch = (lat, lon) => {
  const apiKEY = "9072cc02f9a5c2dc55f316691844ac79";
  const apiURLLatLon = `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${apiKEY}&units=metric&lang=sp`;

  fetch(apiURLLatLon)
    .then((res) => res.json())
    .then((info) => {
      let city = info.name;
      let country = info.sys["country"];
      let desc = info.weather[0].description;
      let tempCelsius = Math.round(info.main.temp);
      article.innerHTML = `<h2 class="text-2xl py-2">${city}, ${country}</h2>
                         <p class="py-1 text-lg font-bold">${tempCelsius}°C</p>
                         <p class="py-2 text-lg font-semibold">${upperCase(
                           desc
                         )}</p>`;
      main.append(article);
    });
};

const apiFetchCityName = (cityName) => {
  const apiKEY = "9072cc02f9a5c2dc55f316691844ac79";
  const apiURLCityName = `https://api.openweathermap.org/data/2.5/weather?q=${cityName}&appid=${apiKEY}&units=metric&lang=sp`;
  fetch(apiURLCityName)
    .then((res) => res.json())
    .then((info) => {
      let city = info.name;
      let country = info.sys["country"];
      let desc = info.weather[0].description;
      let tempCelsius = Math.round(info.main.temp);
      article.innerHTML = `<h2 class="text-2xl py-2">${city}, ${country}</h2>
                       <p class="py-1 text-lg font-bold">${tempCelsius}°C</p>
                       <p class="py-2 text-lg font-semibold">${upperCase(
                         desc
                       )}</p>`;
      main.append(article);
    })
    .catch((err) => {
      article.innerHTML = `<p>Ciudad o país no válidos."${cityName}".</p>`;
      main.append(article);
    });
};

/* document.addEventListener("DOMContentLoaded", () => {
  getGeolocation();
}); */

btnSubmit.addEventListener("click", () => {
  let cityName = cityInput.value;
  cityInput.value = "";
  apiFetchCityName(cityName);
});
