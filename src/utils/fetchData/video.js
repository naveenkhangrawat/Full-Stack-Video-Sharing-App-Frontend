import { BASE_URL } from "../../constants";
import axiosInstance from "../axiosInstance";
import toast from "react-hot-toast";

export async function publishAVideo({title, description, videoFile, thumbnail}){
    const formData = new FormData();
    formData.append("title", title);
    formData.append("description", description);
    formData.append("videoFile", videoFile[0]);
    formData.append("thumbnail", thumbnail[0]);

    try {
        const response = await axiosInstance.post("/videos", formData);
        toast.success(response?.data?.message);
        return response.data;
    } catch (error) {
        toast.error(error?.response?.data?.message || "Something went wrong")
        throw error;
    }
}

export async function getVideoById(videoId){
    try {
        const response = await axiosInstance.get(`/videos/${videoId}`);
        return response.data;
    } catch (error) {
        toast.error(error?.response?.data?.message || "Something went wrong")
        throw error;
    }
}

export async function updateVideo({videoId, title, description, thumbnail}){
    const formData = new FormData();
    formData.append("title", title);
    formData.append("description", description);
    formData.append("thumbnail", thumbnail[0]);

    try {
        const response = await axiosInstance.patch(`/videos/${videoId}`, formData);
        toast.success(response?.data?.message);
        return response.data;
    } catch (error) {
        toast.error(error?.response?.data?.message || "Something went wrong")
        throw error;
    }
}

export async function deleteVideo(videoId){
    try {
        const response = await axiosInstance.delete(`/videos/${videoId}`)
        toast.success(response?.data?.message);
        return response.data;
    } catch (error) {
        toast.error(error?.response?.data?.message || "Something went wrong")
        throw error;
    }
}

export async function togglePublishStatus(videoId){
    try {
        const response = await axiosInstance.patch(`/videos/toggle/publish/${videoId}`);
        toast.success(response?.data?.message);
        return response.data;
    } catch (error) {
        toast.error(error?.response?.data?.message || "Something went wrong")
        throw error;
    }
}

export async function getAllVideos({textQuery, userId}){

    const url = new URL(`${BASE_URL}/videos`);
    if(userId){
        url.searchParams.set("userId", userId);
    }
    if(textQuery){
        url.searchParams.set("textQuery", textQuery);
    }

    try {
        const response = await axiosInstance.get(url);
        return response.data;
    } catch (error) {
        toast.error(error?.response?.data?.message || "Something went wrong")
        throw error;
    }
}
