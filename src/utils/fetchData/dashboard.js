import axiosInstance from "../axiosInstance";
import toast from "react-hot-toast";

export async function getChannelVideos(){
    try {
        const response = await axiosInstance.get("/dashboard/videos");
        return response.data;
    } catch (error) {
        toast.error(error?.response?.data?.message || "Something went wrong")
        throw error;
    }
}

export async function getChannelStats(){
    try {
        const response = await axiosInstance.get("/dashboard/stats");
        return response.data;
    } catch (error) {
        toast.error(error?.response?.data?.message || "Something went wrong")
        throw error;
    }
}
