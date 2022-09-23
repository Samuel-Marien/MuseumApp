import React from 'react'
import Link from 'next/link'

import { MdMuseum } from 'react-icons/md'

const Logo = () => {
  return (
    <Link href="/">
      <a
        className="text-xl text-slate-300 md:text-3xl font-bold font-heading flex items-center border p-1 rounded bg-gray-900 shadow-xl"
        href="#"
      >
        <MdMuseum />
        BK<span className=" font-thin">m</span>
      </a>
    </Link>
  )
}

export default Logo
