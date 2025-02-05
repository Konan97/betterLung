import { createRoot } from 'react-dom/client'
import axios from 'axios'

import App from './App.jsx'
// get data from server
axios
.get('http://localhost:3001/notes')
.then(response => {
    console.log(response)
    const notes = response.data
    console.log(notes)
})
createRoot(document.getElementById('root')).render(
    <App />
)
