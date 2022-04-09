import React, { useState, useEffect } from 'react';
import { FormContainer, Loader, Message } from "../components"
import { Form, FormLabel, Button, NavLink } from "react-bootstrap"
import { useNavigate, Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { logout } from "../actions/userActions";
import { getProfile, modifyProfile } from "../actions/userActions";

const Mypage = () => {

  const navigate = useNavigate();
  const dispatch = useDispatch();

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const [message, setMessage] = useState("");

  const userProfile = useSelector((state) => state.userProfile)
  const { loading, user, error } = userProfile;

  const modifyUser = useSelector((state) => state.modifyUser)
  const { success } = modifyUser;

  const userLogin = useSelector((state) => state.userLogin);
  const { userInfo } = userLogin;

  const logoutHandler = () => {
    dispatch(logout());
    navigate('/login')
  }

  const updateProfile = (e) => {
    e.preventDefault();
    dispatch(modifyProfile({ name, email, password}))
  }

  useEffect(() => {
    if (success) {
      setMessage("Updated!")
    } else {
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
    }

  }, [dispatch, user, success]);

  return (
    <FormContainer>
      <h1>Mypage</h1>
      {error && <Message variant="danger">{error}</Message>}
      {loading && <Loader />}
      {message && <Message>{message}</Message>}
      <div>
        <Form>
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
          {/*<Form.Group controlId={"isAdmin"}>*/}

          {/*</Form.Group>*/}
          <Form.Group className="d-flex justify-content-between">
            <Button onClick={logoutHandler} variant="outline-danger">Log out</Button>
            <Button onClick={updateProfile}>Update</Button>
          </Form.Group>
        </Form>
      </div>
    </FormContainer>
  );
};

export default Mypage;