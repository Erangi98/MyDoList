import React from 'react'
import {Navbar,Nav,NavDropdown,Container}from "react-bootstrap";
import { useDispatch, useSelector } from 'react-redux';
import { Link, useNavigate } from 'react-router-dom';
import { logout } from '../../Actions/userActions';

const Header = () => {
  const history = useNavigate();

  const dispatch = useDispatch();

  const userSignIn = useSelector((state) => state.userSignIn);
  const { userInfo } = userSignIn;

  const logoutHandler = () => {
    dispatch(logout());
    history.push("/");
  }
  return (
    <Navbar bg="primary" expand="lg" variant="dark">
  <Container>
  <Nav className="m-auto">
  <Navbar.Brand><Link to="/">My Task App</Link></Navbar.Brand> 
  </Nav>
    <Navbar.Toggle aria-controls="basic-navbar-nav" />
    <Navbar.Collapse id="basic-navbar-nav">
    {userInfo? (<Nav className="m-auto">
        <Nav.Link><Link to="/mytasklist">My Task List</Link></Nav.Link>
        <NavDropdown title={userInfo?.username} id="basic-nav-dropdown">
          <NavDropdown.Item href="/profile">My Profile</NavDropdown.Item>
          <NavDropdown.Divider />
          <NavDropdown.Item href="/" onClick={logoutHandler}>
          Log out
          </NavDropdown.Item>
        </NavDropdown>
      </Nav>): (
        <Nav className="ml-auto">
              {" "}
              <Nav.Link href="/signIn">Login</Nav.Link>
            </Nav>
      )}
      
    </Navbar.Collapse>
  </Container>
</Navbar>
  )
}

export default Header