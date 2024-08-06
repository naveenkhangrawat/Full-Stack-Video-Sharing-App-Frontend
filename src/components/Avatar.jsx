import React from 'react'
import { useNavigate } from 'react-router-dom'

function Avatar({src, channelName}) {

    const navigate = useNavigate()

    return (
        <>
        <img 
            src={src} 
            alt="avatar"
            className='w-10 h-10 rounded-full object-cover' 
            onClick={(event) => {
                event.stopPropagation();
                navigate(`/channel/${channelName}`)
            }}
        />
        </>
    )
}

export default Avatar