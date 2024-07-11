import React from "react";

const EditRole = ({
  isOpen,
  onClose,
  onSave,
  selectedRole,
  setSelectedRole,
}) => {
  if (!isOpen) return null;

  const handleSave = () => {
    onSave(selectedRole);
    onClose();
  };

  return (
    <div className="fixed inset-0 bg-gray-600 bg-opacity-50 flex justify-center items-center z-50">
      <div className="bg-white rounded-lg shadow-lg w-1/3 p-6">
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
            onClick={onClose}
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
