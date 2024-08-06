import React from 'react'
import { useId } from 'react'

function Input({
    label,
    type = "text",
    className = "",
    ...props
}, ref) {

    const id = useId();

    return (
        <div className={`relative z-0 w-full group ${className}`}>
            <input 
                type={type}
                placeholder=""
                className={`block py-2.5 px-0 w-full text-lg bg-transparent border-0 border-b-2  appearance-none text-white border-gray-600 focus:border-blue-500 focus:outline-none focus:ring-0 peer`}
                id={id}
                ref={ref} 
                {...props}
            />
            <label htmlFor={id} className="peer-focus:font-medium absolute text-base text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:start-0 rtl:peer-focus:translate-x-1/4 rtl:peer-focus:left-auto peer-focus:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-90 peer-focus:-translate-y-6">
                {label}
            </label>
        </div>
    )
}

export default React.forwardRef(Input);

