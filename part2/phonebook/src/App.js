import { useState } from 'react';
import Name from './components/Name';

const App = () => {
  const [persons, setPersons] = useState([
    { name: 'Arto Hellas', phone: '1234578' }
  ]);
  const [newName, setNewName] = useState('');
  const [newPhone, setNewPhone] = useState('');

  const onInputValueChange = (event) => {
    let input = event.target;
    let value = input.value;
    
    if (input.id === 'name') {
      setNewName(value);
    } else {
      setNewPhone(value);
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

  return (
    <div>
      <h2>Phonebook</h2>
      <form onSubmit={onButtonClick}>
        <div>name: <input id="name" value={newName} onChange={onInputValueChange}/></div>
        <div>phone: <input id="phone" value={newPhone} onChange={onInputValueChange}/></div>
        <div><button type="submit">add</button></div>
      </form>
      <h2>Numbers</h2>
      {persons.map(person => <Name key={person.name} name={person.name} phone={person.phone} />)}      
    </div>
  )
}

export default App