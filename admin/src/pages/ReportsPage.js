import React from 'react'
import { Col, Nav, Row, Tab } from 'react-bootstrap'
import ProfitsPane from '../panes/ProfitsPane'
import MovieWisePane from '../panes/MovieWisePane'
import FlavourWisePane from '../panes/FlavourWisePane'

const ReportsPage = () => {
  return (
    <>
      <Tab.Container id="typeSelection" defaultActiveKey="profits">
        <Row>
          <Col md={3}>
            <Nav variant="pills" className="flex-column">
              <Nav.Item>
                <Nav.Link eventKey="profits">Profits and Projections</Nav.Link>
              </Nav.Item>
              <Nav.Item>
                <Nav.Link eventKey="movie-wise">Movie Wise Reports</Nav.Link>
              </Nav.Item>
              <Nav.Item>
                <Nav.Link eventKey="genre-wise">Flavour Wise Reports</Nav.Link>
              </Nav.Item>
            </Nav>
          </Col>
          <Col md={9}>
            <Tab.Content>
              <Tab.Pane eventKey="profits">
                <ProfitsPane />
              </Tab.Pane>
              <Tab.Pane eventKey="movie-wise">
                <MovieWisePane />
              </Tab.Pane>
              <Tab.Pane eventKey="genre-wise">
                <FlavourWisePane />
              </Tab.Pane>
            </Tab.Content>
          </Col>
        </Row>
      </Tab.Container>
    </>
  )
}

export default ReportsPage
