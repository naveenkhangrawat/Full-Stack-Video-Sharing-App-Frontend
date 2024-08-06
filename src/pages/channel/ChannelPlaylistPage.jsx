import React, { useEffect, useState } from 'react'
import Button from "../../components/Button";
import { IoMdClose } from "react-icons/io";
import Input from '../../components/Input';
import { useForm } from 'react-hook-form';
import { Link, useNavigate } from 'react-router-dom';
import moment from 'moment';
import { useDispatch, useSelector } from 'react-redux';
import { isLoadingFalse, isLoadingTrue } from '../../reduxTK/configSlice';
import { createPlaylist, deletePlaylist, getUserPlaylists } from '../../utils/fetchData/playlist';
import { addPlaylistToPlaylists, emptyPlaylists, getPlaylists } from '../../reduxTK/playlistSlice';
import { MdDelete } from 'react-icons/md';
import DeleteConfirmPopup from '../../components/DeleteConfirmPopup';

function ChannelPlaylistPage() {

    const [openCreatePlaylistPopUp, setOpenCreatePlaylistPopUp] = useState(false);
    const [isDeletePlaylist, setIsDeletePlaylist] = useState(false);
    const [playlistDetails, setPlaylistDetails] = useState(null);

    const dispatch = useDispatch();
    const navigate = useNavigate();

    const channelInfo = useSelector((state) => state.channel?.channelInfo);
    const userData = useSelector((state) => state.user?.userData);
    const playlists = useSelector((state) => state.playlist?.playlists);

    const {register, handleSubmit, setValue, formState: {errors}} = useForm()



    async function onDeleteHandler(){

        try {
            await deletePlaylist(playlistDetails?._id);
            fetchAllUserPlaylists()

        } catch (error) {
            console.log(error)
        }

        setIsDeletePlaylist(false);
    }


    async function onSubmitHandler(data){
        dispatch(isLoadingTrue());
        try {
            const createPlaylistResponse = await createPlaylist({
                name: data?.name, 
                description: data?.description
            });
            if(createPlaylistResponse?.success){
                setOpenCreatePlaylistPopUp(false);
                dispatch(addPlaylistToPlaylists({
                    ...createPlaylistResponse?.data,
                    totalVideos: 0,
                    totalViews: 0
                }));
            }
        } catch (error) {
            console.log(error);
        }
        setValue("name", "");
        setValue("description", "");
        dispatch(isLoadingFalse());
    }


    async function fetchAllUserPlaylists(){
        dispatch(isLoadingTrue());

        try {
            if(channelInfo?._id){
                const getUserPlaylistsResponse = await getUserPlaylists(channelInfo?._id);
                if(getUserPlaylistsResponse?.success){
                    dispatch(getPlaylists(getUserPlaylistsResponse?.data?.allPlaylistsInfo));
                }
            }
        } catch (error) {
            console.log(error);
        }

        dispatch(isLoadingFalse());
    }

    useEffect(() => {
        fetchAllUserPlaylists();

        return () => {
            dispatch(emptyPlaylists());
        }
    },[])

    return (
        <>
        <div className="w-full flex flex-col relative text-white sm:px-4 px-0">

            {playlists && (
                <>
                {channelInfo?._id === userData?._id && (
                    <div className="w-full flex justify-center mt-10 mb-5">
                        <Button
                            type="button"
                            onClick={() => {
                                setOpenCreatePlaylistPopUp(true)
                            }}
                        >
                            Create Playlist
                        </Button>
                    </div>
                )}

                {playlists?.length === 0 && (
                    <div className="text-center h-[5rem] flex flex-col justify-center items-center text-white mt-20">
                        <h1 className='text-3xl'>No Playlist Created</h1>
                        <p className='mt-3'>There are no playlist created on this channel</p>
                    </div>
                )}
                
                {openCreatePlaylistPopUp && (
                    <div  className="fixed top-0 left-0 w-full h-full flex justify-center items-center bg-black bg-opacity-70 z-50">
                        <div className="relative w-[85%] sm:max-w-lg border bg-black">
                            <form className='w-full flex flex-col px-4 py-4' onSubmit={handleSubmit(onSubmitHandler)}>
                                <div className='flex justify-end'>
                                    <IoMdClose 
                                        size={25}
                                        className='cursor-pointer'
                                        onClick={() => setOpenCreatePlaylistPopUp(false)}
                                    />
                                </div>

                                <div className='flex flex-col gap-7 sm:px-5 px-1'>
                                    <h2 className="text-3xl font-bold">
                                        Create Playlist
                                    </h2>

                                    <div>
                                        <Input 
                                            type="text"
                                            label="Name"
                                            {...register("name", {
                                                required: true
                                            })}
                                        />
                                        {errors.name && <p className="text-red-500">Name is required</p>}
                                    </div>

                                    <div>
                                        <Input 
                                            type="text"
                                            label="Description"
                                            {...register("description", {
                                                required: true
                                            })}
                                        />
                                        {errors.description && <p className="text-red-500">Description is required</p>}
                                    </div>


                                    <Button type='submit'>
                                        Create Playlist
                                    </Button>
                                </div>
                            </form>
                        </div>
                    </div>
                )}

                {playlists?.length > 0 && (
                    <div className="grid xl:grid-cols-3 md:grid-cols-2 p-2 sm:gap-5 gap-7 grid-cols-1 w-full mt-5">
                        {playlists?.map((playlist) => (
                            <div
                                key={playlist?._id}
                                onClick={() => {
                                    navigate(`/playlist/${(playlist?.name)?.trim()?.toLowerCase()?.replace(" ", "-")}?id=${playlist?._id}`)
                                }}
                                className='w-full flex flex-col gap-2 cursor-pointer'
                            >
                                <div className='relative h-[14rem] w-full border border-slate-500'>
                                    <img 
                                        src={playlist?.videos?.[0]?.thumbnail?.url || `https://images.unsplash.com/photo-1611162616475-46b635cb6868?q=80&w=1974&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D`}
                                        className='w-full h-full object-cover'  
                                    />

                                    <div className="absolute flex justify-between bottom-0 left-0 border-t py-1 px-2 w-full backdrop-blur-sm bg-[#ffffff] bg-opacity-20">
                                        <div className="flex flex-col gap-1">
                                            <h1 className="text-lg">Playlist</h1>
                                            <div className="flex items-center text-xs text-slate-300">
                                                {playlist?.totalViews} views
                                                <span className="flex text-[20px] leading-none font-bold text-white/[0.7] mx-1 relative top-[-5px]">
                                                    .
                                                </span>
                                                {moment(playlist?.updatedAt).fromNow()}
                                            </div>
                                        </div>
                                        <p>{playlist?.totalVideos} Videos</p>
                                    </div>
                                </div>

                                <div className='w-full flex gap-3 justify-between'>
                                    <div className="flex flex-col gap-1">
                                        <p className="text-base font-semibold line-clamp-1">{playlist?.name}</p>
                                        <p className="text-sm line-clamp-2">{playlist?.description}</p>
                                    </div>

                                    <div>
                                        <MdDelete 
                                            size={25} 
                                            color='red'
                                            className='cursor-pointer'
                                            onClick={(event) => {
                                                event.stopPropagation();
                                                setIsDeletePlaylist(true);
                                                setPlaylistDetails(playlist);
                                            }} 
                                        />
                                    </div>
                                </div>

                            </div>
                        ))}
                    </div>
                )}

                {isDeletePlaylist && (
                    <DeleteConfirmPopup 
                        playlist={true}
                        onCancel={() => {
                            setIsDeletePlaylist(false);
                        }}
                        onDelete={onDeleteHandler}
                    />
                )}

                </>
            )}
        </div>
        </>
    )
}

export default ChannelPlaylistPage;