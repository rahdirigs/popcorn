import React, { useEffect } from 'react'
import { Col, Row } from 'react-bootstrap'
import Movie from '../components/Movie'
import { listMovies } from '../actions/movieActions'
import { listDoneShows } from '../actions/showActions'
import { useDispatch, useSelector } from 'react-redux'
import Loader from '../components/Loader'
import Message from '../components/Message'

const Homepage = () => {
  const dispatch = useDispatch()

  const movieList = useSelector(state => state.movieList)
  const { loading, error, movies } = movieList

  useEffect(() => {
    dispatch(listMovies())
    dispatch(listDoneShows())
  }, [dispatch])

  return (
    <>
      <h1>Our recommendation</h1>
      {loading ? (
        <Loader />
      ) : error ? (
        <Message>{error}</Message>
      ) : (
        <Row>
          {movies.map(movie => (
            <Col key={movie.refId} sm={12} md={6} lg={4} xl={3}>
              <Movie movie={movie} />
            </Col>
          ))}
        </Row>
      )}
    </>
  )
}

export default Homepage
