import React, { useEffect, useState } from 'react'
import { useDispatch } from 'react-redux';
import { updateVideoInChannelVideos } from '../reduxTK/dashboardSlice';
import { togglePublishStatus } from '../utils/fetchData/video';

function TogglePublish({isPublished, videoId}) {

    const [isChecked, setIsChecked] = useState(isPublished);

    const dispatch = useDispatch();

    async function onChangeHandler(){
        setIsChecked((prevState) => !prevState);

        try {
            await togglePublishStatus(videoId);
        } catch (error) {
            console.log(error);
        }
    }

    useEffect(() => {
        dispatch(updateVideoInChannelVideos({
            _id: videoId,
            isPublished: isChecked
        }))
    },[isChecked])

    return (
        <>
        <label className="relative inline-flex items-center cursor-pointer">
            <input
                type="checkbox"
                value=""
                className="sr-only peer"
                checked={isChecked}
                onChange={onChangeHandler}
            />
            <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none rounded-full peer dark:bg-gray-700 peer-checked:after:translate-x-full rtl:peer-checked:after:-translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:start-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all dark:border-gray-600 peer-checked:bg-blue-600"></div>
        </label>
        </>
    )
}

export default TogglePublish