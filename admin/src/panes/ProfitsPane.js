import React, { useEffect } from 'react'
import { Row, Table } from 'react-bootstrap'
import { useDispatch, useSelector } from 'react-redux'
import Loader from '../components/Loader'
import Message from '../components/Message'
import { listAllMovies } from '../actions/movieActions'

const ProfitsPane = () => {
  const movieList = useSelector(state => state.movieList)
  const { loading, error, movies } = movieList

  const dispatch = useDispatch()

  useEffect(() => {
    dispatch(listAllMovies())
  }, [dispatch])

  return (
    <>
      <Row className="m-3">
        <h2>Profits</h2>
        {loading ? (
          <Loader />
        ) : error ? (
          <Message>{error}</Message>
        ) : (
          movies && (
            <Table striped hover responsive bordered className="my-3 table-sm">
              <thead>
                <tr>
                  <th>Movie</th>
                  <th>Spent</th>
                  <th>Revenue</th>
                  <th>Projected</th>
                  <th>Past Shows</th>
                  <th>Future Shows</th>
                </tr>
              </thead>
              <tbody>
                {movies.map(movie => (
                  <tr key={movie.id}>
                    <td>{movie.name}</td>
                    <td>{movie.spent}</td>
                    <td>{movie.earned}</td>
                    <td>{movie.projected}</td>
                    <td>{movie.showsScreened}</td>
                    <td>{movie.showsScheduled}</td>
                  </tr>
                ))}
              </tbody>
            </Table>
          )
        )}
      </Row>
    </>
  )
}

export default ProfitsPane
