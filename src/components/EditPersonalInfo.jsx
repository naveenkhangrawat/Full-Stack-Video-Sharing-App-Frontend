import React from 'react'
import { useForm } from 'react-hook-form';
import Input from './Input';
import Button from './Button';
import { updateAccountDetails } from '../utils/fetchData/user';
import { useDispatch, useSelector } from 'react-redux';
import { isLoadingFalse, isLoadingTrue } from '../reduxTK/configSlice';
import { updateUserData } from '../reduxTK/userSlice';
import { setChannelInfo } from '../reduxTK/channelSlice';

function EditPersonalInfo() {
    
    const channelInfo = useSelector((state) => state.channel?.channelInfo);

    const {register, handleSubmit, setValue, formState: {errors}} = useForm({
        defaultValues: {
            fullName: channelInfo?.fullName || "",
            email: channelInfo?.email || ""
        }
    });

    const dispatch = useDispatch();
    const userData = useSelector((state) => state.user?.userData);

    async function onSubmitHandler(data){
        dispatch(isLoadingTrue());
        try {
            const updateAccountResponse = await updateAccountDetails({
                fullName: data?.fullName, 
                email: data?.email
            });
            if(updateAccountResponse?.success){
                setValue("fullName", "");
                setValue("email", "");
                dispatch(updateUserData({...userData, fullName: data?.fullName, email: data?.email}));
                dispatch(setChannelInfo({...channelInfo, fullName: data?.fullName, email: data?.email}));
            }
        } catch (error) {
            console.log(error);
        }
        dispatch(isLoadingFalse());
    }

    function cancelHandler(){
        setValue("fullName", "");
        setValue("email", "");
    }


    return (
        <>
        <div className="w-full text-white flex justify-center items-center mt-5">
            <div className="flex flex-col gap-7 bg-transparent p-5 border rounded shadow-lg w-full max-w-md">
                <h2 className="text-2xl font-bold">
                    Personal Information
                    <p className="font-light text-xs text-slate-400">
                        Update your personal details here
                    </p>
                </h2>

                <form className='flex flex-col gap-6' onSubmit={handleSubmit(onSubmitHandler)} >
                    <div className="flex flex-col">
                        <Input 
                            type="text"
                            label="Full Name"
                            {...register("fullName", {
                                required: true
                            })}
                        />
                        {errors.fullName && <p className="text-red-500">FullName is required</p>}
                    </div>

                    <div className="flex flex-col">
                        <Input 
                            type="email"
                            label="Email"
                            {...register("email", {
                                required: true,
                                pattern: /^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/
                            })}
                        />
                        {errors.email?.type === "required" && <p className="text-red-500">Email is required</p>}
                        {errors.email?.type === "pattern" && <p className="text-red-500">Invalid Email</p>}
                    </div>

                    <div className="flex justify-end gap-3">
                        <button 
                            type='button' 
                            className="hover:bg-white/20 py-2 px-4 font-medium rounded-lg cursor-pointer active:ring-1"
                            onClick={cancelHandler}
                        >
                            Cancel
                        </button>

                        <Button type='submit'>
                            Save Changes
                        </Button>
                    </div>
                </form>
            </div>
        </div>
        </>
    )
}

export default EditPersonalInfo;