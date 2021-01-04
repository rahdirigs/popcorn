import axios from 'axios'
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

export const listAllMovies = () => async dispatch => {
  try {
    dispatch({ type: MOVIE_LIST_REQUEST })

    const { data } = await axios.get('/api/admin/movies')
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

export const listCurrentMovies = () => async dispatch => {
  try {
    dispatch({ type: MOVIE_CURRENT_LIST_REQUEST })

    const { data } = await axios.get('/api/admin/current/movies')
    dispatch({ type: MOVIE_CURRENT_LIST_SUCCESS, payload: data })
  } catch (error) {
    dispatch({
      type: MOVIE_CURRENT_LIST_FAIL,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    })
  }
}

export const listPastMovies = () => async dispatch => {
  try {
    dispatch({ type: MOVIE_PAST_LIST_REQUEST })

    const { data } = await axios.get('/api/admin/past/movies')
    dispatch({ type: MOVIE_PAST_LIST_SUCCESS, payload: data })
  } catch (error) {
    dispatch({
      type: MOVIE_PAST_LIST_FAIL,
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

export const movieUpdate = costs => async (dispatch, getState) => {
  try {
    dispatch({ type: MOVIE_UPDATE_REQUEST })

    const {
      movieDetails: { movie },
    } = getState()

    const config = {
      headers: {
        'Content-Type': 'application/json',
      },
    }

    await axios.put(
      `/api/admin/movies/${movie.refId}`,
      { costs: costs },
      config
    )

    dispatch({ type: MOVIE_UPDATE_SUCCESS })
  } catch (error) {
    dispatch({
      type: MOVIE_UPDATE_FAIL,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    })
  }
}

export const movieStartScreening = id => async dispatch => {
  try {
    dispatch({ type: MOVIE_START_SCREEN_REQUEST })

    const config = {
      headers: {
        'Content-Type': 'application/json',
      },
    }

    await axios.put(
      `/api/admin/screen/${id}`,
      {
        isScreening: 1,
      },
      config
    )

    dispatch({ type: MOVIE_START_SCREEN_SUCCESS })
  } catch (error) {
    dispatch({
      type: MOVIE_START_SCREEN_FAIL,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    })
  }
}

export const movieStopScreening = id => async dispatch => {
  try {
    dispatch({ type: MOVIE_STOP_SCREEN_REQUEST })

    const config = {
      headers: {
        'Content-Type': 'application/json',
      },
    }

    await axios.put(
      `/api/admin/screen/${id}`,
      {
        isScreening: 0,
      },
      config
    )

    dispatch({ type: MOVIE_STOP_SCREEN_SUCCESS })
  } catch (error) {
    dispatch({
      type: MOVIE_STOP_SCREEN_FAIL,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    })
  }
}

export const addMovie = (
  name,
  image,
  year,
  runtime,
  genres,
  released,
  director,
  writer,
  cast,
  desc
) => async dispatch => {
  try {
    dispatch({ type: MOVIE_ADD_REQUEST })

    const config = {
      headers: {
        'Content-Type': 'application/json',
      },
    }

    const { data } = await axios.post(
      '/api/admin/movies',
      {
        name: name,
        image: image,
        year: year,
        runtime: runtime,
        genres: genres,
        released: released,
        director: director,
        writer: writer,
        cast: cast,
        desc: desc,
      },
      config
    )

    dispatch({ type: MOVIE_ADD_SUCCESS, payload: data })
  } catch (error) {
    dispatch({
      type: MOVIE_ADD_FAIL,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    })
  }
}
