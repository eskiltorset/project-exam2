import Button from 'react-bootstrap/Button';
import Container from 'react-bootstrap/Container';
import Form from 'react-bootstrap/Form';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import React, { useEffect, useState } from 'react';
import { NavLink } from 'react-router-dom';
import HolidazeLogo from "../../images/logo2.png";
import "./navbar.css";
import MaybeShowNavbar from '../MaybeShowNavbar';
import MaybeShowSearch from '../MaybeShowSearch';
import MaybeShowNavbarLoggedIn from '../MaybeShowNavbarLoggedIn';
import SignOut from '../SignOut';
import SearchBar from '../Search';
import NavDropdown from 'react-bootstrap/NavDropdown';
import "../../styles/global.css";



function NavBar() {

  // const [loginNav, setLoginNav] = useState();
  // const [registerNav, setRegisterNav] = useState(); 
  const loggedInUser = localStorage.getItem("loggedInUser");
  const name = loggedInUser;


    return (
      
        <Navbar expand="md" className="bg-body-white shadow-sm p-4">
          <Container fluid>
            <Navbar.Brand as={NavLink} to="/" className='primary-color'>      
              {/* <img src={HolidazeLogo} alt="Holidaze Logo" height='30' width="30"/> */}
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

                    {/* <Nav.Link as={NavLink} to={`/profile/${name}`}>Profile</Nav.Link> */}
                    {/* <Button variant="outline-none" onClick={SignOut}>Sign out</Button> */}
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