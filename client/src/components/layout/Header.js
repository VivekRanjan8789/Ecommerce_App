import React, { useContext, useEffect, useState } from "react";
import { Link, NavLink } from "react-router-dom";
import { AuthContext } from "../../context/Auth";
import { CartContext } from "../../context/Cart";
import toast from "react-hot-toast";
import SearchInput from "../Form/SearchInput";
import useCategory from "../../hooks/useCategory";
import { Badge } from "antd";

const Header = () => {
  const { Auth, setAuth } = useContext(AuthContext);
  const { cart } = useContext(CartContext);
  const  categories  = useCategory();

  const handleDashboard = () => {
    console.log(Auth);
  };
  const handleLogout = () => {
    setAuth({
      ...Auth,
      user: null,
      token: "",
    });
    localStorage.removeItem("auth");
    toast.success("logout successfully");
  };


  return (
    <div>
      <nav className="navbar navbar-expand-lg bg-body-tertiary">
        <div className="container-fluid">
          <button
            className="navbar-toggler"
            type="button"
            data-bs-toggle="collapse"
            data-bs-target="#navbarTogglerDemo01"
            aria-controls="navbarTogglerDemo01"
            aria-expanded="false"
            aria-label="Toggle navigation"
          >
            <span className="navbar-toggler-icon"></span>
          </button>
          <div className="collapse navbar-collapse" id="navbarTogglerDemo01">
            <Link className="navbar-brand"> 🛒 Ecommerce App</Link>
            <div className="ms-auto">
              <SearchInput />
            </div>
            <ul className="navbar-nav ms-auto mb-2 mb-lg-0">
              <li className="nav-item">
                <NavLink to="/" className="nav-link">
                  Home
                </NavLink>
              </li>

              <div>
                <li className="nav-item"></li>
                <li className="nav-item dropdown">
                  <Link
                    className="nav-link dropdown-toggle"
                    to = {"/"}
                    data-bs-toggle="dropdown"
                  >
                    Category
                  </Link>
                  <ul className="dropdown-menu">
                        <li>
                          <Link className="dropdown-item" to = {"/categories"}>All Categories</Link>
                        </li>
                    {categories.map((c) => {
                      return (
                        <li key={c._id}>
                          <Link className="dropdown-item" to = {`/category/${c.slug}`}>{c?.name}</Link>
                        </li>
                      );
                    })}
                  </ul>
                </li>
              </div>

              {Auth.user !== null ? (
                <li className="nav-item dropdown">
                  <NavLink
                    className="nav-link dropdown-toggle "
                    style={{ textDecoration: "none" }}
                    role="button"
                    data-bs-toggle="dropdown"
                    aria-expanded="false"
                  >
                    {Auth?.user?.name}
                  </NavLink>
                  <ul className="dropdown-menu">
                    <li>
                      <NavLink
                        to={`/dashboard/${
                          Auth?.user?.role === 1 ? "admin" : "user"
                        }`}
                        className="dropdown-item"
                        onClick={handleDashboard}
                        href="#"
                      >
                        Dashboard
                      </NavLink>
                    </li>
                    <li>
                      <hr className="dropdown-divider" />
                    </li>
                    <li>
                      <NavLink
                        to="/login"
                        className="nav-link"
                        onClick={handleLogout}
                      >
                        Logout
                      </NavLink>
                    </li>
                  </ul>
                </li>
              ) : (
                /* <li className="nav-item">
                        <NavLink to="/login" className="nav-link"  onClick={handleLogout}>
                          Logout
                        </NavLink>
                       </li> */
                <>
                  <li className="nav-item">
                    <NavLink to="/register" className="nav-link">
                      Register
                    </NavLink>
                  </li>

                  <li className="nav-item">
                    <NavLink to="/login" className="nav-link">
                      Login
                    </NavLink>
                  </li>
                </>
              )}
              
              <li className="nav-item">
               
                    <Badge count={cart?.length} showZero>
                      <NavLink to="/cart" className="nav-link">
                        Cart
                      </NavLink>
                    </Badge>
                
              </li>
            </ul>
          </div>
        </div>
      </nav>
    </div>
  );
};

export default Header;
