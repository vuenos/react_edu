import React, {useState, useEffect} from 'react';
import axios from "axios";
import {FormContainer, Loader} from "../components"
import { Form, FormLabel, Button } from "react-bootstrap"
import {useNavigate} from "react-router-dom";

const Mypage = () => {

  const navigate = useNavigate();

  const [loading, setLoading] = useState(false);
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const token = localStorage.getItem('token');

  const config = {
    headers: {
      Authorization: `Bearer ${token}`
    }
  }

  //token 삭제하고 로그아웃
  const deleteToken = () => {
    localStorage.removeItem('token');
    navigate('/');
  }

  const modifyHandler = async (e) => {
    e.preventDefault();

    const userInput = { name, email, password }

    try {
      setLoading(true)
      const { data, status } = await axios.put("http://localhost:5000/api/users/profile", userInput, config)
      if (status === 200) {

        setTimeout(() => {
          setLoading(false)
          alert("Updated");
        }, 1500)

      }

    } catch (error) {
      console.log(error.message)
      setLoading(false)
    }
  }


  const getProfile = async () => {

    try {
      const { data } = await axios.get("http://localhost:5000/api/users/profile", config)

      console.log(data)
      setName(data.name)
      setEmail(data.email)
      setPassword(data.password)
    } catch (error) {
      //
      console.log(error.message)
    }
  }

  useEffect(() => {
    getProfile();
  }, []);


  return (
    <FormContainer>
      <h1>Mypage</h1>
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
            <Button onClick={deleteToken} variant="outline-danger">Log out</Button>
            <Button type="submit" variant="primary">Modify</Button>
          </Form.Group>
        </Form>
      </div>
    </FormContainer>
  );
};

export default Mypage;