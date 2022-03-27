import React, {useState, useEffect} from 'react';
import { useNavigate, useParams } from "react-router-dom";
import axios from "axios";
import {Button, Col, Form, FormLabel, Row} from "react-bootstrap";
import { FormContainer, Loader, Message } from "../components";
import { useDispatch, useSelector } from "react-redux";
import { detailProduct } from "../actions/productsActions";
import { updateProduct } from "../actions/productsActions";

const AddProduct = () => {
  const dispatch = useDispatch();
  const params = useParams();

  const [name, setName] = useState("");
  const [price, setPrice] = useState("");
  const [image, setImage] = useState(null);
  const [curImage, setCurImage] = useState("");
  const [brand, setBrand] = useState("");
  const [category, setCategory] = useState("");
  const [countInStock, setCountInStock] = useState("");
  const [description, setDescription] = useState("");

  const [message, setMessage] = useState("");

  const [delProduct, setDelProduct] = useState(null);

  const productDetail = useSelector((state) => state.productDetail)
  const { loading, product, error } = productDetail;

  console.log("+++++++++++", product)

  const productUpdate = useSelector((state) => state.productUpdate);
  const { success } = productUpdate;

  //입력값 상태관리
  const navigate = useNavigate();

  const goBack = () => {
    navigate(-1);
  }

  const addProductHandler = async (e) => {
    e.preventDefault();

    // 상품 등록값
    // const addInput = {
    //   name: name,
    //   price: price,
    //   //image: image,
    //   brand: brand,
    //   category: category,
    //   countInStock: countInStock,
    //   description: description
    // }

    // 빈 입력값 처리
    // if (name === "" && price === "") {
    //   setError("Please check input");
    //   return
    // }

  }


  //Delete network
  const deleteProduct = async () => {
    // try {
    //   const { data, status } = await axios.delete(`http://localhost:5000/api/products/${params.productId}`, config);
    //   setDelProduct(data);
    //   if (status === 200) {
    //     alert("Delete Success!!");
    //     navigate("/products");
    //   }
    // } catch (error) {
    //   setError(error.response.data.message);
    // }
  }

  const updatedProduct = (e) => {
    e.preventDefault();
    dispatch(updateProduct(params.productId, {name, price, description, brand, category, countInStock}))
  }


  useEffect(() => {
    if (success) {
      setMessage("Updated!")
    } else {
      if (!product._id || product._id !== params.productId) {
        dispatch(detailProduct(params.productId))

      } else {
        setName(product.name)
        setPrice(product.price)
        setDescription(product.description)
        setBrand(product.brand)
        setCategory(product.category)
        setCountInStock(product.countInStock)
      }
    }
  }, [dispatch, success, product]);



  return (
    <FormContainer>
      <h1>Modify Product</h1>
      <p>ID: {params.productId}</p>

      {error && <Message variant="danger">{error}</Message>}
      {loading && <Loader />}
      {message && <Message>{message}</Message>}

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
            value={`$ ${price}`}
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
              <Button onClick={updatedProduct} variant="success" className="ml-2">Update</Button>
            </div>
        </Row>

      </Form>
    </FormContainer>
  );
};

export default AddProduct;
