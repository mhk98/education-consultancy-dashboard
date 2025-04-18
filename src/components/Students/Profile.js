import React, { useState } from "react";
import { FaRegCopy } from "react-icons/fa";
import PersonalInformation from "./PersonalInformation";

export default function Profile() {



  const [activeTab, setActiveTab] = useState("personal");
  
    const isPersonal = activeTab === "personal";
    const isAcademic = activeTab === "academic";
    const isWork = activeTab === "work";
    const isTest = activeTab === "test";

  return (
    <div className="p-4 md:p-8 w-full mx-auto">
        {/* Navigation Steps */}
        <div className="grid grid-cols-2 lg:grid-cols-4 items-center">
          <div onClick={() => setActiveTab("personal")} className="flex flex-col items-center cursor-pointer">
            <span  className="mt-1 text-sm text-gray-700">Personal Information</span>
          </div>
          <div  onClick={() => setActiveTab("academic")}
          className="flex flex-col items-center cursor-pointer">
            <span  className="mt-1 text-sm text-gray-700">Academic Qualification</span>
          </div>

          <div 
              onClick={() => setActiveTab("work")}  className="flex flex-col items-center cursor-pointer">
            <span className="mt-1 text-sm text-gray-700">Work Experience</span>
          </div>
          <div 
              onClick={() => setActiveTab("test")}  className="flex flex-col items-center cursor-pointer">
            <span className="mt-1 text-sm text-gray-700">Tests</span>
          </div>
        </div>



         {/* Separated Content Section Below */}
              <div className="mt-4 p-4 bg-white rounded-md shadow-md">
              {isPersonal ? (
                <div>

                <PersonalInformation/>

                </div>
              ): isAcademic ?  (
                <div>

                 <p>gello</p>

                </div>
              ) : isWork ? (

                <p>hello</p>

              ) : (

                <p>How are you</p>

              )
            
            }
            </div>
    </div>
  );
}
