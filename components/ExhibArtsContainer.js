import React, { useEffect } from 'react'

import { useAppContext } from '../context/appContext'

import ThumbnailArts from './ThumbnailArts'
import ExhibBtnContainer from './ExhibBtnContainer '

import { FaSearch, FaStar } from 'react-icons/fa'
import { MdOutlineSort } from 'react-icons/md'
import { IoIosAlbums, IoIosCalendar } from 'react-icons/io'

const FormRow = (props) => {
  const { type, name, value, onChange, labelText } = props
  return (
    <div className="flex items-center">
      <label htmlFor={name} className="text-xl mr-2 text-slate-200">
        {labelText || name}
      </label>
      <input
        type={type}
        value={value}
        name={name}
        onChange={onChange}
        className=""
      />
    </div>
  )
}

const FormRowSelect = (props) => {
  const { labelText, name, value, onChange, list } = props
  return (
    <div className="flex items-center">
      <label htmlFor="jobType" className="text-xl mr-2 text-slate-200">
        {labelText || name}
      </label>

      <select name={name} value={value} onChange={onChange} className="">
        {list.map((itemValue, index) => {
          return (
            <option key={index} value={itemValue}>
              {itemValue}
            </option>
          )
        })}
      </select>
    </div>
  )
}

const ExhibArtsContainer = () => {
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
    artsCategory
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
    artsCategory
  ])
  // console.log(numOfExhibFavorite)

  const handleSubmit = (e) => {
    e.preventDefault()
    clearFilters()
  }

  const handleSearch = (e) => {
    if (isLoading) return
    handleChange({ name: e.target.name, value: e.target.value })
  }

  const favoriteArtsByPage = arts.filter((item) => item.isFavorite).length

  return (
    <div>
      <div className="w-max mx-auto p-2 rounded bg-slate-800 bg-opacity-60">
        <form className="flex space-x-10 items-center justify-center px-7">
          <FormRowSelect
            labelText={
              artsCategory !== 'Exhibition' ? (
                <IoIosCalendar />
              ) : (
                <IoIosAlbums />
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
            {totalArts} Exhibition art{totalArts > 1 && 's'} found in your
            collection,
          </p>
          <p>{numOfExhibFavorite} favorite(s) in total and</p>
          <p>{favoriteArtsByPage} favorite(s) in this page</p>
        </div>
      </div>

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
      {numOfPages > 1 && <ExhibBtnContainer />}
    </div>
  )
}

export default ExhibArtsContainer
