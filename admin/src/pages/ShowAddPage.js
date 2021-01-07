import React, { useEffect, useState } from 'react'
import { Button, Form } from 'react-bootstrap'
import { useDispatch, useSelector } from 'react-redux'
import { listCurrentMoviesForShows } from '../actions/showActions'
import FormContainer from '../components/FormContainer'
import DatePicker from 'react-datepicker'
import 'react-datepicker/dist/react-datepicker.css'
import Message from '../components/Message'
import Loader from '../components/Loader'
import { createShow } from '../actions/showActions'

const ShowAddPage = () => {
  const [val, setVal] = useState('')
  const [success, setSuccess] = useState(false)
  const [message, setMessage] = useState(null)
  const [ticketCount, setTicketCount] = useState(0)
  const [ticketPrice, setTicketPrice] = useState(0)
  const [initialDate, setInitialDate] = useState(new Date())

  const dispatch = useDispatch()
  const showListCurrentMovies = useSelector(
    state => state.showListCurrentMovies
  )
  const { error, success: listSuccess, currentMovies } = showListCurrentMovies

  const showCreate = useSelector(state => state.showCreate)
  const { loading, error: createError } = showCreate

  const movieStopScreen = useSelector(state => state.movieStopScreen)
  const { success: stopSuccess } = movieStopScreen

  const movieStartScreen = useSelector(state => state.movieStartScreen)
  const { success: startSuccess } = movieStartScreen

  useEffect(() => {
    if (!listSuccess) {
      dispatch(listCurrentMoviesForShows())
    } else {
      if (currentMovies.length === 0) {
        setVal('No Movies Currently screening...')
      } else {
        setVal(currentMovies[0].refId.toString())
      }
    }
  }, [dispatch, listSuccess, startSuccess, stopSuccess])

  const isFormEmpty = () => {
    return ticketCount === 0 || ticketPrice === 0
  }

  const isValidDate = () => {
    const today = new Date()
    if (today.getFullYear() > initialDate.getFullYear()) {
      return false
    } else if (today.getFullYear() < initialDate.getFullYear()) {
      return true
    } else {
      if (today.getMonth() > initialDate.getMonth()) {
        return false
      } else if (today.getMonth() < initialDate.getMonth()) {
        return true
      } else {
        if (today.getDate() > initialDate.getDate()) {
          return false
        } else {
          return true
        }
      }
    }
  }

  const isFormValid = () => {
    if (isFormEmpty()) {
      setMessage('Please fill out all fields...')
      return false
    } else if (!isValidDate()) {
      setMessage('Enter a valid date...')
      return false
    } else {
      return true
    }
  }

  const getFormattedDate = date => {
    const d = new Date(date)
    let month = '' + (d.getMonth() + 1)
    let day = '' + d.getDate()
    let year = d.getFullYear()
    if (month.length < 2) {
      month = '0' + month
    }
    if (day.length < 2) {
      day = '0' + day
    }
    return [year, month, day].join('-')
  }

  const submitHandler = e => {
    e.preventDefault()

    if (isFormValid()) {
      setMessage(null)
      const date = getFormattedDate(initialDate)
      console.log(val)
      const movie = currentMovies.filter(
        mov => mov.refId.toString() === val.toString()
      )[0]
      console.log(movie)
      dispatch(createShow(movie, date, ticketCount, ticketPrice))
      setSuccess(true)
    }
  }

  return (
    <FormContainer>
      <h3>Scehedule a new show</h3>
      {error && <Message>{error}</Message>}
      {message && <Message>{message}</Message>}
      {success && (
        <Message variant="success">Successfully scheduled show</Message>
      )}
      {createError && <Message>{createError}</Message>}
      {loading && <Loader />}
      {val === 'No Movies Currently screening...' ? (
        <Message variant="info">{val}</Message>
      ) : (
        <Form onSubmit={submitHandler}>
          <Form.Group>
            <Form.Label>Select movie from the list</Form.Label>
            <Form.Control
              as="select"
              value={val}
              onChange={e => setVal(e.target.value)}
            >
              {currentMovies &&
                currentMovies.map(movie => (
                  <option key={movie._id} value={movie.refId.toString()}>
                    {movie.name}
                  </option>
                ))}
            </Form.Control>
          </Form.Group>
          <Form.Group>
            <Form.Label>Select the date for the show</Form.Label>
            <br />
            <DatePicker
              selected={initialDate}
              onChange={date => setInitialDate(date)}
            />
          </Form.Group>
          <Form.Group>
            <Form.Label>Enter total ticket count</Form.Label>
            <Form.Control
              type="number"
              value={ticketCount}
              onChange={e => setTicketCount(e.target.valueAsNumber)}
              placeholder="Ticket Count"
            ></Form.Control>
          </Form.Group>
          <Form.Group>
            <Form.Label>Enter cost of a single ticket</Form.Label>
            <Form.Control
              type="number"
              value={ticketPrice}
              onChange={e => setTicketPrice(e.target.valueAsNumber)}
              placeholder="Ticket Price"
            ></Form.Control>
          </Form.Group>
          <Button type="submit" variant="primary">
            Schedule show
          </Button>
        </Form>
      )}
    </FormContainer>
  )
}

export default ShowAddPage
