import { Route, Routes, useNavigate } from "react-router-dom";
import Home from "../pages/Home/Home";
import Auth from "../pages/authentication";
import Profile from "../pages/Profile";
import { useSelector } from "react-redux";
import Products from "../pages/Products/Products";
import ProductSubcategory from "../pages/Products/ProductSubcategory";
import ProductDetail from "../pages/Products/ProductDetail";
import { useEffect } from "react";
const Pagelinks = () => {
  const navigate = useNavigate();
  const isLoggedIn = useSelector((state) => state.user.isLoggedIn);

  return (
    <Routes>
      <Route path="/" exact element={<Home />} />
      {!isLoggedIn && <Route path="/login" element={<Auth />} />}
      <Route
        path="/products/cat=:category"
        exact
        element={<ProductSubcategory />}
      />
      <Route
        path="/products/cat=:category/sub=:subcategory"
        exact
        element={<Products />}
      />
      <Route
        path="/products/cat=:category/sub=:subcategory/product=:prod"
        exact
        element={<ProductDetail />}
      />
      {isLoggedIn && (
        <Route path="/profile/:user" exact element={<Profile />} />
      )}
      <Route path="*" element={<Home/>}/ >
    </Routes>
  );
};

export default Pagelinks;
