import React from 'react';
import { useParams } from "react-router-dom";
import { getOrder } from "../orderData";

const Order = () => {
    let params = useParams();
    let order = getOrder(parseInt(params.orderId, 10))

    return (
        <div>
            <h2>Order: #{params.orderId}</h2>
            <p>
                {order.name}
            </p>
            <p>{order.due}</p>
        </div>
    );
};

export default Order;