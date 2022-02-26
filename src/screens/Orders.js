import React from 'react';
import { getOrders } from "../orderData";
import { Outlet, Link } from "react-router-dom"

const Orders = () => {
    let orders = getOrders();

    return (
        <div>
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
            <Outlet />
        </div>
    );
};

export default Orders;