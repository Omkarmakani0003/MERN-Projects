import axios from 'axios'
import { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import API from '../src/axios/axios'
import { useAuth } from '../src/contaxt/auth/authContext'

function Login(){

        const {login} = useAuth()
        const navigate = useNavigate()

        const [fromData, setFormData] = useState({
            email:'',
            password:''
        }) 
        const [error,setError] = useState('')

        const loginHandler = async(e)=>{
           e.preventDefault()
           setError("")
           try{
                await login(fromData)
                navigate('/dashboard')
            }catch(e){
                setError(e.response.data.message)
           }
        }

    return (
        <div className="card">
        <h2>Login</h2>
        <p className='error'>{error}</p>
        <form onSubmit={loginHandler} >
            <div className="input-group">
            <label>Email</label>
            <input type="email" value={fromData.email} onChange={(e)=>{ setFormData({...fromData,email:e.target.value}) }} required />
            </div>

            <div className="input-group">
            <label>Password</label>
            <input type="password" value={fromData.password} onChange={(e)=>{ setFormData({...fromData,password:e.target.value}) }} required />
            </div>

            <button type="submit">Login</button>
        </form>

        <div className="signup-link">
            Don’t have an account? <Link to="/signup">Sign Up</Link>
        </div>
        </div>
    )
}

export default Login