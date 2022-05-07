import { useEffect, useState } from 'react';
import Login from './components/Login';
import Mypage from './components/Mypage';
import BlogService from './services/BlogService';
import LoginService from './services/LoginService';

function App() {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [name, setName] = useState('');
  const [isLoggedin, setIsLoggedIn] = useState(false);

  useEffect(() => {
    const data = window.localStorage.getItem('auth');
    if (data) {
      const token = JSON.parse(data);
      setIsLoggedIn(true);
      BlogService.setToken(token);
    }
  }, []);

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
    if (!isLoggedin) {
      try {
        const res = await LoginService.login({
          username: username,
          password: password
        });

        window.localStorage.setItem('auth', JSON.stringify(res.token));
        setIsLoggedIn(true);
        setName(res.name);
        setUsername('');
        setPassword('');
        BlogService.setToken(res.token);
      } catch (err) {
        console.log(err);
      }
    }
  };

  return (
    <div className="App">
      {!isLoggedin && <Login onButtonClick={submit} username={username} password={password} onInputValueChange={onInputValueChange} />}
      {isLoggedin && <Mypage name={name} blogservice={BlogService} />}
    </div>
  );
}

export default App;
