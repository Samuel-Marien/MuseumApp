// Useless component for now...

import React, { useEffect, useState } from 'react'
import { getCollection } from './API'

let imageUrl = process.env.NEXT_PUBLIC_API_URL_IMAGE

const Card = (props) => {
  const { name, text, image } = props
  return (
    <div className="border flex">
      {/* <div className="overflow-hidden w-full ">
        <img
          src={image}
          alt={name}
          className=" hover:scale-110 transition-all duration-500"
        />
      </div> */}
      <div>
        <div className="flex justify-between">
          <h1>{name}</h1>
          <p>4905 items</p>
        </div>
        <p>{text.slice(0, 100)}...</p>
      </div>
    </div>
  )
}

const Discover = () => {
  const [myCollection, setMyCollection] = useState([])
  const [myImage, setMyImage] = useState([])

  useEffect(() => {
    try {
      getCollection().then((coll) => setMyCollection(coll.data.data))
    } catch (error) {
      console.log(error)
    }
  }, [])

  useEffect(() => {
    const myArray = []
    myCollection.map((item) => {
      if (item.highlight_images[0] === undefined) {
        myArray.push('no images source')
      } else {
        myArray.push(item.highlight_images[0].primary_image)
      }
    })
    // console.log(myArray)
    setMyImage(myArray)
  }, [myCollection])

  console.log(myImage)
  // console.log(myCollection ? myCollection : 'null')

  return (
    <div className="h-screen">
      <main className="px-10">
        <h1>Discovers our Collections</h1>
        <div className="grid grid-cols-4 gap-8">
          {myCollection.map((item, index) => {
            return (
              <Card
                key={index}
                name={item.name}
                text={item.copy_text}
                // image={`${imageUrl}/size2/${
                //   item.highlight_images[0] !== undefined
                //     ? item.highlight_images[0].primary_image
                //     : '42.45_SL3.jpg'
                // }`}
              />
            )
          })}
        </div>
      </main>
    </div>
  )
}

export default Discover
