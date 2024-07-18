import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { allUsers, setAllUsersInfo } from "../slice/userSlice";
import ConfirmBox from "./ConfirmBox";
import axios from "axios";
import PwdReset from "../auth/PwdReset";
import EditRole from "./EditRole";

const EditUsers = () => {
  const allUsersData = useSelector(allUsers);
  console.log(allUsersData);
  const dispatch = useDispatch();
  const [isConfirmBoxOpen, setIsConfirmBoxOpen] = useState(null);

  const [isPwdOpen, setIsPwdOpen] = useState(null);
  const [username, setUsername] = useState("");

  const [isEditRoleOpen, setIsEditRoleOpen] = useState(null);
  const [selectedRole, setSelectedRole] = useState("");

  const closeConfirmationBox = () => {
    setIsConfirmBoxOpen(null);
  };

  const handleConfirm = () => {
    axios
      .delete(`http://localhost:8000/delete-user/${isConfirmBoxOpen}`)
      .then((res) => {
        const filterUsers = allUsersData.filter(
          (user) => user._id !== isConfirmBoxOpen
        );
        dispatch(setAllUsersInfo(filterUsers));
      });
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
                onClick={() => {
                  setIsEditRoleOpen(user._id);
                  setSelectedRole(user.role);
                }}
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
                onClick={() => {
                  setIsPwdOpen(user._id);
                  setUsername(user.username);
                }}
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
      {isPwdOpen && (
        <PwdReset
          isPwdOpen={isPwdOpen}
          setIsPwdOpen={setIsPwdOpen}
          username={username}
        />
      )}
      {isEditRoleOpen && (
        <EditRole
          isEditRoleOpen={isEditRoleOpen}
          setIsEditRoleOpen={setIsEditRoleOpen}
          selectedRole={selectedRole}
          setSelectedRole={setSelectedRole}
        />
      )}
    </div>
  );
};

export default EditUsers;
