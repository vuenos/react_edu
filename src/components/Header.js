import React from 'react';
import {Container, Navbar, Nav} from "react-bootstrap";
import { useNavigate, Link } from "react-router-dom";

const Header = () => {

    const navigate = useNavigate();

    const goBack = () => {
        //back to page
        navigate(-1);
    };

    return (
        <header>
            <Navbar bg="dark" variant="dark" expand="lg" collapseOnSelect>
                <Container>
                    <Navbar.Brand href={"/"}>My shop</Navbar.Brand>
                    <Navbar.Toggle aria-controls="basic-navbar-nav" />
                    <Navbar.Collapse id="basic-navbar-nav">
                        <Nav className={"ml-auto"}>
                            <Nav.Link href={"/users"}>
                                Users
                            </Nav.Link>
                            <Nav.Link href={"/products"}>
                                Products
                            </Nav.Link>
                            <Nav.Link href={"/orders"}>
                                Orders
                            </Nav.Link>
                            <Nav.Link href="/login">Login</Nav.Link>
                            <Nav.Link href="/mypage">Mypage</Nav.Link>
                        </Nav>
                    </Navbar.Collapse>
                </Container>
            </Navbar>
        </header>
    );
};

export default Header;