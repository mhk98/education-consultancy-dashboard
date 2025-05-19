import React, { useState, useEffect } from 'react';
import { Modal, ModalHeader, ModalBody, Input, Button, Label } from '@windmill/react-ui';
import toast from 'react-hot-toast';
import { useForm } from 'react-hook-form';
import { LiaEditSolid } from 'react-icons/lia';
import { FaTrash } from 'react-icons/fa';
import { Select } from '@windmill/react-ui';
import { useCreateTaskMutation, useDeleteTaskMutation, useGetAllTaskQuery, useUpdateTaskMutation } from '../features/task/task';
import axios from 'axios';


function Task() {

  const role = localStorage.getItem("role")
  const branch = localStorage.getItem("branch")
  const user_id = localStorage.getItem("userId")
  const first_Name = localStorage.getItem("FirstName")
  const last_Name = localStorage.getItem("LastName")

  const [admins, setAdmins] = useState([]);
    const [file, setFile] = useState(null);
      const handleFileChange = (e) => {
        setFile(e.target.files[0]);
      };


  // Form setup
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm();

  
  const [createTask] = useCreateTaskMutation();


  const onFormSubmit = async (data) => {
    const formData = new FormData();
    formData.append("id", data.assignedTo);
    formData.append("user_id", user_id);
    formData.append("assignor", `${first_Name} ${last_Name}`); 
    formData.append("task", data.task); 
    formData.append("branch", branch); 
    formData.append("description", data.description); 
    formData.append("comment", data.comment); 
    if (file) {
        formData.append("file", file);
    }
 
    try {
      const res = await createTask(formData);
      if (res.data?.success) {
        toast.success(res.data.message);
        reset();
        closeModal();
      } else {
        toast.error(res.error?.data?.message || 'Failed. Please try again.');
      }
    } catch (error) {
      toast.error('An unexpected error occurred.');
    }
  };


 


  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const response = await axios.get("http://localhost:5000/api/v1/user"); // Replace with your API endpoint
        const allUsers = response.data.data;
  
        // Filter out students
        const filtered = allUsers.filter(user => user.Role?.toLowerCase() !== "student" && user.Branch === branch);
        setAdmins(filtered);
      } catch (err) {
        console.error("Error fetching users:", err);
      
      }
    };
  
    fetchUsers();
  }, []);
  

  console.log("Admins:", admins);
                  
      
  // Modal logic
  const [isModalOpen, setIsModalOpen] = useState(false)
   
    function closeModal() {
     setIsModalOpen(false)
   }

 
const [isModalOpen1, setIsModalOpen1] = useState(false)
   
    function closeModal1() {
     setIsModalOpen1(false)
   }
   const [taskId, setTaskId] = useState("")
         
             const [updateTask] = useUpdateTaskMutation()
         
             const onFormEdit = async (data) => { 
  
             try {
               const res = await updateTask({id:taskId, data});
               if (res.data?.success) {
                 toast.success(res.data.message);
               } else {
                 toast.error(res.error?.data?.message || "Failed. Please try again.");
               }
             } catch (error) {
               toast.error("An unexpected error occurred.");
             }
           };
         
             const [deleteTask] = useDeleteTaskMutation()
         
             const handleDeleteUser = async (id) => {
             try {
               const res = await deleteTask(id);
               if (res.data?.success) {
                 toast.success(res.data.message);
               } else {
                 toast.error(res.error?.data?.message || "Failed. Please try again.");
               }
             } catch (error) {
               toast.error("An unexpected error occurred.");
             }
           };


           const handleEnter = (e) => {
            if (e.key === 'Enter') {
              e.preventDefault();
              const form = e.target.form;
              const index = Array.prototype.indexOf.call(form, e.target);
              form.elements[index + 1]?.focus();
            }
          };
          

  
//   const [currentPage, setCurrentPage] = useState(1);
//   const [startPage, setStartPage] = useState(1);
//   const [totalPages, setTotalPages] = useState(1);
//   const [pagesPerSet, setPagesPerSet] = useState(10);
//   const [itemsPerPage] = useState(5);


//     // Search input states
//     const [assignorInput, setAssignorInput] = useState('');
//     const [assignedToInput, setAssignedToInput] = useState('');
//     const [taskInput, setTaskInput] = useState('');
//     const [statusInput, setStatusInput] = useState('');
  
//     const [searchActive, setSearchActive] = useState(false);
  
//     // Filtered query states
//     const [searchFilter, setSearchFilter] = useState({
//       assignor: '',
//       assignedTo: '',
//       task: '',
//       status: '',
//     });

//  const { data, isLoading, isError, error, refetch } = useGetAllTaskQuery(
//     {
//       ...(searchActive ? searchFilter : {}),
//       page: currentPage,
//       limit: itemsPerPage,
//     },
//     { refetchOnMountOrArgChange: true }
//   );

//   const [tasks, setTasks] = useState([]);

//   useEffect(() => {
//     const handleResize = () => {
//       if (window.innerWidth < 640) setPagesPerSet(5);
//       else if (window.innerWidth < 1024) setPagesPerSet(7);
//       else setPagesPerSet(10);
//     };
//     handleResize();
//     window.addEventListener('resize', handleResize);
//     return () => window.removeEventListener('resize', handleResize);
//   }, []);

//   useEffect(() => {
//     if (isError) {
//       console.error('Error fetching user data', error);
//     } else if (!isLoading && data) {
//       setTasks(data.data);
//       setTotalPages(Math.ceil(data.meta.total / itemsPerPage));
    
//     }
//   }, [data, isLoading, isError, error, itemsPerPage]);



          //Pagination
          // const handleSearch = () => {
          //   setCurrentPage(1);
          //   setStartPage(1);
          //   setSearchActive(true);
          //   setSearchFilter({
          //     assignor: assignorInput,
          //     assignedTo: assignedToInput,
          //     task: taskInput,
          //     status: statusInput,
          //   });
          // };
        
          // const handleClearSearch = () => {
          //   setAssignorInput('');
          //   setAssignedToInput('');
          //   setTaskInput('');
          //   setStatusInput('');
          //   setSearchFilter({ assignor: '', assignedTo: '', Email: '' });
          //   setSearchActive(false);
          //   setCurrentPage(1);
          //   setStartPage(1);
          // };
        
          // const endPage = Math.min(startPage + pagesPerSet - 1, totalPages);
        
          // const handlePageChange = (pageNumber) => {
          //   setCurrentPage(pageNumber);
          //   if (pageNumber < startPage) setStartPage(pageNumber);
          //   else if (pageNumber > endPage) setStartPage(pageNumber - pagesPerSet + 1);
          // };
        
          // const handlePreviousSet = () =>
          //   setStartPage(Math.max(startPage - pagesPerSet, 1));
          // const handleNextSet = () =>
          //   setStartPage(
          //     Math.min(startPage + pagesPerSet, totalPages - pagesPerSet + 1)
          //   );


          const { data, isLoading, isError, error } = useGetAllTaskQuery({ branch, user_id});

          const [tasks, setTasks] = useState([])
          useEffect(() => {
              if (isError) {
                  console.error("Error fetching product data", error);
              } else if (!isLoading && data) {
                setTasks(data.data);
              }
          }, [data, isLoading, isError, error]);

          

      

  return (
    <>
      <div className="w-full px-4 py-6 bg-gray-50">

        <div className="max-w-7xl mx-auto flex flex-col lg:flex-row lg:items-center lg:justify-between gap-4">
          {/* Header Section */}
          <div>
            <h4 className="text-2xl md:text-md font-semibold text-gray-900">Task Management</h4>

    
            {/* Modal */}
            <Modal isOpen={isModalOpen} onClose={closeModal}>
                                    <ModalHeader>Task Management</ModalHeader>
                                    <ModalBody>
                                    <form onSubmit={handleSubmit(onFormSubmit)}>
                        <div className="grid grid-cols-1 gap-4">
                          {/* Left Side */}
                    
                          
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
                            

                      <div className="mt-4">
                   <label className="block text-sm mb-1 text-gray-700 mb-4">Assignee</label>

                                <Select name="assignedTo" {...register('assignedTo')} className="mt-1">
                                  <option>Select Assignee</option>
                                  {admins.map((admin) => (
                                    <option key={admin.id} value={admin.id}>
                                      {admin.FirstName} {admin.LastName}
                                    </option>
                                  ))}
                                </Select>
                                {errors.assignedTo && <p className="text-red-500 text-xs mt-1">{errors.assignedTo.message}</p>}
                              </div>
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
                      <option value="Dhaka">Dhaka</option>
                      <option value="Chittagong">Chittagong</option>
                      <option value="Khulna">Khulna</option>
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
          </div>

          {/* Right Buttons */}
           <div className="flex flex-col sm:flex-row gap-3">
            <button onClick={() => {
            setIsModalOpen(true)
          }}  className="px-4 py-2 bg-brandRed text-white rounded-md text-sm md:text-base hover:bg-brandRed-700 transition">
              + Add Task
            </button>
          </div>
          
        </div>

        {/* <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-4 mt-16">
                <Label>
                  <span>Assignor</span>
                  <Input
                    value={assignorInput}
                    onChange={(e) => setAssignorInput(e.target.value)}
                    className="mt-1"
                    placeholder="Assignor Name"
                  />
                </Label>
                <Label>
                  <span>Assigned To</span>
                  <Input
                    value={assignedToInput}
                    onChange={(e) => setAssignedToInput(e.target.value)}
                    className="mt-1"
                    placeholder="Assignee Name"
                  />
                </Label>

                <Label>
                  <span>Status</span>
                  <Input
                    value={statusInput}
                    onChange={(e) => statusInput(e.target.value)}
                    className="mt-1"
                    placeholder="Status"
                  />
                </Label>
                <div className="flex items-end gap-2">
                  <Button
                    onClick={handleSearch}
                    className="w-full bg-brandRed text-white"
                  >
                    Search
                  </Button>
                  <Button
                    onClick={handleClearSearch}
                    className="w-full bg-brandRed text-white"
                  >
                    Clear
                  </Button>
                </div>
              </div> */}

        {/* Conditional Tab Content */}
        <div className="mt-4 p-4 bg-white rounded-md shadow-md">
  <div className="w-full overflow-x-auto">
    <table className="w-full text-sm text-left text-gray-700 bg-white shadow-md rounded-lg">
      <thead className="bg-gray-100 border-b border-gray-200">
        <tr>
          <th className="p-3 min-w-[180px]">Assignor</th>
          <th className="p-3 min-w-[180px]">Assigned To</th>
          <th className="p-3 min-w-[180px]">Task</th>
          <th className="p-3 min-w-[180px]">Description</th>
          <th className="p-3 min-w-[180px]">Attachments</th>
          <th className="p-3 min-w-[160px]">Status</th>
          <th className="p-3 min-w-[160px]">Comment</th>
          <th className="p-3 min-w-[160px]">Action</th>
        </tr>
      </thead>

      <tbody>
        {tasks.map((task, idx) => (
          <tr
            key={idx}
            className={`border-b border-gray-200 ${idx % 2 === 0 ? "bg-gray-50" : "bg-white"}`}
          >
            <td className="p-3 whitespace-nowrap">{task.assignor}</td>
            <td className="p-3 whitespace-nowrap">{task.assignedTo}</td>
            <td className="p-3 whitespace-nowrap">{task.task}</td>
            <td className="p-3 whitespace-nowrap">{task.description}</td>
            <td className="p-3 whitespace-nowrap">
              <a
                href={`http://localhost:5000/${task.file}`}
                target="_blank"
                rel="noopener noreferrer"
                className="text-brandRed"
              >
                Preview PDF
              </a>
            </td>
            <td className="p-3 whitespace-nowrap">{task.status}</td>
            <td className="p-3 whitespace-nowrap">{task.comment}</td>
            <td className="p-3 whitespace-nowrap flex gap-3 text-brandRed">
              <LiaEditSolid
                fontSize={20}
                className="cursor-pointer"
                onClick={() => {
                  setIsModalOpen(true);
                  setTaskId(task.id)
                }}
              />
              <FaTrash
                fontSize={20}
                className="cursor-pointer text-red-500"
                onClick={() => handleDeleteUser(task.id)}
              />
            </td>
          </tr>
        ))}
      </tbody>

{/* Modal should be placed outside the map */}
<Modal isOpen={isModalOpen1} onClose={closeModal1}>
  <ModalHeader className="mb-8">Edit Task Information</ModalHeader>
  <ModalBody>
    <form onSubmit={handleSubmit(onFormEdit)}>
      <div className="grid grid-cols-1 gap-4">
        <div className="mb-4">
          <label className="block text-sm text-gray-700 mb-2">
            {role === "superAdmin" ? "Status" : "Task Status"}
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
      </div>

      <div className="flex justify-end gap-2 mt-6">
        <Button type="submit" className="btn" style={{backgroundColor:"#C71320"}}>
          Save
        </Button>
      </div>
    </form>
  </ModalBody>
</Modal>

    </table>
  </div>

 {/* Pagination */}
 {/* <div className="flex items-center justify-center space-x-2 mt-6">
        <button
          onClick={handlePreviousSet}
          disabled={startPage === 1}
          className="px-3 py-2 text-white bg-brandRed rounded-md disabled:bg-brandDisable"
        >
          Prev
        </button>
        {[...Array(endPage - startPage + 1)].map((_, idx) => {
          const pageNum = startPage + idx;
          return (
            <button
              key={pageNum}
              onClick={() => handlePageChange(pageNum)}
              className={`px-3 py-2 text-white rounded-md ${
                pageNum === currentPage
                  ? 'bg-brandRed'
                  : 'bg-brandDisable'
              }`}
            >
              {pageNum}
            </button>
          );
        })}
        <button
          onClick={handleNextSet}
          disabled={endPage === totalPages}
          className="px-3 py-2 text-white bg-brandRed rounded-md disabled:bg-brandDisable"
        >
          Next
        </button>
      </div> */}

</div>

      </div>
    </>
  );
}

export default Task;
