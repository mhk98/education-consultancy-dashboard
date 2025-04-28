import React, { useState } from "react";
import StudentDocument from "./StudentDocument";

const Document = ({id}) => {
  const [activeTab, setActiveTab] = useState("apply");

  return (
    <div className="w-full bg-white shadow-sm">
      <div className="flex justify-center gap-6 border-b border-gray-200">
        <div className="relative">
          <button
            onClick={() => setActiveTab("apply")}
            className={`py-4 px-2 text-sm sm:text-base font-semibold transition-all ${
              activeTab === "apply" ? "text-blue-600" : "text-gray-800"
            }`}
          >
            Your Documents
          </button>
          {activeTab === "apply" && (
            <span className="absolute bottom-0 left-0 w-full h-0.5 bg-blue-600" />
          )}
        </div>

        <div className="relative">
          <button
            onClick={() => setActiveTab("applied")}
            className={`py-4 px-2 text-sm sm:text-base font-semibold transition-all ${
              activeTab === "applied" ? "text-blue-600" : "text-gray-800"
            }`}
          >
            KC Documents
          </button>
          {activeTab === "applied" && (
            <span className="absolute bottom-0 left-0 w-full h-0.5 bg-blue-600" />
          )}
        </div>
      </div>

      <div className="p-4">
        {activeTab === "apply" ? (
          <div>
            <StudentDocument id={id}/>
          </div>
        ) : (
          <div>
            <p>This is kc document</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default Document;
