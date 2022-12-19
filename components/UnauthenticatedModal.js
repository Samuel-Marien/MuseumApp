import React from 'react'
import { motion, AnimatePresence } from 'framer-motion'

import { AiOutlineCloseCircle } from 'react-icons/ai'

import MyButton from './MyButton'

const UnauthenticatedModal = (props) => {
  const { onClick } = props

  const overlayVariants = {
    visible: {
      opacity: 1,
      transition: {
        when: 'beforeChildren',
        duration: 0.3,
        delayChildren: 0.4
      }
    },
    hidden: {
      opacity: 0,
      transition: {
        when: 'afterChildren',
        duration: 0.3,
        delay: 0.4
      }
    }
  }

  return (
    <AnimatePresence>
      <motion.div
        initial="hidden"
        animate="visible"
        exit="hidden"
        variants={overlayVariants}
        className=" fixed top-0 left-0 right-0 bottom-0 bg-slate-200 flex justify-center items-center bg-opacity-80 z-10"
      >
        <motion.div
          style={{ maxWidth: '500px' }}
          className="w-11/12 bg-slate-100 rounded shadow-2xl"
          initial={{ y: '100vh' }}
          animate={{ y: 0 }}
          exit={{ y: '100vh' }}
          transition={{ duration: 0.5 }}
        >
          <div className="border-b ">
            <div
              className="p-1 w-full flex justify-end text-pink-900 text-xl "
              onClick={onClick}
            >
              <button className="hover:text-pink-600 transition-all duration-300 hover:scale-y-105">
                <AiOutlineCloseCircle />
              </button>
            </div>
            <h5 className="text-center text-2xl font-black mb-3">Join us!</h5>
          </div>
          <div className="px-4 mt-3 text-center">
            Register and enjoy all the features of the brooklin museum website!
          </div>
          <div className="">
            <div className="flex flex-col lg:flex-row lg:space-x-16 space-y-5 lg:space-y-0 items-center md:mx-0 justify-center my-5">
              <motion.div whileTap={{ scale: 0.9 }}>
                <MyButton title="Sign up" href="/signup" />
              </motion.div>
              <motion.div whileTap={{ scale: 0.9 }}>
                <MyButton title="Login" href="/login" />
              </motion.div>
            </div>
          </div>
        </motion.div>
      </motion.div>
    </AnimatePresence>
  )
}

export default UnauthenticatedModal
