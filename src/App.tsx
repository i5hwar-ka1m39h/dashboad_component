import { useState } from 'react'

import './App.css'
import Dashboard from './components/Dashboard'
import Login from './components/Login'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'



function App() {
  const [count, setCount] = useState(0)

  return (
    <>
    <Router>
      <Routes>
        <Route path='/dashboard' element={<Dashboard/>} />
        <Route path='/' element={<Login/>}/>
      </Routes>
    </Router>
      
      


      </>
  )
}

export default App
