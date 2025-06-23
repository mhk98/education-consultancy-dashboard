import React, {  useEffect, useState } from 'react';
import { Modal, ModalHeader, ModalBody, Input, Button } from '@windmill/react-ui';
import { useForm } from 'react-hook-form';
import { useDeleteConsultationMutation, useGetAllConsultationQuery, useUpdateConsultationMutation } from '../../features/consultation/consultation';
import toast from 'react-hot-toast';
import { LiaEditSolid } from 'react-icons/lia';
import { FaTrash } from 'react-icons/fa';


function Client() {
  const id = localStorage.getItem("userId");
  const role = localStorage.getItem("role");
  const branch = localStorage.getItem("branch");

   const [consultationId, setConsultationId] = useState('')
  
      const [isModalOpen, setIsModalOpen] = useState(false);
            
                function closeModal() {
                 setIsModalOpen(false)
               }

  const [activeTab, setActiveTab] = useState("client");

  const isClient = activeTab === "client";
  const isHistory = activeTab === "history";
  const isDocuments = activeTab === "documents";


  
     const {
        register,
        handleSubmit,
        reset,
        formState: { errors },
      } = useForm();
 

       const onFormSubmit = async (data) => {
          const formData = new FormData();
          formData.append('id', data.assignedTo);

          formData.append('task', data.task);
          formData.append('branch', branch);
          formData.append('dueDate', data.dueDate);
          formData.append('description', data.description);
          formData.append('comment', data.comment);
        //   if (file) formData.append('file', file);
      
          try {
            // const res = await createTask(formData);
            // if (res.data?.success) {
            //   toast.success(res.data.message);
            //   reset();
            //   setIsModalOpen(false);
            // } else {
            //   toast.error(res.error?.data?.message || 'Failed. Please try again.');
            // }
          } catch {
            // toast.error('An unexpected error occurred.');
          }
        };

       const {data, isLoading, isError, error} = useGetAllConsultationQuery()
    
            const [consultations, setConsultations] = useState([])
    
            useEffect(() => {
              if(isError){
                console.log("Error fetching", error)
              } else if (!isLoading && data?.data){
                setConsultations(data.data)
              }
            }, [data, isLoading, isError, error])
    
    
            console.log("consultations", consultations)
    
            const [updateConsultation] = useUpdateConsultationMutation()
    
            const onFormEdit = async (data) => {
                try {
                  const res = await updateConsultation({ id: consultationId, data });
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
    
    
            const [deleteConsultation] = useDeleteConsultationMutation()
    
    
               const handleDeleteUser = async (id) => {
                  try {
                    const res = await deleteConsultation(id);
                    if (res.data?.success) {
                      toast.success(res.data.message);
                    } else {
                      toast.error(res.error?.data?.message || 'Failed. Please try again.');
                    }
                  } catch {
                    toast.error('An unexpected error occurred.');
                  }
                };
    

  return (
    <>
     <div className='w-full px-4 py-6 bg-gray-50'>
      {/* Leads Table */}
           <div className="p-4 md:p-8 w-full mx-auto">               
           <div className="w-full overflow-x-auto py-6">
                   <table className="w-full text-sm text-left text-gray-700 bg-white shadow-md rounded-lg">
                     <thead className="bg-gray-100 border-b border-gray-200">
                       <tr>
                         <th className="p-3 min-w-[180px]">Name</th>
                         <th className="p-3 min-w-[180px]">Email</th>
                         <th className="p-3 min-w-[180px]">B-Date</th>
                         <th className="p-3 min-w-[180px]">Destination</th>
                         <th className="p-3 min-w-[120px]">Address</th>
                         <th className="p-3 min-w-[160px]">Phone</th>
                         <th className="p-3 min-w-[160px]">IELTS</th>
                         <th className="p-3 min-w-[160px]">Score</th>
                         <th className="p-3 min-w-[160px]">App Code</th>
                         <th className="p-3 min-w-[160px]">SSC GPA/CGPA</th>
                         <th className="p-3 min-w-[160px]">HSC GPA/CGPA</th>
                         <th className="p-3 min-w-[160px]">Bachelor GPA/CGPA</th>
                         <th className="p-3 min-w-[160px]">Branch</th>
                         <th className="p-3 min-w-[160px]">Action</th>
                         
                         {/* <th className="p-3 min-w-[160px]">Action</th> */}
                         
                       </tr>
                     </thead>
                   {
                     
                       <tbody>
                       {consultations.map((consultation, idx) => (
                         <tr
                           key={idx}
                           className={`border-b border-gray-200 ${
                             idx % 2 === 0 ? "bg-gray-50" : "bg-white"
                           }`}
                         >
                           <td className="p-3 whitespace-nowrap">{consultation.fullName ?? ''}</td>
                           <td className="p-3 whitespace-nowrap">{consultation.email ?? ''}</td>
                           <td className="p-3 whitespace-nowrap">{consultation.date ?? ''}</td>
                           <td className="p-3 whitespace-nowrap">{consultation.destination ?? ''}</td>
                           <td className="p-3 whitespace-nowrap">{consultation.address ?? ''}</td>
                           <td className="p-3 whitespace-nowrap">{consultation.phone ?? ''}</td>
                           <td className="p-3 whitespace-nowrap">{consultation.ielts ?? ''}</td>
                           <td className="p-3 whitespace-nowrap">{consultation.ieltsScore ?? ''}</td>
                           <td className="p-3 whitespace-nowrap">{consultation.applicationCode ?? ''}</td>
                           <td className="p-3 whitespace-nowrap">{consultation.sscCGPA ?? ''}</td>
                           <td className="p-3 whitespace-nowrap">{consultation.hscCGPA ?? ''}</td>
                           <td className="p-3 whitespace-nowrap">{consultation.bachelorCGPA ?? ''}</td>
                           <td className="p-3 whitespace-nowrap">{consultation.location ?? ''}</td>
                         
     
                           <td className="p-3 flex gap-2">
                                             
                                             <LiaEditSolid
                                             onClick={() => {
                                              setIsModalOpen(true)
                                              setConsultationId(consultation.id)
                                             }}
                                               className="cursor-pointer" />
                                           
                                             <FaTrash className="cursor-pointer text-red-500" onClick={() => handleDeleteUser(consultation.id)} />
                                           </td>
           
                     
                           {/* Modal should be outside the condition so it's mounted even when hidden */}
                           <Modal isOpen={isModalOpen} onClose={closeModal}>
                             <ModalHeader className="mb-8">Edit Statement Information</ModalHeader>
                             <ModalBody>
                               <form onSubmit={handleSubmit(onFormEdit)}>
                                 <div className="grid grid-cols-1 gap-4">
                                   <div className="mb-4">
                                     <label className="block text-sm mb-1 text-gray-700">Amount</label>
                                     <Input
                                       type="number"
                                       {...register("amount")}
                                       className="w-full p-3 shadow-md border rounded-md"
                                     />
                                     {errors.amount && (
                                       <p className="text-red-500 text-sm mt-1">
                                         {errors.amount.message}
                                       </p>
                                     )}
                                   </div>
                     
                                   <div className="mb-4">
                                     <label className="block text-sm mb-1 text-gray-700">
                                       Purpose for Cash-In
                                     </label>
                                     <Input
                                       type="text"
                                       {...register("purpose")}
                                       className="w-full p-3 shadow-md border rounded-md"
                                     />
                                     {errors.purpose && (
                                       <p className="text-red-500 text-sm mt-1">
                                         {errors.purpose.message}
                                       </p>
                                     )}
                                   </div>
                     
                                   <div className="mb-4">
                                     <label className="block text-sm mb-1 text-gray-700">Comment</label>
                                     <Input
                                       type="text"
                                       {...register("comment")}
                                       className="w-full p-3 shadow-md border rounded-md"
                                     />
                                     {errors.comment && (
                                       <p className="text-red-500 text-sm mt-1">
                                         {errors.comment.message}
                                       </p>
                                     )}
                                   </div>
                     
                                   <div className="mb-4">
                                     <label className="block text-sm mb-1 text-gray-700 mb-4">
                                       Status
                                     </label>
                                     <select
                                       {...register("status")}
                                       className="input input-bordered w-full shadow-md p-3"
                                     >
                                       <option value="">Select Status</option>
                                       <option value="PAID">PAID</option>
                                       <option value="PENDING">PENDING</option>
                                     </select>
                                     {errors.status && (
                                       <p className="text-red-500 text-sm mt-1">
                                         {errors.status.message}
                                       </p>
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
                    
                   }
           
                   </table>
                 </div>
           </div>
     </div>
    </>
  );
}

export default Client;
