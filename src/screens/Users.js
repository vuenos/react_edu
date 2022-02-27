import React, { useState, useEffect } from 'react';
import axios from "axios";
import { Link } from "react-router-dom"
import { FormContainer } from "../components"

const Users = () => {

    const [users, setUsers] = useState([]);

    const getUsers = async () => {
        try {
            const { data } = await axios.get("https://jsonplaceholder.typicode.com/users/");
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
        <FormContainer>
            <h1>Users</h1>
            <ul>
                {users.map((user) => (
                    <li>
                        <Link to={`/Users/${user.id}`}>{user.name}</Link>
                    </li>
                ))}
            </ul>
        </FormContainer>
    );
};

export default Users;