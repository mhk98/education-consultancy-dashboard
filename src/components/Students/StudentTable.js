import React, { useState, useMemo } from "react";
import { FaTrash } from "react-icons/fa";
import { LiaEditSolid } from "react-icons/lia";
import { Link } from "react-router-dom/cjs/react-router-dom";
import { Input, Label, Button } from "@windmill/react-ui";
import {
  useGetAllUserQuery,
  useGetUserDataByIdQuery,
} from "../../features/auth/auth";

export default function StudentTable() {
  const [filters, setFilters] = useState({
    firstName: "",
    lastName: "",
    country: "",
    university: "",
    intake: "",
    studentId: "",
  });

  const [page, setPage] = useState(1);
  const limit = 20;

  const role = localStorage.getItem("role");
  const branch = localStorage.getItem("branch");
  const userId = localStorage.getItem("userId");

  const queryParams =
    role === "superAdmin"
      ? {
          FirstName: filters.firstName,
          LastName: filters.lastName,
          id: filters.studentId,
          page,
          limit,
        }
      : role === "admin" || role === "employee"
      ? {
          Branch: branch,
          FirstName: filters.firstName,
          LastName: filters.lastName,
          id: filters.studentId,
          page,
          limit,
        }
      : null;

  const {
    data: allUserData,
    isLoading,
  } = useGetAllUserQuery(queryParams, { skip: !queryParams });

  const { data: currentUserData } = useGetUserDataByIdQuery(userId);

  const students = useMemo(() => {
    let users = [];

    if (role === "student") {
      users = currentUserData?.data ? [currentUserData.data] : [];
    } else {
      users = allUserData?.data || [];
    }

    return users.filter(
      (user) =>
        user.Role?.toLowerCase() === "student" && user.Profile === "active"
    );
  }, [role, allUserData, currentUserData]);

  const filteredStudents = useMemo(() => {
    const { firstName, lastName, country, university, intake, studentId } = filters;

    return students.filter((student) =>
      (!firstName || student.FirstName?.toLowerCase().includes(firstName.toLowerCase())) &&
      (!lastName || student.LastName?.toLowerCase().includes(lastName.toLowerCase())) &&
      (!country || student.Country?.toLowerCase().includes(country.toLowerCase())) &&
      (!university || student.University?.toLowerCase().includes(university.toLowerCase())) &&
      (!intake || student.Intake?.toLowerCase().includes(intake.toLowerCase())) &&
      (!studentId || student.id?.toLowerCase().includes(studentId.toLowerCase()))
    );
  }, [students, filters]);

  const formatDate = (dateStr) =>
    new Date(dateStr).toLocaleDateString("en-GB", {
      day: "2-digit",
      month: "long",
      year: "numeric",
    });

  const clearFilters = () => {
    setFilters({
      firstName: "",
      lastName: "",
      country: "",
      university: "",
      intake: "",
      studentId: "",
    });
  };

  return (
    <div className="overflow-x-auto p-4">
      {/* Filter Form */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-4">
        {["firstName", "lastName", "country", "university", "intake", "studentId"].map((key) => (
          <Label key={key}>
            <span>{key.replace(/([A-Z])/g, " $1").replace(/^./, str => str.toUpperCase())}</span>
            <Input
              value={filters[key]}
              onChange={(e) => setFilters({ ...filters, [key]: e.target.value })}
              className="mt-1"
              placeholder={key}
            />
          </Label>
        ))}
        <div className="flex items-end gap-2">
          <Button className="w-full bg-brandRed text-white" onClick={clearFilters}>
            Clear
          </Button>
        </div>
      </div>

      {/* Student Table */}
      <table className="min-w-full w-full border border-gray-200 bg-white shadow-md rounded-lg">
        <thead className="bg-gray-100 text-sm text-gray-700">
          <tr className="text-left">
            <th className="p-3">Student ID</th>
            <th className="p-3">Created By</th>
            <th className="p-3">Created On</th>
            <th className="p-3">Name</th>
            <th className="p-3">Email</th>
            <th className="p-3">Phone</th>
            <th className="p-3">Branch</th>
            <th className="p-3">Assigned To</th>
            <th className="p-3">Status</th>
            <th className="p-3">Actions</th>
          </tr>
        </thead>

        <tbody>
          {filteredStudents.length > 0 ? (
            filteredStudents.map((student, index) => {
              const rowBg = index % 2 === 0 ? "bg-gray-50" : "bg-white";
              return (
                <tr key={index} className={`text-sm border-t border-gray-200 ${rowBg}`}>
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
                  <td className="p-3 whitespace-nowrap">{student.Status || "N/A"}</td>
                  <td className="p-3 whitespace-nowrap flex gap-3 text-brandRed">
                    <Link to={`/app/editprofile/${student.id}`}>
                      <LiaEditSolid className="cursor-pointer" />
                    </Link>
                    {role === "superAdmin" && (
                      <FaTrash className="cursor-pointer text-red-500" />
                    )}
                  </td>
                </tr>
              );
            })
          ) : (
            <tr>
              <td colSpan="10" className="p-4 text-center text-gray-500">
                No student profiles found.
              </td>
            </tr>
          )}
        </tbody>
      </table>

      {/* Pagination */}
      {allUserData?.meta && (
        <div className="flex justify-between items-center mt-4 px-2 text-sm text-gray-600">
          <div>
            Showing{" "}
            <strong>
              {(page - 1) * limit + 1} -{" "}
              {Math.min(page * limit, allUserData.meta.total)}
            </strong>{" "}
            of <strong>{allUserData.meta.total}</strong>
          </div>
          <div className="flex gap-2">
            <Button
              disabled={page === 1}
              onClick={() => setPage((prev) => Math.max(prev - 1, 1))}
              className="bg-gray-200"
            >
              Previous
            </Button>
            <Button
              disabled={page * limit >= allUserData.meta.total}
              onClick={() => setPage((prev) => prev + 1)}
              className="bg-gray-200"
            >
              Next
            </Button>
          </div>
        </div>
      )}
    </div>
  );
}


