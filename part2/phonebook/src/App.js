import { useState } from 'react';
import Name from './components/Name';

const App = () => {
  const [persons, setPersons] = useState([
    { name: 'Arto Hellas' }
  ]) 
  const [newName, setNewName] = useState('')

  const onInputValueChange = (event) => {
    let newInputName = event.target.value;
    setNewName(newInputName);
  }

  const onButtonClick = (event) => {
    event.preventDefault();
    
    if (isExistingName().length !== 0) {
      return alert(`${newName} has already been added to the phone book`);
    }

    let newPerson = {
      name: newName
    };

    setPersons(persons.concat(newPerson));
    setNewName('');
  }

  const isExistingName = () => {
    return persons.filter((person) => person.name === newName);
  }

  return (
    <div>
      <h2>Phonebook</h2>
      <form onSubmit={onButtonClick}>
        <div>
          name: <input value={newName} onChange={onInputValueChange}/>
        </div>
        <div>
          <button type="submit">add</button>
        </div>
      </form>
      <h2>Numbers</h2>
      {persons.map(person => <Name key={person.name} name={person.name} />)}      
    </div>
  )
}

export default App