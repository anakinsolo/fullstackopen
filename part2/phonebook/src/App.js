import { useState } from 'react';
import Filter from './components/Filter';
import Form from './components/Form';
import Person from './components/Person';

const App = () => {
  const [persons, setPersons] = useState([
    { name: 'Arto Hellas', phone: '040-123456', id: 1 },
    { name: 'Ada Lovelace', phone: '39-44-5323523', id: 2 },
    { name: 'Dan Abramov', phone: '12-43-234345', id: 3 },
    { name: 'Mary Poppendieck', phone: '39-23-6423122', id: 4 }
  ]);
  const [newName, setNewName] = useState('');
  const [newPhone, setNewPhone] = useState('');
  const [newSearch, setNewSearch] = useState('');
  const [showAll, setShowAll] = useState(true);

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
        {elementToShow().map(person => <Person key={person.name} name={person.name} phone={person.phone} />)}      
      </ul>
    </div>
  )
}

export default App