import axios from "axios";
import {
  GET_PRODUCTS_REQUEST,
  GET_PRODUCTS_SUCCESS,
  GET_PRODUCTS_FAIL
} from '../constants/productConstants'

export const listProducts = () => async (dispatch) => {
  try {

    dispatch({
      type: GET_PRODUCTS_REQUEST
    })
    const { data, status } = await axios.get("http://localhost:5000/api/products")
    if (status === 200) {
      dispatch({
        type: GET_PRODUCTS_SUCCESS,
        payload: data
      })
    }

  } catch (err) {
    dispatch({
      type: GET_PRODUCTS_FAIL,
      payload: err.response && err.response.data.message
        ? err.response.data.message
        : err.message
    })
  }
}

