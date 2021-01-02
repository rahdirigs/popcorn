import React, { useEffect, useState } from 'react'
import axios from 'axios'
import { Col, Row } from 'react-bootstrap'
import Movie from '../components/Movie'

const Homepage = () => {
  const [movies, setMovies] = useState([])

  useEffect(() => {
    const fetchMovies = async () => {
      const { data } = await axios.get('/api/movies')
      setMovies(data)
    }
    fetchMovies()
  }, [])

  return (
    <>
      <h1>Our recommendation</h1>
      <Row>
        {movies.map(movie => (
          <Col key={movie.refId} sm={12} md={6} lg={4} xl={3}>
            <Movie movie={movie} />
          </Col>
        ))}
      </Row>
    </>
  )
}

export default Homepage
