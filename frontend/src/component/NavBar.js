import React from "react";
import { Link, useNavigate } from "react-router-dom";
import { FaShoppingCart } from "react-icons/fa";
import "./navbar.css";
import { cartItems, loginFlag } from "./productSlice";
import { useSelector } from "react-redux";
import { currentUser } from "./userSlice";

const Navbar = () => {
  const navigate = useNavigate();
  const flag = useSelector(loginFlag);
  const userData = useSelector(currentUser);
  const itemNum = useSelector(cartItems).length;
  return (
    <nav className="navbar">
      <div className="navbar-logo">
        <Link to="/">
          <img src="path-to-your-logo.png" alt="Logo" />
        </Link>
      </div>
      <ul className="navbar-links">
        <li>
          <Link to="/">Home</Link>
        </li>
        <li>
          <Link to="/products">Products</Link>
        </li>
        {flag ? (
          <li>
            <Link to="/profile">Profile</Link>
          </li>
        ) : (
          <>
            <li>
              <Link to="/login">Login</Link>
            </li>
            <li>
              <Link to="/register">Register</Link>
            </li>
          </>
        )}
        {userData.role === "admin" && (
          <li>
            <Link to="/admin">admin</Link>
          </li>
        )}
      </ul>
      <div className="navbar-cart" onClick={() => navigate("/cart")}>
        <FaShoppingCart />
        {itemNum > 0 && <span className="item-count">{itemNum}</span>}
      </div>
    </nav>
  );
};

export default Navbar;
