import React from "react";
import { FaEnvelope, FaPhone, FaLink, FaTrash } from "react-icons/fa";

const students = [
  {
    createdBy: "Mr. Tasbirul Islam Shobuj",
    createdOn: "06/04/2025",
    name: "MD Hossain",
    email: "shazibeac@gmail.com",
    phone: "+8801743701127",
    assignedTo: "Mr. Tasbirul Islam",
    status: "App. Incomplete",
    statusColor: "bg-blue-100 text-blue-700",
  },
  {
    createdBy: "Mr. Tasbirul Islam Shobuj",
    createdOn: "21/03/2025",
    name: "Shadika Shaba",
    email: "sabaeac@gmail.com",
    phone: "+8801711071400",
    assignedTo: "Faria Siddique",
    status: "App. Incomplete",
    statusColor: "bg-blue-100 text-blue-700",
  },
  {
    createdBy: "Mr. Tasbirul Islam Shobuj",
    createdOn: "20/03/2025",
    name: "Mahmudul Hasan",
    email: "hasaneac12@gmail.com",
    phone: "+32472976019",
    assignedTo: "Mr. Tasbirul Islam",
    status: "App. Incomplete",
    statusColor: "bg-blue-100 text-blue-700",
  },
  {
    createdBy: "Mr. Tasbirul Islam Shobuj",
    createdOn: "17/03/2025",
    name: "MD Ahosanul Ovi",
    email: "ahosaneac@gmail.com",
    phone: "+8801867303751",
    assignedTo: "Mr. Tasbirul Islam",
    status: "App. Submitted",
    statusColor: "bg-green-100 text-green-700",
  },
];

export default function StudentTable() {
  return (
    <div className="overflow-x-auto p-4">
      <table className="min-w-full border border-gray-200 rounded-lg overflow-hidden bg-white shadow-md p-6">
        <thead className="text-sm text-gray-700">
          <tr className="text-left">
            <th className="p-3">Created By</th>
            <th className="p-3">Created On</th>
            <th className="p-3">Name</th>
            <th className="p-3">Email</th>
            <th className="p-3">Phone Number</th>
            <th className="p-3">Assigned To</th>
            <th className="p-3">Status</th>
            <th className="p-3">Actions</th>
          </tr>
        </thead>
        <tbody>
          {students.map((student, idx) => (
            <tr
              key={idx}
              className={`text-sm border-t border-gray-200 ${idx % 2 === 0 ? "bg-gray-50" : "bg-white"}`}
            >
              <td className="p-3 whitespace-nowrap">{student.createdBy}</td>
              <td className="p-3 whitespace-nowrap">{student.createdOn}</td>
              <td className="p-3 whitespace-nowrap">{student.name}</td>
              <td className="p-3 whitespace-nowrap">{student.email}</td>
              <td className="p-3 whitespace-nowrap">{student.phone}</td>

              <td className="p-3 whitespace-nowrap">
                <select className="border rounded p-1 text-sm">
                  <option>{student.assignedTo}</option>
                  {/* Add more options if needed */}
                </select>
              </td>

              <td className="p-3 whitespace-nowrap">
                <span className={`text-xs px-2 py-1 rounded ${student.statusColor}`}>
                  {student.status}
                </span>
              </td>
              <td className="p-3 whitespace-nowrap flex gap-3 text-blue-600">
                <FaLink className="cursor-pointer" />
                <FaTrash className="cursor-pointer text-red-500" />
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
