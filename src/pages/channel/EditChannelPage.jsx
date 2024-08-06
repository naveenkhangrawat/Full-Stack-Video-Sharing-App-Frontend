import React, { useEffect, useState } from 'react'
import ChannelHeader from '../../components/channel/ChannelHeader';
import ChannelNavigatebar from '../../components/channel/ChannelNavigatebar';
import { Outlet, useParams } from "react-router-dom";
import { getUserChannelProfile } from '../../utils/fetchData/user';
import { useDispatch, useSelector } from 'react-redux';
import Loader from '../../components/Loader';
import { isLoadingFalse } from '../../reduxTK/configSlice';
import { setChannelInfo } from '../../reduxTK/channelSlice';

function EditChannelPage() {

    const userData = useSelector((state) => state.user?.userData);
    const isLoading = useSelector((state) => state.config?.isLoading);

    const dispatch = useDispatch();

    async function getUserChannel(){
        try {
            const userChannelResponse = await getUserChannelProfile(userData?.username);
            if(userChannelResponse?.success){
                dispatch(setChannelInfo(userChannelResponse?.data?.channelData));
                dispatch(isLoadingFalse());
            }
        } catch (error) {
            console.log(error);
        }
    }


    useEffect(() => {
        getUserChannel();
    },[]);

    return (
        <>
            {isLoading && <Loader />}
            <ChannelHeader edit={true} />
            <ChannelNavigatebar username={userData?.username} edit={true} />
            <div className="min-h-[32rem] sm:min-h-[450px] mb-20 sm:mb-0 flex items-center justify-center">
                <Outlet />
            </div>
        </>
    )
}

export default EditChannelPage;