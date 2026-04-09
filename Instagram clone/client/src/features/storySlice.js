import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";

const initialState = {
    storyOpacity : 0,
    display: 'block',
    eventPointer: 'none'
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
})

export const {View} = StorySlice.actions

export default StorySlice.reducer