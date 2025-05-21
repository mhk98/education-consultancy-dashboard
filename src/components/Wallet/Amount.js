import React, { useEffect, useState } from 'react'
import { useForm } from 'react-hook-form'
import { Input, Button } from '@windmill/react-ui'
import toast from 'react-hot-toast'
import { LiaEditSolid } from 'react-icons/lia'
import { FaTrash } from 'react-icons/fa'
import { Modal, ModalHeader, ModalBody } from '@windmill/react-ui'
import { useDeletePendingPaymentMutation, useGetAllPendingPaymentQuery, useUpdatePendingPaymentMutation } from '../../features/pendingPayment/pendingPayment'

function Amount() {

const role = localStorage.getItem("role")
const branch = localStorage.getItem("branch")


    const {
      register,
      formState: { errors },
      handleSubmit,
      reset,
    } = useForm()

    
        const { data, isLoading, isError, error } = useGetAllPendingPaymentQuery();
          const [payments, setPayments] = useState([]);
        
          useEffect(() => {
            if (isError) {
              console.log("Error fetching", error);
            } else if (!isLoading && data) {
              setPayments(data.data);
            }
          }, [data, isLoading, isError, error]);

        const { data:data1, isLoading:isLoading1, isError:isError1, error:error1 } = useGetAllPendingPaymentQuery();
          const [superAdminPayments, setSuperAdminPayments] = useState([]);
        
          useEffect(() => {
            if (isError1) {
              console.log("Error fetching", error1);
            } else if (!isLoading1 && data1) {
              const allPayments = data1.data;
  
        // Filter out students
        const filtered = allPayments.filter(payments => payments.branch === branch);

              setSuperAdminPayments(filtered);
            }
          }, [data1, isLoading1, isError1, error1, branch]);
    
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
          const [isModalOpen, setIsModalOpen] = useState(false)
      
          function closeModal() {
           setIsModalOpen(false)
         }
       
       
      
       
           const [updatePendingPayment] = useUpdatePendingPaymentMutation()
       
           const onFormEdit = async (data) => {

             console.log("info", data)
             console.log("paymentId", paymentId)

           try {
             const res = await updatePendingPayment({id:paymentId, data});
             if (res.data?.success) {
               toast.success(res.data.message);
             } else {
               toast.error(res.error?.data?.message || "Failed. Please try again.");
             }
           } catch (error) {
             toast.error("An unexpected error occurred.");
           }
         };
       
           const [deletePendingPayment] = useDeletePendingPaymentMutation()
       
           const handleDeleteUser = async (id) => {
           try {
             const res = await deletePendingPayment(id);
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
   
 <div className="w-full overflow-x-auto">
        <table className="w-full text-sm text-left text-gray-700 bg-white shadow-md rounded-lg">
          <thead className="bg-gray-100 border-b border-gray-200">
            <tr>
              <th className="p-3 min-w-[180px]">Date</th>
              <th className="p-3 min-w-[180px]">Student ID</th>
              <th className="p-3 min-w-[180px]">Transaction ID</th>
              <th className="p-3 min-w-[180px]">Amount</th>
              <th className="p-3 min-w-[120px]">Purpose</th>
              <th className="p-3 min-w-[160px]">Status</th>
              <th className="p-3 min-w-[160px]">Mode of Payment</th>
              <th className="p-3 min-w-[160px]">Action</th>
              
              {/* <th className="p-3 min-w-[160px]">Action</th> */}
              
            </tr>
          </thead>
        {
          role === "superAdmin" ? (
            <tbody>
            {payments.map((payment, idx) => (
              <tr
                key={idx}
                className={`border-b border-gray-200 ${
                  idx % 2 === 0 ? "bg-gray-50" : "bg-white"
                }`}
              >
                <td className="p-3 whitespace-nowrap">{formatDate(payment.createdAt)}</td>
                <td className="p-3 whitespace-nowrap">{payment.user_id}</td>
                <td className="p-3 whitespace-nowrap">{payment.transactionId}</td>
                <td className="p-3 whitespace-nowrap">{payment.amount}</td>
                <td className="p-3 whitespace-nowrap">{payment.purpose}</td>
                <td className="p-3 whitespace-nowrap">{payment.status}</td>
                <td className="p-3 whitespace-nowrap">{payment.paymentStatus}</td>
          
                {["Cash-In", "Cash-Out", "Offline"].includes(payment.paymentStatus) && (
                  <td className="p-3 whitespace-nowrap flex gap-3 text-brandRed">
                    <LiaEditSolid
                      fontSize={20}
                      onClick={() => {
                        setIsModalOpen(true);
                        setPaymentId(payment.id);
                      }}
                      className="cursor-pointer"
                    />
                    <FaTrash
                      onClick={() => handleDeleteUser(payment.id)}
                      fontSize={20}
                      className="cursor-pointer text-red-500"
                    />
                  </td>
                )}
          
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
          ): (
            <tbody>
            {superAdminPayments.map((payment, idx) => (
              <tr
                key={idx}
                className={`border-b border-gray-200 ${
                  idx % 2 === 0 ? "bg-gray-50" : "bg-white"
                }`}
              >
                <td className="p-3 whitespace-nowrap">{formatDate(payment.createdAt)}</td>
                <td className="p-3 whitespace-nowrap">{payment.user_id}</td>
                <td className="p-3 whitespace-nowrap">{payment.transactionId}</td>
                <td className="p-3 whitespace-nowrap">{payment.amount}</td>
                <td className="p-3 whitespace-nowrap">{payment.purpose}</td>
                <td className="p-3 whitespace-nowrap">{payment.status}</td>
                <td className="p-3 whitespace-nowrap">{payment.paymentStatus}</td>
          
                {["Cash-In", "Cash-Out", "Offline"].includes(payment.paymentStatus) && (
                  <td className="p-3 whitespace-nowrap flex gap-3 text-brandRed">
                    <LiaEditSolid
                      fontSize={20}
                      onClick={() => {
                        setIsModalOpen(true);
                        setPaymentId(payment.id);
                      }}
                      className="cursor-pointer"
                    />
                    <FaTrash
                      onClick={() => handleDeleteUser(payment.id)}
                      fontSize={20}
                      className="cursor-pointer text-red-500"
                    />
                  </td>
                )}
          
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
          )
        }

        </table>
      </div>
    </>
  )
}

export default Amount;
