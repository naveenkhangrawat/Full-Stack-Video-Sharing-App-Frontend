import React, { useEffect, useState } from 'react';
import Loader from '../Loader';
import Logo from "../Logo";
import Search from './Search';
import {IoIosSearch, SlMenu, IoCloseCircleOutline, BiLike, HiOutlineVideoCamera, MdOutlineContactSupport, IoSettingsOutline,  RiLogoutBoxLine} from "../../utils/icons/icons";
import Button from '../Button';
import { Link, NavLink, useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { isLoadingFalse, isLoadingTrue } from '../../reduxTK/configSlice';
import { logoutUser } from '../../utils/fetchData/user';
import { logout } from '../../reduxTK/userSlice';
import { emptyChannelInfo } from '../../reduxTK/channelSlice';




function Header({setSearchPopUp}) {

    const isLoggedIn = useSelector((state) => state.user.isLoggedIn);
    const userData = useSelector((state) => state.user.userData);
    const isLoading = useSelector((state) => state.config.isLoading);

    const [toggleMenu, setToggleMenu] = useState(false);

    const sideBarOptions = [
        {
            title: "Liked Videos",
            icon: <BiLike />,
            path: "/liked-videos"
        },
        {
            title: "My content",
            icon: <HiOutlineVideoCamera />,
            path: `/channel/${userData?.username}`
        },
        {
            title: "Support",
            icon: <MdOutlineContactSupport />,
            path: ""
        },
        {
            title: "Settings",
            icon: <IoSettingsOutline />,
            path: ""
        }
    ]

    const navigate = useNavigate();
    const dispatch = useDispatch();

    async function logoutHandler(){
        dispatch(isLoadingTrue());
        try {
            const logoutResponse = await logoutUser();
            if(logoutResponse?.success){
                dispatch(logout());
                dispatch(emptyChannelInfo());
                navigate("/login");
            }
        } catch (error) {
            console.log(error);
        }
        dispatch(isLoadingFalse());
    }


    return (
        <>
            <nav className="w-full h-[80px] bg-[#0E0F0F] flex justify-between items-center px-4 py-2 sm:gap-5 gap-2 border-b border-white/30 sticky top-0 z-50 backdrop-blur-md bg-opacity-20">
                {/* {isLoading && <Loader />} */}

                <div className="flex items-center justify-center cursor-pointer">
                    <Logo />
                </div>

                <div className='hidden sm:block'>
                    <Search />
                </div>


                {/* login and signup button */}
                {!isLoggedIn ? (
                    <div className='hidden sm:flex flex-row justify-center items-center gap-5'>
                        <Link to={"/login"}>
                            <Button type='button'>
                                Login
                            </Button>
                        </Link>
                        
                        <Link to={"/signup"}>
                            <Button type='button'>
                                Sign Up
                            </Button>       
                        </Link>
                        
                    </div>
                ) : (
                    <div className='hidden sm:flex flex-row justify-center items-center gap-5'>
                        <div 
                            className='hidden sm:flex h-10 w-10 overflow-hidden rounded-full cursor-pointer ml-2'
                            onClick={() => {navigate(`/channel/${userData?.username}`)}}
                        >
                            <img 
                                src={userData?.avatar} 
                                alt="avatar"
                                className='object-cover h-full w-full'
                            />
                        </div>
                        <div>  
                            <Button type='button' onClick={logoutHandler}>
                                Logout
                            </Button>
                        </div>
                    </div>
                )}


                {/* menu and search button for small screens */}
                <div className='flex flex-row justify-center items-center gap-3 sm:hidden'>
                    <div className="flex cursor-pointer justify-center items-center h-10 w-10 px-2 py-1 rounded-full hover:bg-[#303030]/[0.6]">
                        <IoIosSearch
                            size={25}
                            className='text-white'
                            onClick={() => {setSearchPopUp(true)}}
                        />
                    </div>

                    <div 
                        className="flex cursor-pointer items-center justify-center h-10 w-10 rounded-full hover:bg-[#303030]/[0.6]"
                        onClick={() => setToggleMenu((prevState) => !prevState)}
                    >
                        <SlMenu 
                            size={25}
                            className='text-white' 
                        />
                    </div>
                </div>

                {/* sidebar for small screens */}
                {toggleMenu && (
                    <div className="fixed right-0 top-0 text-white flex flex-col h-screen w-[60%] bg-[#0F0F0F] sm:hidden outline-none">

                        <div className="w-full border-b h-20 flex items-center mb-2 justify-between px-3">
                            <div className="flex items-center gap-2">
                                <Logo />
                            </div>
                            <IoCloseCircleOutline
                                size={35}
                                onClick={() => setToggleMenu((prev) => !prev)}
                            />
                        </div>

                        <div className="flex flex-col justify-between h-full py-5 px-2">
                            <div className='flex flex-col gap-2'>
                                {sideBarOptions?.map((element) => (
                                    <NavLink
                                        to={element.path}
                                        className={({isActive}) => isActive && "bg-white/[0.15]"}
                                    >
                                        <React.Fragment key={element.title}>
                                            
                                                <div 
                                                    className={`text-white text-base cursor-pointer h-10 flex items-center gap-4 px-4 border border-slate-500 rounded-lg hover:bg-white/[0.15]`}
                                                    
                                                >
                                                    <span className='text-xl'>{element.icon}</span>
                                                    <p className='text-lg'>{element.title}</p>
                                                </div>
                                            
                                        </React.Fragment>
                                    </NavLink>
                                ))}
                                
                            </div>

                            {!isLoggedIn ? (
                                <div className='flex flex-col gap-3'>
                                    <Link to={"/login"}>
                                        <Button type='button' className='w-full'>
                                            Login
                                        </Button>
                                    </Link>

                                    <Link to={"/signup"}>
                                        <Button type='button' className='w-full'>
                                            Sign Up
                                        </Button>
                                    </Link>
                                </div>
                            ) : (
                                <div>
                                    <Button type='button' className='w-full'>
                                        Logout
                                    </Button>
                                </div>
                            )}
                        </div>
                    </div>
                )}

            </nav>
        </>
    )
}

export default Header;

