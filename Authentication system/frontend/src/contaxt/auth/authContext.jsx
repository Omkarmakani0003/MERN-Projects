import axios from 'axios'
import { createContext, useContext, useState, useEffect } from 'react'
import API from '../../axios/axios'

const AuthContext = createContext()

export const AuthProvider = ({children})=>{

   const [user,setUser] = useState(null)
   const [loading,setLoading] = useState(true)

   const fetchUser = async()=>{
        try{
            const response = await API('/auth/dashboard')
            setUser(response.data)
        }catch(e){
            setUser(null)
        } finally{
            setLoading(false)
        }
    }

    useEffect(()=>{
        fetchUser()
    },[])

    const signup = async (data) => {
        return await API.post('/auth/signup',data)
    }

    const login = async (data) =>{
        const response = await API.post('/auth/login',data)
        setUser(response.data)
    }

    // const logout = async (data) => {
    //    await API.post('/auth/logout',data)
    //    setUser(null)
    // }


    return (
        <AuthContext.Provider value={{ user, login, signup, loading }}>
           {children}
        </AuthContext.Provider>
  );

}


export const useAuth = () => useContext(AuthContext)
