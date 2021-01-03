import React, { useEffect, useState } from 'react'
import { Button, Row, Table } from 'react-bootstrap'
import { LinkContainer } from 'react-router-bootstrap'
import axios from 'axios'

const Refreshmentpage = () => {
  const [refreshments, setRefreshments] = useState([])

  useEffect(() => {
    const fetchRefreshments = async () => {
      const { data } = await axios.get('/api/refreshments')
      setRefreshments(data)
    }

    fetchRefreshments()
  }, [])

  /*const deleteHandler = id => {
    const deleteRefreshment = async () => {
      await axios.delete(`/api/refreshments/${id}`)
    }

    deleteRefreshment()
  }*/

  return (
    <>
      <Row className="my-2">
        <LinkContainer to="/add/refreshments">
          <Button variant="primary">Add Refreshments</Button>
        </LinkContainer>
      </Row>
      {refreshments.length > 0 ? (
        <Table striped bordered hover responsive className="table-sm">
          <thead>
            <tr>
              <th>ID</th>
              <th>Name</th>
              <th>Price</th>
              <th>Count In Stock</th>
              <th></th>
            </tr>
          </thead>
          <tbody>
            {refreshments.map(refreshment => (
              <tr key={refreshment._id}>
                <td>{refreshment._id}</td>
                <td>{refreshment.name}</td>
                <td>{refreshment.price}</td>
                <td>{refreshment.countInStock}</td>
                <td>
                  <LinkContainer to={`/update/refreshments/${refreshment._id}`}>
                    <i className="fas fa-edit"></i>
                  </LinkContainer>
                </td>
              </tr>
            ))}
          </tbody>
        </Table>
      ) : (
        <></>
      )}
    </>
  )
}

export default Refreshmentpage
