import React from 'react';

const Login = ({ onButtonClick, username, password, onInputValueChange }) => {
  return (
    <form onSubmit={onButtonClick}>
      <div>
        <input id="username" type="text" value={username} onChange={onInputValueChange} />
        <label htmlFor="username"> Username </label>
      </div>
      <div>
        <input id="password" type="password" value={password} onChange={onInputValueChange} />
        <label htmlFor="password"> Password </label>
      </div>
      <div><button type="submit">Login</button></div>
    </form>
  );
};

export default Login;