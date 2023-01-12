import React from 'react'

const PageSelector = (props) => {
  const { pagesArray, currentPage, numOfAllPages, func } = props

  const activepageStyle =
    'p-1 h-9 w-9 font-bold text-slate-200 bg-slate-800 transition-all duration-500 active:shadow-lg active:scale-110 shadow-lg scale-110'
  const unActivepageStyle =
    'p-1 h-9 w-9 text-slate-800 bg-slate-200 hover:text-slate-800 hover:bg-slate-200 transition-all duration-150 active:shadow-lg active:scale-110'

  return (
    <div
      className={
        numOfAllPages > 10
          ? 'pb-2 w-72 flex overflow-x-visible overflow-y-hidden scrollbar'
          : 'pb-2 flex '
      }
    >
      {pagesArray.map((pageNumber) => {
        return (
          <button
            onClick={() => func(pageNumber)}
            type="button"
            key={pageNumber}
            className={
              pageNumber === currentPage ? activepageStyle : unActivepageStyle
            }
          >
            {pageNumber}
          </button>
        )
      })}
    </div>
  )
}

export default PageSelector
