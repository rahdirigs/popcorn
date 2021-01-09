import {
  SHOW_DETAILS_FAIL,
  SHOW_DETAILS_REQUEST,
  SHOW_DETAILS_SUCCESS,
  SHOW_DONE_FAIL,
  SHOW_DONE_REQUEST,
  SHOW_DONE_SUCCESS,
  SHOW_FUTURE_LIST_FAIL,
  SHOW_FUTURE_LIST_REQUEST,
  SHOW_FUTURE_LIST_SUCCESS,
} from '../constants/showConstants'

export const showFutureListReducer = (state = { futureShows: [] }, action) => {
  switch (action.type) {
    case SHOW_FUTURE_LIST_REQUEST:
      return { loading: true, futureShows: [] }
    case SHOW_FUTURE_LIST_SUCCESS:
      return { loading: false, futureShows: action.payload }
    case SHOW_FUTURE_LIST_FAIL:
      return { loading: false, error: action.payload }
    default:
      return state
  }
}

export const showDetailsReducer = (state = { show: {} }, action) => {
  switch (action.type) {
    case SHOW_DETAILS_REQUEST:
      return { loading: true, ...state }
    case SHOW_DETAILS_SUCCESS:
      return { loading: false, show: action.payload }
    case SHOW_DETAILS_FAIL:
      return { loading: false, error: action.payload }
    default:
      return state
  }
}

export const showDoneReducer = (state = { doneShows: [] }, action) => {
  switch (action.type) {
    case SHOW_DONE_REQUEST:
      return { loading: true, doneShows: [] }
    case SHOW_DONE_SUCCESS:
      return { loading: false, doneShows: action.payload }
    case SHOW_DONE_FAIL:
      return { loading: false, error: action.payload }
    default:
      return state
  }
}
