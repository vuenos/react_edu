import React, {useState, useEffect} from 'react';
import axios from "axios";
import {FormContainer} from "../components"
import { Form, FormLabel, Button } from "react-bootstrap"

const Mypage = () => {

    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");

    const token = localStorage.getItem('token');

    const config = {
        headers: {
            Authorization: `Bearer ${token}`
        }
    }

    const modifyHandler = async (e) => {
        e.preventDefault();



        const userInput = { name, email, password }

        try {
            const { data, status } = await axios.put("http://localhost:5000/api/users/profile", userInput, config)
            if (status === 200) {
                alert("Updated")

            }

        } catch (error) {
            console.log(error.message)
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
                    <Button type="submit" variant="primary">Modify</Button>
                </Form>
            </div>
        </FormContainer>
    );
};

export default Mypage;