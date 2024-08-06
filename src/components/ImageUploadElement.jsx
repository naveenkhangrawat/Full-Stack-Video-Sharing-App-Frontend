import React, { useId, useState } from 'react'
import { FaCamera } from "../utils/icons/icons";

function ImageUploadElement({
    className="",
    imgClassName="",
    img,
    ...props
}, ref) {

    const id = useId()

    const [inputFile, setInputFile] = useState(null);

    function onInputFileHandler(event){
        const imageURL = URL.createObjectURL(event.target.files[0]); 
        setInputFile(imageURL)
    }

    return (

        <div className="w-full h-full">
            <label 
                htmlFor={id}
                className={`cursor-pointer relative flex flex-col justify-center items-center group ${className}`}
            >

                {inputFile && (
                    <img src={inputFile} className={`w-full h-full object-cover ${imgClassName}`} />
                )}

                {(img && !inputFile) && (
                    <img src={img} className={`w-full h-full object-cover ${imgClassName}`} />
                )}
                
                
                {!inputFile && (
                    <div className='absolute group-hover:text-blue-500'>
                        <FaCamera size={25} />
                    </div>
                )}

                <input
                    id={id}
                    type="file"
                    accept='image/*'
                    className='hidden'
                    ref={ref}
                    onInput={onInputFileHandler}
                    {...props}
                />
            </label>
        </div>
    )
}

export default React.forwardRef(ImageUploadElement)