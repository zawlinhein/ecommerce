import React, { useState } from "react";
import { removeToken } from "../Auth";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { currentUser, setUserInfo } from "../slice/userSlice";
import InvoiceComponent from "./InvoiceComponent";

const Profile = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const userData = useSelector(currentUser);
  const [openIndex, setOpenIndex] = useState(null);

  const handleLogout = () => {
    removeToken();
    dispatch(setUserInfo({}));
    navigate("/");
  };

  const toggleCollapse = (index) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  // Initial loading state
  if (!userData) {
    return <div>Loading...</div>;
  }

  return (
    <div className="container mx-auto mt-5 p-6 bg-white rounded-lg shadow-lg">
      <div className="bg-white p-6 rounded-lg">
        <p className="text-2xl font-bold mb-4">User Profile</p>
        <div className="divide-y divide-gray-300">
          <div className="py-4">
            <p className="text-lg font-semibold">
              Username: {userData.username}
            </p>
            <p className="text-lg font-semibold">Role: {userData.role}</p>
            <button
              onClick={handleLogout}
              className="mt-6 bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
            >
              Logout
            </button>
          </div>
          <div className="py-4">
            {userData.purchased_history &&
            userData.purchased_history.length > 0 ? (
              userData.purchased_history.map((invoice, index) => (
                <div
                  key={index}
                  className="py-2 border rounded-lg mb-4 bg-gray-50"
                >
                  <div
                    className="flex justify-between items-center cursor-pointer p-2 bg-gray-100 rounded"
                    onClick={() => toggleCollapse(index)}
                  >
                    <InvoiceComponent invoice={invoice} />
                    <svg
                      className={`w-5 h-5 text-blue-700 transform transition-transform ${
                        openIndex === index ? "rotate-180" : ""
                      }`}
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth="2"
                        d="M19 9l-7 7-7-7"
                      ></path>
                    </svg>
                  </div>
                  {openIndex === index && (
                    <div className="px-4 pt-2 pb-2 text-sm text-gray-700 font-medium">
                      {invoice.items && invoice.items.length > 0 ? (
                        <div className="divide-y divide-gray-300">
                          {invoice.items.map((item, idx) => (
                            <div key={idx} className="py-2">
                              <p>Title: {item.title}</p>
                              <p>Quantity: {item.qty}</p>
                            </div>
                          ))}
                        </div>
                      ) : (
                        <p>No items in this invoice</p>
                      )}
                    </div>
                  )}
                </div>
              ))
            ) : (
              <p>No purchase history</p>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Profile;
