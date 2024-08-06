import React, { useState } from 'react'

function Edit({onCancel, onSave, initialContent}) {

    const [editedContent, setEditedContent] = useState(initialContent);

    return (
        <div className="w-full text-sm">
            {/* <input
                type='text'
                className="bg-[#222222] outline-none border-b w-3/4 p-2"
                value={editedContent}
                autoFocus
                onChange={(e) => setEditedContent(e.target.value)}
            /> */}
            <textarea
                autoFocus={true}
                value={editedContent} 
                onChange={(e) => {setEditedContent(e.target.value)}}
                className='w-full h-[90px] resize-none text-[16px] outline-none border bg-black overflow-y-auto p-1' 
            />
            <div className="space-x-4 mt-3 w-full inline-flex justify-end items-center">
                <button
                    className="hover:bg-white/20 py-2 px-4 font-medium rounded-3xl cursor-pointer"
                    onClick={onCancel}
                >
                    Cancel
                </button>
                <button
                    onClick={() => {onSave(editedContent)}}
                    className="hover:bg-white/20 py-2 px-4 font-medium rounded-3xl cursor-pointer"
                >
                    Save
                </button>
            </div>
        </div>
    )
}

export default Edit