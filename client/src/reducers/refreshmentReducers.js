import {
  REFRESHMENT_LIST_FAIL,
  REFRESHMENT_LIST_REQUEST,
  REFRESHMENT_LIST_SUCCESS,
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
