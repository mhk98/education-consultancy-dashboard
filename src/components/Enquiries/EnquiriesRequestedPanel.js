import React, { useState, useEffect } from "react";
import { useGetAllEnquiriesQuery, useGetDataByIdQuery, useUpdateEnquiriesMutation } from "../../features/enquiries/enquiries";
import toast from "react-hot-toast";
import { Modal, ModalHeader, ModalBody, Button } from '@windmill/react-ui';
import { useForm } from "react-hook-form";
import { FiSend } from "react-icons/fi";
import axios from "axios";

const EnquiriesRequestedPanel = () => {
  const id = localStorage.getItem("userId")
  const role = localStorage.getItem("role")
  const branch = localStorage.getItem("branch")
  const [selected, setSelected] = useState(null);
  const { data, isLoading, isError, error } = useGetAllEnquiriesQuery();
  const [programList, setProgramList] = useState([]);

  // useEffect(() => {
  //   if (isError) {
  //     console.log("Error fetching", error);
  //   } else if (!isLoading && data) {
  //     setProgramList(data.data);
  //   }
  // }, [data, isLoading, isError, error]);


  useEffect(() => {
      if (isError) {
        console.log("Error fetching", error);
      } else if (!isLoading && data) {
        const filteredProgram = data.data.filter(
          (item) => item.status === "active"
        );
        setProgramList(filteredProgram);
      }
    }, [data, isLoading, isError, error]);


    
   const { data:data1, isLoading:isLoading1, isError:isError1, error:error1 } = useGetAllEnquiriesQuery();
   const [adminPrograms, setAdminPrograms] = useState([]);
 
   useEffect(() => {
     if (isError1) {
       console.log("Error fetching", error1);
     } else if (!isLoading1 && data1) {
       const allAdminPrograms = data1.data;

 // Filter out students
 const filtered = allAdminPrograms.filter(program => program.branch === branch);

 setAdminPrograms(filtered);
     }
   }, [data1, isLoading1, isError1, error1, branch]);

   console.log("adminPrograms", adminPrograms)



   
   const { data:data2, isLoading:isLoading2, isError:isError2, error:error2 } = useGetDataByIdQuery(id);
            const [programs, setPrograms] = useState([]);
          
            useEffect(() => {
              if (isError2) {
                console.log("Error fetching", error2);
              } else if (!isLoading2 && data2) {
                setPrograms(data2.data);
          
              }
            }, [data2, isLoading2, isError2, error2, branch]);
      
            console.log("adminPrograms", adminPrograms)



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
                          reset();
             setIsModalOpen(false)

                        } else {
                          toast.error(res.error?.data?.message || "Failed. Please try again.");
                        }
                      } catch (error) {
                        toast.error("An unexpected error occurred.");
                      }
                    };



  const [comments, setComments] = useState([]);
  const [newComment, setNewComment] = useState("");
  const [replyContent, setReplyContent] = useState({});

  useEffect(() => {
    if (!selected?.id) return;
    fetchComments();
  }, [selected]);

  const fetchComments = async () => {
    try {
      const res = await axios.get(
        `https://education-consultancy-backend.onrender.com/api/v1/comment/${selected.id}?type=kc`
      );
      setComments(res.data.data);
    } catch (err) {
      console.error("Failed to fetch comments:", err);
    }
  };

  const handleCommentSubmit = async () => {
    if (!newComment.trim()) return;
    try {
      await axios.post("https://education-consultancy-backend.onrender.com/api/v1/comment/create", {
        user_id:id,
        enquiry_id: selected.id,
        text: newComment,
        type: "kc",
        hidden: false,
      });
      setNewComment("");
      fetchComments();
      document.activeElement.blur();
    } catch (err) {
      console.error("Failed to post comment:", err);
    }
  };

  const handleReplySubmit = async (commentId) => {
    const replyText = replyContent[commentId];
    if (!replyText?.trim()) return;
    try {
      await axios.post("https://education-consultancy-backend.onrender.com/api/v1/reply/create", {
        user_id:id,
        comment_id: commentId,
        text: replyText,
      });
      setReplyContent((prev) => ({ ...prev, [commentId]: "" }));
      fetchComments();
    } catch (err) {
      console.error("Failed to post reply:", err);
    }
  };

  const formatDateTime = (dateTimeStr) => {
    const date = new Date(dateTimeStr);
    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, "0");
    const day = String(date.getDate()).padStart(2, "0");
    let hours = date.getHours();
    const minutes = String(date.getMinutes()).padStart(2, "0");
    let ampm = hours >= 12 ? "PM" : "AM";
    hours = hours % 12 || 12;
    return `${year}-${month}-${day} ${hours}:${minutes} ${ampm}`;
  };

  const renderCommentList = () => (
    <div className="space-y-4">
      {comments.length > 0 ? (
        comments.map((comment) => (
          <div key={comment.id} className="border p-3 rounded-md bg-gray-50">
            <p className="text-sm mb-1 font-medium">
              {comment.User?.FirstName} {comment.User?.LastName}:
            </p>
            <p className="text-sm mb-2">{comment.text}</p>
            <div className="ml-4 space-y-2">
              {comment.replies?.map((reply) => (
                <div
                  key={reply.id}
                  className="text-sm text-gray-700 bg-white p-2 rounded border"
                >
                  <span className="font-medium">
                    {reply.User?.FirstName} {reply.User?.LastName}:
                  </span>{" "}
                  {reply.text}
                </div>
              ))}
              <div className="flex gap-2 mt-2">
                <input
                  type="text"
                  value={replyContent[comment.id] || ""}
                  onChange={(e) =>
                    setReplyContent((prev) => ({
                      ...prev,
                      [comment.id]: e.target.value,
                    }))
                  }
                  placeholder="Write a reply..."
                  className="flex-1 border px-2 py-1 rounded text-sm"
                />
                <button
                  onClick={() => handleReplySubmit(comment.id)}
                  className="text-sm bg-brandRed text-white px-3 py-1 rounded hover:bg-brandRed-700"
                >
                  Reply
                </button>
              </div>
            </div>
          </div>
        ))
      ) : (        
        <p className="text-sm text-gray-500">No comments yet.</p>

      )}
    </div>
  );

    const [employees, setEmployees] = useState([]);
      
        useEffect(() => {
          const fetchUsers = async () => {
            try {
              const response = await axios.get("https://education-consultancy-backend.onrender.com/api/v1/user");
              const allUsers = response.data.data;
        
              // ফিল্টার লজিক
              const filtered = allUsers.filter(user => {
                const role = user.Role?.toLowerCase(); // রোল lowercase করে নিচ্ছি
                return role && role === "employee" &&  user.Branch === branch      
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
              const response = await axios.get("https://education-consultancy-backend.onrender.com/api/v1/user");
              const allUsers = response.data.data;
        
              // ফিল্টার লজিক
              const filtered = allUsers.filter(user => {
                const role = user.Role?.toLowerCase(); // রোল lowercase করে নিচ্ছি
                return role && role !== "student"   
              });
        
              setSuperAdminEmployees(filtered);
            } catch (err) {
              console.error("Error fetching users:", err);
            }
          };
        
          fetchUsers();
        }, [branch]);


  return (
    <div className="flex flex-col lg:flex-row p-4 gap-4 max-w-full overflow-x-hidden">
      {/* Left Panel */}
      
      {
        role === "superAdmin" ? (
          <div className="lg:w-1/2 w-full">
        {programList.map((item, index) => (
          <div
            key={index}
            onClick={() => setSelected(item)}
            className={`border rounded-md p-4 mb-3 cursor-pointer ${
              selected?.name === item.name ? "bg-green-50 border-brandRed" : "bg-white"
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
                                                                       <ModalHeader className="mb-8">Edit User Information</ModalHeader>
                                                                       <ModalBody>
                                                                       <form onSubmit={handleSubmit(onFormEdit)}>
                                                           <div className="grid grid-cols-1 gap-4">
                                                             {/* Left Side */}
                                                       
{/*                                                                
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
                                                               </div> */}

<div className="mb-4">
                    <label className="block text-sm mb-1 text-gray-700 mb-4">Assignee</label>
                    <select
                      {...register("assignedTo")}
                      className="input input-bordered w-full shadow-md p-3"
                    >
                      <option value="">Select Assignee</option>
                      {
                        
                        superAdminEmployees.map((employee) => (
                        <option
                          key={employee.id}
                          value={`${employee.FirstName} ${employee.LastName}`}
                        >
                          {employee.FirstName} {employee.LastName}
                        </option>
                      ))
                      
                      }
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
                                                                   </select>
                                                                   {errors.status && (
                                                                     <p className="text-red-500 text-sm mt-1">{errors.status.message}</p>
                                                                   )}
                                                               </div>
                                                              
                                                           </div>
                                                         
                                                           <div className="flex justify-end gap-2 mt-6">
                                                             <Button type="submit" className="btn btn-brandRed">
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
        ) : role === "admin" ? (
<div className="lg:w-1/2 w-full">
        {adminPrograms.map((item, index) => (
          <div
            key={index}
            onClick={() => setSelected(item)}
            className={`border rounded-md p-4 mb-3 cursor-pointer ${
              selected?.name === item.name ? "bg-green-50 border-brandRed" : "bg-white"
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
                                                                       <ModalHeader className="mb-8">Edit User Information</ModalHeader>
                                                                       <ModalBody>
                                                                       <form onSubmit={handleSubmit(onFormEdit)}>
                                                           <div className="grid grid-cols-1 gap-4">
                                                             {/* Left Side */}
                                                       
                                                               
                                                             
<div className="mb-4">
                    <label className="block text-sm mb-1 text-gray-700 mb-4">Assignee</label>
                    <select
                      {...register("assignedTo")}
                      className="input input-bordered w-full shadow-md p-3"
                    >
                      <option value="">Select Assignee</option>
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
                                                                   </select>
                                                                   {errors.status && (
                                                                     <p className="text-red-500 text-sm mt-1">{errors.status.message}</p>
                                                                   )}
                                                               </div>
                                                              
                                                           </div>
                                                         
                                                           <div className="flex justify-end gap-2 mt-6">
                                                             <Button type="submit" className="btn btn-brandRed">
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
          
        ) : (
          <div className="lg:w-1/2 w-full">
        {programs.map((item, index) => (
          <div
            key={index}
            onClick={() => setSelected(item)}
            className={`border rounded-md p-4 mb-3 cursor-pointer ${
              selected?.name === item.name ? "bg-green-50 border-brandRed" : "bg-white"
            }`}
          >
            <div className="flex justify-between items-center flex-wrap gap-2">
              <p className="bg-green-200 text-green-800 text-xs px-3 py-1 rounded font-semibold">
                Program Options Sent
              </p>
              {/* <p onClick={() => {
                              setIsModalOpen(true);
                              setEnquiryId(item.id);
                            }} className="bg-green-200 text-green-800 text-xs px-3 py-1 rounded font-semibold cursor-pointer">
                Edit
              </p> */}

    <Modal isOpen={isModalOpen} onClose={closeModal}>
                                                                       <ModalHeader className="mb-8">Edit User Information</ModalHeader>
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
                                                                   </select>
                                                                   {errors.status && (
                                                                     <p className="text-red-500 text-sm mt-1">{errors.status.message}</p>
                                                                   )}
                                                               </div>
                                                              
                                                           </div>
                                                         
                                                           <div className="flex justify-end gap-2 mt-6">
                                                             <Button type="submit" className="btn btn-brandRed">
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
        )
      }

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
              <span className="text-brandRed font-medium">
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
                    className="text-brandRed border border-brandRed px-3 py-1 text-sm rounded"
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

   {/* KC Team Comments Only */}
   
   <div className="flex items-center gap-2 mt-4">
                <input
                  type="text"
                  value={newComment}
                  onChange={(e) => setNewComment(e.target.value)}
                  onKeyDown={(e) =>
                    e.key === "Enter" && handleCommentSubmit()
                  }
                  placeholder="Write comments..."
                  className="flex-1 border border-gray-300 rounded px-3 py-2 text-sm"
                />
                <button
                  className="bg-brandRed text-white p-2 rounded hover:bg-brandRed-700"
                  onClick={handleCommentSubmit}
                >
                  <FiSend size={20} />
                </button>
              </div>
              {renderCommentList()}
          </div>
        </div>
      )}
    </div>
  );
};

export default EnquiriesRequestedPanel;
