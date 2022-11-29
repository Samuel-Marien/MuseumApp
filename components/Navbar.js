import React, { useState } from 'react'
import Link from 'next/link'
import { motion } from 'framer-motion'

import { useAppContext } from '../context/appContext'
import useHasMounted from '../components/hooks/useHasMounted'
import Logo from './Logo'

import {
  MdAccountCircle,
  MdLogout,
  MdMenu,
  MdCollections
} from 'react-icons/md'
import { IoIosAlbums, IoIosCalendar } from 'react-icons/io'
import { FaCog } from 'react-icons/fa'

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
  const [showCollectionsMenu, setShowCollectionsMenu] = useState(false)

  const hasMounted = useHasMounted()
  if (!hasMounted) {
    return null
  }

  const myMenu = [
    {
      title: 'American Art',
      id: 9
    },
    {
      title: 'Arts of Africa',
      id: 21
    },
    {
      title: 'Arts of the Americas',
      id: 10
    },
    {
      title: 'Arts of the Islamic World',
      id: 20
    },
    {
      title: 'Arts of the Pacific Islands',
      id: 23
    },
    {
      title: 'Asian Art',
      id: 2
    },
    {
      title: 'Contemporary Art',
      id: 8
    },
    {
      title: 'Decorative Arts',
      id: 4
    },
    {
      title: 'Egyptian, Classical Art',
      id: 5
    },
    {
      title: 'E.A. Sackler Feminist Art',
      id: 22
    },
    {
      title: 'European Art',
      id: 7
    },
    {
      title: 'Photography',
      id: 3
    }
  ]

  return (
    <div>
      <div className="flex flex-wrap ">
        <nav className="flex justify-between bg-slate-800 text-white w-screen bg-opacity-40 backdrop-blur-sm">
          <div className="px-5 xl:px-8 py-3 flex justify-between w-full items-center">
            <Logo />

            <ul className="hidden md:flex space-x-10 pl-16 ">
              {user ? (
                <>
                  {/* <MyLink
                    href="/collections/"
                    title="Collections"
                    icon={<IoIosAlbums />}
                  /> */}
                  <li>
                    <motion.div whileTap={{ scale: 0.9 }}>
                      <button
                        onClick={() =>
                          showCollectionsMenu
                            ? setShowCollectionsMenu(false)
                            : setShowCollectionsMenu(true)
                        }
                      >
                        <a className="hover:text-gray-200 flex items-center space-x-2">
                          <span>
                            <IoIosAlbums />
                          </span>
                          <span className="hover:text-gray-200">
                            Collections
                          </span>
                        </a>
                      </button>
                    </motion.div>
                  </li>
                  <MyLink
                    href="/exhibitions"
                    title="Exhibitions"
                    icon={<IoIosCalendar />}
                  />
                  <MyLink
                    href="/userCollection"
                    title="My Arts"
                    icon={<MdCollections />}
                  />
                </>
              ) : (
                <p className="italic">
                  Discover a selection of unique and daring works
                </p>
              )}
            </ul>

            <div className="hidden md:flex items-center space-x-3">
              {user ? (
                <>
                  <p className="text-sm font-thin capitalize">{user.name}</p>
                  <motion.div whileTap={{ scale: 0.9 }}>
                    <Link href="profile">
                      <a className="flex items-center hover:text-gray-200 text-xl ">
                        <FaCog />
                      </a>
                    </Link>
                  </motion.div>
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
                    <MyLink
                      href="/userCollection"
                      title="My Arts"
                      icon={<MdCollections />}
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
                    <>
                      <motion.div whileTap={{ scale: 0.9 }}>
                        <Link href="profile">
                          <a className="flex items-center hover:text-gray-200 text-xl ">
                            <FaCog />
                            <span className="ml-2 capitalize">Profile</span>
                          </a>
                        </Link>
                      </motion.div>
                      <motion.div whileTap={{ scale: 0.9 }}>
                        <button
                          onClick={logoutUser}
                          className="mt-5 flex items-center hover:text-gray-200 text-xl border-slate-500 border rounded p-1"
                          href="/"
                        >
                          <MdLogout />

                          <span className="text-sm ml-2">Log out</span>
                        </button>
                      </motion.div>
                    </>
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
      {showCollectionsMenu && (
        <div className="hidden md:flex justify-center w-full rounded-lg ">
          <motion.div
            initial={{ opacity: 0, scale: 0.9, x: -180 }}
            animate={{ opacity: 1, scale: 1, zIndex: 100, x: -190 }}
            transition={{
              duration: 0.3
            }}
          >
            <ul className="absolute w-max text-slate-300  backdrop-blur-sm">
              {myMenu.map((item) => {
                return (
                  <li
                    key={item.id}
                    className="py-1 px-4 w-56 bg-slate-800 bg-opacity-40 hover:border-r-2 hover:bg-opacity-80 hover:font-semibold hover:text-slate-200 transition-all duration-200"
                  >
                    <Link
                      href={{
                        pathname: '/collections/',
                        query: { id: item.id }
                      }}
                    >
                      {item.title}
                    </Link>
                  </li>
                )
              })}
            </ul>
          </motion.div>
        </div>
      )}
    </div>
  )
}

export default Navbar
