import React from 'react'
import Link from 'next/link'

import { MdEventAvailable, MdEventBusy } from 'react-icons/md'

const Card = (props) => {
  const {
    title,
    text,
    myUrl,
    dateStart,
    dateEnd,
    id,
    isLoading,
    onClick,
    cardSize
  } = props

  if (isLoading) {
    return (
      <Link
        href={{
          pathname: '/exhibitions/exhibition',
          query: { id }
        }}
      >
        <div className="bg-white shadow-lg cursor-pointer hover:shadow-sm transition-all duration-500 rounded flex flex-col p-3 md:p-0">
          <div className="overflow-hidden ">
            <img
              style={{ width: '100%', height: cardSize }}
              src={myUrl}
              alt={title}
              className="hover:scale-110 transition-all duration-500"
            />
          </div>
          <div className="p-4">
            <div className="flex justify-between">
              <p className="text-xs flex items-center">
                <span className="text-base text-slate-500">
                  <MdEventAvailable />
                </span>
                {dateStart}
              </p>
              <p className="text-xs flex items-center">
                <span className="text-base text-slate-500">
                  <MdEventBusy />
                </span>

                {dateEnd}
              </p>
            </div>
            <p className="text-slate-500 my-2">{text}</p>
            <h1 className="text-2xl font-bold mt-5">
              {title.length > 40 ? title.slice(0, 40) + '...' : title}
            </h1>
          </div>
        </div>
      </Link>
    )
  }
  return (
    <button onClick={onClick}>
      <div className="bg-white shadow-lg  hover:shadow-sm transition-all duration-500 rounded flex flex-col p-3 md:p-0">
        <div className="overflow-hidden ">
          <img
            style={{ width: '100%', height: '18rem' }}
            src={myUrl}
            alt={title}
            className="hover:scale-110 transition-all duration-500"
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
    </button>
  )
}

export default Card
