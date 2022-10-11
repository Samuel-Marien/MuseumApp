import axios from 'axios'

let config = { api_key: process.env.NEXT_PUBLIC_API_KEY }

let url = process.env.NEXT_PUBLIC_API_URL

const getImage = async (objectId) => {
  try {
    const response = await axios.get(
      // 👇 Pour connaitre les collections
      `${url}/object/${objectId}/image`,
      {
        headers: config
      }
    )
    return response
  } catch (error) {
    console.error(error)
  }
}

export default getImage
