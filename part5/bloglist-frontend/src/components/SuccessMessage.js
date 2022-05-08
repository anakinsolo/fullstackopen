import React from 'react';

const SuccessMessage = ({ msg }) => {
  if (msg) {
    return(
      <div className="success">
        {msg}
      </div>
    );
  }

  return null;
};

export default SuccessMessage;
