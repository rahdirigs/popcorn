import React, { useEffect } from 'react'
import { Button, Table } from 'react-bootstrap'
import { useDispatch, useSelector } from 'react-redux'
import { listPastMovies, movieStartScreening } from '../actions/movieActions'
import Loader from '../components/Loader'
import Message from '../components/Message'

const PastMoviesPane = () => {
  const dispatch = useDispatch()

  const moviePastList = useSelector(state => state.moviePastList)
  const { loading, error, pastMovies } = moviePastList

  const movieStartScreen = useSelector(state => state.movieStartScreen)
  const { success } = movieStartScreen

  const movieStopScreen = useSelector(state => state.movieStopScreen)
  const { success: stopSuccess } = movieStopScreen

  useEffect(() => {
    dispatch(listPastMovies())
  }, [dispatch, success, stopSuccess])

  const screeningStart = id => {
    dispatch(movieStartScreening(id))
  }

  return loading ? (
    <Loader />
  ) : error ? (
    <Message>{error}</Message>
  ) : pastMovies.length === 0 ? (
    <Message variant="info">No movies that are not being screened</Message>
  ) : (
    <Table striped bordered responsive hover className="table-md my-3">
      <thead>
        <tr>
          <td>ID</td>
          <td>Name</td>
          <td>Year</td>
          <td>Past Shows</td>
          <td>Spent</td>
          <td>Earnings</td>
          <td></td>
        </tr>
      </thead>
      <tbody>
        {pastMovies.length > 0 ? (
          pastMovies.map(movie => (
            <tr key={movie.id}>
              <td>{movie.id}</td>
              <td>{movie.name}</td>
              <td>{movie.year}</td>
              <td>{movie.showsScreened}</td>
              <td>{movie.spent}</td>
              <td>{movie.earned}</td>
              <td>
                <Button
                  variant="success"
                  onClick={() => screeningStart(movie.id)}
                  className="btn-sm"
                >
                  <i className="fas fa-tv"></i>
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

export default PastMoviesPane
