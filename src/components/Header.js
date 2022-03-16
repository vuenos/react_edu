import React from 'react';
import {Container, Navbar, Nav, Button} from "react-bootstrap";
import { useNavigate, Link, NavLink } from "react-router-dom";

const Header = () => {

    const navigate = useNavigate();

    const goBack = () => {
        //back to page
        navigate(-1);
    };

    const activeStyle = ({isActive}) => "nav-link" + (isActive ? " activated" : "");

    return (
        <header>
            <Navbar bg="dark" variant="dark" expand="lg" collapseOnSelect>
                <Container>
                    <Button onClick={goBack}>Back</Button>
                    <Navbar.Brand href={"/"}>My shop</Navbar.Brand>
                    <Navbar.Toggle aria-controls="basic-navbar-nav" />
                    <Navbar.Collapse id="basic-navbar-nav">
                        <Nav className={"ml-auto"}>
                            <NavLink to={"/users"} className={activeStyle}>
                                Users
                            </NavLink>
                            <NavLink to={"/products"} className={activeStyle}>
                                Products
                            </NavLink>
                            <NavLink to={"/orders"} className={activeStyle}>
                                Orders
                            </NavLink>
                            <NavLink to="/login" className={activeStyle}>Login</NavLink>
                            <NavLink to="/mypage" className={activeStyle}>Mypage</NavLink>
                        </Nav>
                    </Navbar.Collapse>
                </Container>
            </Navbar>
        </header>
    );
};

export default Header;