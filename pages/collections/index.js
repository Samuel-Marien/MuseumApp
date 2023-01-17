import React, { useEffect, useState } from 'react'
import Link from 'next/link'
import { useRouter } from 'next/router'
import parse, { domToReact } from 'html-react-parser'
import { motion } from 'framer-motion'
import Typed from 'react-typed'

import { getArtsByCollect, getArtsBySearch } from '../../components/API'
import useHasMounted from '../../components/hooks/useHasMounted'
import { useAppContext } from '../../context/appContext'

import MyHeader from '../../components/MyHeader'
import Navbar from '../../components/Navbar'
import Footer from '../../components/Footer.js'

import { HiOutlineSaveAs } from 'react-icons/hi'
import { FaSearch } from 'react-icons/fa'
import {
  BsFillArrowLeftCircleFill,
  BsFillArrowRightCircleFill
} from 'react-icons/bs'

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

const PaginationContainer = (props) => {
  const { minus, plus, off, item, total } = props
  return (
    <div className="p-1 flex justify-center space-x-2 text-slate-400">
      <button
        onClick={minus}
        className="text-2xl hover:scale-105 hover:text-slate-300 active:text-slate-500 active:scale-95 transition-all duration-300"
      >
        <BsFillArrowLeftCircleFill />
      </button>
      <div className=" p-1 flex text-slate-400">
        <p>
          Page : {Math.ceil(off / item + 1)} / {total + 1}
        </p>
      </div>
      <button
        onClick={plus}
        className="text-2xl hover:scale-105 hover:text-slate-300 active:text-slate-500 active:scale-95 transition-all duration-300"
      >
        <BsFillArrowRightCircleFill />
      </button>
    </div>
  )
}

const MyForm = (props) => {
  const {
    onChange,
    value,
    onSelectChange,
    selectValue,
    selectItemByPage,
    onItemByPageChange,
    displaySearhBar
  } = props

  const list = ['highlight', 'full', 'history']
  const listItemByPage = [8, 16, 24, 32]

  return (
    <div className="flex flex-col items-center mb-10 space-y-2 text-slate-800">
      {/* Sort by section  */}
      <div className="flex h-8">
        <label
          htmlFor="sortBySection"
          className="text-xl text-slate-200"
        ></label>
        <select
          name="sortBySection"
          value={selectValue}
          onChange={onSelectChange}
          className="bg-slate-500 bg-opacity-50 text-slate-50 rounded-sm"
        >
          {list.map((itemValue, index) => {
            return (
              <option key={index} value={itemValue}>
                {itemValue}
              </option>
            )
          })}
        </select>
      </div>
      {displaySearhBar && (
        <>
          <motion.div
            initial={{ opacity: 0, y: -25 }}
            animate={{ opacity: 1, y: 0, display: 'flex' }}
            transition={{
              duration: 0.4,
              ease: 'easeOut'
            }}
          >
            {/* Search  */}
            <div className="flex h-8">
              <label
                htmlFor="search"
                className="text-xl bg-slate-500 bg-opacity-50 text-slate-50 border-r border-slate-400 p-1.5 px-2 rounded-l-sm"
              >
                <FaSearch />
              </label>
              <input
                type="text"
                value={value}
                name="search"
                onChange={onChange}
                className="w-96 bg-slate-500 bg-opacity-50 text-slate-50 rounded-r-sm"
              />
            </div>
            {/* item by page  */}
            <div className="flex">
              <label
                htmlFor="itemByPage"
                className="text-xl text-slate-200 ml-5"
              ></label>
              <select
                name="itemByPage"
                value={selectItemByPage}
                onChange={onItemByPageChange}
                className="bg-slate-500 bg-opacity-50 text-slate-50 rounded-l-sm"
              >
                {listItemByPage.map((itemValue, index) => {
                  return (
                    <option key={index} value={itemValue}>
                      {itemValue}{' '}
                    </option>
                  )
                })}
              </select>{' '}
              <span className="pt-1 text-slate-200 bg-slate-500 bg-opacity-50 rounded-r-sm px-2 border-l border-slate-400">
                Arts / Page
              </span>
            </div>
          </motion.div>
        </>
      )}
    </div>
  )
}

const CollectionsHome = () => {
  const router = useRouter()
  const { id } = router.query
  const { user } = useAppContext()
  const [myCollection, setMyCollection] = useState([])
  const [myCollectionIntro, setMyCollectionIntro] = useState([])
  const [artToDisplay, setArtToDisplay] = useState('full')
  const [highlightImg, setHighlightImg] = useState([])
  const [numOfItems, setNumOfItems] = useState(0)
  const [myOffset, setMyOffset] = useState(0)
  const [userSearch, setUserSearch] = useState('')
  const [totalPages, setTotalPages] = useState(0)
  const [itemByPage, setItemByPage] = useState(16)

  // const itemByPage = 16

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
        const data = await getArtsBySearch(
          itemByPage,
          myOffset,
          userSearch,
          id,
          0
        )
        const dataLength = await getArtsBySearch(
          itemByPage,
          0,
          userSearch,
          id,
          1
        )
        setMyCollection(data)
        setNumOfItems(dataLength)
        setTotalPages(Math.ceil(numOfItems / itemByPage) - 1)
      }
      response()

      // call for History section & highlight
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
  }, [router.isReady, id, myOffset, userSearch, itemByPage, numOfItems])

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

  const handlePlusOffset = () => {
    return totalPages + 1 < (myOffset + itemByPage) / itemByPage + 1
      ? setMyOffset(0)
      : setMyOffset((myOffset += itemByPage))
  }

  const handleMinusOffset = () => {
    return myOffset === 0
      ? setMyOffset(itemByPage * totalPages)
      : setMyOffset((myOffset -= itemByPage))
  }

  const handleSearch = (e) => {
    setUserSearch(e.target.value)
  }
  const handleSelect = (e) => {
    setArtToDisplay(e.target.value)
  }
  const handleItemByPage = (e) => {
    setItemByPage(e.target.value)
  }

  // console.log(userSearch)

  const hasMounted = useHasMounted()
  if (!hasMounted) {
    return null
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
        <div className="md:text-4xl  text-center mt-4 text-slate-400">
          <p className="text-6xl first-letter:font-black first-letter:text-slate-800 tracking-wider">
            {myCollectionIntro.name}
          </p>
        </div>
        {numOfItems}
        <MyForm
          onChange={handleSearch}
          value={userSearch}
          onSelectChange={handleSelect}
          selectValue={artToDisplay}
          onItemByPageChange={handleItemByPage}
          selectItemByPage={itemByPage}
          displaySearhBar={artToDisplay === 'full'}
        />
        <div className="container mx-auto w-full ">
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
            <div>
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
              <div className="mt-5">
                <PaginationContainer
                  minus={handleMinusOffset}
                  plus={handlePlusOffset}
                  off={myOffset}
                  item={itemByPage}
                  total={totalPages}
                />
              </div>
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
