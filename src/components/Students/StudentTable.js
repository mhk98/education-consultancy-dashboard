import React, { useEffect, useState } from "react";
import { FaTrash } from "react-icons/fa";
import { LiaEditSolid } from "react-icons/lia";
import { Link } from "react-router-dom/cjs/react-router-dom";
import { useGetAllUserQuery } from "../../features/auth/auth";
import axios from "axios";

export default function StudentTable() {
  const [students, setStudents] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchStudents = async () => {
      try {
        setLoading(true);
        const res = await axios.get("http://localhost:5000/api/v1/user"); // Change to your actual API endpoint
        const allUsers = Array.isArray(res.data?.data)
          ? res.data.data
          : res.data?.users || [];

        const filtered = allUsers.filter(
          (user) =>
            user?.Profile?.toLowerCase() === "active" &&
            user?.Role?.toLowerCase() === "student"
        );

        setStudents(filtered);
        setError(null);
      } catch (err) {
        console.error("Error fetching users:", err);
        setError(err);
      } finally {
        setLoading(false);
      }
    };

    fetchStudents();
  }, []);

  console.log("students", students);

  const formatDate = (dateString) => {
    const date = new Date(dateString);
    return date.toLocaleDateString("en-GB", {
      day: "2-digit",
      month: "long",
      year: "numeric",
    });
  };

  return (
    <div className="overflow-x-auto p-4">
      <table className="min-w-full w-full border border-gray-200 bg-white shadow-md rounded-lg">
        <thead className="bg-gray-100 text-sm text-gray-700">
          <tr className="text-left">
            <th className="p-3">Student ID</th>
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
          {students.length > 0 ? (
            students.map((student, idx) => (
              <tr
                key={idx}
                className={`text-sm border-t border-gray-200 ${
                  idx % 2 === 0 ? "bg-gray-50" : "bg-white"
                }`}
              >
                <td className="p-3 whitespace-nowrap">{student.id}</td>
                <td className="p-3 whitespace-nowrap">{student.CreatedOn}</td>
                <td className="p-3 whitespace-nowrap">{formatDate(student.createdAt)}</td>
                <td className="p-3 whitespace-nowrap">
                  {student.FirstName} {student.LastName}
                </td>
                <td className="p-3 whitespace-nowrap">{student.Email}</td>
                <td className="p-3 whitespace-nowrap">{student.Phone}</td>
                <td className="p-3 whitespace-nowrap">{student.Assigned}</td>
                <td className="p-3 whitespace-nowrap">{student.Status}</td>
                <td className="p-3 whitespace-nowrap flex gap-3 text-brandRed">
                  <Link to={`/app/editprofile/${student.id}`}>
                    <LiaEditSolid className="cursor-pointer" />
                  </Link>
                  <FaTrash className="cursor-pointer text-red-500" />
                </td>
              </tr>
            ))
          ) : (
            <tr>
              <td colSpan="8" className="p-4 text-center text-gray-500">
                No student profiles found.
              </td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  );
}
