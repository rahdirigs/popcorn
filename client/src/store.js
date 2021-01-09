import { createStore, combineReducers, applyMiddleware } from 'redux'
import thunk from 'redux-thunk'
import { composeWithDevTools } from 'redux-devtools-extension'
import {
  movieCreateReviewReducer,
  movieDetailsReducer,
  movieListReducer,
} from './reducers/movieReducers'
import {
  userDetailsReducer,
  userLoginReducer,
  userRegisterReducer,
  userUpdateProfileReducer,
} from './reducers/userReducers'
import {
  showDetailsReducer,
  showDoneReducer,
  showFutureListReducer,
} from './reducers/showReducers'
import { refreshmentListReducer } from './reducers/refreshmentReducers'
import {
  getTicketsReducer,
  ticketBookReducer,
} from './reducers/bookingReducers'
import { employeeCurrentListReducer } from './reducers/employeeReducers'

const reducer = combineReducers({
  movieList: movieListReducer,
  movieDetails: movieDetailsReducer,
  movieCreateReview: movieCreateReviewReducer,
  userLogin: userLoginReducer,
  userRegister: userRegisterReducer,
  userDetails: userDetailsReducer,
  userUpdateProfile: userUpdateProfileReducer,
  showFutureList: showFutureListReducer,
  showDetails: showDetailsReducer,
  refreshmentList: refreshmentListReducer,
  ticketBook: ticketBookReducer,
  employeeCurrentList: employeeCurrentListReducer,
  getTickets: getTicketsReducer,
  showDone: showDoneReducer,
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
