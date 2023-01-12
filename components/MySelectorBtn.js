import React from 'react'

const MySelectorBtn = (props) => {
  const { onClick, icon } = props
  return (
    <button
      className="border p-1 h-9 w-9 text-2xl text-slate-800 bg-slate-200 hover:text-slate-200  hover:bg-slate-800 transition-all duration-300 active:shadow-lg active:scale-110"
      onClick={onClick}
    >
      {icon}
    </button>
  )
}

export default MySelectorBtn
