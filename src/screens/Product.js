import React, { useState, useEffect } from 'react';
import { useParams, useNavigate, Link } from "react-router-dom";
import axios from "axios";
import {Container, Row, Col, Button} from "react-bootstrap";

const Product = () => {
    const params = useParams();
    const navigate = useNavigate();
    const [product, setProduct] = useState({});

    const goBack = () => {
        navigate(-1);
    }

    const getProduct = async () => {
        try {
            const {data} = await axios.get(`http://localhost:5000/api/products/${params.productId}`)
            console.log(data);
            setProduct(data)
        } catch (error) {
            console.log(error)
        }
    }

    useEffect(() => {
        getProduct();
    }, []);


    return (
        <Container>
            <Row>
                <Col>
                    <h1>{product.name} ({product.brand})</h1>
                    <p><small>{product._id}</small></p>
                    <p>${product.price}</p>
                    <p><img src={product.image} alt="" style={{ width: 240 }} /></p>
                    <p>{product.description}</p>
                </Col>
            </Row>
            <Row className="justify-content-between">
                <Button onClick={goBack}>List</Button>
                <Link to={`modify`} className="btn btn-warning">Modify</Link>
            </Row>
        </Container>
    );
};

export default Product;