import React, { useEffect } from 'react'
import { Row, Table } from 'react-bootstrap'
import { useDispatch, useSelector } from 'react-redux'
import { getBookings } from '../actions/bookingActions'
import Loader from '../components/Loader'
import Message from '../components/Message'
import { listDoneShows } from '../actions/showActions'

const WatchHistorypage = ({ history }) => {
  const dispatch = useDispatch()

  const userLogin = useSelector(state => state.userLogin)
  const { userInfo } = userLogin

  const getTickets = useSelector(state => state.getTickets)
  const { error, tickets } = getTickets

  const showDone = useSelector(state => state.showDone)
  const { loading: showLoading, doneShows } = showDone

  useEffect(() => {
    if (!userInfo) {
      history.push('/login?redirect=watch-history')
    } else {
      dispatch(getBookings())
      dispatch(listDoneShows())
    }
  }, [history, userInfo, dispatch])

  return (
    <>
      {showLoading ? (
        <Loader />
      ) : error ? (
        <Message>{error}</Message>
      ) : (
        <>
          <Row>
            <h5>Your Watch History</h5>
            <Table striped bordered hover responsive className="my-3">
              <thead>
                <tr>
                  <th>Date</th>
                  <th>Movie</th>
                  <th>Seats</th>
                  <th>Total Cost</th>
                  <th>Employee assigned</th>
                  <th></th>
                </tr>
              </thead>
              <tbody>
                {tickets.map(ticket => (
                  <tr key={ticket._id}>
                    <td>{ticket.show.date}</td>
                    <td>{ticket.show.movie.name}</td>
                    <td>{ticket.seatCount}</td>
                    <td>{ticket.totalTicketPrice + ticket.refreshmentCost}</td>
                    {ticket.employee ? (
                      <td>
                        {[
                          ticket.employee.firstName,
                          ticket.employee.lastName,
                        ].join(' ')}
                      </td>
                    ) : (
                      <td>---None---</td>
                    )}
                    <td>
                      {doneShows.includes(String(ticket.show._id)) ? (
                        <i
                          className="fas fa-check"
                          style={{ color: 'green' }}
                        ></i>
                      ) : (
                        <i
                          className="fas fa-times"
                          style={{ color: 'red' }}
                        ></i>
                      )}
                    </td>
                  </tr>
                ))}
              </tbody>
            </Table>
          </Row>
        </>
      )}
    </>
  )
}

export default WatchHistorypage
