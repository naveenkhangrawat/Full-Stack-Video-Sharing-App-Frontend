import React, { useEffect } from 'react'
import Avatar from "../components/Avatar"
import { useDispatch, useSelector } from 'react-redux'
import { Link } from 'react-router-dom';
import { isLoadingFalse, isLoadingTrue } from '../reduxTK/configSlice';
import { getSubscribedChannels } from '../utils/fetchData/subscription';
import { getSubscribedToList } from '../reduxTK/subscriptionSlice';
import VideoCard from '../components/VideoCard';

function SubscriptionsPage() {

    const dispatch = useDispatch();
    const subscribedToList = useSelector((state) => state.subscription?.subscribedToList);
    const userData = useSelector((state) => state.user?.userData);


    async function fetchAllSubscribedChannels(){
        dispatch(isLoadingTrue());
        try {
            if(userData?._id){
                const response = await getSubscribedChannels(userData?._id);
                if(response?.success){
                    dispatch(getSubscribedToList(response?.data?.subscribedChannelsDetails));
                }
            }
        } catch (error) {
            console.log(error);
        }
        dispatch(isLoadingFalse());
    }

    useEffect(() => {
        fetchAllSubscribedChannels();
    },[])

    return (
        <>
        <div className='grow w-full h-full sm:px-2 bg-black'>
            {subscribedToList?.length === 0 && (
                <div className='w-full h-full text-white flex flex-col items-center justify-center'>
                    <h1 className='text-2xl'>No subscribed channels</h1>
                    <p>This channel has yet to subscribe a new channel</p>
                </div>
            )}
            {subscribedToList?.length > 0 && (
                <>
                    <div className="flex gap-7 p-2 text-white items-center bg-[#222222]">
                        {subscribedToList?.map((subscription) => (
                            <div 
                                key={subscription?.channel?._id} 
                                className='flex flex-col items-center'
                            >
                                <div className="min-w-12 flex items-center justify-center">
                                    <img
                                        src={subscription?.channel?.avatar}
                                        className="w-10 h-10 object-cover rounded-full"
                                    />
                                </div>
                                <h5 className='text-sm'>{subscription?.channel?.username}</h5>
                            </div>
                        ))}
                    </div>

                    <div className="text-white mb-20 sm:mb-0 w-full grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-4 py-5 px-10 md:px-5">
                        {subscribedToList?.map((subscription) => (
                            <div
                                key={subscription?.channel?._id}
                            >
                                {subscription?.channel?.latestVideo && (
                                    <VideoCard 
                                        videoId={subscription?.channel?.latestVideo?._id}
                                        thumbnail={subscription?.channel?.latestVideo?.thumbnail?.url}
                                        avatar={subscription?.channel?.avatar}
                                        duration={subscription?.channel?.latestVideo?.duration}
                                        title={subscription?.channel?.latestVideo?.title}
                                        channelName={subscription?.channel?.fullName}
                                        createdAt={subscription?.channel?.latestVideo?.createdAt}
                                        views={subscription?.channel?.latestVideo?.views}
                                    />
                                )}
                            </div>
                        ))}
                    </div>
                </>
            )}
        </div>
        </>
    )
}

export default SubscriptionsPage;