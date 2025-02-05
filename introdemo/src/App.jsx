import './App.css'
import Button from './components/Button'
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

//Conditional rendering
const History = (props) => {
  console.log("History",props)
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
  // hooks cannot must not be called from inside of a loop, a conditional expression, 
  // or any place that is not a function defining a component. 
  // This must be done to ensure that the hooks are always called in the same order, 
  // and if this isn't the case the application will behave erratically.
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
    setLeft(0)
    setRight(0)
    setAll([])
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
    id: 0,
    name: 'Fundamentals of React',
    exercises: 10
  },
  {
    id: 1,
    name: 'Using props to pass data',
    exercises: 7
  },
  {
    id: 2,
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
          onClick={handleLeftClick}
          text = 'left'
        />
        <Button
          onClick={handleRightClick}
          text = 'right'
        />
        <History allClick = {allClick} />
        <p>{left}{right}</p>
        <Button 
          onClick={handleClickReset}
          text = 'reset'
        />
        <br></br>
        <ul>
          {parts.map(part => 
            <li key={part.id}>
            {part.name}
            </li>
          )}
        </ul>
        </div>
    </>
  )
}

export default App
