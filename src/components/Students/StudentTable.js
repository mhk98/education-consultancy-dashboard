import React, { useEffect, useState } from "react";
import { FaEnvelope, FaPhone, FaLink, FaTrash } from "react-icons/fa";
import { LiaEditSolid } from "react-icons/lia";
import { Link } from "react-router-dom/cjs/react-router-dom";
import { useGetAllUserQuery } from "../../features/auth/auth";

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


const {data, isLoading, isError, error} = useGetAllUserQuery()
const [students, setStudents] = useState([]);


useEffect(() => {
if(isError) {
  console.log("Error fetching", error)
} else if(!isLoading && data) {
  setStudents(data.data)
}
}, [data, isLoading, isError, error]) 


const formatDate = (dateString) => {
  const date = new Date(dateString);
  return date.toLocaleDateString("en-GB", {
    day: "2-digit",
    month: "long",
    year: "numeric",
  });
};


console.log("students", students)
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
              <td className="p-3 whitespace-nowrap">{formatDate(student.createdAt)}</td>
              <td className="p-3 whitespace-nowrap">X</td>
              <td className="p-3 whitespace-nowrap">{student.FirstName} {student.LastName}</td>
              <td className="p-3 whitespace-nowrap">{student.Email}</td>
              <td className="p-3 whitespace-nowrap">{student.Phone}</td>

              <td className="p-3 whitespace-nowrap">
               
                    {/* {student.assignedTo} */}X
                  {/* Add more options if needed */}
                
              </td>

              <td className="p-3 whitespace-nowrap">
                <span className={`text-xs px-2 py-1 rounded ${student.statusColor}`}>
                  {/* {student.status} */}App. Submitted
                </span>
              </td>
              <td className="p-3 whitespace-nowrap flex gap-3 text-blue-600">
                {/* <FaLink className="cursor-pointer" /> */}
                <Link to={`/app/editprofile/${student.id}`}>
                <LiaEditSolid  className="cursor-pointer" />
                </Link>
                <FaTrash className="cursor-pointer text-red-500" />
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
