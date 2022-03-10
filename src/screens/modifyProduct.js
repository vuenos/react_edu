import React, {useState, useEffect} from 'react';
import { useNavigate, useParams } from "react-router-dom";
import axios from "axios";
import {Button, Col, Form, FormLabel, Row} from "react-bootstrap";
import { FormContainer, Loader, Message } from "../components"

const AddProduct = () => {
  const params = useParams();
  //입력값 상태관리
  const navigate = useNavigate();

  const goBack = () => {
    navigate(-1);
  }


  const [name, setName] = useState("");
  const [price, setPrice] = useState("");
  const [image, setImage] = useState(null);
  const [curImage, setCurImage] = useState("");
  const [brand, setBrand] = useState("");
  const [category, setCategory] = useState("");
  const [countInStock, setCountInStock] = useState("");
  const [description, setDescription] = useState("");

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const [delProduct, setDelProduct] = useState(null);

  const token = localStorage.getItem('token');
  const config = {
    headers: {
      Authorization: `Bearer ${token}`
    }
  }

  const addProductHandler = async (e) => {
    e.preventDefault();

    // 상품 등록값
    const addInput = {
      name: name,
      price: price,
      //image: image,
      brand: brand,
      category: category,
      countInStock: countInStock,
      description: description
    }

    // 빈 입력값 처리
    if (name === "" && price === "" && image === "") {
      setError("Please check input");
      return
    }

    // API Network
    try {
      setLoading(true);
      const { data, status } = await axios.put(`http://localhost:5000/api/products/${params.productId}`, addInput, config);
      console.log(status);
      if (status === 200) {
          setLoading(false);
          console.log("Modify status: " + status);
          alert('Add Success!');
      }

    } catch (error) {
      console.log("Error: " + error.response.data.message);
      setError(error.response.data.message);
      setLoading(false)
    }

  }


  //Delete network
  const deleteProduct = async () => {
    try {
      const { data, status } = await axios.delete(`http://localhost:5000/api/products/${params.productId}`, config);
      setDelProduct(data);
      if (status === 200) {
        console.log(status);
        alert("Delete Success!!");
        navigate("/products");
      }
    } catch (error) {
      console.log(error.response.data.message);
      setError(error.response.data.message);
    }
  }


  //Get product data
  const getProduct = async () => {
    try {
      const { data } = await axios.get(`http://localhost:5000/api/products/${params.productId}`);
      setName(data.name);
      setPrice(data.price);
      setCurImage(data.image);
      setBrand(data.brand);
      setCategory(data.category);
      setCountInStock(data.countInStock);
      setDescription(data.description);

    } catch (error) {
      console.log(error.message);
    }
  }

  useEffect(() => {
    getProduct();
  }, []);



  return (
    <FormContainer>
      <h1>Modify Product</h1>
      <p>ID: {params.productId}</p>

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
        </Form.Group>

        <Form.Group controlId={price}>
          <FormLabel>Price</FormLabel>
          <Form.Control
            type="text"
            placeholeder="Enter product price"
            value={price}
            onChange={(e) => setPrice(e.target.value)}
          />
        </Form.Group>

        <Form.Group controlId={image}>
          <FormLabel>Product image</FormLabel>
          <p><img src={`${curImage}`} alt="" style={{ width: '80px' }} /></p>

          {/*<Form.Control*/}
          {/*  type="file"*/}
          {/*  placeholeder="Add to product photo"*/}
          {/*  value={image}*/}
          {/*  onChange={(e) => setImage(e.target.value)}*/}
          {/*/>*/}
        </Form.Group>

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
              <Button type="button" variant="danger" onClick={deleteProduct}>Delete</Button>
              <Button type="submit" variant="success" className="ml-2">Confirm</Button>
            </div>
        </Row>

      </Form>
    </FormContainer>
  );
};

export default AddProduct;
