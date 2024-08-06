import React from 'react'
import TogglePublish from '../TogglePublish'
import { MdOutlineModeEdit } from "react-icons/md";
import { ImBin } from "react-icons/im";
import { useSelector } from 'react-redux';
import moment from 'moment';

function VideoTable({setPopUp, setVideoDetails}) {

    const channelVideos = useSelector((state) => state.dashboard?.channelVideos);

    return (
        <>
        <section className="mx-auto w-full overflow-x-hidden">
            <div className="xl:w-full w-[1400px] border border-slate-500">
                <div className='flex items-center justify-between font-semibold text-lg py-4 px-5 border-b border-slate-500'>
                    <div className='w-[10%]'>Status</div>
                    <div className='w-[10%]'>Status</div>
                    <div className='w-[40%] text-center'>Uploaded</div>
                    <div className='w-[20%] text-center'>Rating</div>
                    <div className='w-[20%]'>Date Uploaded</div>
                </div>

                {channelVideos?.length === 0 && (
                    <div className='w-full text-white py-4 px-5 text-center'>
                        No Videos Available
                    </div>
                )}
                {channelVideos?.length > 0 && (
                    <>
                        {channelVideos?.map((video) => (
                            <React.Fragment key={video?._id}>
                                <div className='flex items-center justify-between px-5 py-4 border-b border-slate-500'>
                                    <div>
                                        <TogglePublish 
                                            isPublished={video?.isPublished}
                                            videoId={video?._id}
                                        />
                                    </div>
                                    <div className='w-[10%] text-center'>
                                        {video?.isPublished ? (
                                            <span className="text-green-500 py-1 px-2 border border-green-500 rounded-full">
                                                Published
                                            </span>
                                        ) : (
                                            <span className="text-orange-500 py-1 px-2 border border-orange-500 rounded-full">
                                                Unpublished
                                            </span>
                                        )}
                                    </div>
                                    <div className='w-[40%] text-lg text-center text-wrap'>
                                        {video?.title}
                                    </div>
                                    <div className='w-[10%] text-center'>
                                        <span className="border rounded-2xl outline-none px-2 py-1 bg-green-200 text-green-600">
                                            {video?.totalLikes || 0} likes
                                        </span>
                                    </div>
                                    <div className='w-[10%] text-center'>
                                        {moment(video?.createdAt).format("L")}
                                    </div>
                                    <div className='w-[8%] flex gap-4 px-1 py-1 justify-center'>
                                        <ImBin 
                                            size={20} 
                                            className='cursor-pointer hover:text-red-500'
                                            onClick={() => {
                                                setPopUp((prevState) => (
                                                    {...prevState, deleteVideo: true}
                                                ))
                                                setVideoDetails(video)
                                            }}
                                        />
                                        <MdOutlineModeEdit 
                                            size={20}
                                            className='cursor-pointer hover:text-blue-500'
                                            onClick={() => {
                                                setPopUp((prevState) => (
                                                    {...prevState, editVideo: true}
                                                ))
                                                setVideoDetails(video)
                                            }} 
                                        />
                                    </div>
                                </div>
                            </React.Fragment>
                        ))}
                    </>
                )}
            </div>
        </section>
        </>
    )
}

export default VideoTable;