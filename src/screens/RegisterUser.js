import React, { useState, useEffect } from 'react';
import {FormContainer, Loader, Message} from "../components";
import { useNavigate } from "react-router-dom"
import { useDispatch, useSelector } from "react-redux";
import {Button, Form, FormLabel} from "react-bootstrap";
import { registerUserAction } from "../actions/userActions"

const RegisterUser = () => {
  const navigate = useNavigate();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [name, setName] = useState("");

  const dispatch = useDispatch();

  const userLogin = useSelector(state => state.userLogin);

  const { loading, userInfo, error } = userLogin;

  const userRegisterHandler = (e) => {
    e.preventDefault();
    dispatch(registerUserAction(name, email, password));
  }

  useEffect(() => {
    if (userInfo) {
      navigate('/home')
    }
  }, [navigate, userInfo])

  return (
    <FormContainer>
      <h1>Register</h1>
      {error && <Message variant="danger">{error}</Message>}
      {loading && <Loader />}

      <Form>
        <Form.Group controlId={"name"}>
          <FormLabel>Name</FormLabel>
          <Form.Control
            type="text"
            placeholder="Enter your name"
            value={name}
            onChange={(e) => setName(e.target.value)}
          />
        </Form.Group>
        <br />
        <Form.Group>
          <FormLabel>Email address</FormLabel>
          <Form.Control
            type="email"
            placeholder="Enter email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
        </Form.Group>
        <br />
        <Form.Group>
          <FormLabel>Password</FormLabel>
          <Form.Control
            type="password"
            placeholder="Enter password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
        </Form.Group>
        <br />
        <Button onClick={userRegisterHandler} variant="primary">Register</Button>
      </Form>
    </FormContainer>
  );
};

export default RegisterUser;
