import React from "react";

const CountryDetail = ({country}) => {
  return (
    <div id="detail">
      <h1 id="name">{country.name.common}</h1>
      <div id="capital">Capital {country.capital.map(cap => cap)}</div>
      <div id="area">Area {country.area}</div>
      <div id="languages">
        <b id="languages_title">Languages</b>
        <ul id="languages_list"> {Object.values(country.languages).map(language => <li id={language} key={language}>{language}</li>)}</ul>
      </div>
      <div id="image">
        <img id="img" src={country.flags.png} alt="Flag" />
      </div>
    </div>
  );
}

export default CountryDetail;