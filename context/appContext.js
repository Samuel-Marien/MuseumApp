import React, { useReducer, useContext, useEffect, useState } from 'react'
import reducer from './reducer'
import axios from 'axios'

import {
  REGISTER_USER_BEGIN,
  REGISTER_USER_SUCCESS,
  REGISTER_USER_ERROR,
  LOGIN_USER_BEGIN,
  LOGIN_USER_SUCCESS,
  LOGIN_USER_ERROR,
  CLEAR_ALERT
} from './actions'

if (typeof window !== 'undefined') {
  console.log('You are on the browser')
  var token = localStorage.getItem('token')
  var user = localStorage.getItem('user')
  var userLocation = localStorage.getItem('userLocation')
} else {
  console.log('👉️ CANT use localStorage')
}

// const token = localStorage.getItem('token')
// const user = localStorage.getItem('user')
// const userlocation = localStorage.getItem('location')

// const useIsServer = () => {
//   const [isServer, setIsServer] = useState(typeof window === 'undefined')
//   useEffect(() => {
//     if (isServer) setIsServer(false)
//   }, [isServer])
//   return isServer
// }

const initialState = {
  isLoading: false,
  user: user ? JSON.parse(user) : null,
  token: token,
  userLocation: userLocation || ''
}

const AppContext = React.createContext()

const AppProvider = ({ children }) => {
  const [state, dispatch] = useReducer(reducer, initialState)

  const clearAlert = () => {
    setTimeout(() => {
      dispatch({
        type: CLEAR_ALERT
      })
    }, 3000)
  }

  const addToLocalStorage = ({ user, token, location }) => {
    localStorage.setItem('user', JSON.stringify(user))
    localStorage.setItem('token', token)
    localStorage.setItem('location', location)
  }

  // const removeFromLocalStorage = () => {
  //   localStorage.getItem('token')
  //   localStorage.getItem('user')
  //   localStorage.getItem('location')
  // }

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

  return (
    <AppContext.Provider
      value={{ ...state, clearAlert, registerUser, loginUser }}
    >
      {children}
    </AppContext.Provider>
  )
}

const useAppContext = () => {
  return useContext(AppContext)
}

export { AppProvider, initialState, useAppContext }

// const [token, setToken] = useState(null)
// const [user, setUser] = useState(null)
// const [userLocation, setUserLocation] = useState(null)

// useEffect(() => {
//   if (typeof window !== 'undefined') {
//     console.log('You are on the browser')
//     setToken(localStorage.getItem('token'))
//     setUser(localStorage.getItem('user'))
//     setUserLocation(localStorage.getItem('userLocation'))
//   } else {
//     console.log('👉️ CANT use localStorage')
//   }
// }, [])
