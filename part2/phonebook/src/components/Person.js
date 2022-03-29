import React from "react";
import Name from "./Name";
import Phone from "./Phone";

const Person = ({name, phone}) => {
  return (
    <li>
      <Name name={name} /> - <Phone phone={phone} />
    </li>
  )
}

export default Person;