import { configureStore } from "@reduxjs/toolkit";
import authSlice from "../features/authSlice"
import StorySlice from "../features/storySlice"

export const store = configureStore({
    reducer : {
        auth:authSlice,
        story:StorySlice
    }
})

