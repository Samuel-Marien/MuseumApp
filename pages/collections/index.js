import React from 'react'
import Navbar from '../../components/Navbar'

const CollectionsHome = () => {
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
