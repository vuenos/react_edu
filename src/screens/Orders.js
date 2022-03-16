import React from 'react';
import { getOrders } from "../orderData";
import { Outlet, Link } from "react-router-dom";
import { Container, Row, Col } from "react-bootstrap"

const Orders = () => {
  let orders = getOrders();

  return (
    <Container>
      <Row>
        <Col>
          <h1>Orders</h1>
          <ul>
            {orders.map((order) => (
              <li>
                <Link
                  to={`/orders/${order.number}`}
                  key={order.number}
                >
                  {order.name}
                </Link>
              </li>
            ))}
          </ul>
        </Col>
      </Row>
    </Container>
  );
};

export default Orders;