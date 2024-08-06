import React from 'react'
import { useForm } from 'react-hook-form'
import { TfiClose } from 'react-icons/tfi';
import Input from './Input';
import Button from './Button';
import { useDispatch } from 'react-redux';
import { isLoadingFalse, isLoadingTrue } from '../reduxTK/configSlice';
import { updatePlaylist } from '../utils/fetchData/playlist';
import { setPlaylistInfo } from '../reduxTK/playlistSlice';


function EditPlaylistInfo({setUpdatePlaylistPopUp, playlistInfo}) {


    const {register, handleSubmit, formState: {errors}} = useForm({defaultValues: {
        name: playlistInfo?.name || '',
        description: playlistInfo?.description || ''
    }});

    const dispatch = useDispatch();


    async function onSubmitHandler(data){

        dispatch(isLoadingTrue());
        try {
            const response = await updatePlaylist({
                playlistId: playlistInfo?._id, 
                name: data?.name, 
                description: data?.description
            });
            if(response?.success){
                dispatch(setPlaylistInfo({
                    ...playlistInfo, 
                    name: data?.name, 
                    description: data?.description
                }))
            }
        } catch (error) {
            console.log(error);
        }

        dispatch(isLoadingFalse());
        setUpdatePlaylistPopUp(false);
    }


    return (
        <div className='text-white w-[80%] sm:w-[450px] flex flex-col gap-6 bg-black p-5 border'>
            <div className='flex justify-between items-center px-2'>
                <div className='text-2xl font-bold'>Edit Playlist</div>
                <TfiClose 
                    size={25}
                    className='cursor-pointer'
                    onClick={() => {
                        setUpdatePlaylistPopUp(false)
                    }}
                />
            </div>

            <form onSubmit={handleSubmit(onSubmitHandler)} className='text-white flex flex-col gap-7 px-2 py-2'>
                <div>
                    <Input 
                        type='text'
                        label='Name'
                        {...register("name", {
                            required: true
                        })}
                    />
                    {errors.name && <p className="text-red-500">Name is required</p>}
                </div>

                <div>
                    <Input 
                        type='text'
                        label='Description'
                        {...register("description", {
                            required: true
                        })}
                    />
                    {errors.description && <p className="text-red-500">Description is required</p>}
                </div>

                <Button type='submit'>
                    Edit Playlist
                </Button>
            </form>
        </div>
    )
}

export default EditPlaylistInfo