import React, { useState, useEffect } from 'react';
import response from '../utils/demo/tableData';
import { Modal, ModalHeader, ModalBody, Input, Button } from '@windmill/react-ui';
import toast from 'react-hot-toast';
import { useForm } from 'react-hook-form';
import { useCreateCommissionMutation, useDeleteCommissionMutation, useGetAllCommissionQuery, useUpdateCommissionMutation } from '../features/commission/commission';
import { LiaEditSolid } from 'react-icons/lia';
import { FaTrash } from 'react-icons/fa';
import { useGetAllUserQuery } from '../features/auth/auth';
import { Select } from '@windmill/react-ui';
import ComissionPaymentPaid from '../components/ComissionPayment/ComissionPaymentPaid';


function CommissionPayment() {
 

  // Tab logic
  const [activeTab, setActiveTab] = useState('inProgress');
  const isInProgress = activeTab === 'inProgress';

  // Modal logic
  const [isModalOpen, setIsModalOpen] = useState(false)
   
    function closeModal() {
     setIsModalOpen(false)
   }

  const [isModalOpen1, setIsModalOpen1] = useState(false)
   
    function closeModal1() {
     setIsModalOpen1(false)
   }
   

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

  const id = localStorage.getItem("userId")
  const [createCommission] = useCreateCommissionMutation();

  const onFormSubmit = async (data) => {

    const info = {
      user_id:id,
      amount: data.amount,
      purpose: data.purpose,
      branch: data.branch,

    }
    try {
      const res = await createCommission(info);
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
  
      
          const { data, isLoading, isError, error } = useGetAllCommissionQuery();
            const [payments, setPayments] = useState([]);
          
             useEffect(() => {
                  if (isError) {
                    console.log("Error fetching", error);
                  } else if (!isLoading && data) {
                    const filteredPayments = data.data.filter(
                      (item) => item.status === "PENDING"
                    );
                    setPayments(filteredPayments);
                  }
                }, [data, isLoading, isError, error]);
      
            console.log("StudentPayment", payments)


          const { data2, isLoading2, isError2, error2 } = useGetAllCommissionQuery();
            const [paidPayments, setPaidPayments] = useState([]);
          
             useEffect(() => {
                  if (isError2) {
                    console.log("Error fetching", error2);
                  } else if (!isLoading2 && data2) {
                    const filteredPayments = data2.data.filter(
                      (item) => item.status === "PAID"
                    );
                    setPaidPayments(filteredPayments);
                  }
                }, [data2, isLoading2, isError2, error2]);
      
            console.log("StudentPayment", payments)


      
            const formatDate = (dateString) => {
              const date = new Date(dateString);
              return date.toLocaleDateString("en-GB", {
                day: "2-digit",
                month: "long",
                year: "numeric",
              });
            };
      
      
            const [paymentId, setPaymentId] = useState("")
         
             const [updateCommission] = useUpdateCommissionMutation()
         
             const onFormEdit = async (data) => {
  
              const formData = new FormData();
        formData.append("status", data.status);
        if (file) {
            formData.append("file", file);
        }
              
  
             try {
               const res = await updateCommission({id:paymentId, formData});
               if (res.data?.success) {
                 toast.success(res.data.message);
               } else {
                 toast.error(res.error?.data?.message || "Failed. Please try again.");
               }
             } catch (error) {
               toast.error("An unexpected error occurred.");
             }
           };
         
             const [deleteCommission] = useDeleteCommissionMutation()
         
             const handleDeleteUser = async (id) => {
             try {
               const res = await deleteCommission(id);
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
            <h4 className="text-2xl md:text-md font-semibold text-gray-900">Commision Payment</h4>

    
            {/* Modal */}
            <Modal isOpen={isModalOpen} onClose={closeModal}>
                                    <ModalHeader>Payment Request Sent</ModalHeader>
                                    <ModalBody>
                                    <form onSubmit={handleSubmit(onFormSubmit)}>
                        <div className="grid grid-cols-1 gap-4">
                          {/* Left Side */}
                    
                            <div className="mb-4">
                              <label className="block text-sm mb-1 text-gray-700">Amount</label>
                              <Input
                                type="text"
                                {...register("amount")}
                                className="input input-bordered w-full form-control shadow-md p-3"
                              />
                              {errors.amount && (
                                <p className="text-red-500 text-sm mt-1">{errors.amount.message}</p>
                              )}
                            </div>
                            <div className="mb-4">
                              <label className="block text-sm mb-1 text-gray-700">Purpose</label>
                              <Input
                                type="text"
                                {...register("purpose")}
                                className="input input-bordered w-full form-control shadow-md p-3"
                              />
                              {errors.purpose && (
                                <p className="text-red-500 text-sm mt-1">{errors.purpose.message}</p>
                              )}
                            </div>
                            

                      <div className="mt-4">
                   <label className="block text-sm mb-1 text-gray-700 mb-4">Branch</label>

                                <Select name="branch" {...register('branch')} className="mt-1">
                                  <option>Select Branch</option>
                                  {admins.map((admin) => (
                                    <option key={admin.id} value={admin.id}>
                                      {admin.FirstName} {admin.LastName}
                                    </option>
                                  ))}
                                </Select>
                                {errors.branch && <p className="text-red-500 text-xs mt-1">{errors.branch.message}</p>}
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
          <div className="flex flex-col sm:flex-row gap-3">
            <button onClick={() => {
            setIsModalOpen(true)
          }}  className="px-4 py-2 bg-blue-600 text-white rounded-md text-sm md:text-base hover:bg-blue-700 transition">
              + Request Program Options from KC Team
            </button>
          </div>
        </div>

        {/* Tab Section */}
        <div className="w-full sm:w-auto mt-6">
          <div className="flex gap-4 text-sm font-medium mb-1">
            <span
              className={`cursor-pointer pb-1 ${isInProgress ? 'text-blue-600' : 'text-gray-800'}`}
              onClick={() => setActiveTab('inProgress')}
            >
              In Progress
            </span>
            <span
              className={`cursor-pointer pb-1 ${!isInProgress ? 'text-blue-600' : 'text-gray-800'}`}
              onClick={() => setActiveTab('paid')}
            >
              Paid
            </span>
          </div>

          <div className="h-1 bg-blue-100 rounded-full">
            <div
              className="h-1 bg-blue-500 rounded-full transition-all duration-300"
              style={{ width: isInProgress ? '10%' : '20%' }}
            ></div>
          </div>
        </div>

        {/* Conditional Tab Content */}
        <div className="mt-4 p-4 bg-white rounded-md shadow-md">
          {isInProgress ? (
             <div className="w-full overflow-x-auto">
                    <table className="w-full text-sm text-left text-gray-700 bg-white shadow-md rounded-lg">
                      <thead className="bg-gray-100 border-b border-gray-200">
                        <tr>
                          <th className="p-3 min-w-[180px]">Date</th>
                          <th className="p-3 min-w-[180px]">Amount</th>
                          <th className="p-3 min-w-[120px]">Purpose</th>
                          <th className="p-3 min-w-[160px]">Status</th>                      
                          <th className="p-3 min-w-[160px]">Action</th>
                          
                        </tr>
                      </thead>
                      <tbody>
                        {payments.map((payment, idx) => (
                          <tr
                            key={idx}
                            className={`border-b border-gray-200 ${
                              idx % 2 === 0 ? "bg-gray-50" : "bg-white"
                            }`}
                          >
                            <td className="p-3 whitespace-nowrap">{formatDate(payment.createdAt)}</td>
                            <td className="p-3 whitespace-nowrap">{payment.amount}</td>
                            <td className="p-3 whitespace-nowrap">{payment.purpose}</td>
                            <td className="p-3 whitespace-nowrap">{payment.status}</td>
                            {/* <td className="p-3 whitespace-nowrap">{payment.comment}</td> */}
                            
                            <td className="p-3 whitespace-nowrap flex gap-3 text-blue-600">
                                           
                          
                              <LiaEditSolid fontSize={20} onClick={() => {
                                          setIsModalOpen1(true);
                                          setPaymentId(payment.id);
                                        }}  className="cursor-pointer" />
                              <FaTrash onClick={ () => handleDeleteUser(payment.id)} fontSize={20} className="cursor-pointer text-red-500" />
                                           
                    
                                            </td>
            
                                              <Modal isOpen={isModalOpen1} onClose={closeModal1}>
                                                                                  <ModalHeader className="mb-8">Edit Commission Information</ModalHeader>
                                                                                  <ModalBody>
                                                                                  <form onSubmit={handleSubmit(onFormEdit)}>
                                                                      <div className="grid grid-cols-1 gap-4">
                                                                        {/* Left Side */}
            
                                                                 
                                                                          <div className="mb-4">
                                                                            <label className="block text-sm mb-1 text-gray-700 mb-4">Payment Status</label>
                                                                            <select
                                                                                {...register("status")}
                                                                                className="input input-bordered w-full shadow-md p-3"
                                                                              >
                                                                                <option value="">Select Status</option>
                                                                                <option value="Cash-In">PAID</option>
                                                                                <option value="Cash-Out">PENDING</option>        
                                                                              </select>
                                                                              {errors.status && (
                                                                                <p className="text-red-500 text-sm mt-1">{errors.status.message}</p>
                                                                              )}
                                                                          </div>

                                                                          <div>
                                              <label className="block text-sm mb-1 text-gray-700">Upload Payment Documents</label>
                                              <input
                                                type="file"
                                                name="file"
                                                accept="image/*,application/pdf"
                                                onChange={handleFileChange}
                                                required
                                                className="input"
                                              />
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
            
                                                                                
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
          ) : (
            <div className="w-full overflow-x-auto">
                    <table className="w-full text-sm text-left text-gray-700 bg-white shadow-md rounded-lg">
                      <thead className="bg-gray-100 border-b border-gray-200">
                        <tr>
                          <th className="p-3 min-w-[180px]">Date</th>
                          <th className="p-3 min-w-[180px]">Amount</th>
                          <th className="p-3 min-w-[120px]">Purpose</th>
                          <th className="p-3 min-w-[160px]">Status</th>                      
                          {/* <th className="p-3 min-w-[160px]">Action</th> */}
                          
                        </tr>
                      </thead>
                      <tbody>
                        {paidPayments.map((payment, idx) => (
                          <tr
                            key={idx}
                            className={`border-b border-gray-200 ${
                              idx % 2 === 0 ? "bg-gray-50" : "bg-white"
                            }`}
                          >
                            <td className="p-3 whitespace-nowrap">{formatDate(payment.createdAt)}</td>
                            <td className="p-3 whitespace-nowrap">{payment.amount}</td>
                            <td className="p-3 whitespace-nowrap">{payment.purpose}</td>
                            <td className="p-3 whitespace-nowrap">{payment.status}</td>
                            {/* <td className="p-3 whitespace-nowrap">{payment.comment}</td> */}
{/*                             
                            <td className="p-3 whitespace-nowrap flex gap-3 text-blue-600">
                                           
                          
                              <LiaEditSolid fontSize={20} onClick={() => {
                                          setIsModalOpen1(true);
                                          setPaymentId(payment.id);
                                        }}  className="cursor-pointer" />
                              <FaTrash onClick={ () => handleDeleteUser(payment.id)} fontSize={20} className="cursor-pointer text-red-500" />
                                           
                    
                                            </td> */}
            
                                              <Modal isOpen={isModalOpen1} onClose={closeModal1}>
                                                                                  <ModalHeader className="mb-8">Edit Commission Information</ModalHeader>
                                                                                  <ModalBody>
                                                                                  <form onSubmit={handleSubmit(onFormEdit)}>
                                                                      <div className="grid grid-cols-1 gap-4">
                                                                        {/* Left Side */}
            
                                                                 
                                                                          <div className="mb-4">
                                                                            <label className="block text-sm mb-1 text-gray-700 mb-4">Payment Status</label>
                                                                            <select
                                                                                {...register("status")}
                                                                                className="input input-bordered w-full shadow-md p-3"
                                                                              >
                                                                                <option value="">Select Status</option>
                                                                                <option value="Cash-In">PAID</option>
                                                                                <option value="Cash-Out">PENDING</option>        
                                                                              </select>
                                                                              {errors.status && (
                                                                                <p className="text-red-500 text-sm mt-1">{errors.status.message}</p>
                                                                              )}
                                                                          </div>

                                                                          <div>
                                              <label className="block text-sm mb-1 text-gray-700">Upload Payment Documents</label>
                                              <input
                                                type="file"
                                                name="file"
                                                accept="image/*,application/pdf"
                                                onChange={handleFileChange}
                                                required
                                                className="input"
                                              />
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
            
                                                                                
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
          )}
        </div>
      </div>
    </>
  );
}

export default CommissionPayment;
