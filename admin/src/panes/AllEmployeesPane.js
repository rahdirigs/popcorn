import React, { useEffect } from 'react'
import { Table } from 'react-bootstrap'
import { useDispatch, useSelector } from 'react-redux'
import { listAllEmployees } from '../actions/employeeActions'
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
          <td>ID</td>
          <td>Name</td>
          <td>Email</td>
          <td>Date of Birth</td>
          <td>Contact</td>
          <td>Ratings</td>
          <td>Reviews</td>
        </tr>
      </thead>
      <tbody>
        {employees.length > 0 ? (
          employees.map(employee => (
            <tr key={employee.id}>
              <td>{employee.id}</td>
              <td>{[employee.firstName, employee.lastname].join(' ')}</td>
              <td>{employee.email}</td>
              <td>{employee.dateOfBirth}</td>
              <td>{employee.contact}</td>
              <td>{employee.ratings}</td>
              <td>{employee.numReviews}</td>
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
