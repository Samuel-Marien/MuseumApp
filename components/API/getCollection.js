import axios from 'axios'

let config = { api_key: process.env.NEXT_PUBLIC_API_KEY }

let url = process.env.NEXT_PUBLIC_API_URL

const getCollection = async () => {
  try {
    const response = await axios.get(`${url}/collection/`, {
      headers: config
    })
    return response
  } catch (error) {
    console.error(error)
  }
}

export default getCollection
