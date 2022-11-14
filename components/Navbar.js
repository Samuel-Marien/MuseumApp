import React, { useState } from 'react'

import Link from 'next/link'
import { motion } from 'framer-motion'

import { useAppContext } from '../context/appContext'
import useHasMounted from '../components/hooks/useHasMounted'
import Logo from './Logo'

import { MdAccountCircle, MdLogout, MdMenu } from 'react-icons/md'
import { IoIosAlbums, IoIosCalendar } from 'react-icons/io'

const MyLink = (props) => {
  const { href, icon, title } = props
  return (
    <li>
      <motion.div whileTap={{ scale: 0.9 }}>
        <Link href={href}>
          <a className="hover:text-gray-200 flex items-center space-x-2">
            <span>{icon}</span>
            <span className="hover:text-gray-200">{title}</span>
          </a>
        </Link>
      </motion.div>
    </li>
  )
}

const Navbar = () => {
  const { logoutUser, user } = useAppContext()
  const [show, setShow] = useState(false)

  const hasMounted = useHasMounted()
  if (!hasMounted) {
    return null
  }
  // console.log(user)

  return (
    <div>
      <div className="flex flex-wrap ">
        <nav className="flex justify-between bg-slate-800 text-white w-screen bg-opacity-40 backdrop-blur-sm">
          <div className="px-5 xl:px-8 py-3 flex w-full items-center">
            <Logo />

            <ul className="hidden md:flex px-4 mx-auto space-x-20">
              {user ? (
                <>
                  <MyLink
                    href="/collections/"
                    title="Collections"
                    icon={<IoIosAlbums />}
                  />
                  <MyLink
                    href="/exhibitions"
                    title="Exhibitions"
                    icon={<IoIosCalendar />}
                  />
                </>
              ) : (
                <p className="italic">
                  Discover a selection of unique and daring works
                </p>
              )}
            </ul>

            <div className="hidden md:flex items-center space-x-5">
              {user ? (
                <>
                  <p className="text-sm font-thin capitalize">{user.name}</p>
                  <motion.div whileTap={{ scale: 0.9 }}>
                    <button
                      onClick={logoutUser}
                      className="flex items-center hover:text-gray-200 text-xl border-slate-500 border rounded p-1"
                      href="/"
                    >
                      <MdLogout />

                      <span className="text-sm ml-2">Log out</span>
                    </button>
                  </motion.div>
                </>
              ) : (
                <motion.div whileTap={{ scale: 0.9 }}>
                  <Link href="/signup">
                    <a className="hover:text-gray-200 text-xl flex border-slate-500 border rounded p-1">
                      <MdAccountCircle />
                      <span className="text-sm ml-2">Sign up</span>
                    </a>
                  </Link>
                </motion.div>
              )}
            </div>
          </div>

          {/* Responsive navbar  */}
          <div className="my-auto h-full mr-6 md:hidden text-2xl flex items-center">
            <p className="text-sm font-thin capitalize mr-6">
              {user && user.name}
            </p>
            <motion.div whileTap={{ scale: 0.9 }}>
              <button
                onClick={() => (show ? setShow(false) : setShow(true))}
                className="pt-1 "
              >
                <MdMenu />
              </button>
            </motion.div>
          </div>
        </nav>
        {show && (
          <motion.div
            initial={{
              transform: 'translateX(-340px)',
              zIndex: 0
            }}
            animate={{
              transform: 'translateX(0px)',
              zIndex: 100
            }}
            transition={{
              duration: 1,
              delay: 0,
              ease: [0, 0.71, 0.2, 1.01]
            }}
          >
            <div
              className="md:hidden bg-slate-800  py-2 w-screen rounded-br-full text-slate-400
            bg-opacity-40 backdrop-blur-sm border-r border-slate-400 shadow-xl"
            >
              <ul className="flex flex-col justify-center pl-5 space-y-4 text-2xl">
                {user ? (
                  <>
                    <MyLink
                      href="/collections"
                      title="Collections"
                      icon={<IoIosAlbums />}
                    />
                    <MyLink
                      href="/exhibitions"
                      title="Exhibitions"
                      icon={<IoIosCalendar />}
                    />
                  </>
                ) : (
                  <p className="italic text-base">
                    Discover a selection of unique
                    <br /> and daring works.
                  </p>
                )}
                <div className="pt-5 space-y-1 pb-20">
                  {user ? (
                    <button type="button" className="" onClick={logoutUser}>
                      logout
                    </button>
                  ) : (
                    <MyLink
                      href="/signup"
                      title="Sign up"
                      icon={<MdAccountCircle />}
                    />
                  )}
                </div>
              </ul>
            </div>
          </motion.div>
        )}
      </div>
    </div>
  )
}

export default Navbar
