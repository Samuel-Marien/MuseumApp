import React, { useEffect, useState } from 'react'
import { useRouter } from 'next/router'

import { useAppContext } from '../../context/appContext'
import { getExhibition } from '../../components/API'

import MyHeader from '../../components/MyHeader'
import Navbar from '../../components/Navbar'
import Card from '../../components/Card'

import {
  BsFillArrowLeftCircleFill,
  BsFillArrowRightCircleFill
} from 'react-icons/bs'

const imageUrl = process.env.NEXT_PUBLIC_API_URL_IMAGE_EXHIBITION
const replacementImage = '../images/landing8.jpg'

const ExhibitionHome = () => {
  const router = useRouter()
  const { user } = useAppContext()
  const [myExhibitions, setMyExhibitions] = useState([])
  const [myOffset, setMyOffset] = useState(0)

  // check authentication:
  useEffect(() => {
    if (!user) {
      router.push('/login')
    }
  }, [user, router])

  const maxPlusOffset = 2752
  const itemByPage = 12

  useEffect(() => {
    const response = async () => {
      const data = await getExhibition(itemByPage, myOffset)
      setMyExhibitions(data)
    }
    response()

    return function cleanup() {
      console.log('clean')
    }
  }, [itemByPage, myOffset])

  const handlePlusOffset = () => {
    return myOffset === maxPlusOffset
      ? setMyOffset(0)
      : setMyOffset((myOffset += itemByPage))
  }

  const handleMinusOffset = () => {
    return myOffset === 0
      ? setMyOffset(maxPlusOffset)
      : setMyOffset((myOffset -= itemByPage))
  }

  // console.log(myOffset)
  // console.log(router)

  return (
    <>
      <MyHeader description="Exhibitions Home" />
      <div
        className="text-slate-700 h-screen"
        style={{
          background: 'url(../images/landing42.png)',
          backgroundSize: 'cover',
          backgroundPosition: ' bottom',
          backgroundRepeat: 'no-repeat'
        }}
      >
        <Navbar />
        <div className="container mx-auto">
          <div>
            <p className="text-5xl text-slate-400 font-bold text-center mt-5">
              All our Exhibitions
            </p>

            <div className="my-5 p-1 flex justify-center space-x-4 text-slate-400">
              <button
                onClick={handleMinusOffset}
                className="text-3xl hover:scale-105 hover:text-slate-300 active:text-slate-500 active:scale-95 transition-all duration-300"
              >
                <BsFillArrowLeftCircleFill />
              </button>
              <div className=" p-1 flex justify-center space-x-4 text-slate-400 w-36">
                <p>
                  Page : {Math.ceil(myOffset / itemByPage + 1)} /{' '}
                  {Math.ceil(maxPlusOffset / itemByPage + 1)}
                </p>
              </div>
              <button
                onClick={handlePlusOffset}
                className="text-3xl hover:scale-105 hover:text-slate-300 active:text-slate-500 active:scale-95 transition-all duration-300"
              >
                <BsFillArrowRightCircleFill />
              </button>
            </div>
          </div>
          <div
            className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 
        lg:grid-cols-4 xl:grid-cols-6 gap-6 p-4 sm:p-0"
          >
            {myExhibitions.map((item) => {
              return (
                <Card
                  userConnected={user}
                  key={item.id}
                  cardSize="12rem"
                  isLoading={user}
                  id={item.id}
                  title={item.title}
                  text={item.organizing_department}
                  dateStart={item.start_date}
                  dateEnd={item.end_date}
                  myUrl={
                    item.primary_image
                      ? `${imageUrl}/size2/${item.primary_image}`
                      : replacementImage
                  }
                />
              )
            })}
          </div>
        </div>
      </div>
    </>
  )
}

export default ExhibitionHome
