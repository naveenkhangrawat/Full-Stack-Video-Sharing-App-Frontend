import React, { useEffect } from 'react'
import moment from 'moment'
import videoDurationFormat from '../utils/videoDurationFormat'
import { HiOutlineDotsVertical } from 'react-icons/hi';
import { abbreviateNumber } from 'js-abbreviation-number';
import { useNavigate } from 'react-router-dom';
import { useState } from 'react';
import { RiPlayListAddLine } from 'react-icons/ri';
import { getUserPlaylists } from '../utils/fetchData/playlist';
import { useDispatch } from 'react-redux';
import { getPlaylists } from '../reduxTK/playlistSlice';
import { useSelector } from 'react-redux';


function VideoCardChannel({video, popUp, setPopUp, videoAddingToPlaylistId, setVideoAddingToPlaylistId}) {

    const channelInfo = useSelector((state) => state.channel?.channelInfo);

    const navigate = useNavigate();
    const dispatch = useDispatch();

    function verticalDotsHandler(event){
        event.stopPropagation();
        if(!(popUp?.threeDots)){
            setVideoAddingToPlaylistId(video?._id)
            setPopUp((prevState) => (
                {...prevState, threeDots: true}
            ))
        } else if(popUp?.threeDots && (videoAddingToPlaylistId !== video?._id)){
            setVideoAddingToPlaylistId(video?._id)
        } else if(popUp?.threeDots) {
            setPopUp((prevState) => (
                {...prevState, threeDots: false}
            ))
            setVideoAddingToPlaylistId(null);
        }
    }

    async function saveToPlaylistHandler(event){
        event.stopPropagation()
        setPopUp(() => (
            {threeDots: false, addVideoToPlaylist: true}
        ))

        try {
            if(channelInfo?._id){
                const getUserPlaylistsResponse = await getUserPlaylists(channelInfo?._id);
                if(getUserPlaylistsResponse?.success){
                    dispatch(getPlaylists(getUserPlaylistsResponse?.data?.allPlaylistsInfo));
                }
            }

        } catch (error) {
            console.log(error);
        }
    } 


    // useEffect(() => {
    //     document.body.addEventListener("click", function(){
    //         setPopUp((prevState) => (
    //             {...prevState, threeDots: false}
    //         ))
    //     })

    // })

    return (
        <>
        <div 
            className='cursor-pointer' 
            onClick={() => {
                navigate(`/watch/${video?._id}`)
            }}
        >
            <div className="flex flex-col mb-8">
                <div className="relative h-48 sm:h-60 overflow-hidden">
                    <img 
                        className="h-full w-full object-cover" 
                        src={video?.thumbnail?.url} 
                    />
                        <div className='absolute bottom-2 right-2 bg-black py-1 px-2 text-white text-xs rounded-md'>
                            {videoDurationFormat(video?.duration)}
                        </div>
                </div>

                <div className="flex text-white mt-3">
                    <div className="flex flex-col w-full">
                        <div className='relative w-full flex justify-between gap-3'>
                            <div className="text-lg font-semibold line-clamp-2">
                                {video?.title}
                            </div>
                            <div>
                                <HiOutlineDotsVertical  
                                    size={30}
                                    className='hover:bg-white/30 p-1 rounded-full'
                                    onClick={verticalDotsHandler}
                                />
                            </div>
                            {(popUp.threeDots && (videoAddingToPlaylistId === video?._id)) && (
                                <div 
                                    className='absolute right-[0px] bottom-[-15px] z-[30] flex items-center gap-3 bg-[#282828] w-[200px] px-2 py-2 rounded-md hover:bg-[#535353]'
                                    onClick={saveToPlaylistHandler}
                                >
                                    <RiPlayListAddLine size={20} />
                                    <div>Save to playlist</div>
                                </div>
                            )}
                        </div>
                        <div className="flex text-[14px] font-normal text-white/[0.7] overflow-hidden whitespace-nowrap text-ellipsis">
                            <span>{`${abbreviateNumber(video?.views)} views`}</span>
                            <span className="flex text-[24px] leading-none font-bold text-white/[0.7] mx-1 relative top-[-10px]">
                                .
                            </span>
                            <span className="overflow-hidden whitespace-nowrap text-ellipsis">
                                {moment(video?.createdAt).fromNow()}
                            </span>
                        </div>
                    </div>
                </div>
            </div>
        </div>
        </>
    )
}

export default VideoCardChannel