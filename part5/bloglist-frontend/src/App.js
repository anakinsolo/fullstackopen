import { useState } from 'react';
import Login from './components/Login';
import Mypage from './components/Mypage';
import LoginService from './services/LoginService';

function App() {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [name, setName] = useState('');
  const [isLoggedin, setIsLoggedIn] = useState(false);
  const [authToken, setAuthToken] = useState(null);

  const onInputValueChange = (event) => {
    const input = event.target;
    const value = input.value;

    if (input.id === 'username') {
      setUsername(value);
    }

    if (input.id === 'password') {
      setPassword(value);
    }
  };

  const submit = async (event) => {
    event.preventDefault();
    if (!authToken) {
      try {
        const res = await LoginService.login({
          username: username,
          password: password
        });

        setIsLoggedIn(true);
        setAuthToken(res.token);
        setName(res.name);
      } catch (err) {
        console.log(err);
      }
    }
  };



  return (
    <div className="App">
      {!isLoggedin && <Login onButtonClick={submit} username={username} password={password} onInputValueChange={onInputValueChange} />}
      {isLoggedin && <Mypage name={name}/>}
    </div>
  );
}

export default App;
