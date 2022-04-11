import React, {useState} from 'react';
import {Container, Navbar, Nav, NavDropdown, FormControl, Button, Form} from "react-bootstrap";
import { useNavigate, NavLink, Route } from "react-router-dom";
import { useSelector, useDispatch } from 'react-redux';
import {LinkContainer} from "react-router-bootstrap";
import {logout} from "../actions/userActions";
import SearchBox from "./SearchBox";

const Header = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const userLogin = useSelector((state) => state.userLogin)

  const [keyword, setKeyword] = useState("");

  const submitHandler = (e) => {
    e.preventDefault();
    if (keyword.trim()) {
      navigate(`/search/${keyword}`)
    } else {
      navigate('/')
    }
  }

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

            <Form onSubmit={submitHandler} className='d-flex'>
              <Form.Control
                type='text'
                name='q'
                onChange={(e) => setKeyword(e.target.value)}
                placeholder='Search Products…'
                className='mr-sm-2 ml-sm-5'
               />
              <Button type='submit' variant='outline-success' className='p-2'>
                Search
              </Button>
            </Form>

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