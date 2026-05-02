import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import Axios from "../axios/Axios";

export const SigUpThunk = createAsyncThunk('auth/signup',async(data,{rejectWithValue})=>{
    try{
        const response = await Axios.post("/auth/signup",data)
        return response.data
    }catch(error){
        return rejectWithValue(error.response?.data || error.message)
    }
})
export const LoginThunk = createAsyncThunk('auth/login',async(data,{rejectWithValue})=>{
    try{
        const response = await Axios.post("/auth/login",data)
        return response.data
    }catch(error){
        return rejectWithValue(error.response?.data || error.message)
    }
})

export const GetUserProfileThunk = createAsyncThunk('/user/profile',async(data,{rejectWithValue})=>{
    try{
        const response = await Axios.get("/user/profile")
        return response.data
    }catch(error){
        return rejectWithValue(error.response?.data || error.message)
    }
})

const initialState = {
    user: null,
    isAuthenticated: false,
    isLoading : true, 
    error: null
}

const authSlice = createSlice({
    name: 'auth',
    initialState,
    reducers:{},
    extraReducers: (builder)=>{
        builder
        //Signup
        .addCase(SigUpThunk.pending,(state)=>{
            state.isLoading = true
        })
        .addCase(SigUpThunk.fulfilled,(state,action)=>{
            state.isLoading = false
            // state.user = action.payload 
        })
        .addCase(SigUpThunk.rejected,(state,action)=>{
            state.isLoading = false
            state.error = action.error.message
        })

        //Login
        .addCase(LoginThunk.pending,(state)=>{
            state.isLoading = true
        })
        .addCase(LoginThunk.fulfilled,(state,action)=>{
            state.isLoading = false
            state.user = action.payload.data.user
            state.isAuthenticated = true
            
        })
        .addCase(LoginThunk.rejected,(state,action)=>{
            state.isLoading = false
            state.error = action.error.message
        })

        //profile
        .addCase(GetUserProfileThunk.pending,(state)=>{
            state.isLoading = true
        })
        .addCase(GetUserProfileThunk.fulfilled,(state,action)=>{
            state.isLoading = false
            state.user = action.payload.data
            state.isAuthenticated = true 
        })
        .addCase(GetUserProfileThunk.rejected,(state,action)=>{
            state.isLoading = false
            state.error = action.error.message
            state.isAuthenticated = false
        })
    }
})

export default authSlice.reducer