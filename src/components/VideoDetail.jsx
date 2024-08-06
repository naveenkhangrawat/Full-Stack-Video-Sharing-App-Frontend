import React, { useState } from 'react'
import ReactPlayer from 'react-player'
import Header from './Header/Header'
import Sidebar from './Header/Sidebar'
import Description from './Description';
import TweetCommentBox from './TweetCommentBox';
import Comment from './Comment';
import { useSelector } from 'react-redux';


function VideoDetail() {

    const [isSideBarHovered, setIsSideBarHovered] = useState(false);

    const video = useSelector((state) => state.video?.video);
    const commentsList = useSelector((state) => state.comment?.commentsList);
    console.log(commentsList);

    return (
        <>
        <Header />  
        <div className='flex flex-row justify-center h-[calc(100%-56px)] bg-black relative'>
            <div 
                className="hidden sm:block w-16 h-[calc(100vh-80px)] bg-black" 
                onMouseOver={() => {setIsSideBarHovered(true)}}
                onMouseOut={() => {setIsSideBarHovered(false)}}
            >
                <Sidebar videoSideBar={true} />
                {isSideBarHovered && <Sidebar />}
            </div>

            <div className='w-full p-4 flex flex-col lg:flex-row'>
                <div className='flex flex-col px-4 py-3 lg:py-4 lg:w-[calc(100%-350px)] xl:w-[calc(100%-400px)] gap-3'>
                        <div className='h-[200px] md:h-[400px] lg:h-[400px] xl:h-[500px] ml-[-16px] lg:ml-0 mr-[-16px] lg:mr-0 border border-white/30'>
                            <ReactPlayer
                                url={video?.videoFile?.url}
                                controls
                                width='100%'
                                height='100%'
                                style={{backgroundColor: '#000000'}}
                            />
                        </div>

                        <Description />

                        <div className='w-full flex flex-col gap-4 py-1 mt-5'>
                            <div className='text-white font-semibold text-lg'>{commentsList?.length} Comments</div>

                            <div className='w-full'>
                                <TweetCommentBox comment={true} videoId={video?._id}/>
                            </div>

                            {commentsList && (
                                <div className='w-full'>
                                    {commentsList?.length === 0 && (
                                        <div className="text-center h-[5rem] flex flex-col justify-center items-center text-white mt-5">
                                            <h1 className='text-xl'>No Comments</h1>
                                        </div>
                                    )}
                                    {commentsList?.length > 0 && (
                                        <>
                                        {commentsList?.map((comment) => (
                                            <React.Fragment key={comment?._id}>
                                                <Comment
                                                    commentId={comment?._id}
                                                    content={comment?.content}
                                                    likesCount={comment?.totalLikes}
                                                    isLiked={comment?.isLiked}
                                                    owner={comment?.owner?.username}
                                                    ownerAvatar={comment?.owner?.avatar}
                                                    createdAt={comment?.createdAt}
                                                />
                                            </React.Fragment>
                                        ))}
                                        </>
                                    )}
                                </div>
                            )}

                        </div>
                </div>

                <div>
                    {/* suggested videos */}
                </div>
            </div>

        </div>
            
            
        </>
    )
}

export default VideoDetail;

