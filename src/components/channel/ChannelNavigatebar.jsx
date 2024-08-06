import React from 'react'
import { NavLink } from 'react-router-dom'

function ChannelNavigatebar({username, edit}) {

    if(edit){
        return (
            <>
            <div className='w-full px-6 mt-3'>
                <section className="text-white text-center w-full grid grid-cols-2 gap-2 justify-center items-center border-b-2 border-slate-600 text-xs sm:text-base sm:mt-4 md:mt-0 mt-2">
                    <NavLink
                        to={`/channel/edit/personal-info`}
                        className={({ isActive }) =>
                            isActive
                                ? "bg-white/[0.15] border-b-2 border-purple-600"
                                : ""
                        }
                    >
                        <p className="p-2 text-center hover:bg-white/[0.15]">Personal Information</p>
                    </NavLink>
                    <NavLink
                        to={`/channel/edit/password`}
                        className={({ isActive }) =>
                            isActive
                                ? "bg-white/[0.15] border-b-2 border-purple-600"
                                : ""
                        }
                    >
                        <p className="p-2 text-center hover:bg-white/[0.15]">Change Password</p>
                    </NavLink>
                </section>
            </div>
            </>
        )
    }

    return (

        <>
            <div className='w-full px-6 mt-3'>
                <section className="text-white w-full grid grid-cols-4 gap-2 items-center border-b-2 border-slate-600 text-sm sm:text-base sm:mt-4 md:mt-0 mt-2">
                    <NavLink
                        to={`/channel/${username}/videos`}
                        className={({ isActive }) =>
                            isActive
                                ? "bg-white/[0.15] border-b-2 border-purple-600"
                                : ""
                        }
                    >
                        <p className="p-2 text-center hover:bg-white/[0.15]">Videos</p>
                    </NavLink>
                    <NavLink
                        to={`/channel/${username}/playlists`}
                        className={({ isActive }) =>
                            isActive
                                ? "bg-white/[0.15] border-b-2 border-purple-600"
                                : ""
                        }
                    >
                        <p className="p-2 text-center hover:bg-white/[0.15]">Playlists</p>
                    </NavLink>
                    <NavLink
                        to={`/channel/${username}/tweets`}
                        className={({ isActive }) =>
                            isActive
                                ? "bg-white/[0.15] border-b-2 border-purple-600"
                                : ""
                        }
                    >
                        <p className="p-2 text-center hover:bg-white/[0.15]">Tweets</p>
                    </NavLink>
                    <NavLink
                        to={`/channel/${username}/subscribers`}
                        className={({ isActive }) =>
                            isActive
                                ? "bg-white/[0.15] border-b-2 border-purple-600"
                                : ""
                        }
                    >
                        <p className="p-2 text-center hover:bg-white/[0.15]">Subscribers</p>
                    </NavLink>
                </section>
            </div>
        </>
    )
}

export default ChannelNavigatebar;