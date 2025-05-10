import React, { useState } from "react";
import PersonalInformation from "./PersonalInformation";
import Academic from "./Academic";
import Tests from "./Tests";
import PendingPayment from "./PendingPayment";
import PreviousPayment from "./PreviousPayment";
import RequestPayment from "./RequestPayment";

const  Finance = ({id}) => {



  const [activeTab, setActiveTab] = useState("personal");
  
    const isRequestPayment = activeTab === "requestPayment";
    const isPendingPayment = activeTab === "pendingPayment";
    const isPreviousPayment = activeTab === "previousPayment";



  return (
    <div className="p-4 md:p-8 w-full mx-auto">
        {/* Navigation Steps */}
        <div className="grid grid-cols-2 lg:grid-cols-3 gap-4 items-center">
          <div onClick={() => setActiveTab("requestPayment")} className={`flex flex-col items-center cursor-pointer ${isRequestPayment ? "bg-purple-600 text-white rounded-md py-1" : "bg-gray-200 text-gray-700 rounded-md py-1"}`}>
            <h1  className="mt-1 text-xl">Request Payment</h1>
          </div>
          <div  onClick={() => setActiveTab("pendingPayment")}
          className={`flex flex-col items-center cursor-pointer ${isPendingPayment ? "bg-purple-600 text-white rounded-md py-1" : "bg-gray-200 text-gray-700 rounded-md py-1"}`}>
            {/* className={`w-8 h-8 flex items-center justify-center rounded-full text-sm font-medium ${
      isFinance ? "bg-blue-600 text-white" : "bg-gray-200"
    }`} */}
            <h1 className="mt-1 text-xl">Pending Payment</h1>

          </div>

          {/* <div 
              onClick={() => setActiveTab("work")}  className="flex flex-col items-center cursor-pointer">
            <span className="mt-1 text-sm text-gray-700">Work Experience</span>
          </div> */}
          <div 
              onClick={() => setActiveTab("previousPayment")}  className={`flex flex-col items-center cursor-pointer ${isPreviousPayment ? "bg-purple-600 text-white rounded-md py-1" : "bg-gray-200 text-gray-700 rounded-md py-1"}`}>
            <h1 className="mt-1 text-xl">Previous Payment</h1>

          </div>
        </div>



         {/* Separated Content Section Below */}
              <div className="mt-4 p-4 bg-white rounded-md">
              {isRequestPayment ? (
                <div>

                <RequestPayment id = {id}/>

                </div>
              ): isPendingPayment ?  (
                <div>

                 <PendingPayment id={id}/>

                </div>
              )  : (

                <PreviousPayment id={id}/>

              )
            
            }
            </div>
    </div>
  );
}

export default Finance;