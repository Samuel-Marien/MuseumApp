import React, { useEffect, useState } from 'react'
import Link from 'next/link'
import { useRouter } from 'next/router'
import parse, { domToReact } from 'html-react-parser'
import { motion } from 'framer-motion'

import useHasMounted from '../../components/hooks/useHasMounted'

import { getOneArtDetails } from '../../components/API'
import { FiLink } from 'react-icons/fi'

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
    dynasty
  } = props
  const [showRights, setShowRights] = useState(false)

  const spanStyle = 'font-bold uppercase '

  return (
    <div className="grid grid-cols-2 gap-5 text-slate-800">
      <div className="border">
        <img src={imgUrl} alt={title} />
      </div>
      <div className="border">
        <h1 className="text-5xl font-semibold ">{title}</h1>
        <p className="flex text-xl uppercase font-bold text-slate-500 mt-2">
          {collections}
          <span className="text-sm ml-1 self-center">
            <FiLink />
          </span>
        </p>
        <p className="mt-3 text-justify">{labelsText}</p>
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
          <span className={spanStyle}>Markings: </span>
          {markings}
        </p>
        <p>
          <span className={spanStyle}>Signature: </span>
          {signed}
        </p>
        <p>
          <span className={spanStyle}>Inscribed: </span>
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
          <div className="relative pt-1 w-8/12 ml-5 pb-3">
            <div className="flex mb-2 items-center justify-between">
              <div>
                <span className="text-xs font-semibold inline-block py-1 px-2 uppercase rounded-full text-slate-600 bg-slate-200">
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
        <div className="mt-2">
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

  // console.log(art.artists && art.artists[0].name)
  // console.log(id)

  // testing object :
  // 132835, 113740, 3461, 97327

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

  const hasMounted = useHasMounted()
  if (!hasMounted) {
    return null
  }

  return (
    <div className="container mx-auto">
      <ArtContainer
        title={art.title}
        imgUrl={`${imageUrl}/size4/${art.primary_image}`}
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
