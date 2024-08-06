import axiosInstance from "../axiosInstance";
import toast from "react-hot-toast";

export async function getUserPlaylists(userId){
    try {
        const response = await axiosInstance.get(`/playlists/user/${userId}`);
        return response.data;
    } catch (error) {
        toast.error(error?.response?.data?.message || "Something went wrong")
        throw error;
    }
}

export async function getPlaylistById(playlistId){
    try {
        const response = await axiosInstance.get(`/playlists/${playlistId}`);
        return response.data;
    } catch (error) {
        toast.error(error?.response?.data?.message || "Something went wrong")
        throw error;
    }
}

export async function createPlaylist({name, description}){
    try {
        const response = await axiosInstance.post("/playlists", {name, description});
        toast.success(response.data?.message);
        return response.data;
    } catch (error) {
        toast.error(error?.response?.data?.message || "Something went wrong")
        throw error;
    }
}

export async function updatePlaylist({playlistId, name, description}){
    try {
        const response = await axiosInstance.patch(`/playlists/${playlistId}`, {name, description});
        toast.success(response.data?.message);
        return response.data;
    } catch (error) {
        toast.error(error?.response?.data?.message || "Something went wrong")
        throw error;
    }
}

export async function deletePlaylist(playlistId){
    try {
        const response = await axiosInstance.delete(`/playlists/${playlistId}`)
        toast.success(response.data?.message);
        return response.data;
    } catch (error) {
        toast.error(error?.response?.data?.message || "Something went wrong")
        throw error;
    }
}

export async function addVideoToPlaylist(playlistId, videoId){
    try {
        const response = await axiosInstance.patch(`/playlists/add/${videoId}/${playlistId}`);
        return response.data;
    } catch (error) {
        console.log(error?.response?.data?.message || "Something went wrong");
        throw error;
    }
}

export async function removeVideoFromPlaylist(playlistId, videoId){
    try {
        const response = await axiosInstance.patch(`/playlists/remove/${videoId}/${playlistId}`);
        return response.data;
    } catch (error) {
        console.log(error?.response?.data?.message || "Something went wrong")
        throw error;
    }
}


