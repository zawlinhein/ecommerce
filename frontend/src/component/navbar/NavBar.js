import React from "react";
import { Link, useNavigate } from "react-router-dom";
import { FaShoppingCart } from "react-icons/fa";
import { cartItems } from "../slice/productSlice";
import { useSelector } from "react-redux";
import { currentUser } from "../slice/userSlice";

const Navbar = () => {
  const navigate = useNavigate();
  const userData = useSelector(currentUser);
  const itemNum = useSelector(cartItems).length;

  return (
    <nav className="bg-gray-800 text-white shadow-md">
      <div className="container mx-auto flex justify-between items-center py-4 px-6">
        <div className="flex items-center">
          <Link to="/">
            <img src="path-to-your-logo.png" alt="Logo" className="h-10" />
          </Link>
        </div>
        <ul className="flex space-x-6">
          <li>
            <Link to="/" className="hover:text-gray-400">
              Home
            </Link>
          </li>
          <li>
            <Link to="/products" className="hover:text-gray-400">
              Products
            </Link>
          </li>
          {"_id" in userData ? (
            <li>
              <Link to="/profile" className="hover:text-gray-400">
                Profile
              </Link>
            </li>
          ) : (
            <>
              <li>
                <Link to="/login" className="hover:text-gray-400">
                  Login
                </Link>
              </li>
              <li>
                <Link to="/register" className="hover:text-gray-400">
                  Register
                </Link>
              </li>
            </>
          )}
          {userData.role === "admin" && (
            <>
              <li>
                <Link to="/admin" className="hover:text-gray-400">
                  Admin
                </Link>
              </li>
              <li>
                <Link to="/addProduct" className="hover:text-gray-400">
                  Add Product
                </Link>
              </li>
            </>
          )}
        </ul>
        <div className="relative">
          <div
            className="navbar-cart cursor-pointer"
            onClick={() => navigate("/cart")}
          >
            <FaShoppingCart className="text-xl" />
            {itemNum > 0 && (
              <span className="absolute -right-2 -top-2 bg-red-600 text-white rounded-full text-xs w-5 h-5 flex items-center justify-center">
                {itemNum}
              </span>
            )}
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;