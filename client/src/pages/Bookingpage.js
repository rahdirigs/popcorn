import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Button, Card, Col, Form, ListGroup, Row } from 'react-bootstrap'
import { listShowDetails } from '../actions/showActions'
import { listRefreshments } from '../actions/refreshmentActions'
import { listCurrentEmployees } from '../actions/employeeActions'
import { bookTicket } from '../actions/bookingActions'
import FormContainer from '../components/FormContainer'
import Loader from '../components/Loader'
import Message from '../components/Message'

const Bookingpage = ({ match, history }) => {
  const [ref] = useState([])
  const [refQty] = useState([])
  const [tickets, setTickets] = useState(0)
  const [success, setSuccess] = useState(false)

  const dispatch = useDispatch()

  const userLogin = useSelector(state => state.userLogin)
  const { userInfo } = userLogin

  const showDetails = useSelector(state => state.showDetails)
  const { loading, error, show } = showDetails

  const refreshmentList = useSelector(state => state.refreshmentList)
  const { loading: refLoader, refreshments } = refreshmentList

  const employeeCurrentList = useSelector(state => state.employeeCurrentList)
  const { currentEmployees } = employeeCurrentList

  const ticketBook = useSelector(state => state.ticketBook)
  const { loading: bookLoading, error: bookError, ticket } = ticketBook

  useEffect(() => {
    if (!userInfo) {
      history.push(`/login?redirect=show/${match.params.id}`)
    } else {
      dispatch(listRefreshments())
      dispatch(listShowDetails(match.params.id))
      dispatch(listCurrentEmployees())
    }
  }, [history, userInfo, match, dispatch])

  const bookTicketHandler = () => {
    //console.log(ref)
    let seatCount = parseInt(tickets)
    let totalTicketPrice = show.ticketPrice * seatCount
    let refreshmentCost = 0
    for (let i = 0; i < ref.length; i++) {
      refreshmentCost += ref[i].item.price * ref[i].qty
    }
    let employee =
      ref.length > 0
        ? currentEmployees[Math.floor(Math.random() * currentEmployees.length)]
        : null

    //console.log(totalTicketPrice, refreshmentCost, employee)
    dispatch(
      bookTicket(seatCount, totalTicketPrice, ref, refreshmentCost, employee)
    )
    setSuccess(true)
  }

  return (
    <>
      <h3>Book Tickets</h3>
      {loading ? (
        <Loader />
      ) : error ? (
        <Message>{error}</Message>
      ) : (
        show && (
          <Row>
            <Col md={4} className="m-3">
              {show.movie && (
                <Card className="p-3">
                  <Card.Img src={show.movie.image} height="400" width="300" />
                  <Card.Title as="h3">{show.movie.name}</Card.Title>
                  <Card.Body>
                    <Card.Text as="span">
                      <strong>Date: </strong>
                      {show.date}
                    </Card.Text>
                    <br />
                    <Card.Text as="span">
                      <strong>Tickets left: </strong>
                      {show.ticketCount - show.ticketSold}
                    </Card.Text>
                    <br />
                    <Card.Text as="span">
                      <strong>Ticket price: </strong>
                      {show.ticketPrice}
                    </Card.Text>
                    <br />
                  </Card.Body>
                </Card>
              )}
            </Col>
            <Col md={6} className="mx-3">
              {loading ? (
                <Loader />
              ) : (
                <FormContainer>
                  <Form>
                    <Form.Group controlId="tickets">
                      <Form.Label>Select the number of seats</Form.Label>
                      <Form.Control
                        as="select"
                        value={tickets}
                        onChange={e => setTickets(e.target.value)}
                      >
                        {show.ticketLeft &&
                          [...Array(show.ticketLeft).keys()].map(x => (
                            <option key={x + 1} value={x + 1}>
                              {x + 1}
                            </option>
                          ))}
                      </Form.Control>
                    </Form.Group>
                  </Form>
                </FormContainer>
              )}
              <ListGroup>
                <ListGroup.Item>
                  <Row>
                    <Col>
                      <strong>Item</strong>
                    </Col>
                    <Col>
                      <strong>Price</strong>
                    </Col>
                    <Col>
                      <strong>Qty</strong>
                    </Col>
                  </Row>
                </ListGroup.Item>
                {refLoader ? (
                  <Loader />
                ) : (
                  refreshments &&
                  refreshments.map(refreshment => (
                    <ListGroup.Item key={refreshment._id}>
                      <Row>
                        <Col>{refreshment.name}</Col>
                        <Col>{refreshment.price}</Col>
                        <Col>
                          <Form.Control
                            as="select"
                            value={refQty[refreshment.name]}
                            onChange={e => {
                              refQty[refreshment.name] = parseInt(
                                e.target.value
                              )
                              let found = false
                              for (let i = 0; i < ref.length; i++) {
                                if (ref[i].item === refreshment) {
                                  ref[i].qty = refQty[refreshment.name]
                                  found = true
                                  if (ref[i].qty === 0) {
                                    ref.splice(i, 1)
                                  }
                                  break
                                }
                              }
                              if (!found) {
                                ref.push({
                                  item: refreshment,
                                  qty: refQty[refreshment.name],
                                })
                              }
                            }}
                          >
                            <option key={0} value={0}>
                              0
                            </option>
                            {refreshment &&
                              [...Array(refreshment.countInStock).keys()].map(
                                x => (
                                  <option key={x + 1} value={x + 1}>
                                    {x + 1}
                                  </option>
                                )
                              )}
                          </Form.Control>
                        </Col>
                      </Row>
                    </ListGroup.Item>
                  ))
                )}
              </ListGroup>
              <Button
                variant="primary"
                className="my-3"
                onClick={() => bookTicketHandler()}
              >
                Book now
              </Button>
              {bookLoading ? (
                <Loader />
              ) : bookError ? (
                <Message>{bookError}</Message>
              ) : (
                success && (
                  <Message variant="success">
                    <span>
                      <strong>Seats: </strong>
                      {ticket.seatCount}
                    </span>
                    <br />
                    <span>
                      <strong>Ticket Amount: </strong>
                      {ticket.totalTicketPrice}
                    </span>
                    <br />
                    <span>
                      <strong>Refreshment Cost: </strong>
                      {ticket.refreshmentCost}
                    </span>
                    <br />
                    {ticket.employee && (
                      <>
                        <span>
                          Our employee {ticket.employee.firstName} will be
                          tending to you...
                        </span>
                        <br />
                      </>
                    )}
                    <span>
                      <strong>Grand Total: </strong>
                      {ticket.refreshmentCost + ticket.totalTicketPrice}
                    </span>
                  </Message>
                )
              )}
            </Col>
          </Row>
        )
      )}
    </>
  )
}

export default Bookingpage
