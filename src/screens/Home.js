import React, { useEffect }  from 'react';
import { Container, Row, Col, ListGroup, Badge } from "react-bootstrap";
import { Loader, Message } from "../components";
import { useDispatch, useSelector } from "react-redux";
import { getUsersList } from "../actions/userActions"
import { useNavigate } from "react-router-dom";

const Home = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const userList = useSelector((state) => state.userList);
  const { loading, users, error } = userList;

  const userLogin = useSelector((state) => state.userLogin);
  const { userInfo } = userLogin;

  useEffect(() => {
    if(!userInfo) {
      navigate('/login')
    } else {
      dispatch(getUsersList())
    }
  }, [dispatch, navigate, userInfo]);


  return (
    <Container>
      <Row className="justify-content-md-cente">
        <Col xs={12} md={6}>
          <h1>Home</h1>
          {error && <Message variant="danger">{error}</Message>}
          {loading && <Loader />}
          <ListGroup as="ol" numbered>
            Total Users: {users && users.length}
            {users && users.map((user) => (
              <ListGroup.Item
                as="li"
                className="d-flex justify-content-between align-items-start"
                key={user._id}
              >
                <div className="ms-2 me-auto">
                  <div className="fw-bold">{user.name}</div>
                  {user.email}
                </div>
                <Badge bg="success" pill>
                  {user.isAdmin === "true" ? "Admin" : "User"}
                </Badge>
              </ListGroup.Item>
            ))}
          </ListGroup>
        </Col>
      </Row>
    </Container>
  );
};

export default Home;