import React, { useEffect } from 'react';
import { Container, Table, Row, Col } from "react-bootstrap";
import {Loader, Message} from "../components"
import { LinkContainer } from "react-router-bootstrap";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { getUsersList } from "../actions/userActions"

const Users = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const userList = useSelector((state) => state.userList);
  const { loading, users, error } = userList;

  const userLogin = useSelector((state) => state.userLogin);
  const { userInfo } = userLogin;

  useEffect(() => {
    if (!userInfo) {
      navigate('/login');
    } else {
      dispatch(getUsersList());
    }
  }, [dispatch, navigate, userInfo]);


  return (
    <Container>
      <h1>Users</h1>
      <Row>
        <Col>
          {error && <Message variant="danger">{error}</Message>}
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
            {loading && <Loader />}
            {users && users.map((user) => (

              <LinkContainer to={`${user._id}`} key={user._id}>
                <tr>
                  <td>{user._id}</td>
                  <td>{user.name}</td>
                  <td>{user.email}</td>
                  <td>{user.createdAt.slice(0, 10)}</td>
                  <td>{user.isAdmin === "true" ? "admin" : "user"}</td>
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