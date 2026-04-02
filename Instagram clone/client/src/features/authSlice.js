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

const initialState = {
    user: {},
    isAuthenticated: false,
    isLoading : '', 
    error: null
}

const authSlice = createSlice({
    name: 'auth',
    initialState,
    reducers:{},
    extraReducers: (builder)=>{
        builder
        .addCase(SigUpThunk.pending,(state)=>{
            state.isLoading = true
        })
        .addCase(SigUpThunk.fulfilled,(state,action)=>{
            state.isLoading = false
            state.user = action.payload
            
        })
        .addCase(SigUpThunk.rejected,(state,action)=>{
            state.isLoading = false
            state.error = action.error.message
        })
    }
})

export default authSlice.reducer