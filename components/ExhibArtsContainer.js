import React, { useEffect, useState } from 'react'
import { motion } from 'framer-motion'

import { useAppContext } from '../context/appContext'

import ThumbnailArts from './ThumbnailArts'
import ExhibBtnContainer from './ExhibBtnContainer '
import FormRow from './FormRow'
import FormRowSelect from './FormRowSelect'

import { FaSearch, FaStar } from 'react-icons/fa'
import { MdOutlineSort } from 'react-icons/md'
import { IoIosAlbums, IoIosCalendar } from 'react-icons/io'

const ExhibArtsContainer = () => {
  const [myCheck, setMyCheck] = useState(false)
  const {
    getAllUserArts,
    arts,
    isLoading,
    totalArts,
    deleteExhibArt,
    addExhibitionArtToFavorite,
    search,
    sort,
    favoriteArtsOnly,
    handleChange,
    sortOptions,
    favoriteOptions,
    clearFilters,
    numOfPages,
    exhibPage,
    numOfExhibFavorite,
    artsCategoryOptions,
    artsCategory,
    numOfAllArts
  } = useAppContext()

  useEffect(() => {
    getAllUserArts()
  }, [
    numOfExhibFavorite,
    exhibPage,
    search,
    sort,
    favoriteArtsOnly,
    favoriteOptions,
    artsCategoryOptions,
    artsCategory,
    numOfAllArts
  ])

  const handleSubmit = (e) => {
    e.preventDefault()
    clearFilters()
    setMyCheck(false)
  }

  const handleSearch = (e) => {
    if (isLoading) return
    handleChange({ name: e.target.name, value: e.target.value })
  }

  const favoriteArtsByPage = arts.filter((item) => item.isFavorite).length

  const handleFavorite = (e) => {
    if (e.target.value === 'all') {
      setMyCheck(true)
      handleChange({ name: e.target.name, value: 'my favorite' })
    } else {
      setMyCheck(false)
      handleChange({ name: e.target.name, value: 'all' })
    }
  }

  // console.log(numOfExhibFavorite)
  // console.log(numOfAllArts)

  return (
    <div>
      {/* Form */}
      <div className=" w-max mx-auto p-2 rounded bg-slate-800 bg-opacity-60">
        <form className=" flex space-x-6 items-center justify-center px-7">
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
          <FormRow
            type="text"
            labelText={<FaSearch />}
            name="search"
            value={search}
            onChange={handleSearch}
          ></FormRow>
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
          ></FormRow>

          <button
            className="p-1 border rounded px-5 text-slate-200  hover:bg-slate-200 hover:text-slate-800 transition-all duration-300"
            disabled={isLoading}
            onClick={handleSubmit}
          >
            Clear filters
          </button>
        </form>
        <div className="pt-2 text-slate-400 flex  items-center space-x-1 border-t mt-2 mb-1 border-slate-500">
          <div className="flex space-x-2">
            <div className="flex space-x-1 items-center py-1 px-2 rounded-lg border border-slate-700 shadow-lg bg-slate-500 text-slate-200 text-sm">
              <p className="text-slate-800">
                <IoIosAlbums />
              </p>
              <p className="font-bold">{numOfAllArts}</p>
            </div>
            <div className="flex space-x-1 items-center py-1 px-2 rounded-lg border border-slate-700 shadow-lg bg-slate-500 text-slate-200 text-sm">
              <p className="text-yellow-500">
                <FaStar />
              </p>
              <p className="font-bold">{numOfExhibFavorite}</p>
            </div>
          </div>
          <p className="text-sm italic  w-full text-center">
            {totalArts} collector's item{totalArts > 1 && 's'} found with your
            current selection. Including {favoriteArtsByPage} favorite
            {favoriteArtsByPage > 1 && 's'} in this page
          </p>
        </div>
      </div>

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
          {arts.map((art, index) => {
            return (
              <ThumbnailArts
                key={index}
                title={art.exibitionTitle}
                imageUrl={art.imageLargestUrl}
                imageCaption={art.imageCaption}
                imageCitation={art.imageCitation}
                imageDate={art.imageDate}
                artId={art._id}
                isFavorite={art.isFavorite}
                deleteFunc={() => deleteExhibArt(art._id)}
                addToFavoriteFunc={() =>
                  addExhibitionArtToFavorite(
                    art._id,
                    art.isFavorite ? false : true
                  )
                }
              />
            )
          })}
        </div>
      </motion.div>

      {numOfPages > 1 && <ExhibBtnContainer />}
    </div>
  )
}

export default ExhibArtsContainer
