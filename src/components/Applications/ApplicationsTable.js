import React from "react";
import { FaLink, FaTrash } from "react-icons/fa";

const applications = [
  {
    ackNo: "EAC-001",
    createdBy: "Mr. Tasbirul Islam Shobuj",
    createdOn: "06/04/2025",
    name: "MD Hossain",
    university: "University of Toronto",
    program: "Computer Science",
    intake: "Fall 2025",
    email: "shazibeac@gmail.com",
    phone: "+8801743701127",
    assignedTo: "Mr. Tasbirul Islam",
    status: "App. Incomplete",
    statusColor: "bg-blue-100 text-blue-700",
  },
  {
    ackNo: "EAC-002",
    createdBy: "Mr. Tasbirul Islam Shobuj",
    createdOn: "21/03/2025",
    name: "Shadika Shaba",
    university: "McGill University",
    program: "Business Administration",
    intake: "Fall 2025",
    email: "sabaeac@gmail.com",
    phone: "+8801711071400",
    assignedTo: "Faria Siddique",
    status: "App. Incomplete",
    statusColor: "bg-blue-100 text-blue-700",
  },
  {
    ackNo: "EAC-003",
    createdBy: "Mr. Tasbirul Islam Shobuj",
    createdOn: "20/03/2025",
    name: "Mahmudul Hasan",
    university: "University of Waterloo",
    program: "Data Science",
    intake: "Winter 2026",
    email: "hasaneac12@gmail.com",
    phone: "+32472976019",
    assignedTo: "Mr. Tasbirul Islam",
    status: "App. Incomplete",
    statusColor: "bg-blue-100 text-blue-700",
  },
  {
    ackNo: "EAC-004",
    createdBy: "Mr. Tasbirul Islam Shobuj",
    createdOn: "17/03/2025",
    name: "MD Ahosanul Ovi",
    university: "York University",
    program: "Engineering",
    intake: "Spring 2025",
    email: "ahosaneac@gmail.com",
    phone: "+8801867303751",
    assignedTo: "Mr. Tasbirul Islam",
    status: "App. Submitted",
    statusColor: "bg-green-100 text-green-700",
  },
];

export default function ApplicationsTable() {
  return (
    <div className="overflow-x-auto p-4">
      <table className="min-w-full border border-gray-200 rounded-lg overflow-hidden bg-white shadow-md p-6">
        <thead className="text-sm text-gray-700">
          <tr className="text-left">
            <th className="p-3">ACK. No.</th>
            <th className="p-3">Date Created</th>
            <th className="p-3">Student Name</th>
            <th className="p-3">University Name</th>
            <th className="p-3">Program Name</th>
            <th className="p-3">Intake</th>
            <th className="p-3">Created By</th>
            <th className="p-3">Application Status</th>
            <th className="p-3">KC Assignee</th>
            <th className="p-3">Actions</th>
          </tr>
        </thead>
        <tbody>
          {applications.map((application, idx) => (
            <tr
              key={idx}
              className={`text-sm border-t border-gray-200 ${idx % 2 === 0 ? "bg-gray-50" : "bg-white"}`}
            >
              <td className="p-3 whitespace-nowrap">{application.ackNo}</td>
              <td className="p-3 whitespace-nowrap">{application.createdOn}</td>
              <td className="p-3 whitespace-nowrap">{application.name}</td>
              <td className="p-3 whitespace-nowrap">{application.university}</td>
              <td className="p-3 whitespace-nowrap">{application.program}</td>
              <td className="p-3 whitespace-nowrap">{application.intake}</td>
              <td className="p-3 whitespace-nowrap">{application.createdBy}</td>
              <td className="p-3 whitespace-nowrap">
                <span className={`text-xs px-2 py-1 rounded ${application.statusColor}`}>
                  {application.status}
                </span>
              </td>
              <td className="p-3 whitespace-nowrap">
                <select className="border rounded p-1 text-sm">
                  <option>{application.assignedTo}</option>
                </select>
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
