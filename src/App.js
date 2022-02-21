import React from 'react';
import { BrowserRouter, Routes, Route } from "react-router-dom";
import {Users, Products, Orders} from "./screens"
import {Header, Footer} from "./components"

const App = () => {
    return (
        <BrowserRouter>
            <Header />
          <Routes>
            <Route path="/" element={<Users />} />
            <Route path="/products" element={<Products />} />
            <Route path="/orders" element={<Orders />} />
          </Routes>
            <Footer />
        </BrowserRouter>
    );
};

export default App;