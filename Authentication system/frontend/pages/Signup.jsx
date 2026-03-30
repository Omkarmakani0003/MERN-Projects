import axios from 'axios'
import { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'

function Signup(){
    const navigate = useNavigate()
    const [fromData, setFormData] = useState({
        name: '',
        email:'',
        password:''
    })

    const [error,setError] = useState('')
    const register = async(e)=>{
       e.preventDefault()
       try{
            const response = await axios.post('http://localhost:3000/api/auth/signup',fromData, {withCredentials:true})
            if(response.data.success){
                navigate('/login')
            }
        }catch(e){
            setError(e.response.data.message)
       }
    }


    return (
        <div className="card">
            <h2>Create Account</h2>
            <p className='error'>{error}</p>
            <form onSubmit={register}>
                <div className="input-group">
                <label>Name</label>
                <input type="text" value={fromData.name} onChange={(e)=>{ setFormData({...fromData,name:e.target.value}) }} required />
                </div>

                <div className="input-group">
                <label>Email</label>
                <input type="email" value={fromData.email} onChange={(e)=>{ setFormData({...fromData,email:e.target.value}) }} required />
                </div>

                <div className="input-group">
                <label>Password</label>
                <input type="password" value={fromData.password} onChange={(e)=>{ setFormData({...fromData,password:e.target.value}) }} required />
                </div>

                <button type="submit">Sign Up</button>
            </form>

            <div className="login-link">
                Already have an account? <Link to="/login">Login</Link>
            </div>
            </div>
    )
}

export default Signup

