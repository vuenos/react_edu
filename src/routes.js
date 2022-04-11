import { useRoutes } from "react-router-dom";
import {Home, Order, Orders, Products, Product, AddProduct, ModifyProduct, Users, User, Login, RegisterUser, Mypage, UpdateProfile, NotFound} from "./screens";
import Layout from "./Layout";

const AppRoutes = () => {
  let element = useRoutes([
    {
      path: "/",
      element: <Layout />,
      children: [
        { path: "/", element: <Home /> },
        { path: "users", element: <Users /> },
        { path: "users/userId", element: <User /> },
        { path: "products", element: <Products /> },
        { path: "products/:productId", element: <Product /> },
        { path: "products/addProduct", element: <AddProduct /> },
        { path: "products/:productId/modify", element: <ModifyProduct /> },
        { path: "products/page/:pageNumber", element: <Products /> },
        { path: "search/:keyword/page/:pageNumber", element: <Products /> },
        { path: "search/:keyword", element: <Products /> },
        { path: "admin/productlist/:pageNumber", element: <Products /> },
        { path: "orders", element: <Orders /> },
        { path: "orders/:orderId", element: <Order /> },
        { path: "login", element: <Login /> },
        { path: "register", element: <RegisterUser /> },
        { path: "mypage", element: <Mypage /> },
        { path: "updateProfile", element: <UpdateProfile /> },
        { path: "*", element: <NotFound /> },
      ]
    },
  ]);
  return element;
}

export default AppRoutes;