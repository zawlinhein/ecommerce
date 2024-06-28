import React, { useEffect, useState } from "react";
import { getUserData, removeToken } from "./Auth";
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
  if (!userData.purchased_products) return <div>Loading...</div>;
  return (
    <div>
      <p>Username: {userData.username}</p>
      <p>Role: {userData.role}</p>
      {userData.purchased_products.length > 0 ? (
        userData.purchased_products.map((item, index) => (
          <div key={index}>
            <p>title: {item.title}</p>
            <p>quantity: {item.quantity}</p>
          </div>
        ))
      ) : (
        <p>no item</p>
      )}
      <button onClick={handleLogout}>Logout</button>
    </div>
  );
};

export default Profile;
