import React, { useEffect } from 'react'
import { Table } from 'react-bootstrap'
import { useDispatch, useSelector } from 'react-redux'
import Loader from '../components/Loader'
import Message from '../components/Message'
import { listAllShows } from '../actions/showActions'

const AllShowsPane = () => {
  const dispatch = useDispatch()

  const showList = useSelector(state => state.showList)
  const { loading, error, shows } = showList

  useEffect(() => {
    dispatch(listAllShows())
  }, [dispatch])

  return loading ? (
    <Loader />
  ) : error ? (
    <Message>{error}</Message>
  ) : shows.length === 0 ? (
    <Message variant="info">No shows yet in the database</Message>
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
        {shows.length > 0 ? (
          shows.map(show => (
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
