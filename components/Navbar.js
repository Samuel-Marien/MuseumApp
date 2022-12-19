import { useState, useRef } from 'react'
import Link from 'next/link'
import { motion } from 'framer-motion'

import { useAppContext } from '../context/appContext'
import useHasMounted from '../components/hooks/useHasMounted'
import useOnClickOutside from '../components/hooks/useOnClickOutside'
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
            <span className="text-sm">{icon}</span>
            <span className="hover:text-gray-200">{title}</span>
          </a>
        </Link>
      </motion.div>
    </li>
  )
}

const Navbar = (props) => {
  const ref = useRef()
  const ref2 = useRef()
  const ref3 = useRef()
  const { logoutUser, user } = useAppContext()
  const [show, setShow] = useState(false)
  const [showCollectionsMenu, setShowCollectionsMenu] = useState(false)
  const [showDropDown, setShowDropDown] = useState(false)

  useOnClickOutside(ref, () => {
    if (showCollectionsMenu) setShowCollectionsMenu(false)
  })
  useOnClickOutside(ref2, () => {
    if (showDropDown) setShowDropDown(false)
  })
  useOnClickOutside(ref3, () => {
    if (show) setShow(false)
  })

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
                  <li>
                    <motion.div whileTap={{ scale: 0.9 }}>
                      <button
                        onClick={() =>
                          showCollectionsMenu
                            ? setShowCollectionsMenu(false)
                            : setShowCollectionsMenu(true)
                        }
                      >
                        <p className="hover:text-gray-200 flex items-center space-x-2">
                          <span className="text-sm">
                            <IoIosAlbums />
                          </span>
                          <span className="hover:text-gray-200">
                            Collections
                          </span>
                        </p>
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

            <div ref={ref2} className="hidden md:flex items-center space-x-3">
              {user ? (
                <div>
                  <button
                    onClick={() =>
                      showDropDown
                        ? setShowDropDown(false)
                        : setShowDropDown(true)
                    }
                    className="flex items-center hover:text-gray-200 text-xl border-slate-500 border rounded py-1 px-1"
                    href="/"
                  >
                    <span className="text-sm font-thin capitalize">
                      {user.name}
                    </span>
                  </button>
                  {showDropDown && (
                    <motion.div
                      initial={{ opacity: 0.6, scale: 0.9, y: -20, x: -100 }}
                      animate={{ opacity: 1, scale: 1, y: 5 }}
                      transition={{
                        duration: 0.3
                      }}
                    >
                      <div className="absolute mt-2 w-44 shadow-lg bg-white">
                        <Link href="/userCollection">
                          <a className="flex items-center text-slate-800 w-full px-2 py-1 pt-2 text-sm hover:bg-slate-800 hover:text-slate-200 transition-all duration-300 hover:font-bold">
                            <span className="mr-1">
                              <MdCollections />
                            </span>{' '}
                            My Arts
                          </a>
                        </Link>

                        <Link href="/profile">
                          <a className="flex items-center text-slate-800 w-full px-2 py-1 text-sm hover:bg-slate-800 hover:text-slate-200 transition-all duration-300 hover:font-bold">
                            <span className="mr-1">
                              <FaCog />
                            </span>
                            Account settings
                          </a>
                        </Link>

                        <button
                          onClick={logoutUser}
                          className="flex items-center text-slate-800 w-full px-2 py-1 pb-2 text-sm hover:bg-slate-800 hover:text-slate-200 transition-all duration-300 hover:font-bold"
                        >
                          <span className="mr-1">
                            <MdLogout />
                          </span>
                          Log out
                        </button>
                      </div>
                    </motion.div>
                  )}
                </div>
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
          <div className="my-auto h-full mr-3 md:hidden text-2xl flex items-center">
            <p className="text-sm font-thin capitalize mr-3">
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
              ease: [0, 0.71, 0.2, 1.01]
            }}
          >
            <div
              ref={ref3}
              className=" pt-3 px-2 md:hidden bg-slate-400 w-64 rounded-br-2xl border-b border-slate-600 text-slate-800
            bg-opacity-40 backdrop-blur-md shadow-xl"
            >
              <ul className=" pl-1 text-xl">
                {user ? (
                  <>
                    <p className="hover:text-gray-200 flex items-center space-x-2">
                      <span className="text-sm">
                        <IoIosAlbums />
                      </span>
                      <span className="hover:text-gray-200">Collections</span>
                    </p>
                    <ul className="ml-3">
                      {myMenu.map((item) => {
                        return (
                          <Link
                            key={item.id}
                            href={{
                              pathname: '/collections/',
                              query: { id: item.id }
                            }}
                          >
                            <motion.div
                              whileTap={{
                                scale: 1.05,
                                x: 10
                              }}
                            >
                              <li
                                onClick={() => setShow(false)}
                                key={item.id}
                                className="text-sm py-0.5"
                              >
                                {item.title}
                              </li>
                            </motion.div>
                          </Link>
                        )
                      })}
                    </ul>
                    <div className="mt-3 pt-1 border-t border-slate-600">
                      <MyLink
                        href="/exhibitions"
                        title="Exhibitions"
                        icon={<IoIosCalendar />}
                      />
                    </div>

                    <div className="mt-3 pt-1 border-t border-slate-600">
                      <MyLink
                        href="/userCollection"
                        title="My Arts"
                        icon={<MdCollections />}
                      />
                    </div>
                  </>
                ) : (
                  <p className="italic text-base">
                    Discover a selection of unique
                    <br /> and daring works.
                  </p>
                )}
                <div className="space-y-1 pb-5">
                  {user ? (
                    <>
                      <motion.div whileTap={{ scale: 0.9 }}>
                        <Link href="profile">
                          <a className="flex items-center hover:text-gray-200 text-xl mt-3 pt-1 border-t border-slate-600">
                            <span className="text-sm">
                              <FaCog />
                            </span>
                            <span className="ml-2 capitalize">
                              Account settings
                            </span>
                          </a>
                        </Link>
                      </motion.div>
                      <motion.div whileTap={{ scale: 0.9 }}>
                        <button
                          onClick={logoutUser}
                          className="flex items-center hover:text-gray-200 text-base"
                        >
                          <MdLogout />

                          <span className="ml-1 capitalize text-xl">
                            Log out
                          </span>
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
        <div
          ref={ref}
          className="hidden md:flex justify-center w-full rounded-lg "
        >
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
                  <Link
                    key={item.id}
                    href={{
                      pathname: '/collections/',
                      query: { id: item.id }
                    }}
                  >
                    <li
                      onClick={() => setShowCollectionsMenu(false)}
                      key={item.id}
                      className=" cursor-pointer py-1 px-4 w-56 bg-slate-800 bg-opacity-40 hover:border-r-2 hover:bg-opacity-80 hover:font-semibold hover:text-slate-200 transition-all duration-200"
                    >
                      {item.title}
                    </li>
                  </Link>
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
