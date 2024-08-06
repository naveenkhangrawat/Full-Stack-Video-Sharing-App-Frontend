
import { configureStore } from "@reduxjs/toolkit";
import configReducer from "./configSlice";
import userReducer from "./userSlice";
import channelReducer from "./channelSlice";
import commentReducer from "./commentSlice";
import likeReducer from "./likeSlice";
import tweetReducer from "./tweetSlice";
import playlistReducer from "./playlistSlice";
import subscriptionReducer from "./subscriptionSlice";
import videoReducer from "./videoSlice";
import dashboardReducer from "./dashboardSlice"

const store = configureStore({
    reducer: {
        config: configReducer,
        user: userReducer,
        channel: channelReducer,
        like: likeReducer,
        comment: commentReducer,
        tweet: tweetReducer,
        playlist: playlistReducer,
        subscription: subscriptionReducer,
        video: videoReducer,
        dashboard: dashboardReducer
    }
})

export default store;

