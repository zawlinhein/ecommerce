import React from "react";

const ConfirmBox = ({ closeConfirmationBox, handleConfirm }) => {
  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
      <div className="bg-white p-6 rounded shadow-lg">
        <h2 className="text-lg font-semibold">Are you sure?</h2>
        <p className="mt-2">Do you really want to perform this action?</p>
        <div className="mt-4 flex justify-end">
          <button
            className="px-4 py-2 mr-2 text-gray-700 bg-gray-200 rounded hover:bg-gray-300"
            onClick={closeConfirmationBox}
          >
            Cancel
          </button>
          <button
            className="px-4 py-2 text-white bg-red-500 rounded hover:bg-red-700"
            onClick={handleConfirm}
          >
            Confirm
          </button>
        </div>
      </div>
    </div>
  );
};

export default ConfirmBox;
