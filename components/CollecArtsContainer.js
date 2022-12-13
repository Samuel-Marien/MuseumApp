import React, { useEffect } from 'react'

import { useAppContext } from '../context/appContext'

import ThumbnailArts from './ThumbnailArts'

let myImgUrl = process.env.NEXT_PUBLIC_API_URL_IMAGE_OBJECTS

const CollecArtsContainer = () => {
  const { getAllCollectionUserArts, artsCollec, isLoading, totalCollecArts } =
    useAppContext()

  useEffect(() => {
    getAllCollectionUserArts()
  }, [])

  console.log(artsCollec)
  console.log(totalCollecArts)

  return (
    <div className="grid grid-cols-6 gap-2">
      {artsCollec.map((art, index) => {
        return (
          <ThumbnailArts
            key={index}
            title={art.artTitle}
            imageUrl={`${myImgUrl}/size4/${art.primaryImage}`}
          />
        )
      })}
    </div>
  )
}

export default CollecArtsContainer
