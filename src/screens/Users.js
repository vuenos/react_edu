import React, { useState, useEffect } from 'react';
import axios from "axios";
import {Container, Table, Row, Col} from "react-bootstrap";
import {LinkContainer} from "react-router-bootstrap"

const Users = () => {

    const [users, setUsers] = useState([]);

    const getUsers = async () => {
        //localstorage에 token 담기
        const token = localStorage.getItem("token")

        //API Networking을 위해 access token을 API서버에 제출해서 인증.
        const config = {
            headers: {
                Authorization: "Bearer " + token
            }
        }

        try {
            const { data } = await axios.get("http://localhost:5000/api/users", config);
            console.log("---------" + data);
            setUsers(data);
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
            <h1>Users</h1>
            <Row>
                <Col>
                    <Table striped bordered hover>
                        <thead>
                        <tr>
                            <th>ID</th>
                            <th>name</th>
                            <th>email</th>
                            <th>join date</th>
                            <th>isAdmin</th>
                        </tr>
                        </thead>
                        <tbody>
                        {users.map((user) => (

                            <LinkContainer to={`${user._id}`}>
                                <tr>
                                    <td>{user._id}</td>
                                    <td>{user.name}</td>
                                    <td>{user.email}</td>
                                    <td>{user.createdAt.slice(0, 10)}</td>
                                    <td>{user.isAdmin === true ? "admin" : "user"}</td>
                                </tr>
                            </LinkContainer>
                        ))}
                        </tbody>
                    </Table>
                </Col>

            </Row>
        </Container>
    );
};

export default Users;