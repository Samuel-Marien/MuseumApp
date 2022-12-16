import React, { useEffect } from 'react'

import { useAppContext } from '../context/appContext'

import ThumbnailArts from './ThumbnailArts'

let myImgUrl = process.env.NEXT_PUBLIC_API_URL_IMAGE_OBJECTS

const CollecArtsContainer = () => {
  const {
    getAllCollectionUserArts,
    artsCollec,
    isLoading,
    totalCollecArts,
    deleteCollecArt,
    addCollectionArtToFavorite
  } = useAppContext()

  useEffect(() => {
    getAllCollectionUserArts()
  }, [])

  // console.log(artsCollec)
  // console.log(totalCollecArts)

  return (
    <div className="px-1">
      {totalCollecArts} Collection art{totalCollecArts > 1 && 's'} found
      <div
        className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 
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
    </div>
  )
}

export default CollecArtsContainer
