import React from 'react'
import Button from '../Button'
import { FaPlus } from "react-icons/fa6";
import { useSelector } from 'react-redux';

function DashboardHeader({setPopUp}) {

    const userData = useSelector((state) => state.user?.userData);
    
    return (
        <>
        <section className="flex flex-col sm:flex-row justify-between sm:items-center gap-2 mt-2">
            <div>
                <h1 className="sm:text-3xl text-2xl font-bold">
                    Welcome Back, <span className='text-blue-400'>{userData?.username}{" "}</span>
                </h1>
                <p className="text-sm font-light text-slate-200 mt-1">
                    Seamless Video Management, Elevated Results
                </p>
            </div>
            <div>
                <Button 
                    type='button' 
                    className='flex items-center gap-1'
                    onClick={() => {
                        setPopUp((prevState) => (
                            {...prevState, uploadVideo: true}
                        ))
                    }}
                >
                    <FaPlus size={20} />
                    Upload Video
                </Button>
            </div>
        </section>
        </>
    )
}

export default DashboardHeader;