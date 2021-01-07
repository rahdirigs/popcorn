import { applyMiddleware, combineReducers, createStore } from 'redux'
import thunk from 'redux-thunk'
import { composeWithDevTools } from 'redux-devtools-extension'
import {
  refreshmentAddReducer,
  refreshmentDeleteReducer,
  refreshmentDetailsReducer,
  refreshmentListReducer,
  refreshmentUpdateReducer,
} from './reducers/refreshmentReducers'
import {
  movieAddReducer,
  movieCurrentListReducer,
  movieDetailsReducer,
  movieListReducer,
  moviePastListReducer,
  movieStartScreenReducer,
  movieStopScreenReducer,
  movieUpdateReducer,
} from './reducers/movieReducers'
import {
  employeeAddReducer,
  employeeCurrentListReducer,
  employeeListReducer,
  employeePastListReducer,
  employeeStartWorkReducer,
  employeeStopWorkReducer,
} from './reducers/employeeReducers'
import {
  showCreateReducer,
  showDetailsReducer,
  showFutureListReducer,
  showListCurrentMoviesReducer,
  showListReducer,
  showMarkReducer,
  showPastListReducer,
  showUpdateReducer,
} from './reducers/showReducers'

const reducer = combineReducers({
  refreshmentList: refreshmentListReducer,
  refreshmentDetails: refreshmentDetailsReducer,
  refreshmentUpdate: refreshmentUpdateReducer,
  refreshmentDelete: refreshmentDeleteReducer,
  refreshmentAdd: refreshmentAddReducer,
  movieList: movieListReducer,
  movieCurrentList: movieCurrentListReducer,
  moviePastList: moviePastListReducer,
  movieDetails: movieDetailsReducer,
  movieUpdate: movieUpdateReducer,
  movieStartScreen: movieStartScreenReducer,
  movieStopScreen: movieStopScreenReducer,
  movieAdd: movieAddReducer,
  employeeList: employeeListReducer,
  employeeCurrentList: employeeCurrentListReducer,
  employeePastList: employeePastListReducer,
  employeeStartWork: employeeStartWorkReducer,
  employeeStopWork: employeeStopWorkReducer,
  employeeAdd: employeeAddReducer,
  showCreate: showCreateReducer,
  showDetails: showDetailsReducer,
  showFutureList: showFutureListReducer,
  showList: showListReducer,
  showMark: showMarkReducer,
  showPastList: showPastListReducer,
  showUpdate: showUpdateReducer,
  showListCurrentMovies: showListCurrentMoviesReducer,
})

const initialState = {}

const middleware = [thunk]

const store = createStore(
  reducer,
  initialState,
  composeWithDevTools(applyMiddleware(...middleware))
)

export default store
