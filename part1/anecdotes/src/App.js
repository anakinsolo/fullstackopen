import { useState } from 'react'

const App = () => {
  const anecdotes = [
    'If it hurts, do it more often',
    'Adding manpower to a late software project makes it later!',
    'The first 90 percent of the code accounts for the first 10 percent of the development time...The remaining 10 percent of the code accounts for the other 90 percent of the development time.',
    'Any fool can write code that a computer can understand. Good programmers write code that humans can understand.',
    'Premature optimization is the root of all evil.',
    'Debugging is twice as hard as writing the code in the first place. Therefore, if you write the code as cleverly as possible, you are, by definition, not smart enough to debug it.',
    'Programming without an extremely heavy use of console.log is same as if a doctor would refuse to use x-rays or blood tests when diagnosing patients'
  ];
   
  const [selected, setSelected] = useState(0);
  const [selectedVote, setVote] = useState({});

  const getMostVote = () => {
    let max = Math.max(...Object.values(selectedVote));

    let selectedKey = Object.keys(selectedVote).find(key => selectedVote[key] === max);

    return selectedKey;
  }

  

  return (
    <div>
      <h1>Anecdote of the day</h1>
      <div>
        {anecdotes[selected]}
        {console.log(selected)}
      </div>
      <div>
        has {selectedVote[selected] ? selectedVote[selected] : 0 } votes
      </div>
      <div>
        <ButtonVote selected={selected} selectedVote={selectedVote} setVote={setVote}/><Button setSelected={setSelected} length={anecdotes.length} />
      </div>
      <div>
        <h1>Anecdote with most vote</h1>
      </div>
      <div>
        {anecdotes[getMostVote()]}
      </div>
      <div>
        has {selectedVote[getMostVote()]} vote
      </div>
    </div>
    
  )
}

const Button = ({setSelected, length}) => {
  return (
    <button onClick={() => {setSelected(Math.floor(Math.random() * length))}}>Next anecdote</button>
  )
}

const ButtonVote = ({selected, selectedVote, setVote}) => {
  console.log('Selected: ', selected);
  console.log('Selected votes: ', selectedVote);

  return (
    <button onClick={() => {
      let newVote = {...selectedVote};
      
      if (selected in newVote) {
        newVote[selected] += 1;
      } else {
        newVote[selected] = 1;
      }

      setVote(newVote)
    }}>Vote</button>
  )
}


export default App;
