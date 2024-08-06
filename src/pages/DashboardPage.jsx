import React, { useEffect, useState } from 'react'
import Header from '../components/Header/Header'
import DashboardHeader from "../components/dashboard/DashboardHeader";
import StatsSection from "../components/dashboard/StatsSection";
import VideoTable from '../components/dashboard/VideoTable';
import UploadVideoModal from "../components/UploadVideoModal"
import DeleteConfirmPopup from "../components/DeleteConfirmPopup";
import EditVideo from '../components/EditVideo';
import { useDispatch, useSelector } from 'react-redux';
import { isLoadingFalse, isLoadingTrue } from '../reduxTK/configSlice';
import { getChannelStats, getChannelVideos } from '../utils/fetchData/dashboard';
import { emptyChannelStats, emptyChannelVideos, removeVideoFromChannelVideos, setChannelStats, setChannelVideos, updateChannelStats } from '../reduxTK/dashboardSlice';
import Loader from '../components/Loader';
import { deleteVideo } from '../utils/fetchData/video';

function DashboardPage() {

    const [videoDetails, setVideoDetails] = useState(null);

    const [popUp, setPopUp] = useState({
        uploadVideo: false,
        editVideo: false,
        deleteVideo: false
    })

    const dispatch = useDispatch();
    const isLoading = useSelector((state) => state.config?.isLoading);
    const channelStats = useSelector((state) => state.dashboard?.channelStats);
    const channelVideos = useSelector((state) => state.dashboard?.channelVideos);

    async function handleDeleteVideo(){
        dispatch(isLoadingTrue());

        try {
            const response = await deleteVideo(videoDetails?._id);
            if(response?.success){
                dispatch(removeVideoFromChannelVideos({videoId: videoDetails?._id}));
                dispatch(updateChannelStats({
                    totalVideos: channelStats?.totalVideos - 1,
                    totalLikes: channelStats?.totalLikes - (videoDetails?.totalLikes || 0),
                    totalViews: channelStats?.totalViews - videoDetails?.views
                }))
                setPopUp((prevState) => ({...prevState, deleteVideo: false}));
            }
        } catch (error) {
            console.log(error);
        }

        dispatch(isLoadingFalse());
    }

    async function fetchChannelVideos(){
        dispatch(isLoadingTrue());

        try {
            const response = await getChannelVideos();
            if(response?.success){
                dispatch(setChannelVideos(response?.data?.channelVideos));
            }
        } catch (error) {
            console.log(error);
        }

        dispatch(isLoadingFalse());
    }

    async function fetchChannelStats(){
        dispatch(isLoadingTrue());

        try {
            const response = await getChannelStats();
            if(response?.success){
                dispatch(setChannelStats(response?.data?.channelStats))
            }
        } catch (error) {
            console.log(error);
        }

        dispatch(isLoadingFalse());
    }

    useEffect(() => {
        fetchChannelVideos();
        fetchChannelStats();

        return () => {
            dispatch(emptyChannelVideos());
            dispatch(emptyChannelStats());
        }
    },[])


    return (
        <>
        {isLoading && (<Loader />)}
        <Header />
        {(channelStats && channelVideos) && (
            <div className="w-full sm:px-5">
                <div className=" w-full relative text-white space-y-7 z-10 py-4 px-1">
                    <DashboardHeader setPopUp={setPopUp} />
                    <StatsSection />
                    <VideoTable 
                        setPopUp={setPopUp}
                        setVideoDetails={setVideoDetails} 
                    />
                </div>
                {popUp.uploadVideo && (
                    <UploadVideoModal setPopUp={setPopUp}/>
                )}
                {popUp.deleteVideo && (
                        <DeleteConfirmPopup 
                            video={true}
                            onCancel={() => {setPopUp((prevState) => (
                                {...prevState, deleteVideo: false}
                            ))}}
                            onDelete={handleDeleteVideo}
                        />
                )}

                {popUp.editVideo && (
                    <EditVideo
                        videoId={videoDetails?._id}
                        setPopUp={setPopUp}
                        thumbnail={videoDetails?.thumbnail?.url} 
                        title={videoDetails?.title}
                        description={videoDetails?.description}
                    />
                )}
            </div>
        )}
        </>
    )
}

export default DashboardPage