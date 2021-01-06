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

export const employeeListReducer = (state = { employees: [] }, action) => {
  switch (action.type) {
    case EMPLOYEE_LIST_REQUEST:
      return { loading: true, employees: [] }
    case EMPLOYEE_LIST_SUCCESS:
      return { loading: false, employees: action.payload }
    case EMPLOYEE_LIST_FAIL:
      return { loading: false, error: action.payload }
    default:
      return state
  }
}

export const employeeCurrentListReducer = (
  state = { currentEmployees: [] },
  action
) => {
  switch (action.type) {
    case EMPLOYEE_CURRENT_LIST_REQUEST:
      return { loading: true, currentEmployees: [] }
    case EMPLOYEE_CURRENT_LIST_SUCCESS:
      return { loading: false, currentEmployees: action.payload }
    case EMPLOYEE_CURRENT_LIST_FAIL:
      return { loading: false, error: action.payload }
    default:
      return state
  }
}

export const employeePastListReducer = (
  state = { pastEmployees: [] },
  action
) => {
  switch (action.type) {
    case EMPLOYEE_PAST_LIST_REQUEST:
      return { loading: true, pastEmployees: [] }
    case EMPLOYEE_PAST_LIST_SUCCESS:
      return { loading: false, pastEmployees: action.payload }
    case EMPLOYEE_PAST_LIST_FAIL:
      return { loading: false, error: action.payload }
    default:
      return state
  }
}

export const employeeStartWorkReducer = (state = {}, action) => {
  switch (action.type) {
    case EMPLOYEE_START_WORK_REQUEST:
      return { loading: true }
    case EMPLOYEE_START_WORK_SUCCESS:
      return { loading: false, success: true }
    case EMPLOYEE_START_WORK_FAIL:
      return { loading: false, error: action.payload }
    default:
      return state
  }
}

export const employeeStopWorkReducer = (state = {}, action) => {
  switch (action.type) {
    case EMPLOYEE_STOP_WORK_REQUEST:
      return { loading: true }
    case EMPLOYEE_STOP_WORK_SUCCESS:
      return { loading: false, success: true }
    case EMPLOYEE_STOP_WORK_FAIL:
      return { loading: false, error: action.payload }
    default:
      return state
  }
}

export const employeeAddReducer = (state = { employeeInfo: {} }, action) => {
  switch (action.type) {
    case EMPLOYEE_ADD_REQUEST:
      return { loading: true, ...state }
    case EMPLOYEE_ADD_SUCCESS:
      return { loading: false, success: true, employeeInfo: action.payload }
    case EMPLOYEE_ADD_FAIL:
      return { loading: false, error: action.payload }
    default:
      return state
  }
}
