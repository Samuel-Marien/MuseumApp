import React from 'react'

import { MdMuseum, MdAccountCircle, MdLogout } from 'react-icons/md'

const Navbar = () => {
  return (
    <div>
      <div className="flex flex-wrap ">
        <nav className="flex justify-between bg-gray-800 text-white w-screen bg-opacity-60 backdrop-blur-sm">
          <div className="px-5 xl:px-8 py-3 flex w-full items-center">
            <a
              className="text-3xl font-bold font-heading flex items-center border p-1 rounded bg-gray-900 shadow-xl"
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

            <div className="hidden xl:flex items-center space-x-5">
              <a className="hover:text-gray-200" href="#">
                <MdAccountCircle />
              </a>
              <a className="flex items-center hover:text-gray-200" href="#">
                <MdLogout />
              </a>
            </div>
          </div>
          {/* Responsive navbar  */}
          <a className="xl:hidden flex mr-6 items-center" href="#">
            <MdAccountCircle />
          </a>
          <a className=" self-center mr-12 xl:hidden" href="#">
            {' '}
            <MdLogout />
          </a>
        </nav>
      </div>
    </div>
  )
}

export default Navbar
