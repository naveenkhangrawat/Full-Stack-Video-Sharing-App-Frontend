import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    isLoggedIn: false,
    userData: null,
    watchHistory: null
}

const userSlice = createSlice({
    name: "user",
    initialState,
    reducers: {

        login: (state, action) => {
            state.isLoggedIn = true;
            state.userData = action.payload
        },
        logout: (state) => {
            state.isLoggedIn = false;
            state.userData = null;
        },
        updateUserData: (state, action) => {
            state.userData = action.payload
        },
        setWatchHistory: (state, action) => {
            state.watchHistory = action.payload
        },
        emptyWatchHistory: (state, action) => {
            state.watchHistory = null
        }
    }
})

export const {login, logout, updateUserData, setWatchHistory, emptyWatchHistory} = userSlice.actions;

export default userSlice.reducer;