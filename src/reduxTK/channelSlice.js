import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    channelInfo: null,
}

const channelSlice = createSlice({
    name: "channel",
    initialState,
    reducers: {
        setChannelInfo: (state, action) => {
            state.channelInfo = action.payload;
        },

        updateChannelInfo: (state, action) => {
            state.channelInfo = {...state.channelInfo, ...action.payload}
        },

        emptyChannelInfo: (state) => {
            state.channelInfo = null;
        }
    }
})

export const {setChannelInfo, updateChannelInfo, emptyChannelInfo} = channelSlice.actions;

export default channelSlice.reducer;