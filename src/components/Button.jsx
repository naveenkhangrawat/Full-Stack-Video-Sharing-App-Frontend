import React from 'react'

function Button({
    children,
    className="",
    type="button",
    ...props
}) {

    return (
        <button 
            type={type} 
            className={`text-white bg-gradient-to-r from-blue-500 via-blue-600 to-blue-700 hover:bg-gradient-to-br focus:outline-none font-medium rounded-lg text-base px-5 py-2.5 text-center active:ring-2 active:ring-blue-300 duration-100 ${className}`}
            {...props}
        >
            {children}
        </button>
    )
}

export default Button;