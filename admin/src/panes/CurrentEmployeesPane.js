import React, { useEffect } from 'react'
import { Button, Table } from 'react-bootstrap'
import { useDispatch, useSelector } from 'react-redux'
import Loader from '../components/Loader'
import Message from '../components/Message'
import {
  employeeStopWorking,
  listCurrentEmployees,
} from '../actions/employeeActions'

const CurrentEmployeesPane = () => {
  const dispatch = useDispatch()

  const employeeCurrentList = useSelector(state => state.employeeCurrentList)
  const { loading, error, currentEmployees } = employeeCurrentList

  const employeeStopWork = useSelector(state => state.employeeStopWork)
  const { success } = employeeStopWork

  const employeeStartWork = useSelector(state => state.employeeStartWork)
  const { success: startSuccess } = employeeStartWork

  useEffect(() => {
    dispatch(listCurrentEmployees())
  }, [dispatch, success, startSuccess])

  const workingStop = id => {
    dispatch(employeeStopWorking(id))
  }

  return loading ? (
    <Loader />
  ) : error ? (
    <Message>{error}</Message>
  ) : currentEmployees.length === 0 ? (
    <Message variant="info">No employees working currently</Message>
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
        {currentEmployees.length > 0 ? (
          currentEmployees.map(employee => (
            <tr key={employee.id}>
              <td>{employee.id}</td>
              <td>{[employee.firstName, employee.lastName].join(' ')}</td>
              <td>{employee.email}</td>
              <td>{employee.dateOfBirth}</td>
              <td>{employee.contact}</td>
              <td>
                <Button
                  variant="danger"
                  onClick={() => workingStop(employee.id)}
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

export default CurrentEmployeesPane
