import React, {useState, useEffect} from 'react';
import axios from "axios";

const Mypage = () => {

    const [profile, setProfile] = useState({});



    const getProfile = async () => {

        const token = localStorage.getItem('token');
        console.log(token);

        const config = {
            headers: {
                Authorization: `Bearer ${token}`
            }
        }

          try {
              const { data } = await axios.get("http://localhost:5000/api/users/profile", config)
              setProfile(data)
          } catch (error) {
              //
              console.log(error.message)
          }
    }

    useEffect(() => {
        getProfile();
    }, []);


    return (
        <div>
            <h1>Mypage</h1>
            <p>{profile.name}</p>
            <h1>{profile.email}</h1>
        </div>
    );
};

export default Mypage;