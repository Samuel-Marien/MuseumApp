import React, { useEffect } from 'react'
import { useRouter } from 'next/router'
import Link from 'next/link'
import { Formik, Form } from 'formik'
import * as Yup from 'yup'
import { object } from 'yup'
import { motion } from 'framer-motion'

import { useAppContext } from '../context/appContext'

import MyTextInput from './MyTextInput'

const LoginValidation = object().shape({
  email: Yup.string().email('Invalid email address').required('Required'),
  password: Yup.string().required('Required')
})

const LoginForm = () => {
  const router = useRouter()

  const { user, isLoading, alertText, alertType, loginUser } = useAppContext()

  // console.log(user)

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
        email: '',
        password: ''
      }}
      validationSchema={LoginValidation}
      onSubmit={(values, { setSubmitting, resetForm }) => {
        const currentUser = { email: values.email, password: values.password }
        loginUser(currentUser)
        resetForm()
        setSubmitting(false)
      }}
    >
      <Form className="p-5 flex flex-col text-slate-300 md:text-slate-700">
        <h1 className="text-center my-2 font-bold uppercase text-3xl">Login</h1>
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
          label="Email"
          name="email"
          type="email"
          placeholder="jane@Doe.com"
        />

        <MyTextInput label="Password" name="password" type="password" />

        <motion.div whileTap={{ scale: 0.9 }}>
          <button
            disabled={isLoading}
            type="submit"
            className="rounded mt-4 shadow p-2 px-4 bg-slate-700 text-slate-300 hover:shadow-sm hover:bg-slate-300 hover:text-slate-700
          transition-colors duration-500 w-full"
          >
            Submit
          </button>
        </motion.div>

        <div className="mt-3 text-sm underline">
          <Link href="/signup">
            <a>No account yet?</a>
          </Link>
        </div>
      </Form>
    </Formik>
  )
}

export default LoginForm
