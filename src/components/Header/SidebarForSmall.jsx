import React from 'react'
import { AiOutlineHome, BiLike, LuHistory, HiOutlineVideoCamera, IoFolderOutline, MdOutlineSubscriptions, IoSettingsOutline } from "../../utils/icons/icons"
import { NavLink } from 'react-router-dom'

function SidebarForSmall() {

    const bottomBarOptions = [
        {
            title: "Home",
            icon: <AiOutlineHome />,
            path: "/"
        },
        {
            title: "History",
            icon: <LuHistory />,
            path: "/history"
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
        <div className="border-t-2 text-white h-16 sm:hidden z-20 py-1 w-full flex justify-around fixed bottom-0 bg-[#0E0F0F]">
            {bottomBarOptions?.map((element) => (
                <React.Fragment key={element.title}>
                    <NavLink
                        to={element.path}
                        className={({isActive}) => isActive ? "bg-white/[0.15] rounded-lg" : ""}
                    >
                        <div className="flex flex-col items-center gap-1 px-2 py-1 cursor-pointer rounded-lg hover:bg-white/[0.15]">
                            <span className='text-xl'>{element.icon}</span>
                            <p className="text-sm">{element.title}</p>
                        </div>
                    </NavLink>
                </React.Fragment>
                
            ))}
        </div>
        </>
    )
}

export default SidebarForSmall;