import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { useParams } from 'react-router-dom'
import { emptyVideoList, setVideoList } from '../reduxTK/videoSlice';
import { isLoadingFalse, isLoadingTrue } from '../reduxTK/configSlice';
import { getAllVideos } from '../utils/fetchData/video';
import { abbreviateNumber } from 'js-abbreviation-number';
import moment from 'moment';
import videoDurationFormat from '../utils/videoDurationFormat';
import { Link } from 'react-router-dom';


function SearchVideosPage() {

    const {query} = useParams();

    const dispatch = useDispatch();

    const videoList = useSelector((state) => state.video?.videoList);

    async function fetchSearchVideos(){
        dispatch(isLoadingTrue());

        try {
            const response = await getAllVideos({textQuery: query});
            if(response?.success){
                dispatch(setVideoList(response?.data?.searchVideos));
            }
        } catch (error) {
            console.log(error);
        }

        dispatch(isLoadingFalse());
    }

    useEffect(() => {
        fetchSearchVideos();

        return () => {
            dispatch(emptyVideoList());
        }
    },[query])

    return (
        <>
        {videoList && (
            <div className='grow w-full h-full sm:px-2 bg-black'>

                {videoList?.length > 0 && (
                    <div className='grid grid-cols-1 gap-2 py-5 px-6 md:px-5'>
                        {videoList?.map((video) => (
                            <React.Fragment key={video?._id}>
                                <Link to={`/watch/${video?._id}`}>
                                    <div className="flex flex-col w-full md:flex-row mb-8 md:mb-3 rounded-xl">

                                        <div className="relative flex shrink-0 h-48 md:h-[190px] lg:h-[220px] xl:h-[270px] w-full md:w-[320px] lg:w-[370px] xl:w-[460px] rounded-xl bg-slate-800 overflow-hidden">
                                            <img 
                                                className="h-full w-full object-cover" 
                                                src={video?.thumbnail?.url} 
                                            />
                                            <div className='absolute bottom-2 right-2 bg-black py-1 px-2 text-white text-xs rounded-md'>
                                                {videoDurationFormat(video?.duration)}
                                            </div>
                                        </div>

                                        <div className="text-white flex-col ml-4 md:ml-6 mt-4 md:mt-0 overflow-hidden">
                                            <span className="text-lg lg:text-xl line-clamp-2">
                                                {video?.title}
                                            </span>
                                            <div className="flex text-sm text-white/[0.7] truncate overflow-hidden mt-1">
                                                <span>{`${abbreviateNumber(video?.views,2)} views`}</span>
                                                <span className="flex text-[24px] leading-none font-bold text-white/[0.7] mx-1 relative top-[-10px]">
                                                    .
                                                </span>
                                                <span className="overflow-hidden whitespace-nowrap text-ellipsis">
                                                    {moment(video?.createdAt).fromNow()}
                                                </span>
                                            </div>
                                            <div className="hidden md:flex items-center mt-2">
                                                <div className="flex items-start mr-3">
                                                    <div className="flex h-9 w-9 rounded-full overflow-hidden">
                                                        <img 
                                                            src={video?.owner?.avatar}
                                                            className="h-full w-full object-cover"  
                                                        />
                                                    </div>
                                                </div>
                                                <div className="flex items-center justify-center">
                                                    <span className="text-sm text-white/[0.7]">
                                                        {video?.owner?.fullName}
                                                    </span>
                                                </div>
                                            </div>
                                            <span className="empty:hidden text-sm line-clamp-1 md:line-clamp-2 text-white/[0.7] md:pr-24 md:my-4">
                                                {video?.description}
                                            </span>
                                        </div>
                                    </div>
                                </Link>        
                            </React.Fragment>
                        ))}
                    </div>
                )}
            </div>
        )}
        </>
    )
}

export default SearchVideosPage