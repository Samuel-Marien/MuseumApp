import React from 'react'
import Head from 'next/head'

import { useAppContext } from '../context/appContext'

const siteTitle = 'Brooklyn Museum'

const MyHeader = (props) => {
  const { description } = props
  const { user } = useAppContext()

  // console.log(user)
  const userName = user ? user.name : 'Visitor not logged in'

  return (
    <Head>
      <title>{siteTitle + ' | ' + userName}</title>
      <meta name="description" content={siteTitle + ' - ' + description} />
      <meta name="author" content="Samuel Marien" />
      <meta name="viewport" content="width=device-width, initial-scale=1.0" />
      <link rel="icon" href="/favicon.ico" />
    </Head>
  )
}

export default MyHeader
