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

const reducer = combineReducers({
  refreshmentList: refreshmentListReducer,
  refreshmentDetails: refreshmentDetailsReducer,
  refreshmentUpdate: refreshmentUpdateReducer,
  refreshmentDelete: refreshmentDeleteReducer,
  refreshmentAdd: refreshmentAddReducer,
})

const initialState = {}

const middleware = [thunk]

const store = createStore(
  reducer,
  initialState,
  composeWithDevTools(applyMiddleware(...middleware))
)

export default store
