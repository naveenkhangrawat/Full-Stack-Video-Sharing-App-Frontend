import React from 'react'
import { useForm } from 'react-hook-form'
import Button from './Button'
import { useDispatch, useSelector } from 'react-redux';
import { isLoadingFalse, isLoadingTrue } from '../reduxTK/configSlice';
import { createTweet } from '../utils/fetchData/tweet';
import { addTweetToList } from '../reduxTK/tweetSlice';
import { addComment } from '../utils/fetchData/comment';
import { addCommentToList } from '../reduxTK/commentSlice';

function TweetCommentBox({tweet, comment, videoId}) {

    const {handleSubmit, register, setValue} = useForm();

    const dispatch = useDispatch();

    const userData = useSelector((state) => state?.user?.userData);

    async function onSubmitHandler(data){
        dispatch(isLoadingTrue());

        try {
            if(tweet){
                const createTweetResponse = await createTweet(data?.content);
                if(createTweetResponse?.success){
                    dispatch(addTweetToList({
                        ...createTweetResponse?.data,
                        owner: {
                            avatar: userData?.avatar,
                            fullName: userData?.fullName
                        },
                        isLiked: false,
                        totalLikes: 0
                    }));
                }
            }

            if(comment){
                const addCommentResponse = await addComment({videoId, content: data?.content});
                if(addCommentResponse?.success){
                    dispatch(addCommentToList({
                        ...addCommentResponse?.data,
                        owner: {
                            avatar: userData?.avatar,
                            username: userData?.username
                        },
                        isLiked: false,
                        totalLikes: 0
                    }));
                }
            }
        } catch (error) {
            console.log(error);
        }

        setValue("content", "");
        dispatch(isLoadingFalse());
    }

    return (
        <>
            <form
                onSubmit={handleSubmit(onSubmitHandler)}
                className="w-full flex flex-col gap-3"
            >
                <textarea
                    placeholder={`${tweet ? "Write a tweet" : "Add a comment"}`}
                    className='w-full px-2 py-1 text-white resize-none text-[16px] outline-none border bg-black overflow-y-auto'
                    {...register("content", { required: true })}
                    rows={4}
                />
                <div className='flex justify-end'>
                    <Button
                        type="submit"
                        
                    >
                        {tweet && "Tweet"}{comment && "Comment"}
                    </Button>
                </div>
            </form>
        </>
    )
}

export default TweetCommentBox
