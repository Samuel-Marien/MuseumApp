import React, { useState, useEffect } from 'react'

import { getHarvardArt } from './API'

const Card = (props) => {
  const { title, text, myUrl } = props
  return (
    <div className="flex bg-white shadow-lg cursor-pointer hover:shadow-sm transition-all duration-500 roundedp-3 md:p-0">
      <div className="overflow-hidden ">
        <img
          style={{ width: 'auto', height: '250px' }}
          src={myUrl}
          alt={title}
          className="w-full hover:scale-110 transition-all duration-500 "
        />
      </div>
      <div className="p-4">
        <p className="text-slate-500 my-2">{text}</p>
        <h1 className="text-2xl font-bold mt-5">
          {title.length > 25 ? title.slice(0, 25) + '...' : title}
        </h1>
      </div>
    </div>
  )
}

const LandingArts = () => {
  const [arts, setArts] = useState([])

  useEffect(() => {
    const response = async () => {
      const data = await getHarvardArt()
      setArts(data)
    }
    response()
  }, [])

  console.log(arts)

  return (
    <div className="container mx-auto">
      <div className="my-20 border-t-2 border-slate-200">
        <h1 className="bg-slate-100 text-2xl md:text-4xl font-thin text-slate-700 w-max mx-auto px-10 -translate-y-6">
          Some of our{' '}
          <span className="uppercase font-bold text-slate-600">
            masterpieces
          </span>
        </h1>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        {arts.map((item) => {
          return (
            <Card
              key={item.id}
              title={item.title}
              myUrl={item.primaryimageurl}
            />
          )
        })}
      </div>
    </div>
  )
}

export default LandingArts
