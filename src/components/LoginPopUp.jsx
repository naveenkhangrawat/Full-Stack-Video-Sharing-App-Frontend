import React from 'react'
import { Link } from 'react-router-dom'
import Button from './Button'
import Logo from './Logo'

function LoginPopUp() {

    return (
        <div className="fixed inset-0 flex justify-center items-center bg-black bg-opacity-75 z-50">
            <div className="bg-black sm:min-w-[400px] border border-slate-800 rounded-lg p-5 text-white text-center">
                <div className="flex flex-col gap-2 items-center mb-3">
                    <Logo size="30" />
                </div>
                <p className="text-xl font-medium mb-5">
                    Login or Signup to continue
                </p>
                <div className='flex justify-center items-center gap-5'>
                    <Link to="/login">
                        <Button type='button'> Login </Button>
                    </Link>
                    <Link to="/signup">
                        <Button type='button'>Signup</Button>
                    </Link>
                </div>
            </div>
        </div>
    )
}

export default LoginPopUp;