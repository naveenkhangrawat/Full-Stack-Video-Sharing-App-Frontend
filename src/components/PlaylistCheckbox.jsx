import React from 'react'
import { useState } from 'react';
import { addVideoToPlaylist, removeVideoFromPlaylist } from '../utils/fetchData/playlist';
import toast from 'react-hot-toast';
import { useDispatch } from 'react-redux';

function PlaylistCheckbox({playlist, playlistId, playlistName, videoAddingToPlaylistId}) {

    const [isPlaylistCheckboxChecked, setIsPlaylistCheckboxChecked] = useState(playlist?.videos?.filter((video) => video?._id === videoAddingToPlaylistId).length > 0 || false);

    console.log(playlist);


    async function playlistCheckboxHandler(){
        setIsPlaylistCheckboxChecked((prevState) => !prevState);

        if(!isPlaylistCheckboxChecked){
            try {
                await addVideoToPlaylist(playlistId, videoAddingToPlaylistId);
                toast.success(`Saved to ${playlistName}`);
            } catch (error) {
                toast.error(`Couldn't save to ${playlistName}`);
                console.log(error);
            }

        } else if(isPlaylistCheckboxChecked){
            try {
                await removeVideoFromPlaylist(playlistId, videoAddingToPlaylistId);
                toast.success(`Removed from ${playlistName}`);
            } catch (error) {
                toast.error(`Couldn't remove from ${playlistName}`);
                console.log(error);
            }
        }
    }


    return (
        <div className='flex items-center gap-4'>
             <input 
                type="checkbox" 
                id={playlistId}
                className='w-5 h-5 cursor-pointer'
                checked={isPlaylistCheckboxChecked}
                onChange={playlistCheckboxHandler}
            />
            <label htmlFor={playlistId} className='line-clamp-1'>
                {playlistName}
            </label>
        </div>
    )
}

export default PlaylistCheckbox