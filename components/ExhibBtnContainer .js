import React from 'react'

import { useAppContext } from '../context/appContext'

import MySelectorBtn from './MySelectorBtn'
import PageSelector from './PageSelector'

import {
  BiArrowToLeft,
  BiArrowToRight,
  BiLeftArrowAlt,
  BiRightArrowAlt
} from 'react-icons/bi'

const ExhibBtnContainer = () => {
  const { numOfPages, exhibPage, changeExhibPage } = useAppContext()

  const pages = Array.from({ length: numOfPages }, (_, index) => {
    return index + 1
  })

  const prevPage = () => {
    let newPage = exhibPage - 1
    if (newPage < 1) {
      newPage = numOfPages
    }
    changeExhibPage(newPage)
  }

  const nextPage = () => {
    let newPage = exhibPage + 1
    if (newPage > numOfPages) {
      newPage = 1
    }
    changeExhibPage(newPage)
  }

  const firstPage = () => {
    changeExhibPage(1)
  }
  const lastPage = () => {
    changeExhibPage(numOfPages)
  }

  return (
    <div className="mt-5 pt-3 flex justify-center space-x-1 border-t border-slate-300  w-full">
      <div>
        <MySelectorBtn icon={<BiArrowToLeft />} onClick={firstPage} />
        <MySelectorBtn icon={<BiLeftArrowAlt />} onClick={prevPage} />
      </div>

      {/* <div>
        {pages.map((pageNumber) => {
          return (
            <button
              onClick={() => changeExhibPage(pageNumber)}
              type="button"
              key={pageNumber}
              className={
                pageNumber === exhibPage ? 'bg-red-500' : 'bg-blue-500'
              }
            >
              {pageNumber}
            </button>
          )
        })}
      </div> */}

      <PageSelector
        pagesArray={pages}
        func={changeExhibPage}
        currentPage={exhibPage}
        numOfAllPages={numOfPages}
      />

      <div>
        <MySelectorBtn icon={<BiRightArrowAlt />} onClick={nextPage} />
        <MySelectorBtn icon={<BiArrowToRight />} onClick={lastPage} />
      </div>
    </div>
  )
}

export default ExhibBtnContainer
