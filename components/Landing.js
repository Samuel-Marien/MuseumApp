import React from 'react'
import Typed from 'react-typed'
import { motion } from 'framer-motion'

import { useAppContext } from '../context/appContext'

import useHasMounted from '../components/hooks/useHasMounted'
import Navbar from './Navbar'
import ScrollButton from './ScrollButton'
import MyButton from './MyButton'

const Landing = () => {
  const { user } = useAppContext()

  // check l'hydration du premier rendu
  const hasMounted = useHasMounted()
  if (!hasMounted) {
    return null
  }

  return (
    <div
      className="h-screen "
      style={{
        background:
          'linear-gradient( rgba(0, 0, 0, 0.2), rgba(0, 0, 0, 0.5) ), url(images/landing8.jpg)',
        backgroundSize: 'cover',
        backgroundPosition: ' bottom',
        backgroundRepeat: 'no-repeat'
      }}
    >
      <Navbar />
      <div className=" z-0 ml-5 lg:ml-10 flex flex-col text-6xl sm:text-9xl font-bold mt-10 lg:mt-48 text-slate-800 absolute top-20 ">
        <div>
          <Typed strings={[' BrooKlyn ']} typeSpeed={250} />
        </div>
        <div className="font-thin text-slate-400">
          <Typed strings={[' Museum ']} typeSpeed={350} />
        </div>
        <div className="font-thin text-slate-300 text-base sm:text-2xl ml-2.5 ">
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
      {!user && (
        <div className="lg:pl-12 absolute bottom-36 lg:bottom-72 w-full ">
          <motion.div
            initial={{ opacity: 0, scale: 0.5 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{
              duration: 1.5,
              delay: 1.5,
              ease: [0, 0.71, 0.2, 1.01]
            }}
          >
            <div className="flex flex-col lg:flex-row lg:space-x-16 space-y-5 lg:space-y-0 items-center   md:mx-0 ">
              <motion.div whileTap={{ scale: 0.9 }}>
                <MyButton title="Sign up" href="/signup" />
              </motion.div>
              <motion.div whileTap={{ scale: 0.9 }}>
                <MyButton title="Login" href="/login" />
              </motion.div>
            </div>
          </motion.div>
        </div>
      )}
      <div className="ml-2 md:ml-12 absolute bottom-5">
        <ScrollButton />
      </div>
    </div>
  )
}

export default Landing
