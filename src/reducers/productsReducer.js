import {
  GET_PRODUCTS_REQUEST,
  GET_PRODUCTS_SUCCESS,
  GET_PRODUCTS_FAIL
} from '../constants/productConstants'

export const productsListReducer = (state = {products: []}, action) => {
  switch (action.type) {
    case GET_PRODUCTS_REQUEST:
      return { loading: true, products: [] }
    case GET_PRODUCTS_SUCCESS:
      return { loading: false, products: action.payload.products }
    case GET_PRODUCTS_FAIL:
      return { loading: false, error: action.payload }
    default:
      return state
  }
}