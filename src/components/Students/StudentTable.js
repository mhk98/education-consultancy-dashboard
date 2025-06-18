// import React, { useState, useMemo } from "react";
// import { FaTrash } from "react-icons/fa";
// import { LiaEditSolid } from "react-icons/lia";
// import { Link } from "react-router-dom/cjs/react-router-dom";
// import {
//   Input,
//   Label,
//   Button,
// } from "@windmill/react-ui";
// import {
//   useGetAllUserQuery,
//   useGetUserDataByIdQuery,
// } from "../../features/auth/auth";

// export default function StudentTable() {
//   const [FirstName, setFirstName] = useState("");
//   const [LastName, setLastName] = useState("");
//   const [Country, setCountry] = useState("");
//   const [University, setUniversity] = useState("");
//   const [Intake, setIntake] = useState("");
//   const [StudentId, setStudentId] = useState("");


//   const role = localStorage.getItem("role");
//   const branch = localStorage.getItem("branch");
//   const id = localStorage.getItem("userId");


//   const queryArgs =
//     role === "superAdmin"
//       ? { FirstName, LastName, id: StudentId,  }
//       : role === "admin" || role === "employee"
//       ? { Branch: branch, FirstName, LastName, id: StudentId,}
//       : null;


//   const {
//     data,
//     isLoading,
//     isError,
//     error,
//   } = useGetAllUserQuery(queryArgs, { skip: !queryArgs });


//   const {
//     data: data2,
//     isLoading: isLoading2,
//     isError: isError2,
//     error: error2,
//   } = useGetUserDataByIdQuery(id);

//   const students = useMemo(() => {
//     let users = [];
  
//     if (role === "student") {
//       users = data2?.data ? [data2.data] : [];
//     } else {
//       users = data?.data || [];
//     }
  
//     // ✅ এখানে student role ফিল্টার করে নিচ্ছি
//     return users.filter(user => user.Role?.toLowerCase() === "student" && user.Profile === "active");
//   }, [role, data, data2]);
  

//   const filteredStudents = useMemo(() => {
//     return students.filter((student) => {
//       const first = FirstName.toLowerCase();
//       const last = LastName.toLowerCase();
//       const country = Country.toLowerCase();
//       const university = University.toLowerCase();
//       const intake = Intake.toLowerCase();
//       const studentId = StudentId.toLowerCase();

//       return (
//         (!FirstName || student.FirstName?.toLowerCase().includes(first)) &&
//         (!LastName || student.LastName?.toLowerCase().includes(last)) &&
//         (!Country || student.Country?.toLowerCase().includes(country)) &&
//         (!University || student.University?.toLowerCase().includes(university)) &&
//         (!Intake || student.Intake?.toLowerCase().includes(intake)) &&
//         (!StudentId || student.id?.toLowerCase().includes(studentId))
//       );
//     });
//   }, [students, FirstName, LastName, Country, University, Intake, StudentId]);

//   const formatDate = (dateString) => {
//     const date = new Date(dateString);
//     return date.toLocaleDateString("en-GB", {
//       day: "2-digit",
//       month: "long",
//       year: "numeric",
//     });
//   };


//   const renderTableRows = (dataToRender) => {
//     return dataToRender.map((student, idx) => (
//       <tr
//         key={idx}
//         className={`text-sm border-t border-gray-200 ${
//           idx % 2 === 0 ? "bg-gray-50" : "bg-white"
//         }`}
//       >
//         <td className="p-3 whitespace-nowrap">{student.id}</td>
//         <td className="p-3 whitespace-nowrap">{student.CreatedOn}</td>
//         <td className="p-3 whitespace-nowrap">
//           {formatDate(student.createdAt)}
//         </td>
//         <td className="p-3 whitespace-nowrap">
//           {student.FirstName} {student.LastName}
//         </td>
//         <td className="p-3 whitespace-nowrap">{student.Email}</td>
//         <td className="p-3 whitespace-nowrap">{student.Phone}</td>
//         <td className="p-3 whitespace-nowrap">{student.Branch}</td>
//         {/* <td className="p-3 whitespace-nowrap">{student.role}</td> */}
//         <td className="p-3 whitespace-nowrap">{student.Assigned}</td>
//         <td className="p-3 whitespace-nowrap">{student.Status}</td>
//         <td className="p-3 whitespace-nowrap flex gap-3 text-brandRed">
//           <Link to={`/app/editprofile/${student.id}`}>
//             <LiaEditSolid className="cursor-pointer" />
//           </Link>
//           {
//             role === "superAdmin" && 
//           <FaTrash className="cursor-pointer text-red-500" />

//           }
//         </td>
//       </tr>
//     ));
//   };

//   return (
//     <div className="overflow-x-auto p-4">
//       <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-4">
//         <Label>
//           <span>First Name</span>
//           <Input
//             value={FirstName}
//             onChange={(e) => setFirstName(e.target.value)}
//             className="mt-1"
//             placeholder="First Name"
//           />
//         </Label>
//         <Label>
//           <span>Last Name</span>
//           <Input
//             value={LastName}
//             onChange={(e) => setLastName(e.target.value)}
//             className="mt-1"
//             placeholder="Last Name"
//           />
//         </Label>
//         <Label>
//           <span>Country</span>
//           <Input
//             value={Country}
//             onChange={(e) => setCountry(e.target.value)}
//             className="mt-1"
//             placeholder="Country"
//           />
//         </Label>
//         <Label>
//           <span>University</span>
//           <Input
//             value={University}
//             onChange={(e) => setUniversity(e.target.value)}
//             className="mt-1"
//             placeholder="University"
//           />
//         </Label>
//         <Label>
//           <span>Intake</span>
//           <Input
//             value={Intake}
//             onChange={(e) => setIntake(e.target.value)}
//             className="mt-1"
//             placeholder="Intake"
//           />
//         </Label>
//         <Label>
//           <span>Student Id</span>
//           <Input
//             value={StudentId}
//             onChange={(e) => setStudentId(e.target.value)}
//             className="mt-1"
//             placeholder="Student Id"
//           />
//         </Label>
//         <div className="flex items-end gap-2">
//           {/* <Button className="w-full bg-brandRed text-white">Search</Button> */}
//           <Button
//             className="w-full bg-brandRed text-white"
//             onClick={() => {
//               setFirstName("");
//               setLastName("");
//               setCountry("");
//               setUniversity("");
//               setIntake("");
//               setStudentId("");
//             }}
//           >
//             Clear
//           </Button>
//         </div>
//       </div>

//       <table className="min-w-full w-full border border-gray-200 bg-white shadow-md rounded-lg">
//         <thead className="bg-gray-100 text-sm text-gray-700">
//           <tr className="text-left">
//             <th className="p-3">Student ID</th>
//             <th className="p-3">Created By</th>
//             <th className="p-3">Created On</th>
//             <th className="p-3">Name</th>
//             <th className="p-3">Email</th>
//             <th className="p-3">Phone Number</th>
//             <th className="p-3">Branch</th>
//             {/* <th className="p-3">Role</th> */}
//             <th className="p-3">Assigned To</th>
//             <th className="p-3">Status</th>
//             <th className="p-3">Actions</th>
//           </tr>
//         </thead>
//         <tbody>
//           {filteredStudents.length > 0 ? (
//             renderTableRows(filteredStudents)
//           ) : (
//             <tr>
//               <td colSpan="10" className="p-4 text-center text-gray-500">
//                 No student profiles found.
//               </td>
//             </tr>
//           )}
//         </tbody>
//       </table>
//     </div>
//   );
// }


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




// import React, { useState, useMemo, useEffect } from "react";
// import { FaTrash } from "react-icons/fa";
// import { LiaEditSolid } from "react-icons/lia";
// import { Link } from "react-router-dom";
// import { Input, Label, Button } from "@windmill/react-ui";
// import { useGetAllStudentQuery, useGetAllUserQuery, useGetUserDataByIdQuery } from "../../features/auth/auth";

// export default function StudentTable() {
//   const [firstName, setFirstName] = useState("");
//   const [lastName, setLastName] = useState("");
//   const [country, setCountry] = useState("");
//   const [university, setUniversity] = useState("");
//   const [intake, setIntake] = useState("");
//   const [studentId, setStudentId] = useState("");

//   const role = localStorage.getItem("role");
//   const branch = localStorage.getItem("branch");
//   const id = localStorage.getItem("userId");

//   const [currentPage, setCurrentPage] = useState(1);
//   const [startPage, setStartPage] = useState(1);
//   const [totalPages, setTotalPages] = useState(1);
//   const [pagesPerSet, setPagesPerSet] = useState(10);
//   const itemsPerPage = 10;

//   // Prepare query arguments for fetching users
//   const queryArgs = role
//     ? {
//         ...(role === "superAdmin"
//           ? { FirstName: firstName, LastName: lastName, id: studentId,  Role:"student" }
//           : (role === "admin" || role === "employee")
//           ? { Branch: branch, FirstName: firstName, LastName: lastName, id: studentId , Profile:"active", Role:"student"}
//           : {}),
//         page: currentPage,
//         limit: itemsPerPage,
//       }
//     : null;

//   const { data, isLoading, isError, error } = useGetAllStudentQuery(queryArgs, {
//     skip: !queryArgs,
//   });

//   const {
//     data: data2,
//     isLoading: isLoading2,
//     isError: isError2,
//     error: error2,
//   } = useGetUserDataByIdQuery(id);

//   // Update total pages when data changes
//   useEffect(() => {
//     if (isError) {
//       console.error("Error fetching user data", error);
//     } else if (data && data.meta?.total != null) {
//       setTotalPages(Math.ceil(data.meta.total / itemsPerPage));
//     }
//   }, [data, isError, error]);

//   // Responsive pagination button count
//   useEffect(() => {
//     const handleResize = () => {
//       if (window.innerWidth < 640) setPagesPerSet(5);
//       else if (window.innerWidth < 1024) setPagesPerSet(7);
//       else setPagesPerSet(10);
//     };
//     handleResize();
//     window.addEventListener("resize", handleResize);
//     return () => window.removeEventListener("resize", handleResize);
//   }, []);

//   // Prepare student list depending on role
//   const students = useMemo(() => {
//     const allUsers = role === "student" ? data2?.data ? [data2.data] : [] : data?.data || [];
//     return allUsers.filter(u => u.Role?.toLowerCase() === "student" && u.Profile === "active");
//   }, [role, data, data2]);

//   // Apply client-side filters
//   const filteredStudents = useMemo(() => {
//     const f = {
//       firstName: firstName.toLowerCase(),
//       lastName: lastName.toLowerCase(),
//       country: country.toLowerCase(),
//       university: university.toLowerCase(),
//       intake: intake.toLowerCase(),
//       studentId: studentId.toLowerCase(),
//     };
//     return students.filter(s =>
//       (!firstName || s.FirstName?.toLowerCase().includes(f.firstName)) &&
//       (!lastName || s.LastName?.toLowerCase().includes(f.lastName)) &&
//       (!country || s.Country?.toLowerCase().includes(f.country)) &&
//       (!university || s.University?.toLowerCase().includes(f.university)) &&
//       (!intake || s.Intake?.toLowerCase().includes(f.intake)) &&
//       (!studentId || s.id?.toLowerCase().includes(f.studentId))
//     );
//   }, [students, firstName, lastName, country, university, intake, studentId]);

//   const formatDate = dateString =>
//     new Date(dateString).toLocaleDateString("en-GB", { day: "2-digit", month: "long", year: "numeric" });

//   const endPage = Math.min(startPage + pagesPerSet - 1, totalPages);
//   const handlePageChange = p => {
//     setCurrentPage(p);
//     if (p < startPage) setStartPage(p);
//     else if (p > endPage) setStartPage(p - pagesPerSet + 1);
//   };
//   const handlePreviousSet = () => setStartPage(Math.max(startPage - pagesPerSet, 1));
//   const handleNextSet = () => setStartPage(Math.min(startPage + pagesPerSet, totalPages - pagesPerSet + 1));

//   return (
//     <div className="overflow-x-auto p-4">
//       {/* -- Filter Row -- */}
//       <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-4">
//         {[
//           { label: "First Name", value: firstName, setter: setFirstName },
//           { label: "Last Name", value: lastName, setter: setLastName },
//           { label: "Country", value: country, setter: setCountry },
//           { label: "University", value: university, setter: setUniversity },
//           { label: "Intake", value: intake, setter: setIntake },
//           { label: "Student ID", value: studentId, setter: setStudentId },
//         ].map(({ label, value, setter }) => (
//           <Label key={label}>
//             <span>{label}</span>
//             <Input value={value} onChange={e => setter(e.target.value)} className="mt-1" placeholder={label} />
//           </Label>
//         ))}
//         <div className="flex items-end gap-2">
//           <Button
//             className="w-full bg-brandRed text-white"
//             onClick={() => {
//               setFirstName("");
//               setLastName("");
//               setCountry("");
//               setUniversity("");
//               setIntake("");
//               setStudentId("");
//             }}
//           >
//             Clear
//           </Button>
//         </div>
//       </div>

//       {/* -- Table -- */}
//       <table className="min-w-full w-full border border-gray-200 bg-white shadow-md rounded-lg">
//         <thead className="bg-gray-100 text-sm text-gray-700">
//           <tr>
//             {["Student ID", "Created By", "Created On", "Name", "Email", "Phone Number", "Branch", "Assigned To", "Status", "Actions"].map(h => (
//               <th key={h} className="p-3 text-left">{h}</th>
//             ))}
//           </tr>
//         </thead>
//         <tbody>
//           {isLoading ? (
//             <tr>
//               <td colSpan="10" className="p-4 text-center text-gray-500">
//                 Loading student profiles...
//               </td>
//             </tr>
//           ) : filteredStudents.length > 0 ? (
//             filteredStudents.map((student, idx) => (
//               <tr key={idx} className={`text-sm border-t ${idx % 2 === 0 ? "bg-gray-50" : "bg-white"}`}>
//                 <td className="p-3 whitespace-nowrap">{student.id}</td>
//                 <td className="p-3 whitespace-nowrap">{student.CreatedBy || student.CreatedOn || "-"}</td>
//                 <td className="p-3 whitespace-nowrap">{student.createdAt ? formatDate(student.createdAt) : "-"}</td>
//                 <td className="p-3 whitespace-nowrap">{`${student.FirstName} ${student.LastName}`}</td>
//                 <td className="p-3 whitespace-nowrap">{student.Email}</td>
//                 <td className="p-3 whitespace-nowrap">{student.Phone}</td>
//                 <td className="p-3 whitespace-nowrap">{student.Branch}</td>
//                 <td className="p-3 whitespace-nowrap">{student.Assigned}</td>
//                 <td className="p-3 whitespace-nowrap">{student.Status}</td>
//                 <td className="p-3 whitespace-nowrap flex gap-3 text-brandRed">
//                   <Link to={`/app/editprofile/${student.id}`}>
//                     <LiaEditSolid className="cursor-pointer" />
//                   </Link>
//                   {role === "superAdmin" && <FaTrash className="cursor-pointer text-red-500" />}
//                 </td>
//               </tr>
//             ))
//           ) : (
//             <tr>
//               <td colSpan="10" className="p-4 text-center text-gray-500">
//                 No student profiles found.
//               </td>
//             </tr>
//           )}
//         </tbody>
//       </table>

//       {/* -- Pagination -- */}
//       <div className="flex items-center justify-center space-x-2 mt-6">
//         <button
//           onClick={handlePreviousSet}
//           disabled={startPage === 1}
//           className="px-3 py-2 text-white bg-brandRed rounded-md disabled:bg-brandDisable"
//         >
//           Prev
//         </button>
//         {[...Array(endPage - startPage + 1)].map((_, i) => {
//           const p = startPage + i;
//           return (
//             <button
//               key={p}
//               onClick={() => handlePageChange(p)}
//               className={`px-3 py-2 text-white rounded-md ${p === currentPage ? "bg-brandRed" : "bg-brandDisable"}`}
//             >
//               {p}
//             </button>
//           );
//         })}
//         <button
//           onClick={handleNextSet}
//           disabled={endPage === totalPages}
//           className="px-3 py-2 text-white bg-brandRed rounded-md disabled:bg-brandDisable"
//         >
//           Next
//         </button>
//       </div>
//     </div>
//   );
// }

