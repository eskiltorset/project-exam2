import Button from 'react-bootstrap/Button';
import Container from 'react-bootstrap/Container';
import Form from 'react-bootstrap/Form';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import React from 'react';
import { NavLink } from 'react-router-dom';


function NavBar() {
    return (
      <Navbar expand="md" className="bg-body-tertiary">
        <Container fluid>
          <Navbar.Brand as={NavLink} to="/">ECommerce Store</Navbar.Brand>
          <Navbar.Toggle aria-controls="navbarScroll" />
          <Navbar.Collapse id="navbarScroll">
            <Nav
              className="me-auto my-2 my-lg-0"
              style={{ maxHeight: '200px' }}
              navbarScroll
            >
              <Nav.Link as={NavLink} to="/venues">Products</Nav.Link>
              <Nav.Link as={NavLink} to="/">Contact</Nav.Link>
              <Nav.Link as={NavLink} to="/">
                <i class="bi bi-cart-fill text-dark me-1" id="cartIndex"></i>
              </Nav.Link>
            </Nav>
            <Form className="d-flex">
              <Form.Control
                type="search"
                placeholder="Search"
                className="me-0"
                aria-label="Search"
              />
              <Button variant="outline-dark">Search</Button>
            </Form>
          </Navbar.Collapse>
        </Container>
      </Navbar>
    );
  }

  export default NavBar;