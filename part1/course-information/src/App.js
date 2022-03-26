const App = () => {
  const course = {
    name: 'Half Stack application development',
    parts: [
      {
        name: 'Fundamentals of React',
        exercises: 10
      },
      {
        name: 'Using props to pass data',
        exercises: 7
      },
      {
        name: 'State of a component',
        exercises: 14
      }
    ]
  }

  return (
    <div>
      <Header course={course.name} />
      <Content parts={course.parts} />
      <Total parts={course.parts} />
    </div>
  )
}

const Header = (props) => {
  return (
    <h1>
      {props.course}
    </h1>
  )
}

const Content = (props) => {
  let [firstPart, secondPart, thirdPart] = props.parts;

  return (
    <div>
      <Part name={firstPart.name} exercises={firstPart.exercises} />
      <Part name={secondPart.name} exercises={secondPart.exercises} />
      <Part name={thirdPart.name} exercises={thirdPart.exercises} />
    </div>
  )
}

const Total = (props) => {
  let [firstPart, secondPart, thirdPart] = props.parts;

  return (
    <p>Number of exercises {firstPart.exercises + secondPart.exercises + thirdPart.exercises}</p>
  )
}

const Part = (props) => {
  return (
    <p>
      {props.name} {props.exercises}
    </p>
  )
}

export default App