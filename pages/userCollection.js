import React, { useEffect } from 'react'
import { useRouter } from 'next/router'

import { useAppContext } from '../context/appContext'

import ExhibArtsContainer from '../components/ExhibArtsContainer'
import CollecArtsContainer from '../components/CollecArtsContainer'
import Navbar from '../components/Navbar'
import MyHeader from '../components/MyHeader'

const userCollection = () => {
  const router = useRouter()
  const { user, artsCategory } = useAppContext()

  useEffect(() => {
    if (!user) {
      router.push('/login')
    }
  }, [user, router])

  return (
    <>
      <MyHeader description="User collection page" />
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
        <div className="w-full flex justify-center">
          <h1 className="text-5xl md:text-7xl font-bold uppercase text-slate-200">
            {artsCategory === 'Exhibition' ? 'Exhibition' : 'Collection'}
          </h1>
        </div>
        <div className="mt-5 container mx-auto w-full pb-20">
          {artsCategory === 'Exhibition' && <ExhibArtsContainer />}
          {artsCategory === 'Collection' && <CollecArtsContainer />}
        </div>
      </div>
    </>
  )
}

export default userCollection
