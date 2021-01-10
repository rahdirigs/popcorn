import React, { useEffect, useState } from 'react'
import { Button, Form, Row, Table } from 'react-bootstrap'
import { useDispatch, useSelector } from 'react-redux'
import Loader from '../components/Loader'
import Message from '../components/Message'
import { generateMovieProfits, listAllMovies } from '../actions/movieActions'
import DatePicker from 'react-datepicker'
import 'react-datepicker/dist/react-datepicker.css'
import moment from 'moment'

const MovieWisePane = () => {
  const [value, setValue] = useState(999)
  const [startDate, setStartDate] = useState(new Date())
  const [endDate, setEndDate] = useState(new Date())
  const [message, setMessage] = useState(null)

  const movieList = useSelector(state => state.movieList)
  const { loading, error, movies } = movieList

  const movieProfits = useSelector(state => state.movieProfits)
  const { loading: loadingMovie, error: errorMovie, details } = movieProfits

  const dispatch = useDispatch()

  useEffect(() => {
    dispatch(listAllMovies())
  }, [dispatch])

  const isFormValid = () => {
    const startMoment = moment(startDate)
    const endMoment = moment(endDate)
    if (startMoment.isAfter(endMoment)) {
      setMessage('Invalid date range')
      return false
    }
    return true
  }

  const getReports = () => {
    if (isFormValid()) {
      setMessage(null)
      let id = value
      if (id === 999) {
        id = movies[0].id
      }
      dispatch(generateMovieProfits(id, startDate, endDate))
    }
  }

  return (
    <>
      {loading ? (
        <Loader />
      ) : error ? (
        <Message>{error}</Message>
      ) : (
        movies && (
          <>
            <Form className="my-3">
              <Form.Group>
                <Form.Label>Select a movie</Form.Label>
                <Form.Control
                  as="select"
                  value={value}
                  onChange={e => setValue(e.target.value)}
                >
                  {movies.map(movie => (
                    <option key={movie.id} value={movie.id}>
                      {movie.name}
                    </option>
                  ))}
                </Form.Control>
              </Form.Group>
              <Form.Group>
                <Form.Label>Pick a start Date</Form.Label>
                <br />
                <DatePicker
                  selected={startDate}
                  onChange={date => setStartDate(date)}
                />
              </Form.Group>
              <Form.Group>
                <Form.Label>Pick an end Date</Form.Label>
                <br />
                <DatePicker
                  selected={endDate}
                  onChange={date => setEndDate(date)}
                />
              </Form.Group>
              {message && <Message>{message}</Message>}
              <Button
                variant="primary"
                className="my-1"
                onClick={() => getReports()}
              >
                Genrate reports
              </Button>
            </Form>
            {loadingMovie ? (
              <Loader />
            ) : errorMovie ? (
              <Message>{error}</Message>
            ) : (
              <Row>
                <Table
                  striped
                  hover
                  responsive
                  bordered
                  className="my-3 table-sm"
                >
                  <thead>
                    <tr>
                      <th>Tickets Sold</th>
                      <th>Seats Booked</th>
                      <th>Ticket Revenue</th>
                      <th>Refreshment Revenue</th>
                      <th>Total Revenue</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr>
                      <td>{details.ticketsSold}</td>
                      <td>{details.seatsSold}</td>
                      <td>{details.ticketRev}</td>
                      <td>{details.refRev}</td>
                      <td>{details.totalRev}</td>
                    </tr>
                  </tbody>
                </Table>
              </Row>
            )}
          </>
        )
      )}
    </>
  )
}

export default MovieWisePane
