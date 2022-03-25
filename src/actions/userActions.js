import axios from "axios";
import {
  USER_LOGIN_REQUEST,
  USER_LOGIN_FAIL,
  USER_LOGIN_SUCCESS,
  USER_LOGOUT
} from '../constants/userConstants';

import {
  GET_PROFILE_REQUEST,
  GET_PROFILE_SUCCESS,
  GET_PROFILE_FAIL
} from "../constants/userConstants";

import {
  MOD_PROFILE_REQUEST,
  MOD_PROFILE_SUCCESS,
  MOD_PROFILE_FAIL
} from "../constants/userConstants"

// login API Network
export const login = (email, password) => async (dispatch) => {
  try {
    dispatch({
      type: USER_LOGIN_REQUEST
    })

    const {data, status} = await axios.post("http://localhost:5000/api/users/login", {email, password})
    if (status === 200) {
      dispatch({
        type: USER_LOGIN_SUCCESS,
        payload: data
      })
      console.log('Login Success :' + data)
    }

    localStorage.setItem('userInfo', JSON.stringify(data))

  } catch (err) {
    dispatch({
      type: USER_LOGIN_FAIL,
      payload:
        err.response && err.response.data.message
          ? err.response.data.message
          : err.message
    })
  }
}

export const logout = () => (dispatch) => {
  localStorage.removeItem('userInfo');
  dispatch({
    type: USER_LOGOUT
  })

}

export const getProfile = () => async (dispatch, getState) => {
  try {
    dispatch({
      type: GET_PROFILE_REQUEST
    })

    const {
      userLogin: {userInfo}
    } = getState();

    const config = {
      headers: {
        Authorization: `Bearer ${userInfo.token}`
      }
    }

    const { data, status } = await axios.get("http://localhost:5000/api/users/profile", config)
    if (status === 200) {
      dispatch({
        type: GET_PROFILE_SUCCESS,
        payload: data
      })
    }

  } catch (err) {
    dispatch({
      type: GET_PROFILE_FAIL,
      payload:
        err.response && err.response.data.message
          ? err.response.data.message
          : err.message
    })
  }
}

export const modifyProfile = (name, email, password) => async (dispatch, getState) => {
  try {
    dispatch({
      type: MOD_PROFILE_REQUEST
    });

    const { userInfo } = getState().userModProfile;

    const config = {
      header: {
        Authorization: `Bearer ${userInfo.token}`
      },
    };

    const userInput = { name, email, password }

    const { data, status } = await axios.put("http://localhost:5000/api/users/profile", userInput, config);
    if (status === 200) {
      dispatch ({
        type: MOD_PROFILE_SUCCESS,
        payload: data
      })
    }
    console.log("#############" + data);

  } catch (err) {
    dispatch({
      type: MOD_PROFILE_FAIL,
      payload:
        err.response && err.response.data.message
          ? err.response.data.message
          : err.message
    })
  }
}