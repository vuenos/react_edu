import React from 'react';
import {Route, Routes} from "react-router-dom";
import Layout from "./Layout";
import {Home, Order, Orders, Products, Product, AddProduct, ModifyProduct, Users, User, Login, Mypage, NotFound} from "./screens";
import { Provider } from 'react-redux';
import store from './store'

const App = () => {
  return (
    <Provider store={store}>
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route index element={<Home />} />
          <Route path="users" element={<Users />} />
          <Route path="users/:userId" element={<User />} />
          <Route path="products" element={<Products />} />
          <Route path="products/:productId" element={<Product />} />
          <Route path="products/:productId/modify" element={<ModifyProduct />} />
          <Route path="products/addProduct" element={<AddProduct />} />
          <Route path="orders" element={<Orders />} />
          <Route path="orders/:orderId" element={<Order />} />
          <Route path="login" element={<Login />} />
          <Route path="mypage" element={<Mypage />} />

          <Route path="*" element={<NotFound />} />
        </Route>
      </Routes>
    </Provider>
  );
};

export default App;