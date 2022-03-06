import React, { useState, useEffect } from 'react';
import axios from "axios";
import { Link } from "react-router-dom"
import { FormContainer } from "../components"
import {Container, Table, Row, Col} from "react-bootstrap";

const Users = () => {

    const [users, setUsers] = useState([]);

    const getUsers = async () => {
        const token = localStorage.getItem("token")

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
                        <tr>
                            <td>{user._id}</td>
                            <td>{user.name}</td>
                            <td>{user.email}</td>
                            <td>{user.createdAt.slice(0, 10)}</td>
                            <td>{user.isAdmin === true ? "admin" : "user"}</td>
                        </tr>
                    ))}
                    </tbody>
                </Table>

            </Row>
        </Container>
    );
};

export default Users;