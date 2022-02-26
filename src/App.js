import React from 'react';
import {Route, Routes} from "react-router-dom";
import Layout from "./Layout";
import {Home, Order, Orders, Products, Product, Users, User, Login, Mypage} from "./screens";

const App = () => {
    return (
        <div>
            <Routes>
                <Route path="/" element={<Layout />}>
                    <Route index element={<Home />} />
                    <Route path="users" element={<Users />} />
                    <Route path="users/:userId" element={<User />} />
                    <Route path="products" element={<Products />}>
                        <Route index element={<div>Select an orders</div>} />
                        <Route path=":goodsNo" element={<Product />} />
                    </Route>
                    <Route path="orders" element={<Orders />}>
                        <Route index element={
                            <div style={{ padding: "1rem" }}>Select an invoices</div>
                        } />
                        <Route path=":orderId" element={<Order />} />
                    </Route>

                    <Route path="login" element={<Login />} />
                    <Route path="mypage" element={<Mypage />} />

                    <Route path="*" element={
                        <div style={{ padding: "1rem" }}>There's nothing here!</div>
                    } />
                </Route>
            </Routes>
        </div>
    );
};

export default App;