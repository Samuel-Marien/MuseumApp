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
        background: 'url(images/landingUserCollection.png)',
        backgroundSize: 'cover',
        backgroundPosition: ' center',
        backgroundRepeat: 'no-repeat'
      }}
    >
      <Navbar />
      <div className="container mx-auto w-full pb-20">
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
            initial={{ opacity: 0.6, scale: 0.99 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{
              duration: 0.7
            }}
          >
            <ExhibArtsContainer />
          </motion.div>
        )}
        {artToDisplay === 'collec' && (
          <motion.div
            initial={{ opacity: 0.6, scale: 0.99 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{
              duration: 0.7
            }}
          >
            <CollecArtsContainer />
          </motion.div>
        )}
      </div>
    </div>
  )
}

export default userCollection
