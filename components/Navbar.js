import React, { useState } from 'react'
import Link from 'next/link'
import { motion } from 'framer-motion'

import Logo from './Logo'

import { MdAccountCircle, MdLogout, MdMenu } from 'react-icons/md'
import {
  IoIosPeople,
  IoIosAlbums,
  IoIosCalendar,
  IoIosMail
} from 'react-icons/io'

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
  const [show, setShow] = useState(false)

  return (
    <div>
      <div className="flex flex-wrap ">
        <nav className="flex justify-between bg-slate-800 text-white w-screen bg-opacity-40 backdrop-blur-sm">
          <div className="px-5 xl:px-8 py-3 flex w-full items-center">
            <Logo />
            <ul className="hidden md:flex px-4 mx-auto space-x-20">
              <MyLink href="/" title="Artists" icon={<IoIosPeople />} />
              <MyLink href="/" title="Collections" icon={<IoIosAlbums />} />
              <MyLink href="/" title="Exhibition" icon={<IoIosCalendar />} />
            </ul>

            <div className="hidden md:flex items-center space-x-5">
              <motion.div whileTap={{ scale: 0.8 }}>
                <Link href="/signup">
                  <a className="hover:text-gray-200 text-xl">
                    <MdAccountCircle />
                  </a>
                </Link>
              </motion.div>
              <motion.div whileTap={{ scale: 0.8 }}>
                <a
                  className="flex items-center hover:text-gray-200 text-xl"
                  href="#"
                >
                  <IoIosMail />
                </a>
              </motion.div>
              <motion.div whileTap={{ scale: 0.8 }}>
                <a
                  className="flex items-center hover:text-gray-200 text-xl"
                  href="#"
                >
                  <MdLogout />
                </a>
              </motion.div>
            </div>
          </div>

          {/* Responsive navbar  */}
          <motion.div whileTap={{ scale: 0.9 }}>
            <button
              onClick={() => (show ? setShow(false) : setShow(true))}
              className=" my-auto h-full mr-6 md:hidden text-xl"
              href="#"
            >
              <MdMenu />
            </button>
          </motion.div>
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
                <MyLink href="/" title="Artists" icon={<IoIosPeople />} />
                <MyLink href="/" title="Collections" icon={<IoIosAlbums />} />
                <MyLink href="/" title="Exhibition" icon={<IoIosCalendar />} />
                <div className="pt-5 space-y-1 pb-20">
                  <MyLink href="/" title="Contact Me" icon={<IoIosMail />} />
                  <MyLink
                    href="/signup"
                    title="Sign up"
                    icon={<MdAccountCircle />}
                  />
                  <MyLink href="/" title="Logout" icon={<MdLogout />} />
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
