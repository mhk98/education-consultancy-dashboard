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
    <div className="p-4 space-y-6  mx-auto">
      {/* Personal Info */}
      <div className="card ">
      <div className="flex items-center justify-between mb-4">
            <div className="flex items-center gap-2 text-blue-600 font-semibold text-sm">
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
      <div className="card ">
      <div className="flex items-center justify-between mb-4">
            <div className="flex items-center gap-2 text-blue-600 font-semibold text-sm">
              <FaInfoCircle className="w-5 h-5" />
              Mailing Address
            </div>
            <button className="btn btn-outline btn-sm text-blue-600 bg-blue-100 p-2 rounded-sm">Request Edit</button>
          </div>
        <div className="card-body p-12 shadow-md bg-base-100 rounded-md">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="text-md">
              <div>
              <span className="text-gray-600">Address 1</span><br/>
              <span>{data.address1}</span>
              </div>
              <div className="mt-4">
              <span className="text-gray-600">Country</span><br/>
              <span>{data.country}</span>
              </div>
              <div className="mt-4">
              <span className="text-gray-600">City</span><br/>
              <span>{data.city}</span>
              </div>

               </div>

           <div className="text-md">
              <div>
              <span className="text-gray-600">Address 2</span><br/>
              <span>{data.address2}</span>
              </div>
              <div className="mt-4">
              <span className="text-gray-600">State</span><br/>
              <span>{data.state}</span>
              </div>
              <div className="mt-4">
              <span className="text-gray-600">Pincode</span><br/>
              <span>{data.pincode}</span>
              </div>

               </div>

          </div>
        </div>
      </div>

      {/* Permanent Address */}
      <div className="card ">
      <div className="flex items-center justify-between mb-4">
            <div className="flex items-center gap-2 text-blue-600 font-semibold text-sm">
              <FaInfoCircle className="w-5 h-5" />
              Permanent Address
            </div>
            <button className="btn btn-outline btn-sm text-blue-600 bg-blue-100 p-2 rounded-sm">Request Edit</button>
          </div>
        <div className="card-body p-12 shadow-md bg-base-100 rounded-md">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="text-md">
              <div>
              <span className="text-gray-600">Address 1</span><br/>
              <span>{data.address1}</span>
              </div>
              <div className="mt-4">
              <span className="text-gray-600">Country</span><br/>
              <span>{data.country}</span>
              </div>
              <div className="mt-4">
              <span className="text-gray-600">City</span><br/>
              <span>{data.city}</span>
              </div>

               </div>

           <div className="text-md">
              <div>
              <span className="text-gray-600">Address 2</span><br/>
              <span>{data.address2}</span>
              </div>
              <div className="mt-4">
              <span className="text-gray-600">State</span><br/>
              <span>{data.state}</span>
              </div>
              <div className="mt-4">
              <span className="text-gray-600">Pincode</span><br/>
              <span>{data.pincode}</span>
              </div>

               </div>

          </div>
        </div>
      </div>

      {/* Permanent Address */}
      <div className="card ">
      <div className="flex items-center justify-between mb-4">
            <div className="flex items-center gap-2 text-blue-600 font-semibold text-sm">
              <FaInfoCircle className="w-5 h-5" />
              Passport Information
            </div>
            <button className="btn btn-outline btn-sm text-blue-600 bg-blue-100 p-2 rounded-sm">Request Edit</button>
          </div>
        <div className="card-body p-12 shadow-md bg-base-100 rounded-md">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">

          <div className="text-md">
              <div>
              <span className="text-gray-600">Passport Number</span><br/>
              <span>A13849786</span>
              </div>
              <div className="mt-4">
              <span className="text-gray-600">Issue Country</span><br/>
              <span>Bangladesh</span>
              </div>
               </div>
          <div className="text-md">
              <div>
              <span className="text-gray-600">Issue Date</span><br/>
              <span>24/03/2024</span>
              </div>
              <div className="mt-4">
              <span className="text-gray-600">City of Birth</span><br/>
              <span>Jhenaidha</span>
              </div>
               </div>
          <div className="text-md">
              <div>
              <span className="text-gray-600">Expiry Date</span><br/>
              <span>23/03/2034</span>
              </div>
              <div className="mt-4">
              <span className="text-gray-600">Country of Birth</span><br/>
              <span>Bangladesh</span>
              </div>
               </div>

         

          </div>
        </div>
      </div>

      {/* Permanent Address */}
      <div className="card ">
      <div className="flex items-center justify-between mb-4">
            <div className="flex items-center gap-2 text-blue-600 font-semibold text-sm">
              <FaInfoCircle className="w-5 h-5" />
              Nationality
            </div>
            <button className="btn btn-outline btn-sm text-blue-600 bg-blue-100 p-2 rounded-sm">Request Edit</button>
          </div>
        <div className="card-body p-12 shadow-md bg-base-100 rounded-md">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">

          <div className="text-md">
              <div>
              <span className="text-gray-600">Nationality*</span><br/>
              <span>Bangladesh</span>
              </div>
              <div className="mt-4">
              <span className="text-gray-600">Is the applicant a citizen of more than one country?*</span><br/>
              <span>No</span>
              </div>
               </div>
          <div className="text-md">
              <div>
              <span className="text-gray-600">Citizenship*</span><br/>
              <span>Bangladesh</span>
              </div>
              <div className="mt-4">
              <span className="text-gray-600">Is the applicant living and studying in any other country?*</span><br/>
              <span>No</span>
              </div>
               </div>
         

         

          </div>
        </div>
      </div>

      {/* Permanent Address */}
      <div className="card ">
      <div className="flex items-center justify-between mb-4">
            <div className="flex items-center gap-2 text-blue-600 font-semibold text-sm">
              <FaInfoCircle className="w-5 h-5" />
              Background Info
            </div>
            <button className="btn btn-outline btn-sm text-blue-600 bg-blue-100 p-2 rounded-sm">Request Edit</button>
          </div>
        <div className="card-body p-12 shadow-md bg-base-100 rounded-md">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">

          <div className="text-md">
              <div>
              <span className="text-gray-600">Nationality*</span><br/>
              <span>Bangladesh</span>
              </div>
              <div className="mt-4">
              <span className="text-gray-600">Is the applicant a citizen of more than one country?*</span><br/>
              <span>No</span>
              </div>
               </div>
          <div className="text-md">
              <div>
              <span className="text-gray-600">Citizenship*</span><br/>
              <span>Bangladesh</span>
              </div>
              <div className="mt-4">
              <span className="text-gray-600">Is the applicant living and studying in any other country?*</span><br/>
              <span>No</span>
              </div>
               </div>
         

         

          </div>
        </div>
      </div>

      <div className="card ">
      <div className="flex items-center justify-between mb-4">
            <div className="flex items-center gap-2 text-blue-600 font-semibold text-sm">
              <FaInfoCircle className="w-5 h-5" />
              Important Contacts
            </div>
            <button className="btn btn-outline btn-sm text-blue-600 bg-blue-100 p-2 rounded-sm">Request Edit</button>
          </div>
        <div className="card-body p-12 shadow-md bg-base-100 rounded-md">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">

          <div className="text-md">
              <div>
              <span className="text-gray-600">Name</span><br/>
              <span>Humayun Ahmed</span>
              </div>
              <div className="mt-4">
              <span className="text-gray-600">Email</span><br/>
              <span>Humiahmed@mail.com</span>
              </div>
               </div>
          <div className="text-md">
              <div>
              <span className="text-gray-600">Phone</span><br/>
              <span>+8801595649567</span>
              </div>
              <div className="mt-4">
              <span className="text-gray-600">Relation with Applicant</span><br/>
              <span>Brother</span>
              </div>
               </div>
         

         

          </div>
        </div>
      </div>
     
      <div className="card ">
      <div className="flex items-center justify-between mb-4">
            <div className="flex items-center gap-2 text-blue-600 font-semibold text-sm">
              <FaInfoCircle className="w-5 h-5" />
              Additional Information
            </div>
            <button className="btn btn-outline btn-sm text-blue-600 bg-blue-100 p-2 rounded-sm">Request Edit</button>
          </div>
        <div className="card-body p-8 shadow-md bg-base-100 rounded-md">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="text-md">
              <span className="text-gray-600">Gap Details</span><br/>
               <span>Provided in cv</span>
               </div>
          </div>
        </div>
      </div>

    </div>
  );
};

export default PersonalInformation;
