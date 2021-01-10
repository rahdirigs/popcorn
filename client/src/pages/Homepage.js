import React, { useEffect } from 'react'
import { Col, Row } from 'react-bootstrap'
import Movie from '../components/Movie'
import { listMovies, listTopMovies } from '../actions/movieActions'
import { getRecommendation } from '../actions/userActions'
import { useDispatch, useSelector } from 'react-redux'
import Loader from '../components/Loader'
import Message from '../components/Message'
import Recommendation from '../components/Recommendation'

const Homepage = () => {
  const dispatch = useDispatch()

  const movieList = useSelector(state => state.movieList)
  const { loading, error, movies } = movieList

  const userLogin = useSelector(state => state.userLogin)
  const { userInfo } = userLogin

  const userRecommended = useSelector(state => state.userRecommended)
  const { loading: loadingRec, recommended } = userRecommended

  const movieRecommended = useSelector(state => state.movieRecommended)
  const { recommended: recommendedMovie } = movieRecommended

  useEffect(() => {
    dispatch(listMovies())

    if (userInfo) {
      dispatch(getRecommendation())
    } else {
      dispatch(listTopMovies())
    }
  }, [dispatch, userInfo])

  return (
    <>
      {loading ? (
        <Loader />
      ) : loadingRec ? (
        <Loader />
      ) : error ? (
        <Message>{error}</Message>
      ) : (
        recommended && (
          <>
            {userInfo ? (
              <Recommendation movies={recommended} />
            ) : (
              <Recommendation movies={recommendedMovie} />
            )}
            <Row>
              {movies.map(movie => (
                <Col key={movie.refId} sm={12} md={6} lg={4} xl={3}>
                  <Movie movie={movie} />
                </Col>
              ))}
            </Row>
          </>
        )
      )}
    </>
  )
}

export default Homepage
