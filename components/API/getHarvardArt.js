import axios from 'axios'

let apikey = process.env.NEXT_PUBLIC_API_HVKEY
let url = 'https://api.harvardartmuseums.org'

const getHarvardArt = async () => {
  try {
    const response = await axios
      .get(
        `${url}/object?yearmade=1900&classification=Drawings&apikey=${apikey}&size=8`
      )
      .then((value) => {
        return value.data.records
      })
    return response
  } catch (error) {
    console.error(error)
  }
}

export default getHarvardArt
