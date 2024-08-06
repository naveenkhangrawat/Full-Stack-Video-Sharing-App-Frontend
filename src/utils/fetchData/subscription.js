import axiosInstance from "../axiosInstance";
import toast from "react-hot-toast";

export async function toggleSubscription(channelId){
    try {
        const response = await axiosInstance.post(`/subscriptions/channel/${channelId}`)
        return response.data;
    } catch (error) {
        toast.error(error?.response?.data?.message || "Something went wrong")
        throw error;
    }
}

export async function getUserChannelSubscribers(channelId){
    try {
        const response = await axiosInstance.get(`/subscriptions/channel/${channelId}`)
        return response.data;
    } catch (error) {
        toast.error(error?.response?.data?.message || "Something went wrong")
        throw error;
    }
}

export async function getSubscribedChannels(subscriberId){
    try {
        const response = await axiosInstance.get(`/subscriptions/user/${subscriberId}`)
        return response.data;
    } catch (error) {
        toast.error(error?.response?.data?.message || "Something went wrong")
        throw error;
    }
}

