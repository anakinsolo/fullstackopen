import React from "react";
import Country from "./Country";
import CountryDetail from "./CountryDetail";

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
        {countries.map(country => <CountryDetail key={country.cioc} country={country} />)}
      </div>
    )
  }

  return (
    <div>
      {countries.map(country => <Country key={country.cioc ? country.cioc : country.cca3} country={country} />)}
    </div>
  )
};

export default Listing;