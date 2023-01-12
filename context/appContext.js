import React, { useReducer, useContext } from 'react'
import { useRouter } from 'next/router'
import reducer from './reducer'
import axios from 'axios'

import {
  REGISTER_USER_BEGIN,
  REGISTER_USER_SUCCESS,
  REGISTER_USER_ERROR,
  LOGIN_USER_BEGIN,
  LOGIN_USER_SUCCESS,
  LOGIN_USER_ERROR,
  CLEAR_ALERT,
  LOGOUT_USER,
  UPDATE_USER_BEGIN,
  UPDATE_USER_SUCCESS,
  UPDATE_USER_ERROR,
  SAVE_EXHIB_ART_BEGIN,
  SAVE_EXHIB_ART_SUCCESS,
  SAVE_EXHIB_ART_ERROR,
  GET_USER_ART_BEGIN,
  GET_USER_ART_SUCCESS,
  DELETE_EXHIB_ART_BEGIN,
  EDIT_ART_BEGIN,
  EDIT_ART_SUCCESS,
  EDIT_ART_ERROR,
  SAVE_COLLEC_ART_BEGIN,
  SAVE_COLLEC_ART_SUCCESS,
  SAVE_COLLEC_ART_ERROR,
  GET_USER_COLLEC_ART_BEGIN,
  GET_USER_COLLEC_ART_SUCCESS,
  DELETE_COLLEC_ART_BEGIN,
  EDIT_COLLEC_ART_BEGIN,
  EDIT_COLLEC_ART_SUCCESS,
  EDIT_COLLEC_ART_ERROR,
  CLEAR_FILTERS,
  HANDLE_CHANGE,
  CHANGE_PAGE,
  CHANGE_PAGE_COLLEC
} from './actions'

const bright = '\x1b[1m'
const red = '\x1b[31m'
const reset = '\x1b[0m'
const underscore = '\x1b[4m'

if (typeof window !== 'undefined') {
  console.log('%c👨‍💻 You are on the browser', 'color:yellow;')
  var token = localStorage.getItem('token')
  var user = localStorage.getItem('user')
  var userLocation = localStorage.getItem('userLocation')
} else {
  console.log(
    `\n${bright}${red}⚠️  ${underscore}CAN'T${reset}${red} use localStorage ⚠️\n`
  )
}

const initialState = {
  // user
  isLoading: false,
  isEditing: false,
  user: user ? JSON.parse(user) : null,
  token: token,
  userLocation: userLocation || '',
  //exhibition:
  arts: [],
  totalArts: 0,
  numOfPages: 1,
  exhibPage: 1,
  numOfExhibFavorite: 0,
  //collection:'
  artsCollec: [],
  totalCollecArts: 0,
  numOfCollecPages: 1,
  pageCollec: 1,
  numOfCollecFavorite: 0,
  category: 'all',
  categoryOptions: [
    'all',
    'American Art',
    'Arts of Africa',
    'Arts of the Americas',
    'Arts of the Islamic World',
    'Arts of the Pacific Islands',
    'Asian Art',
    'Contemporary Art',
    'Decorative Arts',
    'Egyptian, Classical, Ancient Near Eastern Art',
    'Elizabeth A. Sackler Center for Feminist Art',
    'European Art',
    'Photography'
  ],
  // misc
  artsCategory: 'Collection',
  artsCategoryOptions: ['Exhibition', 'Collection'],
  search: '',
  sort: 'latest',
  sortOptions: [
    'latest',
    'oldest',
    'latest saved',
    'oldest saved',
    'a-z',
    'z-a'
  ],
  favoriteArtsOnly: 'all',
  favoriteOptions: ['my favorite', 'all']
}

const AppContext = React.createContext()

const AppProvider = ({ children }) => {
  const [state, dispatch] = useReducer(reducer, initialState)
  const router = useRouter()

  // axios
  const authFetch = axios.create({
    baseURL: 'http://localhost:5000/api/v1'
  })

  // request
  authFetch.interceptors.request.use(
    (config) => {
      config.headers.common['Authorization'] = `Bearer ${state.token}`
      return config
    },
    (error) => {
      return Promise.reject(error)
    }
  )

  // response
  authFetch.interceptors.response.use(
    (response) => {
      return response
    },
    (error) => {
      console.log(error.response.data.msg)
      if (
        error.response.status === 401 ||
        error.response.data.msg === 'Invalid authentication!'
      ) {
        logoutUser()
      }
      return Promise.reject(error)
    }
  )

  const clearAlert = () => {
    setTimeout(() => {
      dispatch({
        type: CLEAR_ALERT
      })
    }, 3000)
  }

  const handleChange = ({ name, value }) => {
    dispatch({ type: HANDLE_CHANGE, payload: { name, value } })
  }

  const addToLocalStorage = ({ user, token, location }) => {
    localStorage.setItem('user', JSON.stringify(user))
    localStorage.setItem('token', token)
    localStorage.setItem('location', location)
  }

  const removeUserFromLocalStorage = () => {
    localStorage.removeItem('token')
    localStorage.removeItem('user')
    localStorage.removeItem('location')
  }

  const registerUser = async (currentUser) => {
    dispatch({ type: REGISTER_USER_BEGIN })
    try {
      const response = await axios.post(
        'http://localhost:5000/api/v1/auth/register',
        currentUser
      )
      // console.log(response)
      const { user, token, location } = response.data
      dispatch({
        type: REGISTER_USER_SUCCESS,
        payload: { user, token, location }
      })

      addToLocalStorage({ user, token, location })
    } catch (error) {
      // console.log(error.response)
      dispatch({
        type: REGISTER_USER_ERROR,
        payload: { msg: error.response.data.msg }
      })
    }
    clearAlert()
  }

  const loginUser = async (currentUser) => {
    dispatch({ type: LOGIN_USER_BEGIN })
    try {
      const { data } = await axios.post(
        'http://localhost:5000/api/v1/auth/login',
        currentUser
      )
      const { user, token, location } = data
      dispatch({
        type: LOGIN_USER_SUCCESS,
        payload: { user, token, location }
      })
      addToLocalStorage({ user, token, location })
    } catch (error) {
      dispatch({
        type: LOGIN_USER_ERROR,
        payload: { msg: error.response.data.msg }
      })
    }
    clearAlert()
  }

  const logoutUser = () => {
    dispatch({ type: LOGOUT_USER })
    removeUserFromLocalStorage()
    setTimeout(() => {
      router.push('/')
    }, 1000)
  }

  const updateUser = async (currentUser) => {
    dispatch({ type: UPDATE_USER_BEGIN })
    try {
      const { data } = await authFetch.patch('/auth/updateUser', currentUser)
      const { user, location, token } = data
      dispatch({
        type: UPDATE_USER_SUCCESS,
        payload: { user, location, token }
      })
      addToLocalStorage({ user, location, token })
    } catch (error) {
      if (error.response.status !== 401) {
        dispatch({
          type: UPDATE_USER_ERROR,
          payload: { msg: error.response.data.msg }
        })
      }
    }
    clearAlert()
  }

  const saveExhibArt = async (
    exibitionTitle,
    exibitionId,
    imageId,
    imageCaption,
    imageCitation,
    imageCredit,
    imageLargestUrl,
    imageStandardtUrl,
    imageThumbnailUrl,
    imageDate
  ) => {
    dispatch({ type: SAVE_EXHIB_ART_BEGIN })
    try {
      await authFetch.post('/arts/addUserArts', {
        exibitionTitle,
        exibitionId,
        imageId,
        imageCaption,
        imageCitation,
        imageCredit,
        imageLargestUrl,
        imageStandardtUrl,
        imageThumbnailUrl,
        imageDate,
        isFavorite: false
      })
      dispatch({ type: SAVE_EXHIB_ART_SUCCESS })
    } catch (error) {
      if (error.response.satus === 401) return
      dispatch({
        type: SAVE_EXHIB_ART_ERROR,
        payload: { msg: error.response.data.msg }
      })
    }
  }

  const saveCollectionArt = async (
    collectionTitle,
    collectionId,
    artTitle,
    artId,
    artists,
    classification,
    completeness,
    primaryImage,
    medium,
    date,
    markings,
    signed,
    inscribed,
    labels,
    geographicalLocations,
    creditLine,
    section,
    description,
    exhibitions,
    rightsType,
    period,
    dynasty,
    images
  ) => {
    dispatch({ type: SAVE_COLLEC_ART_BEGIN })

    try {
      await authFetch.post('/collec-arts/addUserCollectionArt', {
        collectionTitle,
        collectionId,
        artTitle,
        artId,
        artists,
        classification,
        completeness,
        primaryImage,
        medium,
        date,
        markings,
        signed,
        inscribed,
        labels,
        geographicalLocations,
        creditLine,
        section,
        description,
        exhibitions,
        rightsType,
        period,
        dynasty,
        images,
        isFavorite: false
      })
      dispatch({ type: SAVE_COLLEC_ART_SUCCESS })
    } catch (error) {
      if (error.response.satus === 401) return
      dispatch({
        type: SAVE_COLLEC_ART_ERROR,
        payload: { msg: error.response.data.msg }
      })
    }
  }

  const getAllUserArts = async () => {
    const { exhibPage, search, sort, favoriteArtsOnly } = state

    if (favoriteArtsOnly === 'my favorite') {
      favoriteArtsOnly = true
    }
    if (favoriteArtsOnly === 'all') {
      favoriteArtsOnly = ''
    }
    let url = `/arts/getAllUserArts?page=${exhibPage}&search=${search}&sort=${sort}&isFavorite=${favoriteArtsOnly}`

    dispatch({ type: GET_USER_ART_BEGIN })
    try {
      const { data } = await authFetch(url)

      const { arts, totalArts, numOfPages, numOfExhibFavorite, numOfAllArts } =
        data

      dispatch({
        type: GET_USER_ART_SUCCESS,
        payload: {
          arts,
          totalArts,
          numOfPages,
          numOfExhibFavorite,
          numOfAllArts
        }
      })
    } catch (error) {
      console.log(error.response)
      // logoutUser()
    }
    clearAlert()
  }

  const changeExhibPage = (exhibPage) => {
    dispatch({ type: CHANGE_PAGE, payload: { exhibPage } })
  }

  const getAllCollectionUserArts = async () => {
    const { pageCollec, search, sort, favoriteArtsOnly, category } = state

    if (favoriteArtsOnly === 'my favorite') {
      favoriteArtsOnly = true
    }
    if (favoriteArtsOnly === 'all') {
      favoriteArtsOnly = ''
    }

    let url = `/collec-arts/getAllCollecUserArts?page=${pageCollec}&category=${category}&search=${search}&sort=${sort}&isFavorite=${favoriteArtsOnly}`

    dispatch({ type: GET_USER_COLLEC_ART_BEGIN })
    try {
      const { data } = await authFetch(url)
      // console.log(data)

      const {
        artsCollec,
        totalCollecArts,
        numOfCollecPages,
        numOfCollecFavorite,
        numOfAllArts
      } = data
      dispatch({
        type: GET_USER_COLLEC_ART_SUCCESS,
        payload: {
          artsCollec,
          totalCollecArts,
          numOfCollecPages,
          numOfCollecFavorite,
          numOfAllArts
        }
      })
    } catch (error) {
      console.log(error.response)
      // logoutUser()
    }
    clearAlert()
  }

  const changeCollecPage = (pageCollec) => {
    dispatch({ type: CHANGE_PAGE_COLLEC, payload: { pageCollec } })
  }

  const deleteExhibArt = async (artId) => {
    dispatch({ type: DELETE_EXHIB_ART_BEGIN })

    try {
      await authFetch.delete(`/arts/${artId}`)
      getAllUserArts()
    } catch (error) {
      console.log(error.response)
      // logoutUser()
    }
  }

  const deleteCollecArt = async (artId) => {
    dispatch({ type: DELETE_COLLEC_ART_BEGIN })

    try {
      await authFetch.delete(`/collec-arts/${artId}`)
      getAllCollectionUserArts()
    } catch (error) {
      console.log(error.response)
      // logoutUser()
    }
  }

  const addExhibitionArtToFavorite = async (id, myBool) => {
    dispatch({ type: EDIT_ART_BEGIN })

    try {
      await authFetch.patch(`/arts/${id}`, { isFavorite: myBool })
      getAllUserArts()
      dispatch({ type: EDIT_ART_SUCCESS })
    } catch (error) {
      // console.log(error)
      if (error.response.status === 401) return
      dispatch({
        type: EDIT_ART_ERROR,
        payload: { msg: error.response.data.msg }
      })
    }
  }

  const addCollectionArtToFavorite = async (id, myBool) => {
    dispatch({ type: EDIT_COLLEC_ART_BEGIN })

    try {
      await authFetch.patch(`/collec-arts/${id}`, { isFavorite: myBool })
      getAllCollectionUserArts()
      dispatch({ type: EDIT_COLLEC_ART_SUCCESS })
    } catch (error) {
      // console.log(error)
      if (error.response.status === 401) return
      dispatch({
        type: EDIT_COLLEC_ART_ERROR,
        payload: { msg: error.response.data.msg }
      })
    }
  }

  const clearFilters = () => {
    dispatch({ type: CLEAR_FILTERS })
  }

  return (
    <AppContext.Provider
      value={{
        ...state,
        clearAlert,
        registerUser,
        loginUser,
        logoutUser,
        updateUser,
        saveExhibArt,
        saveCollectionArt,
        getAllUserArts,
        deleteExhibArt,
        addExhibitionArtToFavorite,
        getAllCollectionUserArts,
        deleteCollecArt,
        addCollectionArtToFavorite,
        clearFilters,
        handleChange,
        changeExhibPage,
        changeCollecPage
      }}
    >
      {children}
    </AppContext.Provider>
  )
}

const useAppContext = () => {
  return useContext(AppContext)
}

export { AppProvider, initialState, useAppContext }
