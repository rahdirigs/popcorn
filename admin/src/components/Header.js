import React from 'react'
import { Container, Image, Nav, Navbar } from 'react-bootstrap'
import { LinkContainer } from 'react-router-bootstrap'

const Header = () => {
  return (
    <header>
      <Navbar bg="primary" variant="dark" expand="lg" collapseOnSelect>
        <Container>
          <LinkContainer to="/">
            <Navbar.Brand>
              <Image
                src="/logo512.png"
                width="30"
                height="30"
                className="mx-2"
              />
              PopCorn
            </Navbar.Brand>
          </LinkContainer>
          <Navbar.Toggle aria-controls="basic-navbar-nav" />
          <Navbar.Collapse id="basic-navbar-nav">
            <Nav className="ml-auto">
              <LinkContainer to="/movies">
                <Nav.Link>
                  <i className="fas fa-film mx-2"></i>
                  Movies
                </Nav.Link>
              </LinkContainer>
              <LinkContainer to="/employees">
                <Nav.Link>
                  <i className="fas fa-id-card mx-2"></i>
                  Employees
                </Nav.Link>
              </LinkContainer>
              <LinkContainer to="/shows">
                <Nav.Link>
                  <i className="fas fa-tv mx-2"></i>
                  Shows
                </Nav.Link>
              </LinkContainer>
              <LinkContainer to="/refreshments">
                <Nav.Link>
                  <i className="fas fa-cookie mx-2"></i>
                  Refreshments
                </Nav.Link>
              </LinkContainer>
              <LinkContainer to="/reports">
                <Nav.Link>
                  <i className="fas fa-file-invoice-dollar mx-2"></i>
                  Reports
                </Nav.Link>
              </LinkContainer>
              <LinkContainer to="/utilities">
                <Nav.Link>
                  <i className="fas fa-wrench mx-2"></i>
                  Utilities
                </Nav.Link>
              </LinkContainer>
            </Nav>
          </Navbar.Collapse>
        </Container>
      </Navbar>
    </header>
  )
}

export default Header
