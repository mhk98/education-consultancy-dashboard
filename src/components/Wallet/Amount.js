import React, { useEffect, useState } from 'react'
import { useForm } from 'react-hook-form'
import { Input, Button } from '@windmill/react-ui'
import toast from 'react-hot-toast'
import { LiaEditSolid } from 'react-icons/lia'
import { FaTrash } from 'react-icons/fa'
import { Modal, ModalHeader, ModalBody } from '@windmill/react-ui'
import { useDeletePendingPaymentMutation, useGetAllPendingPaymentQuery, useUpdatePendingPaymentMutation } from '../../features/pendingPayment/pendingPayment'
import Invoice from './Invoice'
import { TbCurrencyTaka } from 'react-icons/tb'

function Amount() {

const role = localStorage.getItem("role")
const branch = localStorage.getItem("branch")
const [selectBranch, setSelectBranch] = useState("")


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
          const [adminPayments, setAdminPayments] = useState([]);
        
          useEffect(() => {
            if (isError1) {
              console.log("Error fetching", error1);
            } else if (!isLoading1 && data1) {
              const allPayments = data1.data;
  
        // Filter out students
        const filtered = allPayments.filter(payments => payments.branch === branch);

        setAdminPayments(filtered);
            }
          }, [data1, isLoading1, isError1, error1, branch]);
    
          console.log("StudentPayment", payments)

        const { data:data2, isLoading:isLoading2, isError:isError2, error:error2 } = useGetAllPendingPaymentQuery();
          const [filteringPayments, setFilteringPayments] = useState([]);
          const [totalBranchAmount, setTotalBranchAmount] = useState(0);
          const [totalDebitAmount, setTotalDebitAmount] = useState(0);

        
          useEffect(() => {
            if (isError2) {
              console.log("Error fetching", error2);
            } else if (!isLoading2 && data2) {
              const allPayments = data2.data;
  
        // Filter out students
        const filtered = allPayments.filter(payments => payments.branch === selectBranch);
        setFilteringPayments(filtered);

         const filteredBranchCredit = filtered.filter(payment =>
                      ["Cash-In", "Offline", "Online"].includes(payment.paymentStatus) && payment.status === "PAID"
                    );
                    
                    let credit = 0
                    filteredBranchCredit.forEach(payment => {
                      credit += payment.amount
                    });
        setTotalBranchAmount(credit)

         const filteredBranchDebit = filtered.filter(payment =>
                      ["Cash-Out"].includes(payment.paymentStatus) && payment.status === "PAID"
                    );

                    let debit = 0
                    filteredBranchDebit.forEach(payment => {
                      debit += payment.amount
                    });
        setTotalDebitAmount(debit)
            }
          }, [data2, isLoading2, isError2, error2, branch, selectBranch]);
    
          console.log("filteringPayments", filteringPayments)

      
  const branchBalance = totalBranchAmount - totalDebitAmount  

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
               reset()
              setIsModalOpen(false)

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
    

         const generateInvoiceNo = () => {
          const now = new Date();
          return `INV-${now.getFullYear()}${(now.getMonth() + 1)
            .toString()
            .padStart(2, '0')}${now.getDate().toString().padStart(2, '0')}-${now.getTime()}`;
        };

        
        const [invoiceNo, setInvoiceNo] = useState('');

        useEffect(() => {
          const newInvoiceNo = generateInvoiceNo();
          setInvoiceNo(newInvoiceNo);
        }, []);


        const handleEnter = (e) => {
          if (e.key === 'Enter') {
            e.preventDefault();
            const form = e.target.form;
            const index = Array.prototype.indexOf.call(form, e.target);
            form.elements[index + 1]?.focus();
          }
        };

  return (
    <>
   
   {
    role === "superAdmin" &&

    <div className="mb-4 grid lg:grid-cols-2 xl:grid-cols-2 grid-cols-1">
   <div>
    <p>Balance:</p>
              <button className="px-4 py-2 flex items-center bg-white text-brandRed border-2 border-brandRed rounded-md text-sm md:text-base transition">
              <TbCurrencyTaka /> {branchBalance}
              </button>
   </div>

   <div >
            <select
                            {...register("status")}
                            className="input input-bordered w-full shadow-md p-3"
                            onChange={(e) => setSelectBranch(e.target.value)}
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
                          {errors.status && (
                            <p className="text-red-500 text-sm mt-1">
                              {errors.status.message}
                            </p>
        )}
                         
    </div>
   </div>
   }

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
              <th className="p-3 min-w-[160px]">Invoice</th>
              <th className="p-3 min-w-[160px]">Action</th>
              
              {/* <th className="p-3 min-w-[160px]">Action</th> */}
              
            </tr>
          </thead>
        {
          role === "superAdmin" && selectBranch ? (
            <tbody>
            {filteringPayments.map((payment, idx) => (
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
                <td className="p-3 whitespace-nowrap text-brandRed cursor-pointer">
                  Invoice
                </td>
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
                            onKeyDown = {handleEnter}
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
                            onKeyDown = {handleEnter}
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
                            onKeyDown = {handleEnter}
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
                            onKeyDown = {handleEnter}
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
          ): role === "superAdmin" ? (
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
                <td className="p-3 whitespace-nowrap text-brandRed cursor-pointer">
  <Invoice
    invoiceData={{
      invoiceNo: invoiceNo,
      date: formatDate(payment.createdAt),  // ✅ Corrected here
      studentId: payment.user_id,
      name: payment.name,
      phone: payment.phone,
      address: payment.address,
      branch: payment.branch,
      transactionId: payment.transactionId,
      paymentMethod: payment.paymentStatus,
      items: [
        {
          qty: 1,
          purpose: payment.purpose,
          amount: payment.amount,
        },
      ],
      subTotal: payment.amount,
      discount: 0, // Adjusted if no discount
      taxes: 0,
      total: payment.amount,
    }}
  />
</td>

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
            {adminPayments.map((payment, idx) => (
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
                <td className="p-3 whitespace-nowrap text-brandRed cursor-pointer">
  <Invoice
    invoiceData={{
      invoiceNo: invoiceNo,
      date: formatDate(payment.createdAt),  // ✅ Corrected here
      studentId: payment.user_id,
      name: payment.name,
      phone: payment.phone,
      address: payment.address,
      branch: payment.branch,
      transactionId: payment.transactionId,
      paymentMethod: payment.paymentStatus,
      items: [
        {
          qty: 1,
          purpose: payment.purpose,
          amount: payment.amount,
        },
      ],
      subTotal: payment.amount,
      discount: 0, // Adjusted if no discount
      taxes: 0,
      total: payment.amount,
    }}
  />
</td>
          
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
