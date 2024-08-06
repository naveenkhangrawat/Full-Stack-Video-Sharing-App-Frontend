import React, { useState } from 'react'
import { IoMdClose } from "react-icons/io";
import Button from './Button';
import Input from './Input';
import { useForm } from 'react-hook-form';
import ImageUploadElement from './ImageUploadElement';
import UploadingVideoModal from './UploadingVideoModal';
import { publishAVideo } from '../utils/fetchData/video';
import { useDispatch, useSelector } from 'react-redux';
import { addVideoToList } from '../reduxTK/videoSlice';
import { addVideoToChannelVideos, updateChannelStats } from '../reduxTK/dashboardSlice';

function UploadVideoModal({setPopUp}) {

    const {register, handleSubmit, formState: {errors}} = useForm();

    const [videoFilePreview, setVideoFilePreview] = useState(null);

    const [isUploading, setIsUploading] = useState(false);
    const [hasUploaded, setHasUploaded] = useState(false);
    const [videoSize, setVideoSize] = useState(0);

    const channelStats = useSelector((state) => state.dashboard?.channelStats);
    
    const dispatch = useDispatch();

    async function onSubmitHandler(data){
        try {
            setIsUploading(true);
            setVideoSize((data?.videoFile[0]?.size / (1024 * 1024))?.toFixed(2));
            const response = await publishAVideo(data);
            if(response?.success){
                setHasUploaded(true);
                dispatch(addVideoToChannelVideos(response?.data));
                dispatch(updateChannelStats({totalVideos: channelStats?.totalVideos + 1}))
            }
        } catch (error) {
            console.log(error);
        }
    }

    if(isUploading){
        return (
            <UploadingVideoModal 
                videoFileName={videoFilePreview}
                videoFileSize={videoSize}
                hasUploaded={hasUploaded}
                setIsUploading={setIsUploading}
                setHasUploaded={setHasUploaded}
                setPopUp={setPopUp}
            />
        )
    }


    return (
        <>
        <div className="fixed top-0 left-0 w-full h-full flex justify-center items-center bg-black bg-opacity-70 z-50">
            <div className="relative w-[95vw] sm:w-3/4 h-[80vh] sm:h-[80vh] mx-auto text-white border overflow-y-auto bg-black">
                <form onSubmit={handleSubmit(onSubmitHandler)}>
                    <section className="h-20 z-50 border-b w-full flex justify-between items-center px-3">
                        <div className="flex gap-1 items-center cursor-pointer">
                            <h3 className="text-2xl font-semibold">Upload Video</h3>
                        </div>
                        <div className='flex gap-3'>
                            <button 
                                type='button' 
                                className="hover:bg-white/20 py-2 px-4 font-medium rounded-lg cursor-pointer active:ring-1"
                                onClick={() => {setPopUp((prevState) => (
                                    {...prevState, uploadVideo: false}
                                ))}}
                            >
                                Cancel
                            </button>
                            <Button type='submit'>
                                Save
                            </Button>
                        </div>
                    </section >

                    <section className="flex justify-center md:px-10 px-6 py-4">
                        <div className='lg:w-3/4 w-full'>
                            <div className="flex flex-col items-center justify-center w-full">
                                <label htmlFor="video-upload" className="flex flex-col items-center justify-center w-full h-64 border-2 border-gray-300 border-dashed rounded-lg cursor-pointer bg-gray-50 dark:hover:bg-bray-800 dark:bg-gray-700 hover:bg-gray-100 dark:border-gray-600 dark:hover:border-gray-500 dark:hover:bg-gray-600">
                                    <div className="flex flex-col items-center justify-center pt-5 pb-6">
                                        <svg className="w-10 h-10 mb-4 text-gray-500 dark:text-gray-400" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 20 16">
                                            <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 13h3a3 3 0 0 0 0-6h-.025A5.56 5.56 0 0 0 16 6.5 5.5 5.5 0 0 0 5.207 5.021C5.137 5.017 5.071 5 5 5a4 4 0 0 0 0 8h2.167M10 15V6m0 0L8 8m2-2 2 2"/>
                                        </svg>
                                        <p className="mb-1 text-lg text-gray-500 dark:text-gray-400"><span className="font-semibold">Click to upload</span> or drag and drop</p>
                                        <p className="text-base text-gray-500 dark:text-gray-400">Your videos will be private until you publish them</p>
                                    </div>
                                    <input 
                                        type="file"
                                        id='video-upload'
                                        className='hidden'
                                        accept='video/*, .mkv'
                                        {...register("videoFile", {
                                            required: true,
                                            onChange: (event) => {
                                                setVideoFilePreview(event.target.files[0]?.name)
                                            }
                                        })}
                                    />
                                    <p className='text-xl'>{videoFilePreview}</p>
                                </label>
                                {errors.videoFile && <p className="text-red-500 mt-2">VideoFile is required</p>}
                            </div> 

                            <div  className="mt-5 w-full flex flex-col gap-5 justify-center items-center">
                                <div className="w-full">
                                    <p className='text-xl mb-2'>Thumbnail</p>
                                    <ImageUploadElement
                                        className='w-full h-[280px] border border-slate-400'
                                        {...register("thumbnail", {
                                            required: true
                                        })}
                                    />
                                    {errors.thumbnail && <p className="text-red-500 mt-2">Thumbnail is required</p>}
                                </div>

                                <div className="flex flex-col w-full">
                                    <label htmlFor="title" className='text-xl mb-2'>Title</label>
                                    <input 
                                        type="text"
                                        id='title'
                                        className='bg-transparent border border-slate-400 text-xl px-2 py-2 outline-none'
                                        {...register("title", {
                                            required: true
                                        })}
                                    />
                                    {errors.thumbnail && <p className="text-red-500 mt-2">Title is required</p>}
                                </div>

                                <div className='w-full'>
                                    <label htmlFor="description" className='text-xl'>Description</label>
                                    <textarea 
                                        rows={5}
                                        className='w-full px-2 py-1 mt-2 text-white resize-none text-[20px] outline-none border border-slate-400 bg-black overflow-y-auto'
                                        {...register("description", {
                                            required: true
                                        })}
                                    />
                                    {errors.description && <p className="text-red-500 mt-2">Description is required</p>}
                                </div>
                            </div>
                        </div>
                    </section>
                </form>
            </div>
        </div>
        </>
    )
}

export default UploadVideoModal;