import React, { useState } from "react";
import CountryDetail from "./CountryDetail";

const Country = ({country}) => {
  const [isShow, setIsShow] = useState(false);
  
  return (
    <div>
      {country.name.common} <button id="show-detail" onClick={() => setIsShow(!isShow)}>show</button>
      <div id="detail-view">
        {isShow && <CountryDetail country={country} />}
      </div>
    </div>
  );
}

export default Country;