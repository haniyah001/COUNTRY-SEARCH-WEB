"use strict";

const btn = document.querySelector(".btn-country");
const countriesContainer = document.querySelector(".countries");
const searchInput = document.querySelector(".search_input");

/**
 * FETCHING COUNTRY
 */
async function getCountries(country) {
  try {
    const response = await fetch(
      `https://restcountries.com/v3.1/name/${country.toLowerCase()}`
    );

    const data = await response.json();

    console.log(data);

    renderCountry(data[0]);
  } catch (err) {
    console.error(err);
  }
}

/**
 * RENDERING THE FECTHED COUNTRY
 */
const renderCountry = function (country) {
  // console.log(country.currencies.NGN.name);
  countriesContainer.innerHTML = "";

  const lang = Object.values(country.languages)[0];
  const cur = Object.values(country.currencies)[0].name;
  const symbol = Object.values(country.currencies)[0].symbol;

  const population = `${country.population}`.length;

  const millionVersion = `${country.population}`.slice(0, -5);

  console.log(country.population);

  // console.log(millionVersion);

  // console.log(`${country.population}`.slice(-6));

  const lastValue = millionVersion.slice(-1);
  // console.log(lastValue);

  const others = millionVersion.slice(0, -1);
  // console.log(others);

  const returnValue = `${others}${Number(lastValue) < 1 ? "" : "."}${
    Number(lastValue) < 1 ? "" : lastValue
  }`;
  // console.log(returnValue);

  const html = `
        <article class="country">
          <img class="country__img" src="${country.flags.png}" alt="${
    country.flags.alt
  }"/>
          <div class="country__data">
            <h3 class="country__name">${country.name.common}</h3>
            <h4 class="country__region">${country.region}</h4>
            <p class="country__row"><span>👫</span>${returnValue}${
    population > 6 ? "m" : ""
  } people</p>
            <p class="country__row"><span>🗣️</span>${lang}</p>
            <p class="country__row"><span>${symbol}</span>${cur}</p>
          </div>
        </article>`;

  countriesContainer.insertAdjacentHTML("afterbegin", html);
};


btn.addEventListener("click", function (event) {
  event.preventDefault();

  const country = searchInput.value;

  getCountries(country);

  searchInput.value = "";
});
