import React, {useEffect, useState} from 'react';
import { useParams } from "react-router-dom";
import axios from "axios";
import {Container, Row, Col} from "react-bootstrap";


const User = () => {
    let params = useParams();//App.js Router에서 정의됨

    const [user, setUser] = useState({});

    const getUsers = async () => {

        const token = localStorage.getItem('token')

        const config = {
            headers: {
                Authorization: "Bearer " + token
            }
        }

        try {
            const { data } = await axios.get(`http://localhost:5000/api/users/${params.userId}`, config);
            setUser(data);
        } catch (error) {
            //
            console.log(error);
        }
    }

    useEffect(() => {
        getUsers();
    }, []);

    return (
        <Container>
            <Row>
                <Col>
                    <h2>{user.email}</h2>
                    <p>{user.name}</p>
                </Col>
            </Row>
        </Container>
    );
};

export default User;
