import React from 'react'
import { Card } from 'react-bootstrap'
import { Link } from 'react-router-dom'
import Rating from './Rating'

const Movie = ({ movie }) => {
  return (
    <Card className="my-3 p-3">
      <Link to={`/movie/${movie.refId}`}>
        <Card.Img src={movie.image} variant="top" />
      </Link>
      <Card.Body>
        <Link to={`/movie/${movie.refId}`}>
          <Card.Title as="div">
            <strong>{movie.name}</strong>
          </Card.Title>
        </Link>
        <Card.Text as="div">
          <Rating
            value={movie.ratings}
            text={`from ${movie.numReviews} reviews`}
          />
        </Card.Text>
        <Card.Text as="div">
          <strong>Year: </strong>
          {movie.year}
        </Card.Text>
      </Card.Body>
    </Card>
  )
}

export default Movie
