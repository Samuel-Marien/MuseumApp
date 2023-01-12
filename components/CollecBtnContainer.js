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

  return (
    <div className="mt-5 pt-3 flex justify-center space-x-1 border-t border-slate-300  w-full">
      <div>
        <MySelectorBtn icon={<BiArrowToLeft />} onClick={firstPage} />
        <MySelectorBtn icon={<BiLeftArrowAlt />} onClick={prevPage} />
      </div>
      <PageSelector
        pagesArray={pages}
        func={changeCollecPage}
        currentPage={pageCollec}
        numOfAllPages={numOfCollecPages}
      />
      <div>
        <MySelectorBtn icon={<BiRightArrowAlt />} onClick={nextPage} />
        <MySelectorBtn icon={<BiArrowToRight />} onClick={lastPage} />
      </div>
    </div>
  )
}

export default CollecBtnContainer
