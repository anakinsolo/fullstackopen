import React from "react";

const Filter = ({newSearch, onInputValueChange, search}) => {
  return(
    <div>
      <div>search for a name: <input id="search" value={newSearch} onChange={onInputValueChange}/></div>
      <div><button onClick={search}>search</button></div>
    </div>
    
  );
}

export default Filter;