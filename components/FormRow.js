import React from 'react'

const FormRow = (props) => {
  const { type, name, value, onChange, labelText } = props
  return (
    <div className="flex items-center">
      <label htmlFor={name} className="text-xl mr-2 text-slate-200">
        {labelText || name}
      </label>
      <input
        type={type}
        value={value}
        name={name}
        onChange={onChange}
        className=""
      />
    </div>
  )
}

export default FormRow
