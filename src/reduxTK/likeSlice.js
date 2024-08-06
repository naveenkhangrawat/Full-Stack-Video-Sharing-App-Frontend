import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    likedVideos: null
}

const likeSlice = createSlice({
    name: "like",
    initialState,
    reducers: {
        setLikedVideos: (state, action) => {
            state.likedVideos = action.payload;
        },
        
        emptyLikedVideos: (state, action) => {
            state.likedVideos = null
        }
    }
})

export const {setLikedVideos, emptyLikedVideos} = likeSlice.actions;

export default likeSlice.reducer;