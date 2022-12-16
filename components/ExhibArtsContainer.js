import React, { useEffect } from 'react'

import { useAppContext } from '../context/appContext'

import ThumbnailArts from './ThumbnailArts'

const ExhibArtsContainer = () => {
  const {
    getAllUserArts,
    arts,
    isLoading,
    totalArts,
    deleteExhibArt,
    addExhibitionArtToFavorite
  } = useAppContext()

  useEffect(() => {
    getAllUserArts()
  }, [])

  // console.log(arts)

  return (
    <div className="px-1">
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
