import {
  GET_PRODUCTS_REQUEST,
  GET_PRODUCTS_SUCCESS,
  GET_PRODUCTS_FAIL,

  GET_PRODUCT_REQUEST,
  GET_PRODUCT_SUCCESS,
  GET_PRODUCT_FAIL,

  ADD_PRODUCT_REQUEST,
  ADD_PRODUCT_SUCCESS,
  ADD_PRODUCT_FAIL,

  UPDATE_PRODUCT_REQUEST,
  UPDATE_PRODUCT_SUCCESS,
  UPDATE_PRODUCT_FAIL,

  DEL_PRODUCT_REQUEST,
  DEL_PRODUCT_SUCCESS,
  DEL_PRODUCT_FAIL
} from '../constants/productConstants'

export const productsListReducer = (state = {products: []}, action) => {
  switch (action.type) {
    case GET_PRODUCTS_REQUEST:
      return { loading: true, products: [] }
    case GET_PRODUCTS_SUCCESS:
      return {
        loading: false,
        products: action.payload.products,
        pages: action.payload.pages,
        page: action.payload.page,
      }
    case GET_PRODUCTS_FAIL:
      return { loading: false, error: action.payload }
    default:
      return state
  }
}

export const productDetailReducer = (state = {product: {}}, action) => {
  switch (action.type) {
    case GET_PRODUCT_REQUEST:
      return { ...state, loading: true }
    case GET_PRODUCT_SUCCESS:
      return { loading: false, product: action.payload }
    case GET_PRODUCT_FAIL:
      return { loading: false, error: action.payload }
    default:
      return state
  }
}

export const productAddReducer = (state = {}, action) => {
  switch (action.type) {
    case ADD_PRODUCT_REQUEST:
      return { loading: true }
    case ADD_PRODUCT_SUCCESS:
      return { loading: false, success: true }
    case ADD_PRODUCT_FAIL:
      return { loading: false, error: action.payload }
    default:
      return state
  }
}

export const productUpdateReducer = (state = {}, action) => {
  switch (action.type) {
    case UPDATE_PRODUCT_REQUEST:
      return { ...state, loading: true }
    case UPDATE_PRODUCT_SUCCESS:
      return { loading: false, success: true, product: action.payload }
    case UPDATE_PRODUCT_FAIL:
      return { loading: false, error: action.payload }
    default:
      return state
  }
}

export const productDeleteReducer = (state = {}, action) => {
  switch (action.type) {
    case DEL_PRODUCT_REQUEST:
      return { loading: true }
    case DEL_PRODUCT_SUCCESS:
      return { loading: false, success: true}
    case DEL_PRODUCT_FAIL:
      return { loading: false, error: action.payload }
    default:
      return state
  }
}
