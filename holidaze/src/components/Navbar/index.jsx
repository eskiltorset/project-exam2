import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import React from 'react';
import { NavLink } from 'react-router-dom';
import MaybeShowNavbar from '../MaybeShowNavbar';
import MaybeShowSearch from '../MaybeShowSearch';
import MaybeShowNavbarLoggedIn from '../MaybeShowNavbarLoggedIn';
import SignOut from '../SignOut';
import NavDropdown from 'react-bootstrap/NavDropdown';

import "../../styles/global.css";
import "./navbar.css";


function NavBar() {

  const loggedInUser = localStorage.getItem("loggedInUser");
  const name = loggedInUser;

    return (
      
        <Navbar expand="md" className="bg-body-white shadow-sm p-4">
          <Container fluid>
            <Navbar.Brand as={NavLink} to="/" className='primary-color'>      
              Holidaze
            </Navbar.Brand>
              <MaybeShowSearch className="align-center">
              </MaybeShowSearch>
            <Navbar.Toggle aria-controls="navbarScroll" />
            <Navbar.Collapse id="navbarScroll">
              <Nav className="toggle-navbar justify-content-end w-100" navbarScroll>
                  <Nav.Link as={NavLink} to="/" className='float-start'>Venues</Nav.Link>

                  <MaybeShowNavbarLoggedIn>
                    <Nav.Link as={NavLink} to="/create-venue" className='float-start'>Create a venue</Nav.Link>
                    <NavDropdown title={name} drop="start" id="basic-nav-dropdown" className='float-start'>
                      <NavDropdown.Item as={NavLink} to={`/profile/${name}`} className='text-center'>Profile</NavDropdown.Item>
                      <NavDropdown.Divider />
                      <NavDropdown.Item onClick={SignOut} className='text-center'>Sign Out</NavDropdown.Item>
                    </NavDropdown>
                  </MaybeShowNavbarLoggedIn>

                  <MaybeShowNavbar>
                    <Nav.Link as={NavLink} to="/register" id="nav_register" className='float-start'>Register</Nav.Link>
                    <Nav.Link as={NavLink} to="/login" id="nav_login" className='float-start'>Login</Nav.Link>              
                  </MaybeShowNavbar>
              </Nav>
            </Navbar.Collapse>
          </Container>
        </Navbar>
     
    );
  }

  export default NavBar;