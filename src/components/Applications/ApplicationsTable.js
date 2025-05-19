// import React from "react";
// import { FaLink, FaTrash } from "react-icons/fa";

// const applications = [
//   {
//     ackNo: "EAC-001",
//     createdBy: "Mr. Tasbirul Islam Shobuj",
//     createdOn: "06/04/2025",
//     name: "MD Hossain",
//     university: "University of Toronto",
//     program: "Computer Science",
//     intake: "Fall 2025",
//     email: "shazibeac@gmail.com",
//     phone: "+8801743701127",
//     assignedTo: "Mr. Tasbirul Islam",
//     status: "App. Incomplete",
//     statusColor: "bg-brandRed-100 text-brandRed-700",
//   },
//   {
//     ackNo: "EAC-002",
//     createdBy: "Mr. Tasbirul Islam Shobuj",
//     createdOn: "21/03/2025",
//     name: "Shadika Shaba",
//     university: "McGill University",
//     program: "Business Administration",
//     intake: "Fall 2025",
//     email: "sabaeac@gmail.com",
//     phone: "+8801711071400",
//     assignedTo: "Faria Siddique",
//     status: "App. Incomplete",
//     statusColor: "bg-brandRed-100 text-brandRed-700",
//   },
//   {
//     ackNo: "EAC-003",
//     createdBy: "Mr. Tasbirul Islam Shobuj",
//     createdOn: "20/03/2025",
//     name: "Mahmudul Hasan",
//     university: "University of Waterloo",
//     program: "Data Science",
//     intake: "Winter 2026",
//     email: "hasaneac12@gmail.com",
//     phone: "+32472976019",
//     assignedTo: "Mr. Tasbirul Islam",
//     status: "App. Incomplete",
//     statusColor: "bg-brandRed-100 text-brandRed-700",
//   },
//   {
//     ackNo: "EAC-004",
//     createdBy: "Mr. Tasbirul Islam Shobuj",
//     createdOn: "17/03/2025",
//     name: "MD Ahosanul Ovi",
//     university: "York University",
//     program: "Engineering",
//     intake: "Spring 2025",
//     email: "ahosaneac@gmail.com",
//     phone: "+8801867303751",
//     assignedTo: "Mr. Tasbirul Islam",
//     status: "App. Submitted",
//     statusColor: "bg-green-100 text-green-700",
//   },
// ];

// export default function ApplicationsTable() {
//   return (
//     <div className="overflow-x-auto p-4">
//       <table className="min-w-full border border-gray-200 rounded-lg overflow-hidden bg-white shadow-md p-6">
//         <thead className="text-sm text-gray-700">
//           <tr className="text-left">
//             <th className="p-3">ACK. No.</th>
//             <th className="p-3">Date Created</th>
//             <th className="p-3">Student Name</th>
//             <th className="p-3">University Name</th>
//             <th className="p-3">Program Name</th>
//             <th className="p-3">Intake</th>
//             <th className="p-3">Created By</th>
//             <th className="p-3">Application Status</th>
//             <th className="p-3">KC Assignee</th>
//             <th className="p-3">Actions</th>
//           </tr>
//         </thead>
//         <tbody>
//           {applications.map((application, idx) => (
//             <tr
//               key={idx}
//               className={`text-sm border-t border-gray-200 ${idx % 2 === 0 ? "bg-gray-50" : "bg-white"}`}
//             >
//               <td className="p-3 whitespace-nowrap">{application.ackNo}</td>
//               <td className="p-3 whitespace-nowrap">{application.createdOn}</td>
//               <td className="p-3 whitespace-nowrap">{application.name}</td>
//               <td className="p-3 whitespace-nowrap">{application.university}</td>
//               <td className="p-3 whitespace-nowrap">{application.program}</td>
//               <td className="p-3 whitespace-nowrap">{application.intake}</td>
//               <td className="p-3 whitespace-nowrap">{application.createdBy}</td>
//               <td className="p-3 whitespace-nowrap">
//                 <span className={`text-xs px-2 py-1 rounded ${application.statusColor}`}>
//                   {application.status}
//                 </span>
//               </td>
//               <td className="p-3 whitespace-nowrap">
//                 <select className="border rounded p-1 text-sm">
//                   <option>{application.assignedTo}</option>
//                 </select>
//               </td>
//               <td className="p-3 whitespace-nowrap flex gap-3 text-brandRed">
//                 <FaLink className="cursor-pointer" />
//                 <FaTrash className="cursor-pointer text-red-500" />
//               </td>
//             </tr>
//           ))}
//         </tbody>
//       </table>
//     </div>
//   );
// }


import React, { useEffect, useState } from "react";
import { LiaEditSolid } from "react-icons/lia";
import { Link } from "react-router-dom/cjs/react-router-dom";
import { useGetAllApplicationQuery, useUpdateApplicationMutation } from "../../features/application/application";
import { BiShow } from "react-icons/bi";
import { useForm } from "react-hook-form";
import toast from "react-hot-toast";
import { Modal, ModalHeader, ModalBody, Input, Button } from '@windmill/react-ui'


export default function ApplicationsTable() {

  const [applicationId, setApplicationId] = useState("")
  const [userId, setUserId] = useState("")

const {data, isLoading, isError, error} = useGetAllApplicationQuery()
const [programs, setPrograms] = useState([]);


useEffect(() => {
if(isError) {
  console.log("Error fetching", error)
} else if(!isLoading && data) {
  setPrograms(data.data)
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

console.log("students", programs)

const FirstName = localStorage.getItem("FirstName")
const LastName = localStorage.getItem("LastName")


 const [isModalOpen, setIsModalOpen] = useState(false)
  
   function closeModal() {
    setIsModalOpen(false)
  }



    const {
      register,
      formState: { errors },
      handleSubmit,
      reset,
    } = useForm()

    const [updateApplication] = useUpdateApplicationMutation()


 


    const onFormEdit = async (data) => {
      const info = {
        assignee:data.assignee,
        status:data.status,
        user_id: userId
      }

      console.log("info", info)
    try {
      const res = await updateApplication({id:applicationId, data:info});
      if (res.data?.success) {
        toast.success(res.data.message);
      } else {
        toast.error(res.error?.data?.message || "Registration failed. Please try again.");
      }
    } catch (error) {
      toast.error("An unexpected error occurred.");
    }
  };
  return (
    <div className="overflow-x-auto p-4">
      <table className="min-w-full border border-gray-200 rounded-lg overflow-hidden bg-white shadow-md p-6">
        <thead className="text-sm text-gray-700">
          <tr className="text-left">
            <th className="p-3">Ack No</th>
            <th className="p-3">Date Created</th>
            <th className="p-3">Student</th>
            <th className="p-3">University</th>
            <th className="p-3">Program</th>
            <th className="p-3">Intake</th>
            <th className="p-3">Created</th>
            <th className="p-3">Status</th>
            <th className="p-3">Assignee</th>
            <th className="p-3">Actions</th>
          </tr>
        </thead>
        <tbody>
          {programs.map((program, idx) => (
            <tr
              key={idx}
              className={`text-sm border-t border-gray-200 ${idx % 2 === 0 ? "bg-gray-50" : "bg-white"}`}
            >
              <td className="p-3 whitespace-nowrap">{program.acknowledge}</td>
              <td className="p-3 whitespace-nowrap">{formatDate(program.createdAt)}</td>
              <td className="p-3 whitespace-nowrap">{program.FirstName} {program.LastName}</td>
              <td className="p-3 whitespace-nowrap">{program.university}</td>
              <td className="p-3 whitespace-nowrap">{program.program}</td>
              <td className="p-3 whitespace-nowrap">{program.intake}</td>
              <td className="p-3 whitespace-nowrap">{FirstName} {LastName}</td>
              <td className="p-3 whitespace-nowrap">{program.status}</td>
              <td className="p-3 whitespace-nowrap">{program.assignee}</td>
              <td className="p-3 whitespace-nowrap flex gap-3 text-brandRed">
                {/* <FaLink className="cursor-pointer" /> */}
                <Link to={`/app/editprofile/${program.id}`}>
                <BiShow fontSize={20} className="cursor-pointer" />
                </Link>
                <LiaEditSolid fontSize={20} onClick={() => {
            setIsModalOpen(true);
            setApplicationId(program.id);
            setUserId(program.user_id);
          }}  className="cursor-pointer" />
              </td>

              <Modal isOpen={isModalOpen} onClose={closeModal}>
                                      <ModalHeader className="mb-8">Edit Application</ModalHeader>
                                      <ModalBody>
                                      <form onSubmit={handleSubmit(onFormEdit)}>
                          <div className="grid grid-cols-1 gap-4">
                            {/* Left Side */}
                      
                              <div className="mb-4">
                                <label className="block text-sm mb-1 text-gray-700 mb-4">Application Status</label>
                                <select
                                    {...register("status")}
                                    className="input input-bordered w-full shadow-md p-3"
                                  >
                                    <option value="">Select Status</option>
                                    <option value="Application Submitted">Application Submitted</option>
                                    <option value="Application on Hold - University">Application on Hold - University</option>
                                    <option value="Case Closed - Student Not Qualified">Case Closed - Student Not Qualified</option>
                                  </select>
                                  {errors.status && (
                                    <p className="text-red-500 text-sm mt-1">{errors.status.message}</p>
                                  )}
                              </div>
                              <div className="mb-4">
                                <label className="block text-sm mb-1 text-gray-700">EduAnchor Assignee</label>
                                <select
                                    {...register("assignee")}
                                    className="input input-bordered w-full shadow-md p-3"
                                  >
                                    <option value="">Select Assignee</option>
                                    <option value="Rakib">Rakib</option>
                                    <option value="Shakib">Shakib</option>
                                    <option value="Habib">Habib</option>
                                  </select>
                                  {errors.assignee && (
                                    <p className="text-red-500 text-sm mt-1">{errors.assignee.message}</p>
                                  )}
                              </div>              
                          </div>
                        
                          <div className="flex justify-end gap-2 mt-6">
                            <Button type="submit" className="btn" style={{backgroundColor:"#C71320"}}>
                              Save
                            </Button>
                          </div>
                        </form>
                        
                                      </ModalBody>
                                    </Modal>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

