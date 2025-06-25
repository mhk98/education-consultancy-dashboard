import React, { useEffect, useState } from 'react';
import { Modal, ModalHeader, ModalBody, Input, Button } from '@windmill/react-ui';
import { useForm } from 'react-hook-form';
import { useCreateConsultationMutation, useDeleteConsultationMutation, useGetAllConsultationQuery, useUpdateConsultationMutation } from '../features/consultation/consultation';
import toast from 'react-hot-toast';
import { LiaEditSolid } from 'react-icons/lia';
import { FaTrash } from 'react-icons/fa';
import { Link } from 'react-router-dom';
import { MdOutlineGridView } from "react-icons/md";

function Leads() {
  const id = localStorage.getItem("userId");
  const role = localStorage.getItem("role");
  const branch = localStorage.getItem("branch");

  const [leadId, setLeadId] = useState('');
  const [month, setMonth] = useState('');
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isModalOpen1, setIsModalOpen1] = useState(false);

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm();

  const { data, isLoading, isError, error } = useGetAllConsultationQuery();
  const [consultations, setConsultations] = useState([]);

  useEffect(() => {
    if (isError) {
      console.log("Error fetching", error);
    } else if (!isLoading && data?.data) {
      setConsultations(data.data);
    }
  }, [data, isLoading, isError, error]);

  const [updateConsultation] = useUpdateConsultationMutation();
  const [deleteConsultation] = useDeleteConsultationMutation();

  const handleDeleteUser = async (id) => {
    try {
      const res = await deleteConsultation(id);
      res.data?.success
        ? toast.success(res.data.message)
        : toast.error(res.error?.data?.message || 'Failed. Please try again.');
    } catch {
      toast.error('An unexpected error occurred.');
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


  const [createConsultation] = useCreateConsultationMutation()

  const onFormSubmit = async (data) => {
    let type = "Office Visit"
    const dataExtened = {
      ...data,
      type
    }

    const res = await createConsultation(dataExtened)

    if(res.data.success){
      toast.success("Form submitted successfully")
       reset();
        setIsModalOpen(false);
    } else {
      toast.error("Something went wrong")
    }
  };
      
              const onFormEdit = async (data) => {
                  try {
                    const res = await updateConsultation({ id: leadId, data });
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

  const today = new Date().toISOString().split("T")[0]; // "2025-06-23"


  return (
    <div className="w-full px-4 py-6 bg-gray-50 max-w-screen-2xl mx-auto">
      {/* Header */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <h4 className="text-xl md:text-2xl font-semibold text-gray-900">Lead Management</h4>
        <div className="w-full sm:w-auto">
          <button
            onClick={() => setIsModalOpen(true)}
            className="w-full sm:w-auto px-4 py-2 bg-red-600 hover:bg-red-700 transition text-white rounded-md text-sm sm:text-base"
          >
            + Add Lead
          </button>
        </div>
      </div>

      {/* Modal */}
      <Modal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)}>
  <ModalHeader>Lead Management</ModalHeader>

  <ModalBody className="w-full max-w-screen-lg max-h-[70vh] overflow-y-auto">
    <div className="max-h-[80vh] overflow-y-auto px-4 py-2">
      <form
        onSubmit={handleSubmit(onFormSubmit)}
        className="w-full mx-auto"
      >
        <div className="grid grid-cols-1 md:grid-cols-3 gap-2">
          {/* FULL NAME */}
          <div>
            <label htmlFor="fullName" className="block text-sm font-medium mb-1">
              Full Name *
            </label>
            <input
              id="fullName"
              className="w-full border rounded px-3 py-2"
              {...register("fullName", { required: true })}
            />
            {errors.fullName && (
              <p className="text-red-500 text-sm">Full name is required</p>
            )}
          </div>

          {/* PHONE */}
          <div>
            <label htmlFor="phone" className="block text-sm font-medium mb-1">
              Phone Number *
            </label>
            <input
              id="phone"
              type="tel"
              className="w-full border rounded px-3 py-2"
              placeholder="+8801XXXXXXXXX"
              {...register("phone", { required: true })}
            />
            {errors.phone && (
              <p className="text-red-500 text-sm">Phone number is required</p>
            )}
          </div>

          {/* EMAIL */}
          <div>
            <label htmlFor="email" className="block text-sm font-medium mb-1">
              Email *
            </label>
            <input
              id="email"
              type="email"
              className="w-full border rounded px-3 py-2"
              {...register("email", { required: true })}
            />
            {errors.email && (
              <p className="text-red-500 text-sm">Email is required</p>
            )}
          </div>

          {/* DATE */}
          <div>
            <label htmlFor="date" className="block text-sm font-medium mb-1">
              Date of Birth
            </label>
            <input
              type="date"
              id="date"
              className="w-full border rounded px-3 py-2"
              {...register("date")}
            />
          </div>

          {/* DESTINATION */}
          <div>
            <label
              htmlFor="destination"
              className="block text-sm font-medium mb-1"
            >
              Prefd Destination *
            </label>
            <select
              id="destination"
              className="w-full border rounded px-3 py-2"
              {...register("destination", { required: true })}
            >
              <option value="">Select your destination</option>
              <option>Bangladeshi</option>
              <option>Indian</option>
              <option>Other</option>
            </select>
            {errors.destination && (
              <p className="text-red-500 text-sm">Destination is required</p>
            )}
          </div>

          {/* ADDRESS */}
          <div>
            <label htmlFor="address" className="block text-sm font-medium mb-1">
              Full Address *
            </label>
            <input
              id="address"
              className="w-full border rounded px-3 py-2"
              {...register("address", { required: true })}
            />
            {errors.address && (
              <p className="text-red-500 text-sm">Address is required</p>
            )}
          </div>

          {/* IELTS */}
          <div>
            <label htmlFor="ielts" className="block text-sm font-medium mb-1">
              IELTS *
            </label>
            <select
              id="ielts"
              className="w-full border rounded px-3 py-2"
              {...register("ielts", { required: true })}
            >
              <option value="">Select</option>
              <option>Yes</option>
              <option>No</option>
            </select>
            {errors.ielts && (
              <p className="text-red-500 text-sm">IELTS selection is required</p>
            )}
          </div>

          {/* IELTS SCORE */}
          <div>
            <label
              htmlFor="ieltsScore"
              className="block text-sm font-medium mb-1"
            >
              IELTS Score *
            </label>
            <input
              type="number"
              id="ieltsScore"
              className="w-full border rounded px-3 py-2"
              {...register("ieltsScore", { required: true })}
            />
            {errors.ieltsScore && (
              <p className="text-red-500 text-sm">Score is required</p>
            )}
          </div>

          {/* LOCATION */}
          <div>
            <label htmlFor="location" className="block text-sm font-medium mb-1">
              Appointment Location *
            </label>
            <select
              id="location"
              className="w-full border rounded px-3 py-2"
              {...register("location", { required: true })}
            >
              <option value="">Select Location</option>
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
            {errors.location && (
              <p className="text-red-500 text-sm">Location is required</p>
            )}
          </div>

          {/* APPLICATION CODE */}
          <div>
            <label
              htmlFor="applicationCode"
              className="block text-sm font-medium mb-1"
            >
              Application Code *
            </label>
            <input
              id="applicationCode"
              className="w-full border rounded px-3 py-2"
              {...register("applicationCode", { required: true })}
            />
            {errors.applicationCode && (
              <p className="text-red-500 text-sm">Required</p>
            )}
          </div>

          {/* Academic Fields */}
          <div>
            <label className="block text-sm font-medium mb-1">SSC Year *</label>
            <input
              type="number"
              className="w-full border rounded px-3 py-2"
              {...register("sscYear", { required: true })}
            />
            {errors.sscYear && (
              <p className="text-red-500 text-sm">SSC Year required</p>
            )}
          </div>

          <div>
            <label className="block text-sm font-medium mb-1">
              SSC Department *
            </label>
            <input
              className="w-full border rounded px-3 py-2"
              {...register("sscDepartment", { required: true })}
            />
            {errors.sscDepartment && (
              <p className="text-red-500 text-sm">Required</p>
            )}
          </div>

          <div>
            <label className="block text-sm font-medium mb-1">SSC GPA *</label>
            <input
              className="w-full border rounded px-3 py-2"
              {...register("sscCGPA", { required: true })}
            />
            {errors.sscCGPA && (
              <p className="text-red-500 text-sm">Required</p>
            )}
          </div>

          <div>
            <label className="block text-sm font-medium mb-1">HSC Year *</label>
            <input
              type="number"
              className="w-full border rounded px-3 py-2"
              {...register("hscYear", { required: true })}
            />
            {errors.hscYear && (
              <p className="text-red-500 text-sm">Required</p>
            )}
          </div>

          <div>
            <label className="block text-sm font-medium mb-1">
              HSC Department *
            </label>
            <input
              className="w-full border rounded px-3 py-2"
              {...register("hscDepartment", { required: true })}
            />
            {errors.hscDepartment && (
              <p className="text-red-500 text-sm">Required</p>
            )}
          </div>

          <div>
            <label className="block text-sm font-medium mb-1">HSC GPA *</label>
            <input
              className="w-full border rounded px-3 py-2"
              {...register("hscCGPA", { required: true })}
            />
            {errors.hscCGPA && (
              <p className="text-red-500 text-sm">Required</p>
            )}
          </div>

          {/* Bachelor (Optional) */}
          <div>
            <label className="block text-sm font-medium mb-1">Bachelor Year</label>
            <input
              type="number"
              className="w-full border rounded px-3 py-2"
              {...register("bachelorYear")}
            />
          </div>

          <div>
            <label className="block text-sm font-medium mb-1">
              Bachelor Department
            </label>
            <input
              className="w-full border rounded px-3 py-2"
              {...register("bachelorDepartment")}
            />
          </div>

          <div>
            <label className="block text-sm font-medium mb-1">Bachelor GPA</label>
            <input
              className="w-full border rounded px-3 py-2"
              {...register("bachelorCGPA")}
            />
          </div>
        </div>

        <div className="flex justify-end mt-6">
          <button
            type="submit"
            className="bg-red-600 text-white px-6 py-2 rounded hover:bg-red-700 transition"
          >
            Save
          </button>
        </div>
      </form>
    </div>
  </ModalBody>
</Modal>


      {/* Filters */}
      <div className="my-6">
        <select className="w-full sm:w-[300px] bg-gray-200 text-gray-700 rounded-md py-2 px-3 text-sm sm:text-base">
          <option value="">All Leads</option>
          <option value="websiteLeads">Meta Leads / Website Leads</option>
          <option value="officeVisits">Office Visits</option>
          <option value="myCase">My Case</option>
          <option value="successCase">Previous Success Case</option>
          <option value={today}>Today Call List</option>
        </select>
      </div>

<div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <h4 className="text-xl md:text-2xl font-semibold text-gray-900">Total Counts: </h4>
        <div className="mb-4">    
                          <select   onChange={(e) => setMonth(e.target.value)}             
                            className="input input-bordered w-full shadow-md p-3"
                          >
                            <option value="">Select Month</option>
                            <option value="January">January</option>
                            <option value="officeVisits">February</option>
                            <option value="myCase">My Case</option>
                            <option value="successCase">Previous Success Case</option>
                          </select> 
                        </div>
      </div>
      {/* Table */}
      <div className="overflow-x-auto">
        <table className="min-w-[1000px] w-full text-sm text-left text-gray-700 bg-white shadow-md rounded-lg">
          <thead className="bg-gray-100">
            <tr>
              {["Name", "Email", "B-Date", "Destination", "Address", "Phone", "IELTS", "Score", "SSC GPA", "HSC GPA", "Bachelor GPA", "Branch", "Action"].map(header => (
                <th key={header} className="p-3">{header}</th>
              ))}
            </tr>
          </thead>
          <tbody>
            {consultations.map((consultation, idx) => (
              <tr key={idx} className={`${idx % 2 === 0 ? "bg-gray-50" : "bg-white"} border-b`}>
                <td className="p-3 whitespace-nowrap">{consultation.fullName ?? ''}</td>
                <td className="p-3 whitespace-nowrap">{consultation.email ?? ''}</td>
                <td className="p-3 whitespace-nowrap">{consultation.date ?? ''}</td>
                <td className="p-3 whitespace-nowrap">{consultation.destination ?? ''}</td>
                <td className="p-3 whitespace-nowrap">{consultation.address ?? ''}</td>
                <td className="p-3 whitespace-nowrap">{consultation.phone ?? ''}</td>
                <td className="p-3 whitespace-nowrap">{consultation.ielts ?? ''}</td>
                <td className="p-3 whitespace-nowrap">{consultation.ieltsScore ?? ''}</td>
                <td className="p-3 whitespace-nowrap">{consultation.sscCGPA ?? ''}</td>
                <td className="p-3 whitespace-nowrap">{consultation.hscCGPA ?? ''}</td>
                <td className="p-3 whitespace-nowrap">{consultation.bachelorCGPA ?? ''}</td>
                <td className="p-3 whitespace-nowrap">{consultation.location ?? ''}</td>
                <td className="p-3 whitespace-nowrap flex gap-2 items-center">
                  
                    <LiaEditSolid
                                        className="cursor-pointer"
                                        onClick={() => {
                                          setIsModalOpen1(true);
                                          setLeadId(consultation.id);
                                        }}
                                      />
                    <Link to={`/app/editLeads/${consultation.id}`}>
                    <MdOutlineGridView/>
                  </Link>
                  <FaTrash className="text-red-500 text-sm cursor-pointer" onClick={() => handleDeleteUser(consultation.id)} />
                </td>
                 <Modal isOpen={isModalOpen1} onClose={() => setIsModalOpen1(false)}>
                        <ModalHeader>Edit Lead Management</ModalHeader>
                        <ModalBody>
                    <form onSubmit={handleSubmit(onFormEdit)}>
                      <div className="grid grid-cols-1 gap-4">
                       {
                        role === "superAdmin" ? (
                          <div className="mb-4">
                          <label className="block text-sm text-gray-700 mb-2">
                           Lead Status
                          </label>
                          <select
                            {...register("status")}
                            className="input input-bordered w-full shadow-md p-3"
                          >
                            <option value="">Select Status</option>
                            <option value="websiteLeads">Meta Leads / Website Leads</option>
                            <option value="officeVisits">Office Visits</option>
                            <option value="myCase">My Case</option>
                            <option value="successCase">Previous Success Case</option>
                          </select>
                          {errors.status && (
                            <p className="text-red-500 text-sm mt-1">{errors.status.message}</p>
                          )}
                        </div>
                        ) : (
                          <div className="mb-4">
                          <label className="block text-sm text-gray-700 mb-2">
                           Task Status
                          </label>
                          <select
                            {...register("status")}
                            className="input input-bordered w-full shadow-md p-3"
                          >
                            <option value="">Select Status</option>
                            <option value="COMPLETE">COMPLETE</option>
                            <option value="PENDING">PENDING</option>
                          </select>
                          {errors.status && (
                            <p className="text-red-500 text-sm mt-1">{errors.status.message}</p>
                          )}
                        </div>
                        )
                       }
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
        </table>
      </div>
    </div>
  );
}

export default Leads;
