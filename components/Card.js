import React from 'react'
import Link from 'next/link'

import {
  MdEventAvailable,
  MdEventBusy,
  MdCollectionsBookmark
} from 'react-icons/md'

const Card = (props) => {
  const {
    title,
    text,
    myUrl,
    dateStart,
    dateEnd,
    id,
    cardSize,
    onClick,
    userConnected
  } = props

  return (
    //
    <>
      {userConnected ? (
        <Link
          href={{
            pathname: '/exhibitions/exhibition',
            query: { id }
          }}
        >
          <div
            onClick={onClick}
            className="bg-white shadow-lg cursor-pointer hover:shadow-sm transition-all duration-500 rounded flex flex-col p-3 md:p-0"
          >
            <div className="overflow-hidden ">
              <img
                style={{ width: '100%', height: cardSize }}
                src={myUrl}
                alt={title}
                className="hover:scale-110 transition-all duration-500"
              />
            </div>
            <div className="px-4 py-2">
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
              <h1 className="text-xl font-semibold mt-2 border-t py-1">
                {title.length > 32 ? title.slice(0, 32) + '...' : title}
              </h1>
              <p className="text-slate-500 my-1 text-sm flex items-center justify-center">
                <span className="mr-1">
                  <MdCollectionsBookmark />
                </span>
                {text}
              </p>
            </div>
          </div>
        </Link>
      ) : (
        <div
          onClick={onClick}
          className="bg-white shadow-lg cursor-pointer hover:shadow-sm transition-all duration-500 rounded flex flex-col p-3 md:p-0"
        >
          <div className="overflow-hidden ">
            <img
              style={{ width: '100%', height: cardSize }}
              src={myUrl}
              alt={title}
              className="hover:scale-110 transition-all duration-500"
            />
          </div>
          <div className="px-4 py-2">
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
            <h1 className="text-xl font-semibold mt-2 border-t py-1">
              {title.length > 32 ? title.slice(0, 32) + '...' : title}
            </h1>
            <p className="text-slate-500 my-1 text-sm flex items-center justify-center">
              <span className="mr-1">
                <MdCollectionsBookmark />
              </span>
              {text}
            </p>
          </div>
        </div>
      )}
    </>
  )
}

export default Card
