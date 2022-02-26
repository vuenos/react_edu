import React from 'react';
import { BrowserRouter, Routes, Route } from "react-router-dom";
import {Users, Products, Orders, Order} from "./screens"
import {Header, Footer} from "./components"

const App = () => {
    return (
        <BrowserRouter>
            <Header />
                <Routes>
                    <Route path="/" element={<Users />} />
                    <Route path="users" element={<Users />} />
                    <Route path="products" element={<Products />} />
                    <Route path="orders" element={<Orders />}>
                        <Route index element={
                            <div style={{ padding: "1rem" }}>Select an invoices</div>
                        } />
                        <Route path=":orderId" element={<Order />} />
                    </Route>
                    <Route pth="*" element={
                        <div style={{ padding: "1rem" }}>There's nothing here!</div>
                    } />
                </Routes>
            <Footer />
        </BrowserRouter>
    );
};

export default App;