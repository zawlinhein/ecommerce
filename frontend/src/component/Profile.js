import React, { useEffect, useState } from "react";
import { getUserData, removeToken } from "./Auth";
import { useNavigate } from "react-router-dom";

const Profile = () => {
  const [userData, setUserData] = useState({});
  const navigate = useNavigate();

  useEffect(() => {
    const checkData = async () => {
      const data = await getUserData();
      setUserData(data);
    };
    checkData();
  }, []);

  console.log(userData, "USER DATA");

  const handleLogout = () => {
    removeToken();
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
