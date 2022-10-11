import axios from 'axios'

let config = { api_key: process.env.NEXT_PUBLIC_API_KEY }

// DOC : https://www.brooklynmuseum.org/opencollection/api

let url = process.env.NEXT_PUBLIC_API_URL
let coll = 'collection'
let artist = 'artist'
let folder = 'american_art'
let colId = 21
let objectId = 4791
let limit = 20
let offset = 19

const getArt = async () => {
  try {
    const response = await axios.get(
      // `${url}/${coll}/${colId}/object?limit=${limit}&offset=${offset}&`,

      // 👇 Pour connaitre les collections
      `${url}/${coll}`,

      // 👇 Pour connaitre une collection selon l'id
      // `${url}/${coll}/${colId}`,

      // 👇 liste les objects
      // `${url}/object?limit=${limit}&offset=${offset}&`,

      // `${url}/object/${objectId}/image`,
      // `${url}/${coll}/`,
      {
        headers: config
      }
    )
    console.log(response)
  } catch (error) {
    console.error(error)
  }
}

export default getArt
