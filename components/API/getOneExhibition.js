import axios from 'axios'

let config = { api_key: process.env.NEXT_PUBLIC_API_KEY }
let url = process.env.NEXT_PUBLIC_API_URL

const getOneExhibition = async (exhibId) => {
  try {
    const response = await axios
      .get(`${url}/exhibition/${exhibId}`, {
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

export default getOneExhibition
