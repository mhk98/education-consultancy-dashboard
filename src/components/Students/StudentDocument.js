// import React, { useEffect, useState } from "react";
// import { FaCheckCircle, FaTrashAlt } from "react-icons/fa";
// import { MdOutlineGrading } from "react-icons/md";
// import { useGetDataByIdQuery, useUpdateDocumentMutation } from "../../features/document/document";
// import toast from "react-hot-toast";
// import { useForm } from "react-hook-form";
// import { Modal, ModalHeader, ModalBody, Button } from '@windmill/react-ui';
// import axios from "axios";

// const BASE_URL = "https://education-consultancy-backend.onrender.com/";

// const StudentDocument = ({ id }) => {
//   const { register, handleSubmit, reset } = useForm();
//   const [updateDocument] = useUpdateDocumentMutation();
//   const { data, isLoading, isError, error } = useGetDataByIdQuery(id);
//   const [document, setDocument] = useState(null);
//   const [isModalOpen, setIsModalOpen] = useState(false);
//   const [file, setFile] = useState({});
//   const [additionalDocs, setAdditionalDocs] = useState([]);
//   const [newDoc, setNewDoc] = useState({ title: "", file: null });

//   // Fetch mandatory document
//   useEffect(() => {
//     if (isError) {
//       console.log(error?.data?.message || "An error occurred");
//     } else if (!isLoading && data) {
//       setDocument(data.data);
//     }
//   }, [data, isLoading, isError, error]);

//   // Fetch additional documents once on mount
//   useEffect(() => {
//     fetchAdditionalDocuments();
//   }, []);

//   const fetchAdditionalDocuments = async () => {
//     try {
//       const res = await axios.get(`${BASE_URL}api/v1/additionalDocument/${id}`);
//       const docs = res?.data?.data;

//       if (Array.isArray(docs)) {
//         setAdditionalDocs(docs);
//       } else {
//         setAdditionalDocs([]);
//       }
//     } catch (err) {
//       console.error("Failed to fetch additional documents", err);
//       setAdditionalDocs([]);
//     }
//   };

//   const openPdf = (filePath) => {
//     if (!filePath) return;
//     const finalUrl = BASE_URL + filePath.replace(/\\/g, "/");
//     window.open(finalUrl, "_blank");
//   };

//   const handleFileChange = (e, fieldName) => {
//     setFile((prev) => ({ ...prev, [fieldName]: e.target.files[0] }));
//   };

//   const onEditSubmit = async () => {
//     const formData = new FormData();
//     Object.entries(file).forEach(([key, value]) => {
//       formData.append(key, value);
//     });

//     try {
//       const res = await updateDocument({ data: formData, id });
//       if (res.data.data === true) {
//         toast.success(res.data.message);
//         setIsModalOpen(false);
//       } else {
//         toast.error(res?.error?.data?.message);
//       }
//     } catch {
//       toast.error("Something went wrong");
//     }
//   };

//   const handleAdditionalUpload = async (e) => {
//     e.preventDefault();
//     const formData = new FormData();
//     formData.append("title", newDoc.title);
//     formData.append("file", newDoc.file);
//     formData.append("user_id", id);

//     // Debug log
//     for (let [key, value] of formData.entries()) {
//       console.log(`${key}:`, value);
//     }

//     try {
//       const res = await axios.post(
//         `${BASE_URL}api/v1/additionalDocument/create`,
//         formData,
//         {
//           headers: { "Content-Type": "multipart/form-data" },
//         }
//       );
//       toast.success("Document uploaded");
//       setNewDoc({ title: "", file: null });
//       fetchAdditionalDocuments();
//     } catch (err) {
//       toast.error("Upload failed");
//     }
//   };

//   const handleDeleteDoc = async (docId) => {
//     try {
//       await axios.delete(`${BASE_URL}api/v1/additionalDocument/${docId}`);
//       toast.success("Document deleted");
//       fetchAdditionalDocuments();
//     } catch {
//       toast.error("Failed to delete");
//     }
//   };

//   return (
//     <div className="border rounded-2xl p-4 mb-6 shadow-sm bg-white">
//       {/* === Mandatory Documents === */}
//       <div className="flex items-center justify-between mb-4">
//         <div className="flex items-center gap-2 text-blue-600 font-semibold text-sm">
//           <MdOutlineGrading className="w-5 h-5" />
//           Mandatory Documents
//         </div>
//         <button
//           onClick={() => {
//             reset();
//             setIsModalOpen(true);
//           }}
//           className="btn btn-outline btn-sm text-blue-600 bg-blue-100 p-2 rounded-sm"
//         >
//           Request Edit
//         </button>
//       </div>

//       {document && (
//         <>
//           <DocumentSection
//             title="Std. 10th Marksheet & Certificate"
//             institution="Wekerle Business School"
//             files={[
//               { name: "10th Marksheet", path: document.tenthMarksheet },
//               { name: "10th Certificate", path: document.tenthCertificate },
//             ]}
//             openPdf={openPdf}
//           />
//           <DocumentSection
//             title="Std. 12th Marksheet & Certificate"
//             institution="Wekerle Business School"
//             files={[
//               { name: "12th Marksheet", path: document.twelveMarksheet },
//               { name: "12th Certificate", path: document.twelveCertificate },
//             ]}
//             openPdf={openPdf}
//           />
//           <DocumentSection
//             title="Passport, Essay & Instruction Letter"
//             institution="Wekerle Business School"
//             files={[
//               { name: "Passport", path: document.passport },
//               { name: "Essay", path: document.essay },
//               { name: "Instruction Letter", path: document.instructionLetter },
//             ]}
//             openPdf={openPdf}
//           />
//         </>
//       )}

//       {/* === Modal for Mandatory Documents Edit === */}
//       <Modal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)}>
//         <ModalHeader>Mandatory Document Upload</ModalHeader>
//         <ModalBody className="max-h-[70vh] overflow-y-auto">
//           <form onSubmit={handleSubmit(onEditSubmit)}>
//             <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
//               {[
//                 { label: "Std. 10th Marksheet", name: "tenthMarksheet" },
//                 { label: "Std. 10th Certificate", name: "tenthCertificate" },
//                 { label: "Std. 12th Marksheet", name: "twelveMarksheet" },
//                 { label: "Std. 12th Certificate", name: "twelveCertificate" },
//                 { label: "Passport", name: "passport" },
//                 { label: "Essay", name: "essay" },
//                 { label: "Instruction Letter", name: "instructionLetter" },
//               ].map((input, idx) => (
//                 <div key={idx}>
//                   <label className="block text-sm mb-1 text-gray-700">{input.label}</label>
//                   <input
//                     type="file"
//                     accept="application/pdf"
//                     onChange={(e) => handleFileChange(e, input.name)}
//                   />
//                 </div>
//               ))}
//             </div>
//             <div className="flex justify-end mt-4">
//               <Button type="submit" className="btn btn-primary">Save</Button>
//             </div>
//           </form>
//         </ModalBody>
//       </Modal>

//       {/* === Additional Documents Section === */}
//       <div className="mt-10">
//         <h2 className="text-lg font-semibold mb-2 text-gray-800">Additional Documents</h2>
//         <form onSubmit={handleAdditionalUpload} className="flex flex-col md:flex-row items-center gap-4 mb-6">
//           <input
//             type="text"
//             placeholder="Document Title"
//             value={newDoc.title}
//             onChange={(e) => setNewDoc({ ...newDoc, title: e.target.value })}
//             className="input input-bordered w-full md:w-1/3"
//             required
//           />
//           <input
//             type="file"
//             accept="application/pdf"
//             onChange={(e) => setNewDoc({ ...newDoc, file: e.target.files[0] })}
//             required
//           />
//           <Button type="submit" className="btn btn-primary">Upload</Button>
//         </form>

//         <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
//           {additionalDocs.map((doc) => (
//             <div
//               key={doc.id}
//               className="flex justify-between items-center border px-4 py-2 rounded bg-gray-50"
//             >
//               <span
//                 className="text-sm text-blue-600 cursor-pointer hover:underline"
//                 onClick={() => openPdf(doc.file)}
//               >
//                 {doc.title}
//               </span>
//               <FaTrashAlt
//                 onClick={() => handleDeleteDoc(doc.id)}
//                 className="text-red-500 cursor-pointer"
//               />
//             </div>
//           ))}
//         </div>
//       </div>
//     </div>
//   );
// };

// const DocumentSection = ({ title, institution, files, openPdf }) => (
//   <div className="mb-8">
//     <div className="flex items-center mb-4">
//       <FaCheckCircle className="text-green-500 mr-2" size={20} />
//       <h2 className="text-lg font-semibold">{title} <span className="text-red-500">*</span></h2>
//     </div>
//     <div className="flex flex-wrap gap-4 my-4">
//       {files.map((file, index) => (
//         file.path && (
//           <div
//             key={index}
//             onClick={() => openPdf(file.path)}
//             className="flex items-center border rounded-lg px-3 py-2 bg-gray-100 cursor-pointer hover:bg-gray-200"
//           >
//             <span className="text-sm">{file.name}</span>
//           </div>
//         )
//       ))}
//     </div>
//   </div>
// );

// export default StudentDocument;



import React, { useEffect, useState } from "react";
import { FaCheckCircle, FaTrashAlt } from "react-icons/fa";
import { MdOutlineGrading } from "react-icons/md";
import toast from "react-hot-toast";
import { useForm } from "react-hook-form";
import { Modal, ModalHeader, ModalBody, Button } from "@windmill/react-ui";
import {
  useGetDataByIdQuery,
  useUpdateDocumentMutation
} from "../../features/document/document";

import {
  useCreateAdditionalDocumentMutation,
  useDeleteAdditionalDocumentMutation,
  useGetAllAdditionalDocumentQuery
} from "../../features/additionalDocument/additionalDocument";

const BASE_URL = "https://education-consultancy-backend.onrender.com/";

const StudentDocument = ({ id }) => {
  const { register, handleSubmit, reset } = useForm();
  const [file, setFile] = useState({});
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [document, setDocument] = useState(null);

  const { data, isLoading, isError, error } = useGetDataByIdQuery(id);
  const [updateDocument] = useUpdateDocumentMutation();

  const { data: additionalDocsData, refetch } = useGetAllAdditionalDocumentQuery(id);
  const [createAdditionalDocument] = useCreateAdditionalDocumentMutation();
  const [deleteAdditionalDocument] = useDeleteAdditionalDocumentMutation();

  useEffect(() => {
    if (isError) {
      toast.error(error?.data?.message || "Failed to load document");
    } else if (!isLoading && data) {
      setDocument(data.data);
    }
  }, [data, isLoading, isError, error]);

  const openPdf = (filePath) => {
    if (!filePath) return;
    const finalUrl = BASE_URL + filePath.replace(/\\/g, "/");
    window.open(finalUrl, "_blank");
  };

  const handleFileChange = (e, fieldName) => {
    setFile((prev) => ({
      ...prev,
      [fieldName]: e.target.files[0],
    }));
  };

  const onEditSubmit = async () => {
    const formData = new FormData();
    Object.entries(file).forEach(([key, value]) => {
      if (value) {
        formData.append(key, value);
      }
    });

    try {
      const res = await updateDocument({ data: formData, id });
      if (res.data?.data === true) {
        toast.success("Mandatory documents updated");
        setIsModalOpen(false);
        reset();
      } else {
        toast.error(res?.error?.data?.message || "Update failed");
      }
    } catch {
      toast.error("Something went wrong");
    }
  };

  const handleAdditionalDocSubmit = async (e) => {
    e.preventDefault();
    const form = e.target;
    const formData = new FormData();
    formData.append("title", form.title.value);
    formData.append("file", form.file.files[0]);
    formData.append("user_id", id); // adjust to "user_id" if backend expects snake_case

    try {
      const res = await createAdditionalDocument(formData);
      if (res?.data?.success) {
        toast.success("Additional document uploaded");
        form.reset();
        refetch();
      } else {
        toast.error(res?.error?.data?.message || "Upload failed");
      }
    } catch {
      toast.error("Failed to upload document");
    }
  };

  const handleDeleteAdditionalDoc = async (docId) => {
    try {
      const res = await deleteAdditionalDocument(docId);
      if (res?.data?.success) {
        toast.success("Document deleted");
        refetch();
      } else {
        toast.error("Failed to delete document");
      }
    } catch {
      toast.error("Something went wrong");
    }
  };

  return (
    <div className="border rounded-2xl p-4 mb-6 shadow-sm bg-white">
      {/* Header */}
      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center gap-2 text-blue-600 font-semibold text-sm">
          <MdOutlineGrading className="w-5 h-5" />
          Mandatory Documents
        </div>
        <button
          onClick={() => {
            reset();
            setFile({});
            setIsModalOpen(true);
          }}
          className="btn btn-outline btn-sm text-blue-600 bg-blue-100 p-2 rounded-sm"
        >
          Request Edit
        </button>
      </div>

      {/* Mandatory Documents */}
      {document && (
        <>
          <DocumentSection
            title="Std. 10th Certificate & Transcript"
            files={[
              { name: "10th Certificate", path: document.tenthCertificate },
              { name: "10th Marksheet", path: document.tenthMarksheet },
            ]}
            openPdf={openPdf}
          />
          <DocumentSection
            title="Std. 12th Certificate & Transcript"
            files={[
              { name: "12th Marksheet", path: document.twelveMarksheet },
              { name: "12th Certificate", path: document.twelveCertificate },
            ]}
            openPdf={openPdf}
          />

          <DocumentSection
            title="Std. Bachelor Certificate & Transcript"
            files={[
              { name: "Bachelor Certificate", path: document.bachelorCertificate },
              { name: "Bachelor Transcript", path: document.bachelorTranscript },
            ]}
            openPdf={openPdf}
          />
          <DocumentSection
            title="Passport, Essay & Instruction Letter"
            files={[
              { name: "Passport", path: document.passport },
              { name: "Essay", path: document.essay },
              { name: "Instruction Letter", path: document.instructionLetter },
            ]}
            openPdf={openPdf}
          />
        </>
      )}

      {/* Additional Documents */}
      <div className="mt-8">
        <h3 className="text-lg font-semibold mb-2">Additional Documents</h3>
        <form onSubmit={handleAdditionalDocSubmit} className="flex flex-col md:flex-row gap-4 items-start mb-6">
          <input
            type="text"
            name="title"
            placeholder="Document Title"
            required
            className="input border px-3 py-2 rounded w-full md:w-1/2"
          />
          <input
            type="file"
            name="file"
            accept="application/pdf"
            required
            className="input"
          />
          <p>Limit 5MB</p>
          <button
            type="submit"
            className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
          >
            Upload
          </button>
        </form>

        {additionalDocsData?.data?.length > 0 ? (
          <div className="space-y-3">
            {additionalDocsData.data.map((doc) => (
              <div
                key={doc.id}
                className="flex items-center justify-between p-3 border rounded bg-gray-50 hover:bg-gray-100"
              >
                <span
                  onClick={() => openPdf(doc.file || doc.path)}
                  className="text-sm cursor-pointer text-blue-700"
                >
                  {doc.title}
                </span>
                <FaTrashAlt
                  className="text-red-500 cursor-pointer"
                  onClick={() => handleDeleteAdditionalDoc(doc.id)}
                />
              </div>
            ))}
          </div>
        ) : (
          <p className="text-sm text-gray-500">No additional documents uploaded yet.</p>
        )}
      </div>

      {/* Modal for editing mandatory documents */}
      <Modal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)}>
        <ModalHeader>Mandatory Document Upload  (Filesize Limit 5MB)</ModalHeader>
        <ModalBody className="max-h-[70vh] overflow-y-auto">
          <form onSubmit={handleSubmit(onEditSubmit)}>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {[
                { label: "Std. 10th Certificate", name: "tenthCertificate" },
                { label: "Std. 10th Transcript", name: "tenthMarksheet" },
                { label: "Std. 12th Certificate", name: "twelveCertificate" },
                { label: "Std. 12th Transcript", name: "twelveMarksheet" },
                { label: "Bachelor Certificate (if applicable) ", name: "bachelorCertificate" },
                { label: "Bachelor Transcript (if applicable) ", name: "bachelorTranscript" },
                { label: "Passport", name: "passport" },
                { label: "Essay", name: "essay" },
                { label: "Instruction Letter", name: "instructionLetter" },
                { label: "Instruction Letter", name: "instructionLetter" },
                
              ].map((input, idx) => (
                <div key={idx} className="mb-4">
                  <label className="block text-sm mb-1 text-gray-700">{input.label}</label>
                  <input
                    type="file"
                    accept="application/pdf"
                    onChange={(e) => handleFileChange(e, input.name)}
                  />
                </div>
              ))}
            </div>
            <div className="flex justify-end mt-4">
              <Button type="submit" className="btn btn-primary">Save</Button>
            </div>
          </form>
        </ModalBody>
      </Modal>
    </div>
  );
};

const DocumentSection = ({ title, files, openPdf }) => (
  <div className="mb-8">
    <div className="flex items-center mb-4">
      <FaCheckCircle className="text-green-500 mr-2" size={20} />
      <h2 className="text-lg font-semibold">{title} <span className="text-red-500">*</span></h2>
    </div>
    <div className="flex flex-wrap gap-4 my-4">
      {files.map(
        (file, index) =>
          file.path && (
            <div
              key={index}
              onClick={() => openPdf(file.path)}
              className="flex items-center border rounded-lg px-3 py-2 bg-gray-100 cursor-pointer hover:bg-gray-200"
            >
              <span className="text-sm">{file.name}</span>
            </div>
          )
      )}
    </div>
  </div>
);

export default StudentDocument;
