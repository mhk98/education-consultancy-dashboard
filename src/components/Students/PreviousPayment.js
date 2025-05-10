import React, { useEffect, useState } from "react";
import { FaTrash } from "react-icons/fa";
import { LiaEditSolid } from "react-icons/lia";
import { Link } from "react-router-dom/cjs/react-router-dom";
import { useGetAllUserQuery } from "../../features/auth/auth";

export default function PreviousPayment() {
  const { data, isLoading, isError, error } = useGetAllUserQuery();
  const [students, setStudents] = useState([]);

  useEffect(() => {
    if (isError) {
      console.log("Error fetching", error);
    } else if (!isLoading && data) {
      setStudents(data.data);
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
              <th className="p-3 min-w-[160px]">Download Invoice</th>
              
            </tr>
          </thead>
          <tbody>
            {students.map((student, idx) => (
              <tr
                key={idx}
                className={`border-b border-gray-200 ${
                  idx % 2 === 0 ? "bg-gray-50" : "bg-white"
                }`}
              >
                <td className="p-3 whitespace-nowrap">{formatDate(student.createdAt)}</td>
                <td className="p-3 whitespace-nowrap">44546654211122</td>
                <td className="p-3 whitespace-nowrap">Bkash</td>
                <td className="p-3 whitespace-nowrap text-blue-600 cursor-pointer">
                  Invoice
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
