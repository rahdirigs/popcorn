import React, { useEffect, useState } from 'react'
import FormContainer from '../components/FormContainer'
import Message from '../components/Message'
import Loader from '../components/Loader'
import { Button, Card, Col, Form, Row } from 'react-bootstrap'
import { useDispatch, useSelector } from 'react-redux'
import { listShowDetails, updateShow } from '../actions/showActions'

const RefreshmentEditPage = ({ match }) => {
  const [price, setPrice] = useState(0)
  const [oldTickets, setOldTickets] = useState(0)
  const [newTickets, setNewTickets] = useState(0)
  const [message, setMessage] = useState(null)

  const dispatch = useDispatch()
  const showDetails = useSelector(state => state.showDetails)

  const { loading, error, show } = showDetails

  const showUpdate = useSelector(state => state.showUpdate)
  const { success } = showUpdate

  useEffect(() => {
    if (!show.movie) {
      dispatch(listShowDetails(match.params.id))
    } else {
      setOldTickets(show.ticketCount)
      setPrice(show.ticketPrice)
    }
  }, [match, dispatch, show, success])

  const isFormValid = () => {
    if (price === 0) {
      setMessage('Enter a valid price')
      return false
    } else {
      return true
    }
  }

  const submitHandler = () => {
    const tickets = parseInt(newTickets, 10) + parseInt(oldTickets, 10)
    if (isFormValid()) {
      setMessage(null)
      dispatch(updateShow(tickets, price))
    }
  }

  return (
    <>
      {loading ? (
        <Loader />
      ) : (
        <>
          {error && <Message>{error}</Message>}
          <Row>
            <Col md={6}>
              {show.movie && (
                <Card className="my-3 p-3">
                  <Card.Img
                    variant="top"
                    src={show.movie.image}
                    width="400"
                    height="600"
                  />
                  <Card.Title as="h3">{show.movie.name}</Card.Title>
                  <Card.Body>
                    <Card.Text as="div">
                      <strong>Total tickets: </strong>
                      {oldTickets}
                    </Card.Text>
                    <Card.Text as="div">
                      <strong>Tickets Sold: </strong>
                      {show.ticketSold}
                    </Card.Text>
                    <Card.Text>
                      <strong>Price: </strong>
                      {show.ticketPrice}
                    </Card.Text>
                  </Card.Body>
                </Card>
              )}
            </Col>
            <Col md={6}>
              {message && <Message>{message}</Message>}
              <FormContainer>
                {success && (
                  <Message variant="success">Successfully updated</Message>
                )}
                <Form onSubmit={submitHandler}>
                  <Form.Group>
                    <Form.Label>New Ticket Price</Form.Label>
                    <Form.Control
                      type="number"
                      placeholder="Enter the new ticket price"
                      value={price}
                      onChange={e => setPrice(e.target.value)}
                    ></Form.Control>
                  </Form.Group>
                  <Form.Group>
                    <Form.Label>Additional tickets</Form.Label>
                    <Form.Control
                      type="number"
                      placeholder="Enter the additional qty. of tickets"
                      value={newTickets}
                      onChange={e => setNewTickets(e.target.value)}
                    ></Form.Control>
                  </Form.Group>
                  <Button type="submit" variant="primary" className="my-3">
                    Update Show
                  </Button>
                </Form>
              </FormContainer>
            </Col>
          </Row>
        </>
      )}
    </>
  )
}

export default RefreshmentEditPage
