import React from 'react'

const MyButton = (props) => {
  const { title } = props
  return (
    <div
      className="border border-slate-500 rounded-3xl px-16 py-3 bg-slate-800 text-slate-300
       bg-opacity-60 hover:bg-opacity-100 hover:bg-slate-300 hover:text-slate-500 
    backdrop-blur-sm cursor-pointer transition-all duration-500"
    >
      {title}
    </div>
  )
}

export default MyButton
