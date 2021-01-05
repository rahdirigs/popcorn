import React, { useEffect } from 'react'
import { Table } from 'react-bootstrap'
import { useDispatch, useSelector } from 'react-redux'
import { listAllMovies } from '../actions/movieActions'
import Loader from '../components/Loader'
import Message from '../components/Message'

const AllMoviesPane = () => {
  const dispatch = useDispatch()

  const movieList = useSelector(state => state.movieList)
  const { loading, error, movies } = movieList

  useEffect(() => {
    dispatch(listAllMovies())
  }, [dispatch])

  return loading ? (
    <Loader />
  ) : error ? (
    <Message>{error}</Message>
  ) : movies.length === 0 ? (
    <Message variant="info">No movies in the database</Message>
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
        </tr>
      </thead>
      <tbody>
        {movies.length > 0 ? (
          movies.map(movie => (
            <tr key={movie.id}>
              <td>{movie.id}</td>
              <td>{movie.name}</td>
              <td>{movie.year}</td>
              <td>{movie.showsScreened}</td>
              <td>{movie.showsScheduled}</td>
              <td>{movie.spent}</td>
              <td>{movie.earned}</td>
            </tr>
          ))
        ) : (
          <></>
        )}
      </tbody>
    </Table>
  )
}

export default AllMoviesPane
