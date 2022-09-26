import React from 'react'
import { useField } from 'formik'

const MyTextInput = ({ label, ...props }) => {
  const [field, meta] = useField(props)
  return (
    <>
      <label htmlFor={props.id || props.name} className="mt-3">
        {label}
      </label>
      <input className="text-input border p-1" {...field} {...props} />

      {meta.touched && meta.error ? (
        <div className="error border border-red-500 mt-1 p-1 text-center text-red-400 bg-red-100">
          {meta.error}
        </div>
      ) : null}
    </>
  )
}

export default MyTextInput
