import React from 'react'
import Typed from 'react-typed'
import { motion, AnimatePresence } from 'framer-motion'

import Navbar from './Navbar'
import ScrollButton from './ScrollButton'
import MyButton from './MyButton'

const Landing = () => {
  return (
    <div
      className="h-screen "
      style={{
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        backgroundRepeat: 'no-repeat',
        backgroundImage: 'url(images/landing2.jpg)'
      }}
    >
      <Navbar />

      <div className="ml-10 flex flex-col text-9xl font-bold mt-48 text-slate-800 ">
        <div>
          <Typed strings={[' BrooKlyn ']} typeSpeed={250} />
        </div>
        <div className="font-thin text-slate-400">
          <Typed strings={[' Museum ']} typeSpeed={350} />
        </div>
        <div className="font-thin text-slate-300 text-2xl ml-2.5">
          <Typed
            strings={[
              'Discover the museum&apos;s collections.',
              'Sit quietly in your chair... It&apos;s Free.'
            ]}
            typeSpeed={100}
            backSpeed={100}
            loop
          />
        </div>
      </div>
      <div className=" ml-12 absolute bottom-72 ">
        <motion.div
          initial={{ opacity: 0, scale: 0.5 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{
            duration: 1,
            delay: 2.5,
            ease: [0, 0.71, 0.2, 1.01]
          }}
        >
          <div className="flex space-x-16">
            <MyButton title="Subscribe" />
            <MyButton title="Login" />
          </div>
        </motion.div>
      </div>

      <div className="ml-12  absolute bottom-5">
        <ScrollButton />
      </div>
    </div>
  )
}

export default Landing
