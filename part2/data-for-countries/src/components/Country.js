import React, { useState } from "react";
import CountryDetail from "./CountryDetail";

const Country = ({country}) => {
  const [isShow, setIsShow] = useState(false);
  const showCountryDetail = () => {
    if (isShow === true) {
      setIsShow(false);
    }

    if (isShow === false) {
      setIsShow(true);
    }
  }
console.log(isShow)
  return (
    <div>
      {country.name.common} <button id="show-detail" onClick={showCountryDetail}>show</button>
      {isShow ? <CountryDetail country={country} /> : ''}
    </div>
  );
}

export default Country;