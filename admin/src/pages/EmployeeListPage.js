import React from 'react'
import { Col, Nav, Row, Tab } from 'react-bootstrap'
import { Link } from 'react-router-dom'
import AllEmployeesPane from '../panes/AllEmployeesPane'
import CurrentEmployeesPane from '../panes/CurrentEmployeesPane'
import PastEmployeesPane from '../panes/PastEmployeesPane'

const EmployeeListPage = () => {
  return (
    <>
      <Row>
        <Link to="/add/employees" className="btn btn-primary ml-auto">
          Register a new Employee
        </Link>
      </Row>
      <Tab.Container id="typeSelection" defaultActiveKey="all">
        <Row>
          <Col md={3}>
            <Nav variant="pills" className="flex-column">
              <Nav.Item>
                <Nav.Link eventKey="all">All Employees</Nav.Link>
              </Nav.Item>
              <Nav.Item>
                <Nav.Link eventKey="current">Current Employees</Nav.Link>
              </Nav.Item>
              <Nav.Item>
                <Nav.Link eventKey="past">Past Employees</Nav.Link>
              </Nav.Item>
            </Nav>
          </Col>
          <Col md={9}>
            <Tab.Content>
              <Tab.Pane eventKey="all">
                <AllEmployeesPane />
              </Tab.Pane>
              <Tab.Pane eventKey="current">
                <CurrentEmployeesPane />
              </Tab.Pane>
              <Tab.Pane eventKey="past">
                <PastEmployeesPane />
              </Tab.Pane>
            </Tab.Content>
          </Col>
        </Row>
      </Tab.Container>
    </>
  )
}

export default EmployeeListPage
