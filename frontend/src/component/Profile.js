import React from "react";
import { removeToken } from "./Auth";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { toggleLoginFlag } from "./productSlice";
import { currentUser } from "./userSlice";

const Profile = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const userData = useSelector(currentUser);

  console.log(userData, "USER DATA");

  const handleLogout = () => {
    removeToken();
    dispatch(toggleLoginFlag(false));
    navigate("/");
  };

  // Initial loading state
  if (!userData || Object.keys(userData).length === 0) {
    return <div>Loading...</div>;
  }

  return (
    <div>
      <p>Username: {userData.username}</p>
      <p>Role: {userData.role}</p>
      <p>-------------</p>
      {userData.purchased_history && userData.purchased_history.length > 0 ? (
        userData.purchased_history.map((invoice, index) => (
          <div key={index}>
            <p>Date: {invoice.date}</p>
            <p>Total Price: {invoice.totalPrice}</p>
            {invoice.items && invoice.items.length > 0 ? (
              invoice.items.map((item, idx) => (
                <p key={idx}>
                  Title: {item.title}, Quantity: {item.qty}
                </p>
              ))
            ) : (
              <p>No items in this invoice</p>
            )}
            <p>-------------</p>
          </div>
        ))
      ) : (
        <p>No purchase history</p>
      )}
      <button onClick={handleLogout}>Logout</button>
    </div>
  );
};

export default Profile;
