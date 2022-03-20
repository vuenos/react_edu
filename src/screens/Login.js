import React, { useState, useEffect } from 'react';
import {Button, Form, FormLabel} from "react-bootstrap";
import { useDispatch, useSelector } from 'react-redux'
import {useNavigate} from "react-router-dom";
//import axios from "axios";
import { FormContainer, Loader, Message } from "../components"
import {login} from "../actions/userActions";

const Login = () => {
    const dispatch = useDispatch();
    const navigate = useNavigate();


    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    //const [loading, setLoading] = useState(false)
    //const [error, setError] = useState("");

    const userLogin = useSelector((state) => state.userLogin)
    const { loading, userInfo, error } = userLogin;

    const loginHandler = async (e) => {
        e.preventDefault();
        dispatch(login(email, password));
        //
        // // 사용자입력값
        // const userInput = {
        //     email: email,
        //     password: password
        // }
        //
        // // 사용자입력값이 비어있으면 에러메시지
        // if (email === "" && password === "") {
        //     setError("Please Check email, password")
        //     return
        // }
        //
        // // API 네트워킹
        // try {
        //
        //     setLoading(true);
        //     const {data, status} = await axios.post("http://localhost:5000/api/users/login", userInput)
        //     //data token 로컬스토리지(브라우자) 저장
        //     console.log(status);
        //     if (status === 200) {
        //         localStorage.setItem("token", data.token);
        //
        //         setTimeout(() => {
        //             setLoading(false);
        //             navigate("/mypage");
        //         }, 1500);
        //     }
        //
        // } catch (error) {
        //     console.log(error.response.data.message);
        //     setError(error.response.data.message);
        //     setLoading(false);
        // }

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