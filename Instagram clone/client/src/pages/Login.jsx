import { Lock, Mail } from "lucide-react"
import { useState } from "react"
import { useDispatch } from "react-redux"
import { Link, useNavigate } from "react-router-dom"
import { toast, ToastContainer } from "react-toastify"
import {LoginThunk} from "../features/authSlice"

function Login(){

  const [form,setForm] = useState({
      email: '',
      password: ''
  })

  const [error,setError] = useState({
      emailError: '',
      passwordError: ''
  })

  const [passwordDisplay,setPasswordDisplay] = useState(false)
  const dispatch = useDispatch()
  const navigation = useNavigate()

  const validation = ()=>{

       const FieldError = {}
        let isValidate = true
    
        if(!form.email || form.email == ''){
            isValidate = false
            FieldError['emailError'] = 'Email is required'
        }

        if(!form.password || form.password == ''){
            isValidate = false
            FieldError['passwordError'] = 'password is required'
        }

        setError(FieldError)
        return isValidate
  }

  const formHandler =  async(e) =>{
        e.preventDefault()

         if(validation()){
              try{
                  const result = await dispatch(LoginThunk(form)).unwrap()
                  toast.success(result.message)
                  navigation('/')
              }catch(error){
                  toast.error(error.message)
              }
        }
      
  }


    return (
    <div className="auth-page">
      <div className="auth-card">
        
        <div className="auth-logo">
          <h1 className="navbar-logo"><span className="brand-primary">Social</span><span className="brand-fg">Vibe</span></h1>
          <p className="auth-subtitle">Welcome back! Log in to continue.</p>
        </div>

        
        <form id="loginForm" onSubmit={formHandler} className="auth-form" noValidate>
          <div className="form-group">
            <label htmlFor="email">Email</label>
            <div className="input-wrap">
              <Mail />
              <input type="email" 
                     id="email" 
                     name="email" 
                     placeholder="you@example.com" 
                     autoComplete="email" 
                     onChange={(e)=>{ setForm({...form,email:e.target.value}) }}
              />
            </div>
            <span className="form-error" id="emailError" style={ error.emailError? {'display':'block'} : {'display':'none'}}>{error.emailError}</span>
          </div>

          <div className="form-group">
            <label htmlFor="password">Password</label>
            <div className="input-wrap">
              <Lock />
              <input type="password" 
                     id="password" 
                     name="password" 
                     placeholder="••••••••" 
                     autoComplete="current-password" 
                     onChange={(e)=>{ setForm({...form,password:e.target.value}) }}
              />
              <button type="button" className="toggle-pw" id="togglePw"><i data-lucide="eye"></i></button>
            </div>
            <span className="form-error" id="passwordError" style={ error.passwordError? {'display':'block'} : {'display':'none'}}>{error.passwordError}</span>
          </div>

          {/* <div className="form-row">
            <label className="checkbox-label">
              <input type="checkbox" id="remember" /> <span>Remember me</span>
            </label>
            <a href="#" className="link-primary">Forgot password?</a>
          </div> */}

          <button type="submit" className="btn-auth">Log In</button>
        </form>

        
        {/* <div className="auth-divider"><span>or continue with</span></div>

        
        <div className="social-buttons">
          <button className="btn-social"><i data-lucide="chrome"></i> Google</button>
          <button className="btn-social"><i data-lucide="github"></i> GitHub</button>
        </div> */}

        <p className="auth-footer">Don't have an account? <Link to="/signup" className="link-primary">Sign up</Link></p>
      </div>
    </div>
    )
}

export default Login
