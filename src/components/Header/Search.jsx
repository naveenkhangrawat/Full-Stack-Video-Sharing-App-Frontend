import React, { useState } from 'react'
import {IoIosSearch} from "../../utils/icons/icons";
import { useNavigate } from 'react-router-dom';

function Search({setSearchPopUp}) {

    const [searchQuery, setSearchQuery] = useState("");

    const navigate = useNavigate();

    function searchQueryHandler(event){
        if(searchQuery?.trim() && (event.key === "Enter")){
            navigate(`/search/${searchQuery}`);
            event.target.blur();
            setSearchPopUp(false);
        }
    }

    function searchButtonHandler(){
        if(searchQuery?.trim()){
            navigate(`/search/${searchQuery}`);
            setSearchPopUp(false);
        }
    }

    return (
        <>
            <div className='group flex items-center'>
                <div className='flex h-10 border border-[#504f4f] rounded-l-3xl group-focus-within:border-blue-500 md:h-10 md:ml-10 md:pl-5 md:group-focus-within:ml-5 md:group-focus-within:pl-0'>
                    <div className='w-10 items-center justify-center hidden group-focus-within:md:flex'>
                        <IoIosSearch className='text-white text-xl' />
                    </div>
                    <input 
                        type="text"
                        placeholder='Search'    
                        className='bg-transparent outline-none text-white pl-5 pr-5 md:pl-0 w-[350px] sm:w-44 md:w-64 group-focus-within:md:pl-0 lg:w-[500px]'
                        value={searchQuery}
                        onChange={(event) => setSearchQuery(event.target.value)}
                        onKeyUp={searchQueryHandler}
                    />
                </div>
                <button 
                    type="button" 
                    className='flex items-center justify-center w-[40px] h-10 md:w-[60px] md:h-10 border border-l-0 border-[#303030] rounded-r-3xl bg-white/[0.1]'
                    onClick={searchButtonHandler}
                >
                    <IoIosSearch className='text-white text-2xl' />
                </button>
            </div>
        </>
    )
}

export default Search