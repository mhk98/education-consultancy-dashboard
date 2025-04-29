// import React, { useEffect, useState } from "react";
// import { FaTrashAlt, FaCheckCircle, FaCloudUploadAlt } from "react-icons/fa";
// import { MdOutlineGrading } from "react-icons/md";
// import { useGetDataByIdQuery, useUpdateDocumentMutation } from "../../features/document/document";
// import toast from "react-hot-toast";
// import { useForm } from "react-hook-form";
// import { Modal, ModalHeader, ModalBody, Button, Input } from '@windmill/react-ui'

// const StudentDocument = ({id}) => {

//     const documents = [
//         {
//           title: "Std. 10th Marksheet",
//           institution: "Wekerle Business School",
//           uploadedOn: "17-03-2025 11:08 PM",
//           uploadedBy: "Mr. Tasbirul Islam Shobuj (Partner)",
//           files: [
//             "Asosanul Islam Ovi SSC Transcript.pdf",
//             "Ahosanul Islam Ovi SSC Certificate.pdf",
//           ],
//         },
//         {
//           title: "Std. 12th Marksheet",
//           institution: "Wekerle Business School",
//           uploadedOn: "17-03-2025 11:10 PM",
//           uploadedBy: "Mr. Tasbirul Islam Shobuj (Partner)",
//           files: [
//             "Ahosanul HSC Transcript.pdf",
//             "Ahsanul HSC certificate.pdf",
//           ],
//         },
//       ];


      
//      const [isModalOpen, setIsModalOpen] = useState(false)

//      function closeModal() {
//          setIsModalOpen(false)
//        }
     
 
//      const {
//          register,
//          formState: { errors },
//          handleSubmit,
//          reset,
//        } = useForm()


//         const [file, setFile] = useState(null);
       
//         const handleFileChange = (e) => {
//             setFile(e.target.files[0]);
//         };
//         const [file1, setFile1] = useState(null);
       
//         const handleFileChange1 = (e) => {
//             setFile1(e.target.files[0]);
//         };

//         const [file2, setFile2] = useState(null);
       
//         const handleFileChange2 = (e) => {
//             setFile2(e.target.files[0]);
//         };
//         const [file3, setFile3] = useState(null);
       
//         const handleFileChange3 = (e) => {
//             setFile3(e.target.files[0]);
//         };
//         const [file4, setFile4] = useState(null);
       
//         const handleFileChange4 = (e) => {
//             setFile4(e.target.files[0]);
//         };
//         const [file5, setFile5] = useState(null);
       
//         const handleFileChange5 = (e) => {
//             setFile5(e.target.files[0]);
//         };
//         const [file6, setFile6] = useState(null);
       
//         const handleFileChange6 = (e) => {
//             setFile6(e.target.files[0]);
//         };
 
     
//        const [updateDocument] = useUpdateDocumentMutation()

//        const onEditSubmit = async() => {
//         const formData = new FormData();
// 		formData.append("tenthMarksheet", file);
// 		formData.append("tenthCertificate", file1);
// 		formData.append("twelveMarksheet", file2);
// 		formData.append("twelveCertificate", file3);
// 		formData.append("passport", file4);
// 		formData.append("essay", file5);
// 		formData.append("instructionLetter", file6);
		
//          try {
//          const res = await updateDocument({data:formData, id})
//          console.log("res", res)
//            if(res.data.data === true) {
//              toast.success(res.data.message)
//            } else {
//              toast.error(res?.error?.data?.message)
//            }
//          } catch (error) {
//            toast.error("Something went wrong")
//          }
//        }
       
     
//        const { data, isLoading, isError, error } = useGetDataByIdQuery(id);
//        const [document, setDocument] = useState(null);
       
//        useEffect(() => {
//          if (isError) {
//            console.log(error?.data?.message || "An error occurred");
//          } else if (!isLoading && data) {
//              setDocument(data.data);
//          }
//        }, [data, isLoading, isError, error]);
       
     
//      console.log("academic", document)

//   return (
//     <div className="border rounded-2xl p-4 mb-6 shadow-sm bg-white">
//        <div className="flex items-center justify-between mb-4">
//                           <div className="flex items-center gap-2 text-blue-600 font-semibold text-sm">
//                             <MdOutlineGrading  className="w-5 h-5"/>
//                             IELTS
//                           </div>
//                           <button
//                             onClick={() => {
//                               reset({
//                               //   dob: profile?.dob || "",
//                               //   gender: profile?.gender || "",
//                               //   maritalStatus: profile?.maritalStatus || "",
//                               });
//                               setIsModalOpen(true)
//                             }}
//                             className="btn btn-outline btn-sm text-blue-600 bg-blue-100 p-2 rounded-sm"
//                           >
//                             Request Edit
//                           </button>
//                         </div>
//       {
//         documents.map((document) => (
//             <div>
//       <div className="flex items-center mb-4">
//         <FaCheckCircle className="text-green-500 mr-2" size={20} />
//         <h2 className="text-lg font-semibold">{document.title} <span className="text-red-500">*</span></h2>
//       </div>
//       <div className="text-sm text-gray-600 mb-2">
//         <p><span className="font-medium">Institution(s) Required For:</span> {document.institution}</p>
//         <p><span className="font-medium">Uploaded On:</span> {document.uploadedOn}</p>
//         <p><span className="font-medium">Uploaded By:</span> {document.uploadedBy}</p>
//       </div>
//       <div className="flex flex-wrap gap-4 my-4">
//         {document.files.map((file, index) => (
//           <div key={index} className="flex items-center border rounded-lg px-3 py-2 bg-gray-100">
//             <span className="text-sm">{file}</span>
//             <button className="ml-2 text-red-500 hover:text-red-700">
//               <FaTrashAlt size={16} />
//             </button>
//           </div>
//         ))}
//       </div>
//       </div>
//         ))
//       }

          
//                          <Modal isOpen={isModalOpen} onClose={closeModal}>
//         <ModalHeader>Mandadory Document</ModalHeader>
//         <ModalBody className="max-h-[70vh] overflow-y-auto">
//           <form onSubmit={handleSubmit(onEditSubmit)}>
//             <div className="grid grid-cols-1 md:grid-cols-2 gap-4">

//               <div className="mb-4">
//                 <label className="block text-sm mb-1 text-gray-700">Std. 10th Marksheet</label>
//                  <input type="file" accept="application/pdf" onChange={handleFileChange} />
//               </div>

//               <div className="mb-4">
//                 <label className="block text-sm mb-1 text-gray-700">Std. 10th Certificate</label>
//                  <input type="file" accept="application/pdf" onChange={handleFileChange1} />
//               </div>

//               <div className="mb-4">
//                 <label className="block text-sm mb-1 text-gray-700">Std. 12th Marksheet</label>
//                  <input type="file" accept="application/pdf" onChange={handleFileChange2} />
//               </div>

//               <div className="mb-4">
//                 <label className="block text-sm mb-1 text-gray-700">Std. 12th Certificate</label>
//                  <input type="file" accept="application/pdf" onChange={handleFileChange3} />
//               </div>

//               <div className="mb-4">
//                 <label className="block text-sm mb-1 text-gray-700">Passport</label>
//                  <input type="file" accept="application/pdf" onChange={handleFileChange4} />
//               </div>

//               <div className="mb-4">
//                 <label className="block text-sm mb-1 text-gray-700">Essay</label>
//                  <input type="file" accept="application/pdf" onChange={handleFileChange5} />
//               </div>

//               <div className="mb-4">
//                 <label className="block text-sm mb-1 text-gray-700">InstructionLetter</label>
//                  <input type="file" accept="application/pdf" onChange={handleFileChange6} />
//               </div>
      
             
//             </div>
      
//             <div className="flex justify-end gap-2 mt-4">
//               <Button type="submit" className="btn btn-primary">
//                 Save
//               </Button>
//             </div>
//           </form>
//         </ModalBody>
//       </Modal>
//     </div>
//   );
// };


// export default StudentDocument;


import React, { useEffect, useState } from "react";
import { FaTrashAlt, FaCheckCircle } from "react-icons/fa";
import { MdOutlineGrading } from "react-icons/md";
import { useGetDataByIdQuery, useUpdateDocumentMutation } from "../../features/document/document";
import toast from "react-hot-toast";
import { useForm } from "react-hook-form";
import { Modal, ModalHeader, ModalBody, Button } from '@windmill/react-ui'

const BASE_URL = "http://localhost:4000/"; // your backend base

const StudentDocument = ({ id }) => {
  const {
    register,
    formState: { errors },
    handleSubmit,
    reset,
  } = useForm();

  const [updateDocument] = useUpdateDocumentMutation();
  const { data, isLoading, isError, error } = useGetDataByIdQuery(id);
  const [document, setDocument] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  useEffect(() => {
    if (isError) {
      console.log(error?.data?.message || "An error occurred");
    } else if (!isLoading && data) {
      setDocument(data.data);
    }
  }, [data, isLoading, isError, error]);

  const openPdf = (filePath) => {
    if (!filePath) return;
    const finalUrl = BASE_URL + filePath.replace(/\\/g, "/"); // replace \ with /
    window.open(finalUrl, "_blank");
  };

  const [file, setFile] = useState({});
  const handleFileChange = (e, fieldName) => {
    setFile(prev => ({
      ...prev,
      [fieldName]: e.target.files[0]
    }));
  };

  const onEditSubmit = async () => {
    const formData = new FormData();
    Object.entries(file).forEach(([key, value]) => {
      formData.append(key, value);
    });

    try {
      const res = await updateDocument({ data: formData, id });
      if (res.data.data === true) {
        toast.success(res.data.message);
      } else {
        toast.error(res?.error?.data?.message);
      }
    } catch (error) {
      toast.error("Something went wrong");
    }
  };

  function closeModal() {
    setIsModalOpen(false);
  }

  return (
    <div className="border rounded-2xl p-4 mb-6 shadow-sm bg-white">
      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center gap-2 text-blue-600 font-semibold text-sm">
          <MdOutlineGrading className="w-5 h-5" />
          IELTS
        </div>
        <button
          onClick={() => {
            reset();
            setIsModalOpen(true);
          }}
          className="btn btn-outline btn-sm text-blue-600 bg-blue-100 p-2 rounded-sm"
        >
          Request Edit
        </button>
      </div>

      {/* ==== Documents Showing from API === */}
      {document && (
        <>
          <DocumentSection
            title="Std. 10th Marksheet"
            institution="Wekerle Business School"
            files={[
              { name: "10th Marksheet", path: document.tenthMarksheet },
              { name: "10th Certificate", path: document.tenthCertificate },
            ]}
            openPdf={openPdf}
          />
          <DocumentSection
            title="Std. 12th Marksheet"
            institution="Wekerle Business School"
            files={[
              { name: "12th Marksheet", path: document.twelveMarksheet },
              { name: "12th Certificate", path: document.twelveCertificate },
            ]}
            openPdf={openPdf}
          />
          <DocumentSection
            title="Passport, Essay & Instruction Letter"
            institution="Wekerle Business School"
            files={[
              { name: "Passport", path: document.passport },
              { name: "Essay", path: document.essay },
              { name: "Instruction Letter", path: document.instructionLetter },
            ]}
            openPdf={openPdf}
          />
        </>
      )}

      {/* ==== Modal for Updating Documents ==== */}
      <Modal isOpen={isModalOpen} onClose={closeModal}>
        <ModalHeader>Mandatory Document Upload</ModalHeader>
        <ModalBody className="max-h-[70vh] overflow-y-auto">
          <form onSubmit={handleSubmit(onEditSubmit)}>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {[
                { label: "Std. 10th Marksheet", name: "tenthMarksheet" },
                { label: "Std. 10th Certificate", name: "tenthCertificate" },
                { label: "Std. 12th Marksheet", name: "twelveMarksheet" },
                { label: "Std. 12th Certificate", name: "twelveCertificate" },
                { label: "Passport", name: "passport" },
                { label: "Essay", name: "essay" },
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
            <div className="flex justify-end gap-2 mt-4">
              <Button type="submit" className="btn btn-primary">
                Save
              </Button>
            </div>
          </form>
        </ModalBody>
      </Modal>
    </div>
  );
};

const DocumentSection = ({ title, institution, files, openPdf }) => {
  return (
    <div className="mb-8">
      <div className="flex items-center mb-4">
        <FaCheckCircle className="text-green-500 mr-2" size={20} />
        <h2 className="text-lg font-semibold">{title} <span className="text-red-500">*</span></h2>
      </div>
      <div className="text-sm text-gray-600 mb-2">
        <p><span className="font-medium">Institution(s) Required For:</span> {institution}</p>
      </div>
      <div className="flex flex-wrap gap-4 my-4">
        {files.map((file, index) => (
          file.path && (
            <div
              key={index}
              onClick={() => openPdf(file.path)}
              className="flex items-center border rounded-lg px-3 py-2 bg-gray-100 cursor-pointer hover:bg-gray-200"
            >
              <span className="text-sm">{file.name}</span>
            </div>
          )
        ))}
      </div>
    </div>
  );
};

export default StudentDocument;
