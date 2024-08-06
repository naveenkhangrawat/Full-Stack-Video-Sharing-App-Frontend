import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { isLoadingFalse, isLoadingTrue } from '../../reduxTK/configSlice';
import { getUserChannelSubscribers } from '../../utils/fetchData/subscription';
import { getSubscribersList } from '../../reduxTK/subscriptionSlice';
import { Link } from 'react-router-dom';
import Button from '../../components/Button';

function ChannelSubscribersPage() {

    const channelInfo = useSelector((state) => state.channel?.channelInfo);
    const subscribersList = useSelector((state) => state.subscription?.subscribersList);
    const dispatch = useDispatch();

    async function fetchAllChannelSubscribers(){
        dispatch(isLoadingTrue());
        try {
            if(channelInfo?._id){
                const response = await getUserChannelSubscribers(channelInfo?._id);
                if(response?.success){
                    dispatch(getSubscribersList(response?.data?.subscribersDetails));
                }
            }
        } catch (error) {
            console.log(error);
        }
        dispatch(isLoadingFalse());
    }

    useEffect(() => {
        fetchAllChannelSubscribers();
    },[])

    return (
        <>
        <div className='w-full flex flex-col py-5 px-6'>
            {subscribersList?.length === 0 && (
                <div className="text-center h-[5rem] flex flex-col justify-center items-center text-white mt-16">
                    <h1 className='text-3xl'>No people subscribers</h1>
                    <p className='mt-3'>This channel has yet to have a new subscriber</p>
                </div>
            )}
            {subscribersList?.length > 0 && (
                <>
                    {subscribersList?.map((subscriber) => (
                        <Link
                            to={`/channel/${subscriber?.subscriber?.username}`}
                            key={subscriber?.subscriber?._id}
                            className="flex border-b border-slate-500 px-3 py-2 justify-between items-center  text-white"
                        >
                            <div className="flex gap-3 items-center">
                                <div className="min-w-12 flex items-center justify-center">
                                    <img
                                        src={subscriber?.subscriber?.avatar}
                                        className="w-12 h-12 object-cover rounded-full"
                                    />
                                </div>
                                <div>
                                    <h5>{subscriber?.subscriber?.username}</h5>
                                    <p className="text-xs text-slate-400">{subscriber?.subscriber?.totalSubscribersOfSubscriber} Subscribers</p>
                                </div>
                            </div>
        
                            <div>
                                {subscriber?.subscriber?.subscribedToSubscriber ? (
                                    <div className='text-white bg-gradient-to-r from-blue-500  via-blue-600 to-blue-700 hover:bg-gradient-to-br font-medium rounded-lg text-base px-5 py-2.5 text-center'>
                                        Subscribed
                                    </div>
                                ) : (
                                    <div className='text-white bg-gradient-to-r from-red-500  via-red-600 to-red-700 hover:bg-gradient-to-br font-medium rounded-lg text-base px-5 py-2.5 text-center'>
                                        Subscribe
                                    </div>
                                )}
                            </div>
                        </Link>
                    ))}
                </>
            )}
        </div>
        </>
    )
}

export default ChannelSubscribersPage;
