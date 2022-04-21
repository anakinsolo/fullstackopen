import { useState,useEffect } from 'react';
import Filter from './components/Filter';
import Form from './components/Form';
import Person from './components/Person';
import HttpWrapper from './services/HttpWrapper';
import { confirm } from "react-confirm-box";
import SuccessMessage from './components/SuccessMessage';
import ErrorMessage from './components/ErrorMessage';

const App = () => {
  const [persons, setPersons] = useState([]);
  const [newName, setNewName] = useState('');
  const [newPhone, setNewPhone] = useState('');
  const [newSearch, setNewSearch] = useState('');
  const [showAll, setShowAll] = useState(true);
  const [successMsg, setSuccessMsg] = useState('');
  const [errMsg, setErrMsg] = useState('');

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

  const onButtonClick = async (event) => {
    event.preventDefault();
    
    let existingUser = isExistingName();
    if (existingUser.length !== 0) {
      let id = existingUser[0].id;
      const result = await confirm(`${newName} has already been added to the phone book, replace the old number with new one?`);
      if (result) {
        let newPerson = {
          name: newName,
          number: newPhone
        };

        HttpWrapper
          .put(id, newPerson)
          .then(returnedPerson => {
            setPersons(persons.map(person => person.id !== id ? person : returnedPerson));
            setSuccessMsg('Person updated');
            setTimeout(() => {
              setSuccessMsg(null)
            }, 5000)
          })
          .catch(error => {
            setErrMsg(error.message);
            setTimeout(() => {
              setSuccessMsg(null)
            }, 5000)
          });
      }
    } else {
      let newPerson = {
        name: newName,
        number: newPhone
      };

      HttpWrapper
        .post(newPerson)
        .then(returnedPerson => {
          setPersons(persons.concat(returnedPerson));
          setSuccessMsg('Person added');
          setTimeout(() => {
            setSuccessMsg(null)
          }, 5000)
        });
    }

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
          setPersons(persons.filter(n => n.id !== id))
          setErrMsg(error.message);
            setTimeout(() => {
              setSuccessMsg(null)
            }, 5000)
        });
    } else {
      console.log('no');
    }

  }

  return (
    <div>
      <h2>Phonebook</h2>
      <SuccessMessage msg={successMsg} />
      <ErrorMessage msg={errMsg} />
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