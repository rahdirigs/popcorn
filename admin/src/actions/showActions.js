import axios from 'axios'
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

export const listAllShows = () => async dispatch => {
  try {
    dispatch({ type: SHOW_LIST_REQUEST })

    const { data } = await axios.get('/api/shows')
    dispatch({ type: SHOW_LIST_SUCCESS, payload: data })
  } catch (error) {
    dispatch({
      type: SHOW_LIST_FAIL,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    })
  }
}

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

export const listPastShows = () => async dispatch => {
  try {
    dispatch({ type: SHOW_PAST_LIST_REQUEST })

    const { data } = await axios.get('/api/shows/past')
    dispatch({ type: SHOW_PAST_LIST_SUCCESS, payload: data })
  } catch (error) {
    dispatch({
      type: SHOW_PAST_LIST_FAIL,
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

export const updateShow = (tickets, price) => async (dispatch, getState) => {
  try {
    dispatch({ type: SHOW_UPDATE_REQUEST })

    const {
      showDetails: { show },
    } = getState()

    const config = {
      headers: {
        'Content-Type': 'application/json',
      },
    }

    await axios.put(
      `/api/shows/${show._id}`,
      { tickets: tickets, price: price },
      config
    )

    dispatch({ type: SHOW_UPDATE_SUCCESS })
  } catch (error) {
    dispatch({
      type: SHOW_UPDATE_FAIL,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    })
  }
}

export const markShowAsDone = id => async dispatch => {
  try {
    dispatch({ type: SHOW_MARK_REQUEST })

    const config = {
      headers: {
        'Content-Type': 'application/json',
      },
    }

    await axios.put(`/api/shows/mark/${id}`, config)

    dispatch({ type: SHOW_MARK_SUCCESS })
  } catch (error) {
    dispatch({
      type: SHOW_MARK_FAIL,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    })
  }
}

export const createShow = (
  movie,
  date,
  ticketCount,
  ticketPrice
) => async dispatch => {
  try {
    dispatch({ type: SHOW_CREATE_REQUEST })

    const config = {
      headers: {
        'Content-Type': 'application/json',
      },
    }

    const { data } = await axios.post(
      '/api/shows',
      {
        movie: movie,
        date: date,
        ticketCount: ticketCount,
        ticketPrice: ticketPrice,
      },
      config
    )

    dispatch({ type: SHOW_CREATE_SUCCESS, payload: data })
  } catch (error) {
    dispatch({
      type: SHOW_CREATE_FAIL,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    })
  }
}
