import './App.css'
// First letter of React component names must be capitalized.
const Header = (props) => {
  console.log(props.course)
}

const Content = (props) => {
  
}

const App = () => {
  const name = 'Uting' 
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
    </>
  )
}

export default App
