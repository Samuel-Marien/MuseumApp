import React, { useEffect, useState } from 'react'
import Link from 'next/link'
import { useRouter } from 'next/router'
import parse, { domToReact } from 'html-react-parser'
import { motion } from 'framer-motion'

import useHasMounted from '../../components/hooks/useHasMounted'
import { getOneArtDetails } from '../../components/API'

import { FiLink } from 'react-icons/fi'
import {
  BsFillArrowLeftCircleFill,
  BsFillArrowRightCircleFill
} from 'react-icons/bs'

let imageUrl = process.env.NEXT_PUBLIC_API_URL_IMAGE

const ArtContainer = (props) => {
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
    labelsText,
    geoLocation,
    credit,
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
    handleMinusImage,
    handlePlusImage,
    currentImage
  } = props
  const [showRights, setShowRights] = useState(false)

  const spanStyle = 'font-bold uppercase '

  return (
    <div className="grid grid-cols-2 gap-10 text-slate-800  ">
      <div className="w-full flex justify-center">
        <div
          style={{
            backgroundImage: `url("${imageUrl}/size4/${imgUrl}")`,
            backgroundSize: 'contain',
            backgroundPosition: 'center',
            backgroundRepeat: 'no-repeat',
            height: '600px',
            width: '500px'
          }}
        ></div>
      </div>
      <div className="  ">
        <h1 className="text-5xl font-semibold ">{title}</h1>
        <div className="flex text-xl uppercase font-bold text-slate-500 mt-2 ">
          {collections}
          <span className="text-sm ml-1 self-center">
            <FiLink />
          </span>
        </div>
        <div className="mt-10 flex space-x-2 overflow-auto scrollbar cursor-pointer">
          {imagesArray}
        </div>
        <div className="mt-4 flex justify-between items-center w-max mx-auto space-x-10 ">
          <button
            className="text-2xl hover:scale-105 hover:text-slate-400 active:text-slate-500 active:scale-95 transition-all duration-300"
            onClick={handleMinusImage}
          >
            <BsFillArrowLeftCircleFill />
          </button>
          <p>
            {currentImage}/{maxPlusImage}
          </p>
          <button
            className="text-2xl hover:scale-105 hover:text-slate-400 active:text-slate-500 active:scale-95 transition-all duration-300"
            onClick={handlePlusImage}
          >
            <BsFillArrowRightCircleFill />
          </button>
        </div>

        <div className="mt-3 text-justify">{labelsText}</div>
        <div className="mt-2">{artist}</div>
        <p>
          <span className={spanStyle}>Medium: </span>
          {medium}
        </p>
        <p className="mt-2">
          <span className={spanStyle}>Dimensions: </span>
          {dimension}
        </p>
        <p>
          <span className={spanStyle}>{markings && 'Markings: '}</span>
          {markings}
        </p>
        <p>
          <span className={spanStyle}>{signed && 'Signature: '}</span>
          {signed}
        </p>
        <p>
          <span className={spanStyle}>{inscribed && 'Inscribed: '}</span>
          {inscribed}
        </p>
        <div className="mt-2">
          <span className={spanStyle}>
            {geoLocation && geoLocation.length !== 0 && 'Geo Location: '}
          </span>
          {geoLocation}
        </div>
        <p className="mt-2">
          <span className={spanStyle}>Date: </span>
          {date} - {dateStart} {dateEnd === dateStart ? null : ' / ' + dateEnd}
        </p>
        <p>
          <span className={spanStyle}>{period && 'Period: '}</span>
          {period}
        </p>
        <p>
          <span className={spanStyle}>{dynasty && 'Dynasty: '}</span>
          {dynasty}
        </p>
        <p className="mt-2">
          <span className={spanStyle}>{credit && 'Credit: '}</span>
          {credit}
        </p>
        <p className="mt-2">
          <span className={spanStyle}>Catalogue description: </span>
          {description}
        </p>
        <p className="mt-2 ">
          <span className={spanStyle}>Museum location: </span>
          {museumLocation}
        </p>
        <div className="mt-2">
          <span className={spanStyle}>Exhibitions: </span>
          {exhibitions}
        </div>

        <div className="mt-5 flex items-center">
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
        <span className="italic text-slate-500">{completenessDescription}</span>
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
    </div>
  )
}

const artDetails = () => {
  const [art, setArt] = useState([])
  const [myCurrentImage, setMyCurrentImage] = useState(0)
  const [myThumbArray, setThumbMyArray] = useState(0)

  const router = useRouter()
  const { id } = router.query

  useEffect(() => {
    // router.isReady => fetch info on reload
    if (router.isReady) {
      const response = async () => {
        const data = await getOneArtDetails(id)
        console.log(data)
        setArt(data)
      }
      response()
    }
    return function cleanup() {
      console.log('clean')
    }
  }, [router.isReady])

  useEffect(() => {
    setThumbMyArray(art.images && art.images)
  }, [art.images])

  // options for parsing the html response api
  const options = {
    replace: ({ attribs, children }) => {
      if (!attribs) {
        return
      }

      if (attribs.href) {
        return (
          <a style={{ color: 'hotpink' }} href={attribs.href} target="_blank">
            {domToReact(children, options)}
          </a>
        )
      }
    }
  }

  const maxPlusImage = art.images && art.images.length

  const handlePlusImage = () => {
    if (myCurrentImage === maxPlusImage - 1) {
      setMyCurrentImage(0)
    } else {
      setMyCurrentImage((myCurrentImage += 1))
      // const firstGoLast = myThumbArray.shift()
      // myThumbArray.push(firstGoLast)
    }
  }

  const handleMinusImage = () => {
    // const lastGoFisrt = myThumbArray.pop()
    // myThumbArray.unshift(lastGoFisrt)
    if (myCurrentImage === 0) {
      setMyCurrentImage(maxPlusImage - 1)
    } else {
      setMyCurrentImage((myCurrentImage -= 1))
    }
  }

  const hasMounted = useHasMounted()
  if (!hasMounted) {
    return null
  }

  // console.log(art.artists && art.artists[0].name)
  // console.log(id)
  // console.log(art.primary_image)
  // console.log(maxPlusImage)
  // console.log(myThumbArray)

  // testing object :
  // 132835, 113740, 3461, 97327, 1873, 713, 50979

  const handleClick = (id) => {
    // console.log(id)
    myThumbArray.filter((item, index) => {
      return item.id === id && setMyCurrentImage(index)
    })
  }

  return (
    <div className="container mx-auto">
      <ArtContainer
        handlePlusImage={handlePlusImage}
        handleMinusImage={handleMinusImage}
        maxPlusImage={maxPlusImage}
        currentImage={myCurrentImage + 1}
        title={art.title}
        imgUrl={myThumbArray && myThumbArray[myCurrentImage].filename}
        imagesArray={
          myThumbArray &&
          myThumbArray.map((item, index) => {
            return (
              <img
                onClick={() => handleClick(item.id)}
                className={
                  index === myCurrentImage
                    ? 'mb-3 border-2 rounded border-yellow-600 h-20 transition-all duration-300 '
                    : 'mb-3 shadow-sm hover:scale-95 h-20 transition-all duration-300'
                }
                key={item.id}
                src={`${imageUrl}/size1/${item.filename}`}
              />
            )
          })
        }
        artist={
          art.artists &&
          art.artists.map((item) => {
            return (
              <p key={item.id}>
                <span className="font-bold uppercase">{item.role}: </span>
                {item.name && item.name}
                {item.dates && ', ' + item.dates}
              </p>
            )
          })
        }
        medium={art.medium}
        date={art.object_date}
        dateStart={art.object_date_begin}
        dateEnd={art.object_date_end}
        dimension={art.dimensions}
        markings={art.markings}
        signed={art.signed}
        inscribed={art.inscribed}
        collections={
          art.collections &&
          art.collections.map((item) => {
            return (
              <span key={item.id}>
                <Link
                  href={{
                    pathname: '/collections/',
                    query: { id: item.id }
                  }}
                >
                  {item.name}
                </Link>
              </span>
            )
          })
        }
        labelsText={
          art.labels &&
          art.labels.map((item) => {
            return <span key={item.id}>{parse(item.content)}</span>
          })
        }
        geoLocation={
          art.geographical_locations &&
          art.geographical_locations.map((item) => {
            return (
              <li key={item.id} className="list-none ml-5">
                {item.type}: {item.name}
              </li>
            )
          })
        }
        credit={art.credit_line}
        description={art.description}
        exhibitions={
          art.exhibitions &&
          art.exhibitions.map((item) => {
            return (
              <li key={item.id} className="list-none ml-5 text-blue-400">
                <Link
                  href={{
                    pathname: '/exhibitions/exhibition',
                    query: { id: item.id }
                  }}
                >
                  {item.title}
                </Link>
              </li>
            )
          })
        }
        museumLocation={art.museum_location && art.museum_location.name}
        rightsComplete={
          art.rights_type && parse(art.rights_type.description, options)
        }
        completenessDescription={
          art.completeness && art.completeness.description
        }
        completenessName={art.completeness && art.completeness.name}
        completenessPercent={art.completeness && art.completeness.percentage}
        period={art.period}
        dynasty={art.dynasty}
        rightsType={art.rights_type && art.rights_type.name}
      />
    </div>
  )
}

export default artDetails
