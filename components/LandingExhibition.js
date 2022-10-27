import React, { useEffect, useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { useScroll } from 'framer-motion'

import { useAppContext } from '../context/appContext'
import useHasMounted from '../components/hooks/useHasMounted'
import { getExhibition } from './API'

import MyButton from './MyButton'
import Card from './Card'

import { AiOutlineCloseCircle } from 'react-icons/ai'

const imageUrl = process.env.NEXT_PUBLIC_API_URL_IMAGE_EXHIBITION
const replacementImage = 'images/landing8.jpg'

const LandingExhibition = () => {
  const { user } = useAppContext()
  const { scrollY } = useScroll()
  const [animationStart, setAnimationStart] = useState(false)
  const [myExhibition, setMyExhibition] = useState([])
  const [modalIsOpen, setModalIsOpen] = useState(false)

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

  useEffect(() => {
    return scrollY.onChange((latest) => {
      return latest > 70 ? setAnimationStart(true) : setAnimationStart(false)
    })
  }, [])

  useEffect(() => {
    const response = async () => {
      const data = await getExhibition(8)
      setMyExhibition(data)
    }
    response()
  }, [])

  // console.log(myExhibition)

  const hasMounted = useHasMounted()
  if (!hasMounted) {
    return null
  }

  return (
    <div className="flex flex-col justify-between">
      <div className="container mx-auto">
        <div className="mt-10 mb-0 md:my-20 border-t-2 border-slate-200">
          {animationStart && (
            <motion.div
              initial={{ opacity: 0, scale: 0.5 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{
                duration: 1.5,
                delay: 0.3,
                ease: [0, 0.71, 0.2, 1.01]
              }}
            >
              <h1 className="bg-slate-100 text-2xl md:text-4xl font-thin text-slate-700 w-max mx-auto px-5 md:px-10 -translate-y-5 md:-translate-y-6">
                Our latest{' '}
                <span className="uppercase font-bold text-slate-600">
                  exhibitions
                </span>
              </h1>
            </motion.div>
          )}
        </div>

        <AnimatePresence>
          {modalIsOpen && (
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
                    onClick={() => setModalIsOpen(false)}
                  >
                    <button className="hover:text-pink-600 transition-all duration-300 hover:scale-y-105">
                      <AiOutlineCloseCircle />
                    </button>
                  </div>
                  <h5 className="text-center text-2xl font-black mb-3">
                    Join us!
                  </h5>
                </div>
                <div className="px-4 mt-3 text-center">
                  Register and enjoy all the features of the brooklin museum
                  website!
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
          )}
        </AnimatePresence>

        <div className="hidden md:grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-8 p-4 sm:p-0">
          {myExhibition &&
            myExhibition.map((item, index) => {
              if (index % 2 === 0) {
                return (
                  <div key={index}>
                    <AnimatePresence>
                      {animationStart && (
                        <motion.div
                          initial={{ y: 0, opacity: 0 }}
                          animate={{ y: [300, 0], opacity: 1 }}
                          exit={{ opacity: 0 }}
                          transition={{
                            duration: 1
                          }}
                        >
                          <Card
                            cardSize="18rem"
                            onClick={() => setModalIsOpen(true)}
                            isLoading={user}
                            id={item.id}
                            title={item.title}
                            text={item.organizing_department}
                            dateStart={item.start_date}
                            dateEnd={item.end_date}
                            myUrl={
                              item.primary_image
                                ? `${imageUrl}/size2/${item.primary_image}`
                                : replacementImage
                            }
                          />
                        </motion.div>
                      )}
                    </AnimatePresence>
                  </div>
                )
              } else {
                return (
                  <div key={index}>
                    <AnimatePresence>
                      {animationStart && (
                        <motion.div
                          initial={{ x: 0, opacity: 0 }}
                          animate={{ x: [300, 0], opacity: 1 }}
                          exit={{ opacity: 0 }}
                          transition={{
                            duration: 1
                          }}
                        >
                          <Card
                            cardSize="18rem"
                            onClick={() => setModalIsOpen(true)}
                            isLoading={user}
                            id={item.id}
                            title={item.title}
                            text={item.organizing_department}
                            dateStart={item.start_date}
                            dateEnd={item.end_date}
                            myUrl={
                              item.primary_image
                                ? `${imageUrl}/size2/${item.primary_image}`
                                : replacementImage
                            }
                          />
                        </motion.div>
                      )}
                    </AnimatePresence>
                  </div>
                )
              }
            })}
        </div>
        {/* cards for little device */}
        <div className="md:hidden grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-8 p-4 sm:p-0">
          {myExhibition &&
            myExhibition.map((item, index) => {
              if (index > 2) return
              return (
                <div key={index}>
                  <AnimatePresence>
                    {animationStart && (
                      <motion.div
                        initial={{ y: 0, opacity: 0 }}
                        animate={{ y: [200, 0], opacity: 1 }}
                        exit={{ opacity: 0 }}
                        transition={{
                          duration: 1
                        }}
                      >
                        <Card
                          cardSize="18rem"
                          onClick={() => setModalIsOpen(true)}
                          isLoading={user}
                          id={item.id}
                          title={item.title}
                          text={item.organizing_department}
                          dateStart={item.start_date}
                          dateEnd={item.end_date}
                          myUrl={
                            item.primary_image
                              ? `${imageUrl}/size2/${item.primary_image}`
                              : replacementImage
                          }
                        />
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>
              )
            })}
        </div>
        <div className="my-16 sm:my-32 w-max mx-auto">
          {user && <MyButton title="+ More exhibitions" href="/exhibitions" />}
        </div>
      </div>
    </div>
  )
}

export default LandingExhibition
