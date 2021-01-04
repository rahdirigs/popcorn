import {
  REFRESHMENT_ADD_FAIL,
  REFRESHMENT_ADD_REQUEST,
  REFRESHMENT_ADD_SUCCESS,
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

export const refreshmentListReducer = (
  state = { refreshments: [] },
  action
) => {
  switch (action.type) {
    case REFRESHMENT_LIST_REQUEST:
      return { loading: true, refreshments: [] }
    case REFRESHMENT_LIST_SUCCESS:
      return { loading: false, refreshments: action.payload }
    case REFRESHMENT_LIST_FAIL:
      return { loading: false, error: action.payload }
    default:
      return state
  }
}

export const refreshmentDetailsReducer = (
  state = { refreshment: {} },
  action
) => {
  switch (action.type) {
    case REFRESHMENT_DETAILS_REQUEST:
      return { loading: true, ...state }
    case REFRESHMENT_DETAILS_SUCCESS:
      return { loading: false, refreshment: action.payload }
    case REFRESHMENT_DETAILS_FAIL:
      return { loading: false, error: action.payload }
    default:
      return state
  }
}

export const refreshmentUpdateReducer = (state = {}, action) => {
  switch (action.type) {
    case REFRESHMENT_UPDATE_REQUEST:
      return { loading: true }
    case REFRESHMENT_UPDATE_SUCCESS:
      return { loading: false, success: true, refreshmentInfo: action.payload }
    case REFRESHMENT_UPDATE_FAIL:
      return { loading: false, error: action.payload }
    default:
      return state
  }
}

export const refreshmentDeleteReducer = (state = {}, action) => {
  switch (action.type) {
    case REFRESHMENT_DELETE_REQUEST:
      return { loading: true }
    case REFRESHMENT_DELETE_SUCCESS:
      return { loading: false, success: true }
    case REFRESHMENT_DETAILS_FAIL:
      return { loading: false, error: action.payload }
    default:
      return state
  }
}

export const refreshmentAddReducer = (
  state = { refreshmentInfo: {} },
  action
) => {
  switch (action.type) {
    case REFRESHMENT_ADD_REQUEST:
      return { loading: true, ...state }
    case REFRESHMENT_ADD_SUCCESS:
      return { loading: false, success: true, refreshmentInfo: action.payload }
    case REFRESHMENT_ADD_FAIL:
      return { loading: false, error: action.payload }
    default:
      return state
  }
}
