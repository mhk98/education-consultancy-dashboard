import React, { useEffect, useState } from "react";
import { FaRegCopy } from "react-icons/fa";
import Profile from "./Profile";
import { useParams } from "react-router-dom/cjs/react-router-dom";
import Applications from "./Applications";
import Document from "./Document";
import axios from "axios";

const StudentEditProfile = () => {
  const { id } = useParams();
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [activeTab, setActiveTab] = useState("profile");

  const qrLink = "https://demo.eaconsultancy.info/login";

  const handleCopy = () => {
    navigator.clipboard.writeText(qrLink);
    alert("Link copied to clipboard!");
  };

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const res = await axios.get(`https://education-consultancy-backend.onrender.com/api/v1/user/${id}`);
        setData(res.data.data);
      } catch (err) {
        console.error("Failed to fetch user data:", err);
        setError("Failed to load user data");
      } finally {
        setLoading(false);
      }
    };

    fetchUser();
  }, [id]);

  const isProfile = activeTab === "profile";
  const isApplications = activeTab === "applications";
  const isDocuments = activeTab === "documents";

  if (loading) return <div className="p-4">Loading user data...</div>;
  if (error) return <div className="p-4 text-red-500">{error}</div>;
  if (!data) return <div className="p-4 text-gray-500">No user found.</div>;

  return (
    <div className="p-4 md:p-8 w-full mx-auto">
      <div className="text-sm text-gray-500 mb-4">
        <a href="#" className="hover:underline">Students</a> &gt;{" "}
        <a href="#" className="hover:underline">Student Profile</a> &gt;{" "}
        <span className="text-gray-800 font-medium">
          {data?.FirstName} {data?.LastName}
        </span>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
        {/* Student Info */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
          <div className="cursor-pointer col-span-1 bg-white rounded-2xl shadow p-4 flex flex-col gap-2">
            <h2 className="font-semibold text-lg text-gray-800">
              {data?.FirstName} {data?.LastName}
            </h2>
            <div className="text-sm text-gray-600">
              <p>📧 {data?.Email}</p>
              <p>📞 {data?.Phone}</p>
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
          <div
            onClick={() => setActiveTab("profile")}
            className="flex flex-col items-center cursor-pointer"
          >
            <div
              className={`w-8 h-8 flex items-center justify-center rounded-full text-sm font-medium ${
                isProfile ? "bg-blue-600 text-white" : "bg-gray-200"
              }`}
            >
              1
            </div>
            <span className="mt-1 text-xs text-gray-700">Profile</span>
          </div>
          <div className="h-px flex-1 bg-gray-300 mx-2"></div>
          <div
            onClick={() => setActiveTab("applications")}
            className="flex flex-col items-center cursor-pointer"
          >
            <div
              className={`w-8 h-8 flex items-center justify-center rounded-full text-sm font-medium ${
                isApplications ? "bg-blue-600 text-white" : "bg-gray-200"
              }`}
            >
              2
            </div>
            <span className="mt-1 text-xs text-gray-700">Applications</span>
          </div>
          <div className="h-px flex-1 bg-gray-300 mx-2"></div>
          <div
            onClick={() => setActiveTab("documents")}
            className="flex flex-col items-center cursor-pointer"
          >
            <div
              className={`w-8 h-8 flex items-center justify-center rounded-full text-sm font-medium ${
                isDocuments ? "bg-blue-600 text-white" : "bg-gray-200"
              }`}
            >
              3
            </div>
            <span className="mt-1 text-xs text-gray-700">Documents</span>
          </div>
        </div>
      </div>

      {/* Tab Content */}
      <div className="mt-4 p-4 bg-white">
        {isProfile ? (
          <Profile id={id} />
        ) : isApplications ? (
          <Applications id={id} />
        ) : (
          <Document id={id} />
        )}
      </div>
    </div>
  );
};

export default StudentEditProfile;
