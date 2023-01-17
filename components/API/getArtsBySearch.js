import axios from 'axios'

let config = { api_key: process.env.NEXT_PUBLIC_API_KEY }
let url = process.env.NEXT_PUBLIC_API_URL

const getArtsBySearch = async (
  limit,
  offset = 0,
  title,
  collection_id,
  total_count_only = 0
) => {
  try {
    const response = await axios
      .get(
        `${url}/object/?limit=${limit}&offset=${offset}&title=${title}&collection_id=${collection_id}&total_count_only=${total_count_only}&has_images=1`,
        {
          headers: config
        }
      )
      .then((value) => {
        return value.data.data
      })
    return response
  } catch (error) {
    console.log(error)
  }
}

export default getArtsBySearch
