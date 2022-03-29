import { useState,useEffect } from 'react';
import Filter from './components/Filter';
import Form from './components/Form';
import Person from './components/Person';
import axios from 'axios';

const App = () => {
  const [persons, setPersons] = useState([]);
  const [newName, setNewName] = useState('');
  const [newPhone, setNewPhone] = useState('');
  const [newSearch, setNewSearch] = useState('');
  const [showAll, setShowAll] = useState(true);

  useEffect(() => {
    axios
      .get('http://localhost:3001/persons')
      .then(response => setPersons(response.data));
  }, []);

  const onInputValueChange = (event) => {
    let input = event.target;
    let value = input.value;
    
    if (input.id === 'name') {
      setNewName(value);
    } 
    
    if (input.id === 'phone') {
      setNewPhone(value);
    }

    if (input.id === 'search') {
      if (value) {
        setNewSearch(value);
      } else {
        setNewSearch('');
        setShowAll(true);
      }
    }
  }

  const onButtonClick = (event) => {
    event.preventDefault();
    
    if (isExistingName().length !== 0) {
      return alert(`${newName} has already been added to the phone book`);
    }

    let newPerson = {
      name: newName,
      phone: newPhone
    };

    setPersons(persons.concat(newPerson));
    setNewName('');
    setNewPhone('');
  }

  const isExistingName = () => {
    return persons.filter((person) => person.name === newName);
  }
  
  const elementToShow = () => {
    return showAll ? persons : persons.filter((person) => person.name === newSearch);
  }

  const search = () => {
    newSearch ? setShowAll(false) : setShowAll(true);
  }

  return (
    <div>
      <h2>Phonebook</h2>
      <Filter newSearch={newSearch} onInputValueChange={onInputValueChange} search={search} />
      <h2>Add a new contact</h2>
      <Form onButtonClick={onButtonClick} newName={newName} newPhone={newPhone} onInputValueChange={onInputValueChange} />
      <h2>Numbers</h2>
      <ul>
        {elementToShow().map(person => <Person key={person.name} name={person.name} phone={person.number} />)}      
      </ul>
    </div>
  )
}

export default App