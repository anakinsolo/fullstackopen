import React, { useState } from 'react';
import BlogService from '../services/BlogService';
import LoginService from '../services/LoginService';

const Login = ({ isLoggedin, setIsLoggedIn, setName, addSuccessMessage, addErrorMessage }) => {

  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

  const login = async (event) => {
    event.preventDefault();
    if (!isLoggedin) {
      try {
        const res = await LoginService.login({
          username: username,
          password: password
        });

        window.localStorage.setItem('auth', JSON.stringify(res.token));
        window.localStorage.setItem('name', JSON.stringify(res.name));
        setIsLoggedIn(true);
        setName(res.name);
        cleanLoginForm();
        BlogService.setToken(res.token);
        addSuccessMessage('Login Successfully');
      } catch (err) {
        addErrorMessage(err.message);
      }
    }
  };

  const cleanLoginForm = () => {
    setUsername('');
    setPassword('');
  };
  return (
    <form onSubmit={login}>
      <div>
        <label htmlFor="username">Username</label>
        <input id="username" type="text" value={username} onChange={(event) => {setUsername(event.target.value);}} />
      </div>
      <div>
        <label htmlFor="password">Password</label>
        <input id="password" type="password" value={password} onChange={(event) => {setPassword(event.target.value);}} />
      </div>
      <div><button type="submit">Login</button></div>
    </form>
  );
};

export default Login;