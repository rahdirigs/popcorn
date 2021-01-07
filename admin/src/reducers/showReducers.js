import {
  SHOW_CREATE_FAIL,
  SHOW_CREATE_REQUEST,
  SHOW_CREATE_SUCCESS,
  SHOW_DETAILS_FAIL,
  SHOW_DETAILS_REQUEST,
  SHOW_DETAILS_SUCCESS,
  SHOW_FUTURE_LIST_FAIL,
  SHOW_FUTURE_LIST_REQUEST,
  SHOW_FUTURE_LIST_SUCCESS,
  SHOW_LIST_CURRENT_MOVIES_FAIL,
  SHOW_LIST_CURRENT_MOVIES_REQUEST,
  SHOW_LIST_CURRENT_MOVIES_SUCCESS,
  SHOW_LIST_FAIL,
  SHOW_LIST_REQUEST,
  SHOW_LIST_SUCCESS,
  SHOW_MARK_FAIL,
  SHOW_MARK_REQUEST,
  SHOW_MARK_SUCCESS,
  SHOW_PAST_LIST_FAIL,
  SHOW_PAST_LIST_REQUEST,
  SHOW_PAST_LIST_SUCCESS,
  SHOW_UPDATE_FAIL,
  SHOW_UPDATE_REQUEST,
  SHOW_UPDATE_SUCCESS,
} from '../constants/showConstants'

export const showListReducer = (state = { shows: [] }, action) => {
  switch (action.type) {
    case SHOW_LIST_REQUEST:
      return { loading: true, shows: [] }
    case SHOW_LIST_SUCCESS:
      return { loading: false, shows: action.payload }
    case SHOW_LIST_FAIL:
      return { loading: false, error: action.payload }
    default:
      return state
  }
}

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

export const showPastListReducer = (state = { pastShows: [] }, action) => {
  switch (action.type) {
    case SHOW_PAST_LIST_REQUEST:
      return { loading: true, pastShows: [] }
    case SHOW_PAST_LIST_SUCCESS:
      return { loading: false, pastShows: action.payload }
    case SHOW_PAST_LIST_FAIL:
      return { loading: false, error: action.payload }
    default:
      return state
  }
}

export const showMarkReducer = (state = {}, action) => {
  switch (action.type) {
    case SHOW_MARK_REQUEST:
      return { loading: true }
    case SHOW_MARK_SUCCESS:
      return { loading: false, success: true }
    case SHOW_MARK_FAIL:
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

export const showUpdateReducer = (state = { showInfo: {} }, action) => {
  switch (action.type) {
    case SHOW_UPDATE_REQUEST:
      return { loading: true, ...state }
    case SHOW_UPDATE_SUCCESS:
      return { loading: false, success: true, showInfo: action.payload }
    case SHOW_UPDATE_FAIL:
      return { loading: false, error: action.payload }
    default:
      return state
  }
}

export const showCreateReducer = (state = { showInfo: {} }, action) => {
  switch (action.type) {
    case SHOW_CREATE_REQUEST:
      return { loading: true, ...state }
    case SHOW_CREATE_SUCCESS:
      return { loading: false, showInfo: action.payload }
    case SHOW_CREATE_FAIL:
      return { loading: false, error: action.payload }
    default:
      return state
  }
}

export const showListCurrentMoviesReducer = (
  state = { currentMovies: [] },
  action
) => {
  switch (action.type) {
    case SHOW_LIST_CURRENT_MOVIES_REQUEST:
      return { loading: true, currentMovies: [] }
    case SHOW_LIST_CURRENT_MOVIES_SUCCESS:
      return { loading: false, success: true, currentMovies: action.payload }
    case SHOW_LIST_CURRENT_MOVIES_FAIL:
      return { loading: false, error: action.payload }
    default:
      return state
  }
}
