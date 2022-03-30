import { useState,useEffect } from 'react';
import axios from 'axios';
import Filter from './components/Filter';
import Listing from './components/Listing';

const App = () => {
  const API_URL = 'https://restcountries.com/v3.1/all';

  const [countries, setCountries] = useState([]);
  const [newSearch, setNewSearch] = useState('');
  const [countryToShow, setCountryToShow] = useState([]);
  const [errorToShow, setErrorToShow] = useState(''); 
  
  const hook = () => {
    axios
      .get(API_URL)
      .then(response => setCountries(response.data))
      .catch(e => console.log(e));
  }
  
  useEffect(hook, []);

  const onInputValueChange = (event) => {
    let input = event.target;
    let value = input.value;

    if (input.id === 'search') {
      if (value) {
        setNewSearch(value);
        let countryToShow = countries.filter(country => country.name.common.includes(value))
        if (countryToShow.length <= 10) {
          setCountryToShow(countryToShow);
          setErrorToShow('');
        } else {
          setCountryToShow([]);
          setErrorToShow('Too many matches, specify another filter');
        }
      } else {
        setNewSearch('');
        setErrorToShow('');
        setCountryToShow([]);
      }
    }
  }

  return (
    <div>
      <Filter newSearch={newSearch} onInputValueChange={onInputValueChange} />
      <Listing error={errorToShow} countries={countryToShow} />
    </div>
  );
}

export default App;
