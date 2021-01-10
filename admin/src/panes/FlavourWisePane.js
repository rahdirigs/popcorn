import React, { useEffect, useState } from 'react'
import { Button, Form, Row, Table } from 'react-bootstrap'
import { useDispatch, useSelector } from 'react-redux'
import Loader from '../components/Loader'
import Message from '../components/Message'
import { generateGenreProfits, listAllMovies } from '../actions/movieActions'
import DatePicker from 'react-datepicker'
import 'react-datepicker/dist/react-datepicker.css'
import moment from 'moment'

const FlavourWisePane = () => {
  const [value, setValue] = useState('select')
  const [startDate, setStartDate] = useState(new Date())
  const [endDate, setEndDate] = useState(new Date())
  const [message, setMessage] = useState(null)

  const movieList = useSelector(state => state.movieList)
  const { loading, error, movies } = movieList

  const genreProfits = useSelector(state => state.genreProfits)
  const { loading: loadingGenre, error: errorGenre, details } = genreProfits

  const dispatch = useDispatch()

  const options = [
    { id: 1, text: 'Action', value: 'Action' },
    { id: 2, text: 'Adventure', value: 'Adventure' },
    { id: 3, text: 'Comedy', value: 'Comedy' },
    { id: 4, text: 'Crime', value: 'Crime' },
    { id: 5, text: 'Drama', value: 'Drama' },
    { id: 6, text: 'Fantasy', value: 'Fantasy' },
    { id: 7, text: 'Historical', value: 'Historical' },
    { id: 8, text: 'Horror', value: 'Horror' },
    { id: 9, text: 'Magical', value: 'Magical' },
    { id: 10, text: 'Mystery', value: 'Mystery' },
    { id: 11, text: 'Paranoid Fiction', value: 'Paranoid Fiction' },
    { id: 12, text: 'Philosophical', value: 'Philosophical' },
    { id: 13, text: 'Political', value: 'Political' },
    { id: 14, text: 'Romance', value: 'Romance' },
    { id: 15, text: 'Saga', value: 'Saga' },
    { id: 16, text: 'Satire', value: 'Satire' },
    { id: 17, text: 'Science Fiction', value: 'Science Fiction' },
    { id: 18, text: 'Social', value: 'Social' },
    { id: 19, text: 'Speculative', value: 'Speculative' },
    { id: 20, text: 'Thriller', value: 'Thriller' },
    { id: 21, text: 'Urban', value: 'Urban' },
    { id: 22, text: 'Western', value: 'Western' },
  ]

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
      let genre = value
      if (genre === 'select') {
        genre = options[0].value
      }
      dispatch(generateGenreProfits(genre, startDate, endDate))
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
                  {options.map(opt => (
                    <option key={opt.key} value={opt.value}>
                      {opt.text}
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
            {loadingGenre ? (
              <Loader />
            ) : errorGenre ? (
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

export default FlavourWisePane
