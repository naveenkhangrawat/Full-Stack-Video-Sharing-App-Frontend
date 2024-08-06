import React, { useEffect } from 'react'
import VideoDetail from '../components/VideoDetail'
import { useDispatch, useSelector } from 'react-redux';
import { isLoadingFalse, isLoadingTrue } from '../reduxTK/configSlice';
import { getVideoById } from '../utils/fetchData/video';
import { useParams } from 'react-router-dom';
import { emptyVideo, setVideo } from '../reduxTK/videoSlice';
import { getVideoComments } from '../utils/fetchData/comment';
import { emptyCommentsList, getCommentsList } from '../reduxTK/commentSlice';
import Loader from '../components/Loader';


function VideoDetailPage() {

    const {videoId} = useParams();
    const dispatch = useDispatch();
    const video = useSelector((state) => state.video?.video);

    const isLoading = useSelector((state) => state.config?.isLoading);


    async function fetchVideo(){
        dispatch(isLoadingTrue());

        try {
            if(videoId){
                const getVideoByIdResponse = await getVideoById(videoId);
                if(getVideoByIdResponse?.success){
                    dispatch(setVideo(getVideoByIdResponse?.data?.videoDetails));
                }
            }
        } catch (error) {
            console.log(error);
        }

        dispatch(isLoadingFalse());
    }

    async function fetchAllVideoComments(){
        dispatch(isLoadingTrue());

        try {
            if(videoId){
                const response = await getVideoComments({videoId});
                if(response?.success){
                    dispatch(getCommentsList(response?.data?.videoComments));
                }
            }
        } catch (error) {
            console.log(error);
        }

        dispatch(isLoadingFalse());
    }

    useEffect(() => {
        fetchVideo();
        fetchAllVideoComments();

        return () => {
            dispatch(emptyVideo());
            dispatch(emptyCommentsList());
        }
    },[videoId])

    return (
        <>
        {isLoading && <Loader />}
        {video?._id === videoId && (
            <VideoDetail />
        )}
        </>
    )
}

export default VideoDetailPage;