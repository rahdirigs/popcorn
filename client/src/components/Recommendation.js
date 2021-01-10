import React from 'react'
import { Carousel, Image } from 'react-bootstrap'
import { Link } from 'react-router-dom'

const Recommendation = ({ movies }) => {
  return (
    <Carousel pause="hover" className="bg-primary">
      {movies.map(movie => (
        <Carousel.Item key={movie.refId}>
          <Link to={`/movie/${movie.refId}`}>
            <Image src={movie.image} width="200" height="300" fluid />
            <Carousel.Caption>
              <h3>{movie.name}</h3>
            </Carousel.Caption>
          </Link>
        </Carousel.Item>
      ))}
    </Carousel>
  )
}

export default Recommendation
