import React, { useEffect } from 'react'
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import LoginPopUp from './LoginPopUp';

function AuthLayout({children, authentication}) {

    const navigate = useNavigate();
    const isLoggedIn = useSelector((state) => state.user?.isLoggedIn);


    if(authentication && isLoggedIn !== authentication){
        return <LoginPopUp />
    }

    useEffect(() => {
        if(!authentication && isLoggedIn !== authentication){
            navigate("/")
        }
    },[isLoggedIn, navigate, authentication])

    return (
        <>
        {children}
        </>
    )
}

export default AuthLayout;
