import {Home, Order, Orders, Products, Product, AddProduct, ModifyProduct, Users, User, Login, RegisterUser, Mypage, UpdateProfile, NotFound} from "./screens";

function Routes() {
  const element = useRoutes([
    { path: "/", element: <Home /> },
    { path: "users", element: <Users /> },
  ]);

  return element;
}