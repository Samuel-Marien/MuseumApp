import React, { useState } from 'react'
// import { useEffect } from 'react'
import { Formik, Form } from 'formik'
import * as Yup from 'yup'
import { object } from 'yup'
import { motion } from 'framer-motion'

import { useAppContext } from '../context/appContext'

import MyTextInput from '../components/MyTextInput'

const RegisterValidation = object().shape({
  name: Yup.string()
    .min(3, 'Your name is too short.')
    .max(20, 'Must be 20 characters or less')
    .required('Required'),
  email: Yup.string().email('Invalid email address').required('Required'),
  lastName: Yup.string()
    .min(3, 'Your last name is too short.')
    .max(20, 'Must be 20 characters or less'),
  location: Yup.string()
    .min(2, 'Your name location is too short.')
    .max(40, 'Must be 40 characters or less')
})

const ProfileForm = () => {
  const { user, updateUser, alertText, alertType } = useAppContext()
  const [name, setName] = useState(user?.name)
  const [email, setEmail] = useState(user?.email)
  const [lastName, setLastName] = useState(user?.lastName)
  const [location, setLocation] = useState(user?.location)

  // console.log(user?.location)

  // useEffect(() => {
  //   setLocation(user?.location)
  // }, [user])

  return (
    <>
      <Formik
        initialValues={{
          name: name,
          email: email,
          lastName: lastName,
          location: location
        }}
        validationSchema={RegisterValidation}
        onSubmit={(values, { setSubmitting, resetForm }) => {
          if (
            !values.name ||
            !values.email ||
            !values.lastName ||
            !values.location
          ) {
            return
          }
          updateUser({
            name: values.name,
            email: values.email,
            lastName: values.lastName,
            location: values.location
          })
          // resetForm()
          setSubmitting(false)
        }}
      >
        {({ isSubmitting, isValid, dirty }) => (
          <Form className="p-5 flex flex-col text-slate-300 md:text-slate-700">
            <h1 className="text-center my-2 font-bold uppercase text-3xl">
              Profile
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

            <MyTextInput label="Name" name="name" type="text" />
            <MyTextInput label="Email" name="email" type="email" />
            <MyTextInput label="LastName" name="lastName" type="text" />
            <MyTextInput label="Location" name="location" type="text" />

            {isSubmitting || !isValid || !dirty ? (
              <div className="rounded mt-4 border p-2 px-4 text-center text-slate-500 font-semibold w-full bg-opacity-50 cursor-not-allowed">
                Waiting for change...
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
          </Form>
        )}
      </Formik>
    </>
  )
}

export default ProfileForm
