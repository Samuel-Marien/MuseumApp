import React from 'react'

import Landing from '../components/Landing'
import LandingExhibition from '../components/LandingExhibition'
import LandingCollections from '../components/LandingCollections'
import Footer from '../components/Footer'
import MyHeader from '../components/MyHeader'

const Home = () => {
  return (
    <div>
      <MyHeader description="Landing page" />
      <main className="bg-slate-100 ">
        <Landing />
        <LandingExhibition />
        <LandingCollections />
        <Footer />
      </main>
    </div>
  )
}

export default Home
