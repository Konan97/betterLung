console.log('hello world')

import { createServer } from 'http'
import express from 'express'
const app = express()

let notes = [
    {
      "id": "1",
      "content": "HTML is easy",
      "important": true
    },
    {
      "id": "2",
      "content": "hi"
    },
    {
      "id": "3",
      "content": "really"
    },
    {
      "id": "4",
      "content": "why"
    }
]

app.get('/', (request, response) => {
    response.send('<h1>Hello World!</h1>')
})

app.get('/api/notes/:id', (request, response) => {
    const id = request.params.id
    const note = notes.find((note) => note.id === id)

    // if no note is found, return 404
    if (note) {
      response.json(note)
    } else {
      response.status(404).end()
    }
})

app.delete('/api/notes/:id', (request, response) => {
  const id = request.params.id
  notes = notes.filter(note => note.id !== id)

  // 204 no content
  response.status(204).end()
})

const PORT = 3001
app.listen(PORT, () => {
    
})
console.log(`Server running on port ${PORT}`)