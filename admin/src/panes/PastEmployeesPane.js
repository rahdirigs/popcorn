import React, { useEffect } from 'react'
import { Button, Table } from 'react-bootstrap'
import { useDispatch, useSelector } from 'react-redux'
import Loader from '../components/Loader'
import Message from '../components/Message'
import {
  employeeStartWorking,
  listPastEmployees,
} from '../actions/employeeActions'

const PastEmployeesPane = () => {
  const dispatch = useDispatch()

  const employeePastList = useSelector(state => state.employeePastList)
  const { loading, error, pastEmployees } = employeePastList

  const employeeStopWork = useSelector(state => state.employeeStopWork)
  const { success: stopSuccess } = employeeStopWork

  const employeeStartWork = useSelector(state => state.employeeStartWork)
  const { success } = employeeStartWork

  useEffect(() => {
    dispatch(listPastEmployees())
  }, [dispatch, success, stopSuccess])

  const workingStart = id => {
    dispatch(employeeStartWorking(id))
  }

  return loading ? (
    <Loader />
  ) : error ? (
    <Message>{error}</Message>
  ) : pastEmployees.length === 0 ? (
    <Message variant="info">No former employees</Message>
  ) : (
    <Table striped bordered responsive hover className="table-md my-3">
      <thead>
        <tr>
          <th>ID</th>
          <th>Name</th>
          <th>Email</th>
          <th>Date of Birth</th>
          <th>Contact</th>
          <th>Ratings</th>
          <th>Reviews</th>
          <td></td>
        </tr>
      </thead>
      <tbody>
        {pastEmployees.length > 0 ? (
          pastEmployees.map(employee => (
            <tr key={employee.id}>
              <td>{employee.id}</td>
              <td>{[employee.firstName, employee.lastName].join(' ')}</td>
              <td>{employee.email}</td>
              <td>{employee.dateOfBirth}</td>
              <td>{employee.contact}</td>
              <td>{employee.ratings}</td>
              <td>{employee.numReviews}</td>
              <td>
                <Button
                  variant="success"
                  onClick={() => workingStart(employee.id)}
                  className="btn-sm"
                >
                  <i className="fas fa-briefcase"></i>
                </Button>
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

export default PastEmployeesPane
