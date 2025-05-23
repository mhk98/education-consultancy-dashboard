import React from "react"
import { useForm } from "react-hook-form";
import toast from "react-hot-toast";
import { Input, Button } from '@windmill/react-ui'
import { useInitPendingPaymentMutation } from "../../features/pendingPayment/pendingPayment";


const CashIn = () => {

    const {
          register,
          formState: { errors },
          handleSubmit,
          reset,
        } = useForm
        ()
    

      const [initPendingPayment] = useInitPendingPaymentMutation()
        
    
    
        const onFormSubmit = async (data) => {
            
            let status = "Cash-Out"
          const info = {
            amount: data.amount,
            transactionId: data.transactionId,
            purpose: data.purpose,
            employee: data.employee,
            paymentStatus:status,
            branch:data.branch

        
          }
       
            try {
                const res = await initPendingPayment(info);
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
         <div className="w-full flex justify-between">
              <form onSubmit={handleSubmit(onFormSubmit)} className="w-full">
                <div className="grid grid-cols-1 gap-4">

                   <div className="mb-4">
                                      <label className="block text-sm mb-1 text-gray-700">Transaction Id</label>
                                      <Input
                                        type="text"
                                        {...register("transactionId")}
                                        className="w-full p-3 shadow-md border rounded-md"
                                      />
                                      {errors.transactionId && (
                                        <p className="text-red-500 text-sm mt-1">{errors.transactionId.message}</p>
                                      )}
                                    </div>
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
                    <label className="block text-sm mb-1 text-gray-700">Purpose for Cash-In</label>
                    <Input
                      type="text"
                      {...register("purpose")}
                      className="w-full p-3 shadow-md border rounded-md"
                    />
                    {errors.purpose && (
                      <p className="text-red-500 text-sm mt-1">{errors.purpose.message}</p>
                    )}
                  </div>

                   <div className="mb-4">
                                                                                   
                   <label className="block text-sm mb-1 text-gray-700 mb-4">Employee Name</label>

                        <select
                          {...register("employee")} className="input input-bordered w-full shadow-md p-3">
                                    <option value="">Select Employee</option>
                                    <option value="A">A</option>
                                    <option value="B">B</option>        
                                    <option value="C">C</option>        
                                    <option value="D">D</option>        
                                    <option value="E">E</option>        
                        </select>
                        {errors.employee && (
                          <p className="text-red-500 text-sm mt-1">{errors.employee.message}</p>)}
                        </div> 
        
                        <div className="mb-4">
                    <label className="block text-sm text-gray-700 mb-2">
                      Branch
                    </label>
                    <select
                      {...register("branch")}
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
                </div>
        
                {/* Submit Button */}
                <div className="flex justify-end mt-6">
                  <Button type="submit" className="btn btn-brandRed">
                   Submit Request
                  </Button>
                </div>
              </form>
            </div>
    )
}

export default CashIn;