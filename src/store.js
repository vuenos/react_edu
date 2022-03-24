import { createStore, combineReducers, applyMiddleware } from "redux"
import thunk from "redux-thunk";
import { composeWithDevTools } from "redux-devtools-extension";
import { userLoginReducer, userProfileReducer, userModProfileReducer } from "./reducers/userReducers";
import { productsListReducer } from "./reducers/productsReducer";

const env = process.env.NODE_ENV;//Backend env 설정의 NODE_ENV 상태(어플리케이션 상태)

const reducer = combineReducers({
  userLogin: userLoginReducer,
  userProfile: userProfileReducer,
  userModProfile: userModProfileReducer,
  productList: productsListReducer
});//어플리케이션의 모든 reducer를 combine해준다.

const userInfoFromStorage = localStorage.getItem('userInfo')
  ? JSON.parse(localStorage.getItem('userInfo'))
  : null; //

const initialState = {
  userLogin: { userInfo: userInfoFromStorage },
  userModProfile: { userInfo: userInfoFromStorage }
};//프로젝트 실행시 default로 얻을수 있는 state

const middelware = [thunk];

if(env === 'development') {
  const { logger } = require('redux-logger');
  middelware.push(logger)
}//env 변수를 통해 Backend의 어플리케이션 상태가 development 일때 redux-logger를 호출하고 어플리케이션의 middleware에 적용한다.

const store = createStore(
    reducer,
    initialState,
    composeWithDevTools(applyMiddleware(...middelware))
)

export default store;