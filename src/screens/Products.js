import React from 'react';
import { getGoods } from "../goodsData";
import { Outlet, Link } from "react-router-dom"

const Products = () => {
    let goods = getGoods()

    return (
        <div>
            <h1>Products</h1>
            <ul>
                {goods.result.data.map((good) => (
                    <li>
                        <Link
                            to={`/products/${good.goodsno}`}
                        >
                            {good.goodsnm}
                        </Link>
                    </li>
                ))}
            </ul>
            <Outlet />
        </div>
    );
};

export default Products;