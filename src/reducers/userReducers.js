import {
  USER_LOGIN_REQUEST,
  USER_LOGIN_SUCCESS,
  USER_LOGIN_FAIL,
  USER_LOGOUT,

  GET_PROFILE_SUCCESS,
  GET_PROFILE_REQUEST,
  GET_PROFILE_FAIL,

  MOD_PROFILE_REQUEST,
  MOD_PROFILE_SUCCESS,
  MOD_PROFILE_FAIL
} from '../constants/userConstants';

export const userLoginReducer = (state = {}, action) => {
  switch (action.type) {
    case USER_LOGIN_REQUEST:
      return { loading: true }
    case USER_LOGIN_SUCCESS:
      return { loading: false, userInfo: action.payload }
    case USER_LOGIN_FAIL:
      return { loading: false, error: action.payload }
    case USER_LOGOUT:
      return {}
    default:
      return state
  }
}

//Profile
export const userProfileReducer = (state = {user: {}}, action) => {
  switch (action.type) {
    case GET_PROFILE_REQUEST:
      return { ...state, loading: true }
    case GET_PROFILE_SUCCESS:
      return { loading: false, user: action.payload }
    case GET_PROFILE_FAIL:
      return { loading: true, error: action.payload }
    default:
      return state
  }
}

//Profile modify
export const userModProfileReducer = (state = {userInfo: {}}, action) => {
  switch (action.type) {
    case MOD_PROFILE_REQUEST:
      return { ...state, loading: true }
    case MOD_PROFILE_SUCCESS:
      return { loading: false, userInfo: action.payload }
    case MOD_PROFILE_FAIL:
      return { loading: true, error: action.payload }
    default:
      return state
  }
}