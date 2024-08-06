import React from 'react'
import {HiOutlineVideoCamera} from "../../utils/icons/icons"
import { FiEye } from "react-icons/fi";
import { RxAvatar } from "react-icons/rx";
import { FaRegHeart } from "react-icons/fa6";
import { useSelector } from 'react-redux';

function StatsSection() {

    const channelStats = useSelector((state) => state.dashboard?.channelStats);

    return (
        <>
        <section className="grid sm:grid-cols-4 grid-cols-2 justify-evenly items-center gap-2">
            <div className="border border-slate-500 sm:p-3 p-2">
                <HiOutlineVideoCamera 
                    size={30}
                    className='text-purple-500 mb-3'
                />
                <p>Total Videos</p>
                <p className="font-bold text-3xl">
                    {channelStats?.totalVideos}
                </p>
            </div>
            <div  className="border border-slate-500 sm:p-3 p-2">
                <FiEye 
                    size={30}
                    className='text-purple-500 mb-3'
                />
                <p>Total Views</p>
                <p className="font-bold text-3xl">
                    {channelStats?.totalViews}
                </p>
            </div>
            <div className="border border-slate-500 sm:p-3 p-2">
                <RxAvatar 
                    size={30}
                    className='text-purple-500 mb-3'
                />
                <p>Total Subscribers</p>
                <p className="font-bold text-3xl">
                    {channelStats?.totalSubscribers}
                </p>
            </div>
            <div className="border border-slate-500 sm:p-3 p-2">
                <FaRegHeart 
                    size={30}
                    className='text-purple-500 mb-3'
                />
                <p>Total Likes</p>
                <p className="font-bold text-3xl">
                    {channelStats?.totalLikes}
                </p>
            </div>
        </section>
        </>
    )
}

export default StatsSection