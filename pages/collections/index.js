import React, { useEffect, useState } from 'react'
import Link from 'next/link'
import { useRouter } from 'next/router'
import parse, { domToReact } from 'html-react-parser'
import { motion } from 'framer-motion'
import Typed from 'react-typed'

import { getAllArtsByCollec, getArtsByCollect } from '../../components/API'
import useHasMounted from '../../components/hooks/useHasMounted'
import { useAppContext } from '../../context/appContext'

import MyHeader from '../../components/MyHeader'
import Navbar from '../../components/Navbar'
// import SearchContainer from '../../components/SearchContainer'

import { HiOutlineSaveAs } from 'react-icons/hi'

let imageUrl = process.env.NEXT_PUBLIC_API_URL_IMAGE

const ThumbnailArts = (props) => {
  const { imageUrl, title, artId } = props
  const [show, setShow] = useState(false)

  return (
    <div
      className=" cursor-pointer"
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
        <Link
          href={{
            pathname: '/collections/artDetails',
            query: { id: artId }
          }}
        >
          <div
            style={{
              height: '18rem',
              backgroundImage: `url("${imageUrl}")`,
              backgroundSize: 'cover',
              backgroundPosition: 'center'
            }}
          >
            {show && (
              <>
                <div
                  className=" h-6 pt-1 text-center text-xs text-slate-300 w-full absolute bottom-0 "
                  style={{
                    backgroundImage:
                      ' linear-gradient(to bottom, rgba(0,0,0,0), rgba(0,0,0,.7))'
                  }}
                >
                  <Typed
                    strings={[
                      `${
                        title.length > 18 ? title.slice(0, 18) + '...' : title
                      }`
                    ]}
                    typeSpeed={15}
                  />
                </div>
                <button
                  // onClick={handleSubmit}
                  className="absolute text-end w-full p-1"
                >
                  <span
                    className="inline-block text-slate-400 p-0.5 shadow-xl rounded bg-slate-800 bg-opacity-20 
          hover:text-green-200 hover:bg-none hover:bg-opacity-0 hover:shadow-none 
           rotate-180 hover:rotate-0 active:translate-y-2 active:text-green-400 focus:border-green-400 transition-all duration-300"
                  >
                    <HiOutlineSaveAs />
                  </span>
                </button>
              </>
            )}
          </div>
        </Link>
      </motion.div>
    </div>
  )
}

const CollectionsHome = () => {
  const router = useRouter()
  const { id } = router.query
  const { user } = useAppContext()
  const [myCollection, setMyCollection] = useState([])
  const [myCollectionIntro, setMyCollectionIntro] = useState([])
  const [artToDisplay, setArtToDisplay] = useState('highlight')
  const [highlightImg, setHighlightImg] = useState([])

  useEffect(() => {
    if (!user) {
      router.push('/login')
    }
  }, [user, router])

  useEffect(() => {
    // router.isReady => fetch info on reload
    // call for all arts
    if (router.isReady) {
      const response = async () => {
        const data = await getAllArtsByCollec(id, 20)
        setMyCollection(data)
      }
      response()

      // call for intro
      const introResponse = async () => {
        const data = await getArtsByCollect(id)
        setMyCollectionIntro(data)
        setHighlightImg(data.highlight_images)
      }
      introResponse()
    }
    return function cleanup() {
      console.log('clean')
    }
  }, [router.isReady, id])

  // console.log(myCollectionIntro.highlight_images)
  // console.log(highlightImg)
  // console.log(myCollection)
  // console.log(router)

  const hasMounted = useHasMounted()
  if (!hasMounted) {
    return null
  }

  // options for parsing the html response api
  const options = {
    replace: ({ attribs, children }) => {
      if (!attribs) {
        return
      }

      if (attribs.href) {
        return <span>{domToReact(children, options)}</span>
      }
    }
  }

  return (
    <>
      <MyHeader description={`${myCollectionIntro.name} Collection`} />
      <div
        className="h-screen "
        style={{
          background: 'url(images/landingUserCollection.png)',
          backgroundSize: 'cover',
          backgroundPosition: 'center',
          backgroundRepeat: 'no-repeat'
        }}
      >
        <Navbar />
        <div className="text-2xl md:text-4xl font-black text-center mt-4 text-slate-400">
          {myCollectionIntro.name}
        </div>
        <div className="container mx-auto w-full ">
          {/* <SearchContainer /> */}
          <div className="flex space-x-2 mb-5">
            <button
              onClick={() => setArtToDisplay('highlight')}
              className="border rounded p-1 "
            >
              Highlight
            </button>
            <button
              onClick={() => setArtToDisplay('full')}
              className="border rounded p-1 "
            >
              Full
            </button>
            <button
              onClick={() => setArtToDisplay('history')}
              className="border rounded p-1 "
            >
              History
            </button>
          </div>

          {artToDisplay === 'highlight' && (
            <div
              className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 
        lg:grid-cols-6 xl:grid-cols-8 sm:gap-6 gap-2 px-2 lg:px-0"
            >
              {highlightImg.map((item) => {
                return (
                  <motion.div
                    key={item.id}
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{
                      duration: 0.5
                    }}
                  >
                    <ThumbnailArts
                      title={item.title}
                      imageUrl={`${imageUrl}/size4/${item.primary_image}`}
                      artId={item.id}
                    />
                  </motion.div>
                )
              })}
            </div>
          )}
          {artToDisplay === 'full' && (
            <div
              className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 
        lg:grid-cols-6 xl:grid-cols-8 sm:gap-6 gap-2"
            >
              {myCollection.map((item) => {
                return (
                  <motion.div
                    key={item.id}
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{
                      duration: 0.5
                    }}
                  >
                    <ThumbnailArts
                      title={item.title}
                      imageUrl={`${imageUrl}/size4/${item.primary_image}`}
                      artId={item.id}
                    />
                  </motion.div>
                )
              })}
            </div>
          )}
          {artToDisplay === 'history' && myCollectionIntro && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{
                duration: 0.5
              }}
            >
              <div className="text-slate-800 md:columns-2 columns-1 px-4 md:px-0 first-letter:font-bold first-letter:text-3xl">
                {parse(`${myCollectionIntro.copy_text}`, options)}
              </div>
            </motion.div>
          )}
        </div>
      </div>
    </>
  )
}

export default CollectionsHome
