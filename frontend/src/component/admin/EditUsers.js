import React, { useState } from "react";
import { useSelector } from "react-redux";
import { allUsers } from "../slice/userSlice";
import ConfirmBox from "./ConfirmBox";

const EditUsers = () => {
  const allUsersData = useSelector(allUsers);
  const [isConfirmBoxOpen, setIsConfirmBoxOpen] = useState(null);

  const closeConfirmationBox = () => {
    setIsConfirmBoxOpen(null);
  };

  const handleConfirm = () => {
    setIsConfirmBoxOpen(null);
  };
  return (
    <div className="container mx-auto w-1/2 p-4 bg-white">
      <div>
        {allUsersData.map((user) => (
          <div
            className="flex items-center justify-between p-4 mb-4 border rounded shadow-md"
            key={user.username}
          >
            <div>
              <p className="text-lg font-semibold">Username: {user.username}</p>
              <p className="text-sm text-gray-600">Role: {user.role}</p>
            </div>
            <div className="flex space-x-4">
              <button
                className="bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-700"
                onClick={() => console.log(`Edit role for ${user.username}`)}
              >
                Edit Role
              </button>
              <button
                className="bg-red-500 text-white px-4 py-2 rounded-md hover:bg-red-700"
                onClick={() => setIsConfirmBoxOpen(user._id)}
              >
                Remove
              </button>
              <button
                className="bg-yellow-500 text-white px-4 py-2 rounded-md hover:bg-yellow-700"
                onClick={() =>
                  console.log(`Reset password for ${user.username}`)
                }
              >
                Reset Password
              </button>
            </div>
          </div>
        ))}
      </div>

      {isConfirmBoxOpen && (
        <ConfirmBox
          closeConfirmationBox={closeConfirmationBox}
          handleConfirm={handleConfirm}
        />
      )}
    </div>
  );
};

export default EditUsers;
