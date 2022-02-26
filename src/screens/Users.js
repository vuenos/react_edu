import React, { useState, useEffect } from 'react';
import axios from "axios";
import { Link } from "react-router-dom"

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
        <div>
            <h1>Users</h1>
            <ul>
                {users.map((user) => (
                    <li>
                        <Link to={`/Users/${user.id}`}>{user.name}</Link>
                    </li>
                ))}
            </ul>
        </div>
    );
};

export default Users;