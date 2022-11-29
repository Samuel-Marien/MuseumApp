import axios from 'axios'

let config = { api_key: process.env.NEXT_PUBLIC_API_KEY }
let url = process.env.NEXT_PUBLIC_API_URL

const getAllArtsByCollec = async (id, limit, offset = 0) => {
  try {
    const response = await axios
      .get(`${url}/collection/${id}/object?limit=${limit}&offset=${offset}`, {
        headers: config
      })
      .then((value) => {
        return value.data.data
      })
    return response
  } catch (error) {
    console.log(error)
  }
}

export default getAllArtsByCollec
