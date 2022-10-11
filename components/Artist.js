// Useless component for now...

import React, { useState, useEffect } from 'react'
import axios from 'axios'

let config = { api_key: process.env.NEXT_PUBLIC_API_KEY }
let url = process.env.NEXT_PUBLIC_API_URL

const Artist = () => {
  const [myArtist, setMyArtist] = useState([])

  useEffect(() => {
    for (let i = 0; i < 2; i++) {
      let random = Math.floor(Math.random() * 12284)
      let randomArtist = Math.floor(Math.random() * 34)
      try {
        axios
          .get(`${url}/artist?limit=35&offset=${random}`, {
            headers: config
          })
          .then((value) => {
            const myValues = value.data.data
            myValues.map((item, index) => {
              if (index === randomArtist) {
                setMyArtist((myArtist) => [...myArtist, item.id])
              }
            })
          })
      } catch (error) {
        console.error(error)
      }
    }
  }, [])

  console.log(myArtist)

  return <div className="h-screen border ">Artist page</div>
}

export default Artist
