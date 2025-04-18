import React, { useState } from "react";
import { FaPlayCircle } from "react-icons/fa";
import CommissionInprogressFilter from "../components/ComissionPayment/CommissionInprogressFilter";
import CommissionPaidFilter from "../components/ComissionPayment/CommissionPaidFilter";
import CommissionPanel from "../components/ComissionPayment/CommissionPanel";

const CommissionPayment = () => {
  const [activeTab, setActiveTab] = useState("inProgress");

  const isInProgress = activeTab === "inProgress";

  return (
    <>
      {/* Top UI */}
      <div className="flex flex-col sm:flex-row justify-between items-center bg-[#f7fafd] p-4 rounded-md w-full gap-2">
        {/* Tabs and progress bar */}
        <div className="w-full sm:w-auto">
          <div className="flex gap-4 text-sm font-medium mb-1">
            <span
              className={`cursor-pointer pb-1 ${
                isInProgress
                  ? "text-blue-600 "
                  : "text-gray-800"
              }`}
              onClick={() => setActiveTab("inProgress")}
            >
              In Progress
            </span>
            <span
              className={`cursor-pointer pb-1 ${
                !isInProgress
                  ? "text-blue-600 "
                  : "text-gray-800"
              }`}
              onClick={() => setActiveTab("paid")}
            >
              Paid
            </span>
          </div>

          <div className="h-1 bg-blue-100 rounded-full">
            <div
              className="h-1 bg-blue-500 rounded-full transition-all duration-300"
              style={{ width: isInProgress ? "25%" : "100%" }}
            ></div>
          </div>
        </div>

        {/* Button */}
        <button className="flex items-center gap-2 bg-blue-600 hover:bg-blue-700 text-white text-sm font-medium py-2 px-4 rounded">
          <FaPlayCircle className="text-white" />
          Watch Tutorial
        </button>
      </div>

      {/* Separated Content Section Below */}
      <div className="mt-4 p-4 bg-white rounded-md shadow-md">
        {isInProgress ? (
          <div>
            <CommissionInprogressFilter/>
          </div>
        ) : (
          <div>
            <CommissionPaidFilter/>
            <CommissionPanel/>
          </div>
        )}
      </div>
    </>
  );
};

export default CommissionPayment;
