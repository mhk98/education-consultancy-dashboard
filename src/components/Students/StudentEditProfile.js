import React, { useState } from "react";
import { FaRegCopy } from "react-icons/fa";
import Profile from "./Profile";

export default function StudentEditProfile() {

  const qrLink = "https://yourdomain.com/student-registration";

  const handleCopy = () => {
    navigator.clipboard.writeText(qrLink);
    alert("Link copied to clipboard!");
  };


  const [activeTab, setActiveTab] = useState("profile");
  
    const isProfile = activeTab === "profile";
    const isApplications = activeTab === "applications";
    const isDocuments = activeTab === "documents";

  return (
    <div className="p-4 md:p-8 w-full mx-auto">
      <div className="text-sm text-gray-500 mb-4">
        <a href="#" className="hover:underline">Students</a> &gt; <a href="#" className="hover:underline">Student Profile</a> &gt; <span className="text-gray-800 font-medium">MD Ahosanul Ovi</span>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
        {/* Student Info Card */}
        

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
      <div className="col-span-1 bg-white rounded-2xl shadow p-4 flex flex-col gap-2">
          <h2 className="font-semibold text-lg text-gray-800">Md Ahosanul Islam Ovi</h2>
          <div className="text-sm text-gray-600">
            <p>📧 ahosaneac@gmail.com</p>
            <p>📞 +8801867303751</p>
          </div>
        </div>
              {/* Share Button */}
        <div className="col-span-1 bg-white rounded-2xl shadow p-4 flex items-center justify-center">
          <button
                      onClick={handleCopy}
                      className="flex-1 border border-blue-600 text-blue-600 hover:bg-blue-50 px-6 py-3 rounded-lg flex items-center justify-center gap-2 transition-all"
                    >
                      <span>Student Platform</span>
                      <FaRegCopy />
                    </button>
        </div>
      </div>
  

        {/* Navigation Steps */}
        <div className="col-span-1 bg-white rounded-2xl shadow p-4 flex justify-around items-center">
          <div onClick={() => setActiveTab("profile")} className="flex flex-col items-center cursor-pointer">
            <div  className="w-8 h-8 flex items-center justify-center rounded-full bg-gray-200 text-sm font-medium">1</div>
            <span  className="mt-1 text-xs text-gray-700">Profile</span>
          </div>
          <div className="h-px flex-1 bg-gray-300 mx-2"></div>
          <div  onClick={() => setActiveTab("applications")}
          className="flex flex-col items-center cursor-pointer">
            <div  className="w-8 h-8 flex items-center justify-center rounded-full bg-blue-600 text-white text-sm font-medium">2</div>
            <span  className="mt-1 text-xs text-gray-700">Applications</span>
          </div>
          <div className="h-px flex-1 bg-gray-300 mx-2"></div>
          <div 
              onClick={() => setActiveTab("documents")}  className="flex flex-col items-center cursor-pointer">
            <div  className="w-8 h-8 flex items-center justify-center rounded-full bg-gray-200 text-sm font-medium">3</div>
            <span className="mt-1 text-xs text-gray-700">Documents</span>
          </div>
        </div>


      </div>

         {/* Separated Content Section Below */}
              <div className="mt-4 p-4 bg-white rounded-md shadow-md">
              {isProfile ? (
                <div>
                    <Profile/>

                </div>
              ): isApplications ?  (
                <div>
                                  <p>gello</p>

      
      
                </div>
              ) : (
                <p>hello</p>
              )
            
            }
            </div>
    </div>
  );
}
