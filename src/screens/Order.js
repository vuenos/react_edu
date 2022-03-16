import React from 'react';
import { useParams, useNavigate } from "react-router-dom";
import { getOrder } from "../orderData";
import {Container, Row, Col, Button} from "react-bootstrap";


const Order = () => {
  let params = useParams();
  const navigate = useNavigate();
  let order = getOrder(parseInt(params.orderId, 10))

  return (
    <Container>
      <Row>
        <Col>
          <h2>Order: #{params.orderId}</h2>
          <p>
            {order.name}
          </p>
          <p>{order.due}</p>
        </Col>
      </Row>
      <Row className="justify-content-end">
        <Button onClick={() => navigate(-1)}>Order liist</Button>
      </Row>
    </Container>
  );
};

export default Order;