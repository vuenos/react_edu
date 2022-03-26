import React, { useState, useEffect } from 'react';
//import axios from "axios";
import { FormContainer, Loader, Message } from "../components"
import { Form, FormLabel, Button } from "react-bootstrap"
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { logout } from "../actions/userActions";
import { getProfile } from "../actions/userActions";
import { modifyProfile } from "../actions/userActions";

const Mypage = () => {

  const navigate = useNavigate();
  const dispatch = useDispatch();

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const userProfile = useSelector((state) => state.userProfile)
  const { loading, user, error } = userProfile;
  console.log(user)

  const userLogin = useSelector((state) => state.userLogin);
  const { userInfo } = userLogin;

  const logoutHandler = () => {
    dispatch(logout());
  }

  const modifyHandler = async (e) => {
    e.preventDefault();
    dispatch(modifyProfile(name, email, password));
  }

  useEffect(() => {

    if (!userInfo) {
      navigate('/login')
    } else {
      if (!user || !user.name || !user.email) {
        dispatch(getProfile())
      } else {
        setName(user.name)
        setEmail(user.email)
        setPassword(user.password)
      }
    }
  }, [dispatch, userInfo, user]);

  return (
    <FormContainer>
      <h1>Mypage</h1>
      {error && <Message variant="danger">{error}</Message>}
      {loading && <Loader />}
      <div>
        <Form onSubmit={modifyHandler}>
          <Form.Group controlId={"name"}>
            <FormLabel>Name</FormLabel>
            <Form.Control
              type={"text"}
              placeholder="Your name"
              value={name}
              onChange={(e) => setName(e.target.value)}
            />
          </Form.Group>
          <br />
          <Form.Group controlId={"email"}>
            <FormLabel>Email address</FormLabel>
            <Form.Control
              type="email"
              placeholder="Enter email"
              value={email}
              disabled
              onChange={(e) => setEmail(e.target.value)}
            />
          </Form.Group>
          <br />
          <Form.Group controlId={"password"}>
            <FormLabel>Password</FormLabel>
            <Form.Control
              type="password"
              placeholder="Enter password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
          </Form.Group>
          <br />
          <Form.Group controlId={"isAdmin"}>

          </Form.Group>
          <Form.Group className="d-flex justify-content-between">
            <Button onClick={logoutHandler} variant="outline-danger">Log out</Button>
            <Button type="submit" variant="primary">Modify</Button>
          </Form.Group>
        </Form>
      </div>
    </FormContainer>
  );
};

export default Mypage;