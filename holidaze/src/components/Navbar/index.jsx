import Button from 'react-bootstrap/Button';
import Container from 'react-bootstrap/Container';
import Form from 'react-bootstrap/Form';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import React from 'react';
import { NavLink } from 'react-router-dom';
import HolidazeLogo from "../../images/logo2.png";
import "./navbar.css";



function NavBar() {
    return (
      <Navbar expand="md" className="bg-body-white shadow-sm p-4">
        <Container fluid>
          <Navbar.Brand as={NavLink} to="/">      
            {/* <img src={HolidazeLogo} alt="Holidaze Logo" height='30'/> */}
            Holidaze
          </Navbar.Brand>
          <Navbar.Toggle aria-controls="navbarScroll" />
          <Navbar.Collapse id="navbarScroll">
            <Nav
              className="toggle-navbar me-auto my-2 my-lg-0"
              style={{ maxHeight: '200px' }}
              navbarScroll
            >
                <Nav.Link as={NavLink} to="/venues">Venues</Nav.Link>
                <Nav.Link as={NavLink} to="/register">Register</Nav.Link>
                <Nav.Link as={NavLink} to="/login">Login</Nav.Link>              

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