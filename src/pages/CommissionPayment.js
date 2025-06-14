import React, { useState, useEffect } from 'react';
import { Modal, ModalHeader, ModalBody, Input, Button } from '@windmill/react-ui';
import toast from 'react-hot-toast';
import { useForm } from 'react-hook-form';
import { useGetAllUserQuery } from '../features/auth/auth';
import { Select } from '@windmill/react-ui';
import { useCreateCommissionMutation } from '../features/commission/commission';
import ComissionPaymentInProgress from '../components/ComissionPayment/ComissionPaymentInProgress';
import ComissionPaymentPaid from '../components/ComissionPayment/ComissionPaymentPaid';
import axios from 'axios';


function CommissionPayment() {
 
 const [admins, setAdmins] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error1, setError1] = useState(null);
    const [file, setFile] = useState(null);
  // Tab logic
  const [activeTab, setActiveTab] = useState('inProgress');
  const isInProgress = activeTab === 'inProgress';

  // Modal logic
  const [isModalOpen, setIsModalOpen] = useState(false)
   
    function closeModal() {
     setIsModalOpen(false)
   }
   

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

    console.log("info", info)
    try {
      const res = await createCommission(info);
      if (res.data?.success) {
        toast.success(res.data.message);
        reset()
     setIsModalOpen(false)

        reset();
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
        setLoading(true);
        const response = await axios.get("https://api.eaconsultancy.info/api/v1/user");
        const allUsers = response.data.data;
  
        // Filter users with Role "admin" or "superadmin"
        const filtered = allUsers.filter(
          (user) =>
            user.Role?.toLowerCase() === "admin" ||
            user.Role?.toLowerCase() === "superAdmin"
        );
  
        setAdmins(filtered);
      } catch (err) {
        console.error("Error fetching users:", err);
        setError1(err);
      } finally {
        setLoading(false);
      }
    };
  
    fetchUsers();
  }, []);
  

  console.log("Admins:", admins);
   

  
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
      <div className="w-full px-4 py-6 bg-gray-50">
        <div className="max-w-7xl mx-auto flex flex-col lg:flex-row lg:items-center lg:justify-between gap-4">
          {/* Header Section */}
          <div>
            <h4 className="text-2xl md:text-md font-semibold text-gray-900">Commision Payment</h4>

    
            {/* Modal */}
            <Modal isOpen={isModalOpen} onClose={closeModal}>
                                    <ModalHeader>Comission Request Sent</ModalHeader>
                                    <ModalBody>
                                    <form onSubmit={handleSubmit(onFormSubmit)}>
                        <div className="grid grid-cols-1 gap-4">
                          {/* Left Side */}
                    
                            <div className="mb-4">
                              <label className="block text-sm mb-1 text-gray-700">Amount</label>
                              <Input
                                type="text"
                                {...register("amount")}
                                onKeyDown = {handleEnter}
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
                                onKeyDown = {handleEnter}

                                className="input input-bordered w-full form-control shadow-md p-3"
                              />
                              {errors.purpose && (
                                <p className="text-red-500 text-sm mt-1">{errors.purpose.message}</p>
                              )}
                            </div>
                            

                      <div className="mt-4">
                   <label className="block text-sm mb-1 text-gray-700 mb-4">Branch</label>

                                <Select name="branch" {...register('branch')} className="mt-1">
                                onKeyDown = {handleEnter}
                                  <option>Select Branch</option>
                                  {admins.map((admin) => (
                                    <option key={admin.id} value={admin.Branch}>
                                      {admin.Branch}
                                    </option>
                                  ))}
                                </Select>
                                {errors.branch && <p className="text-red-500 text-xs mt-1">{errors.branch.message}</p>}
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
              + Request Commission
            </button>
          </div>
        </div>

        {/* Tab Section */}
        <div className="w-full sm:w-auto mt-6">
          <div className="flex gap-4 text-sm font-medium mb-1">
            <span
              className={`cursor-pointer pb-1 ${isInProgress ? 'text-brandRed' : 'text-gray-800'}`}
              onClick={() => setActiveTab('inProgress')}
            >
              In Progress
            </span>
            <span
              className={`cursor-pointer pb-1 ${!isInProgress ? 'text-brandRed' : 'text-gray-800'}`}
              onClick={() => setActiveTab('paid')}
            >
              Paid
            </span>
          </div>

          <div className="h-1 bg-brandRed-100 rounded-full">
            <div
              className="h-1 bg-brandRed rounded-full transition-all duration-300"
              style={{ width: isInProgress ? '10%' : '20%' }}
            ></div>
          </div>
        </div>

        {/* Conditional Tab Content */}
        <div className="mt-4 p-4 bg-white rounded-md shadow-md">
          {isInProgress ? (
             <ComissionPaymentInProgress/>
          ) : (
            <ComissionPaymentPaid/>
          )}
        </div>
      </div>
    </>
  );
}

export default CommissionPayment;
