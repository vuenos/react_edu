import React, {useEffect, useState} from 'react';
import { useParams } from "react-router-dom";
import axios from "axios";

const User = () => {
    let params = useParams();

    const [users, setUsers] = useState([]);

    const getUsers = async () => {
        try {
            const { data } = await axios.get(`https://jsonplaceholder.typicode.com/users/${params.userId}`);
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
            <h2>{params.userId}, {users.name}</h2>
        </div>
    );
};

export default User;
