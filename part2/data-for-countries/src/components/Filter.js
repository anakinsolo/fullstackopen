import React from "react";

const Filter = ({newSearch, onInputValueChange}) => {
  return (
    <div>
      find countries <a><input id="search" value={newSearch} onChange={onInputValueChange}/></a>
    </div>
  )
}

export default Filter;