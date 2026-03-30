import Home from './pages/Home'
import './App.css'
import Login from './pages/Login'
import Layout from './layouts/Layout'
import { Routes, Route } from 'react-router-dom'

function App() {
  

  return (
    <>
      <Routes>
         <Route path="/login" element={<Login />}/>
      </Routes>
      
      <Routes>
         <Route path="/" element={<Layout />}>
            <Route path="/" element={<Home />}/>
         </Route>
      </Routes>
    </>
  )
}

export default App
