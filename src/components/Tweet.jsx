import React from 'react'
import { useState } from 'react';
import { useDispatch } from 'react-redux';
import { isLoadingFalse, isLoadingTrue } from '../reduxTK/configSlice';
import { deleteTweet, updateTweet } from '../utils/fetchData/tweet';
import { removeTweetFromList, updateTweetToList } from '../reduxTK/tweetSlice';
import moment from 'moment';
import Like from './Like';
import { MdOutlineModeEdit } from "react-icons/md";
import { ImBin } from "react-icons/im";
import DeleteConfirmPopup from './DeleteConfirmPopup';
import Edit from './Edit';

function Tweet({
    content,
    likesCount,
    isLiked,
    owner,
    ownerAvatar,
    tweetId,
    createdAt
}) {

    const [isEdit, setIsEdit] = useState(false);
    const [isDelete, setIsDelete] = useState(false);

    const [editedContent, setEditedContent] = useState(content);

    const dispatch = useDispatch();

    async function deleteTweetHandler(){
        dispatch(isLoadingTrue());
        try {
            const deleteTweetResponse = await deleteTweet(tweetId);
            if(deleteTweetResponse?.success){
                setIsDelete(false);
                dispatch(removeTweetFromList({tweetId}));
            }
        } catch (error) {
            console.log(error);
        }
        dispatch(isLoadingFalse());
    }

    async function editTweetHandler(newContent){
        dispatch(isLoadingTrue());
        try {
            const updateTweetResponse = await updateTweet({tweetId, content: newContent});
            if(updateTweetResponse?.success){
                setIsEdit(false);
                setEditedContent(newContent);
                dispatch(updateTweetToList({_id: tweetId, content: newContent}));
            }
        } catch (error) {
            console.log(error);
        }
        dispatch(isLoadingFalse());
    }


    return (
        <>
            <div className="text-white w-full flex justify-start items-start sm:gap-3 gap-3 border-b border-slate-600 p-3 sm:p-5">
                <div className="min-w-12 flex items-center justify-center">
                    <img
                        src={ownerAvatar}
                        className="w-12 h-12 object-cover rounded-full"
                    />
                </div>

                <div className="w-full flex flex-col gap-1">
                    <div className="flex items-center gap-3 p-1">
                        <h2 className="text-base">{owner}</h2>
                        <span className="text-xs text-slate-400">
                            {moment(createdAt).fromNow()}
                        </span>
                    </div>

                    {isEdit ? (
                        <Edit 
                            initialContent={content}
                            onCancel={() => {
                                setIsEdit(false)
                            }}
                            onSave={editTweetHandler}
                        />
                    ): (
                        <div className='text-wrap text-[16px] p-1'>
                            {editedContent}
                        </div>
                    )}

                    <div className='mt-2'>
                        <Like size={25} likesCount={likesCount} isLiked={isLiked} tweetId={tweetId} />
                    </div>
                </div>

                <div className=''>
                    <div className='flex gap-1 items-center justify-center'>
                        <div 
                            className='hover:bg-white/[0.30] cursor-pointer p-2 rounded-lg sm:text-[25px] text-[20px]' 
                            onClick={() => {setIsEdit(true)}}
                        >
                            <MdOutlineModeEdit />
                        </div>
                        <div 
                            className='hover:bg-white/[0.30] cursor-pointer p-2 rounded-lg sm:text-[25px] text-[20px]'
                            onClick={() => {setIsDelete(true)}}
                        >
                            <ImBin color='red' />
                        </div>
                    </div>
                </div>

                {isDelete && (
                    <DeleteConfirmPopup
                        tweet={true}
                        onCancel={() => {
                            setIsDelete(false)
                        }}
                        onDelete={deleteTweetHandler}
                    />
                )}
            </div>
        </>
    )
}

export default Tweet