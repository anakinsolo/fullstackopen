import axios from "axios";
import React, { useEffect, useState } from "react";

const Weather = ({country}) => {
  const WEATHER_API_KEY = process.env.REACT_APP_API_KEY;
  const WEATHER_API_URL = 'https://api.openweathermap.org/data/2.5/weather';

  const [currWeather, setWeather] = useState({});
  const [capitalLat, capitalLong] = country.capitalInfo.latlng;

  const getWeatherInfo = () => {
    axios
      .get(WEATHER_API_URL + `?lat=${capitalLat}&lon=${capitalLong}&appid=${WEATHER_API_KEY}&units=metric`)
      .then(res => setWeather(res.data))
      .catch(e => console.log(e))
  }

  useEffect(getWeatherInfo, []);

  return (
    <div id="weather-detail">
      <h1>Weather in Helsinki</h1>
      <div id="temperature">temperature {currWeather?.main?.temp} Celcius</div>
      <div id="wind">wind {currWeather?.wind?.speed} m/s</div>
    </div>
  );
}

export default Weather;