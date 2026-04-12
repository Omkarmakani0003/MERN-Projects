import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import Axios from "../axios/Axios";

export const GetStoryThunk = createAsyncThunk('/user/storylist',async(_,{rejectWithValue})=>{
    try{
        const response = await Axios.get('/user/storylist')
        return response.data
    }catch(error){
        return rejectWithValue(error.response?.data || error.message)
    }
})

export const DeleteStoryThunk = createAsyncThunk('/user/delete-story',async(data,{rejectWithValue})=>{
    try{
        const response = await Axios.delete('/user/delete-story',{data},{
             headers: {
                'Content-Type': 'application/json'
              }
        })
        return response.data
    }catch(error){
        return rejectWithValue(error.response?.data || error.message)
    }
})

export const UploadStoryThunk = createAsyncThunk('/user/story_upload',async(data,{rejectWithValue})=>{
    try{
        const response = await Axios.post('/user/story_upload',data,{
            headers: {
                'Content-Type': 'multipart/form-data'
            }
        })
        return response.data
    }catch(error){
        return rejectWithValue(error.response?.data || error.message)
    }
})



const initialState = {
    storyOpacity : 0,
    display: 'block',
    eventPointer: 'none',
    story:[],
    isLoading: false,
    error: null
}

const StorySlice = createSlice({
    name: 'story',
    initialState,
    reducers:{
       View: (state,action)=>{
          state.storyOpacity = action.payload.story_opacity
          state.display = action.payload.display 
          state.eventPointer  = action.payload.eventPointer
       } 
    },
    extraReducers: (builder) => {
        builder.
            addCase(GetStoryThunk.pending,(state)=>{
               state.isLoading = true
            })
            .addCase(GetStoryThunk.fulfilled,(state,action)=>{
                state.isLoading = false
                state.story = action.payload.data 
            })
            .addCase(GetStoryThunk.rejected,(state,action)=>{
               state.isLoading = false
               state.error = action.error.message
            })
            .addCase(DeleteStoryThunk.pending,(state)=>{
               state.isLoading = true
            })
            .addCase(DeleteStoryThunk.fulfilled,(state,action)=>{
                state.isLoading = false
            })
            .addCase(DeleteStoryThunk.rejected,(state,action)=>{
               state.isLoading = false
               state.error = action.error.message
            })
            .addCase(UploadStoryThunk.pending,(state)=>{
               state.isLoading = true
            })
            .addCase(UploadStoryThunk.fulfilled,(state,action)=>{
                state.isLoading = false
            })
            .addCase(UploadStoryThunk.rejected,(state,action)=>{
               state.isLoading = false
               state.error = action.error.message
            })
        
    }
})

export const {View} = StorySlice.actions

export default StorySlice.reducer