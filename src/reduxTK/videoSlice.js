import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    video: null,
    videoList: null
}

const videoSlice = createSlice({
    name: "video",
    initialState,
    reducers: {
        setVideo: (state, action) => {
            state.video = action.payload;
        },

        updateVideo: (state, action) => {
            state.video = {...state.video, ...action.payload}
        },

        emptyVideo: (state) => {
            state.video = null;
        },

        setVideoList: (state, action) => {
            state.videoList = action.payload;
        },

        addVideoToList: (state, action) => {
            state.videoList?.unshift(action.payload);
        },

        emptyVideoList: (state, action) => {
            state.videoList = null
        }
    }
})

export const {setVideo, updateVideo, emptyVideo, setVideoList, addVideoToList, emptyVideoList} = videoSlice.actions;

export default videoSlice.reducer;
