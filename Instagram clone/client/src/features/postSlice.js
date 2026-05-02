import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import Axios from "../axios/Axios";

export const GetPostThunk = createAsyncThunk('/user/postlist',async(_,{rejectWithValue})=>{
    try{
        const response = await Axios.get('/user/postlist')
        return response.data.data.docs
    }catch(error){
        return rejectWithValue(error.response?.data || error.message)
    }
})

// export const DeleteStoryThunk = createAsyncThunk('/user/delete-story',async(data,{rejectWithValue})=>{
//     try{
//         const response = await Axios.delete('/user/delete-story',{data},{
//              headers: {
//                 'Content-Type': 'application/json'
//               }
//         })
//         return response.data
//     }catch(error){
//         return rejectWithValue(error.response?.data || error.message)
//     }
// })

// export const UploadStoryThunk = createAsyncThunk('/user/story_upload',async(data,{rejectWithValue})=>{
//     try{
//         const response = await Axios.post('/user/story_upload',data,{
//             headers: {
//                 'Content-Type': 'multipart/form-data'
//             }
//         })
//         return response.data
//     }catch(error){
//         return rejectWithValue(error.response?.data || error.message)
//     }
// })



const initialState = {
    post:[],
    isLoading: false,
    error: null
}

const PostSlice = createSlice({
    name: 'post',
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
            addCase(GetPostThunk.pending,(state)=>{
               state.isLoading = true
            })
            .addCase(GetPostThunk.fulfilled,(state,action)=>{
                state.isLoading = false
                state.post = action.payload.data 
            })
            .addCase(GetPostThunk.rejected,(state,action)=>{
               state.isLoading = false
               state.error = action.error.message
            })
        
    }
})

export default PostSlice.reducer