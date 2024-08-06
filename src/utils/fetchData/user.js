import axiosInstance from "../axiosInstance";
import toast from "react-hot-toast";


export async function registerUser({avatar, coverImage, email, username, password, fullName}){
    const formData = new FormData();
    formData.append("avatar", avatar[0]);
    formData.append("username", username);
    formData.append("password", password);
    formData.append("email", email);
    formData.append("fullName", fullName);
    if(coverImage){
        formData.append("coverImage", coverImage[0]);
    }

    try {
        const response = await axiosInstance.post("/users/register", formData);
        console.log(response);
        toast.success(response.data?.message);
        return response.data;
    } catch (error) {
        toast.error(error?.response?.data?.message || "Something went wrong")
        throw error;
    }
}

export async function loginUser({username, password}){
    try {
        const response = await axiosInstance.post("/users/login", {username, password});
        console.log(response);
        toast.success(response?.data?.message);
        return response.data;
    } catch (error) {
        toast.error(error?.response?.data?.message || "Something went wrong");
        throw error;
    }
}

export async function logoutUser(){
    try {
        const response = await axiosInstance.post("/users/logout");
        toast.success(response?.data?.message);
        return response.data;
    } catch (error) {
        toast.error(error?.response?.data?.message || "Something went wrong");
        throw error;
    }
}

export async function getCurrentUser(){
    try {
        const response = await axiosInstance.get("/users/current-user");
        return response.data;
    } catch (error) {
        throw error.response?.data;
    }
}

export async function getUserChannelProfile(username){
    try {
        const response = await axiosInstance.get(`/users/channel/${username}`);
        return response.data;
    } catch (error) {
        toast.error(error?.response?.data?.message || "Something went wrong");
        throw error;
    }
}

export async function getUserWatchHistory(){
    try {
        const response = await axiosInstance.get("/users/watch-history");
        return response.data;
    } catch (error) {
        toast.error(error?.response?.data?.message || "Something went wrong");
        throw error;
    }
}

export async function refreshingAccessToken(){
    try {
        const response = await axiosInstance.post("/users/refreshing-access-token");
        return response.data;
    } catch (error) {
        throw error;
    }
}

export async function changeCurrentPassword({oldPassword, newPassword}){
    try {
        const response = await axiosInstance.post("/users/change-password", {oldPassword, newPassword});
        toast.success(response?.data?.message);
        return response.data;
    } catch (error) {
        toast.error(error?.response?.data?.message || "Something went wrong");
        throw error;
    }
}

export async function updateAccountDetails({fullName, email}){
    try {
        const response = await axiosInstance.patch("/users/update-account", {fullName, email});
        toast.success(response?.data?.message);
        return response.data;
    } catch (error) {
        toast.error(error?.response?.data?.message || "Something went wrong");
        throw error;
    }
}

export async function updateUserAvatar({avatar}){
    const formData = new FormData();
    formData.append("avatar", avatar[0]);

    try {
        const response = await axiosInstance.patch("/users/update-avatar", formData);
        toast.success(response?.data?.message);
        return response.data;
    } catch (error) {
        toast.error(error?.response?.data?.message || "Something went wrong");
        throw error;
    }
}

export async function updateUserCoverImage({coverImage}){
    const formData = new FormData();
    formData.append("coverImage", coverImage[0]);
    try {
        const response = await axiosInstance.patch("/users/update-cover-image", formData);
        toast.success(response?.data?.message);
        return response.data;
    } catch (error) {
        toast.error(error?.response?.data?.message || "Something went wrong");
        throw error;
    }
}