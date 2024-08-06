import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    tweetsList: null
}

const tweetSlice = createSlice({
    name: "tweet",
    initialState,
    reducers: {
        getTweetsList: (state, action) => {
            state.tweetsList = action.payload;
        },

        addTweetToList: (state, action) => {
            state.tweetsList?.unshift(action.payload);
        },

        updateTweetToList: (state, action) => {
            state.tweetsList = state.tweetsList?.map((element) => element?._id === action.payload?._id ? {...element, ...action.payload} : element);
        },

        removeTweetFromList: (state, action) => {
            state.tweetsList = state.tweetsList?.filter((element) => element?._id !== action.payload?.tweetId);
        },

        emptyTweetsList: (state) => {
            state.tweetsList = null
        }
    }
})

export const {getTweetsList, addTweetToList, updateTweetToList, removeTweetFromList, emptyTweetsList} = tweetSlice.actions;

export default tweetSlice.reducer;
