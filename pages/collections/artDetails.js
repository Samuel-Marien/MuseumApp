import React, { useEffect, useState } from 'react'
import { useRouter } from 'next/router'

import { getOneArtDetails } from '../../components/API'
import { HiOutlineTemplate } from 'react-icons/hi'

let imageUrl = process.env.NEXT_PUBLIC_API_URL_IMAGE

const ArtContainer = (props) => {
  const {
    imgUrl,
    title,
    artist,
    artistDate,
    medium,
    dateStart,
    dateEnd,
    dimension,
    markings,
    signed,
    inscribed,
    collections
  } = props
  return (
    <div className="container mx-auto">
      <div className=" grid grid-cols-2 gap-7">
        <div className="border">
          <img src={imgUrl} alt={title} />
        </div>
        <div className="border">
          <p>{title}</p>
          <p>
            {artist}, {artistDate}
          </p>
          <p>{medium}</p>
          <p>
            Date: {dateStart} {dateEnd === dateStart ? null : ' / ' + dateEnd}
          </p>
          <p>Dimensions: {dimension}</p>
          <p>Markings: {markings}</p>
          <p>Signature: {signed}</p>
          <p>Inscribed: {inscribed}</p>
          <div>Collections: {collections}</div>
        </div>
      </div>
    </div>
  )
}

const artDetails = () => {
  const [art, setArt] = useState([])

  const router = useRouter()
  const { id } = router.query

  console.log(id)

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

  console.log(art.artists && art.artists[0].name)

  return (
    <div>
      <ArtContainer
        title={art.title}
        imgUrl={`${imageUrl}/size4/${art.primary_image}`}
        artist={art.artists && art.artists[0].name}
        artistDate={art.artists && art.artists[0].dates}
        medium={art.medium}
        dateStart={art.object_date_begin}
        dateEnd={art.object_date_end}
        dimension={art.dimensions}
        markings={art.markings}
        signed={art.signed}
        inscribed={art.inscribed}
        collections={
          art.collections &&
          art.collections.map((item) => {
            return <span key={item.id}>{item.name}</span>
          })
        }
      />
    </div>
  )
}

export default artDetails
