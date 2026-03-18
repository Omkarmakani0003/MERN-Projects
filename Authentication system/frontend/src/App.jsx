import { useState } from 'react'
import './App.css'
import Signup from '../pages/Signup'
import Login from '../pages/Login'
import Dashboard from '../pages/dashboard'
import { BrowserRouter, Routes, Route } from 'react-router-dom'

function App() {
  
  return (
    <BrowserRouter>
       <Routes>
          <Route path="/signup" element={<Signup />}/>
          <Route path="/login" element={<Login />}/>
          <Route path="/dashboard" element={<Dashboard />}/>
       </Routes>
    </BrowserRouter>
  )
}

export default App
