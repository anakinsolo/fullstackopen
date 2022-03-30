import React from "react";
import Country from "./Country";
import CountryDetail from "./CountryDetail";
import Weather from "./Weather";

const Listing = ({error, countries}) => {
  if (error) {
    return (
      <div>
        {error}
      </div>
    )
  }
  
  if (countries.length === 1) {
    return (
      <div>
        {countries.map(country => <CountryDetail key="single-country-view" country={country} />)}
        {countries.map(country => <Weather key="weather-detail-key" country={country} />)}
      </div>
    )
  }

  return (
    <ul>
      {countries.map(country => <li key={country.cioc ? country.cioc : country.cca3}><Country key={country.cioc ? country.cioc : country.cca3} country={country}/></li>)}
    </ul>
  )
};

export default Listing;