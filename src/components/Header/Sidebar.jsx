import React from 'react'
import { AiOutlineHome, BiLike, LuHistory, HiOutlineVideoCamera, IoFolderOutline, MdOutlineSubscriptions, IoSettingsOutline } from "../../utils/icons/icons"
import { NavLink } from 'react-router-dom'
import { useSelector } from 'react-redux'


function Sidebar({videoSideBar}) {

    const userData = useSelector((state) => state.user?.userData);

    const sideBarOptions = [
        {
            title: "Home",
            icon: <AiOutlineHome />,
            path: "/"
        },
        {
            title: "Liked Videos",
            icon: <BiLike />,
            path: "/liked-videos"
        },
        {
            title: "History",
            icon: <LuHistory />,
            path: "/history"
        },
        {
            title: "My content",
            icon: <HiOutlineVideoCamera />,
            path: `/channel/${userData?.username}`
        },
        {
            title: "Collections",
            icon: <IoFolderOutline />,
            path: "/collections"
        },
        {
            title: "Subscriptions",
            icon: <MdOutlineSubscriptions />,
            path: "/subscriptions"
        }
    ]


    return (
        <>

        <div className='hidden sm:block fixed z-10'>
            <div className={`${videoSideBar ? "w-16" : "lg:w-[240px] w-16"} overflow-y-auto h-[calc(100vh-80px)] py-4 bg-black transition-all flex flex-col justify-between border-r-[1px] border-white/[0.2]`}>
                
                <div className={`flex flex-col ${videoSideBar ? "px-2" : "lg:px-5 px-2"} gap-2`}>
                    {sideBarOptions?.map((element) => (
                        <React.Fragment key={element.title}>                               
                            <NavLink 
                                to={element.path}
                                className={({isActive}) => isActive ? "bg-white/[0.15] rounded-lg": ""}
                            >
                                        <div 
                                            className={`text-white text-base cursor-pointer h-10 flex items-center ${videoSideBar ? "justify-center" : "justify-center lg:justify-start lg:px-3"} gap-4 rounded-lg hover:bg-white/[0.15]`}
                                            
                                        >
                                            <span className='text-xl'>{element.icon}</span>
                                            <p className={`${!videoSideBar ? "lg:block hidden" : "hidden"}`}>{element.title}</p>
                                        </div>
                                    
                            </NavLink>
                        </React.Fragment>
                    ))}
                    <hr className='my-4 border-white/[0.2]' />
                    
                </div>
                    
                <div className={`${videoSideBar ? "px-2" : "lg:px-5 px-2"}`}>
                    <div 
                        className={`text-white text-base cursor-pointer h-10 flex items-center ${videoSideBar ? "justify-center" : "justify-center lg:justify-start lg:px-3"} gap-4 rounded-lg hover:bg-white/[0.15]`}
                        
                    >
                        <span className='text-xl'><IoSettingsOutline /></span>
                        <p className={`${!videoSideBar ? "lg:block hidden" : "hidden"}`}>Settings</p>
                    </div>
                </div>
            </div>
        </div>

        </>
    )
}

export default Sidebar;