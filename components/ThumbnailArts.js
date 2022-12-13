import React, { useState } from 'react'
import Link from 'next/link'
import { motion } from 'framer-motion'
import Typed from 'react-typed'

import { FaTrashAlt, FaStar, FaEye } from 'react-icons/fa'

const ThumbnailArts = (props) => {
  const {
    imageUrl,
    title,
    imageCaption,
    imageCitation,
    imageDate,
    artId,
    isFavorite,
    deleteFunc,
    addToFavoriteFunc
  } = props

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
                <Typed
                  strings={[
                    `${title.length > 30 ? title.slice(0, 30) + '...' : title}`
                  ]}
                  typeSpeed={15}
                />
              </div>

              <div
                className="flex justify-evenly pt-1 h-7 text-center "
                style={{
                  backgroundImage:
                    ' linear-gradient(to bottom, rgba(0,0,0,0), rgba(0,0,0,.7))'
                }}
              >
                <button
                  // onClick={() => deleteExhibArt(artId)}
                  onClick={deleteFunc}
                  className="hover:scale-110 hover:text-slate-100 transition-all duration-300 active:scale-105 active:text-pink-800"
                >
                  <FaTrashAlt />
                </button>
                <button
                  onClick={addToFavoriteFunc}
                  // onClick={() =>
                  //   addExhibitionArtToFavorite(artId, isFavorite ? false : true)
                  // }
                  className="hover:scale-110 hover:text-slate-100 transition-all duration-300 active:scale-105 active:text-yellow-500"
                >
                  <span
                    className={
                      isFavorite ? 'text-yellow-300' : 'text-slate-300'
                    }
                  >
                    <FaStar />
                  </span>
                </button>
                <button className="hover:scale-110 hover:text-slate-100 transition-all duration-300 active:scale-105 active:text-yellow-500">
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

export default ThumbnailArts
