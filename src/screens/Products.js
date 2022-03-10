import React, {useState, useEffect} from 'react';
import { Outlet, Link } from "react-router-dom"
import {Table, Container, Row, Col, Button} from "react-bootstrap";
import axios from "axios";
import {LinkContainer} from "react-router-bootstrap";
import { Loader, Pagination } from "../components";

const Products = () => {

  const [products, setProducts] = useState([]);

  const [loading, setLoading] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const [postPerPage, setPostPerPage] = useState(5);

  const getProducts = async () => {

    try {
      setLoading(true);
      const { data } = await axios.get("http://localhost:5000/api/products")

      setTimeout(() => {
        setLoading(false);
        console.log("++++++++++++++++++", data);
        setProducts(data.products);
        console.log(data.page.length());
      }, 0)
    } catch (error) {
      console.log(error.response.data.message)
    }
  }

  useEffect(() => {
    getProducts();
  }, []);

  //Get current posts
  const indexOfLastPost = currentPage * postPerPage;
  const indexOfFirstPost = indexOfLastPost - postPerPage;
  const currentPosts = products.slice(indexOfFirstPost, indexOfLastPost);

  const paginate = (pageNumber) => setCurrentPage(pageNumber)

  return (
    <Container>
      <h1>Products</h1>
      <Row>
        <Col>
          {loading && <Loader />}
          <Table striped bordered hover>
            <thead>
            <tr>
              <th>No</th>
              <th>Photo</th>
              <th>Name</th>
              <th>Price</th>
              <th>CountInstock</th>
              <th>Brand</th>
            </tr>
            </thead>
            <tbody>
            {products && products.map((product, index) => (
              <LinkContainer to={`${product._id}`}>
                <tr>
                  <td>{index + 1}</td>
                  <td><img src={product.image} alt="" style={{ width: 80 }} /></td>
                  <td>{product.name}</td>
                  <td>${product.price}</td>
                  <td>{product.countInStock} EA</td>
                  <td>{product.brand}</td>
                </tr>
              </LinkContainer>
            )).slice(indexOfFirstPost, indexOfLastPost)}
            </tbody>
          </Table>
        </Col>

      </Row>

      <Row>
        <Pagination
          postPerPage={postPerPage}
          totalPosts={products.length}
          paginate={paginate}
        />
      </Row>

      <Row className="d-flex justify-content-end mt-4">
        <Link to="addProduct">
          <Button variant="success">Add Product</Button>
        </Link>
      </Row>

      {/*<Container>*/}
      {/*    <Table striped bordered hover>*/}
      {/*        <thead>*/}
      {/*        <tr>*/}
      {/*            <th>#</th>*/}
      {/*            <th>First Name</th>*/}
      {/*            <th>Last Name</th>*/}
      {/*            <th>Username</th>*/}
      {/*        </tr>*/}
      {/*        </thead>*/}
      {/*        <tbody>*/}

      {/*        <tr>*/}
      {/*            <td>2</td>*/}
      {/*            <td>Jacob</td>*/}
      {/*            <td>Thornton</td>*/}
      {/*            <td>@fat</td>*/}
      {/*        </tr>*/}
      {/*        <tr>*/}
      {/*            <td>3</td>*/}
      {/*            <td colSpan={2}>Larry the Bird</td>*/}
      {/*            <td>@twitter</td>*/}
      {/*        </tr>*/}
      {/*        </tbody>*/}
      {/*    </Table>*/}
      {/*</Container>*/}
      {/*<Outlet />*/}
    </Container>
  );
};

export default Products;