import React, { useState } from 'react'
import { IoMdClose } from "react-icons/io";
import { PiFilmReelFill } from "react-icons/pi";
import { MdCheckCircle } from "react-icons/md";
import Button from './Button';
import Spinner from './Spinner';

function UploadingVideoModal({
    videoFileName, 
    videoFileSize, 
    hasUploaded, 
    setIsUploading, 
    setHasUploaded,
    setPopUp
}) {

    return (
        <>
        <div className="fixed top-0 left-0 w-full h-full flex justify-center items-center bg-black bg-opacity-80 z-50">
            <div className="md:w-[550px] w-[85%] px-5 py-5 text-white border outline-none rounded-lg space-y-5 border-slate-700 bg-black">
                <div className="flex items-start justify-between">
                    <div>
                        {hasUploaded ? (
                            <h1 className="text-2xl font-semibold">Video Uploaded</h1>
                        
                        ) : (
                            <h1 className="text-2xl font-semibold">Uploading Video...</h1>
                        )}
                        <p className="text-xs text-slate-400 mt-1">Track your video uploading process</p>
                    </div>

                    <IoMdClose 
                        size={25}
                        className='cursor-pointer'
                        onClick={() => {
                            setIsUploading(false);
                            setHasUploaded(false);
                            setPopUp((prevState) => (
                                {...prevState, uploadVideo: false}
                            ))
                        }}
                    />
                </div>

                <div className="border flex justify-start items-start px-1 py-3">
                    <div className="mr-2 p-1">
                        <PiFilmReelFill size={25} className='text-purple-500' />
                    </div>
                    <div>
                        <h1 className="text-lg font-semibold">{videoFileName}</h1>
                        <p className="text-base">{videoFileSize} MB</p>
                        <div className="flex gap-2 items-center mt-3">
                            {hasUploaded ? (
                                <div className="flex items-center gap-1">
                                    <MdCheckCircle color='blue' size={20} />
                                    <p>Uploaded Successfully</p>
                                </div>
                            ) : (
                                <>
                                    <Spinner />
                                    <p>Uploading...</p>
                                </>
                            )}
                        </div>
                    </div>
                </div>

                <div className="flex justify-end gap-3">
                    {hasUploaded && (
                        // <button 
                        //     type='button' 
                        //     className="hover:bg-white/20 py-2 px-4 font-medium rounded-lg cursor-pointer active:ring-1"
                        //     onClick={() => {
                        //         setIsUploading(false);
                        //         setHasUploaded(false);
                        //         setPopUp((prevState) => (
                        //             {...prevState, uploadVideo: false}
                        //         ))
                        //     }}
                        // >
                        //     Cancel
                        // </button>

                        <Button 
                            type='button'
                            onClick={() => {
                                setIsUploading(false);
                                setHasUploaded(false);
                                setPopUp((prevState) => (
                                    {...prevState, uploadVideo: false}
                                ))
                            }}
                        >
                            Finish
                        </Button>
                    )}
                </div>
            </div>
        </div>
        </>
    )
}

export default UploadingVideoModal;