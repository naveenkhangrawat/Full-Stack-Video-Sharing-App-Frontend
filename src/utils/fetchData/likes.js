import axiosInstance from "../axiosInstance";
import toast from "react-hot-toast";

export async function toggleVideoLike(videoId){
    try {
        const response = await axiosInstance.post(`/likes/toggle/video/${videoId}`);
        return response.data;
    } catch (error) {
        toast.error(error?.response?.data?.message || "Something went wrong")
        throw error;
    }
}

export async function toggleCommentLike(commentId){
    try {
        const response = await axiosInstance.post(`/likes/toggle/comment/${commentId}`);
        return response.data;
    } catch (error) {
        toast.error(error?.response?.data?.message || "Something went wrong")
        throw error;
    }
}

export async function toggleTweetLike(tweetId){
    try {
        const response = await axiosInstance.post(`/likes/toggle/tweet/${tweetId}`);
        return response.data;
    } catch (error) {
        toast.error(error?.response?.data?.message || "Something went wrong")
        throw error;
    }
}

export async function getLikedVideos(){
    try {
        const response = await axiosInstance.get("/likes/videos");
        return response.data;
    } catch (error) {
        throw error;
    }
}
