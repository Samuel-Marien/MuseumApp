import React, { useEffect } from 'react'

import { useAppContext } from '../context/appContext'

import ThumbnailArts from './ThumbnailArts'

const FormRow = (props) => {
  const { type, name, value, onChange, labelText } = props
  return (
    <div className="form-row">
      <label htmlFor={name} className="form-label">
        {labelText || name}
      </label>
      <input
        type={type}
        value={value}
        name={name}
        onChange={onChange}
        className="form-input"
      />
    </div>
  )
}

const FormRowSelect = (props) => {
  const { labelText, name, value, onChange, list } = props
  return (
    <div className="form-row">
      <label htmlFor="jobType" className="form-label">
        {labelText || name}
      </label>

      <select
        name={name}
        value={value}
        onChange={onChange}
        className="form-select"
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
    favoriteOptions
  } = useAppContext()

  useEffect(() => {
    getAllUserArts()
  }, [search, sort, favoriteArtsOnly, favoriteOptions])

  // console.log(arts)
  const handleSearch = (e) => {
    if (isLoading) return
    console.log(e.target.name)
    handleChange({ name: e.target.name, value: e.target.value })
  }

  return (
    <div className="px-1">
      <div className="h-36 border w-full my-5">
        <form>
          <FormRow
            type="text"
            name="search"
            value={search}
            onChange={handleSearch}
          ></FormRow>
          <FormRowSelect
            name="sort"
            value={sort}
            onChange={handleSearch}
            list={sortOptions}
          ></FormRowSelect>
          <FormRowSelect
            labelText="favorite"
            name="favoriteArtsOnly"
            value={favoriteArtsOnly}
            onChange={handleSearch}
            list={favoriteOptions}
          ></FormRowSelect>
        </form>
      </div>
      {totalArts} Exhibition art{totalArts > 1 && 's'} found
      <div
        className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 
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
    </div>
  )
}

export default ExhibArtsContainer
