import React, { useState } from 'react'
import Logo from './Logo';
import Input from './Input';
import Button from './Button';
import { Link, useNavigate } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import ImageUploadElement from './ImageUploadElement';
import { registerUser, loginUser } from '../utils/fetchData/user';
import { useDispatch, useSelector } from 'react-redux';
import { isLoadingFalse, isLoadingTrue } from '../reduxTK/configSlice';
import {login} from "../reduxTK/userSlice";
import Loader from './Loader';


function Signup() {

    const {handleSubmit, register, formState: { errors }} = useForm();

    const isLoading = useSelector((state) => state.config.isLoading);
    const isLoggedIn = useSelector((state) => state.user.isLoggedIn);

    const dispatch = useDispatch();
    const navigate = useNavigate();

    async function onSubmitHandler(data){
        dispatch(isLoadingTrue())
        try {
            const registerResponse = await registerUser(data);
            if(registerResponse?.success){
                const username = data?.username;
                const password = data?.password;
                const loginResponse = await loginUser({username, password});

                if(loginResponse?.success){
                    dispatch(login(loginResponse?.data?.user));
                    navigate("/");
                } else {
                    navigate("/login");
                }
            }  
        } catch (error) {
            console.log(error);
        }
        dispatch(isLoadingFalse());
    }

    return (

        <>
            {isLoading && <Loader />}
            <div className="w-full h-screen text-white p-3 flex justify-center items-start">
                <div className="flex max-w-5xl md:w-[600px] sm:w-[400px] w-[85%] flex-col justify-center items-center border border-slate-600 md:px-10 mt-5 px-3 py-3">
                    <div className="flex w-full items-center justify-center mb-2">
                        <Logo />
                    </div>

                    <div className='w-full flex justify-center items-center font-semibold md:text-3xl text-2xl py-2 mb-5'>
                        Create your Account
                    </div>
                    
                    <form onSubmit={handleSubmit(onSubmitHandler)} className='w-full p-2'>

                        <div className='w-full'>
                            <div className='h-full w-[130px] flex flex-col'>
                                <ImageUploadElement 
                                    className='w-[130px] h-[130px] rounded-full bg-[#222222] border border-slate-400'
                                    imgClassName='rounded-full'
                                    {...register("avatar", {
                                        required: true
                                    })}
                                />
                                <p className='text-center text-gray-400 py-1'>Avatar</p>
                            </div>
                            
                        </div>
                        {errors.avatar && <p className="text-red-500">Avatar is required</p>}

                        <div className="w-full mt-7">
                            <div className='w-full h-full flex flex-col'>
                                <ImageUploadElement 
                                    className='w-full h-[150px] bg-[#222222] border border-slate-400'
                                    {...register("coverImage", {
                                        required: true
                                    })}
                                />
                                <p className='text-center text-gray-400 py-2'>Cover Image</p>
                            </div>
                        </div>

                        <Input
                            type="text"
                            label="Username"
                            className="mt-5"
                            {...register("username", {
                                required: true,
                            })}
                        />
                        {errors.username && <p className="text-red-500">Username is required</p>}

                        <Input 
                            type="email"
                            label="Email"
                            className="mt-5"
                            {...register("email", {
                                required: true,
                                pattern: /^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/
                            })}
                        />
                        {errors.email?.type === "required" && <p className="text-red-500">Email is required</p>}
                        {errors.email?.type === "pattern" && <p className="text-red-500">Invalid Email</p>}

                        <Input 
                            type="text"
                            label="Full Name"
                            className="mt-5"
                            {...register("fullName", {
                                required: true
                            })}
                        />
                        {errors.fullName && <p className="text-red-500">FullName is required</p>}

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
                            Sign Up
                        </Button>
                    </form>

                    <p className='p-2'>
                        Already have an account?{" "}
                        <Link
                            to={"/login"}
                            className='text-blue-400 cursor-pointer hover:text-blue-600'
                        >
                            Login
                        </Link>
                    </p>
                </div>

            </div>
        </>
    )
}

export default Signup;