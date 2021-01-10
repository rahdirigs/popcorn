import React, { useEffect } from 'react'
import { Table } from 'react-bootstrap'
import { useDispatch, useSelector } from 'react-redux'
import { traceContact } from '../actions/employeeActions'
import Loader from '../components/Loader'
import Message from '../components/Message'

const InfectedPage = ({ match }) => {
  const dispatch = useDispatch()

  const employeeContact = useSelector(state => state.employeeContact)
  const { loading, error, usersContact } = employeeContact

  useEffect(() => {
    dispatch(traceContact(match.params.id))
  }, [dispatch, match])
  return loading ? (
    <Loader />
  ) : error ? (
    <Message>{error}</Message>
  ) : (
    usersContact && (
      <>
        <h2>Users in contact</h2>
        <Table striped hover responsive bordered className="my-3">
          <thead>
            <tr>
              <th>Name</th>
              <th>Email</th>
              <th>Date of Birth</th>
              <th>Contact</th>
            </tr>
          </thead>
          <tbody>
            {usersContact.map(user => (
              <tr key={user.email}>
                <td>{[user.firstName, user.lastName].join(' ')}</td>
                <td>{user.email}</td>
                <td>{user.dateOfBirth}</td>
                <td>{user.contact}</td>
              </tr>
            ))}
          </tbody>
        </Table>
      </>
    )
  )
}

export default InfectedPage
