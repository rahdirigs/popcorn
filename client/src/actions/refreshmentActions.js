import axios from 'axios'
import {
  REFRESHMENT_LIST_FAIL,
  REFRESHMENT_LIST_REQUEST,
  REFRESHMENT_LIST_SUCCESS,
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
