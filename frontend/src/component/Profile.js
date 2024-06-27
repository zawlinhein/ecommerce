import React, { useEffect, useState } from "react";
import { getUserData } from "./Auth";

const Profile = () => {
  const [userData, setUserData] = useState({});
  useEffect(() => {
    const checkData = async () => {
      const data = await getUserData();
      setUserData(data);
    };
    checkData();
  }, []);

  console.log(userData, "USER DATA");
  if (!userData || !userData.purchased_products) return <div>Loading...</div>;
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
    </div>
  );
};

export default Profile;
