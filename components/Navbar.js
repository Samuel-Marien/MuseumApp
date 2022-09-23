import React, { useState } from 'react'
import { motion } from 'framer-motion'

import { MdMuseum, MdAccountCircle, MdLogout, MdMenu } from 'react-icons/md'

const Navbar = () => {
  const [show, setShow] = useState(false)

  console.log(show)

  return (
    <div>
      <div className="flex flex-wrap ">
        <nav className="flex justify-between bg-slate-800 text-white w-screen bg-opacity-40 backdrop-blur-sm">
          <div className="px-5 xl:px-8 py-3 flex w-full items-center">
            <a
              className="text-xl md:text-3xl font-bold font-heading flex items-center border p-1 rounded bg-gray-900 shadow-xl"
              href="#"
            >
              <MdMuseum />
              BK<span className=" font-thin">m</span>
            </a>

            <ul className="hidden md:flex px-4 mx-auto font-semibold font-heading space-x-12">
              <li>
                <a className="hover:text-gray-200" href="#">
                  Home
                </a>
              </li>
              <li>
                <a className="hover:text-gray-200" href="#">
                  Artists
                </a>
              </li>
              <li>
                <a className="hover:text-gray-200" href="#">
                  Collections
                </a>
              </li>
              <li>
                <a className="hover:text-gray-200" href="#">
                  Exhibition
                </a>
              </li>
              <li>
                <a className="hover:text-gray-200" href="#">
                  Contact Me
                </a>
              </li>
            </ul>

            <div className="hidden md:flex items-center space-x-5">
              <motion.div whileTap={{ scale: 0.8 }}>
                <a className="hover:text-gray-200 text-xl" href="#">
                  <MdAccountCircle />
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
            <a
              className="md:hidden flex items-center h-full mr-6 text-xl"
              href="#"
            >
              <MdAccountCircle />
            </a>
          </motion.div>
          <motion.div whileTap={{ scale: 0.9 }}>
            <a
              className=" flex items-center h-full  mr-8 md:hidden text-xl"
              href="#"
            >
              <MdLogout />
            </a>
          </motion.div>

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
              opacity: 0,
              transform: 'translateY(-40px)'
            }}
            animate={{
              opacity: 1,
              transform: 'translateY(0px)'
            }}
            transition={{
              duration: 0.7,
              delay: 0,
              ease: [0, 0.71, 0.2, 1.01],
              repeatType: 'mirror'
            }}
          >
            <div className="md:hidden bg-slate-800 bg-opacity-10 backdrop-blur-sm py-2 text-slate-400">
              <ul className="flex justify-center w-screen text-sm font-heading space-x-6 ">
                <li>
                  <a className="hover:text-gray-200" href="#">
                    Artists
                  </a>
                </li>
                <li>
                  <a className="hover:text-gray-200" href="#">
                    Collections
                  </a>
                </li>
                <li>
                  <a className="hover:text-gray-200" href="#">
                    Exhibition
                  </a>
                </li>
                <li>
                  <a className="hover:text-gray-200" href="#">
                    Contact Me
                  </a>
                </li>
              </ul>
            </div>
          </motion.div>
        )}
      </div>
    </div>
  )
}

export default Navbar
