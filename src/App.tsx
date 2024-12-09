import { useState } from 'react'

import './App.css'
import Dashboard from './components/Dashboard'
import SignUp from './components/Login'
import Login from './components/Login'

function App() {
  const [count, setCount] = useState(0)

  return (
    <>
      
      <Login/>
      </>
  )
}

export default App
