import React, { useEffect } from 'react'

import { useAppContext } from '../context/appContext'

import ThumbnailArts from './ThumbnailArts'

const ExhibArtsContainer = () => {
  const { getAllUserArts, arts, isLoading, totalArts } = useAppContext()

  useEffect(() => {
    getAllUserArts()
  }, [])

  // console.log(arts)

  return (
    <div>
      {totalArts} Exhibition art{totalArts > 1 && 's'} found
      <div className="grid grid-cols-6 gap-2">
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
            />
          )
        })}
      </div>
    </div>
  )
}

export default ExhibArtsContainer
