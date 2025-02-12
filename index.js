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

app.get('/api/notes', (request, response) => {
    response.json(notes)
})


const PORT = 3001
app.listen(PORT, () => {
    
})
console.log(`Server running on port ${PORT}`)