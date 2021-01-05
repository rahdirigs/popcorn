import React, { useEffect, useState } from 'react'
import { Button, Card, Col, Form, Row } from 'react-bootstrap'
import { useDispatch, useSelector } from 'react-redux'
import { listMovieDetails, updateMovie } from '../actions/movieActions'
import FormContainer from '../components/FormContainer'
import Loader from '../components/Loader'
import Message from '../components/Message'
import Rating from '../components/Rating'

const MovieEditPage = ({ match }) => {
  const [costs, setCosts] = useState(0)
  const [message, setMessage] = useState(null)
  const dispatch = useDispatch()

  const movieDetails = useSelector(state => state.movieDetails)
  const { loading, error, movie } = movieDetails

  const movieUpdate = useSelector(state => state.movieUpdate)
  const { loading: updateLoading, error: updateError, success } = movieUpdate

  useEffect(() => {
    if (!movie.name) {
      dispatch(listMovieDetails(match.params.id))
    }
  }, [dispatch, match, movie, success])

  const isFormValid = () => {
    if (costs <= 0) {
      setMessage('Enter a valid cost incurred')
      return false
    }
    return true
  }

  const submitHandler = e => {
    e.preventDefault()

    if (isFormValid()) {
      setMessage(null)
      dispatch(updateMovie(costs))
    }
  }

  return (
    <>
      <Row>
        <Col md={6}>
          {loading ? (
            <Loader />
          ) : error ? (
            <Message>Error loading details</Message>
          ) : (
            movie && (
              <Card className="m-3 p-3">
                <Card.Img
                  variant="top"
                  src={movie.image}
                  width="400"
                  height="600"
                  thumbnail
                />
                <Card.Title as="h3">
                  <strong>{movie.name}</strong>
                </Card.Title>
                <Card.Body>
                  <Card.Text as="div">
                    <strong>Director: </strong>
                    {movie.director}
                  </Card.Text>
                  <Card.Text as="div">
                    <strong>Writers: </strong>
                    {movie.writer && movie.writer[0]}
                    {movie.writer &&
                      movie.writer.map(
                        (w, i) => i >= 1 && <span key={i}>, {w}</span>
                      )}
                  </Card.Text>
                  <Card.Text as="div">
                    <strong>Cast: </strong>
                    {movie.cast && movie.cast[0]}
                    {movie.cast &&
                      movie.cast.map(
                        (c, i) => i >= 1 && <span key={i}>, {c}</span>
                      )}
                  </Card.Text>
                  <Card.Text as="div">
                    <strong>Runtime: </strong>
                    {movie.runtime}
                  </Card.Text>
                  <Card.Text as="div">
                    <strong>Release Date: </strong>
                    {movie.released}
                  </Card.Text>
                  <Rating
                    value={movie.ratings}
                    text={` from ${movie.numReviews} reviews`}
                  />
                </Card.Body>
              </Card>
            )
          )}
        </Col>
        <Col md={6}>
          <FormContainer>
            {updateLoading && <Loader />}
            {updateError && <Message>{updateError}</Message>}
            {message && <Message>{message}</Message>}
            {success && (
              <Message variant="success">Successfully updated</Message>
            )}
            <h3>Update running costs</h3>
            <Form onSubmit={submitHandler}>
              <Form.Group controlId="costs">
                <Form.Label>Enter additional costs</Form.Label>
                <Form.Control
                  type="number"
                  value={costs}
                  placeholder="Enter additional expenses"
                  onChange={e => setCosts(e.target.value)}
                ></Form.Control>
              </Form.Group>
              <Button variant="primary" type="submit" className="my-3">
                Update Costs
              </Button>
            </Form>
          </FormContainer>
        </Col>
      </Row>
    </>
  )
}

export default MovieEditPage
