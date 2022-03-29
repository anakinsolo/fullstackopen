import React from "react";

const Form = ({onButtonClick, newName, newPhone, onInputValueChange}) => {
  return(
    <form onSubmit={onButtonClick}>
        <div>name: <input id="name" value={newName} onChange={onInputValueChange}/></div>
        <div>phone: <input id="phone" value={newPhone} onChange={onInputValueChange}/></div>
        <div><button type="submit">add</button></div>
      </form>
  );
}

export default Form;