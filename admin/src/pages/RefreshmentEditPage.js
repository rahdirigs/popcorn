import React, { useEffect, useState } from 'react'
import FormContainer from '../components/FormContainer'
import Message from '../components/Message'
import Loader from '../components/Loader'
import { Button, Card, Col, Form, Row } from 'react-bootstrap'
import { useDispatch, useSelector } from 'react-redux'
import {
  listRefreshmentDetails,
  updateRefreshment,
} from '../actions/refreshmentActions'

const RefreshmentEditPage = ({ match }) => {
  const [price, setPrice] = useState(0)
  const [oldStock, setOldStock] = useState(0)
  const [newStock, setNewStock] = useState(0)
  const [message, setMessage] = useState(null)

  const dispatch = useDispatch()
  const refreshmentDetails = useSelector(state => state.refreshmentDetails)

  const { loading, error, refreshment } = refreshmentDetails

  const refreshmentUpdate = useSelector(state => state.refreshmentUpdate)
  const { success } = refreshmentUpdate

  useEffect(() => {
    if (!refreshment.image) {
      dispatch(listRefreshmentDetails(match.params.id))
    } else {
      setOldStock(refreshment.countInStock)
      setPrice(refreshment.price)
      console.log(refreshment)
    }
  }, [match, dispatch, refreshment, success])

  const isFormValid = () => {
    if (price === 0) {
      setMessage('Enter a valid price')
      return false
    } else {
      return true
    }
  }

  const submitHandler = () => {
    const countInStock = parseInt(newStock, 10) + parseInt(oldStock, 10)
    if (isFormValid()) {
      setMessage(null)
      dispatch(updateRefreshment(price, countInStock))
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
              {refreshment && (
                <Card className="my-3 p-3">
                  <Card.Img
                    variant="top"
                    src={refreshment.image}
                    width="500"
                    height="500"
                  />
                  <Card.Title>{refreshment.name}</Card.Title>
                  <Card.Body>
                    <Card.Text>
                      <strong>Count in Stock: </strong>
                      {oldStock}
                    </Card.Text>
                    <Card.Text>
                      <strong>Price: </strong>
                      {refreshment.price}
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
                    <Form.Label>New Price</Form.Label>
                    <Form.Control
                      type="number"
                      placeholder="Enter the new price"
                      value={price}
                      onChange={e => setPrice(e.target.value)}
                    ></Form.Control>
                  </Form.Group>
                  <Form.Group>
                    <Form.Label>New Stocks</Form.Label>
                    <Form.Control
                      type="number"
                      placeholder="Enter the new pieces added to stock"
                      value={newStock}
                      onChange={e => setNewStock(e.target.value)}
                    ></Form.Control>
                  </Form.Group>
                  <Button type="submit" variant="primary" className="my-3">
                    Update Item
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
