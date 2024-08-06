import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    playlists: null,
    playlistInfo: null
}

const playlistSlice = createSlice({
    name: "playlist",
    initialState,
    reducers: {

        getPlaylists: (state, action) => {
            state.playlists = action.payload;
        },

        emptyPlaylists: (state, action) => {
            state.playlists = null;
        },

        addPlaylistToPlaylists: (state, action) => {
            state.playlists?.unshift(action.payload);
        },

        setPlaylistInfo: (state, action) => {
            state.playlistInfo = action.payload
        },

        emptyPlaylistInfo: (state, action) => {
            state.playlistInfo = null
        }

    }
});

export const {getPlaylists, addPlaylistToPlaylists, setPlaylistInfo, emptyPlaylistInfo, emptyPlaylists} = playlistSlice.actions;

export default playlistSlice.reducer;