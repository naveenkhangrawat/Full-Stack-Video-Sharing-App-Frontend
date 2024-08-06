import React, { useEffect, useState } from 'react'
import { BiSolidLike, BiSolidDislike } from "../utils/icons/icons";
import { useDispatch, useSelector } from 'react-redux';
import { toggleCommentLike, toggleTweetLike, toggleVideoLike } from '../utils/fetchData/likes';
import { updateCommentToList } from '../reduxTK/commentSlice';
import { updateTweetToList } from '../reduxTK/tweetSlice';
import { setVideo, updateVideo } from '../reduxTK/videoSlice';

function Like({
    likesCount=0,
    isLiked=false,
    size,
    className="",
    tweetId, 
    commentId, 
    videoId
}) {
    
    const [localIsLiked, setLocalIsLiked] = useState(isLiked);
    const [localLikesCount, setLocalLikesCount] = useState(likesCount);

    console.log(localIsLiked);
    console.log(localLikesCount);


    const dispatch = useDispatch();
    const channelInfo = useSelector((state) => state.channel?.channelInfo);

    async function handleLikeToggle(){
        setLocalIsLiked((prevState) => !prevState)
        if(localIsLiked){
            setLocalLikesCount((prevState) => prevState - 1)
        } else {
            setLocalLikesCount((prevState) => prevState + 1)
        }

        if(commentId){
            try {
                await toggleCommentLike(commentId);
            } catch (error) {
                console.log(error);
            }
        }

        if(tweetId){
            try {
                await toggleTweetLike(tweetId);
            } catch (error) {
                console.log(error);
            }
        }

        if(videoId){
            try {
                await toggleVideoLike(videoId);
            } catch (error) {
                console.log(error)
            }
        }
    }

    useEffect(() => {
        if(commentId){
            dispatch(updateCommentToList({
                _id: commentId, 
                isLiked: localIsLiked, 
                totalLikes: localLikesCount
            }))
        }

        if(tweetId){
            dispatch(updateTweetToList({
                _id: tweetId,
                isLiked: localIsLiked,
                totalLikes: localLikesCount
            }));
        }

        if(videoId){
            dispatch(updateVideo({
                isLiked: localIsLiked,
                totalLikes: localLikesCount
            }));
        }
    },[localIsLiked, localLikesCount])


    return (
        <>
            <div className="flex items-center gap-1">
                
                <BiSolidLike
                    size={size}
                    onClick={handleLikeToggle}
                    className={`cursor-pointer ${
                        localIsLiked ? "text-purple-500" : ""
                    }`}
                />
                <span className={`ml-1 mr-3 ${className}`}>{localLikesCount}</span>
                
                <BiSolidDislike 
                    size={size}
                    className={`cursor-pointer`}
                />
            </div>
        </>
    )
}

export default Like