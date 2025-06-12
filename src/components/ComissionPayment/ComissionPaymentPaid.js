import React, { useEffect, useState } from "react";
import {
  useDeleteCommissionMutation,
  useGetAllCommissionQuery,
  useUpdateCommissionMutation,
} from "../../features/commission/commission";
import toast from "react-hot-toast";
import { LiaEditSolid } from "react-icons/lia";
import { FaTrash } from "react-icons/fa";
import { useForm } from "react-hook-form";
import { Modal, ModalHeader, ModalBody, Button } from "@windmill/react-ui";

const ComissionPaymentPaid = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [file, setFile] = useState(null);
  const [paymentId, setPaymentId] = useState("");

  const [updateCommission] = useUpdateCommissionMutation();
  const [deleteCommission] = useDeleteCommissionMutation();

 

     const { data, isLoading, isError, error } = useGetAllCommissionQuery();
     const [payments, setPayments] = useState([]);
               
                  useEffect(() => {
                       if (isError) {
                         console.log("Error fetching", error);
                       } else if (!isLoading && data) {
                         const filteredPayments = data.data.filter(
                           (item) => item.status === "PAID"
                         );
                         setPayments(filteredPayments);
                       }
                     }, [data, isLoading, isError, error]);


  console.log("payments", payments)

  const closeModal = () => {
    setIsModalOpen(false);
    setFile(null);
  };

  const handleFileChange = (e) => {
    setFile(e.target.files[0]);
  };

  const formatDate = (dateString) => {
    const date = new Date(dateString);
    return date.toLocaleDateString("en-GB", {
      day: "2-digit",
      month: "long",
      year: "numeric",
    });
  };

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const onFormEdit = async (formDataInput) => {
    const formData = new FormData();
    formData.append("status", formDataInput.status);
    if (file) {
      formData.append("file", file);
    }

    try {
      const res = await updateCommission({ id: paymentId, data: formData });
      if (res.data?.success) {
        toast.success(res.data.message);
        closeModal();
      } else {
        toast.error(res.error?.data?.message || "Failed. Please try again.");
      }
    } catch (error) {
      toast.error("An unexpected error occurred.");
    }
  };

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

  const handleEnter = (e) => {
    if (e.key === 'Enter') {
      e.preventDefault();
      const form = e.target.form;
      const index = Array.prototype.indexOf.call(form, e.target);
      form.elements[index + 1]?.focus();
    }
  };

  return (
    <div className="w-full overflow-x-auto">
      <table className="w-full text-sm text-left text-gray-700 bg-white shadow-md rounded-lg">
        <thead className="bg-gray-100 border-b border-gray-200">
          <tr>
            <th className="p-3 min-w-[180px]">Date</th>
            <th className="p-3 min-w-[180px]">Amount</th>
            <th className="p-3 min-w-[120px]">Purpose</th>
            <th className="p-3 min-w-[160px]">Status</th>
            <th className="p-3 min-w-[160px]">Document</th>
            <th className="p-3 min-w-[160px]">Action</th>
          </tr>
        </thead>
        <tbody>
          {payments.length > 0 ? (
            payments.map((payment) => (
              <tr
                key={payment.id}
                className={`border-b border-gray-200 ${
                  payment.id % 2 === 0 ? "bg-gray-50" : "bg-white"
                }`}
              >
                <td className="p-3 whitespace-nowrap">
                  {formatDate(payment.createdAt)}
                </td>
                <td className="p-3 whitespace-nowrap">{payment.amount}</td>
                <td className="p-3 whitespace-nowrap">{payment.purpose}</td>
                <td className="p-3 whitespace-nowrap">{payment.status}</td>
                {
                  payment.file ? <td className="p-3 whitespace-nowrap">
                  <a
                    href={`https://api.eaconsultancy.info/${payment.file}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-brandRed"
                  >
                    Preview PDF
                  </a>
                </td> : <p>Not Available</p>
                }
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
              </tr>
            ))
          ) : (
            <tr>
              <td colSpan="5" className="p-4 text-center text-gray-500">
                No PAID commissions found.
              </td>
            </tr>
          )}
        </tbody>
      </table>

      {/* Edit Modal */}
      <Modal isOpen={isModalOpen} onClose={closeModal}>
        <ModalHeader className="mb-8">Edit Commission Information</ModalHeader>
        <ModalBody>
          <form onSubmit={handleSubmit(onFormEdit)}>
            <div className="grid grid-cols-1 gap-4">
              <div className="mb-4">
                <label className="block text-sm mb-1 text-gray-700">
                  Payment Status
                </label>
                <select
                  {...register("status", { required: "Status is required" })}
                  onKeyDown={handleEnter}
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

              <div>
                <label className="block text-sm mb-1 text-gray-700">
                  Upload Payment Documents
                </label>
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
              <Button
                type="submit"
                className="btn"
                style={{ backgroundColor: "#C71320" }}
              >
                Save
              </Button>
            </div>
          </form>
        </ModalBody>
      </Modal>
    </div>
  );
};

export default ComissionPaymentPaid;
