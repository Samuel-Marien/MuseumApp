import React, { useEffect, useState } from 'react'
import Link from 'next/link'
import { useRouter } from 'next/router'
import parse, { domToReact } from 'html-react-parser'

import useHasMounted from '../../components/hooks/useHasMounted'
import { getOneArtDetails } from '../../components/API'
import ArtDetailsContainer from '../../components/ArtDetailsContainer'
import Navbar from '../../components/Navbar'

let imageUrl = process.env.NEXT_PUBLIC_API_URL_IMAGE

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
        // console.log(data)
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

  const hasMounted = useHasMounted()
  if (!hasMounted) {
    return null
  }

  // console.log(id)
  // console.log(art)
  // console.log(myThumbArray)
  // testing object : 132835, 113740, 3461, 97327, 1873, 713, 50979, 1252

  const handleClick = (id) => {
    // console.log(id)
    myThumbArray.filter((item, index) => {
      return item.id === id && setMyCurrentImage(index)
    })
  }

  return (
    <div
      className="h-screen "
      style={{
        background: 'url(../images/landingUserCollection.png)',
        backgroundSize: 'cover',
        backgroundPosition: ' center',
        backgroundRepeat: 'no-repeat'
      }}
    >
      <Navbar />
      <div className="container mx-auto mt-10">
        <ArtDetailsContainer
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
                      ? 'mb-3 border-2 rounded border-yellow-600 h-20'
                      : 'mb-3 hover:scale-95 h-20 transition-transform duration-300'
                  }
                  key={item.id}
                  src={`${imageUrl}/size1/${item.filename}`}
                />
              )
            })
          }
          imageCaption={
            myThumbArray && parse(myThumbArray[myCurrentImage].caption)
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
    </div>
  )
}

export default artDetails
