import React, { useEffect } from 'react'
import { useRouter } from 'next/router'
import Link from 'next/link'

import { useAppContext } from '../context/appContext'

import ProfileForm from '../components/ProfileForm'
import Logo from '../components/Logo'
import MyHeader from '../components/MyHeader'

import { MdHomeFilled } from 'react-icons/md'

const profile = () => {
  const router = useRouter()
  const { user } = useAppContext()

  useEffect(() => {
    if (!user) {
      router.push('/login')
    }
  }, [user, router])

  return (
    <>
      <MyHeader description="Profile page" />
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
    </>
  )
}

export default profile
