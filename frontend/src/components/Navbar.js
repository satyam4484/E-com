import { NavLink } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { userActions } from "../store/auth";
import { Fragment, useEffect, useState } from "react";
import logo from "../sop.png";
import Cart from "./Cart/Cart";

const Navbar = () => {
  const isLoggedIn = useSelector((state) => state.user.isLoggedIn);

  const dispatch = useDispatch();
  // console.log(username);
  const userLogoutHandler = () => {
    dispatch(userActions.userLogout());
  };
  return (
    <nav className="navbar sticky-top navbar-expand-lg navbar-dark bg-dark">
      <div className="container-fluid">
        <NavLink to="/" className="navbar-brand mx-auto ">
          <img src={logo} height="28" alt="Shopify" className="w-100" />
        </NavLink>
        <button
          type="button"
          className="navbar-toggler"
          data-bs-toggle="collapse"
          data-bs-target="#navbarCollapse"
        >
          <span className="navbar-toggler-icon"></span>
        </button>
        <div className="collapse navbar-collapse" id="navbarCollapse">
          <div className="navbar-nav">
            <NavLink to="/" className="nav-item nav-link">
              Home
            </NavLink>
          </div>
          <div className="input-group mx-auto">
            <input
              type="text"
              className="form-control "
              placeholder="Search......................."
            />
          </div>
          <div className="navbar-nav ms-auto">
            {!isLoggedIn && (
              <NavLink to="/login" className="nav-item nav-link">
                Login
              </NavLink>
            )}
            {isLoggedIn && (
              <Fragment>
                <NavLink
                  to="/cart"
                  className="cart position-relative d-inline-flex mx-1"
                  aria-label="View your shopping cart"
                >
                  <Cart/>
                </NavLink>
                <NavLink
                  to={{
                    pathname: `/profile/${JSON.parse(localStorage.getItem("user")).username}`,
                  }}
                  className="nav-item nav-link"
                >
                  {JSON.parse(localStorage.getItem("user")).username}
                </NavLink>
                <NavLink
                  to="/"
                  className="nav-item nav-link"
                  onClick={userLogoutHandler}
                >
                  logout
                </NavLink>
              </Fragment>
            )}
          </div>
        </div>
      </div>
    </nav>
  );
};
export default Navbar;
