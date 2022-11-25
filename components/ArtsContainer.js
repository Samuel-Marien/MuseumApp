import React, { useEffect, useState } from 'react'
import Link from 'next/link'
import { motion } from 'framer-motion'

import { useAppContext } from '../context/appContext'

import { FaTrashAlt, FaStar, FaEye } from 'react-icons/fa'

const ThumbnailArts = (props) => {
  const { imageUrl, title, imageCaption, imageCitation, imageDate } = props

  const [show, setShow] = useState(false)

  // console.log(show)

  return (
    <div
      onMouseEnter={() => setShow(true)}
      onMouseLeave={() => {
        setShow(false)
      }}
    >
      <motion.div
        whileHover={{
          scale: 1.2,
          opacity: 1,
          boxShadow:
            'rgba(0, 0, 0, 0.25) 0px 54px 55px, rgba(0, 0, 0, 0.12) 0px -12px 30px, rgba(0, 0, 0, 0.12) 0px 4px 6px, rgba(0, 0, 0, 0.17) 0px 12px 13px, rgba(0, 0, 0, 0.09) 0px -3px 5px',
          transition: { duration: 0.9 }
        }}
      >
        <div
          style={{
            height: '250px',
            backgroundImage: `url("https://${imageUrl}")`,
            backgroundSize: 'cover',
            backgroundPosition: 'center',
            backgroundRepeat: 'no-repeat'
          }}
        >
          {show && (
            <div
              style={{ height: '250px' }}
              className=" flex flex-col justify-between font-semibold text-xs  text-slate-300 w-full"
            >
              <div
                className="pt-1 h-7 text-center "
                style={{
                  backgroundImage:
                    ' linear-gradient(to top, rgba(0,0,0,0), rgba(0,0,0,.7))'
                }}
              >
                <p>{title.length > 30 ? title.slice(0, 30) + '...' : title}</p>
              </div>

              <div
                className="flex justify-evenly pt-1 h-7 text-center "
                style={{
                  backgroundImage:
                    ' linear-gradient(to bottom, rgba(0,0,0,0), rgba(0,0,0,.7))'
                }}
              >
                <button className="hover:scale-110 hover:text-slate-100 transition-all duration-300 active:scale-105 active:text-pink-800">
                  <FaTrashAlt />
                </button>
                <button className="hover:scale-110 hover:text-slate-100 transition-all duration-300 active:scale-105 active:text-yellow-500">
                  <FaStar />
                </button>
                <button>
                  <Link href={`https://${imageUrl}`}>
                    <a target="_blank">
                      <FaEye />
                    </a>
                  </Link>
                </button>
              </div>
            </div>
          )}
        </div>
      </motion.div>
    </div>
  )
}

const ArtsContainer = () => {
  const { getAllUserArts, arts, isLoading, totalArts } = useAppContext()

  useEffect(() => {
    getAllUserArts()
  }, [])

  // console.log(arts)

  return (
    <div>
      {totalArts} art{totalArts > 1 && 's'} found
      <div className="grid grid-cols-5 gap-2">
        {arts.map((art) => {
          return (
            <ThumbnailArts
              key={art.imageId}
              title={art.exibitionTitle}
              imageUrl={art.imageLargestUrl}
              imageCaption={art.imageCaption}
              imageCitation={art.imageCitation}
              imageDate={art.imageDate}
            />
          )
        })}
      </div>
    </div>
  )
}

export default ArtsContainer