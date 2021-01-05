import React, { useEffect } from 'react'
import { Button, Table } from 'react-bootstrap'
import { LinkContainer } from 'react-router-bootstrap'
import { useDispatch, useSelector } from 'react-redux'
import { listCurrentMovies, movieStopScreening } from '../actions/movieActions'
import Loader from '../components/Loader'
import Message from '../components/Message'

const CurrentMoviesPane = () => {
  const dispatch = useDispatch()

  const movieCurrentList = useSelector(state => state.movieCurrentList)
  const { loading, error, currentMovies } = movieCurrentList

  const movieStopScreen = useSelector(state => state.movieStopScreen)
  const { success } = movieStopScreen

  const movieStartScreen = useSelector(state => state.movieStartScreen)
  const { success: startSuccess } = movieStartScreen

  useEffect(() => {
    dispatch(listCurrentMovies())
  }, [dispatch, success, startSuccess])

  const screeningStop = id => {
    dispatch(movieStopScreening(id))
  }

  return loading ? (
    <Loader />
  ) : error ? (
    <Message>{error}</Message>
  ) : currentMovies.length === 0 ? (
    <Message variant="info">No movies screening currently</Message>
  ) : (
    <Table striped bordered responsive hover className="table-md my-3">
      <thead>
        <tr>
          <td>ID</td>
          <td>Name</td>
          <td>Year</td>
          <td>Past Shows</td>
          <td>Future Shows</td>
          <td>Spent</td>
          <td>Earnings</td>
          <td></td>
          <td></td>
        </tr>
      </thead>
      <tbody>
        {currentMovies.length > 0 ? (
          currentMovies.map(movie => (
            <tr key={movie.id}>
              <td>{movie.id}</td>
              <td>{movie.name}</td>
              <td>{movie.year}</td>
              <td>{movie.showsScreened}</td>
              <td>{movie.showsScheduled}</td>
              <td>{movie.spent}</td>
              <td>{movie.earned}</td>
              <td>
                <LinkContainer to={`/edit/movies/${movie.id}`}>
                  <i className="fas fa-edit"></i>
                </LinkContainer>
              </td>
              <td>
                <Button
                  variant="danger"
                  onClick={() => screeningStop(movie.id)}
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

export default CurrentMoviesPane
