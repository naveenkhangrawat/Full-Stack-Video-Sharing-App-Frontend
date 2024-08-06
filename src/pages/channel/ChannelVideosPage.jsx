import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { isLoadingFalse, isLoadingTrue } from '../../reduxTK/configSlice';
import { getAllVideos } from '../../utils/fetchData/video';
import { emptyVideoList, setVideoList } from '../../reduxTK/videoSlice';
import { useNavigate } from 'react-router-dom';
import VideoCardChannel from '../../components/VideoCardChannel';
import { TfiClose } from 'react-icons/tfi';
import { useForm } from 'react-hook-form';
import PlaylistCheckbox from '../../components/PlaylistCheckbox';
import { emptyPlaylists } from '../../reduxTK/playlistSlice';


function ChannelVideosPage() {

    const channelInfo = useSelector((state) => state.channel?.channelInfo);
    const videoList = useSelector((state) => state.video?.videoList);
    const playlists = useSelector((state) => state.playlist?.playlists);

    const dispatch = useDispatch();

    const [popUp, setPopUp] = useState({threeDots: false, addVideoToPlaylist: false});
    const [videoAddingToPlaylistId, setVideoAddingToPlaylistId] = useState(null);


    async function fetchChannelVideos(){
        dispatch(isLoadingTrue());

        try {
            const response = await getAllVideos({userId: channelInfo?._id});
            console.log(response);
            if(response?.success){
                dispatch(setVideoList(response?.data?.channelVideos));
            }
        } catch (error) {
            console.log(error);
        }

        dispatch(isLoadingFalse());
    }



    useEffect(() => {
        fetchChannelVideos();

        return () => {
            dispatch(emptyVideoList());
        }
    },[])

    return (
        <>
        <div className='w-full flex flex-col py-5 px-6'>

            {videoList?.length === 0 && (
                <div className="text-center h-[5rem] flex flex-col justify-center items-center text-white mt-5">
                    <h1 className='text-3xl'>No Videos Uploaded</h1>
                    <p className='mt-3'>This page has yet to upload a video. Search another page in order to find more videos</p>
                </div>
            )}

            {videoList?.length > 0 && (
                <div className="grid lg:grid-cols-3 sm:grid-cols-2 text-white gap-5">
                    {videoList?.map((video) => (
                        <React.Fragment key={video?._id}>
                            <VideoCardChannel 
                                video={video} 
                                popUp={popUp}
                                setPopUp={setPopUp}
                                videoAddingToPlaylistId={videoAddingToPlaylistId}
                                setVideoAddingToPlaylistId={setVideoAddingToPlaylistId}
                            />
                        </React.Fragment>
                    ))}
                </div>
            )}

            {(popUp.addVideoToPlaylist && playlists) && (
                <div className='fixed top-0 left-0 w-screen h-screen flex justify-center items-center bg-black bg-opacity-70 z-50'>
                    <div className='text-white bg-[#202020] flex flex-col gap-3 px-5 py-2 rounded-lg'>
                        <div className='flex justify-between items-center p-2'>
                            <div className='text-lg'>Save video to...</div>
                            <TfiClose
                                className='cursor-pointer'
                                size={20}
                                onClick={() => {
                                    setPopUp((prevState) => (
                                        {...prevState, addVideoToPlaylist: false}
                                    ))
                                    setVideoAddingToPlaylistId(null);
                                    dispatch(emptyPlaylists());
                                }}
                            />
                        </div>

                        <div className='w-[250px] p-2 flex flex-col gap-3'>
                            {playlists && (
                                <>
                                {playlists?.length === 0 && (
                                    <div>No playlist</div>
                                )}

                                {playlists?.length > 0 && (
                                    <>
                                    {playlists?.map((playlist) => (
                                        <React.Fragment key={playlist?._id}>
                                            <PlaylistCheckbox
                                                playlist={playlist}
                                                playlistId={playlist?._id}
                                                playlistName={playlist?.name}
                                                videoAddingToPlaylistId={videoAddingToPlaylistId}
                                            />
                                        </React.Fragment>
                                    ))}
                                    </>
                                )}
                                </>
                            )}
                        </div>
                    </div>
                </div>
            )}
        </div>
        </>
    )
}

export default ChannelVideosPage;