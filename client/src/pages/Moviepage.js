import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import { LinkContainer } from 'react-router-bootstrap'
import { Button, Card, Col, Form, Image, ListGroup, Row } from 'react-bootstrap'
import Rating from '../components/Rating'
import { createMovieReview, listMovieDetails } from '../actions/movieActions'
import { useDispatch, useSelector } from 'react-redux'
import Loader from '../components/Loader'
import Message from '../components/Message'
import {} from '../actions/movieActions'
import { MOVIE_CREATE_REVIEW_RESET } from '../constants/movieConstants'
import Sentiment from 'sentiment'
import { getWatchList } from '../actions/userActions'

const Moviepage = ({ match }) => {
  const [comment, setComment] = useState('')
  const [message, setMessage] = useState(null)
  const dispatch = useDispatch()

  const movieDetails = useSelector(state => state.movieDetails)
  const { loading, error, movie } = movieDetails

  const userLogin = useSelector(state => state.userLogin)
  const { userInfo } = userLogin

  const userWatchedMovies = useSelector(state => state.userWatchedMovies)
  const { loading: loadingWatched, watched } = userWatchedMovies

  const movieCreateReview = useSelector(state => state.movieCreateReview)
  const { success } = movieCreateReview

  useEffect(() => {
    dispatch(listMovieDetails(match.params.id))
    dispatch({ type: MOVIE_CREATE_REVIEW_RESET })
    if (userInfo) {
      dispatch(getWatchList())
    }
  }, [match, dispatch, success, userInfo])

  const isFormEmpty = () => {
    if (comment.length === 0) {
      setMessage('Comment cannot be empty')
      return true
    }
    return false
  }

  const submitReview = e => {
    e.preventDefault()

    if (!isFormEmpty()) {
      setMessage(null)
      const sentiment = new Sentiment()
      const { comparative } = sentiment.analyze(comment)
      const rating = ((comparative + 5) / 10) * 5
      dispatch(createMovieReview(match.params.id, rating, comment))
    }
  }

  return (
    <>
      <Link className="btn btn-primary my-3" to="/">
        Go Back
      </Link>
      {loading ? (
        <Loader />
      ) : error ? (
        <Message>{error}</Message>
      ) : (
        <>
          <Row>
            <Col md={4}>
              <Image src={movie.image} alt={movie.name} fluid />
            </Col>
            <Col md={5}>
              <ListGroup variant="flush">
                <ListGroup.Item>
                  <h2>{movie.name}</h2>
                </ListGroup.Item>
                <ListGroup.Item>
                  <strong>Description: </strong>
                  <br />
                  {movie.desc}
                </ListGroup.Item>
                <ListGroup.Item>
                  <strong>Cast: </strong>
                  <br />
                  {movie.cast &&
                    movie.cast.map((actor, i) =>
                      i > 0 ? (
                        <span key={i}>, {actor}</span>
                      ) : (
                        <span key={i}>{actor}</span>
                      )
                    )}
                </ListGroup.Item>
                <ListGroup.Item>
                  <strong>Director: </strong>
                  {movie.director}
                </ListGroup.Item>
                <ListGroup.Item>
                  <strong>Released On: </strong>
                  {movie.released}
                </ListGroup.Item>
                <ListGroup.Item>
                  <Rating
                    value={movie.ratings}
                    text={` from ${movie.numReviews} reviews`}
                  />
                </ListGroup.Item>
              </ListGroup>
            </Col>
            <Col md={3}>
              <Card>
                <ListGroup variant="flush">
                  <ListGroup.Item>
                    <Row>
                      <Col>
                        <strong>Shows</strong>
                      </Col>
                      <Col>{movie.showCount || 0}</Col>
                    </Row>
                  </ListGroup.Item>
                  <ListGroup.Item>
                    <LinkContainer
                      to={
                        userInfo
                          ? `/movie/${movie.refId}/shows`
                          : `/login?redirect=movie/${movie.refId}/shows`
                      }
                    >
                      <Button
                        className="btn-block"
                        variant="primary"
                        type="button"
                        disabled={movie.showCount === 0}
                      >
                        Book Now
                      </Button>
                    </LinkContainer>
                  </ListGroup.Item>
                </ListGroup>
              </Card>
            </Col>
          </Row>
          <Row className="my-3">
            <Col md={6}>
              <h2>Reviews</h2>
              {movie.reviews.length === 0 ? (
                <Message variant="info">No reviews yet</Message>
              ) : (
                <ListGroup variant="flush">
                  {movie.reviews.map(review => (
                    <ListGroup.Item key={review._id}>
                      <strong>{review.name}</strong>
                      <Rating value={review.rating} />
                      <p>{review.comment}</p>
                    </ListGroup.Item>
                  ))}
                </ListGroup>
              )}
            </Col>
            {loadingWatched ? (
              <Loader />
            ) : loading ? (
              <Loader />
            ) : (
              movie &&
              watched.includes(String(movie._id)) && (
                <Col md={6}>
                  <h2>Write a review</h2>
                  <Form onSubmit={submitReview} className="my-2">
                    <Form.Group controlId="comment">
                      <Form.Control
                        as="textarea"
                        value={comment}
                        onChange={e => setComment(e.target.value)}
                        rows={5}
                        placeholder="Write your review"
                      ></Form.Control>
                    </Form.Group>
                    <Button variant="primary" className="my-3" type="submit">
                      Submit Review
                    </Button>
                  </Form>
                  {message && <Message>{message}</Message>}
                </Col>
              )
            )}
          </Row>
        </>
      )}
    </>
  )
}

export default Moviepage
