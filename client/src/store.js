import { createStore, combineReducers, applyMiddleware } from 'redux'
import thunk from 'redux-thunk'
import { composeWithDevTools } from 'redux-devtools-extension'
import { movieDetailsReducer, movieListReducer } from './reducers/movieReducers'
import {
  userDetailsReducer,
  userLoginReducer,
  userRegisterReducer,
  userUpdateProfileReducer,
} from './reducers/userReducers'
import {
  showDetailsReducer,
  showFutureListReducer,
} from './reducers/showReducers'
import { refreshmentListReducer } from './reducers/refreshmentReducers'
import { ticketBookReducer } from './reducers/bookingReducers'
import { employeeCurrentListReducer } from './reducers/employeeReducers'

const reducer = combineReducers({
  movieList: movieListReducer,
  movieDetails: movieDetailsReducer,
  userLogin: userLoginReducer,
  userRegister: userRegisterReducer,
  userDetails: userDetailsReducer,
  userUpdateProfile: userUpdateProfileReducer,
  showFutureList: showFutureListReducer,
  showDetails: showDetailsReducer,
  refreshmentList: refreshmentListReducer,
  ticketBook: ticketBookReducer,
  employeeCurrentList: employeeCurrentListReducer,
})

const userInfoFromStorage = localStorage.getItem('userInfo')
  ? JSON.parse(localStorage.getItem('userInfo'))
  : null

const initialState = {
  userLogin: { userInfo: userInfoFromStorage },
}

const middleware = [thunk]

const store = createStore(
  reducer,
  initialState,
  composeWithDevTools(applyMiddleware(...middleware))
)

export default store
