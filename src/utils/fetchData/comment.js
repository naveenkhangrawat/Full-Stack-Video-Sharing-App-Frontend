import axiosInstance from "../axiosInstance";
import toast from "react-hot-toast";

export async function getVideoComments({videoId}){
    try {
        const response = await axiosInstance.get(`/comments/${videoId}`);
        return response.data;
        
    } catch (error) {
        toast.error(error?.response?.data?.message || "Something went wrong")
        throw error;
    }
}

export async function addComment({videoId, content}){
    try {
        const response = await axiosInstance.post(`/comments/${videoId}`, {content});
        toast.success(response.data?.message);
        return response.data;
    } catch (error) {
        toast.error(error?.response?.data?.message || "Something went wrong")
        throw error;
    }
}

export async function updateComment({commentId, content}){
    try {
        const response = await axiosInstance.patch(`/comments/channel/${commentId}`, {content})
        toast.success(response.data?.message);
        return response.data;
    } catch (error) {
        toast.error(error?.response?.data?.message || "Something went wrong")
        throw error;
    }
}

export async function deleteComment(commentId){
    try {
        const response = await axiosInstance.delete(`/comments/channel/${commentId}`);
        toast.success(response.data?.message);
        return response.data;
    } catch (error) {
        toast.error(error?.response?.data?.message || "Something went wrong")
        throw error;
    }
}
