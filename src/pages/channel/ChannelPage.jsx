import React, { useEffect, useState } from 'react'
import ChannelHeader from '../../components/channel/ChannelHeader';
import ChannelNavigatebar from '../../components/channel/ChannelNavigatebar';
import { Outlet, useParams } from "react-router-dom";
import { getUserChannelProfile } from '../../utils/fetchData/user';
import { useDispatch, useSelector } from 'react-redux';
import { emptyChannelInfo, setChannelInfo } from '../../reduxTK/channelSlice';
import { isLoadingFalse, isLoadingTrue } from '../../reduxTK/configSlice';

function ChannelPage() {

    const {username} = useParams();

    const dispatch = useDispatch();

    const channelInfo = useSelector((state) => state.channel?.channelInfo);

    // async function getUserChannel(){
    //     dispatch(isLoadingTrue());
    //     try {
    //         const userChannelResponse = await getUserChannelProfile(username);
    //         if(userChannelResponse?.success){
    //             dispatch(setChannelInfo(userChannelResponse?.data?.channelData));
    //         }
    //     } catch (error) {
    //         console.log(error);
    //     }
    //     dispatch(isLoadingFalse());
    // }


    // useEffect(() => {
    //     getUserChannel();
    // },[username]);

    return (
        <>
        {(channelInfo && channelInfo?.username === username) && (
            <>
                <ChannelHeader />
                <ChannelNavigatebar username={username}/>
                <div className="min-h-[32rem] sm:min-h-[450px] mb-20 sm:mb-0">
                    <Outlet />
                </div>
            </>
        )}
        </>
    )
}

export default ChannelPage;
