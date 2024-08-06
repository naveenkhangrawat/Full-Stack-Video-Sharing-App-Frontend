import React from 'react'
import Input from './Input'
import Button from './Button';
import { useForm } from 'react-hook-form'
import { useDispatch, useSelector } from 'react-redux';
import { isLoadingFalse, isLoadingTrue } from '../reduxTK/configSlice';
import { changeCurrentPassword } from '../utils/fetchData/user';

function ChangePassword() {

    const {register, handleSubmit, getValues, setValue, formState:{errors}} = useForm();

    const dispatch = useDispatch();


    async function onSubmitHandler(data){
        dispatch(isLoadingTrue());
        const oldPassword = data?.oldPassword;
        const newPassword = data?.newPassword;
        try {
            const changePasswordResponse = await changeCurrentPassword({oldPassword, newPassword});
            if(changePasswordResponse?.success){
                setValue("oldPassword", "");
                setValue("newPassword", "");
                setValue("confirmPassword", "");
            }
        } catch (error) {
            console.log(error);
        }
        dispatch(isLoadingFalse());
    }

    return (
        <>
        <div className="w-full text-white flex justify-center items-center mt-2">
            <div className="bg-transparent p-8 border rounded shadow-lg w-full max-w-md">
                <h2 className="text-2xl font-bold mb-4">
                    Change Password
                </h2>
                <form className="space-y-4" onSubmit={handleSubmit(onSubmitHandler)}>
                    <div className="flex flex-col">
                        <Input
                            type="password"
                            label="Old Password"
                            {...register("oldPassword", {
                                required: true
                            })}
                        />
                        {errors.oldPassword && <p className="text-red-500">Old Password is required</p>}
                    </div>

                    <div className="flex flex-col">
                        <Input 
                            type="password"
                            label="New Password"
                            {...register("newPassword", {
                                required: true
                            })}
                        />
                        {errors.newPassword && <p className="text-red-500">New Password is required</p>}
                    </div>

                    <div className="flex flex-col">
                        <Input 
                            type="password"
                            label="Confirm New Password"
                            {...register("confirmPassword", {
                                required: true,
                                validate: (value) => (
                                    value === getValues("newPassword")
                                )
                            })}
                        />
                        {errors.confirmPassword?.type === "required" && <p className="text-red-500">Please confirm your new password</p>}
                        {errors.confirmPassword?.type === "validate" && <p className="text-red-500">
                            Passwords must be same
                        </p>}
                    </div>

                    <div className="flex justify-end mt-4">
                        <Button type='submit'>
                            Change Password
                        </Button>
                    </div>
                </form>
            </div>
        </div>
        </>
    )
}

export default ChangePassword;