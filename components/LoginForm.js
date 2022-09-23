import React, { useState } from 'react'
import Link from 'next/link'
import { Formik, Form, useField } from 'formik'
import * as Yup from 'yup'
import { motion } from 'framer-motion'

const MyTextInput = ({ label, ...props }) => {
  const [field, meta] = useField(props)
  return (
    <>
      <label htmlFor={props.id || props.name} className="mt-3">
        {label}
      </label>
      <input className="text-input border p-1" {...field} {...props} />

      {meta.touched && meta.error ? (
        <div className="error border border-red-500  mt-1 p-1 text-center text-red-400 bg-red-100">
          {meta.error}
        </div>
      ) : null}
    </>
  )
}

const LoginForm = () => {
  const [signInState, setSignInState] = useState([])
  console.log(signInState)
  return (
    <Formik
      initialValues={{
        email: '',
        password: ''
      }}
      validationSchema={Yup.object({
        email: Yup.string().email('Invalid email address').required('Required'),
        password: Yup.string().required('Required')
      })}
      onSubmit={(values, { setSubmitting, resetForm }) => {
        setSignInState(() => [
          {
            email: values.email,
            password: values.password
          }
        ])
        resetForm()
        setSubmitting(false)
      }}
    >
      <Form className="p-5 flex flex-col text-slate-300 md:text-slate-700">
        <h1 className="text-center my-2 font-bold uppercase text-3xl">Login</h1>

        <MyTextInput
          label="Email"
          name="email"
          type="email"
          placeholder="jane@Doe.com"
        />

        <MyTextInput label="Password" name="password" type="password" />

        <motion.div whileTap={{ scale: 0.9 }}>
          <button
            type="submit"
            className="rounded mt-4 shadow p-2 px-4 bg-slate-700 text-slate-300 hover:shadow-sm hover:bg-slate-300 hover:text-slate-700
          transition-colors duration-500 w-full"
          >
            Soumettre
          </button>
        </motion.div>

        <div className="mt-3 text-sm underline">
          <Link href="/signup">
            <a>Pas encore de compte ?</a>
          </Link>
        </div>
      </Form>
    </Formik>
  )
}

export default LoginForm
