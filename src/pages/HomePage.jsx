import React, { useEffect } from 'react'
import VideoCard from '../components/VideoCard'
import { useDispatch, useSelector } from 'react-redux'
import { isLoadingFalse, isLoadingTrue } from '../reduxTK/configSlice';
import { getAllVideos } from '../utils/fetchData/video';
import { emptyVideoList, setVideoList } from '../reduxTK/videoSlice';

function HomePage() {

    const dispatch = useDispatch();

    const videoList = useSelector((state) => state.video?.videoList);

    async function fetchAllVideos(){
        dispatch(isLoadingTrue());

        try {
            const response = await getAllVideos({});
            if(response?.success){
                dispatch(setVideoList(response?.data?.allVideos));
            }
        } catch (error) {
            console.log(error);
        }

        dispatch(isLoadingFalse());
    }

    useEffect(() => {
        fetchAllVideos();

        return () => {
            dispatch(emptyVideoList());
        }
    },[])

    return (

        <>
        {videoList?.length > 0 && (
            <div className='grow w-full h-full sm:px-2 bg-black'>
                <div className='grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-4 py-5 px-6 md:px-5'>
                    {videoList?.map((video) => (
                        <React.Fragment key={video?._id}>
                            <VideoCard 
                                videoId={video?._id}
                                thumbnail={video?.thumbnail?.url}
                                avatar={video?.owner?.avatar}
                                duration={video?.duration}
                                title={video?.title}
                                channelName={video?.owner?.fullName}
                                username={video?.owner?.username}
                                createdAt={video?.createdAt}
                                views={video?.views}
                            />
                        </React.Fragment>
                    ))}
                </div>
            </div>
        )}
        </>
    )
}

export default HomePage;
