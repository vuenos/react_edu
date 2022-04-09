import axios from "axios";
import {
  GET_PRODUCTS_REQUEST,
  GET_PRODUCTS_SUCCESS,
  GET_PRODUCTS_FAIL,
  GET_PRODUCT_FAIL,
  GET_PRODUCT_REQUEST,
  GET_PRODUCT_SUCCESS,
  UPDATE_PRODUCT_FAIL,
  UPDATE_PRODUCT_REQUEST,
  UPDATE_PRODUCT_SUCCESS,
  DEL_PRODUCT_REQUEST,
  DEL_PRODUCT_SUCCESS,
  DEL_PRODUCT_FAIL,
  ADD_PRODUCT_REQUEST,
  ADD_PRODUCT_SUCCESS,
  ADD_PRODUCT_FAIL
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

export const detailProduct = (id) => async (dispatch) => {
  try {
    dispatch({
      type: GET_PRODUCT_REQUEST
    });


    const { data, status } = await axios.get(`http://localhost:5000/api/products/${id}`);
    console.log("-----", data, status)

    if (status === 200) {
      dispatch({
        type: GET_PRODUCT_SUCCESS,
        payload: data
      });
    }

  } catch (err) {

    console.log("&&&&&&", err.response.data.message)
    dispatch({
      type: GET_PRODUCT_FAIL,
      payload: err.response && err.response.data.message
        ? err.response.data.message
        : err.message
    })
  }
}

export const addProduct = (product) => async (dispatch, getState) => {

  try {
    dispatch({
      type: ADD_PRODUCT_REQUEST
    });

    const {
      userLogin: {userInfo}
    } = getState();

    console.log("USER::::", userInfo)

    const config = {
      headers: {
        Authorization: `Bearer ${userInfo.token}`
      }
    }
    console.log("CONFIG:::::", config)

    const { data, status } = await axios.post("http://localhost:5000/api/products", product, config);

    console.log(status)

    dispatch({
      type: ADD_PRODUCT_SUCCESS,
      payload: data
    })

  } catch (err) {
    console.log("ADD_ERROR::::", err.response.data.message)
    dispatch({
      type: ADD_PRODUCT_FAIL,
      payload: err.response && err.response.data.message
        ? err.response.data.message
        : err.message
    })
  }
}

export const updateProduct = (id, addInput) => async (dispatch, getState) => {
  try {

    dispatch({
      type: UPDATE_PRODUCT_REQUEST
    });

    const {
      userLogin: {userInfo}
    } = getState();

    const config = {
      headers: {
        Authorization: `Bearer ${userInfo.token}`
      }
    }

    const { data, status } = await axios.put(`http://localhost:5000/api/products/${id}`, addInput, config)
    console.log("???????", status)
    if (status === 200) {
      dispatch({
        type: UPDATE_PRODUCT_SUCCESS,
        payload: data
      })
    }

  } catch (err) {
    console.log("********", err.response.data.message)
    dispatch({
      type: UPDATE_PRODUCT_FAIL,
      payload: err.response && err.response.data.message
        ? err.response.data.message
        : err.message
    })
  }
}

export const deleteProduct = (id) => async (dispatch, getState) => {
  try {
    dispatch({
      type: DEL_PRODUCT_REQUEST
    })

    const {
      userLogin: {userInfo}
    } = getState();

    const config = {
      headers: {
        Authorization: `Bearer ${userInfo.token}`
      }
    }

    const { data, status } = await axios.delete(`http://localhost:5000/api/products/${id}`, config);
    console.log("DEL_PROD_STATUS", status)
    if (status === 200) {
      dispatch({
        type: DEL_PRODUCT_SUCCESS,
        payload: data
      })
    }
  } catch (err) {
    dispatch({
      type: DEL_PRODUCT_FAIL,
      payload: err.response && err.response.data.message
        ? err.response.data.message
        : err.message
    })
  }
}