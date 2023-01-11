import React from 'react'

import { useAppContext } from '../context/appContext'

import {
  BiArrowToLeft,
  BiArrowToRight,
  BiLeftArrowAlt,
  BiRightArrowAlt
} from 'react-icons/bi'

const MyButton = (props) => {
  const { onClick, icon } = props
  return (
    <button
      className="border p-1 h-9 w-9 text-2xl text-slate-800 bg-slate-200 hover:text-slate-200  hover:bg-slate-800 transition-all duration-300 active:shadow-lg active:scale-110"
      onClick={onClick}
    >
      {icon}
    </button>
  )
}

const CollecBtnContainer = () => {
  const { numOfCollecPages, pageCollec, changeCollecPage } = useAppContext()

  const pages = Array.from({ length: numOfCollecPages }, (_, index) => {
    return index + 1
  })

  const prevPage = () => {
    let newPage = pageCollec - 1
    if (newPage < 1) {
      newPage = numOfCollecPages
    }
    changeCollecPage(newPage)
  }
  const nextPage = () => {
    let newPage = pageCollec + 1
    if (newPage > numOfCollecPages) {
      newPage = 1
    }
    changeCollecPage(newPage)
  }
  const firstPage = () => {
    changeCollecPage(1)
  }
  const lastPage = () => {
    changeCollecPage(numOfCollecPages)
  }

  const activepageStyle =
    'p-1 h-9 w-9 font-bold text-slate-200 bg-slate-800  transition-all duration-500 active:shadow-lg active:scale-110 shadow-lg scale-110'
  const unActivepageStyle =
    'p-1 h-9 w-9 text-slate-800 bg-slate-200 hover:text-slate-800 hover:bg-slate-200 transition-all duration-150 active:shadow-lg active:scale-110'

  return (
    <div className="mt-5 pt-3 flex justify-center space-x-1 border-t border-slate-300  w-full">
      <div>
        <MyButton icon={<BiArrowToLeft />} onClick={firstPage} />
        <MyButton icon={<BiLeftArrowAlt />} onClick={prevPage} />
      </div>

      <div className="pb-2 flex w-72 overflow-x-visible overflow-y-hidden scrollbar">
        {pages.map((pageNumber) => {
          return (
            <button
              onClick={() => changeCollecPage(pageNumber)}
              type="button"
              key={pageNumber}
              className={
                pageNumber === pageCollec ? activepageStyle : unActivepageStyle
              }
            >
              {pageNumber}
            </button>
          )
        })}
      </div>
      <div>
        <MyButton icon={<BiRightArrowAlt />} onClick={nextPage} />
        <MyButton icon={<BiArrowToRight />} onClick={lastPage} />
      </div>
    </div>
  )
}

export default CollecBtnContainer
