import React, { useEffect, useState } from 'react'
import { getExhibition } from './API'

import MyButton from './MyButton'

import { MdEventAvailable, MdEventBusy } from 'react-icons/md'

let imageUrl = process.env.NEXT_PUBLIC_API_URL_IMAGE_EXHIBITION

const Card = (props) => {
  const { title, text, myUrl, dateStart, dateEnd } = props
  return (
    <div className="bg-white shadow-lg cursor-pointer hover:shadow-sm transition-all duration-500 rounded flex flex-col p-3 md:p-0">
      <div className="overflow-hidden ">
        <img
          src={myUrl}
          alt={title}
          className="hover:scale-110 transition-all duration-500 "
        />
      </div>
      <div className="p-4">
        <div className="flex justify-between">
          <p className="text-sm flex items-center">
            <span className="text-base text-slate-500">
              <MdEventAvailable />
            </span>
            {dateStart}
          </p>
          <p className="text-sm flex items-center">
            <span className="text-base text-slate-500">
              <MdEventBusy />
            </span>

            {dateEnd}
          </p>
        </div>
        <p className="text-slate-500 my-2">{text}</p>
        <h1 className="text-2xl font-bold mt-5">{title}</h1>
      </div>
    </div>
  )
}

const Exhibition = () => {
  const [myExhibition, setMyExhibition] = useState([])

  useEffect(() => {
    const response = async () => {
      const data = await getExhibition()
      setMyExhibition(data)
    }
    response()
  }, [])

  // console.log(myExhibition)

  return (
    <div className="flex flex-col justify-between">
      <div className="container mx-auto">
        <div className="my-20 border-t-2 border-slate-200">
          <h1 className="bg-slate-100 text-2xl md:text-4xl font-thin text-slate-700 w-max mx-auto px-10 -translate-y-6">
            Our latest{' '}
            <span className="uppercase font-bold text-slate-600">
              exhibitions
            </span>
          </h1>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {myExhibition &&
            myExhibition.map((item, index) => {
              return (
                <Card
                  key={index}
                  title={item.title}
                  text={item.organizing_department}
                  dateStart={item.start_date}
                  dateEnd={item.end_date}
                  myUrl={`${imageUrl}/size2/${item.primary_image}`}
                />
              )
            })}
        </div>
        <div className=" my-32 w-max mx-auto">
          <MyButton title="+ More exhibitions" href="/" />
        </div>
      </div>
    </div>
  )
}

export default Exhibition
