import React from 'react'

import Navbar from './Navbar'

const Landing = () => {
  return (
    <div
      className="h-screen"
      style={{
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        backgroundRepeat: 'no-repeat',
        backgroundImage: 'url(images/landing2.jpg)'
      }}
    >
      <Navbar />
      <div className="flex text-9xl font-bold h-80 mt-96 items-end pl-48 ">
        <div className="">
          <p className="text-slate-900">BrooKlin</p>
          <p className="font-thin  text-slate-400 tracking-widest">Museum</p>
        </div>
      </div>
    </div>
  )
}

export default Landing
