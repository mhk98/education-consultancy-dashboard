import React, {  useEffect, useState } from 'react';
import { Modal, ModalHeader, ModalBody, Input, Button } from '@windmill/react-ui';
import { useForm } from 'react-hook-form';
import { useDeleteConsultationMutation, useGetAllConsultationQuery, useGetDataByIdQuery, useUpdateConsultationMutation } from '../../features/consultation/consultation';
import toast from 'react-hot-toast';
import { LiaEditSolid } from 'react-icons/lia';
import { FaInfoCircle, FaTrash } from 'react-icons/fa';


function Client({id}) {
//   const id = localStorage.getItem("userId");
  const role = localStorage.getItem("role");
  const branch = localStorage.getItem("branch");

   const [consultationId, setConsultationId] = useState('')
  
      const [isModalOpen, setIsModalOpen] = useState(false);
            
                function closeModal() {
                 setIsModalOpen(false)
               }

  const [activeTab, setActiveTab] = useState("client");

  const isClient = activeTab === "client";
  const isHistory = activeTab === "history";
  const isDocuments = activeTab === "documents";


  
     const {
        register,
        handleSubmit,
        reset,
        formState: { errors },
      } = useForm();
 

       const onFormSubmit = async (data) => {
          const formData = new FormData();
          formData.append('id', data.assignedTo);

          formData.append('task', data.task);
          formData.append('branch', branch);
          formData.append('dueDate', data.dueDate);
          formData.append('description', data.description);
          formData.append('comment', data.comment);
        //   if (file) formData.append('file', file);
      
          try {
            // const res = await createTask(formData);
            // if (res.data?.success) {
            //   toast.success(res.data.message);
            //   reset();
            //   setIsModalOpen(false);
            // } else {
            //   toast.error(res.error?.data?.message || 'Failed. Please try again.');
            // }
          } catch {
            // toast.error('An unexpected error occurred.');
          }
        };

       const {data, isLoading, isError, error} = useGetDataByIdQuery(id)
    
            const [consultation, setConsultation] = useState(null)
    
            useEffect(() => {
              if(isError){
                console.log("Error fetching", error)
              } else if (!isLoading && data?.data){
                setConsultation(data.data)
              }
            }, [data, isLoading, isError, error])
    
    
            console.log("consultations", consultation?.fullName)
    
            const [updateConsultation] = useUpdateConsultationMutation()
    
            const onFormEdit = async (data) => {
                try {
                  const res = await updateConsultation({ id: consultationId, data });
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
    
    
            const [deleteConsultation] = useDeleteConsultationMutation()
    
    
               const handleDeleteUser = async (id) => {
                  try {
                    const res = await deleteConsultation(id);
                    if (res.data?.success) {
                      toast.success(res.data.message);
                    } else {
                      toast.error(res.error?.data?.message || 'Failed. Please try again.');
                    }
                  } catch {
                    toast.error('An unexpected error occurred.');
                  }
                };
    

  return (
    <>
     <div className='w-full px-4 py-6 bg-gray-50'>

           <div className="card">
                 <div className="flex items-center justify-between mb-4">
                   <div className="flex items-center gap-2 text-brandRed font-semibold text-sm">
                     <FaInfoCircle className="w-5 h-5" />
                     Client Information
                   </div>
                   <button
                     onClick={() => {
                       reset({
                         date: consultation?.date || "",
                         startDate: consultation?.startDate || "",
                         fullName: consultation?.fullName || "",
                         phone: consultation?.phone || "",
                         email: consultation?.email || "",
                         destination: consultation?.destination || "",
                         address: consultation?.address || "",
                         ielts: consultation?.ielts || "",
                         ieltsScore: consultation?.ieltsScore || "",
                         location: consultation?.location || "",
                         applicationCode: consultation?.applicationCode || "",
                         sscYear: consultation?.sscYear || "",
                         sscDepartment: consultation?.sscDepartment || "",
                         sscCGPA: consultation?.sscCGPA || "",
                         hscYear: consultation?.hscYear || "",
                         hscDepartment: consultation?.hscDepartment || "",
                         hscCGPA: consultation?.hscCGPA || "",
                         bachelorYear: consultation?.bachelorYear || "",
                         bachelorDepartment: consultation?.bachelorDepartment || "",
                         bachelorCGPA: consultation?.bachelorCGPA || "",
                       });
                       setIsModalOpen(true)
                     }}
                     className="btn btn-outline btn-sm text-brandRed bg-brandLight p-2 rounded-sm"
                   >
                     Request Edit
                   </button>
                 </div>
           
                     <div className="card-body p-8 shadow-md bg-base-100 rounded-md">
                   <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                     <div className="text-md">
                       <span className="text-gray-600">Full Name</span><br />
                       <span>{consultation?.fullName}</span>
                     </div>
                     <div className="text-md">
                       <span className="text-gray-600">Email</span><br />
                       <span>{consultation?.email}</span>
                     </div>
                     <div className="text-md">
                       <span className="text-gray-600">Date of birth</span><br />
                       <span>{consultation?.date}</span>
                     </div>
                     <div className="text-md">
                       <span className="text-gray-600">Destination</span><br />
                       <span>{consultation?.destination}</span>
                     </div>
                     <div className="text-md">
                       <span className="text-gray-600">Address</span><br />
                       <span>{consultation?.address}</span>
                     </div>
                     <div className="text-md">
                       <span className="text-gray-600">Phone</span><br />
                       <span>{consultation?.phone}</span>
                     </div>
                     <div className="text-md">
                       <span className="text-gray-600">IELTS</span><br />
                       <span>{consultation?.ielts}</span>
                     </div>
                     <div className="text-md">
                       <span className="text-gray-600">IELTS Score</span><br />
                       <span>{consultation?.ieltsScore}</span>
                     </div>
                     <div className="text-md">
                       <span className="text-gray-600">SSC Year</span><br />
                       <span>{consultation?.sscYear}</span>
                     </div>
                     <div className="text-md">
                       <span className="text-gray-600">SSC Department</span><br />
                       <span>{consultation?.sscDepartment}</span>
                     </div>
                     <div className="text-md">
                       <span className="text-gray-600">SSC CGPA</span><br />
                       <span>{consultation?.sscCGPA}</span>
                     </div>
                     <div className="text-md">
                       <span className="text-gray-600">HSC Year</span><br />
                       <span>{consultation?.hscYear}</span>
                     </div>
                     <div className="text-md">
                       <span className="text-gray-600">HSC Department</span><br />
                       <span>{consultation?.hscDepartment}</span>
                     </div>
                     <div className="text-md">
                       <span className="text-gray-600">HSC CGPA</span><br />
                       <span>{consultation?.hscCGPA}</span>
                     </div>
                     <div className="text-md">
                       <span className="text-gray-600">Bachelor Year</span><br />
                       <span>{consultation?.bachelorYear}</span>
                     </div>
                     <div className="text-md">
                       <span className="text-gray-600">Bachelor Department</span><br />
                       <span>{consultation?.bachelorDepartment}</span>
                     </div>
                     <div className="text-md">
                       <span className="text-gray-600">Bachelor CGPA</span><br />
                       <span>{consultation?.bachelorCGPA}</span>
                     </div>
                     <div className="text-md">
                       <span className="text-gray-600">Branch</span><br />
                       <span>{consultation?.bachelorCGPA}</span>
                     </div>
                     <div className="text-md">
                       <span className="text-gray-600">Application Code</span><br />
                       <span>{consultation?.bachelorCGPA}</span>
                     </div>
                     <div className="text-md">
                       <span className="text-gray-600">Bachelor CGPA</span><br />
                       <span>{consultation?.bachelorCGPA}</span>
                     </div>
                   </div>
                 </div>
                  
                 
           
                 <Modal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)}>
                  <ModalHeader>Lead Management</ModalHeader>
                
                  <ModalBody className="w-full max-w-screen-lg max-h-[70vh] overflow-y-auto">
                    <div className="max-h-[80vh] overflow-y-auto px-4 py-2">
                      <form
                        onSubmit={handleSubmit(onFormEdit)}
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
                              Convert Student *
                            </label>
                            <select
                              id="convert"
                              className="w-full border rounded px-3 py-2"
                              {...register("convert", { required: true })}
                            >
                              <option value="">Select</option>
                              <option>Yes</option>
                              <option>No</option>
                            </select>
                            {errors.convert && (
                              <p className="text-red-500 text-sm">Convert student selection is required</p>
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
               </div>
     </div>
    </>
  );
}

export default Client;
