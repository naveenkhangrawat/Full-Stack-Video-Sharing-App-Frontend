import React, { useState } from 'react'
import { useForm } from 'react-hook-form'
import { MdOutlineModeEdit } from "react-icons/md";
import { IoMdClose } from "react-icons/io";
import ImageUploadElement from './ImageUploadElement';
import Button from './Button';
import { updateUserAvatar, updateUserCoverImage } from '../utils/fetchData/user';
import { useDispatch, useSelector } from 'react-redux';
import { isLoadingFalse, isLoadingTrue } from '../reduxTK/configSlice';
import { updateUserData } from '../reduxTK/userSlice';
import { setChannelInfo } from '../reduxTK/channelSlice';

function EditAvatarAndCover({cover, prevImage}) {

    const {register, handleSubmit, formState: {errors}} = useForm()

    const [isEditModalOpen, setIsEditModalOpen] = useState(false);

    const dispatch = useDispatch();
    const userData = useSelector((state) => state.user?.userData);
    const channelInfo = useSelector((state) => state.channel?.channelInfo)

    async function onSubmitHandler(data){
        dispatch(isLoadingTrue());
        try {
            if(cover){
                const updateCoverResponse = await updateUserCoverImage({coverImage: data?.coverImage});
                if(updateCoverResponse?.success){
                    const newCoverImage = updateCoverResponse?.data?.coverImage;
                    dispatch(updateUserData({...userData, coverImage: newCoverImage}));
                    dispatch(setChannelInfo({...channelInfo, coverImage: newCoverImage}));
                }
            } else{
                const updateAvatarResponse = await updateUserAvatar({avatar: data?.avatar});
                if(updateAvatarResponse?.success){
                    const newAvatar = updateAvatarResponse?.data?.avatar;
                    dispatch(updateUserData({...userData, avatar: newAvatar}));
                    dispatch(setChannelInfo({...channelInfo, avatar: newAvatar}));
                }
            }
        } catch (error) {
            console.log(error);
        }
        setIsEditModalOpen(false);
        dispatch(isLoadingFalse());
    }

    return (
        <>
        <form onSubmit={handleSubmit(onSubmitHandler)}>
            <button 
                type='button' 
                className='flex items-center justify-center gap-1 text-lg bg-black/50 py-1 px-2 font-medium rounded-lg cursor-pointer active:ring-1'
                onClick={() => setIsEditModalOpen(true)}
            >
                Edit
                <MdOutlineModeEdit size={20} className='' />
            </button>

            {isEditModalOpen && (
                <div className="fixed z-50 top-0 left-0 w-full h-full flex justify-center items-center bg-black bg-opacity-70">
                    <div className={`bg-black px-2 py-2 border shadow-lg w-full ${cover ? "max-w-2xl" : "max-w-md"}`}>
                        <div className='flex items-center justify-end'>
                            <button 
                                type='button' 
                                className='hover:bg-white/15 rounded-full p-1'
                                onClick={() => {setIsEditModalOpen(false)}}
                            >
                                <IoMdClose size={20} />
                            </button>
                        </div>

                        <h2 className="text-xl font-bold text-white mb-4 px-4">
                            Change {cover ? "Cover Image" : "Profile Picture"} 
                        </h2>

                        <div className="flex flex-col items-center gap-4 mt-5 px-4">
                            <ImageUploadElement 
                                className='w-full h-60 border border-slate-400'
                                img={prevImage}
                                {...register(`${cover ? "coverImage" : "avatar"}`, {
                                    required: true
                                })}
                            />
                            <Button type='submit' className='w-full mb-2 mt-2'>Upload</Button>
                        </div>
                        {errors.avatar && <p className="text-red-500 px-4">Avatar is required</p>}
                        {errors.coverImage && <p className="text-red-500 px-4">Cover Image is required</p>}
                    </div>
                </div>
            )}
        </form>
        </>
    )
}

export default EditAvatarAndCover;