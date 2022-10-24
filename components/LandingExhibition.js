import React, { useEffect, useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { useScroll } from 'framer-motion'

import { getExhibition } from './API'

import MyButton from './MyButton'

import { MdEventAvailable, MdEventBusy } from 'react-icons/md'

const imageUrl = process.env.NEXT_PUBLIC_API_URL_IMAGE_EXHIBITION
const replacementImage = 'images/landing8.jpg'

const Card = (props) => {
  const { title, text, myUrl, dateStart, dateEnd } = props
  return (
    <div className="bg-white shadow-lg cursor-pointer hover:shadow-sm transition-all duration-500 rounded flex flex-col p-3 md:p-0">
      <div className="overflow-hidden ">
        <img
          style={{ width: '100%', height: '18rem' }}
          src={myUrl}
          alt={title}
          className="hover:scale-110 transition-all duration-500"
        />
      </div>
      <div className="p-4">
        <div className="flex justify-between">
          <p className="text-sm flex items-center">
            <span className="text-base text-slate-500">
              <MdEventAvailable />
            </span>
            {dateStart}
          </p>
          <p className="text-sm flex items-center">
            <span className="text-base text-slate-500">
              <MdEventBusy />
            </span>

            {dateEnd}
          </p>
        </div>
        <p className="text-slate-500 my-2">{text}</p>
        <h1 className="text-2xl font-bold mt-5">{title}</h1>
      </div>
    </div>
  )
}

const LandingExhibition = () => {
  const { scrollY } = useScroll()
  const [animationStart, setAnimationStart] = useState(false)
  const [myExhibition, setMyExhibition] = useState([])

  useEffect(() => {
    return scrollY.onChange((latest) => {
      return latest > 70 ? setAnimationStart(true) : setAnimationStart(false)
    })
  }, [])

  useEffect(() => {
    const response = async () => {
      const data = await getExhibition()
      setMyExhibition(data)
    }
    response()
  }, [])

  // console.log(myExhibition)

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
                            // key={index}
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
          <MyButton title="+ More exhibitions" href="/" />
        </div>
      </div>
    </div>
  )
}

export default LandingExhibition
