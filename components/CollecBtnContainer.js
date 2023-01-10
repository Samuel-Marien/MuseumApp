import React from 'react'

import { useAppContext } from '../context/appContext'

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

  return (
    <div>
      <button className="" onClick={prevPage}>
        prev
      </button>

      <div>
        {pages.map((pageNumber) => {
          return (
            <button
              onClick={() => changeCollecPage(pageNumber)}
              type="button"
              key={pageNumber}
              className={
                pageNumber === pageCollec ? 'bg-red-500' : 'bg-blue-500'
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

export default CollecBtnContainer
