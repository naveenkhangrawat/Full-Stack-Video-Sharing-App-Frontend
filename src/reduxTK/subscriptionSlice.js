import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    subscribersList: null,
    subscribedToList: null
}

const subscriptionSlice = createSlice({
    name: "subscription",
    initialState,
    reducers: {
        getSubscribersList: (state, action) => {
            state.subscribersList = action.payload;
        },

        getSubscribedToList: (state, action) => {
            state.subscribedToList = action.payload;
        }
    }
});

export const {getSubscribersList, getSubscribedToList} = subscriptionSlice.actions;

export default subscriptionSlice.reducer;