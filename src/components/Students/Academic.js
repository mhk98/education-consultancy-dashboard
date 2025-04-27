import React, { useState, useEffect } from "react";
import { useForm } from "react-hook-form";
import { FaInfoCircle } from "react-icons/fa";
import { Modal, ModalHeader, ModalBody, Button } from '@windmill/react-ui'
import { Input, Select, Textarea } from '@windmill/react-ui'
import toast from "react-hot-toast";
import { useUpdateAcademicMutation } from "../../features/academic/academic";
import { useGetDataByIdQuery } from "../../features/application/application";

const Academic = ({id}) => {

     const [isModalOpen, setIsModalOpen] = useState(false)
     const [isModalOpen1, setIsModalOpen1] = useState(false)

    function closeModal() {
        setIsModalOpen(false)
      }
      function closeModal1() {
        setIsModalOpen1(false)
      }

    const {
        register,
        formState: { errors },
        handleSubmit,
        reset,
      } = useForm()
    
      const [updateAcademic] = useUpdateAcademicMutation()
      const onEditSubmit = async(info) => {
    
        try {
        const res = await updateAcademic({data:info, id})
          if(res.data.success === true) {
            toast.success(res.data.message)
          } else {
            toast.error(res?.error?.data?.message)
          }
        } catch (error) {
          toast.error("Something went wrong")
        }
      }
      
    
      const { data, isLoading, isError, error } = useGetDataByIdQuery(id);
      const [academic, setAcademic] = useState(null);
      
      useEffect(() => {
        if (isError) {
          console.log(error?.data?.message || "An error occurred");
        } else if (!isLoading && data) {
            setAcademic(data.data);
        }
      }, [data, isLoading, isError, error]);
      
    
    console.log("academic", academic)
    return (
        <div className="p-4 space-y-6  mx-auto">
             <div className="card">
                  <div className="flex items-center justify-between mb-4">
                    <div className="flex items-center gap-2 text-blue-600 font-semibold text-sm">
                      <FaInfoCircle className="w-5 h-5" />
                      Grade 12th or equivalent
                    </div>
                    <button
                      onClick={() => {
                        reset({
                        //   dob: profile?.dob || "",
                        //   gender: profile?.gender || "",
                        //   maritalStatus: profile?.maritalStatus || "",
                        });
                        setIsModalOpen(true)
                      }}
                      className="btn btn-outline btn-sm text-blue-600 bg-blue-100 p-2 rounded-sm"
                    >
                      Request Edit
                    </button>
                  </div>
            
                     {
                        academic? (
                            <div className="card-body p-8 shadow-md bg-base-100 rounded-md">
                            <div className="grid grid-cols-1 gap-4">
                              <h2 className="text-lg font-bold text-blue-700">{academic?.twelvethInstitution}</h2>
                                <h3 className="text-md font-semibold text-blue-600 mt-1">{academic?.twelvethInstitution}</h3>
                                <p className="text-gray-700">{academic?.twelvethLocation}</p>
                                <p className="text-gray-500 mt-2">
                                    Attended From <span className="font-medium">{academic?.twelvethStartDate}</span> to <span className="font-medium">{academic?.twelvethEndDate}</span>
                                </p>
                            </div>
                          </div>
                        ): <p>Loading...</p>
                     }
                   
                  
            
                  <Modal isOpen={isModalOpen} onClose={closeModal}>
                          <ModalHeader>Grade 12th or equivalent</ModalHeader>
                          <ModalBody>
                          <form onSubmit={handleSubmit(onEditSubmit)}>
                        <div className="mb-4">
                          <label className="block text-sm mb-1 text-gray-700">From</label>
                          <Input
                            type="date"
                            name="twelvethStartDate"
                            {...register('twelvethStartDate')}
                            className="input input-bordered w-full form-control shadow-md p-3"
                          />
                            {errors.twelvethStartDate && <p style={{ color: "red", marginTop: "5px" }}>{errors.twelvethStartDate.message}</p>}
            
                        </div>
                       
                        <div className="mb-4">
                          <label className="block text-sm mb-1 text-gray-700">To</label>
                          <Input
                            type="date"
                            name="twelvethEndDate"
                            {...register('twelvethEndDate')}
                            className="input input-bordered w-full form-control shadow-md p-3"
                          />
                            {errors.twelvethEndDate && <p style={{ color: "red", marginTop: "5px" }}>{errors.twelvethEndDate.message}</p>}
            
                        </div>
                       
                        <div className="mb-4">
                                <label className="block text-sm mb-1 text-gray-700">Institution</label>
                                <Input
                                name="twelvethInstitution"
                                  type="text"
                                  {...register("twelvethInstitution")}
                                  className="input input-bordered w-full form-control shadow-md p-3"
                                />
                                {errors.twelvethInstitution && (
                                  <p className="text-red-500 text-sm mt-1">{errors.twelvethInstitution.message}</p>
                                )}
                              </div>
                        <div className="mb-4">
                                <label className="block text-sm mb-1 text-gray-700">Location</label>
                                <Input
                                name="twelvethLocation"
                                  type="text"
                                  {...register("twelvethLocation")}
                                  className="input input-bordered w-full form-control shadow-md p-3"
                                />
                                {errors.twelvethLocation && (
                                  <p className="text-red-500 text-sm mt-1">{errors.twelvethLocation.message}</p>
                                )}
                              </div>
            
                        <div className="flex justify-end gap-2">
                          {/* <button
                            onClick={() => setShowModal(false)}
                            className="btn btn-outline"
                          >
                            Cancel
                          </button> */}
                          <Button type="submit"
                            onClick={handleSubmit}
                            className="btn btn-primary"
                          >
                            Save
                          </Button>
                        </div>
                        </form>
                          </ModalBody>
                        </Modal>
                </div>

                 <div className="card">
                      <div className="flex items-center justify-between mb-4">
                        <div className="flex items-center gap-2 text-blue-600 font-semibold text-sm">
                          <FaInfoCircle className="w-5 h-5" />
                          Grade 10th or equivalent
                        </div>
                        <button
                          onClick={() => {
                            reset({
                            //   dob: profile?.dob || "",
                            //   gender: profile?.gender || "",
                            //   maritalStatus: profile?.maritalStatus || "",
                            });
                            setIsModalOpen1(true)
                          }}
                          className="btn btn-outline btn-sm text-blue-600 bg-blue-100 p-2 rounded-sm"
                        >
                          Request Edit
                        </button>
                      </div>
                
                         {
                            academic ? (
                                <div className="card-body p-8 shadow-md bg-base-100 rounded-md">
                                <div className="card-body p-8 ">
                          <div className="grid grid-cols-1 gap-4">
                            <h2 className="text-lg font-bold text-blue-700">{academic?.tenthBoard}</h2>
                              <h3 className="text-md font-semibold text-blue-600 mt-1">{academic?.tenthInstitution}</h3>
                              <p className="text-gray-700">{academic?.tenthLocation}</p>
                              <p className="text-gray-500 mt-2">
                                  Attended From <span className="font-medium">{academic?.tenthStartDate}</span> to <span className="font-medium">{academic?.tenthEndDate}</span>
                              </p>
                          </div>
                        </div>
                            </div>
                            ) : <p>Loading...</p>
                         }
                       
                      
                
                      <Modal isOpen={isModalOpen1} onClose={closeModal1}>
                          <ModalHeader>Grade 12th or equivalent</ModalHeader>
                          <ModalBody>
                          <form onSubmit={handleSubmit(onEditSubmit)}>
                        <div className="mb-4">
                          <label className="block text-sm mb-1 text-gray-700">From</label>
                          <Input
                            type="date"
                            name="tenthStartDate"
                            {...register('tenthStartDate')}
                            className="input input-bordered w-full form-control shadow-md p-3"
                          />
                            {errors.tenthStartDate && <p style={{ color: "red", marginTop: "5px" }}>{errors.tenthStartDate.message}</p>}
            
                        </div>
                       
                        <div className="mb-4">
                          <label className="block text-sm mb-1 text-gray-700">To</label>
                          <Input
                            type="date"
                            name="tenthEndDate"
                            {...register('tenthEndDate')}
                            className="input input-bordered w-full form-control shadow-md p-3"
                          />
                            {errors.tenthEndDate && <p style={{ color: "red", marginTop: "5px" }}>{errors.tenthEndDate.message}</p>}
            
                        </div>
                       
                        <div className="mb-4">
                                <label className="block text-sm mb-1 text-gray-700">Institution</label>
                                <Input
                                name="tenthInstitution"
                                  type="text"
                                  {...register("tenthInstitution")}
                                  className="input input-bordered w-full form-control shadow-md p-3"
                                />
                                {errors.tenthInstitution && (
                                  <p className="text-red-500 text-sm mt-1">{errors.tenthInstitution.message}</p>
                                )}
                              </div>
                        <div className="mb-4">
                                <label className="block text-sm mb-1 text-gray-700">Location</label>
                                <Input
                                name="tenthLocation"
                                  type="text"
                                  {...register("tenthLocation")}
                                  className="input input-bordered w-full form-control shadow-md p-3"
                                />
                                {errors.tenthLocation && (
                                  <p className="text-red-500 text-sm mt-1">{errors.tenthLocation.message}</p>
                                )}
                              </div>
            
                        <div className="flex justify-end gap-2">
                          {/* <button
                            onClick={() => setShowModal(false)}
                            className="btn btn-outline"
                          >
                            Cancel
                          </button> */}
                          <Button type="submit"
                            onClick={handleSubmit}
                            className="btn btn-primary"
                          >
                            Save
                          </Button>
                        </div>
                        </form>
                          </ModalBody>
                        </Modal>
                    </div>
        </div>
    )
}


export default Academic;