import React from "react";

const managers = [
    {
      name: "Al Moontasir Shifat",
      title: "Regional Officer",
      phone: "+880 1831591481",
      location: "Dhaka",
      email: "dhaka2@kcoverseas.com",
      image: "https://via.placeholder.com/80", // Replace with actual image URL
    },
    {
      name: "Rakesh Soni",
      title: "Assistant Vice President",
      phone: "+91 7385444610",
      location: "Nagpur",
      email: "rsoni@kcoverseas.com",
      image: "https://via.placeholder.com/80", // Replace with actual image URL
    },
  ];
  
  export default function RegionalManagers() {
    return (
      <div className="w-full mx-auto py-6">
        <h2 className="text-2xl font-bold text-gray-800 mb-6">
          Contact Regional Manager
        </h2>
  
        <div className="space-y-6">
          {managers.map((manager, index) => (
            <div
              key={index}
              className="bg-white rounded-lg shadow-sm border overflow-hidden"
            >
              <div className="flex flex-col sm:flex-row items-center sm:items-start gap-4 p-4">
                <img
                  src={manager.image}
                  alt={manager.name}
                  className="w-20 h-20 rounded-full object-cover"
                />
                <div className="text-center sm:text-left">
                  <h3 className="text-lg font-semibold text-black">
                    {manager.name}
                  </h3>
                  <p className="text-sm text-gray-600">{manager.title}</p>
                  <p className="text-sm text-gray-600">{manager.phone}</p>
                  <p className="text-sm text-gray-600">{manager.location}</p>
                </div>
              </div>
              <div className="bg-blue-100 px-4 py-2 text-sm text-gray-700 text-center">
                {manager.email}
              </div>
            </div>
          ))}
        </div>
      </div>
    );
  }
  