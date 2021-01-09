import axios from 'axios'
import {
  BOOK_TICKET_FAIL,
  BOOK_TICKET_REQUEST,
  BOOK_TICKET_SUCCESS,
  GET_TICKET_FAIL,
  GET_TICKET_REQUEST,
  GET_TICKET_SUCCESS,
} from '../constants/bookingConstants'

export const bookTicket = (
  seatCount,
  totalTicketPrice,
  ref,
  refreshmentCost,
  employee
) => async (dispatch, getState) => {
  try {
    dispatch({ type: BOOK_TICKET_REQUEST })

    const {
      userLogin: { userInfo },
      showDetails: { show },
    } = getState()

    const config = {
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${userInfo.token}`,
      },
    }

    const { data } = await axios.post(
      '/api/tickets',
      {
        user: userInfo,
        show,
        seatCount,
        ticketPrice: show.ticketPrice,
        totalTicketPrice,
        refreshments: ref,
        refreshmentCost,
        employee,
      },
      config
    )
    dispatch({ type: BOOK_TICKET_SUCCESS, payload: data })
  } catch (error) {
    dispatch({
      type: BOOK_TICKET_FAIL,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    })
  }
}

export const getBookings = () => async (dispatch, getState) => {
  try {
    dispatch({ type: GET_TICKET_REQUEST })

    const {
      userLogin: { userInfo },
    } = getState()

    const config = {
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${userInfo.token}`,
      },
    }

    const { data } = await axios.get('/api/tickets', config)

    dispatch({ type: GET_TICKET_SUCCESS, payload: data })
  } catch (error) {
    dispatch({
      type: GET_TICKET_FAIL,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    })
  }
}
