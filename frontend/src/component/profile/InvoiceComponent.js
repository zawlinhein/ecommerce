import React from "react";

const InvoiceComponent = ({ invoice }) => {
  const formatDate = (dateStr) => {
    const date = new Date(dateStr);
    const parts = date.toString().split(" ");
    const month = parts[1];
    const day = parts[2];
    const year = parts[3];
    const time = parts[4];

    const formattedDate = `${month} ${day} ${year}, ${time}`;
    return formattedDate;
  };

  return (
    <div>
      <p className="text-lg font-semibold">
        Invoice Date: {formatDate(invoice.date)} - Total Price:{" "}
        {invoice.totalPrice.toFixed(2)}
      </p>
    </div>
  );
};

export default InvoiceComponent;
