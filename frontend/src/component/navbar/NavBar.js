import React from "react";
import { Link, useNavigate } from "react-router-dom";
import { FaShoppingCart } from "react-icons/fa";
import { cartItems } from "../slice/productSlice";
import { useSelector } from "react-redux";
import { currentUser } from "../slice/userSlice";
import logo from "../noun-shop-6157698.svg";

const Navbar = () => {
  const navigate = useNavigate();
  const userData = useSelector(currentUser);
  const itemNum = useSelector(cartItems).length;

  return (
    <nav className="bg-gray-800 text-white shadow-md">
      <div className="container mx-auto flex justify-between items-center py-4 px-6">
        <div className="flex items-center space-x-6">
          <Link to="/">
            <img src={logo} alt="Logo" className="h-10" />
          </Link>
        </div>
        <div className="flex justify-center flex-grow">
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
            {userData.role === "admin" && (
              <>
                <li>
                  <Link to="/admin" className="hover:text-gray-400">
                    Admin
                  </Link>
                </li>
                <li>
                  <Link to="/editUsers" className="hover:text-gray-400">
                    Edit Users
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
        </div>
        <div className="flex items-center space-x-6">
          {"_id" in userData ? (
            <Link to="/profile" className="hover:text-gray-400">
              Profile
            </Link>
          ) : (
            <>
              <Link to="/login" className="hover:text-gray-400">
                Login
              </Link>
              <Link to="/register" className="hover:text-gray-400">
                Register
              </Link>
            </>
          )}
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
      </div>
    </nav>
  );
};

export default Navbar;
