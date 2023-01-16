import React from 'react'

const ApiSearchContainer = (props) => {
  const { forHl, forfull, forHistory } = props
  return (
    <div className="flex space-x-2 mb-5">
      <button onClick={forHl} className="border rounded p-1 ">
        Highlight
      </button>
      <button onClick={forfull} className="border rounded p-1 ">
        Full
      </button>
      <button onClick={forHistory} className="border rounded p-1 ">
        History
      </button>
    </div>
  )
}

export default ApiSearchContainer
