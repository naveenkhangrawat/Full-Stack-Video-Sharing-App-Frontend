import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import TweetCommentBox from '../../components/TweetCommentBox';
import { getUserTweets } from '../../utils/fetchData/tweet';
import { isLoadingFalse, isLoadingTrue } from '../../reduxTK/configSlice';
import { emptyTweetsList, getTweetsList } from '../../reduxTK/tweetSlice';
import Tweet from '../../components/Tweet';

function ChannelTweetsPage() {

    const userData = useSelector((state) => state.user?.userData);
    const channelInfo = useSelector((state) => state.channel?.channelInfo);
    const tweetsList = useSelector((state) => state.tweet?.tweetsList);

    const dispatch = useDispatch();

    async function fetchAllUserTweets(){
        dispatch(isLoadingTrue());
        try {
            if(channelInfo?._id){
                const getUserTweetsResponse = await getUserTweets(channelInfo?._id);
                if(getUserTweetsResponse?.success){
                    dispatch(getTweetsList(getUserTweetsResponse?.data?.tweets));
                }
            }
        } catch (error) {
            console.log(error);
        }
        dispatch(isLoadingFalse());
    }


    useEffect(() => {
        fetchAllUserTweets();

        return () => {
            dispatch(emptyTweetsList());
        }
    }, [])

    return (
        <>
        {tweetsList && (
            <div className='w-full flex flex-col py-5 px-6'>
                {userData?._id === channelInfo?._id && (
                    <div className='w-full border-b border-slate-500 mt-3 mb-10 py-5'>
                        <TweetCommentBox tweet={true}/>
                    </div>

                )}
                    
                {tweetsList?.length === 0 && (
                    <div className="text-center h-[5rem] flex flex-col justify-center items-center text-white mt-5">
                        <h1 className='text-3xl'>No Tweets</h1>
                        <p className='mt-3'>This channel has yet to make a Tweet</p>
                    </div>
                )}

                {tweetsList?.length > 0 && (
                    <div className='w-full border border-slate-500'>
                        {tweetsList?.map((tweet) => (
                            <Tweet 
                                key={tweet?._id}
                                tweetId={tweet?._id}
                                content={tweet?.content}
                                owner={tweet?.owner?.fullName}
                                ownerAvatar={tweet?.owner?.avatar}
                                createdAt={tweet?.createdAt}
                                isLiked={tweet?.isLiked}
                                likesCount={tweet?.totalLikes}
                            />
                        ))}
                    </div>
                )}
            </div>
        )}
        </>
    )
}

export default ChannelTweetsPage;