import { createStore, combineReducers, applyMiddleware } from 'redux'
import thunk from 'redux-thunk'
import { composeWithDevTools } from 'redux-devtools-extension'
import {
  movieCreateReviewReducer,
  movieDetailsReducer,
  movieListReducer,
  movieRecommendedReducer,
} from './reducers/movieReducers'
import {
  userDetailsReducer,
  userLoginReducer,
  userRecommendedReducer,
  userRegisterReducer,
  userUpdateProfileReducer,
  userWatchedMoviesReducer,
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
  movieRecommended: movieRecommendedReducer,
  userLogin: userLoginReducer,
  userRegister: userRegisterReducer,
  userWatchedMovies: userWatchedMoviesReducer,
  userRecommended: userRecommendedReducer,
  userDetails: userDetailsReducer,
  userUpdateProfile: userUpdateProfileReducer,
  showFutureList: showFutureListReducer,
  showDetails: showDetailsReducer,
  showDone: showDoneReducer,
  refreshmentList: refreshmentListReducer,
  ticketBook: ticketBookReducer,
  getTickets: getTicketsReducer,
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
