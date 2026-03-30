import { useEffect } from "react"
import axios from 'axios'
import { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { useAuth } from '../src/contaxt/auth/authContext'

function Dashboard(){

   const [user,setUser] = useState('')
   const [error,setError] = useState('')

   const fetchUser = async()=>{
           try{
              const response = await axios.get('http://localhost:3000/api/auth/dashboard',{withCredentials:true})
              setUser(response.data.message)
           }catch(e){
              setError(e.response.data.message)  
           }
       }
 
    useEffect(()=>{
       fetchUser()
    },[])


    return (
        <>
         <h1>{user ? user : error ? error : 'Loading...'}</h1> 
        </>
    )
}


export default Dashboard