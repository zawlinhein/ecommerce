import axios from "axios";
import React, { useState } from "react";
import { changeRole } from "../slice/userSlice";
import { useDispatch } from "react-redux";

const EditRole = ({
  isEditRoleOpen,
  setIsEditRoleOpen,
  selectedRole,
  setSelectedRole,
}) => {
  const [errMessage, setErrMessage] = useState("");
  const dispatch = useDispatch();
  const handleSave = () => {
    axios
      .post(`http://localhost:8000/edit-role/${isEditRoleOpen}`, {
        role: selectedRole,
      })
      .then((res) => {
        console.log(res.data);
        dispatch(changeRole({ _id: isEditRoleOpen, newRole: selectedRole }));
        setIsEditRoleOpen(null);
      })
      .catch((error) => {
        if (!error.response) {
          setErrMessage("No Server Response!");
        } else {
          setErrMessage("Edit role Failed");
        }
      });
  };

  return (
    <div className="fixed inset-0 bg-gray-600 bg-opacity-50 flex justify-center items-center z-50">
      <div className="bg-white rounded-lg shadow-lg w-1/3 p-6">
        <p className="text-red-600 text-center">{errMessage}</p>
        <h2 className="text-2xl font-bold mb-4">Edit User Role</h2>
        <label className="block mb-4">
          <span className="text-gray-700">Select Role</span>
          <select
            value={selectedRole}
            onChange={(e) => setSelectedRole(e.target.value)}
            className="block w-full mt-1 p-2 border border-gray-300 rounded-md"
          >
            <option value="admin">Admin</option>
            <option value="luu">Luu</option>
          </select>
        </label>
        <div className="flex justify-end space-x-4">
          <button
            onClick={() => setIsEditRoleOpen(null)}
            className="bg-gray-500 text-white px-4 py-2 rounded-md hover:bg-gray-700"
          >
            Cancel
          </button>
          <button
            onClick={handleSave}
            className="bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-700"
          >
            Confirm
          </button>
        </div>
      </div>
    </div>
  );
};

export default EditRole;
