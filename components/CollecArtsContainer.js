import React, { useEffect } from 'react'

import { useAppContext } from '../context/appContext'
import FormRow from './FormRow'
import FormRowSelect from './FormRowSelect'
import ThumbnailArts from './ThumbnailArts'
import CollecBtnContainer from './CollecBtnContainer'

import { FaSearch, FaStar } from 'react-icons/fa'
import { MdOutlineSort } from 'react-icons/md'
import { IoIosAlbums, IoIosCalendar } from 'react-icons/io'
import { BiCategory } from 'react-icons/bi'

let myImgUrl = process.env.NEXT_PUBLIC_API_URL_IMAGE_OBJECTS

const CollecArtsContainer = () => {
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
  }

  const favoriteArtsByPage = artsCollec.filter((item) => item.isFavorite).length

  // console.log(artsCollec)
  // console.log(numOfAllArts)

  return (
    <div>
      <div className=" w-max mx-auto p-2 rounded bg-slate-800 bg-opacity-60">
        <form className=" flex space-x-10 items-center justify-center px-7">
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
            labelText={<BiCategory />}
            name="category"
            value={category}
            onChange={handleSearch}
            list={categoryOptions}
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
          <FormRowSelect
            labelText={<FaStar />}
            name="favoriteArtsOnly"
            value={favoriteArtsOnly}
            onChange={handleSearch}
            list={favoriteOptions}
          ></FormRowSelect>

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
              <p className="font-bold">{numOfCollecFavorite}</p>
            </div>
          </div>
          <p className="text-sm italic  w-full text-center">
            {totalCollecArts} collector's item{totalCollecArts > 1 && 's'} found
            with your current selection. Including {favoriteArtsByPage} favorite
            {favoriteArtsByPage > 1 && 's'} in this page
          </p>
        </div>
      </div>

      {/* Thumbnails  */}
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
      {numOfCollecPages > 1 && <CollecBtnContainer />}
    </div>
  )
}

export default CollecArtsContainer
