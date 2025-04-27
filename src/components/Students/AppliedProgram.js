// import React, { useEffect, useState } from "react";
// import { FiPaperclip, FiSend } from "react-icons/fi";
// import { useGetDataByIdQuery } from "../../features/application/application";

// const AppliedProgram = ({ id }) => {
//   const [tab, setTab] = useState("kc");

//   const { data, isLoading, isError, error } = useGetDataByIdQuery(id);
//   const [program, setProgram] = useState([]);

//   useEffect(() => {
//     if (isError) {
//       console.log(error?.data?.message || "An error occurred");
//     } else if (!isLoading && data) {
//       setProgram(data.data);
//     }
//   }, [data, isLoading, isError, error]);

//   function formatDateTime(dateTimeStr) {
//     const date = new Date(dateTimeStr);

//     const year = date.getFullYear();
//     const month = String(date.getMonth() + 1).padStart(2, "0");
//     const day = String(date.getDate()).padStart(2, "0");

//     let hours = date.getHours();
//     const minutes = String(date.getMinutes()).padStart(2, "0");

//     let ampm = hours >= 12 ? "PM" : "AM"; // Capital
//     hours = hours % 12;
//     hours = hours ? hours : 12; // hour 0 হলে 12 হবে

//     return `${year}-${month}-${day} ${hours}:${minutes} ${ampm}`;
//   }

//   return (
//     <div className="flex flex-col lg:flex-row gap-4 p-4">
      
//       {/* Left Section */}
//       <div className="lg:w-1/3 w-full flex flex-col gap-4">
//         {program.map((item) => (
//           <div key={item.id} className="border border-blue-300 rounded-md overflow-hidden shadow-sm">
//             <div className="bg-green-100 text-green-800 text-sm font-semibold px-4 py-2">
//               Application Submitted to the Institution
//             </div>
//             <div className="p-4 space-y-2">
//               <div className="flex items-center gap-2 text-sm">
//                 <span className="bg-red-400 text-white text-xs px-2 py-1 rounded">
//                   1st Priority
//                 </span>
//               </div>
//               <div className="text-sm">
//                 <strong>Date:</strong> {formatDateTime(item.createdAt)}
//               </div>
//               <div className="text-sm">
//                 <strong>Course:</strong> {item.program}
//               </div>
//               <div className="text-sm">
//                 <strong>University:</strong> {item.university}
//               </div>
//             </div>
//           </div>
//         ))}
//       </div>

//       {/* Right Section */}
//       <div className="lg:w-2/3 w-full border border-gray-200 rounded-md overflow-hidden shadow-sm">
//         <div className="flex justify-between items-center bg-green-100 px-4 py-2">
//           <span className="text-sm text-gray-700">22/03/2025 12:42 AM</span>
//           <span className="text-green-800 text-sm font-semibold">
//             Application Submitted To The Institution
//           </span>
//         </div>

//         {program.map((item) => (
//           <div key={item.id} className="px-4 py-4 space-y-4">

//             <h2 className="text-blue-600 font-semibold underline cursor-pointer">
//               {/* Placeholder for Application ID or Number */}
//               {/* 286656/24–25 */}
//             </h2>

//             <p className="text-gray-800 font-medium">{item.program}</p>

//             {/* Tabs */}
//             <div className="flex border-b border-gray-200 mt-4">
//               <button
//                 className={`px-4 py-2 text-sm font-medium ${
//                   tab === "kc"
//                     ? "text-blue-600 border-b-2 border-blue-600"
//                     : "text-gray-600"
//                 }`}
//                 onClick={() => setTab("kc")}
//               >
//                 KC Team
//               </button>
//               <button
//                 className={`px-4 py-2 text-sm font-medium ${
//                   tab === "student"
//                     ? "text-blue-600 border-b-2 border-blue-600"
//                     : "text-gray-600"
//                 }`}
//                 onClick={() => setTab("student")}
//               >
//                 Student
//               </button>
//             </div>

//             {/* Message Input Area */}
//             <div className="mt-4">
//               <div className="flex items-center gap-2">
//                 <input
//                   type="text"
//                   placeholder="Write comments..."
//                   className="flex-1 border border-gray-300 rounded px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
//                 />
//                 <button className="text-blue-600 hover:text-blue-800">
//                   <FiPaperclip size={20} />
//                 </button>
//                 <button className="bg-blue-600 text-white p-2 rounded hover:bg-blue-700">
//                   <FiSend size={20} />
//                 </button>
//               </div>

//               {/* Hide message option */}
//               {tab === "kc" && (
//                 <label className="inline-flex items-center mt-2">
//                   <input
//                     type="checkbox"
//                     className="form-checkbox h-4 w-4 text-blue-600"
//                   />
//                   <span className="ml-2 text-sm text-gray-600">
//                     Hide this message and attachment from counselor
//                   </span>
//                 </label>
//               )}
//             </div>

//           </div>
//         ))}
//       </div>
//     </div>
//   );
// };

// export default AppliedProgram;






import React, { useEffect, useState } from "react";
import { FiPaperclip, FiSend } from "react-icons/fi";
import { useGetDataByIdQuery } from "../../features/application/application";

const AppliedProgram = ({ id }) => {
  const [tab, setTab] = useState("kc");
  const { data, isLoading, isError, error } = useGetDataByIdQuery(id);
  const [programs, setPrograms] = useState([]);
  const [selectedProgram, setSelectedProgram] = useState(null);

  useEffect(() => {
    if (isError) {
      console.log(error?.data?.message || "An error occurred");
    } else if (!isLoading && data) {
      setPrograms(data.data);
      if (data.data.length > 0) {
        setSelectedProgram(data.data[0]); // By default, select the first program
      }
    }
  }, [data, isLoading, isError, error]);

  function formatDateTime(dateTimeStr) {
    const date = new Date(dateTimeStr);
    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, "0");
    const day = String(date.getDate()).padStart(2, "0");
    let hours = date.getHours();
    const minutes = String(date.getMinutes()).padStart(2, "0");
    let ampm = hours >= 12 ? "PM" : "AM";
    hours = hours % 12 || 12;
    return `${year}-${month}-${day} ${hours}:${minutes} ${ampm}`;
  }

  return (
    <div className="flex flex-col lg:flex-row gap-4 p-4">
      
      {/* Left Section */}
      <div className="lg:w-1/3 w-full flex flex-col gap-4">
        {programs.map((item) => (
          <div
            key={item.id}
            onClick={() => setSelectedProgram(item)}
            className={`border rounded-md cursor-pointer transition-all ${
              selectedProgram?.id === item.id
                ? "border-blue-500 bg-blue-50"
                : "border-gray-300"
            }`}
          >
            <div className="bg-green-100 text-green-800 text-sm font-medium px-4 py-2 rounded-t-md">
              Application submitted to the Institution
            </div>
            <div className="p-4">
              <div className="text-sm mb-2">
                <span className="ml-2 bg-red-400 text-white text-xs px-2 py-1 rounded">
                  1st Priority
                </span>
              </div>
              <div className="text-sm mb-1">
                <strong>Date:</strong> {formatDateTime(item.createdAt)}
              </div>
              <div className="text-sm mb-1">
                <strong>Course:</strong> {item.program}
              </div>
              <div className="text-sm">
                <strong>University:</strong> {item.university}
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Right Section */}
      <div className="lg:w-2/3 w-full border border-gray-200 rounded-md">
        {selectedProgram ? (
          <>
            <div className="flex justify-between items-center bg-green-100 px-4 py-2 rounded-t-md">
              <span className="text-sm text-gray-700">
                {formatDateTime(selectedProgram.createdAt)}
              </span>
              <span className="text-green-800 text-sm font-medium">
                Application Submitted To The Institution
              </span>
            </div>

            <div className="px-4 py-2">
              <h2 className="text-blue-600 font-semibold underline cursor-pointer mb-2">
                {/* Application ID or Number if you have */}
              </h2>
              <p className="text-gray-800 font-medium mb-4">
                {selectedProgram.program}
              </p>

              {/* Tabs */}
              <div className="flex border-b border-gray-200 mb-4">
                <button
                  className={`px-4 py-2 text-sm font-medium ${
                    tab === "kc"
                      ? "text-blue-600 border-b-2 border-blue-600"
                      : "text-gray-600"
                  }`}
                  onClick={() => setTab("kc")}
                >
                  KC Team
                </button>
                <button
                  className={`px-4 py-2 text-sm font-medium ${
                    tab === "student"
                      ? "text-blue-600 border-b-2 border-blue-600"
                      : "text-gray-600"
                  }`}
                  onClick={() => setTab("student")}
                >
                  Student
                </button>
              </div>

              {/* Message Input */}
              {tab === "kc" ? (
                <div className="mt-2">
                  <div className="flex items-center gap-2 mt-4">
                    <input
                      type="text"
                      placeholder="Write comments..."
                      className="flex-1 border border-gray-300 rounded px-3 py-2 text-sm"
                    />
                    <button className="text-blue-600 hover:text-blue-800">
                      <FiPaperclip size={20} />
                    </button>
                    <button className="bg-blue-600 text-white p-2 rounded hover:bg-blue-700">
                      <FiSend size={20} />
                    </button>
                  </div>
                  <label className="inline-flex items-center mt-2">
                    <input
                      type="checkbox"
                      className="form-checkbox h-4 w-4 text-blue-600"
                    />
                    <span className="ml-2 text-sm text-gray-600">
                      Hide this message and attachment from counselor
                    </span>
                  </label>
                </div>
              ) : (
                <div className="mt-2">
                  <div className="flex items-center gap-2 mt-4">
                    <input
                      type="text"
                      placeholder="Write comments..."
                      className="flex-1 border border-gray-300 rounded px-3 py-2 text-sm"
                    />
                    <button className="text-blue-600 hover:text-blue-800">
                      <FiPaperclip size={20} />
                    </button>
                    <button className="bg-blue-600 text-white p-2 rounded hover:bg-blue-700">
                      <FiSend size={20} />
                    </button>
                  </div>
                </div>
              )}
            </div>
          </>
        ) : (
          <div className="p-6 text-center text-gray-500">
            Select an application to see details.
          </div>
        )}
      </div>

    </div>
  );
};

export default AppliedProgram;
