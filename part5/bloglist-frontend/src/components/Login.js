import React from 'react';

const Login = ({ onButtonClick, username, password, onInputValueChange }) => {
  return (
    <form onSubmit={onButtonClick}>
      <div>
        <label htmlFor="username">Username</label>
        <input id="username" type="text" value={username} onChange={onInputValueChange} />
      </div>
      <div>
        <label htmlFor="password">Password</label>
        <input id="password" type="password" value={password} onChange={onInputValueChange} />
      </div>
      <div><button type="submit">Login</button></div>
    </form>
  );
};

export default Login;