import React from 'react'

import { useAppContext } from '../context/appContext'

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

  return (
    <div>
      <button className="" onClick={prevPage}>
        prev
      </button>

      <div>
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
      </div>

      <button onClick={nextPage}>next</button>
    </div>
  )
}

export default ExhibBtnContainer
