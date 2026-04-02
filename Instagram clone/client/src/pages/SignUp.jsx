import { useState } from "react"
import { Eye, Lock, User, AtSign, Mail, Users} from "lucide-react"
import { Link, useNavigate } from "react-router-dom"
import { useDispatch } from "react-redux"
import {SigUpThunk} from "../features/authSlice"
import { toast, ToastContainer } from "react-toastify"

function SignUp(){

    const [form,setForm] = useState({
        fullname : '',
        username: '',
        email:'',
        password: '',
        confirm_password: ''
    })

    const [error,setError] = useState({
        fullnameError: '',
        usernameError: '',
        emailError:'',
        passwordError: '',
        confirm_passwordError: ''
    })

    const [passwordDisplay,setPasswordDisplay] = useState(false)

    const dispatch = useDispatch()
    const navigation = useNavigate()

    const validation = ()=>{
        const FieldError = {}
        let isValidate = true
    
        if(!form.fullname || form.fullname.trim() == ''){
            isValidate = false
            FieldError['fullnameError'] = 'Fullname is required'
        }

        if(!form.username || form.username.trim() == ''){
            isValidate = false
            FieldError['usernameError'] = 'Username is required'
        }

        if(!form.email || form.email.trim() == ''){
            isValidate = false
            FieldError['emailError'] = 'Email is required'
        }

        if(!form.password || form.password == ''){
            isValidate = false
            FieldError['passwordError'] = 'Password is required'
        }

        if(!form.confirm_password || form.confirm_password == ''){
            isValidate = false
            FieldError['confirm_passwordError'] = 'Confirm password is required'
        }

        if(form.confirm_password !== form.password){
            isValidate = false
            FieldError['confirm_passwordError'] = 'Confirm password and password dose not match'
        }

        setError(FieldError)
        return isValidate
    }


    const formHandler =  async(e) =>{
        e.preventDefault()
        if(validation()){
            try{
                const result = await dispatch(SigUpThunk(form)).unwrap()
                toast.success(result.message)
                navigation('/login')
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
                <p className="auth-subtitle">Create your account and join the vibe.</p>
            </div>

            
            <form onSubmit={formHandler} className="auth-form" noValidate>
                <div className="form-group">
                <label htmlFor="fullName">Full Name</label>
                <div className="input-wrap">
                    <User />
                    <input type="text" 
                           id="fullName" 
                           name="fullName" 
                           placeholder="Alex Morgan" 
                           autoComplete="name" 
                           onChange={(e)=>{setForm({...form,fullname:e.target.value})}}
                    />
                </div>
                <span className="form-error" id="fullNameError" style={ error.fullnameError? {'display':'block'} : {'display':'none'}}>{error.fullnameError}</span>
                </div>

                <div className="form-group">
                <label htmlFor="username">Username</label>
                <div className="input-wrap">
                    <AtSign />
                    <input type="text" 
                           id="username" name="username" 
                           placeholder="alexmorgan" 
                           autoComplete="username"
                           onChange={(e)=>{setForm({...form,username:e.target.value})}}
                    />
                </div>
                <span className="form-error" id="usernameError" style={ error.usernameError? {'display':'block'} : {'display':'none'}}>{error.usernameError}</span>
                </div>

                <div className="form-group">
                <label htmlFor="email">Email</label>
                <div className="input-wrap">
                    <Mail />
                    <input type="email" 
                           id="email" 
                           name="email" 
                           placeholder="you@example.com" 
                           autoComplete="email"
                           onChange={(e)=>{setForm({...form,email:e.target.value})}} 
                    />
                </div>
                <span className="form-error" id="emailError" style={ error.emailError? {'display':'block'} : {'display':'none'}}>{error.emailError}</span>
                </div>

                <div className="form-group">
                <label htmlFor="password">Password</label>
                <div className="input-wrap">
                    <Lock />
                    <input type={passwordDisplay ? 'text' : 'password'} 
                           id="password" 
                           name="password" 
                           placeholder="••••••••" 
                           autoComplete="new-password" 
                           onChange={(e)=>{setForm({...form,password:e.target.value})}}
                    />
                    <button type="button" className="toggle-pw" id="togglePw" onClick={()=>{setPasswordDisplay(!passwordDisplay)}}><Eye /></button>
                </div>
                <div className="password-strength" id="strengthBar">
                    <div className="strength-fill"></div>
                </div>
                <span className="form-error" id="passwordError" style={ error.passwordError? {'display':'block'} : {'display':'none'}}>{error.passwordError}</span>
                </div>

                <div className="form-group">
                <label htmlFor="confirmPassword">Confirm Password</label>
                <div className="input-wrap">
                    <Lock />
                    <input type="password" 
                           id="confirmPassword" 
                           name="confirmPassword" 
                           placeholder="••••••••" 
                           autoComplete="new-password"
                           onChange={(e)=>{setForm({...form,confirm_password:e.target.value})}}
                    />
                </div>
                <span className="form-error" id="confirmPasswordError"  style={ error.confirm_passwordError? {'display':'block'} : {'display':'none'}} >{error.confirm_passwordError}</span>
                </div>

                {/* <label className="checkbox-label" style={{'marginBottom':'0.5rem'}}>
                <input type="checkbox" id="terms" /> <span>I agree to the <a href="#" className="link-primary">Terms</a> and <a href="#" className="link-primary">Privacy Policy</a></span>
                </label>
                <span className="form-error" id="termsError"></span> */}

                <button type="submit" className="btn-auth">Create Account</button>
            </form>

            {/* <div className="auth-divider"><span>or continue with</span></div>

            
            <div className="social-buttons">
                <button className="btn-social"><i data-lucide="chrome"></i> Google</button>
                <button className="btn-social"><i data-lucide="github"></i> GitHub</button>
            </div> */}

            <p className="auth-footer">Already have an account? <Link to="/login" className="link-primary">Log in</Link></p>
            </div>
        </div>
    )
}
export default SignUp