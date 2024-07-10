import React from "react";
import { removeToken } from "./Auth";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { currentUser, setUserInfo } from "./slice/userSlice";

const Profile = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const userData = useSelector(currentUser);

  const handleLogout = () => {
    removeToken();
    dispatch(setUserInfo({}));
    navigate("/");
  };

  // Initial loading state
  if (!userData) {
    return <div>Loading...</div>;
  }

  return (
    <div className="container mx-auto mt-5 p-3 bg-gray-100 rounded-lg shadow-lg">
      <div className="bg-gray-200 p-3 rounded-lg">
        <p className="text-xl font-bold mb-2">User Profile</p>
        <div className="divide-y divide-gray-300">
          <div className="py-2">
            <p className="text-lg font-semibold">
              Username: {userData.username}
            </p>
            <p className="text-lg font-semibold">Role: {userData.role}</p>
          </div>
          <div className="py-2">
            {userData.purchased_history &&
            userData.purchased_history.length > 0 ? (
              userData.purchased_history.map((invoice, index) => (
                <div key={index} className="py-2">
                  <p className="text-lg font-semibold">
                    Invoice Date: {invoice.date}
                  </p>
                  <p>Total Price: {invoice.totalPrice}</p>
                  {invoice.items && invoice.items.length > 0 ? (
                    <div className="divide-y divide-gray-300">
                      {invoice.items.map((item, idx) => (
                        <div key={idx} className="py-1">
                          <p>Title: {item.title}</p>
                          <p>Quantity: {item.qty}</p>
                        </div>
                      ))}
                    </div>
                  ) : (
                    <p>No items in this invoice</p>
                  )}
                </div>
              ))
            ) : (
              <p>No purchase history</p>
            )}
          </div>
        </div>
        <button
          onClick={handleLogout}
          className="mt-4 bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
        >
          Logout
        </button>
      </div>
    </div>
  );
};

export default Profile;
