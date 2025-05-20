import React, { useEffect, useState } from "react";
import { FaTrash } from "react-icons/fa";
import { LiaEditSolid } from "react-icons/lia";
import { Link } from "react-router-dom/cjs/react-router-dom";
import axios from "axios";

export default function StudentTable() {
  const [students, setStudents] = useState([]);
  const [loading, setLoading] = useState(true);
  const [users, setUsers] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [isError, setIsError] = useState(false);
  const [error, setError] = useState(null);
  const role = localStorage.getItem("role")
  const branch = localStorage.getItem("branch")
  const id = localStorage.getItem("userId")

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
      } catch (err) {
        console.error("Error fetching users:", err);
      } finally {
        setLoading(false);
      }
    };

    fetchStudents();
  }, []);

  console.log("students", students);



  useEffect(() => {
    const fetchUsers = async () => {
      setIsLoading(true);
      setIsError(false);
      try {
        const response = await axios.get('http://localhost:5000/api/v1/user', {
          params: {
            branch,
          },
        });
        const allUsers = Array.isArray(response.data?.data)
        ? response.data.data
        : response.data?.users || [];
        const filtered = allUsers.filter(
          (user) =>
            user?.Profile?.toLowerCase() === "active" &&
            user?.Role?.toLowerCase() === "student"
        );
        setUsers(filtered); // Adjust based on your actual API response shape
      } catch (err) {
        setIsError(true);
        setError(err);
        console.error("Error fetching user data", err);
      } finally {
        setIsLoading(false);
      }
    };

    fetchUsers();
  }, [branch]);

  const [student, setStudent] = useState(null);
 
  useEffect(() => {
    const fetchUser = async () => {
      try {
        const response = await axios.get(`http://localhost:5000/api/v1/user/${id}`);
        const user = response.data?.data;
  
        // Check if user is active and has role student
        if (
          user?.Profile?.toLowerCase() === "active" &&
          user?.Role?.toLowerCase() === "student"
        ) {
          setStudent(user); // store as single object
        } else {
          setStudent(null); // no valid student
        }
      } catch (err) {
        console.error("Error fetching user data:", err);
        setStudent(null);
      }
    };
  
    if (id) fetchUser();
  }, [id]);
  

  console.log("student", student)

  if (isLoading) return <p>Loading...</p>;
  if (isError) return <p>Error loading users: {error.message}</p>;

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
            <th className="p-3">Branch</th>
            <th className="p-3">Assigned To</th>
            <th className="p-3">Status</th>
            <th className="p-3">Actions</th>
          </tr>
        </thead>
        {
          role === "superAdmin" ? (
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
                <td className="p-3 whitespace-nowrap">{student.Branch}</td>
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
          ) :  role === "admin" ? (
            <tbody>
            {users.length > 0 ? (
              users.map((student, idx) => (
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
                  <td className="p-3 whitespace-nowrap">{student.Branch}</td>
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
          ) :(
            <tbody>
            {student ? (
             
                <tr
              
                  className={`text-sm border-t border-gray-200 ${
                    student.id % 2 === 0 ? "bg-gray-50" : "bg-white"
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
                  <td className="p-3 whitespace-nowrap">{student.Branch}</td>
                  <td className="p-3 whitespace-nowrap">{student.Assigned}</td>
                  <td className="p-3 whitespace-nowrap">{student.Status}</td>
                  <td className="p-3 whitespace-nowrap flex gap-3 text-brandRed">
                    <Link to={`/app/editprofile/${student.id}`}>
                      <LiaEditSolid className="cursor-pointer" />
                    </Link>
                    <FaTrash className="cursor-pointer text-red-500" />
                  </td>
                </tr>
           
            ) : (
              <tr>
                <td colSpan="8" className="p-4 text-center text-gray-500">
                  No student profiles found.
                </td>
              </tr>
            )}
          </tbody>
          )
        }
      </table>
    </div>
  );
}
