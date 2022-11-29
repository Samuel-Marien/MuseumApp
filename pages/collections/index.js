import React, { useEffect, useState } from 'react'
import { useRouter } from 'next/router'

import { getAllArtsByCollec } from '../../components/API'
import useHasMounted from '../../components/hooks/useHasMounted'

import Navbar from '../../components/Navbar'

const CollectionsHome = () => {
  const router = useRouter()
  const { id } = router.query
  const [myCollection, setMyCollection] = useState([])

  console.log(router)

  useEffect(() => {
    // router.isReady => fetch info on reload
    if (router.isReady) {
      const response = async () => {
        const data = await getAllArtsByCollec(id, 20)
        setMyCollection(data)
      }
      response()
    }
    return function cleanup() {
      console.log('clean')
    }
  }, [router.isReady])
  console.log(myCollection)

  const hasMounted = useHasMounted()
  if (!hasMounted) {
    return null
  }

  return (
    <div
      className="h-screen "
      style={{
        background: 'url(images/landingUserCollection.jpg)',
        backgroundSize: 'cover',
        backgroundPosition: ' center',
        backgroundRepeat: 'no-repeat'
      }}
    >
      <Navbar />
    </div>
  )
}

export default CollectionsHome
