import React, { useState, useEffect } from 'react'
import axios from 'axios'

import { getObject } from './API'

let config = { api_key: process.env.NEXT_PUBLIC_API_KEY }
let url = process.env.NEXT_PUBLIC_API_URL
let objectImageUrl = process.env.NEXT_PUBLIC_API_URL_IMAGE

// max objet offset : 92765
// setTheArray(oldArray => [...oldArray, newElement]);

const Card = (props) => {
  const { title, imageUrl } = props
  return (
    <div className="border">
      <p>{title}</p>
      <img src={imageUrl} alt={title} />
    </div>
  )
}

const BkmObjet = () => {
  const [myBkmObject, setMyBkmObject] = useState([])

  useEffect(() => {
    const response = async () => {
      const data = await getObject()
      console.log(data[0].primary_image)

      setMyBkmObject(() => [...data])
    }
    response()
  }, [])

  console.log(myBkmObject)

  return (
    <div className="">
      <div className="container mx-auto">
        <div className="my-20 border-t-2 border-slate-200">
          <h1 className="bg-slate-100 text-2xl md:text-4xl font-thin text-slate-700 w-max mx-auto px-10 -translate-y-6">
            Some of our{' '}
            <span className="uppercase font-bold text-slate-600">
              masterpieces
            </span>
          </h1>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {myBkmObject.map((item, index) => {
            return (
              <Card
                key={index}
                title={item.title}
                imageUrl={`${objectImageUrl}/size2/${item.primary_image}`}
              />
            )
          })}
        </div>
      </div>
    </div>
  )
}

export default BkmObjet
