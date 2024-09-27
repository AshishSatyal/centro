import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.jsx";
import "./index.css";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Signup from "./pages/Signup.jsx";
import Login from "./pages/Login.jsx";
import ForgotPassword from "./pages/ForgotPassword.jsx";
import ResetPassword from "./pages/ResetPassword.jsx";
import Product from "./pages/Product.jsx";
import AddProduct from "./pages/AddProduct.jsx";
import ProductPage from "./pages/ProductPage.jsx";
import Layout from "./component/Layout.jsx";
import Search from "./pages/Search.jsx";
import { AuthProvider } from "./context/AuthContext.jsx";
import Saved from "./pages/Saved.jsx";
ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <Router>
      <AuthProvider>
        <Routes>
          <Route path='/signup' element={<Signup />} />
          <Route path='/login' element={<Login />} />
          <Route path='/forgotpassword' element={<ForgotPassword />} />
          <Route path={`/reset-password`} element={<ResetPassword />} />
          <Route path={`/product`} element={<Product />} />
          <Route path='' element={<Layout />}>
            <Route path='/' element={<App />} />
            <Route path={`/add-product`} element={<AddProduct />} />
            <Route path={`/product/:id`} element={<ProductPage />} />
            <Route path='/search/:query' element={<Search />} />
            <Route path='/saved-product' element={<Saved />} />
          </Route>
        </Routes>
      </AuthProvider>
    </Router>
  </React.StrictMode>
);
