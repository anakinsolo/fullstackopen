import React from 'react';

const ErrorMessage = ({ msg }) => {
  if (msg) {
    return (
      <div className="error">
        {msg}
      </div>
    );
  }

  return null;
};

export default ErrorMessage;