import {
  MOVIE_CREATE_REVIEW_FAIL,
  MOVIE_CREATE_REVIEW_REQUEST,
  MOVIE_CREATE_REVIEW_RESET,
  MOVIE_CREATE_REVIEW_SUCCESS,
  MOVIE_DETAILS_FAIL,
  MOVIE_DETAILS_REQUEST,
  MOVIE_DETAILS_SUCCESS,
  MOVIE_LIST_FAIL,
  MOVIE_LIST_REQUEST,
  MOVIE_LIST_SUCCESS,
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

export const movieDetailsReducer = (
  state = { movie: { genres: [], writer: [], cast: [], reviews: [] } },
  action
) => {
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

export const movieCreateReviewReducer = (state = {}, action) => {
  switch (action.type) {
    case MOVIE_CREATE_REVIEW_REQUEST:
      return { loading: true }
    case MOVIE_CREATE_REVIEW_SUCCESS:
      return { loading: false, success: true, returnmsg: action.payload }
    case MOVIE_CREATE_REVIEW_FAIL:
      return { loading: false, error: action.payload }
    case MOVIE_CREATE_REVIEW_RESET:
      return {}
    default:
      return state
  }
}
