import React from 'react'
import { useForm } from 'react-hook-form'
import { IoMdClose } from "react-icons/io";
import ImageUploadElement from './ImageUploadElement';
import Button from './Button';
import { useDispatch } from 'react-redux';
import { isLoadingFalse, isLoadingTrue } from '../reduxTK/configSlice';
import { updateVideo } from '../utils/fetchData/video';
import { updateVideoInChannelVideos } from '../reduxTK/dashboardSlice';

function EditVideo({ setPopUp, thumbnail, title, description, videoId }) {

    const {register, handleSubmit, formState: {errors}} = useForm({defaultValues: {
        title: title || '',
        description: description || ''
    }})

    const dispatch = useDispatch();

    async function onSubmitHandler(data){
        dispatch(isLoadingTrue());

        try {
            const response = await updateVideo({
                videoId, 
                title: data?.title, 
                description: data?.description, 
                thumbnail: data?.thumbnail
            });
            if(response?.success){
                dispatch(updateVideoInChannelVideos({
                    _id: videoId,
                    title: response?.data?.updatedVideo?.title,
                    description: response?.data?.updatedVideo?.description,
                    thumbnail: response?.data?.updatedVideo?.thumbnail?.url
                }));
            }
        } catch (error) {
            console.log(error);
        }

        setPopUp((prevState) => ( {...prevState, editVideo: false} ))
        dispatch(isLoadingFalse());
    }

    return (
        <>
        <div className="fixed top-0 left-0 w-full h-full flex justify-center items-center bg-black bg-opacity-70 z-50">
            <form onSubmit={handleSubmit(onSubmitHandler)} className='bg-black space-y-2 border w-[85%] sm:w-[60%] h-[80vh] overflow-y-auto outline-none p-2'>
                <div className="sticky left-0 top-0 z-50 bg-[#222222] flex justify-between items-center border-b border-slate-500 px-3 py-1 text-white">
                    <div>
                        <h2 className="font-bold">Edit Video</h2>
                        <p className="text-xs mb-2">
                            Share where you`ve worked on your profile.
                        </p>
                    </div>
                    <IoMdClose 
                        size={25} 
                        className='cursor-pointer' 
                        onClick={() => {
                            setPopUp((prevState) => (
                                {...prevState, editVideo: false}
                            ))
                        }} 
                    />
                </div>

                <div className='flex justify-center items-center py-4 text-white'>
                    <div className="md:px-6 px-3 py-2 flex flex-col gap-5 z-40 lg:w-3/4 w-full">
                        <div className='w-full'>
                            <p className='text-lg mb-2'>Thumbnail</p>
                            <ImageUploadElement
                                img={thumbnail}
                                className='w-full h-72 min-h-32 border border-slate-400'
                                {...register("thumbnail", {
                                    required: true
                                })}
                            />
                            {errors.thumbnail && <p className="text-red-500">Thumbnail is required</p>}
                        </div>


                        <div className="w-full flex flex-col gap-5">
                            <div className='w-full flex flex-col'>
                                <label htmlFor="title" className='text-lg mb-2'>Title</label>
                                <input 
                                    type="text"
                                    id='title'
                                    className='bg-transparent border border-slate-400 text-xl px-2 py-2 outline-none'
                                    {...register("title", {
                                        required: true
                                    })}
                                />
                                {errors.title && <p className="text-red-500">Title is required</p>}
                            </div>

                            <div className='w-full'>
                                <label htmlFor="description" className='text-lg'>Description</label>
                                <textarea 
                                    rows={5}
                                    className='w-full px-2 py-1 mt-2 text-white resize-none text-[20px] outline-none border border-slate-400 bg-black overflow-y-auto'
                                    {...register("description", {
                                        required: true
                                    })}
                                />
                                {errors.description && <p className="text-red-500">Description is required</p>}
                            </div>

                            <div className='flex gap-3 justify-end'>
                                <button 
                                    type='button' 
                                    className="hover:bg-white/20 py-2 px-4 font-medium rounded-lg cursor-pointer active:ring-1"
                                    onClick={() => {setPopUp((prevState) => (
                                        {...prevState, editVideo: false}
                                    ))}}
                                >
                                    Cancel
                                </button>
                                <Button type='submit'>Update</Button>
                            </div>
                        </div>
                    </div>
                </div>
            </form>
        </div>
        </>
    )
}

export default EditVideo