import axios from 'axios'
import {
  EMPLOYEE_CURRENT_LIST_FAIL,
  EMPLOYEE_CURRENT_LIST_REQUEST,
  EMPLOYEE_CURRENT_LIST_SUCCESS,
} from '../constants/employeeConstants'

export const listCurrentEmployees = () => async dispatch => {
  try {
    dispatch({ type: EMPLOYEE_CURRENT_LIST_REQUEST })

    const { data } = await axios.get('/api/employees/mongo/current')
    dispatch({ type: EMPLOYEE_CURRENT_LIST_SUCCESS, payload: data })
  } catch (error) {
    dispatch({
      type: EMPLOYEE_CURRENT_LIST_FAIL,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    })
  }
}
