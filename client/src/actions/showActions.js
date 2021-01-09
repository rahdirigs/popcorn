import axios from 'axios'
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

export const listFutureShows = () => async dispatch => {
  try {
    dispatch({ type: SHOW_FUTURE_LIST_REQUEST })

    const { data } = await axios.get('/api/shows/future')
    dispatch({ type: SHOW_FUTURE_LIST_SUCCESS, payload: data })
  } catch (error) {
    dispatch({
      type: SHOW_FUTURE_LIST_FAIL,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    })
  }
}

export const listShowDetails = id => async dispatch => {
  try {
    dispatch({ type: SHOW_DETAILS_REQUEST })

    const { data } = await axios.get(`/api/shows/${id}`)
    dispatch({ type: SHOW_DETAILS_SUCCESS, payload: data })
  } catch (error) {
    dispatch({
      type: SHOW_DETAILS_FAIL,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    })
  }
}

export const listDoneShows = () => async dispatch => {
  try {
    dispatch({ type: SHOW_DONE_REQUEST })

    const { data } = await axios.get('/api/shows/done')
    dispatch({ type: SHOW_DONE_SUCCESS, payload: data })
  } catch (error) {
    dispatch({
      type: SHOW_DONE_FAIL,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    })
  }
}
