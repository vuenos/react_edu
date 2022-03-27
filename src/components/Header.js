import React from 'react';
import {Container, Navbar, Nav, NavDropdown} from "react-bootstrap";
import { useNavigate, NavLink } from "react-router-dom";
import { useSelector, useDispatch } from 'react-redux';
import {LinkContainer} from "react-router-bootstrap";
import {logout} from "../actions/userActions";

const Header = () => {

  const navigate = useNavigate();
  const dispatch = useDispatch();
  const userLogin = useSelector((state) => state.userLogin)

  const { userInfo } = userLogin;

  const logoutHandler = () => {
    dispatch(logout());
  }

  const activeStyle = ({isActive}) => "nav-link" + (isActive ? " activated" : "");

  return (
    <header>
      <Navbar bg="dark" variant="dark" expand="lg" collapseOnSelect>
        <Container>

          <Navbar.Brand href={"/"}>My shop</Navbar.Brand>
          <Navbar.Toggle aria-controls="basic-navbar-nav" />
          <Navbar.Collapse id="basic-navbar-nav">
            <Nav className="ml-auto">
              {userInfo
                ? (
                  <>
                    <NavLink to="/users" className={activeStyle}>
                      Users
                    </NavLink>
                    <NavLink to="/products" className={activeStyle}>
                      Products
                    </NavLink>
                    <NavLink to="/oders" className={activeStyle}>
                      Orders
                    </NavLink>
                    <NavDropdown title={userInfo.name} id="username">
                      <LinkContainer to="/mypage">
                        <NavDropdown.Item>
                          Mypage
                        </NavDropdown.Item>
                      </LinkContainer>
                        <NavDropdown.Item onClick={logoutHandler}>
                          Logout
                        </NavDropdown.Item>
                    </NavDropdown>
                  </>

                )
                : (
                  <>
                    <LinkContainer to="/login">
                      <Nav.Link>
                        <i className="fas fa-user"></i> Login
                      </Nav.Link>
                    </LinkContainer>
                    <LinkContainer to="/register">
                      <Nav.Link>
                        Register
                      </Nav.Link>
                    </LinkContainer>
                  </>
                )
              }
            </Nav>

          </Navbar.Collapse>
        </Container>
      </Navbar>
    </header>
  );
};

export default Header;