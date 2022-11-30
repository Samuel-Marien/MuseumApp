import axios from 'axios'

let config = { api_key: process.env.NEXT_PUBLIC_API_KEY }
let url = process.env.NEXT_PUBLIC_API_URL

const getOneArtDetails = async (artId) => {
  try {
    const response = await axios
      .get(`${url}/object/${artId}`, {
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

export default getOneArtDetails
