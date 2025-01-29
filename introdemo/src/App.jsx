import './App.css'
import { useState } from 'react'

// First letter of React component names must be capitalized.
const Header = (props) => {
  console.log(props.course)
}

// how to pass array of object to a react function
const Content = (props) => {
  
}

const App = () => {
  const [counter, setCounter ] = useState(0)
  
  setTimeout(
    () => setCounter(counter + 1),
    1000
  )
  
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
        
        <div>{counter}</div>
    </>
  )
}

export default App
