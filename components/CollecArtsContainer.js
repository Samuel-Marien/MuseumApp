import React, { useEffect, useState } from 'react'
import { motion } from 'framer-motion'

import { useAppContext } from '../context/appContext'
import FormRow from './FormRow'
import FormRowSelect from './FormRowSelect'
import ThumbnailArts from './ThumbnailArts'
import CollecBtnContainer from './CollecBtnContainer'

import { FaSearch, FaStar } from 'react-icons/fa'
import { MdOutlineSort } from 'react-icons/md'
import { IoIosAlbums, IoIosCalendar } from 'react-icons/io'

let myImgUrl = process.env.NEXT_PUBLIC_API_URL_IMAGE_OBJECTS

const CollecArtsContainer = () => {
  const [myCheck, setMyCheck] = useState(false)
  const {
    getAllCollectionUserArts,
    artsCollec,
    isLoading,
    totalCollecArts,
    deleteCollecArt,
    addCollectionArtToFavorite,
    artsCategory,
    artsCategoryOptions,
    handleChange,
    search,
    sort,
    sortOptions,
    favoriteArtsOnly,
    favoriteOptions,
    clearFilters,
    numOfCollecFavorite,
    category,
    categoryOptions,
    numOfCollecPages,
    pageCollec,
    numOfAllArts
  } = useAppContext()

  useEffect(() => {
    getAllCollectionUserArts()
  }, [
    artsCategory,
    artsCategoryOptions,
    search,
    sort,
    sortOptions,
    favoriteArtsOnly,
    favoriteOptions,
    totalCollecArts,
    numOfCollecFavorite,
    category,
    categoryOptions,
    numOfCollecPages,
    pageCollec,
    numOfAllArts
  ])

  const handleSearch = (e) => {
    if (isLoading) return
    handleChange({ name: e.target.name, value: e.target.value })
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    clearFilters()
    setMyCheck(false)
  }

  const favoriteArtsByPage = artsCollec.filter((item) => item.isFavorite).length

  const handleFavorite = (e) => {
    if (e.target.value === 'all') {
      setMyCheck(true)
      handleChange({ name: e.target.name, value: 'my favorite' })
    } else {
      setMyCheck(false)
      handleChange({ name: e.target.name, value: 'all' })
    }
  }
  // console.log(artsCollec)
  // console.log(numOfAllArts)

  return (
    <div>
      <motion.div
        initial={{ opacity: 0, y: -25 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{
          duration: 0.4,
          ease: 'easeOut'
        }}
      >
        <div className="w-max mx-auto p-2 rounded bg-slate-800 bg-opacity-60">
          <form className=" flex flex-col lg:flex-row space-y-4 lg:space-y-0  items-center lg:px-7 lg:space-x-3">
            <div className="flex mr-0">
              <FormRowSelect
                labelText={
                  artsCategory !== 'Exhibition' ? (
                    <IoIosAlbums />
                  ) : (
                    <IoIosCalendar />
                  )
                }
                name="artsCategory"
                value={artsCategory}
                onChange={handleSearch}
                list={artsCategoryOptions}
              ></FormRowSelect>
              <FormRowSelect
                labelText=" "
                classNames="mr-0 border-l border-slate-500"
                inputClassName="w-full"
                name="category"
                value={category}
                onChange={handleSearch}
                list={categoryOptions}
              ></FormRowSelect>

              <div className="flex ml-6 space-x-3">
                <div className="hidden md:block">
                  <FormRow
                    type="text"
                    labelText={<FaSearch />}
                    name="search"
                    value={search}
                    onChange={handleSearch}
                  ></FormRow>
                </div>
                <div className="hidden md:block">
                  <FormRowSelect
                    labelText={<MdOutlineSort />}
                    name="sort"
                    value={sort}
                    onChange={handleSearch}
                    list={sortOptions}
                  />
                </div>
                <div className="hidden md:block">
                  <FormRow
                    checked={myCheck}
                    type="checkbox"
                    labelText={<FaStar />}
                    name="favoriteArtsOnly"
                    value={favoriteArtsOnly}
                    onChange={handleFavorite}
                    classNames={
                      myCheck
                        ? 'mr-1 text-yellow-500 transition-all duration-300 '
                        : 'mr-1'
                    }
                  ></FormRow>
                </div>
              </div>
            </div>

            {/* search, sort & favorite for little device */}
            <div className=" flex flex-col md:hidden w-full ">
              <FormRow
                type="text"
                labelText={<FaSearch />}
                name="search"
                value={search}
                onChange={handleSearch}
                inputClassName="w-full"
              ></FormRow>
              <div className=" flex mt-3 space-x-5">
                <FormRowSelect
                  labelText={<MdOutlineSort />}
                  name="sort"
                  value={sort}
                  onChange={handleSearch}
                  list={sortOptions}
                ></FormRowSelect>
                <FormRow
                  checked={myCheck}
                  type="checkbox"
                  labelText={<FaStar />}
                  name="favoriteArtsOnly"
                  value={favoriteArtsOnly}
                  onChange={handleFavorite}
                  classNames={
                    myCheck
                      ? 'mr-1 text-yellow-500 transition-all duration-300 '
                      : 'mr-1'
                  }
                ></FormRow>
              </div>
            </div>
            <button
              className="w-full lg:w-max p-1 border rounded px-5 text-slate-200  hover:bg-slate-200 hover:text-slate-800 transition-all duration-300"
              disabled={isLoading}
              onClick={handleSubmit}
            >
              Clear filters
            </button>
          </form>

          {/* section total art & all fav  */}
          <div className="pt-2 text-slate-400 flex  items-center space-x-1 border-t mt-2 mb-1 border-slate-500">
            <div className="flex flex-col lg:flex-row lg:space-x-2">
              <div className="w-12 flex space-x-1 items-center py-1 px-2 rounded-lg border border-slate-700 shadow-lg bg-slate-500 text-slate-200 text-sm">
                <p className="text-slate-800 text-xs">
                  <IoIosAlbums />
                </p>
                <p className="font-bold">{numOfAllArts}</p>
              </div>
              <div className="w-12 flex space-x-1 items-center py-1 px-2 rounded-lg border border-slate-700 shadow-lg bg-slate-500 text-slate-200 text-sm">
                <p className="text-yellow-500 ">
                  <FaStar />
                </p>
                <p className="font-bold">{numOfCollecFavorite}</p>
              </div>
            </div>
            <p className="text-xs md:text-sm italic w-full text-center">
              {totalCollecArts} collector's item{totalCollecArts > 1 && 's'}{' '}
              found{' '}
              <span className="hidden md:inline">
                with your current selection.
              </span>
              <span className="block lg:inline">
                {' '}
                Including {favoriteArtsByPage} favorite
                {favoriteArtsByPage > 1 && 's'} in this page
              </span>
            </p>
          </div>
        </div>
      </motion.div>

      {/* Thumbnails  */}
      <motion.div
        initial={{ opacity: 0.6, scale: 0.99 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{
          duration: 0.7
        }}
      >
        <div
          className="mt-8 grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 
        lg:grid-cols-6 sm:gap-6 gap-2 px-2 lg:px-0"
        >
          {artsCollec.map((art, index) => {
            return (
              <ThumbnailArts
                artId={art._id}
                key={index}
                title={art.artTitle}
                isFavorite={art.isFavorite}
                imageUrl={`${myImgUrl}/size4/${art.primaryImage}`}
                deleteFunc={() => deleteCollecArt(art._id)}
                addToFavoriteFunc={() =>
                  addCollectionArtToFavorite(
                    art._id,
                    art.isFavorite ? false : true
                  )
                }
              />
            )
          })}
        </div>
      </motion.div>
      {numOfCollecPages > 1 && <CollecBtnContainer />}
    </div>
  )
}

export default CollecArtsContainer
