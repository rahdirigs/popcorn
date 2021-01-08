import {
  EMPLOYEE_CURRENT_LIST_FAIL,
  EMPLOYEE_CURRENT_LIST_REQUEST,
  EMPLOYEE_CURRENT_LIST_SUCCESS,
} from '../constants/employeeConstants'

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
