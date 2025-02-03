import './App.css'
import { useState } from 'react'

// First letter of React component names must be capitalized.
const Header = (props) => {
  console.log(props.course)
}

// how to pass array of object to a react function
const Content = (props) => {
  
}
// lift state up
const Display = (props) => {
  console.log('counter', props.counter)
  return (
    <div>{props.counter}</div>
  )
}

const Button = (props) => {
  return (
    <button onClick={props.onClick}>
      {props.text}
    </button>
  )
}

//Conditional rendering
const History = (props) => {
  if (props.allClick.length === 0) {
    return (
      <div>
        the app is not clicked
      </div>
    )
  }
  return (
    <div>
      button press history: {props.allClick.join(' ')}
    </div>
  )
}



const App = () => {
  const [counter, setCounter ] = useState(0)
  console.log('rendering with counter value', counter)

  const [left, setLeft] = useState(0)
  const [right, setRight] = useState(0)
  const [allClick, setAll] = useState([])

  // Event handling click
  const handleClickIncrease = () => {
    console.log('value before', counter)
    setCounter(counter + 1)
  }
  
  const handleClickReset = () => {
    console.log('reset value before', counter)
    setCounter(0)
  }
 
  const handleLeftClick = () => {
    // adding new item to array with concat which does not mutate the existing array
    // but rather returns a new copy of the array
    setAll(allClick.concat('L'))
    setLeft(left + 1)
  }

  const handleRightClick = () => {
    setAll(allClick.concat('R'))
    setRight(right + 1)
  }

  
  //In React, the individual things rendered in braces must be primitive values, such as numbers or strings.
  
  const course = 'Half Stack application development'
  const parts = [
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

  return (
    <>

        <p>
          <Header course={course}/>
          <Content parts={parts}/>
        </p>
        
        <div>
        <Display counter={counter}/>
        
        <Button 
          onClick={handleClickIncrease}
          text = 'plus one'
        />
        <br></br>
        <Button 
          onClick={handleClickReset}
          text = 'reset'
        />
        <br></br>
        <Button
          onClick={handleLeftClick}
          text = 'left'
        />
        <Button
          onClick={handleRightClick}
          text = 'right'
        />
        <History allClick = {allClick} />
        <p>{left}{right}</p>


        </div>
    </>
  )
}

export default App
