import React, { useState, useEffect } from "react";
import { useGetAllEnquiriesQuery, useUpdateEnquiriesMutation } from "../../features/enquiries/enquiries";
import toast from "react-hot-toast";
import { Modal, ModalHeader, ModalBody, Button } from '@windmill/react-ui';
import { useForm } from "react-hook-form";

const EnquiriesArchivedPanel = () => {
  const [selected, setSelected] = useState(null);
  const { data, isLoading, isError, error } = useGetAllEnquiriesQuery();
  const [programList, setProgramList] = useState([]);

  useEffect(() => {
    if (isError) {
      console.log("Error fetching", error);
    } else if (!isLoading && data) {
      setProgramList(data.data);
    }
  }, [data, isLoading, isError, error]);


  useEffect(() => {
      if (isError) {
        console.log("Error fetching", error);
      } else if (!isLoading && data) {
        const filteredProgram = data.data.filter(
          (item) => item.status === "archive"
        );
        setProgramList(filteredProgram);
      }
    }, [data, isLoading, isError, error]);

  const formatDate = (dateString) => {
    const date = new Date(dateString);
    return date.toLocaleDateString("en-GB", {
      day: "2-digit",
      month: "long",
      year: "numeric",
    });
  };

  const fileBaseURL = 'https://education-consultancy-backend.onrender.com/'; // Adjust to your server's URL

 const {
      register,
      formState: { errors },
      handleSubmit,
      reset,
    } = useForm()

   const [enquiryId, setEnquiryId] = useState("")
            const [isModalOpen, setIsModalOpen] = useState(false)
        
            function closeModal() {
             setIsModalOpen(false)
           }


            const [updateEnquiries] = useUpdateEnquiriesMutation()
                  
                      const onFormEdit = async (data) => {
           
                        console.log("info", data)
                        console.log("enquiryId", enquiryId)
           
                      try {
                        const res = await updateEnquiries({id:enquiryId, data});
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
    <div className="flex flex-col lg:flex-row p-4 gap-4 max-w-full overflow-x-hidden">
      {/* Left Panel */}
      <div className="lg:w-1/2 w-full">
        {programList.map((item, index) => (
          <div
            key={index}
            onClick={() => setSelected(item)}
            className={`border rounded-md p-4 mb-3 cursor-pointer ${
              selected?.name === item.name ? "bg-green-50 border-blue-500" : "bg-white"
            }`}
          >
            <div className="flex justify-between items-center flex-wrap gap-2">
              <p className="bg-green-200 text-green-800 text-xs px-3 py-1 rounded font-semibold">
                Program Options Sent
              </p>
              <p onClick={() => {
                              setIsModalOpen(true);
                              setEnquiryId(item.id);
                            }} className="bg-green-200 text-green-800 text-xs px-3 py-1 rounded font-semibold cursor-pointer">
                Edit
              </p>

    <Modal isOpen={isModalOpen} onClose={closeModal}>
                                                                       <ModalHeader className="mb-8">Edit Enquiries Information</ModalHeader>
                                                                       <ModalBody>
                                                                       <form onSubmit={handleSubmit(onFormEdit)}>
                                                           <div className="grid grid-cols-1 gap-4">
                                                             {/* Left Side */}
                                                       
                                                               
                                                               <div className="mb-4">
                                                                 <label className="block text-sm mb-1 text-gray-700 mb-4">Assign To</label>
                                                                 <select
                                                                     {...register("assignedTo")}
                                                                     className="input input-bordered w-full shadow-md p-3"
                                                                   >
                                                                     <option value="">Select Assignee</option>
                                                                     <option value="A">A</option>
                                                                     <option value="B">B</option>        
                                                                     <option value="C">C</option>        
                                                                   </select>
                                                                   {errors.assignedTo && (
                                                                     <p className="text-red-500 text-sm mt-1">{errors.assignedTo.message}</p>
                                                                   )}
                                                               </div>
                                                               <div className="mb-4">
                                                                 <label className="block text-sm mb-1 text-gray-700 mb-4">Status</label>
                                                                 <select
                                                                     {...register("status")}
                                                                     className="input input-bordered w-full shadow-md p-3"
                                                                   >
                                                                     <option value="">Select Status</option>
                                                                     <option value="active">Active</option>
                                                                     <option value="archive">Archive</option>        
                                                                     <option value="C">C</option>        
                                                                   </select>
                                                                   {errors.status && (
                                                                     <p className="text-red-500 text-sm mt-1">{errors.status.message}</p>
                                                                   )}
                                                               </div>
                                                              
                                                           </div>
                                                         
                                                           <div className="flex justify-end gap-2 mt-6">
                                                             <Button type="submit" className="btn btn-primary">
                                                               Save
                                                             </Button>
                                                           </div>
                                                         </form>
                                                         
                                                                       </ModalBody>
                                                                     </Modal>             
            </div>
            <h3 className="text-sm font-bold mt-2">{item.firstName} {item.lastName}</h3>
            <p className="text-sm mt-1 text-gray-700">
              Preferred Destination:{" "}
              <span className="inline-flex items-center gap-1">
                {item.destination}
              </span>
            </p>
            <p className="text-sm mt-1">
              <span className="font-semibold">Created On:</span> {formatDate(item.createdAt)}
            </p>
          </div>
        ))}
      </div>

      {/* Right Panel */}
      {selected && (
        <div className="lg:w-1/2 w-full bg-white p-4 rounded-md shadow-sm">
          <div className="flex justify-between items-start flex-wrap gap-2 mb-4">
            <h3 className="font-bold text-lg max-w-sm leading-tight">
              {selected.firstName} {selected.lastName}
            </h3>
            <div className="flex flex-col items-end">
              <span className="bg-green-200 text-green-800 text-xs px-3 py-1 rounded font-semibold mb-1">
                Program Options Sent
              </span>
              <p className="text-xs text-gray-500">
                Created On: {formatDate(selected.createdAt)}
              </p>
            </div>
          </div>

          <div className="flex flex-col gap-x-8 text-sm">
            <p>
              <span className="font-semibold">Assigned To:</span>{" "}
              <span className="text-blue-600 font-medium">
                {selected.assignedTo}
              </span>{" "}
              {/* — {selected.contact} */}
            </p>
            <p className="mt-4">
              <span className="font-semibold">Country Of Education:</span>
              {selected.educationCountry}
            </p>
            <p className="mt-4">
              <span className="font-semibold">Highest Education Level:</span>{" "}
              {selected.educationLevel}
            </p>
            <p className="mt-4">
              <span className="font-semibold">Preferred Destination:</span>{" "}
              <span className="inline-flex items-center gap-1">
                {selected.flag} {selected.destination}
              </span>
            </p>
            <p className="mt-4">
              <span className="font-semibold">Preferred Study Level:</span>{" "}
              {selected.studyLevel}
            </p>
            <p className="mt-4">
              <span className="font-semibold">Preferred Study Area:</span>{" "}
              {selected.studyArea}
            </p>
            <p className="md:col-span-2 mt-4">
              <span className="font-semibold">Additional Information:</span>{" "}
              {selected.additionalInfo}
            </p>

            {/* PDF Documents Section */}
            {selected.files && selected.files.length > 0 && (
              <div className="flex flex-col gap-3 mt-4">
                <p className="font-semibold">Documents:</p>
                {selected.files.map((file, index) => (
                  <button
                    key={index}
                    className="text-blue-600 border border-blue-600 px-3 py-1 text-sm rounded"
                  >
                    <a
                      href={`${fileBaseURL}${file.path.replace(/\\/g, '/')}`}
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                     {file.originalName}
                    </a>
                  </button>
                ))}
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
};

export default EnquiriesArchivedPanel;
