import axios from 'axios'
import {
  EMPLOYEE_ADD_FAIL,
  EMPLOYEE_ADD_REQUEST,
  EMPLOYEE_ADD_SUCCESS,
  EMPLOYEE_CURRENT_LIST_FAIL,
  EMPLOYEE_CURRENT_LIST_REQUEST,
  EMPLOYEE_CURRENT_LIST_SUCCESS,
  EMPLOYEE_LIST_FAIL,
  EMPLOYEE_LIST_REQUEST,
  EMPLOYEE_LIST_SUCCESS,
  EMPLOYEE_PAST_LIST_FAIL,
  EMPLOYEE_PAST_LIST_REQUEST,
  EMPLOYEE_PAST_LIST_SUCCESS,
  EMPLOYEE_START_WORK_FAIL,
  EMPLOYEE_START_WORK_REQUEST,
  EMPLOYEE_START_WORK_SUCCESS,
  EMPLOYEE_STOP_WORK_FAIL,
  EMPLOYEE_STOP_WORK_REQUEST,
  EMPLOYEE_STOP_WORK_SUCCESS,
} from '../constants/employeeConstants'

export const listAllEmployees = () => async dispatch => {
  try {
    dispatch({ type: EMPLOYEE_LIST_REQUEST })

    const { data } = await axios.get('/api/employees')
    dispatch({ type: EMPLOYEE_LIST_SUCCESS, payload: data })
  } catch (error) {
    dispatch({
      type: EMPLOYEE_LIST_FAIL,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    })
  }
}

export const listCurrentEmployees = () => async dispatch => {
  try {
    dispatch({ type: EMPLOYEE_CURRENT_LIST_REQUEST })

    const { data } = await axios.get('/api/employees/current')
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

export const listPastEmployees = () => async dispatch => {
  try {
    dispatch({ type: EMPLOYEE_PAST_LIST_REQUEST })

    const { data } = await axios.get('/api/employees/past')
    dispatch({ type: EMPLOYEE_PAST_LIST_SUCCESS, payload: data })
  } catch (error) {
    dispatch({
      type: EMPLOYEE_PAST_LIST_FAIL,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    })
  }
}

export const employeeStartWorking = id => async dispatch => {
  try {
    dispatch({ type: EMPLOYEE_START_WORK_REQUEST })

    const config = {
      headers: {
        'Content-Type': 'application/json',
      },
    }

    await axios.put(
      `/api/employees/work/${id}`,
      {
        isWorking: 1,
      },
      config
    )

    dispatch({ type: EMPLOYEE_START_WORK_SUCCESS })
  } catch (error) {
    dispatch({
      type: EMPLOYEE_START_WORK_FAIL,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    })
  }
}

export const employeeStopWorking = id => async dispatch => {
  try {
    dispatch({ type: EMPLOYEE_STOP_WORK_REQUEST })

    const config = {
      headers: {
        'Content-Type': 'application/json',
      },
    }

    await axios.put(
      `/api/employees/work/${id}`,
      {
        isWorking: 0,
      },
      config
    )

    dispatch({ type: EMPLOYEE_STOP_WORK_SUCCESS })
  } catch (error) {
    dispatch({
      type: EMPLOYEE_STOP_WORK_FAIL,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    })
  }
}

export const registerEmployee = (
  firstName,
  lastName,
  email,
  dateOfBirth,
  password,
  contact,
  addressLineOne,
  addressLineTwo,
  city,
  pincode
) => async dispatch => {
  try {
    dispatch({ type: EMPLOYEE_ADD_REQUEST })

    const config = {
      headers: {
        'Content-Type': 'application/json',
      },
    }
    const { data } = await axios.post(
      '/api/employees',
      {
        firstName,
        lastName,
        email,
        dateOfBirth,
        password,
        contact,
        addressLineOne,
        addressLineTwo,
        city,
        pincode,
      },
      config
    )

    dispatch({ type: EMPLOYEE_ADD_SUCCESS, payload: data })
  } catch (error) {
    dispatch({
      type: EMPLOYEE_ADD_FAIL,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    })
  }
}
