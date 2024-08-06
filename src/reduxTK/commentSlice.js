import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    commentsList: null
}

const commentSlice = createSlice({
    name: "comment",
    initialState,
    reducers: {
        getCommentsList: (state, action) => {
            state.commentsList = action.payload;
        },

        addCommentToList: (state, action) => {
            state.commentsList?.unshift(action.payload);
        },

        updateCommentToList: (state, action) => {
            state.commentsList = state.commentsList?.map((element) => element?._id === action.payload?._id ? {...element, ...action.payload} : element)
        },

        removeCommentFromList: (state, action) => {
            state.commentsList = state.commentsList?.filter((element) => element?._id !== action.payload?.commentId);
        },

        emptyCommentsList: (state) => {
            state.commentsList = null
        }
    }
})

export const {getCommentsList, addCommentToList, updateCommentToList, removeCommentFromList, emptyCommentsList} = commentSlice.actions;

export default commentSlice.reducer;

