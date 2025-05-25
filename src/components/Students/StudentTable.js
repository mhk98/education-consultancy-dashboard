import React, { useState, useMemo } from "react";
import { FaTrash } from "react-icons/fa";
import { LiaEditSolid } from "react-icons/lia";
import { Link } from "react-router-dom/cjs/react-router-dom";
import {
  Input,
  Label,
  Button,
} from "@windmill/react-ui";
import {
  useGetAllUserQuery,
  useGetUserDataByIdQuery,
} from "../../features/auth/auth";

export default function StudentTable() {
  const [FirstName, setFirstName] = useState("");
  const [LastName, setLastName] = useState("");
  const [Country, setCountry] = useState("");
  const [University, setUniversity] = useState("");
  const [Intake, setIntake] = useState("");
  const [StudentId, setStudentId] = useState("");

  const role = localStorage.getItem("role");
  const branch = localStorage.getItem("branch");
  const id = localStorage.getItem("userId");

  const queryArgs =
    role === "superAdmin"
      ? { FirstName, LastName, id: StudentId }
      : role === "admin"
      ? { Branch: branch, FirstName, LastName, id: StudentId }
      : null;

  const {
    data,
    isLoading,
    isError,
    error,
  } = useGetAllUserQuery(queryArgs, { skip: !queryArgs });

  const {
    data: data2,
    isLoading: isLoading2,
    isError: isError2,
    error: error2,
  } = useGetUserDataByIdQuery(id);

  const students = useMemo(() => {
    let users = [];
  
    if (role === "student") {
      users = data2?.data ? [data2.data] : [];
    } else {
      users = data?.data || [];
    }
  
    // ✅ এখানে student role ফিল্টার করে নিচ্ছি
    return users.filter(user => user.Role?.toLowerCase() === "student");
  }, [role, data, data2]);
  

  const filteredStudents = useMemo(() => {
    return students.filter((student) => {
      const first = FirstName.toLowerCase();
      const last = LastName.toLowerCase();
      const country = Country.toLowerCase();
      const university = University.toLowerCase();
      const intake = Intake.toLowerCase();
      const studentId = StudentId.toLowerCase();

      return (
        (!FirstName || student.FirstName?.toLowerCase().includes(first)) &&
        (!LastName || student.LastName?.toLowerCase().includes(last)) &&
        (!Country || student.Country?.toLowerCase().includes(country)) &&
        (!University || student.University?.toLowerCase().includes(university)) &&
        (!Intake || student.Intake?.toLowerCase().includes(intake)) &&
        (!StudentId || student.id?.toLowerCase().includes(studentId))
      );
    });
  }, [students, FirstName, LastName, Country, University, Intake, StudentId]);

  const formatDate = (dateString) => {
    const date = new Date(dateString);
    return date.toLocaleDateString("en-GB", {
      day: "2-digit",
      month: "long",
      year: "numeric",
    });
  };

  const renderTableRows = (dataToRender) => {
    return dataToRender.map((student, idx) => (
      <tr
        key={idx}
        className={`text-sm border-t border-gray-200 ${
          idx % 2 === 0 ? "bg-gray-50" : "bg-white"
        }`}
      >
        <td className="p-3 whitespace-nowrap">{student.id}</td>
        <td className="p-3 whitespace-nowrap">{student.CreatedOn}</td>
        <td className="p-3 whitespace-nowrap">
          {formatDate(student.createdAt)}
        </td>
        <td className="p-3 whitespace-nowrap">
          {student.FirstName} {student.LastName}
        </td>
        <td className="p-3 whitespace-nowrap">{student.Email}</td>
        <td className="p-3 whitespace-nowrap">{student.Phone}</td>
        <td className="p-3 whitespace-nowrap">{student.Branch}</td>
        <td className="p-3 whitespace-nowrap">{student.role}</td>
        <td className="p-3 whitespace-nowrap">{student.Assigned}</td>
        <td className="p-3 whitespace-nowrap">{student.Status}</td>
        <td className="p-3 whitespace-nowrap flex gap-3 text-brandRed">
          <Link to={`/app/editprofile/${student.id}`}>
            <LiaEditSolid className="cursor-pointer" />
          </Link>
          <FaTrash className="cursor-pointer text-red-500" />
        </td>
      </tr>
    ));
  };

  return (
    <div className="overflow-x-auto p-4">
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-4">
        <Label>
          <span>First Name</span>
          <Input
            value={FirstName}
            onChange={(e) => setFirstName(e.target.value)}
            className="mt-1"
            placeholder="First Name"
          />
        </Label>
        <Label>
          <span>Last Name</span>
          <Input
            value={LastName}
            onChange={(e) => setLastName(e.target.value)}
            className="mt-1"
            placeholder="Last Name"
          />
        </Label>
        <Label>
          <span>Country</span>
          <Input
            value={Country}
            onChange={(e) => setCountry(e.target.value)}
            className="mt-1"
            placeholder="Country"
          />
        </Label>
        <Label>
          <span>University</span>
          <Input
            value={University}
            onChange={(e) => setUniversity(e.target.value)}
            className="mt-1"
            placeholder="University"
          />
        </Label>
        <Label>
          <span>Intake</span>
          <Input
            value={Intake}
            onChange={(e) => setIntake(e.target.value)}
            className="mt-1"
            placeholder="Intake"
          />
        </Label>
        <Label>
          <span>Student Id</span>
          <Input
            value={StudentId}
            onChange={(e) => setStudentId(e.target.value)}
            className="mt-1"
            placeholder="Student Id"
          />
        </Label>
        <div className="flex items-end gap-2">
          {/* <Button className="w-full bg-brandRed text-white">Search</Button> */}
          <Button
            className="w-full bg-brandRed text-white"
            onClick={() => {
              setFirstName("");
              setLastName("");
              setCountry("");
              setUniversity("");
              setIntake("");
              setStudentId("");
            }}
          >
            Clear
          </Button>
        </div>
      </div>

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
            <th className="p-3">Role</th>
            <th className="p-3">Assigned To</th>
            <th className="p-3">Status</th>
            <th className="p-3">Actions</th>
          </tr>
        </thead>
        <tbody>
          {filteredStudents.length > 0 ? (
            renderTableRows(filteredStudents)
          ) : (
            <tr>
              <td colSpan="10" className="p-4 text-center text-gray-500">
                No student profiles found.
              </td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  );
}
