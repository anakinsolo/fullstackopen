import React from "react";

const Total = ({parts}) => {
  let total = parts.reduce((prev, curr) => {
    return prev + curr.exercises
  }, 0)

  return (
    <b><p>Number of exercises {total}</p></b>
  )
}

export default Total;