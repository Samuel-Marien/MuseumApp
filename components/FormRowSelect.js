import React from 'react'

const FormRowSelect = (props) => {
  const { labelText, name, value, onChange, list, inputClassName, classNames } =
    props
  return (
    <div className="flex items-center">
      <label
        htmlFor="jobType"
        className={`text-xl mr-2 text-slate-200 ${classNames}`}
      >
        {labelText || name}
      </label>

      <select
        name={name}
        value={value}
        onChange={onChange}
        className={inputClassName}
      >
        {list.map((itemValue, index) => {
          return (
            <option key={index} value={itemValue}>
              {itemValue.slice(0, 20)}
            </option>
          )
        })}
      </select>
    </div>
  )
}

export default FormRowSelect
