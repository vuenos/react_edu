import React from 'react';
import {Container, Navbar, Nav, Button, NavDropdown, Dropdown} from "react-bootstrap";
import { useNavigate, Link, NavLink } from "react-router-dom";
import { useSelector, useDispatch } from 'react-redux';
import {LinkContainer} from "react-router-bootstrap";
import {logout} from "../actions/userActions";

const Header = () => {

  const navigate = useNavigate();
  const dispatch = useDispatch();
  const userLogin = useSelector((state) => state.userLogin)

  const { userInfo } = userLogin;
  console.log("+++++++++++++++++++", userInfo)

  // const goBack = () => {
  //     //back to page
  //     navigate(-1);
  // };

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
                  <LinkContainer to="/login">
                    <Nav.Link>
                      <i className="fas fa-user"></i> Login
                    </Nav.Link>
                  </LinkContainer>
                )
              }
            </Nav>
            {/*<NavLink to={"/users"} className={activeStyle}>*/}
            {/*  Users*/}
            {/*</NavLink>*/}
            {/*<NavLink to={"/products"} className={activeStyle}>*/}
            {/*  Products*/}
            {/*</NavLink>*/}
            {/*<NavLink to={"/orders"} className={activeStyle}>*/}
            {/*  Orders*/}
            {/*</NavLink>*/}
            {/*{userInfo.name}*/}
            {/*<NavLink to="/mypage" className={activeStyle}>Mypage</NavLink>*/}
            {/*/!*<Nav className={"ml-auto"}>*!/*/}
            {/*/!*  {*!/*/}
            {/*/!*    userInfo*!/*/}
            {/*/!*      ? (*!/*/}
            {/*/!*        <NavDropdown title={userInfo.name} id="username">*!/*/}
            {/*/!*          <LinkContainer to="/mypage">*!/*/}
            {/*/!*            <NavDropdown.Item>*!/*/}
            {/*/!*              Profile*!/*/}
            {/*/!*            </NavDropdown.Item>*!/*/}
            {/*/!*            <NavDropdown.Item>*!/*/}
            {/*/!*              Logout*!/*/}
            {/*/!*            </NavDropdown.Item>*!/*/}
            {/*/!*          </LinkContainer>*!/*/}
            {/*/!*        </NavDropdown>*!/*/}
            {/*/!*      )*!/*/}
            {/*/!*      : (*!/*/}
            {/*/!*          <LinkContainer>*!/*/}
            {/*/!*            <Nav.Link>*!/*/}
            {/*/!*              Login*!/*/}
            {/*/!*            </Nav.Link>*!/*/}
            {/*/!*          </LinkContainer>*!/*/}
            {/*/!*        )*!/*/}
            {/*/!*  }*!/*/}

            {/*/!*</Nav>*!/*/}

          </Navbar.Collapse>
        </Container>
      </Navbar>
    </header>
  );
};

export default Header;