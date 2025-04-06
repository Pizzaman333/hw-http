import fetchCountries from "./fetch-countries";
fetchCountries("france").then((country) => console.log(country));
import { debounce, reject } from "lodash";

const searchInput = document.getElementById("search");
const errorBox = document.querySelector(".error__box");
const results = document.querySelector(".results");

const debouncedSearch = debounce((event) => {
  fetchCountries(event.target.value).then((countries) => {
    results.innerHTML = "";
    errorBox.style.display = "none";
    if (countries.length > 10) {
      errorBox.style.display = "block";
      return;
    } else if (countries.length > 1) {
      countries.forEach(
        (country) =>
          (results.innerHTML += `<li class="country">
            <h2 class="country__name">${country.name.official}</h2>
            </li>`)
      );
      return;
    }
    countries.forEach((country) => {
      results.innerHTML = `
          <li class="country">
          <h1 class="country__name">${country.name.official}</h1>
          <div class="country__describtion">
            <p class="country__capital">Capital: ${country.capital}</p>         
            <p class="country__population">Population: ${country.population}</p>
          </div>
          <p class="country__languages__title">Languages:</p>
          <ul class="country__languages">
          </ul>
          <img src="${country.flags.png}" alt="flag" class="country__flag">
        </li>`;
      for (const key in country.languages) {
        document.querySelector(
          ".country__languages"
        ).innerHTML += `<li class="country__language">${country.languages[key]}</li>`;
      }
    });
  });
}, 300);

searchInput.addEventListener("input", debouncedSearch);
