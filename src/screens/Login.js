import React, { useState, useEffect } from 'react';
import {Button, Form, FormLabel} from "react-bootstrap";
import { useDispatch, useSelector } from 'react-redux'
import {useNavigate} from "react-router-dom";
import { FormContainer, Loader, Message } from "../components"
import {login} from "../actions/userActions";

const Login = () => {
    const dispatch = useDispatch();
    const navigate = useNavigate();


    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");

    const userLogin = useSelector((state) => state.userLogin)
    const { loading, userInfo, error } = userLogin;

    const loginHandler = async (e) => {
        e.preventDefault();
        dispatch(login(email, password));

    }

    useEffect(() => {
       if (userInfo) {
           navigate('/mypage')
       }
    }, [navigate, userInfo]);


    return (
        <FormContainer>
            <h1>Sign in</h1>
            {error && <Message variant="danger">{error}</Message>}
            {loading && <Loader />}

            <Form onSubmit={loginHandler}>
                <Form.Group controlId={"email"}>
                    <FormLabel>Email address</FormLabel>
                    <Form.Control
                        type="email"
                        placeholder="Enter email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                    />
                </Form.Group>
                <br/>
                <Form.Group controlId={"password"}>
                    <FormLabel>Password</FormLabel>
                    <Form.Control
                        type="password"
                        placeholder="Enter password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                    />
                </Form.Group>
                <br/>

                <Button type="submit" variant="primary">Sign in</Button>
            </Form>
        </FormContainer>
    );
};

export default Login;