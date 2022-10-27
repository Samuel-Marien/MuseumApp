import React, { useEffect, useState } from 'react'
import { useRouter } from 'next/router'
import { motion, AnimatePresence } from 'framer-motion'

import { getOneExhibition } from '../../components/API'
import { useAppContext } from '../../context/appContext'
import useHasMounted from '../../components/hooks/useHasMounted'

import Navbar from '../../components/Navbar'

import {
  BsFillArrowLeftCircleFill,
  BsFillArrowRightCircleFill
} from 'react-icons/bs'

const MyItem = (props) => {
  const { itemUrl } = props
  return (
    <motion.img
      key={`https://${itemUrl}`}
      src={`https://${itemUrl}`}
      initial={{ x: 300, opacity: 0.6 }}
      animate={{
        x: 0,
        opacity: 1,
        transition: {
          opacity: { duration: 1.5 },
          x: { duration: 1 }
        }
      }}
      exit={{
        x: -300,
        opacity: 0
      }}
    />
  )
}

const Exhibition = () => {
  const { user } = useAppContext()
  const router = useRouter()
  const { id } = router.query
  const [myExhibition, setMyExhibition] = useState([])
  const [myCurrentImage, setMyCurrentImage] = useState(0)

  useEffect(() => {
    // router.isReady => fetch info on reload
    if (router.isReady) {
      const response = async () => {
        const data = await getOneExhibition(id)
        setMyExhibition(data)
      }
      response()
    }
    return function cleanup() {
      console.log('clean')
    }
  }, [router.isReady])

  console.log(myExhibition)

  const maxPlusImage = myExhibition.images && myExhibition.images.length

  const handlePlusImage = () => {
    return myCurrentImage === maxPlusImage - 1
      ? setMyCurrentImage(0)
      : setMyCurrentImage((myCurrentImage += 1))
  }

  const handleMinusImage = () => {
    return myCurrentImage === 0
      ? setMyCurrentImage(maxPlusImage - 1)
      : setMyCurrentImage((myCurrentImage -= 1))
  }

  const hasMounted = useHasMounted()
  if (!hasMounted) {
    return null
  }

  return (
    <div
      className="text-slate-700 h-screen"
      style={{
        background: 'url(../images/landing42.png)',
        backgroundSize: 'cover',
        backgroundPosition: ' bottom',
        backgroundRepeat: 'no-repeat'
      }}
    >
      <Navbar user={user} />
      <div className="text-2xl md:text-4xl font-black text-center mt-4 text-slate-400">
        {myExhibition.title}
      </div>
      <div className="text-base md:text-xl font-thin my-2 text-center text-slate-400">
        <p>{myExhibition.display_date}</p>
      </div>
      <div className="text-base md:text-xl font-semibold text-slate-500 my-2 text-center">
        {myExhibition.organizing_department}
      </div>

      {/* large screens */}
      <div
        style={{ minHeight: '600px', minWidth: '800px' }}
        className="hidden  mx-auto md:flex justify-center mt-5 overflow-hidden w-max p-2 rounded shadow-xl "
      >
        {myExhibition.images && (
          <AnimatePresence>
            <MyItem
              itemUrl={`${
                myExhibition.images[myCurrentImage] &&
                myExhibition.images[myCurrentImage].largest_derivative_url
              }`}
            />
          </AnimatePresence>
        )}
      </div>

      {/* little screen device  */}
      <div
        style={{ minHeight: '300px' }}
        className="md:hidden mx-auto flex justify-center mt-5 overflow-hidden  w-full p-2 rounded shadow-xl"
      >
        {myExhibition.images && (
          <AnimatePresence>
            <MyItem
              itemUrl={`${
                myExhibition.images[myCurrentImage] &&
                myExhibition.images[myCurrentImage].largest_derivative_url
              }`}
            />
          </AnimatePresence>
        )}
      </div>

      <div className="w-full flex justify-center md:space-x-48 space-x-10 mt-5">
        <button
          className="text-3xl hover:scale-105 hover:text-slate-400 active:text-slate-500 active:scale-95 transition-all duration-300"
          onClick={handleMinusImage}
        >
          <BsFillArrowLeftCircleFill />
        </button>
        <p>
          {myCurrentImage + 1}/{maxPlusImage}
        </p>
        <button
          className="text-3xl hover:scale-105 hover:text-slate-400 active:text-slate-500 active:scale-95 transition-all duration-300"
          onClick={handlePlusImage}
        >
          <BsFillArrowRightCircleFill />
        </button>
      </div>

      {myExhibition.images && (
        <div className="mt-5 text-center w-11/12 md:w-10/12 lg:w-8/12 xl:w-5/12 p-1 px-5 mx-auto  justify-between">
          <p className="font-semibold text-base md:text-xl ">
            {myExhibition.images[myCurrentImage] &&
              myExhibition.images[myCurrentImage].caption}
          </p>
          <p className="italic text-slate-400 mt-1 text-sm md:text-base">
            {myExhibition.images[myCurrentImage] &&
              myExhibition.images[myCurrentImage].citation}
          </p>
          <p className="font-semibold">
            {myExhibition.images[myCurrentImage] &&
              myExhibition.images[myCurrentImage].date}
          </p>
        </div>
      )}
    </div>
  )
}

export default Exhibition
