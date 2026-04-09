import Home from './pages/Home'
import Profile from './pages/Profile'
import './App.css'
import Login from './pages/Login'
import SignUp from './pages/SignUp'
import Layout from './layouts/Layout'
import { Routes, Route } from 'react-router-dom'
import { toast, ToastContainer } from "react-toastify"
import 'react-toastify/dist/ReactToastify.css';
import Protected from './layouts/Protected'
import { useDispatch,useSelector } from "react-redux"
import { GetUserProfileThunk } from "./features/authSlice"
import { useEffect } from "react";


function App() {

  const dispatch = useDispatch()

  useEffect(()=>{
      dispatch(GetUserProfileThunk())
  },[dispatch])

  return (
    <>
      <Routes>
         <Route path="/login" element={<Login />}/>
         <Route path="/signup" element={<SignUp />}/>
      
      
        <Route element={<Protected/>}>
         <Route path="/" element={<Layout />}>
            <Route path="/" element={<Home />}/>
            <Route path="profile" element={<Profile />}/>
         </Route>
        </Route>
      </Routes>
      <ToastContainer />
    </>
  )
}

export default App
