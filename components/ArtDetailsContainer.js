import React, { useState } from 'react'
import { motion } from 'framer-motion'

import { FcAcceptDatabase } from 'react-icons/fc'
import { FiLink } from 'react-icons/fi'
import { FaExpandArrowsAlt, FaCompressArrowsAlt } from 'react-icons/fa'
import { HiOutlineSaveAs } from 'react-icons/hi'

let imageUrl = process.env.NEXT_PUBLIC_API_URL_IMAGE

const MyButton = (props) => {
  const {
    onClick,
    title,
    whatToShow,
    classNames,
    icon = <FaCompressArrowsAlt />,
    icon2 = <FaExpandArrowsAlt />,
    rotate = 90
  } = props

  return (
    <button
      onClick={onClick}
      className={`${classNames} flex justify-around font-semibold uppercase text-sm items-center p-1 
      bg-slate-800 text-slate-300 shadow-none hover:shadow-lg hover:bg-slate-300 
      active:shadow-none hover:text-slate-800 transition-all duration-300 `}
    >
      {title}
      {whatToShow ? (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1, rotate: rotate }}
          transition={{
            duration: 0.3
          }}
        >
          {icon}
        </motion.div>
      ) : (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{
            duration: 0.3
          }}
        >
          {icon2}
        </motion.div>
      )}
    </button>
  )
}

const InfoField = (props) => {
  const { title, data } = props
  return (
    <p>
      <span className="font-bold uppercase">{data ? title + ':' : ''}</span>{' '}
      {data}
    </p>
  )
}

const ArtDetailsContainer = (props) => {
  const {
    imgUrl,
    title,
    artist,
    medium,
    date,
    dateStart,
    dateEnd,
    dimension,
    markings,
    signed,
    inscribed,
    collections,
    classification,
    labelsText,
    geoLocation,
    credit,
    section,
    description,
    exhibitions,
    museumLocation,
    rightsComplete,
    rightsType,
    completenessDescription,
    completenessName,
    completenessPercent,
    period,
    dynasty,
    maxPlusImage,
    imagesArray,
    imageCaption,
    currentImage,
    onClick
  } = props
  const [showRights, setShowRights] = useState(false)
  const [showLabelText, setShowLabelText] = useState(true)
  const [showInfos, setShowInfos] = useState(false)
  const [showrotate, setShowrotate] = useState(false)

  const spanStyle = 'font-bold uppercase '

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-10 text-slate-800 bg-slate-100 p-10 rounded shadow-lg bg-opacity-70">
      {/* Left part  */}
      <div className="px-5">
        <div className="w-full flex justify-center ">
          <img
            style={{
              maxHeight: '600px'
              // maxWidth: '600px'
            }}
            src={`${imageUrl}/size4/${imgUrl}`}
          />
        </div>
        <div className=" mt-2 flex space-x-2 overflow-auto scrollbar cursor-pointer">
          {imagesArray}
        </div>
        <p className="mt-2 text-slate-500 italic text-sm">
          {imageCaption}{' '}
          <span className="ml-2 font-semibold">
            [{currentImage}/{maxPlusImage}]
          </span>
        </p>
      </div>

      {/* Right part  */}
      <div className="">
        <h1 className="text-5xl font-semibold ">{title}</h1>
        <div className="flex text-xl uppercase font-bold text-slate-500 mt-2 ">
          {collections}
          <span className="text-sm ml-1 self-center">
            <FiLink />
          </span>
        </div>
        <p className="font-semibold text-slate-500 uppercase text-sm">
          {classification} - {section}
        </p>

        <div className="mt-5 flex flex-col lg:flex-row justify-between ">
          <div className="flex space-x-5 justify-center">
            <MyButton
              classNames="w-28"
              whatToShow={showLabelText}
              title="label text"
              onClick={() =>
                showLabelText ? setShowLabelText(false) : setShowLabelText(true)
              }
            />
            <MyButton
              classNames="w-28"
              whatToShow={showInfos}
              title="art infos"
              onClick={() =>
                showInfos ? setShowInfos(false) : setShowInfos(true)
              }
            />
          </div>

          <div className="mt-2 lg:mt-0">
            <MyButton
              onClick={onClick}
              icon2={
                <span className="text-xl">
                  <HiOutlineSaveAs />
                </span>
              }
              classNames="h-10 w-full xl:w-56 border-2 rounded hover:border-yellow-500 
            bg-gray-300 text-gray-800 hover:bg-gray-800 hover: hover:text-gray-300 active:text-gray-100"
              title="Save this Art!"
            />
          </div>
        </div>
        <div className="mt-5 text-justify">
          {showLabelText && (
            <motion.div
              className="mt-2"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{
                duration: 0.5
              }}
            >
              {labelsText}
            </motion.div>
          )}
        </div>
        {showInfos && (
          <motion.div
            className="mt-2"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{
              duration: 0.5
            }}
          >
            <div className="mt-5">
              <div className="">{artist}</div>
              <InfoField title="Medium" data={medium} />
              <InfoField title="Dimensions" data={dimension} />
              <InfoField title="Markings" data={markings} />
              <InfoField title="Signature" data={signed} />
              <InfoField title="Inscribed" data={inscribed} />
              <InfoField title="Period" data={period} />
              <InfoField title="Dynasty" data={dynasty} />
              <InfoField title="Credit" data={credit} />
              <InfoField title="Catalogue description" data={description} />
              <InfoField title="Museum location" data={museumLocation} />
              <div className="">
                <span className={spanStyle}>
                  {geoLocation && geoLocation.length !== 0 && 'Geo Location: '}
                </span>
                {geoLocation}
              </div>
              <p>
                <span className={spanStyle}>Date: </span>
                {date} - {dateStart}{' '}
                {dateEnd === dateStart ? null : ' / ' + dateEnd}
              </p>
              <div className="">
                <span className={spanStyle}>
                  {exhibitions && exhibitions.length !== 0 && 'Exhibitions: '}
                </span>
                {exhibitions}
              </div>
              <div className="flex items-center">
                <span className={spanStyle}>Record completeness: </span>
                <div className="relative pt-1 w-8/12 ml-5">
                  <div className="flex mb-2 items-center justify-between">
                    <div>
                      <span className="text-xs font-semibold inline-block  px-2 uppercase rounded-full text-slate-600 bg-slate-200">
                        {completenessName}
                      </span>
                    </div>
                    <div className="text-right">
                      <span className="text-xs font-semibold inline-block text-blue-600">
                        {completenessPercent}%
                      </span>
                    </div>
                  </div>
                  <div className="overflow-hidden h-2 mb-4 text-xs flex rounded bg-blue-200">
                    <div
                      style={{ width: `${completenessPercent}%` }}
                      className="shadow-none flex flex-col text-center whitespace-nowrap text-white justify-center bg-slate-500"
                    ></div>
                  </div>
                </div>
              </div>
              <span className="italic text-slate-500">
                {completenessDescription}
              </span>
              <div className="mt-4">
                <span className={spanStyle}>Rights statement: </span>
                <span
                  className="text-blue-400 cursor-pointer"
                  onClick={() =>
                    showRights ? setShowRights(false) : setShowRights(true)
                  }
                >
                  {rightsType}
                </span>
                <br />
                {showRights && (
                  <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{
                      duration: 0.5
                    }}
                  >
                    {rightsComplete}
                  </motion.div>
                )}
              </div>
            </div>
          </motion.div>
        )}
      </div>
    </div>
  )
}

export default ArtDetailsContainer
