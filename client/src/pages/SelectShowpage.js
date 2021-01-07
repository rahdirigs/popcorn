import React from 'react'
import { Col, Container, Row, Table } from 'react-bootstrap'

const SelectShowPage = ({ match }) => {
  return (
    <Container>
      <Row>
        <Col className="text-center py-3">
          <h2>Select your show here</h2>
          <Table bordered hover responsive striped className="my-3">
            <thead></thead>
          </Table>
        </Col>
      </Row>
    </Container>
  )
}

export default SelectShowPage
