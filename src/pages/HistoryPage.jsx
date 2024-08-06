import React, { useEffect } from 'react'
import VideoCard from '../components/VideoCard';
import { useDispatch, useSelector } from 'react-redux';
import { emptyWatchHistory, setWatchHistory } from '../reduxTK/userSlice';
import { isLoadingFalse, isLoadingTrue } from '../reduxTK/configSlice';
import { getUserWatchHistory } from '../utils/fetchData/user';

function HistoryPage() {

    const dispatch = useDispatch();

    const watchHistory = useSelector((state) => state?.user?.watchHistory);

    async function fetchUserWatchHistory(){
        dispatch(isLoadingTrue());

        try {
            const response = await getUserWatchHistory();
            if(response?.success){
                dispatch(setWatchHistory(response?.data?.userWatchHistory));
            }
        } catch (error) {
            console.log(error);
        }

        dispatch(isLoadingFalse());
    }

    useEffect(() => {
        fetchUserWatchHistory();

        return () => {
            dispatch(emptyWatchHistory());
        }
    }, [])

    return (
        <>
        <div className='grow w-full h-full sm:px-2 bg-black'>
            {watchHistory?.length === 0 && (
                <div className='w-full h-full text-white flex flex-col items-center justify-center'>
                    <h1 className='text-2xl'>No Video Found</h1>
                    <p>This channel has not watched a video yet</p>
                </div>
            )}
            {watchHistory?.length > 0 && (
                <div className='grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-4 py-5 px-6 md:px-5'>
                    {watchHistory?.map((video) => (
                        <React.Fragment key={video?._id}>
                            <VideoCard 
                                videoId={video?._id}
                                thumbnail={video?.thumbnail?.url}
                                avatar={video?.owner?.avatar}
                                duration={video?.duration}
                                title={video?.title}
                                channelName={video?.owner?.fullName}
                                createdAt={video?.createdAt}
                                views={video?.views}
                            />
                        </React.Fragment>
                    ))}
                </div>
            )}
        </div>
        </>
    )
}

export default HistoryPage;