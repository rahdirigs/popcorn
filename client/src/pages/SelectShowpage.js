import React, { useEffect } from 'react'
import { Button, Col, Container, Row, Table } from 'react-bootstrap'
import { LinkContainer } from 'react-router-bootstrap'
import { useDispatch, useSelector } from 'react-redux'
import { Link } from 'react-router-dom'
import { listFutureShows } from '../actions/showActions'
import Loader from '../components/Loader'
import Message from '../components/Message'

const SelectShowPage = ({ match, history }) => {
  const userLogin = useSelector(state => state.userLogin)
  const { userInfo } = userLogin

  const showFutureList = useSelector(state => state.showFutureList)
  const { loading, error, futureShows } = showFutureList

  const dispatch = useDispatch()

  useEffect(() => {
    if (!userInfo) {
      history.push(`/login?redirect=movie/${match.params.id}/shows`)
    } else {
      dispatch(listFutureShows())
    }
  }, [history, userInfo, match, dispatch])

  return (
    <Container>
      <Row>
        <Link to={`/movie/${match.params.id}`} className="btn btn-primary my-3">
          Go Back
        </Link>
      </Row>
      <Row>
        <Col className="text-center py-3">
          <h2>Select your show here</h2>
          <Table bordered hover responsive striped className="my-3">
            <thead>
              <tr>
                <th>Date</th>
                <th>Total tickets</th>
                <th>Tickets Left</th>
                <th>Ticket price</th>
                <th>Book now</th>
              </tr>
            </thead>
            {loading ? (
              <Loader />
            ) : error ? (
              <Message>{error}</Message>
            ) : (
              <tbody>
                {futureShows &&
                  futureShows
                    .filter(
                      show => show.movie.refId.toString() === match.params.id
                    )
                    .map(show => (
                      <tr key={show._id}>
                        <td>{show.date}</td>
                        <td>{show.ticketCount}</td>
                        <td>{show.ticketCount - show.ticketSold}</td>
                        <td>{show.ticketPrice}</td>
                        <td>
                          <LinkContainer to={`/show/${show._id}`}>
                            <Button
                              className="btn-sm"
                              variant="primary"
                              disabled={show.ticketCount === show.ticketSold}
                            >
                              SELECT
                            </Button>
                          </LinkContainer>
                        </td>
                      </tr>
                    ))}
              </tbody>
            )}
          </Table>
        </Col>
      </Row>
    </Container>
  )
}

export default SelectShowPage
