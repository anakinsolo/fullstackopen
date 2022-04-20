import { useState,useEffect } from 'react';
import Filter from './components/Filter';
import Form from './components/Form';
import Person from './components/Person';
import HttpWrapper from './services/HttpWrapper';
import { confirm } from "react-confirm-box";

const App = () => {
  const [persons, setPersons] = useState([]);
  const [newName, setNewName] = useState('');
  const [newPhone, setNewPhone] = useState('');
  const [newSearch, setNewSearch] = useState('');
  const [showAll, setShowAll] = useState(true);

  useEffect(() => {
   HttpWrapper.getAll().then(allPerson => setPersons(allPerson));
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
      number: newPhone
    };

    HttpWrapper
      .post(newPerson)
      .then(returnedPerson => setPersons(persons.concat(returnedPerson)));

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

  const deletePerson = async (id) => {
    const result = await confirm(`Are you sure that you want to delete user ID ${id}?`);
    if (result) {
      HttpWrapper
        .deleteById(id)
        .then(() => setPersons(persons.filter(n => n.id !== id)))
        .catch((error) => {
          console.log(error);
          setPersons(persons.filter(n => n.id !== id))
        });
    } else {
      console.log('no');
    }

  }

  return (
    <div>
      <h2>Phonebook</h2>
      <Filter newSearch={newSearch} onInputValueChange={onInputValueChange} search={search} />
      <h2>Add a new contact</h2>
      <Form onButtonClick={onButtonClick} newName={newName} newPhone={newPhone} onInputValueChange={onInputValueChange} />
      <h2>Numbers</h2>
      <ul>
        {elementToShow().map(person => <Person key={person.name} id={person.id} name={person.name} phone={person.number} deletePerson={deletePerson} />)}      
      </ul>
    </div>
  )
}

export default App