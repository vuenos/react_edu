import React from 'react';
import { useParams } from "react-router-dom"
import { getGood } from "../goodsData";

const Product = () => {
    let params = useParams();
    let good = getGood(parseInt(params.goodsNo, 10))

    return (
        <div>
            <h1>#{params.goodsNo}</h1>
            <p>{good.goodsnm}</p>
        </div>
    );
};

export default Product;