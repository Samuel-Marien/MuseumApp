import React, { useEffect, useState } from 'react'
import Link from 'next/link'
import { motion, AnimatePresence } from 'framer-motion'
import { useScroll } from 'framer-motion'

import { getCollection } from './API'
import { useAppContext } from '../context/appContext'

import MyButton from './MyButton'
import UnauthenticatedModal from './UnauthenticatedModal'

let imageUrl = process.env.NEXT_PUBLIC_API_URL_IMAGE
const replacementImage = 'images/landing8.jpg'

const Card = (props) => {
  const { name, imageUrl, id, userConnected, onClick } = props

  return (
    <>
      {userConnected ? (
        <Link
          href={{
            pathname: '/collections',
            query: { id }
          }}
        >
          <div className="flex flex-col items-center cursor-pointer p-1 pt-4 rounded shadow-lg hover:shadow-none transition-all duration-500">
            <div className="overflow-hidden ">
              <img
                src={imageUrl}
                alt={name}
                style={{ width: '150px', height: '180px' }}
                className="hover:scale-110 transition-all duration-500"
              />
            </div>
            <h1 className="text-sm text-center font-semibold mt-2">{name}</h1>
          </div>
        </Link>
      ) : (
        <div
          onClick={onClick}
          className="flex flex-col items-center cursor-pointer p-1 pt-4 rounded shadow-lg hover:shadow-none transition-all duration-500"
        >
          <div className="overflow-hidden ">
            <img
              src={imageUrl}
              alt={name}
              style={{ width: '150px', height: '180px' }}
              className="hover:scale-110 transition-all duration-500"
            />
          </div>
          <h1 className="text-sm text-center font-semibold mt-2">{name}</h1>
        </div>
      )}
    </>
  )
}

const LandingCollections = () => {
  const { user } = useAppContext()
  const { scrollY } = useScroll()
  const [myCollection, setMyCollection] = useState([])
  const [animationStart, setAnimationStart] = useState(false)
  const [animationButtonStart, setAnimationButtonStart] = useState(false)
  const [modalIsOpen, setModalIsOpen] = useState(false)

  useEffect(() => {
    return scrollY.onChange((latest) => {
      return latest > 1500 ? setAnimationStart(true) : setAnimationStart(false)
    })
  }, [])

  useEffect(() => {
    return scrollY.onChange((latest) => {
      return latest > 1700
        ? setAnimationButtonStart(true)
        : setAnimationButtonStart(false)
    })
  }, [])

  useEffect(() => {
    try {
      getCollection().then((coll) => setMyCollection(coll.data.data))
    } catch (error) {
      console.log(error)
    }
  }, [])

  // console.log(myCollection)

  return (
    <div className="flex flex-col bg-white pb-20">
      <div className="container mx-auto">
        <div className="lg:my-20 lg:border-t-2 border-slate-200">
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
              <h1 className="bg-white rounded-3xl text-2xl md:text-4xl font-thin text-slate-700 w-max mx-auto px-10 -translate-y-5 md:-translate-y-6 lg:pt-0 pt-4">
                Discover our{' '}
                <span className="uppercase font-bold text-slate-600">
                  collections
                </span>
              </h1>
            </motion.div>
          )}
        </div>

        {modalIsOpen && (
          <UnauthenticatedModal onClick={() => setModalIsOpen(false)} />
        )}

        <div className="grid grid-cols-1 lg:grid-cols-2">
          <div className="text-slate-500">
            <div className="w-12/12 lg:w-9/12 sm:my-10 text-xl font-thin p-4 lg:p-0 text-justify ">
              <p className=" first-letter:font-bold first-letter:text-3xl">
                Welcome to our collection online, where you’ll find a wealth of
                information about many of the objects in our rich holdings. We
                hope these pages will inspire you to explore further—both here
                and in our galleries.
              </p>
              <p className="mt-5 first-letter:font-bold first-letter:text-3xl">
                For a variety of reasons, including conservation concerns and
                the lending of works to other institutions, not all the objects
                illustrated here are on view at any one time. You can find the
                location of specific objects by accessing their individual
                records.
              </p>
              <p className="mt-5 first-letter:font-bold first-letter:text-3xl">
                Wander between our different universes and save the masterpieces
                you want to see again in your personal space and create your own
                collection of works of art.
              </p>
            </div>

            {!user && animationButtonStart && (
              <div className="px-4 w-12/12 lg:w-9/12 mt-12 mb-12 lg:mb-0 lg:mt-24 ">
                <motion.div
                  initial={{ opacity: 0, scale: 0.5 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{
                    duration: 1.5,
                    delay: 0.3,
                    ease: [0, 0.71, 0.2, 1.01]
                  }}
                >
                  <div className=" order-0 items-center active:scale-95 transition-all duration-300 shadow-lg hover:shadow-none">
                    <MyButton title="Join Us!" href="/signup" />
                  </div>
                </motion.div>
              </div>
            )}
          </div>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 p-4 sm:p-0">
            {myCollection.map((item) => {
              return (
                <div key={item.id}>
                  <AnimatePresence>
                    {animationButtonStart && (
                      <motion.div
                        initial={{ y: 0, opacity: 0 }}
                        animate={{ y: [100, 0], opacity: 1 }}
                        exit={{ opacity: 0 }}
                        transition={{
                          duration: 1.5
                        }}
                      >
                        <Card
                          onClick={() => !user && setModalIsOpen(true)}
                          userConnected={user}
                          id={item.id}
                          name={item.name}
                          imageUrl={
                            item.highlight_images[0] !== undefined
                              ? `${imageUrl}/size1/${item.highlight_images[8].primary_image}`
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
        </div>
      </div>
    </div>
  )
}

export default LandingCollections
