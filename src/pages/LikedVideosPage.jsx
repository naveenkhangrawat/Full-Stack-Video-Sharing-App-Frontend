import React, { useEffect } from 'react'
import VideoCard from '../components/VideoCard';
import { getLikedVideos } from '../utils/fetchData/likes';
import { useDispatch, useSelector } from 'react-redux';
import { emptyLikedVideos, setLikedVideos } from '../reduxTK/likeSlice';
import { isLoadingFalse, isLoadingTrue } from '../reduxTK/configSlice';


function LikedVideosPage() {

    const dispatch = useDispatch();

    const likedVideos = useSelector((state) => state.like?.likedVideos);

    async function fetchAllLikedVideos(){
        dispatch(isLoadingTrue());
        try {
            const getLikedVideosResponse = await getLikedVideos();
            if(getLikedVideosResponse?.success){
                dispatch(setLikedVideos(getLikedVideosResponse?.data?.likedVideos));
            }
        } catch (error) {
            console.log(error);
        }
        dispatch(isLoadingFalse());
    }

    useEffect(() => {
        fetchAllLikedVideos();

        return () => {
            dispatch(emptyLikedVideos());
        }
    },[])


    return (
        <>
        <div className='grow w-full h-full sm:px-2 bg-black'>
            {likedVideos?.length === 0 && (
                <div className='w-full h-full text-white flex flex-col items-center justify-center'>
                    <h1 className='text-2xl'>No Liked Videos</h1>
                    <p>This channel has yet to liked a video</p>
                </div>
            )}
            {likedVideos?.length > 0 && (
                <div className='grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-4 py-5 px-6 md:px-5'>
                    {likedVideos?.map((video) => (
                        <React.Fragment key={video?._id}>
                            <VideoCard 
                                videoId={video?.video?._id}
                                thumbnail={video?.video?.thumbnail?.url}
                                avatar={video?.video?.owner?.avatar}
                                duration={video?.video?.duration}
                                title={video?.video?.title}
                                channelName={video?.video?.owner?.fullName}
                                createdAt={video?.video?.createdAt}
                                views={video?.video?.views}
                            />
                        </React.Fragment>
                    ))}
                </div>
            )}
        </div>
        </>
    )
}

export default LikedVideosPage;





































