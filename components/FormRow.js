import React from 'react'

const FormRow = (props) => {
  const {
    type,
    name,
    value,
    onChange,
    labelText,
    checked,
    classNames,
    inputClassName
  } = props
  return (
    <div className="flex items-center">
      <label
        htmlFor={name}
        className={`text-xl mr-2 text-slate-200 ${classNames} `}
      >
        {labelText || name}
      </label>
      <input
        checked={checked}
        type={type}
        value={value}
        name={name}
        onChange={onChange}
        className={inputClassName}
      />
    </div>
  )
}

export default FormRow
