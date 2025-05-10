import React, { useState } from 'react'
import { useForm } from 'react-hook-form'
import { Input, Button } from '@windmill/react-ui'
import { useHistory } from 'react-router-dom/cjs/react-router-dom'
import toast from 'react-hot-toast'

function RequestPayment() {




    const {
      register,
      formState: { errors },
      handleSubmit,
      reset,
    } = useForm()

    // const [userRegister] = useUserRegisterMutation()
    //   const history = useHistory();

    // const onFormSubmit = async (data) => {
    //   console.log("formData", data)
    //     const formData = new FormData();
    //     formData.append("FirstName", data.FirstName);
    //     formData.append("LastName", data.LastName);
    //     formData.append("Email", data.Email);
    //     formData.append("Password", data.Password);
    //     formData.append("Phone", data.Phone); 
    //     formData.append("Role", data.Role); 
    //     if (image) {
    //         formData.append("image", image);
    //     }

    // console.log("formData", formData)


    //     try {
    //         const res = await userRegister(formData);
    //         if (res.data?.success) {
    //             toast.success(res.data.message);
    //             history.push('/login');
    //         } else {
    //             toast.error(res.error?.data?.message || "Registration failed. Please try again.");
    //         }
    //     } catch (error) {
    //         toast.error("An unexpected error occurred.");
    //     }
    // };


  return (
    <>
      {/* <PageTitle>Dashboard</PageTitle> */}
      <div className="w-full px-4 py-6 bg-gray-50">
  <div className="max-w-7xl mx-auto flex flex-col lg:flex-row lg:items-center lg:justify-between gap-4">
    
    {/* Form Section */}
    <div className="w-full flex justify-center">
      <form className="w-full max-w-md">
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

          {/* Short Note */}
          <div className="mb-4">
            <label className="block text-sm mb-1 text-gray-700">Short Note</label>
            <Input
              type="text"
              {...register("note")}
              className="w-full p-3 shadow-md border rounded-md"
            />
            {errors.note && (
              <p className="text-red-500 text-sm mt-1">{errors.note.message}</p>
            )}
          </div>
        </div>

        {/* Submit Button */}
        <div className="flex justify-end mt-6">
          <Button type="submit" className="btn btn-primary">
            Pay Online
          </Button>
        </div>
      </form>
    </div>
  </div>
</div>

    </>
  )
}

export default RequestPayment;
