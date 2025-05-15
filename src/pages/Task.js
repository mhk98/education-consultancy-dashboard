import React, { useState, useEffect } from 'react';
import { Modal, ModalHeader, ModalBody, Input, Button } from '@windmill/react-ui';
import toast from 'react-hot-toast';
import { useForm } from 'react-hook-form';
import { LiaEditSolid } from 'react-icons/lia';
import { FaTrash } from 'react-icons/fa';
import { useGetAllUserQuery } from '../features/auth/auth';
import { Select } from '@windmill/react-ui';
import { useCreateTaskMutation, useDeleteTaskMutation, useGetAllTaskQuery, useUpdateTaskMutation } from '../features/task/task';


function Task() {
 


  // Modal logic
  const [isModalOpen, setIsModalOpen] = useState(false)
   
    function closeModal() {
     setIsModalOpen(false)
   }

 
const [isModalOpen1, setIsModalOpen1] = useState(false)
   
    function closeModal1() {
     setIsModalOpen1(false)
   }
   
   

  // Form setup
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm();

  
  const [createTask] = useCreateTaskMutation();

  const onFormSubmit = async (data) => {

    const info = {
      user_id:data.employee,
      title: data.title,
      description: data.description,
    }
    try {
      const res = await createTask(info);
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


  // const { data1, isLoading1, isError1, error1 } = useGetAllUserQuery();
  //   const [users, setUsers] = useState([]);
  
  //   useEffect(() => {
  //     if (isError1) {
  //       console.log("Error fetching", error1);
  //     } else if (!isLoading1 && data1) {
  //       const filteredUsers = data1.data.filter(
  //         (user) => user.Role === "admin"
  //       );
  //       setUsers(filteredUsers);
  //     }
  //   }, [data1, isLoading1, isError1, error1]);

  //   console.log("users", users)

  const role = localStorage.getItem("role")


    const { data: allUsersData, isLoading1, isError1, error1 } = useGetAllUserQuery();
  const [admins, setAdmins] = useState([]);

  useEffect(() => {
    if (isError1) {
      console.error("Error fetching users:", error1);
    } else if (!isLoading1 && allUsersData?.data) {
      const filteredAdmins = allUsersData.data.filter(
        (user) => user.Role?.toLowerCase() === "admin"
      );
      setAdmins(filteredAdmins);
    }
  }, [allUsersData, isLoading1, isError1, error1]);

  console.log("Admins:", admins);
  
      
          const { data, isLoading, isError, error } = useGetAllTaskQuery();
            const [tasks, setTasks] = useState([]);
          
             useEffect(() => {
                  if (isError) {
                    console.log("Error fetching", error);
                  } else if (!isLoading && data) {
                    const filteredPayments = data.data.filter(
                      (item) => item.status === "PENDING"
                    );
                    setTasks(filteredPayments);
                  }
                }, [data, isLoading, isError, error]);
      
            console.log("StudentPayment", tasks)



      
            const formatDate = (dateString) => {
              const date = new Date(dateString);
              return date.toLocaleDateString("en-GB", {
                day: "2-digit",
                month: "long",
                year: "numeric",
              });
            };
      
      
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



  return (
    <>
      <div className="w-full px-4 py-6 bg-gray-50">
        <div className="max-w-7xl mx-auto flex flex-col lg:flex-row lg:items-center lg:justify-between gap-4">
          {/* Header Section */}
          <div>
            <h4 className="text-2xl md:text-md font-semibold text-gray-900">Task Management</h4>

    
            {/* Modal */}
            <Modal isOpen={isModalOpen} onClose={closeModal}>
                                    <ModalHeader>Payment Request Sent</ModalHeader>
                                    <ModalBody>
                                    <form onSubmit={handleSubmit(onFormSubmit)}>
                        <div className="grid grid-cols-1 gap-4">
                          {/* Left Side */}
                    
                            <div className="mb-4">
                              <label className="block text-sm mb-1 text-gray-700">Title</label>
                              <Input
                                type="text"
                                {...register("title")}
                                className="input input-bordered w-full form-control shadow-md p-3"
                              />
                              {errors.title && (
                                <p className="text-red-500 text-sm mt-1">{errors.title.message}</p>
                              )}
                            </div>
                            <div className="mb-4">
                              <label className="block text-sm mb-1 text-gray-700">Description</label>
                              <Input
                                type="text"
                                {...register("description")}
                                className="input input-bordered w-full form-control shadow-md p-3"
                              />
                              {errors.description && (
                                <p className="text-red-500 text-sm mt-1">{errors.description.message}</p>
                              )}
                            </div>
                            

                      <div className="mt-4">
                   <label className="block text-sm mb-1 text-gray-700 mb-4">Employee</label>

                                <Select name="employee" {...register('employee')} className="mt-1">
                                  <option>Select Employee</option>
                                  {admins.map((admin) => (
                                    <option key={admin.id} value={admin.id}>
                                      {admin.FirstName} {admin.LastName}
                                    </option>
                                  ))}
                                </Select>
                                {errors.employee && <p className="text-red-500 text-xs mt-1">{errors.employee.message}</p>}
                              </div>
                     
                        </div>
                      
                        <div className="flex justify-end gap-2 mt-6">
                          <Button type="submit" className="btn btn-primary">
                            Save
                          </Button>
                        </div>
                      </form>
                      
                                    </ModalBody>
                                  </Modal>
          </div>

          {/* Right Buttons */}
          {
            role === "admin" || role === "superAdmin" && <div className="flex flex-col sm:flex-row gap-3">
            <button onClick={() => {
            setIsModalOpen(true)
          }}  className="px-4 py-2 bg-purple-600 text-white rounded-md text-sm md:text-base hover:bg-blue-700 transition">
              + Add Task
            </button>
          </div>
          }
        </div>

    

        {/* Conditional Tab Content */}
        <div className="mt-4 p-4 bg-white rounded-md shadow-md">

             <div className="w-full overflow-x-auto">
                    <table className="w-full text-sm text-left text-gray-700 bg-white shadow-md rounded-lg">
                      <thead className="bg-gray-100 border-b border-gray-200">
                        <tr>
                          <th className="p-3 min-w-[180px]">Date</th>
                          <th className="p-3 min-w-[180px]">Title</th>         
                          <th className="p-3 min-w-[180px]">Description</th>         
                          <th className="p-3 min-w-[160px]">Status</th>                      
                          <th className="p-3 min-w-[160px]">Action</th>
                          
                        </tr>
                      </thead>
                      <tbody>
                        {tasks.map((task, idx) => (
                          <tr
                            key={idx}
                            className={`border-b border-gray-200 ${
                              idx % 2 === 0 ? "bg-gray-50" : "bg-white"
                            }`}
                          >
                            <td className="p-3 whitespace-nowrap">{formatDate(task.createdAt)}</td>
                            <td className="p-3 whitespace-nowrap">{task.title}</td>
                            <td className="p-3 whitespace-nowrap">{task.description}</td>         
                            <td className="p-3 whitespace-nowrap">{task.status}</td>
                            <td className="p-3 whitespace-nowrap flex gap-3 text-blue-600">
                                                                       
                                                      
                                                          <LiaEditSolid fontSize={20} onClick={() => {
                                                                      setIsModalOpen1(true);
                                                                      setTaskId(task.id);
                                                                    }}  className="cursor-pointer" />
                            {
                                role === "superAdmin" && 
                                <FaTrash onClick={ () => handleDeleteUser(task.id)} fontSize={20} className="cursor-pointer text-red-500" />

                            }                                                                       
                                                
                                                                        </td>
                                        
                                                                          <Modal isOpen={isModalOpen1} onClose={closeModal1}>
                                                                                                              <ModalHeader className="mb-8">Edit Task Information</ModalHeader>
                                                                                                              <ModalBody>
                                                                                                              <form onSubmit={handleSubmit(onFormEdit)}>
                                                                                                  <div className="grid grid-cols-1 gap-4">
                                                                                                    {/* Left Side */}
                                        
                                                                                             
                                                                                                      {
                                                                                                        role === "superAdmin" ?

                                                                                                        (
                                                                                                            <div className="mb-4">
                                                                                                        <label className="block text-sm mb-1 text-gray-700 mb-4">Task Status</label>
                                                                                                        <select
                                                                                                            {...register("status")}
                                                                                                            className="input input-bordered w-full shadow-md p-3"
                                                                                                          >
                                                                                                            <option value="">Select Status</option>
                                                                                                            <option value="COMPLETE">APPROVED</option>
                                                                                                            <option value="PENDING">PENDING</option>        
                                                                                                          </select>
                                                                                                          {errors.status && (
                                                                                                            <p className="text-red-500 text-sm mt-1">{errors.status.message}</p>
                                                                                                          )}
                                                                                                      </div>
                                                                                                        ) : (
                                                                                                            <div className="mb-4">
                                                                                                        <label className="block text-sm mb-1 text-gray-700 mb-4">Task Status</label>
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
                                                                                                    <Button type="submit" className="btn btn-primary">
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
        </div>
      </div>
    </>
  );
}

export default Task;
