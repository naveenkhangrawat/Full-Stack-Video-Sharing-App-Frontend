import React from 'react'
import { ImBin } from "react-icons/im";

function DeleteConfirmPopup({
    onCancel,
    onDelete,
    comment,
    tweet,
    video,
    playlist
}) {

    return (
        <>
            <div className="fixed top-0 left-0 w-screen h-screen flex justify-center items-center bg-black bg-opacity-70 z-50">
                <div className="fixed inset-0 flex items-center justify-center z-50">
                    <div className="sm:p-5 p-3 bg-black border-slate-700 border rounded-xl">
                        <div className="flex justify-center items-start p-3 flex-wrap gap-2">
                            <div className='p-1'>
                                <ImBin
                                    color="red"
                                    size={25}
                                />
                            </div>
                            <div className="text-white flex flex-col flex-wrap items-start px-2 gap-2">
                                <h1 className="text-bold text-xl">
                                    Delete
                                    {`${comment ? " Comment" : ""} 
                                    ${tweet ? " Tweet" : ""} 
                                    ${video ? " Video" : ""} 
                                    ${playlist ? " Playlist" : ""}`}{" "}
                                </h1>
                                <p className="text-xs text-start text-semibold w-64">
                                    <span>
                                        Delete your{" "}
                                        {`${comment ? "comment" : ""} 
                                        ${tweet ? "tweet" : ""} 
                                        ${video ? "video" : ""} 
                                        ${playlist ? " Playlist" : ""}`}{" "}
                                        permanently?
                                    </span>{" "}
                                </p>
                                <div className="font-normal flex gap-3 justify-center mt-2">
                                    <button
                                        onClick={onCancel}
                                        className="text-white bg-gray-800 hover:bg-gray-900 focus:outline-none font-medium rounded-lg text-base px-5 py-2.5 text-center active:ring-2 active:ring-blue-300 duration-100"
                                    >
                                        Cancel
                                    </button>
                                    <button
                                        onClick={onDelete}
                                        className="text-white bg-red-500 hover:bg-red-600 focus:outline-none font-medium rounded-lg text-base px-5 py-2.5 text-center active:ring-2 active:ring-blue-300 duration-100"
                                    >
                                        Delete
                                    </button>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}

export default DeleteConfirmPopup;