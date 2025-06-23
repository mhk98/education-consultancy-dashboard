// import React, {  useEffect, useState } from 'react';
// import Amount from '../components/Wallet/Amount';
// import CashIn from '../components/Wallet/CashIn';
// import CashOut from '../components/Wallet/CashOut';
// import SuperAdminStatement from '../components/Wallet/SuperAdminStatement';
// import { Modal, ModalHeader, ModalBody, Input, Button } from '@windmill/react-ui';
// import { useForm } from 'react-hook-form';
// import { useDeleteConsultationMutation, useGetAllConsultationQuery, useUpdateConsultationMutation } from '../features/consultation/consultation';
// import toast from 'react-hot-toast';
// import { LiaEditSolid } from 'react-icons/lia';
// import { FaTrash } from 'react-icons/fa';
// import { Link } from 'react-router-dom/cjs/react-router-dom';


// function Leads() {
//   const id = localStorage.getItem("userId");
//   const role = localStorage.getItem("role");
//   const branch = localStorage.getItem("branch");

//   const [consultationId, setConsultationId] = useState('')

//     const [isModalOpen, setIsModalOpen] = useState(false);
          
//               function closeModal() {
//                setIsModalOpen(false)
//              }
  
           
  
//      const {
//         register,
//         handleSubmit,
//         reset,
//         formState: { errors },
//       } = useForm();
 

//        const onFormSubmit = async (data) => {
//           const formData = new FormData();
//           formData.append('id', data.assignedTo);

//           formData.append('task', data.task);
//           formData.append('branch', branch);
//           formData.append('dueDate', data.dueDate);
//           formData.append('description', data.description);
//           formData.append('comment', data.comment);
//         //   if (file) formData.append('file', file);
      
//           try {
//             // const res = await createTask(formData);
//             // if (res.data?.success) {
//             //   toast.success(res.data.message);
//             //   reset();
//             //   setIsModalOpen(false);
//             // } else {
//             //   toast.error(res.error?.data?.message || 'Failed. Please try again.');
//             // }
//           } catch {
//             // toast.error('An unexpected error occurred.');
//           }
//         };



//         const {data, isLoading, isError, error} = useGetAllConsultationQuery()

//         const [consultations, setConsultations] = useState([])

//         useEffect(() => {
//           if(isError){
//             console.log("Error fetching", error)
//           } else if (!isLoading && data?.data){
//             setConsultations(data.data)
//           }
//         }, [data, isLoading, isError, error])


//         console.log("consultations", consultations)

//         const [updateConsultation] = useUpdateConsultationMutation()

//         const onFormEdit = async (data) => {
//             try {
//               const res = await updateConsultation({ id: consultationId, data });
//               if (res.data?.success) {
//                 toast.success(res.data.message);
//                 reset();
//                 setIsModalOpen(false);
//               } else {
//                 toast.error(res.error?.data?.message || 'Failed. Please try again.');
//               }
//             } catch {
//               toast.error('An unexpected error occurred.');
//             }
//           };


//         const [deleteConsultation] = useDeleteConsultationMutation()


//            const handleDeleteUser = async (id) => {
//               try {
//                 const res = await deleteConsultation(id);
//                 if (res.data?.success) {
//                   toast.success(res.data.message);
//                 } else {
//                   toast.error(res.error?.data?.message || 'Failed. Please try again.');
//                 }
//               } catch {
//                 toast.error('An unexpected error occurred.');
//               }
//             };


//         const handleEnter = (e) => {
//     if (e.key === 'Enter') {
//       e.preventDefault();
//       const form = e.target.form;
//       const index = Array.prototype.indexOf.call(form, e.target);
//       form.elements[index + 1]?.focus();
//     }
//   };

//   return (
//     <>
//      <div className='w-full px-4 py-6 bg-gray-50'>
//        {/* Wallet Header */}
//       <div className="max-w-7xl mx-auto flex flex-col lg:flex-row lg:items-center lg:justify-between gap-4">
//         <div>
//           <h4 className="text-2xl md:text-md font-semibold text-gray-900">Lead Management</h4>
//         </div>
//         <div className="flex flex-col sm:flex-row gap-3">
//           <button
//             onClick={() => setIsModalOpen(true)}
//             className="px-4 py-2 bg-brandRed text-white rounded-md text-sm md:text-base"
//           >
//             + Add Lead
//           </button>
//         </div>
//       </div>


// <Modal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)}>
//         <ModalHeader>Lead Management</ModalHeader>
//         <ModalBody>
//                                     <form onSubmit={handleSubmit(onFormSubmit)}>
//                         <div className="grid grid-cols-1 gap-4">
//                           {/* Left Side */}
                    
//            <div>
//           <label htmlFor="startDate" className="block mb-1 font-medium">Due Date</label>
//           <input
//             type="date"
//             id="dueDate"
//             name="dueDate"
//             {...register("dueDate")}
//             className="w-full border rounded p-2"
//           />
//         </div>
//                             <div className="mb-4">
//                               <label className="block text-sm mb-1 text-gray-700">Task</label>
//                               <Input
//                                 type="text"
//                                 {...register("task")}
//                                 onKeyDown={handleEnter}
//                                 className="input input-bordered w-full form-control shadow-md p-3"
//                               />
//                               {errors.task && (
//                                 <p className="text-red-500 text-sm mt-1">{errors.task.message}</p>
//                               )}
//                             </div>
//                             <div className="mb-4">
//                               <label className="block text-sm mb-1 text-gray-700">Description</label>
//                               <Input
//                                 type="text"
//                                 {...register("description")}
//                                 onKeyDown={handleEnter}
//                                 className="input input-bordered w-full form-control shadow-md p-3"
//                               />
//                               {errors.description && (
//                                 <p className="text-red-500 text-sm mt-1">{errors.description.message}</p>
//                               )}
//                             </div>
//                             <div className="mb-4">
//                               <label className="block text-sm mb-1 text-gray-700">Comment</label>
//                               <Input
//                                 type="text"
//                                 {...register("comment")}
//                                 onKeyDown={handleEnter}
//                                 className="input input-bordered w-full form-control shadow-md p-3"
//                               />
//                               {errors.comment && (
//                                 <p className="text-red-500 text-sm mt-1">{errors.comment.message}</p>
//                               )}
//                             </div>

//                               <div className="mb-4">
//                     <label className="block text-sm text-gray-700 mb-2">
//                       Branch
//                     </label>
//                     <select
//                       {...register("branch")}
//                       onKeyDown={handleEnter}
//                       className="input input-bordered w-full shadow-md p-3"
//                     >
//                       <option value="">Select Branch</option>
//                         <option value="Edu Anchor">Edu Anchor</option>
//             <option value="Dhaka">Dhaka</option>
//             <option value="Khulna">Khulna</option>
//             <option value="Barishal">Barishal</option>
//             <option value="Satkhira">Satkhira</option>
//             <option value="Tangail">Tangail</option>
//             <option value="Jashore">Jashore</option>
//             <option value="Rangpur">Rangpur</option>
//             <option value="Dinajpur">Dinajpur</option>
//             <option value="Gopalganj">Gopalganj</option>
//             <option value="Savar">Savar</option>
//             <option value="Feni">Feni</option>
//                     </select>
//                     {errors.branch && (
//                       <p className="text-red-500 text-sm mt-1">{errors.branch.message}</p>
//                     )}
//                   </div>
                           
                     
//                         </div>
                      
//                         <div className="flex justify-end gap-2 mt-6">
//                           <Button type="submit" className="btn" style={{backgroundColor:"#C71320"}}>
//                             Save
//                           </Button>
//                         </div>
//                       </form>
                      
//                                     </ModalBody>
//       </Modal>


//       {/* Leads Table */}
//       <div className="p-4 md:p-8 w-full mx-auto">
//         <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 items-center">
//           {/* Edu Anchor Dropdown */}
//           <div>
//             <select
//               // onChange={(e) => setActiveTab(e.target.value)}
//               className="bg-gray-200 text-gray-700 rounded-md py-2 px-3 w-full text-center text-lg cursor-pointer"
//             >
//               <option value="allLeads">All Leads</option>
//               <option value="metaLeads">Meta Leads / Website Leads</option>
//               <option value="officeVisits">Office Visits</option>
//               <option value="todayCallList">Today Call List</option>
//             </select>
//           </div>
//         </div>

//       <div className="w-full overflow-x-auto py-6">
//               <table className="w-full text-sm text-left text-gray-700 bg-white shadow-md rounded-lg">
//                 <thead className="bg-gray-100 border-b border-gray-200">
//                   <tr>
//                     <th className="p-3 min-w-[180px]">Name</th>
//                     <th className="p-3 min-w-[180px]">Email</th>
//                     <th className="p-3 min-w-[180px]">B-Date</th>
//                     <th className="p-3 min-w-[180px]">Destination</th>
//                     <th className="p-3 min-w-[120px]">Address</th>
//                     <th className="p-3 min-w-[160px]">Phone</th>
//                     <th className="p-3 min-w-[160px]">IELTS</th>
//                     <th className="p-3 min-w-[160px]">Score</th>
//                     {/* <th className="p-3 min-w-[160px]">App Code</th> */}
//                     <th className="p-3 min-w-[160px]">SSC GPA/CGPA</th>
//                     <th className="p-3 min-w-[160px]">HSC GPA/CGPA</th>
//                     <th className="p-3 min-w-[160px]">Bachelor GPA/CGPA</th>
//                     <th className="p-3 min-w-[160px]">Branch</th>
//                     <th className="p-3 min-w-[160px]">Action</th>
                    
//                     {/* <th className="p-3 min-w-[160px]">Action</th> */}
                    
//                   </tr>
//                 </thead>
//               {
                
//                   <tbody>
//                   {consultations.map((consultation, idx) => (
//                     <tr
//                       key={idx}
//                       className={`border-b border-gray-200 ${
//                         idx % 2 === 0 ? "bg-gray-50" : "bg-white"
//                       }`}
//                     >
//                       <td className="p-3 whitespace-nowrap">{consultation.fullName ?? ''}</td>
//                       <td className="p-3 whitespace-nowrap">{consultation.email ?? ''}</td>
//                       <td className="p-3 whitespace-nowrap">{consultation.date ?? ''}</td>
//                       <td className="p-3 whitespace-nowrap">{consultation.destination ?? ''}</td>
//                       <td className="p-3 whitespace-nowrap">{consultation.address ?? ''}</td>
//                       <td className="p-3 whitespace-nowrap">{consultation.phone ?? ''}</td>
//                       <td className="p-3 whitespace-nowrap">{consultation.ielts ?? ''}</td>
//                       <td className="p-3 whitespace-nowrap">{consultation.ieltsScore ?? ''}</td>
//                       {/* <td className="p-3 whitespace-nowrap">{consultation.applicationCode ?? ''}</td> */}
//                       <td className="p-3 whitespace-nowrap">{consultation.sscCGPA ?? ''}</td>
//                       <td className="p-3 whitespace-nowrap">{consultation.hscCGPA ?? ''}</td>
//                       <td className="p-3 whitespace-nowrap">{consultation.bachelorCGPA ?? ''}</td>
//                       <td className="p-3 whitespace-nowrap">{consultation.location ?? ''}</td>
                    

//                       <td className="p-3 flex gap-2">
//                                         <Link to = {`/editLeads/${consultation.id}`}>
//                                         <LiaEditSolid
//                                           className="cursor-pointer" />
//                                         </Link>
//                                         <FaTrash className="cursor-pointer text-red-500" onClick={() => handleDeleteUser(consultation.id)} />
//                                       </td>
      
                
//                       {/* Modal should be outside the condition so it's mounted even when hidden */}
//                       <Modal isOpen={isModalOpen} onClose={closeModal}>
//                         <ModalHeader className="mb-8">Edit Statement Information</ModalHeader>
//                         <ModalBody>
//                           <form onSubmit={handleSubmit(onFormEdit)}>
//                             <div className="grid grid-cols-1 gap-4">
//                               <div className="mb-4">
//                                 <label className="block text-sm mb-1 text-gray-700">Amount</label>
//                                 <Input
//                                   type="number"
//                                   {...register("amount")}
//                                   className="w-full p-3 shadow-md border rounded-md"
//                                 />
//                                 {errors.amount && (
//                                   <p className="text-red-500 text-sm mt-1">
//                                     {errors.amount.message}
//                                   </p>
//                                 )}
//                               </div>
                
//                               <div className="mb-4">
//                                 <label className="block text-sm mb-1 text-gray-700">
//                                   Purpose for Cash-In
//                                 </label>
//                                 <Input
//                                   type="text"
//                                   {...register("purpose")}
//                                   className="w-full p-3 shadow-md border rounded-md"
//                                 />
//                                 {errors.purpose && (
//                                   <p className="text-red-500 text-sm mt-1">
//                                     {errors.purpose.message}
//                                   </p>
//                                 )}
//                               </div>
                
//                               <div className="mb-4">
//                                 <label className="block text-sm mb-1 text-gray-700">Comment</label>
//                                 <Input
//                                   type="text"
//                                   {...register("comment")}
//                                   className="w-full p-3 shadow-md border rounded-md"
//                                 />
//                                 {errors.comment && (
//                                   <p className="text-red-500 text-sm mt-1">
//                                     {errors.comment.message}
//                                   </p>
//                                 )}
//                               </div>
                
//                               <div className="mb-4">
//                                 <label className="block text-sm mb-1 text-gray-700 mb-4">
//                                   Status
//                                 </label>
//                                 <select
//                                   {...register("status")}
//                                   className="input input-bordered w-full shadow-md p-3"
//                                 >
//                                   <option value="">Select Status</option>
//                                   <option value="PAID">PAID</option>
//                                   <option value="PENDING">PENDING</option>
//                                 </select>
//                                 {errors.status && (
//                                   <p className="text-red-500 text-sm mt-1">
//                                     {errors.status.message}
//                                   </p>
//                                 )}
//                               </div>
//                             </div>
                
//                             <div className="flex justify-end gap-2 mt-6">
//                               <Button type="submit" className="btn" style={{backgroundColor:"#C71320"}}>
//                                 Save
//                               </Button>
//                             </div>
//                           </form>
//                         </ModalBody>
//                       </Modal>
//                     </tr>
//                   ))}
//                 </tbody>
               
//               }
      
//               </table>
//             </div>
//       </div>
//      </div>
//     </>
//   );
// }

// export default Leads;




import React, { useEffect, useState } from 'react';
import { Modal, ModalHeader, ModalBody, Input, Button } from '@windmill/react-ui';
import { useForm } from 'react-hook-form';
import { useDeleteConsultationMutation, useGetAllConsultationQuery, useUpdateConsultationMutation } from '../features/consultation/consultation';
import toast from 'react-hot-toast';
import { LiaEditSolid } from 'react-icons/lia';
import { FaTrash } from 'react-icons/fa';
import { Link } from 'react-router-dom';

function Leads() {
  const id = localStorage.getItem("userId");
  const role = localStorage.getItem("role");
  const branch = localStorage.getItem("branch");

  const [consultationId, setConsultationId] = useState('');
  const [isModalOpen, setIsModalOpen] = useState(false);

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

  const onFormSubmit = async (data) => {
    const formData = new FormData();
    formData.append('id', data.assignedTo);
    formData.append('task', data.task);
    formData.append('branch', branch);
    formData.append('dueDate', data.dueDate);
    formData.append('description', data.description);
    formData.append('comment', data.comment);
  };

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
        <ModalBody className="w-full max-w-screen-sm">
          <form onSubmit={handleSubmit(onFormSubmit)} className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div className="col-span-1 sm:col-span-2">
              <label htmlFor="dueDate" className="block text-sm mb-1 font-medium text-gray-700">Due Date</label>
              <input
                type="date"
                id="dueDate"
                {...register("dueDate")}
                className="w-full border rounded p-2"
              />
            </div>
            <div>
              <label className="block text-sm mb-1 text-gray-700">Task</label>
              <Input type="text" {...register("task")} onKeyDown={handleEnter} />
              {errors.task && <p className="text-red-500 text-sm">{errors.task.message}</p>}
            </div>
            <div>
              <label className="block text-sm mb-1 text-gray-700">Description</label>
              <Input type="text" {...register("description")} onKeyDown={handleEnter} />
              {errors.description && <p className="text-red-500 text-sm">{errors.description.message}</p>}
            </div>
            <div>
              <label className="block text-sm mb-1 text-gray-700">Comment</label>
              <Input type="text" {...register("comment")} onKeyDown={handleEnter} />
              {errors.comment && <p className="text-red-500 text-sm">{errors.comment.message}</p>}
            </div>
            <div>
              <label className="block text-sm mb-1 text-gray-700">Branch</label>
              <select {...register("branch")} className="w-full border rounded p-2">
                <option value="">Select Branch</option>
                {["Edu Anchor", "Dhaka", "Khulna", "Barishal", "Satkhira", "Tangail", "Jashore", "Rangpur", "Dinajpur", "Gopalganj", "Savar", "Feni"].map(branch => (
                  <option key={branch} value={branch}>{branch}</option>
                ))}
              </select>
              {errors.branch && <p className="text-red-500 text-sm">{errors.branch.message}</p>}
            </div>
            <div className="col-span-1 sm:col-span-2 flex justify-end mt-4">
              <Button type="submit" style={{ backgroundColor: "#C71320" }}>
                Save
              </Button>
            </div>
          </form>
        </ModalBody>
      </Modal>

      {/* Filters */}
      <div className="my-6">
        <select className="w-full sm:w-[300px] bg-gray-200 text-gray-700 rounded-md py-2 px-3 text-sm sm:text-base">
          <option value="allLeads">All Leads</option>
          <option value="metaLeads">Meta Leads / Website Leads</option>
          <option value="officeVisits">Office Visits</option>
          <option value="todayCallList">Today Call List</option>
        </select>
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
                  <Link to={`/app/editLeads/${consultation.id}`}>
                    <LiaEditSolid className="text-lg cursor-pointer" />
                  </Link>
                  <FaTrash className="text-red-500 text-sm cursor-pointer" onClick={() => handleDeleteUser(consultation.id)} />
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default Leads;
