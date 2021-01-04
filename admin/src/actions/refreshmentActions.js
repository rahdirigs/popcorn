import axios from 'axios'
import {
  REFRESHMENT_ADD_FAIL,
  REFRESHMENT_ADD_REQUEST,
  REFRESHMENT_ADD_SUCCESS,
  REFRESHMENT_DELETE_FAIL,
  REFRESHMENT_DELETE_REQUEST,
  REFRESHMENT_DELETE_SUCCESS,
  REFRESHMENT_DETAILS_FAIL,
  REFRESHMENT_DETAILS_REQUEST,
  REFRESHMENT_DETAILS_SUCCESS,
  REFRESHMENT_LIST_FAIL,
  REFRESHMENT_LIST_REQUEST,
  REFRESHMENT_LIST_SUCCESS,
  REFRESHMENT_UPDATE_FAIL,
  REFRESHMENT_UPDATE_REQUEST,
  REFRESHMENT_UPDATE_SUCCESS,
} from '../constants/refreshmentConstants'

export const listRefreshments = () => async dispatch => {
  try {
    dispatch({ type: REFRESHMENT_LIST_REQUEST })

    const { data } = await axios.get('/api/refreshments')
    dispatch({ type: REFRESHMENT_LIST_SUCCESS, payload: data })
  } catch (error) {
    dispatch({
      type: REFRESHMENT_LIST_FAIL,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    })
  }
}

export const listRefreshmentDetails = id => async dispatch => {
  try {
    dispatch({ type: REFRESHMENT_DETAILS_REQUEST })

    const { data } = await axios.get(`/api/refreshments/${id}`)
    dispatch({ type: REFRESHMENT_DETAILS_SUCCESS, payload: data })
  } catch (error) {
    dispatch({
      type: REFRESHMENT_DETAILS_FAIL,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    })
  }
}

export const addRefreshment = (
  name,
  url,
  price,
  countInStock
) => async dispatch => {
  try {
    dispatch({ type: REFRESHMENT_ADD_REQUEST })

    const config = {
      headers: {
        'Content-Type': 'application/json',
      },
    }

    const { data } = await axios.post(
      '/api/refreshments/',
      {
        name: name,
        image: url,
        price: price,
        countInStock: countInStock,
      },
      config
    )
    dispatch({ type: REFRESHMENT_ADD_SUCCESS, payload: data })
  } catch (error) {
    dispatch({
      type: REFRESHMENT_ADD_FAIL,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    })
  }
}

export const updateRefreshment = (price, countInStock) => async (
  dispatch,
  getState
) => {
  try {
    dispatch({ type: REFRESHMENT_UPDATE_REQUEST })

    const {
      refreshmentDetails: { refreshment },
    } = getState()

    const config = {
      headers: {
        'Content-Type': 'application/json',
      },
    }

    const { data } = await axios.put(
      `/api/refreshments/${refreshment._id}`,
      {
        price: price,
        countInStock: countInStock,
      },
      config
    )
    dispatch({ type: REFRESHMENT_UPDATE_SUCCESS, payload: data })
  } catch (error) {
    dispatch({
      type: REFRESHMENT_UPDATE_FAIL,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    })
  }
}

export const deleteRefreshment = id => async dispatch => {
  try {
    dispatch({ type: REFRESHMENT_DELETE_REQUEST })

    await axios.delete(`/api/refreshments/${id}`)
    dispatch({ type: REFRESHMENT_DELETE_SUCCESS })
  } catch (error) {
    dispatch({
      type: REFRESHMENT_DELETE_FAIL,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    })
  }
}
