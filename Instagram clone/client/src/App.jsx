import Home from './pages/Home'
import './App.css'
import Login from './pages/Login'
import SignUp from './pages/SignUp'
import Layout from './layouts/Layout'
import { Routes, Route } from 'react-router-dom'
import { toast, ToastContainer } from "react-toastify"
import 'react-toastify/dist/ReactToastify.css';

function App() {
  

  return (
    <>
      <Routes>
         <Route path="/login" element={<Login />}/>
         <Route path="/signup" element={<SignUp />}/>
      </Routes>
      
      <Routes>
         <Route path="/" element={<Layout />}>
            <Route path="/" element={<Home />}/>
         </Route>
      </Routes>
      <ToastContainer />
    </>
  )
}

export default App
