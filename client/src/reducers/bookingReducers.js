import {
  BOOK_TICKET_FAIL,
  BOOK_TICKET_REQUEST,
  BOOK_TICKET_SUCCESS,
  GET_TICKET_FAIL,
  GET_TICKET_REQUEST,
  GET_TICKET_SUCCESS,
} from '../constants/bookingConstants'

export const ticketBookReducer = (state = { ticket: {} }, action) => {
  switch (action.type) {
    case BOOK_TICKET_REQUEST:
      return { loading: true, ...state }
    case BOOK_TICKET_SUCCESS:
      return { loading: false, success: true, ticket: action.payload }
    case BOOK_TICKET_FAIL:
      return { loading: false, error: action.payload }
    default:
      return state
  }
}

export const getTicketsReducer = (state = { tickets: [] }, action) => {
  switch (action.type) {
    case GET_TICKET_REQUEST:
      return { loading: true, tickets: [] }
    case GET_TICKET_SUCCESS:
      return { loading: false, tickets: action.payload }
    case GET_TICKET_FAIL:
      return { loading: false, error: action.payload }
    default:
      return state
  }
}
