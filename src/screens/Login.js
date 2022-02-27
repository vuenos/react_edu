import React, { useState } from 'react';
import {Button, Container, Form, FormLabel} from "react-bootstrap";

const Login = () => {

    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");


    const userInput = {
        email: email,
        password: password
    }
    console.log(userInput)


    return (
        <Container>
            <h1>Sign in</h1>
            <Form>
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