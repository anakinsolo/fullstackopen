import React from "react";
import Name from "./Name";
import Phone from "./Phone";

const Person = ({id, name, phone, deletePerson}) => {
  return (
    <li>
      <Name name={name} /> - <Phone phone={phone} /> <button id="id" name="delete" onClick={() => deletePerson(id)}>delete</button>
    </li>
  )
}

export default Person;