import axios from 'axios'
import {
  MOVIE_CREATE_REVIEW_FAIL,
  MOVIE_CREATE_REVIEW_REQUEST,
  MOVIE_CREATE_REVIEW_SUCCESS,
  MOVIE_DETAILS_FAIL,
  MOVIE_DETAILS_REQUEST,
  MOVIE_DETAILS_SUCCESS,
  MOVIE_LIST_FAIL,
  MOVIE_LIST_REQUEST,
  MOVIE_LIST_SUCCESS,
} from '../constants/movieConstants'

export const listMovies = () => async dispatch => {
  try {
    dispatch({ type: MOVIE_LIST_REQUEST })

    const { data } = await axios.get('/api/movies')
    dispatch({ type: MOVIE_LIST_SUCCESS, payload: data })
  } catch (error) {
    dispatch({
      type: MOVIE_LIST_FAIL,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    })
  }
}

export const listMovieDetails = id => async dispatch => {
  try {
    dispatch({ type: MOVIE_DETAILS_REQUEST })

    const { data } = await axios.get(`/api/movies/${id}`)
    dispatch({ type: MOVIE_DETAILS_SUCCESS, payload: data })
  } catch (error) {
    dispatch({
      type: MOVIE_DETAILS_FAIL,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    })
  }
}

export const createMovieReview = (id, rating, comment) => async (
  dispatch,
  getState
) => {
  try {
    dispatch({ type: MOVIE_CREATE_REVIEW_REQUEST })

    const {
      userLogin: { userInfo },
    } = getState()

    const config = {
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${userInfo.token}`,
      },
    }

    const { data } = await axios.post(
      `/api/movies/${id}/reviews`,
      {
        rating: rating,
        comment: comment,
      },
      config
    )
    dispatch({ type: MOVIE_CREATE_REVIEW_SUCCESS, payload: data })
  } catch (error) {
    dispatch({
      type: MOVIE_CREATE_REVIEW_FAIL,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    })
  }
}
