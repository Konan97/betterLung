import './App.css'
import Button from './components/Button'
import Note from './components/Note'
import noteService from './services/noteService'
import { useState } from 'react'
import { useEffect } from 'react'

// First letter of React component names must be capitalized.
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
  // hooks cannot must not be called from inside of a loop, a conditional expression, 
  // or any place that is not a function defining a component. 
  // This must be done to ensure that the hooks are always called in the same order, 
  // and if this isn't the case the application will behave erratically.
  const [left, setLeft] = useState(0)
  const [right, setRight] = useState(0)
  const [allClick, setAll] = useState([])
  const [notes, setNotes] = useState([])
  // access the data in the form using controlled components
  const [newNote, setNewNote] = useState('')
  const [formData, setFormData] = useState({
    id: "",
    content:"",
  })

  const hook = () => {
    console.log('effect')
    noteService
      .getAll()
      .then(initialNotes => {
        console.log('promise fulfilled')
        setNotes(initialNotes)
        console.log(initialNotes)
      })
  }

  useEffect(hook, [])

  const addNote = (event) => {
    // prevent page to reload among submitting a form
    event.preventDefault()
    const noteObject = {
      content: newNote,
      id : String(notes.length + 1),
    }
    console.log(noteObject)

    noteService
      .create(noteObject)
      .then(response => {
        console.log("response: ", response)
        setNotes(notes.concat(response.data))
        setNewNote('')
      })
  }

  const updateNote = (event) => {
    event.preventDefault(); //prevent page refresh
    console.log("updated note: ", formData)
    const {id, content} = formData

    const note = notes.find(n => n.id === id)
    console.log("original note: ", note)
    console.log(id, content)
    noteService
      .update(formData).then(returnedNote => {
        setNotes(notes.map(note => note.id === id? content: note)) // if note id == id return changedNote else note
      })
      .catch(error => {
        alert(
          `the note '${note.content}' cannot be found`
        )
        setNotes(notes.filter(n => n.id !== id)) // return a new array without current id
      })
  }

  

  const handleNoteChange = (event) => {
    console.log(event.target.value)
    setNewNote(event.target.value)
  }

  const handleNoteUpdate = (event) => {
    console.log("handle updated note ", event.target.value)
    setFormData({
      [id]: content,
    })
    
    
  }

  // Event handling click
  const handleClickIncrease = () => {
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

  return (
    <>  
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
        
        <form onSubmit={addNote}>
          <input value={newNote}
                 onChange={handleNoteChange}/>
          <button type="submit">save</button>
        </form>
        <br></br>
        <form onSubmit={updateNote}>
          <input value={formData.id}
                 onChange={handleNoteUpdate}
                 />
          <input value={formData.content}
                 onChange={handleNoteUpdate}/>
          <button type="submit">update</button>
        </form>
        </div>
    </>
  )
}

export default App
