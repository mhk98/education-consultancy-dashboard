import React, { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import toast from "react-hot-toast";
import { Input, Button } from "@windmill/react-ui";
import { useInitPendingPaymentMutation } from "../../features/pendingPayment/pendingPayment";
import axios from "axios";

const CashIn = () => {
  const role = localStorage.getItem("role");
  const branch = localStorage.getItem("branch");
  const FirstName = localStorage.getItem("FirstName");
  const LastName = localStorage.getItem("LastName");
  const id = localStorage.getItem("userId");
  const {
    register,
    formState: { errors },
    handleSubmit,
    reset,
  } = useForm();

  const [initPendingPayment] = useInitPendingPaymentMutation();

  const onFormSubmit = async (data) => {
    let status = "Cash-Out";
    const info = {
      amount: data.amount,
      // transactionId: data.transactionId,
      purpose: data.purpose,
      employee: `${FirstName} ${LastName}`,
      paymentStatus: status,
      branch: branch,
      user_id: id,
    };

    try {
      const res = await initPendingPayment(info);
      if (res.data?.success) {
        toast.success(res.data.message);
        reset();
      } else {
        toast.error(res.error?.data?.message || "Failed. Please try again.");
      }
    } catch (error) {
      toast.error("An unexpected error occurred.");
    }
  };

  const [employees, setEmployees] = useState([]);

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const response = await axios.get(
          "http://localhost:5000/api/v1/user"
        );
        const allUsers = response.data.data;

        // ফিল্টার লজিক
        const filtered = allUsers.filter((user) => {
          const role = user.Role?.toLowerCase(); // রোল lowercase করে নিচ্ছি
          return role && role === "employee" && user.Branch === branch;
        });

        setEmployees(filtered);
      } catch (err) {
        console.error("Error fetching users:", err);
      }
    };

    fetchUsers();
  }, [branch]);

  const [superAdminEmployees, setSuperAdminEmployees] = useState([]);

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const response = await axios.get(
          "http://localhost:5000/api/v1/user"
        );
        const allUsers = response.data.data;

        // ফিল্টার লজিক
        const filtered = allUsers.filter((user) => {
          const role = user.Role?.toLowerCase(); // রোল lowercase করে নিচ্ছি
          return role && role === "employee";
        });

        setSuperAdminEmployees(filtered);
      } catch (err) {
        console.error("Error fetching users:", err);
      }
    };

    fetchUsers();
  }, [branch]);

  const handleEnter = (e) => {
    if (e.key === "Enter") {
      e.preventDefault();
      const form = e.target.form;
      const index = Array.prototype.indexOf.call(form, e.target);
      form.elements[index + 1]?.focus();
    }
  };

  return (
    <div className="w-full flex justify-between">
      <form onSubmit={handleSubmit(onFormSubmit)} className="w-full">
        <div className="grid grid-cols-1 gap-4">
          {/* 
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
                                    </div> */}
          {/* Amount */}
          <div className="mb-4">
            <label className="block text-sm mb-1 text-gray-700">Amount</label>
            <Input
              type="number"
              {...register("amount")}
              onKeyDown={handleEnter}
              className="w-full p-3 shadow-md border rounded-md"
            />
            {errors.amount && (
              <p className="text-red-500 text-sm mt-1">
                {errors.amount.message}
              </p>
            )}
          </div>

          {/* Reason For Payment */}
          <div className="mb-4">
            <label className="block text-sm mb-1 text-gray-700">
              Purpose for Cash-Out
            </label>
            <Input
              type="text"
              {...register("purpose")}
              onKeyDown={handleEnter}
              className="w-full p-3 shadow-md border rounded-md"
            />
            {errors.purpose && (
              <p className="text-red-500 text-sm mt-1">
                {errors.purpose.message}
              </p>
            )}
          </div>

          {/* {
                    role === "admin" &&
                      <div className="mb-4">
                    <label className="block text-sm mb-1 text-gray-700 mb-4">Employee</label>
                    <select
                      {...register("employee")}
                      onKeyDown = {handleEnter}
                      className="input input-bordered w-full shadow-md p-3"
                    >
                      <option value="">Select Employee</option>
                      {
                        
                      employees.map((employee) => (
                        <option
                          key={employee.id}
                          value={`${employee.FirstName} ${employee.LastName}`}
                        >
                          {employee.FirstName} {employee.LastName}
                        </option>
                      ))
                      
                      }
                    </select>
                    {errors.employee && (
                      <p className="text-red-500 text-sm mt-1">{errors.employee.message}</p>
                    )}
                  </div> 
                    
                  }
        {
          role === "admin" && 
          <div className="mb-4">
          <label className="block text-sm text-gray-700 mb-2">
            Branch
          </label>
          <select
            {...register("branch")}
            onKeyDown = {handleEnter}
            className="input input-bordered w-full shadow-md p-3"
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
          {errors.branch && (
            <p className="text-red-500 text-sm mt-1">{errors.branch.message}</p>
          )}
        </div>
        } */}
        </div>

        {/* Submit Button */}
        <div className="flex justify-end mt-6">
          <Button type="submit" className="btn bg-brandRed">
            Submit Request
          </Button>
        </div>
      </form>
    </div>
  );
};

export default CashIn;
