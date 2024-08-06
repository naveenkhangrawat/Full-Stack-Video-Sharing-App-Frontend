import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    channelVideos: null,
    channelStats: null,
}

const dashboardSlice = createSlice({
    name: "dashboard",
    initialState,
    reducers: {
        setChannelVideos: (state, action) => {
            state.channelVideos = action.payload;
        },

        addVideoToChannelVideos: (state, action) => {
            state.channelVideos?.unshift(action.payload);
        },

        updateVideoInChannelVideos: (state, action) => {
            state.channelVideos = state.channelVideos?.map((video) => video?._id === action.payload?._id ? {...video, ...action.payload} : video)
        },

        removeVideoFromChannelVideos: (state, action) => {
            state.channelVideos = state.channelVideos?.filter((video) => video?._id !== action.payload?.videoId)
        },

        setChannelStats: (state, action) => {
            state.channelStats = action.payload;
        },

        updateChannelStats: (state, action) => {
            state.channelStats = {...state.channelStats, ...action.payload}
        },

        emptyChannelVideos: (state, action) => {
            state.channelVideos = null
        },

        emptyChannelStats: (state, action) => {
            state.channelStats = null
        }
    }
});


export const {
    setChannelVideos, 
    addVideoToChannelVideos, 
    updateVideoInChannelVideos, 
    removeVideoFromChannelVideos, 
    setChannelStats, 
    updateChannelStats, 
    emptyChannelVideos,
    emptyChannelStats} = dashboardSlice.actions;

export default dashboardSlice.reducer;