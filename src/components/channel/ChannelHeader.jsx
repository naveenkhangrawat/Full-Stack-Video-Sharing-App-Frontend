import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom';
import Button from '../Button';
import EditAvatarAndCover from '../EditAvatarAndCover';
import { useDispatch, useSelector } from 'react-redux';
import { isLoadingTrue } from '../../reduxTK/configSlice';
import { toggleSubscription } from '../../utils/fetchData/subscription';
import { updateChannelInfo } from '../../reduxTK/channelSlice';

function ChannelHeader({ edit }) {

    const userData = useSelector((state) => state.user?.userData);
    const channelInfo = useSelector((state) => state.channel?.channelInfo);

    const dispatch = useDispatch();

    const [localIsSubscribed, setLocalIsSubscribed] = useState(channelInfo?.isSubscribed);
    const [localSubscribersCount, setLocalSubscribersCount] = useState(channelInfo?.subscribersCount);

    async function onSubscribeHandler(){
        setLocalIsSubscribed((prevState) => !prevState);
        if(localIsSubscribed){
            setLocalSubscribersCount((prevState) => prevState - 1);
        } else {
            setLocalSubscribersCount((prevState) => prevState + 1);
        }

        try {
            await toggleSubscription(channelInfo?._id);
        } catch (error) {
            console.log(error);
        }
    }

    useEffect(() => {
        updateChannelInfo({
            isSubscribed: localIsSubscribed,
            subscribersCount: localSubscribersCount
        })
    },[localIsSubscribed, localSubscribersCount])

    return (
        <>
            <div className="w-full text-white">

                {/* coverImage section */}
                <section className="w-full">
                    {channelInfo?.coverImage ? (
                        <div className="relative">
                            <img
                                src={channelInfo?.coverImage || ""}
                                className="sm:h-60 h-36 w-full object-cover"
                            />
                            {edit && (
                                <div className="absolute inset-0 flex justify-center items-center">
                                    <EditAvatarAndCover
                                        cover={true}
                                        prevImage={channelInfo?.coverImage}
                                    />
                                </div>
                            )}
                        </div>
                    ) : (
                        <div className="sm:h-40 h-28 w-full border-slate-600 border-b bg-black"></div>
                    )}
                </section>


                {/*channel details section  */}
                <section className=" w-full sm:px-5 p-2 flex sm:flex-row flex-col items-start sm:gap-4">
                    <div className=" h-12">
                        <div className="relative sm:w-32 w-28 sm:h-32 h-28">
                            <img
                                src={channelInfo?.avatar || ""}
                                className="rounded-full sm:w-32 w-28 sm:h-32 h-28 object-cover absolute sm:bottom-10 bottom-20 ring-1 ring-slate-400"
                            />
                            {edit && (
                                <div className="absolute inset-0 flex justify-center items-start">
                                    <EditAvatarAndCover prevImage={channelInfo?.avatar} />
                                </div>
                            )}
                        </div>
                    </div>
                    <div className="w-full md:h-24 sm:h-20 flex justify-between items-start px-1">
                        <div>
                            <h1 className="text-xl font-bold mb-[2px]">{channelInfo?.fullName}</h1>
                            <h3 className="text-base text-slate-400">
                                @{channelInfo?.username}
                            </h3>
                            <div className="flex gap-2">
                                <p className="text-sm text-slate-400">
                                    {channelInfo?.subscribersCount}{" "}
                                    Subscribers
                                </p>
                                <p className="text-sm text-slate-400">
                                    {channelInfo?.channelsSubscribedToCount}{" "}
                                    Subscribed
                                </p>
                            </div>
                        </div>
                        <div className='mt-2'>
                            {(!edit && userData?.username === channelInfo?.username) && (
                                <Link to={`/channel/edit`}>
                                    <Button type='button' onClick={() => dispatch(isLoadingTrue())}>
                                        Edit
                                    </Button>
                                </Link>
                            )}
                            {(!edit && userData?._id !== channelInfo?._id) && (
                                <>
                                {channelInfo?.isSubscribed ? (
                                    <Button
                                        type='button'
                                        onClick={onSubscribeHandler}
                                    >
                                        {channelInfo?.isSubscribed ? "Subscribed" : "Subscribe"}
                                    </Button>
                                ) : (
                                    <button
                                        type='button'
                                        onClick={onSubscribeHandler}
                                        className='text-white bg-gradient-to-r from-red-500  via-red-600 to-red-700 hover:bg-gradient-to-br focus:outline-none font-medium rounded-lg text-base px-5 py-2.5 text-center active:ring-2 active:ring-blue-300 duration-100'
                                    >
                                        Subscribe
                                    </button>
                                )}
                                </>
                            )}
                            {edit && (
                                <Link to={`/channel/${channelInfo?.username}`}>
                                    <Button type='button'>
                                        View Channel
                                    </Button>
                                </Link>
                            )}
                        </div>
                    </div>
                </section>
            </div>
        </>
    )
}

export default ChannelHeader;