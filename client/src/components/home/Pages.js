import React, { useContext } from "react";
import { Routes, Route } from "react-router-dom";
import Products from "./products/Products";
import DetailProduct from "./detailProduct/DetailProduct";
import Login from "./auth/Login";
import Register from "./auth/Register";
import OrderHistory from "./history/OrderHistory";
import OrderDetails from "./history/OrderDetails";
import Cart from "./cart/Cart";
import NotFound from "./utils/not_found/NotFound";
import Categories from "./categories/Categories";
import CreateProduct from "./createProduct/CreateProduct";

import { GlobalState } from "../../GlobalState";

function Pages() {
  const state = useContext(GlobalState);
  const [islogged] = state.userAPI.islogged;
  const [isAdmin] = state.userAPI.isAdmin;

  return (
    <Routes>
      <Route path="/" element={<Products />} />
      <Route path="/detai/:id" element={<DetailProduct />} />
      <Route path="/login" element={islogged ? <NotFound /> : <Login />} />
      <Route
        path="/register"
        element={islogged ? <NotFound /> : <Register />}
      />
      <Route
        path="/category"
        element={isAdmin ? <Categories /> : <NotFound />}
      />
      <Route
        path="/create_product"
        element={isAdmin ? <CreateProduct /> : <NotFound />}
      />
      <Route
        path="/edit_product/:id"
        element={isAdmin ? <CreateProduct /> : <NotFound />}
      />

      <Route
        path="/history"
        element={islogged ? <OrderHistory /> : <NotFound />}
      />
      <Route
        path="/history/:id"
        element={islogged ? <OrderDetails /> : <NotFound />}
      />

      <Route path="/cart" element={<Cart />} />

      <Route path="*" element={<NotFound />} />
    </Routes>
  );
}

export default Pages;
