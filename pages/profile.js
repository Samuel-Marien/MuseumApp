import React from 'react'
import Link from 'next/link'

import ProfileForm from '../components/ProfileForm'
import Logo from '../components/Logo'
import { MdHomeFilled } from 'react-icons/md'

const profile = () => {
  return (
    <div
      className="h-screen "
      style={{
        background: ' url(images/landing101.png)',
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
          <ProfileForm />
        </div>
      </div>
    </div>
  )
}

export default profile