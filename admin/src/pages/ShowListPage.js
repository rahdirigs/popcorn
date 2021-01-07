import React from 'react'
import { Col, Nav, Row, Tab } from 'react-bootstrap'
import { Link } from 'react-router-dom'
import AllShowsPane from '../panes/AllShowsPane'
import FutureShowsPane from '../panes/FutureShowsPane'
import PastShowsPane from '../panes/PastShowsPane'

const ShowListPage = () => {
  return (
    <>
      <Row>
        <Link to="/add/shows" className="btn btn-primary ml-auto">
          Schedule a New Show
        </Link>
      </Row>
      <Tab.Container id="typeSelection" defaultActiveKey="all">
        <Row>
          <Col md={3}>
            <Nav variant="pills" className="flex-column">
              <Nav.Item>
                <Nav.Link eventKey="all">All Shows</Nav.Link>
              </Nav.Item>
              <Nav.Item>
                <Nav.Link eventKey="future">Upcoming Shows</Nav.Link>
              </Nav.Item>
              <Nav.Item>
                <Nav.Link eventKey="past">Past Shows</Nav.Link>
              </Nav.Item>
            </Nav>
          </Col>
          <Col md={9}>
            <Tab.Content>
              <Tab.Pane eventKey="all">
                <AllShowsPane />
              </Tab.Pane>
              <Tab.Pane eventKey="future">
                <FutureShowsPane />
              </Tab.Pane>
              <Tab.Pane eventKey="past">
                <PastShowsPane />
              </Tab.Pane>
            </Tab.Content>
          </Col>
        </Row>
      </Tab.Container>
    </>
  )
}

export default ShowListPage
