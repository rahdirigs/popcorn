import React, { useEffect } from 'react'
import { Button, Table } from 'react-bootstrap'
import { useDispatch, useSelector } from 'react-redux'
import { listAllEmployees } from '../actions/employeeActions'
import { LinkContainer } from 'react-router-bootstrap'
import Loader from '../components/Loader'
import Message from '../components/Message'

const AllEmployeesPane = () => {
  const dispatch = useDispatch()

  const employeeList = useSelector(state => state.employeeList)
  const { loading, error, employees } = employeeList

  useEffect(() => {
    dispatch(listAllEmployees())
  }, [dispatch])

  return loading ? (
    <Loader />
  ) : error ? (
    <Message>{error}</Message>
  ) : employees.length === 0 ? (
    <Message variant="info">No employees in the database</Message>
  ) : (
    <Table striped bordered responsive hover className="table-md my-3">
      <thead>
        <tr>
          <th>ID</th>
          <th>Name</th>
          <th>Email</th>
          <th>Date of Birth</th>
          <th>Contact</th>
          <th></th>
        </tr>
      </thead>
      <tbody>
        {employees.length > 0 ? (
          employees.map(employee => (
            <tr key={employee.id}>
              <td>{employee.id}</td>
              <td>{[employee.firstName, employee.lastName].join(' ')}</td>
              <td>{employee.email}</td>
              <td>{employee.dateOfBirth}</td>
              <td>{employee.contact}</td>
              <td>
                <LinkContainer to={`/infected/${employee.id}`}>
                  <Button variant="danger" className="btn-sm">
                    <i className="fas fa-virus"></i>
                  </Button>
                </LinkContainer>
              </td>
            </tr>
          ))
        ) : (
          <></>
        )}
      </tbody>
    </Table>
  )
}

export default AllEmployeesPane
