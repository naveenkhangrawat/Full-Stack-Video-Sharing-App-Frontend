import React from 'react';
import Sidebar from './Header/Sidebar';
import Header from './Header/Header';
import { Outlet } from "react-router-dom";
import SidebarForSmall from './Header/SidebarForSmall';
import Loader from './Loader';
import { useSelector } from 'react-redux';
import Search from './Header/Search';
import { useState } from 'react';
import { TfiClose } from 'react-icons/tfi';

function Layout() {

    const isLoading = useSelector((state) => state.config?.isLoading);

    const [searchPopUp, setSearchPopUp] = useState(false);


    return (
        <>
            {isLoading && <Loader />}
            <Header setSearchPopUp={setSearchPopUp} />
            <SidebarForSmall />
            <div className="sm:flex flex-none">
                <div className="hidden sm:block lg:w-[240px] w-16 h-[calc(100vh-80px)] bg-black">
                    <Sidebar />
                </div>
                <div className="sm:flex-1">
                    <Outlet />
                </div>
            </div>

            {searchPopUp && (
                <div className='fixed top-0 left-0 w-screen h-screen flex justify-center items-start bg-black bg-opacity-95 z-50 text-white sm:hidden'>
                    <div className='flex items-center gap-5 mt-[100px]'>
                        <div>
                            <Search setSearchPopUp={setSearchPopUp}/>
                        </div>
                        <TfiClose size={25} className='cursor-pointer' onClick={() => {setSearchPopUp(false)}} />
                    </div>
                </div>
            )}

        </>
    )
}

export default Layout;