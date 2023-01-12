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

import { initialState } from './appContext'

const reducer = (state, action) => {
  if (action.type === CLEAR_ALERT) {
    return {
      ...state,
      showAlert: false,
      alertType: '',
      alertText: ''
    }
  }
  if (action.type === REGISTER_USER_BEGIN) {
    return { ...state, isloading: true }
  }

  if (action.type === REGISTER_USER_SUCCESS) {
    return {
      ...state,
      isLoading: false,
      token: action.payload.token,
      user: action.payload.user,
      userLocation: action.payload.userLocation,
      alertType: 'success',
      alertText: 'User created! Redirecting...'
    }
  }

  if (action.type === REGISTER_USER_ERROR) {
    return {
      ...state,
      isLoading: false,
      showAlert: true,
      alertType: 'danger',
      alertText: action.payload.msg
    }
  }

  if (action.type === LOGIN_USER_BEGIN) {
    return { ...state, isloading: true }
  }

  if (action.type === LOGIN_USER_SUCCESS) {
    return {
      ...state,
      isLoading: false,
      token: action.payload.token,
      user: action.payload.user,
      userLocation: action.payload.userLocation,
      alertType: 'success',
      alertText: 'Login successful! Redirecting...'
    }
  }

  if (action.type === LOGIN_USER_ERROR) {
    return {
      ...state,
      isLoading: false,
      showAlert: true,
      alertType: 'danger',
      alertText: action.payload.msg
    }
  }

  if (action.type === LOGOUT_USER) {
    return {
      ...initialState,
      user: null,
      token: null,
      userLocation: '',
      jobLocation: ''
    }
  }

  if (action.type === UPDATE_USER_BEGIN) {
    return { ...state, isloading: true }
  }

  if (action.type === UPDATE_USER_SUCCESS) {
    return {
      ...state,
      isLoading: false,
      token: action.payload.token,
      user: action.payload.user,
      userLocation: action.payload.userLocation,
      alertType: 'success',
      alertText: 'User profile updated!'
    }
  }

  if (action.type === UPDATE_USER_ERROR) {
    return {
      ...state,
      isLoading: false,
      showAlert: true,
      alertType: 'danger',
      alertText: action.payload.msg
    }
  }

  if (action.type === SAVE_EXHIB_ART_BEGIN) {
    return { ...state, isloading: true }
  }

  if (action.type === SAVE_EXHIB_ART_SUCCESS) {
    return {
      ...state,
      isLoading: false,
      alertType: 'success',
      alertText: 'Art successfully saved!'
    }
  }

  if (action.type === SAVE_EXHIB_ART_ERROR) {
    return {
      ...state,
      isLoading: false,
      showAlert: true,
      alertType: 'danger',
      alertText: action.payload.msg
    }
  }

  if (action.type === SAVE_COLLEC_ART_BEGIN) {
    return { ...state, isloading: true }
  }

  if (action.type === SAVE_COLLEC_ART_SUCCESS) {
    return {
      ...state,
      isLoading: false,
      alertType: 'success',
      alertText: 'Art successfully saved!'
    }
  }

  if (action.type === SAVE_COLLEC_ART_ERROR) {
    return {
      ...state,
      isLoading: false,
      showAlert: true,
      alertType: 'danger',
      alertText: action.payload.msg
    }
  }

  if (action.type === GET_USER_ART_BEGIN) {
    return { ...state, isloading: true, showAlert: false }
  }

  if (action.type === GET_USER_ART_SUCCESS) {
    return {
      ...state,
      isLoading: false,
      arts: action.payload.arts,
      totalArts: action.payload.totalArts,
      numOfPages: action.payload.numOfPages,
      numOfExhibFavorite: action.payload.numOfExhibFavorite,
      numOfAllArts: action.payload.numOfAllArts
    }
  }

  if (action.type === GET_USER_COLLEC_ART_BEGIN) {
    return { ...state, isloading: true, showAlert: false }
  }

  if (action.type === GET_USER_COLLEC_ART_SUCCESS) {
    return {
      ...state,
      isLoading: false,
      artsCollec: action.payload.artsCollec,
      totalCollecArts: action.payload.totalCollecArts,
      numOfCollecPages: action.payload.numOfCollecPages,
      numOfCollecFavorite: action.payload.numOfCollecFavorite,
      numOfAllArts: action.payload.numOfAllArts
    }
  }

  if (action.type === DELETE_EXHIB_ART_BEGIN) {
    return {
      ...state,
      isloading: true
    }
  }

  if (action.type === DELETE_COLLEC_ART_BEGIN) {
    return {
      ...state,
      isloading: true
    }
  }

  if (action.type === EDIT_ART_BEGIN) {
    return { ...state, isLoading: true }
  }

  if (action.type === EDIT_ART_SUCCESS) {
    return {
      ...state,
      isLoading: false,
      showAlert: true,
      alertType: 'success',
      alertText: 'Art added to your favorite !'
    }
  }

  if (action.type === EDIT_ART_ERROR) {
    return {
      ...state,
      isLoading: false,
      showAlert: true,
      alertType: 'danger',
      alertText: action.payload.msg
    }
  }

  if (action.type === EDIT_COLLEC_ART_BEGIN) {
    return { ...state, isLoading: true }
  }

  if (action.type === EDIT_COLLEC_ART_SUCCESS) {
    return {
      ...state,
      isLoading: false,
      showAlert: true,
      alertType: 'success',
      alertText: 'Art added to your favorite !'
    }
  }

  if (action.type === EDIT_COLLEC_ART_ERROR) {
    return {
      ...state,
      isLoading: false,
      showAlert: true,
      alertType: 'danger',
      alertText: action.payload.msg
    }
  }

  if (action.type === CLEAR_FILTERS) {
    return {
      ...state,
      search: '',
      sort: 'latest',
      favoriteArtsOnly: 'all',
      category: 'all'
    }
  }

  if (action.type === HANDLE_CHANGE) {
    return {
      ...state,
      [action.payload.name]: action.payload.value,
      exhibPage: 1,
      pageCollec: 1
    }
  }

  if (action.type === CHANGE_PAGE) {
    return {
      ...state,
      exhibPage: action.payload.exhibPage
    }
  }

  if (action.type === CHANGE_PAGE_COLLEC) {
    return {
      ...state,
      pageCollec: action.payload.pageCollec
    }
  }

  throw new Error(`no such action ${action.type}`)
}

export default reducer
