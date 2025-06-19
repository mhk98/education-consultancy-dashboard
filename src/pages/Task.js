// import React, { useState, useEffect } from 'react';
// import { Modal, ModalHeader, ModalBody, Input, Button, Label } from '@windmill/react-ui';
// import toast from 'react-hot-toast';
// import { useForm } from 'react-hook-form';
// import { LiaEditSolid } from 'react-icons/lia';
// import { FaTrash } from 'react-icons/fa';
// import { Select } from '@windmill/react-ui';
// import { useCreateTaskMutation, useDeleteTaskMutation, useGetAllTaskQuery, useUpdateTaskMutation } from '../features/task/task';
// import axios from 'axios';


// function Task() {

//   const role = localStorage.getItem("role")
//   const branch = localStorage.getItem("branch")
//   const user_id = localStorage.getItem("userId")
//   const first_Name = localStorage.getItem("FirstName")
//   const last_Name = localStorage.getItem("LastName")
//     const [file, setFile] = useState(null);
//       const handleFileChange = (e) => {
//         setFile(e.target.files[0]);
//       };


//   // Form setup
//   const {
//     register,
//     handleSubmit,
//     reset,
//     formState: { errors },
//   } = useForm();

  
//   const [createTask] = useCreateTaskMutation();


//   const onFormSubmit = async (data) => {
//     const formData = new FormData();
//     formData.append("id", data.assignedTo);
//     formData.append("user_id", user_id);
//     formData.append("assignor", `${first_Name} ${last_Name}`); 
//     formData.append("task", data.task); 
//     formData.append("branch", branch); 
//     formData.append("dueDate", data.dueDate); 
//     formData.append("description", data.description); 
//     formData.append("comment", data.comment); 
//     if (file) {
//         formData.append("file", file);
//     }
 
//     try {
//       const res = await createTask(formData);
//       if (res.data?.success) {
//         toast.success(res.data.message);
//         reset();
//         setIsModalOpen(false)
//       } else {
//         toast.error(res.error?.data?.message || 'Failed. Please try again.');
//       }
//     } catch (error) {
//       toast.error('An unexpected error occurred.');
//     }
//   };


 
//   const [admins, setAdmins] = useState([]);

//   useEffect(() => {
//     const fetchUsers = async () => {
//       try {
//         const response = await axios.get("https://api.eaconsultancy.info/api/v1/user/student");
//         const allUsers = response.data.data;
  
//         // ফিল্টার লজিক
//         const filtered = allUsers.filter(user => {
//           const role = user.Role?.toLowerCase(); // রোল lowercase করে নিচ্ছি
//           return role && role !== "student" && (
//             role === "superadmin" || (role === "admin" && user.Branch === branch) || (role === "employee" && user.Branch === branch)
//           );
//         });
  
//         setAdmins(filtered);
//       } catch (err) {
//         console.error("Error fetching users:", err);
//       }
//     };
  
//     fetchUsers();
//   }, [branch]);
  
    



//   const [superAdmins, setSuperAdmins] = useState([]);

//   useEffect(() => {
//     const fetchUsers = async () => {
//       try {
//         const response = await axios.get("https://api.eaconsultancy.info/api/v1/user/student"); // Replace with your API endpoint
//         const allUsers = response.data.data;
  
//         // Filter out students
//         const filtered = allUsers.filter(user => user.Role?.toLowerCase() !== "student");
//         setSuperAdmins(filtered);
//       } catch (err) {
//         console.error("Error fetching users:", err);
      
//       }
//     };
  
//     fetchUsers();
//   }, []);
  

//   console.log("Admins:", admins);
//   console.log("superAdmins:", superAdmins);
                  
      
//   // Modal logic
//   const [isModalOpen, setIsModalOpen] = useState(false)
   
//     function closeModal() {
//      setIsModalOpen(false)
//    }

 
// const [isModalOpen1, setIsModalOpen1] = useState(false)
   
//     function closeModal1() {
//      setIsModalOpen1(false)
//    }
//    const [taskId, setTaskId] = useState("")
         
//              const [updateTask] = useUpdateTaskMutation()
         
//              const onFormEdit = async (data) => { 
  
//              try {
//                const res = await updateTask({id:taskId, data});
//                if (res.data?.success) {
//                  toast.success(res.data.message);
//                  reset()
//           setIsModalOpen1(false)

//                } else {
//                  toast.error(res.error?.data?.message || "Failed. Please try again.");
//                }
//              } catch (error) {
//                toast.error("An unexpected error occurred.");
//              }
//            };
         
//              const [deleteTask] = useDeleteTaskMutation()
         
//              const handleDeleteUser = async (id) => {
//              try {
//                const res = await deleteTask(id);
//                if (res.data?.success) {
//                  toast.success(res.data.message);
//                } else {
//                  toast.error(res.error?.data?.message || "Failed. Please try again.");
//                }
//              } catch (error) {
//                toast.error("An unexpected error occurred.");
//              }
//            };


//            const handleEnter = (e) => {
//             if (e.key === 'Enter') {
//               e.preventDefault();
//               const form = e.target.form;
//               const index = Array.prototype.indexOf.call(form, e.target);
//               form.elements[index + 1]?.focus();
//             }
//           };
          


//           const { data, isLoading, isError, error } = useGetAllTaskQuery({ user_id, assignedTo_id:user_id});

//           const [tasks, setTasks] = useState([])
//           useEffect(() => {
//               if (isError) {
//                   console.error("Error fetching product data", error);
//               } else if (!isLoading && data) {
//                 setTasks(data.data);
//               }
//           }, [data, isLoading, isError, error]);

          

      

//   return (
//     <>
//       <div className="w-full px-4 py-6 bg-gray-50">

//         <div className="max-w-7xl mx-auto flex flex-col lg:flex-row lg:items-center lg:justify-between gap-4">
//           {/* Header Section */}
//           <div>
//             <h4 className="text-2xl md:text-md font-semibold text-gray-900">Task Management</h4>

    
//             {/* Modal */}
//             <Modal isOpen={isModalOpen} onClose={closeModal}>
//                                     <ModalHeader>Task Management</ModalHeader>
//                                     <ModalBody>
//                                     <form onSubmit={handleSubmit(onFormSubmit)}>
//                         <div className="grid grid-cols-1 gap-4">
//                           {/* Left Side */}
                    
//            <div>
//           <label htmlFor="startDate" className="block mb-1 font-medium">Due Date</label>
//           <input
//             type="date"
//             id="dueDate"
//             name="dueDate"
//             {...register("dueDate")}
//             className="w-full border rounded p-2"
//           />
//         </div>
//                             <div className="mb-4">
//                               <label className="block text-sm mb-1 text-gray-700">Task</label>
//                               <Input
//                                 type="text"
//                                 {...register("task")}
//                                 onKeyDown={handleEnter}
//                                 className="input input-bordered w-full form-control shadow-md p-3"
//                               />
//                               {errors.task && (
//                                 <p className="text-red-500 text-sm mt-1">{errors.task.message}</p>
//                               )}
//                             </div>
//                             <div className="mb-4">
//                               <label className="block text-sm mb-1 text-gray-700">Description</label>
//                               <Input
//                                 type="text"
//                                 {...register("description")}
//                                 onKeyDown={handleEnter}
//                                 className="input input-bordered w-full form-control shadow-md p-3"
//                               />
//                               {errors.description && (
//                                 <p className="text-red-500 text-sm mt-1">{errors.description.message}</p>
//                               )}
//                             </div>
//                             <div className="mb-4">
//                               <label className="block text-sm mb-1 text-gray-700">Comment</label>
//                               <Input
//                                 type="text"
//                                 {...register("comment")}
//                                 onKeyDown={handleEnter}
//                                 className="input input-bordered w-full form-control shadow-md p-3"
//                               />
//                               {errors.comment && (
//                                 <p className="text-red-500 text-sm mt-1">{errors.comment.message}</p>
//                               )}
//                             </div>
                            


//                    {
//                     role === "superAdmin" ? (
                      
//                       <div className="mt-4">
//                       <label className="block text-sm mb-1 text-gray-700 mb-4">Assignee</label>
   
//                                    <Select name="assignedTo" {...register('assignedTo')} className="mt-1">
//                                      <option>Select Assigned To</option>
//                                      {superAdmins.map((admin) => (
//                                        <option key={admin.id} value={admin.id}>
//                                          {admin.FirstName} {admin.LastName}
//                                        </option>
//                                      ))}
//                                    </Select>
//                                    {errors.assignedTo && <p className="text-red-500 text-xs mt-1">{errors.assignedTo.message}</p>}
//                                  </div>
//                     ): (
//                       <div className="mt-4">
//                       <label className="block text-sm mb-1 text-gray-700 mb-4">Assignee</label>
   
//                                    <Select name="assignedTo" {...register('assignedTo')} className="mt-1">
//                                      <option>Select Assigned To</option>
//                                      {admins.map((admin) => (
//                                        <option key={admin.id} value={admin.id}>
//                                          {admin.FirstName} {admin.LastName}
//                                        </option>
//                                      ))}
//                                    </Select>
//                                    {errors.assignedTo && <p className="text-red-500 text-xs mt-1">{errors.assignedTo.message}</p>}
//                                  </div>
//                     )
//                    }

//                               <div className="mb-4">
//                     <label className="block text-sm text-gray-700 mb-2">
//                       Branch
//                     </label>
//                     <select
//                       {...register("branch")}
//                       onKeyDown={handleEnter}
//                       className="input input-bordered w-full shadow-md p-3"
//                     >
//                       <option value="">Select Branch</option>
//                         <option value="Edu Anchor">Edu Anchor</option>

//             <option value="Khulna">Khulna</option>
//             <option value="Satkhira">Satkhira</option>
//             <option value="Tangail">Tangail</option>
//             <option value="Jashore">Jashore</option>
//             <option value="Rangpur">Rangpur</option>
//             <option value="Dinajpur">Dinajpur</option>
//             <option value="Gopalganj">Gopalganj</option>
//             <option value="Savar">Savar</option>
//             <option value="Feni">Feni</option>
//                     </select>
//                     {errors.branch && (
//                       <p className="text-red-500 text-sm mt-1">{errors.branch.message}</p>
//                     )}
//                   </div>
//                               <div>
//                         <label className="block text-sm mb-1 text-gray-700">Attachments</label>
//                         <input
//                           type="file"
//                           name="file"
//                           accept="image/*,application/pdf"
//                           onChange={handleFileChange}
//                           className="input"
//                         />
//                       </div>
                     
//                         </div>
                      
//                         <div className="flex justify-end gap-2 mt-6">
//                           <Button type="submit" className="btn" style={{backgroundColor:"#C71320"}}>
//                             Save
//                           </Button>
//                         </div>
//                       </form>
                      
//                                     </ModalBody>
//                                   </Modal>
//           </div>

//           {/* Right Buttons */}
//            <div className="flex flex-col sm:flex-row gap-3">
//             <button onClick={() => {
//             setIsModalOpen(true)
//           }}  className="px-4 py-2 bg-brandRed text-white rounded-md text-sm md:text-base hover:bg-brandRed-700 transition">
//               + Add Task
//             </button>
//           </div>
          
//         </div>

//         {/* Conditional Tab Content */}
//         <div className="mt-4 p-4 bg-white rounded-md shadow-md">
//   <div className="w-full overflow-x-auto">
//     <table className="w-full text-sm text-left text-gray-700 bg-white shadow-md rounded-lg">
//       <thead className="bg-gray-100 border-b border-gray-200">
//         <tr>
//           <th className="p-3 min-w-[180px]">Due Date</th>
//           <th className="p-3 min-w-[180px]">Assignor</th>
//           <th className="p-3 min-w-[180px]">Assigned To</th>
//           <th className="p-3 min-w-[180px]">Task</th>
//           <th className="p-3 min-w-[180px]">Description</th>
//           <th className="p-3 min-w-[180px]">Attachments</th>
//           <th className="p-3 min-w-[160px]">Status</th>
//           <th className="p-3 min-w-[160px]">Comment</th>
//           <th className="p-3 min-w-[160px]">Action</th>
//         </tr>
//       </thead>

//       <tbody>
//         {tasks.map((task, idx) => (
//           <tr
//             key={idx}
//             className={`border-b border-gray-200 ${idx % 2 === 0 ? "bg-gray-50" : "bg-white"}`}
//           >
//             <td className="p-3 whitespace-nowrap">{task.dueDate}</td>
//             <td className="p-3 whitespace-nowrap">{task.assignor}</td>
//             <td className="p-3 whitespace-nowrap">{task.assignedTo}</td>
//             <td className="p-3 whitespace-nowrap">{task.task}</td>
//             <td className="p-3 whitespace-nowrap">{task.description}</td>
//            {
//             task.file ?
//             <td className="p-3 whitespace-nowrap">
//             <a
//               href={`https://api.eaconsultancy.info/${task.file}`}
//               target="_blank"
//               rel="noopener noreferrer"
//               className="text-brandRed"
//             >
//               Preview PDF
//             </a>
//           </td> : <p>Not Available</p>
//            }
//             <td className="p-3 whitespace-nowrap">{task.status}</td>
//             <td className="p-3 whitespace-nowrap">{task.comment}</td>
//             <td className="p-3 whitespace-nowrap flex gap-3 text-brandRed">
//               <LiaEditSolid
//                 fontSize={20}
//                 className="cursor-pointer"
//                 onClick={() => {
//                   setIsModalOpen1(true);
//                   setTaskId(task.id)
//                 }}
//               />
//               <FaTrash
//                 fontSize={20}
//                 className="cursor-pointer text-red-500"
//                 onClick={() => handleDeleteUser(task.id)}
//               />
//             </td>
//           </tr>
//         ))}
//       </tbody>

// {/* Modal should be placed outside the map */}
// <Modal isOpen={isModalOpen1} onClose={closeModal1}>
//   <ModalHeader className="mb-8">Edit Task Information</ModalHeader>
//   <ModalBody>
//     <form onSubmit={handleSubmit(onFormEdit)}>
//       <div className="grid grid-cols-1 gap-4">
//        {
//         role === "superAdmin" ? (
//           <div className="mb-4">
//           <label className="block text-sm text-gray-700 mb-2">
//            Task Status
//           </label>
//           <select
//             {...register("status")}
//             className="input input-bordered w-full shadow-md p-3"
//           >
//             <option value="">Select Status</option>
//             <option value="PENDING">PENDING</option>
//             <option value="APPROVED">APPROVED</option>
//           </select>
//           {errors.status && (
//             <p className="text-red-500 text-sm mt-1">{errors.status.message}</p>
//           )}
//         </div>
//         ) : (
//           <div className="mb-4">
//           <label className="block text-sm text-gray-700 mb-2">
//            Task Status
//           </label>
//           <select
//             {...register("status")}
//             className="input input-bordered w-full shadow-md p-3"
//           >
//             <option value="">Select Status</option>
//             <option value="COMPLETE">COMPLETE</option>
//             <option value="PENDING">PENDING</option>
//           </select>
//           {errors.status && (
//             <p className="text-red-500 text-sm mt-1">{errors.status.message}</p>
//           )}
//         </div>
//         )
//        }
//       </div>

//       <div className="flex justify-end gap-2 mt-6">
//         <Button type="submit" className="btn" style={{backgroundColor:"#C71320"}}>
//           Save
//         </Button>
//       </div>
//     </form>
//   </ModalBody>
// </Modal>

//     </table>
//   </div>

// </div>

//       </div>
//     </>
//   );
// }

// export default Task;









import React, { useState, useEffect } from 'react';
import { Modal, ModalHeader, ModalBody, Input, Button, Label, Select } from '@windmill/react-ui';
import toast from 'react-hot-toast';
import { useForm } from 'react-hook-form';
import { LiaEditSolid } from 'react-icons/lia';
import { FaTrash } from 'react-icons/fa';
import axios from 'axios';
import {
  useCreateTaskMutation,
  useDeleteTaskMutation,
  useGetAllTaskQuery,
  useUpdateTaskMutation,
} from '../features/task/task';

function Task() {
  const role = localStorage.getItem('role');
  const branch = localStorage.getItem('branch');
  const user_id = localStorage.getItem('userId');
  const first_Name = localStorage.getItem('FirstName');
  const last_Name = localStorage.getItem('LastName');

  const [file, setFile] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isModalOpen1, setIsModalOpen1] = useState(false);
  const [taskId, setTaskId] = useState('');

  const [admins, setAdmins] = useState([]);
  const [superAdmins, setSuperAdmins] = useState([]);
  const [tasks, setTasks] = useState([]);

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm();

  const [createTask] = useCreateTaskMutation();
  const [updateTask] = useUpdateTaskMutation();
  const [deleteTask] = useDeleteTaskMutation();

  const { data, isLoading, isError, error } = useGetAllTaskQuery({ user_id, assignedTo_id: user_id });


  console.log("task", data?.data)
  // Pagination
  const [currentPage, setCurrentPage] = useState(1);
  const tasksPerPage = 10;

  useEffect(() => {
    if (!isLoading && data) {
      setTasks(data.data);
    }
  }, [data, isLoading]);

  const indexOfLastTask = currentPage * tasksPerPage;
  const indexOfFirstTask = indexOfLastTask - tasksPerPage;
  const currentTasks = tasks.slice(indexOfFirstTask, indexOfLastTask);
  const totalPages = Math.ceil(tasks.length / tasksPerPage);

  const paginate = (pageNumber) => setCurrentPage(pageNumber);

  const onFormSubmit = async (data) => {
    const formData = new FormData();
    formData.append('id', data.assignedTo);
    formData.append('user_id', user_id);
    formData.append('assignor', `${first_Name} ${last_Name}`);
    formData.append('task', data.task);
    formData.append('branch', branch);
    formData.append('dueDate', data.dueDate);
    formData.append('description', data.description);
    formData.append('comment', data.comment);
    if (file) formData.append('file', file);

    try {
      const res = await createTask(formData);
      if (res.data?.success) {
        toast.success(res.data.message);
        reset();
        setIsModalOpen(false);
      } else {
        toast.error(res.error?.data?.message || 'Failed. Please try again.');
      }
    } catch {
      toast.error('An unexpected error occurred.');
    }
  };

  const onFormEdit = async (data) => {
    try {
      const res = await updateTask({ id: taskId, data });
      if (res.data?.success) {
        toast.success(res.data.message);
        reset();
        setIsModalOpen1(false);
      } else {
        toast.error(res.error?.data?.message || 'Failed. Please try again.');
      }
    } catch {
      toast.error('An unexpected error occurred.');
    }
  };

  const handleDeleteUser = async (id) => {
    try {
      const res = await deleteTask(id);
      if (res.data?.success) {
        toast.success(res.data.message);
      } else {
        toast.error(res.error?.data?.message || 'Failed. Please try again.');
      }
    } catch {
      toast.error('An unexpected error occurred.');
    }
  };

  const handleFileChange = (e) => setFile(e.target.files[0]);

  const handleEnter = (e) => {
    if (e.key === 'Enter') {
      e.preventDefault();
      const form = e.target.form;
      const index = Array.prototype.indexOf.call(form, e.target);
      form.elements[index + 1]?.focus();
    }
  };

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const response = await axios.get('https://api.eaconsultancy.info/api/v1/user/student');
        const allUsers = response.data.data;
        const filteredAdmins = allUsers.filter(
          (user) =>
            user.Role?.toLowerCase() !== 'student' &&
            (user.Role?.toLowerCase() === 'superadmin' ||
              (user.Role?.toLowerCase() === 'admin' && user.Branch === branch) ||
              (user.Role?.toLowerCase() === 'employee' && user.Branch === branch))
        );
        setAdmins(filteredAdmins);
        setSuperAdmins(allUsers.filter((user) => user.Role?.toLowerCase() !== 'student'));
      } catch (err) {
        console.error('Error fetching users:', err);
      }
    };
    fetchUsers();
  }, [branch]);

  return (
    <div className="w-full px-4 py-6 bg-gray-50">
      <div className="max-w-7xl mx-auto flex flex-col lg:flex-row lg:items-center lg:justify-between gap-4">
        <div>
          <h4 className="text-2xl md:text-md font-semibold text-gray-900">Task Management</h4>
        </div>
        <div className="flex flex-col sm:flex-row gap-3">
          <button
            onClick={() => setIsModalOpen(true)}
            className="px-4 py-2 bg-brandRed text-white rounded-md text-sm md:text-base"
          >
            + Add Task
          </button>
        </div>
      </div>

      <div className="mt-4 p-4 bg-white rounded-md shadow-md overflow-x-auto">
        <table className="w-full text-sm text-left text-gray-700 bg-white rounded-lg">
          <thead className="bg-gray-100 border-b border-gray-200">
            <tr>
              <th className="p-3">Due Date</th>
              <th className="p-3">Assignor</th>
              <th className="p-3">Assigned To</th>
              <th className="p-3">Task</th>
              <th className="p-3">Description</th>
              <th className="p-3">Attachments</th>
              <th className="p-3">Status</th>
              <th className="p-3">Comment</th>
              <th className="p-3">Action</th>
            </tr>
          </thead>
          <tbody>
            {currentTasks.map((task, idx) => (
              <tr key={idx} className="border-b border-gray-200">
                <td className="p-3">{task.dueDate}</td>
                <td className="p-3">{task.assignor}</td>
                <td className="p-3">{task.assignedTo}</td>
                <td className="p-3">{task.task}</td>
                <td className="p-3">{task.description}</td>
                <td className="p-3">
                  {task.file ? (
                    <a
                      href={`https://api.eaconsultancy.info/${task.file}`}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-brandRed"
                    >
                      Preview
                    </a>
                  ) : (
                    'Not Available'
                  )}
                </td>
                <td className="p-3">{task.status}</td>
                <td className="p-3">{task.comment}</td>
                <td className="p-3 flex gap-2">
                  <LiaEditSolid
                    className="cursor-pointer"
                    onClick={() => {
                      setIsModalOpen1(true);
                      setTaskId(task.id);
                    }}
                  />
                  <FaTrash className="cursor-pointer text-red-500" onClick={() => handleDeleteUser(task.id)} />
                </td>
              </tr>
            ))}
          </tbody>
        </table>

        {/* Pagination Controls */}
        <div className="flex justify-center mt-6 space-x-2">
  <Button
    className={`text-white px-4 py-2 rounded ${
      currentPage === 1 ? 'bg-brandDisable cursor-not-allowed' : 'bg-brandRed hover:bg-brandRed-700'
    }`}
    disabled={currentPage === 1}
    onClick={() => paginate(currentPage - 1)}
  >
    Prev
  </Button>

  {[...Array(totalPages)].map((_, index) => (
    <Button
      key={index}
      className={`px-4 py-2 rounded text-white ${
        currentPage === index + 1
          ? 'bg-brandRed'
          : 'bg-brandDisable hover:bg-brandRed-700'
      }`}
      onClick={() => paginate(index + 1)}
    >
      {index + 1}
    </Button>
  ))}

  <Button
    className={`text-white px-4 py-2 rounded ${
      currentPage === totalPages ? 'bg-brandDisable cursor-not-allowed' : 'bg-brandRed hover:bg-brandRed-700'
    }`}
    disabled={currentPage === totalPages}
    onClick={() => paginate(currentPage + 1)}
  >
    Next
  </Button>
</div>

      </div>

      {/* Add Task Modal */}
      <Modal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)}>
        <ModalHeader>Add Task</ModalHeader>
        <ModalBody>
                                    <form onSubmit={handleSubmit(onFormSubmit)}>
                        <div className="grid grid-cols-1 gap-4">
                          {/* Left Side */}
                    
           <div>
          <label htmlFor="startDate" className="block mb-1 font-medium">Due Date</label>
          <input
            type="date"
            id="dueDate"
            name="dueDate"
            {...register("dueDate")}
            className="w-full border rounded p-2"
          />
        </div>
                            <div className="mb-4">
                              <label className="block text-sm mb-1 text-gray-700">Task</label>
                              <Input
                                type="text"
                                {...register("task")}
                                onKeyDown={handleEnter}
                                className="input input-bordered w-full form-control shadow-md p-3"
                              />
                              {errors.task && (
                                <p className="text-red-500 text-sm mt-1">{errors.task.message}</p>
                              )}
                            </div>
                            <div className="mb-4">
                              <label className="block text-sm mb-1 text-gray-700">Description</label>
                              <Input
                                type="text"
                                {...register("description")}
                                onKeyDown={handleEnter}
                                className="input input-bordered w-full form-control shadow-md p-3"
                              />
                              {errors.description && (
                                <p className="text-red-500 text-sm mt-1">{errors.description.message}</p>
                              )}
                            </div>
                            <div className="mb-4">
                              <label className="block text-sm mb-1 text-gray-700">Comment</label>
                              <Input
                                type="text"
                                {...register("comment")}
                                onKeyDown={handleEnter}
                                className="input input-bordered w-full form-control shadow-md p-3"
                              />
                              {errors.comment && (
                                <p className="text-red-500 text-sm mt-1">{errors.comment.message}</p>
                              )}
                            </div>
                            


                   {
                    role === "superAdmin" ? (
                      
                      <div className="mt-4">
                      <label className="block text-sm mb-1 text-gray-700 mb-4">Assignee</label>
   
                                   <Select name="assignedTo" {...register('assignedTo')} className="mt-1">
                                     <option>Select Assigned To</option>
                                     {superAdmins.map((admin) => (
                                       <option key={admin.id} value={admin.id}>
                                         {admin.FirstName} {admin.LastName}
                                       </option>
                                     ))}
                                   </Select>
                                   {errors.assignedTo && <p className="text-red-500 text-xs mt-1">{errors.assignedTo.message}</p>}
                                 </div>
                    ): (
                      <div className="mt-4">
                      <label className="block text-sm mb-1 text-gray-700 mb-4">Assignee</label>
   
                                   <Select name="assignedTo" {...register('assignedTo')} className="mt-1">
                                     <option>Select Assigned To</option>
                                     {admins.map((admin) => (
                                       <option key={admin.id} value={admin.id}>
                                         {admin.FirstName} {admin.LastName}
                                       </option>
                                     ))}
                                   </Select>
                                   {errors.assignedTo && <p className="text-red-500 text-xs mt-1">{errors.assignedTo.message}</p>}
                                 </div>
                    )
                   }

                              <div className="mb-4">
                    <label className="block text-sm text-gray-700 mb-2">
                      Branch
                    </label>
                    <select
                      {...register("branch")}
                      onKeyDown={handleEnter}
                      className="input input-bordered w-full shadow-md p-3"
                    >
                      <option value="">Select Branch</option>
                        <option value="Edu Anchor">Edu Anchor</option>

            <option value="Khulna">Khulna</option>
            <option value="Satkhira">Satkhira</option>
            <option value="Tangail">Tangail</option>
            <option value="Jashore">Jashore</option>
            <option value="Rangpur">Rangpur</option>
            <option value="Dinajpur">Dinajpur</option>
            <option value="Gopalganj">Gopalganj</option>
            <option value="Savar">Savar</option>
            <option value="Feni">Feni</option>
                    </select>
                    {errors.branch && (
                      <p className="text-red-500 text-sm mt-1">{errors.branch.message}</p>
                    )}
                  </div>
                              <div>
                        <label className="block text-sm mb-1 text-gray-700">Attachments</label>
                        <input
                          type="file"
                          name="file"
                          accept="image/*,application/pdf"
                          onChange={handleFileChange}
                          className="input"
                        />
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

      {/* Edit Task Modal */}
      <Modal isOpen={isModalOpen1} onClose={() => setIsModalOpen1(false)}>
        <ModalHeader>Edit Task</ModalHeader>
        <ModalBody>
    <form onSubmit={handleSubmit(onFormEdit)}>
      <div className="grid grid-cols-1 gap-4">
       {
        role === "superAdmin" ? (
          <div className="mb-4">
          <label className="block text-sm text-gray-700 mb-2">
           Task Status
          </label>
          <select
            {...register("status")}
            className="input input-bordered w-full shadow-md p-3"
          >
            <option value="">Select Status</option>
            <option value="PENDING">PENDING</option>
            <option value="APPROVED">APPROVED</option>
          </select>
          {errors.status && (
            <p className="text-red-500 text-sm mt-1">{errors.status.message}</p>
          )}
        </div>
        ) : (
          <div className="mb-4">
          <label className="block text-sm text-gray-700 mb-2">
           Task Status
          </label>
          <select
            {...register("status")}
            className="input input-bordered w-full shadow-md p-3"
          >
            <option value="">Select Status</option>
            <option value="COMPLETE">COMPLETE</option>
            <option value="PENDING">PENDING</option>
          </select>
          {errors.status && (
            <p className="text-red-500 text-sm mt-1">{errors.status.message}</p>
          )}
        </div>
        )
       }
      </div>

      <div className="flex justify-end gap-2 mt-6">
        <Button type="submit" className="btn" style={{backgroundColor:"#C71320"}}>
          Save
        </Button>
      </div>
    </form>
  </ModalBody>
      </Modal>
    </div>
  );
}

export default Task;
