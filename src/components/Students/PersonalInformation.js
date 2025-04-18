import React, { useState, useEffect } from "react";
import { FaInfoCircle } from "react-icons/fa";

const PersonalInformation = () => {
  const [data, setData] = useState(null);

  useEffect(() => {
    // Static data for demonstration
    const staticData = {
      dob: "03/09/2004",
      gender: "Male",
      maritalStatus: "Unmarried",
      address1: "Arpara, Kaliganj, Noldanga–7350, Jhenaidah",
      country: "Bangladesh",
      city: "Jhenaidah",
      address2: "Arpara, Kaliganj, Noldanga–7350, Jhenaidah,Vv",
      state: "Jessore District",
      pincode: "7350"
    };
    setData(staticData);
  }, []);

  if (!data) return <div className="text-center py-10">Loading...</div>;

  return (
    <div className="p-4 space-y-6 max-w-6xl mx-auto">
      {/* Personal Info */}
      <div className="card ">
      <div className="flex items-center justify-between mb-4">
            <div className="flex items-center gap-2 text-blue-600 font-semibold text-md">
              <FaInfoCircle className="w-5 h-5" />
              Personal Information
            </div>
            <button className="btn btn-outline btn-sm text-blue-600 bg-blue-100 p-2 rounded-sm">Request Edit</button>
          </div>
        <div className="card-body p-8 shadow-md bg-base-100 rounded-md">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="text-md">
              <span className="text-gray-600">Date of birth</span><br/>
               <span>{data.dob}</span>
               </div>
            <div className="text-md">
              <span className="text-gray-600">Gender</span><br/>
               <span>{data.gender}</span>
               </div>
            <div className="text-md">
              <span className="text-gray-600">Marital Status</span><br/>
               <span>{data.maritalStatus}</span>
               </div>
          </div>
        </div>
      </div>

      {/* Mailing Address */}
      <div className="card shadow-md bg-base-100">
        <div className="card-body">
          <div className="flex items-center justify-between mb-4">
            <div className="flex items-center gap-2 text-blue-600 font-semibold text-lg">
              <FaInfoCircle className="w-5 h-5" />
              Mailing Address
            </div>
            <button className="btn btn-outline btn-sm">Request Edit</button>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <div><span className="font-medium">Address 1:</span> {data.address1}</div>
              <div><span className="font-medium">Country:</span> {data.country}</div>
              <div><span className="font-medium">City:</span> {data.city}</div>
            </div>
            <div>
              <div><span className="font-medium">Address 2:</span> {data.address2}</div>
              <div><span className="font-medium">State:</span> {data.state}</div>
              <div><span className="font-medium">Pincode:</span> {data.pincode}</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PersonalInformation;
