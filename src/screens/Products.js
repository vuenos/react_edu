import React, {useState, useEffect} from 'react';
import { Link } from "react-router-dom"
import {Table, Container, Row, Col, Button} from "react-bootstrap";
import {LinkContainer} from "react-router-bootstrap";
import { Loader } from "../components";
import ReactPaginate from "react-paginate";
import {useSelector, useDispatch} from "react-redux";
import {listProducts} from "../actions/productsActions";

const Products = () => {
  const dispatch = useDispatch();

  const [pageNumber, setPageNumber] = useState(0);

  const producstPerPage = 5;
  const pageVisited = pageNumber * producstPerPage;
  const productList = useSelector((state) => state.productList)
  const { loading, products, error } = productList;

  console.log("+++++++++++++++", products)


  useEffect(() => {
    //getProducts();
    dispatch(listProducts())
  }, [dispatch, products]);

  const pageCount = Math.ceil(products.length / producstPerPage);
  const changePage = ({ selected }) => {
    setPageNumber(selected);
  }

  return (
    <Container>
      <h1>Products</h1>
      <Row>
        <Col>
          {loading && <Loader />}
          <Table striped bordered hover>
            <thead>
            <tr>
              <th>Photo</th>
              <th>Name</th>
              <th>Price</th>
              <th>CountInstock</th>
              <th>Brand</th>
            </tr>
            </thead>
            <tbody>
            {products && products
              .map((product, index) => (
              <LinkContainer to={`${product._id}`} key={product._id}>
                <tr>
                  <td><img src={product.image} alt="" style={{ width: 80 }} /></td>
                  <td>{product.name}</td>
                  <td>${product.price}</td>
                  <td>{product.countInStock} EA</td>
                  <td>{product.brand}</td>
                </tr>
              </LinkContainer>
            ))}
            </tbody>
          </Table>
        </Col>

      </Row>

      <Row>
        <ReactPaginate
          previousLabel={"Previous"}
          nextLabel={"Next"}
          pageCount={pageCount}
          onPageChange={changePage}
          containerClassName={"paginationBttns"}
          previousLinkClassName={"previousBttn"}
          nextLinkClassName={"nextBttn"}
          disabledClassName={"paginationDisabled"}
          activeClassName={"paginationActive"}
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