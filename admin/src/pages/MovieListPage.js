import React from 'react'
import { Col, Nav, Row, Tab } from 'react-bootstrap'
import { Link } from 'react-router-dom'
import AllMoviesPane from '../panes/AllMoviesPane'
import CurrentMoviesPane from '../panes/CurrentMoviesPane'
import PastMoviesPane from '../panes/PastMoviesPane'

const MovieListPage = () => {
  return (
    <>
      <Row>
        <Link to="/add/movies" className="btn btn-primary ml-auto">
          Add New Movie
        </Link>
      </Row>
      <Tab.Container id="typeSelection" defaultActiveKey="all">
        <Row>
          <Col md={3}>
            <Nav variant="pills" className="flex-column">
              <Nav.Item>
                <Nav.Link eventKey="all">All Movies</Nav.Link>
              </Nav.Item>
              <Nav.Item>
                <Nav.Link eventKey="current">Current Movies</Nav.Link>
              </Nav.Item>
              <Nav.Item>
                <Nav.Link eventKey="past">Past Movies</Nav.Link>
              </Nav.Item>
            </Nav>
          </Col>
          <Col md={9}>
            <Tab.Content>
              <Tab.Pane eventKey="all">
                <AllMoviesPane />
              </Tab.Pane>
              <Tab.Pane eventKey="current">
                <CurrentMoviesPane />
              </Tab.Pane>
              <Tab.Pane eventKey="past">
                <PastMoviesPane />
              </Tab.Pane>
            </Tab.Content>
          </Col>
        </Row>
      </Tab.Container>
    </>
  )
}

export default MovieListPage
