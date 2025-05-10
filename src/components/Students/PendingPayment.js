import React, { useState } from 'react'
import { useForm } from 'react-hook-form'
import { Input, Button } from '@windmill/react-ui'
import { useHistory } from 'react-router-dom/cjs/react-router-dom'
import toast from 'react-hot-toast'
import { useCreatePendingPaymentMutation } from '../../features/pendingPayment/pendingPayment'

function PendingPayment({id}) {

  const [activeTab, setActiveTab] = useState("online");
 const [file, setFile] = useState(null);

  const handleFileChange = (e) => {
    setFile(e.target.files[0]);
  };




    const {
      register,
      formState: { errors },
      handleSubmit,
      reset,
    } = useForm()

    const [createPendingPayment] = useCreatePendingPaymentMutation()

    const onFormSubmit = async (data) => {
        let paymentStatus = "Online"
        // const formData = new FormData();
        // formData.append("amount", data.amount);
        // formData.append("paymentReason", data.paymentReason);
        // formData.append("refundCondition", data.refundCondition);
        // formData.append("paymentStatus", online); 
        // if (file) {
        //     formData.append("file", file);
        // }

        const info = {
          amount:data.amount,
          paymentReason:data.paymentReason,
          refundCondition:data.refundCondition,
          paymentStatus:paymentStatus,
          user_id:id,

        }
   

        try {
            const res = await createPendingPayment(info);
            if (res.data?.success) {
                toast.success(res.data.message);
            
            } else {
                toast.error(res.error?.data?.message || "Failed. Please try again.");
            }
        } catch (error) {
            toast.error("An unexpected error occurred.");
        }
    };

    const onFormSubmit1 = async (data) => {
        let paymentStatus = "Offline"
        const formData = new FormData();
        formData.append("amount", data.amount);
        formData.append("paymentReason", data.paymentReason);
        formData.append("refundCondition", data.refundCondition);
        formData.append("paymentStatus", paymentStatus); 
        formData.append("user_id", id); 
        if (file) {
            formData.append("file", file);
        }

    console.log("formData", formData)


        try {
            const res = await createPendingPayment(formData);
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
      {/* <PageTitle>Dashboard</PageTitle> */}
   
<div className="w-full bg-white shadow-sm">
      <div className="flex justify-center gap-6 border-b border-gray-200">
        <div className="relative">
          <p
            onClick={() => setActiveTab("online")}
            className={`cursor-pointer py-4 px-2 text-sm sm:text-base font-semibold transition-all ${
              activeTab === "online" ? "text-purple-600" : "text-gray-800"
            }`}
          >
            Online Payment
          </p>
          {activeTab === "online" && (
            <span className="absolute bottom-0 left-0 w-full h-0.5 bg-blue-600" />
          )}
        </div>

        <div className="relative">
          <p
            onClick={() => setActiveTab("offline")}
            className={`cursor-pointer py-4 px-2 text-sm sm:text-base font-semibold transition-all ${
              activeTab === "offline" ? "text-purple-600" : "text-gray-800"
            }`}
          >
            Offline Payment
          </p>
          {activeTab === "offline" && (
            <span className="absolute bottom-0 left-0 w-full h-0.5 bg-blue-600" />
          )}
        </div>
      </div>

      <div className="p-4">
        {activeTab === "online" ? (
            <div className="w-full px-4 py-6 bg-gray-50">
            <div className="max-w-7xl mx-auto flex flex-col lg:flex-row lg:items-center lg:justify-between gap-4">
              
              {/* Form Section */}
              <div className="w-full flex justify-center">
                <form onSubmit={handleSubmit(onFormSubmit)} className="w-full max-w-md">
                  <div className="grid grid-cols-1 gap-4">
                    {/* Amount */}
                    <div className="mb-4">
                      <label className="block text-sm mb-1 text-gray-700">Amount</label>
                      <Input
                        type="number"
                        {...register("amount")}
                        className="w-full p-3 shadow-md border rounded-md"
                      />
                      {errors.amount && (
                        <p className="text-red-500 text-sm mt-1">{errors.amount.message}</p>
                      )}
                    </div>
          
                    {/* Reason For Payment */}
                    <div className="mb-4">
                      <label className="block text-sm mb-1 text-gray-700">Reason For Payment</label>
                      <Input
                        type="text"
                        {...register("paymentReason")}
                        className="w-full p-3 shadow-md border rounded-md"
                      />
                      {errors.paymentReason && (
                        <p className="text-red-500 text-sm mt-1">{errors.paymentReason.message}</p>
                      )}
                    </div>
          
                    {/* Refund Condition */}
                    <div className="mb-4">
                      <label className="block text-sm mb-1 text-gray-700">Refund Condition</label>
                      <Input
                        type="text"
                        {...register("refundCondition")}
                        className="w-full p-3 shadow-md border rounded-md"
                      />
                      {errors.refundCondition && (
                        <p className="text-red-500 text-sm mt-1">{errors.refundCondition.message}</p>
                      )}
                    </div>
                  </div>
          
                  {/* Submit Button */}
                  <div className="flex justify-end mt-6">
                    <Button type="submit" className="btn btn-primary">
                      Submit Request
                    </Button>
                  </div>
                </form>
              </div>
            </div>
          </div>
        ) : (
          <div>
            <div className="w-full px-4 py-6 bg-gray-50">
            <div className="max-w-7xl mx-auto flex flex-col lg:flex-row lg:items-center lg:justify-between gap-4">
              
              {/* Form Section */}
              <div className="w-full flex justify-center">
                <form onSubmit={handleSubmit(onFormSubmit1)} className="w-full max-w-md">
                  <div className="grid grid-cols-1 gap-4">
                    {/* Amount */}
                    <div className="mb-4">
                      <label className="block text-sm mb-1 text-gray-700">Amount</label>
                      <Input
                        type="number"
                        {...register("amount")}
                        className="w-full p-3 shadow-md border rounded-md"
                      />
                      {errors.amount && (
                        <p className="text-red-500 text-sm mt-1">{errors.amount.message}</p>
                      )}
                    </div>
          
                    {/* Reason For Payment */}
                    <div className="mb-4">
                      <label className="block text-sm mb-1 text-gray-700">Reason For Payment</label>
                      <Input
                        type="text"
                        {...register("paymentReason")}
                        className="w-full p-3 shadow-md border rounded-md"
                      />
                      {errors.paymentReason && (
                        <p className="text-red-500 text-sm mt-1">{errors.paymentReason.message}</p>
                      )}
                    </div>
          
                    {/* Refund Condition */}
                    <div className="mb-4">
                      <label className="block text-sm mb-1 text-gray-700">Refund Condition</label>
                      <Input
                        type="text"
                        {...register("refundCondition")}
                        className="w-full p-3 shadow-md border rounded-md"
                      />
                      {errors.refundCondition && (
                        <p className="text-red-500 text-sm mt-1">{errors.refundCondition.message}</p>
                      )}
                    </div>

                    <div>
                        <label className="block text-sm mb-1 text-gray-700">Upload Payment Details</label>
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
          
                  {/* Submit Button */}
                  <div className="flex justify-end mt-6">
                    <Button type="submit" className="btn btn-primary">
                      Submit Request
                    </Button>
                  </div>
                </form>
              </div>
            </div>
          </div>
          </div>
        )}
      </div>
    </div>

    </>
  )
}

export default PendingPayment;
