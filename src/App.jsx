import './App.css'
import React from "react"
import Button from './components/Button'
import Note from './components/Note'
import noteService from './services/noteService'
import { useState } from 'react'
import { useEffect } from 'react'
import Display from './components/Display'
import SearchBox from './components/SearchBox'
// First letter of React component names must be capitalized.
// lift state up


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
  const [id, setId] = useState('')

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

  const showAllNote = (event) => {
    hook()
  }

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
        setNotes(notes.concat(noteObject))
        console.log("notes now", notes)
        setNewNote('')
      })
  }

  const deleteNote = (event) => {
    event.preventDefault()

    noteService
      .remove(id)
      .then(response => {
        console.log("delete: ", response)
        setNotes(notes.filter(note => note.id !== id))
        setId('')
      })
  }

  

  const handleNoteChange = (event) => {
    console.log(event.target.value)
    setNewNote(event.target.value)
  }

  const handleNoteDelete = (event) => {
    console.log(event.target.value)
    setId(event.target.value)
  }

  // Event handling click
  const handleClickShowAll = (event) => {
    console.log(event.target.value)
    showAllNote()
  }
  
  const handleClickReset = () => {
    console.log('reset value before', counter)
    setCounter(0)
    setLeft(0)
    setRight(0)
    setAll([])
  }
 
  const handleSearch = (query) => {
    console.log("Search Query:", query)
  }

  
  //In React, the individual things rendered in braces must be primitive values, such as numbers or strings.

  return (
    <>  
        <div>
          <Display items={notes}/>
          <Button 
            onClick={handleClickShowAll}
            text='Show All'/>
          
        </div>

        <div>
        <form onSubmit={addNote}>
          <input value={newNote}
                 onChange={handleNoteChange}/>
          <button type="submit">Add</button>
        </form>

        <br></br>
        <form onSubmit={deleteNote}>
          <input value={id}
                 onChange={handleNoteDelete}/>
          <button type="submit">Delete</button>
        </form>
      </div>
      <div style={{ padding: "20px" }}>
        <h2>Search</h2>
        <SearchBox onSearch={handleSearch} />
      </div>
    </>
  )
}

export default App
