import React, { useEffect, useState } from 'react'
import moment from 'moment';
import { useDispatch, useSelector } from 'react-redux';
import { abbreviateNumber } from 'js-abbreviation-number';
import { Link, useLocation, useNavigate, useParams } from 'react-router-dom';
import videoDurationFormat from '../utils/videoDurationFormat';
import { FaPlus } from 'react-icons/fa';
import { TfiClose } from 'react-icons/tfi';
import { FiEdit } from 'react-icons/fi';
import { emptyPlaylistInfo, setPlaylistInfo } from '../reduxTK/playlistSlice';
import { isLoadingFalse, isLoadingTrue } from '../reduxTK/configSlice';
import { getPlaylistById, removeVideoFromPlaylist } from '../utils/fetchData/playlist';
import toast from 'react-hot-toast';
import { useForm } from 'react-hook-form';
import EditPlaylistInfo from '../components/EditPlaylistInfo';

function PlaylistVideosPage() {

    const playlistInfo = useSelector((state) => state?.playlist?.playlistInfo);
    const channelInfo = useSelector((state) => state.channel?.channelInfo);
    const {search} = useLocation();
    const playlistId = search?.replace("?id=", "");

    const navigate = useNavigate();
    const dispatch = useDispatch();

    const [updatePlaylistPopUp, setUpdatePlaylistPopUp] = useState(false);


    async function removeVideoFromPlaylistHandler(event, videoId){
        event.stopPropagation();
        try {
            const response = await removeVideoFromPlaylist(playlistId, videoId);
            toast.success(`Removed from ${playlistInfo?.name}`);
            if(response?.success){
                getPlaylistById(playlistId)
                .then((response) => {
                    dispatch(setPlaylistInfo(response?.data?.playlistInfo));
                })
                .catch((error) => {console.log(error)})
            }
        } catch (error) {
            toast.error(`Couldn't remove from ${playlistInfo?.name}`);
            console.log(error)
        }
    }


    async function fetchPlaylistInfo(){
        dispatch(isLoadingTrue());

        try {
            const response = await getPlaylistById(playlistId);
            if(response?.success){
                dispatch(setPlaylistInfo(response?.data?.playlistInfo));
            }
        } catch (error) {
            console.log(error);
        }

        dispatch(isLoadingFalse());
    }

    useEffect(() => {
        fetchPlaylistInfo();

        return () => {
            dispatch(emptyPlaylistInfo());
        }
    },[])

    return (
        <>
        <div className='grow w-full h-full sm:px-2 bg-black'>
            <div className='flex flex-col xl:flex-row gap-5 py-5 px-6 md:px-5'>

                {playlistInfo && (
                    <>
                    <div className='flex flex-col w-full sm:w-[450px] shrink-0'>
                        <div className='relative h-[14rem] w-full text-white border border-slate-500'>
                            <img 
                                src={playlistInfo?.videos?.[0]?.thumbnail?.url || `https://images.unsplash.com/photo-1611162616475-46b635cb6868?q=80&w=1974&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D`} 
                                className='w-full h-full object-cover' 
                            />
                            <div className="absolute flex justify-between bottom-0 left-0 border-t py-2 px-4 w-full backdrop-blur-sm bg-[#ffffff] bg-opacity-20">
                                <div className="flex flex-col">
                                    <h1 className="text-lg">Playlist</h1>
                                    <div className="flex items-center text-xs text-slate-300">
                                        {playlistInfo?.totalViews} views
                                        <span className="flex text-[20px] leading-none font-bold text-white/[0.7] mx-1 relative top-[-5px]">
                                                    .
                                        </span>
                                        {moment(playlistInfo?.updatedAt).fromNow()}
                                    </div>
                                </div>
                                <p>{playlistInfo?.totalVideos} Videos</p>
                            </div>
                        </div>

                        <div className='text-white flex gap-5 mt-3'>
                            <div className='w-[85%] flex flex-col gap-1'>
                                <p className='text-[17px] font-semibold'>{playlistInfo?.name}</p>
                                <p className='text-[14px] text-slate-300'>{playlistInfo?.description}</p>
                            </div>
                            <div className='flex items-start'>
                                <FiEdit 
                                    size={45} 
                                    className='hover:bg-white/30 p-2 rounded-md cursor-pointer'
                                    onClick={() => {
                                        setUpdatePlaylistPopUp(true);
                                    }} 
                                />
                            </div>
                        </div>

                        <div className='text-white flex items-center mt-4 py-1'>
                            <div className='flex items-center gap-2'>
                                <div className='h-14 w-14 rounded-full overflow-hidden'>
                                    <img 
                                        src={channelInfo?.avatar} 
                                        alt="Channel Profile"
                                        className='w-full h-full object-cover'
                                    />
                                </div>
                                <div className='text-white flex flex-col'>
                                    <p className='text-[17px] font-semibold'>{channelInfo?.fullName}</p>
                                    <p className='text-[14px] text-slate-300'>{abbreviateNumber(channelInfo?.subscribersCount)} Subscribers</p>
                                </div>
                            </div> 
                        </div>
                    </div>
                    
                    <div className='w-full'>
                        {playlistInfo?.videos.length === 0 && (
                            <div className='text-white h-40 flex justify-center items-center'>
                                No videos in this playlist yet
                            </div>
                        ) }

                        {playlistInfo?.videos.length > 0 && (
                            <div className='w-full flex flex-col'>
                                {playlistInfo?.videos?.map((video) => (
                                    <div
                                        key={video?._id}
                                        className="flex flex-col sm:flex-row w-full mb-8 md:mb-3 cursor-pointer"
                                        onClick={() => {navigate(`/watch/${video?._id}`)}}
                                    >
                                        <div className="relative flex shrink-0 h-60 sm:h-48 xl:h-44 w-full sm:w-[40%] bg-slate-800 overflow-hidden">
                                            <img 
                                                className="h-full w-full object-cover" 
                                                src={video?.thumbnail?.url} 
                                            />
                                            <div className='absolute bottom-2 right-2 bg-black py-1 px-2 text-white text-xs rounded-md'>
                                                {videoDurationFormat(video?.duration)}
                                            </div>
                                        </div>

                                        <div className="text-white flex-col ml-4 mt-4 md:mt-0 overflow-hidden">
                                            <div className='flex gap-5'>
                                                <div className="text-lg lg:text-[18px] line-clamp-2">
                                                    {video?.title}
                                                </div>
                                                <div className='mr-5'>
                                                    <TfiClose 
                                                        className='hover:bg-white/30 p-2 rounded-full text-[40px]'
                                                        onClick={(event) => {
                                                            removeVideoFromPlaylistHandler(event, video?._id)
                                                        }} 
                                                    />
                                                </div>
                                            </div>
                                            <div className="flex text-sm text-white/[0.7] truncate overflow-hidden mt-3">
                                                <span>{`${abbreviateNumber(video?.views)} views`}</span>
                                                <span className="flex text-[24px] leading-none font-bold text-white/[0.7] mx-1 relative top-[-8px]">
                                                    .
                                                </span>
                                                <span className="overflow-hidden whitespace-nowrap text-ellipsis">
                                                    {moment(video?.createdAt).fromNow()}
                                                </span>
                                            </div>
                                            <div className="flex items-center mt-3">
                                                <div className="flex items-start mr-3">
                                                    <div className="flex h-9 w-9 rounded-full overflow-hidden">
                                                        <img 
                                                            src={video?.owner?.avatar}
                                                            className="h-full w-full object-cover"  
                                                        />
                                                    </div>
                                                </div>
                                                <div className="flex items-center justify-center">
                                                    <span className="text-sm text-white/[0.7]">
                                                        {video?.owner?.fullName}
                                                    </span>
                                                </div>
                                            </div>
                                            <span className="empty:hidden text-sm line-clamp-1 md:line-clamp-2 text-white/[0.7] md:pr-24 md:my-4">
                                                {}
                                            </span>
                                        </div>
                                    </div>        
                                ))}
                            </div>
                        )}
                    </div>

                    {updatePlaylistPopUp && (
                        <div className='fixed top-0 left-0 w-screen h-screen flex justify-center items-center bg-black bg-opacity-70 z-50'>
                            <EditPlaylistInfo 
                                setUpdatePlaylistPopUp={setUpdatePlaylistPopUp}
                                playlistInfo={playlistInfo}
                            />
                        </div>
                    )}
                    </>

                )}
            </div>
        </div>
        </>
    )
}

export default PlaylistVideosPage;