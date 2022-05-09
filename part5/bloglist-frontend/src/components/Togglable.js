import React, { useState } from 'react';

const Togglable = ({ children }) => {
  const [isVisible, setIsVisible] = useState(false);

  const setFormVisibility = () => {
    setIsVisible(!isVisible);
  };

  const getFormVisibility = (revert) => {
    if (revert) {
      return { display: isVisible ? 'none' : '' };
    }

    return { display: isVisible ? '' : 'none' };
  };

  return (
    <div>
      <div style={getFormVisibility(true)}>
        <button onClick={setFormVisibility}>Add new blog</button>
      </div>
      <div style={getFormVisibility()}>
        {children}
        <button onClick={setFormVisibility}>Cancel</button>
      </div>
    </div>
  );
};

export default Togglable;