import axiosInstance from "../axiosInstance";
import toast from "react-hot-toast";

export async function createTweet(content){
    try {
        const response = await axiosInstance.post("/tweets", {content});
        toast.success(response.data?.message);
        return response.data;
    } catch (error) {
        toast.error(error?.response?.data?.message || "Something went wrong")
        throw error;
    }
}

export async function updateTweet({tweetId, content}){
    try {
        const response = await axiosInstance.patch(`/tweets/${tweetId}`, {content});
        toast.success(response.data?.message);
        return response.data;
    } catch (error) {
        toast.error(error?.response?.data?.message || "Something went wrong")
        throw error;
    }
}

export async function deleteTweet(tweetId){
    try {
        const response = await axiosInstance.delete(`/tweets/${tweetId}`)
        toast.success(response.data?.message);
        return response.data;
    } catch (error) {
        toast.error(error?.response?.data?.message || "Something went wrong")
        throw error;
    }
}

export async function getUserTweets(userId){
    try {
        const response = await axiosInstance.get(`/tweets/user/${userId}`);
        return response.data;
    } catch (error) {
        toast.error(error?.response?.data?.message || "Something went wrong")
        throw error;
    }
}