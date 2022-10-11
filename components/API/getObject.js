import axios from 'axios'

let config = { api_key: process.env.NEXT_PUBLIC_API_KEY }
let url = process.env.NEXT_PUBLIC_API_URL

let random = Math.floor(Math.random() * 92765)

const getObject = async () => {
  try {
    const response = await axios
      .get(`${url}/object?limit=35&offset=${random}`, {
        headers: config
      })
      .then((value) => {
        return value.data.data
      })
    return response
  } catch (error) {
    console.error(error)
  }
}

export default getObject
