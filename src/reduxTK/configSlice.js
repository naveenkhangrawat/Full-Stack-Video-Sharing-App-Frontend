import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    isLoading: false
}

const configSlice = createSlice({
    name: "config",
    initialState,
    reducers: {

        isLoadingTrue: (state) => {
            state.isLoading = true
        },
        isLoadingFalse: (state) => {
            state.isLoading = false
        }

    }
})

export const {isLoadingFalse, isLoadingTrue} = configSlice.actions;

export default configSlice.reducer;