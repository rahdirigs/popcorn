import React, { useEffect } from 'react'
import { Button, Table } from 'react-bootstrap'
import { LinkContainer } from 'react-router-bootstrap'
import { useDispatch, useSelector } from 'react-redux'
import Loader from '../components/Loader'
import Message from '../components/Message'
import { listFutureShows, markShowAsDone } from '../actions/showActions'

const AllShowsPane = () => {
  const dispatch = useDispatch()

  const showFutureList = useSelector(state => state.showFutureList)
  const { loading, error, futureShows } = showFutureList

  const showMark = useSelector(state => state.showMark)
  const { success } = showMark

  useEffect(() => {
    dispatch(listFutureShows())
  }, [dispatch, success])

  const markShowHandler = id => {
    dispatch(markShowAsDone(id))
  }

  return loading ? (
    <Loader />
  ) : error ? (
    <Message>{error}</Message>
  ) : futureShows.length === 0 ? (
    <Message variant="info">No shows scheduled for recent future</Message>
  ) : (
    <Table striped bordered responsive hover className="table-md my-3">
      <thead>
        <tr>
          <th>Movie Name</th>
          <th>Date</th>
          <th>Total tickets</th>
          <th>Tickets sold</th>
          <th>Ticket price</th>
          <th>Earnings</th>
          <th></th>
          <th></th>
        </tr>
      </thead>
      <tbody>
        {futureShows.length > 0 ? (
          futureShows.map(show => (
            <tr key={show._id}>
              <td>{show.movie.name}</td>
              <td>{show.date}</td>
              <td>{show.ticketCount}</td>
              <td>{show.ticketSold}</td>
              <td>{show.ticketPrice}</td>
              <td>{show.earned}</td>
              <td>
                <LinkContainer to={`/edit/shows/${show._id}`}>
                  <i className="fas fa-edit"></i>
                </LinkContainer>
              </td>
              <td>
                <Button
                  variant="success"
                  className="btn-sm"
                  onClick={() => markShowHandler(show._id)}
                >
                  <i className="fas fa-check"></i>
                </Button>
              </td>
            </tr>
          ))
        ) : (
          <></>
        )}
      </tbody>
    </Table>
  )
}

export default AllShowsPane
