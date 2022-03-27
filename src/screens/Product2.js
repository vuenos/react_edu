import React, {useState,useEffect } from 'react';
import axios from "axios";


const Products = () => {
  //products 상태관리
  const [products, setProducts] = useState([]);

  const getProduct = async () => {
    try {
      const { data } = await axios.get("http://localhost:5000/api/products");
      setProducts(data);

    } catch (error) {
    }
  }

  useEffect(() => {
    getProduct();
  }, []);


  return (
    <div>
      {products.map(product => (
        <div>{product.name}</div>
      ))}
    </div>
  );
};

export default Products;
