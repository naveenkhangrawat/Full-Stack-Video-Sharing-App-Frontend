import React from 'react';
import videoDurationFormat from '../utils/videoDurationFormat';
import { abbreviateNumber } from 'js-abbreviation-number';
import { Link, useNavigate } from 'react-router-dom';
import moment from 'moment';

function VideoCard({
    thumbnail,
    duration,
    title,
    views,
    avatar,
    channelName,
    username,
    createdAt,
    videoId
}) {

    const navigate = useNavigate();

    return (
        <>
            <div className='cursor-pointer' onClick={() => {navigate(`/watch/${videoId}`)}}>
                <div className="flex flex-col mb-5">
                    <div className="relative h-48 sm:h-60 md:rounded-xl overflow-hidden">
                        <img 
                            className="h-full w-full object-cover" 
                            src={thumbnail} 
                        />
                        <div className='absolute bottom-2 right-2 bg-black py-1 px-2 text-white text-xs rounded-md'>
                            {videoDurationFormat(duration)}
                        </div>
                    </div>

                    <div className="flex text-white mt-3">
                        <div className="flex items-start">
                            <div 
                                className="flex h-9 w-9 rounded-full overflow-hidden"
                                onClick={(event) => {
                                    event.stopPropagation();
                                    navigate(`/channel/${username}`);
                                }}
                            >
                                <img 
                                    src={avatar} 
                                    className="h-full w-full object-cover"
                                />
                            </div>
                        </div>

                        <div className="flex flex-col ml-3 overflow-hidden">
                            <span className="text-base font-semibold line-clamp-2">{title}</span>
                            <span className="text-[16px] font-normal mt-1 text-white/[0.7] flex items-center">
                                {channelName}
                            </span>
                            <div className="flex text-[14px] font-normal text-white/[0.7] overflow-hidden whitespace-nowrap text-ellipsis">
                                <span>{`${abbreviateNumber(views)} views`}</span>
                                <span className="flex text-[24px] leading-none font-bold text-white/[0.7] mx-1 relative top-[-10px]">
                                    .
                                </span>
                                <span className="overflow-hidden whitespace-nowrap text-ellipsis">
                                    {moment(createdAt).fromNow()}
                                </span>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}

export default VideoCard;
