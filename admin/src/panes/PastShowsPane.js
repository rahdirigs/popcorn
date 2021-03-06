import React, { useEffect } from 'react'
import { Table } from 'react-bootstrap'
import { useDispatch, useSelector } from 'react-redux'
import Loader from '../components/Loader'
import Message from '../components/Message'
import { listPastShows } from '../actions/showActions'

const AllShowsPane = () => {
  const dispatch = useDispatch()

  const showPastList = useSelector(state => state.showPastList)
  const { loading, error, pastShows } = showPastList

  const showMark = useSelector(state => state.showMark)
  const { success } = showMark

  useEffect(() => {
    dispatch(listPastShows())
  }, [dispatch, success])

  return loading ? (
    <Loader />
  ) : error ? (
    <Message>{error}</Message>
  ) : pastShows.length === 0 ? (
    <Message variant="info">No shows screened in the past</Message>
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
        </tr>
      </thead>
      <tbody>
        {pastShows.length > 0 ? (
          pastShows.map(show => (
            <tr key={show._id}>
              <td>{show.movie.name}</td>
              <td>{show.date}</td>
              <td>{show.ticketCount}</td>
              <td>{show.ticketSold}</td>
              <td>{show.ticketPrice}</td>
              <td>{show.earned}</td>
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
