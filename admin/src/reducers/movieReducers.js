import {
  MOVIE_ADD_FAIL,
  MOVIE_ADD_REQUEST,
  MOVIE_ADD_SUCCESS,
  MOVIE_CURRENT_LIST_FAIL,
  MOVIE_CURRENT_LIST_REQUEST,
  MOVIE_CURRENT_LIST_SUCCESS,
  MOVIE_DETAILS_FAIL,
  MOVIE_DETAILS_REQUEST,
  MOVIE_DETAILS_SUCCESS,
  MOVIE_LIST_FAIL,
  MOVIE_LIST_REQUEST,
  MOVIE_LIST_SUCCESS,
  MOVIE_PAST_LIST_FAIL,
  MOVIE_PAST_LIST_REQUEST,
  MOVIE_PAST_LIST_SUCCESS,
  MOVIE_START_SCREEN_FAIL,
  MOVIE_START_SCREEN_REQUEST,
  MOVIE_START_SCREEN_SUCCESS,
  MOVIE_STOP_SCREEN_FAIL,
  MOVIE_STOP_SCREEN_REQUEST,
  MOVIE_STOP_SCREEN_SUCCESS,
  MOVIE_UPDATE_FAIL,
  MOVIE_UPDATE_REQUEST,
  MOVIE_UPDATE_SUCCESS,
} from '../constants/movieConstants'

export const movieListReducer = (state = { movies: [] }, action) => {
  switch (action.type) {
    case MOVIE_LIST_REQUEST:
      return { loading: true, movies: [] }
    case MOVIE_LIST_SUCCESS:
      return { loading: false, movies: action.payload }
    case MOVIE_LIST_FAIL:
      return { loading: false, error: action.payload }
    default:
      return state
  }
}

export const movieCurrentListReducer = (
  state = { currentMovies: [] },
  action
) => {
  switch (action.type) {
    case MOVIE_CURRENT_LIST_REQUEST:
      return { loading: true, currentMovies: [] }
    case MOVIE_CURRENT_LIST_SUCCESS:
      return { loading: false, currentMovies: action.payload }
    case MOVIE_CURRENT_LIST_FAIL:
      return { loading: false, error: action.payload }
    default:
      return state
  }
}

export const moviePastListReducer = (state = { pastMovies: [] }, action) => {
  switch (action.type) {
    case MOVIE_PAST_LIST_REQUEST:
      return { loading: true, pastMovies: [] }
    case MOVIE_PAST_LIST_SUCCESS:
      return { loading: false, pastMovies: action.payload }
    case MOVIE_PAST_LIST_FAIL:
      return { loading: false, error: action.payload }
    default:
      return state
  }
}

export const movieDetailsReducer = (state = { movie: {} }, action) => {
  switch (action.type) {
    case MOVIE_DETAILS_REQUEST:
      return { loading: true, ...state }
    case MOVIE_DETAILS_SUCCESS:
      return { loading: false, movie: action.payload }
    case MOVIE_DETAILS_FAIL:
      return { loading: false, error: action.payload }
    default:
      return state
  }
}

export const movieUpdateReducer = (state = {}, action) => {
  switch (action.type) {
    case MOVIE_UPDATE_REQUEST:
      return { loading: true }
    case MOVIE_UPDATE_SUCCESS:
      return { loading: false, success: true }
    case MOVIE_UPDATE_FAIL:
      return { loading: false, error: action.payload }
    default:
      return state
  }
}

export const movieStartScreenReducer = (state = {}, action) => {
  switch (action.type) {
    case MOVIE_START_SCREEN_REQUEST:
      return { loading: true }
    case MOVIE_START_SCREEN_SUCCESS:
      return { loading: false, success: true }
    case MOVIE_START_SCREEN_FAIL:
      return { loading: false, error: action.payload }
    default:
      return state
  }
}

export const movieStopScreenReducer = (state = {}, action) => {
  switch (action.type) {
    case MOVIE_STOP_SCREEN_REQUEST:
      return { loading: true }
    case MOVIE_STOP_SCREEN_SUCCESS:
      return { loading: false, success: true }
    case MOVIE_STOP_SCREEN_FAIL:
      return { loading: false, error: action.payload }
    default:
      return state
  }
}

export const movieAddReducer = (state = { movieInfo: {} }, action) => {
  switch (action.type) {
    case MOVIE_ADD_REQUEST:
      return { loading: true, ...state }
    case MOVIE_ADD_SUCCESS:
      return { loading: false, success: true, movieInfo: action.payload }
    case MOVIE_ADD_FAIL:
      return { loading: false, error: action.payload }
    default:
      return state
  }
}
