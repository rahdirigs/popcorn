import React, { useEffect, useState } from 'react'
import axios from 'axios'
import { Link } from 'react-router-dom'
import { LinkContainer } from 'react-router-bootstrap'
import { Button, Card, Col, Image, ListGroup, Row } from 'react-bootstrap'
import Rating from '../components/Rating'

const Moviepage = ({ match }) => {
  const [movie, setMovie] = useState({})

  useEffect(() => {
    const fetchMovie = async () => {
      const { data } = await axios.get(`/api/movies/${match.params.id}`)
      setMovie(data)
    }

    fetchMovie()
  }, [match])

  return (
    <>
      <Link className="btn btn-primary my-3" to="/">
        Go Back
      </Link>
      {movie && (
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
                  movie.cast.map((actor, i) => (
                    <>
                      <>{actor}</> {i !== movie.cast.length - 1 && <>, </>}
                    </>
                  ))}
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
                  <LinkContainer to={`/movie/${movie.refId}/shows`}>
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
      )}
    </>
  )
}

export default Moviepage
