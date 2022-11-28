import React, { useState } from 'react'

import { motion } from 'framer-motion'

import ExhibArtsContainer from '../components/ExhibArtsContainer'
import CollecArtsContainer from '../components/CollecArtsContainer'
import Navbar from '../components/Navbar'
import SearchContainer from '../components/SearchContainer'

const userCollection = () => {
  const [artToDisplay, setArtToDisplay] = useState('exhib')
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
      <div className="container mx-auto w-full ">
        <SearchContainer />
        <div className="flex space-x-2">
          <button
            onClick={() => setArtToDisplay('exhib')}
            className="border rounded p-1"
          >
            exhib
          </button>
          <button
            onClick={() => setArtToDisplay('collec')}
            className="border rounded p-1"
          >
            collec
          </button>
        </div>
        {artToDisplay === 'exhib' && (
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{
              duration: 1
            }}
          >
            <ExhibArtsContainer />
          </motion.div>
        )}
        {artToDisplay === 'collec' && <CollecArtsContainer />}
      </div>
    </div>
  )
}

export default userCollection
