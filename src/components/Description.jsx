import React, { useEffect, useState } from 'react'
import moment from 'moment';
import Button from './Button';
import Like from './Like';
import { Link } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { toggleSubscription } from '../utils/fetchData/subscription';
import { updateVideo } from '../reduxTK/videoSlice';

function Description() {

    const video = useSelector((state) => state.video?.video);

    const userData = useSelector((state) => state.user?.userData);

    
    const dispatch = useDispatch();
    
    const [localIsSubscribed, setLocalIsSubscribed] = useState(video?.owner?.isSubscribed);
    const [localSubscribersCount, setLocalSubscribersCount] = useState(video?.owner?.subscribersCount);


    async function handleSubscribe(){

        setLocalIsSubscribed((prevState) => !prevState);
        if(localIsSubscribed){
            setLocalSubscribersCount((prevState) => prevState - 1);
        } else {
            setLocalSubscribersCount((prevState) => prevState + 1);
        }

        try {
            await toggleSubscription(video?.owner?._id);
        } catch (error) {
            console.log(error);
        }
    }
    
    useEffect(() => {
        dispatch(updateVideo({
            owner: {
                ...video?.owner,
                isSubscribed: localIsSubscribed,
                subscribersCount: localSubscribersCount
            }
        }))
    },[localIsSubscribed, localSubscribersCount])

    return (
        <>
            <section className="w-full text-white space-y-2">
                <div className="border-b border-slate-700 py-2 px-1">
                    <div className="flex flex-col gap-2">
                        <div className='flex flex-col gap-0'>
                            <h1 className="sm:text-2xl text-xl font-semibold">{video?.title}</h1>
                            <div className="flex items-center justify-start">
                                    <span className="text-[14px] text-slate-400">
                                        {video?.views} views
                                    </span>
                                    <span className="flex text-[24px] leading-none font-bold text-white/[0.7] mx-1 relative top-[-5px]">
                                    .
                                    </span>
                                    <span className="text-[14px] text-slate-400">
                                        {moment(video?.createdAt).fromNow()}
                                    </span>
                            </div>
                        </div>
                        <div className="flex gap-2 py-1 justify-between items-center">
                            <div className='flex justify-center items-center gap-5'>
                                <Link
                                    to={`/channel/${video?.owner?.username}/videos`}
                                    className="flex gap-2"
                                >
                                    <img
                                        src={video?.owner?.avatar}
                                        className="w-10 h-10 rounded-full object-cover"
                                    />
                                    <div>
                                        <h1 className="sm:text-[18px] font-semibold">
                                            {video?.owner?.fullName}
                                        </h1>
                                        <p className="text-xs text-slate-400">
                                            {video?.owner?.subscribersCount} Subscribers
                                        </p>
                                    </div>
                                </Link>
                                {userData?._id === video?.owner?._id ? (
                                    <Link to={`/channel/${video?.owner?.username}`}>
                                        <Button type='button'>View Channel</Button>
                                    </Link>
                                ) : (
                                    <div>
                                        {video?.owner?.isSubscribed ? (
                                            <Button
                                                type='button'
                                                onClick={handleSubscribe}
                                            >
                                                Subscribed
                                            </Button>
                                        ) : (
                                            <button
                                                type='button'
                                                onClick={handleSubscribe}
                                                className='text-white bg-gradient-to-r from-red-500  via-red-600 to-red-700 hover:bg-gradient-to-br focus:outline-none font-medium rounded-lg text-base px-5 py-2.5 text-center active:ring-2 active:ring-blue-300 duration-100'
                                            >
                                                Subscribe
                                            </button>
                                        )}
                                    </div>
                                )}
                            </div>
                            <div className=" rounded-lg px-3 py-2 bg-[#333232]">
                                <Like
                                    isLiked={video?.isLiked}
                                    videoId={video?._id}
                                    likesCount={video?.totalLikes}
                                    size={25}
                                    className='text-[14px]'
                                />
                            </div>
                        </div>
                    </div>
                </div>
                <p className="text-[14px] bg-[#222222] rounded-lg p-2 outline-none">
                    {video?.description}
                </p>
            </section>
        </>
    );
}

export default Description;