import React, { useState } from 'react';
import {Button, Container, Form, FormLabel} from "react-bootstrap";
import {useNavigate} from "react-router-dom";
import axios from "axios";

const Login = () => {

    const navigate = useNavigate();

    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");


    const loginHandler = async (e) => {
        e.preventDefault();

        // 사용자입력값
        const userInput = {
            email: email,
            password: password
        }

        // 네트워킹
        try {
            const { data, status } = await axios.post("http://localhost:5000/api/users/login", userInput)

            // data token 로컬스토리지(브라우자) 저장
            if (status === 200) {
                localStorage.setItem("token", data.token)
                navigate("/mypage")
            }


        } catch (error) {
            console.log(error.message)
        }


    }

    return (
        <Container>
            <h1>Sign in</h1>
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
        </Container>
    );
};

export default Login;