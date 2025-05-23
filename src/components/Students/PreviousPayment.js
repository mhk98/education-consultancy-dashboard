import React, { useEffect, useState } from "react";
import {  useGetDataByIdQuery } from "../../features/pendingPayment/pendingPayment";

export default function PreviousPayment({id}) {
  
  const { data, isLoading, isError, error } = useGetDataByIdQuery(id);
  const [payments, setPayments] = useState([]);

  useEffect(() => {
    if (isError) {
      console.log("Error fetching", error);
    } else if (!isLoading && data) {
      setPayments(data.data);
    }
  }, [data, isLoading, isError, error]);

  const formatDate = (dateString) => {
    const date = new Date(dateString);
    return date.toLocaleDateString("en-GB", {
      day: "2-digit",
      month: "long",
      year: "numeric",
    });
  };

  return (
    <div className="w-full px-4 py-6">
      <div className="w-full overflow-x-auto">
        <table className="w-full text-sm text-left text-gray-700 bg-white shadow-md rounded-lg">
          <thead className="bg-gray-100 border-b border-gray-200">
            <tr>
              <th className="p-3 min-w-[120px]">Date</th>
              <th className="p-3 min-w-[180px]">Transaction ID</th>
              <th className="p-3 min-w-[160px]">Mode of Payment</th>
              <th className="p-3 min-w-[160px]">Payment Status</th>
              {/* <th className="p-3 min-w-[160px]">Download Invoice</th> */}
              
            </tr>
          </thead>
          <tbody>
            {payments.map((payment, idx) => (
              <tr
                key={idx}
                className={`border-b border-gray-200 ${
                  idx % 2 === 0 ? "bg-gray-50" : "bg-white"
                }`}
              >
                <td className="p-3 whitespace-nowrap">{formatDate(payment.createdAt)}</td>
                <td className="p-3 whitespace-nowrap">{payment.transactionId}</td>
                <td className="p-3 whitespace-nowrap">{payment.paymentStatus}</td>
                <td className="p-3 whitespace-nowrap">{payment.status}</td>
                {/* <td className="p-3 whitespace-nowrap text-brandRed cursor-pointer">
                  Invoice
                </td> */}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
