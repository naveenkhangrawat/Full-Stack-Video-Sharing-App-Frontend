import React from 'react'

function Loader() {
  return (
    <div className='load-bar fixed top-0 left-0 z-[100]'>
        <div className="bar"></div>
        <div className="bar"></div>
        <div className="bar"></div>
    </div>
  )
}

export default Loader;

