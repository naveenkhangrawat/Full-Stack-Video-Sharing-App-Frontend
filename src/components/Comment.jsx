import React, { useState } from 'react'
import { MdOutlineModeEdit } from "react-icons/md";
import { ImBin } from "react-icons/im";
import moment from 'moment';
import Like from "./Like";
import DeleteConfirmPopup from './DeleteConfirmPopup';
import Edit from './Edit';
import { deleteComment, updateComment } from '../utils/fetchData/comment';
import { useDispatch } from 'react-redux';
import { removeCommentFromList, updateCommentToList } from '../reduxTK/commentSlice';
import { isLoadingFalse, isLoadingTrue } from '../reduxTK/configSlice';

function Comment({
    content,
    likesCount,
    isLiked,
    owner,
    ownerAvatar="https://xsgames.co/randomusers/assets/avatars/pixel/3.jpg",
    commentId,
    createdAt
}) {

    const [isEdit, setIsEdit] = useState(false);
    const [isDelete, setIsDelete] = useState(false);

    const [editedContent, setEditedContent] = useState(content);

    const dispatch = useDispatch();


    async function deleteCommentHandler(){
        dispatch(isLoadingTrue());
        try {
            const deleteCommentResponse = await deleteComment(commentId);
            if(deleteCommentResponse?.success){
                setIsDelete(false);
                dispatch(removeCommentFromList({commentId}));
            }
        } catch (error) {
            console.log(error);
        }
        dispatch(isLoadingFalse());
    }

    async function editCommentHandler(newContent){
        dispatch(isLoadingTrue());
        try {
            const updateCommentResponse = await updateComment({commentId, content: newContent});
            if(updateCommentResponse?.success){
                setIsEdit(false);
                setEditedContent(newContent);
                dispatch(updateCommentToList({_id: commentId, content: newContent}));
            }
        } catch (error) {
            console.log(error);
        }
        dispatch(isLoadingFalse());
    }

    return (
        <>
            <div className="text-white w-full flex justify-start items-start gap-2 border-b border-slate-600 py-3 sm:py-5">
                <div className="min-w-12 flex items-center justify-center">
                    <img
                        src={ownerAvatar}
                        className="w-10 h-10 object-cover rounded-full"
                    />
                </div>

                <div className="w-full flex flex-col gap-1">
                    <div className="flex items-center gap-2 p-1">
                        <h2 className="text-sm">@{owner}</h2>
                        <span className="text-xs text-slate-400">
                            {moment(createdAt).fromNow()}
                        </span>
                    </div>

                    {isEdit ? (
                        <Edit 
                            initialContent={editedContent}
                            onCancel={() => {
                                setIsEdit(false)
                            }}
                            onSave={editCommentHandler}
                        />
                    ): (
                        <div className='text-wrap text-[16px] p-1'>
                            {editedContent}
                        </div>
                    )}

                    <div className='mt-2'>
                        <Like 
                            size={25} 
                            likesCount={likesCount} 
                            isLiked={isLiked} 
                            commentId={commentId}
                            className='text-xs' 
                        />
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
                        comment={true}
                        onCancel={() => {
                            setIsDelete(false)
                        }}
                        onDelete={deleteCommentHandler}
                    />
                )}
            </div>
        </>
    )
}

export default Comment