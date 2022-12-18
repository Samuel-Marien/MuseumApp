import React from 'react'
import Link from 'next/link'

import LoginForm from '../components/LoginForm'
import Logo from '../components/Logo'
import MyHeader from '../components/MyHeader'

import { MdHomeFilled } from 'react-icons/md'

const Login = () => {
  return (
    <>
      <MyHeader description="Login page" />
      <div
        className="h-screen "
        style={{
          background: ' url(images/landing5.jpg)',
          backgroundSize: 'cover',
          backgroundPosition: ' center',
          backgroundRepeat: 'no-repeat'
        }}
      >
        <div className="flex justify-between p-2 md:p-8">
          <Logo />
          <Link href="/">
            <a className="underline flex items-center text-slate-600">
              <span className="text-xl">
                <MdHomeFilled />
              </span>
              Home
            </a>
          </Link>
        </div>
        <div className="flex justify-center md:justify-end md:mr-36 md:pt-36">
          <div className="w-96 ">
            <LoginForm />
          </div>
        </div>
      </div>
    </>
  )
}

export default Login
