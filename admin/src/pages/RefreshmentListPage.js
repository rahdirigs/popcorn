import React, { useEffect } from 'react'
import { Button, Row, Table } from 'react-bootstrap'
import { Link } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import {
  deleteRefreshment,
  listRefreshments,
} from '../actions/refreshmentActions'
import Message from '../components/Message'
import Loader from '../components/Loader'
import { LinkContainer } from 'react-router-bootstrap'

const RefreshmentListPage = () => {
  const dispatch = useDispatch()

  const refreshmentList = useSelector(state => state.refreshmentList)
  const { loading, error, refreshments } = refreshmentList

  const refreshmentDelete = useSelector(state => state.refreshmentDelete)
  const { success } = refreshmentDelete

  useEffect(() => {
    dispatch(listRefreshments())
  }, [dispatch, success])

  const deleteHandler = id => {
    if (window.confirm('Are you sure?')) {
      dispatch(deleteRefreshment(id))
    }
  }

  return (
    <>
      <Row>
        <Link to="/add/refreshments" className="btn btn-primary ml-auto my-3">
          Add a new Refreshment
        </Link>
      </Row>
      {success && (
        <Message variant="success">Successfully deleted item...</Message>
      )}
      {error ? (
        <Message>{error}</Message>
      ) : loading ? (
        <Loader />
      ) : (
        <Table striped responsive bordered hover className="table-md">
          <thead>
            <tr>
              <th>ID</th>
              <th>Refreshment Name</th>
              <th>Count In Stock</th>
              <th>Price per unit</th>
              <th></th>
              <th></th>
            </tr>
          </thead>
          <tbody>
            {refreshments.map(refreshment => (
              <tr key={refreshment._id}>
                <td>{refreshment._id}</td>
                <td>{refreshment.name}</td>
                <td>{refreshment.countInStock}</td>
                <td>{refreshment.price}</td>
                <td>
                  <LinkContainer to={`/edit/refreshments/${refreshment._id}`}>
                    <i className="fas fa-edit"></i>
                  </LinkContainer>
                </td>
                <td>
                  <Button
                    className="btn-sm"
                    variant="danger"
                    onClick={() => deleteHandler(refreshment._id)}
                  >
                    <i className="fas fa-trash"></i>
                  </Button>
                </td>
              </tr>
            ))}
          </tbody>
        </Table>
      )}
    </>
  )
}

export default RefreshmentListPage
