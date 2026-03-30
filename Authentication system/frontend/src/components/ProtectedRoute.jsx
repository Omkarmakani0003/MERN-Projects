import { Link, Navigate, useNavigate } from 'react-router-dom'
import { useAuth } from '../contaxt/auth/authContext'

const ProtectedRoute = ({ children })=>{
   
    const {user,loading} = useAuth()

    if(loading) return <h1>Loading...</h1>

    if(!user) return <Navigate to="/login" />

    return children
}

export default ProtectedRoute