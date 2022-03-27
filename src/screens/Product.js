import React, {  useEffect } from 'react';
import { useParams, useNavigate, Link } from "react-router-dom";
import {Container, Row, Col, Button} from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { detailProduct } from "../actions/productsActions"
import {Loader} from "../components";

const Product = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const params = useParams();
  console.log(params)

  const productDetail = useSelector((state) => state.productDetail)
  const { loading, product, error } = productDetail;
  console.log("++++++++", product)

  const goBack = () => {
    navigate(-1);
  }

  useEffect(() => {
    if (!product._id || product._id !== params.productId) {
      dispatch(detailProduct(params.productId))
    }
  }, [dispatch, params]);


  return (
    <Container>
      <Row>
        <Col>
          {loading && <Loader />}
          <h1>{product.name} ({product.brand})</h1>
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