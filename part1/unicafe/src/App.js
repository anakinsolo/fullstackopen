import { useState } from 'react'

const App = () => {
  const [good, setGood] = useState(0)
  const [neutral, setNeutral] = useState(0)
  const [bad, setBad] = useState(0)

  return (
    <div>
      <Label label={'Give Feedbacks'} />
      <Button label={'Good'} counter={good} setCounter={setGood} /><Button label={'Bad'} counter={bad} setCounter={setBad} /><Button label={'Neutral'} counter={neutral} setCounter={setNeutral} />

      <Label label={'Statistics'} />
      <Statistics good={good} bad={bad} neutral={neutral}/>
    </div>
  )
}

const Label = ({label}) => {
  return <h1>{label}</h1>
}

const Button = ({label, counter, setCounter}) => {
  return (
      <button onClick={() => setCounter(counter + 1)}>
        {label}
      </button>
  )
}

const Statistics = ({good, bad, neutral}) => {
  let total = good + bad + neutral;
  let avg = (good - bad) / total
  let positive = good / total * 100
  if (total === 0) {
    return (
      <div>
        No feedback given
      </div>
    )
  } else {
    return (
      <table>
        <StatisticLine text={'Good'} value={good} />
        <StatisticLine text={'Bad'} value={bad} />
        <StatisticLine text={'Neutral'} value={neutral} />
        <StatisticLine text={'Total'} value={total} />
        <StatisticLine text={'Average'} value={avg} />
        <StatisticLine text={'Positive'} value={positive} isPositive={true} />
      </table>
    )
  }
}

const StatisticLine = ({text, value, isPositive}) => {
  if (isPositive === true) {
    return (
      <tr>
        <td>{text}</td>
        <td>{value} %</td>
      </tr>
    )
  } else {
    return (
      <tr>
        <td>{text}</td>
        <td>{value}</td>
      </tr>
    )
  }
}

export default App