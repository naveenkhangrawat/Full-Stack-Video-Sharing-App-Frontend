import React, { useState } from 'react'
import Logo from './Logo';
import Input from './Input';
import Button from './Button';
import Loader from "./Loader";
import { Link, useNavigate } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import { isLoadingFalse, isLoadingTrue } from '../reduxTK/configSlice';
import { useDispatch, useSelector } from 'react-redux';
import { getUserChannelProfile, loginUser } from '../utils/fetchData/user';
import { login } from "../reduxTK/userSlice";
import { setChannelInfo } from '../reduxTK/channelSlice';


function Login() {

    const {handleSubmit, register, formState: { errors }} = useForm();

    const isLoading = useSelector((state) => state.config.isLoading);

    const dispatch = useDispatch();
    const navigate = useNavigate();


    async function onSubmitHandler(data){
        dispatch(isLoadingTrue());
        try {
            const loginResponse = await loginUser({username: data?.username, password: data?.password});
            if(loginResponse?.success){
                dispatch(login(loginResponse?.data?.user));
                navigate("/")
            }
        } catch (error) {
            console.log(error);
        }
        dispatch(isLoadingFalse());
    }

    
    return (
        <>
            {isLoading && (<Loader />)}
            <div className="w-full h-screen text-white p-3 flex justify-center items-start">
                <div className="flex max-w-5xl md:w-[500px] flex-col justify-center items-center border border-slate-600 md:px-10 px-5 mt-20 py-3">
                    <div className="flex w-full items-center justify-center mt-5 mb-5">
                        <Logo />
                    </div>

                    <div className='w-full flex justify-center items-center font-semibold md:text-3xl text-2xl py-2 mb-5'>
                        Log In to your Account
                    </div>

                    <form onSubmit={handleSubmit(onSubmitHandler)} className='w-full p-2'>
                        <Input
                            type="text"
                            label="Username"
                            className=""
                            {...register("username", {
                                required: true,
                            })}
                        />
                        {errors.username && <p className="text-red-500">Username is required</p>}

                        <Input 
                            type="password"
                            label="Password"
                            className='mt-5'
                            {...register("password", {
                                required: true
                            })}
                        />
                        {errors.password && <p className="text-red-500">Password is required</p>}

                        <Button type='submit' className='w-full mt-7'>
                            Login
                        </Button>
                    </form>

                    <p className='p-2'>
                        Don&apos;t have an account?{" "}
                        <Link
                            to={"/signup"}
                            className='text-blue-400 cursor-pointer hover:text-blue-600'
                        >
                            Sign Up
                        </Link>
                    </p>
                </div>

            </div>
        </>
    )
}

export default Login;