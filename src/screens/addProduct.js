import React, {useState, useEffect} from 'react';
import { useNavigate } from "react-router-dom";
import {Button, Col, Form, FormLabel, Row} from "react-bootstrap";
import { FormContainer, Loader, Message } from "../components";
import { useDispatch, useSelector } from "react-redux";
import { addProduct } from "../actions/productsActions"
import user from "./User";

const AddProduct = () => {

  const dispatch = useDispatch();

  //입력값 상태관리
  const navigate = useNavigate();

  const goBack = () => {
    navigate(-1);
  }

  const [name, setName] = useState("");
  const [price, setPrice] = useState("");
  //const [image, setImage] = useState(null);
  const [brand, setBrand] = useState("");
  const [category, setCategory] = useState("");
  const [countInStock, setCountInStock] = useState("");
  const [description, setDescription] = useState("");

  const productAdd = useSelector(state => state.productAdd);
  const { loading, success, error } = productAdd;

  const addProductHandler = (e) => {
    e.preventDefault();
    console.log("12121212121")
    const userInput = {
      name,
      price,
      brand,
      category,
      countInStock,
      description
    }
    console.log(userInput)
    dispatch(addProduct(userInput));
  }

  useEffect(() => {
    if (success) {
      navigate('/products')
    }
  }, [success, navigate]);


  // const [loading, setLoading] = useState(false);
  // const [error, setError] = useState("");

  // const token = localStorage.getItem('token');
  // const config = {
  //   headers: {
  //     Authorization: `Bearer ${token}`
  //   }
  // }

  // const addProductHandler = async (e) => {
  //   e.preventDefault();
  //
  //   // 상품 등록값
  //   const addInput = {
  //     name: name,
  //     price: price,
  //     //image: image,
  //     brand: brand,
  //     category: category,
  //     countInStock: countInStock,
  //     description: description
  //   }
  //
  //   // 빈 입력값 처리
  //   if (name === "") {
  //     setError("Please input name");
  //     return
  //   }
  //
  //   // API Network
  //   try {
  //     setLoading(true);
  //     const { data, status } = await axios.post("http://localhost:5000/api/products", addInput, config);
  //     if (status === 201) {
  //
  //       setTimeout(() => {
  //         setLoading(false);
  //         alert('Add Success!');
  //       }, 1500);
  //       navigate("/");
  //     }
  //
  //   } catch (error) {
  //     setError(error.response.data.message);
  //     setLoading(false)
  //   }
  //
  // }

  return (
    <FormContainer>
      <h1>Add Product</h1>

      {error && <Message variant="danger">{error}</Message>}
      {loading && <Loader />}

      <Form onSubmit={addProductHandler}>
        <Form.Group controlId={name}>
          <FormLabel>Name</FormLabel>
          <Form.Control
            type="text"
            placeholeder="Enter product name"
            value={name}
            onChange={(e) => setName(e.target.value)}
          />
          <Form.Control.Feedback>Looks good!</Form.Control.Feedback>
        </Form.Group>

        <Form.Group controlId={price}>
          <FormLabel>Price</FormLabel>
          <Form.Control
              required
              type="text"
            placeholeder="Enter product price"
            value={price}
            onChange={(e) => setPrice(e.target.value)}
          />
        </Form.Group>

        {/*<Form.Group controlId={image}>*/}
        {/*  <FormLabel>Product image</FormLabel>*/}
        {/*  <Form.Control*/}
        {/*    type="file"*/}
        {/*    placeholeder="Add to product photo"*/}
        {/*    value={image}*/}
        {/*    onChange={(e) => setImage(e.target.value)}*/}
        {/*  />*/}
        {/*</Form.Group>*/}

        <Form.Group controlId={brand}>
          <FormLabel>Brand</FormLabel>
          <Form.Control
            type="text"
            placeholeder="Enter brand name"
            value={brand}
            onChange={(e) => setBrand(e.target.value)}
          />
        </Form.Group>

        <Form.Group controlId={category}>
          <FormLabel>Category</FormLabel>
          <Form.Control
            type="text"
            placeholeder="Enter category name"
            value={category}
            onChange={(e) => setCategory(e.target.value)}
          />
        </Form.Group>

        <Form.Group controlId={countInStock}>
          <FormLabel>Instock</FormLabel>
          <Form.Control
            type="text"
            placeholeder="Enter instock"
            value={countInStock}
            onChange={(e) => setCountInStock(e.target.value)}
          />
        </Form.Group>

        <Form.Group controlId={description}>
          <FormLabel>Description</FormLabel>
          <Form.Control
            as="textarea"
            rows={5}
            placeholeder="Enter description"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
          />
        </Form.Group>
        <br />

        <Row className="d-flex justify-content-between">
          <Button onClick={goBack}>Cancel</Button>

          <div>
            <Button type="reset" variant="warning">Reset</Button>
            <Button variant="success" className="ml-2" type="submit">Confirm</Button>
          </div>
        </Row>

      </Form>
    </FormContainer>
  );
};

export default AddProduct;
