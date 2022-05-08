import React from 'react';

const Logout = ({ logout }) => {

  return (
    <div>
      <button onClick={logout}>Logout</button>
    </div>
  );
};

export default Logout;