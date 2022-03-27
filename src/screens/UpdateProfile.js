import React, { useState, useEffect } from 'react';
import {FormContainer, Loader, Message} from "../components";
import { Form, FormLabel, Button, NavLink } from "react-bootstrap"
import { useNavigate, Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { modifyProfile } from "../actions/userActions";

const UpdateProfile = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const userLogin = useSelector((state) => state.userLogin);
  const { userInfo } = userLogin;

  const [name, setName] = useState(userInfo ? userInfo.name : "");
  const [email, setEmail] = useState(userInfo ? userInfo.email : "");
  const [password, setPassword] = useState("");

  const modifyUser = useSelector((state) => state.modifyUser)
  const { loading, user, error } = modifyUser;

  const modifyHandler = async (e) => {
    e.preventDefault();
    dispatch(modifyProfile(name, email, password));
  }

  useEffect(() => {

    if (!userInfo) {
      navigate('/login')
    }
  }, [navigate, userInfo]);

  return (
    <FormContainer>
      <h1>My Profile</h1>
      {error && <Message variant="danger">{error}</Message>}
      {user && !loading && (
        <Message variant="danger">Updated successfully.</Message>
      )}
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
            <Button type="submit" variant="outline-danger">Update</Button>
          </Form.Group>
        </Form>
      </div>
    </FormContainer>
  );
};

export default UpdateProfile;
