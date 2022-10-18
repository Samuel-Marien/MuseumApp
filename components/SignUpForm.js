import React, { useEffect } from 'react'
import { useRouter } from 'next/router'
import Link from 'next/link'
import { Formik, Form } from 'formik'
import * as Yup from 'yup'
import { object } from 'yup'
import { motion } from 'framer-motion'

import { useAppContext } from '../context/appContext'

import MyTextInput from './MyTextInput'

const RegisterValidation = object().shape({
  name: Yup.string()
    .min(3, 'Your name is too short.')
    .max(20, 'Must be 20 characters or less')
    .required('Required'),
  email: Yup.string().email('Invalid email address').required('Required'),
  password: Yup.string()
    .required('Required')
    .min(6, 'Your password is too short.'),
  passwordConfirmation: Yup.string().test(
    'passwords-match',
    'Passwords must match',
    function (value) {
      return this.parent.password === value
    }
  )
})

const SignupForm = () => {
  const router = useRouter()
  const { user, registerUser, alertText, alertType } = useAppContext()

  useEffect(() => {
    if (user) {
      setTimeout(() => {
        router.push('/')
      }, 3000)
    }
  }, [user, router])

  return (
    <Formik
      initialValues={{
        name: '',
        email: '',
        password: '',
        passwordConfirmation: ''
      }}
      validationSchema={RegisterValidation}
      onSubmit={(values, { setSubmitting, resetForm }) => {
        registerUser({
          name: values.name,
          email: values.email,
          password: values.password
        })
        resetForm()
        setSubmitting(false)
      }}
    >
      {({ isSubmitting, isValid, dirty }) => (
        <Form className="p-5 flex flex-col text-slate-300 md:text-slate-700">
          <h1 className="text-center my-2 font-bold uppercase text-3xl">
            Sign up
          </h1>
          {alertText && alertType === 'danger' && (
            <div className="error mt-1 p-1 text-center text-red-400 bg-red-100">
              {alertText}
            </div>
          )}
          {alertText && alertType === 'success' && (
            <div className="error mt-1 p-1 text-center text-green-400 bg-green-100">
              {alertText}
            </div>
          )}

          <MyTextInput
            label="Name"
            name="name"
            type="text"
            placeholder="Jane"
          />
          <MyTextInput
            label="Email"
            name="email"
            type="email"
            placeholder="jane@Doe.com"
          />
          <MyTextInput label="Password" name="password" type="password" />
          <MyTextInput
            label="Confirm Password"
            name="passwordConfirmation"
            type="password"
          />
          {isSubmitting || !isValid || !dirty ? (
            <div className="rounded mt-4 border p-2 px-4 text-center text-slate-500 font-semibold w-full bg-opacity-50 cursor-not-allowed">
              Please provide all values
            </div>
          ) : (
            <motion.div whileTap={{ scale: 0.9 }}>
              <button
                disabled={isSubmitting || !isValid || !dirty}
                type="submit"
                className="rounded mt-4 shadow p-2 px-4 bg-slate-700 text-slate-300 hover:shadow-sm hover:bg-slate-300 hover:text-slate-700
          transition-colors duration-500 w-full"
              >
                Submit
              </button>
            </motion.div>
          )}
          <div className="mt-3 text-sm underline">
            <Link href="/login">
              <a>Already registered?</a>
            </Link>
          </div>
        </Form>
      )}
    </Formik>
  )
}

export default SignupForm
