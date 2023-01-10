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
    pageCollec
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
    pageCollec
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

  console.log(artsCollec)
  // console.log(totalCollecArts)

  return (
    <div>
      <div className="border w-max mx-auto p-2 rounded bg-slate-800 bg-opacity-60">
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
        <div className="pt-1 italic text-slate-400 flex justify-center space-x-1 border-t my-2 border-slate-500">
          <p>
            {totalCollecArts} Collections art{totalCollecArts > 1 && 's'} found
            in your collection,
          </p>
          <p>{numOfCollecFavorite} favorite(s) in total and</p>
          <p>{favoriteArtsByPage} favorite(s) in this page</p>
        </div>
      </div>

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
      {<CollecBtnContainer />}
    </div>
  )
}

export default CollecArtsContainer
