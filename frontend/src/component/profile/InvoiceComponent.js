import React from "react";

const InvoiceComponent = ({ invoice }) => {
  const formatDate = (dateStr) => {
    const date = new Date(dateStr);
    const options = {
      month: "short",
      day: "2-digit",
      year: "numeric",
      hour: "2-digit",
      minute: "2-digit",
      second: "2-digit",
      hour12: false,
      timeZone: "UTC",
    };
    return date.toLocaleString("en-US", options).replace(",", "");
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
